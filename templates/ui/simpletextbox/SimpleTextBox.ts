import TextBox from '../textbox/TextBox';
import BuildTitleLabelConfig from '../utils/build/BuildTitleLabelConfig';

class SimpleTextBox extends TextBox {
    constructor(scene?: any, config?: any, creators?: any) {
        config = BuildTitleLabelConfig(scene, config, creators);
        super(scene, config);
    }
}

export default SimpleTextBox;