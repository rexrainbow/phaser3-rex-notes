import IsFunction from '../../../../plugins/utils/object/IsFunction.js';
import ModalMethods from '../../basesizer/ModalMethods.js';

const Merge = Phaser.Utils.Objects.Merge;

var Modal = function (config, onClose) {
    if (IsFunction(config)) {
        onClose = config;
        config = undefined;
    }

    if (config === undefined) {
        config = {};
    }

    config = Merge(config, this.modalStyle)

    var zeroButtonMode;
    if (this.buttonMode === 0) {
        if (this.hasAnyChoice()) {
            zeroButtonMode = false;
        } else {
            zeroButtonMode = true;
        }
    } else {
        zeroButtonMode = false;
    }

    if (!config.hasOwnProperty('anyTouchClose')) {
        config.anyTouchClose = zeroButtonMode;
    }

    if (!config.hasOwnProperty('manualClose')) {
        config.manualClose = !zeroButtonMode;
    }

    var self = this;
    var onCloseWrap = function (data) {
        var buttonIndex = data.index;
        if (buttonIndex === self.confirmButtonIndex) {
            self.emit('confirm', data);
        } else if (buttonIndex === self.cancelButtonIndex) {
            self.emit('cancel', data);
        }

        if (onClose) {
            onClose(data)
        }
    }

    ModalMethods.modal.call(this, config, onCloseWrap);

    return this;
}

export default Modal;