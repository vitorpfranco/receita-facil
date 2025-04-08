import os
import json
import re
import xml.etree.ElementTree as ET
from PIL import Image
import requests
from io import BytesIO

def get_svg_dimensions(svg_path):
    """Extract width and height from an SVG file."""
    tree = ET.parse(svg_path)
    root = tree.getroot()
    
    viewbox = root.get('viewBox')
    if viewbox:
        _, _, width, height = map(float, viewbox.split())
        return width, height
    
    width = root.get('width')
    height = root.get('height')
    
    if width and height:
        width = float(re.sub(r'[^0-9.]', '', width))
        height = float(re.sub(r'[^0-9.]', '', height))
        return width, height
    
    return 300, 300

def get_image_dimensions(img_path):
    """Get dimensions of an image file (local or URL)."""
    if img_path.startswith(('http://', 'https://')):
        response = requests.get(img_path)
        img = Image.open(BytesIO(response.content))
    else:
        img = Image.open(img_path)
    return img.width, img.height

def resize_image_dimensions(width, height, fixed_height):
    """Calculate new dimensions maintaining aspect ratio."""
    ratio = fixed_height / height
    new_width = width * ratio
    return new_width, fixed_height

def combine_images_to_svg(images, fixed_height, spacing, output_path):
    """Combine images (PNG and SVG) into a single SVG file with PNG references."""
    image_data = []
    total_width = 0
    
    for img_path in images:
        if img_path.lower().endswith('.svg'):
            try:
                width, height = get_svg_dimensions(img_path)
                new_width, new_height = resize_image_dimensions(width, height, fixed_height)
                
                with open(img_path, 'r', encoding='utf-8') as f:
                    svg_content = f.read()
                
                image_data.append({
                    'type': 'svg',
                    'content': svg_content,
                    'path': img_path,
                    'width': new_width,
                    'height': new_height,
                    'original_width': width,
                    'original_height': height
                })
                
                total_width += new_width
            except Exception as e:
                print(f"Error processing SVG file {img_path}: {e}")
                continue
                
        else:
            try:
                width, height = get_image_dimensions(img_path)
                new_width, new_height = resize_image_dimensions(width, height, fixed_height)
                
                image_data.append({
                    'type': 'png',
                    'path': img_path,
                    'width': new_width,
                    'height': new_height
                })
                
                total_width += new_width
            except Exception as e:
                print(f"Error processing image file {img_path}: {e}")
                continue
    
    total_width += spacing * (len(image_data) - 1)
    
    svg = ET.Element('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'version': '1.1',
        'width': 'auto',
        'height': str(fixed_height),
        'viewBox': f'0 0 {total_width} {fixed_height}'
    })
    
    x_offset = 0
    for i, img in enumerate(image_data):
        if img['type'] == 'svg':
            scale_factor = fixed_height / img['original_height']
            
            g = ET.SubElement(svg, 'g', {
                'transform': f'translate({x_offset},0) scale({scale_factor})'
            })
            
            svg_content = img['content']
            inner_content = re.search(r'<svg[^>]*>(.*?)</svg>', svg_content, re.DOTALL)
            
            if inner_content:

                inner_svg_str = f'<root>{inner_content.group(1)}</root>'
                try:
                    inner_root = ET.fromstring(inner_svg_str)
                    for child in inner_root:
                        g.append(child)
                except ET.ParseError as e:
                    print(f"Error parsing inner SVG content from {img['path']}: {e}")
                    g.text = f"<!--SVG_CONTENT_PLACEHOLDER_{i}-->"
            
        else: 
            ET.SubElement(svg, 'image', {
                'href': img['path'],
                'x': str(x_offset),
                'y': '0',
                'width': str(img['width']),
                'height': str(img['height'])
            })
        
        x_offset += img['width'] + spacing
    
    try:
        tree = ET.ElementTree(svg)
        ET.register_namespace('', 'http://www.w3.org/2000/svg')
        ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
        
        with open(output_path, 'wb') as f:
            tree.write(f, encoding='utf-8', xml_declaration=True)
            
        with open(output_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        placeholder_replaced = False
        for i, img in enumerate(image_data):
            if img['type'] == 'svg':
                svg_content = img['content']
                inner_content = re.search(r'<svg[^>]*>(.*?)</svg>', svg_content, re.DOTALL)
                placeholder = f"<!--SVG_CONTENT_PLACEHOLDER_{i}-->"
                if inner_content and placeholder in content:
                    content = content.replace(placeholder, inner_content.group(1))
                    placeholder_replaced = True
        
        if placeholder_replaced:
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(content)
            
    except Exception as e:
        print(f"Error writing SVG file {output_path}: {e}")

def process_combinations(config_file, combinations_file):
    """Process image combinations according to the config and combinations files."""
    try:
        with open(config_file, "r") as file:
            config = json.load(file)
        
        with open(combinations_file, "r") as file:
            combinations_data = json.load(file)
    except Exception as e:
        print(f"Error reading configuration files: {e}")
        return
    
    input_folder = config["input_folder"]
    output_folder = config["output_folder"]
    collection_name = config["collection_name"]
    fixed_height = config.get("images_max_heigh", 100) 
    images_mapping = config["images"]
    spacing = config["spacing"]

    os.makedirs(output_folder, exist_ok=True)
    
    collection_output_folder = os.path.join(output_folder, collection_name)
    os.makedirs(collection_output_folder, exist_ok=True)

    total_combinations = len(combinations_data["combinations"])
    print(f"Processing {total_combinations} combinations...")
    
    for i, combination in enumerate(combinations_data["combinations"]):
        image_files = []
        for keyword in combination["images"]:
            if keyword not in images_mapping:
                print(f"⚠️ WARNING: Image key '{keyword}' not found in config!")
                continue
                
            img_path = images_mapping[keyword]
            if img_path.startswith(('http://', 'https://')):
                image_files.append(img_path)
            else:
                image_files.append(os.path.join(input_folder, img_path))
        
        output_name = f"{combination['output_name']}{f'-{collection_name}' if collection_name else ''}.svg"
        output_path = os.path.join(collection_output_folder, output_name)

        local_files = [f for f in image_files if not f.startswith(('http://', 'https://'))]
        all_files_exist = all(os.path.exists(img) for img in local_files)
        
        if all_files_exist and image_files:
            combine_images_to_svg(image_files, fixed_height, spacing, output_path)
            print(f"[{i+1}/{total_combinations}] Created: {output_name}")
        else:
            missing_files = [f for f in local_files if not os.path.exists(f)]
            print(f"⚠️ ERROR: Some images from '{combination['output_name']}' were not found: {missing_files}")

process_combinations("config.json", "combinations.json")