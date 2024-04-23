import AddCommand from './AddCommand.js';
import DataMethods from './DataMethods.js';
import WaitMethods from './WaitMethods.js';
import GameObjectManagerMethods from './GameObjectManagerMethods.js';
import GameObjectMethods from './GameObjectMethods.js';
import BackgroundMusicMethods from './musicmethods/BackgroundMusicMethods.js';
import BackgroundMusic2Methods from './musicmethods/BackgroundMusic2Methods.js';
import SoundEffectsMethods from './musicmethods/SoundEffectsMethods.js';
import SoundEffects2Methods from './musicmethods/SoundEffects2Methods.js';
import CameraMethods from './CameraMethods.js';
import LogMethods from './LogMethods.js';
import DefaultHandler from './DefaultHandler.js';

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