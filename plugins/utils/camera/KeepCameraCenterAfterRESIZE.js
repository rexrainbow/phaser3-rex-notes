var KeepCameraCenterAfterRESIZE = function (scene, cameras) {
    if (!cameras) {
        cameras = scene.cameras.cameras;
    }

    scene.scale.on('resize', function (gameSize, baseSize, displaySize, previousWidth, previousHeight) {
        var camera;
        var scrollXOffset = -(gameSize.width - previousWidth) / 2;
        var scrollYOffset = - (gameSize.height - previousHeight) / 2;
        for (var i = 0, cnt = cameras.length; i < cnt; i++) {
            camera = cameras[i];
            camera.scrollX += scrollXOffset;
            camera.scrollY += scrollYOffset;
        }
    })
}

export default KeepCameraCenterAfterRESIZE;