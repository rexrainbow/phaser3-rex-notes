class Actor {
    constructor(config = {}) {
        this.id = config.id;
        this.parentId = config.parentId;
        this.priority = config.priority || 0;
        this.transitionTitle = config.transitionTitle;  // Link to an event sheet
        this.previousStateAction = config.previousStateAction;
        this.currentStateAction = config.currentStateAction;
        this.properties = {
            ...(config.properties || {}),
            $actorId: this.id
        };
    }

    isBusy() {
        return this.currentStateAction && this.currentStateAction.isRunning();
    }

    setCurrentStateAction(stateAction) {
        this.currentStateAction = stateAction;
        return this;
    }

    setPreviousStateAction(stateAction) {
        this.previousStateAction = stateAction;
        return this;
    }

    clearPreviousStateAction(stateActionId) {
        if (!stateActionId || (this.previousStateAction && this.previousStateAction.id === stateActionId)) {
            this.previousStateAction = undefined;
        }
        return this;
    }

    replaceCurrentStateAction(stateAction) {
        if (this.previousStateAction) {
            throw new Error(`Actor '${this.id}' already has a previousStateAction`);
        }

        if (this.currentStateAction) {
            this.currentStateAction.clearPhaseFlags();
            this.currentStateAction.markCancelled();
            this.previousStateAction = this.currentStateAction;
        }

        this.currentStateAction = stateAction;
        return this;
    }

    clearCurrentStateAction(stateActionId) {
        if (!stateActionId || (this.currentStateAction && this.currentStateAction.id === stateActionId)) {
            this.currentStateAction = undefined;
        }
        return this;
    }

    dump() {
        var data = {
            id: this.id,
            priority: this.priority,
            properties: { ...this.properties }
        };

        if (this.parentId !== undefined) {
            data.parentId = this.parentId;
        }
        if (this.transitionTitle !== undefined) {
            data.transitionTitle = this.transitionTitle;
        }
        if (this.previousStateAction) {
            data.previousStateAction = this.previousStateAction.dump();
        }
        if (this.currentStateAction) {
            data.currentStateAction = this.currentStateAction.dump();
        }

        return data;
    }
}

export default Actor;
