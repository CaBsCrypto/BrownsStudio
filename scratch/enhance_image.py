from PIL import Image, ImageEnhance, ImageFilter
import os

def enhance_image(input_path, output_path):
    print(f"Enhancing {input_path}...")
    img = Image.open(input_path)
    
    # 1. Convert to RGB if needed
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    
    # 2. Enhance Color (Saturation)
    enhancer = ImageEnhance.Color(img)
    img = enhancer.enhance(1.1)
    
    # 3. Enhance Contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.15)
    
    # 4. Enhance Brightness
    enhancer = ImageEnhance.Brightness(img)
    img = enhancer.enhance(1.05)
    
    # 5. Enhance Sharpness
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(2.0)
    
    # 6. Subtle Unsharp Mask for finer detail
    img = img.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    
    # 7. Save with high quality
    img.save(output_path, "JPEG", quality=95, subsampling=0)
    print(f"Saved to {output_path}")

if __name__ == "__main__":
    src = r"c:\Users\MGC\Desktop\Dev\BrownsStudio\public\cristian_v2.jpg"
    dst = r"c:\Users\MGC\Desktop\Dev\BrownsStudio\public\cristian.jpeg"
    enhance_image(src, dst)
