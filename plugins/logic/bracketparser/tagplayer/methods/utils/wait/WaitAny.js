import { IsWaitCameraEffect } from './WaitCameraEffect.js';
import { IsWaitGameObject, WaitGameObject } from './WaitGameObject.js'

const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

var WaitAny = function (tagPlayer, names, callback, scope) {
    var waitEventManager = tagPlayer.waitEventManager;
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
            var waitCompleteTriggerCallback = tagPlayer.waitEventManager.getWaitCompleteTriggerCallback();
            tagPlayer.emit('wait', waitCompleteTriggerCallback);

        } else if ((typeof (name) === 'number') || !isNaN(name)) { // A number, or a number string
            var time = parseFloat(name);
            waitEventManager.waitTime(time);
            tagPlayer.emit('wait.time', time);

        } else if (name === 'click') {  // 'click'
            waitEventManager.waitClick();
            tagPlayer.emit('wait.click');

        } else if (name === 'se') {
            waitEventManager.waitSoundEffectComplete();
            var music = tagPlayer.soundManager.getLastSoundEffect();
            tagPlayer.emit('wait.music', music);

        } else if (name === 'se2') {
            waitEventManager.waitSoundEffect2Complete();
            var music = tagPlayer.soundManager.getLastSoundEffect2();
            tagPlayer.emit('wait.music', music);

        } else if (name === 'bgm') {
            waitEventManager.waitBackgroundMusicComplete();
            var music = tagPlayer.soundManager.getBackgroundMusic();
            tagPlayer.emit('wait.music', music);

        } else if (name === 'bgm2') {
            waitEventManager.waitBackgroundMusic2Complete();
            var music = tagPlayer.soundManager.getBackgroundMusic2();
            tagPlayer.emit('wait.music', music);

        } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
            waitEventManager.waitKeyDown(name);
            tagPlayer.emit('wait.keydown', name);

        } else if (IsWaitCameraEffect(name)) {
            waitEventManager.waitCameraEffectComplete(name);
            tagPlayer.emit('wait.camera', name);

        } else if (IsWaitGameObject(tagPlayer, name)) {
            WaitGameObject(tagPlayer, name, callback, scope);

        } else {
            var waitCompleteTriggerCallback = tagPlayer.waitEventManager.getWaitCompleteTriggerCallback();
            tagPlayer.emit(`wait.${name}`, waitCompleteTriggerCallback);

        }
    }
}

export default WaitAny;