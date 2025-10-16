# BB Anonym Pro Font Setup

## Required Font Files

Please add the following BB Anonym Pro font files to this directory:

### Bold (for headers):
- `bb-anonym-pro-bold.woff2`
- `bb-anonym-pro-bold.woff`
- `bb-anonym-pro-bold.ttf`

### Regular (for body text):
- `bb-anonym-pro-regular.woff2`
- `bb-anonym-pro-regular.woff`
- `bb-anonym-pro-regular.ttf`

## How to Add the Fonts

1. **Download the BB Anonym Pro font files** from your font source
2. **Copy the files** to this `/public/fonts/` directory
3. **Restart the dev server** to apply the changes

## Font Sources

You can obtain the BB Anonym Pro font from:
- Your design files
- Font marketplace (if purchased)
- Studio supply

## Temporary Fallback

Until the font files are added, the app will use the system monospace font as a fallback.

---

**Note:** The font is already configured in:
- `/app/globals.css` - Font-face declarations
- `/tailwind.config.ts` - Tailwind font family
- Font weights: 400 (regular), 700 (bold)
