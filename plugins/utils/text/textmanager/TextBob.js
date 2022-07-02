import BobBase from '../../gameobject/gomanager/BobBase.js';
import TextTyping from '../../../behaviors/texttyping/TextTyping.js';

class TextBob extends BobBase {
    setText(text) {
        this.gameObject.setText(text);
        return this;
    }

    typing(text, speed) {
        var gameObject = this.gameObject;
        if (!gameObject._typing) {
            gameObject._typing = new TextTyping(gameObject);
        }

        gameObject._typing.start(text, speed)
        return this;
    }
}

export default TextBob;