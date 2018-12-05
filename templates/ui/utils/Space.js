var Space = function (scene, width, height) {
    if (width === undefined) {
        width = 0;
    }
    if (height === undefined) {
        height = 0;
    }
    return scene.add.zone(0, 0, width, height);
}
export default Space;