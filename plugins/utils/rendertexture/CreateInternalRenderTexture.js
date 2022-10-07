const RT = Phaser.GameObjects.RenderTexture;

var CreateInternalRenderTexture = function (scene, x, y, width, height) {
    var rt = new RT(scene, x, y, width, height);
    rt.setOrigin(0.5);
    return rt;
}

export default CreateInternalRenderTexture;