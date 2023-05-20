import { IsWaitCameraEffect } from './WaitCameraEffect.js';
import { IsWaitGameObject, WaitGameObject } from './WaitGameObject.js'

const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

var WaitAny = function (textPlayer, names, callback, scope) {
    var waitEventManager = textPlayer.waitEventManager;
    waitEventManager
        .clearWaitCompleteCallbacks()
        .addWaitCompleteCallback(callback, scope)

    if ((typeof (names) === 'string') && (names.length > 1) && (names.indexOf('|') !== -1)) {
        names = names.split('|');
    } else {
        names = [names];
    }

    for (var i = 0, cnt = names.length; i < cnt; i++) {
        var name = names[i];

        if ((name == null) || (name === 'wait')) {  // Wait event
            var waitCompleteTriggerCallback = textPlayer.waitEventManager.getWaitCompleteTriggerCallback();
            textPlayer.emit('wait', waitCompleteTriggerCallback);

        } else if ((typeof (name) === 'number') || !isNaN(name)) { // A number, or a number string
            var time = parseFloat(name);
            waitEventManager.waitTime(time);
            textPlayer.emit('wait.time', time);

        } else if (name === 'click') {  // 'click'
            waitEventManager.waitClick();
            textPlayer.emit('wait.click');

        } else if (name === 'se') {
            waitEventManager.waitSoundEffectComplete();
            var music = textPlayer.soundManager.getLastSoundEffect();
            textPlayer.emit('wait.music', music);

        } else if (name === 'se2') {
            waitEventManager.waitSoundEffect2Complete();
            var music = textPlayer.soundManager.getLastSoundEffect2();
            textPlayer.emit('wait.music', music);

        } else if (name === 'bgm') {
            waitEventManager.waitBackgroundMusicComplete();
            var music = textPlayer.soundManager.getBackgroundMusic();
            textPlayer.emit('wait.music', music);

        } else if (name === 'bgm2') {
            waitEventManager.waitBackgroundMusic2Complete();
            var music = textPlayer.soundManager.getBackgroundMusic2();
            textPlayer.emit('wait.music', music);

        } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
            waitEventManager.waitKeyDown(name);
            textPlayer.emit('wait.keydown', name);

        } else if (IsWaitCameraEffect(name)) {
            waitEventManager.waitCameraEffectComplete(name);
            textPlayer.emit('wait.camera', name);

        } else if (IsWaitGameObject(textPlayer, name)) {
            WaitGameObject(textPlayer, name, callback, scope);

        } else {
            var waitCompleteTriggerCallback = textPlayer.waitEventManager.getWaitCompleteTriggerCallback();
            textPlayer.emit(`wait.${name}`, waitCompleteTriggerCallback);

        }
    }
}

export default WaitAny;