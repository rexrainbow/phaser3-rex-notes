import TextBoxBase from './Base';
import TitleLabel from '../titlelabel/TitleLabel';

class TextBox extends TextBoxBase(TitleLabel) {
    constructor(scene?: any, config?: any) {
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