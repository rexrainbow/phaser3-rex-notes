import IgnoredProperties from './IgnoredProperties.js';
import StyleProperties from './StyleProperties.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class InputText extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        }
        if (config === undefined) {
            config = {};
        }
        config.width = width + 'px';
        config.height = height + 'px';

        var element;
        var textType = GetValue(config, 'type', 'text');
        if (textType === 'textarea') {
            element = document.createElement("textarea");
        } else {
            element = document.createElement("input");
            element.type = textType;
        }
        element.value = GetValue(config, 'text', '');
        element.placeholder = GetValue(config, 'placeholder', '');
        element.readOnly = GetValue(config, 'readOnly', false);

        var style = GetValue(config, 'style', undefined);
        if (style === undefined) {
            style = {};
        }
        // Apply registed style properties
        var stylePropMap;
        for (var key in StyleProperties) {
            stylePropMap = StyleProperties[key];
            style[stylePropMap[0]] = GetValue(config, key, stylePropMap[1]);
        }
        // Apply other style properties
        var elementStyle = element.style;
        for (var key in config) {
            if ((key in IgnoredProperties) || (key in StyleProperties)) {
                continue;
            } else if (key in elementStyle) {
                style[key] = config[key];
            }
        }
        super(scene, x, y, element, style);
        this.type = 'rexInputText';
    }

    get text() {
        return this.node.value;
    }

    set text(value) {
        this.node.value = value;
    }

    setText(value) { // Override
        this.text = value;
        return this;
    }

    set width(value) {
        super.width = value;
        this.node.style.width = value.toString() + 'px';
    }

    set height(value) {
        super.height = value;
        this.node.style.height = value.toString() + 'px';
    }
}
export default InputText;