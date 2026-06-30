var RunParallelMethods = {
    async runParallel() {
        var actors = this.getSortedActors();
        this.emit('transitionPhase.start', actors, this);

        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            await this.runActorStateTransition(actors[i]);
        }

        this.emit('transitionPhase.complete', actors, this);

        var actorStateActionPairs = this.getActorStateActionPairs(actors);
        this.emit('stateActionPhase.start', actorStateActionPairs, this);

        for (var i = 0, cnt = actorStateActionPairs.length; i < cnt; i++) {
            await this.runActorStateAction(
                actorStateActionPairs[i].actor,
                actorStateActionPairs[i].stateAction,
                actorStateActionPairs[i]
            );
        }

        this.emit('stateActionPhase.complete', actorStateActionPairs, this);
    },

    getActorStateActionPairs(actors) {
        var pairs = [];

        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            var actor = actors[i];
            var previousStateAction = actor.previousStateAction;
            var stateAction = actor.currentStateAction;

            if (previousStateAction) {
                pairs.push({
                    actor,
                    stateAction: previousStateAction,
                    type: 'previous',
                    tick: false
                });
            }
            if (stateAction) {
                pairs.push({
                    actor,
                    stateAction,
                    type: 'current',
                    tick: true
                });
            }
        }

        return pairs;
    }
}

export default RunParallelMethods;
