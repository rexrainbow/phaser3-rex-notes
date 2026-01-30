import Managers from '../../runcommands/managers/Managers';
import BBCodeLog from '../../../bbcodelog';
import EventSheetManager from '../eventsheetmanager/EventSheetManager';
import { BehaviorTree } from '../../behaviortree';

export default CommandExecutor;

declare namespace CommandExecutor {
    /**
     * Generic config object type.
     */
    type GeneralConfigType = Record<string, unknown>;

    /**
     * Game object command callback.
     *
     * @param gameObject - Target game object.
     * @param config - Command configuration.
     * @param commandExecutor - CommandExecutor instance.
     * @param eventSheetManager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     */
    type GameObjectCommandType = (
        gameObject: Phaser.GameObjects.GameObject,
        config: GeneralConfigType,
        commandExecutor: CommandExecutor,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ) => void;

    /**
     * Configuration options for adding a game object manager.
     */
    interface IAddGameObjectManagerConfig extends Managers.IAddGameObjectManagerConfig {
        /**
         * Default layer name.
         */
        defaultLayer?: string,
        /**
         * Auto clear on destroy.
         */
        autoClear?: boolean,
        /**
         * Command map for game objects.
         */
        commands?: { [name: string]: GameObjectCommandType; }
    }

    /**
     * Configuration for setting a game object property.
     */
    interface ISetGOPropertyConfig {
        /**
         * Game object id.
         */
        id?: string,
        /**
         * Game object type.
         */
        goType?: string,
        /**
         * Property value map.
         */
        [property: string]: any,
    }

    /**
     * Configuration for easing game object properties.
     */
    interface IEaseGOPropertyConfig extends ISetGOPropertyConfig {
        /**
         * Duration in milliseconds.
         */
        duration?: number,
        /**
         * Delay in milliseconds.
         */
        delay?: number,
        /**
         * Easing name.
         */
        ease?: string,
        /**
         * Repeat count.
         */
        repeat?: number,
        /**
         * Enable yoyo.
         */
        yoyo?: boolean,
        /**
         * Start from current value.
         */
        from?: boolean,
        /**
         * Wait for completion.
         */
        wait?: boolean,
    }

    /**
     * Configuration for destroying game objects.
     */
    interface IDestroyGOConfig {
        /**
         * Game object id.
         */
        id?: string,
        /**
         * Game object type.
         */
        goType?: string,
        /**
         * Wait for completion.
         */
        wait?: boolean,
    }

    /**
     * Configuration for running a game object method.
     */
    interface IRunGOMethodConfig {
        /**
         * Game object id.
         */
        id?: string,
        /**
         * Game object type.
         */
        goType?: string,
        /**
         * Method name to invoke.
         */
        methodName: string,
        /**
         * Method parameters.
         */
        parameters?: any[],
    }

    /**
     * Command callback signature.
     *
     * @param config - Command configuration.
     * @param eventsheetManager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     * @returns An EventEmitter, CommandExecutor, or void.
     */
    type CommandCallbackType = (
        config: GeneralConfigType,
        eventsheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ) => Phaser.Events.EventEmitter | CommandExecutor | void;

    /**
     * Configuration options for creating a CommandExecutor.
     */
    interface IConfig extends Managers.IConfig {
        /**
         * Log configuration.
         */
        log?: BBCodeLog.IConfig
    }
}

/**
 * Command executor for event sheet actions.
 */
declare class CommandExecutor {
    /**
     * Create a CommandExecutor.
     *
     * @param scene - The Phaser.Scene that owns this executor.
     * @param config - Configuration options.
     */
    constructor(scene: Phaser.Scene, config?: CommandExecutor.IConfig);

    /**
     * Destroy the executor.
     *
     * @param fromScene - True if destroyed by scene.
     */
    destroy(fromScene?: boolean): void;

    /**
     * Add a game object manager.
     *
     * @param config - Manager configuration.
     * @returns This CommandExecutor instance.
     */
    addGameObjectManager(
        config: CommandExecutor.IAddGameObjectManagerConfig
    ): this;

    /**
     * Add a game object command.
     *
     * @param goType - Game object type.
     * @param commandName - Command name.
     * @param callback - Command callback.
     * @returns This CommandExecutor instance.
     */
    addGameObjectCommand(
        goType: string,
        commandName: string,
        callback: CommandExecutor.GameObjectCommandType
    ): this;

    /**
     * Add a command.
     *
     * @param name - Command name.
     * @param callback - Command callback.
     * @param scope - Callback scope.
     * @returns This CommandExecutor instance.
     */
    addCommand(
        name: string,
        callback: CommandExecutor.CommandCallbackType,
        scope?: object
    ): this;

    /**
     * Default command handler.
     *
     * @param name - Command name.
     * @param config - Command configuration.
     * @param eventSheetManager - EventSheetManager instance.
     * @returns An EventEmitter or void.
     */
    defaultHandler(
        name: string,
        config: CommandExecutor.GeneralConfigType,
        eventSheetManager: EventSheetManager
    ): void | Phaser.Events.EventEmitter;

