import TitleLabel from '../titlelabel/TitleLabel';
import BuildTitleLabelConfig from '../utils/build/BuildTitleLabelConfig';

class SimpleTitleLabel extends TitleLabel {
    getChildren: any;
    type: any;

    constructor(scene?: any, config?: any, creators?: any) {
        config = BuildTitleLabelConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleTitleLabel';
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

export default SimpleTitleLabel;