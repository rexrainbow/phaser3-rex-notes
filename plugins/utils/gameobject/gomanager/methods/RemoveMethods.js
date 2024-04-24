export default {
    remove(name, ignoreFade) {
        var bobs = this.get(name);
        if (!bobs) {
            return this;
        } else if (!Array.isArray(bobs)) {
            bobs = [bobs];
        }

        var self = this;
        bobs.forEach(function (bob) {
            delete self.bobs[bob.name];

            var gameObject = bob.gameObject;
            self.removedGOs.push(gameObject);
            gameObject.setName();

            if (!ignoreFade) {
                self.fadeBob(
                    bob,                  // bob
                    undefined,            // fromValue
                    0,                    // toValue
                    function () {         // onComplete
                        bob.destroy();
                    }
                )
            } else {
                bob.destroy();
            }
        });

        return this;
    },

    removeAll() {
        var bobs = this.bobs;
        for (var name in bobs) {
            this.remove(name);
        }
        return this;
    },

    clear(destroyChild) {
        if (destroyChild === undefined) {
            destroyChild = true;
        }
        var bobs = this.bobs;
        for (var name in bobs) {
            if (destroyChild) {
                bobs[name].destroy();
            }
            delete bobs[name];
        }
        this.removedGOs.length = 0;
        return this;
    }
}