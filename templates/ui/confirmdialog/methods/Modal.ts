import IsFunction from '../../../../plugins/utils/object/IsFunction';
import ModalMethods from '../../basesizer/ModalMethods';

import { Utils as PhaserUtils } from 'phaser';
const Merge = PhaserUtils.Objects.Merge;

var Modal = function(config?: any, onClose?: any) {
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
    var onCloseWrap = function(data?: any) {
        var buttonIndex = data.index;
        if (buttonIndex === self.confirmButtonIndex) {
            self.emit('confirm', data);
        } else if (buttonIndex === self.cancelButtonIndex) {
            self.emit('cancel', data);
        }

        if (onClose?: any) {
            onClose(data)
        }
    }

    ModalMethods.modal.call(this, config, onCloseWrap);

    return this;
}

export default Modal;