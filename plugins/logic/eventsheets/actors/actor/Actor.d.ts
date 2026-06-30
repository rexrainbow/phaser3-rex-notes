export interface ActorConfig {
    id?: string;
    parentId?: string;
    priority?: number;
    transitionTitle?: string;
    previousStateAction?: unknown;
    currentStateAction?: unknown;
    properties?: Record<string, unknown>;
}

export default class Actor {
    constructor(config?: ActorConfig);

    id?: string;
    parentId?: string;
    priority: number;
    transitionTitle?: string;
    previousStateAction?: unknown;
    currentStateAction?: unknown;
    properties: Record<string, unknown>;

    isBusy(): boolean;
    setCurrentStateAction(stateAction: unknown): this;
    setPreviousStateAction(stateAction: unknown): this;
    clearPreviousStateAction(stateActionId?: string): this;
    replaceCurrentStateAction(stateAction: unknown): this;
    clearCurrentStateAction(stateActionId?: string): this;
    dump(): Record<string, unknown>;
}
