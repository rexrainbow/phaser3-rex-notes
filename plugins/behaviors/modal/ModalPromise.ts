import ModalBehavior from './Modal';

var Modal = function(gameObject?: any, config?: any) {
    var modalBehavior = new ModalBehavior(gameObject, config);

    // Route modal's 'open', 'close' event
    modalBehavior.on('open', function() {
        gameObject.emit('modal.open', modalBehavior);
    })
    modalBehavior.on('close', function(closeEventData?: any) {
        gameObject.emit('modal.close', closeEventData, modalBehavior);
    })

    // Reigster 'modal.requestClose' event for invoking modalBehavior.requestClose() method
    gameObject.on('modal.requestClose', modalBehavior.requestClose, modalBehavior);
    /*
    It is not necessary to turn off gameObject's 'modal.requestClose' event because that :

    - If `config.destroy` is `undefined` (or `true), gameObject and modalBehavior will be destroyed
    - If `config.destroy` is `false` (for reusing dialog), keeping gameObject and modalBehavior 
    */

    return modalBehavior;
}

var ModalPromise = function(gameObject?: any, config?: any) {
    var modalBehavior = Modal(gameObject, config);
    return new Promise(function(resolve?: any, reject?: any) {
        modalBehavior.once('close', function(closeEventData?: any) {
            resolve(closeEventData);
        });
    });
}

var ModalClose = function(gameObject?: any, closeEventData?: any) {
    gameObject.emit('modal.requestClose', closeEventData);
}

export { Modal, ModalPromise, ModalClose };