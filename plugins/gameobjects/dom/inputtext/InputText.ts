import Resize from '../utils/Resize';
import {
    ElementProperties,
    StyleProperties,
    ElementEvents
} from './InputTextProperties';
import SetPrpoerties from '../utils/SetProperties';
import RouteEvents from '../utils/RouteEvents';
import StopPropagationTouchEvents from '../utils/StopPropagationTouchEvents';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const DOMElement = PhaserGameObjects.DOMElement;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class InputText extends DOMElement {
    _isFocused: any;
    node: any;
    onTextChanged: any;
    resize: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, config?: any) {
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
        var textType = GetValue(config, 'inputType', undefined);
        if (textType === undefined) {
            textType = GetValue(config, 'type', 'text');
        }

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
            } else if (key in element) {
                if (key === 'type') {
                    continue;
                }
                element[key] = config[key];
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

        this._isFocused = false;
        this
            .on('focus', function() {
                this._isFocused = true;
            }, this)
            .on('blur', function() {
                this._isFocused = false;
            }, this)

    }

    get inputType() {
        if (this.node.tagName.toLowerCase() === 'textarea') {
            return 'textarea';
        } else {
            return this.node.type;
        }
    }

    get text() {
        return this.node.value;
    }

    set text(value) {
        this.node.value = value;
    }

    setText(value?: any) { // Override
        this.text = value;
        return this;
    }

    get maxLength() {
        return this.node.maxLength;
    }

    set maxLength(value) {
        this.node.maxLength = value;
    }

    setMaxLength(value?: any) {
        this.maxLength = value;
        return this;
    }

    get minLength() {
        return this.node.minLength;
    }

    set minLength(value) {
        this.node.minLength = value;
    }

    setMinLength(value?: any) {
        this.minLength = value;
        return this;
    }

    get placeholder() {
        return this.node.placeholder;
    }

    set placeholder(value) {
        this.node.placeholder = value;
    }

    setPlaceholder(value?: any) {
        this.placeholder = value;
        return this;
    }

    selectText(selectionStart?: any, selectionEnd?: any) {
        if (selectionStart === undefined) {
            this.node.select();
        } else {
            this.node.setSelectionRange(selectionStart, selectionEnd);
        }
        return this;
    }

    selectAll() {
        this.selectText();
        return this;
    }

    get selectionStart() {
        return this.node.selectionStart;
    }

    get selectionEnd() {
        return this.node.selectionEnd;
    }

    get selectedText() {
        var node = this.node;
        return node.value.substring(node.selectionStart, node.selectionEnd);
    }

    get cursorPosition() {
        return this.node.selectionStart;
    }

    set cursorPosition(value) {
        this.node.setSelectionRange(value, value);
    }

    setCursorPosition(value?: any) {
        if (value === undefined) {
            value = this.text.length;
        } else if (value < 0) {
            value = this.text.length + value;
        }

        this.cursorPosition = value;
        return this;
    }

    get tooltip() {
        return this.node.title;
    }

    set tooltip(value) {
        this.node.title = value;
    }

    setTooltip(value?: any) {
        this.tooltip = value;
        return this;
    }

    setTextChangedCallback(callback?: any) {
        this.onTextChanged = callback;
        return this;
    }

    get readOnly() {
        return this.node.readOnly;
    }

    set readOnly(value) {
        this.node.readOnly = value;
    }

    setReadOnly(value?: any) {
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

    setSpellCheck(value?: any) {
        this.spellCheck = value;
        return this;
    }

    get fontColor() {
        return this.node.style.color;
    }

    set fontColor(value) {
        this.node.style.color = value;
    }

    setFontColor(value?: any) {
        this.fontColor = value;
        return this;
    }

    setStyle(key?: any, value?: any) {
        this.node.style[key] = value;
        return this;
    }

    getStyle(key?: any) {
        return this.node.style[key];
    }

    scrollToBottom() {
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }

    setEnabled(enabled?: any) {
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

    get isFocused() {
        return this._isFocused;
    }

}

var methods = {
    resize: Resize
}

Object.assign(
    InputText.prototype,
    methods
);

export default InputText;