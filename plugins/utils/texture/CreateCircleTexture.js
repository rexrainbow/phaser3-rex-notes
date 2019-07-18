var CreateCircleTexture = function (scene, key, width, color) {
    if (color === undefined) {
        color = 0xffffff;
    }
    var r = width / 2;
    scene.add.graphics()
        .fillStyle(color)
        .fillCircle(r, r, r)
        .generateTexture(key, width, width)
        .destroy();
}
export default CreateCircleTexture;