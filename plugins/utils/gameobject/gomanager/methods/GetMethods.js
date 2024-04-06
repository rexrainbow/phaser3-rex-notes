import IsSingleBob from './IsSingleBob.js';

export default {
    has(name) {
        return this.bobs.hasOwnProperty(name);
    },

    exists(name) {
        return this.bobs.hasOwnProperty(name);
    },

    get(name, out) {
        if (IsSingleBob(name)) {
            return this.bobs[name];

        } else {
            if (out === undefined) {
                out = [];
            }

            if (name) {
                name = name.substring(1);
            }

            for (var key in this.bobs) {
                if (name && (key === name)) {
                    continue;
                }

                out.push(this.bobs[key]);
            }

            return out;
        }
    },

    getFitst(excluded) {
        if (excluded && (excluded.charAt(0) === '!')) {
            excluded = excluded.substring(1);
        }

        for (var name in this.bobs) {
            if (excluded && (excluded === name)) {
                continue;
            }

            return this.bobs[name];
        }
        return null;
    },

    getGO(name, out) {
        var bob = this.get(name);
        if (!bob) {
            return null;

        } else if (!Array.isArray(bob)) {
            return bob.gameObject;

        } else {
            if (out === undefined) {
                out = [];
            }
            var bobs = bob;
            bobs.forEach(function (bob) {
                out.push(bob.gameObject);
            })

            return out;

        }
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