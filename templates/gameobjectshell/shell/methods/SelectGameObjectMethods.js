var OnSelectGameObject = function (shell, gameObject) {
    shell.setBindingTarget(gameObject);
}

var OnUnSelectGameObject = function (shell) {
    shell.clearBindingTarget();
}


export {
    OnSelectGameObject,
    OnUnSelectGameObject
}