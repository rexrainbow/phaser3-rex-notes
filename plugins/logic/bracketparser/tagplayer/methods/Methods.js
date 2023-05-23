import GameObjectManagerMethods from './gameobjectmanager/GameObjectManagerMethods.js';
import SetClickTarget from './SetClickTarget.js';
import SetCameraTarget from './SetCameraTarget.js';
import SetSkipSoundEffect from './SetSkipSoundEffect.js';
import PlayMethods from './PlayMethods.js';
import PauseMethods from './PauseMethods.js';
import ResumeMethods from './ResumeMethods.js';
import Wait from './Wait.js';
import SpriteMethods from './spritemanager/SpriteMethods.js';
import TextMethods from './textmanager/TextMethods.js';
import ContentMethods from './ContentMethods.js';
import DataManagerMethods from '../../../../utils/data/DataManagerMethods.js';

var Methods = {
    setClickTarget: SetClickTarget,
    setCameraTarget: SetCameraTarget,
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
    DataManagerMethods,
)

export default Methods;