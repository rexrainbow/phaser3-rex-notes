import Managers from '../../runcommands/managers/Managers';
import BBCodeLog from '../../../bbcodelog';
import EventSheetManager from '../eventsheetmanager/EventSheetManager';
import { BehaviorTree } from '../../behaviortree';

export default CommandExecutor;

declare namespace CommandExecutor {
    type GeneralConfigType = { [name: string]: any };

    type GameObjectCommandType = (
        gameObject: Phaser.GameObjects.GameObject,
        config: GeneralConfigType,
        commandExecutor: CommandExecutor,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ) => void;

    interface IAddGameObjectManagerConfig extends Managers.IAddGameObjectManagerConfig {
        defaultLayer?: string,
        autoClear?: boolean,
        commands?: { [name: string]: GameObjectCommandType; }
    }

    interface ISetGOPropertyConfig {
        id?: string,
        goType?: string,
        [property: string]: any,
    }

    interface IEaseGOPropertyConfig extends ISetGOPropertyConfig {
        duration?: number,
        delay?: number,
        ease?: string,
        repeat?: number,
        yoyo?: boolean,
        from?: boolean,
        wait?: boolean,
    }

    interface IDestroyGOConfig {
        id?: string,
        goType?: string,
        wait?: boolean,
    }

    interface IRunGOMethodConfig {
        id?: string,
        goType?: string,
        methodName: string,
        parameters?: any[],
    }

    type CommandCallbackType = (
        config: GeneralConfigType,
        eventsheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ) => Phaser.Events.EventEmitter | CommandExecutor | void;

    interface IConfig extends Managers.IConfig {
        log?: BBCodeLog.IConfig
    }
}

declare class CommandExecutor {
    constructor(scene: Phaser.Scene, config?: CommandExecutor.IConfig);

    destroy(fromScene?: boolean): void;

    addGameObjectManager(
        config: CommandExecutor.IAddGameObjectManagerConfig
    ): this;

    addGameObjectCommand(
        goType: string,
        commandName: string,
        callback: CommandExecutor.GameObjectCommandType
    ): this;

    addCommand(
        name: string,
        callback: CommandExecutor.CommandCallbackType,
        scope?: object
    ): this;

    defaultHandler(
        name: string,
        config: CommandExecutor.GeneralConfigType,
        eventSheetManager: EventSheetManager
    ): void | Phaser.Events.EventEmitter;

    setGOProperty(
        config: CommandExecutor.ISetGOPropertyConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    easeGOProperty(
        config: CommandExecutor.IEaseGOPropertyConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    destroyGO(
        config: CommandExecutor.IDestroyGOConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    runGOMethod(
        config: CommandExecutor.IRunGOMethodConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;

    setData: CommandExecutor.CommandCallbackType;
    incData: CommandExecutor.CommandCallbackType;
    toggleData: CommandExecutor.CommandCallbackType;

    log: CommandExecutor.CommandCallbackType;
    'log.disable': CommandExecutor.CommandCallbackType;
    'log.enable': CommandExecutor.CommandCallbackType;
    'log.memory': CommandExecutor.CommandCallbackType;

    set: CommandExecutor.CommandCallbackType;

    wait: CommandExecutor.CommandCallbackType;
    click: CommandExecutor.CommandCallbackType;

    'bgm.set': CommandExecutor.CommandCallbackType;
    'bgm.play': CommandExecutor.CommandCallbackType;
    'bgm.cross': CommandExecutor.CommandCallbackType;
    'bgm.stop': CommandExecutor.CommandCallbackType;
    'bgm.fadeOut': CommandExecutor.CommandCallbackType;
    'bgm.fadeIn': CommandExecutor.CommandCallbackType;
    'bgm.pause': CommandExecutor.CommandCallbackType;
    'bgm.resume': CommandExecutor.CommandCallbackType;
    'bgm.mute': CommandExecutor.CommandCallbackType;
    'bgm.unmute': CommandExecutor.CommandCallbackType;

    'bgm2.set': CommandExecutor.CommandCallbackType;
    'bgm2.play': CommandExecutor.CommandCallbackType;
    'bgm2.cross': CommandExecutor.CommandCallbackType;
    'bgm2.stop': CommandExecutor.CommandCallbackType;
    'bgm2.fadeOut': CommandExecutor.CommandCallbackType;
    'bgm2.fadeIn': CommandExecutor.CommandCallbackType;
    'bgm2.pause': CommandExecutor.CommandCallbackType;
    'bgm2.resume': CommandExecutor.CommandCallbackType;
    'bgm2.mute': CommandExecutor.CommandCallbackType;
    'bgm2.unmute': CommandExecutor.CommandCallbackType;

    'se.set': CommandExecutor.CommandCallbackType;
    'se.play': CommandExecutor.CommandCallbackType;
    'se.stop': CommandExecutor.CommandCallbackType;
    'se.fadeOut': CommandExecutor.CommandCallbackType;
    'se.mute': CommandExecutor.CommandCallbackType;
    'se.unmute': CommandExecutor.CommandCallbackType;

    'se2.set': CommandExecutor.CommandCallbackType;
    'se2.play': CommandExecutor.CommandCallbackType;
    'se2.stop': CommandExecutor.CommandCallbackType;
    'se2.fadeOut': CommandExecutor.CommandCallbackType;
    'se2.mute': CommandExecutor.CommandCallbackType;
    'se2.unmute': CommandExecutor.CommandCallbackType;

    'camera.set': CommandExecutor.CommandCallbackType;
    'camera.fadeIn': CommandExecutor.CommandCallbackType;
    'camera.fadeOut': CommandExecutor.CommandCallbackType;
    'camera.flash': CommandExecutor.CommandCallbackType;
    'camera.shake': CommandExecutor.CommandCallbackType;
    'camera.zoomTo': CommandExecutor.CommandCallbackType;
    'camera.rotateTo': CommandExecutor.CommandCallbackType;
    'camera.scrollTo': CommandExecutor.CommandCallbackType;

    getGameObject(
        name: string,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[];

}