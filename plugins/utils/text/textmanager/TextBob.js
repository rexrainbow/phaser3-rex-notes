import BobBase from '../../gameobject/gomanager/BobBase.js';
import TextTyping from '../../../behaviors/texttyping/TextTyping.js';

class TextBob extends BobBase {
    clearText() {
        this.gameObject.setText('');
        return this;
    }

    appendText(text) {
        this.gameObject.setText(this.gameObject.text + text);
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

    clearTyping() {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        } else {
            gameObject.typing.start('');
        }
        return this;
    }

    typing(text, speed) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        }

        if (speed !== undefined) {
            gameObject.typing.setTypeSpeed(speed);
        }

        gameObject.typing.appendText(text);
        return this;
    }

    getTypingTask() {
        var typing = this.gameObject.typing;
        if (typing && typing.isTyping) {
            return typing;
        }
        return null;
    }
}

export default TextBob;