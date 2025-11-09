# Portfolio Data Fetching - Quick Reference

## What's New

Your app now automatically fetches portfolio data from GitHub on every launch, with smart caching for offline support!

## Key Features

✅ **Auto-fetch on app launch** - Always shows latest portfolio data  
✅ **24-hour cache** - Fast load times with periodic updates  
✅ **Offline support** - Works without internet using cached data  
✅ **Pull-to-refresh** - Manual refresh anytime  
✅ **Smart fallbacks** - GitHub → Cache → Built-in data

## Data Source

```
https://raw.githubusercontent.com/ShahMdMahi/shahmdmahi-portfolio-mobile/master/constants/portfolio.json
```

Update `constants/portfolio.json` on GitHub, and all app instances will fetch the changes within 24 hours (or immediately with pull-to-refresh).

**Note:** The JSON file is the source of truth for remote updates. The TypeScript file (`portfolio.ts`) is maintained for local development and type safety.

## How It Works

1. **App Opens**: Checks cache first
2. **Cache Valid** (<24h): Shows cached data instantly
3. **Cache Expired** (>24h): Fetches from GitHub, updates cache
4. **No Internet**: Uses cached data (even if expired)
5. **No Cache**: Uses built-in fallback data

## Files Created/Modified

### New Files:

- `utils/portfolio-service.ts` - Core fetching & caching logic
- `contexts/portfolio-context.tsx` - React Context for state management
- `PORTFOLIO_DATA_FETCHING.md` - Detailed documentation

### Modified Files:

- `app/_layout.tsx` - Added PortfolioProvider wrapper
- `app/(root)/index.tsx` - Added loading state & refresh
- All section components - Updated to use `usePortfolio()` hook

### Dependencies Added:

- `@react-native-async-storage/async-storage@^2.2.0`

## Usage in Components

Instead of:

```typescript
import { portfolioData } from "@/constants/portfolio";
```

Now use:

```typescript
import { usePortfolio } from "@/contexts/portfolio-context";

const { portfolioData } = usePortfolio();
```

## Testing

1. **Launch app** - Should show loading indicator briefly
2. **Pull down** - Should trigger refresh
3. **Turn off internet** - Should work with cached data
4. **Update GitHub file** - Changes appear after cache expires or manual refresh

## Cache Management

```typescript
const {
  portfolioData, // Current data
  isLoading, // Initial load state
  isRefreshing, // Refresh state
  refreshData, // Force refresh
  clearCache, // Clear cache
  cacheStatus, // Cache info
} = usePortfolio();
```

## Console Logs

Watch for these logs during development:

- `Fetching portfolio data from GitHub...`
- `Using cached portfolio data`
- `Cache expired, fetching fresh data...`
- `Portfolio data cached successfully`

## Troubleshooting

**Data not updating?**

- Wait 24 hours or pull-to-refresh
- Check GitHub URL is accessible
- Verify internet connection

**App won't load?**

- Built-in fallback data will be used
- Check console for errors
- Clear cache: `AsyncStorage.clear()`

## Performance

- **With cache**: ~50-100ms (instant)
- **Without cache**: ~1-3 seconds (network fetch)
- **Offline**: ~50-100ms (cached data)

## Next Steps

1. Update `constants/portfolio.ts` on GitHub as needed
2. Users will automatically get updates within 24 hours
3. For immediate updates, users can pull-to-refresh
4. Monitor console logs for fetch success/failures

---

For detailed documentation, see `PORTFOLIO_DATA_FETCHING.md`
