import Managers from '../../runcommands/managers/Managers';
import BBCodeLog from '../../../bbcodelog';
import EventSheetManager from '../eventsheetmanager/EventSheetManager';

export default CommandExecutor;

declare namespace CommandExecutor {
    type GeneralConfigType = { [name: string]: any };

    type GameObjectCommandType = (
        gameObject: Phaser.GameObjects.GameObject,
        config: GeneralConfigType,
        commandExecutor: CommandExecutor,
        eventSheetManager: EventSheetManager,
    ) => void;

    interface IAddGameObjectManagerConfig extends Managers.IAddGameObjectManagerConfig {
        defaultLayer?: string,
        autoClear?: boolean,
        commands?: { [name: string]: GameObjectCommandType; }
    }

    interface IConfig extends Managers.IConfig {
        log?: BBCodeLog.IConfig
    }
}

declare class CommandExecutor {
    constructor(scene: Phaser.Scene, config?: CommandExecutor.IConfig);

    destroy(fromScene?: boolean): void;

    addGameObjectManager(
        config?: CommandExecutor.IAddGameObjectManagerConfig
    ): this;

    addGameObjectCommand(
        goype: string,
        commandName: string,
        callback: CommandExecutor.GameObjectCommandType
    ): this;

    addCommand(
        name: string,
        callback: this,
        scope?: Object
    ): this;

    defaultHandler(
        name: string,
        config: CommandExecutor.GeneralConfigType,
        eventSheetManager: EventSheetManager
    ): void | Phaser.Events.EventEmitter;

    setGOProperty(
        config: { [name: string]: any },
        eventSheetManager: EventSheetManager,
    ): this;

    easeGOProperty(
        config: { [name: string]: any },
        eventSheetManager: EventSheetManager,
    ): this;

    destroyGO(
        config: { id?: string, goType?: string, wait?: boolean },
        eventSheetManager: EventSheetManager,
    ): this;

    runGOMethod(
        config: { id?: string, goType?: string, methodName: string, parameters: any[] },
        eventSheetManager: EventSheetManager,
    ): this;

    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;

    setWaitEventFlag(): this;

    set: this;

    wait: this;
    click: this;

    'bgm.set': this;
    'bgm.play': this;
    'bgm.cross': this;
    'bgm.stop': this;
    'bgm.fadeOut': this;
    'bgm.fadeIn': this;
    'bgm.pause': this;
    'bgm.resume': this;
    'bgm.mute': this;
    'bgm.unmute': this;

    'bgm2.set': this;
    'bgm2.play': this;
    'bgm2.cross': this;
    'bgm2.stop': this;
    'bgm2.fadeOut': this;
    'bgm2.fadeIn': this;
    'bgm2.pause': this;
    'bgm2.resume': this;
    'bgm2.mute': this;
    'bgm2.unmute': this;

    'se.set': this;
    'se.play': this;
    'se.stop': this;
    'se.fadeOut': this;
    'se.mute': this;
    'se.unmute': this;

    'se2.set': this;
    'se2.play': this;
    'se2.stop': this;
    'se2.fadeOut': this;
    'se2.mute': this;
    'se2.unmute': this;

    'camera.set': this;
    'camera.fadeIn': this;
    'camera.fadeOut': this;
    'camera.flash': this;
    'camera.shake': this;
    'camera.zoomTo': this;
    'camera.rotateTo': this;
    'camera.scrollTo': this;

}