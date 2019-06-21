import StopPropagationTouchEvents from '../../utils/input/StopPropagationTouchEvents.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class InputText extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', undefined);
            height = GetValue(config, 'height', undefined);
        } else if (IsPlainObject(width)) {
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
        var elemProp, elemPropValue;
        for (var key in ElementProperties) {
            elemProp = ElementProperties[key];
            elemPropValue = GetValue(config, key, elemProp[1]);
            if (elemPropValue !== undefined) {
                element[elemProp[0]] = elemPropValue;
            }
        }

        var style = GetValue(config, 'style', undefined);
        if (style === undefined) {
            style = {};
        }
        // Apply registed style properties
        var styleProp, stylePropValue;
        for (var key in StyleProperties) {
            styleProp = StyleProperties[key];
            stylePropValue = GetValue(config, key, styleProp[1]);
            if (stylePropValue !== undefined) {
                style[styleProp[0]] = stylePropValue;
            }
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

        // Apply events
        for (let eventName in ElementEvents) { // Note: Don't use `var` here
            this.node[ElementEvents[eventName]] = (function () {
                this.emit(eventName, this);
            }).bind(this);
        }

        // Don't propagate touch/mouse events to parent(game canvas)
        StopPropagationTouchEvents(this.node);
    }

    resize(width, height) {
        var style = this.node.style;
        style.width = width + 'px';
        style.height = height + 'px';
        this.updateSize();
        return this;
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

    selectText() {
        this.node.select();
        return this;
    }

    get placeholder() {
        return this.node.placeholder;
    }

    set placeholder(value) {
        this.node.placeholder = value;
    }

    setPlaceholder(value) {
        this.placeholder = value;
        return this;
    }

    get tooltip() {
        return this.node.title;
    }

    set tooltip(value) {
        this.node.title = value;
    }

    setTooltip(value) {
        this.tooltip = value;
        return this;
    }

    setTextChangedCallback(callback) {
        this.onTextChanged = callback;
        return this;
    }

    get readOnly() {
        return this.node.readOnly;
    }

    set readOnly(value) {
        this.node.readOnly = value;
    }

    setReadOnly(value) {
        if (value === undefined) {
            value = true;
        }
        this.readOnly = value;
        return this;
    }

    get spellCheck() {
        return this.node.spellcheck;
    }

    set spellCheck(value) {
        this.node.spellcheck = value;
    }

    setSpellCheck(value) {
        this.spellCheck = value;
        return this;
    }

    setStyle(key, value) {
        this.node.style[key] = value;
        return this;
    }

    getStyle(key) {
        return this.node.style[key];
    }

    scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }

    setEnabled(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
    }

    setBlur() {
        this.node.blur();
        return this;
    }

    setFocus() {
        this.node.focus();
        return this;
    }
}

const ElementProperties = {
    id: ['id', undefined],
    text: ['value', undefined],
    placeholder: ['placeholder', undefined],
    tooltip: ['title', undefined],
    readOnly: ['readonly', false],
    spellCheck: ['spellcheck', false],
    autoComplete: ['autocomplete', 'off'],
};

const StyleProperties = {
    align: ['text-align', undefined],
    width: ['width', undefined],
    height: ['height', undefined],
    fontFamily: ['font-family', undefined],
    fontSize: ['font-size', undefined],
    color: ['color', '#ffffff'],
    backgroundColor: ['backgroundColor', 'transparent'],
    borderColor: ['borderColor', 'transparent'],
    outline: ['outline', 'none'],
};

const ElementEvents = {
    textchange: 'oninput',
    click: 'onclick',
    dblclick: 'ondblclick',
    focus: 'onfocus',
    blur: 'onblur',
};

export default InputText;