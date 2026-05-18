import { Utils as PhaserUtils } from 'phaser';
import ComponentBase from '../../utils/componentbase/ComponentBase';
import CopyElementConfig from './methods/CopyElementConfig';
import IsPointerInHitArea from '../../utils/input/IsPointerInHitArea';
import Methods from './methods/Methods';

const GetValue = PhaserUtils.Objects.GetValue;

class HiddenTextEditBase extends ComponentBase {
    clickOutSideTarget: any;
    close: any;
    enterCloseEnable: any;
    isOpened: any;
    node: any;
    nodeConfig: any;
    onCloseCallback: any;
    onOpenCallback: any;
    onTextChanged: any;
    onUpdateCallback: any;
    open: any;
    parent: any;

    constructor(gameObject?: any, config?: any) {
        super(gameObject);
        // this.parent = gameObject;

        var textType = GetValue(config, 'inputType', undefined);
        if (textType === undefined) {
            textType = GetValue(config, 'type', 'text');
        }

        this.setEnterCloseEnable(GetValue(config, 'enterClose', (textType !== 'textarea')));

        var onOpen = GetValue(config, 'onOpen', undefined);
        if (!onOpen) {
            onOpen = GetValue(config, 'onFocus', undefined);
        }
        this.onOpenCallback = onOpen;

        this.clickOutSideTarget = GetValue(config, 'clickOutSideTarget', undefined);

        var onClose = GetValue(config, 'onClose', undefined);
        if (!onClose) {
            onClose = GetValue(config, 'onBlur', undefined);
        }
        this.onCloseCallback = onClose;

        this.onUpdateCallback = GetValue(config, 'onUpdate', undefined);

        this.isOpened = false;

        gameObject
            .on('pointerdown', function() {
                this.open();
            }, this)
            .setInteractive()

        this.nodeConfig = CopyElementConfig(config);
        // Create/remove input text element when opening/closing editor
        this.node = undefined;
    }

    destroy() {
        // this.parent.off('pointerdown', this.open, this);

        this.close();

        if (this.clickOutSideTarget) {
            this.clickOutSideTarget.destroy();
        }

        super.destroy();
    }

    onClickOutside(pointer?: any) {
        if (!IsPointerInHitArea(this.parent, pointer)) {
            this.close();
        }
    }

    setEnterCloseEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.enterCloseEnable = enable;
        return this;
    }

    // Override
    initText() {
    }

    // Override, invoking under 'postupdate' event of scene
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

    setText(value?: any) { // Override
        this.text = value;
        return this;
    }

    get maxLength() {
        return this.nodeConfig.maxLength;
    }

    set maxLength(value) {
        this.nodeConfig.maxLength = value;

        if (this.node) {
            this.node.maxLength = value;
        }
    }

    setMaxLength(value?: any) {
        this.maxLength = value;
        return this;
    }

    get minLength() {
        return this.nodeConfig.minLength;
    }

    set minLength(value) {
        this.nodeConfig.minLength = value;

        if (this.node) {
            this.node.minLength = value;
        }
    }

    setMinLength(value?: any) {
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

    setPlaceholder(value?: any) {
        this.placeholder = value;
        return this;
    }

    selectText(selectionStart?: any, selectionEnd?: any) {
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

    setTooltip(value?: any) {
        this.tooltip = value;
        return this;
    }

    setTextChangedCallback(callback?: any) {
        this.onTextChanged = callback;
        return this;
    }

    get readOnly() {
        return this.nodeConfig.readOnly;
    }

    set readOnly(value) {
        this.nodeConfig.readOnly = value;

        if (this.node) {
            this.node.readOnly = value;
        }
    }

    setReadOnly(value?: any) {
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

    setSpellCheck(value?: any) {
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

    setFontColor(value?: any) {
        this.fontColor = value;
        return this;
    }

    setStyle(key?: any, value?: any) {
        if (!this.node) {
            return this;
        }
        this.node.style[key] = value;
        return this;
    }

    getStyle(key?: any) {
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

    setEnabled(enabled?: any) {
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
        return this.isOpened;
    }
}

Object.assign(
    HiddenTextEditBase.prototype,
    Methods,
)

export default HiddenTextEditBase;