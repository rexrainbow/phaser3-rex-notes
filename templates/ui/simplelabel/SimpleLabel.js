import Label from '../label/Label.js';
import BuildLabelConfig from '../utils/build/BuildLabelConfig.js';
import IsGameObject from '../../../plugins/utils/system/IsGameObject.js';

class SimpleLabel extends Label {
    constructor(scene, config, creators) {
        config = BuildLabelConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleLabel';
    }

    setActiveState(enable) {
        RunMethod(this.childrenMap, 'setActiveState', enable);
        return this;
    }

    setHoverState(enable) {
        RunMethod(this.childrenMap, 'setHoverState', enable);
        return this;
    }

    setDisableState(enable) {
        RunMethod(this.childrenMap, 'setDisableState', enable);
        return this;
    }

}

var RunMethod = function (childrenMap, methodName, ...args) {
    for (var key in childrenMap) {
        var gameObject = childrenMap[key];
        if (!IsGameObject(gameObject) || !gameObject[methodName]) {
            continue;
        }

        gameObject[methodName](...args);
    }
}

export default SimpleLabel;