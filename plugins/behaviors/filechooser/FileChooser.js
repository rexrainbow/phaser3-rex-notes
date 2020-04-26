import CreateHiddenFileInput from './CreateHiddenFileInput.js';
import IsGame from '../../utils/system/IsGame.js';
import IsSceneObject from '../../utils/system/IsSceneObject.js';
import IsGameObject from '../../utils/system/IsGameObject.js';
import GetGame from '../../utils/system/GetGame.js';
import { WaitEvent } from '../../utils/promise/WaitEvent.js'
import Delay from '../../utils/promise/Delay.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class FileChooser {
    constructor(parent, config) {
        this.parent = parent;

        // Create a hidden file input
        this.fileInput = CreateHiddenFileInput();

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(config) {
        this.setAcceptType(GetValue(config, 'accept', ''));
        this.setMultipleFilesEnable(GetValue(config, 'multiple', false));
        return this;
    }

    boot() {
        if (IsGame(this.parent)) { // Destroy when game is destroyed
            this.parent.events.on('destroy', this.destroy, this);
        } else if (IsSceneObject(this.parent)) { // Destroy when scene is destroyed
            this.parent.events.on('shutdown', this.destroy, this);
        } else if (IsGameObject(this.parent)) { // Destroy when game object is destroyed
            this.parent.on('destroy', this.destroy, this);
        }
    }

    shutdown() {
        this.parent = null;
        this.fileInput = null;
    }

    destroy() {
        this.shutdown();
    }

    setAcceptType(accept) {
        if (accept === undefined) {
            accept = '';
        }
        this.fileInput.setAttribute('accept', accept);
        return this;
    }

    setMultipleFilesEnable(enabled) {
        if (enabled === undefined) {
            enabled = true;
        }
        if (enabled) {
            this.fileInput.setAttribute('multiple', '');
        } else {
            this.fileInput.removeAttribute('multiple');
        }
        return this;
    }

    open() {
        this.fileInput.click();
        var self = this;
        return WaitEvent(GetGame(self.parent).events, 'focus')
            .then(function () {
                return Delay(100); // ??
            })
            .then(function () {
                var result = {
                    files: self.fileInput.files
                }
                return Promise.resolve(result);
            })
    }
}

export default FileChooser;