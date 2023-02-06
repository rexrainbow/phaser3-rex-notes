import { Modal, ModalClose } from '../../modal/Modal.js';
import IsFunction from '../../../../plugins/utils/object/IsFunction.js';

export default {
    modal(config, onClose) {
        if (IsFunction(config)) {
            onClose = config;
            config = undefined;
        }

        var dialog = this;

        var OnButtonClick = function (button, groupName, index, pointer, event) {
            if (groupName !== 'actions') {
                return;
            }

            var closeEventData = {
                index: index,
                text: button.text,
                button: button,
            }
            ModalClose(dialog, closeEventData);
        }

        dialog.on('button.click', OnButtonClick);

        var modalBehavior = Modal(dialog, config);

        if (onClose) {
            modalBehavior.once('close', function (closeEventData) {
                dialog.off('button.click', OnButtonClick);
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