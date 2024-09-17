import { Sound } from "phaser";
const SoundObjectClass = Sound.BaseSound;
var IsSoundObject = function (object) {
    return (object instanceof SoundObjectClass);
}

export default IsSoundObject;