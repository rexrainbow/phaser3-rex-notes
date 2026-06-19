import StateManagerBase from '../../statemanager/StateManagerBase';
import EventSheetManager from '../eventsheetmanager/EventSheetManager';

export default PhaseRunner;

declare namespace PhaseRunner {
    /**
     * Callback that advances this runner to the next phase.
     */
    type NextPhaseCallbackType = () => void;

    /**
     * Custom phase runner.
     *
     * @param runner - Current PhaseRunner instance.
     * @param eventSheetManager - EventSheetManager controlled by this runner.
     * @param nextPhaseCallback - Callback to continue to the next phase.
     */
    type RunCallbackType = (
        runner: PhaseRunner,
        eventSheetManager: EventSheetManager,
        nextPhaseCallback: NextPhaseCallbackType
    ) => void;

    /**
     * Generic event callback.
     */
    type EventCallbackType = (...args: any[]) => void;

    /**
     * Base phase configuration.
     */
    interface IBasePhaseConfig {
        /**
         * Phase name. If omitted, the phase index will be used.
         */
        name?: string,
        /**
         * Next phase name or resolver. If omitted, the next phase in the list is used.
         */
        next?: string | ((runner: PhaseRunner) => string),
    }

    /**
     * Phase that runs an event sheet group until that group emits complete.
     */
    interface IGroupPhaseConfig extends IBasePhaseConfig {
        /**
         * Event sheet group name to start.
         */
        groupName: string,
        run?: never,
    }

    /**
     * Phase that runs custom logic.
     */
    interface ICustomPhaseConfig extends IBasePhaseConfig {
        /**
         * Custom runner. Call nextPhaseCallback when this phase is complete.
         */
        run: RunCallbackType,
        groupName?: string,
    }

    /**
     * Phase configuration.
     */
    type IPhaseConfig = IGroupPhaseConfig | ICustomPhaseConfig;

    /**
     * Configuration options for creating a PhaseRunner.
     */
    interface IConfig {
        /**
         * Ordered phase list.
         */
        phases: IPhaseConfig[],
    }

    namespace Events {
        /**
         * Callback fired when all phases complete naturally.
         */
        type CompleteCallbackType = () => void;
        /**
         * Callback fired when a running phase sequence is stopped.
         */
        type CancelCallbackType = () => void;
    }
}

/**
 * Runs event sheet phases in a state-machine-like sequence.
 */
declare class PhaseRunner extends StateManagerBase {
    /**
     * Create a PhaseRunner.
     *
     * @param eventSheetManager - EventSheetManager controlled by this runner.
     * @param config - Phase runner configuration.
     */
    constructor(
        eventSheetManager: EventSheetManager,
        config: PhaseRunner.IConfig
    );

    /**
     * EventSheetManager controlled by this runner.
     */
    eventSheetManager: EventSheetManager;

    /**
     * Whether this runner is currently inside a non-idle phase.
     */
    readonly isRunning: boolean;

    /**
     * Start from the first phase.
     *
     * @returns This PhaseRunner instance.
     */
    start(): this;

    /**
     * Stop the current run and return to idle state.
     *
     * @returns This PhaseRunner instance.
     */
    stop(): this;

    on(
        event: 'complete',
        callback: PhaseRunner.Events.CompleteCallbackType,
        context?: unknown
    ): this;
    on(
        event: 'cancel',
        callback: PhaseRunner.Events.CancelCallbackType,
        context?: unknown
    ): this;
    on(
        event: string,
        callback: PhaseRunner.EventCallbackType,
        context?: unknown
    ): this;

    once(
        event: 'complete',
        callback: PhaseRunner.Events.CompleteCallbackType,
        context?: unknown
    ): this;
    once(
        event: 'cancel',
        callback: PhaseRunner.Events.CancelCallbackType,
        context?: unknown
    ): this;
    once(
        event: string,
        callback: PhaseRunner.EventCallbackType,
        context?: unknown
    ): this;

    off(
        event: 'complete',
        callback?: PhaseRunner.Events.CompleteCallbackType,
        context?: unknown
    ): this;
    off(
        event: 'cancel',
        callback?: PhaseRunner.Events.CancelCallbackType,
        context?: unknown
    ): this;
    off(
        event: string,
        callback?: PhaseRunner.EventCallbackType,
        context?: unknown
    ): this;
}
