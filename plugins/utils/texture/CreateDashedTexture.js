var CreateDashedTexture = function (scene, key, width, k, color) {
    if (width === undefined) {
        width = 10;
    }
    if (k === undefined) {
        k = 0.5;
    }
    if (color === undefined) {
        color = 0xffffff;
    }

    var height = 2;
    scene.add.graphics()
        .fillStyle(color)
        .fillRect(0, 0, (width * k), height)
        .generateTexture(key, width, height)
        .destroy();
}
export default CreateDashedTexture;