var OnSelectGameObject = function (shell, gameObject) {
    shell.cameraController.setEnable(false);
    shell.setBindingTarget(gameObject);
}

var OnUnSelectGameObject = function (shell) {
    shell.cameraController.setEnable(true);
    shell.clearBindingTarget();
}


export {
    OnSelectGameObject,
    OnUnSelectGameObject
}