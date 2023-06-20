import Managers from '../../runcommands/managers/Managers';
import EventSheetManager from '../eventsheetmanager/EventSheetManager';

export default CommandExecutor;

declare namespace CommandExecutor {
    type GeneralConfigType = { [name: string]: any };

    type ImmediatelyCommandCallbackType = (
        config: GeneralConfigType,
        manager: EventSheetManager,
    ) => void;

    type WaitCommandCallbackType = (
        config: GeneralConfigType,
        manager: EventSheetManager,
    ) => Phaser.Events.EventEmitter;

    type CommandCallbackType = ImmediatelyCommandCallbackType | WaitCommandCallbackType;

    interface IAddGameObjectManagerConfig extends Managers.IAddGameObjectManagerConfig {
        defaultLayer?: string,
        commands?: {
            [name: string]: (
                gameObject: Phaser.GameObjects.GameObject,
                config: GeneralConfigType,
                commandExecutor: CommandExecutor,
            ) => void;
        }
    }

    interface IConfig extends Managers.IConfig {

    }
}

declare class CommandExecutor {
    constructor(scene: Phaser.Scene, config?: CommandExecutor.IConfig);

    destroy(fromScene?: boolean): void;

    addGameObjectManager(
        config?: CommandExecutor.IAddGameObjectManagerConfig
    ): this;

    addCommand(
        name: string,
        callback: CommandExecutor.CommandCallbackType,
        scope?: Object
    ): this;

    defaultHandler(
        name: string,
        config: CommandExecutor.GeneralConfigType,
        manager: EventSheetManager
    ): void | Phaser.Events.EventEmitter;

    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;

    set: CommandExecutor.ImmediatelyCommandCallbackType;

    wait: CommandExecutor.WaitCommandCallbackType;
    click: CommandExecutor.WaitCommandCallbackType;

    bgm: CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm.play': CommandExecutor.CommandCallbackType;
    'bgm.cross': CommandExecutor.CommandCallbackType;
    'bgm.stop': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm.fadeOut': CommandExecutor.CommandCallbackType;
    'bgm.fadeIn': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm.pause': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm.resume': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm.mute': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm.unmute': CommandExecutor.ImmediatelyCommandCallbackType;

    bgm2: CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm2.play': CommandExecutor.CommandCallbackType;
    'bgm2.cross': CommandExecutor.CommandCallbackType;
    'bgm2.stop': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm2.fadeOut': CommandExecutor.CommandCallbackType;
    'bgm2.fadeIn': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm2.pause': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm2.resume': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm2.mute': CommandExecutor.ImmediatelyCommandCallbackType;
    'bgm2.unmute': CommandExecutor.ImmediatelyCommandCallbackType;

    se: CommandExecutor.ImmediatelyCommandCallbackType;
    'se.play': CommandExecutor.CommandCallbackType;
    'se.stop': CommandExecutor.ImmediatelyCommandCallbackType;
    'se.fadeOut': CommandExecutor.CommandCallbackType;
    'se.mute': CommandExecutor.ImmediatelyCommandCallbackType;
    'se.unmute': CommandExecutor.ImmediatelyCommandCallbackType;

    se2: CommandExecutor.ImmediatelyCommandCallbackType;
    'se2.play': CommandExecutor.CommandCallbackType;
    'se2.stop': CommandExecutor.ImmediatelyCommandCallbackType;
    'se2.fadeOut': CommandExecutor.CommandCallbackType;
    'se2.mute': CommandExecutor.ImmediatelyCommandCallbackType;
    'se2.unmute': CommandExecutor.ImmediatelyCommandCallbackType;

    camera: CommandExecutor.ImmediatelyCommandCallbackType;
    'camera.fadeIn': CommandExecutor.CommandCallbackType;
    'camera.fadeOut': CommandExecutor.CommandCallbackType;
    'camera.flash': CommandExecutor.CommandCallbackType;
    'camera.shake': CommandExecutor.CommandCallbackType;
    'camera.zoomTo': CommandExecutor.CommandCallbackType;
    'camera.rotateTo': CommandExecutor.CommandCallbackType;
    'camera.scrollTo': CommandExecutor.CommandCallbackType;

}