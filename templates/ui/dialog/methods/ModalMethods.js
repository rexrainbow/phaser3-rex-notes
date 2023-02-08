import { Modal, ModalClose } from '../../modal/Modal.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

var OnCreateModalBehavior = function (dialog) {
    dialog.on('button.click', function (button, groupName, index, pointer, event) {
        if (groupName !== 'actions') {
            return;
        }

        var closeEventData = {
            index: index,
            text: button.text,
            button: button,
            dialog: dialog
        }
        dialog.modalClose(closeEventData);
    });
}

export default {
    modal(config, onClose) {
        if (IsFunction(config)) {
            onClose = config;
            config = undefined;
        }

        if (this._modalBehavior === undefined) {
            OnCreateModalBehavior(this);
            this._modalBehavior = Modal(this, config);
        }

        if (onClose) {
            this._modalBehavior.once('close', onClose);
        }

        this._modalBehavior.requestOpen();

        return this;
    },

    modalPromise(config) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.modal(config, resolve);
        });
    },

    modalClose(closeEventData) {
        ModalClose(this, closeEventData);
        return this;
    }
}