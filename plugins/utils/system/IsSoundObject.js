import { Sound as PhaserSound } from 'phaser';
const SoundObjectClass = PhaserSound.BaseSound;
var IsSoundObject = function (object) {
    return (object instanceof SoundObjectClass);
}

export default IsSoundObject;