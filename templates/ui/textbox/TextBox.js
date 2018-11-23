import Label from '../label/Label.js';
import TextPage from 'rexPlugins/textpage.js';
import TextTyping from 'rexPlugins/texttyping.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextBox extends Label {
    constructor(scene, config) {
        if (config === undefined) {
            config = {
                text: createDefaultTextObject(scene)
            }
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexTextBox';

        var text = this.childrenMap.text;
        this.page = new TextPage(text, GetValue(config, 'page', undefined));
        this.typing = new TextTyping(text, GetValue(config, 'type', undefined));
        this.typing
            .on('complete', this.typeNextPage, this)
            .on('type', this.onTextChange, this);

        this.textWidth = text.width;
        this.textHeight = text.height;
    }

    start(text, speed) {
        this.page.setText(text);
        if (speed !== undefined) {
            this.typing.setTypeSpeed(speed);
        }
        this.typeNextPage();
    }

    typeNextPage() {
        if (!this.page.isLastPage) {
            var txt = this.page.getNextPage();
            this.typing.start(txt);
        } else {
            this.emit('complete');
        }
    }

    onTextChange() {
        var text = this.childrenMap.text;
        if ((this.textWidth === text.width) && (this.textHeight === text.height)) {
            return;
        }
        this.textWidth = text.width;
        this.textHeight = text.height;
        this.getTopmostSizer().layout();
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