import {
  portfolioData as fallbackData,
  PortfolioData,
} from "@/constants/portfolio";
import portfolioJson from "@/constants/portfolio.json";
import {
  clearPortfolioCache,
  getCacheStatus,
  getPortfolioData,
} from "@/utils/portfolio-service";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Safe initial data - use fallback if available, otherwise construct minimal data
const getInitialData = (): PortfolioData => {
  if (fallbackData && fallbackData.personal) {
    return fallbackData;
  }

  // Minimal fallback if everything fails
  return {
    ...portfolioJson,
    personal: {
      ...portfolioJson.personal,
      profileImage: null,
    },
    footer: {
      ...portfolioJson.footer,
      copyright: (year: number) =>
        `© ${year} ${portfolioJson.footer?.copyrightText || "All rights reserved"}`,
    },
  } as PortfolioData;
};

interface PortfolioContextType {
  portfolioData: PortfolioData;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  clearCache: () => Promise<void>;
  cacheStatus: {
    hasCachedData: boolean;
    isExpired: boolean;
    cacheAge: number | null;
  } | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

interface PortfolioProviderProps {
  children: ReactNode;
}

export function PortfolioProvider({ children }: PortfolioProviderProps) {
  const [portfolioData, setPortfolioData] =
    useState<PortfolioData>(getInitialData());
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cacheStatus, setCacheStatus] = useState<{
    hasCachedData: boolean;
    isExpired: boolean;
    cacheAge: number | null;
  } | null>(null);

  // Fetch portfolio data on mount
  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getPortfolioData();
      setPortfolioData(data);

      // Update cache status
      const status = await getCacheStatus();
      setCacheStatus(status);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load portfolio data";
      setError(errorMessage);
      console.error("Error loading portfolio data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const data = await getPortfolioData(true); // Force refresh
      setPortfolioData(data);

      // Update cache status
      const status = await getCacheStatus();
      setCacheStatus(status);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to refresh portfolio data";
      setError(errorMessage);
      console.error("Error refreshing portfolio data:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const clearCache = async () => {
    try {
      await clearPortfolioCache();
      const status = await getCacheStatus();
      setCacheStatus(status);
    } catch (err) {
      console.error("Error clearing cache:", err);
    }
  };

  const value: PortfolioContextType = {
    portfolioData,
    isLoading,
    isRefreshing,
    error,
    refreshData,
    clearCache,
    cacheStatus,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
