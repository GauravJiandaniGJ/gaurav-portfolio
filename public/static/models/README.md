# 3D Models for Paris Immersive Experience

This directory contains GLTF/GLB models for the realistic 3D Paris theme.

## Required Models

### 1. Eiffel Tower (`eiffel-tower.glb`)
**Recommended Source:** [Sketchfab - Eiffel Tower by Johnson Martin](https://sketchfab.com/3d-models/eiffel-tower-6830e60d2c1048f2a33e92679664f652)
- License: CC Attribution
- Download as GLB format
- Rename to `eiffel-tower.glb`

**Alternative Sources:**
- [Eiffel Tower, Paris, France by Brian Trepanier](https://sketchfab.com/3d-models/eiffel-tower-paris-france-a68b9ffb898d4aa7a44505926a536ce3) - CC Attribution
- [Low Poly Eiffel Tower by Benedico2001](https://sketchfab.com/3d-models/low-poly-eiffel-tower-9aef63523ee34d718522e9f012661589) - CC Attribution (lighter weight)

### 2. Electric car (`car.glb`)
**Recommended Source:** [Sketchfab - Electric car by Gest.lt](https://sketchfab.com/3d-models/electric-car-f3785071e9244d83ba311b7da48a1085)
- License: CC Attribution
- Download as GLB format
- Rename to `car.glb`

**Alternative Sources:**
- [Xiaomi Electric car 4 by mmaarriioo](https://sketchfab.com/3d-models/xiaomi-electric-car-4-e53ebaf78add4735887023db3a105d1c) - CC Attribution

## How to Download from Sketchfab

1. Create a free Sketchfab account (if you don't have one)
2. Go to the model page
3. Click the "Download 3D Model" button
4. Select "glTF" or "GLB" format
5. Download and extract the file
6. Place the `.glb` file in this directory with the correct name

## File Size Recommendations

| Model | Target Size | Max Recommended |
|-------|-------------|-----------------|
| eiffel-tower.glb | 2-3 MB | 5 MB |
| car.glb | 300-500 KB | 1 MB |

## Optimizing Large Models

If your models are too large, you can optimize them using:

1. **gltf-transform** (CLI tool):
   ```bash
   npx @gltf-transform/cli optimize input.glb output.glb --compress draco
   ```

2. **gltfpack** (CLI tool):
   ```bash
   gltfpack -i input.glb -o output.glb
   ```

3. **Blender** (GUI):
   - Import the model
   - Apply Decimate modifier to reduce polygons
   - Export as GLB with Draco compression

## Fallback Behavior

If models fail to load (missing files or network errors), the scene will automatically fall back to procedural 3D primitives. The experience will still work, just with simpler geometric shapes.

## License Attribution

When using CC-BY licensed models, include attribution in your project. Example:
- "Eiffel Tower" by Johnson Martin (https://sketchfab.com/Johnson-Martin) is licensed under CC BY 4.0
- "Electric car" by Gest.lt (https://sketchfab.com/gestLT) is licensed under CC BY 4.0
