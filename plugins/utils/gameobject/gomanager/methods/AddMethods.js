import AddTintRGBProperties from '../../../../behaviors/tintrgb/AddTintRGBProperties.js';
import AddViewportCoordinateProperties from '../../../../behaviors/viewportcoordinate/AddViewportCoordinateProperties.js';
import AddEffectProperties from '../../../../behaviors/effectproperties/AddEffectProperties.js';

const RemoveItem = Phaser.Utils.Array.Remove;

export default {
    addGO(name, gameObject) {
        this.remove(name, true);

        if (this.useTintFadeEffect(gameObject)) {
            AddTintRGBProperties(gameObject);
        }

        if (this.viewportCoordinateEnable) {
            AddViewportCoordinateProperties(gameObject, this.viewport);
        }

        if (this.effectPropertiesConfig) {
            AddEffectProperties(gameObject, this.effectPropertiesConfig);
        }

        gameObject
            .setName(name)
            .once('destroy', function () {
                RemoveItem(this.removedGOs, gameObject);
                if (this.isEmpty) {
                    this.emit('empty');
                }
            }, this);

        var bob = new this.BobClass(this, gameObject, name);
        this.bobs[name] = bob;

        return this;
    },

    add(name, ...args) {
        var callback = this.createGameObjectCallback;
        var scope = this.createGameObjectScope;
        var gameObject = callback.call(scope, this.scene, ...args);
        this.addGO(name, gameObject);

        if (this.gameObjectDepth != null) { // Not undefined, null
            gameObject.setDepth(this.gameObjectDepth);
        }

        var bob = this.get(name);
        this.fadeBob(bob, 0, 1);

        return this;
    },
}