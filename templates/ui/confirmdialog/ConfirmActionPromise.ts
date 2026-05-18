import ConfirmAction from './ConfirmAction';

var ConfirmActionPromise = function(scene?: any, config?: any) {
    var dialog = ConfirmAction(scene, config);
    return new Promise(function(resolve?: any, reject?: any) {
        dialog.once('modal.close', function(closeEventData?: any) {
            resolve(closeEventData);
        });
    });
}

export default ConfirmActionPromise;