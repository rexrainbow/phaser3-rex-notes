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
    config.anyTouchClose = false;
    config.manualClose = false;

    var self = this;
    var onCloseWrap = function(data?: any) {
        data.firstName = self.firstName;
        data.lastName = self.lastName;

        self.emit('confirm', data);
        if (onClose?: any) {
            onClose(data)
        }
    }

    ModalMethods.modal.call(this, config, onCloseWrap);

    return this;
}

export default Modal;