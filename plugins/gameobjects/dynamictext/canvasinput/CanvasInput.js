import DynamicText from '../dynamictext/DynamicText.js';
import HiddenTextEdit from './textedit/HiddenTextEdit.js';
import SetText from './methods/SetText.js';
import { IsChar } from '../dynamictext/bob/Types.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class CanvasInput extends DynamicText {
    constructor(scene, x, y, fixedWidth, fixedHeight, config) {
        if (IsPlainObject(x)) {
            config = x;
        } else if (IsPlainObject(fixedWidth)) {
            config = fixedWidth;
        }

        // Set text later
        var text = GetValue(config, 'text', undefined);
        if (text) {
            delete config.text;
        }

        super(scene, x, y, fixedWidth, fixedHeight, config);
        this.type = 'rexCanvasInput';

        this.textEdit = new HiddenTextEdit(this, GetValue(config, 'edit'));

        var addCharCallback = GetValue(config, 'onAddChar');
        if (addCharCallback) {
            this.on('addChar', addCharCallback);
        }

        var moveCursorCallback = GetValue(config, 'onMoveCursor');
        if (moveCursorCallback) {
            this.on('movecursor', moveCursorCallback);
        }

        if (text) {
            this.setText(text);
        }
    }

    addChild(child, index) {
        super.addChild(child, index);

        if (Array.isArray(child)) {
            var children = child;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (IsChar(child)) {
                    this.emit('addChar', child, index + i, this);
                }
            }
        } else {
            if (IsChar(child)) {
                this.emit('addChar', child, index, this);
            }
        }

        return this;
    }

    setText(text) {
        SetText(this, text);
        return this;
    }
}

export default CanvasInput;