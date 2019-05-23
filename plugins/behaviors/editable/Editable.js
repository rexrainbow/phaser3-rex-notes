import GetSceneObject from '../../utils/system/GetSceneObject.js';
import CreateInputTextFromText from './CreateInputText.js';

class Editable {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.inputText = undefined;
    }

    open() {
        this.inputText = CreateInputTextFromText(this.gameObject);
        this.gameObject.text = '';
        return this;
    }

    close() {
        if (!this.inputText) {
            return this;
        }

        this.gameObject.text = this.inputText.text;
        this.inputText.destroy();
        this.inputText = undefined;
        return this;
    }
}

export default Editable;