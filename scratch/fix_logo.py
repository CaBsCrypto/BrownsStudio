from rembg import remove
from PIL import Image
import io
import os

def process_logo():
    input_path = "app/icon.png"
    output_path = "app/icon.png"
    
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found")
        return

    print(f"Processing logo for transparency...")
    
    with open(input_path, 'rb') as i:
        input_image = i.read()
    
    output_image = remove(input_image)
    
    # Save back to same location
    with open(output_path, 'wb') as o:
        o.write(output_image)
        
    print(f"Success! Logo is now transparent.")

if __name__ == "__main__":
    process_logo()
