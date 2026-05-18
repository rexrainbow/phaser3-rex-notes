var OnSelectGameObject = function(shell?: any, gameObject?: any) {
    shell.cameraController.setEnable(false);
    shell.setBindingTarget(gameObject);
}

var OnUnSelectGameObject = function(shell?: any) {
    shell.cameraController.setEnable(true);
    shell.clearBindingTarget();
}


export {
    OnSelectGameObject,
    OnUnSelectGameObject
}