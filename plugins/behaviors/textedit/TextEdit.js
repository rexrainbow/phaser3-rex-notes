import GetSceneObject from '../../utils/system/GetSceneObject.js';
import CreateInputTextFromText from './CreateInputText.js';

class TextEdit {
    constructor(gameObject) {
        this.gameObject = gameObject;
        this.scene = GetSceneObject(gameObject);

        this.inputText = undefined;
        this.boot();
    }

    boot() {
        if (this.gameObject.on) { // oops, bob object does not have event emitter
            this.gameObject.on('destroy', this.destroy, this);
        }

        return this;
    }

    shutdown() {
        this.close();
        this.gameObject = undefined;
        this.scene = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    open(config) {
        this.inputText = CreateInputTextFromText(this.gameObject, config);
        this.inputText.setFocus();
        this.gameObject.text = '';

        // Attach close event
        this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
        return this;
    }

    close() {
        if (!this.inputText) {
            return this;
        }

        this.gameObject.text = this.inputText.text;
        this.inputText.destroy();
        this.inputText = undefined;

        // Remove close event
        this.scene.input.keyboard.off('keydown-ENTER', this.close, this);
        return this;
    }

    get isOpened() {
        return (this.inputText !== undefined);
    }

    get text() {
        return (this.isOpened) ? this.inputText.text : this.gameObject.text;
    }
}

export default TextEdit;