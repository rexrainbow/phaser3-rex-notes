import SpriteData from '../SpriteData.js';
import AddTintRGBProperties from '../../../../behaviors/tintrgb/AddTintRGBProperties.js';
import AddViewportCoordinateProperties from '../../../../behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    has(name) {
        return this.sprites.hasOwnProperty(name);
    },

    get(name) {
        return this.sprites[name];
    },

    getSprite(name) {
        return this.get(name).sprite;
    },

    add(name, textureKey, frameName) {
        this.remove(name);

        var sprite;
        if (arguments.length === 3) {
            sprite = this.createCallback(this.scene, textureKey, frameName);
        } else {
            var args = Array.prototype.slice.call(arguments, 1);
            sprite = this.createCallback(this.scene, ...args);
        }

        if (this.fadeTime > 0) {
            AddTintRGBProperties(sprite);
        }
        if (this.viewportCoordinateEnable) {
            AddViewportCoordinateProperties(sprite);
        }

        sprite.once('destroy', function () {
            RemoveItem(this.removedSprites, sprite);
            if (this.isEmpty) {
                this.emit('empty');
            }
        }, this);

        var spriteData = new SpriteData(this, sprite, name);
        this.sprites[name] = spriteData;

        if (this.fadeTime > 0) {
            spriteData
                .setProperty('tintGray', 0)
                .easeProperty('tintGray', 255, this.fadeTime)
        }
        return this;
    }
}