import IsSceneObject from '../../../../utils/system/IsSceneObject';

var SetClickTarget = function(target?: any) {
    this.clickTarget = target;

    if (!target) {
        this.clickEE = null;
    } else if (IsSceneObject(target)) {
        this.clickEE = target.input;
    } else {  // Assume that target is a gameObject
        this.clickEE = target.setInteractive();
    }

    return this;
}

export default SetClickTarget;