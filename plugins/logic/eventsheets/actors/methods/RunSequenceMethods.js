var RunSequenceMethods = {
    async runSequence() {
        var actors = this.getSortedActors();
        this.emit('sequence.start', actors, this);

        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            var actor = actors[i];
            await this.runActorStateTransition(actor);

            var previousStateAction = actor.previousStateAction;
            if (previousStateAction) {
                await this.runActorStateAction(actor, previousStateAction, {
                    type: 'previous',
                    tick: false
                });
            }

            var stateAction = actor.currentStateAction;
            if (stateAction) {
                await this.runActorStateAction(actor, stateAction, {
                    type: 'current',
                    tick: true
                });
            }
        }

        this.emit('sequence.complete', actors, this);
    }
}

export default RunSequenceMethods;
