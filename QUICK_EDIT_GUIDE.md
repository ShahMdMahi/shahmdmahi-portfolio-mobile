# Quick Edit Guide - Portfolio Data 📝

## 🎯 Main File to Edit
**File**: `constants/portfolio.ts`

This single file contains ALL your portfolio data. No need to edit components!

## ✏️ Quick Edits

### Change Your Name
```typescript
personal: {
  name: 'Shah Md Mahi',  // ← Change this
  title: 'Fullstack Developer',  // ← Change this
}
```

### Change Your Photo
1. Put your photo in: `assets/shahmdmahi.png`
2. Or update the path in portfolio.ts:
```typescript
profileImage: require('../assets/your-photo.png'),
```

### Add/Remove Skills
```typescript
skills: [
  {
    title: 'Your Category',
    icon: 'code-slash',  // See icons below
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  },
]
```

### Add/Remove Projects
```typescript
projects: [
  {
    title: 'Project Name',
    description: 'What it does...',
    technologies: ['React', 'Node.js'],
    icon: 'cart',  // See icons below
    color: colors.primary,
    link: 'https://github.com/username/project',
  },
]
```

### Update Contact Info
```typescript
contact: {
  info: [
    {
      icon: 'mail',
      label: 'Email',
      value: 'your@email.com',
      link: 'mailto:your@email.com',
    },
    {
      icon: 'call',
      label: 'Phone',
      value: '+1 234 567 8900',
      link: 'tel:+12345678900',
    },
  ]
}
```

### Update Social Links
```typescript
social: {
  links: [
    {
      name: 'GitHub',
      icon: 'logo-github',
      url: 'https://github.com/username',
      color: colors.text,
    },
    {
      name: 'LinkedIn',
      icon: 'logo-linkedin',
      url: 'https://linkedin.com/in/username',
      color: '#0077b5',
    },
  ]
}
```

## 🎨 Available Icon Names (Ionicons)

### Common Icons
- `logo-github`, `logo-linkedin`, `logo-twitter`, `logo-instagram`
- `logo-facebook`, `logo-youtube`, `logo-dribbble`, `logo-behance`
- `mail`, `call`, `location`, `time`, `globe`
- `code-slash`, `server`, `phone-portrait`, `cloud`, `construct`
- `briefcase`, `people`, `trophy`, `rocket`, `bulb`
- `cart`, `medical`, `analytics`, `card`, `business`
- `desktop`, `sparkles`, `heart`, `star`, `lightning-bolt`

### Find More Icons
Visit: https://ionic.io/ionicons

## 🎨 Available Colors

In `constants/colors.ts`:
- `colors.primary` - Main brand color (blue/purple)
- `colors.accent` - Accent color (pink)
- `colors.success` - Green
- `colors.warning` - Orange/Yellow
- `colors.info` - Blue
- `colors.text` - White text
- `colors.textSecondary` - Gray text

## 🚀 Testing Your Changes

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 💡 Pro Tips

1. **Save often** - Changes auto-reload in Expo
2. **Test on device** - Haptic feedback only works on real devices
3. **Keep it concise** - Shorter descriptions work better on mobile
4. **Use real photos** - Replace shahmdmahi.png with your actual photo
5. **Update links** - Make sure all URLs point to your profiles

## 🐛 Common Issues

### Image not showing?
- Check file path in `profileImage`
- Make sure image exists in `assets/` folder
- Image should be PNG or JPG

### Icon not showing?
- Check spelling: `logo-github` not `github-logo`
- Visit ionicons.io for correct names
- Icons are case-sensitive!

### Colors not working?
- Import colors: `import { colors } from './colors';`
- Use like: `color: colors.primary`
- Or use hex: `color: '#ff0000'`

## 📱 Want More?

### Add New Section
1. Create component in `components/sections/`
2. Add data to `constants/portfolio.ts`
3. Import in `app/(root)/index.tsx`

### Change Colors
Edit `constants/colors.ts`

### Adjust Animations
Edit timing in component files (duration, delay)

### Modify Layout
Edit `app/(root)/index.tsx` to reorder sections

---

**Need help?** Check `NATIVE_TRANSFORMATION.md` for full documentation!
