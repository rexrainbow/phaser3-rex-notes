export default {
    has(name) {
        return this.bobs.hasOwnProperty(name);
    },

    exists(name) {
        return this.bobs.hasOwnProperty(name);
    },

    get(name) {
        return this.bobs[name];
    },

    getGO(name) {
        var bob = this.get(name);
        return (bob) ? bob.gameObject : null;
    },

    forEachGO(callback, scope) {
        for (var name in this.bobs) {
            var gameObject = this.bobs[name].gameObject;
            var stopLoop;
            if (scope) {
                stopLoop = callback.call(scope, gameObject, name, this);
            } else {
                stopLoop = callback(gameObject, name, this);
            }

            if (stopLoop) {
                break;
            }
        }
        return this;
    },

    getAllGO(out) {
        if (out === undefined) {
            out = [];
        }

        for (var name in this.bobs) {
            var gameObject = this.bobs[name].gameObject;
            out.push(gameObject);
        }

        return out;
    }
}