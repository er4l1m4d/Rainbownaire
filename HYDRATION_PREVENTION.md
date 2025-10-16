# Hydration Mismatch Prevention Guide

## Overview
Hydration mismatches occur when the server-rendered HTML doesn't match the client-rendered HTML. This commonly happens with:
- Third-party libraries (RainbowKit, etc.) that add dynamic attributes
- Browser extensions that modify DOM elements
- Dynamic content that behaves differently on server vs client

## Prevention Strategies

### 1. Use `suppressHydrationWarning={true}`
Add this prop to components that might be affected by external factors:

```tsx
// For containers
<div suppressHydrationWarning={true}>
  <ThirdPartyComponent />
</div>

// For third-party components
<RainbowKitProvider suppressHydrationWarning>
  {children}
</RainbowKitProvider>
```

### 2. Use HydrationSafeWrapper Component
For new components, wrap them with our custom wrapper:

```tsx
import { HydrationSafeWrapper } from '@/components/HydrationSafeWrapper';

export function MyComponent() {
  return (
    <HydrationSafeWrapper>
      <div>
        {/* Your component content */}
      </div>
    </HydrationSafeWrapper>
  );
}
```

### 3. Strategic Placement
- **Root Layout**: Add to `<html>` and `<body>` elements
- **Providers**: Add to wallet and state management providers
- **Major Containers**: Add to main page sections
- **Third-party Components**: Wrap components from external libraries

### 4. When to Use Suppression
✅ **Safe to suppress:**
- Third-party wallet connectors (RainbowKit, MetaMask, etc.)
- Browser extension affected elements
- Dynamic styling that might vary
- Modal/overlay containers

❌ **Avoid suppressing:**
- Your own dynamic content that should match server/client
- Important interactive elements where you need hydration errors for debugging

### 5. Best Practices
- Always test in production to ensure functionality isn't broken
- Use suppression sparingly and strategically
- Document why suppression was added for future developers
- Consider if the mismatch can be fixed at the source instead of suppressed

## Current Implementation
The application currently has hydration warnings suppressed in:
- Root layout (`app/layout.tsx`)
- Provider components (`components/providers.tsx`)
- Main page containers (`app/page.tsx`)
- Quiz and results pages
- Third-party component wrappers

## Troubleshooting
If hydration mismatches still occur:
1. Check browser console for specific mismatch details
2. Identify which component is causing the issue
3. Add `suppressHydrationWarning={true}` to the problematic component
4. Test thoroughly after making changes
