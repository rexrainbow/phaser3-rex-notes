import ConfirmAction from './ConfirmAction.js';

var ConfirmActionPromise = function (scene, config) {
    var dialog = ConfirmAction(scene, config);
    return new Promise(function (resolve, reject) {
        dialog.once('modal.close', function (closeEventData) {
            resolve(closeEventData);
        });
    });
}

export default ConfirmActionPromise;