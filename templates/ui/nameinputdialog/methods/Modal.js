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
    config.anyTouchClose = false;
    config.manualClose = false;

    var self = this;
    var onCloseWrap = function (data) {
        data.firstName = self.firstName;
        data.lastName = self.lastName;

        self.emit('confirm', data);
        if (onClose) {
            onClose(data)
        }
    }

    ModalMethods.modal.call(this, config, onCloseWrap);

    return this;
}

export default Modal;