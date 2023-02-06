import Label from '../label/Label.js';
import BuildDisplayLabelConfig from '../utils/build/BuildDisplayLabelConfig.js';

class SimpleLabel extends Label {
    constructor(scene, config) {
        config = BuildDisplayLabelConfig(scene, config);
        super(scene, config);
        this.type = 'rexSimpleLabel';
    }
}

export default SimpleLabel;