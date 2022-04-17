import Base from './Base.js';
import GetLocalState from './utils/GetLocalState.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BaseAdd = Base.prototype.add;

var Add = function (gameObject, config) {
    this.setParent(gameObject);

    var state = GetLocalState(gameObject);
    state.syncPosition = GetValue(config, 'syncPosition', true);
    state.syncRotation = GetValue(config, 'syncRotation', true);

    this
        .resetChildState(gameObject)           // Reset local state of child
        .updateChildVisible(gameObject)        // Apply parent's visible to child
        .updateChildActive(gameObject)         // Apply parent's active to child
        .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
        .updateChildMask(gameObject);          // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    return this;
}

var AddLocal = function (gameObject) {
    this.setParent(gameObject);

    // Set local state from child directly
    var state = GetLocalState(gameObject);
    state.syncPosition = GetValue(config, 'syncPosition', true);
    state.syncRotation = GetValue(config, 'syncRotation', true);
    // Position
    state.x = gameObject.x;
    state.y = gameObject.y;
    state.rotation = gameObject.rotation;
    state.scaleX = gameObject.scaleX;
    state.scaleY = gameObject.scaleY;
    // Alpha
    state.alpha = gameObject.alpha;
    // Visible
    state.visible = gameObject.visible;
    // Active
    state.active = gameObject.active;

    this
        .updateChildPosition(gameObject)
        .updateChildAlpha(gameObject)
        .updateChildVisible(gameObject)        // Apply parent's visible to child
        .updateChildActive(gameObject)         // Apply parent's active to child
        .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
        .updateChildMask(gameObject);          // Apply parent's mask to child

    BaseAdd.call(this, gameObject);
    return this;
}

export default {
    // Can override this method
    add(gameObject, config) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject);
        } else {
            Add.call(this, gameObject, config);
        }
        return this;
    },

    // Don't override this method
    pin(gameObject, config) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject, config);
        } else {
            Add.call(this, gameObject, config);
        }
        return this;
    },

    addMultiple(gameObjects, config) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            Add.call(this, gameObjects[i], config);
        }
        return this;
    },

    addLocal(gameObject, config) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject, config);
        } else {
            AddLocal.call(this, gameObject, config);
        }
        return this;
    },

    addLocalMultiple(gameObjects, config) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            AddLocal.call(this, gameObjects[i], config);
        }
        return this;
    }
};