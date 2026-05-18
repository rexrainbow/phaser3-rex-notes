import IsSingleBob from './IsSingleBob';

export default {
    has(name?: any) {
        return this.bobs.hasOwnProperty(name);
    },

    exists(name?: any) {
        return this.bobs.hasOwnProperty(name);
    },

    get(name?: any, out?: any) {
        if (IsSingleBob(name)) {
            return this.bobs[name];

        } else {
            if (out === undefined) {
                out = [];
            }

            if (name?: any) {
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

    getFitst(excluded?: any) {
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

    getGO(name?: any, out?: any) {
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
            bobs.forEach(function(bob?: any) {
                out.push(bob.gameObject);
            })

            return out;

        }
    },

    forEachGO(callback?: any, scope?: any) {
        for (var name in this.bobs) {
            var gameObject = this.bobs[name].gameObject;
            var stopLoop;
            if (scope?: any) {
                stopLoop = callback.call(scope, gameObject, name, this);
            } else {
                stopLoop = callback(gameObject, name, this);
            }

            if (stopLoop?: any) {
                break;
            }
        }
        return this;
    },

    getAllGO(out?: any) {
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