export type StateActionStatus = 'running' | 'completed' | 'interrupted' | 'cancelled';
export type StateActionPhase = 'start' | 'tick' | 'complete' | 'interrupt' | 'cancel';
export type StateActionPhaseFlags = Record<StateActionPhase, boolean>;

export interface StateActionConfig {
    id?: string;
    actorId?: string;
    stateActionTitle?: string;
    durationTicks?: number;
    remainingTicks?: number;
    status?: StateActionStatus;
    properties?: Record<string, unknown>;
    phaseFlags?: Partial<StateActionPhaseFlags>;
}

export const STATE_ACTION_PHASES: StateActionPhase[];

export default class StateAction {
    constructor(config?: StateActionConfig);

    id?: string;
    actorId?: string;
    stateActionTitle?: string;
    durationTicks: number;
    remainingTicks: number;
    status: StateActionStatus;
    properties: Record<string, unknown>;
    phaseFlags: StateActionPhaseFlags;

    isRunning(): boolean;
    setPhaseFlag(phase: StateActionPhase, value?: boolean): this;
    clearPhaseFlag(phase: StateActionPhase): this;
    clearPhaseFlags(): this;
    hasPhaseFlag(phase: StateActionPhase): boolean;
    markStarted(): this;
    markTick(ticks?: number): number;
    markCompleted(): this;
    markInterrupted(): this;
    markCancelled(): this;
    dump(): Record<string, unknown>;
}
