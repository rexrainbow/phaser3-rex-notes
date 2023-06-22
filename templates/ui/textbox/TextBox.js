import TextBoxBase from './Base.js';
import TitleLabel from '../titlelabel/TitleLabel.js';

class TextBox extends TextBoxBase(TitleLabel) {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (!config.hasOwnProperty('layoutMode')) {
            config.layoutMode = 1;
        }

        super(scene, config);
    }
}

export default TextBox;