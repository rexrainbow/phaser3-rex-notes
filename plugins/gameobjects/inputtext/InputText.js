import ElementProperties from './ElementProperties.js';
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
        var autoRound = scene.scale.autoRound;
        if (width !== undefined) {
            if (autoRound) {
                width = Math.floor(width);
            }
            config.width = width + 'px';
        }
        if (height !== undefined) {
            if (autoRound) {
                height = Math.floor(height);
            }
            config.height = height + 'px';
        }

        var element;
        var textType = GetValue(config, 'type', 'text');
        if (textType === 'textarea') {
            element = document.createElement("textarea");
            element.style.resize = 'none';
        } else {
            element = document.createElement("input");
            element.type = textType;
        }

        // Apply registed style properties
        var elemProp;
        for (var key in ElementProperties) {
            elemProp = ElementProperties[key];
            element[elemProp[0]] = GetValue(config, key, elemProp[1]);
        }

        var style = GetValue(config, 'style', undefined);
        if (style === undefined) {
            style = {};
        }
        // Apply registed style properties
        var styleProp;
        for (var key in StyleProperties) {
            styleProp = StyleProperties[key];
            style[styleProp[0]] = GetValue(config, key, styleProp[1]);
        }
        // Apply other style properties
        var elementStyle = element.style;
        for (var key in config) {
            if ((key in ElementProperties) || (key in StyleProperties)) {
                continue;
            } else if (key in elementStyle) {
                style[key] = config[key];
            }
        }
        style['box-sizing'] = 'border-box';
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
}
export default InputText;