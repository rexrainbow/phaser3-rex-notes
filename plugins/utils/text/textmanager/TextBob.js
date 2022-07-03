import BobBase from '../../gameobject/gomanager/BobBase.js';
import TextTyping from '../../../behaviors/texttyping/TextTyping.js';

class TextBob extends BobBase {
    setText(text) {
        this.gameObject.setText(text);
        return this;
    }

    setTypingSpeed(speed) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        }
        gameObject.typing.setTypeSpeed(speed);
        return this;
    }

    typing(text, speed) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        }

        gameObject.typing.start(text, speed)
        return this;
    }
}

export default TextBob;