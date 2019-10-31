var Space = function (scene, width, height) {
    if ((width === undefined) || (width <= 1)) {
        width = 1;
    }
    if ((height === undefined) || (height <= 1)) {
        height = 1;
    }
    return scene.add.zone(0, 0, width, height);
}
export default Space;