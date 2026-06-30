import EventEmitter from '../../../utils/eventemitter/EventEmitter';
import EventSheetManager from '../eventsheetmanager/EventSheetManager';
import Actor, { ActorConfig } from './actor/Actor';
import StateAction, { StateActionConfig, StateActionPhase } from './stateaction/StateAction';

export type ActorStateMachineRunMode = 'parallel' | 'sequence';

export interface ActorStateActionPair<TActor = Actor, TStateAction = StateAction> {
    actor: TActor;
    stateAction: TStateAction;
    type?: 'previous' | 'current';
    tick?: boolean;
}

export interface StartStateActionConfig extends StateActionConfig {
    actorId: string;
    stateActionTitle: string;
    stateActionId?: string;
    replaceCurrentStateAction?: boolean;
}

export interface CanEnterStateConfig {
    actorId: string;
    stateActionTitle: string;
    properties?: Record<string, unknown>;
}

export interface StateActionPhaseConfig<TStateAction = StateAction> {
    actorId?: string;
    stateAction?: TStateAction;
    phase: StateActionPhase;
}

export interface ActorStateMachineRunnerConfig<TActor = Actor, TStateAction = StateAction> {
    mode?: ActorStateMachineRunMode;
    defaultPriority?: number;
    stateActionClass?: new (config?: StateActionConfig) => TStateAction;
    transitionGroupName?: string;
    stateActionGroupName?: string;
    cleanup?: (runner: ActorStateMachine<TActor, TStateAction>) => void | Promise<void>;
}

export default class ActorStateMachine<TActor = Actor, TStateAction = StateAction> extends EventEmitter {
    constructor(eventSheetManager: EventSheetManager, config?: ActorStateMachineRunnerConfig<TActor, TStateAction>);

    eventSheetManager: EventSheetManager;
    actors: TActor[];
    mode: ActorStateMachineRunMode;
    defaultPriority: number;
    stateActionClass: new (config?: StateActionConfig) => TStateAction;
    transitionGroupName: string;
    stateActionGroupName: string;
    isRunning: boolean;
    isStopping: boolean;
    currentRun: EventSheetManager.IRun | null;
    currentStateAction: TStateAction | null;

    setMode(mode: ActorStateMachineRunMode): this;
    start(): this;
    startPromise(): Promise<this>;
    stop(): this;
    abort(): this;
    addActor(actor: TActor | ActorConfig): this;
    removeActor(actor: TActor | string): this;
    getActor(actorId: string): TActor;
    createStateAction(config?: StateActionConfig): TStateAction;
}
