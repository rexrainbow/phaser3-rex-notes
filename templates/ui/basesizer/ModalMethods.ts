import { Modal, ModalClose } from '../modal/Modal';
import IsFunction from '../../../plugins/utils/object/IsFunction';

export default {
    // Override
    // onCreateModalBehavior(self, config) { },

    modal(config?: any, onClose?: any) {
        if (IsFunction(config)) {
            onClose = config;
            config = undefined;
        }

        if (this._modalBehavior === undefined) {
            if (this.onCreateModalBehavior) {
                this.onCreateModalBehavior(this, config);
            }
            this._modalBehavior = Modal(this, config);
        }

        if (onClose?: any) {
            this._modalBehavior.once('close', onClose);
        }

        this._modalBehavior.requestOpen();

        return this;
    },

    modalPromise(config?: any) {
        var self = this;
        return new Promise(function(resolve?: any, reject?: any) {
            self.modal(config, resolve);
        });
    },

    modalClose(closeEventData?: any) {
        ModalClose(this, closeEventData);
        return this;
    }
}