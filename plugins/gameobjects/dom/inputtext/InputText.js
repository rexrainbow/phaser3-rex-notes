import Resize from '../utils/Resize.js';
import SetPrpoerties from '../utils/SetProperties.js';
import RouteEvents from '../utils/RouteEvents.js';
import StopPropagationTouchEvents from '../../../utils/input/StopPropagationTouchEvents.js';

const DOMElement = Phaser.GameObjects.DOMElement;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
const GetValue = Phaser.Utils.Objects.GetValue;

class InputText extends DOMElement {
    constructor(scene, x, y, width, height, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        } else if (IsPlainObject(width)) {
            config = width;
            width = GetValue(config, 'width', 0);
            height = GetValue(config, 'height', 0);
        }

        if (config === undefined) {
            config = {};
        }

        var element;
        var textType = GetValue(config, 'type', 'text');
        if (textType === 'textarea') {
            element = document.createElement('textarea');
            element.style.resize = 'none';
        } else {
            element = document.createElement('input');
            element.type = textType;
        }

        SetPrpoerties(ElementProperties, config, element);

        var style = GetValue(config, 'style', undefined);
        style = SetPrpoerties(StyleProperties, config, style);
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
        this.resize(width, height);

        // Apply events
        RouteEvents(this, element, ElementEvents);

        // Don't propagate touch/mouse events to parent(game canvas)
        StopPropagationTouchEvents(element);

        if (GetValue(config, 'selectAll', false)) {
            this.selectAll();
        }
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

    get maxLength() {
        return this.node.maxLength;
    }

    set maxLength(value) {
        this.node.maxLength = value;
    }

    setMaxLength(value) {
        this.maxLength = value;
        return this;
    }

    get minLength() {
        return this.node.minLength;
    }

    set minLength(value) {
        this.node.minLength = value;
    }

    setMinLength(value) {
        this.minLength = value;
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

    selectText() {
        this.node.select();
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

    get fontColor() {
        return this.node.style.color;
    }

    set fontColor(value) {
        this.node.style.color = value;
    }

    setFontColor(value) {
        this.fontColor = value;
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

    selectAll() {
        this.node.select();
        return this;
    }
}

var methods = {
    resize: Resize
}

Object.assign(
    InputText.prototype,
    methods
);

const ElementProperties = {
    id: ['id', undefined],
    text: ['value', undefined],
    maxLength: ['maxLength', undefined],
    minLength: ['minLength', undefined],
    placeholder: ['placeholder', undefined],
    tooltip: ['title', undefined],
    readOnly: ['readOnly', false],
    spellCheck: ['spellcheck', false],
    autoComplete: ['autocomplete', 'off'],
};

const StyleProperties = {
    align: ['textAlign', undefined],
    paddingLeft: ['padding-left', undefined],
    paddingRight: ['padding-right', undefined],
    paddingTop: ['padding-top', undefined],
    paddingBottom: ['padding-bottom', undefined],
    fontFamily: ['fontFamily', undefined],
    fontSize: ['font-size', undefined],
    color: ['color', '#ffffff'],
    backgroundColor: ['backgroundColor', 'transparent'],
    border: ['border', 0],
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