import { Textures as PhaserTextures } from 'phaser';
const DynamicTexture = PhaserTextures.DynamicTexture;

var CreateDynamicTexture = function (scene, width, height) {
    if (width === undefined) {
        width = 2;
    }
    if (height === undefined) {
        height = 2;
    }
    var dt = new DynamicTexture(scene.sys.textures, null, width, height);
    return dt;
}

export default CreateDynamicTexture;