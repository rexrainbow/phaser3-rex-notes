import DynamicText from '../dynamictext/DynamicText.js';
import HiddenInputText from './textedit/HiddenInputText.js';
import SetText from './textedit/SetText.js';
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

        this.setChildrenInteractiveEnable(true);  // Fire 'child.pointerdown' event
        this.textEdit = new HiddenInputText(this, GetValue(config, 'edit'));

        this.onAddCharCallback = GetValue(config, 'onAddChar');

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
                    this.onAddCharCallback(child, index + i);
                }
            }
        } else {
            if (IsChar(child)) {
                this.onAddCharCallback(child, index);
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