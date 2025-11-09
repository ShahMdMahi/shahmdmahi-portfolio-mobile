import { portfolioData as fallbackData, PortfolioData } from '@/constants/portfolio';
import portfolioJson from '@/constants/portfolio.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PORTFOLIO_CACHE_KEY = '@portfolio_data';
const PORTFOLIO_TIMESTAMP_KEY = '@portfolio_timestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// GitHub raw content URL for the portfolio.json file
const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/ShahMdMahi/shahmdmahi-portfolio-mobile/master/constants/portfolio.json';

/**
 * Fetches portfolio data from GitHub JSON file
 * This fetches the latest portfolio.json from the GitHub repository
 */
async function fetchPortfolioFromGitHub(): Promise<PortfolioData | null> {
  try {
    console.log('Fetching portfolio data from GitHub...');
    const response = await fetch(GITHUB_JSON_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched portfolio data from GitHub');
    
    // Merge with fallback to ensure functions are preserved
    return {
      ...data,
      personal: {
        ...data.personal,
        profileImage: fallbackData.personal.profileImage, // Restore image require
      },
      footer: {
        ...data.footer,
        copyright: fallbackData.footer.copyright, // Restore function
      },
    } as PortfolioData;
  } catch (error) {
    console.error('Error fetching portfolio from GitHub:', error);
    return null;
  }
}

/**
 * Gets portfolio data from local JSON file
 * This is used as a middle-tier fallback between cache and built-in data
 */
function getLocalJsonData(): PortfolioData {
  return {
    ...portfolioJson,
    personal: {
      ...portfolioJson.personal,
      profileImage: fallbackData.personal.profileImage, // Restore image require
    },
    footer: {
      ...portfolioJson.footer,
      copyright: fallbackData.footer.copyright, // Restore function
    },
  } as PortfolioData;
}

/**
 * Saves portfolio data to AsyncStorage cache
 */
async function cachePortfolioData(data: PortfolioData): Promise<void> {
  try {
    const dataString = JSON.stringify(data);
    const timestamp = Date.now().toString();
    
    await AsyncStorage.multiSet([
      [PORTFOLIO_CACHE_KEY, dataString],
      [PORTFOLIO_TIMESTAMP_KEY, timestamp],
    ]);
    
    console.log('Portfolio data cached successfully');
  } catch (error) {
    console.error('Error caching portfolio data:', error);
  }
}

/**
 * Retrieves cached portfolio data from AsyncStorage
 */
async function getCachedPortfolioData(): Promise<{ data: PortfolioData | null; isExpired: boolean }> {
  try {
    const [[, cachedData], [, timestamp]] = await AsyncStorage.multiGet([
      PORTFOLIO_CACHE_KEY,
      PORTFOLIO_TIMESTAMP_KEY,
    ]);

    if (!cachedData || !timestamp) {
      return { data: null, isExpired: true };
    }

    const cacheAge = Date.now() - parseInt(timestamp, 10);
    const isExpired = cacheAge > CACHE_DURATION;

    const data = JSON.parse(cachedData) as PortfolioData;
    console.log(`Cache ${isExpired ? 'expired' : 'valid'} (age: ${Math.round(cacheAge / 1000 / 60)} minutes)`);

    return { data, isExpired };
  } catch (error) {
    console.error('Error retrieving cached portfolio data:', error);
    return { data: null, isExpired: true };
  }
}

/**
 * Clears the cached portfolio data
 */
export async function clearPortfolioCache(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([PORTFOLIO_CACHE_KEY, PORTFOLIO_TIMESTAMP_KEY]);
    console.log('Portfolio cache cleared');
  } catch (error) {
    console.error('Error clearing portfolio cache:', error);
  }
}

/**
 * Main function to get portfolio data with caching strategy
 * 1. Check cache first
 * 2. If cache is valid, return cached data and optionally refresh in background
 * 3. If cache is expired or doesn't exist, fetch from GitHub
 * 4. If fetch fails, return cached data (even if expired) or fallback data
 */
export async function getPortfolioData(forceRefresh = false): Promise<PortfolioData> {
  try {
    // Check cache first (unless forced refresh)
    if (!forceRefresh) {
      const { data: cachedData, isExpired } = await getCachedPortfolioData();

      // If cache is valid, return it immediately
      if (cachedData && !isExpired) {
        console.log('Using cached portfolio data');
        return cachedData;
      }

      // If cache exists but is expired, try to fetch new data
      // but return cached data if fetch fails
      if (cachedData && isExpired) {
        console.log('Cache expired, fetching fresh data...');
        const freshData = await fetchPortfolioFromGitHub();
        
        if (freshData) {
          await cachePortfolioData(freshData);
          return freshData;
        }
        
        console.log('Fetch failed, using expired cache');
        return cachedData;
      }
    }

    // No cache or forced refresh - fetch from GitHub
    console.log('Fetching fresh portfolio data...');
    const freshData = await fetchPortfolioFromGitHub();

    if (freshData) {
      await cachePortfolioData(freshData);
      return freshData;
    }

    // If all fails, check if we have any cached data
    const { data: cachedData } = await getCachedPortfolioData();
    if (cachedData) {
      console.log('Using cached data as fallback');
      return cachedData;
    }

    // Use local JSON file as fallback
    console.log('Using local portfolio.json as fallback');
    return getLocalJsonData();
  } catch (error) {
    console.error('Error in getPortfolioData:', error);
    
    // Try to return cached data on error
    try {
      const { data: cachedData } = await getCachedPortfolioData();
      if (cachedData) {
        return cachedData;
      }
    } catch (cacheError) {
      console.error('Error retrieving cache on fallback:', cacheError);
    }

    // Return local JSON as last resort
    return getLocalJsonData();
  }
}

/**
 * Prefetches portfolio data in the background
 * Useful for warming up the cache
 */
export async function prefetchPortfolioData(): Promise<void> {
  try {
    await getPortfolioData();
  } catch (error) {
    console.error('Error prefetching portfolio data:', error);
  }
}

/**
 * Gets cache status information
 */
export async function getCacheStatus(): Promise<{
  hasCachedData: boolean;
  isExpired: boolean;
  cacheAge: number | null;
}> {
  try {
    const [[, cachedData], [, timestamp]] = await AsyncStorage.multiGet([
      PORTFOLIO_CACHE_KEY,
      PORTFOLIO_TIMESTAMP_KEY,
    ]);

    const hasCachedData = !!cachedData;
    const cacheAge = timestamp ? Date.now() - parseInt(timestamp, 10) : null;
    const isExpired = cacheAge ? cacheAge > CACHE_DURATION : true;

    return { hasCachedData, isExpired, cacheAge };
  } catch (error) {
    console.error('Error getting cache status:', error);
    return { hasCachedData: false, isExpired: true, cacheAge: null };
  }
}
