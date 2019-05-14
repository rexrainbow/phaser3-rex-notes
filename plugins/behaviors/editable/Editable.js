import CreateInputTextFromText from './CreateInputText.js';

class Editable {
    constructor(gameObject, config) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.inputText = undefined;
    }

    open() {
        this.inputText = CreateInputTextFromText(this.gameObject);
        return this;
    }

    close() {
        if (this.inputText) {
            this.inputText.destroy();
            this.inputText = undefined;
        }
        return this;
    }
}

export default Editable;