import TextPage from '../textpage/TextPage.js';
import TextTyping from '../texttyping/TextTyping.js';

const GetValue = Phaser.Utils.Objects.GetValue;

var TextBoxBase = function (GOClass, type) {
    if (type === undefined) {
        type = 'rexTextBox';
    }
    class TextBox extends GOClass {
        constructor(scene, config) {
            super(scene, config);
            this.type = type;

            // childrenMap must have 'text' element
            var text = this.childrenMap.text;
            this.page = new TextPage(text, GetValue(config, 'page', undefined));
            this.typing = new TextTyping(text, GetValue(config, 'typing', config.type));
            this.typing
                .on('complete', this.onPageEnd, this)
                .on('type', this.onType, this)
                .on('typechar', this.onTypeChar, this)

            this.textWidth = text.width;
            this.textHeight = text.height;
        }

        start(text, speed) {
            this.page.setText(text);
            if (speed !== undefined) {
                this.setTypingSpeed(speed);
            }
            this.emit('start');
            this.typeNextPage();
            return this;
        }

        typeNextPage() {
            if (!this.isLastPage) {
                var txt = this.page.getNextPage();
                this.typing.start(txt);
            } else {
                this.emit('complete');
            }
            return this;
        }

        pause() {
            if (this.isTyping) {
                this.typing.pause();
                this.emit('pause');
            }
            return this;
        }

        resume() {
            if (!this.isTyping) {
                this.emit('resume');
                this.typing.resume();
            }
            return this;
        }

        stop(showAllText) {
            this.typing.stop(showAllText);
            return this;
        }

        showLastPage() {
            this.typing.stop();
            this.page.showLastPage();
            this.emit('type');
            this.onPageEnd();
            return this;
        }

        setTypeSpeed(speed) {
            this.typing.setTypingSpeed(speed);
            return this;
        }

        setTypingSpeed(speed) {
            this.typing.setTypingSpeed(speed);
            return this;
        }

        get isTyping() {
            return this.typing.isTyping;
        }

        get isLastPage() {
            return this.page.isLastPage;
        }

        get isFirstPage() {
            return this.page.isFirstPage;
        }

        get pageCount() {
            return this.page.pageCount;
        }

        get pageIndex() {
            return this.page.pageIndex;
        }

        get typingSpeed() {
            return this.typing.speed;
        }

        onType() {
            var text = this.childrenMap.text;
            if ((this.textWidth !== text.width) || (this.textHeight !== text.height)) {
                this.textWidth = text.width;
                this.textHeight = text.height;
                this.getTopmostSizer().layout();
            }
            this.emit('type');
        }

        onTypeChar(char) {
            this.emit('typechar', char);
        }

        onPageEnd() {
            var isLastPage = this.isLastPage;

            this.emit('pageend');
            /*
            Might enter this method immediately, if invoking typeNextPage() in this 'pageend' event.
            */

            if (isLastPage) {
                this.emit('complete');
            }
        }

    }

    return TextBox;
}

export default TextBoxBase;