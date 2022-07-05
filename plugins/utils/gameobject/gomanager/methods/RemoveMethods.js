export default {
    remove(name) {
        if (!this.has(name)) {
            return this;
        }

        var bob = this.get(name);
        delete this.bobs[name];

        this.removedGOs.push(bob.gameObject);
        var hasTintChange = (!!bob.gameObject.setTint) && (this.fadeTime > 0);
        var hasAlphaChange = (!!gameObject.setAlpha) && (this.fadeTime > 0);

        if (hasTintChange) {
            bob.easeProperty(
                'tintGray',                 // property
                0,                          // to value
                this.fadeTime,              // duration
                'Linear',                   // ease
                0,                          // repeat
                false,                      // yoyo
                function () {               // onComplete
                    bob.destroy();
                }
            )
        } else if (hasAlphaChange) {
            bob.easeProperty(
                'alpha',                    // property
                0,                          // to value
                this.fadeTime,              // duration
                'Linear',                   // ease
                0,                          // repeat
                false,                      // yoyo
                function () {               // onComplete
                    bob.destroy();
                }
            )

        } else {
            bob.destroy();

        }
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