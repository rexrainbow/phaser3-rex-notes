import SetClickTarget from './SetClickTarget.js';
import SetTargetCamera from './SetTargetCamera.js';
import SetSkipSoundEffect from './SetSkipSoundEffect.js';
import Play from './Play.js';
import PlayPromise from './PlayPromise.js';
import Pause from './Pause.js';
import Resume from './Resume.js';
import Wait from './Wait.js';
import SpriteMethods from './SpriteMethods.js';
import TextMethods from './TextMethods.js';

var Methods = {
    setClickTarget: SetClickTarget,
    setTargetCamera: SetTargetCamera,
    setSkipSoundEffect: SetSkipSoundEffect,
    play: Play,
    playPromise: PlayPromise,
    pause: Pause,
    resume: Resume,
    wait: Wait,
}

Object.assign(
    Methods,
    SpriteMethods,
    TextMethods
)

export default Methods;