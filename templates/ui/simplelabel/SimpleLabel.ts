import Label from '../label/Label';
import BuildLabelConfig from '../utils/build/BuildLabelConfig';

class SimpleLabel extends Label {
    getChildren: any;
    type: any;

    constructor(scene?: any, config?: any, creators?: any) {
        config = BuildLabelConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleLabel';
    }

    setActiveState(enable?: any) {
        RunMethod(this.getChildren(), 'setActiveState', enable);
        return this;
    }

    setHoverState(enable?: any) {
        RunMethod(this.getChildren(), 'setHoverState', enable);
        return this;
    }

    setDisableState(enable?: any) {
        RunMethod(this.getChildren(), 'setDisableState', enable);
        return this;
    }

}

var RunMethod = function(children?: any, methodName?: any, enable?: any) {
    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var gameObject = children[i];
        if (gameObject && gameObject[methodName]) {
            gameObject[methodName](enable);
        }
    }
}

export default SimpleLabel;