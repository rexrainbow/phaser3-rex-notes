import BobBase from '../../gameobject/gomanager/BobBase.js';

class TextBob extends BobBase {
    setText(text) {
        this.gameObject.setText(text);
        return this;
    }
}

export default TextBob;