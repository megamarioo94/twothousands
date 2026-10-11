"""Evidence-bounded Majestic Theatre blockout for review only.

This is not a measured reconstruction. It deliberately models only the facade-facing
massing described in docs/history/MAJESTIC_EVIDENCE_REGISTER.md.
"""

import bpy
import math
import os
from mathutils import Vector

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "prototype", "majestic-v1", "assets", "blockout")
os.makedirs(OUT, exist_ok=True)


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.materials, bpy.data.cameras, bpy.data.lights):
        for block in datablocks:
            datablocks.remove(block)


def material(name, color):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = 0.82
    return mat


def box(name, location, dimensions, mat, bevel=0.07):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        modifier = obj.modifiers.new("soft architectural edges", "BEVEL")
        modifier.width = bevel
        modifier.segments = 2
    obj.data.materials.append(mat)
    return obj


def cylinder(name, location, radius, depth, mat):
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=radius, depth=depth, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.data.materials.append(mat)
    bevel = obj.modifiers.new("soft architectural edges", "BEVEL")
    bevel.width = 0.045
    bevel.segments = 2
    return obj


def look_at(obj, target):
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()


clear_scene()
white = material("matte warm white", (0.92, 0.90, 0.84))
paper = material("tile study", (0.76, 0.68, 0.56))
dark = material("door shadow", (0.12, 0.11, 0.09))
ground = material("ground", (0.78, 0.74, 0.66))

# Deliberately shallow massing: facade and a limited side volume only.
box("main facade mass", (0, 0.18, 2.6), (11.4, 2.2, 5.2), white)
box("central art deco tower", (0, -0.08, 4.5), (3.4, 2.45, 9.0), white)
box("left stepped roof mass", (-3.75, 0.18, 5.75), (3.8, 2.2, 1.2), white)
box("right stepped roof mass", (3.75, 0.18, 5.75), (3.8, 2.2, 1.2), white)

# Street-facing features, simplified only for silhouette and hotspot placement.
box("entrance canopy", (0, -1.44, 2.0), (10.6, 0.72, 0.46), white)
for x in (-4.55, -1.75, 1.75, 4.55):
    cylinder("facade column", (x, -1.32, 1.45), 0.42, 2.9, white)
for x in (-2.65, 2.65):
    box("opera tile panel", (x, -1.18, 5.1), (1.28, 0.14, 3.3), paper, 0.025)
for x in (-1.15, 1.15):
    box("tall window", (x, -1.19, 4.0), (0.62, 0.12, 3.0), dark, 0.01)
for x in (-3.8, -1.3, 1.3, 3.8):
    box("door opening", (x, -1.22, 0.94), (1.25, 0.14, 1.65), dark, 0.01)
box("front steps", (0, -1.88, 0.18), (10.7, 1.7, 0.36), ground, 0.03)

# Limit the unverified back with a neutral cut plane and no decorative claim.
box("evidence boundary rear plane", (0, 1.22, 2.5), (11.4, 0.08, 5.0), white, 0)

# Ground plane and lighting.
box("ground plane", (0, 0, -0.18), (26, 22, 0.2), ground, 0)
bpy.ops.object.light_add(type="AREA", location=(-5, -7, 12))
key = bpy.context.object
key.data.energy = 1000
key.data.shape = "DISK"
key.data.size = 8
look_at(key, (0, 0, 3))
bpy.ops.object.light_add(type="AREA", location=(7, 1, 8))
fill = bpy.context.object
fill.data.energy = 520
fill.data.size = 7
look_at(fill, (0, 0, 3))

# Camera remains outside undocumented rear views.
bpy.ops.object.camera_add()
camera = bpy.context.object
bpy.context.scene.camera = camera
camera.data.type = "ORTHO"
camera.data.ortho_scale = 14.5

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x = 900
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.film_transparent = False
scene.world.color = (0.075, 0.07, 0.055)
scene.render.use_file_extension = True
scene.render.use_freestyle = True
scene.view_layers[0].freestyle_settings.linesets[0].linestyle.color = (0.08, 0.075, 0.06)
scene.view_layers[0].freestyle_settings.linesets[0].linestyle.thickness = 1.15

views = [("far_left", -56), ("left", -28), ("front", 0), ("right", 28), ("far_right", 56)]
for label, degrees in views:
    radians = math.radians(degrees)
    camera.location = (16 * math.sin(radians), -16 * math.cos(radians), 7.0)
    look_at(camera, (0, -0.05, 3.25))
    scene.render.filepath = os.path.join(OUT, f"majestic-blockout-{label}.png")
    bpy.ops.render.render(write_still=True)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "majestic-blockout-v1.blend"))
print("RENDERED", OUT)
