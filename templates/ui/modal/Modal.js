import { ModalBehavoir, Modal, ModalPromise } from '../../../plugins/modal.js';

var ModalClose = function (gameObject, closeEventData) {
    gameObject.emit('modal.requestClose', closeEventData);
}

export { ModalBehavoir, Modal, ModalPromise, ModalClose };