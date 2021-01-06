## Texture atlas

### Texture-packer

[Texture-packer](https://www.codeandweb.com/texturepacker)

### Free texture packer

[Free texture packer](http://free-tex-packer.com/), [Web app](http://free-tex-packer.com/app/)

### Leshy SpriteSheet Tool

[Leshy SpriteSheet Tool](https://www.leshylabs.com/apps/sstool/)

Export to [JSON-TP-Hash](https://www.leshylabs.com/blog/posts/2013-12-03-Leshy_SpriteSheet_Tool.html#json-tp-hash)

### Aseprite

[Aseprite](https://www.aseprite.org/)

1. Go to "File - Export Sprite Sheet"
1. On the **Layout** tab:
   1. Set the "Sheet type" to "Packed"
   1. Set the "Constraints" to "None"
   1. Check the "Merge Duplicates" checkbox
1. On the **Sprite** tab:
    1. Set "Layers" to "Visible layers"
    1. Set "Frames" to "All frames", unless you only wish to export a sub-set of tags
1. On the **Borders** tab:
    1. Check the "Trim Sprite" and "Trim Cells" options
    1. Ensure "Border Padding", "Spacing" and "Inner Padding" are all > 0 (1 is usually enough)    
1. On the **Output** tab:
    1. Check "Output File", give your image a name and make sure you choose "png files" as the file type
    1. Check "JSON Data" and give your json file a name
    1. The JSON Data type can be either a Hash or Array, Phaser doesn't mind.
    1. Make sure "Tags" is checked in the Meta options
    1. In the "Item Filename" input box, make sure it says just "{frame}" and nothing more.
1. Click export

Tested with Aseprite 1.2.25