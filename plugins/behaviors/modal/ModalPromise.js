import ModalBehavior from './Modal.js';
import { WaitEvent } from '../../eventpromise.js';

var Modal = function (gameObject, config) {
    var modalBehavior = new ModalBehavior(gameObject, config);

    // Route modal's 'open', 'close' event
    modalBehavior.on('open', function () {
        gameObject.emit('modal.open', modalBehavior);
    })
    modalBehavior.on('close', function () {
        gameObject.emit('modal.close', modalBehavior);
    })

    // Reigster 'modal.requestClose' event for invoking modalBehavior.requestClose() method
    gameObject.on('modal.requestClose', modalBehavior.requestClose, modalBehavior);
    modalBehavior.on('close', function () {
        gameObject.off('modal.requestClose', modalBehavior.requestClose, modalBehavior);
    })

    return modalBehavior;
}

var ModalPromise = function (gameObject, config) {
    var modalBehavior = Modal(gameObject, config);
    return WaitEvent(modalBehavior, 'close');
}

export { Modal, ModalPromise };