import Base from './Base.js';
import GetLocalState from './utils/GetLocalState.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const BaseAdd = Base.prototype.add;

var Add = function (gameObject, config) {
    this.setParent(gameObject);

    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);

    this
        .resetChildState(gameObject)           // Reset local state of child
        .updateChildVisible(gameObject)        // Apply parent's visible to child
        .updateChildActive(gameObject)         // Apply parent's active to child
        .updateChildScrollFactor(gameObject)   // Apply parent's scroll factor to child
        .updateChildMask(gameObject)           // Apply parent's mask to child
        .updateCameraFilter(gameObject);       // Apply parent's cameraFilter to child

    BaseAdd.call(this, gameObject);

    SyncDisplayList.call(this, gameObject, state);

    return this;
}

var AddLocal = function (gameObject, config) {
    this.setParent(gameObject);

    // Set local state from child directly
    var state = GetLocalState(gameObject);
    SetupSyncFlags(state, config);
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

    SyncDisplayList.call(this, gameObject, state);

    return this;
}

var SetupSyncFlags = function (state, config) {
    if (config === undefined) {
        config = true;
    }

    if (typeof (config) === 'boolean') {
        state.syncPosition = config;
        state.syncRotation = config;
        state.syncScale = config;
        state.syncAlpha = config;
        state.syncScrollFactor = config;
        state.syncCameraFilter = config;
        state.syncDisplayList = config;
    } else {
        state.syncPosition = GetValue(config, 'syncPosition', true);
        state.syncRotation = GetValue(config, 'syncRotation', true);
        state.syncScale = GetValue(config, 'syncScale', true);
        state.syncAlpha = GetValue(config, 'syncAlpha', true);
        state.syncScrollFactor = GetValue(config, 'syncScrollFactor', true);
        state.syncCameraFilter = GetValue(config, 'syncCameraFilter', true);
        state.syncDisplayList = GetValue(config, 'syncDisplayList', true);
    }

}

var SyncDisplayList = function (gameObject, state) {
    this.addToParentContainer(gameObject);     // Sync parent's container to child

    if (state.syncDisplayList) {
        this.addToPatentLayer(gameObject);     // Sync parent's layer to child
    }

    this.addToRenderLayer(gameObject);         // Sync parent's render-layer
}

export default {
    // Can override this method
    add(gameObject) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject);
        } else {
            Add.call(this, gameObject);
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

    // Can override this method
    addMultiple(gameObjects) {
        var args = Array.from(arguments);
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            args[0] = gameObjects[i];
            this.add.apply(this, args);
        }
        return this;
    },

    addLocal(gameObject) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject);
        } else {
            AddLocal.call(this, gameObject);
        }
        return this;
    },

    // Don't override this method
    pinLocal(gameObject, config) {
        if (Array.isArray(gameObject)) {
            this.addMultiple(gameObject, config);
        } else {
            AddLocal.call(this, gameObject, config);
        }
        return this;
    },

    addLocalMultiple(gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            AddLocal.call(this, gameObjects[i]);
        }
        return this;
    }
};