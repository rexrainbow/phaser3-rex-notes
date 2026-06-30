import Actor from '../actor/Actor.js';

export default {
    addActor(actor) {
        if (!actor) {
            return this;
        }

        if (!(actor instanceof Actor)) {
            actor = new Actor(actor);
        }

        if (this.actors.indexOf(actor) === -1) {
            this.actors.push(actor);
        }

        return this;
    },

    removeActor(actor) {
        var actorId = (typeof actor === 'string') ? actor : actor && actor.id;

        for (var i = this.actors.length - 1; i >= 0; i--) {
            if (this.actors[i] === actor || (actorId !== undefined && this.actors[i].id === actorId)) {
                this.actors.splice(i, 1);
                return this;
            }
        }

        return this;
    },

    getActor(actorId) {
        var actors = this.actors;

        for (var i = 0, cnt = actors.length; i < cnt; i++) {
            if (actors[i].id === actorId) {
                return actors[i];
            }
        }

        throw new Error(`Actor '${actorId}' not found`);
    },

    // Internal method
    getSortedActors() {
        var actors = this.actors;

        return actors.map(function (actor, index) {
            return { actor, index };
        }).sort(function (a, b) {
            var priorityA = a.actor.priority;
            var priorityB = b.actor.priority;

            if (priorityA !== priorityB) {
                return priorityA - priorityB;
            }

            return a.index - b.index;
        }).map(function (entry) {
            return entry.actor;
        });
    }
}
