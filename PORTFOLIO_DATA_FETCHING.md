# Portfolio Data Fetching & Caching System

## Overview

This application now features a dynamic portfolio data fetching system that automatically retrieves the latest portfolio data from GitHub on every app launch, with robust offline support through intelligent caching.

## Features

### 🔄 Automatic Data Fetching

- Fetches portfolio data from GitHub on every app launch
- Ensures users always see the most up-to-date portfolio information
- Falls back gracefully to cached or built-in data if fetch fails

### 💾 Smart Caching System

- Caches fetched data locally using AsyncStorage
- Cache validity: 24 hours
- Provides offline support when network is unavailable
- Automatic cache expiration and refresh

### 🔌 Offline Support

- Works seamlessly without internet connection
- Uses cached data when offline
- Falls back to built-in portfolio data as last resort
- Displays offline indicator to inform users

### 🔃 Pull-to-Refresh

- Swipe down to manually refresh portfolio data
- Forces a fresh fetch from GitHub
- Updates cache with latest data

## Architecture

### 1. Portfolio Service (`utils/portfolio-service.ts`)

Core service that handles all data fetching and caching operations:

```typescript
// Main functions
getPortfolioData(forceRefresh?: boolean): Promise<PortfolioData>
prefetchPortfolioData(): Promise<void>
clearPortfolioCache(): Promise<void>
getCacheStatus(): Promise<CacheStatus>
```

**Key Features:**

- Fetches raw TypeScript file from GitHub
- Parses and extracts portfolio data object
- Implements 3-tier fallback strategy:
  1. Fresh data from GitHub
  2. Cached data (valid or expired)
  3. Built-in fallback data

### 2. Portfolio Context (`contexts/portfolio-context.tsx`)

React Context provider that manages portfolio state across the app:

```typescript
const {
  portfolioData, // Current portfolio data
  isLoading, // Initial loading state
  isRefreshing, // Refresh in progress
  error, // Error message if any
  refreshData, // Manual refresh function
  clearCache, // Clear cache function
  cacheStatus, // Cache status information
} = usePortfolio();
```

### 3. Component Integration

All section components now use the portfolio context:

```typescript
import { usePortfolio } from "@/contexts/portfolio-context";

export const MySection = () => {
  const { portfolioData } = usePortfolio();
  // Use portfolioData instead of direct import
};
```

## Data Source

The portfolio data is fetched from:

```
https://raw.githubusercontent.com/ShahMdMahi/shahmdmahi-portfolio-mobile/master/constants/portfolio.json
```

### Fallback Strategy:

1. **GitHub JSON** - Fresh data from repository
2. **AsyncStorage Cache** - Previously fetched data
3. **Local JSON** - `constants/portfolio.json` bundled with app
4. **TypeScript Fallback** - `constants/portfolio.ts` with full type safety

## Cache Strategy

### Cache Flow:

1. **App Launch**: Check cache first
2. **Valid Cache** (< 24 hours): Use cached data, return immediately
3. **Expired Cache** (> 24 hours): Attempt to fetch fresh data
4. **Fetch Success**: Update cache and return fresh data
5. **Fetch Failed**: Use expired cache if available, otherwise use built-in fallback

### Cache Storage:

- **Storage**: AsyncStorage (persistent local storage)
- **Keys**:
  - `@portfolio_data`: Serialized portfolio data
  - `@portfolio_timestamp`: Timestamp of last cache update
- **Expiration**: 24 hours from last update

## Usage Examples

### Basic Usage in Components

```typescript
import { usePortfolio } from '@/contexts/portfolio-context';

function MyComponent() {
  const { portfolioData, isLoading } = usePortfolio();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <Text>{portfolioData.personal.name}</Text>;
}
```

### Manual Refresh

```typescript
function MyComponent() {
  const { refreshData, isRefreshing } = usePortfolio();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshData}
        />
      }
    >
      {/* Content */}
    </ScrollView>
  );
}
```

### Cache Management

```typescript
function SettingsScreen() {
  const { clearCache, cacheStatus } = usePortfolio();

  return (
    <View>
      <Text>Cache Age: {cacheStatus?.cacheAge}ms</Text>
      <Button title="Clear Cache" onPress={clearCache} />
    </View>
  );
}
```

## Error Handling

The system implements comprehensive error handling:

1. **Network Errors**: Falls back to cached data
2. **Parse Errors**: Falls back to cached data
3. **No Cache Available**: Uses built-in fallback data
4. **Corrupt Cache**: Attempts fresh fetch, then uses fallback

All errors are logged to console for debugging.

## Performance Considerations

### Optimization Strategies:

- **Stale-While-Revalidate**: Shows cached data immediately, updates in background
- **Smart Caching**: Only fetches when necessary (expired cache or forced refresh)
- **Minimal Payload**: Fetches only the portfolio.ts file, not entire repo
- **Async Operations**: All network and storage operations are asynchronous

### Load Times:

- **With Valid Cache**: ~50-100ms (instant)
- **With Expired Cache**: ~1-3 seconds (network fetch)
- **First Load**: ~1-3 seconds (network fetch)

## Monitoring & Debugging

### Console Logs:

The service provides detailed console logs:

- `Fetching portfolio data from GitHub...`
- `Successfully fetched and parsed portfolio data`
- `Using cached portfolio data`
- `Cache expired, fetching fresh data...`
- `Using built-in fallback data`

### Check Cache Status:

```typescript
const { cacheStatus } = usePortfolio();
console.log("Has Cache:", cacheStatus?.hasCachedData);
console.log("Is Expired:", cacheStatus?.isExpired);
console.log("Cache Age (ms):", cacheStatus?.cacheAge);
```

## Testing

### Test Scenarios:

1. **Fresh Install**: Should fetch from GitHub and cache
2. **Offline Launch**: Should use cached data with offline indicator
3. **Expired Cache**: Should attempt refresh and update cache
4. **Pull to Refresh**: Should force fetch and update cache
5. **Network Failure**: Should gracefully fall back to cache

### Manual Testing:

```typescript
// Force clear cache for testing
import AsyncStorage from "@react-native-async-storage/async-storage";
await AsyncStorage.clear();

// Test offline mode (airplane mode)
// Test refresh functionality
// Check console logs for data flow
```

## Future Enhancements

Potential improvements:

- [ ] Add background sync when app comes to foreground
- [ ] Implement delta updates (only fetch changed data)
- [ ] Add cache versioning for data migration
- [ ] Implement retry logic with exponential backoff
- [ ] Add analytics for fetch success/failure rates
- [ ] Support multiple data sources
- [ ] Add compression for cached data

## Dependencies

- `@react-native-async-storage/async-storage`: ^2.2.0
- React Context API (built-in)
- Expo fetch API (built-in)

## Troubleshooting

### Data Not Updating

1. Check internet connection
2. Verify GitHub URL is accessible
3. Check cache expiration (24 hours)
4. Try manual refresh (pull-to-refresh)
5. Clear cache and restart app

### Parse Errors

1. Verify portfolio.ts file format on GitHub
2. Ensure data structure matches TypeScript types
3. Check console for specific parse errors

### Cache Issues

1. Clear app data/cache
2. Reinstall the app
3. Check AsyncStorage permissions

## Support

For issues or questions:

- GitHub: https://github.com/ShahMdMahi/shahmdmahi-portfolio-mobile
- Email: shahmdmahi13@gmail.com
