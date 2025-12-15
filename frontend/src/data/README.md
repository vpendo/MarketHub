# How to Add Your Own Product Images

## Option 1: Using Assets Folder (Recommended)

1. **Add your images** to `frontend/src/assets/images/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`
   - Example: `product1.jpg`, `headphones.png`, etc.

2. **Import images** in `mockProducts.ts`:
   ```typescript
   import product1Img from "../assets/images/product1.jpg";
   import product2Img from "../assets/images/product2.jpg";
   ```

3. **Use in products**:
   ```typescript
   {
     id: "1",
     name: "Product Name",
     image: product1Img, // Use imported image
     // ... other fields
   }
   ```

## Option 2: Using Public Folder

1. **Add images** to `frontend/public/images/` (create folder if needed)
   - Example: `frontend/public/images/product1.jpg`

2. **Use in products**:
   ```typescript
   {
     id: "1",
     name: "Product Name",
     image: "/images/product1.jpg", // Path from public folder
     // ... other fields
   }
   ```

## Option 3: Using URLs (Current)

Currently using Unsplash URLs. You can replace them with:
- Your own hosted images
- CDN URLs
- Image URLs from your backend

## Image Naming Convention

Recommended naming:
- `product-1.jpg`
- `product-2.jpg`
- Or: `headphones.jpg`, `watch.jpg`, etc.

## Image Size Recommendations

- **Product cards**: 500x500px or 800x800px
- **Product detail page**: 1000x1000px or larger
- **Format**: JPG for photos, PNG for transparent images, WebP for best compression

