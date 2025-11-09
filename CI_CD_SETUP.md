# CI/CD Setup Guide

## Overview
This project uses **GitHub Actions** and **EAS Build** for continuous integration and deployment. Builds are triggered automatically on push or can be manually triggered through the GitHub Actions UI.

## Prerequisites

### 1. Expo Account
- Create an account at [expo.dev](https://expo.dev)
- Join or create an organization: `shah.md.mahi` (already configured in `app.json`)

### 2. EAS CLI Installation
```bash
npm install -g eas-cli
eas login
```

### 3. Project Configuration
The project is already configured with:
- Project ID: `af409843-7410-45ac-895d-68e3a67c67f0`
- Owner: `shah.md.mahi`

## GitHub Secrets Configuration

Add the following secret to your GitHub repository:

### Required Secret
1. Go to: `Settings` → `Secrets and variables` → `Actions` → `New repository secret`

2. **EXPO_TOKEN**
   - Generate token: Run `eas login` then `eas whoami` → Account Settings → Access Tokens → Create
   - Name: `EXPO_TOKEN`
   - Value: Your generated token from Expo dashboard

### Optional Secrets (for store submission)
These are only needed when you're ready to submit to app stores:

- **GOOGLE_SERVICE_ACCOUNT_JSON**: For Android Play Store submission
  - Create service account in Google Play Console
  - Download JSON key file
  - Base64 encode it: `base64 -i google-service-account.json`
  - Add the encoded string as secret

- **APPLE_ID**, **APPLE_TEAM_ID**, **ASC_APP_ID**: For iOS App Store submission
  - Get from Apple Developer account

## Build Profiles

### Development
```bash
eas build --profile development --platform android
```
- Development client enabled
- Internal distribution
- Used for testing with expo-dev-client

### Preview
```bash
eas build --profile preview --platform all
```
- Internal distribution
- APK for Android (not AAB)
- Installable builds for testing
- **Triggers automatically on push to `develop` branch**

### Production
```bash
eas build --profile production --platform all
```
- Production-ready builds
- AAB for Android, IPA for iOS
- Auto-increment version
- **Triggers automatically on push to `master`/`main` branch**

## Automated Workflows

### Build Workflow (`.github/workflows/build.yml`)

#### Automatic Triggers
- **Push to `develop`**: Builds preview profile for all platforms
- **Push to `master`/`main`**: Builds production profile for all platforms

#### Manual Trigger
1. Go to: `Actions` → `EAS Build` → `Run workflow`
2. Select:
   - **Profile**: development, preview, or production
   - **Platform**: all, android, or ios
3. Click `Run workflow`

### Submit Workflow (`.github/workflows/submit.yml`)

#### Manual Trigger Only
1. Build must be completed first
2. Go to: `Actions` → `EAS Submit to Stores` → `Run workflow`
3. Select:
   - **Platform**: all, android, or ios
   - **Profile**: production
4. Click `Run workflow`

## Environment Variables

### Local Development
Create `.env` file (already created):
```env
EXPO_PUBLIC_PORTFOLIO_GITHUB_URL=https://raw.githubusercontent.com/ShahMdMahi/shahmdmahi-portfolio-mobile/master/constants/portfolio.json
EXPO_PUBLIC_APP_ENV=development
```

### Production
Environment variables are automatically set per profile in `eas.json`:
- Development: `EXPO_PUBLIC_APP_ENV=development`
- Preview: `EXPO_PUBLIC_APP_ENV=preview`
- Production: `EXPO_PUBLIC_APP_ENV=production`

## Build Commands

### Local Builds
```bash
# Development build
eas build --profile development --platform android --local

# Preview build
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all
```

### Check Build Status
```bash
eas build:list
eas build:view [BUILD_ID]
```

### Submit to Stores
```bash
# Android
eas submit --platform android --latest

# iOS
eas submit --platform ios --latest

# Both
eas submit --platform all --latest
```

## Workflow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Push                           │
└───────────────┬─────────────────────────────────────────────┘
                │
                ├──► develop branch ──► Preview Build (APK/IPA)
                │                       for internal testing
                │
                └──► master/main ──► Production Build (AAB/IPA)
                                    ready for store submission
```

## Manual Build Trigger Flow

```
GitHub Actions UI
    │
    ├──► Select Profile (dev/preview/prod)
    ├──► Select Platform (android/ios/all)
    └──► Run Workflow ──► EAS Build Starts
                              │
                              ├──► Android Build
                              └──► iOS Build
```

## Troubleshooting

### Build Fails with "Missing EXPO_TOKEN"
- Check that `EXPO_TOKEN` secret is added in GitHub repository settings
- Token must have admin permissions for the project

### Build Fails with Version Conflict
- Ensure `autoIncrement: true` is set in `eas.json` for production
- Or manually update version in `app.json`

### iOS Build Requires Apple Developer Account
- You need an active Apple Developer Program membership ($99/year)
- Configure certificates and provisioning profiles in EAS

### Android Build Requires Keystore
- EAS automatically generates and manages keystores
- Store credentials are saved securely in Expo servers

## Next Steps

1. **Add EXPO_TOKEN to GitHub Secrets**
   ```
   Repository Settings → Secrets → Actions → New secret
   Name: EXPO_TOKEN
   Value: [Your token from expo.dev]
   ```

2. **Create a `develop` branch** (optional, for preview builds)
   ```bash
   git checkout -b develop
   git push -u origin develop
   ```

3. **Test the workflow**
   - Push to `develop` → Preview build starts
   - Push to `master` → Production build starts
   - Or use manual trigger from GitHub Actions

4. **Monitor builds**
   - GitHub Actions: https://github.com/ShahMdMahi/shahmdmahi-portfolio-mobile/actions
   - Expo Dashboard: https://expo.dev/accounts/shah.md.mahi/projects/shahmdmahi-portfolio-mobile/builds

## Resources

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/submit/introduction/)
- [GitHub Actions for Expo](https://docs.expo.dev/build/building-on-ci/)
- [Environment Variables in Expo](https://docs.expo.dev/guides/environment-variables/)
