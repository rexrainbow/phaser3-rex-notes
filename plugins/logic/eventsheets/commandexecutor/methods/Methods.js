import AddCommand from './AddCommand.js';
import EventSheetManagerMethods from './EventSheetManagerMethods.js';
import WaitMethods from './WaitMethods.js';
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
    EventSheetManagerMethods,
    WaitMethods,
    GameObjectMethods,
    BackgroundMusicMethods,
    BackgroundMusic2Methods,
    SoundEffectsMethods,
    SoundEffects2Methods,
    CameraMethods,
    LogMethods,
)


export default Methods;