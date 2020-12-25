import Label from '../label/Label.js';
import TextPage from '../../../plugins/textpage.js';
import TextTyping from '../../../plugins/texttyping.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextBox extends Label {
    constructor(scene, config) {
        if (config === undefined) {
            config = {
                text: createDefaultTextObject(scene)
            }
        }

        super(scene, config);
        this.type = 'rexTextBox';

        var text = this.childrenMap.text;
        this.page = new TextPage(text, GetValue(config, 'page', undefined));
        this.typing = new TextTyping(text, GetValue(config, 'type', undefined));
        this.typing
            .on('complete', this.onPageEnd, this)
            .on('type', this.onType, this);

        this.textWidth = text.width;
        this.textHeight = text.height;
    }

    start(text, speed) {
        this.page.setText(text);
        if (speed !== undefined) {
            this.setTypeSpeed(speed);
        }
        this.typeNextPage();
        return this;
    }

    typeNextPage() {
        if (!this.page.isLastPage) {
            var txt = this.page.getNextPage();
            this.typing.start(txt);
        } else {
            this.emit('complete');
        }
        return this;
    }

    pause() {
        this.typing.pause();
        return this;
    }

    resume() {
        this.typing.resume();
        return this;
    }

    stop(showAllText) {
        this.typing.stop(showAllText);
        return this;
    }

    setTypeSpeed(speed) {
        this.typing.setTypeSpeed(speed);
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

    onType() {
        var text = this.childrenMap.text;
        if ((this.textWidth !== text.width) || (this.textHeight !== text.height)) {
            this.textWidth = text.width;
            this.textHeight = text.height;
            this.getTopmostSizer().layout();
        }
        this.emit('type');
    }

    onPageEnd() {
        this.emit('pageend');
    }

}

var createDefaultTextObject = function (scene) {
    return scene.add.text(0, 0, '', {
        wordWrap: {
            width: 200,
        },
        maxLines: 5
    });
};

export default TextBox;