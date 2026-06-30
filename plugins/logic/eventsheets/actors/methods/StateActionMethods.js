export default {
    createStateActionId(actorId, stateActionTitle) {
        var id = `${actorId}:${stateActionTitle}:${this._nextStateActionId}`;
        this._nextStateActionId += 1;
        return id;
    },

    createStateAction(config = {}) {
        return new this.stateActionClass(config);
    },

    startStateAction(config = {}) {
        var actorId = config.actorId;
        var stateActionTitle = config.stateActionTitle;

        if (!actorId) {
            throw new Error('startStateAction requires actorId');
        }
        if (!stateActionTitle) {
            throw new Error('startStateAction requires stateActionTitle');
        }

        var actor = this.getActor(actorId);
        var isBusy = actor.isBusy();
        if (isBusy && actor.previousStateAction) {
            throw new Error(`Actor '${actorId}' already has a previousStateAction`);
        }

        var stateActionProperties = this.eventSheetManager.getTree(stateActionTitle, this.stateActionGroupName)?.properties || {};
        var stateAction = this.createStateAction({
            ...stateActionProperties,
            ...config,
            id: config.id || config.stateActionId || this.createStateActionId(actorId, stateActionTitle),
            actorId,
            stateActionTitle,
            durationTicks: config.durationTicks || stateActionProperties.durationTicks,
            properties: {
                ...(stateActionProperties.properties || {}),
                ...(config.properties || {})
            }
        });

        if (isBusy) {
            actor.replaceCurrentStateAction(stateAction);
        } else {
            actor.setCurrentStateAction(stateAction);
        }

        return stateAction;
    },

    canEnterState(config = {}) {
        var actorId = config.actorId;
        var stateActionTitle = config.stateActionTitle;

        if (!actorId) {
            throw new Error('canEnterState requires actorId');
        }
        if (!stateActionTitle) {
            throw new Error('canEnterState requires stateActionTitle');
        }
        if (!this.eventSheetManager) {
            throw new Error('canEnterState requires an EventSheetManager with evalCondition()');
        }

        return this.eventSheetManager.evalCondition(stateActionTitle, this.stateActionGroupName, {
            ...(config.properties || {}),
            $actorId: actorId,
            $stateActionTitle: stateActionTitle
        });
    },

    stateActionPhase(config = {}) {
        var stateAction = config.stateAction;

        if (!stateAction && config.actorId) {
            var actor = this.getActor(config.actorId);
            stateAction = actor.currentStateAction;
        }

        return stateAction ? stateAction.hasPhaseFlag(config.phase) : false;
    },

    clearEndedStateActions() {
        var actors = this.actors;

        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            var actor = actors[i];
            var stateAction = actor.currentStateAction;

            if (stateAction && !stateAction.isRunning()) {
                actor.clearCurrentStateAction(stateAction.id);
            }
        }

        return this;
    },

    clearPreviousStateActions() {
        var actors = this.actors;

        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            var actor = actors[i];

            actor.clearPreviousStateAction();
        }

        return this;
    },

    clearAllStateActionPhaseFlags() {
        var actors = this.actors;

        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            var actor = actors[i];

            var previousStateAction = actor.previousStateAction;
            if (previousStateAction) {
                previousStateAction.clearPhaseFlags();
            }

            var stateAction = actor.currentStateAction;
            if (stateAction) {
                stateAction.clearPhaseFlags();
            }
        }

        return this;
    },

    cleanupStateActions() {
        this.clearAllStateActionPhaseFlags();
        this.clearPreviousStateActions();
        this.clearEndedStateActions();
        return this;
    }
}
