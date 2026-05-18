import Scrollable from '../utils/scrollable/Scrollable';
import IsGameObject from '../../../plugins/utils/system/IsGameObject';
import CanvasInput from '../canvasinput/CanvasInput';
import InjectProperties from './InjectProperties';
import SetTextMethods from './SetTextMethods';
import ScrollMethods from './ScrollMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class TextAreaInput extends Scrollable {
    addChildrenMap: any;
    childOY: any;
    childrenMap: any;
    emit: any;
    resizeController: any;
    setText: any;
    t: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }

        // Create inputText
        var inputTextConfig = GetValue(config, 'text');
        var inputText;
        if (IsGameObject(inputTextConfig)) {
            inputText = inputTextConfig;
        } else {
            if (inputTextConfig === undefined) {
                inputTextConfig = {};
            }
            inputTextConfig.textArea = true;
            inputText = new CanvasInput(scene, inputTextConfig);
            scene.add.existing(inputText); // Important: Add to display list for touch detecting
        }

        // Inject properties for scrollable interface
        InjectProperties(inputText);

        // Fill config of scrollable
        var expandInputTextWidth = (inputTextConfig.width === undefined);
        var expandInputTextHeight = (inputTextConfig.height === undefined);
        if (expandInputTextWidth?: any) {
            inputText.minWidth = 0;
        }
        if (expandInputTextHeight?: any) {
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
        if (spaceConfig?: any) {
            spaceConfig.child = GetValue(spaceConfig, 'text', 0);
        }
        config.scroller = false; // No scroller supported

        super(scene, config);

        this.addChildrenMap('text', inputText);

        // More setting...

        // Rsize and move slider
        var prevTextOY, prevContentHeight;
        inputText.on('cursorin', function() {
            var textOY = inputText.textOY,
                contentHeight = inputText.contentHeight;

            var isTextOYChanged = prevTextOY !== textOY;
            var isContentHeightChanged = prevContentHeight !== contentHeight;

            prevTextOY = textOY;
            prevContentHeight = contentHeight;

            if (isContentHeightChanged?: any) {
                this.resizeController();
            }

            if (isTextOYChanged || isContentHeightChanged) {
                this.t = inputText.t;
            }

        }, this)

        // Route 'textchange', 'close' events
        inputText
            .on('textchange', function(text?: any) {
                this.emit('textchange', text, this);
            }, this)
            .on('close', function() {
                this.emit('close', this.text, this);
            }, this)

        // Set initial text if given
        var content = GetValue(config, 'content', undefined);
        if (content?: any) {
            this.setText(content);
        }
    }

    get text() {
        return this.childrenMap.child.text;
    }

    set text(value) {
        if (value == null) {
            value = '';
        } else {
            value = value.toString();
        }
        if (this.childrenMap.child.text === value) {
            return;
        }

        this.setText(value)
    }

    get lineHeight() {
        var inputText = this.childrenMap.child;
        return inputText.lineHeight;
    }

    get lineIndex() {
        return Math.floor(-this.childOY / this.lineHeight);
    }

    get linesCount() {
        var inputText = this.childrenMap.child;
        return inputText.linesCount;
    }

    get contentHeight() {
        var inputText = this.childrenMap.child;
        return inputText.contentHeight;
    }

    get readOnly() {
        var inputText = this.childrenMap.child;
        return inputText.readOnly;
    }

    set readOnly(value) {
        var inputText = this.childrenMap.child;
        inputText.readOnly = value;
    }

    setReadOnly(value?: any) {
        var inputText = this.childrenMap.child;
        inputText.setReadOnly(value);
        return this;
    }

    get value() {
        return this.text;
    }

    set value(value) {
        this.text = value;
    }

}

Object.assign(
    TextAreaInput.prototype,
    SetTextMethods,
    ScrollMethods,
)

export default TextAreaInput;