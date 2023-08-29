import Scrollable from '../utils/scrollable/Scrollable.js';
import CanvasInput from '../canvasinput/CanvasInput.js';
import InjectProperties from './InjectProperties.js';
import SetTextMethods from './SetTextMethods.js';


const GetValue = Phaser.Utils.Objects.GetValue;

class TextAreaInput extends Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create inputText
        var inputTextConfig = GetValue(config, 'inputText');
        if (inputTextConfig === undefined) {
            inputTextConfig = {};
        }
        inputTextConfig.textArea = true;
        var inputText = new CanvasInput(scene, inputTextConfig);
        scene.add.existing(inputText); // Important: Add to display list for touch detecting
        // Inject properties for scrollable interface
        InjectProperties(inputText);

        // Fill config of scrollable
        var expandInputTextWidth = (inputTextConfig.width === undefined);
        var expandInputTextHeight = (inputTextConfig.height === undefined);
        if (expandInputTextWidth) {
            inputText.minWidth = 0;
        }
        if (expandInputTextHeight) {
            inputText.minHeight = 0;
        }

        config.scrollMode = 0; // Vertical
        config.type = 'rexTextAreaInput';
        config.child = {
            gameObject: inputText,
            expandWidth: expandInputTextWidth,
            expandHeight: expandInputTextHeight,
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = GetValue(spaceConfig, 'text', 0);
        }
        config.scroller = false; // No scroller supported
        super(scene, config);

        this.addChildrenMap('text', inputText);

        // More setting...

        // Rsize and move slider
        var prevTextOY, prevContentHeight;
        inputText.on('cursorin', function () {
            var textOY = inputText.textOY,
                contentHeight = inputText.contentHeight;

            var isTextOYChanged = prevTextOY !== textOY;
            var isContentHeightChanged = prevContentHeight !== contentHeight;

            prevTextOY = textOY;
            prevContentHeight = contentHeight;

            if (isContentHeightChanged) {
                this.resizeController();
            }

            if (isTextOYChanged || isContentHeightChanged) {
                this.t = inputText.t;
            }

        }, this)

        // Route 'textchange' event
        inputText.on('textchange', function (text) {
            this.emit('textchange', text, this);
        }, this)

        // Set initial text if given
        var content = GetValue(config, 'content', undefined);
        if (content) {
            this.setText(content);
        }
    }

    get text() {
        return this.childrenMap.child.text;
    }

}

Object.assign(
    TextAreaInput.prototype,
    SetTextMethods,
)

export default TextAreaInput;