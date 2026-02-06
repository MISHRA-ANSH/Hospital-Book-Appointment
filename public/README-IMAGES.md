# Doctor Images Setup

## Required Images for About Page

Place the following images in the `public` folder:

### Hero Section
- `doctor-hero.jpg` - Main doctor image for hero section (recommended: 400x500px)

### Testimonials Section
- `testimonial1.jpg` - Patient testimonial photo (recommended: 200x200px)
- `testimonial2.jpg` - Patient testimonial photo (recommended: 200x200px)
- `testimonial3.jpg` - Patient testimonial photo (recommended: 200x200px)

### Doctors Section
- `doctor1.jpg` - Dr. Harsh Mehta (Cardiologist) (recommended: 200x200px, circular crop)
- `doctor2.jpg` - Dr. M Patel (Neurologist) (recommended: 200x200px, circular crop)
- `doctor3.jpg` - Dr. Anamika Singh (Pediatrician) (recommended: 200x200px, circular crop)
- `doctor4.jpg` - Dr. Ashwani Kumar (Surgeon) (recommended: 200x200px, circular crop)

## Image Guidelines

### Format
- Use JPG or PNG format
- Optimize images for web (compress to reduce file size)
- Maximum file size: 500KB per image

### Dimensions
- Hero image: 400x500px (portrait orientation)
- Testimonial photos: 200x200px (square)
- Doctor photos: 200x200px (square, will be displayed as circles)

### Quality
- Use high-resolution images
- Ensure good lighting and professional appearance
- For doctor photos, use professional headshots with white or neutral backgrounds

## Fallback Behavior

If images are not found, the page will display:
- Placeholder avatars with emojis
- SVG placeholders with initials
- No broken image icons

## Example File Structure

```
public/
├── doctor-hero.jpg
├── doctor1.jpg
├── doctor2.jpg
├── doctor3.jpg
├── doctor4.jpg
├── testimonial1.jpg
├── testimonial2.jpg
└── testimonial3.jpg
```

## Free Stock Photo Resources

If you need placeholder images, you can use:
- [Unsplash](https://unsplash.com/s/photos/doctor) - Free high-quality images
- [Pexels](https://www.pexels.com/search/doctor/) - Free stock photos
- [Pixabay](https://pixabay.com/images/search/doctor/) - Free images

## Testing

After adding images:
1. Navigate to `/about` page
2. Check that all images load correctly
3. Test on different screen sizes
4. Verify images are optimized (fast loading)

## Notes

- Images are loaded from the public folder using absolute paths (e.g., `/doctor1.jpg`)
- The page includes error handling for missing images
- Fallback placeholders will be shown if images fail to load