    /**
     * Set a game object property.
     *
     * @param config - Property configuration.
     * @param eventSheetManager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     * @returns This CommandExecutor instance.
     */
    setGOProperty(
        config: CommandExecutor.ISetGOPropertyConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    /**
     * Ease game object properties.
     *
     * @param config - Property configuration.
     * @param eventSheetManager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     * @returns This CommandExecutor instance.
     */
    easeGOProperty(
        config: CommandExecutor.IEaseGOPropertyConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    /**
     * Destroy a game object.
     *
     * @param config - Destroy configuration.
     * @param eventSheetManager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     * @returns This CommandExecutor instance.
     */
    destroyGO(
        config: CommandExecutor.IDestroyGOConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    /**
     * Run a method on a game object.
     *
     * @param config - Method configuration.
     * @param eventSheetManager - EventSheetManager instance.
     * @param eventSheet - Behavior tree instance.
     * @returns This CommandExecutor instance.
     */
    runGOMethod(
        config: CommandExecutor.IRunGOMethodConfig,
        eventSheetManager: EventSheetManager,
        eventSheet: BehaviorTree,
    ): this;

    /**
     * Wait for an event on an emitter.
     *
     * @param eventEmitter - Event emitter instance.
     * @param eventName - Event name.
     * @returns This CommandExecutor instance.
     */
    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string
    ): this;

    /**
     * Set data command.
     */
    setData: CommandExecutor.CommandCallbackType;
    /**
     * Increment data command.
     */
    incData: CommandExecutor.CommandCallbackType;
    /**
     * Toggle data command.
     */
    toggleData: CommandExecutor.CommandCallbackType;

    /**
     * Log command.
     */
    log: CommandExecutor.CommandCallbackType;
    /**
     * Disable log command.
     */
    'log.disable': CommandExecutor.CommandCallbackType;
    /**
     * Enable log command.
     */
    'log.enable': CommandExecutor.CommandCallbackType;
    /**
     * Log memory command.
     */
    'log.memory': CommandExecutor.CommandCallbackType;

    /**
     * Set command.
     */
    set: CommandExecutor.CommandCallbackType;

    /**
     * Wait command.
     */
    wait: CommandExecutor.CommandCallbackType;
    /**
     * Click command.
     */
    click: CommandExecutor.CommandCallbackType;

    /**
     * BGM set command.
     */
    'bgm.set': CommandExecutor.CommandCallbackType;
    /**
     * BGM play command.
     */
    'bgm.play': CommandExecutor.CommandCallbackType;
    /**
     * BGM cross command.
     */
    'bgm.cross': CommandExecutor.CommandCallbackType;
    /**
     * BGM stop command.
     */
    'bgm.stop': CommandExecutor.CommandCallbackType;
    /**
     * BGM fade out command.
     */
    'bgm.fadeOut': CommandExecutor.CommandCallbackType;
    /**
     * BGM fade in command.
     */
    'bgm.fadeIn': CommandExecutor.CommandCallbackType;
    /**
     * BGM pause command.
     */
    'bgm.pause': CommandExecutor.CommandCallbackType;
    /**
     * BGM resume command.
     */
    'bgm.resume': CommandExecutor.CommandCallbackType;
    /**
     * BGM mute command.
     */
    'bgm.mute': CommandExecutor.CommandCallbackType;
    /**
     * BGM unmute command.
     */
    'bgm.unmute': CommandExecutor.CommandCallbackType;

    /**
     * BGM2 set command.
     */
    'bgm2.set': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 play command.
     */
    'bgm2.play': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 cross command.
     */
    'bgm2.cross': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 stop command.
     */
    'bgm2.stop': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 fade out command.
     */
    'bgm2.fadeOut': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 fade in command.
     */
    'bgm2.fadeIn': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 pause command.
     */
    'bgm2.pause': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 resume command.
     */
    'bgm2.resume': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 mute command.
     */
    'bgm2.mute': CommandExecutor.CommandCallbackType;
    /**
     * BGM2 unmute command.
     */
    'bgm2.unmute': CommandExecutor.CommandCallbackType;

    /**
     * SE set command.
     */
    'se.set': CommandExecutor.CommandCallbackType;
    /**
     * SE play command.
     */
    'se.play': CommandExecutor.CommandCallbackType;
    /**
     * SE stop command.
     */
    'se.stop': CommandExecutor.CommandCallbackType;
    /**
     * SE fade out command.
     */
    'se.fadeOut': CommandExecutor.CommandCallbackType;
    /**
     * SE mute command.
     */
    'se.mute': CommandExecutor.CommandCallbackType;
    /**
     * SE unmute command.
     */
    'se.unmute': CommandExecutor.CommandCallbackType;

    /**
     * SE2 set command.
     */
    'se2.set': CommandExecutor.CommandCallbackType;
    /**
     * SE2 play command.
     */
    'se2.play': CommandExecutor.CommandCallbackType;
    /**
     * SE2 stop command.
     */
    'se2.stop': CommandExecutor.CommandCallbackType;
    /**
     * SE2 fade out command.
     */
    'se2.fadeOut': CommandExecutor.CommandCallbackType;
    /**
     * SE2 mute command.
     */
    'se2.mute': CommandExecutor.CommandCallbackType;
    /**
     * SE2 unmute command.
     */
    'se2.unmute': CommandExecutor.CommandCallbackType;

    /**
     * Camera set command.
     */
    'camera.set': CommandExecutor.CommandCallbackType;
    /**
     * Camera fade in command.
     */
    'camera.fadeIn': CommandExecutor.CommandCallbackType;
    /**
     * Camera fade out command.
     */
    'camera.fadeOut': CommandExecutor.CommandCallbackType;
    /**
     * Camera flash command.
     */
    'camera.flash': CommandExecutor.CommandCallbackType;
    /**
     * Camera shake command.
     */
    'camera.shake': CommandExecutor.CommandCallbackType;
    /**
     * Camera zoom command.
     */
    'camera.zoomTo': CommandExecutor.CommandCallbackType;
    /**
     * Camera rotate command.
     */
    'camera.rotateTo': CommandExecutor.CommandCallbackType;
    /**
     * Camera scroll command.
     */
    'camera.scrollTo': CommandExecutor.CommandCallbackType;

    /**
     * Get a game object by name.
     *
     * @param name - Game object name.
     * @param out - Output array.
     * @returns A game object or list of game objects.
     */
    getGameObject(
        name: string,
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[];

}
