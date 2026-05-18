import BobBase from '../../gameobject/gomanager/bobbase/BobBase';
import TextTyping from '../../../behaviors/texttyping/TextTyping';

const IsTyping = false;

class TextBob extends BobBase {
    gameObject: any;

    setGO(gameObject?: any, name?: any) {
        super.setGO(gameObject, name);
        gameObject.setData('typing', !IsTyping);
        return this;
    }

    clearText() {
        this.gameObject.setText('');
        return this;
    }

    appendText(text?: any) {
        this.gameObject.setText(this.gameObject.text + text);
        return this;
    }

    setTypingSpeed(speed?: any) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        }
        gameObject.typing.setTypingSpeed(speed);
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

    typing(text?: any, speed?: any) {
        var gameObject = this.gameObject;
        if (!gameObject.typing) {
            gameObject.typing = new TextTyping(gameObject);
        }

        if (speed !== undefined) {
            gameObject.typing.setTypingSpeed(speed);
        }

        gameObject.setData('typing', IsTyping);
        gameObject.typing
            .once('complete', function() {
                gameObject.setData('typing', !IsTyping);
            })
            .appendText(text)

        return this;
    }
}

export default TextBob;