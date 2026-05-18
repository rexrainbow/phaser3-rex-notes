import AddCommand from './AddCommand';
import DataMethods from './DataMethods';
import WaitMethods from './WaitMethods';
import GameObjectManagerMethods from './GameObjectManagerMethods';
import GameObjectMethods from './GameObjectMethods';
import BackgroundMusicMethods from './musicmethods/BackgroundMusicMethods';
import BackgroundMusic2Methods from './musicmethods/BackgroundMusic2Methods';
import SoundEffectsMethods from './musicmethods/SoundEffectsMethods';
import SoundEffects2Methods from './musicmethods/SoundEffects2Methods';
import CameraMethods from './CameraMethods';
import LogMethods from './LogMethods';
import DefaultHandler from './DefaultHandler';

var Methods = {
    addCommand: AddCommand,
    defaultHandler: DefaultHandler,
}

Object.assign(
    Methods,
    DataMethods,
    WaitMethods,
    GameObjectManagerMethods,
    GameObjectMethods,
    BackgroundMusicMethods,
    BackgroundMusic2Methods,
    SoundEffectsMethods,
    SoundEffects2Methods,
    CameraMethods,
    LogMethods,
)


export default Methods;