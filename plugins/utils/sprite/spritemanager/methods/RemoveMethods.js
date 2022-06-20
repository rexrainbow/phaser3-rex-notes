export default {
    remove(name) {
        if (!this.has(name)) {
            return this;
        }

        var spriteData = this.get(name);
        delete this.sprites[name];

        this.removedSprites.push(spriteData.sprite);
        if (this.fadeTime > 0) {
            spriteData.easeProperty(
                'tintGray',                 // property
                0,                          // to value
                this.fadeTime,              // duration
                'Linear',                   // ease
                0,                          // repeat
                false,                      // yoyo
                function () {               // onComplete
                    spriteData.destroy();
                }
            )

        } else {
            spriteData.destroy();

        }
        return this;
    },

    removeAll() {
        var sprites = this.sprites;
        for (var name in sprites) {
            this.remove(name);
        }
        return this;
    },

    clear(destroyChild) {
        if (destroyChild === undefined) {
            destroyChild = true;
        }
        var sprites = this.sprites;
        for (var name in sprites) {
            if (destroyChild) {
                sprites[name].destroy();
            }
            delete sprites[name];
        }
        this.removedSprites.length = 0;
        return this;
    }
}