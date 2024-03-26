import TextBox from '../textbox/TextBox.js';
import BuildTitleLabelConfig from '../utils/build/BuildTitleLabelConfig.js';

class SimpleTextBox extends TextBox {
    constructor(scene, config, creators) {
        config = BuildTitleLabelConfig(scene, config, creators);
        super(scene, config);
    }
}

export default SimpleTextBox;