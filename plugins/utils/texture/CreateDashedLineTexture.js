var CreateDashedLineTexture = function (scene, key, width, color, k) {
    if (width === undefined) {
        width = 10;
    }
    if (color === undefined) {
        color = 0xffffff;
    }
    if (k === undefined) {
        k = 0.5;
    }

    var height = 2;
    scene.add.graphics()
        .fillStyle(color)
        .fillRect(0, 0, (width * k), height)
        .generateTexture(key, width, height)
        .destroy();
}
export default CreateDashedLineTexture;