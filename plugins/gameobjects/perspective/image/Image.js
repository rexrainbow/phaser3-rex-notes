const GetValue = Phaser.Utils.Objects.GetValue;
const GenerateGridVerts = Phaser.Geom.Mesh.GenerateGridVerts;

class Image extends Phaser.GameObjects.Mesh {
    constructor(scene, x, y, texture, frame, config) {
        super(scene, x, y, texture, frame);
        this.hideCCW = false;

        var textureFrame = this.texture.get(frame);
        var frameWidth = textureFrame.cutWidth,
            frameHeight = textureFrame.cutHeight;
        var minEdge = Math.min(frameWidth, frameHeight);
        var girdWidth = GetValue(config, 'gridWidth', 32);
        var girdHeight = GetValue(config, 'girdHeight', girdWidth);
        GenerateGridVerts({
            mesh: this,
            width: frameWidth / minEdge,
            height: frameHeight / minEdge,
            widthSegments: Math.ceil(frameWidth / girdWidth),
            heightSegments: Math.ceil(frameHeight / girdHeight)
        })

        var renderer = scene.sys.renderer;
        this.setPerspective(renderer.width, renderer.height, 90);
        this.panZ(1);
    }
}

export default Image;