import IsSceneObject from '../../../../utils/system/IsSceneObject.js';

var SetClickTarget = function (target) {
    if (IsSceneObject(target)) {
        this.clickEE = target.input;
    } else {  // Assume that target is a game object
        this.clickEE = target.setInteractive();
    }
    return this;
}

export default SetClickTarget;