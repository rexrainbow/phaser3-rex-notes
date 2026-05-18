import Resize from '../utils/Resize';
import SyncTo from '../utils/SyncTo';
import LoadFileMethods from '../utils/LoadFileMethods';
import ClickPromose from './ClickPromise';

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const DOMElement = PhaserGameObjects.DOMElement;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class FileChooser extends DOMElement {
    node: any;
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

        // Create a hidden file input
        var inputElement = document.createElement('input');
        inputElement.type = 'file';
        var inputStyle = inputElement.style;
        inputStyle.display = 'none';

        // Create a label parent
        var labelElement = document.createElement('label');
        labelElement.appendChild(inputElement);

        var style = GetValue(config, 'style', undefined);
        super(scene, x, y, labelElement, style);
        this.type = 'rexFileChooser';
        this.resetFromJSON(config);
        this.resize(width, height);

        // Register events
        var self = this;
        inputElement.onchange = function() {
            self.emit('change', self);
        }

        this.setCloseDelay(GetValue(config, 'closeDelay', 200));
        inputElement.onclick = function() {
            ClickPromose({
                game: scene,
                fileInput: inputElement,
                closeDelay: self.closeDelay
            })
                .then(function() {
                    self.emit('select', self);
                })
        }
    }

    resetFromJSON(config?: any) {
        this.setAccept(GetValue(config, 'accept', ''));
        this.setMultiple(GetValue(config, 'multiple', false));
        return this;
    }

    setAccept(accept?: any) {
        if (accept === undefined) {
            accept = '';
        }
        this.fileInput.setAttribute('accept', accept);
        return this;
    }

    setMultiple(enabled?: any) {
        if (enabled === undefined) {
            enabled = true;
        }
        if (enabled?: any) {
            this.fileInput.setAttribute('multiple', '');
        } else {
            this.fileInput.removeAttribute('multiple');
        }
        return this;
    }

    setCloseDelay(delay?: any) {
        if (delay === undefined) {
            delay = 200;
        }
        this.closeDelay = delay;
        return this;
    }

    get fileInput() {
        return this.node.children[0];
    }

    open() { // Only work under any touch event
        this.fileInput.click();
        return this;
    }

    get files() {
        return this.fileInput.files;
    }

    setOpenEnable(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.fileInput.disabled = !enable;
        return this;
    }
}

var methods = {
    resize: Resize,
    syncTo: SyncTo,
}

Object.assign(
    FileChooser.prototype,
    methods,
    LoadFileMethods,
);

export default FileChooser;