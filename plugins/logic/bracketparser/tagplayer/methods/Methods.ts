import GameObjectManagerMethods from './gameobjectmanager/GameObjectManagerMethods';
import SetClickTarget from './SetClickTarget';
import SetCameraTarget from './SetCameraTarget';
import SetSkipSoundEffect from './SetSkipSoundEffect';
import PlayMethods from './PlayMethods';
import PauseMethods from './PauseMethods';
import ResumeMethods from './ResumeMethods';
import Wait from './Wait';
import SpriteMethods from './spritemanager/SpriteMethods';
import TextMethods from './textmanager/TextMethods';
import ContentMethods from './ContentMethods';
import DataManagerMethods from '../../../../utils/data/DataManagerMethods';

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