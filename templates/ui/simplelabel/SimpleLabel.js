import Label from '../label/Label.js';
import BuildDisplayLabelConfig from '../utils/build/BuildDisplayLabelConfig.js';

class SimpleLabel extends Label {
    constructor(scene, config, creators) {
        config = BuildDisplayLabelConfig(scene, config, creators);
        super(scene, config);
        this.type = 'rexSimpleLabel';
    }
}

export default SimpleLabel;