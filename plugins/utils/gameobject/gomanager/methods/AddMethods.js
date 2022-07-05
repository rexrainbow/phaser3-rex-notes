import AddTintRGBProperties from '../../../../behaviors/tintrgb/AddTintRGBProperties.js';
import AddViewportCoordinateProperties from '../../../../behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    has(name) {
        return this.bobs.hasOwnProperty(name);
    },

    get(name) {
        return this.bobs[name];
    },

    getGO(name) {
        return this.get(name).gameObject;
    },

    add(name, ...args) {
        this.remove(name);

        var gameObject = this.createGameObjectCallback(this.scene, ...args);
        var hasTintChange = (!!gameObject.setTint) && (this.fadeTime > 0);
        var hasAlphaChange = (!!gameObject.setAlpha) && (this.fadeTime > 0);

        if (hasTintChange) {
            AddTintRGBProperties(gameObject);
        }
        if (this.viewportCoordinateEnable) {
            AddViewportCoordinateProperties(gameObject);
        }

        gameObject.once('destroy', function () {
            RemoveItem(this.removedGOs, gameObject);
            if (this.isEmpty) {
                this.emit('empty');
            }
        }, this);

        var bob = new this.BobClass(this, gameObject, name);
        this.bobs[name] = bob;

        if (hasTintChange) {
            bob
                .setProperty('tintGray', 0)
                .easeProperty('tintGray', 255, this.fadeTime)
        } else if (hasAlphaChange) {
            bob
                .setProperty('alpha', 0)
                .easeProperty('alpha', 1, this.fadeTime)
        }
        return this;
    }
}