import TickTask from './TickTask';

export default SceneUpdateTickTask;

declare namespace SceneUpdateTickTask {
    interface IConfig extends TickTask.IConfig {
        /**
         * Scene event name to hook for ticking (e.g. "update" or "postupdate").
         */
        tickEventName?: string;
    }
}

/**
 * TickTask implementation driven by a scene update event.
 */
declare class SceneUpdateTickTask extends TickTask {
    /**
     * Create the task and attach it to a parent.
     */
    constructor(
        parent?: Object,
        config?: SceneUpdateTickTask.IConfig
    );

}
