import ComponentBase from '../../utils/componentbase/ComponentBase.js';
import CreateElement from './methods/CreateElement.js';
import RemoveElement from './methods/RemoveElement.js';
import IsPointerInHitArea from '../../utils/input/IsPointerInHitArea.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class HiddenTextEditBase extends ComponentBase {
    constructor(gameObject, config) {
        super(gameObject);
        // this.parent = gameObject;

        this.setEnterCloseEnable(GetValue(config, 'enterClose', true));

        this.onOpenCallback = GetValue(config, 'onOpen', undefined);
        this.onCloseCallback = GetValue(config, 'onClose', undefined);
        this.onUpdateCallback = GetValue(config, 'onUpdate', undefined);

        gameObject
            .on('pointerdown', this.open, this)
            .on('destroy', this.destroy, this)
            .setInteractive()

        this.nodeConfig = config;
        // Create/remove input text element when opening/closing editor
        this.node = undefined;   
        this._isFocused = false;

        this
            .on('focus', function () {
                this._isFocused = true;

                this.initText();

                if (this.enterCloseEnable) {
                    this.scene.input.keyboard.once('keydown-ENTER', this.close, this);
                }

                // There is no cursor-position-change event, 
                // so updating cursor position every tick
                this.scene.sys.events.on('postupdate', this.updateText, this);

                this.scene.input.on('pointerdown', this.onClickOutside, this);

                if (this.onOpenCallback) {
                    this.onOpenCallback(this.parent, this);
                }

            }, this)
            .on('blur', function () {
                this._isFocused = false;

                this.updateText();

                this.scene.sys.events.off('postupdate', this.updateText, this);

                this.scene.input.off('pointerdown', this.onClickOutside, this);

                if (this.onCloseCallback) {
                    this.onCloseCallback(this.parent, this);
                }
            }, this)

    }

    destroy() {
        // this.parent.off('pointerdown', this.open, this);
        // this.parent.off('destroy', this.destroy, this);

        this.scene.sys.events.off('postupdate', this.updateText, this);

        this.scene.input.off('pointerdown', this.onClickOutside, this);

        RemoveElement(this.node);
        this.node = undefined;

        super.destroy();
    }

    onClickOutside(pointer) {
        if (!IsPointerInHitArea(this.parent, pointer)) {
            this.close();
        }
    }

    setEnterCloseEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enterCloseEnable = enable;
        return this;
    }

    open() {
        if (!this.node) {
            // Create input text element when opening/closing editor
            this.node = CreateElement(this, this.nodeConfig);
        }
        this.setFocus();
        return this;
    }

    close() {
        if (this.node) {
            // Remove input text element when opening/closing editor
            RemoveElement(this.node);
            this.node = undefined;
        }
        this.setBlur();
        return this;
    }

    get isOpened() {
        return this._isFocused;
    }

    // Override
    initText() {
    }

    // Override
    updateText() {
    }

    // Copy from InputText class
    get text() {
        if (!this.node) {
            return '';
        }
        return this.node.value;
    }

    set text(value) {
        if (!this.node) {
            return;
        }
        this.node.value = value;
    }

    setText(value) { // Override
        this.text = value;
        return this;
    }

    get maxLength() {
        if (!this.node) {
            return 0;
        }
        return this.node.maxLength;
    }

    set maxLength(value) {
        if (!this.node) {
            return;
        }
        this.node.maxLength = value;
    }

    setMaxLength(value) {
        this.maxLength = value;
        return this;
    }

    get minLength() {
        if (!this.node) {
            return 0;
        }
        return this.node.minLength;
    }

    set minLength(value) {
        if (!this.node) {
            return;
        }
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
        if (!this.node) {
            return;
        }
        this.node.placeholder = value;
    }

    setPlaceholder(value) {
        this.placeholder = value;
        return this;
    }

    selectText(selectionStart, selectionEnd) {
        if (!this.node) {
            return this;
        }
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
        if (!this.node) {
            return 0;
        }
        return this.node.selectionStart;
    }

    get selectionEnd() {
        if (!this.node) {
            return 0;
        }
        return this.node.selectionEnd;
    }

    get selectedText() {
        if (!this.node) {
            return '';
        }
        var node = this.node;
        return node.value.substring(node.selectionStart, node.selectionEnd);
    }

    get cursorPosition() {
        if (!this.node) {
            return 0;
        }
        return this.node.selectionStart;
    }

    set cursorPosition(value) {
        if (!this.node) {
            return;
        }
        this.node.setSelectionRange(value, value);
    }

    setCursorPosition(value) {
        if (value === undefined) {
            value = this.text.length;
        } else if (value < 0) {
            value = this.text.length + value;
        }

        this.cursorPosition = value;
        return this;
    }

    get tooltip() {
        if (!this.node) {
            return '';
        }
        return this.node.title;
    }

    set tooltip(value) {
        if (!this.node) {
            return this;
        }
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
        if (!this.node) {
            return false;
        }
        return this.node.readOnly;
    }

    set readOnly(value) {
        if (!this.node) {
            return;
        }
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
        if (!this.node) {
            return '';
        }
        return this.node.spellcheck;
    }

    set spellCheck(value) {
        if (!this.node) {
            return;
        }
        this.node.spellcheck = value;
    }

    setSpellCheck(value) {
        this.spellCheck = value;
        return this;
    }

    get fontColor() {
        if (!this.node) {
            return undefined;
        }
        return this.node.style.color;
    }

    set fontColor(value) {
        if (!this.node) {
            return;
        }
        this.node.style.color = value;
    }

    setFontColor(value) {
        this.fontColor = value;
        return this;
    }

    setStyle(key, value) {
        if (!this.node) {
            return this;
        }
        this.node.style[key] = value;
        return this;
    }

    getStyle(key) {
        if (!this.node) {
            return undefined;
        }
        return this.node.style[key];
    }

    scrollToBottom() {
        if (!this.node) {
            return this;
        }
        this.node.scrollTop = this.node.scrollHeight;
        return this;
    }

    setEnabled(enabled) {
        if (!this.node) {
            return this;
        }
        if (enabled === undefined) {
            enabled = true;
        }
        this.node.disabled = !enabled;
        return this;
    }

    setBlur() {
        if (!this.node) {
            return this;
        }
        this.node.blur();
        return this;
    }

    setFocus() {
        if (!this.node) {
            return this;
        }
        this.node.focus();
        return this;
    }

    get isFocused() {
        return this._isFocused;
    }

}

export default HiddenTextEditBase;