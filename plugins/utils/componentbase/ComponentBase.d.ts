import EventEmitterMixin from '../eventemitter/EventEmitterMethods';

export default ComponentBase;

declare namespace ComponentBase {
    interface IConfig {
        /**
         * True to create a private EventEmitter, false to disable, or provide one.
         */
        eventEmitter?: Phaser.Events.EventEmitter | boolean;
    }
}

/**
 * Base component that binds to a parent (game object, scene, or game).
 */
declare class ComponentBase {
    /**
     * Create the component and attach it to a parent.
     */
    constructor(
        parent?: Object,
        config?: ComponentBase.IConfig
    );

    /**
     * Assign a parent and resolve the related scene/game references.
     */
    setParent(
        parent?: Object
    ): this;
    /**
     * The bound parent object (game object, scene, or game).
     */
    parent: Object;
    /**
     * Resolved scene of the current parent, if any.
     */
    scene: Phaser.Scene;
    /**
     * Resolved game of the current parent, if any.
     */
    game: Phaser.Game;

    /**
     * Shutdown and cleanup resources.
     */
    destroy(): void;
}

interface ComponentBase extends EventEmitterMixin { }
