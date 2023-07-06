import Label from '../label/Label.js';
import BuildLabelConfig from '../utils/build/BuildLabelConfig.js';

class SimpleLabel extends Label {
    constructor(scene, config, creators) {
        config = BuildLabelConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleLabel';
    }

    setActiveState(enable) {
        RunMethod(this.getChildren(), 'setActiveState', enable);
        return this;
    }

    setHoverState(enable) {
        RunMethod(this.getChildren(), 'setHoverState', enable);
        return this;
    }

    setDisableState(enable) {
        RunMethod(this.getChildren(), 'setDisableState', enable);
        return this;
    }

}

var RunMethod = function (children, methodName, enable) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var gameObject = children[i];
        if (gameObject && gameObject[methodName]) {
            gameObject[methodName](enable);
        }
    }
}

export default SimpleLabel;