var MouseWheelZoom = function (camera) {
    var scene = this.scene;

    var onWheeling = function (pointer, currentlyOver, dx, dy, dz, event) {
        camera.zoom += ((dy < 0) ? 1 : -1) * 0.05;
    }

    scene.input.on('wheel', onWheeling, this);

    this.once('destroy', function () {
        scene.input.off('wheel', onWheeling, this);
    });

}

export default MouseWheelZoom;