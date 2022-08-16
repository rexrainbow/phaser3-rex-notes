import GameObjectManagerMethods from './gameobjectmanager/GameObjectManagerMethods.js';
import SetClickTarget from './SetClickTarget.js';
import SetTargetCamera from './SetTargetCamera.js';
import SetSkipSoundEffect from './SetSkipSoundEffect.js';
import PlayMethods from './PlayMethods.js';
import PauseMethods from './PauseMethods.js';
import ResumeMethods from './ResumeMethods.js';
import Wait from './Wait.js';
import SpriteMethods from './SpriteMethods.js';
import TextMethods from './TextMethods.js';
import ContentMethods from './ContentMethods.js';

var Methods = {
    setClickTarget: SetClickTarget,
    setTargetCamera: SetTargetCamera,
    setSkipSoundEffect: SetSkipSoundEffect,
    wait: Wait,
}

Object.assign(
    Methods,
    PlayMethods,
    PauseMethods,
    ResumeMethods,
    GameObjectManagerMethods,
    SpriteMethods,
    TextMethods,
    ContentMethods,
)

export default Methods;