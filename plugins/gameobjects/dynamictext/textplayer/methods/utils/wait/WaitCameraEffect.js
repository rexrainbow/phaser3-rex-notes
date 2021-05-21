import GetWrapCallback from './GetWrapCallback.js';
import { RemoveWaitEvents } from '../Events.js';

var IsWaitCameraEffect = function (name) {
    // fadein, fadeout, shake, flash
    switch (name) {
        case 'fadein':
        case 'fadeout':
        case 'flash':
        case 'shake':
        case 'zoom':
            return true;
        default:
            return false;
    }
}

var WaitCameraEffect = function (textPlayer, effectName, callback, args, scope) {
    var wrapCallback = GetWrapCallback(textPlayer, callback, args, scope, `camera.${effectName}`);

    var camera = textPlayer.camera;

    switch (effectName) {
        case 'fadein':
            if (!camera.fadeEffect.isRunning) {
                textPlayer.emit('wait.camera', effectName);
                wrapCallback();

            } else {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    camera.off('camerafadeincomplete', wrapCallback, textPlayer);
                });
                camera.once('camerafadeincomplete', wrapCallback, textPlayer);
                textPlayer.emit('wait.camera', effectName);
            }
            break;

        case 'fadeout':
            if (!camera.fadeEffect.isRunning) {
                textPlayer.emit('wait.camera', effectName);
                wrapCallback();

            } else {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    camera.off('camerafadeoutcomplete', wrapCallback, textPlayer);
                });
                camera.once('camerafadeoutcomplete', wrapCallback, textPlayer);
                textPlayer.emit('wait.camera', effectName);
            }
            break;

        case 'flash':
            if (!camera.flashEffect.isRunning) {
                textPlayer.emit('wait.camera', effectName);
                wrapCallback();

            } else {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    camera.off('cameraflashcomplete', wrapCallback, textPlayer);
                });
                camera.once('cameraflashcomplete', wrapCallback, textPlayer);
                textPlayer.emit('wait.camera', effectName);
            }
            break;

        case 'shake':
            if (!camera.shakeEffect.isRunning) {
                textPlayer.emit('wait.camera', effectName);
                wrapCallback();

            } else {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    camera.off('camerashakecomplete', wrapCallback, textPlayer);
                });
                camera.once('camerashakecomplete', wrapCallback, textPlayer);
                textPlayer.emit('wait.camera', effectName);
            }
            break;

        case 'zoom':
            if (!camera.zoomEffect.isRunning) {
                textPlayer.emit('wait.camera', effectName);
                wrapCallback();

            } else {
                // Remove all wait events
                textPlayer.once(RemoveWaitEvents, function (removeFrom) {
                    camera.off('camerazoomcomplete', wrapCallback, textPlayer);
                });
                camera.once('camerazoomcomplete', wrapCallback, textPlayer);
                textPlayer.emit('wait.camera', effectName);
            }
            break;
    }
}

export { IsWaitCameraEffect, WaitCameraEffect };