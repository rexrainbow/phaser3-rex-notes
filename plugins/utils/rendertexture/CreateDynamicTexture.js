var DynamicTexture = Phaser.Textures.DynamicTexture;
var UUID = Phaser.Utils.String.UUID;

var CreateDynamicTexture = function (scene, width, height) {
    if (width === undefined) {
        width = 2;
    }
    if (height === undefined) {
        height = 2;
    }
    var dt = new DynamicTexture(scene.sys.textures, UUID(), width, height);
    return dt;
}

export default CreateDynamicTexture;