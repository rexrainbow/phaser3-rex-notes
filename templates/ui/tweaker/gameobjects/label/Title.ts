import Label from '../../../label/Label';
import BuildLabelConfig from '../../../utils/build/BuildLabelConfig';
import DeepClone from '../../../../../plugins/utils/object/DeepClone';

class Title extends Label {
    resetDisplayContent: any;
    type: any;

    constructor(scene?: any, config?: any) {
        config = BuildLabelConfig(scene, config);
        super(scene, config);
        this.type = 'rexTweaker.Title';
    }

    setTitle(config?: any) {
        config = (config) ? DeepClone(config) : {};

        if (config.hasOwnProperty('text')) {
            // Do nothing
        } else if (config.hasOwnProperty('title')) {
            config.text = config.title;
        } else {
            config.text = '';
        }

        this.resetDisplayContent(config);

        return this;
    }
}

export default Title;