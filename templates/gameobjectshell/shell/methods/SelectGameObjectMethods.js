var OnSelectGameObject = function (shell, gameObject) {
    var camera = shell.scene.cameras.main;
    if (shell.lastCameraScrollX == undefined) {
        shell.lastCameraScrollX = camera.scrollX;
        shell.lastCameraScrollY = camera.scrollY;
    }

    camera.centerOn(gameObject.x, gameObject.y);
    shell.setBindingTarget(gameObject);
}

var OnUnSelectGameObject = function (shell) {
    if (shell.lastCameraScrollX !== undefined) {
        var camera = shell.scene.cameras.main;
        camera.setScroll(shell.lastCameraScrollX, shell.lastCameraScrollY)
        shell.lastCameraScrollX = undefined;
        shell.lastCameraScrollY = undefined;
    }

    shell.clearBindingTarget();
}


export {
    OnSelectGameObject,
    OnUnSelectGameObject
}