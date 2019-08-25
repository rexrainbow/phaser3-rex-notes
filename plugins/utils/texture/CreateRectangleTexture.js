var CreateRectangleTexture = function (scene, key, width, height, color) {
    if (height === undefined) {
        height = width;
    }
    if (color === undefined) {
        color = 0xffffff;
    }
    scene.add.graphics()
        .fillStyle(color)
        .fillRect(0, 0, width, height)
        .generateTexture(key, width, height)
        .destroy();
}
export default CreateRectangleTexture;