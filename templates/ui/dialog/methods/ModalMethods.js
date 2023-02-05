import { Modal, ModalClose } from '../../modal/Modal.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

export default {
    modal(config, onClose) {
        if (IsFunction(config)) {
            onClose = config;
            config = undefined;
        }

        this
            .on('button.click', function (button, groupName, index, pointer, event) {
                ModalClose(this, { index: index, text: button.text });
            }, this)

        var modalBehavior = Modal(this, config);

        if (onClose) {
            modalBehavior.once('close', function (closeEventData) {
                onClose(closeEventData);
            });
        }

        return this;
    },

    modalPromise(config) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.modal(config, resolve);
        });
    }
}