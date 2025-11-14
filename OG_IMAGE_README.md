# Open Graph Image

This directory contains the Open Graph (OG) image for social media sharing.

## Files

- `og-image.svg` - Vector source file (1200x630px)
- `og-image.png` - PNG version for maximum compatibility (to be generated)

## Converting SVG to PNG

### Option 1: Using ImageMagick (Recommended)
```bash
convert -density 300 -background none og-image.svg -resize 1200x630 og-image.png
```

### Option 2: Using Inkscape
```bash
inkscape og-image.svg --export-filename=og-image.png --export-width=1200 --export-height=630
```

### Option 3: Using rsvg-convert
```bash
rsvg-convert -w 1200 -h 630 og-image.svg -o og-image.png
```

### Option 4: Using Node.js (sharp)
```javascript
const sharp = require('sharp');
sharp('og-image.svg')
  .resize(1200, 630)
  .png()
  .toFile('og-image.png');
```

### Option 5: Online Tools
1. Open `og-image.svg` in a browser
2. Take a screenshot at exactly 1200x630
3. Or use online converters like CloudConvert, Convertio, etc.

## Testing

After generating the PNG, test how it appears:

- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Specifications

- **Size**: 1200 x 630 pixels
- **Format**: PNG (SVG as source)
- **Max file size**: < 8MB (current is well under this)
- **Aspect ratio**: 1.91:1

## Editing

To edit the OG image:
1. Modify `og-image.svg` directly
2. Regenerate `og-image.png` using one of the methods above
3. Test the new image with social media validators
4. Commit both files

## Current Design

The image features:
- Luminous Nix gradient logo
- Terminal demo showing natural language command
- Brand colors (#1a1a2e, #2d3561, #5277C3, #7EBAE4, #FFD700)
- Professional, modern design optimized for social sharing
