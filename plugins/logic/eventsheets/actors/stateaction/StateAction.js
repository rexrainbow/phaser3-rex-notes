const STATE_ACTION_PHASES = ['start', 'tick', 'complete', 'interrupt', 'cancel'];

const CreatePhaseFlags = function (phaseFlags = {}) {
    var flags = {};

    for (var i = 0, cnt = STATE_ACTION_PHASES.length; i < cnt; i++) {
        var phase = STATE_ACTION_PHASES[i];
        flags[phase] = phaseFlags[phase] || false;
    }

    return flags;
}

class StateAction {
    constructor(config = {}) {
        this.id = config.id;
        this.actorId = config.actorId;
        this.stateActionTitle = config.stateActionTitle;
        this.durationTicks = config.durationTicks || config.remainingTicks || 1;
        this.remainingTicks = config.remainingTicks || this.durationTicks;
        this.status = config.status || 'running';
        this.properties = {
            ...(config.properties || {}),
            $actorId: this.actorId,
            $stateActionId: this.id,
            $stateActionTitle: this.stateActionTitle
        };
        this.phaseFlags = CreatePhaseFlags(config.phaseFlags);
        this.markStarted();
    }

    isRunning() {
        return this.status === 'running';
    }

    setPhaseFlag(phase, value = true) {
        this.phaseFlags[phase] = value;
        return this;
    }

    clearPhaseFlag(phase) {
        this.phaseFlags[phase] = false;
        return this;
    }

    clearPhaseFlags() {
        this.phaseFlags = CreatePhaseFlags();
        return this;
    }

    hasPhaseFlag(phase) {
        return this.phaseFlags[phase] === true;
    }

    markStarted() {
        this.status = 'running';
        return this.setPhaseFlag('start');
    }

    markTick(ticks = 1) {
        if (!this.isRunning()) {
            return this.remainingTicks;
        }

        this.setPhaseFlag('tick');
        this.remainingTicks = Math.max(0, this.remainingTicks - ticks);

        if (this.remainingTicks === 0) {
            this.markCompleted();
        }

        return this.remainingTicks;
    }

    markCompleted() {
        this.remainingTicks = 0;
        this.status = 'completed';
        return this.setPhaseFlag('complete');
    }

    markInterrupted() {
        if (this.status === 'running') {
            this.status = 'interrupted';
        }
        return this.setPhaseFlag('interrupt');
    }

    markCancelled() {
        if (this.status === 'running') {
            this.status = 'cancelled';
        }
        return this.setPhaseFlag('cancel');
    }

    dump() {
        return {
            id: this.id,
            actorId: this.actorId,
            stateActionTitle: this.stateActionTitle,
            durationTicks: this.durationTicks,
            remainingTicks: this.remainingTicks,
            status: this.status,
            properties: { ...this.properties },
            phaseFlags: { ...this.phaseFlags }
        };
    }
}

export { STATE_ACTION_PHASES };
export default StateAction;
