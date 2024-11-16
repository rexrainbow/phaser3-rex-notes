(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdropdownlist = factory());
})(this, (function () { 'use strict';

    const MinVersion = 60;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = MinVersion;
        }
        var version = Phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === 3) {
            var currentVersion = parseInt(version[1]);
            if (currentVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${currentVersion}`);
            }
        } else {
            console.error(`Can't supported version : ${mainVersion}`);
        }

        IsChecked = true;
    };

    CheckP3Version();

    const Zone$1 = Phaser.GameObjects.Zone;
    const AddItem = Phaser.Utils.Array.Add;
    const RemoveItem$9 = Phaser.Utils.Array.Remove;

    let Base$2 = class Base extends Zone$1 {
        constructor(scene, x, y, width, height) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 1;
            }
            if (height === undefined) {
                height = 1;
            }
            super(scene, x, y, width, height);
            this.children = [];
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            if (fromScene) {
                // Stop scene
                var child;
                for (var i = this.children.length - 1; i >= 0; i--) {
                    child = this.children[i];
                    if (!child.parentContainer &&  // Not in container
                        !child.displayList         // Not in scene, neither in layer
                    ) {
                        // Destroy child which is not in scene, container, or layer manually
                        child.destroy(fromScene);
                    }
                }
            }

            // Destroy/remove children
            this.clear(!fromScene);
            super.destroy(fromScene);
        }

        contains(gameObject) {
            return (this.children.indexOf(gameObject) !== -1);
        }

        add(gameObjects) {
            var parent = this;
            AddItem(this.children, gameObjects, 0,
                // Callback of item added
                function (gameObject) {
                    gameObject.once('destroy', parent.onChildDestroy, parent);
                }, this);
            return this;
        }

        remove(gameObjects, destroyChild) {
            var parent = this;
            RemoveItem$9(this.children, gameObjects,
                // Callback of item removed
                function (gameObject) {
                    gameObject.off('destroy', parent.onChildDestroy, parent);
                    if (destroyChild) {
                        gameObject.destroy();
                    }
                }
            );
            return this;
        }

        onChildDestroy(child, fromScene) {
            // Only remove reference
            this.remove(child, false);
        }

        clear(destroyChild) {
            var parent = this;
            var gameObject;
            for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                gameObject = this.children[i];
                gameObject.off('destroy', parent.onChildDestroy, parent);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
            this.children.length = 0;
            return this;
        }
    };

    const Components$1 = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Base$2,
        [
            Components$1.Alpha,
            Components$1.Flip
        ]
    );

    var GetParent$1 = function (gameObject, name) {
        var parent;
        if (name === undefined) {
            if (gameObject.hasOwnProperty('rexContainer')) {
                parent = gameObject.rexContainer.parent;
            }
        } else {
            parent = GetParent$1(gameObject);
            while (parent) {
                if (parent.name === name) {
                    break;
                }
                parent = GetParent$1(parent);
            }
        }
        return parent;
    };

    var GetTopmostParent$1 = function (gameObject) {
        var parent = GetParent$1(gameObject);
        while (parent) {
            gameObject = parent;
            parent = GetParent$1(parent);
        }
        return gameObject;
    };

    const DegToRad$6 = Phaser.Math.DegToRad;
    const RadToDeg$3 = Phaser.Math.RadToDeg;

    var GetLocalState = function (gameObject) {
        if (!gameObject.hasOwnProperty('rexContainer')) {
            var rexContainer = {
                parent: null, self: null, layer: null,
                x: 0, y: 0, syncPosition: true,
                rotation: 0, syncRotation: true,
                scaleX: 0, scaleY: 0, syncScale: true,
                alpha: 0, syncAlpha: true,
                syncScrollFactor: true,
                syncCameraFilter: true,
                syncDisplayList: true,
                visible: true,
                active: true,
            };

            Object.defineProperty(rexContainer, 'angle', {
                get: function () {
                    return RadToDeg$3(this.rotation);
                },
                set: function (value) {
                    this.rotation = DegToRad$6(value);
                }
            });
            Object.defineProperty(rexContainer, 'displayWidth', {
                get: function () {
                    return gameObject.width * this.scaleX;
                },
                set: function (width) {
                    this.scaleX = width / gameObject.width;
                }
            });
            Object.defineProperty(rexContainer, 'displayHeight', {
                get: function () {
                    return gameObject.height * this.scaleY;
                },
                set: function (height) {
                    this.scaleY = height / gameObject.height;
                }
            });

            gameObject.rexContainer = rexContainer;
        }
        return gameObject.rexContainer;
    };

    var Parent = {
        setParent(gameObject, parent) {
            if (parent === undefined) {
                parent = this;
            }
            var localState = GetLocalState(gameObject);
            if (parent) { // Add to parent
                localState.parent = parent;
                localState.self = gameObject;
            } else { // Remove from parent
                localState.parent = null;
                localState.self = null;
            }
            return this;
        },

        getParent(gameObject, name) {
            if (typeof (gameObject) === 'string') {
                name = gameObject;
                gameObject = undefined;
            }
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetParent$1(gameObject, name);
        },

        getTopmostParent(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetTopmostParent$1(gameObject);
        }
    };

    const GetValue$1n = Phaser.Utils.Objects.GetValue;
    const BaseAdd = Base$2.prototype.add;

    var Add$6 = function (gameObject, config) {
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
    };

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
    };

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
            state.syncPosition = GetValue$1n(config, 'syncPosition', true);
            state.syncRotation = GetValue$1n(config, 'syncRotation', true);
            state.syncScale = GetValue$1n(config, 'syncScale', true);
            state.syncAlpha = GetValue$1n(config, 'syncAlpha', true);
            state.syncScrollFactor = GetValue$1n(config, 'syncScrollFactor', true);
            state.syncCameraFilter = GetValue$1n(config, 'syncCameraFilter', true);
            state.syncDisplayList = GetValue$1n(config, 'syncDisplayList', true);
        }

    };

    var SyncDisplayList = function (gameObject, state) {
        this.addToParentContainer(gameObject);     // Sync parent's container to child

        if (state.syncDisplayList) {
            this.addToPatentLayer(gameObject);     // Sync parent's layer to child
        }

        this.addToRenderLayer(gameObject);         // Sync parent's render-layer
    };

    var AddChild$3 = {
        // Can override this method
        add(gameObject) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject);
            } else {
                Add$6.call(this, gameObject);
            }
            return this;
        },

        // Don't override this method
        pin(gameObject, config) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject, config);
            } else {
                Add$6.call(this, gameObject, config);
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

    const BaseRemove = Base$2.prototype.remove;
    const BaseClear = Base$2.prototype.clear;

    var RemoveChild$2 = {
        // Can override this method
        remove(gameObject, destroyChild) {
            if (GetParent$1(gameObject) !== this) {
                return this;
            }
            this.setParent(gameObject, null);

            if (!destroyChild) {
                this.removeFromRenderLayer(gameObject);
            }

            BaseRemove.call(this, gameObject, destroyChild);
            return this;
        },

        // Don't override this method
        unpin(gameObject, destroyChild) {
            if (GetParent$1(gameObject) !== this) {
                return this;
            }
            this.setParent(gameObject, null);

            if (!destroyChild) {
                this.removeFromRenderLayer(gameObject);
            }

            BaseRemove.call(this, gameObject, destroyChild);
            return this;
        },

        clear(destroyChild) {
            var children = this.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                this.setParent(child, null);

                if (!destroyChild) {
                    this.removeFromRenderLayer(child);
                }
            }
            BaseClear.call(this, destroyChild);
            return this;
        },
    };

    var ChildState = {
        getLocalState(gameObject) {
            return GetLocalState(gameObject);
        },

        resetChildState(gameObject) {
            this
                .resetChildPositionState(gameObject)
                .resetChildVisibleState(gameObject)
                .resetChildAlphaState(gameObject)
                .resetChildActiveState(gameObject);
            return this;
        },

        resetChildrenState(gameObjects) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.resetChildState(gameObjects[i]);
            }
            return this;
        },

        syncProperties() {
            this
                .syncPosition()
                .syncVisible()
                .syncAlpha()
                .syncActive()
                .syncScrollFactor()
                .syncMask();
            return this;
        }
    };

    var Transform = {
        worldToLocal(point) {
            // Transform
            point.x -= this.x;
            point.y -= this.y;

            // Rotate
            var c = Math.cos(-this.rotation);
            var s = Math.sin(-this.rotation);
            var tx = point.x;
            var ty = point.y;
            point.x = tx * c - ty * s;
            point.y = tx * s + ty * c;

            // Scale
            point.x /= this.scaleX;
            point.y /= this.scaleY;
            return point;
        },

        localToWorld(point) {
            // Scale
            point.x *= this.scaleX;
            point.y *= this.scaleY;

            // Rotate
            var c = Math.cos(this.rotation);
            var s = Math.sin(this.rotation);
            var tx = point.x;
            var ty = point.y;
            point.x = tx * c - ty * s;
            point.y = tx * s + ty * c;

            // Transform
            point.x += this.x;
            point.y += this.y;
            return point;
        }
    };

    var GetScale = function (a, b) {
        if (a === b) {
            return 1;
        } else {
            return a / b;
        }
    };

    var Position = {
        updateChildPosition(child) {
            if (child.isRexContainerLite) {
                child.syncChildrenEnable = false;
            }
            var localState = GetLocalState(child);
            var parent = localState.parent;

            if (localState.syncPosition) {
                child.x = localState.x;
                child.y = localState.y;
                parent.localToWorld(child);
            }

            if (localState.syncRotation) {
                child.rotation = localState.rotation + parent.rotation;
            }

            if (localState.syncScale) {
                child.scaleX = localState.scaleX * parent.scaleX;
                child.scaleY = localState.scaleY * parent.scaleY;
            }

            if (child.isRexContainerLite) {
                child.syncChildrenEnable = true;
                child.syncPosition();
            }
            return this;
        },

        syncPosition() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildPosition, this);
            }
            return this;
        },

        resetChildPositionState(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            localState.x = child.x;
            localState.y = child.y;
            parent.worldToLocal(localState);

            localState.scaleX = GetScale(child.scaleX, parent.scaleX);
            localState.scaleY = GetScale(child.scaleY, parent.scaleY);

            localState.rotation = child.rotation - parent.rotation;
            return this;
        },

        setChildPosition(child, x, y) {
            child.x = x;
            child.y = y;
            this.resetChildPositionState(child);
            return this;
        },

        setChildLocalPosition(child, x, y) {
            var localState = GetLocalState(child);
            localState.x = x;
            localState.y = y;
            this.updateChildPosition(child);
            return this;
        },

        resetLocalPositionState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildPositionState(this);
            }
            return this;
        },

        getChildLocalX(child) {
            var localState = GetLocalState(child);
            return localState.x;
        },

        getChildLocalY(child) {
            var localState = GetLocalState(child);
            return localState.y;
        },

    };

    const DegToRad$5 = Phaser.Math.DegToRad;

    var Rotation = {
        updateChildRotation(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            if (localState.syncRotation) {
                child.rotation = parent.rotation + localState.rotation;
            }
            return this;
        },

        syncRotation() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildRotation, this);
            }
            return this;
        },

        resetChildRotationState(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            localState.rotation = child.rotation - parent.rotation;
            return this;
        },

        setChildRotation(child, rotation) {
            child.rotation = rotation;
            this.resetChildRotationState(child);
            return this;
        },

        setChildAngle(child, angle) {
            child.angle = angle;
            this.resetChildRotationState(child);
            return this;
        },

        setChildLocalRotation(child, rotation) {
            var localState = GetLocalState(child);
            localState.rotation = rotation;
            this.updateChildRotation(child);
            return this;
        },

        setChildLocalAngle(child, angle) {
            var localState = GetLocalState(child);
            localState.rotation = DegToRad$5(angle);
            this.updateChildRotation(child);
            return this;
        },

        resetLocalRotationState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildRotationState(this);
            }
            return this;
        },

        getChildLocalRotation(child) {
            var localState = GetLocalState(child);
            return localState.rotation;
        },

    };

    var Scale$2 = {
        updateChildScale(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            if (state.syncScale) {
                child.scaleX = parent.scaleX * state.scaleX;
                child.scaleY = parent.scaleY * state.scaleY;
            }
            return this;
        },

        syncScale() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildScale, this);
            }
            return this;
        },

        resetChildScaleState(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            state.scaleX = GetScale(child.scaleX, parent.scaleX);
            state.scaleY = GetScale(child.scaleY, parent.scaleY);
            return this;
        },

        setChildScale(child, scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }
            child.scaleX = scaleX;
            child.scaleY = scaleY;
            this.resetChildScaleState(child);
            return this;
        },

        setChildLocalScale(child, scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }
            var state = GetLocalState(child);
            state.scaleX = scaleX;
            state.scaleY = scaleY;
            this.updateChildScale(child);
            return this;
        },

        setChildDisplaySize(child, width, height) {
            child.setDisplaySize(width, height);
            this.resetChildScaleState(child);
            return this;
        },

        resetLocalScaleState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildScaleState(this);
            }
            return this;
        },

        getChildLocalScaleX(child) {
            var localState = GetLocalState(child);
            return localState.scaleX;
        },

        getChildLocalScaleY(child) {
            var localState = GetLocalState(child);
            return localState.scaleY;
        },
    };

    /*

    Visible in localState:

      - visible: original visible of child
      - maskVisible: invisible by parent mask, see MaskChildren.js
          - undefined (not in masking) : Equal to mask visible
          - true (mask visible) : Inside, or across parent's visible area
          - false (maske invisible) : Out of parent's visible area

    Visible result of child = (parent visible) && (child visible) && (mask visible)
    */


    var Visible = {
        updateChildVisible(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            var maskVisible = (localState.hasOwnProperty('maskVisible')) ? localState.maskVisible : true;
            var parentVisible = (parent) ? parent.visible : true;
            child.visible = parentVisible && localState.visible && maskVisible;
            return this;
        },

        syncVisible() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildVisible, this);
            }
            return this;
        },

        resetChildVisibleState(child) {
            var localState = GetLocalState(child);
            // Delete maskVisible property
            if (localState.hasOwnProperty('maskVisible')) {
                delete localState.maskVisible;
            }
            localState.visible = child.visible;
            return this;
        },

        setChildVisible(child, visible) {
            // Visible of child will be affect by parent's visible, and mask visible
            this.setChildLocalVisible(child, visible);
            return this;
        },

        // Internal method
        setChildLocalVisible(child, visible) {
            if (visible === undefined) {
                visible = true;
            }
            var localState = GetLocalState(child);
            localState.visible = visible;
            this.updateChildVisible(child);
            return this;
        },

        // Internal method
        setChildMaskVisible(child, visible) {
            if (visible === undefined) {
                visible = true;
            }
            var localState = GetLocalState(child);
            localState.maskVisible = visible;
            this.updateChildVisible(child);
            return this;
        },

        resetLocalVisibleState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildVisibleState(this);
            }
            return this;
        },

        getChildLocalVisible(child) {
            var localState = GetLocalState(child);
            return localState.visible;
        },
    };

    var Alpha = {
        updateChildAlpha(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            if (state.syncAlpha) {
                child.alpha = parent.alpha * state.alpha;
            }
            return this;
        },

        syncAlpha() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildAlpha, this);
            }
            return this;
        },

        resetChildAlphaState(child) {
            var state = GetLocalState(child);
            var parent = state.parent;
            state.alpha = GetScale(child.alpha, parent.alpha);
            return this;
        },

        setChildAlpha(child, alpha) {
            child.alpha = alpha;
            this.resetChildAlphaState(child);
            return this;
        },

        setChildLocalAlpha(child, alpha) {
            var state = GetLocalState(child);
            state.alpha = alpha;
            this.updateChildAlpha(child);
            return this;
        },

        resetLocalAlphaState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildAlphaState(this);
            }
            return this;
        },

        getChildLocalAlpha(child) {
            var localState = GetLocalState(child);
            return localState.alpha;
        },
    };

    var Active = {
        updateChildActive(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;
            child.active = parent.active && localState.active;
            return this;
        },

        syncActive() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildActive, this);
            }
            return this;
        },

        resetChildActiveState(child) {
            var localState = GetLocalState(child);
            localState.active = child.active;
            return this;
        },

        setChildActive(child, active) {
            child.active = active;
            this.resetChildActiveState(child);
            return this;
        },

        setChildLocalActive(child, active) {
            if (active === undefined) {
                active = true;
            }
            var localState = GetLocalState(child);
            localState.active = active;
            this.updateChildActive(child);
            return this;
        },

        resetLocalActiveState() {
            var parent = GetLocalState(this).parent;
            if (parent) {
                parent.resetChildActiveState(this);
            }
            return this;
        },

        getChildLocalActive(child) {
            var localState = GetLocalState(child);
            return localState.active;
        },
    };

    var ScrollFactor = {
        updateChildScrollFactor(child) {
            var localState = GetLocalState(child);
            var parent = localState.parent;

            if (localState.syncScrollFactor) {
                child.scrollFactorX = parent.scrollFactorX;
                child.scrollFactorY = parent.scrollFactorY;
            }

            return this;
        },

        syncScrollFactor() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildScrollFactor, this);
            }
            return this;
        },

    };

    var CameraFilter = {
        updateCameraFilter(child) {
            var state = GetLocalState(child);
            var parent = state.parent;

            if (state.syncCameraFilter) {
                child.cameraFilter = parent.cameraFilter;
            }

            return this;
        },

        syncCameraFilter() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateCameraFilter, this);
            }
            return this;
        },
    };

    var Mask = {
        updateChildMask(child) {
            // Don't propagate null mask to clear children's mask
            if (this.mask == null) {
                return this;
            }

            var maskGameObject = (this.mask.hasOwnProperty('geometryMask')) ? this.mask.geometryMask : this.mask.bitmapMask;
            if (maskGameObject !== child) {
                child.mask = this.mask;
            }
            return this;
        },

        syncMask() {
            if (this.syncChildrenEnable) {
                this.children.forEach(this.updateChildMask, this);
            }
            return this;
        },

        setMask(mask) {
            this.mask = mask;
            return this;
        },

        clearMask(destroyMask) {
            if (destroyMask === undefined) {
                destroyMask = false;
            }

            var self = this;

            // Clear current mask
            this._mask = null;

            this.setChildMaskVisible(this);
            // Also set maskVisible to `true`

            this.children.forEach(function (child) {
                // Clear child's mask
                if (child.clearMask) {
                    child.clearMask(false);
                }

                if (!child.hasOwnProperty('isRexContainerLite')) {
                    self.setChildMaskVisible(child);
                    // Set child's maskVisible to `true`
                }
            });

            if (destroyMask && this.mask) {
                this.mask.destroy();
            }

            return this;
        },
    };

    var SortGameObjectsByDepth = function (gameObjects, descending) {
        if (gameObjects.length <= 1) {
            return gameObjects;
        }

        if (descending === undefined) {
            descending = false;
        }

        var itemList;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (gameObject.displayList) {
                // Inside a scene or a layer
                itemList = gameObject.displayList; // displayList
            } else if (gameObject.parentContainer) {
                // Inside a container
                itemList = gameObject.parentContainer.list; // array
            }

            if (itemList) {
                break;
            }
        }

        if (!itemList) {
            itemList = gameObject.scene.sys.displayList;  // displayList
            // ??
        }

        if (itemList.depthSort) {
            // Is a displayList object
            itemList.depthSort();
            itemList = itemList.list;
            // itemList is an array now
        }

        // itemList is an array
        if (descending) {
            gameObjects.sort(function (childA, childB) {
                return itemList.indexOf(childB) - itemList.indexOf(childA);
            });

        } else {
            gameObjects.sort(function (childA, childB) {
                return itemList.indexOf(childA) - itemList.indexOf(childB);
            });

        }

        return gameObjects;
    };

    var FilterDisplayGameObjects = function (gameObjects) {
        return gameObjects.filter(function (gameObject) {
            if (gameObject.displayList) {
                // Inside a scene or a layer
                return true;
            } else if (gameObject.parentContainer) {
                // Inside a container
                return true;
            }
        })
    };

    var Depth = {
        setDepth(value, containerOnly) {
            this.depth = value;
            if (!containerOnly && this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth = value;
                }
            }
            return this;
        },

        swapDepth(containerB) {
            var depthA = this.depth;
            var depthB = containerB.depth;
            this.setDepth(depthB);
            containerB.setDepth(depthA);
            return this;
        },

        incDepth(inc) {
            this.depth += inc;
            if (this.children) {
                var children = this.getAllChildren();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].depth += inc;
                }
            }
            return this;
        },

        bringToTop() {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, false);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.bringToTop(child);
                }
            }
            return this;
        },

        bringMeToTop() {
            return this.bringToTop();
        },

        sendToBack() {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, true);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.sendToBack(child);
                }
            }
            return this;
        },

        sendMeToBack() {
            return this.sendToBack();
        },

        moveDepthBelow(gameObject) {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            if (gameObject.displayList !== displayList) {
                // Do nothing if not at the same display list
                return this;
            }

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, false);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.moveBelow(gameObject, child);
                    break;
                }
            }
            return this;
        },

        moveMyDepthBelow(gameObject) {
            return this.moveDepthBelow(gameObject);
        },

        moveDepthAbove(gameObject) {
            var displayList = this.displayList;
            if (!displayList) {
                return this;
            }

            if (gameObject.displayList !== displayList) {
                // Do nothing if not at the same display list
                return this;
            }

            var children = this.getAllChildren([this]);
            SortGameObjectsByDepth(children, true);
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                var child = children[i];
                if (displayList.exists(child)) {
                    displayList.moveAbove(gameObject, child);
                    break;
                }
            }
            return this;
        },

        moveMyDepthAbove(gameObject) {
            return this.moveDepthAbove(gameObject);
        },

        bringChildToTop(child) {
            var gameObjects;
            if ((child !== this) && child.isRexContainerLite) {
                gameObjects = child.getAllChildren([child]);
                gameObjects = FilterDisplayGameObjects(gameObjects);
                gameObjects = SortGameObjectsByDepth(gameObjects, false);
            } else {
                gameObjects = [child];
            }

            var children = this.getAllChildren([this]);
            children = FilterDisplayGameObjects(children);
            children = SortGameObjectsByDepth(children, false);
            var topChild = children[children.length - 1];

            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                var gameObject = gameObjects[i];
                if (topChild === gameObject) {
                    continue;
                }
                if ((gameObject !== this) && (topChild.displayList !== gameObject.displayList)) {
                    continue;
                }

                topChild.displayList.moveAbove(gameObject, topChild);
                topChild = gameObject;
            }

            return this;
        },

        sendChildToBack(child) {
            var gameObjects;
            if ((child !== this) && child.isRexContainerLite) {
                gameObjects = child.getAllChildren([child]);
                gameObjects = FilterDisplayGameObjects(gameObjects);
                gameObjects = SortGameObjectsByDepth(gameObjects, false);
            } else {
                gameObjects = [child];
            }

            var children = this.getAllChildren([this]);
            children = FilterDisplayGameObjects(children);
            children = SortGameObjectsByDepth(children, false);
            var bottomChild = children[0];

            for (var i = gameObjects.length - 1; i >= 0; i--) {
                var gameObject = gameObjects[i];
                if (bottomChild === gameObject) {
                    continue;
                }
                if ((gameObject !== this) && (bottomChild.displayList !== gameObject.displayList)) {
                    continue;
                }

                bottomChild.displayList.moveBelow(gameObject, bottomChild);
                bottomChild = gameObject;
            }

            return this;
        },
    };

    var DepthFirstSearch = function (root, callback) {
        var skip = callback(root);
        if ((!skip) && root.isRexContainerLite) {
            var children = root.children;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                DepthFirstSearch(children[i], callback);
            }
        }
    };

    var BreadthFirstSearch = function (root, callback) {
        var queue = [root];
        while (queue.length > 0) {
            var current = queue.shift();
            var skip = callback(current);

            if ((!skip) && current.isRexContainerLite) {
                queue.push(...current.children);
            }
        }
    };

    const ArrayUtils = Phaser.Utils.Array;

    var Children = {
        getChildren(out) {
            if (!out) {
                out = this.children; // Return internal children array
            } else {
                for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                    out.push(this.children[i]);
                }
                // Copy children
            }
            return out;
        },

        getAllChildren(out) {
            if (out === undefined) {
                out = [];
            }

            var root = this;
            BreadthFirstSearch(root, function (child) {
                // Don't add root
                if (child === root) {
                    return;
                }
                out.push(child);
            });

            return out;
        },

        getAllVisibleChildren(out) {
            if (out === undefined) {
                out = [];
            }

            var root = this;
            BreadthFirstSearch(root, function (child) {
                // Don't add root
                if (child === root) {
                    return;
                }
                // Don't add invisible child
                if (!child.visible) {
                    return true;
                }
                out.push(child);
            });

            return out;
        },

        bfs(callback, root) {
            if (root === undefined) {
                root = this;
            }
            BreadthFirstSearch(root, callback);
            return this;
        },

        dfs(callback, root) {
            if (root === undefined) {
                root = this;
            }
            DepthFirstSearch(root, callback);
            return this;
        },

        contains(gameObject) { // Override Base.contains method
            var parent = GetParent$1(gameObject);
            if (!parent) {
                return false;
            } else if (parent === this) {
                return true;
            } else {
                return this.contains(parent);
            }
        },

        getByName(name, recursive) {
            if (!recursive) {
                return ArrayUtils.GetFirst(this.children, 'name', name); // object, or null if not found

            } else { // recursive
                // Breadth-first search
                var queue = [this];
                var parent, child;
                while (queue.length) {
                    parent = queue.shift();

                    for (var i = 0, cnt = parent.children.length; i < cnt; i++) {
                        child = parent.children[i];
                        if (child.name === name) {
                            return child;
                        } else if (child.isRexContainerLite) {
                            queue.push(child);
                        }
                    }
                }
                return null;

            }

        },

        getRandom(startIndex, length) {
            return ArrayUtils.GetRandom(this.children, startIndex, length);
        },

        getFirst(property, value, startIndex, endIndex) {
            return ArrayUtils.GetFirstElement(this.children, property, value, startIndex, endIndex);
        },

        getAll(property, value, startIndex, endIndex) {
            return ArrayUtils.GetAll(this.children, property, value, startIndex, endIndex);
        },

        count(property, value, startIndex, endIndex) {
            return ArrayUtils.CountAllMatching(this.children, property, value, startIndex, endIndex);
        },

        swap(child1, child2) {
            ArrayUtils.Swap(this.children, child1, child2);
            return this;
        },

        setAll(property, value, startIndex, endIndex) {
            ArrayUtils.SetAll(this.children, property, value, startIndex, endIndex);
            return this;
        },
    };

    var GetLocalStates = function (gameObjects) {
        var localStates = [];
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (!gameObject.hasOwnProperty('rexContainer')) {
                continue;
            }
            localStates.push(gameObject.rexContainer);
        }
        return localStates;
    };

    var GetScene = function (gameObjects) {
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var scene = gameObjects[i].scene;
            if (scene) {
                return scene;
            }
        }
        return null;
    };

    var UpdateChild = function (tween, key, target) {
        if (!target.parent) {
            // target object was removed, so remove this tween too
            tween.remove();
            return;
        }

        var parent = target.parent;
        var child = target.self;
        switch (key) {
            case 'x':
            case 'y':
                parent.updateChildPosition(child);
                break;

            case 'angle':
            case 'rotation':
                parent.updateChildRotation(child);
                break;

            case 'scaleX':
            case 'scaleY':        
            case 'displayWidth':
            case 'displayHeight':
                parent.updateChildScale(child);
                break;

            case 'alpha':
                parent.updateChildAlpha(child);
                break;

            default:
                parent.updateChildPosition(child);
                parent.updateChildRotation(child);
                parent.updateChildScale(child);
                parent.updateChildAlpha(child);
                break;
        }
    };

    var Tween = {
        tweenChild(tweenConfig) {
            var targets = tweenConfig.targets;
            if (!Array.isArray(targets)) {
                targets = [targets];
            }

            var scene = this.scene || GetScene(targets);
            if (!scene) {
                return;
            }

            // Map child game objects to local states
            tweenConfig.targets = GetLocalStates(targets);
            var tween = scene.tweens.add(tweenConfig);

            // Update child game object in 'update' event
            tween.on('update', UpdateChild);

            return tween;
        },

        tweenSelf(tweenConfig) {
            tweenConfig.targets = [this];
            return this.tweenChild(tweenConfig);
        },

        createTweenChildConfig(tweenConfig) {
            var targets = tweenConfig.targets;
            if (targets) {
                if (!Array.isArray(targets)) {
                    targets = [targets];
                }
                // Map child game objects to local states
                tweenConfig.targets = GetLocalStates(targets);
            }

            var onUpdate = tweenConfig.onUpdate;
            tweenConfig.onUpdate = function (tween, target) {
                if (onUpdate) {
                    onUpdate(tween, target);
                }
                UpdateChild(tween, undefined, target);
            };

            return tweenConfig;
        },

        tween(tweenConfig) {
            var scene = this.scene;
            if (!tweenConfig.targets) {
                tweenConfig.targets = this;
            }
            return scene.tweens.add(tweenConfig);
        },
    };

    const ContainerClass = Phaser.GameObjects.Container;

    var IsContainerGameObject = function (gameObject) {
        return (gameObject instanceof ContainerClass);
    };

    const LayerClass = Phaser.GameObjects.Layer;

    var IsLayerGameObject = function (gameObject) {
        return (gameObject instanceof LayerClass);
    };

    var GetValidChildren = function (parent) {
        var children = parent.getAllChildren([parent]);
        children = children.filter(function (gameObject) {
            return !!gameObject.displayList ||   // At scene's displayList or at a layer
                !!gameObject.parentContainer;  // At a container
        });
        return children;
    };

    var AddToContainer = function (p3Container) {
        var gameObjects = GetValidChildren(this);
        // This containerLite parent should be considered.
        if (gameObjects.indexOf(this) === -1) {
            gameObjects.push(this);
        }

        SortGameObjectsByDepth(gameObjects);

        p3Container.add(gameObjects);
    };

    var RemoveFromContainer = function (p3Container, descending, addToScene) {
        if (!this.scene) {
            // Destroyed
            return;
        }

        var gameObjects = GetValidChildren(this);

        SortGameObjectsByDepth(gameObjects, descending);

        p3Container.remove(gameObjects);

        if (addToScene) {
            gameObjects.forEach(function (gameObject) {
                gameObject.addToDisplayList();
            });
        }
    };

    var P3Container$2 = {
        addToContainer(p3Container) {
            if (!IsContainerGameObject(p3Container)) {
                return this;
            }

            this._setParentContainerFlag = true;
            AddToContainer.call(this, p3Container);
            this._setParentContainerFlag = false;
            return this;
        },

        addToLayer(layer) {
            if (!IsLayerGameObject(layer)) {
                return this;
            }

            AddToContainer.call(this, layer);

            return this;
        },

        removeFromContainer() {
            if (!this.parentContainer) {
                return this;
            }

            this._setParentContainerFlag = true;
            RemoveFromContainer.call(this, this.parentContainer, true, false);
            this._setParentContainerFlag = false;
            return this;
        },

        removeFromLayer(addToScene) {
            if (addToScene === undefined) {
                addToScene = true;
            }

            if (!IsLayerGameObject(this.displayList)) {
                return this;
            }

            RemoveFromContainer.call(this, this.displayList, false, addToScene);

            return this;
        },

        getParentContainer() {
            if (this.parentContainer) {
                return this.parentContainer;
            }

            // One of parent container has a layer
            var parent = this.getParent();
            while (parent) {
                var p3Container = parent.parentContainer;
                if (p3Container) {
                    return p3Container;
                }
                parent = parent.getParent();
            }

            return null;
        },

        addToParentContainer(gameObject) {
            // Do nothing if gameObject is not in any displayList
            if (!gameObject.displayList) {
                return this;
            }

            var p3Container = this.getParentContainer();
            if (!p3Container) {
                return this;
            }

            if (gameObject.isRexContainerLite) {
                // Add containerLite and its children
                gameObject.addToContainer(p3Container);
            } else {
                // Add gameObject directly
                p3Container.add(gameObject);
            }

            return this;
        },

        addToPatentLayer(gameObject) {
            // Do nothing if gameObject is not in any displayList
            if (!gameObject.displayList) {
                return this;
            }

            // At the same display list
            var parentLayer = this.displayList;
            if (parentLayer === gameObject.displayList) {
                return this;
            }

            if (IsLayerGameObject(parentLayer)) {
                if (gameObject.isRexContainerLite) {
                    // Add containerLite and its children
                    gameObject.addToLayer(parentLayer);
                } else {
                    // Add gameObject directly
                    parentLayer.add(gameObject);
                }
            }

            return this;
        }
    };

    var RenderLayer = {
        hasLayer() {
            return !!this.privateRenderLayer;
        },

        enableLayer() {
            if (this.hasLayer()) {
                return this;
            }

            var layer = this.scene.add.layer();
            // layer.name = (this.name) ? `${this.name}.privateLayer` : 'privateLayer';

            this.moveDepthBelow(layer);

            this.addToLayer(layer);

            this.privateRenderLayer = layer;

            return this;
        },

        getLayer() {
            if (!this.hasLayer()) {
                this.enableLayer();
            }

            return this.privateRenderLayer;
        },

        getRenderLayer() {
            // This containerLite has a layer
            if (this.hasLayer()) {
                return this.privateRenderLayer;
            }

            // One of parent container has a layer
            var parent = this.getParent();
            while (parent) {
                var layer = parent.privateRenderLayer;
                if (layer) {
                    return layer;
                }
                parent = parent.getParent();
            }

            return null;
        },

        // Internal method for adding child
        addToRenderLayer(gameObject) {
            // Don't add to layer if gameObject is not in any displayList
            if (!gameObject.displayList) {
                return this;
            }

            // Move gameObject from scene to layer
            var layer = this.getRenderLayer();
            if (!layer) {
                return this;
            }

            if (layer === gameObject.displayList) {
                return this;
            }

            if (gameObject.isRexContainerLite) {
                // Add containerLite and its children
                gameObject.addToLayer(layer);
            } else {
                // Add gameObject directly
                layer.add(gameObject);
            }

            var state = GetLocalState(gameObject);
            state.layer = layer;

            return this;
        },

        // Internal method for removing child
        removeFromRenderLayer(gameObject) {
            // Move gameObject from layer to scene
            var state = GetLocalState(gameObject);
            var layer = state.layer;
            if (!layer) {
                return this;
            }

            if (gameObject.isRexContainerLite) {
                // Remove containerLite and its children
                gameObject.removeFromLayer(true);
            } else {
                // Remove gameObject directly
                layer.remove(gameObject);
            }

            state.layer = null;

            return this;
        },
    };

    var GetDisplayWidth = function (gameObject) {
        if (gameObject.displayWidth !== undefined) {
            return gameObject.displayWidth;
        } else {
            return gameObject.width;
        }
    };

    var GetDisplayHeight = function (gameObject) {
        if (gameObject.displayHeight !== undefined) {
            return gameObject.displayHeight;
        } else {
            return gameObject.height;
        }
    };

    const Rectangle$4 = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround$5 = Phaser.Math.RotateAround;
    const P3Container$1 = Phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$4();
        } else if (output === true) {
            if (GlobRect$2 === undefined) {
                GlobRect$2 = new Rectangle$4();
            }
            output = GlobRect$2;
        }

        if (gameObject.getBounds && !(gameObject instanceof P3Container$1)) {
            return gameObject.getBounds(output);
        }

        //  We can use the output object to temporarily store the x/y coords in:

        var TLx, TLy, TRx, TRy, BLx, BLy, BRx, BRy;

        // Instead of doing a check if parent container is
        // defined per corner we only do it once.
        if (gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            GetTopLeft(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            TLx = output.x;
            TLy = output.y;

            GetTopRight(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            TRx = output.x;
            TRy = output.y;

            GetBottomLeft(gameObject, output);        parentMatrix.transformPoint(output.x, output.y, output);

            BLx = output.x;
            BLy = output.y;

            GetBottomRight(gameObject, output);
            parentMatrix.transformPoint(output.x, output.y, output);

            BRx = output.x;
            BRy = output.y;
        }
        else {
            GetTopLeft(gameObject, output);

            TLx = output.x;
            TLy = output.y;

            GetTopRight(gameObject, output);
            TRx = output.x;
            TRy = output.y;

            GetBottomLeft(gameObject, output);
            BLx = output.x;
            BLy = output.y;

            GetBottomRight(gameObject, output);

            BRx = output.x;
            BRy = output.y;
        }

        output.x = Math.min(TLx, TRx, BLx, BRx);
        output.y = Math.min(TLy, TRy, BLy, BRy);
        output.width = Math.max(TLx, TRx, BLx, BRx) - output.x;
        output.height = Math.max(TLy, TRy, BLy, BRy) - output.y;

        return output;
    };

    var GlobRect$2 = undefined;

    var GetTopLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopLeft) {
            return gameObject.getTopLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetTopRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopRight) {
            return gameObject.getTopRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomLeft) {
            return gameObject.getBottomLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomRight) {
            return gameObject.getBottomRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetCenter = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        var displayWidth = GetDisplayWidth(gameObject);
        var displayHeight = GetDisplayHeight(gameObject);
        output.x = gameObject.x + (displayWidth * (0.5 - gameObject.originX));
        output.y = gameObject.y + (displayHeight * (0.5 - gameObject.originY));

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GlobVector = undefined;

    var PrepareBoundsOutput = function (gameObject, output, includeParent) {
        if (includeParent === undefined) { includeParent = false; }

        if (gameObject.rotation !== 0) {
            RotateAround$5(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const Rectangle$3 = Phaser.Geom.Rectangle;
    const Union = Phaser.Geom.Rectangle.Union;

    var GetBoundsOfGameObjects = function (gameObjects, out) {
        if (out === undefined) {
            out = new Rectangle$3();
        } else if (out === true) {
            if (GlobRect$1 === undefined) {
                GlobRect$1 = new Rectangle$3();
            }
            out = GlobRect$1;
        }

        out.setTo(0, 0, 0, 0);

        var gameObject;
        var firstClone = true;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            gameObject = gameObjects[i];
            if (!gameObject.getBounds) {
                continue;
            }

            var boundsRect = GetBounds(gameObject, true);

            if (firstClone) {
                out.setTo(boundsRect.x, boundsRect.y, boundsRect.width, boundsRect.height);
                firstClone = false;
            } else {
                Union(boundsRect, out, out);
            }
        }

        return out;
    };

    var GlobRect$1;

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    /**
     * Shallow Object Clone. Will not out nested objects.
     * @param {object} obj JSON object
     * @param {object} ret JSON object to return, set null to return a new object
     * @returns {object} this object
     */
    var Clone = function (obj, out) {
        var objIsArray = Array.isArray(obj);

        if (out === undefined) {
            out = (objIsArray) ? [] : {};
        } else {
            Clear(out);
        }

        if (objIsArray) {
            out.length = obj.length;
            for (var i = 0, cnt = obj.length; i < cnt; i++) {
                out[i] = obj[i];
            }
        } else {
            for (var key in obj) {
                out[key] = obj[key];
            }
        }

        return out;
    };

    const GameObjectClass = Phaser.GameObjects.GameObject;
    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass);
    };

    var GetValue$1m = Phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
        var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
        var saveTexture = config.saveTexture;
        var x = GetValue$1m(config, 'x', undefined);
        var y = GetValue$1m(config, 'y', undefined);
        var width = GetValue$1m(config, 'width', undefined);
        var height = GetValue$1m(config, 'height', undefined);
        var originX = GetValue$1m(config, 'originX', 0);
        var originY = GetValue$1m(config, 'originY', 0);
        var padding = GetValue$1m(config, 'padding', 0);

        var scrollX, scrollY;
        if ((width === undefined) || (height === undefined) || (x === undefined) || (y === undefined)) {
            // Union bounds of gameObjects
            var bounds = GetBoundsOfGameObjects(gameObjects, true);
            var isCenterOrigin = (x !== undefined) && (y !== undefined);
            if (isCenterOrigin) {
                width = Math.max((x - bounds.left), (bounds.right - x)) * 2;
                height = Math.max((y - bounds.top), (bounds.bottom - y)) * 2;
                originX = 0.5;
                originY = 0.5;
            } else {
                x = bounds.x;
                y = bounds.y;
                width = bounds.width;
                height = bounds.height;
                originX = 0;
                originY = 0;
            }
            scrollX = bounds.x;
            scrollY = bounds.y;
        } else {
            scrollX = x + ((0 - originX) * width);
            scrollY = y + ((0 - originY) * height);
        }

        scrollX -= padding;
        scrollY -= padding;
        width += (padding * 2);
        height += (padding * 2);

        var scene = gameObjects[0].scene;
        var textureManager = scene.sys.textures;

        // Snapshot on dynamicTexture directly
        if (saveTexture && !renderTexture) {
            renderTexture = textureManager.addDynamicTexture(saveTexture, width, height);
        }

        // Return a renderTexture
        if (!renderTexture) {
            renderTexture = scene.add.renderTexture(0, 0, width, height);
        }

        if (renderTexture.setPosition) {
            renderTexture.setPosition(x, y);
        }

        if ((renderTexture.width !== width) || (renderTexture.height !== height)) {
            renderTexture.setSize(width, height);
        }

        if (renderTexture.setOrigin) {
            renderTexture.setOrigin(originX, originY);
        }

        renderTexture.camera.setScroll(scrollX, scrollY);

        // Draw gameObjects
        gameObjects = SortGameObjectsByDepth(Clone(gameObjects));
        renderTexture.draw(gameObjects);

        // Save render result to texture
        if (saveTexture) {
            if (IsGameObject(renderTexture)) {
                renderTexture.saveTexture(saveTexture);
            } else if (renderTexture.key !== saveTexture) {
                textureManager.renameTexture(renderTexture.key, key);
            }
        }

        return renderTexture;
    };

    var RenderTexture$1 = {
        snapshot(config) {
            // Save scale
            var scaleXSave = this.scaleX;
            var scaleYSave = this.scaleY;
            var scale1 = (scaleXSave === 1) && (scaleYSave === 1);
            if (!scale1) {
                this.setScale(1);
            }

            // Snapshot with scale = 1
            if (config === undefined) {
                config = {};
            }
            config.gameObjects = this.getAllVisibleChildren();
            config.x = this.x;
            config.y = this.y;
            config.originX = this.originX;
            config.originY = this.originY;
            var rt = Snapshot(config);
            var isValidRT = !!rt.scene;

            // Restore scale
            if (!scale1) {
                this.setScale(scaleXSave, scaleYSave);

                if (isValidRT) {
                    rt.setScale(scaleXSave, scaleYSave);
                }
            }

            return (isValidRT) ? rt : this;
        }
    };

    const GetValue$1l = Phaser.Utils.Objects.GetValue;

    var DrawBounds$2 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$1l(config, 'color');
            lineWidth = GetValue$1l(config, 'lineWidth');
            fillColor = GetValue$1l(config, 'fillColor');
            fillAlpha = GetValue$1l(config, 'fillAlpha', 1);
            padding = GetValue$1l(config, 'padding', 0);
        }

        if (Array.isArray(gameObjects)) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
            }
        } else {
            Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
        }
    };

    var Draw = function (gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding) {
        var canDrawBound = gameObject.getBounds ||
            ((gameObject.width !== undefined) && (gameObject.height !== undefined));
        if (!canDrawBound) {
            return;
        }

        if (strokeColor === undefined) { strokeColor = 0xffffff; }
        if (lineWidth === undefined) { lineWidth = 1; }
        if (fillColor === undefined) { fillColor = null; }    if (fillAlpha === undefined) { fillAlpha = 1; }    if (padding === undefined) { padding = 0; }

        var p0 = GetTopLeft(gameObject, Points[0]);
        p0.x -= padding;
        p0.y -= padding;

        var p1 = GetTopRight(gameObject, Points[1]);
        p1.x += padding;
        p1.y -= padding;

        var p2 = GetBottomRight(gameObject, Points[2]);
        p2.x += padding;
        p2.y += padding;

        var p3 = GetBottomLeft(gameObject, Points[3]);
        p3.x -= padding;
        p3.y += padding;

        if (fillColor !== null) {
            graphics
                .fillStyle(fillColor, fillAlpha)
                .fillPoints(Points, true, true);
        }
        if (strokeColor !== null) {
            graphics
                .lineStyle(lineWidth, strokeColor)
                .strokePoints(Points, true, true);
        }

    };

    var Points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

    const GetValue$1k = Phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (graphics, config) {
        var drawContainer = GetValue$1k(config, 'drawContainer', true);

        var gameObjects = GetValue$1k(config, 'children');
        if (gameObjects === undefined) {
            gameObjects = this.getAllVisibleChildren([this]);
        }

        if (!drawContainer) {
            gameObjects = gameObjects.filter(function (gameObject) {
                return !gameObject.isRexContainerLite;
            });
        }

        DrawBounds$2(gameObjects, graphics, config);

        return this;
    };

    const RotateAround$4 = Phaser.Math.RotateAround;

    var ChangeOrigin$1 = function (gameObject, originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var deltaXY = {
            x: (originX - gameObject.originX) * gameObject.displayWidth,
            y: (originY - gameObject.originY) * gameObject.displayHeight
        };
        RotateAround$4(deltaXY, 0, 0, gameObject.rotation);

        gameObject.originX = originX;
        gameObject.originY = originY;
        gameObject.x = gameObject.x + deltaXY.x;
        gameObject.y = gameObject.y + deltaXY.y;

        return gameObject;
    };

    var ChangeOrigin = function (originX, originY) {
        this.syncChildrenEnable = false;
        ChangeOrigin$1(this, originX, originY);
        this.syncChildrenEnable = true;

        var children = this.getAllChildren();
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            this.resetChildPositionState(children[i]);
        }
        return this;
    };

    var methods$f = {
        changeOrigin: ChangeOrigin,
        drawBounds: DrawBounds$1,
    };

    Object.assign(
        methods$f,
        Parent,
        AddChild$3,
        RemoveChild$2,
        ChildState,
        Transform,
        Position,
        Rotation,
        Scale$2,
        Visible,
        Alpha,
        Active,
        ScrollFactor,
        CameraFilter,
        Mask,
        Depth,
        Children,
        Tween,
        P3Container$2,
        RenderLayer,
        RenderTexture$1,
    );

    class ContainerLite extends Base$2 {
        constructor(scene, x, y, width, height, children) {
            if (Array.isArray(width)) {
                children = width;
                width = undefined;
                height = undefined;
            }
            super(scene, x, y, width, height);
            this.type = 'rexContainerLite';
            this.isRexContainerLite = true;
            this.syncChildrenEnable = true;

            this._active = true;
            this._mask = null;
            this._scrollFactorX = 1;
            this._scrollFactorY = 1;
            this._cameraFilter = 0;
            this.privateRenderLayer = undefined;

            if (children) {
                this.add(children);
            }
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.syncChildrenEnable = false; // Don't sync properties changing anymore
            super.destroy(fromScene);

            if (this.privateRenderLayer && this.privateRenderLayer.scene) {
                this.privateRenderLayer.list.length = 0;  // Remove all children without trigger callback
                this.privateRenderLayer.destroy();
            }
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }

        get x() {
            return this._x;
        }

        set x(value) {
            if (this._x === value) {
                return;
            }
            this._x = value;

            this.syncPosition();
        }

        get y() {
            return this._y;
        }

        set y(value) {
            if (this._y === value) {
                return;
            }
            this._y = value;

            this.syncPosition();
        }

        // Override
        get rotation() {
            return super.rotation;
        }

        set rotation(value) {
            if (this.rotation === value) {
                return;
            }
            super.rotation = value;

            this.syncPosition();
        }

        // Override
        get scaleX() {
            return super.scaleX;
        }

        set scaleX(value) {
            if (this.scaleX === value) {
                return;
            }
            super.scaleX = value;

            this.syncPosition();
        }

        // Override
        get scaleY() {
            return super.scaleY;
        }

        set scaleY(value) {
            if (this.scaleY === value) {
                return;
            }
            super.scaleY = value;

            this.syncPosition();
        }

        // Override
        get scale() {
            return super.scale;
        }

        set scale(value) {
            if (this.scale === value) {
                return;
            }
            super.scale = value;

            this.syncPosition();
        }

        // Override
        get visible() {
            return super.visible;
        }

        set visible(value) {
            if (super.visible === value) {
                return;
            }
            super.visible = value;

            this.syncVisible();
        }

        // Override
        get alpha() {
            return super.alpha;
        }

        set alpha(value) {
            if (super.alpha === value) {
                return;
            }
            super.alpha = value;

            this.syncAlpha();
        }

        // Override
        get active() {
            return this._active;
        }

        set active(value) {
            if (this._active === value) {
                return;
            }
            this._active = value;

            this.syncActive();
        }

        // Override
        get mask() {
            return this._mask;
        }
        set mask(mask) {
            if (this._mask === mask) {
                return;
            }
            this._mask = mask;

            this.syncMask();
        }

        // Override
        get scrollFactorX() {
            return this._scrollFactorX;
        }

        set scrollFactorX(value) {
            if (this._scrollFactorX === value) {
                return;
            }

            this._scrollFactorX = value;
            this.syncScrollFactor();
        }
        get scrollFactorY() {
            return this._scrollFactorY;
        }

        set scrollFactorY(value) {
            if (this._scrollFactorY === value) {
                return;
            }

            this._scrollFactorY = value;
            this.syncScrollFactor();
        }

        get cameraFilter() {
            return this._cameraFilter;
        }

        set cameraFilter(value) {
            if (this._cameraFilter === value) {
                return;
            }

            this._cameraFilter = value;
            this.syncCameraFilter();
        }

        // Compatiable with container plugin
        get list() {
            return this.children;
        }

        static GetParent(child) {
            return GetParent$1(child);
        }

        // For p3-container
        get parentContainer() {
            return this._parentContainer;
        }

        set parentContainer(value) {
            // Initialize
            if (!this._parentContainer && !value) {
                this._parentContainer = value;
                return;
            }

            // Set this._parentContainer only,
            // if under AddToContainer, or RemoveFromContainer methods
            if (this.setParentContainerFlag) {
                this._parentContainer = value;
                return;
            }
            // else if (!this.setParentContainerFlag)

            // Add itself and all children to container,
            // Or remove itseld and all children from container
            if (this._parentContainer && !value) {
                // Remove from container
                this.removeFromContainer();
                this._parentContainer = value;
            } else if (value) {
                // Add to container
                this._parentContainer = value;
                this.addToContainer(value);
            } else {
                this._parentContainer = value;
            }
        }

        get setParentContainerFlag() {
            if (this._setParentContainerFlag) {
                return true;
            }
            var parent = GetParent$1(this);
            return (parent) ? parent.setParentContainerFlag : false;
        }

    }

    Object.assign(
        ContainerLite.prototype,
        methods$f
    );

    var GetSizerConfig$1 = function (gameObject) {
        if (!gameObject.hasOwnProperty('rexSizer')) {
            gameObject.rexSizer = {};
        }
        return gameObject.rexSizer;
    };

    function GetSizerConfig (gameObject) {
        if (gameObject === undefined) {
            gameObject = this;
        }
        return GetSizerConfig$1(gameObject);
    }

    var GetChildPrevState = function (child) {
        var childConfig = GetSizerConfig$1(child);
        if (!childConfig.hasOwnProperty('prevState')) {
            childConfig.prevState = {};
        }
        return childConfig.prevState;
    };

    const CameraClass = Phaser.Cameras.Scene2D.BaseCamera;

    var IsCameraObject = function (object) {
        return (object instanceof CameraClass);
    };

    const Rectangle$2 = Phaser.Geom.Rectangle;

    var GetViewport = function (scene, camera, out) {
        if (!IsCameraObject(camera)) {
            out = camera;
            camera = undefined;
        }

        if (out === undefined) {
            out = new Rectangle$2();
        } else if (out === true) {
            out = globRect;
        }

        if (camera) {
            return scene.scale.getViewPort(camera, out);
        } else {
            return scene.scale.getViewPort(out);
        }
    };

    var globRect = new Rectangle$2();

    var PushIntoBounds = function (bounds) {
        if (bounds === undefined) {
            bounds = GetViewport(this.scene);
        }

        this.left = Math.max(this.left, bounds.left);
        this.right = Math.min(this.right, bounds.right);
        this.top = Math.max(this.top, bounds.top);
        this.bottom = Math.min(this.bottom, bounds.bottom);
        return this;
    };

    const ALIGN$1 = Phaser.Display.Align;
    var AlignConst = {
        center: ALIGN$1.CENTER,
        left: ALIGN$1.LEFT_CENTER,
        right: ALIGN$1.RIGHT_CENTER,
        top: ALIGN$1.TOP_CENTER,
        bottom: ALIGN$1.BOTTOM_CENTER,

        'left-top': ALIGN$1.TOP_LEFT,
        'top-left': ALIGN$1.TOP_LEFT,

        'left-center': ALIGN$1.LEFT_CENTER,
        'center-left': ALIGN$1.LEFT_CENTER,

        'left-bottom': ALIGN$1.BOTTOM_LEFT,
        'bottom-left': ALIGN$1.BOTTOM_LEFT,

        'center-top': ALIGN$1.TOP_CENTER,
        'top-center': ALIGN$1.TOP_CENTER,

        'center-center': ALIGN$1.CENTER,

        'center-bottom': ALIGN$1.BOTTOM_CENTER,
        'bottom-center': ALIGN$1.BOTTOM_CENTER,

        'right-top': ALIGN$1.TOP_RIGHT,
        'top-right': ALIGN$1.TOP_RIGHT,

        'right-center': ALIGN$1.RIGHT_CENTER,
        'center-right': ALIGN$1.RIGHT_CENTER,

        'right-bottom': ALIGN$1.BOTTOM_RIGHT,
        'bottom-right': ALIGN$1.BOTTOM_RIGHT,
    };

    var NOOP = function () {
        //  NOOP
    };

    var globZone = new Phaser.GameObjects.Zone({
        sys: {
            queueDepthSort: NOOP,
            events: {
                once: NOOP
            }
        }
    }, 0, 0, 1, 1);
    globZone.setOrigin(0);

    var ALIGN_CONST = {

        /**
        * A constant representing a top-left alignment or position.
        * @constant
        * @name Phaser.Display.Align.TOP_LEFT
        * @since 3.0.0
        * @type {integer}
        */
        TOP_LEFT: 0,

        /**
        * A constant representing a top-center alignment or position.
        * @constant
        * @name Phaser.Display.Align.TOP_CENTER
        * @since 3.0.0
        * @type {integer}
        */
        TOP_CENTER: 1,

        /**
        * A constant representing a top-right alignment or position.
        * @constant
        * @name Phaser.Display.Align.TOP_RIGHT
        * @since 3.0.0
        * @type {integer}
        */
        TOP_RIGHT: 2,

        /**
        * A constant representing a left-top alignment or position.
        * @constant
        * @name Phaser.Display.Align.LEFT_TOP
        * @since 3.0.0
        * @type {integer}
        */
        LEFT_TOP: 3,

        /**
        * A constant representing a left-center alignment or position.
        * @constant
        * @name Phaser.Display.Align.LEFT_CENTER
        * @since 3.0.0
        * @type {integer}
        */
        LEFT_CENTER: 4,

        /**
        * A constant representing a left-bottom alignment or position.
        * @constant
        * @name Phaser.Display.Align.LEFT_BOTTOM
        * @since 3.0.0
        * @type {integer}
        */
        LEFT_BOTTOM: 5,

        /**
        * A constant representing a center alignment or position.
        * @constant
        * @name Phaser.Display.Align.CENTER
        * @since 3.0.0
        * @type {integer}
        */
        CENTER: 6,

        /**
        * A constant representing a right-top alignment or position.
        * @constant
        * @name Phaser.Display.Align.RIGHT_TOP
        * @since 3.0.0
        * @type {integer}
        */
        RIGHT_TOP: 7,

        /**
        * A constant representing a right-center alignment or position.
        * @constant
        * @name Phaser.Display.Align.RIGHT_CENTER
        * @since 3.0.0
        * @type {integer}
        */
        RIGHT_CENTER: 8,

        /**
        * A constant representing a right-bottom alignment or position.
        * @constant
        * @name Phaser.Display.Align.RIGHT_BOTTOM
        * @since 3.0.0
        * @type {integer}
        */
        RIGHT_BOTTOM: 9,

        /**
        * A constant representing a bottom-left alignment or position.
        * @constant
        * @name Phaser.Display.Align.BOTTOM_LEFT
        * @since 3.0.0
        * @type {integer}
        */
        BOTTOM_LEFT: 10,

        /**
        * A constant representing a bottom-center alignment or position.
        * @constant
        * @name Phaser.Display.Align.BOTTOM_CENTER
        * @since 3.0.0
        * @type {integer}
        */
        BOTTOM_CENTER: 11,

        /**
        * A constant representing a bottom-right alignment or position.
        * @constant
        * @name Phaser.Display.Align.BOTTOM_RIGHT
        * @since 3.0.0
        * @type {integer}
        */
        BOTTOM_RIGHT: 12

    };

    var GetBottom = function (gameObject) {
        var height = GetDisplayHeight(gameObject);
        return (gameObject.y + height) - (height * gameObject.originY);
    };

    var GetCenterX = function (gameObject) {
        var width = GetDisplayWidth(gameObject);
        return gameObject.x - (width * gameObject.originX) + (width * 0.5);
    };

    var SetBottom = function (gameObject, value) {
        var height = GetDisplayHeight(gameObject);
        gameObject.y = (value - height) + (height * gameObject.originY);
        return gameObject;
    };

    var SetCenterX = function (gameObject, x) {
        var width = GetDisplayWidth(gameObject);
        var offsetX = width * gameObject.originX;
        gameObject.x = (x + offsetX) - (width * 0.5);

        return gameObject;
    };

    var BottomCenter = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
        SetBottom(gameObject, GetBottom(alignIn) + offsetY);

        return gameObject;
    };

    var GetLeft = function (gameObject) {
        var width = GetDisplayWidth(gameObject);
        return gameObject.x - (width * gameObject.originX);
    };

    var SetLeft = function (gameObject, value) {
        var width = GetDisplayWidth(gameObject);
        gameObject.x = value + (width * gameObject.originX);
        return gameObject;
    };

    var BottomLeft = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetLeft(gameObject, GetLeft(alignIn) - offsetX);
        SetBottom(gameObject, GetBottom(alignIn) + offsetY);

        return gameObject;
    };

    var GetRight = function (gameObject) {
        var width = GetDisplayWidth(gameObject);
        return (gameObject.x + width) - (width * gameObject.originX);
    };

    var SetRight = function (gameObject, value) {
        var width = GetDisplayWidth(gameObject);
        gameObject.x = (value - width) + (width * gameObject.originX);

        return gameObject;
    };

    var BottomRight = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetRight(gameObject, GetRight(alignIn) + offsetX);
        SetBottom(gameObject, GetBottom(alignIn) + offsetY);

        return gameObject;
    };

    var SetCenterY = function (gameObject, y) {
        var height = GetDisplayHeight(gameObject);
        var offsetY = height * gameObject.originY;
        gameObject.y = (y + offsetY) - (height * 0.5);

        return gameObject;
    };

    var CenterOn = function (gameObject, x, y) {
        SetCenterX(gameObject, x);
        return SetCenterY(gameObject, y);
    };

    var GetCenterY = function (gameObject) {
        var height = GetDisplayHeight(gameObject);
        return gameObject.y - (height * gameObject.originY) + (height * 0.5);
    };

    var Center = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        CenterOn(gameObject, GetCenterX(alignIn) + offsetX, GetCenterY(alignIn) + offsetY);

        return gameObject;
    };

    var LeftCenter = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetLeft(gameObject, GetLeft(alignIn) - offsetX);
        SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

        return gameObject;
    };

    var RightCenter = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetRight(gameObject, GetRight(alignIn) + offsetX);
        SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

        return gameObject;
    };

    var GetTop = function (gameObject) {
        var height = GetDisplayHeight(gameObject);
        return gameObject.y - (height * gameObject.originY);
    };

    var SetTop = function (gameObject, value) {
        var height = GetDisplayHeight(gameObject);
        gameObject.y = value + (height * gameObject.originY);
        return gameObject;
    };

    var TopCenter = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
        SetTop(gameObject, GetTop(alignIn) - offsetY);

        return gameObject;
    };

    var TopLeft = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetLeft(gameObject, GetLeft(alignIn) - offsetX);
        SetTop(gameObject, GetTop(alignIn) - offsetY);

        return gameObject;
    };

    var TopRight = function (gameObject, alignIn, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        SetRight(gameObject, GetRight(alignIn) + offsetX);
        SetTop(gameObject, GetTop(alignIn) - offsetY);

        return gameObject;
    };

    var AlignInMap = [];

    AlignInMap[ALIGN_CONST.BOTTOM_CENTER] = BottomCenter;
    AlignInMap[ALIGN_CONST.BOTTOM_LEFT] = BottomLeft;
    AlignInMap[ALIGN_CONST.BOTTOM_RIGHT] = BottomRight;
    AlignInMap[ALIGN_CONST.CENTER] = Center;
    AlignInMap[ALIGN_CONST.LEFT_CENTER] = LeftCenter;
    AlignInMap[ALIGN_CONST.RIGHT_CENTER] = RightCenter;
    AlignInMap[ALIGN_CONST.TOP_CENTER] = TopCenter;
    AlignInMap[ALIGN_CONST.TOP_LEFT] = TopLeft;
    AlignInMap[ALIGN_CONST.TOP_RIGHT] = TopRight;

    var QuickSet = function (child, alignIn, position, offsetX, offsetY) {
        return AlignInMap[position](child, alignIn, offsetX, offsetY);
    };

    var AlignIn = function (child, x, y, width, height, align) {
        globZone.setPosition(x, y).setSize(width, height);
        QuickSet(child, globZone, align);
    };

    const GetValue$1j = Phaser.Utils.Objects.GetValue;
    const Group = Phaser.GameObjects.Group;
    const P3Container = Phaser.GameObjects.Container;

    var DrawBounds = function (graphics, config) {
        var scene = graphics.scene;

        var color, lineWidth;
        var createTextCallback, createTextCallbackScope, textAlign;
        if (typeof (config) === 'number') {
            color = config;
        } else {
            color = GetValue$1j(config, 'color');
            lineWidth = GetValue$1j(config, 'lineWidth');
            var nameTextConfig = GetValue$1j(config, 'name', false);
            if (nameTextConfig) {
                createTextCallback = GetValue$1j(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
                createTextCallbackScope = GetValue$1j(nameTextConfig, 'createTextCallbackScope', undefined);
                textAlign = GetValue$1j(nameTextConfig, 'align', 'left-top');
                if (typeof (textAlign) === 'string') {
                    textAlign = AlignConst[textAlign];
                }
            }
        }

        if (color === undefined) {
            color = 0xffffff;
        }
        if (lineWidth === undefined) {
            lineWidth = 1;
        }

        if (createTextCallback && !graphics.children) {
            graphics.children = new Group(scene);
            graphics.once('destroy', function (graphics, fromScene) {
                graphics.children.destroy(!fromScene);
                graphics.children = undefined;
            });
            var graphicsClear = graphics.clear.bind(graphics);
            graphics.clear = function () {
                graphicsClear();
                graphics.children.clear(false, true);
            };
        }

        var children = this.getAllShownChildren([this]);
        GetP3ContainerChildren(children, children);

        var child;
        var nameText;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.getBounds ||
                ((child.width !== undefined) && (child.height !== undefined))
            ) {
                GlobRect = GetBounds(child, GlobRect);
            } else {
                continue;
            }

            if (color != null) {
                graphics
                    .lineStyle(lineWidth, color)
                    .strokeRectShape(GlobRect);
            }

            if (child.name && createTextCallback) {
                if (createTextCallbackScope) {
                    nameText = createTextCallback.call(createTextCallbackScope, scene);
                } else {
                    nameText = createTextCallback(scene);
                }
                if (nameText) {
                    nameText.setText(child.name);
                    graphics.children.add(nameText);

                    AlignIn(nameText, GlobRect.x, GlobRect.y, GlobRect.width, GlobRect.height, textAlign);
                }
            }
        }
        return this;
    };

    var DefaultCreateTextCallback = function (scene, child, childBoundsRect) {
        return scene.add.text(0, 0, '');
    };

    var GetP3ContainerChildren = function (gameObjects, output) {
        if (!Array.isArray(gameObjects)) {
            gameObjects = [gameObjects];
        }
        if (output === undefined) {
            output = [];
        }

        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (gameObject instanceof P3Container) {
                output.push(...gameObject.list);
                GetP3ContainerChildren(gameObject.list, output);
            }
        }

        return output;
    };

    var GlobRect = undefined;

    const GetValue$1i = Phaser.Utils.Objects.GetValue;

    var GetBoundsConfig$1 = function (config, out) {
        if (config === undefined) {
            config = 0;
        }
        if (out === undefined) {
            out = {};
        }

        if (typeof (config) === 'number') {
            out.left = config;
            out.right = config;
            out.top = config;
            out.bottom = config;
        } else {
            out.left = GetValue$1i(config, 'left', 0);
            out.right = GetValue$1i(config, 'right', 0);
            out.top = GetValue$1i(config, 'top', 0);
            out.bottom = GetValue$1i(config, 'bottom', 0);
        }
        return out;
    };

    const ContainerAdd = ContainerLite.prototype.add;

    var AddChild$2 = function (gameObject) {
        ContainerAdd.call(this, gameObject);

        if (this.sizerEventsEnable) {
            gameObject.emit('sizer.add', gameObject, this);
            this.emit('add', gameObject, this);
        }

        return this;
    };

    var AddChildMethods$5 = {
        addBackground(gameObject, paddingConfig, childKey) {
            if (this.backgroundChildren === undefined) {
                this.backgroundChildren = [];
            }

            if (typeof (paddingConfig) === 'string') {
                childKey = paddingConfig;
                paddingConfig = undefined;
            }

            if (paddingConfig === undefined) {
                paddingConfig = 0;
            }

            AddChild$2.call(this, gameObject);
            this.backgroundChildren.push(gameObject);

            var config = this.getSizerConfig(gameObject);
            config.padding = GetBoundsConfig$1(paddingConfig);

            if (childKey !== undefined) {
                this.addChildrenMap(childKey, gameObject);
            }
            return this;
        },

        isBackground(gameObject) {
            if (this.backgroundChildren === undefined) {
                return false;
            }
            return (this.backgroundChildren.indexOf(gameObject) !== -1);
        }
    };

    var GetParent = function (gameObject, name) {
        var parent = null;
        if (name === undefined) {
            if (gameObject.hasOwnProperty('rexContainer')) {
                parent = gameObject.rexContainer.parent;
                if (parent) {
                    if (!parent.isRexSizer) {
                        // Try to get sizer parent
                        parent = GetParent(parent);
                    }
                } else {
                    parent = null;
                }
            }

        } else {
            parent = GetParent(gameObject);
            while (parent) {
                if (parent.name === name) {
                    break;
                }
                parent = GetParent(parent);
            }
        }
        return parent;
    };

    var GetTopmostParent = function (gameObject) {
        var parent = GetParent(gameObject);
        while (parent) {
            gameObject = parent;
            parent = GetParent(parent);
        }
        return gameObject;
    };


    var GetParentSizerMethods = {
        getParentSizer(gameObject, name) {
            if (typeof (gameObject) === 'string') {
                name = gameObject;
                gameObject = undefined;
            }
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetParent(gameObject, name);
        },

        getTopmostSizer(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetTopmostParent(gameObject);
        },

        hasParentSizer(parentGameObject, gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }

            var parent = GetParent(gameObject);
            while (parent) {
                if (parent === parentGameObject) {
                    return true;
                }
                parent = GetParent(parent);
            }

            return false;
        },

        hasChild(child, gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }

            return this.hasParentSizer(gameObject, child);
        }
    };

    const RemoveItem$8 = Phaser.Utils.Array.Remove;
    const ContainerRemove = ContainerLite.prototype.remove;
    const GetParentSizer$1 = GetParentSizerMethods.getParentSizer;

    var RemoveChild$1 = function (gameObject, destroyChild) {
        // Invoke parent's removeChildCallback method
        var parent = GetParentSizer$1(gameObject);
        while (parent) {
            if (parent.removeChildCallback) {
                parent.removeChildCallback(gameObject, destroyChild);
            }
            parent = GetParentSizer$1(parent);
        }

        if (this.isBackground(gameObject)) {
            RemoveItem$8(this.backgroundChildren, gameObject);
        }
        ContainerRemove.call(this, gameObject, destroyChild);

        if (!destroyChild && this.sizerEventsEnable) {
            gameObject.emit('sizer.remove', gameObject, this);
            this.emit('remove', gameObject, this);
        }

        return this;
    };

    const RemoveItem$7 = Phaser.Utils.Array.Remove;
    const GetParentSizer = GetParentSizerMethods.getParentSizer;

    var RemoveChildMethods$5 = {
        removeFromParentSizer() {
            var parent = GetParentSizer(gameObject);
            if (parent) {
                parent.remove(this);
            }
            return this;
        },

        removeBackground(gameObject, destroyChild) {
            if (this.backgroundChildren === undefined) {
                return this;
            }

            if (this.getParentSizer(gameObject) !== this) {
                return this;
            }

            RemoveItem$7(this.backgroundChildren, gameObject);
            RemoveChild$1.call(this, gameObject, destroyChild);
            return this;
        },

        removeAllBackgrounds(destroyChild) {
            if (this.backgroundChildren === undefined) {
                return this;
            }

            for (var i = this.backgroundChildren.length - 1; i >= 0; i--) {
                this.remove(this.backgroundChildren[i], destroyChild);
            }
            return this;
        },
    };

    var AddChildrenMap = function (key, gameObject) {
        if (typeof (key) === 'string') {
            this.childrenMap[key] = gameObject;
        } else {
            var config = key;
            for (key in config) {
                this.childrenMap[key] = config[key];
            }
        }
        return this;
    };

    var RemoveChildrenMap = function (key) {
        if (typeof (key) === 'object') {
            var gameObject = key;
            for (var key in this.childrenMap) {
                if (this.childrenMap[key] === gameObject) {
                    delete this.childrenMap[key];
                    return this;
                }
            }
        }

        delete this.childrenMap[key];
        return this;
    };

    var GetElement = function (mapNameList, recursive) {
        if (typeof (mapNameList) === 'string') {
            mapNameList = mapNameList.split('.');
        }
        if (mapNameList.length === 0) {
            return undefined;
        }

        if (recursive === undefined) {
            recursive = false;
        }

        var name = mapNameList.shift(),
            element = null;
        if (name.charAt(0) === '#') { // Get element by name
            name = name.substring(1);
            element = this.getByName(name, recursive);
        } else if ((mapNameList.length === 0) && recursive) { // Get element by single key and recursive        
            var childrenMap = this.childrenMap;
            if (childrenMap) {
                var queue = [childrenMap];
                var child;
                while (queue.length) {
                    childrenMap = queue.shift();

                    for (var key in childrenMap) {
                        child = childrenMap[key];
                        if (key === name) {
                            element = child;
                            break;  // Leave for-loop
                        } else if (child && (typeof (child) === 'object') && child.childrenMap) {
                            queue.push(child.childrenMap);
                        }
                    }

                    if (element) { // leave while-loop
                        break;
                    }
                }
            }

        } else if (name.indexOf('[') === (-1)) { // Get element by key
            if (this.childrenMap) {
                element = this.childrenMap[name];
            }
        } else { // Get element by key[]
            var innerMatch = name.match(RE_OBJ);
            if (innerMatch != null) {
                if (this.childrenMap) {
                    var elements = this.childrenMap[innerMatch[1]];
                    if (elements) {
                        element = elements[innerMatch[2]];
                    }
                }
            }
        }

        if (mapNameList.length === 0) {
            return element;
        } else if (element && element.childrenMap) {
            return element.getElement(mapNameList);
        } else {
            return null;
        }
    };

    const RE_OBJ = /(\S+)\[(\d+)\]/i;

    var GetChildIndex = function (child) {
        if (Array.isArray(this.sizerChildren)) {
            var index = this.sizerChildren.indexOf(child);
            if (index === -1) {
                index = null;
            }
            return index;

        } else {
            if (this.getParentSizer(child) !== this) {
                return null;
            }

            for (var key in this.sizerChildren) {
                if (this.sizerChildre[key] === child) {
                    return key;
                }
            }
            return null;
        }
    };

    const GetValue$1h = Phaser.Utils.Objects.GetValue;

    var GetPadding$1 = function (padding, key) {
        if (key === undefined) {
            return padding;
        }
        return padding[key];
    };

    var SetPadding$1 = function (padding, key, value) {
        if (padding === undefined) {
            padding = {};
        }
        if (key === undefined) {
            key = 0;
        }

        var keyType = typeof (key);
        if (keyType === 'string') {
            padding[key] = value;
        } else if (keyType === 'number') {
            padding.left = key;
            padding.right = key;
            padding.top = key;
            padding.bottom = key;
        } else {
            padding.left = GetValue$1h(key, 'left', 0);
            padding.right = GetValue$1h(key, 'right', 0);
            padding.top = GetValue$1h(key, 'top', 0);
            padding.bottom = GetValue$1h(key, 'bottom', 0);
        }
        return padding;
    };

    var PaddingMethods = {
        getInnerPadding(key) {
            return GetPadding$1(this.space, key);
        },

        setInnerPadding(key, value) {
            SetPadding$1(this.space, key, value);
            return this;
        },

        getOuterPadding(key) {
            return GetPadding$1(this.getSizerConfig(this).padding, key);
        },

        setOuterPadding(key, value) {
            SetPadding$1(this.getSizerConfig(this).padding, key, value);
            return this;
        },

        getChildOuterPadding(child, key) {
            if (typeof (child) === 'string') {
                child = this.getElement(child);
            }
            return GetPadding$1(this.getSizerConfig(child).padding, key);
        },

        setChildOuterPadding(child, key, value) {
            if (typeof (child) === 'string') {
                child = this.getElement(child);
            }
            SetPadding$1(this.getSizerConfig(child).padding, key, value);
            return this;
        },
    };

    var ResolveWidth$3 = function (width) {
        var childrenWidth = this.childrenWidth;
        if (childrenWidth === undefined) {  // Can't resolve child width
            return undefined;
        }

        var minWidth = (this.minWidth !== undefined) ? (this.minWidth * this.scaleX) : 0;
        if (width === undefined) {
            width = Math.max(minWidth, childrenWidth);

            if (this.layoutWarnEnable) {
                if ((minWidth > 0) && (childrenWidth > minWidth)) {
                    console.warn(`Layout width warn: ${this.constructor.name}'s minWidth (${minWidth}) < childrenWidth (${childrenWidth})`);
                }
            }
        } else {
            if (this.layoutWarnEnable) {
                if ((minWidth > width) || (childrenWidth > width)) {
                    console.warn(`Layout width warn: ${this.constructor.name}'s minWidth (${minWidth}) or childrenWidth (${childrenWidth} > targetWidth ${width})`);
                }
            }
        }

        return width;
    };

    var HasWidthWrap$2 = function () {
        var child;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (
                (!child) ||
                (child.isRexSizer && child.ignoreLayout) ||
                (!child.runWidthWrap)
            ) {
                continue;
            }

            if (
                !child.hasWidthWrap ||
                child.hasWidthWrap()
            ) {
                return true;
            }
        }

        return false;
    };

    var ResolveChildrenWidth$1 = function (parentWidth) {
        // Resolve width of sizer children
        var child, expandedChildWidth, childWidth;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (child && child.isRexSizer && !child.ignoreLayout) {
                expandedChildWidth = this.getExpandedChildWidth(child, parentWidth);
                childWidth = child.resolveWidth(expandedChildWidth);
                if (childWidth === undefined) {
                    childWidth = expandedChildWidth;
                }
                child.resolveChildrenWidth(childWidth);
            }
        }
    };

    // Default method
    var RunWidthWrap$3 = function (parentWidth) {
        var child, expandedChildWidth, childWidth;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (
                (!child) ||
                (child.isRexSizer && child.ignoreLayout) ||
                (!child.runWidthWrap)
            ) {
                continue;
            }

            expandedChildWidth = this.getExpandedChildWidth(child, parentWidth);
            if (child.isRexSizer) {
                childWidth = child.resolveWidth(expandedChildWidth);
                if (childWidth === undefined) {
                    childWidth = expandedChildWidth;
                }
            } else {
                childWidth = expandedChildWidth;
            }
            child.runWidthWrap(childWidth);
        }
        return this;
    };

    var ResolveHeight$3 = function (height) {
        var childrenHeight = this.childrenHeight;
        if (childrenHeight === undefined) {  // Can't resolve child height
            return undefined;
        }

        var minHeight = (this.minHeight !== undefined) ? (this.minHeight * this.scaleY) : 0;
        if (height === undefined) {
            height = Math.max(minHeight, childrenHeight);

            if (this.layoutWarnEnable) {
                if ((minHeight > 0) && (childrenHeight > minHeight)) {
                    console.warn(`Layout height warn: ${this.constructor.name}'s minHeight (${minHeight}) < childrenHeight (${childrenHeight})`);
                }
            }
        } else {
            if (this.layoutWarnEnable) {
                if ((minHeight > height) || (childrenHeight > height)) {
                    console.warn(`Layout height warn: ${this.constructor.name}'s minHeight (${minHeight}) or childrenHeight (${childrenHeight}) > targetHeight (${height})`);
                }
            }
        }

        return height;
    };

    var HasHeightWrap$2 = function () {
        var child;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (
                (!child) ||
                (child.isRexSizer && child.ignoreLayout) ||
                (!child.runHeightWrap)
            ) {
                continue;
            }

            if (
                !child.hasHeightWrap ||
                child.hasHeightWrap()     // all kind of sizers has hasHeightWrap method
            ) {
                return true;
            }
        }

        return false;
    };

    var ResolveChildrenHeight$1 = function (parentHeight) {
        // Resolve width of sizer children
        var child, expandedChildHeight, childHeight;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (child && child.isRexSizer && !child.ignoreLayout) {
                expandedChildHeight = this.getExpandedChildHeight(child, parentHeight);
                childHeight = child.resolveHeight(expandedChildHeight);
                if (childHeight === undefined) {
                    childHeight = expandedChildHeight;
                }
                child.resolveChildrenHeight(childHeight);
            }
        }
    };

    // Default method
    var RunHeightWrap$3 = function (parentHeight) {
        var child, expandedChildHeight, childHeight;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (
                (!child) ||
                (child.isRexSizer && child.ignoreLayout) ||
                (!child.runHeightWrap)
            ) {
                continue;
            }

            expandedChildHeight = this.getExpandedChildHeight(child, parentHeight);
            if (child.isRexSizer) {
                childHeight = child.resolveHeight(expandedChildHeight);
                if (childHeight === undefined) {
                    childHeight = expandedChildHeight;
                }
            } else {
                childHeight = expandedChildHeight;
            }
            child.runHeightWrap(childHeight);
        }
        return this;
    };

    var GetChildWidth = function (child) {
        var childWidth;
        if (child.isRexSizer) { // Sizer game object
            var childrenWidth = child.childrenWidth;
            if (childrenWidth == undefined) {
                return undefined;
            }

            var childMinWidth = child.minWidth * child.scaleX;
            childWidth = Math.max(childMinWidth, childrenWidth);
        } else {  // Normal game object
            if (child.minWidth !== undefined) {  // Force minWidth
                childWidth = child.minWidth;
            } else if (child._minWidth !== undefined) {  // Force minWidth
                childWidth = child._minWidth;
            } else {
                childWidth = GetDisplayWidth(child);
            }
        }

        return childWidth;
    };

    var GetChildHeight = function (child) {
        var childHeight;
        if (child.isRexSizer) {  // Sizer game object
            var childrenHeight = child.childrenHeight;
            if (childrenHeight === undefined) {
                return undefined;
            }

            var childMinHeight = child.minHeight * child.scaleY;
            childHeight = Math.max(childMinHeight, childrenHeight);
        } else {  // Normal game object
            if (child.minHeight !== undefined) {  // Force minHeight
                childHeight = child.minHeight;
            } else if (child._minHeight !== undefined) {
                childHeight = child._minHeight;
            } else {
                childHeight = GetDisplayHeight(child);
            }
        }
        return childHeight;
    };

    // Override
    var GetExpandedChildWidth$3 = function (child, parentWidth) {
        return parentWidth;
    };

    // Override
    var GetExpandedChildHeight$3 = function (child, parentHeight) {
        return parentHeight;
    };

    // Override
    var GetChildrenWidth$4 = function () {
        return 0;
    };

    // Override
    var GetChildrenHeight$4 = function () {
        return 0;
    };

    var GetAllChildrenSizers = function (out) {
        if (out === undefined) {
            out = [];
        }
        var startIdx = out.length;
        var children = this.getChildrenSizers(out);
        var endIdx = out.length;
        for (var i = startIdx; i < endIdx; i++) {
            children[i].getAllChildrenSizers(out);
        }

        return out;
    };

    // Default method
    var GetChildrenSizers$4 = function(out) {
        if (out === undefined) {
            out = [];
        }
        return out;
    };

    var GetShownChildrenMethods = {
        getShownChildren(out) {
            if (out === undefined) {
                out = [];
            }
            var children = this.children,
                child;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (child.rexSizer && child.rexSizer.hidden) { // Don't add hidden child
                    continue;
                }

                out.push(child);
            }

            return out;
        },

        getAllShownChildren(out) {
            if (out === undefined) {
                out = [];
            }

            var queue = [this];
            while (queue.length > 0) {
                var current = queue.shift();
                if (current.rexSizer && current.rexSizer.hidden) {
                    continue;
                }

                if (current !== this) {
                    out.push(current);
                }

                if (current.isRexContainerLite) {
                    queue.push(...current.children);
                }
            }

            return out;
        }
    };

    var PreLayout$3 = function () {
        this._childrenWidth = undefined;
        this._childrenHeight = undefined;

        var children = this.getChildrenSizers(),
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.ignoreLayout) {
                continue;
            }
            child.preLayout();
        }
    };

    var Layout = function () {
        this.runLayout();
        return this;
    };

    var HasResizeMethod = function (gameObject) {
        // 1st pass : Has `resize` method?
        if (gameObject.resize) {
            return true;
        }

        // 2nd pass : Has `setSize` method?
        // Does not have `setSize` method
        if (!gameObject.setSize) {
            return false;
        }

        // Has `setSize` method but only for internal usage.
        for (var i = 0, cnt = ExcludeClassList$1.length; i < cnt; i++) {
            var excludeClass = ExcludeClassList$1[i];
            if (excludeClass && gameObject instanceof excludeClass) {
                return false;
            }
        }

        return true;
    };

    var ExcludeClassList$1 = [
        Phaser.GameObjects.Image,
        Phaser.GameObjects.Sprite,
        Phaser.GameObjects.Mesh,
        Phaser.GameObjects.Shader,
        Phaser.GameObjects.Video
    ];

    var CanSetDisplaySize = function (gameObject) {
        if (gameObject.displayWidth === undefined) {
            return false;
        }

        for (var i = 0, cnt = ExcludeClassList.length; i < cnt; i++) {
            var excludeClass = ExcludeClassList[i];
            if (excludeClass && gameObject instanceof excludeClass) {
                return false;
            }
        }

        return true;
    };

    var ExcludeClassList = [
        Phaser.GameObjects.BitmapText,
    ];

    var ResizeGameObject = function (gameObject, newDisplayWidth, newDisplayHeight) {
        // Set display size

        if (!gameObject || ((newDisplayWidth === undefined) && (newDisplayHeight === undefined))) {
            return;
        }

        if (HasResizeMethod(gameObject)) { // Has `resize`, or `setSize` method
            var newWidth, newHeight;
            if (newDisplayWidth === undefined) {
                newWidth = gameObject.width;
            } else {
                newWidth = newDisplayWidth / gameObject.scaleX;
            }
            if (newDisplayHeight === undefined) {
                newHeight = gameObject.height;
            } else {
                newHeight = newDisplayHeight / gameObject.scaleY;
            }

            if (gameObject.resize) {
                gameObject.resize(newWidth, newHeight);
            } else {
                gameObject.setSize(newWidth, newHeight);
            }

        } else {
            var canSetDisplaySize = CanSetDisplaySize(gameObject);
            if (newDisplayWidth !== undefined) {
                if (canSetDisplaySize) {
                    gameObject.displayWidth = newDisplayWidth;
                } else {
                    gameObject.scaleX = newDisplayWidth / gameObject.width;
                }
            }
            if (newDisplayHeight !== undefined) {
                if (canSetDisplaySize) {
                    gameObject.displayHeight = newDisplayHeight;
                } else {
                    gameObject.scaleY = newDisplayHeight / gameObject.height;
                }
            }

        }
    };

    // Override
    var RunLayout = function (parent, newWidth, newHeight) {
        // Skip hidden or !dirty sizer
        if (this.ignoreLayout) {
            return this;
        }

        var isTopmostParent = !parent;
        // Pre-processor, top parent only
        if (isTopmostParent) {
            this.preLayout();
        }

        var runWidthWrap, runHeightWrap;
        if (isTopmostParent || parent.runChildrenWrapFlag) {
            runWidthWrap = this.hasWidthWrap();
            runHeightWrap = this.hasHeightWrap();
        } else {
            runWidthWrap = false;
            runHeightWrap = false;
        }

        var size = ResolveSize(this, newWidth, newHeight, runWidthWrap, runHeightWrap);
        if (!size) {
            console.error('Can\'t resolve size of ', this);
        }

        var width = size.width;
        var height = size.height;

        // Resize parent
        ResizeGameObject(this, width, height);

        if (this.sizerEventsEnable) {
            if (this.layoutedChildren === undefined) {
                this.layoutedChildren = [];
            }
        }

        // Layout children    
        this.layoutChildren();

        // Layout background children
        this.layoutBackgrounds();

        if (this.sizerEventsEnable) {
            this.emit('postlayout', this.layoutedChildren, this);
            this.layoutedChildren.length = 0;
        }

        // Custom postLayout callback
        this.postLayout(parent, width, height);

        // Post-processor, top parent only
        if (isTopmostParent) {
            if (this._anchor) {
                this._anchor.updatePosition();
            }
        }

        return this;
    };

    var ResolveSize = function (self, width, height, runWidthWrap, runHeightWrap) {
        var newWidth = ResolveWidth$2(self, width, runWidthWrap);

        var newHeight = ResolveHeight$2(self, height, runHeightWrap);

        if (newWidth === undefined) {
            newWidth = ResolveWidth$2(self, width, runWidthWrap);
        }

        if ((newWidth !== undefined) && (newHeight !== undefined)) {
            return {
                width: newWidth,
                height: newHeight
            }
        }

        return false;
    };

    var ResolveWidth$2 = function (self, width, runWidthWrap) {
        // Calculate parent width
        var width = self.resolveWidth(width);

        // Calculate all children width, run width wrap
        if (width !== undefined) {
            if (runWidthWrap) {
                self.resolveChildrenWidth(width);
                self.runWidthWrap(width);
            }
        }

        return width;
    };

    var ResolveHeight$2 = function (self, height, runHeightWrap) {
        // Calculate parent height
        var height = self.resolveHeight(height);

        // Calculate all children width, run width wrap
        if (height !== undefined) {
            if (runHeightWrap) {
                self.resolveChildrenHeight(height);
                self.runHeightWrap(height);
            }
        }

        return height;
    };

    // Override
    var LayoutChildren$4 = function () {

    };

    // Override
    var PostLayout = function (parent, newWidth, newHeight) {
        return this;
    };

    var EventEmitterMethods$1 = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
            }
            this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
            this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
            return this;
        },

        destroyEventEmitter() {
            if (this._eventEmitter && this._privateEE) {
                this._eventEmitter.shutdown();
            }
            return this;
        },

        getEventEmitter() {
            return this._eventEmitter;
        },

        on() {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once() {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off() {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit(event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener() {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener() {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners() {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount() {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners() {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames() {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSceneObject = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsSceneObject(object)) { // object = scene
            return object;
        } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
            return object.scene;
        } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
            return object.parent.scene;
        } else {
            return null;
        }
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    const GetValue$1g = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$1g(config, 'eventEmitter', true));

            // Register callback of parent destroy event, also see `shutdown` method
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.once('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }

        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // parent might not be shutdown yet
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.off('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }


            this.destroyEventEmitter();

            this.parent = undefined;
            this.scene = undefined;
            this.game = undefined;

            this.isShutdown = true;
        }

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onEnvDestroy() {
            this.destroy(true);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        setParent(parent) {
            this.parent = parent;  // gameObject, scene, or game

            this.scene = GetSceneObject(parent);
            this.game = GetGame(parent);

            return this;
        }

    }
    Object.assign(
        ComponentBase.prototype,
        EventEmitterMethods$1
    );

    var DefaultResizeCallback = function (width, height, gameObject, anchor) {
        ResizeGameObject(gameObject, width, height);
    };

    const GetValue$1f = Phaser.Utils.Objects.GetValue;

    class Anchor extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this.viewport = undefined;
            this.resetFromJSON(config);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.autoAnchor(false);

            this.viewport = undefined;
            this.onUpdateViewportCallback = undefined;
            this.onUpdateViewportCallbackScope = undefined;
            this.onResizeCallback = undefined;
            this.onResizeCallbackScope = undefined;

            super.shutdown(fromScene);
        }

        resetFromJSON(o) {
            if (o === undefined) {
                o = {};
            }

            // Position
            var alignX, configX;
            if (o.x !== undefined) {
                alignX = null;
                configX = o.x;
            } else if (o.left !== undefined) {
                alignX = 0;
                configX = o.left;
            } else if (o.right !== undefined) {
                alignX = 1;
                configX = o.right;
            } else if (o.centerX !== undefined) {
                alignX = 0.5;
                configX = o.centerX;
            }

            var alignY, configY;
            if (o.y !== undefined) {
                alignY = null;
                configY = o.y;
            } else if (o.top !== undefined) {
                alignY = 0;
                configY = o.top;
            } else if (o.bottom !== undefined) {
                alignY = 1;
                configY = o.bottom;
            } else if (o.centerY !== undefined) {
                alignY = 0.5;
                configY = o.centerY;
            }

            var percentageX, offsetX;
            if (configX !== undefined) {
                configX = configX.replace('left', '0%').replace('right', '100%').replace('center', '50%').split('%');
                percentageX = parseFloat(configX[0]) / 100;
                offsetX = (configX[1] === '') ? 0 : parseFloat(configX[1]);
            }
            var percentageY, offsetY;
            if (configY !== undefined) {
                configY = configY.replace('top', '0%').replace('bottom', '100%').replace('center', '50%').split('%');
                percentageY = parseFloat(configY[0]) / 100;
                offsetY = (configY[1] === '') ? 0 : parseFloat(configY[1]);
            }

            // Size
            var configWidth = o.width;
            var percentageWidth, paddingWidth;
            if (configWidth !== undefined) {
                configWidth = configWidth.split('%');
                percentageWidth = parseFloat(configWidth[0]) / 100;
                paddingWidth = (configWidth[1] === '') ? 0 : parseFloat(configWidth[1]);
            }

            var configHeight = o.height;
            var percentageHeight, paddingHeight;
            if (configHeight !== undefined) {
                configHeight = configHeight.split('%');
                percentageHeight = parseFloat(configHeight[0]) / 100;
                paddingHeight = (configHeight[1] === '') ? 0 : parseFloat(configHeight[1]);
            }

            // Position
            this.setAlign(alignX, alignY);
            this.setPercentage(percentageX, percentageY);
            this.setOffset(offsetX, offsetY);
            // Size
            this.setSizePercentage(percentageWidth, percentageHeight);
            this.setSizePadding(paddingWidth, paddingHeight);

            var onResizeCallback = GetValue$1f(o, 'onResizeCallback', DefaultResizeCallback);
            var onResizeCallbackScope = GetValue$1f(o, 'onResizeCallbackScope');
            this.setResizeCallback(onResizeCallback, onResizeCallbackScope);

            var onUpdateViewportCallback = GetValue$1f(o, 'onUpdateViewportCallback');
            var onUpdateViewportCallbackScope = GetValue$1f(o, 'onUpdateViewportCallbackScope');
            this.setUpdateViewportCallback(onUpdateViewportCallback, onUpdateViewportCallbackScope);

            this.autoAnchor(o.enable);

            return this;
        }

        autoAnchor(enable) {
            if (enable === undefined) {
                enable = true;
            }

            enable = !!enable;
            if (this.autoAnchorEnable === enable) {
                return this;
            }

            if (enable) {
                this.scene.sys.scale.on('resize', this.anchor, this);
                this.anchor();
            } else {
                this.scene.sys.scale.off('resize', this.anchor, this);
            }

            this.autoAnchorEnable = enable;

            return this;
        }

        // Position
        setAlign(x, y) {
            this.alignX = x;
            this.alignY = y;
            return this;
        }

        setPercentage(x, y) {
            this.percentageX = x;
            this.percentageY = y;
            return this;
        }

        setOffset(x, y) {
            this.offsetX = x;
            this.offsetY = y;
            return this;
        }

        // Size
        setSizePercentage(width, height) {
            this.percentageWidth = width;
            this.percentageHeight = height;
            return this;
        }

        setSizePadding(width, height) {
            this.paddingWidth = width;
            this.paddingHeight = height;
            return this;
        }

        setResizeCallback(callback, scope) {
            this.onResizeCallback = callback;
            this.onResizeCallbackScope = scope;
            return this;
        }

        setUpdateViewportCallback(callback, scope) {
            this.onUpdateViewportCallback = callback;
            this.onUpdateViewportCallbackScope = scope;
            return this;
        }

        anchor() {
            this.updateViewport();
            this.updateSize();
            this.updatePosition();
            return this;
        }

        updateSize() {
            var callback = this.onResizeCallback,
                scope = this.onResizeCallbackScope;
            var newWidth = this.anchorWidth,
                newHeight = this.anchorHeight;
            if (((newWidth === undefined) && (newHeight === undefined)) || !callback) {
                return;
            }

            var gameObject = this.parent;
            if (newWidth === undefined) {
                newWidth = gameObject.width;
            }
            if (newHeight === undefined) {
                newHeight = gameObject.height;
            }

            if (scope) {
                callback.call(scope, newWidth, newHeight, gameObject, this);
            } else {
                callback(newWidth, newHeight, gameObject, this);
            }
        }

        updatePosition() {
            var gameObject = this.parent;

            if (this.alignX === null) {
                gameObject.x = this.anchorX;
            } else if (this.alignX !== undefined) {
                gameObject.x = this.anchorX + (gameObject.displayWidth * (gameObject.originX - this.alignX));
            }

            if (this.alignY === null) {
                gameObject.y = this.anchorY;
            } else if (this.alignY !== undefined) {
                gameObject.y = this.anchorY + (gameObject.displayHeight * (gameObject.originY - this.alignY));
            }

            return this;
        }

        get anchorX() {
            return this.viewport.x + (this.viewport.width * this.percentageX) + this.offsetX;
        }

        get anchorY() {
            return this.viewport.y + (this.viewport.height * this.percentageY) + this.offsetY;
        }

        get anchorWidth() {
            if (this.percentageWidth === undefined) {
                return undefined;
            }
            return (this.viewport.width * this.percentageWidth) + this.paddingWidth;
        }

        get anchorHeight() {
            if (this.percentageHeight === undefined) {
                return undefined;
            }
            return (this.viewport.height * this.percentageHeight) + this.paddingHeight;
        }

        updateViewport() {
            var camera = this.parent.scene.cameras.main;
            this.viewport = GetViewport(this.scene, camera, this.viewport);

            var viewport = this.viewport;
            var callback = this.onUpdateViewportCallback,
                scope = this.onUpdateViewportCallbackScope;
            if (callback) {
                if (scope) {
                    callback.call(scope, viewport, this.parent, this);
                } else {
                    callback(viewport, this.parent, this);
                }
            }
        }
    }

    var SetAnchor = function (config) {
        if (config === undefined) {
            config = {};
        }

        // Assign default onResizeCallback if not given    
        var hasMinWidth = config.hasOwnProperty('width');
        var hasMinHeight = config.hasOwnProperty('height');
        var hasOnResizeCallback = config.hasOwnProperty('onResizeCallback');
        if ((hasMinWidth || hasMinHeight) && !hasOnResizeCallback) {
            config.onResizeCallback = function (width, height, sizer) {
                if (hasMinWidth) {
                    sizer.setMinWidth(width);
                }

                if (hasMinHeight) {
                    sizer.setMinHeight(height);
                }

                sizer.layout();
            };
        }

        if (this._anchor === undefined) {
            this._anchor = new Anchor(this, config);
        } else {
            this._anchor.resetFromJSON(config);
        }
        return this;
    };

    const GetValue$1e = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$1e(config, 'tickingMode', 1));
            // boot() later
        }

        // override
        boot() {
            if ((this.tickingMode === 2) && (!this.tickingState)) {
                this.startTicking();
            }
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.stop();
            if (this.tickingState) {
                this.stopTicking();
            }
            super.shutdown(fromScene);
        }

        setTickingMode(mode) {
            if (typeof (mode) === 'string') {
                mode = TICKINGMODE[mode];
            }
            this.tickingMode = mode;
        }

        // override
        startTicking() {
            this.tickingState = true;
        }

        // override
        stopTicking() {
            this.tickingState = false;
        }

        get isRunning() {
            return this._isRunning;
        }

        set isRunning(value) {
            if (this._isRunning === value) {
                return;
            }

            this._isRunning = value;
            if ((this.tickingMode === 1) && (value != this.tickingState)) {
                if (value) {
                    this.startTicking();
                } else {
                    this.stopTicking();
                }
            }
        }

        start() {
            this.isPaused = false;
            this.isRunning = true;
            return this;
        }

        pause() {
            // Only can ba paused in running state
            if (this.isRunning) {
                this.isPaused = true;
                this.isRunning = false;
            }
            return this;
        }

        resume() {
            // Only can ba resumed in paused state (paused from running state)
            if (this.isPaused) {
                this.isPaused = false;
                this.isRunning = true;
            }
            return this;
        }

        stop() {
            this.isPaused = false;
            this.isRunning = false;
            return this;
        }

        complete() {
            this.isPaused = false;
            this.isRunning = false;
            this.emit('complete', this.parent, this);
        }
    }

    const TICKINGMODE = {
        'no': 0,
        'lazy': 1,
        'always': 2
    };

    const GetValue$1d = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$1d(config, 'tickEventName', defaultEventName);
            this.isSceneTicker = !IsGameUpdateEvent(this.tickEventName);

        }

        startTicking() {
            super.startTicking();

            if (this.isSceneTicker) {
                this.scene.sys.events.on(this.tickEventName, this.update, this);
            } else {
                this.game.events.on(this.tickEventName, this.update, this);
            }

        }

        stopTicking() {
            super.stopTicking();

            if (this.isSceneTicker && this.scene) { // Scene might be destoryed
                this.scene.sys.events.off(this.tickEventName, this.update, this);
            } else if (this.game) {
                this.game.events.off(this.tickEventName, this.update, this);
            }
        }

        // update(time, delta) {
        //     
        // }

    }

    var IsGameUpdateEvent = function (eventName) {
        return (eventName === 'step') || (eventName === 'poststep');
    };

    const GetValue$1c = Phaser.Utils.Objects.GetValue;
    const Clamp$4 = Phaser.Math.Clamp;

    class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$1c(o, 'state', IDLE$6);
            this.timeScale = GetValue$1c(o, 'timeScale', 1);
            this.delay = GetValue$1c(o, 'delay', 0);
            this.repeat = GetValue$1c(o, 'repeat', 0);
            this.repeatCounter = GetValue$1c(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$1c(o, 'repeatDelay', 0);
            this.duration = GetValue$1c(o, 'duration', 0);
            this.nowTime = GetValue$1c(o, 'nowTime', 0);
            this.justRestart = GetValue$1c(o, 'justRestart', false);
        }

        toJSON() {
            return {
                state: this.state,
                timeScale: this.timeScale,
                delay: this.delay,
                repeat: this.repeat,
                repeatCounter: this.repeatCounter,
                repeatDelay: this.repeatDelay,
                duration: this.duration,
                nowTime: this.nowTime,
                justRestart: this.justRestart,
            }
        }

        destroy() {

        }

        setTimeScale(timeScale) {
            this.timeScale = timeScale;
            return this;
        }

        setDelay(delay) {
            if (delay === undefined) {
                delay = 0;
            }
            this.delay = delay;
            return this;
        }

        setDuration(duration) {
            this.duration = duration;
            return this;
        }

        setRepeat(repeat) {
            this.repeat = repeat;
            return this;
        }

        setRepeatInfinity() {
            this.repeat = -1;
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            return this;
        }

        start() {
            this.nowTime = (this.delay > 0) ? -this.delay : 0;
            this.state = (this.nowTime >= 0) ? COUNTDOWN : DELAY;
            this.repeatCounter = 0;
            return this;
        }

        stop() {
            this.state = IDLE$6;
            return this;
        }

        update(time, delta) {
            if (this.state === IDLE$6 || this.state === DONE ||
                delta === 0 || this.timeScale === 0
            ) {
                return;
            }

            this.nowTime += (delta * this.timeScale);
            this.justRestart = false;
            if (this.nowTime >= this.duration) {
                if ((this.repeat === -1) || (this.repeatCounter < this.repeat)) {
                    this.repeatCounter++;
                    this.justRestart = true;
                    this.nowTime -= this.duration;
                    if (this.repeatDelay > 0) {
                        this.nowTime -= this.repeatDelay;
                        this.state = REPEATDELAY;
                    }
                } else {
                    this.nowTime = this.duration;
                    this.state = DONE;
                }
            } else if (this.nowTime >= 0) {
                this.state = COUNTDOWN;
            }
        }

        get t() {
            var t;
            switch (this.state) {
                case IDLE$6:
                case DELAY:
                case REPEATDELAY:
                    t = 0;
                    break;

                case COUNTDOWN:
                    t = this.nowTime / this.duration;
                    break;

                case DONE:
                    t = 1;
                    break;
            }
            return Clamp$4(t, 0, 1);
        }

        set t(value) {
            value = Clamp$4(value, -1, 1);
            if (value < 0) {
                this.state = DELAY;
                this.nowTime = -this.delay * value;
            } else {
                this.state = COUNTDOWN;
                this.nowTime = this.duration * value;

                if ((value === 1) && (this.repeat !== 0)) {
                    this.repeatCounter++;
                }
            }
        }

        setT(t) {
            this.t = t;
            return this;
        }

        get isIdle() {
            return this.state === IDLE$6;
        }

        get isDelay() {
            return this.state === DELAY;
        }

        get isCountDown() {
            return this.state === COUNTDOWN;
        }

        get isRunning() {
            return this.state === DELAY || this.state === COUNTDOWN;
        }

        get isDone() {
            return this.state === DONE;
        }

        get isOddIteration() {
            return (this.repeatCounter & 1) === 1;
        }

        get isEvenIteration() {
            return (this.repeatCounter & 1) === 0;
        }

    }

    const IDLE$6 = 0;
    const DELAY = 1;
    const COUNTDOWN = 2;
    const REPEATDELAY = 3;
    const DONE = -1;

    class TimerTickTask extends SceneUpdateTickTask {
        constructor(parent, config) {
            super(parent, config);
            this.timer = new Timer();
            // boot() later 
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            super.shutdown(fromScene);
            this.timer.destroy();
            this.timer = undefined;
        }

        start() {
            this.timer.start();
            super.start();
            return this;
        }

        stop() {
            this.timer.stop();
            super.stop();
            return this;
        }

        complete() {
            this.timer.stop();
            super.complete();
            return this;
        }

    }

    const GetValue$1b = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$3 = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$1b(o, 'timer'));
            this.setEnable(GetValue$1b(o, 'enable', true));
            this.setTarget(GetValue$1b(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue$3(o, 'delay', 0));
            this.setDuration(GetAdvancedValue$3(o, 'duration', 1000));
            this.setEase(GetValue$1b(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$1b(o, 'repeat', 0));

            return this;
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        setTarget(target) {
            if (target === undefined) {
                target = this.parent;
            }
            this.target = target;
            return this;
        }

        setDelay(time) {
            this.delay = time;
            // Assign `this.timer.setRepeat(repeat)` manually
            return this;
        }

        setDuration(time) {
            this.duration = time;
            return this;
        }

        setRepeat(repeat) {
            this.repeat = repeat;
            // Assign `this.timer.setRepeat(repeat)` manually
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
            return this;
        }

        setEase(ease) {
            if (ease === undefined) {
                ease = 'Linear';
            }
            this.ease = ease;
            this.easeFn = GetEaseFunction(ease);
            return this;
        }

        // Override
        start() {
            // Ignore start if timer is running, i.e. in DELAY, o RUN state
            if (this.timer.isRunning) {
                return this;
            }

            super.start();
            return this;
        }

        restart() {
            this.timer.stop();
            this.start.apply(this, arguments);
            return this;
        }

        stop(toEnd) {
            if (toEnd === undefined) {
                toEnd = false;
            }

            super.stop();

            if (toEnd) {
                this.timer.setT(1);
                this.updateTarget(this.target, this.timer);
                this.complete();
            }

            return this;
        }

        update(time, delta) {
            if (
                (!this.isRunning) ||
                (!this.enable) ||
                (this.parent.hasOwnProperty('active') && !this.parent.active)
            ) {
                return this;
            }

            var target = this.target,
                timer = this.timer;

            timer.update(time, delta);

            // isDelay, isCountDown, isDone
            if (!timer.isDelay) {
                this.updateTarget(target, timer);
            }

            this.emit('update', target, this);

            if (timer.isDone) {
                this.complete();
            }

            return this;
        }

        // Override
        updateTarget(target, timer) {

        }
    }

    const GetValue$1a = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
    const Linear$6 = Phaser.Math.Linear;

    let Scale$1 = class Scale extends EaseValueTaskBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.timer

            this.scaleStart = {};
            this.scaleEnd = {};

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);

            this.setMode(GetValue$1a(o, 'mode', 0));
            this.setScaleRange(
                GetAdvancedValue$2(o, 'start', undefined),
                GetAdvancedValue$2(o, 'end', 0)
            );

            return this;
        }

        setMode(m) {
            if (typeof (m) === 'string') {
                m = MODE$3[m];
            }
            this.mode = m;
            return this;
        }

        setScaleRange(start, end) {
            if (typeof (start) === 'number') {
                this.startX = start;
                this.startY = start;
            } else {
                this.startX = GetAdvancedValue$2(start, 'x', this.parent.scaleX);
                this.startY = GetAdvancedValue$2(start, 'y', this.parent.scaleY);
            }
            if (typeof (end) === 'number') {
                this.endX = end;
                this.endY = end;
            } else {
                this.endX = GetAdvancedValue$2(end, 'x', undefined);
                this.endY = GetAdvancedValue$2(end, 'y', undefined);
            }

            this.hasScaleX = (this.startX !== undefined) && (this.endX !== undefined);
            this.hasScaleY = (this.startY !== undefined) && (this.endY !== undefined);
            return this;
        }

        start() {
            if (this.timer.isRunning) {
                return this;
            }

            var gameObject = this.parent;
            if (this.hasScaleX) {
                gameObject.scaleX = this.startX;
            }
            if (this.hasScaleY) {
                gameObject.scaleY = this.startY;
            }

            var repeat = this.repeat;
            if (this.mode === 2) {  // Yoyo
                if (repeat !== -1) {
                    repeat = ((repeat + 1) * 2) - 1;
                }
            }

            this.timer
                .setDelay(this.delay)
                .setDuration(this.duration)
                .setRepeat(repeat);

            super.start();
            return this;
        }

        updateTarget(gameObject, timer) {
            var t = timer.t;
            if (timer.isOddIteration) {  // Yoyo
                t = 1 - t;
            }
            t = this.easeFn(t);

            if (this.hasScaleX) {
                gameObject.scaleX = Linear$6(this.startX, this.endX, t);
            }
            if (this.hasScaleY) {
                gameObject.scaleY = Linear$6(this.startY, this.endY, t);
            }
        }

        complete() {
            super.complete();

            if (this.mode === 1) {
                this.parent.destroy();
                // Will also destroy this behavior
            }
            return this;
        }
    };

    const MODE$3 = {
        stop: 0,
        destroy: 1,
        yoyo: 2
    };

    var PopUp = function (gameObject, duration, orientation, ease, scale) {
        if (ease === undefined) {
            ease = 'Cubic';
        }

        // Ease scale from 0 to current scale
        var start, end;
        switch (orientation) {
            case 0:
            case 'x':
                start = { x: 0 };
                end = { x: gameObject.scaleX };
                break;
            case 1:
            case 'y':
                start = { y: 0 };
                end = { y: gameObject.scaleY };
                break;
            default:
                start = 0;
                end = gameObject.scale;
                break;
        }

        var config = {
            mode: 0,
            start: start,
            end: end,
            duration: duration,
            ease: ease
        };

        if (scale === undefined) {
            scale = new Scale$1(gameObject, config);
        } else {
            scale.resetFromJSON(config);
        }
        scale.restart();

        return scale;
    };

    var ScaleDownDestroy = function (gameObject, duration, orientation, ease, destroyMode, scale) {
        if (ease === undefined) {
            ease = 'Linear';
        }

        // Ease from current scale to 0
        if (destroyMode instanceof Scale$1) {
            scale = destroyMode;
            destroyMode = undefined;
        }

        if (destroyMode === undefined) {
            destroyMode = true;
        }

        var config = {};
        config.mode = (destroyMode) ? 1 : 0;
        switch (orientation) {
            case 0:
            case 'x':
                config.end = {
                    x: 0
                };
                break;
            case 1:
            case 'y':
                config.end = {
                    y: 0
                };
                break;
            default:
                config.end = 0;
                break;
        }
        config.duration = duration;
        config.ease = ease;

        if (scale === undefined) {
            scale = new Scale$1(gameObject, config);
        } else {
            scale.resetFromJSON(config);
        }
        scale.restart();

        return scale;
    };

    var Yoyo = function (gameObject, duration, peakValue, repeat, orientation, ease, scale) {
        if (peakValue === undefined) {
            peakValue = 1.2;
        }
        if (repeat === undefined) {
            repeat = 0;
        }
        if (ease === undefined) {
            ease = 'Cubic';
        }

        // Ease scale from 0 to current scale
        var start, end;
        switch (orientation) {
            case 0:
            case 'x':
                start = { x: gameObject.scaleX };
                end = { x: peakValue };
                break;
            case 1:
            case 'y':
                start = { y: gameObject.scaleX };
                end = { y: peakValue };
                break;
            default:
                start = gameObject.scaleX;
                end = peakValue;
                break;
        }

        var config = {
            mode: 2,
            start: start,
            end: end,
            duration: (duration / 2),
            ease: ease,
            repeat: repeat,
        };

        if (scale === undefined) {
            scale = new Scale$1(gameObject, config);
        } else {
            scale.resetFromJSON(config);
        }
        scale.restart();

        return scale;
    };

    var WaitEvent = function (eventEmitter, eventName) {
        return new Promise(function (resolve, reject) {
            eventEmitter.once(eventName, function () {
                resolve();
            });
        });
    };

    var WaitComplete = function (eventEmitter) {
        return WaitEvent(eventEmitter, 'complete');
    };

    const IsPlainObject$j = Phaser.Utils.Objects.IsPlainObject;

    var ScaleMethods = {
        onInitScale() {
            var gameObject = this;
            var scale = this._scaleBehavior;

            // Route 'complete' of scale to gameObject
            scale.completeEventName = undefined;
            scale.on('complete', function () {
                if (scale.completeEventName) {
                    gameObject.emit(scale.completeEventName, gameObject);
                    scale.completeEventName = undefined;
                }
            });
        },

        popUp(duration, orientation, ease) {
            if (IsPlainObject$j(duration)) {
                var config = duration;
                duration = config.duration;
                orientation = config.orientation;
                ease = config.ease;
            }

            var isInit = (this._scaleBehavior === undefined);

            this._scaleBehavior = PopUp(this, duration, orientation, ease, this._scaleBehavior);

            if (isInit) {
                this.onInitScale();
            }

            this._scaleBehavior.completeEventName = 'popup.complete';

            return this;
        },

        popUpPromise(duration, orientation, ease) {
            this.popUp(duration, orientation, ease);
            return WaitComplete(this._scaleBehavior);
        },

        isRunningPopUp() {
            return this._scaleBehavior && (this._scaleBehavior.completeEventName === 'popup.complete');
        },

        scaleDownDestroy(duration, orientation, ease, destroyMode) {
            if (IsPlainObject$j(duration)) {
                var config = duration;
                duration = config.duration;
                orientation = config.orientation;
                ease = config.ease;
                destroyMode = config.destroy;
            }

            var isInit = (this._scaleBehavior === undefined);

            this._scaleBehavior = ScaleDownDestroy(this, duration, orientation, ease, destroyMode, this._scaleBehavior);

            if (isInit) {
                this.onInitScale();
            }

            this._scaleBehavior.completeEventName = 'scaledown.complete';

            return this;
        },

        scaleDownDestroyPromise(duration, orientation, ease, destroyMode) {
            this.scaleDownDestroy(duration, orientation, ease, destroyMode);
            return WaitComplete(this._scaleBehavior);
        },

        scaleDown(duration, orientation, ease) {
            this.scaleDownDestroy(duration, orientation, ease, false);
            return this;
        },

        scaleDownPromise(duration, orientation, ease) {
            this.scaleDown(duration, orientation, ease);
            return WaitComplete(this._scaleBehavior);
        },

        isRunningScaleDown() {
            return this._scaleBehavior && (this._scaleBehavior.completeEventName === 'scaledown.complete');
        },

        scaleYoyo(duration, peakValue, repeat, orientation, ease) {
            if (IsPlainObject$j(duration)) {
                var config = duration;
                duration = config.duration;
                peakValue = config.peakValue;
                repeat = config.repeat;
                orientation = config.orientation;
                ease = config.ease;
            }

            var isInit = (this._scaleBehavior === undefined);

            this._scaleBehavior = Yoyo(this, duration, peakValue, repeat, orientation, ease, this._scaleBehavior);

            if (isInit) {
                this.onInitScale();
            }

            this._scaleBehavior.completeEventName = 'scaleyoyo.complete';

            return this;
        },

        scaleYoyoPromise(duration, peakValue, repeat, orientation, ease) {
            this.scaleYoyo(duration, peakValue, repeat, orientation, ease);
            return WaitComplete(this._scaleBehavior);
        },

        isRunningScaleYoyo() {
            return this._scaleBehavior && (this._scaleBehavior.completeEventName = 'scaleyoyo.complete');
        },

        isRunningEaseScale() {
            return this.isRunningPopUp() || this.isRunningScaleDown() || this.isRunningScaleYoyo();
        },
    };

    var methods$e = {};
    Object.assign(methods$e, ScaleMethods);

    methods$e.onInitScale = function () {
        ScaleMethods.onInitScale.call(this);

        var gameObject = this;
        var scale = this._scaleBehavior;
        // Update local state
        scale.on('update', function () {
            var parent = GetParentSizerMethods.getParentSizer(gameObject);
            if (parent) {
                parent.resetChildPositionState(gameObject);
            }
        });
    };

    const GetValue$19 = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const Linear$5 = Phaser.Math.Linear;

    class Fade extends EaseValueTaskBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.timer

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);

            this.setMode(GetValue$19(o, 'mode', 0));
            this.setAlphaRange(
                GetAdvancedValue$1(o, 'start', this.parent.alpha),
                GetAdvancedValue$1(o, 'end', 0)
            );
            return this;
        }

        setMode(m) {
            if (typeof (m) === 'string') {
                m = MODE$2[m];
            }
            this.mode = m;
            return this;
        }

        setAlphaRange(start, end) {
            this.alphaStart = start;
            this.alphaEnd = end;
            return this;
        }

        start() {
            if (this.timer.isRunning) {
                return this;
            }

            var gameObject = this.parent;
            gameObject.setAlpha(this.alphaStart);

            this.timer
                .setDelay(this.delay)
                .setDuration(this.duration)
                .setRepeat((this.mode === 2) ? -1 : 0);

            super.start();
            return this;
        }

        updateTarget(gameObject, timer) {
            var t = timer.t;
            if (timer.isOddIteration) {  // Yoyo
                t = 1 - t;
            }

            gameObject.alpha = Linear$5(this.alphaStart, this.alphaEnd, t);
        }

        complete() {
            super.complete();
            if (this.mode === 1) {
                this.parent.destroy();
                // Will also destroy this behavior
            }
            return this;
        }

    }

    const MODE$2 = {
        stop: 0,
        destroy: 1,
        yoyo: 2
    };

    const IsPlainObject$i = Phaser.Utils.Objects.IsPlainObject;

    var FadeIn = function (gameObject, duration, alpha, fade) {
        var startAlpha, endAlpha;
        if (IsPlainObject$i(alpha)) {
            startAlpha = alpha.start;
            endAlpha = alpha.end;
        } else {
            endAlpha = alpha;
        }
        if (startAlpha === undefined) {
            startAlpha = 0;
        }
        if (endAlpha === undefined) {
            endAlpha = 1;
        }

        var config = {
            mode: 0,
            start: startAlpha,
            end: endAlpha,
            duration: duration,
        };

        if (fade === undefined) {
            fade = new Fade(gameObject, config);
        } else {
            fade.resetFromJSON(config);
        }
        fade.restart();

        return fade;
    };

    var FadeOutDestroy = function (gameObject, duration, destroyMode, fade) {
        if (destroyMode instanceof Fade) {
            fade = destroyMode;
            destroyMode = undefined;
        }

        if (destroyMode === undefined) {
            destroyMode = true;
        }

        var config = {
            mode: (destroyMode) ? 1 : 0,
            end: 0,
            duration: duration,
        };

        if (fade === undefined) {
            fade = new Fade(gameObject, config);
        } else {
            fade.resetFromJSON(config);
        }
        fade.restart();

        return fade;
    };

    const IsPlainObject$h = Phaser.Utils.Objects.IsPlainObject;

    var FadeMethods = {
        onInitFade() {
            var gameObject = this;
            var fade = this._fade;

            // Route 'complete' of fade to gameObject
            fade.completeEventName = undefined;
            fade.on('complete', function () {
                if (fade.completeEventName) {
                    gameObject.emit(fade.completeEventName, gameObject);
                    fade.completeEventName = undefined;
                }
            });
        },

        fadeIn(duration, alpha) {
            if (IsPlainObject$h(duration)) {
                var config = duration;
                duration = config.duration;
                alpha = config.alpha;
            }

            var isInit = (this._fade === undefined);

            this._fade = FadeIn(this, duration, alpha, this._fade);

            if (isInit) {
                this.onInitFade();
            }

            this._fade.completeEventName = 'fadein.complete';

            return this;
        },

        fadeInPromise(duration, alpha) {
            this.fadeIn(duration, alpha);
            return WaitComplete(this._fade);
        },

        isRunningFadeIn() {
            return this._fade && (this._fade.completeEventName === 'fadein.complete');
        },

        fadeOutDestroy(duration, destroyMode) {
            if (IsPlainObject$h(duration)) {
                var config = duration;
                duration = config.duration;
                destroyMode = config.destroy;
            }

            var isInit = (this._fade === undefined);

            this._fade = FadeOutDestroy(this, duration, destroyMode, this._fade);

            if (isInit) {
                this.onInitFade();
            }

            this._fade.completeEventName = 'fadeout.complete';

            return this;
        },

        fadeOutDestroyPromise(duration, destroyMode) {
            this.fadeOutDestroy(duration, destroyMode);
            return WaitComplete(this._fade);
        },

        fadeOut(duration) {
            this.fadeOutDestroy(duration, false);
            return this;
        },

        fadeOutPromise(duration) {
            this.fadeOut(duration);
            return WaitComplete(this._fade);
        },

        isRunningFadeOut() {
            return this._fade && (this._fade.completeEventName === 'fadeout.complete');
        },

        isRunningEaseFade() {
            return this.isRunningFadeIn() || this.isRunningFadeOut();
        }
    };

    var methods$d = {};
    Object.assign(methods$d, FadeMethods);

    methods$d.onInitFade = function () {
        FadeMethods.onInitFade.call(this);

        var gameObject = this;
        var fade = this._fade;
        // Update local state
        fade.on('update', function () {
            var parent = GetParentSizerMethods.getParentSizer(gameObject);
            if (parent) {
                parent.resetChildAlphaState(gameObject);
            }
        });
    };

    const GetValue$18 = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const Linear$4 = Phaser.Math.Linear;

    class EaseMove extends EaseValueTaskBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.timer

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);

            this.setMode(GetValue$18(o, 'mode', 0));

            if (o && (o.hasOwnProperty('x') || o.hasOwnProperty('y'))) {
                var endX = GetAdvancedValue(o, 'x', undefined);
                var endY = GetAdvancedValue(o, 'y', undefined);
                this.setTargetPosition(endX, endY);
            } else {
                this.setTargetPosition(o);
            }

            return this;
        }

        setMode(m) {
            if (typeof (m) === 'string') {
                m = MODE$1[m];
            }
            this.mode = m;
            return this;
        }

        setTargetPosition(x, y) {
            if ((typeof (x) === 'number') || (typeof (y) === 'number')) {
                // endX, endY
                // x,y : a number, or undefined
                this.startX = this.parent.x;
                this.startY = this.parent.y;
                this.endX = x;
                this.endY = y;
            } else {
                var config = x;
                this.startX = GetAdvancedValue(config, 'startX', undefined);
                this.startY = GetAdvancedValue(config, 'startY', undefined);
                this.endX = GetAdvancedValue(config, 'endX', undefined);
                this.endY = GetAdvancedValue(config, 'endY', undefined);
            }

            this.hasMoveX = (this.startX !== undefined) && (this.endX !== undefined);
            this.hasMoveY = (this.startY !== undefined) && (this.endY !== undefined);
            return this;
        }

        start() {
            if (this.timer.isRunning) {
                return this;
            }

            var gameObject = this.parent;
            if (this.hasMoveX) {
                gameObject.x = this.startX;
            }
            if (this.hasMoveY) {
                gameObject.y = this.startY;
            }

            this.timer
                .setDelay(this.delay)
                .setDuration(this.duration)
                .setRepeat((this.mode === 2) ? -1 : 0);

            super.start();
            return this;
        }

        updateTarget(gameObject, timer) {
            var t = timer.t;
            if (timer.isOddIteration) {   // Yoyo
                t = 1 - t;
            }
            t = this.easeFn(t);

            if (this.hasMoveX) {
                gameObject.x = Linear$4(this.startX, this.endX, t);
            }
            if (this.hasMoveY) {
                gameObject.y = Linear$4(this.startY, this.endY, t);
            }
        }

        complete() {
            super.complete();

            if (this.mode === 1) {
                this.parent.destroy();
                // Will also destroy this behavior
            }
            return this;
        }
    }

    const MODE$1 = {
        stop: 0,
        destroy: 1,
        yoyo: 2
    };

    var ParseValue = function (propertyValue, startValue) {
        // propertyValue : number or string
        if (typeof (propertyValue) === 'number') {
            return propertyValue;
        } else {
            var op = propertyValue[0];
            var num = parseFloat(propertyValue.substr(2));
            switch (op) {
                case '+': return startValue + num;
                case '-': return startValue - num;
                case '*': return startValue * num;
                case '/': return startValue / num;
            }
        }
    };

    var EaseMoveTo = function (gameObject, duration, endX, endY, ease, destroyMode, easeMove) {
        if (destroyMode instanceof EaseMove) {
            easeMove = destroyMode;
            destroyMode = undefined;
        }

        if (destroyMode === undefined) {
            destroyMode = false;
        }

        var config = {};
        config.mode = (destroyMode) ? 1 : 0;
        if (endX !== undefined) {
            config.startX = gameObject.x;
            config.endX = ParseValue(endX, gameObject.x);
        }
        if (endY !== undefined) {
            config.startY = gameObject.y;
            config.endY = ParseValue(endY, gameObject.y);
        }
        config.duration = duration;
        config.ease = (ease === undefined) ? 'Linear' : ease;

        if (easeMove === undefined) {
            easeMove = new EaseMove(gameObject, config);
        } else {
            easeMove.resetFromJSON(config);
        }
        easeMove.restart();

        return easeMove;
    };

    var EaseMoveFrom = function (gameObject, duration, startX, startY, ease, destroyMode, easeMove) {
        if (destroyMode instanceof EaseMove) {
            easeMove = destroyMode;
            destroyMode = undefined;
        }

        if (destroyMode === undefined) {
            destroyMode = false;
        }

        var config = {};
        config.mode = (destroyMode) ? 1 : 0;
        if (startX !== undefined) {
            config.startX = ParseValue(startX, gameObject.x);
            config.endX = gameObject.x;
        }
        if (startY !== undefined) {
            config.startY = ParseValue(startY, gameObject.y);
            config.endY = gameObject.y;
        }
        config.duration = duration;
        config.ease = (ease === undefined) ? 'Linear' : ease;

        if (easeMove === undefined) {
            easeMove = new EaseMove(gameObject, config);
        } else {
            easeMove.resetFromJSON(config);
        }
        easeMove.restart();

        return easeMove;
    };

    const IsPlainObject$g = Phaser.Utils.Objects.IsPlainObject;
    const DistanceBetween$6 = Phaser.Math.Distance.Between;

    var EaseMoveMethods = {
        onInitEaseMove() {
            var gameObject = this;
            var easeMove = this._easeMove;
            // Route 'complete' of easeMove to gameObject
            easeMove.completeEventName = undefined;
            easeMove.on('complete', function () {
                if (easeMove.completeEventName) {
                    gameObject.emit(easeMove.completeEventName, gameObject);
                    easeMove.completeEventName = undefined;
                }
            });
        },

        moveFrom(duration, x, y, ease, destroyMode) {
            if (IsPlainObject$g(duration)) {
                var config = duration;
                x = config.x;
                y = config.y;
                if (config.hasOwnProperty('speed')) {
                    duration = (DistanceBetween$6(x, y, this.x, this.y) * 1000) / config.speed;
                } else {
                    duration = config.duration;
                }

                ease = config.ease;
            }

            var isInit = (this._easeMove === undefined);

            this._easeMove = EaseMoveFrom(this, duration, x, y, ease, destroyMode, this._easeMove);

            if (isInit) {
                this.onInitEaseMove();
            }

            this._easeMove.completeEventName = 'movefrom.complete';

            return this;
        },

        moveFromPromise(duration, x, y, ease, destroyMode) {
            this.moveFrom(duration, x, y, ease, destroyMode);
            return WaitComplete(this._easeMove);
        },

        moveFromDestroy(duration, x, y, ease) {
            this.moveFrom(duration, x, y, ease, true);
            return this;
        },

        moveFromDestroyPromise(duration, x, y, ease) {
            this.moveFromDestroy(duration, x, y, ease);
            return WaitComplete(this._easeMove);
        },

        isRunningMoveFrom() {
            return this._easeMove && (this._easeMove.completeEventName = 'movefrom.complete');
        },

        moveTo(duration, x, y, ease, destroyMode) {
            if (IsPlainObject$g(duration)) {
                var config = duration;
                x = config.x;
                y = config.y;
                if (config.hasOwnProperty('speed')) {
                    duration = (DistanceBetween$6(x, y, this.x, this.y) * 1000) / config.speed;
                } else {
                    duration = config.duration;
                }

                ease = config.ease;
            }

            var isInit = (this._easeMove === undefined);

            this._easeMove = EaseMoveTo(this, duration, x, y, ease, destroyMode, this._easeMove);

            if (isInit) {
                this.onInitEaseMove();
            }

            this._easeMove.completeEventName === 'moveto.complete';

            return this;
        },

        moveToPromise(duration, x, y, ease, destroyMode) {
            this.moveTo(duration, x, y, ease, destroyMode);
            return WaitComplete(this._easeMove);
        },

        moveToDestroy(duration, x, y, ease) {
            this.moveTo(duration, x, y, ease, true);
            return this;
        },

        moveToDestroyPromise(duration, x, y, ease) {
            this.moveToDestroy(duration, x, y, ease, true);
            return WaitComplete(this._easeMove);
        },

        isRunningMoveTo() {
            return this._easeMove && (this._easeMove.completeEventName === 'moveto.complete');
        },

        isRunningEaseMove() {
            return this.isRunningMoveFrom() || this.isRunningMoveTo();
        },

        moveStop(toEnd) {
            if (!this._easeMove) {
                return this;
            }

            this._easeMove.stop(toEnd);
            return this;
        }
    };

    var methods$c = {};
    Object.assign(methods$c, EaseMoveMethods);

    methods$c.onInitEaseMove = function () {
        EaseMoveMethods.onInitEaseMove.call(this);

        var gameObject = this;
        var easeMove = this._easeMove;
        easeMove.on('update', function () {
            var parent = GetParentSizerMethods.getParentSizer(gameObject);
            if (parent) {
                parent.resetChildPositionState(gameObject);
            }
        });
    };

    const GetValue$17 = Phaser.Utils.Objects.GetValue;

    class ShakePosition extends TickTask {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.timer = new Timer();
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$17(o, 'timer'));
            this.setEnable(GetValue$17(o, 'enable', true));
            this.setMode(GetValue$17(o, 'mode', 1));
            this.isRunning = GetValue$17(o, 'isRunning', false);
            this.setMagnitudeMode(GetValue$17(o, 'magnitudeMode', 1));
            this.setAxisMode(GetValue$17(o, "axis", 0));
            this.setDuration(GetValue$17(o, 'duration', 500));
            this.setMagnitude(GetValue$17(o, 'magnitude', 10));
            this.ox = GetValue$17(o, 'ox', undefined);
            this.oy = GetValue$17(o, 'oy', undefined);
            return this;
        }

        toJSON() {
            return {
                timer: this.timer.toJSON(),
                enable: this.enable,
                mode: this.mode,
                isRunning: this.isRunning,
                magnitudeMode: magnitudeMode,
                duration: this.duration,
                magnitude: this.magnitude,
                ox: this.ox,
                oy: this.oy,
            };
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            super.shutdown(fromScene);
            this.timer.destroy();
            this.timer = undefined;
        }

        startTicking() {
            super.startTicking();

            if (this.mode === 0) { // Effect mode
                this.scene.game.events.on('poststep', this.update, this);
                this.scene.game.events.on('prestep', this.backToOrigin, this);
            } else { // Behavior Mode
                this.scene.sys.events.on('preupdate', this.update, this);
            }
        }

        stopTicking() {
            super.stopTicking();

            if (this.scene) { // Scene might be destoryed
                if (this.mode === 0) { // Effect mode
                    this.scene.game.events.off('poststep', this.update, this);
                    this.scene.game.events.off('prestep', this.backToOrigin, this);
                } else { // Behavior Mode
                    this.scene.sys.events.off('preupdate', this.update, this);
                }

            }
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        setMode(mode) {
            if (typeof (mode) === 'string') {
                mode = MODE[mode];
            }
            this.mode = mode;
            return this;
        }

        setMagnitudeMode(magnitudeMode) {
            if (typeof (magnitudeMode) === 'string') {
                magnitudeMode = MANITUDEMODE[magnitudeMode];
            }

            this.magnitudeMode = magnitudeMode;
            return this;
        }

        setAxisMode(m) {
            if (typeof (m) === 'string') {
                m = DIRECTIONNODE[m];
            }
            this.axisMode = m;
            return this;
        }

        setDuration(duration) {
            this.duration = duration;
            return this;
        }

        setMagnitude(magnitude) {
            this.magnitude = magnitude;
            return this;
        }

        start(duration, magnitude) {
            if (typeof (duration) !== 'number') {
                var config = duration;
                magnitude = GetValue$17(config, 'magnitude', undefined);
                duration = GetValue$17(config, 'duration', undefined);
            }
            if (magnitude !== undefined) {
                this.setMagnitude(magnitude);
            }
            if (duration !== undefined) {
                this.setDuration(duration);
            }

            this.timer
                .setDuration(this.duration)
                .start();

            super.start();
            return this;
        }

        shake(duration, magnitude) {
            this.start(duration, magnitude);
            return this;
        }

        update(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return this;
            }

            var gameObject = this.parent;
            if (!gameObject.active) {
                return this;
            }

            this.timer.update(time, delta);
            if (this.timer.isDone) {
                this.backToOrigin();
                this.complete();
            } else {
                if (this.ox === undefined) {
                    this.ox = gameObject.x;
                    this.oy = gameObject.y;
                }

                var magnitude = this.magnitude;
                if (this.magnitudeMode === 1) // decay
                {
                    magnitude *= (1 - this.timer.t);
                }
                var a = Math.random() * Math.PI * 2;
                var x = this.ox + (Math.cos(a) * magnitude);
                var y = this.oy + (Math.sin(a) * magnitude);

                switch (this.axisMode) {
                    case 1:
                        gameObject.x = x;
                        break;

                    case 2:
                        gameObject.y = y;
                        break;

                    default:
                        gameObject.x = x;
                        gameObject.y = y;
                        break;
                }
            }

            return this;
        }

        backToOrigin() {
            if ((!this.isRunning) || (!this.enable)) {
                return this;
            }

            if (this.ox === undefined) {
                return this;
            }

            var gameObject = this.parent;

            switch (this.axisMode) {
                case 1:
                    gameObject.x = this.ox;
                    break;

                case 2:
                    gameObject.y = this.oy;
                    break;

                default:
                    gameObject.x = this.ox;
                    gameObject.y = this.oy;
                    break;
            }

            this.ox = undefined;
            this.oy = undefined;
            return this;
        }
    }

    const MODE = {
        effect: 0,
        behavior: 1,
    };

    const DIRECTIONNODE = {
        'both': 0,
        'h&v': 0,
        'x&y': 0,
        'horizontal': 1,
        'h': 1,
        'x': 1,
        'vertical': 2,
        'v': 2,
        'y': 2
    };

    const MANITUDEMODE = {
        constant: 0,
        decay: 1,
    };

    const IsPlainObject$f = Phaser.Utils.Objects.IsPlainObject;

    var OnInitShake = function (gameObject, shake) {
        // Route 'complete' of shake to gameObject
        shake.on('complete', function () {
            gameObject.emit('shake.complete', gameObject);
        });

        // Shake effect won't change position
    };

    var ShakeMethods = {
        shake(duration, magnitude, magnitudeMode) {
            if (IsPlainObject$f(duration)) {
                var config = duration;
                duration = config.duration;
                magnitude = config.magnitude;
                magnitudeMode = config.magnitudeMode;
            }

            if (this._shake === undefined) {
                this._shake = new ShakePosition(this, {
                    mode: 0,
                    magnitudeMode: 1
                });
                OnInitShake(this, this._shake);
            }

            if (duration !== undefined) {
                this._shake.setDuration(duration);
            }

            if (magnitude !== undefined) {
                this._shake.setMagnitude(magnitude);
            }

            if (magnitudeMode !== undefined) {
                this._shake.setMagnitudeMode(magnitudeMode);
            }

            this._shake.shake();

            return this;
        },

        shakePromise(duration, alpha) {
            this.shake(duration, alpha);
            return WaitComplete(this._shake);
        },
    };

    const GetValue$16 = Phaser.Utils.Objects.GetValue;
    const Linear$3 = Phaser.Math.Linear;

    class EaseValueTask extends EaseValueTaskBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.timer

            this.resetFromJSON();
            this.boot();
        }

        start(config) {
            if (this.timer.isRunning) {
                return this;
            }

            var target = this.target;
            this.propertyKey = GetValue$16(config, 'key', 'value');
            var currentValue = target[this.propertyKey];
            this.fromValue = GetValue$16(config, 'from', currentValue);
            this.toValue = GetValue$16(config, 'to', currentValue);

            this.setEase(GetValue$16(config, 'ease', this.ease));
            this.setDuration(GetValue$16(config, 'duration', this.duration));
            this.setRepeat(GetValue$16(config, 'repeat', 0));
            this.setDelay(GetValue$16(config, 'delay', 0));
            this.setRepeatDelay(GetValue$16(config, 'repeatDelay', 0));

            this.timer
                .setDuration(this.duration)
                .setRepeat(this.repeat)
                .setDelay(this.delay)
                .setRepeatDelay(this.repeatDelay);

            target[this.propertyKey] = this.fromValue;

            super.start();
            return this;
        }

        updateTarget(target, timer) {
            var t = timer.t;
            t = this.easeFn(t);

            target[this.propertyKey] = Linear$3(this.fromValue, this.toValue, t);
        }
    }

    const IsPlainObject$e = Phaser.Utils.Objects.IsPlainObject;

    class EaseData extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this.parent.setDataEnabled();
            this.easeTasks = {};
        }

        complete(key) {
            this.emit(`complete-${key}`, this.parent, this);
            this.emit('complete', key, this.parent, this);
        }

        getEaseTask(key) {
            var easeTask = this.easeTasks[key];
            if (easeTask === undefined) {
                easeTask = new EaseValueTask(this.parent);
                this.easeTasks[key] = easeTask;

                easeTask
                    .setTarget(this.parent.data.values)
                    .on('complete', function () {
                        this.complete(key);
                    }, this);
            }
            return easeTask;
        }

        easeTo(key, value, duration, ease) {
            if (IsPlainObject$e(key)) {
                var config = key;
                key = config.key;
                value = config.value;
                duration = config.duration;
                ease = config.ease;

                var speed = config.speed;
                if ((duration === undefined) && (speed !== undefined)) {
                    duration = (Math.abs(value - this.parent.data.values[key]) / speed) * 1000;
                }
            }

            if (duration === undefined) {
                duration = 1000;
            }
            if (ease === undefined) {
                ease = 'Linear';
            }

            var easeTask = this.getEaseTask(key);
            easeTask.restart({
                key: key,
                to: value,
                duration: duration,
                ease: ease
            });

            return this;
        }

        easeFrom(key, value, duration, ease) {
            if (IsPlainObject$e(key)) {
                var config = key;
                key = config.key;
                value = config.value;
                duration = config.duration;
                ease = config.ease;

                var speed = config.speed;
                if ((duration === undefined) && (speed !== undefined)) {
                    duration = (Math.abs(value - this.parent.data.values[key]) / speed) * 1000;
                }
            }

            if (duration === undefined) {
                duration = 1000;
            }
            if (ease === undefined) {
                ease = 'Linear';
            }

            var easeTask = this.getEaseTask(key);
            easeTask.restart({
                key: key,
                from: value,
                duration: duration,
                ease: ease
            });

            return this;
        }

        stopEase(key, toEnd) {
            if (toEnd === undefined) {
                toEnd = true;
            }

            var easeTask = this.easeTasks[key];
            if (easeTask) {
                easeTask.stop(toEnd);
            }

            return this;
        }

        stopAll(toEnd) {
            if (toEnd === undefined) {
                toEnd = true;
            }

            for (var key in this.easeTasks) {
                this.stopEase(key, toEnd);
            }
            return this;
        }
    }

    var OnInitEaseData = function (gameObject, easeData) {
        // Route 'complete' of easeData to gameObject
        easeData.on('complete', function (key) {
            gameObject.emit(`easedata.${key}.complete`, gameObject);
            gameObject.emit('easedata.complete', key, gameObject);
        });
    };

    var EaseDataMethods = {
        easeDataTo(key, value, duration, ease) {
            if (!this._easeData) {
                this._easeData = new EaseData(this);
                OnInitEaseData(this, this._easeData);
            }
            this._easeData.easeTo(key, value, duration, ease);
            return this;
        },

        easeDataToPromise(key, value, duration, ease) {
            this.easeDataTo(key, value, duration, ease);
            return WaitEvent(this._easeData, `complete-${key}`);
        },

        stopEaseData(key, toEnd) {
            if (!this._easeData) {
                return this;
            }

            this._easeData.stopEase(key, toEnd);
            return this;
        },

        stopAllEaseData(toEnd) {
            if (!this._easeData) {
                return this;
            }

            this._easeData.stopAll(toEnd);
            return this;
        }
    };

    var RemoveItem$6 = Phaser.Utils.Array.Remove;

    var OnInitDelayCallTimers = function (gameObject) {
        gameObject._delayCallTimers = [];
        gameObject.once('destroy', function () {
            var timers = gameObject._delayCallTimers;
            for (var i = 0, cnt = timers.length; i < cnt; i++) {
                timers[i].remove();
            }
            gameObject._delayCallTimers = undefined;
        });
    };

    var DelayCallMethods$1 = {
        delayCall(delay, callback, scope) {
            var timers = this._delayCallTimers;

            if (timers === undefined) {
                OnInitDelayCallTimers(this);
            }


            var timer;
            var self = this;
            var OnTimeOut = function () {
                RemoveItem$6(self._delayCallTimers, timer);
                if (scope) {
                    callback.call(scope);
                } else {
                    callback();
                }
            };

            timer = this.scene.time.delayedCall(delay, OnTimeOut);
            this._delayCallTimers.push(timer);

            return this;
        },
    };

    var Show = function (gameObject) {
        _hide(gameObject, false);
    };

    var Hide = function (gameObject) {
        _hide(gameObject, true);
    };

    var IsShown = function (gameObject) {
        if (!gameObject) {
            return false;
        }
        var config = GetSizerConfig$1(gameObject);
        return !config.hidden;
    };

    var _hide = function (gameObject, hidden) {
        if (!gameObject) {
            return;
        }
        var config = GetSizerConfig$1(gameObject);
        config.hidden = hidden;

        var parent = GetParent$1(gameObject);
        if (parent) {
            parent.setChildVisible(gameObject, !hidden);
        } else {
            gameObject.setVisible(!hidden);
        }
    };

    var HideMethods = {
        show(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            Show(gameObject);
            return this;
        },

        hide(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            Hide(gameObject);
            return this;
        },

        isShow(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            return IsShown(gameObject);
        }
    };

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var eventemitter3 = {exports: {}};

    (function (module) {

    	var has = Object.prototype.hasOwnProperty
    	  , prefix = '~';

    	/**
    	 * Constructor to create a storage for our `EE` objects.
    	 * An `Events` instance is a plain object whose properties are event names.
    	 *
    	 * @constructor
    	 * @private
    	 */
    	function Events() {}

    	//
    	// We try to not inherit from `Object.prototype`. In some engines creating an
    	// instance in this way is faster than calling `Object.create(null)` directly.
    	// If `Object.create(null)` is not supported we prefix the event names with a
    	// character to make sure that the built-in object properties are not
    	// overridden or used as an attack vector.
    	//
    	if (Object.create) {
    	  Events.prototype = Object.create(null);

    	  //
    	  // This hack is needed because the `__proto__` property is still inherited in
    	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    	  //
    	  if (!new Events().__proto__) prefix = false;
    	}

    	/**
    	 * Representation of a single event listener.
    	 *
    	 * @param {Function} fn The listener function.
    	 * @param {*} context The context to invoke the listener with.
    	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
    	 * @constructor
    	 * @private
    	 */
    	function EE(fn, context, once) {
    	  this.fn = fn;
    	  this.context = context;
    	  this.once = once || false;
    	}

    	/**
    	 * Add a listener for a given event.
    	 *
    	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn The listener function.
    	 * @param {*} context The context to invoke the listener with.
    	 * @param {Boolean} once Specify if the listener is a one-time listener.
    	 * @returns {EventEmitter}
    	 * @private
    	 */
    	function addListener(emitter, event, fn, context, once) {
    	  if (typeof fn !== 'function') {
    	    throw new TypeError('The listener must be a function');
    	  }

    	  var listener = new EE(fn, context || emitter, once)
    	    , evt = prefix ? prefix + event : event;

    	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    	  else emitter._events[evt] = [emitter._events[evt], listener];

    	  return emitter;
    	}

    	/**
    	 * Clear event by name.
    	 *
    	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
    	 * @param {(String|Symbol)} evt The Event name.
    	 * @private
    	 */
    	function clearEvent(emitter, evt) {
    	  if (--emitter._eventsCount === 0) emitter._events = new Events();
    	  else delete emitter._events[evt];
    	}

    	/**
    	 * Minimal `EventEmitter` interface that is molded against the Node.js
    	 * `EventEmitter` interface.
    	 *
    	 * @constructor
    	 * @public
    	 */
    	function EventEmitter() {
    	  this._events = new Events();
    	  this._eventsCount = 0;
    	}

    	/**
    	 * Return an array listing the events for which the emitter has registered
    	 * listeners.
    	 *
    	 * @returns {Array}
    	 * @public
    	 */
    	EventEmitter.prototype.eventNames = function eventNames() {
    	  var names = []
    	    , events
    	    , name;

    	  if (this._eventsCount === 0) return names;

    	  for (name in (events = this._events)) {
    	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    	  }

    	  if (Object.getOwnPropertySymbols) {
    	    return names.concat(Object.getOwnPropertySymbols(events));
    	  }

    	  return names;
    	};

    	/**
    	 * Return the listeners registered for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @returns {Array} The registered listeners.
    	 * @public
    	 */
    	EventEmitter.prototype.listeners = function listeners(event) {
    	  var evt = prefix ? prefix + event : event
    	    , handlers = this._events[evt];

    	  if (!handlers) return [];
    	  if (handlers.fn) return [handlers.fn];

    	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    	    ee[i] = handlers[i].fn;
    	  }

    	  return ee;
    	};

    	/**
    	 * Return the number of listeners listening to a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @returns {Number} The number of listeners.
    	 * @public
    	 */
    	EventEmitter.prototype.listenerCount = function listenerCount(event) {
    	  var evt = prefix ? prefix + event : event
    	    , listeners = this._events[evt];

    	  if (!listeners) return 0;
    	  if (listeners.fn) return 1;
    	  return listeners.length;
    	};

    	/**
    	 * Calls each of the listeners registered for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @returns {Boolean} `true` if the event had listeners, else `false`.
    	 * @public
    	 */
    	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    	  var evt = prefix ? prefix + event : event;

    	  if (!this._events[evt]) return false;

    	  var listeners = this._events[evt]
    	    , len = arguments.length
    	    , args
    	    , i;

    	  if (listeners.fn) {
    	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    	    switch (len) {
    	      case 1: return listeners.fn.call(listeners.context), true;
    	      case 2: return listeners.fn.call(listeners.context, a1), true;
    	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
    	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
    	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
    	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    	    }

    	    for (i = 1, args = new Array(len -1); i < len; i++) {
    	      args[i - 1] = arguments[i];
    	    }

    	    listeners.fn.apply(listeners.context, args);
    	  } else {
    	    var length = listeners.length
    	      , j;

    	    for (i = 0; i < length; i++) {
    	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

    	      switch (len) {
    	        case 1: listeners[i].fn.call(listeners[i].context); break;
    	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
    	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
    	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
    	        default:
    	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
    	            args[j - 1] = arguments[j];
    	          }

    	          listeners[i].fn.apply(listeners[i].context, args);
    	      }
    	    }
    	  }

    	  return true;
    	};

    	/**
    	 * Add a listener for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn The listener function.
    	 * @param {*} [context=this] The context to invoke the listener with.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.on = function on(event, fn, context) {
    	  return addListener(this, event, fn, context, false);
    	};

    	/**
    	 * Add a one-time listener for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn The listener function.
    	 * @param {*} [context=this] The context to invoke the listener with.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.once = function once(event, fn, context) {
    	  return addListener(this, event, fn, context, true);
    	};

    	/**
    	 * Remove the listeners of a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn Only remove the listeners that match this function.
    	 * @param {*} context Only remove the listeners that have this context.
    	 * @param {Boolean} once Only remove one-time listeners.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    	  var evt = prefix ? prefix + event : event;

    	  if (!this._events[evt]) return this;
    	  if (!fn) {
    	    clearEvent(this, evt);
    	    return this;
    	  }

    	  var listeners = this._events[evt];

    	  if (listeners.fn) {
    	    if (
    	      listeners.fn === fn &&
    	      (!once || listeners.once) &&
    	      (!context || listeners.context === context)
    	    ) {
    	      clearEvent(this, evt);
    	    }
    	  } else {
    	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
    	      if (
    	        listeners[i].fn !== fn ||
    	        (once && !listeners[i].once) ||
    	        (context && listeners[i].context !== context)
    	      ) {
    	        events.push(listeners[i]);
    	      }
    	    }

    	    //
    	    // Reset the array, or remove it completely if we have no more listeners.
    	    //
    	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    	    else clearEvent(this, evt);
    	  }

    	  return this;
    	};

    	/**
    	 * Remove all listeners, or those of the specified event.
    	 *
    	 * @param {(String|Symbol)} [event] The event name.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    	  var evt;

    	  if (event) {
    	    evt = prefix ? prefix + event : event;
    	    if (this._events[evt]) clearEvent(this, evt);
    	  } else {
    	    this._events = new Events();
    	    this._eventsCount = 0;
    	  }

    	  return this;
    	};

    	//
    	// Alias methods names because people roll like that.
    	//
    	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    	//
    	// Expose the prefix.
    	//
    	EventEmitter.prefixed = prefix;

    	//
    	// Allow `EventEmitter` to be imported as module namespace.
    	//
    	EventEmitter.EventEmitter = EventEmitter;

    	//
    	// Expose the module.
    	//
    	{
    	  module.exports = EventEmitter;
    	} 
    } (eventemitter3));

    var eventemitter3Exports = eventemitter3.exports;
    var EE = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

    class EventEmitter extends EE {
        shutdown() {
            this.removeAllListeners();
        }
        destroy() {
            this.removeAllListeners();
        }
    }

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = EventEmitter;
            }
            this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
            this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
            return this;
        },

        destroyEventEmitter() {
            if (this._eventEmitter && this._privateEE) {
                this._eventEmitter.shutdown();
            }
            return this;
        },

        getEventEmitter() {
            return this._eventEmitter;
        },

        on: function () {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once: function () {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off: function () {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit: function (event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener: function () {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener: function () {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners: function () {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount: function () {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners: function () {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames: function () {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    var GetValue$15 = function (source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }

        if (typeof (key) === 'string') {
            if (source.hasOwnProperty(key)) {
                return source[key];
            }
            if (key.indexOf('.') !== -1) {
                key = key.split('.');
            } else {
                return defaultValue;
            }
        }

        var keys = key;
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (parent.hasOwnProperty(key)) {
                //  Yes it has a key property, let's carry on down
                value = parent[key];

                parent = value;
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    };

    const StateProperties$1 = ['next', 'exit', 'enter'];

    let FSM$1 = class FSM {
        /*
        var config = {
            start: 'A',   // default: undefined
            states: {
                A: {
                    next: 'B',  // function() { return 'B'; }
                    enter: function() {},
                    exit: function() {},
                },
                // ...
            },        
            extend: {
                i: 0,
                name: 'abc'
                // ...
            },
            init: function() {},
            enable: true,
            eventEmitter: true,
        };
        */
        constructor(config) {
            // Attach get-next-state function
            var states = GetValue$15(config, 'states', undefined);
            if (states) {
                this.addStates(states);
            }

            // Attach extend members
            var extend = GetValue$15(config, 'extend', undefined);
            if (extend) {
                for (var name in extend) {
                    if (!this.hasOwnProperty(name) || this[name] === undefined) {
                        this[name] = extend[name];
                    }
                }
            }

            // Event emitter
            var eventEmitter = GetValue$15(config, 'eventEmitter', undefined);
            var EventEmitterClass = GetValue$15(config, 'EventEmitterClass', undefined);
            this.setEventEmitter(eventEmitter, EventEmitterClass);

            this._stateLock = false;
            this.resetFromJSON(config);
        }

        shutdown() {
            this.destroyEventEmitter();
        }

        destroy() {
            this.shutdown();
        }

        resetFromJSON(o) {
            this.setEnable(GetValue$15(o, 'enable', true));
            this.start(GetValue$15(o, 'start', undefined));
            var init = GetValue$15(o, 'init', undefined);
            if (init) {
                init.call(this);
            }

            return this;
        }

        toJSON() {
            return {
                curState: this.state,
                prevState: this.prevState,

                enable: this.enable,
                start: this._start
            };
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        set state(newState) {
            if (!this.enable || this._stateLock) {
                return;
            }
            if (this._state === newState) {
                return;
            }
            this._prevState = this._state;
            this._state = newState;

            this._stateLock = true; // lock state

            this.emit('statechange', this);

            if (this._prevState != null) {
                var exitEventName = 'exit_' + this._prevState;
                var exitCallback = this[exitEventName];
                if (exitCallback) {
                    exitCallback.call(this);
                }
                this.emit(exitEventName, this);
            }

            this._stateLock = false;

            if (this._state != null) {
                var enterEventName = 'enter_' + this._state;
                var enterCallback = this[enterEventName];
                if (enterCallback) {
                    enterCallback.call(this);
                }
                this.emit(enterEventName, this);
            }
        }

        get state() {
            return this._state;
        }

        get prevState() {
            return this._prevState;
        }

        start(state) {
            this._start = state;
            this._prevState = undefined;
            this._state = state; // Won't fire statechange events
            return this;
        }

        goto(nextState) {
            if (nextState != null) {
                this.state = nextState;
            }
            return this;
        }

        next() {
            var nextState;
            var getNextState = this['next_' + this.state];
            if (getNextState) {
                if (typeof (getNextState) === 'string') {
                    nextState = getNextState;
                } else {
                    nextState = getNextState.call(this);
                }
            }

            this.goto(nextState);
            return this;
        }

        get stateProperties() {
            return StateProperties$1;
        }

        addState(name, state) {
            if (typeof (name) !== 'string') {
                state = name;
                name = state.name;
            }

            var stateProperties = this.stateProperties;
            for (var i = 0, cnt = stateProperties.length; i < cnt; i++) {
                var propertyName = stateProperties[i];
                var propertyValue = state[propertyName];
                if (propertyValue) {
                    this[`${propertyName}_${name}`] = propertyValue;
                }
            }

            return this;
        }

        addStates(states) {
            if (Array.isArray(states)) {
                for (var i = 0, cnt = states.length; i < cnt; i++) {
                    this.addState(states[i]);
                }
            } else {
                for (var name in states) {
                    this.addState(name, states[name]);
                }
            }
            return this;
        }

        runMethod(methodName, a1, a2, a3, a4, a5) {
            var fn = this[methodName + '_' + this.state];
            if (!fn) {
                return undefined;
            }

            // Copy from eventemitter3
            var len = arguments.length;
            switch (len) {
                case 1: return fn.call(this);
                case 2: return fn.call(this, a1);
                case 3: return fn.call(this, a1, a2);
                case 4: return fn.call(this, a1, a2, a3);
                case 5: return fn.call(this, a1, a2, a3, a4);
                case 6: return fn.call(this, a1, a2, a3, a4, a5);
            }
            var args = new Array(len - 1);
            for (var i = 1; i < len; i++) {
                args[i - 1] = arguments[i];
            }
            return fn.apply(this, args);
        }
    };

    Object.assign(
        FSM$1.prototype,
        EventEmitterMethods,
    );

    var HasListener = function (eventEmitter, eventName, fn, context, once) {
        if (once === undefined) {
            once = false;
        }

        var listeners = eventEmitter._events[eventName];
        if (!listeners) {
            return false;
        }

        for (var i = 0, cnt = listeners.length; i < cnt; i++) {
            var listener = listeners[i];
            if ((listener.fn === fn) &&
                (listener.context === context) &&
                (listener.once === once)
            ) {
                return true;
            }
        }

        return false;

    };

    const StateProperties = ['next', 'exit', 'enter', 'update', 'preupdate', 'postupdate'];

    class FSM extends FSM$1 {
        /*
        var config = {
            start: 'A',   // default: undefined
            states: {
                A: {
                    next: 'B',  // function() { return 'B'; }
                    enter: function() {},
                    exit: function() {},
                    update: function(time, delta) {},
                    preupdate: function(time, delta) {},
                    postupdate: function(time, delta) {},
                },
                // ...
            },        
            extend: {
                i: 0,
                name: 'abc'
                // ...
            },
            init: function() {},
            enable: true,
            scene: undefined,
            eventEmitter: true,
        };
        */
        shutdown() {
            this.stopUpdate();
            this.stopPreUpdate();
            this.stopPostUpdate();
            this._scene = undefined;

            super.shutdown();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this._scene = GetValue$15(o, 'scene', undefined);
            return this;
        }

        get stateProperties() {
            return StateProperties;
        }

        update(time, delta) {
            this.runMethod('update', time, delta);
        }

        preupdate(time, delta) {
            this.runMethod('preupdate', time, delta);
        }

        postupdate(time, delta) {
            this.runMethod('postupdate', time, delta);
        }

        startUpdate(scene) {
            if (!scene) {
                scene = this._scene;
            }

            var eventEmitter = scene.sys.events;
            if (HasListener(eventEmitter, 'update', this.update, this)) {
                return this;
            }

            this._scene = scene;
            eventEmitter.on('update', this.update, this);
            return this;
        }

        stopUpdate() {
            if (!this._scene) {
                return this;
            }

            this._scene.sys.events.off('update', this.update, this);
            return this;
        }

        startPreUpdate(scene) {
            if (!scene) {
                scene = this._scene;
            }

            var eventEmitter = scene.sys.events;
            if (HasListener(eventEmitter, 'preupdate', this.preupdate, this)) {
                return this;
            }

            this._scene = scene;
            eventEmitter.on('preupdate', this.preupdate, this);
            return this;
        }

        stopPreUpdate() {
            if (!this._scene) {
                return this;
            }

            this._scene.sys.events.off('preupdate', this.preupdate, this);
            return this;
        }

        startPostUpdate(scene) {
            if (!scene) {
                scene = this._scene;
            }

            var eventEmitter = scene.sys.events;
            if (HasListener(eventEmitter, 'postupdate', this.postupdate, this)) {
                return this;
            }

            this._scene = scene;
            eventEmitter.on('postupdate', this.postupdate, this);
            return this;
        }

        stopPostUpdate() {
            if (!this._scene) {
                return this;
            }

            this._scene.sys.events.off('postupdate', this.postupdate, this);
            return this;
        }
    }

    /*
    graph TD

    IDLE --> |"requestOpen()"| TRANS_OPNE["TRAN_OPEN<br>runTransitionInCallback()"]
    TRANS_OPNE --> |transitInTime| OPEN
    OPEN --> |"requestClose()"| TRANS_CLOSE["TRANS_CLOSE<br>runTransitionOutCallback()"]
    TRANS_CLOSE --> |transitOutTime| CLOSE
    CLOSE --> |"requestOpen()"| TRANS_OPNE
    */

    let State$1 = class State extends FSM {
        constructor(parent, config) {
            super(config);
            this.parent = parent;

            var initState = config.initState || 'IDLE';
            this.start(initState);
        }

        init() {
            this.start('IDLE');
        }

        // IDLE -> TRANS_OPNE
        next_IDLE() {
            return 'TRANS_OPNE';
        }
        // IDLE

        // TRANS_OPNE -> OPEN
        next_TRANS_OPNE() {
            return 'OPEN';
        }
        enter_TRANS_OPNE() {
            var transitionBehavior = this.parent;
            if (transitionBehavior.transitInTime > 0) {
                var delay = transitionBehavior.runTransitionInCallback();
                transitionBehavior.delayCall(delay, this.next, this);
            } else {
                this.next();
            }
        }
        exit_TRANS_OPNE() {
            var transitionBehavior = this.parent;
            transitionBehavior.removeDelayCall();
        }
        // TRANS_OPNE

        // OPEN -> TRANS_CLOSE
        next_OPEN() {
            return 'TRANS_CLOSE';
        }
        enter_OPEN() {
            var transitionBehavior = this.parent;
            transitionBehavior.onOpen();
        }
        exit_OPEN() {
            var transitionBehavior = this.parent;
            transitionBehavior.removeDelayCall();
        }
        // OPEN

        // TRANS_CLOSE -> CLOSE
        next_TRANS_CLOSE() {
            return 'CLOSE';
        }
        enter_TRANS_CLOSE() {
            var transitionBehavior = this.parent;
            if (transitionBehavior.transitOutTime > 0) {
                var delay = transitionBehavior.runTransitionOutCallback();
                transitionBehavior.delayCall(delay, this.next, this);
            } else {
                this.next();
            }
        }
        exit_TRANS_CLOSE() {
            var transitionBehavior = this.parent;
            transitionBehavior.removeDelayCall();
        }
        // TRANS_CLOSE

        // CLOSE -> TRANS_OPNE
        next_CLOSE() {
            return 'TRANS_OPNE';
        }
        enter_CLOSE() {
            var transitionBehavior = this.parent;
            transitionBehavior.onClose();
        }
        exit_CLOSE() {
        }
        // CLOSE

        canOpen() {
            return (this.state === 'IDLE') || (this.state === 'CLOSE');
        }

        canClose() {
            return (this.state === 'IDLE') || (this.state === 'OPEN');
        }
    };

    var PostStepDelayCall = function (gameObject, delay, callback, scope, args) {
        // Invoke callback under game's 'poststep' event
        var scene = GetSceneObject(gameObject);
        var timer = scene.time.delayedCall(delay, function () {
            scene.game.events.once('poststep', function () {
                callback.call(scope, args);
            });
        });
        return timer;
    };

    var DelayCallMethods = {
        delayCall(delay, callback, scope) {
            // Invoke callback under scene's 'postupdate' event
            this.delayCallTimer = PostStepDelayCall(this, delay, callback, scope);
            return this;
        },

        removeDelayCall() {
            if (this.delayCallTimer) {
                this.delayCallTimer.remove(false);
                this.delayCallTimer = undefined;
            }
            return this;
        }

    };

    var ConfigurationMethods = {
        setTransitInTime(time) {
            this.transitInTime = time;
            return this;
        },

        setTransitOutTime(time) {
            this.transitOutTime = time;
            return this;
        },

        setTransitInCallback(callback) {
            if (!callback) {
                callback = NOOP;
            }

            this.transitInCallback = callback;
            // callback = function(gameObject, duration) {}
            return this;
        },

        setTransitOutCallback(callback) {
            if (!callback) {
                callback = NOOP;
            }

            this.transitOutCallback = callback;
            // callback = function(gameObject, duration) {}
            return this;
        },

    };

    var OpenMethods = {
        // Override
        runTransitionInCallback() {
            this.transitInCallback(this.parent, this.transitInTime);
            return this.transitInTime;
        },

        // Override
        onOpen() {
        },

        requestOpen(openEventData, duration) {
            if (!this._state.canOpen()) {
                return this;
            }

            this.openEventData = (arguments.length > 0) ? openEventData : this.parent;

            var transitionTimeSave = this.transitInTime;
            if (duration !== undefined) {
                this.transitInTime = duration;
            }

            this._state.goto('TRANS_OPNE');

            this.transitInTime = transitionTimeSave;

            return this;
        },
    };

    var CloseMethods = {
        // Override
        runTransitionOutCallback() {
            this.transitOutCallback(this.parent, this.transitOutTime);
            return this.transitOutTime;
        },

        // Override
        onClose() {
            // Destroy parent and this behavior
            if (this.oneShotMode) {
                this.parent.destroy();
                // Will invoke `this.destroy()`
            }
        },

        requestClose(closeEventData, duration) {
            if (!this._state.canClose) {
                return this;
            }

            this.closeEventData = (arguments.length > 0) ? closeEventData : this.parent;

            var transitionTimeSave = this.transitOutTime;
            if (duration !== undefined) {
                this.transitOutTime = duration;
            }

            this._state.goto('TRANS_CLOSE');

            this.transitOutTime = transitionTimeSave;

            return this;
        },
    };

    var methods$b = {};

    Object.assign(
        methods$b,
        DelayCallMethods,
        ConfigurationMethods,
        OpenMethods,
        CloseMethods,
    );

    const GetValue$14 = Phaser.Utils.Objects.GetValue;

    class OpenCloseTransition extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.scene

            this.setTransitInTime(GetValue$14(config, 'duration.in', 200));
            this.setTransitOutTime(GetValue$14(config, 'duration.out', 200));
            this.setTransitInCallback(GetValue$14(config, 'transitIn'));
            this.setTransitOutCallback(GetValue$14(config, 'transitOut'));

            this.oneShotMode = GetValue$14(config, 'destroy', false);

            this.delayCallTimer = undefined;
            this._state = new State$1(this, {
                eventEmitter: false,
                initState: GetValue$14(config, 'initState', 'IDLE')
            });
            this.openEventData = undefined;
            this.closeEventData = undefined;
        }

        get state() {
            return this._state.state;
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.transitInCallback = undefined;
            this.transitOutCallback = undefined;
            this.openEventData = undefined;
            this.closeEventData = undefined;

            this.removeDelayCall();

            super.shutdown(fromScene);
        }
    }

    Object.assign(
        OpenCloseTransition.prototype,
        methods$b,
    );

    var GetLayer = function (gameObject) {
        var layer = gameObject.displayList;
        if (!IsLayerGameObject(layer)) {
            return null;
        }

        return layer;

    };

    var GetRootGameObject = function (gameObject) {
        if (gameObject.parentContainer) {  // At a container
            return GetRootGameObject(gameObject.parentContainer);
        }

        var layer = GetLayer(gameObject);
        if (layer) {  // At a layer
            return GetRootGameObject(layer);
        }

        return gameObject;
    };

    var GetFirstRenderCamera = function (gameObject) {
        var cameraFilter = GetRootGameObject(gameObject).cameraFilter;
        var cameras = gameObject.scene.sys.cameras.cameras;
        var camera, isCameraIgnore;
        for (var i = 0, cnt = cameras.length; i < cnt; i++) {
            camera = cameras[i];

            isCameraIgnore = (cameraFilter & camera.id) > 0;
            if (!isCameraIgnore) {
                return camera;
            }
        }

        return null;
    };

    class FullWindow extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject);
            // this.parent = gameObject;

            this.targetCamera = undefined;
            this.boot();
        }

        boot() {
            this.scene.sys.events.on('prerender', this.resize, this);
        }

        destroy() {
            if (!this.scene) {
                return;
            }

            this.scene.sys.events.off('prerender', this.resize, this);

            super.destroy();
        }


        resize() {
            var scene = this.scene;
            var gameObject = this.parent;

            var camera = GetFirstRenderCamera(gameObject);
            if (!camera) {
                return;
            }

            gameObject
                .setScrollFactor(0)
                .setOrigin(0.5);

            var gameSize = scene.sys.scale.gameSize;
            var gameWidth = gameSize.width,
                gameHeight = gameSize.height,
                scale = 1 / camera.zoom;

            // Origin is fixed to (0.5,0.5)
            var x = gameWidth / 2,
                y = gameHeight / 2;

            var width = gameWidth * scale,
                height = gameHeight * scale;

            if ((gameObject.x !== x) || (gameObject.y !== y)) {
                gameObject.setPosition(x, y);
            }

            if ((gameObject.width !== width) || (gameObject.height !== height)) {
                gameObject.setSize(width, height);
            }

        }


    }

    const Rectangle$1 = Phaser.GameObjects.Rectangle;

    class FullWindowRectangle extends Rectangle$1 {
        constructor(scene, color, alpha) {
            super(scene, 0, 0, 2, 2, color, 1);

            this.fullWindow = new FullWindow(this);

            this.setAlpha(alpha);
        }

        get tint() {
            return this.fillColor;
        }

        set tint(value) {
            this.setFillStyle(value, this.fillAlpha);
        }
    }

    const GetValue$13 = Phaser.Utils.Objects.GetValue;

    class TouchEventStop extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setHitAreaMode(GetValue$13(o, 'hitAreaMode', 0));
            this.setEnable(GetValue$13(o, 'enable', true));
            this.setStopMode(GetValue$13(o, 'stopAllLevels', true));
            return this;
        }

        boot() {
            this.parent
                .on('pointerdown', function (pointer, localX, localY, event) {
                    if (this.stopAllLevels) {
                        event.stopPropagation();
                    }
                }, this)
                .on('pointerup', function (pointer, localX, localY, event) {
                    if (this.stopAllLevels) {
                        event.stopPropagation();
                    }
                }, this)
                .on('pointermove', function (pointer, localX, localY, event) {
                    if (this.stopAllLevels) {
                        event.stopPropagation();
                    }
                }, this)
                .on('pointerover', function (pointer, localX, localY, event) {
                    if (this.stopAllLevels) {
                        event.stopPropagation();
                    }
                }, this)
                .on('pointerout', function (pointer, event) {
                    if (this.stopAllLevels) {
                        event.stopPropagation();
                    }
                }, this);
        }

        setHitAreaMode(mode) {
            if (typeof (mode) === 'string') {
                mode = HitAreaMode[mode];
            }

            var gameObject = this.parent;
            if (gameObject.input) {
                gameObject.removeInteractive();
            }

            if (mode === 0) {
                gameObject.setInteractive();
            } else {
                gameObject.setInteractive({
                    hitArea: {},
                    hitAreaCallback: function () { return true; }
                });
            }

            return this;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            if (e) {
                this.parent.setInteractive();
            } else {
                this.parent.disableInteractive();
            }

            this.enable = e;
            return this;
        }

        setStopMode(allLevels) {
            if (allLevels === undefined) {
                allLevels = true;
            }
            this.stopAllLevels = allLevels;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }
    }

    var HitAreaMode = {
        default: 0,
        fullWindow: 1
    };

    const GetValue$12 = Phaser.Utils.Objects.GetValue;

    class Cover extends FullWindowRectangle {
        constructor(scene, config) {
            var fillColor = GetValue$12(config, 'color', 0x0);
            var fillAlpha = GetValue$12(config, 'alpha', 0.8);
            super(scene, fillColor, fillAlpha);

            this.touchEventStop = new TouchEventStop(this, { hitAreaMode: 1 });
        }
    }

    var CreateCover = function (gameObject, config) {
        var scene = gameObject.scene;
        var cover = new Cover(scene, config);
        scene.add.existing(cover);

        // Put cover behind game object
        if (gameObject.isRexContainerLite) {
            gameObject.pin(cover, {
                syncPosition: false,
                syncRotation: false,
                syncScale: false,
                syncAlpha: false,
                syncScrollFactor: false
            });
            gameObject.moveDepthBelow(cover);
        } else {
            scene.children.moveBelow(cover, gameObject);
        }
        return cover;
    };

    var DefaultTransitCallbacks = {
        popUp(gameObject, duration) {
            if (gameObject._modalScaleSave !== undefined) {
                gameObject.scaleX = gameObject._modalScaleSave;
                gameObject.scaleY = gameObject._modalScaleSave;
            } else {
                gameObject._modalScaleSave = gameObject.scaleX;
            }

            PopUp(gameObject, duration);
        },

        scaleDown(gameObject, duration) {
            // Don't destroy here
            ScaleDownDestroy(gameObject, duration, undefined, undefined, false);
        },

        fadeIn(gameObject, duration) {
            if (gameObject._modalAlphaSave !== undefined) {
                gameObject.alpha = gameObject._modalAlphaSave;
            } else {
                gameObject._modalAlphaSave = gameObject.alpha;
            }

            FadeIn(gameObject, duration);
        },

        fadeOut(gameObject, duration) {
            // Don't destroy here
            FadeOutDestroy(gameObject, duration, false);
        },
    };

    var DefaultCoverTransitInCallback = function (cover, duration) {
        if (cover._modalAlphaSave !== undefined) {
            cover.alpha = cover._modalAlphaSave;
        } else {
            cover._modalAlphaSave = cover.alpha;
        }

        FadeIn(cover, duration, cover.alpha);
    };

    var DefaultCoverTransitOutCallback = function (cover, duration) {
        FadeOutDestroy(cover, duration, false);
    };

    var IsPointInBounds = function (gameObject, x, y, preTest, postTest) {
        // Can't get bounds
        if (!gameObject) {
            return false;
        }

        if (preTest && !preTest(gameObject, x, y)) {
            return false;
        }

        var boundsRect = GetBounds(gameObject, true);
        if (!boundsRect.contains(x, y)) {
            return false;
        }

        if (postTest && !postTest(gameObject, x, y)) {
            return false;
        }

        return true;
    };

    const GetValue$11 = Phaser.Utils.Objects.GetValue;

    let Modal$1 = class Modal extends OpenCloseTransition {
        constructor(gameObject, config) {
            if (config === undefined) {
                config = {};
            }
            if (config.transitIn == null) {
                config.transitIn = TransitionMode.popUp;
            }
            if (config.transitOut == null) {
                config.transitOut = TransitionMode.scaleDown;
            }

            config.destroy = GetValue$11(config, 'destroy', true);

            super(gameObject, config);
            // this.parent = gameObject;
            // this.scene

            // Cover : key of modal, to block touch input        
            var coverConfig = GetValue$11(config, 'cover');
            this.cover = (coverConfig !== false) ? CreateCover(gameObject, coverConfig) : undefined;
            if (this.cover) {
                this.setCoverTransitInCallback(GetValue$11(coverConfig, 'transitIn', DefaultCoverTransitInCallback));
                this.setCoverTransitOutCallback(GetValue$11(coverConfig, 'transitOut', DefaultCoverTransitOutCallback));
            }

            // Close conditions:
            var touchOutsideClose = GetValue$11(config, 'touchOutsideClose', false);
            var timeOutDuration = GetValue$11(config, 'duration.hold', -1);
            var timeOutClose = GetValue$11(config, 'timeOutClose', (timeOutDuration >= 0));
            var anyTouchClose = GetValue$11(config, 'anyTouchClose', false);
            var manualClose = GetValue$11(config, 'manualClose', false);

            if (manualClose) {
                touchOutsideClose = false;
                anyTouchClose = false;
                timeOutClose = false;
            }

            if (anyTouchClose) {
                touchOutsideClose = false;
            }

            if (timeOutClose) {
                this.setDisplayTime(timeOutDuration);
            } else {
                this.setDisplayTime(-1);
            }

            // Registet touch-close event after opened
            if (anyTouchClose) {
                this.once('open', this.anyTouchClose, this);
            } else if (touchOutsideClose) {
                this.once('open', this.touchOutsideClose, this);
            }

            if (GetValue$11(config, 'openOnStart', true)) {
                // Run this.requestOpen() next tick
                // User can register events before this.requestOpen()
                this.delayCall(0, this.requestOpen, this);
            }
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // Registered in touchOutsideClose(), or anyTouchClose()
            if (!this.cover) {
                this.scene.input.off('pointerup', this.touchCloseCallback, this);
            }

            if (this.cover && !fromScene) {
                this.cover.destroy();
                this.cover = undefined;
            }

            super.shutdown(fromScene);
        }

        touchOutsideClose() {
            if (this.cover) {
                this.cover.on('pointerup', this.touchCloseCallback, this);
            } else {
                this.scene.input.on('pointerup', this.touchCloseCallback, this);
            }
            this.clickOutsideTest = true;
            return this;
        }

        anyTouchClose() {
            if (this.cover) {
                this.cover.once('pointerup', this.touchCloseCallback, this);
            } else {
                this.scene.input.once('pointerup', this.touchCloseCallback, this);
            }
            return this;
        }

        touchCloseCallback(pointer) {
            if (this.clickOutsideTest && IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
                return;
            }
            this.requestClose();
        }

        runTransitionInCallback() {
            var duration = super.runTransitionInCallback();

            var cover = this.cover;
            if (cover && this.coverTransitInCallback) {
                this.coverTransitInCallback(cover, duration);
            }

            return duration;
        }

        runTransitionOutCallback() {
            var duration = super.runTransitionOutCallback();

            var cover = this.cover;
            if (cover && this.coverTransitOutCallback) {
                this.coverTransitOutCallback(cover, duration);
            }

            return duration;
        }

        onOpen() {
            var duration = this.displayTime;
            if (duration >= 0) {
                this.delayCall(
                    duration,
                    this.requestClose, // callback
                    this               // scope
                );
            }

            this.emit('open', this.parent, this);

            super.onOpen();
        }

        onClose() {
            this.emit('close', this.closeEventData);

            super.onClose();
        }

        setDisplayTime(time) {
            this.displayTime = time;
            return this;
        }

        setTransitInCallback(callback) {
            if (typeof (callback) === 'string') {
                callback = TransitionMode[callback];
            }

            switch (callback) {
                case TransitionMode.popUp:
                    callback = DefaultTransitCallbacks.popUp;
                    break;
                case TransitionMode.fadeIn:
                    callback = DefaultTransitCallbacks.fadeIn;
                    break;
            }

            super.setTransitInCallback(callback);
            // callback = function(gameObject, duration) {}
            return this;
        }

        setTransitOutCallback(callback) {
            if (typeof (callback) === 'string') {
                callback = TransitionMode[callback];
            }

            switch (callback) {
                case TransitionMode.scaleDown:
                    callback = DefaultTransitCallbacks.scaleDown;
                    break;
                case TransitionMode.fadeOut:
                    callback = DefaultTransitCallbacks.fadeOut;
                    break;
            }

            super.setTransitOutCallback(callback);
            // callback = function(gameObject, duration) {}
            return this;
        }

        setCoverTransitInCallback(callback) {
            this.coverTransitInCallback = callback;
            return this;
        }

        setCoverTransitOutCallback(callback) {
            this.coverTransitOutCallback = callback;
            return this;
        }

    };

    const TransitionMode = {
        popUp: 0,
        fadeIn: 1,
        scaleDown: 0,
        fadeOut: 1,
    };

    var Modal = function (gameObject, config) {
        var modalBehavior = new Modal$1(gameObject, config);

        // Route modal's 'open', 'close' event
        modalBehavior.on('open', function () {
            gameObject.emit('modal.open', modalBehavior);
        });
        modalBehavior.on('close', function (closeEventData) {
            gameObject.emit('modal.close', closeEventData, modalBehavior);
        });

        // Reigster 'modal.requestClose' event for invoking modalBehavior.requestClose() method
        gameObject.on('modal.requestClose', modalBehavior.requestClose, modalBehavior);
        /*
        It is not necessary to turn off gameObject's 'modal.requestClose' event because that :

        - If `config.destroy` is `undefined` (or `true), gameObject and modalBehavior will be destroyed
        - If `config.destroy` is `false` (for reusing dialog), keeping gameObject and modalBehavior 
        */

        return modalBehavior;
    };

    var ModalClose = function (gameObject, closeEventData) {
        gameObject.emit('modal.requestClose', closeEventData);
    };

    var IsFunction = function (obj) {    
        return obj && (typeof(obj) === 'function');
    };

    var ModalMethods = {
        // Override
        // onCreateModalBehavior(self, config) { },

        modal(config, onClose) {
            if (IsFunction(config)) {
                onClose = config;
                config = undefined;
            }

            if (this._modalBehavior === undefined) {
                if (this.onCreateModalBehavior) {
                    this.onCreateModalBehavior(this, config);
                }
                this._modalBehavior = Modal(this, config);
            }

            if (onClose) {
                this._modalBehavior.once('close', onClose);
            }

            this._modalBehavior.requestOpen();

            return this;
        },

        modalPromise(config) {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.modal(config, resolve);
            });
        },

        modalClose(closeEventData) {
            ModalClose(this, closeEventData);
            return this;
        }
    };

    var BindEventWithGameObject = function (gameObject, eventEmitter, eventName, callback, scope, once) {
        if (once === undefined) {
            once = false;
        }

        eventEmitter[(once) ? 'once' : 'on'](eventName, callback, scope);

        gameObject.once('destroy', function () {
            eventEmitter.off(eventName, callback, scope);
        });

        return gameObject;
    };

    var BindSceneEvent = function (eventName, gameObject, callback, scope, once) {
        if (IsFunction(gameObject)) {
            once = scope;
            scope = callback;
            callback = gameObject;
            gameObject = this;
        }

        var eventEmitter = this.scene.events;

        this.bindEvent(gameObject, eventEmitter, eventName, callback, scope, once);

        return this;
    };

    var BindEventMethods = {
        bindEvent(gameObject, eventEmitter, eventName, callback, scope, once) {
            if (typeof (eventEmitter) === 'string') {
                once = scope;
                scope = callback;
                callback = eventName;
                eventName = eventEmitter;
                eventEmitter = gameObject;
                gameObject = this;
            }

            BindEventWithGameObject(gameObject, eventEmitter, eventName, callback, scope, once);

            return this;
        },

        bindScenePreupdateEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'preupdate', gameObject, callback, scope, once);
            return this;
        },

        bindSceneUpdateEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'update', gameObject, callback, scope, once);
            return this;
        },

        bindScenePostupdateEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'postupdate', gameObject, callback, scope, once);
            return this;
        },

        bindSceneRenderEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'render', gameObject, callback, scope, once);
            return this;
        },

        bindScenePauseEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'pause', gameObject, callback, scope, once);
            return this;
        },

        bindSceneResumeEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'resume', gameObject, callback, scope, once);
            return this;
        },

        bindSceneSleepEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'sleep', gameObject, callback, scope, once);
            return this;
        },

        bindSceneWakeEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'wake', gameObject, callback, scope, once);
            return this;
        },

        bindSceneShutdownEvent(gameObject, callback, scope, once) {
            BindSceneEvent.call(this, 'shutdown', gameObject, callback, scope, once);
            return this;
        },


    };

    var GetPointerWorldXY = function (pointer, targetCamera, out) {
        var camera = pointer.camera;
        if (!camera) {
            return null;
        }

        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globalOut$1;
        }

        if (camera === targetCamera) {
            out.x = pointer.worldX;
            out.y = pointer.worldY;
        } else {
            camera.getWorldPoint(pointer.x, pointer.y, out);
        }

        return out;
    };

    var globalOut$1 = {};

    var IsPointerInBounds = function (gameObject, pointer, preTest, postTest) {
        var mainCamera = gameObject.scene.sys.cameras.main,
            worldXY;

        var useScreenXY = (gameObject.scrollFactorX === 0) && (gameObject.scrollFactorY === 0);

        if (pointer) {
            if (useScreenXY) {
                return IsPointInBounds(gameObject, pointer.x, pointer.y, preTest, postTest);

            } else {
                worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                if (!worldXY) {
                    return false;
                }
                return IsPointInBounds(gameObject, worldXY.x, worldXY.y, preTest, postTest);

            }

        } else {
            var inputManager = gameObject.scene.input.manager;
            var pointersTotal = inputManager.pointersTotal;
            var pointers = inputManager.pointers;
            for (var i = 0; i < pointersTotal; i++) {
                pointer = pointers[i];

                if (useScreenXY) {
                    if (IsPointInBounds(gameObject, pointer.x, pointer.y, preTest, postTest)) {
                        return true;
                    }

                } else {
                    worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                    if (!worldXY) {
                        continue;
                    }

                    if (IsPointInBounds(gameObject, worldXY.x, worldXY.y, preTest, postTest)) {
                        return true;
                    }

                }

            }
            return false;

        }

    };

    var IsInTouching = function (pointer, gameObject) {
        if (IsGameObject(pointer) || (typeof (pointer) === 'string')) {
            gameObject = pointer;
            pointer = undefined;
        }

        if (gameObject === undefined) {
            gameObject = this;
        } else if (typeof (gameObject) === 'string') {
            gameObject = this.getElement(gameObject);
        }

        return IsPointerInBounds(gameObject, pointer);
    };

    var IsArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var ContainsPoint$1 = function (gameObject, x, y, preTest, postTest) {
        return IsPointInBounds(
            gameObject,
            x, y,
            GetPreTestCallback(preTest),
            postTest
        );
    };

    var IsShownSizer = function (gameObject) {
        var isHiddenSizer = gameObject.rexSizer && gameObject.rexSizer.hidden;
        return !isHiddenSizer;
    };

    var GetPreTestCallback = function (preTest) {
        if (!preTest) {
            return IsShownSizer;
        }

        return function (gameObject, x, y) {
            if (!IsShownSizer(gameObject)) {
                return false;
            }
            preTest(gameObject, x, y);
            return true;
        }
    };

    var PointToChild = function (x, y, preTest, postTest, children) {
        if (!IsFunction(preTest)) {
            children = preTest;
            preTest = undefined;
            postTest = undefined;
        }

        if (children === undefined) {
            if (this.sizerChildren) {
                children = this.sizerChildren;
            } else {
                children = this.children;
            }
        }

        if (IsArray(children)) {
            var child;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (ContainsPoint$1(child, x, y, preTest, postTest)) {
                    return child;
                }
            }
        } else {
            var child;
            for (var key in children) {
                child = children[key];
                if (ContainsPoint$1(child, x, y, preTest, postTest)) {
                    return child;
                }
            }
        }

        return null;
    };

    var CopyState = function (gamObject, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = GlobState;
        }

        out.x = gamObject.x;
        out.y = gamObject.y;
        out.scaleX = gamObject.scaleX;
        out.scaleY = gamObject.scaleY;
        out.width = gamObject.width;
        out.height = gamObject.height;
        out.displayWidth = gamObject.displayWidth;
        out.displayHeight = gamObject.displayHeight;

        return out;
    };

    var GlobState = {};

    var PreLayoutChild = function (child) {
        if (this.sizerEventsEnable) {
            CopyState(child, this.getChildPrevState(child));
            this.layoutedChildren.push(child);
        }
    };

    var LayoutChild = function (child, x, y, width, height, align, offsetX, offsetY) {
        if (offsetX === undefined) { offsetX = 0; }
        if (offsetY === undefined) { offsetY = 0; }

        AlignIn(child, x, y, width, height, align);

        child.x += offsetX;
        child.y += offsetY;

        this.resetChildPositionState(child);

        if (this.sizerEventsEnable) {
            child.emit('sizer.postlayout', child, this);
        }
    };

    const ALIGN_CENTER$3 = Phaser.Display.Align.CENTER;

    var LayoutBackgrounds = function () {
        if (this.backgroundChildren === undefined) {
            return;
        }
        var backgrounds = this.backgroundChildren;

        var startX = this.left,
            startY = this.top;
        var parentWidth = this.width * this.scaleX,
            parentHeight = this.height * this.scaleY;
        var child, childConfig, padding,
            x, y, width, height;
        for (var i = 0, cnt = backgrounds.length; i < cnt; i++) {
            child = backgrounds[i];
            childConfig = child.rexSizer;
            if (childConfig.hidden) {
                continue;
            }

            padding = childConfig.padding;

            PreLayoutChild.call(this, child);

            x = startX + (padding.left * this.scaleX);
            y = startY + (padding.top * this.scaleY);
            width = parentWidth - ((padding.left + padding.right) * this.scaleX);
            height = parentHeight - ((padding.top + padding.bottom) * this.scaleY);

            ResizeGameObject(child, width, height);

            LayoutChild.call(this,
                child, x, y, width, height, ALIGN_CENTER$3,
                0, 0
            );
        }
    };

    const IsPlainObject$d = Phaser.Utils.Objects.IsPlainObject;
    var SetDraggable = function (sensor, draggable, dragTarget) {
        if (IsPlainObject$d(sensor)) {
            var config = sensor;
            sensor = config.sensor;
            dragTarget = config.target;
            draggable = config.draggable;
        } else {
            if (typeof (draggable) !== 'boolean') {
                dragTarget = draggable;
                draggable = undefined;
            }
        }

        var sensorType = typeof (sensor);
        if (sensorType === 'string') {
            var sensorName = sensor;
            sensor = this.getElement(sensorName);
            if (!sensor) {
                console.error(`Can get element '${sensorName}'`);
                return this;
            }
        } else if ((sensor === undefined) || (sensorType != 'object')) {
            draggable = sensor;
            sensor = this;
        }

        if (draggable === undefined) {
            draggable = true;
        }

        if (sensor.input && sensor.input._rexUIDragSizer) {
            // Draggable is already registered
            sensor.input.draggable = draggable;
        } else if (draggable) {
            // Register draggable
            sensor.setInteractive();
            sensor.scene.input.setDraggable(sensor);
            sensor
                .on('drag', function (pointer, dragX, dragY) {
                    var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                    currentDragTarget.x += (dragX - sensor.x);
                    currentDragTarget.y += (dragY - sensor.y);
                    currentDragTarget.emit('sizer.drag', pointer, dragX, dragY);
                }, this)
                .on('dragstart', function (pointer, dragX, dragY) {
                    var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                    currentDragTarget.emit('sizer.dragstart', pointer, dragX, dragY);
                }, this)
                .on('dragend', function (pointer, dragX, dragY, dropped) {
                    var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                    currentDragTarget.emit('sizer.dragend', pointer, dragX, dragY, dropped);
                }, this)
                .on('drop', function (pointer, dropZone) {
                    var currentDragTarget = (dragTarget === undefined) ? this.getTopmostSizer() : dragTarget;
                    currentDragTarget.emit('sizer.drop', pointer, dropZone);
                });
            sensor.input._rexUIDragSizer = true;
        } else ;
        return this;
    };

    const GetValue$10 = Phaser.Utils.Objects.GetValue;

    class Button extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;
            gameObject.setInteractive(GetValue$10(config, "inputConfig", undefined));
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.lastClickTime = undefined;
            this.isDown = false;
            this.isOver = false;
            this.setEnable(GetValue$10(o, "enable", true));
            this.setMode(GetValue$10(o, "mode", 1));
            this.setClickInterval(GetValue$10(o, "clickInterval", 100));
            this.setDragThreshold(GetValue$10(o, 'threshold', undefined));
            return this;
        }

        boot() {
            var gameObject = this.parent;
            gameObject.on('pointerdown', this.onPress, this);
            gameObject.on('pointerup', this.onRelease, this);
            gameObject.on('pointerout', this.onPointOut, this);
            gameObject.on('pointermove', this.onMove, this);

            gameObject.on('pointerover', this.onOver, this);
            gameObject.on('pointerout', this.onOut, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // GameObject events will be removed when this gameObject destroyed 
            // this.parent.on('pointerdown', this.onPress, this);
            // this.parent.on('pointerup', this.onRelease, this);
            // this.parent.on('pointerout', this.onPointOut, this);
            // this.parent.on('pointermove', this.onMove, this);
            this.pointer = null;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.cancel();
            }
            this._enable = e;

            var eventName = (e) ? 'enable' : 'disable';
            this.emit(eventName, this, this.parent);
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        setMode(m) {
            if (typeof (m) === 'string') {
                m = CLICKMODE$1[m];
            }
            this.mode = m;
            return this;
        }

        setClickInterval(interval) {
            this.clickInterval = interval; // ms
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        // internal
        onPress(pointer, localX, localY, event) {
            if (this.pointer !== undefined) {
                return;
            }

            this.pointer = pointer;

            this.isDown = true;
            this.emit('down', this, this.parent, pointer, event);

            if (this.mode === 0) {
                this.click(pointer.downTime, pointer, event);
            }

        }

        onRelease(pointer, localX, localY, event) {
            if (this.pointer !== pointer) {
                return;
            }

            this.isDown = false;
            this.emit('up', this, this.parent, pointer, event);

            if (this.mode === 1) {
                this.click(pointer.upTime, pointer, event);
            }

            this.pointer = undefined;
        }

        onPointOut(pointer, event) {
            if (this.pointer !== pointer) {
                return;
            }

            this.cancel();
        }

        onMove(pointer, localX, localY, event) {
            if (this.pointer !== pointer) {
                return;
            }

            if (this.dragThreshold === undefined) {
                return;
            }

            if (this.mode === 1) {
                if (pointer.getDistance() >= this.dragThreshold) {
                    this.cancel();
                }
            }
        }

        onOver(pointer, localX, localY, event) {
            if (!this.enable) {
                return this;
            }

            this.isOver = true;
            this.emit('over', this, this.parent, pointer, event);

            return this;
        }

        onOut(pointer, event) {
            if (!this.enable) {
                return this;
            }

            this.isOver = false;
            this.emit('out', this, this.parent, pointer, event);

            return this;
        }

        click(nowTime, pointer, event) {
            if (!this.enable) {
                return this;
            }

            if (nowTime === undefined) {
                // fires 'click' event manually
                this.emit('click', this, this.parent, pointer, event);
                return this;
            }

            this.pointer = undefined;
            var lastClickTime = this.lastClickTime;
            if ((lastClickTime !== undefined) &&
                ((nowTime - lastClickTime) <= this.clickInterval)) {
                return this;
            }
            this.lastClickTime = nowTime;
            this.emit('click', this, this.parent, pointer, event);
            return this;
        }

        cancel() {
            this.pointer = undefined;
            return this;
        }

    }

    const CLICKMODE$1 = {
        press: 0,
        pointerdown: 0,
        release: 1,
        pointerup: 1,
    };

    var ClickMethods = {
        onClick(gameObject, callback, scope, config) {
            if (!gameObject) {
                return this;
            }

            if (typeof (gameObject) === 'function') {
                config = scope;
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._click === undefined) {
                gameObject._click = new Button(gameObject, config);
            }
            gameObject._click.on('click', callback, scope);

            return this;
        },

        offClick(gameObject, callback, scope) {
            if (typeof (gameObject) === 'function') {
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._click === undefined) {
                return this;
            }
            gameObject._click.off('click', callback, scope);

            return this;
        },

        enableClick(gameObject, enabled) {
            if (typeof (gameObject) === 'boolean') {
                enabled = gameObject;
                gameObject = undefined;
            }

            if (gameObject === undefined) {
                gameObject = this;
            }

            if (gameObject._click === undefined) {
                return this;
            }

            gameObject._click.setEnable(enabled);
            return this;
        },

        disableClick(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }

            if (gameObject._click === undefined) {
                return this;
            }
            gameObject._click.setEnable(false);

            return this;
        }
    };

    var IsPointerInHitArea = function (gameObject, pointer, preTest, postTest, returnFirstPointer) {
        if (pointer) {
            if (preTest && !preTest(gameObject, pointer)) {
                return false;
            }
            if (!HitTest(gameObject, pointer)) {
                return false;
            }
            if (postTest && !postTest(gameObject, pointer)) {
                return false;
            }
            return true;

        } else {
            if (returnFirstPointer === undefined) {
                returnFirstPointer = false;
            }

            var inputManager = gameObject.scene.input.manager;
            var pointersTotal = inputManager.pointersTotal;
            var pointers = inputManager.pointers,
                pointer;
            for (var i = 0; i < pointersTotal; i++) {
                pointer = pointers[i];
                if (preTest && !preTest(gameObject, pointer)) {
                    continue;
                }
                if (!HitTest(gameObject, pointer)) {
                    continue;
                }
                if (postTest && !postTest(gameObject, pointer)) {
                    continue;
                }

                if (returnFirstPointer) {
                    return pointer;
                }

                return true;
            }

            return false;
        }
    };

    var HitTest = function (gameObject, pointer) {
        var scene = gameObject.scene;
        var cameras = scene.input.cameras.getCamerasBelowPointer(pointer);
        var inputManager = scene.input.manager;
        var gameObjects = [gameObject];

        for (var i = 0, len = cameras.length; i < len; i++) {
            inputManager.hitTest(pointer, gameObjects, cameras[i], HitTestResult);
            if (HitTestResult.length > 0) {
                HitTestResult.length = 0;
                return true;
            }
        }

        HitTestResult.length = 0;
        return false;
    };

    var HitTestResult = [];

    const GetValue$$ = Phaser.Utils.Objects.GetValue;

    class ClickOutside extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;

            var inputConfig = GetValue$$(config, "inputConfig", undefined);
            if (inputConfig) {
                gameObject.setInteractive(inputConfig);
            }

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.lastClickTime = undefined;
            this.setEnable(GetValue$$(o, "enable", true));
            this.setMode(GetValue$$(o, "mode", 1));
            this.setClickInterval(GetValue$$(o, "clickInterval", 100));
            this.setDragThreshold(GetValue$$(o, 'threshold', undefined));
            return this;
        }

        boot() {
            var scene = this.parent.scene;
            scene.input.on('pointerdown', this.onPress, this);
            scene.input.on('pointerup', this.onRelease, this);
            scene.input.on('pointermove', this.onMove, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            var scene = this.parent.scene;
            scene.input.off('pointerdown', this.onPress, this);
            scene.input.off('pointerup', this.onRelease, this);
            scene.input.off('pointermove', this.onMove, this);
            this.pointer = null;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.cancel();
            }
            this._enable = e;

            var eventName = (e) ? 'enable' : 'disable';
            this.emit(eventName, this, this.parent);
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        setMode(m) {
            if (typeof (m) === 'string') {
                m = CLICKMODE[m];
            }
            this.mode = m;
            return this;
        }

        setClickInterval(interval) {
            this.clickInterval = interval; // ms
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        isPointerInside(pointer) {
            var gameObject = this.parent;
            var isInsideCallback = (gameObject.input) ? IsPointerInHitArea : IsPointerInBounds;
            return isInsideCallback(gameObject, pointer);
        }

        // internal
        onPress(pointer) {
            // Do nothing if game object is not visible
            if (!this.parent.willRender(pointer.camera)) {
                return;
            }

            if (this.pointer !== undefined) {
                return;
            }

            if (this.isPointerInside(pointer)) {
                return;
            }

            this.pointer = pointer;

            if (this.mode === 0) {
                if (!this.isPointerInside(pointer)) {
                    this.click(pointer.downTime, pointer);
                }
            }
        }

        onRelease(pointer) {
            // Do nothing if game object is not visible
            if (!this.parent.willRender(pointer.camera)) {
                return;
            }

            if (this.pointer !== pointer) {
                return;
            }

            if (this.mode === 1) {
                if (!this.isPointerInside(pointer)) {
                    this.click(pointer.upTime, pointer);
                }
            }

            this.pointer = undefined;
        }

        onMove(pointer, localX, localY, event) {
            if (this.pointer !== pointer) {
                return;
            }

            if (this.dragThreshold === undefined) {
                return;
            }

            if (this.mode === 1) {
                if ((pointer.getDistance() >= this.dragThreshold) ||
                    (this.isPointerInside(pointer))) {
                    this.cancel();
                }
            }
        }

        click(nowTime, pointer) {
            if (!this.enable) {
                return this;
            }

            if (nowTime === undefined) {
                // fires 'clickoutside' event manually
                this.emit('clickoutside', this, this.parent, pointer);
                return this;
            }

            this.pointer = undefined;
            var lastClickTime = this.lastClickTime;
            if ((lastClickTime !== undefined) &&
                ((nowTime - lastClickTime) <= this.clickInterval)) {
                return this;
            }
            this.lastClickTime = nowTime;
            this.emit('clickoutside', this, this.parent, pointer);

            return this;
        }

        cancel() {
            this.pointer = undefined;
            return this;
        }
    }

    const CLICKMODE = {
        press: 0,
        pointerdown: 0,
        release: 1,
        pointerup: 1,
    };

    var ClickOutsideMethods = {
        onClickOutside(gameObject, callback, scope, config) {
            if (!gameObject) {
                return this;
            }

            if (typeof (gameObject) === 'function') {
                config = scope;
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._clickOutside === undefined) {
                gameObject._clickOutside = new ClickOutside(gameObject, config);
            }
            gameObject._clickOutside.on('clickoutside', callback, scope);

            return this;
        },

        offClickOutside(gameObject, callback, scope) {
            if (typeof (gameObject) === 'function') {
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._clickOutside === undefined) {
                return this;
            }
            gameObject._clickOutside.off('clickoutside', callback, scope);

            return this;
        },

        enableClickOutside(gameObject, enabled) {
            if (typeof (gameObject) === 'boolean') {
                enabled = gameObject;
                gameObject = undefined;
            }

            if (gameObject === undefined) {
                gameObject = this;
            }

            if (gameObject._clickOutside === undefined) {
                return this;
            }
            gameObject._clickOutside.setEnable(enabled);

            return this;
        },

        disableClickOutside(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }

            if (gameObject._clickOutside === undefined) {
                return this;
            }
            gameObject._clickOutside.setEnable(false);

            return this;
        }
    };

    class Cooldown extends FSM {
        constructor() {
            super({
                eventEmitter: false
            });

            this.goto('IDLE');
        }

        setCooldownTime(time) {
            this.cooldownTime = time;
            this.cooldownMode = (time !== undefined);
            return this;
        }

        request() {
            return this.runMethod('request');
        }

        // IDLE state
        update_IDLE() {
            this.compensationTime = 0;
        }
        request_IDLE() {
            this.next();
            return true;
        }
        next_IDLE() {
            if (this.cooldownMode) {
                return 'COOLDOWN';
            }
        }

        // COOLDOWN state
        enter_COOLDOWN() {
            this.remainderTime = this.cooldownTime + this.compensationTime;
        }
        update_COOLDOWN(time, delta) {
            this.remainderTime -= delta;
            if (this.remainderTime < 0) {
                this.compensationTime = (this.cooldownTime > delta) ? (-this.remainderTime) : 0;
                this.goto('IDLE');
            }
        }
        request_COOLDOWN() {
            return false;
        }

    }

    const GetValue$_ = Phaser.Utils.Objects.GetValue;

    class InTouching extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;
            this.cooldown = new Cooldown();
            this.parent.setInteractive(GetValue$_(config, 'inputConfig', undefined));
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.prevIsInTouch = false;
            this.isInTouching = false;
            this.setEnable(GetValue$_(o, 'enable', true));
            this.setCooldown(GetValue$_(o, 'cooldown', undefined));
            return this;
        }

        boot() {
            var gameObject = this.parent;
            gameObject.on('pointerdown', this.onPointIn, this);
            gameObject.on('pointerover', this.onPointIn, this);
            gameObject.on('pointerup', this.onPointOut, this);
            gameObject.on('pointerout', this.onPointOut, this);
            this.scene.sys.events.on('preupdate', this.preupdate, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // GameObject events will be removed when this gameObject destroyed 
            // this.parent.off('pointerdown', this.onPointIn, this);
            // this.parent.off('pointerover', this.onPointIn, this);
            // this.parent.off('pointerup', this.onPointOut, this);
            // this.parent.off('pointerout', this.onPointOut, this);
            this.scene.sys.events.off('preupdate', this.preupdate, this);

            this.pointer = undefined;
            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.prevIsInTouch = false;
                this.isInTouching = false;
                this.pointer = undefined;
            }
            this._enable = e;
            return this;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        get cooldownTime() {
            return this.cooldown.cooldownTime;
        }

        set cooldownTime(time) {
            this.cooldown.setCooldownTime(time);
        }

        setCooldown(time) {
            this.cooldownTime = time;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        // internal
        onPointIn(pointer, localX, localY) {
            if ((!this.enable) ||
                (!pointer.isDown) ||
                (this.pointer !== undefined)) {
                return;
            }
            this.pointer = pointer;
            this.isInTouching = true;
        }

        onPointOut(pointer) {
            if ((!this.enable) ||
                (this.pointer !== pointer)) {
                return;
            }
            this.pointer = undefined;
            this.isInTouching = false;
        }

        preupdate(time, delta) {
            this.cooldown.update(time, delta);

            if (!this.prevIsInTouch && this.isInTouching) {
                this.emit('touchstart', this, this.parent);
            }

            if (this.isInTouching && this.cooldown.request()) {
                this.emit('intouch', this, this.parent, this.pointer);
            }
            
            if (this.prevIsInTouch && !this.isInTouching) {
                this.emit('touchend', this, this.parent);
            }

            this.prevIsInTouch = this.isInTouching;
        }
    }

    var TouchingMethods = {
        isPointerInBounds(target) {
            if (target === undefined) {
                target = this;
            } else if (typeof (target) === 'string') {
                target = this.getElement(target);
            }

            if (!target) {
                return false;
            }

            return IsPointerInBounds(target);
        },

        onTouching(gameObject, callback, scope, config) {
            if (!gameObject) {
                return this;
            }

            if (typeof (gameObject) === 'function') {
                config = scope;
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._inTouching === undefined) {
                gameObject._inTouching = new InTouching(gameObject, config);
            }
            gameObject._inTouching.on('intouch', callback, scope);

            return this;
        },

        offTouching(gameObject, callback, scope) {
            if (typeof (gameObject) === 'function') {
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._inTouching === undefined) {
                return this;
            }
            gameObject._inTouching.off('intouch', callback, scope);

            return this;
        },

        onTouchingEnd(gameObject, callback, scope, config) {
            if (!gameObject) {
                return this;
            }

            if (typeof (gameObject) === 'function') {
                config = scope;
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._inTouching === undefined) {
                gameObject._inTouching = new InTouching(gameObject, config);
            }
            gameObject._inTouching.on('touchend', callback, scope);

            return this;
        },

        offTouchingEnd(gameObject, callback, scope) {
            if (typeof (gameObject) === 'function') {
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            if (gameObject._inTouching === undefined) {
                return this;
            }
            gameObject._inTouching.off('touchend', callback, scope);

            return this;
        },


        enableTouching(gameObject, enabled) {
            if (typeof (gameObject) === 'boolean') {
                enabled = gameObject;
                gameObject = undefined;
            }

            if (gameObject === undefined) {
                gameObject = this;
            }

            if (gameObject._inTouching === undefined) {
                return this;
            }
            gameObject._inTouching.setEnable(enabled);

            return this;
        },

        disableTouching(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }

            if (gameObject._inTouching === undefined) {
                return this;
            }
            gameObject._inTouching.setEnable(false);

            return this;
        },


    };

    var HoverMethods = {
        onOver(gameObject, callback, scope) {
            if (!gameObject) {
                return this;
            }
            if (typeof (gameObject) === 'function') {
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            gameObject
                .setInteractive()
                .on('pointerover', callback, scope);

            return this;
        },

        onOut(gameObject, callback, scope) {
            if (!gameObject) {
                return this;
            }
            if (typeof (gameObject) === 'function') {
                scope = callback;
                callback = gameObject;
                gameObject = this;
            }

            gameObject
                .setInteractive()
                .on('pointerout', callback, scope);

            return this;
        },
    };

    var ContainsPoint = function (targetMode, gameObjects, x, y) {
        if (targetMode === 'parent') {
            var parent;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                parent = gameObjects[i];
                if (!ContainsPoint$1(parent, x, y)) {
                    continue;
                }

                return parent.pointToChild(x, y);
            }
        } else {  // direct mode
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                var target = gameObjects[i];
                if (ContainsPoint$1(target, x, y)) {
                    return target;
                }
            }
        }

        return null;
    };

    var EmitChildEvent = function (eventEmitter, eventName, targets, targetMode, worldX, worldY, pointer, event) {
        var child;
        if (worldY === undefined) {
            child = worldX;
        } else {
            var firstChild = targets[0];
            if (!firstChild) {
                return;
            }
            var camera = pointer.camera;
            var px = worldX + camera.scrollX * (firstChild.scrollFactorX - 1);
            var py = worldY + camera.scrollY * (firstChild.scrollFactorY - 1);
            child = ContainsPoint(targetMode, targets, px, py);
        }

        if (!child) {
            return;
        }

        eventEmitter.emit(eventName, child, pointer, event);
    };

    const GetValue$Z = Phaser.Utils.Objects.GetValue;

    var DownChild = function (config) {
        var downConfig = GetValue$Z(config, 'down', undefined);
        if (downConfig === false) {
            return;
        } else if (downConfig === true) {
            downConfig = undefined;
        }

        this
            .on('pointerdown', OnDown, this);
    };

    var OnDown = function (pointer, localX, localY, event) {
        var childrenInteractive = this._childrenInteractive;

        EmitChildEvent(
            childrenInteractive.eventEmitter,
            `${childrenInteractive.eventNamePrefix}down`,
            childrenInteractive.targetSizers,
            childrenInteractive.targetMode,
            pointer.worldX, pointer.worldY,
            pointer, event
        );
    };

    const GetValue$Y = Phaser.Utils.Objects.GetValue;

    var UpChild = function (config) {
        var upConfig = GetValue$Y(config, 'up', undefined);
        if (upConfig === false) {
            return;
        } else if (upConfig === true) {
            upConfig = undefined;
        }

        this
            .on('pointerup', OnUp, this);
    };

    var OnUp = function (pointer, localX, localY, event) {
        var childrenInteractive = this._childrenInteractive;

        EmitChildEvent(
            childrenInteractive.eventEmitter,
            `${childrenInteractive.eventNamePrefix}up`,
            childrenInteractive.targetSizers,
            childrenInteractive.targetMode,
            pointer.worldX, pointer.worldY,
            pointer, event
        );
    };

    const GetValue$X = Phaser.Utils.Objects.GetValue;

    var OverChild = function (config) {
        var overConfig = GetValue$X(config, 'over', undefined);
        if (overConfig === false) {
            return;
        } else if (overConfig === true) {
            overConfig = undefined;
        }

        this
            .on('pointermove', OnMove, this)
            .on('pointerover', OnMove, this)
            .on('pointerout', OnOut, this);  // pointer-up is included too
    };

    var OnMove = function (pointer, localX, localY, event) {
        var childrenInteractive = this._childrenInteractive;
        var firstChild = childrenInteractive.targetSizers[0];
        if (!firstChild) {
            return;
        }
        var camera = pointer.camera;
        var px = pointer.worldX + camera.scrollX * (firstChild.scrollFactorX - 1);
        var py = pointer.worldY + camera.scrollY * (firstChild.scrollFactorY - 1);

        var child = ContainsPoint(childrenInteractive.targetMode, childrenInteractive.targetSizers, px, py);
        var preChild = childrenInteractive.lastOverChild;
        if (child && preChild &&
            (child === preChild)) {
            return;
        }

        childrenInteractive.lastOverChild = child;
        EmitChildEvent(
            childrenInteractive.eventEmitter,
            `${childrenInteractive.eventNamePrefix}out`,
            childrenInteractive.targetSizers,
            childrenInteractive.targetMode,
            preChild, undefined,
            pointer, event
        );
        EmitChildEvent(
            childrenInteractive.eventEmitter,
            `${childrenInteractive.eventNamePrefix}over`,
            childrenInteractive.targetSizers,
            childrenInteractive.targetMode,
            child, undefined,
            pointer, event
        );
    };

    var OnOut = function (pointer, event) {
        var childrenInteractive = this._childrenInteractive;
        var child = childrenInteractive.lastOverChild;
        childrenInteractive.lastOverChild = null;
        EmitChildEvent(
            childrenInteractive.eventEmitter,
            `${childrenInteractive.eventNamePrefix}out`,
            childrenInteractive.targetSizers,
            childrenInteractive.targetMode,
            child, undefined,
            pointer, event
        );
    };

    const GetValue$W = Phaser.Utils.Objects.GetValue;

    var ClickChild = function (config) {
        var clickConfig = GetValue$W(config, 'click', undefined);
        if (clickConfig === false) {
            return;
        } else if (clickConfig === true) {
            clickConfig = undefined;
        }

        if (clickConfig === undefined) {
            clickConfig = {};
        }
        if (!clickConfig.hasOwnProperty('threshold')) {
            clickConfig.threshold = 10;
        }

        var childrenInteractive = this._childrenInteractive;
        this._click = new Button(this, clickConfig);
        this._click.on('click', function (button, gameObject, pointer, event) {
            EmitChildEvent(
                childrenInteractive.eventEmitter,
                `${childrenInteractive.eventNamePrefix}click`,
                childrenInteractive.targetSizers,
                childrenInteractive.targetMode,
                pointer.worldX, pointer.worldY,
                pointer, event
            );
        }, this);
    };

    const GetValue$V = Phaser.Utils.Objects.GetValue;

    class OnePointerTracer extends TickTask {
        constructor(gameObject, config) {
            var scene = GetSceneObject(gameObject);
            if (scene === gameObject) {
                gameObject = undefined;
            }
            super(scene, config);

            this.gameObject = gameObject;
            if (gameObject) {
                gameObject.setInteractive(GetValue$V(config, 'inputConfig', undefined));
            }
            this._enable = undefined;
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setEnable(GetValue$V(o, 'enable', true));

            this.setDetectBounds();
            if (this.gameObject === undefined) {
                this.setDetectBounds(GetValue$V(o, 'bounds', undefined));
            } else {
                this.setDetectBounds();
            }

            this.tracerState = TOUCH0$1;
            // this.recongizedState = new stateClass(this);
            this.pointer = undefined;
            this.lastPointer = undefined; // Last catched pointer
            this.movedState = false;
            this.isTouchingAnyObject = false;
            return this;
        }

        boot() {
            super.boot();
            if (this.gameObject) {
                this.gameObject.on('pointerdown', this.onPointerDown, this);
            } else {
                this.scene.input.on('pointerdown', this.onPointerDown, this);
            }
            this.scene.input.on('pointerup', this.onPointerUp, this);
            this.scene.input.on('gameout', this.dragCancel, this);

            this.scene.input.on('pointermove', this.onPointerMove, this);
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }

        shutdown(fromScene) {
            if (!this.scene) {
                return
            }

            if (this.gameObject) ; else {
                this.scene.input.off('pointerdown', this.onPointerDown, this);
            }
            this.scene.input.off('pointerup', this.onPointerUp, this);
            this.scene.input.off('gameout', this.dragCancel, this);

            this.scene.input.off('pointermove', this.onPointerMove, this);
            this.scene.sys.events.off('shutdown', this.destroy, this);

            this.gameObject = undefined;
            this.bounds = undefined;
            this.pointer = undefined;
            this.lastPointer = undefined; // Last catched pointer
            this.movedState = false;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.dragCancel();
            }
            this._enable = e;
            return this;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        setDetectBounds(bounds) {
            this.bounds = bounds;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        onPointerDown(pointer, gameObjects) {
            if (!this.enable) {
                return;
            }

            if (this.pointer !== undefined) {
                return;
            }

            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            if (!isInsideBounds) {
                return;
            }

            if (this.pointer === pointer) {
                return;
            }

            this.pointer = pointer;
            this.pointerCamera = pointer.camera;
            this.lastPointer = pointer;
            this.movedState = false;
            this.tracerState = TOUCH1$1;

            if (this.gameObject === undefined) {
                this.isTouchingAnyObject = (gameObjects.length > 0);
            }
            this.onDragStart();
        }

        onPointerUp(pointer) {
            if (!this.enable) {
                return;
            }

            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            if (!isInsideBounds) {
                return;
            }

            if (this.pointer !== pointer) {
                return;
            }

            this.pointer = undefined;
            this.pointerCamera = undefined;
            this.movedState = false;
            this.tracerState = TOUCH0$1;
            this.onDragEnd();
        }

        onPointerMove(pointer) {
            if (!this.enable) {
                return;
            }

            if (pointer.isDown) {
                var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
                var isCatchedPointer = (this.pointer === pointer);
                if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) { // Pointer moves out of bounds
                    this.onPointerUp(pointer);
                } else { // Pointer drags in bounds
                    if (!this.movedState) {
                        this.movedState = (pointer.x !== pointer.downX) || (pointer.y !== pointer.downY);
                    }
                    if (this.movedState) {
                        this.onDrag();
                    }
                }
            }
        }

        dragCancel() {
            if (this.tracerState === TOUCH1$1) {
                this.onDragEnd();
            }
            this.pointer = undefined;
            this.tracerState = TOUCH0$1;
            return this;
        }

        onDragStart() {
            this.emit('dragstart', this);
        }

        onDragEnd() {
            this.emit('dragend', this);
        }

        onDrag() {
            this.emit('drag', this);
        }

        // onLastPointerMove() { }

        preUpdate(time, delta) { }

        postUpdate(time, delta) { }

        startTicking() {
            super.startTicking();
            this.scene.sys.events.on('preupdate', this.preUpdate, this);
            this.scene.sys.events.on('postupdate', this.postUpdate, this);
        }

        stopTicking() {
            super.stopTicking();
            if (this.scene) { // Scene might be destoryed
                this.scene.sys.events.off('preupdate', this.preUpdate, this);
                this.scene.sys.events.off('postupdate', this.postUpdate, this);
            }
        }

        setRecongizedStateObject(stateObject) {
            this.recongizedState = stateObject;
            return this;
        }

        get state() {
            return this.recongizedState.state;
        }

        set state(newState) {
            this.recongizedState.state = newState;
        }

        cancel() {
            this.state = IDLE$5;
            return this;
        }

        isPointerInGameObject(gameObject, preTest, postTest) {
            var pointer = this.lastPointer;
            if (!pointer) {
                return false;
            }

            return IsPointerInBounds(gameObject, pointer, preTest, postTest);
        }
    }

    const TOUCH0$1 = 0;
    const TOUCH1$1 = 1;

    const IDLE$5 = 'IDLE';

    const GetValue$U = Phaser.Utils.Objects.GetValue;
    const DistanceBetween$5 = Phaser.Math.Distance.Between;

    class Tap extends OnePointerTracer {
        constructor(gameObject, config) {
            super(gameObject, config);

            var self = this;
            var stateConfig = {
                states: {
                    IDLE: {
                        enter: function () {
                            self.stop();
                            self.tapsCount = 0;
                            self.x = 0;
                            self.y = 0;
                            self.worldX = 0;
                            self.worldY = 0;
                            self.lastPointer = undefined;
                        },
                        exit: function () {
                            var pointer = self.lastPointer;
                            self.x = pointer.x;
                            self.y = pointer.y;
                            self.worldX = pointer.worldX;
                            self.worldY = pointer.worldY;
                        }
                    },
                    BEGIN: {
                        enter: function () {
                            self.start();
                            self.tapsCount = 0;
                            self.emit('tappingstart', self, self.gameObject, self.lastPointer);
                        },
                    },
                    RECOGNIZED: {
                        enter: function () {
                            self.start();
                            self.emit('tap', self, self.gameObject, self.lastPointer);
                            self.emit(`${self.tapsCount}tap`, self, self.gameObject, self.lastPointer);
                        },
                    }
                },
                init: function () {
                    this.state = IDLE$4;
                },
                eventEmitter: false,
            };
            this.setRecongizedStateObject(new FSM(stateConfig));
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setHoldTime(GetValue$U(o, 'time', 250)); // min-hold-time of Press is 251
            this.setTapInterval(GetValue$U(o, 'tapInterval', 200));
            this.setDragThreshold(GetValue$U(o, 'threshold', 9));
            this.setTapOffset(GetValue$U(o, 'tapOffset', 10));

            var taps = GetValue$U(o, 'taps', undefined);
            if (taps !== undefined) {
                this.setTaps(taps);
            } else {
                this.setMaxTaps(GetValue$U(o, 'maxTaps', undefined));
                this.setMinTaps(GetValue$U(o, 'minTaps', undefined));
            }
            return this;
        }

        onDragStart() {
            switch (this.state) {
                case IDLE$4:
                    this.state = BEGIN$3;
                    break;

                case BEGIN$3:
                    var pointer = this.lastPointer;
                    var tapsOffset = DistanceBetween$5(
                        pointer.upX,
                        pointer.upY,
                        pointer.x,
                        pointer.y);
                    if (tapsOffset > this.tapOffset) { // Can't recognize next level, restart here
                        this.state = RECOGNIZED$3;
                        this.state = BEGIN$3;
                    }
                    break;

                case RECOGNIZED$3:
                    this.state = BEGIN$3;
                    break;
            }
        }

        onDragEnd() {
            if (this.state === BEGIN$3) {
                this.tapsCount++; // Try recognize next level
                this.emit('tapping', this, this.gameObject, this.lastPointer);

                if ((this.maxTaps !== undefined) && (this.tapsCount === this.maxTaps)) { // Reach to maxTaps, stop here                
                    this.state = RECOGNIZED$3;
                }
            }
        }

        onDrag() {
            if (this.state === IDLE$4) {
                return;
            }

            if (this.pointer.getDistance() > this.dragThreshold) { // Cancel
                this.state = IDLE$4;
            }
        }

        preUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            if (this.state === BEGIN$3) {
                var pointer = this.lastPointer;
                if (pointer.isDown) {
                    var holdTime = time - pointer.downTime;
                    if (holdTime > this.holdTime) {
                        this.state = IDLE$4;
                    }
                } else { // isUp
                    var releasedTime = time - pointer.upTime;
                    if (releasedTime > this.tapInterval) {
                        if ((this.minTaps === undefined) || (this.tapsCount >= this.minTaps)) {
                            this.state = RECOGNIZED$3;
                        } else {
                            this.state = IDLE$4;
                        }
                    }
                }
            }
        }

        postUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            // Clear RECOGNIZED after update()
            if (this.state === RECOGNIZED$3) {
                this.state = IDLE$4;
            }
        }

        get isTapped() {
            return (this.state === RECOGNIZED$3);
        }

        setHoldTime(time) {
            this.holdTime = time; // ms
            return this;
        }

        setTapInterval(time) {
            this.tapInterval = time; // ms
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        setTapOffset(distance) {
            this.tapOffset = distance;
            return this;
        }

        setMaxTaps(taps) {
            this.maxTaps = taps;
            return this;
        }

        setMinTaps(taps) {
            this.minTaps = taps;
            return this;
        }

        setTaps(minTaps, maxTaps) {
            if (maxTaps === undefined) {
                maxTaps = minTaps;
            }
            this.setMinTaps(minTaps).setMaxTaps(maxTaps);
            return this;
        }
    }

    const IDLE$4 = 'IDLE';
    const BEGIN$3 = 'BEGIN';
    const RECOGNIZED$3 = 'RECOGNIZED';

    const GetValue$T = Phaser.Utils.Objects.GetValue;

    class Press extends OnePointerTracer {
        constructor(gameObject, config) {
            super(gameObject, config);

            var self = this;
            var stateConfig = {
                states: {
                    IDLE: {
                        enter: function () {
                            self.x = 0;
                            self.y = 0;
                            self.worldX = 0;
                            self.worldY = 0;
                            self.lastPointer = undefined;
                        },
                        exit: function () {
                            var pointer = self.lastPointer;
                            self.x = pointer.x;
                            self.y = pointer.y;
                            self.worldX = pointer.worldX;
                            self.worldY = pointer.worldY;
                        }
                    },
                    BEGIN: {
                        enter: function () {
                            self.start();
                        },
                        exit: function () {
                            self.stop();
                        }
                    },
                    RECOGNIZED: {
                        enter: function () {
                            self.emit('pressstart', self, self.gameObject, self.lastPointer);
                        },
                        exit: function () {
                            self.emit('pressend', self, self.gameObject, self.lastPointer);
                        }
                    }
                },
                init: function () {
                    this.state = IDLE$3;
                },
                eventEmitter: false,
            };
            this.setRecongizedStateObject(new FSM(stateConfig));
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setDragThreshold(GetValue$T(o, 'threshold', 9));
            this.setHoldTime(GetValue$T(o, 'time', 251));
            return this;
        }

        onDragStart() {
            this.state = BEGIN$2;
            if (this.holdTime === 0) {
                this.state = RECOGNIZED$2;
            }
        }

        onDragEnd() {
            this.state = IDLE$3;
        }

        onDrag() {
            if (this.state === IDLE$3) {
                return;
            }

            if (this.pointer.getDistance() > this.dragThreshold) {
                this.state = IDLE$3;
            }
        }

        preUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            if (this.state === BEGIN$2) {
                var holdTime = time - this.pointer.downTime;
                if (holdTime >= this.holdTime) {
                    this.state = RECOGNIZED$2;
                }
            }
        }

        get isPressed() {
            return (this.state === RECOGNIZED$2);
        }

        setHoldTime(time) {
            this.holdTime = time; // ms
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }
    }

    const IDLE$3 = 'IDLE';
    const BEGIN$2 = 'BEGIN';
    const RECOGNIZED$2 = 'RECOGNIZED';

    Phaser.Utils.Objects.GetValue;

    var GetTickDelta = function (game) {
        return GetGame(game).loop.delta;
    };

    const DistanceBetween$4 = Phaser.Math.Distance.Between;
    const AngleBetween$1 = Phaser.Math.Angle.Between;

    var VelocityMethods = {
        getDt: function () {
            var dt = GetTickDelta(this.scene);
            return dt;
        },

        getVelocity: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var d = DistanceBetween$4(p0.x, p0.y, p1.x, p1.y);
            var velocity = d / (this.getDt() * 0.001);
            return velocity;
        },

        getVelocityX: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var d = Math.abs(p1.x - p0.x);
            var velocity = d / (this.getDt() * 0.001);
            return velocity;
        },

        getVelocityY: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var d = Math.abs(p1.y - p0.y);
            var velocity = d / (this.getDt() * 0.001);
            return velocity;
        },

        getVelocityAngle: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var angle = AngleBetween$1(p0.x, p0.y, p1.x, p1.y);
            return angle;
        }
    };

    var DIRMODE = {
        'up&down': 0,
        'left&right': 1,
        '4dir': 2,
        '8dir': 3
    };

    var AngleToDirections = function (angle, dirMode, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut$1;
        }

        out.left = false;
        out.right = false;
        out.up = false;
        out.down = false;

        angle = (angle + 360) % 360;
        switch (dirMode) {
            case 0: // up & down
                if (angle < 180) {
                    out.down = true;
                } else {
                    out.up = true;
                }
                break;

            case 1: // left & right
                if ((angle > 90) && (angle <= 270)) {
                    out.left = true;
                } else {
                    out.right = true;
                }
                break;

            case 2: // 4 dir
                if ((angle > 45) && (angle <= 135)) {
                    out.down = true;
                } else if ((angle > 135) && (angle <= 225)) {
                    out.left = true;
                } else if ((angle > 225) && (angle <= 315)) {
                    out.up = true;
                } else {
                    out.right = true;
                }
                break;

            case 3: // 8 dir
                if ((angle > 22.5) && (angle <= 67.5)) {
                    out.down = true;
                    out.right = true;
                } else if ((angle > 67.5) && (angle <= 112.5)) {
                    out.down = true;
                } else if ((angle > 112.5) && (angle <= 157.5)) {
                    out.down = true;
                    out.left = true;
                } else if ((angle > 157.5) && (angle <= 202.5)) {
                    out.left = true;
                } else if ((angle > 202.5) && (angle <= 247.5)) {
                    out.left = true;
                    out.up = true;
                } else if ((angle > 247.5) && (angle <= 292.5)) {
                    out.up = true;
                } else if ((angle > 292.5) && (angle <= 337.5)) {
                    out.up = true;
                    out.right = true;
                } else {
                    out.right = true;
                }
                break;
        }

        return out;
    };

    var globOut$1 = {};

    const GetValue$S = Phaser.Utils.Objects.GetValue;
    const RadToDeg$2 = Phaser.Math.RadToDeg;

    class Swipe extends OnePointerTracer {
        constructor(gameObject, config) {
            super(gameObject, config);

            var self = this;
            var stateConfig = {
                states: {
                    IDLE: {
                        enter: function () {
                            self.x = 0;
                            self.y = 0;
                            self.worldX = 0;
                            self.worldY = 0;
                        },
                        exit: function () {
                            var pointer = self.lastPointer;
                            self.x = pointer.x;
                            self.y = pointer.y;
                            self.worldX = pointer.worldX;
                            self.worldY = pointer.worldY;
                        }
                    },
                    BEGIN: {
                        enter: function () {
                            self.validDrag = false;
                        }
                    },
                    RECOGNIZED: {
                        enter: function () {
                            self.start();
                            self.updateDirectionStates();
                            self.emit('swipe', self, self.gameObject, self.lastPointer);
                        },

                        exit: function () {
                            self.stop();
                            self.clearDirectionStates();
                        }
                    }
                },
                init: function () {
                    this.state = IDLE$2;
                },
                eventEmitter: false,
            };
            this.setRecongizedStateObject(new FSM(stateConfig));
            this.clearDirectionStates();
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setDragThreshold(GetValue$S(o, 'threshold', 10));
            this.setVelocityThreshold(GetValue$S(o, 'velocityThreshold', 1000));
            this.setDirectionMode(GetValue$S(o, 'dir', '8dir'));
            return this;
        }

        onDragStart() {
            this.state = BEGIN$1;
        }

        onDragEnd() {
            this.state = IDLE$2;
        }

        onDrag() {
            if (this.state === BEGIN$1) {
                if (!this.validDrag) {
                    this.validDrag = (this.dragThreshold === 0) || (this.pointer.getDistance() >= this.dragThreshold);
                }
                if (this.validDrag && (this.dragVelocity > this.velocityThreshold)) {
                    this.state = RECOGNIZED$1;
                }
            }
        }

        postUpdate(time, delta) {
            if ((!this.isRunning) || (!this.enable)) {
                return;
            }
            // Clear RECOGNIZED after update()
            if (this.state === RECOGNIZED$1) {
                this.state = IDLE$2;
            }
        }

        get isSwiped() {
            return (this.state === RECOGNIZED$1);
        }

        get dragVelocity() {
            var velocity;
            switch (this.dirMode) {
                case 0: velocity = this.getVelocityY(); break; // up & down
                case 1: velocity = this.getVelocityX(); break; // left & right
                default: velocity = this.getVelocity(); break; // 4 dir, 8 dir
            }
            return velocity;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        setVelocityThreshold(velocity) {
            this.velocityThreshold = velocity;
            return this;
        }

        setDirectionMode(m) {
            if (typeof (m) === 'string') {
                m = DIRMODE[m];
            }
            this.dirMode = m;
            return this;
        }

        updateDirectionStates() {
            var angle = RadToDeg$2(this.getVelocityAngle());
            AngleToDirections(angle, this.dirMode, this);
            return this;
        }

        clearDirectionStates() {
            this.left = false;
            this.right = false;
            this.up = false;
            this.down = false;
            return this;
        }
    }

    Object.assign(
        Swipe.prototype,
        VelocityMethods
    );

    const IDLE$2 = 'IDLE';
    const BEGIN$1 = 'BEGIN';
    const RECOGNIZED$1 = 'RECOGNIZED';

    const GetValue$R = Phaser.Utils.Objects.GetValue;
    const SpliceOne = Phaser.Utils.Array.SpliceOne;
    const DistanceBetween$3 = Phaser.Math.Distance.Between;
    const AngleBetween = Phaser.Math.Angle.Between;

    class TwoPointersTracer {
        constructor(gameObject, config) {
            var scene = GetSceneObject(gameObject);
            if (scene === gameObject) {
                gameObject = undefined;
            }

            var amount = scene.input.manager.pointersTotal - 1;
            if (amount < 2) {
                scene.input.addPointer(2 - amount);
            }

            this.scene = scene;
            this.gameObject = gameObject;
            if (gameObject) {
                gameObject.setInteractive(GetValue$R(config, 'inputConfig', undefined));
            }

            // Event emitter
            this.setEventEmitter(GetValue$R(config, 'eventEmitter', undefined));

            this._enable = undefined;
            this.pointers = [];
            this.movedState = {};
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setEnable(GetValue$R(o, "enable", true));
            this.bounds = GetValue$R(o, 'bounds', undefined);

            this.tracerState = TOUCH0;
            this.pointers.length = 0;
            Clear(this.movedState);
            return this;
        }

        boot() {
            if (this.gameObject) {
                this.gameObject.on('pointerdown', this.onPointerDown, this);
            } else {
                this.scene.input.on('pointerdown', this.onPointerDown, this);
            }

            this.scene.input.on('pointerup', this.onPointerUp, this);
            this.scene.input.on('gameout', this.dragCancel, this);

            this.scene.input.on('pointermove', this.onPointerMove, this);
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }

        shutdown() {
            if (!this.scene) {
                return
            }

            this.destroyEventEmitter();
            this.pointers.length = 0;
            Clear(this.movedState);

            if (this.gameObject) ; else {
                this.scene.input.off('pointerdown', this.onPointerDown, this);
            }

            this.scene.input.off('pointerup', this.onPointerUp, this);
            this.scene.input.off('gameout', this.dragCancel, this);

            this.scene.input.off('pointermove', this.onPointerMove, this);
            this.scene.sys.events.off('shutdown', this.destroy, this);
            this.scene = undefined;
            this.gameObject = undefined;
        }

        destroy() {
            this.shutdown();
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.dragCancel();
            }
            this._enable = e;
            return this;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        onPointerDown(pointer) {
            if (!this.enable) {
                return;
            }

            if (this.pointers.length === 2) {
                return;
            }

            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            if (!isInsideBounds) {
                return;
            }

            var index = this.pointers.indexOf(pointer);
            if (index !== -1) { // Already in catched pointers
                return;
            }

            this.movedState[pointer.id] = false;
            this.pointers.push(pointer);
            this.pointerCamera = pointer.camera;

            switch (this.tracerState) {
                case TOUCH0:
                    this.tracerState = TOUCH1;
                    this.onDrag1Start();
                    break;
                case TOUCH1:
                    this.tracerState = TOUCH2;
                    this.onDrag2Start();
                    break;
            }
        }

        onPointerUp(pointer) {
            if (!this.enable) {
                return;
            }

            var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
            if (!isInsideBounds) {
                return;
            }

            var index = this.pointers.indexOf(pointer);
            if (index === -1) { // Not in catched pointers
                return;
            } else {
                delete this.movedState[pointer.id];
                SpliceOne(this.pointers, index);
            }

            switch (this.tracerState) {
                case TOUCH1:
                    this.tracerState = TOUCH0;
                    this.onDrag1End();
                    break;
                case TOUCH2:
                    this.tracerState = TOUCH1;
                    this.onDrag2End();
                    this.onDrag1Start();
                    break;
            }
        }

        onPointerMove(pointer) {
            if (!this.enable) {
                return;
            }

            if (pointer.isDown) {
                var isInsideBounds = (this.bounds) ? this.bounds.contains(pointer.x, pointer.y) : true;
                var isCatchedPointer = (this.pointers.indexOf(pointer) !== -1);
                if (!isCatchedPointer && isInsideBounds) ; else if (isCatchedPointer && !isInsideBounds) { // Pointer moves out of bounds, lose pointer
                    this.onPointerUp(pointer);
                } else {  // Pointer drags in bounds
                    if (!this.movedState[pointer.id]) {
                        this.movedState[pointer.id] = (pointer.x !== pointer.downX) || (pointer.y !== pointer.downY);
                    }
                    if (this.movedState[pointer.id]) {
                        switch (this.tracerState) {
                            case TOUCH1:
                                this.onDrag1();
                                break;
                            case TOUCH2:
                                this.onDrag2();
                                break;
                        }
                    }
                }
            }
        }

        dragCancel() {
            if (this.tracerState === TOUCH2) {
                this.onDrag2End();
            }
            this.pointers.length = 0;
            Clear(this.movedState);
            this.tracerState = TOUCH0;
            return this;
        }

        onDrag1Start() {
            this.emit('drag1start', this);
        }

        onDrag1End() {
            this.emit('drag1end', this);
        }

        onDrag1() {
            this.emit('drag1', this);
        }

        onDrag2Start() {
            this.emit('drag2start', this);
        }

        onDrag2End() {
            this.emit('drag2end', this);
        }

        onDrag2() {
            this.emit('drag2', this);
        }

        get distanceBetween() {
            if (this.tracerState !== TOUCH2) {
                return 0;
            }
            var p0 = this.pointers[0],
                p1 = this.pointers[1];
            return DistanceBetween$3(p0.x, p0.y, p1.x, p1.y);
        }

        get angleBetween() {
            if (this.tracerState !== TOUCH2) {
                return 0;
            }
            var p0 = this.pointers[0],
                p1 = this.pointers[1];
            return AngleBetween(p0.x, p0.y, p1.x, p1.y);
        }

        get drag1Vector() {
            var pointer = this.pointers[0];
            if (pointer && this.movedState[pointer.id]) {
                var p1 = pointer.position;
                var p0 = pointer.prevPosition;
                tmpDragVector.x = p1.x - p0.x;
                tmpDragVector.y = p1.y - p0.y;
            } else {
                tmpDragVector.x = 0;
                tmpDragVector.y = 0;
            }
            return tmpDragVector;
        }

        get centerX() {
            if (this.tracerState !== TOUCH2) {
                return 0;
            }
            var p0 = this.pointers[0].position;
            var p1 = this.pointers[1].position;
            return (p0.x + p1.x) / 2;
        }

        get centerY() {
            if (this.tracerState !== TOUCH2) {
                return 0;
            }
            var p0 = this.pointers[0].position;
            var p1 = this.pointers[1].position;
            return (p0.y + p1.y) / 2;
        }

        get prevCenterX() {
            if (this.tracerState !== TOUCH2) {
                return 0;
            }
            var preP0 = (this.movedState[this.pointers[0].id]) ? this.pointers[0].prevPosition : this.pointers[0].position;
            var preP1 = (this.movedState[this.pointers[1].id]) ? this.pointers[1].prevPosition : this.pointers[1].position;
            return (preP0.x + preP1.x) / 2;
        }

        get prevCenterY() {
            if (this.tracerState !== TOUCH2) {
                return 0;
            }
            var preP0 = (this.movedState[this.pointers[0].id]) ? this.pointers[0].prevPosition : this.pointers[0].position;
            var preP1 = (this.movedState[this.pointers[1].id]) ? this.pointers[1].prevPosition : this.pointers[1].position;
            return (preP0.y + preP1.y) / 2;
        }

        get movementCenterX() {
            return this.centerX - this.prevCenterX;
        }

        get movementCenterY() {
            return this.centerY - this.prevCenterY;
        }

        setRecongizedStateObject(stateObject) {
            this.recongizedState = stateObject;
            return this;
        }

        get state() {
            return this.recongizedState.state;
        }

        set state(newState) {
            this.recongizedState.state = newState;
        }

        cancel() {
            this.state = IDLE$1;
            return this;
        }

        isPointer0InGameObject(gameObject, preTest, postTest) {
            var pointer = this.pointers[0];
            if (!pointer) {
                return false;
            }

            return IsPointerInBounds(gameObject, pointer, preTest, postTest);
        }

        isPointer1InGameObject(gameObject, preTest, postTest) {
            var pointer = this.pointers[1];
            if (!pointer) {
                return false;
            }

            return IsPointerInBounds(gameObject, pointer, preTest, postTest);
        }
    }

    Object.assign(
        TwoPointersTracer.prototype,
        EventEmitterMethods$1
    );

    var tmpDragVector = {};

    const TOUCH0 = 0;
    const TOUCH1 = 1;
    const TOUCH2 = 2;

    const IDLE$1 = 'IDLE';

    Phaser.Utils.Objects.GetValue;

    const RotateAround$3 = Phaser.Math.RotateAround;

    var RotateObjectAround = function (gameObject, x, y, angle) {
        RotateAround$3(gameObject, x, y, angle);
        gameObject.rotation += angle;
        return gameObject;
    };

    var ScreenXYToWorldXY = function (screenX, screenY, camera, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globalOut;
        }

        camera.getWorldPoint(screenX, screenY, out);
        return out;
    };

    var globalOut = {};

    var SpinObject = function (gameObject, camera) {
        if (!this.isRotation) {
            return this;
        }

        if (camera === undefined) {
            camera = this.pointers[0].camera;
        }

        var movementX = this.movementCenterX,
            movementY = this.movementCenterY;

        var worldXY = ScreenXYToWorldXY(this.centerX, this.centerY, camera, true);
        var centerWorldX = worldXY.x;
        var centerWorldY = worldXY.y;

        var angle = this.rotation;
        if (Array.isArray(gameObject)) {
            var gameObjects = gameObject;
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                gameObject = gameObjects[i];
                gameObject.x += movementX;
                gameObject.y += movementY;
                RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
            }
        } else {
            gameObject.x += movementX;
            gameObject.y += movementY;
            RotateObjectAround(gameObject, centerWorldX, centerWorldY, angle);
        }
        return this;
    };

    const GetValue$Q = Phaser.Utils.Objects.GetValue;
    const WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
    const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
    const RadToDeg$1 = Phaser.Math.RadToDeg;
    const DegToRad$4 = Phaser.Math.DegToRad;

    class Rotate extends TwoPointersTracer {
        constructor(gameObject, config) {
            super(gameObject, config);

            var self = this;
            var stateConfig = {
                states: {
                    IDLE: {
                        enter: function () {
                            self.prevAngle = undefined;
                            self.angle = 0;
                        },
                    },
                    BEGIN: {
                    },
                    RECOGNIZED: {
                        enter: function () {
                            self.emit('rotatestart', self);
                        },
                        exit: function () {
                            self.emit('rotateend', self);
                        }
                    }
                },
                init: function () {
                    this.state = IDLE;
                },
                eventEmitter: false,
            };
            this.setRecongizedStateObject(new FSM(stateConfig));
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setDragThreshold(GetValue$Q(o, 'threshold', 0));
            return this;
        }

        onDrag2Start() {
            this.prevAngle = WrapDegrees(RadToDeg$1(this.angleBetween)); // Degrees
            this.state = BEGIN;
            if (this.dragThreshold === 0) {
                this.state = RECOGNIZED;
            }
        }

        onDrag2End() {
            this.state = IDLE;
        }

        onDrag2() {
            switch (this.state) {
                case BEGIN:
                    if ((this.pointers[0].getDistance() >= this.dragThreshold) &&
                        (this.pointers[1].getDistance() >= this.dragThreshold)) {
                        var curAngle = WrapDegrees(RadToDeg$1(this.angleBetween));
                        this.angle = ShortestBetween(this.prevAngle, curAngle);
                        this.prevAngle = curAngle;
                        this.state = RECOGNIZED;
                    }
                    break;
                case RECOGNIZED:
                    var curAngle = WrapDegrees(RadToDeg$1(this.angleBetween));
                    this.angle = ShortestBetween(this.prevAngle, curAngle);
                    this.prevAngle = curAngle;
                    this.emit('rotate', this);
                    break;
            }
        }

        get isRotated() {
            return (this.state === RECOGNIZED);
        }

        get rotation() {
            return DegToRad$4(this.angle);
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

    }

    var methods$a = {
        spinObject: SpinObject,
    };
    Object.assign(
        Rotate.prototype,
        methods$a
    );


    const IDLE = 'IDLE';
    const BEGIN = 'BEGIN';
    const RECOGNIZED = 'RECOGNIZED';

    const GetValue$P = Phaser.Utils.Objects.GetValue;

    var TapChild = function (config) {
        var tapConfig = GetValue$P(config, 'tap', undefined);
        if (tapConfig === false) {
            return;
        } else if (tapConfig === true) {
            tapConfig = undefined;
        }

        var childrenInteractive = this._childrenInteractive;
        this._tap = new Tap(this, tapConfig);
        this._tap
            .on('tap', function (tap, gameObject, lastPointer) {
                EmitChildEvent(
                    childrenInteractive.eventEmitter,
                    `${childrenInteractive.eventNamePrefix}${tap.tapsCount}tap`,
                    childrenInteractive.targetSizers,
                    childrenInteractive.targetMode,
                    tap.worldX, tap.worldY,
                    lastPointer, tap
                );

                EmitChildEvent(
                    childrenInteractive.eventEmitter,
                    `${childrenInteractive.eventNamePrefix}tap`,
                    childrenInteractive.targetSizers,
                    childrenInteractive.targetMode,
                    tap.worldX, tap.worldY,
                    lastPointer, tap
                );
            }, this);
    };

    const GetValue$O = Phaser.Utils.Objects.GetValue;

    var PressChild = function (config) {
        var pressConfig = GetValue$O(config, 'press', undefined);
        if (pressConfig === false) {
            return;
        } else if (pressConfig === true) {
            pressConfig = undefined;
        }

        var childrenInteractive = this._childrenInteractive;
        this._press = new Press(this, pressConfig);
        this._press
            .on('pressstart', function (press, gameObject, lastPointer) {
                EmitChildEvent(
                    childrenInteractive.eventEmitter,
                    `${childrenInteractive.eventNamePrefix}pressstart`,
                    childrenInteractive.targetSizers,
                    childrenInteractive.targetMode,
                    press.worldX, press.worldY,
                    lastPointer, press
                );
            }, this)
            .on('pressend', function (press, gameObject, lastPointer) {
                EmitChildEvent(
                    childrenInteractive.eventEmitter,
                    `${childrenInteractive.eventNamePrefix}pressend`,
                    childrenInteractive.targetSizers,
                    childrenInteractive.targetMode,
                    press.worldX, press.worldY,
                    lastPointer, press
                );
            }, this);
    };

    const GetValue$N = Phaser.Utils.Objects.GetValue;

    var SwipeChild = function (config) {
        var swipeConfig = GetValue$N(config, 'swipe', undefined);
        if (swipeConfig === false) {
            return;
        } else if (swipeConfig === true) {
            swipeConfig = undefined;
        }

        if (swipeConfig === undefined) {
            swipeConfig = {};
        }
        if (!swipeConfig.hasOwnProperty('dir')) {
            swipeConfig.dir = '4dir';
        }

        var childrenInteractive = this._childrenInteractive;
        this._swipe = new Swipe(this, swipeConfig);
        this._swipe
            .on('swipe', function (swipe, gameObject, lastPointer) {
                var dirName =
                    (swipe.left) ? 'left' :
                        (swipe.right) ? 'right' :
                            (swipe.up) ? 'up' :
                                'down';
                EmitChildEvent(
                    childrenInteractive.eventEmitter,
                    `${childrenInteractive.eventNamePrefix}swipe${dirName}`,
                    childrenInteractive.targetSizers,
                    childrenInteractive.targetMode,
                    swipe.worldX, swipe.worldY,
                    lastPointer, swipe
                );

                EmitChildEvent(
                    childrenInteractive.eventEmitter,
                    `${childrenInteractive.eventNamePrefix}swipe`,
                    childrenInteractive.targetSizers,
                    childrenInteractive.targetMode,
                    swipe.worldX, swipe.worldY,
                    lastPointer, swipe
                );
            }, this);
    };

    const GetValue$M = Phaser.Utils.Objects.GetValue;

    var SetChildrenInteractive$1 = function (gameObject, config) {
        gameObject.setInteractive();

        if (GetValue$M(config, 'dropZone', false)) {
            gameObject.input.dropZone = true;
        }

        gameObject._childrenInteractive = {
            targetSizers: GetValue$M(config, 'targets', [gameObject]),
            targetMode: GetValue$M(config, 'targetMode', 'parent'),
            eventEmitter: GetValue$M(config, 'eventEmitter', gameObject),
            eventNamePrefix: GetValue$M(config, 'inputEventPrefix', 'child.')
        };

        DownChild.call(gameObject, config);
        UpChild.call(gameObject, config);
        OverChild.call(gameObject, config);
        ClickChild.call(gameObject, config);
        TapChild.call(gameObject, config);
        PressChild.call(gameObject, config);
        SwipeChild.call(gameObject, config);

        return gameObject;
    };

    var SetChildrenInteractiveWrap = function (config) {    
        SetChildrenInteractive$1(this, config);
        return this;
    };

    var BroadcastEvent = function () {
        var gameObjects = this.getAllChildren([this]);
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            gameObject.emit.apply(gameObject, arguments);
        }
        return this;
    };

    var methods$9 = {
        getSizerConfig: GetSizerConfig,
        getChildPrevState: GetChildPrevState,
        pushIntoBounds: PushIntoBounds,
        drawBounds: DrawBounds,
        resolveWidth: ResolveWidth$3,
        hasWidthWrap: HasWidthWrap$2,
        resolveChildrenWidth: ResolveChildrenWidth$1,
        runWidthWrap: RunWidthWrap$3,
        resolveHeight: ResolveHeight$3,
        hasHeightWrap: HasHeightWrap$2,
        resolveChildrenHeight: ResolveChildrenHeight$1,
        runHeightWrap: RunHeightWrap$3,
        getChildWidth: GetChildWidth,
        getChildHeight: GetChildHeight,
        getExpandedChildWidth: GetExpandedChildWidth$3,
        getExpandedChildHeight: GetExpandedChildHeight$3,

        getChildrenWidth: GetChildrenWidth$4,
        getChildrenHeight: GetChildrenHeight$4,
        addChildrenMap: AddChildrenMap,
        addElement: AddChildrenMap,
        removeChildrenMap: RemoveChildrenMap,
        getElement: GetElement,
        getChildIndex: GetChildIndex,
        getAllChildrenSizers: GetAllChildrenSizers,
        getChildrenSizers: GetChildrenSizers$4,
        preLayout: PreLayout$3,
        layout: Layout,
        runLayout: RunLayout,
        layoutChildren: LayoutChildren$4,

        layoutBackgrounds: LayoutBackgrounds,
        postLayout: PostLayout,

        setAnchor: SetAnchor,
        isInTouching: IsInTouching,
        pointToChild: PointToChild,
        setDraggable: SetDraggable,
        setChildrenInteractive: SetChildrenInteractiveWrap,
        broadcastEvent: BroadcastEvent,

    };

    Object.assign(
        methods$9,
        PaddingMethods,
        AddChildMethods$5,
        RemoveChildMethods$5,
        GetParentSizerMethods,
        methods$e,
        methods$d,
        methods$c,
        ShakeMethods,
        EaseDataMethods,
        DelayCallMethods$1,
        ClickMethods,
        ClickOutsideMethods,
        TouchingMethods,
        HoverMethods,
        HideMethods,
        ModalMethods,
        GetShownChildrenMethods,
        BindEventMethods,
    );

    const GetValue$L = Phaser.Utils.Objects.GetValue;

    let Base$1 = class Base extends ContainerLite {
        constructor(scene, x, y, minWidth, minHeight, config) {
            super(scene, x, y, 1, 1);
            this.isRexSizer = true;

            var origin = GetValue$L(config, 'origin', 0.5);
            var originX = GetValue$L(config, 'originX', origin);
            var originY = GetValue$L(config, 'originY', origin);
            this.setOrigin(originX, originY);

            this.setMinSize(minWidth, minHeight);
            this.setName(GetValue$L(config, 'name', ''));
            this.rexSizer = {};
            this.space = {};
            this.backgroundChildren = undefined;
            this.sizerChildren = undefined; // [] or {}
            this.childrenMap = {};
            this.layoutedChildren = undefined;

            // FixWidthSizer uses these flag
            this.runChildrenWrapFlag = false;

            this.enableLayoutWarn(false);

            var anchorConfig = GetValue$L(config, 'anchor', undefined);
            if (anchorConfig) {
                this.setAnchor(anchorConfig);
            }

            this.setInnerPadding(GetValue$L(config, 'space', 0));

            var draggable = GetValue$L(config, 'draggable', false);
            if (draggable) {
                this.setDraggable(draggable);
            }

            this.setSizerEventsEnable(GetValue$L(config, 'sizerEvents', false));
            this.setDirty(true);

            if (GetValue$L(config, 'enableLayer', false)) {
                this.enableLayer();
            }
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            if (fromScene) {
                // In this case, children will be cleared and destroy in scene level
                var sizers = this.getAllChildrenSizers([this]);
                for (var i = 0, cnt = sizers.length; i < cnt; i++) {
                    sizers[i].sizerEventsEnable = false;
                }
            }

            super.destroy(fromScene);

            Clear(this.backgroundChildren);
            Clear(this.sizerChildren);
            this.childrenMap = undefined;
            this.space = undefined;
            this.rexSizer = undefined;
            this.layoutedChildren = undefined;
        }

        setMinSize(minWidth, minHeight) {
            this.setMinWidth(minWidth).setMinHeight(minHeight);
            return this;
        }

        setMinWidth(minWidth) {
            if (minWidth == null) {
                minWidth = 0;
            }
            this.minWidth = minWidth;
            return this;
        }

        setMinHeight(minHeight) {
            if (minHeight == null) {
                minHeight = 0;
            }
            this.minHeight = minHeight;
            return this;
        }

        setDirty(dirty) {
            if (dirty === undefined) {
                dirty = true;
            }
            this.dirty = dirty;
            return this;
        }

        setSizerEventsEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.sizerEventsEnable = enable;
            return this;
        }

        enableLayoutWarn(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.layoutWarnEnable = enable;
            return this;
        }

        get ignoreLayout() {
            // Skip hidden or !dirty sizer
            return this.rexSizer.hidden || (!this.dirty);
        }

        get childrenWidth() {
            if (this._childrenWidth === undefined) {
                this._childrenWidth = this.getChildrenWidth();
            }
            return this._childrenWidth;
        }

        get childrenHeight() {
            if (this._childrenHeight === undefined) {
                this._childrenHeight = this.getChildrenHeight();
            }
            return this._childrenHeight;
        }

        get left() {
            return this.x - (GetDisplayWidth(this) * this.originX);
        }

        set left(value) {
            this.x += (value - this.left);
        }

        alignLeft(value) {
            this.left = value;
            return this;
        }

        get right() {
            return this.left + GetDisplayWidth(this);
        }

        set right(value) {
            this.x += (value - this.right);
        }

        alignRight(value) {
            this.right = value;
            return this;
        }

        get centerX() {
            return this.left + (GetDisplayWidth(this) / 2);
        }

        set centerX(value) {
            this.x += (value - this.centerX);
        }

        alignCenterX(value) {
            this.centerX = value;
            return this;
        }

        get top() {
            return this.y - (GetDisplayHeight(this) * this.originY);
        }

        set top(value) {
            this.y += (value - this.top);
        }

        alignTop(value) {
            this.top = value;
            return this;
        }

        get bottom() {
            return this.top + GetDisplayHeight(this);
        }

        set bottom(value) {
            this.y += (value - this.bottom);
        }

        alignBottom(value) {
            this.bottom = value;
            return this;
        }

        get centerY() {
            return this.top + (GetDisplayHeight(this) / 2);
        }

        set centerY(value) {
            this.y += (value - this.centerY);
        }

        alignCenterY(value) {
            this.centerY = value;
            return this;
        }

        get innerLeft() {
            return this.left + (this.space.left * this.scaleX);
        }

        get innerRight() {
            return this.right - (this.space.right * this.scaleX);
        }

        get innerTop() {
            return this.top + (this.space.top * this.scaleY);
        }

        get innerBottom() {
            return this.bottom - (this.space.bottom * this.scaleY);
        }

        get innerWidth() {
            return (this.width - this.space.left - this.space.right) * this.scaleX;
        }

        get innerHeight() {
            return (this.height - this.space.top - this.space.bottom) * this.scaleY;
        }

        get minInnerWidth() {
            var result = (this.minWidth - this.space.left - this.space.right) * this.scaleX;
            return Math.max(result, 0);
        }

        get minInnerHeight() {
            var result = (this.minHeight - this.space.top - this.space.bottom) * this.scaleY;
            return Math.max(result, 0);
        }
    };

    Object.assign(
        Base$1.prototype,
        methods$9
    );

    var GetChildrenWidth$3 = function (minimumMode) {
        if (this.rexSizer.hidden) {
            return 0;
        }

        if (minimumMode === undefined) {
            minimumMode = true;
        }

        var result = 0;
        var children = this.sizerChildren;
        var child, sizerConfig, proportion, padding, childWidth;
        var hasUnknownChildWidth = false;
        this.childrenProportion; // To update this.hasProportion0Child member

        if (this.orientation === 0) { // x
            // Get summation of minimum width
            var isFirstChild = true;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (!child.hasOwnProperty('rexSizer')) {
                    continue;
                }

                sizerConfig = child.rexSizer;
                if (sizerConfig.hidden) {
                    continue;
                }

                proportion = sizerConfig.proportion;
                if ((proportion === 0) || minimumMode) {
                    childWidth = this.getChildWidth(child);
                    if ((sizerConfig.fitRatio > 0) && (!sizerConfig.resolved)) {
                        childWidth = undefined;
                    }

                    if (childWidth === undefined) {
                        if ((proportion !== 0) && (!this.hasProportion0Child)) {
                            childWidth = 0;
                        } else {
                            hasUnknownChildWidth = true;
                        }
                    }
                } else {
                    childWidth = 0;
                }

                if (hasUnknownChildWidth) {
                    continue;
                }

                padding = child.rexSizer.padding;
                childWidth += (padding.left + padding.right) * this.scaleX;

                if (isFirstChild) {
                    isFirstChild = false;
                } else {
                    childWidth += (this.space.item * this.scaleX);
                }

                result += childWidth;
            }
        } else {
            // Get maximun width
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (!child.hasOwnProperty('rexSizer')) {
                    continue;
                }

                sizerConfig = child.rexSizer;
                if (sizerConfig.hidden) {
                    continue;
                }

                childWidth = this.getChildWidth(child);
                if (childWidth === undefined) {
                    hasUnknownChildWidth = true;
                }

                if (hasUnknownChildWidth) {
                    continue;
                }

                padding = sizerConfig.padding;
                childWidth += (padding.left + padding.right) * this.scaleX;

                result = Math.max(childWidth, result);
            }
        }

        if (hasUnknownChildWidth) {
            return undefined;
        }

        return result + (this.space.left + this.space.right) * this.scaleX;
    };

    var GetChildrenHeight$3 = function (minimumMode) {
        if (this.rexSizer.hidden) {
            return 0;
        }

        if (minimumMode === undefined) {
            minimumMode = true;
        }

        var result = 0;
        var children = this.sizerChildren;
        var child, sizerConfig, proportion, padding, childHeight;
        var hasUnknownChildHeight = false;
        this.childrenProportion; // To update this.hasProportion0Child member

        if (this.orientation === 0) { // x
            // Get maximun height
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (!child.hasOwnProperty('rexSizer')) {
                    continue;
                }

                sizerConfig = child.rexSizer;
                if (sizerConfig.hidden) {
                    continue;
                }

                childHeight = this.getChildHeight(child);
                if (childHeight === undefined) {
                    hasUnknownChildHeight = true;
                }

                if (hasUnknownChildHeight) {
                    continue;
                }

                padding = sizerConfig.padding;
                childHeight += (padding.top + padding.bottom) * this.scaleY;
                result = Math.max(childHeight, result);
            }
        } else {
            // Get summation of minimum height
            var isFirstChild = true;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (!child.hasOwnProperty('rexSizer')) {
                    continue;
                }

                sizerConfig = child.rexSizer;
                if (sizerConfig.hidden) {
                    continue;
                }

                proportion = sizerConfig.proportion;
                if ((proportion === 0) || minimumMode) {
                    childHeight = this.getChildHeight(child);
                    if ((sizerConfig.fitRatio > 0) && (!sizerConfig.resolved)) {
                        childHeight = undefined;
                    }

                    if (childHeight === undefined) {
                        if ((proportion !== 0) && (!this.hasProportion0Child)) {
                            childHeight = 0;
                        } else {
                            hasUnknownChildHeight = true;
                        }
                    }
                } else {
                    childHeight = 0;
                }

                if (hasUnknownChildHeight) {
                    continue;
                }

                padding = sizerConfig.padding;
                childHeight += (padding.top + padding.bottom) * this.scaleY;

                if (isFirstChild) {
                    isFirstChild = false;
                } else {
                    childHeight += (this.space.item * this.scaleY);
                }

                result += childHeight;
            }
        }

        if (hasUnknownChildHeight) {
            return undefined;
        }

        return result + (this.space.top + this.space.bottom) * this.scaleY;
    };

    var GetExpandedChildWidth$2 = function (child, parentWidth) {
        if (parentWidth === undefined) {
            parentWidth = this.width * this.scaleX;
        }

        var childWidth;
        var sizerConfig = child.rexSizer;
        if (this.orientation === 0) { // x
            if ((sizerConfig.proportion > 0) && (this.proportionLength > 0)) {
                childWidth = (sizerConfig.proportion * this.proportionLength);
            }
        } else { // y
            if (sizerConfig.expand) {
                var space = this.space;
                var innerWidth = parentWidth - (space.left + space.right) * this.scaleX;
                var padding = sizerConfig.padding;
                childWidth = innerWidth - (padding.left + padding.right) * this.scaleX;
            }
        }
        return childWidth;
    };

    var GetExpandedChildHeight$2 = function (child, parentHeight) {
        if (parentHeight === undefined) {
            parentHeight = this.height;
        }

        var childHeight;
        var sizerConfig = child.rexSizer;
        if (this.orientation === 0) { // x
            if (sizerConfig.expand) {
                var space = this.space;
                var innerHeight = parentHeight - ((space.top + space.bottom) * this.scaleY);
                var padding = sizerConfig.padding;
                childHeight = innerHeight - ((padding.top + padding.bottom) * this.scaleY);
            }
        } else { // y
            if ((sizerConfig.proportion > 0) && (this.proportionLength > 0)) {
                childHeight = (sizerConfig.proportion * this.proportionLength);
            }
        }
        return childHeight;
    };

    var GetChildrenSizers$3 = function(out) {
        if (out === undefined) {
            out = [];
        }
        var children = this.sizerChildren,
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.isRexSizer) {
                out.push(child);
            }
        }
        return out;
    };

    var PreLayout$2 = function () {
        // Resize child to 1x1 for ratio-fit 
        this.hasRatioFitChild = false;
        var child, sizerConfig;
        var children = this.sizerChildren;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            sizerConfig = child.rexSizer;
            if (sizerConfig.hidden) {
                continue;
            }

            if (sizerConfig.fitRatio > 0) {
                ResizeGameObject(child, 0, 0);
                sizerConfig.resolved = false;
                this.hasRatioFitChild = true;
            }

        }

        this._childrenProportion = undefined;
        this.hasProportion0Child = false;
        this.proportionLength = undefined; // Display proportion-length, contains scale
        PreLayout$3.call(this);
        return this;
    };

    var CheckSize = function (child, parent) {
        if (child.layoutWarnEnable) {
            if (child.width < child.childrenWidth) {
                // Warning
                console.warn(`Layout width error: Parent=${parent.constructor.name}, Child=${child.constructor.name}`);
            }
            if (child.height < child.childrenHeight) {
                // Warning
                console.warn(`Layout height error: Parent=${parent.constructor.name}, Child=${child.constructor.name}`);
            }
        }
    };

    const Wrap$1 = Phaser.Math.Wrap;

    var LayoutChildren$3 = function () {
        var children = this.sizerChildren;
        var child, childConfig, padding;
        var startX = this.innerLeft,
            startY = this.innerTop;
        var innerWidth = this.innerWidth;
        var innerHeight = this.innerHeight;
        var itemX = startX,
            itemY = startY;
        var x, y, width, height, alignOffsetX, alignOffsetY; // Align zone
        var childWidth, childHeight;
        var childIndex, startChildIndex = this.startChildIndex;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            if (startChildIndex === 0) {
                childIndex = i;
            } else {
                childIndex = Wrap$1((i + startChildIndex), 0, cnt);
            }

            if (this.rtl) {
                childIndex = cnt - childIndex - 1;
            }

            child = children[childIndex];
            if (child.rexSizer.hidden) {
                continue;
            }

            childConfig = child.rexSizer;
            padding = childConfig.padding;

            PreLayoutChild.call(this, child);

            // Set size
            if (child.isRexSpace) {
                childWidth = 0;
                childHeight = 0;
            } else {
                childWidth = this.getExpandedChildWidth(child);
                childHeight = this.getExpandedChildHeight(child);
            }
            if (child.isRexSizer) {
                child.runLayout(this, childWidth, childHeight);
                CheckSize(child, this);
            } else {
                ResizeGameObject(child, childWidth, childHeight);
            }

            if (childWidth === undefined) {
                childWidth = GetDisplayWidth(child);
            }
            if (childHeight === undefined) {
                childHeight = GetDisplayHeight(child);
            }

            // Set position
            if (this.orientation === 0) { // x
                x = itemX + (padding.left * this.scaleX);
                if ((childConfig.proportion === 0) || (this.proportionLength === 0)) {
                    width = childWidth;
                } else {
                    width = (childConfig.proportion * this.proportionLength);
                }

                y = itemY + (padding.top * this.scaleY);
                height = innerHeight - ((padding.top + padding.bottom) * this.scaleY);
            } else { // y
                x = itemX + (padding.left * this.scaleX);
                width = innerWidth - ((padding.left + padding.right) * this.scaleX);

                y = itemY + (padding.top * this.scaleY);
                if ((childConfig.proportion === 0) || (this.proportionLength === 0)) {
                    height = childHeight;
                } else {
                    height = (childConfig.proportion * this.proportionLength);
                }
            }

            if (childWidth === undefined) {
                childWidth = GetDisplayWidth(child);
            }
            if (childHeight === undefined) {
                childHeight = GetDisplayHeight(child);
            }
            alignOffsetX = (childConfig.alignOffsetX + (childConfig.alignOffsetOriginX * childWidth)) * this.scaleX;
            alignOffsetY = (childConfig.alignOffsetY + (childConfig.alignOffsetOriginY * childHeight)) * this.scaleY;

            LayoutChild.call(this,
                child, x, y, width, height, childConfig.align,
                alignOffsetX, alignOffsetY
            );

            if (this.orientation === 0) { // x
                itemX += (width + ((padding.left + padding.right) * this.scaleX) + (this.space.item * this.scaleX));
            } else { // y
                itemY += (height + ((padding.top + padding.bottom) * this.scaleY) + (this.space.item * this.scaleY));
            }
        }

    };

    var ResolveWidth$1 = function (width) {
        var width = ResolveWidth$3.call(this, width);

        // Calculate proportionLength
        if ((width !== undefined) && (this.orientation === 0) && (this.proportionLength === undefined)) {
            var remainder = width - this.childrenWidth;
            if (remainder > 0) {
                remainder = width - this.getChildrenWidth(false);
                this.proportionLength = remainder / this.childrenProportion;
            } else {
                this.proportionLength = 0;
            }
        }

        return width;
    };

    var ResolveHeight$1 = function (height) {
        var height = ResolveHeight$3.call(this, height);

        // Get proportionLength
        if ((height !== undefined) && (this.orientation === 1) && (this.proportionLength === undefined)) {
            var remainder = height - this.childrenHeight;
            if (remainder > 0) {
                remainder = height - this.getChildrenHeight(false);            
                this.proportionLength = remainder / this.childrenProportion;
            } else {
                this.proportionLength = 0;
            }
        }

        return height;
    };

    var HasWidthWrap$1 = function () {
        if (this.hasRatioFitChild && (this.orientation === 1)) {
            return true;
        }

        return HasWidthWrap$2.call(this);
    };

    var ExpandFitRatioChildren = function (width, height) {
        if (!this.hasRatioFitChild) {
            return;
        }

        var innerHeight;
        if (this.orientation === 0) {
            innerHeight = height - ((this.getInnerPadding('top') + this.getInnerPadding('bottom')) * this.scaleY);
        } else {
            width - ((this.getInnerPadding('left') + this.getInnerPadding('right')) * this.scaleX);
        }

        var child, sizerConfig;
        var childWidth, childHeight;
        var children = this.sizerChildren;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            var sizerConfig = child.rexSizer;
            if (sizerConfig.hidden) {
                continue;
            }

            var fitRatio = sizerConfig.fitRatio;
            if (!fitRatio) {
                continue;
            }

            if (this.orientation === 0) {
                // Set child width by child height 
                childHeight = innerHeight - ((this.getChildOuterPadding(child, 'top') + this.getChildOuterPadding(child, 'bottom')) * this.scaleY);
                childWidth = childHeight * fitRatio;
            } else {
                // Set child height by child width
                childWidth = innerHeight - ((this.getChildOuterPadding(child, 'top') + this.getChildOuterPadding(child, 'bottom')) * this.scaleX);
                childHeight = childWidth / fitRatio;
            }

            ResizeGameObject(child, childWidth, childHeight);
            if (child.isRexSizer) {
                child.setMinSize(childWidth, childHeight);
            }

            sizerConfig.resolved = true;
        }
    };

    var RunWidthWrap$2 = function (width) {
        if (this.wrapResult) {
            // Already got wrapResult
            return;
        }

        if (this.orientation === 1) {
            ExpandFitRatioChildren.call(this, width, undefined);
        }

        RunWidthWrap$3.call(this, width);
    };

    var HasHeightWrap$1 = function () {
        if (this.hasRatioFitChild && (this.orientation === 0)) {
            return true;
        }

        return HasHeightWrap$2.call(this);
    };

    var RunHeightWrap$2 = function (height) {
        if (this.wrapResult) {
            // Already got wrapResult
            return;
        }

        if (this.orientation === 0) {
            ExpandFitRatioChildren.call(this, undefined, height);
        }

        RunHeightWrap$3.call(this, height);
    };

    const Zone = Phaser.GameObjects.Zone;

    let Space$1 = class Space extends Zone {
        constructor(scene) {
            super(scene, 0, 0, 1, 1);
            // Don't add Zone into scene
            this.isRexSpace = true;
        }
    };

    var GetNearestChildIndex$1 = function (x, y) {
        var children = this.sizerChildren;
        if (children.length === 0) {
            return -1;
        }

        var nearestIndex = -1,
            minDistance = Infinity;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var distance;
            if (this.orientation === 0) { // x
                distance = Math.abs(child.left - x);
            } else {
                distance = Math.abs(child.top - y);
            }

            if (minDistance > distance) {
                minDistance = distance;
                nearestIndex = i;
            }
        }

        // Check right bound of last child
        var child = children[children.length - 1];
        var distance;
        if (this.orientation === 0) { // x
            distance = Math.abs(child.right - x);
        } else {
            distance = Math.abs(child.bottom - y);
        }

        if (minDistance > distance) {
            minDistance = distance;
            nearestIndex = i + 1;
        }

        return nearestIndex;
    };

    const IsPlainObject$c = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$K = Phaser.Utils.Objects.GetValue;
    const ALIGN_CENTER$2 = Phaser.Display.Align.CENTER;
    const PROPORTIONMODE = {
        min: 0,
        full: -1,
    };

    var Add$5 = function (
        gameObject,
        proportion, align, paddingConfig, expand,
        childKey, index,
        minWidth, minHeight,
        fitRatio
    ) {
        var offsetX, offsetY;
        var offsetOriginX, offsetOriginY;

        AddChild$2.call(this, gameObject);

        var isRexSpace = gameObject.isRexSpace;
        var proportionType = typeof (proportion);
        if (proportion === null) {
            return this;
        } else if (proportionType === 'number') ; else if (proportionType === 'string') {
            proportion = PROPORTIONMODE[proportion];
        } else if (IsPlainObject$c(proportion)) {
            var config = proportion;
            proportion = GetValue$K(config, 'proportion', undefined);
            align = GetValue$K(config, 'align', ALIGN_CENTER$2);
            paddingConfig = GetValue$K(config, 'padding', 0);
            expand = GetValue$K(config, 'expand', false);
            childKey = GetValue$K(config, 'key', undefined);
            index = GetValue$K(config, 'index', undefined);

            if (!gameObject.isRexSizer) {
                minWidth = GetValue$K(config, 'minWidth', undefined);
                minHeight = GetValue$K(config, 'minHeight', undefined);
            }

            fitRatio = GetValue$K(config, 'fitRatio', 0);  // width/height

            offsetX = GetValue$K(config, 'offsetX', 0);
            offsetY = GetValue$K(config, 'offsetY', 0);
            offsetOriginX = GetValue$K(config, 'offsetOriginX', 0);
            offsetOriginY = GetValue$K(config, 'offsetOriginY', 0);
        }

        if (typeof (align) === 'string') {
            align = AlignConst[align];
        }

        if (proportion === undefined) {
            proportion = (isRexSpace) ? 1 : 0;
        }
        if (align === undefined) {
            align = ALIGN_CENTER$2;
        }
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }
        if (expand === undefined) {
            expand = false;
        }

        if (minWidth === undefined) {
            if (isRexSpace) {
                minWidth = 0;
            } else if (!gameObject.isRexSizer) {
                minWidth = gameObject._minWidth;
            }
        }
        if (minHeight === undefined) {
            if (isRexSpace) {
                minHeight = 0;
            } else if (!gameObject.isRexSizer) {
                minHeight = gameObject._minHeight;
            }
        }

        if ((fitRatio === undefined) || (fitRatio === false)) {
            fitRatio = 0;
        } else if (fitRatio === true) {
            fitRatio = GetDisplayWidth(gameObject) / GetDisplayHeight(gameObject);
        }

        if (offsetX === undefined) {
            offsetX = 0;
        }
        if (offsetY === undefined) {
            offsetY = 0;
        }
        if (offsetOriginX === undefined) {
            offsetOriginX = 0;
        }
        if (offsetOriginY === undefined) {
            offsetOriginY = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.proportion = proportion;
        config.align = align;
        config.padding = GetBoundsConfig$1(paddingConfig);
        config.expand = expand;
        config.fitRatio = (proportion === 0) ? fitRatio : 0;
        config.alignOffsetX = offsetX;
        config.alignOffsetY = offsetY;
        config.alignOffsetOriginX = offsetOriginX;
        config.alignOffsetOriginY = offsetOriginY;

        if ((index === undefined) || (index >= this.sizerChildren.length)) {
            this.sizerChildren.push(gameObject);
        } else {
            this.sizerChildren.splice(index, 0, gameObject);
        }

        if (!gameObject.isRexSizer) { // Expand normal game object
            if (proportion > 0) {
                if (this.orientation === 0) { // x
                    // minWidth is still undefined, uses current display width
                    gameObject.minWidth = (minWidth === undefined) ? GetDisplayWidth(gameObject) : minWidth;
                } else {
                    // minHeight is still undefined, uses current display height
                    gameObject.minHeight = (minHeight === undefined) ? GetDisplayHeight(gameObject) : minHeight;
                }
            }
            if (expand) {
                if (this.orientation === 0) { // x
                    // Might have minHeight value, or still undefined
                    gameObject.minHeight = minHeight;
                } else {
                    // Might have minWidth value, or still undefined
                    gameObject.minWidth = minWidth;
                }
            }
        }

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject);
        }

        return this;
    };

    var AddChildMethods$4 = {
        add: Add$5, // sizer.add could be override

        addSpace(proportion) {
            this.insertSpace(undefined, proportion);
            return this;
        },

        insertSpace(index, proportion) {
            if (proportion === undefined) {
                proportion = 1;
            }
            Add$5.call(this, new Space$1(this.scene),
                {
                    proportion: proportion,
                    minWidth: 0,
                    minHeight: 0,
                    index: index
                }
            );
            // No problem if sizer.add is override
            return this;
        },

        insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
            if (IsPlainObject$c(proportion)) {
                proportion.index = index;
            }

            Add$5.call(this, gameObject, proportion, align, paddingConfig, expand, childKey, index, minSize);
            // No problem if sizer.add is override
            return this;
        },

        insertAtPosition(x, y, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
            var index = GetNearestChildIndex$1.call(this, x, y);
            if (index === -1) {
                index = undefined;
            }
            this.insert(index, gameObject, proportion, align, paddingConfig, expand, childKey, minSize);
            return this;
        }
    };

    const ContainerClear = ContainerLite.prototype.clear;

    var ClearChildren = function (destroyChild) {
        if (this.backgroundChildren) {
            this.backgroundChildren.length = 0;
        }

        var fireRemoveEvent = !destroyChild && this.sizerEventsEnable;
        var children;
        if (fireRemoveEvent) {
            children = this.getChildren([]);
        }

        ContainerClear.call(this, destroyChild);

        if (fireRemoveEvent) {
            var gameObject;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                gameObject = children[i];
                gameObject.emit('sizer.remove', gameObject, this);
                this.emit('remove', gameObject, this);
            }
        }
        return this;
    };

    const RemoveItem$5 = Phaser.Utils.Array.Remove;

    var RemoveChildMethods$4 = {
        remove(gameObject, destroyChild) {
            if (this.getParentSizer(gameObject) !== this) {
                return this;
            }

            RemoveItem$5(this.sizerChildren, gameObject);
            RemoveChild$1.call(this, gameObject, destroyChild);
            return this;
        },

        removeAll(destroyChild) {
            for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
                this.remove(this.sizerChildren[i], destroyChild);
            }
            return this;
        },

        clear(destroyChild) {
            this.sizerChildren.length = 0;
            ClearChildren.call(this, destroyChild);
            return this;
        }
    };

    var AlignMethods = {
        getChildAlign(gameObject) {
            return this.getSizerConfig(gameObject).align;
        },

        setChildAlign(gameObject, align) {
            if (typeof (align) === 'string') {
                align = AlignConst[align];
            }

            this.getSizerConfig(gameObject).align = align;
            return this;
        },

    };

    var ProportionMethods = {
        getChildProportion(gameObject) {
            return this.getSizerConfig(gameObject).proportion;
        },

        setChildProportion(gameObject, proportion) {
            this.getSizerConfig(gameObject).proportion = proportion;
            return this;
        },

    };

    var ExpandMethods = {
        getChildExpand(gameObject) {
            return this.getSizerConfig(gameObject).expand;
        },

        setChildExpand(gameObject, expand) {
            this.getSizerConfig(gameObject).expand = expand;
            return this;
        },

    };

    var SetChildrenAlignMode = function (mode) {
        if (mode === undefined) {
            mode = 'left';
        }

        var children = this.sizerChildren;

        var firstChild = children[0];
        var isFirstChildASpace = firstChild && firstChild.isRexSpace;

        if (    // Has left space
            (mode === 'right') ||
            (mode === 'bottom') ||
            (mode === 'center')
        ) {
            if (!isFirstChildASpace) {
                this.insertSpace(0);
            }

        } else {  // Does not have left space
            if (isFirstChildASpace) {
                this.remove(firstChild, true);
            }
        }

        var lastChildIndex = children.length - 1;
        var lastChild = children[lastChildIndex];
        var isLastChildASpace = lastChild && lastChild.isRexSpace;
        if (mode === 'center') {   // Has right space
            if (!isLastChildASpace) {
                this.insertSpace(lastChildIndex + 1);
            }

        } else {  // Does not have right space
            if (isLastChildASpace) {
                this.remove(lastChild, true);
            }
        }

        return this;
    };

    var SortChildrenMethods = {
        sortChildren(callback) {
            this.sizerChildren.sort(callback);
            return this;
        },

        sortChildrenByData(key, descending) {
            this.sizerChildren.sort(function (childA, childB) {
                var valueA = childA.getData(key);
                var valueB = childB.getData(key);
                if (descending) {
                    return valueB - valueA;
                } else {
                    return valueA - valueB;
                }
            });
            return this;
        },

        sortChildrenByProperty(key, descending) {
            this.sizerChildren.sort(function (childA, childB) {
                var valueA = childA[key];
                var valueB = childB[key];
                if (descending) {
                    return valueB - valueA;
                } else {
                    return valueA - valueB;
                }
            });
            return this;
        },
    };

    var methods$8 = {
        getChildrenWidth: GetChildrenWidth$3,
        getChildrenHeight: GetChildrenHeight$3,
        getExpandedChildWidth: GetExpandedChildWidth$2,
        getExpandedChildHeight: GetExpandedChildHeight$2,
        getChildrenSizers: GetChildrenSizers$3,
        preLayout: PreLayout$2,
        layoutChildren: LayoutChildren$3,
        resolveWidth: ResolveWidth$1,
        resolveHeight: ResolveHeight$1,
        hasWidthWrap: HasWidthWrap$1,
        runWidthWrap: RunWidthWrap$2,
        hasHeightWrap: HasHeightWrap$1,
        runHeightWrap: RunHeightWrap$2,

        setChildrenAlignMode: SetChildrenAlignMode,
    };

    Object.assign(
        methods$8,
        AddChildMethods$4,
        RemoveChildMethods$4,
        AlignMethods,
        ProportionMethods,
        ExpandMethods,
        SortChildrenMethods,
    );

    var GetChildrenProportion = function () {
        var result = 0;
        var children = this.sizerChildren;
        var child, proportion;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child.rexSizer.hidden) {
                continue;
            }
            proportion = child.rexSizer.proportion;
            if (proportion > 0) {
                result += proportion;
            } else if (proportion === 0) {
                this.hasProportion0Child = true;
            }
        }
        return result;
    };

    var OrientationMode = {
        x: 0,
        h: 0,
        horizontal: 0,
        'left-to-right': 0,

        y: 1,
        v: 1,
        vertical: 1,
        'top-to-bottom': 1
    };

    var GetOrientationMode = function (orientation) {
        if (typeof (orientation) === 'string') {
            orientation = OrientationMode[orientation];
        }
        return orientation;
    };

    const IsPlainObject$b = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$J = Phaser.Utils.Objects.GetValue;

    class Sizer extends Base$1 {
        constructor(scene, x, y, minWidth, minHeight, orientation, config) {
            if (IsPlainObject$b(x)) {
                config = x;
                x = GetValue$J(config, 'x', 0);
                y = GetValue$J(config, 'y', 0);
                minWidth = GetValue$J(config, 'width', undefined);
                minHeight = GetValue$J(config, 'height', undefined);
                orientation = GetValue$J(config, 'orientation', 0);
            } else if (IsPlainObject$b(minWidth)) {
                config = minWidth;
                minWidth = GetValue$J(config, 'width', undefined);
                minHeight = GetValue$J(config, 'height', undefined);
                orientation = GetValue$J(config, 'orientation', 0);
            } else if (IsPlainObject$b(orientation)) {
                config = orientation;
                orientation = GetValue$J(config, 'orientation', 0);
            }

            if (orientation === undefined) {
                orientation = 0;
            }
            super(scene, x, y, minWidth, minHeight, config);

            this.type = 'rexSizer';
            this.sizerChildren = [];
            this.setOrientation(orientation);
            this.setItemSpacing(GetValue$J(config, 'space.item', 0));
            this.setStartChildIndex(GetValue$J(config, 'startChildIndex', 0));
            this.setRTL(GetValue$J(config, 'rtl', false));

            this.addChildrenMap('items', this.sizerChildren);
        }

        setOrientation(orientation) {
            this.orientation = GetOrientationMode(orientation);
            return this;
        }

        setItemSpacing(space) {
            this.space.item = space;
            return this;
        }

        setStartChildIndex(index) {
            this.startChildIndex = index;
            return this;
        }

        setRTL(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.rtl = enable;
            return this;
        }

        get childrenProportion() {
            if (this._childrenProportion === undefined) {
                this._childrenProportion = GetChildrenProportion.call(this);
            }
            return this._childrenProportion;
        }
    }

    Object.assign(
        Sizer.prototype,
        methods$8
    );

    var SetDisplaySize = function (gameObject, width, height) {
        if (!gameObject) {
            return;
        }

        var unknownWidth = (width == null);
        var unknownHeight = (height == null);

        if (unknownWidth && unknownHeight) {
            return gameObject;
        }

        if (!unknownWidth) {
            gameObject.displayWidth = width;
        }

        if (!unknownHeight) {
            gameObject.displayHeight = height;
        }

        if (unknownWidth) {
            gameObject.scaleX = gameObject.scaleY;
        }

        if (unknownHeight) {
            gameObject.scaleY = gameObject.scaleX;
        }

        return gameObject;
    };

    var AppendText$1 = function (value, addCR) {
        if (!value && value !== 0) {
            value = '';
        }

        if (addCR === undefined) {
            addCR = true;
        }

        if (Array.isArray(value)) {
            value = value.join('\n');
        }

        var newText;
        if (addCR) {
            newText = `${this.text}\n${value}`;
        } else {
            newText = `${this.text}${value}`;
        }

        if (newText != this.text) {
            this.setText(newText);
        }

        return this;
    };

    var ResetDisplayContent = function (config) {
        if (config === undefined) {
            config = {};
        } else if (typeof (config) === 'string') {
            config = {
                text: config,
            };
        }

        var text = config.text || '';
        this.setText(text);

        var iconGameObjct = this.childrenMap.icon;
        if (iconGameObjct) {
            if (!config.icon) {
                this.hide(iconGameObjct);
            } else {
                this.show(iconGameObjct);
            }
            var iconSize = config.iconSize;
            if (iconSize) {
                this.setChildDisplaySize(iconGameObjct, iconSize, iconSize);

                if (this.iconWidth !== undefined) {
                    this.setIconSize(iconSize);
                }
            }
            if (config.icon !== true) {
                this.setIconTexture(config.icon, config.iconFrame);
            }
        }

        var actionGameObjct = this.childrenMap.action;
        if (actionGameObjct) {
            if (!config.action) {
                this.hide(actionGameObjct);
            } else {
                this.show(actionGameObjct);
            }
            var actionSize = config.actionSize;
            if (actionSize) {
                this.setChildDisplaySize(actionGameObjct, actionSize, actionSize);

                if (this.actionWidth !== undefined) {
                    this.setActionSize(actionSize);
                }

            }
            if (config.action !== true) {
                this.setActionTexture(config.action, config.actionFrame);
            }
        }

        return this;
    };

    var methods$7 = {
        appendText: AppendText$1,
        resetDisplayContent: ResetDisplayContent,
    };

    class LabelBase extends Sizer {
        /*
        Elements in childrenMap: 
        
        - background
        - icon, iconMask
        - text, 
        - action, actionMask
        */

        // Access text game object
        get text() {
            var textObject = this.childrenMap.text;
            if (!textObject) {
                return '';
            }
            return textObject.text;
        }

        set text(value) {
            var textObject = this.childrenMap.text;
            if (!textObject) {
                return;
            }
            textObject.setText(value);
        }

        setText(value) {
            this.text = value;
            return this;
        }

        // Access icon game object
        setIconTexture(key, frame) {
            var imageObject = this.childrenMap.icon;
            if (!imageObject || !imageObject.setTexture) {
                return this;
            }
            imageObject.setTexture(key, frame);

            if ((this.iconWidth !== undefined) && (this.iconHeight !== undefined)) {
                SetDisplaySize(imageObject, this.iconWidth, this.iconHeight);
                this.resetChildScaleState(imageObject);
            }

            return this;
        }

        setTexture(key, frame) {
            this.setIconTexture(key, frame);
            return this;
        }

        setIconSize(width, height) {
            if (height === undefined) {
                height = width;
            }

            this.iconWidth = width;
            this.iconHeight = height;

            return this;
        }

        get texture() {
            var imageObject = this.childrenMap.icon;
            if (!imageObject) {
                return undefined;
            }
            return imageObject.texture;
        }

        get frame() {
            var imageObject = this.childrenMap.icon;
            if (!imageObject) {
                return undefined;
            }
            return imageObject.frame;
        }

        setActionTexture(key, frame) {
            var imageObject = this.childrenMap.action;
            if (!imageObject || !imageObject.setTexture) {
                return this;
            }
            imageObject.setTexture(key, frame);

            if ((this.actionWidth !== undefined) && (this.actionHeight !== undefined)) {
                SetDisplaySize(imageObject, this.actionWidth, this.actionHeight);
                this.resetChildScaleState(imageObject);
            }

            return this;
        }

        get actionTexture() {
            var imageObject = this.childrenMap.action;
            if (!imageObject) {
                return undefined;
            }
            return imageObject.texture;
        }

        get actionFrame() {
            var imageObject = this.childrenMap.action;
            if (!imageObject) {
                return undefined;
            }
            return imageObject.frame;
        }

        setActionSize(width, height) {
            if (height === undefined) {
                height = width;
            }

            this.actionWidth = width;
            this.actionHeight = height;

            return this;
        }

        preLayout() {
            var icon = this.childrenMap.icon;
            if (icon && (this.iconWidth !== undefined) && (this.iconHeight !== undefined)) {
                SetDisplaySize(icon, this.iconWidth, this.iconHeight);
            }

            var action = this.childrenMap.action;
            if (action && (this.actionWidth !== undefined) && (this.actionHeight !== undefined)) {
                SetDisplaySize(action, this.actionWidth, this.actionHeight);
            }

            super.preLayout();
        }

        postLayout(parent, newWidth, newHeight) {
            // Pin icon-mask to icon game object
            var iconMask = this.childrenMap.iconMask;
            if (iconMask) {
                iconMask.setPosition();
                this.resetChildPositionState(iconMask);
            }
            // Pin action-mask to action game object
            var actionMask = this.childrenMap.actionMask;
            if (actionMask) {
                actionMask.setPosition();
                this.resetChildPositionState(actionMask);
            }
            super.postLayout(parent, newWidth, newHeight);
            return this;
        }

        resize(width, height) {
            super.resize(width, height);
            // Resize icon-mask to icon game object
            var iconMask = this.childrenMap.iconMask;
            if (iconMask) {
                iconMask.resize();
            }
            // Resize action-mask to icon game object
            var actionMask = this.childrenMap.actionMask;
            if (actionMask) {
                actionMask.resize();
            }
            return this;
        }
    }

    Object.assign(
        LabelBase.prototype,
        methods$7,
    );

    const SetPositionBase = Phaser.GameObjects.Graphics.prototype.setPosition;

    var SetPosition$1 = function (x, y) {
        var parent = this.parent;
        if (x === undefined) {
            x = parent.x;
        }
        if (y === undefined) {
            y = parent.y;
        }

        SetPositionBase.call(this, x, y);
        return this;
    };

    const RectangleGeom = Phaser.Geom.Rectangle;
    const CircleGemo = Phaser.Geom.Circle;

    var GetGeom = function (shapeType, width, height, padding, originX, originY, out) {
        switch (shapeType) {
            case 1: // circle
                // Assume that all padding are the same value in this circle shape
                padding = padding.left;
                var centerX = -width * (originX - 0.5);
                var centerY = -height * (originY - 0.5);
                var radius = Math.min(width, height) / 2 + padding;

                if ((out === undefined) || !(out instanceof (CircleGemo))) {
                    out = new CircleGemo();
                }
                out.setTo(centerX, centerY, radius);
                break;

            default: // 0|'rectangle'
                var topLeftX = -(width * originX) - padding.left;
                var topLeftY = -(height * originY) - padding.top;
                var rectWidth = width + padding.left + padding.right;
                var rectHeight = height + padding.top + padding.bottom;

                if ((out === undefined) || !(out instanceof (RectangleGeom))) {
                    out = new RectangleGeom();
                }
                out.setTo(topLeftX, topLeftY, rectWidth, rectHeight);
                break;
        }

        return out;
    };

    var DrawShape = function (width, height, padding, originX, originY) {
        this.geom = GetGeom(this.shapeType, width, height, padding, originX, originY, this.geom);

        this.clear().fillStyle(0xffffff);
        switch (this.shapeType) {
            case 1: // circle
                // Assume that all padding are the same value in this circle shape
                this.fillCircleShape(this.geom);
                break;

            default: // 0|'rectangle'
                this.fillRectShape(this.geom);
                break;
        }
    };

    var IsKeyValueEqual = function (objA, objB) {
        for (var key in objA) {
            if (!(key in objB)) {
                return false;
            }

            if (objA[key] !== objB[key]) {
                return false;
            }
        }

        for (var key in objB) {
            if (!(key in objA)) {
                return false;
            }
        }

        return true;
    };

    var Resize = function (width, height, padding) {
        var parent = this.parent;
        if (width === undefined) {
            width = parent.width;
        }
        if (height === undefined) {
            height = parent.height;
        }

        if (padding === undefined) {
            padding = this.padding;
        } else if (typeof (padding) === 'number') {
            padding = GetBoundsConfig(padding);
        }

        var isSizeChanged = (this.width !== width) || (this.height !== height);
        var isPaddingChanged = (this.padding !== padding) && !IsKeyValueEqual(this.padding, padding);
        if (!isSizeChanged && !isPaddingChanged) {
            return this;
        }

        this.width = width;
        this.height = height;

        if (isPaddingChanged) {
            Clone(padding, this.padding);
        }

        // Graphics does not have originX, originY properties
        this.originX = parent.originX;
        this.originY = parent.originY;

        DrawShape.call(this,
            width, height, padding,
            parent.originX, parent.originY
        );

        return this;
    };

    var SetOrigin = function (originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var parent = this.parent;
        if (originX === undefined) {
            originX = parent.originX;
        }
        if (originY === undefined) {
            originY = parent.originY;
        }
        if ((this.originX === originX) && (this.originY === originY)) {
            return this;
        }

        this.originX = originX;
        this.originY = originY;

        DrawShape.call(this,
            this.width, this.height, this.padding,
            originX, originY,
        );
        return this;
    };

    var Contains$1 = function (x, y) {
        x -= this.x;
        y -= this.y;
        return this.geom.contains(x, y);
    };

    var Methods$7 = {
        setPosition: SetPosition$1,
        resize: Resize,
        setOrigin: SetOrigin,
        contains: Contains$1,
    };

    const Graphics = Phaser.GameObjects.Graphics;

    class DefaultMaskGraphics extends Graphics {
        constructor(parent, shapeType, padding) {
            if (shapeType === undefined) {
                shapeType = 0;
            }
            if (typeof (shapeType) === 'string') {
                shapeType = SHAPEMODE[shapeType];
            }

            super(parent.scene);
            this.parent = parent;
            this.shapeType = shapeType;
            this.padding = GetBoundsConfig$1(padding);
            this.setPosition().resize().setVisible(false);
            // Don't add it to display list
        }

        destroy() {
            this.parent = undefined;
            super.destroy();
            return this;
        }
    }

    const SHAPEMODE = {
        rectangle: 0,
        circle: 1,
    };

    Object.assign(
        DefaultMaskGraphics.prototype,
        Methods$7
    );

    var AddChildMask = function (maskTarget, sizeTarget, shape, padding) {
        var maskGameObject = new DefaultMaskGraphics(sizeTarget, shape, padding); // A Graphics game object
        if (maskTarget && !maskTarget.isRexSizer) { // Sizer game object can't apply mask
            var mask = maskGameObject.createGeometryMask();
            maskTarget.setMask(mask);
            this.once('destroy', function () {
                maskTarget.setMask();
                mask.destroy();
            });
        }
        this.pin(maskGameObject);
        return maskGameObject;
    };

    const TextClass = Phaser.GameObjects.Text;

    var IsTextGameObject = function (gameObject) {
        return (gameObject instanceof TextClass);
    };

    const BitmapTextClass = Phaser.GameObjects.BitmapText;

    var IsBitmapTextGameObject = function (gameObject) {
        return (gameObject instanceof BitmapTextClass);
    };

    const TextType = 0;
    const TagTextType = 1;
    const BitmapTextType = 2;

    var GetTextObjectType = function (textObject) {
        var textObjectType;
        if (IsBitmapTextGameObject(textObject)) {
            textObjectType = BitmapTextType;
        } else if (IsTextGameObject(textObject)) {
            textObjectType = TextType;
        } else {
            textObjectType = TagTextType;
        }

        return textObjectType;
    };

    var RE_ASCII = /^[\x00-\x7F]+$/;
    var IsASCIIString = function (s) {
        return RE_ASCII.test(s);
    };

    var TextWrapByCharCallback = function (text, textObject) {
        var output = [];

        var textLines = text.split('\n');
        var style = textObject.style;
        var wrapWidth = style.wordWrapWidth;
        var wrapMode = (style.hasOwnProperty('wrapMode')) ? style.wrapMode : 3;
        var context = textObject.context;
        for (var i = 0, cnt = textLines.length; i < cnt; i++) {
            WrapLine(context, textLines[i], wrapWidth, wrapMode, output);
        }

        return output;
    };

    var GetTokenArray = function (text, wrapMode) {
        var tokenArray;

        if (wrapMode === 2) {  // CHAR_WRAP
            tokenArray = text.split('');
        } else {  // MIX_WRAP
            tokenArray = [];
            var words = text.split(' '), word;
            for (var i = 0, wordCount = words.length; i < wordCount; i++) {
                word = words[i];

                if (i < (wordCount - 1)) {
                    if (IsASCIIString(word)) {
                        tokenArray.push(word + ' ');
                    } else {
                        tokenArray.push(...word.split(''));
                        // Add space as last token
                        tokenArray.push(' ');
                    }

                } else {  // The last word
                    if (word !== '') {
                        if (IsASCIIString(word)) {
                            tokenArray.push(word);
                        } else {
                            tokenArray.push(...word.split(''));
                        }
                    }

                }

            }
        }

        return tokenArray;
    };

    var WrapLine = function (context, text, wrapWidth, wrapMode, output) {
        if (text.length <= 100) {
            var textWidth = context.measureText(text).width;
            if (textWidth <= wrapWidth) {
                output.push(text);
                return output;
            }
        }

        var tokenArray = GetTokenArray(text, wrapMode);

        var token, tokenWidth;
        var line = [], remainderLineWidth = wrapWidth;
        for (var j = 0, tokenLen = tokenArray.length; j < tokenLen; j++) {
            token = tokenArray[j];
            tokenWidth = context.measureText(token).width;

            remainderLineWidth -= tokenWidth;
            if (remainderLineWidth < 0) {
                output.push(line.join(''));
                line.length = 0;
                remainderLineWidth = wrapWidth - tokenWidth;
            }

            line.push(token);
        }

        if (line.length > 0) {
            output.push(line.join(''));
        }

        return output;
    };

    var CONST = {
        // new line mode
        NO_NEWLINE: 0,
        RAW_NEWLINE: 1,
        WRAPPED_NEWLINE: 2,

        // wrap mode
        NO_WRAP: 0,
        WORD_WRAP: 1,
        CHAR_WRAP: 2,
        MIX_WRAP: 3,

        // split lines
        SPLITREGEXP: /(?:\r\n|\r|\n)/
    };

    const WRAPMODE$1 = {
        none: CONST.NO_WRAP,
        word: CONST.WORD_WRAP,
        char: CONST.CHAR_WRAP,
        character: CONST.CHAR_WRAP,
        mix: CONST.MIX_WRAP
    };

    var SetWrapMode = function (textObject, mode) {
        var textObjectType = GetTextObjectType(textObject);
        switch (textObjectType) {
            case TextType:
                if (typeof mode === 'string') {
                    mode = WRAPMODE$1[mode] || 0;
                }

                textObject.style.wrapMode = mode;
                switch (mode) {
                    case 2:  // CHAR_WRAP
                    case 3:  // MIX_WRAP
                        textObject.style.wordWrapCallback = TextWrapByCharCallback;
                        break;

                    case 1:  // WORD_WRAP
                    default:  // NO_WRAP
                        textObject.style.wordWrapCallback = null;
                        break;
                }

                break;

            case TagTextType:
                if (typeof mode === 'string') {
                    mode = WRAPMODE$1[mode] || 0;
                }
                textObject.style.wrapMode = mode;
                break;


        }
    };

    // copy from Phaser.GameObjects.Text

    const Utils$2 = Phaser.Renderer.WebGL.Utils;

    var WebGLRenderer$1 = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateTexture();
            src.dirty = false;
        }

        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        var frame = src.frame;
        var width = frame.width;
        var height = frame.height;
        var getTint = Utils$2.getTintAppendFloatAlpha;
        var pipeline = renderer.pipelines.set(src.pipeline, src);
        var textureUnit = pipeline.setTexture2D(frame.glTexture, src);

        renderer.pipelines.preBatch(src);

        pipeline.batchTexture(
            src,
            frame.glTexture,
            width, height,
            src.x, src.y,
            width / src.resolution, height / src.resolution,
            src.scaleX, src.scaleY,
            src.rotation,
            src.flipX, src.flipY,
            src.scrollFactorX, src.scrollFactorY,
            src.displayOriginX, src.displayOriginY,
            0, 0, width, height,
            getTint(src.tintTopLeft, camera.alpha * src._alphaTL),
            getTint(src.tintTopRight, camera.alpha * src._alphaTR),
            getTint(src.tintBottomLeft, camera.alpha * src._alphaBL),
            getTint(src.tintBottomRight, camera.alpha * src._alphaBR),
            src.tintFill,
            0, 0,
            camera,
            parentMatrix,
            false,
            textureUnit
        );

        renderer.pipelines.postBatch(src);
    };

    // copy from Phaser.GameObjects.Text

    var CanvasRenderer$1 = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateTexture();
            src.dirty = false;
        }

        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        renderer.batchSprite(src, src.frame, camera, parentMatrix);
    };

    var Render$2 = {
        renderWebGL: WebGLRenderer$1,
        renderCanvas: CanvasRenderer$1

    };

    const Color = Phaser.Display.Color;

    var CanvasMethods = {
        clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.dirty = true;
            return this;
        },

        fill(color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.dirty = true;
            return this;
        },

        drawFrame(key, frame, dx, dy, dWidth, dHeight, sxOffset, syOffset, sWidth, sHeight) {

            var textureFrame = this.scene.sys.textures.getFrame(key, frame);
            if (!textureFrame) {
                return this;
            }

            var frameWidth = textureFrame.cutWidth,
                frameHeight = textureFrame.cutHeight;

            if (dx === undefined) { dx = 0; }
            if (dy === undefined) { dy = 0; }
            if (dWidth === undefined) { dWidth = frameWidth; }
            if (dHeight === undefined) { dHeight = frameHeight; }
            if (sxOffset === undefined) { sxOffset = 0; }
            if (syOffset === undefined) { syOffset = 0; }
            if (sWidth === undefined) { sWidth = frameWidth; }
            if (sHeight === undefined) { sHeight = frameHeight; }

            var sx = textureFrame.cutX + sxOffset;
            var sy = textureFrame.cutY + syOffset;

            this.context.drawImage(
                textureFrame.source.image,  // image
                sx, sy, sWidth, sHeight,
                dx, dy, dWidth, dHeight
            );

            this.dirty = true;

            return this;
        },

        getDataURL(type, encoderOptions) {
            return this.canvas.toDataURL(type, encoderOptions);
        },

        getPixel(x, y, out) {
            if (out === undefined) {
                out = new Color();
            }
            var rgb = this.context.getImageData(x, y, 1, 1);
            out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3]);
            return out;
        },

        setPixel(x, y, r, g, b, a) {
            if (typeof (r) !== 'number') {
                var color = r;
                r = color.red;
                g = color.green;
                b = color.blue;
                a = color.alpha;
            }

            if (a === undefined) {
                a = ((r !== 0) || (g !== 0) || (b !== 0)) ? 255 : 0;
            }

            var imgData = this.context.createImageData(1, 1);
            imgData.data[0] = r;
            imgData.data[1] = g;
            imgData.data[2] = b;
            imgData.data[3] = a;
            this.context.putImageData(imgData, x, y);
            this.dirty = true;
            return this;
        }
    };

    var CopyCanvasToTexture = function (scene, srcCanvas, key, x, y, width, height) {
        var textures = scene.sys.textures;
        var renderer = scene.renderer;

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = srcCanvas.width;
        }
        if (height === undefined) {
            height = srcCanvas.height;
        }

        var texture;
        if (textures.exists(key)) {
            texture = textures.get(key);
        } else {
            texture = textures.createCanvas(key, width, height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d', { willReadFrequently: true });
        destCtx.clearRect(0, 0, width, height);
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (renderer.gl && texture) {
            renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }
    };

    var TextureMethods = {
        updateTexture(callback, scope) {
            if (callback) {
                var scale = this.resolution;
                if (scale !== 1) {
                    this.context.save();
                    this.context.scale(scale, scale);
                }

                if (scope) {
                    callback.call(scope, this.canvas, this.context);
                } else {
                    callback(this.canvas, this.context);
                }

                if (scale !== 1) {
                    this.context.restore();
                }
            }

            if ((this.canvas.width !== this.frame.width) || (this.canvas.height !== this.frame.height)) {
                this.frame.setSize(this.canvas.width, this.canvas.height);
            }
            if (this.renderer && this.renderer.gl) {
                this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
                if (typeof WEBGL_DEBUG) {
                    this.frame.glTexture.spectorMetadata = { textureKey: 'Canvas Game Object' };
                }
            }
            this.dirty = false;

            var input = this.input;
            if (input && !input.customHitArea) {
                input.hitArea.width = this.width;
                input.hitArea.height = this.height;
            }
            return this;
        },

        generateTexture(key, x, y, width, height) {
            var srcCanvas = this.canvas;
            if (width === undefined) {
                width = srcCanvas.width;
            } else {
                width *= this.resolution;
            }
            if (height === undefined) {
                height = srcCanvas.height;
            } else {
                height *= this.resolution;
            }

            CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);

            return this;
        },

        loadTexture(key, frame) {
            var textureFrame = this.scene.sys.textures.getFrame(key, frame);
            if (!textureFrame) {
                return this;
            }

            if ((this.width !== textureFrame.cutWidth) || (this.height !== textureFrame.cutHeight)) {
                this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
            } else {
                this.clear();
            }

            this.drawFrame(key, frame);
            this.dirty = true;
            return this;
        }

    };

    CheckP3Version();

    const CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
    const GameObject$1 = Phaser.GameObjects.GameObject;
    const UUID = Phaser.Utils.String.UUID;

    class Canvas extends GameObject$1 {
        constructor(scene, x, y, width, height, resolution) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 1;
            }
            if (height === undefined) {
                height = 1;
            }
            if (resolution === undefined) {
                resolution = 1;
            }

            super(scene, 'rexCanvas');

            this.renderer = scene.sys.game.renderer;

            this._width = width;
            this._height = height;
            this.resolution = resolution;

            width = Math.max(Math.ceil(width * this.resolution), 1);
            height = Math.max(Math.ceil(height * this.resolution), 1);
            this.canvas = CanvasPool$1.create(this, width, height);
            this.context = this.canvas.getContext('2d', { willReadFrequently: true });

            this.dirty = false;

            this.setPosition(x, y);
            this.setOrigin(0.5, 0.5);
            this.initPipeline();
            this.initPostPipeline(true);

            this._crop = this.resetCropObject();

            //  Create a Texture for this Text object
            this._textureKey = UUID();

            this.texture = scene.sys.textures.addCanvas(this._textureKey, this.canvas);

            //  Get the frame
            this.frame = this.texture.get();

            //  Set the resolution
            this.frame.source.resolution = this.resolution;

            if (this.renderer && this.renderer.gl) {
                //  Clear the default 1x1 glTexture, as we override it later
                this.renderer.deleteTexture(this.frame.source.glTexture);
                this.frame.source.glTexture = null;
            }

            this.dirty = true;
        }

        preDestroy() {
            CanvasPool$1.remove(this.canvas);

            this.canvas = null;
            this.context = null;

            var texture = this.texture;

            if (texture) {
                texture.destroy();
            }
        }

        setResolution(resolution) {
            if (this.resolution === resolution) {
                return this;
            }

            this.resolution = resolution;

            var width = Math.max(Math.ceil(this.width * resolution), 1);
            var height = Math.max(Math.ceil(this.height * resolution), 1);
            this.canvas.width = width;
            this.canvas.height = height;

            this.frame.source.resolution = resolution;
            this.dirty = true;

            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.setSize(value, this._height);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.setSize(this._width, value);
        }

        setCanvasSize(width, height) {
            if ((this._width === width) && (this._height === height)) {
                return this;
            }

            this._width = width;
            this._height = height;

            this.updateDisplayOrigin();

            width = Math.max(Math.ceil(width * this.resolution), 1);
            height = Math.max(Math.ceil(height * this.resolution), 1);
            this.canvas.width = width;
            this.canvas.height = height;

            this.frame.setSize(width, height);

            this.dirty = true;
            return this;
        }

        // setSize might be override
        setSize(width, height) {
            this.setCanvasSize(width, height);
            return this;
        }

        get displayWidth() {
            return this.scaleX * this._width;
        }

        set displayWidth(value) {
            this.scaleX = value / this._width;
        }

        get displayHeight() {
            return this.scaleY * this._height;
        }

        set displayHeight(value) {
            this.scaleY = value / this._height;
        }

        setDisplaySize(width, height) {
            this.displayWidth = width;
            this.displayHeight = height;
            return this;
        }

        getCanvas(readOnly) {
            if (!readOnly) {
                this.dirty = true;
            }
            return this.canvas;
        }

        getContext(readOnly) {
            if (!readOnly) {
                this.dirty = true;
            }
            return this.context;
        }

        needRedraw() {
            this.dirty = true;
            return this;
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }
    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Canvas,
        [
            Components.Alpha,
            Components.BlendMode,
            Components.Crop,
            Components.Depth,
            Components.Flip,
            Components.GetBounds,
            Components.Mask,
            Components.Origin,
            Components.Pipeline,
            Components.PostPipeline,
            Components.ScrollFactor,
            Components.Tint,
            Components.Transform,
            Components.Visible,
            Render$2,
            CanvasMethods,
            TextureMethods,
        ]
    );

    var DataMethods = {
        enableData() {
            if (this.data === undefined) {
                this.data = {};
            }
            return this;
        },

        setData(key, value) {
            this.enableData();
            if (arguments.length === 1) {
                var data = key;
                for (key in data) {
                    this.data[key] = data[key];
                }
            } else {
                this.data[key] = value;
            }
            return this;
        },

        getData(key, defaultValue) {
            this.enableData();
            return (key === undefined) ? this.data : GetValue$15(this.data, key, defaultValue);
        },

        incData(key, inc, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) + inc);
            return this;
        },

        mulData(key, mul, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) * mul);
            return this;
        },

        clearData() {
            if (this.data) {
                Clear(this.data);
            }
            return this;
        },
    };

    class Base {
        constructor(parent, type) {
            this.setParent(parent);
            this.type = type;
            this.renderable = false;

            this.reset().setActive();
        }

        destroy() {
            this.parent.removeChild(this);
        }

        setParent(parent) {
            this.parent = parent;
            return this;
        }

        get scene() {
            return this.parent.scene;
        }

        get canvas() {
            return (this.parent) ? this.parent.canvas : null;
        }

        get context() {
            return (this.parent) ? this.parent.context : null;
        }

        setDirty(dirty) {
            if (dirty && this.parent) {
                this.parent.dirty = true;
            }
            return this;
        }

        get active() {
            return this._active;
        }

        set active(value) {
            this.setDirty(this._active != value);
            this._active = value;
        }

        setActive(active) {
            if (active === undefined) {
                active = true;
            }
            this.active = active;
            return this;
        }

        modifyPorperties(o) {
            return this;
        }

        // Override
        onFree() {
            this.reset().setParent();
        }

        // Override
        reset() {
            return this;
        }

        // Override
        render() { }

        // Override
        contains(x, y) {
            return false;
        }
    }

    Object.assign(
        Base.prototype,
        DataMethods
    );

    var RenderMethods = {
        // Override
        renderContent() {

        },

        // Override
        render() {
            if (!this.willRender) {
                return this;
            }

            var context = this.context;
            context.save();
            context.globalAlpha = this.alpha;

            if (this.toLocalPosition) {
                var x = this.drawX, y = this.drawY;
                if (this.autoRound) {
                    x = Math.round(x);
                    y = Math.round(y);
                }

                context.translate(x, y);
                context.scale(this.scaleX, this.scaleY);
                context.rotate(this.rotation);
            }

            if (this.drawBelowCallback) {
                this.drawBelowCallback(this);
            }

            this.renderContent();

            if (this.drawAboveCallback) {
                this.drawAboveCallback(this);
            }

            context.restore();

            return this;
        },
    };

    const RotateAround$2 = Phaser.Math.RotateAround;

    var CanvasPositionToBobPosition = function (canvasX, canvasY, bob, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (globPoint$1 === undefined) {
                globPoint$1 = {};
            }
            out = globPoint$1;
        }

        out.x = (canvasX - bob.drawX) / bob.scaleX;
        out.y = (canvasY - bob.drawY) / bob.scaleY;

        if (bob.rotation !== 0) {
            RotateAround$2(out, 0, 0, -bob.rotation);
        }
        return out;
    };

    var globPoint$1;

    const Rectangle = Phaser.Geom.Rectangle;

    var Contains = function (canvasX, canvasY) {
        if ((this.width === 0) || (this.height === 0)) {
            return false;
        }

        var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
        return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
    };

    var GetBobBounds = function (bob) {
        if (bobBounds === undefined) {
            bobBounds = new Rectangle();
        }

        var x = bob.drawTLX,
            y = bob.drawTLY;
        bobBounds.setTo(x, y, (bob.drawTRX - x), (bob.drawBLY - y));

        return bobBounds;
    };

    var bobBounds;

    const RotateAround$1 = Phaser.Math.RotateAround;

    var BobPositionToCanvasPosition = function (bob, bobX, bobY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (globPoint === undefined) {
                globPoint = {};
            }
            out = globPoint;
        }

        out.x = bobX;
        out.y = bobY;

        if (bob.rotation !== 0) {
            RotateAround$1(out, 0, 0, bob.rotation);
        }

        out.x = (out.x * bob.scaleX) + bob.drawX;
        out.y = (out.y * bob.scaleY) + bob.drawY;

        return out;
    };

    var globPoint;

    const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;

    var GameObjectLocalXYToWorldXY = function (gameObject, localX, localY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        var px = localX - (gameObject.width * gameObject.originX);
        var py = localY - (gameObject.height * gameObject.originY);

        if (tempMatrix === undefined) {
            tempMatrix = new TransformMatrix();
            parentMatrix = new TransformMatrix();
        }

        if (gameObject.parentContainer) {
            gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
        }
        else {
            tempMatrix.applyITRS(gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY);
        }

        tempMatrix.transformPoint(px, py, out);

        return out;
    };

    var tempMatrix, parentMatrix;
    var globOut = {};

    var BobPositionToWorldPosition = function (dynamicText, bob, bobX, bobY, out) {
        var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
        var worldXY = GameObjectLocalXYToWorldXY(dynamicText, localXY.x, localXY.y, out);
        return worldXY;
    };

    var GetBobWorldPosition = function (dynamicText, bob, offsetX, offsetY, out) {
        if (typeof (offsetX) !== 'number') {
            out = offsetX;
            offsetX = 0;
            offsetY = 0;
        }
        var bobX = bob.drawCenterX + offsetX;
        var bobY = bob.drawCenterY + offsetY;
        return BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out);
    };

    var GetWorldPosition = function (offsetX, offsetY, out) {
        return GetBobWorldPosition(this.parent, this, offsetX, offsetY, out);
    };

    var Methods$6 = {
        contains: Contains,
        getWorldPosition: GetWorldPosition,
    };

    Object.assign(
        Methods$6,
        RenderMethods
    );

    const DegToRad$3 = Phaser.Math.DegToRad;
    const RadToDeg = Phaser.Math.RadToDeg;
    const GetValue$I = Phaser.Utils.Objects.GetValue;

    class RenderBase extends Base {
        constructor(parent, type) {
            super(parent, type);

            this.renderable = true;
            this.scrollFactorX = 1;
            this.scrollFactorY = 1;
            this.toLocalPosition = true;
            this.originX = 0;
            this.offsetX = 0;  // Override
            this.offsetY = 0;  // Override
        }

        get visible() {
            return this._visible;
        }

        set visible(value) {
            this.setDirty(this._visible != value);
            this._visible = value;
        }

        setVisible(visible) {
            if (visible === undefined) {
                visible = true;
            }

            this.visible = visible;
            return this;
        }

        get alpha() { return this._alpha; }

        set alpha(value) {
            this.setDirty(this._alpha != value);
            this._alpha = value;
        }

        setAlpha(alpha) {
            this.alpha = alpha;
            return this;
        }

        get x() { return this._x; }

        set x(value) {
            this.setDirty(this._x != value);
            this._x = value;
        }

        setX(x) {
            this.x = x;
            return this;
        }

        get y() { return this._y; }

        set y(value) {
            this.setDirty(this._y != value);
            this._y = value;
        }

        setY(y) {
            this.y = y;
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setInitialPosition(x, y) {
            this.x0 = x;
            this.y0 = y;
            return this;
        }

        setScrollFactorX(x) {
            this.scrollFactorX = x;
            return this;
        }

        setScrollFactorY(y) {
            this.scrollFactorY = y;
            return this;
        }

        setScrollFactor(x, y) {
            if (y === undefined) {
                y = x;
            }
            this.scrollFactorX = x;
            this.scrollFactorY = y;
            return this;
        }

        get rotation() { return this._rotation; }

        set rotation(value) {
            this.setDirty(this._rotation != value);
            this._rotation = value;
        }

        setRotation(rotation) {
            this.rotation = rotation;
            return this;
        }

        get angle() { return RadToDeg(this._rotation); }

        set angle(value) {
            this.rotation = DegToRad$3(value);
        }

        setAngle(angle) {
            this.angle = angle;
            return this;
        }

        get scaleX() { return this._scaleX; }

        set scaleX(value) {
            this.setDirty(this._scaleX !== value);
            this._scaleX = value;
        }

        setScaleX(scaleX) {
            this.scaleX = scaleX;
            return this;
        }

        // Override
        get width() { return 0; }

        // Override
        set width(value) { }

        setWidth(width, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.width = width;

            if (keepAspectRatio) {
                this.scaleY = this.scaleX;
            }
            return this;
        }

        get leftSpace() { return this._leftSpace; }

        set leftSpace(value) {
            this.setDirty(this._leftSpace !== value);
            this._leftSpace = value;
        }

        setLeftSpace(value) {
            this.leftSpace = value;
            return this;
        }

        get rightSpace() { return this._rightSpace; }

        set rightSpace(value) {
            this.setDirty(this._rightSpace !== value);
            this._rightSpace = value;
        }

        setRightSpace(value) {
            this.rightSpace = value;
            return this;
        }

        get outerWidth() {
            return this.width + this.leftSpace + this.rightSpace;
        }

        get scaleY() { return this._scaleY; }

        set scaleY(value) {
            this.setDirty(this._scaleY !== value);
            this._scaleY = value;
        }

        setScaleY(scaleY) {
            this.scaleY = scaleY;
            return this;
        }

        // Override
        get height() { return 0; }

        // Override
        set height(value) { }

        setHeight(height, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.height = height;

            if (keepAspectRatio) {
                this.scaleX = this.scaleY;
            }
            return this;
        }

        setScale(scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }

            this.scaleX = scaleX;
            this.scaleY = scaleY;
            return this;
        }

        setOrigin(x) {
            this.originX = x;
            return this;
        }

        setAlign(align) {
            this.align = align;
            return this;
        }

        modifyPorperties(o) {
            if (!o) {
                return this;
            }

            if (o.hasOwnProperty('x')) {
                this.setX(o.x);
            }
            if (o.hasOwnProperty('y')) {
                this.setY(o.y);
            }

            if (o.hasOwnProperty('rotation')) {
                this.setRotation(o.rotation);
            } else if (o.hasOwnProperty('angle')) {
                this.setAngle(o.angle);
            }

            if (o.hasOwnProperty('alpha')) {
                this.setAlpha(o.alpha);
            }

            // ScaleX, ScaleY
            var width = GetValue$I(o, 'width', undefined);
            var height = GetValue$I(o, 'height', undefined);
            var scaleX = GetValue$I(o, 'scaleX', undefined);
            var scaleY = GetValue$I(o, 'scaleY', undefined);

            if (width !== undefined) {
                if ((height === undefined) && (scaleY === undefined)) {
                    this.setWidth(width, true);
                } else {
                    this.setWidth(width);
                }
            } else if (scaleX !== undefined) {
                this.setScaleX(scaleX);
            }
            if (height !== undefined) {
                if ((width === undefined) && (scaleX === undefined)) {
                    this.setHeight(height, true);
                } else {
                    this.setHeight(height);
                }
            } else if (scaleY !== undefined) {
                this.setScaleY(scaleY);
            }

            if (o.hasOwnProperty('leftSpace')) {
                this.setLeftSpace(o.leftSpace);
            }
            if (o.hasOwnProperty('rightSpace')) {
                this.setRightSpace(o.rightSpace);
            }

            if (o.hasOwnProperty('align')) {
                this.setAlign(o.align);
            }

            return this;
        }

        setDrawBelowCallback(callback) {
            this.drawBelowCallback = callback;
            return this;
        }

        setDrawAboveCallback(callback) {
            this.drawAboveCallback = callback;
            return this;
        }

        reset() {
            this
                .setVisible()
                .setAlpha(1)
                .setPosition(0, 0)
                .setRotation(0)
                .setScale(1, 1)
                .setLeftSpace(0).setRightSpace(0)
                .setOrigin(0)
                .setAlign()
                .setDrawBelowCallback()
                .setDrawAboveCallback();
            return this;
        }

        // Override
        get willRender() {
            return this.visible && (this.alpha > 0);
        }

        get drawX() {
            var x = this.x + this.leftSpace + this.offsetX - (this.originX * this.width);
            return (this.parent._textOX * this.scrollFactorX) + x;
        }
        get drawY() {
            var y = this.y + this.offsetY;
            return (this.parent._textOY * this.scrollFactorY) + y;
        }

        // Override
        get drawTLX() { return 0; }
        get drawTLY() { return 0; }
        get drawBLX() { return 0; }
        get drawBLY() { return 0; }
        get drawTRX() { return 0; }
        get drawTRY() { return 0; }
        get drawBRX() { return 0; }
        get drawBRY() { return 0; }

        get drawCenterX() {
            return (this.drawTRX + this.drawTLX) / 2;
        }
        get drawCenterY() {
            return (this.drawBLY + this.drawTLY) / 2;
        }
    }

    Object.assign(
        RenderBase.prototype,
        Methods$6,
    );

    const Pad = Phaser.Utils.String.Pad;
    var GetStyle = function (style, canvas, context) {
        if (style == null) {
            return style;
        }

        switch (typeof (style)) {
            case 'string': return style;
            case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', 1)}`;
            case 'function': return style(canvas, context);
            case 'object':
                if (style.hasOwnProperty('r')) {
                    if (style.hasOwnProperty('a')) {  // rgba
                        return `rgba(${style.r},${style.g},${style.b},${style.a})`;
                    } else {  // rgb
                        return `rgb(${style.r},${style.g},${style.b})`;
                    }
                } else if (style.hasOwnProperty('h')) {
                    if (style.hasOwnProperty('a')) {  // hsla
                        return `hsla(${style.h},${style.s},${style.l},${style.a})`;
                    } else {  // hsl
                        return `hsl(${style.h},${style.s},${style.l})`;
                    }
                } else {
                    return style; // Not a valid input
                }
            default: return style;
        }
    };

    var GetProperty = function (name, config, defaultConfig) {
        if (config.hasOwnProperty(name)) {
            return config[name];
        } else {
            return defaultConfig[name];
        }
    };

    const GetValue$H = Phaser.Utils.Objects.GetValue;

    let RoundRectangle$1 = class RoundRectangle {
        constructor(x, y, width, height, radiusConfig) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = x; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = 0; }
            if (radiusConfig === undefined) { radiusConfig = 0; }

            this.cornerRadius = {};
            this._width = 0;
            this._height = 0;
            this.setTo(x, y, width, height, radiusConfig);
        }

        setTo(x, y, width, height, radiusConfig) {
            this.setPosition(x, y);
            this.setRadius(radiusConfig);
            this.setSize(width, height);
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get minWidth() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
        }

        get minHeight() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
        }

        get width() {
            return this._width;
        }

        set width(value) {
            if (value == null) {
                value = 0;
            }
            this._width = Math.max(value, this.minWidth);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            if (value == null) {
                value = 0;
            }
            this._height = Math.max(value, this.minHeight);
        }

        get radius() {
            var radius = this.cornerRadius;
            return Math.max(
                radius.tl.x, radius.tl.y,
                radius.tr.x, radius.tr.y,
                radius.bl.x, radius.bl.y,
                radius.br.x, radius.br.y
            );
        }

        set radius(value) {
            var defaultRadiusX, defaultRadiusY;
            if (typeof (value) === 'number') {
                defaultRadiusX = value;
                defaultRadiusY = value;
            } else {
                defaultRadiusX = GetValue$H(value, 'x', 0);
                defaultRadiusY = GetValue$H(value, 'y', 0);
            }

            var radius = this.cornerRadius;
            radius.tl = GetRadius(GetValue$H(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(GetValue$H(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(GetValue$H(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(GetValue$H(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
        }

        get radiusTL() {
            var radius = this.cornerRadius.tl;
            return Math.max(radius.x, radius.y);
        }

        set radiusTL(value) {
            SetRadius(this.cornerRadius.tl, value);
        }

        get radiusTR() {
            var radius = this.cornerRadius.tr;
            return Math.max(radius.x, radius.y);
        }

        set radiusTR(value) {
            SetRadius(this.cornerRadius.tr, value);
        }

        get radiusBL() {
            var radius = this.cornerRadius.bl;
            return Math.max(radius.x, radius.y);
        }

        set radiusBL(value) {
            SetRadius(this.cornerRadius.bl, value);
        }

        get radiusBR() {
            var radius = this.cornerRadius.br;
            return Math.max(radius.x, radius.y);
        }

        set radiusBR(value) {
            SetRadius(this.cornerRadius.br, value);
        }
    };

    var GetRadius = function (radius, defaultRadiusX, defaultRadiusY) {
        if (radius === undefined) {
            radius = {
                x: defaultRadiusX,
                y: defaultRadiusY
            };
        } else if (typeof (radius) === 'number') {
            radius = {
                x: radius,
                y: radius
            };
        }

        SetConvex(radius);
        return radius;

    };

    var SetRadius = function (radius, value) {
        if (typeof (value) === 'number') {
            radius.x = value;
            radius.y = value;
        } else {
            radius.x = GetValue$H(value, 'x', 0);
            radius.y = GetValue$H(value, 'y', 0);
        }

        SetConvex(radius);
    };

    var SetConvex = function (radius) {
        radius.convex = (radius.x >= 0) || (radius.y >= 0);

        radius.x = Math.abs(radius.x);
        radius.y = Math.abs(radius.y);
    };

    const DegToRad$2 = Phaser.Math.DegToRad;

    var AddRoundRectanglePath = function (context, x, y, width, height, radiusConfig, iteration) {
        var geom = new RoundRectangle$1(x, y, width, height, radiusConfig),
            minWidth = geom.minWidth,
            minHeight = geom.minHeight,
            scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
            scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

        var cornerRadius = geom.cornerRadius;
        var radius, radiusX, radiusY, centerX, centerY;
        var startX, startY;

        context.save();
        context.beginPath();

        context.translate(x, y);

        // Top-left
        radius = cornerRadius.tl;
        if (IsArcCorner$1(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = radiusY;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
            } else {
                centerX = 0;
                centerY = 0;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
            }

            startX = 0;
            startY = radiusY;
        } else {
            context.lineTo(0, 0);

            startX = 0;
            startY = 0;
        }

        // Top-right
        radius = cornerRadius.tr;
        if (IsArcCorner$1(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = radiusY;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
            } else {
                centerX = width;
                centerY = 0;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
            }
        } else {
            context.lineTo(width, 0);
        }

        // Bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner$1(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = height - radiusY;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
            } else {
                centerX = width;
                centerY = height;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
            }
        } else {
            context.lineTo(width, height);
        }

        // Bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner$1(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = height - radiusY;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
            } else {
                centerX = 0;
                centerY = height;
                ArcTo$1(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
            }
        } else {
            context.lineTo(0, height);
        }

        context.lineTo(startX, startY);
        context.closePath();
        context.restore();
    };

    var IsConvexArc = function (radius) {
        return (!radius.hasOwnProperty('convex')) ||  // radius does not have convex property
            radius.convex;
    };

    var IsArcCorner$1 = function (radius) {
        return ((radius.x > 0) && (radius.y > 0));
    };

    var ArcTo$1 = function (
        context,
        centerX, centerY,
        radiusX, radiusY,
        startAngle, endAngle,
        antiClockWise,
        iteration
    ) {

        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        startAngle = DegToRad$2(startAngle);
        endAngle = DegToRad$2(endAngle);

        if (iteration == null) {  // undefined, or null
            context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
        } else {
            iteration += 1;
            var x, y, angle;
            var step = (endAngle - startAngle) / iteration;
            for (var i = 0; i <= iteration; i++) {
                angle = startAngle + (step * i);
                x = centerX + (radiusX * Math.cos(angle));
                y = centerY + (radiusY * Math.sin(angle));
                context.lineTo(x, y);
            }
        }
    };

    var DrawRoundRectangle = function (
        canvas, context,
        x, y,
        width, height, radiusConfig,
        fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient,
        iteration
    ) {

        AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);

        if (fillStyle != null) {
            if (fillColor2 != null) {
                var grd;
                if (isHorizontalGradient) {
                    grd = context.createLinearGradient(0, 0, width, 0);
                } else {
                    grd = context.createLinearGradient(0, 0, 0, height);
                }
                grd.addColorStop(0, fillStyle);
                grd.addColorStop(1, fillColor2);
                fillStyle = grd;
            }

            context.fillStyle = fillStyle;
            context.fill();
        }

        if ((strokeStyle != null) && (lineWidth > 0)) {
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.stroke();
        }
    };

    var DrawRoundRectangleBackground = function (
        canvasObject,
        color,
        strokeColor, strokeLineWidth,
        radius,
        color2, isHorizontalGradient,
        iteration
    ) {

        if ((color == null) && (strokeColor == null)) {
            return;
        }

        var width = canvasObject.canvas.width,
            height = canvasObject.canvas.height;

        if (strokeColor == null) {
            strokeLineWidth = 0;
        }
        var x = strokeLineWidth / 2;
        width = Math.max(1, width - strokeLineWidth);   // Min width is 1
        height = Math.max(1, height - strokeLineWidth); // Min height is 1
        DrawRoundRectangle(canvasObject.canvas, canvasObject.context,
            x, x,
            width, height,
            radius,
            color,
            strokeColor, strokeLineWidth,
            color2, isHorizontalGradient,
            iteration
        );
    };

    const GetValue$G = Phaser.Utils.Objects.GetValue;

    class Background extends RenderBase {
        constructor(parent, config) {
            super(parent, 'background');

            this.setScrollFactor(0);

            this.setColor(
                GetValue$G(config, 'color', null),
                GetValue$G(config, 'color2', null),
                GetValue$G(config, 'horizontalGradient', true)
            );

            this.setStroke(
                GetValue$G(config, 'stroke', null),
                GetValue$G(config, 'strokeThickness', 2)
            );

            this.setCornerRadius(
                GetValue$G(config, 'cornerRadius', 0),
                GetValue$G(config, 'cornerIteration', null)
            );
        }

        set color(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color != value);
            this._color = value;
        }

        get color() {
            return this._color;
        }

        set color2(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color2 != value);
            this._color2 = value;
        }

        get color2() {
            return this._color2;
        }

        set horizontalGradient(value) {
            this.setDirty(this._horizontalGradient != value);
            this._horizontalGradient = value;
        }

        get horizontalGradient() {
            return this._horizontalGradient;
        }

        setColor(color, color2, isHorizontalGradient) {
            if (isHorizontalGradient === undefined) {
                isHorizontalGradient = true;
            }

            this.color = color;
            this.color2 = color2;
            this.horizontalGradient = isHorizontalGradient;
            return this;
        }

        set stroke(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._stroke != value);
            this._stroke = value;
        }

        get stroke() {
            return this._stroke;
        }

        set strokeThickness(value) {
            this.setDirty(this._strokeThickness != value);
            this._strokeThickness = value;
        }

        get strokeThickness() {
            return this._strokeThickness;
        }

        setStroke(color, lineWidth) {
            if (color != null) {
                if (lineWidth === undefined) {
                    lineWidth = 2;
                }
            }
            this.stroke = color;
            this.strokeThickness = lineWidth;
            return this;
        }

        set cornerRadius(value) {
            this.setDirty(this._cornerRadius != value);
            this._cornerRadius = value;
        }

        get cornerRadius() {
            return this._cornerRadius;
        }

        set cornerIteration(value) {
            this.setDirty(this._cornerIteration != value);
            this._cornerIteration = value;
        }

        get cornerIteration() {
            return this._cornerIteration;
        }

        modifyStyle(o) {
            if (o.hasOwnProperty('color')) {
                this.setColor(
                    o.color,
                    GetProperty('color2', o, this),
                    GetProperty('horizontalGradient', o, this),
                );
            }
            if (o.hasOwnProperty('stroke')) {
                this.setStroke(
                    o.stroke,
                    GetProperty('strokeThickness', o, this),
                );
            }
            if (o.hasOwnProperty('cornerRadius')) {
                this.setCornerRadius(
                    o.cornerRadius,
                    GetProperty('cornerIteration', o, this),
                );
            }

            return this;
        }

        modifyPorperties(o) {
            super.modifyPorperties(o);

            this.modifyStyle(o);

            return this;
        }

        setCornerRadius(radius, iteration) {
            this.cornerRadius = radius;
            this.cornerIteration = iteration;
            return this;
        }

        renderContent() {
            DrawRoundRectangleBackground(
                this.parent,
                this.color,
                this.stroke,
                this.strokeThickness,
                this.cornerRadius,
                this.color2,
                this.horizontalGradient,
                this.cornerIteration
            );
        }
    }

    const GetValue$F = Phaser.Utils.Objects.GetValue;

    class InnerBounds extends RenderBase {
        constructor(parent, config) {
            super(parent, 'innerbounds');

            this.setScrollFactor(0);

            this.setColor(
                GetValue$F(config, 'color', null),
                GetValue$F(config, 'color2', null),
                GetValue$F(config, 'horizontalGradient', true)
            );

            this.setStroke(
                GetValue$F(config, 'stroke', null),
                GetValue$F(config, 'strokeThickness', 2)
            );
        }

        set color(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color != value);
            this._color = value;
        }

        get color() {
            return this._color;
        }

        set color2(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color2 != value);
            this._color2 = value;
        }

        get color2() {
            return this._color2;
        }

        set horizontalGradient(value) {
            this.setDirty(this._horizontalGradient != value);
            this._horizontalGradient = value;
        }

        get horizontalGradient() {
            return this._horizontalGradient;
        }

        setColor(color, color2, isHorizontalGradient) {
            if (isHorizontalGradient === undefined) {
                isHorizontalGradient = true;
            }

            this.color = color;
            this.color2 = color2;
            this.horizontalGradient = isHorizontalGradient;
            return this;
        }

        set stroke(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._stroke != value);
            this._stroke = value;
        }

        get stroke() {
            return this._stroke;
        }

        set strokeThickness(value) {
            this.setDirty(this._strokeThickness != value);
            this._strokeThickness = value;
        }

        get strokeThickness() {
            return this._strokeThickness;
        }

        setStroke(color, lineWidth) {
            if (color != null) {
                if (lineWidth === undefined) {
                    lineWidth = 2;
                }
            }
            this.stroke = color;
            this.strokeThickness = lineWidth;
            return this;
        }

        modifyPorperties(o) {
            super.modifyPorperties(o);

            if (o.hasOwnProperty('color')) {
                this.setColor(
                    o.color,
                    GetValue$F(o, 'color2', null),
                    GetValue$F(o, 'horizontalGradient', true)
                );
            }
            if (o.hasOwnProperty('stroke')) {
                this.setStroke(
                    o.stroke,
                    GetValue$F(o, 'strokeThickness', 2)
                );
            }
        }

        renderContent() {
            var padding = this.parent.padding;
            var x = padding.left,
                y = padding.top,
                width = this.parent.width - padding.left - padding.right,
                height = this.parent.height - padding.top - padding.bottom;
            var context = this.context;
            if (this.color != null) {
                var fillStyle;
                if (this.color2 != null) {
                    var grd;
                    if (this.horizontalGradient) {
                        grd = context.createLinearGradient(0, 0, width, 0);
                    } else {
                        grd = context.createLinearGradient(0, 0, 0, height);
                    }
                    grd.addColorStop(0, this.color);
                    grd.addColorStop(1, this.color2);
                    fillStyle = grd;
                } else {
                    fillStyle = this.color;
                }

                context.fillStyle = fillStyle;
                context.fillRect(x, y, width, height);
            }

            if ((this.stroke != null) && (this.strokeThickness > 0)) {
                context.strokeStyle = this.stroke;
                context.lineWidth = this.strokeThickness;
                context.strokeRect(x, y, width, height);
            }
        }
    }

    const GetValue$E = Phaser.Utils.Objects.GetValue;

    class TextStyle {
        constructor(parent, config) {
            this.parent = parent;
            this.set(config);
        }

        toJSON() {
            return {
                bold: this.bold,
                italic: this.italic,
                fontSize: this.fontSize,
                fontFamily: this.fontFamily,
                color: this.color,
                stroke: this.stroke,
                strokeThickness: this.strokeThickness,
                shaodwColor: this.shadowColor,
                shadowBlur: this.shadowBlur,
                shadowOffsetX: this.shadowOffsetX,
                shadowOffsetY: this.shadowOffsetY,
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                leftSpace: this.leftSpace,
                rightSpace: this.rightSpace,
                backgroundHeight: this.backgroundHeight,
                backgroundBottomY: this.backgroundBottomY,
                align: this.align
            }
        }

        set(o) {
            this.setBold(GetValue$E(o, 'bold', false));
            this.setItalic(GetValue$E(o, 'italic', false));
            this.setFontSize(GetValue$E(o, 'fontSize', '16px'));
            this.setFontFamily(GetValue$E(o, 'fontFamily', 'Courier'));
            this.setColor(GetValue$E(o, 'color', '#fff'));
            this.setStrokeStyle(
                GetValue$E(o, 'stroke', null),
                GetValue$E(o, 'strokeThickness', 0)
            );
            this.setShadow(
                GetValue$E(o, 'shadowColor', null),
                GetValue$E(o, 'shadowOffsetX', 0),
                GetValue$E(o, 'shadowOffsetY', 0),
                GetValue$E(o, 'shadowBlur', 0)
            );
            this.setOffset(
                GetValue$E(o, 'offsetX', 0),
                GetValue$E(o, 'offsetY', 0)
            );
            this.setSpace(
                GetValue$E(o, 'leftSpace', 0),
                GetValue$E(o, 'rightSpace', 0)
            );
            this.setAlign(GetValue$E(o, 'align', undefined));
            this.setBackgroundColor(GetValue$E(o, 'backgroundColor', null));
            this.setBackgroundHeight(GetValue$E(o, 'backgroundHeight', undefined));
            this.setBackgroundBottomY(GetValue$E(o, 'backgroundBottomY', undefined));
            this.setBackgroundLeftX(GetValue$E(o, 'backgroundLeftX', 0));
            this.setBackgroundRightX(GetValue$E(o, 'backgroundRightX', 0));

            return this;
        }

        modify(o) {
            if (o.hasOwnProperty('bold')) {
                this.setBold(o.bold);
            }
            if (o.hasOwnProperty('italic')) {
                this.setItalic(o.italic);
            }
            if (o.hasOwnProperty('fontSize')) {
                this.setFontSize(o.fontSize);
            }
            if (o.hasOwnProperty('fontFamily')) {
                this.setFontFamily(o.fontFamily);
            }
            if (o.hasOwnProperty('color')) {
                this.setColor(o.color);
            }
            if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
                this.setStrokeStyle(
                    GetProperty('stroke', o, this),
                    GetProperty('strokeThickness', o, this)
                );
            }

            if (o.hasOwnProperty('shadowColor')) {
                this.setShadowColor(o.shadowColor);
            }

            if (o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
                this.setShadowOffset(
                    GetProperty('shadowOffsetX', o, this),
                    GetProperty('shadowOffsetY', o, this),
                );
            }

            if (o.hasOwnProperty('shadowBlur')) {
                this.setShadowBlur(o.shaodwBlur);
            }

            if (o.hasOwnProperty('offsetX')) {
                this.setOffsetX(o.offsetX);
            }
            if (o.hasOwnProperty('offsetY')) {
                this.setOffsetY(o.offsetY);
            }

            if (o.hasOwnProperty('leftSpace')) {
                this.setLeftSpace(o.leftSpace);
            }
            if (o.hasOwnProperty('rightSpace')) {
                this.setRightSpace(o.rightSpace);
            }

            if (o.hasOwnProperty('align')) {
                this.setAlign(o.align);
            }

            if (o.hasOwnProperty('backgroundColor')) {
                this.setBackgroundColor(o.backgroundColor);
            }

            if (o.hasOwnProperty('backgroundHeight')) {
                this.setBackgroundHeight(o.backgroundHeight);
            }
            if (o.hasOwnProperty('backgroundBottomY')) {
                this.setBackgroundBottomY(o.backgroundBottomY);
            }
            if (o.hasOwnProperty('backgroundLeftX')) {
                this.setBackgroundLeftX(o.backgroundLeftX);
            }
            if (o.hasOwnProperty('backgroundRightX')) {
                this.setBackgroundRightX(o.backgroundRightX);
            }        

            return this;
        }

        setUpdateTextFlag() {
            if (this.parent) {
                this.parent.updateTextFlag = true;
            }
            return this;
        }

        clone() {
            return new TextStyle(null, this.toJSON());
        }

        copyFrom(sourceTextStyle) {
            this.set(sourceTextStyle.toJSON());
            return this;
        }

        copyTo(targetTextStyle) {
            targetTextStyle.set(this.toJSON());
            return this;
        }

        setBold(value) {
            if (value === undefined) {
                value = true;
            }
            this.bold = value;
            this.setUpdateTextFlag();
            return this;
        }

        setItalic(value) {
            if (value === undefined) {
                value = true;
            }
            this.italic = value;
            this.setUpdateTextFlag();
            return this;
        }

        get fontStyle() {
            if (this.bold && this.italic) {
                return 'bold italic';
            } else if (this.bold) {
                return 'bold';
            } else if (this.italic) {
                return 'italic';
            } else {
                return '';
            }
        }

        setFontSize(fontSize) {
            if (typeof (fontSize) === 'number') {
                fontSize = `${fontSize}px`;
            }
            this.fontSize = fontSize;
            this.setUpdateTextFlag();
            return this;
        }

        setFontFamily(fontFamily) {
            this.fontFamily = fontFamily;
            this.setUpdateTextFlag();
            return this;
        }

        get font() {
            return `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
        }

        setColor(color) {
            this.color = GetStyle(color);
            return this;
        }

        get hasFill() {
            return this.color != null;
        }

        setStrokeStyle(stroke, strokeThickness) {
            this.stroke = GetStyle(stroke);
            if (strokeThickness !== undefined) {
                this.strokeThickness = strokeThickness;
            }
            return this;
        }

        setStrokeThickness(strokeThickness) {
            this.strokeThickness = strokeThickness;
            return this;
        }

        get hasStroke() {
            return (this.stroke != null) && (this.strokeThickness > 0);
        }

        setShadowColor(color) {
            this.shadowColor = GetStyle(color);
            return this;
        }

        setShadowOffset(offsetX, offsetY) {
            if (offsetX === undefined) {
                offsetX = 0;
            }
            if (offsetY === undefined) {
                offsetY = 0;
            }

            this.shadowOffsetX = offsetX;
            this.shadowOffsetY = offsetY;
            return this;
        }

        setShadowBlur(blur) {
            if (blur === undefined) {
                blur = 0;
            }

            this.shaodwBlur = blur;
            return this;
        }

        setShadow(color, offsetX, offsetY, blur) {
            this
                .setShadowColor(color)
                .setShadowOffset(offsetX, offsetY)
                .setShadowBlur(blur);
            return this;
        }

        setBackgroundColor(color) {
            this.backgroundColor = GetStyle(color);
            return this;
        }

        get hasBackgroundColor() {
            return this.backgroundColor != null;
        }

        setBackgroundHeight(height) {
            this.backgroundHeight = height;
            return this;
        }

        setBackgroundBottomY(y) {
            this.backgroundBottomY = y;
            return this;
        }

        setBackgroundLeftX(x) {
            this.backgroundLeftX = x;
            return this;
        }

        setBackgroundRightX(x) {
            this.backgroundRightX = x;
            return this;
        }

        setOffsetX(offsetX) {
            if (offsetX === undefined) {
                offsetX = 0;
            }

            this.offsetX = offsetX;
            return this;
        }

        setOffsetY(offsetY) {
            if (offsetY === undefined) {
                offsetY = 0;
            }

            this.offsetY = offsetY;
            return this;
        }

        setOffset(offsetX, offsetY) {
            this
                .setOffsetX(offsetX)
                .setOffsetY(offsetY);
            return this;
        }

        setLeftSpace(space) {
            if (space === undefined) {
                space = 0;
            }

            this.leftSpace = space;
            return this;
        }

        setRightSpace(space) {
            if (space === undefined) {
                space = 0;
            }

            this.rightSpace = space;
            return this;
        }

        setSpace(leftSpace, rightSpace) {
            this
                .setLeftSpace(leftSpace)
                .setRightSpace(rightSpace);
            return this;
        }

        setAlign(align) {
            this.align = align;
            return this;
        }

        syncFont(context) {
            context.font = this.font;
            return this;
        }

        syncStyle(context) {
            context.textBaseline = 'alphabetic';

            var hasFill = this.hasFill;
            var hasStroke = this.hasStroke;
            context.fillStyle = (hasFill) ? this.color : '#000';

            context.strokeStyle = (hasStroke) ? this.stroke : '#000';
            context.lineWidth = (hasStroke) ? this.strokeThickness : 0;
            context.lineCap = 'round';
            context.lineJoin = 'round';

            return this;
        }

        syncShadow(context) {
            if (context.shadowColor != null) {
                context.shadowColor = this.shadowColor;
                context.shadowOffsetX = this.shadowOffsetX;
                context.shadowOffsetY = this.shadowOffsetY;
                context.shadowBlur = this.shadowBlur;
            } else {
                context.shadowColor = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 0;
            }
        }

        getTextMetrics(context, text) {
            this.syncFont(context).syncStyle(context);
            return context.measureText(text);
        }

    }

    var SetFixedSize = function (width, height) {
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = 0;
        }

        if ((this.fixedWidth === width) && (this.fixedHeight === height)) {
            return this;
        }

        this.fixedWidth = width;
        this.fixedHeight = height;
        this.dirty = true;  // -> this.updateTexture();

        this.setCanvasSize(
            (width > 0) ? width : this.width,
            (height > 0) ? height : this.height
        );

        return this;
    };

    var SetPadding = function (key, value) {
        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        SetPadding$1(padding, key, value);

        this.dirty = this.dirty ||
            (paddingLeft != padding.left) ||
            (paddingRight != padding.right) ||
            (paddingTop != padding.top) ||
            (paddingBottom != padding.bottom)
            ;
        return this;
    };

    var GetPadding = function (key) {
        return GetPadding$1(this.padding, key);
    };

    var ModifyTextStyle = function (style) {
        this.textStyle.modify(style);
        return this;
    };

    var ModifyDefaultTextStyle = function (style) {
        this.defaultTextStyle.modify(style);
        return this;
    };

    var ResetTextStyle = function () {
        this.textStyle.copyFrom(this.defaultTextStyle);
        return this;
    };

    var SetTestString = function (testString) {
        this.testString = testString;
        return this;
    };

    const RemoveItem$4 = Phaser.Utils.Array.Remove;

    var RemoveChild = function (child) {
        this.poolManager.free(child);
        RemoveItem$4(this.children, child);
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    var RemoveChildren = function () {
        this.poolManager.freeMultiple(this.children);
        this.children.length = 0;
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    const RemoveItem$3 = Phaser.Utils.Array.Remove;

    var PopChild = function (child) {
        RemoveItem$3(this.children, child);
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    var ClearContent = function() {
        this.setText();
        return this;
    };

    // const RemoveItem = Phaser.Utils.Array.Remove;

    var AddChild$1 = function (child, index) {
        var areChildren = Array.isArray(child);

        // Remove existed child(s)
        // RemoveItem(this.children, child);

        if ((index === undefined) || (index === this.children.length)) {
            if (areChildren) {
                this.children.push(...child);
            } else {
                this.children.push(child);
            }
        } else {
            if (areChildren) {
                this.children.splice(index, 0, ...child);
            } else {
                this.children.splice(index, 0, child);
            }
        }

        this.lastAppendedChildren.length = 0;
        if (areChildren) {
            this.lastAppendedChildren.push(...child);
        } else {
            this.lastAppendedChildren.push(child);
        }

        return this;
    };

    const CharTypeName = 'text';
    const ImageTypeName = 'image';
    const DrawerTypeName = 'drawer';
    const SpaceTypeName = 'space';
    const CmdTypeName = 'command';

    var IsNewLineChar = function (bob) {
        return (bob.type === CharTypeName) && (bob.text === '\n');
    };

    var IsPageBreakChar = function (bob) {
        return (bob.type === CharTypeName) && (bob.text === '\f');
    };

    var IsChar = function (bob) {
        return (bob.type === CharTypeName);
    };

    class CharData extends RenderBase {
        constructor(
            parent,
            text,
            style
        ) {
            super(parent, CharTypeName);
            this.updateTextFlag = false;
            this.style = new TextStyle(this, style);
            this.setText(text);
        }

        get autoRound() {
            return this.parent.autoRound;
        }

        get offsetX() {
            return this.style.offsetX;
        }

        set offsetX(value) {
            if (this.style) {
                this.style.offsetX = value;
            }
        }

        get offsetY() {
            return this.style.offsetY;
        }

        set offsetY(value) {
            if (this.style) {
                this.style.offsetY = value;
            }
        }

        get leftSpace() {
            return this.style.leftSpace * this.scaleX;
        }

        set leftSpace(value) {
            if (this.style) {
                this.style.leftSpace = value;
            }
            super.leftSpace = value;
        }

        get rightSpace() {
            return this.style.rightSpace * this.scaleX;
        }

        set rightSpace(value) {
            if (this.style) {
                this.style.rightSpace = value;
            }
            super.rightSpace = value;
        }

        get align() {
            return this.style.align;
        }

        set align(value) {
            if (this.style) {
                this.style.align = value;
            }
        }

        modifyStyle(style) {
            this.setDirty(true);
            this.style.modify(style);

            if (this.updateTextFlag) {
                this.updateTextSize();
            }
            return this;
        }

        modifyPorperties(o) {
            if (!o) {
                return this;
            }

            this.modifyStyle(o);
            super.modifyPorperties(o);
            return this;
        }

        setText(text) {
            this.setDirty(this.text != text);
            this.text = text;

            this.updateTextSize();

            return this;
        }

        updateTextSize() {
            var text = this.text;
            // Is new-line, page-break, or empty character
            if ((text === '\n') || (text === '\f') || (text === '')) {
                this.clearTextSize();

            } else {
                var metrics = this.style.getTextMetrics(this.context, this.text);
                this.textWidth = metrics.width;

                var ascent, descent;
                if ('actualBoundingBoxAscent' in metrics) {
                    ascent = metrics.actualBoundingBoxAscent;
                    descent = metrics.actualBoundingBoxDescent;
                } else {
                    ascent = 0;
                    descent = 0;
                }

                this.textHeight = ascent + descent;
                this.ascent = ascent;
                this.descent = descent;
            }

            this.updateTextFlag = false;
            return this;
        }

        clearTextSize() {
            this.textWidth = 0;
            this.textHeight = 0;
            this.ascent = 0;
            this.descent = 0;
            return this;
        }

        copyTextSize(child) {
            this.textWidth = child.textWidth;
            this.textHeight = child.textHeight;
            this.ascent = child.ascent;
            this.descent = child.descent;
            return this;
        }

        get width() {
            return this.textWidth * this.scaleX;
        }

        set width(value) {
            if (this.textWidth > 0) {
                this.scaleX = value / this.textWidth;
            } else {
                this.scaleX = 1;
            }
        }

        get height() {
            return this.textHeight * this.scaleY;
        }

        set height(value) {
            if (this.textHeight > 0) {
                this.scaleY = value / this.textHeight;
            } else {
                this.scaleY = 1;
            }
        }

        get willRender() {
            if (this.textWidth === 0) {
                return false;
            }

            return super.willRender;
        }

        renderContent() {
            var context = this.context;
            var textStyle = this.style;

            if (textStyle.hasBackgroundColor) {
                context.fillStyle = textStyle.backgroundColor;

                var leftX = this.drawTLX + textStyle.backgroundLeftX;
                var rightX = this.drawTRX + textStyle.backgroundRightX;
                var x = leftX;
                var width = rightX - leftX + 1; // Add extra 1 pixel width

                if (width > 0) {
                    var bottomY = textStyle.backgroundBottomY;
                    if (bottomY == null) {
                        bottomY = this.drawBLY;
                    }
                    var height = textStyle.backgroundHeight;
                    if (height == null) {
                        height = bottomY - this.drawTLY;
                    }
                    var y = bottomY - height;

                    context.fillRect(x, y, width, height);
                }
            }

            var hasFill = textStyle.hasFill,
                hasStroke = textStyle.hasStroke;

            if (!hasFill && !hasStroke) {
                return;
            }

            textStyle.syncFont(context).syncStyle(context);
            // textBaseline = 'alphabetic'

            if (hasStroke) {
                textStyle.syncShadow(context);
                context.strokeText(this.text, 0, 0);
            }

            if (hasFill) {
                textStyle.syncShadow(context);
                context.fillText(this.text, 0, 0);
            }
        }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return -this.ascent; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.descent; }
        get drawTRX() { return this.textWidth + this.rightSpace; }
        get drawTRY() { return -this.ascent; }
        get drawBRX() { return this.textWidth + this.rightSpace; }
        get drawBRY() { return this.descent; }

    }

    var CreateCharChild = function (text, style) {
        if (style) {
            this.textStyle.modify(style);
        }

        var child = this.poolManager.allocate(CharTypeName);
        if (child === null) {
            child = new CharData(
                this,               // parent
                text,               // text
                this.textStyle,     // style
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .modifyStyle(this.textStyle)
                .setText(text);
        }

        return child;
    };

    var CreateCharChildren = function (text, style) {
        if (style) {
            this.textStyle.modify(style);
        }

        var children = [];
        for (var i = 0, cnt = text.length; i < cnt; i++) {
            var char = text.charAt(i);
            var child = this.poolManager.allocate(CharTypeName);
            if (child === null) {
                child = new CharData(
                    this,               // parent
                    char,               // text
                    this.textStyle,     // style
                );
            } else {
                child
                    .setParent(this)
                    .setActive()
                    .modifyStyle(this.textStyle)
                    .setText(char);
            }
            // child.modifyPorperties(properties);  // Warning: Will modify text-style twice

            children.push(child);
        }

        return children;
    };

    var AppendText = function (text, style) {
        var children = this.createCharChildren(text, style);
        this.addChild(children);
        return this;
    };

    var SetText = function (text, style) {
        if (text === undefined) {
            text = '';
        }

        this.removeChildren();
        AppendText.call(this, text, style);  // this.appendText might be override

        this.dirty = true;
        return this;
    };

    var InsertText = function (index, text, style) {
        var children = this.createCharChildren(text, style);
        index = this.getCharChildIndex(index, true);
        this.addChild(children, index);

        return this;
    };

    var RemoveText = function (index, length) {
        if (length === undefined) {
            length = 1;
        }

        for (var i = 0; i < length; i++) {
            var childIndex = this.getCharChildIndex(index, true);
            if (childIndex === undefined) {
                break;
            }
            this.removeChild(this.children[childIndex]);
        }
        return this;
    };

    var GetText = function (activeOnly) {
        var text = '';
        this.forEachCharChild(function (child) {
            text += child.text;
        }, undefined, activeOnly);
        return text;
    };

    const CanvasPool = Phaser.Display.Canvas.CanvasPool;

    var DrawFrameToCanvas = function (frame, canvas, x, y, width, height, color, autoRound) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = frame.cutWidth; }
        if (height === undefined) { height = frame.cutHeight; }
        if (autoRound === undefined) { autoRound = false; }
        if (autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = canvas.getContext('2d', { willReadFrequently: true });

        if (color) {
            // Draw image at tempCanvas

            // Get tempCanvas
            var tempCanvas = CanvasPool.create(null, width, height, Phaser.CANVAS, true);

            var tempContext = tempCanvas.getContext('2d', { willReadFrequently: true });

            tempContext.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                0, 0, width, height
            );

            // Tint-fill
            tempContext.globalCompositeOperation = 'source-in';
            tempContext.fillStyle = color;
            tempContext.fillRect(0, 0, width, height);

            // Draw tempCanvas at context
            context.drawImage(
                tempCanvas,
                0, 0, width, height,
                x, y, width, height
            );

            // Release tempCanvas
            CanvasPool.remove(tempCanvas);
        } else {
            context.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                x, y, width, height
            );
        }
    };

    Phaser.Display.Canvas.CanvasPool;

    class ImageData extends RenderBase {
        constructor(
            parent,
            key, frame
        ) {
            super(parent, ImageTypeName);
            this.setTexture(key, frame);
            this.color = undefined;
        }

        get frameWidth() {
            return (this.frameObj) ? this.frameObj.cutWidth : 0;
        }

        get frameHeight() {
            return (this.frameObj) ? this.frameObj.cutHeight : 0;
        }

        get offsetY() {
            return -this.height;
        }

        set offsetY(value) { }

        get key() {
            return this._key;
        }

        set key(value) {
            this.setDirty(this._key != value);
            this._key = value;
        }

        get frame() {
            return this._frame;
        }

        set frame(value) {
            this.setDirty(this._frame != value);
            this._frame = value;
        }

        setTexture(key, frame) {
            this.key = key;
            this.frame = frame;

            this.frameObj = this.scene.sys.textures.getFrame(key, frame);
            return this;
        }

        get width() {
            return this.frameWidth * this.scaleX;
        }

        set width(value) {
            this.setDirty(this.width !== value);
            this.scaleX = value / this.frameWidth;
        }

        get height() {
            return this.frameHeight * this.scaleY;
        }

        set height(value) {
            this.setDirty(this.height !== value);
            this.scaleY = value / this.frameHeight;
        }

        setHeight(height, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.height = height;

            if (keepAspectRatio) {
                this.scaleX = this.scaleY;
            }
            return this;
        }

        setColor(color) {
            this.color = color;
            return this;
        }

        modifyPorperties(o) {
            if (o.hasOwnProperty('color')) {
                this.setColor(o.color);
            }

            super.modifyPorperties(o);
            return this;
        }

        renderContent() {
            DrawFrameToCanvas(
                this.frameObj, this.canvas,
                0, 0, this.frameWidth, this.frameHeight,
                this.color, false
            );

        }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return 0; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.frameHeight; }
        get drawTRX() { return this.frameWidth + this.rightSpace; }
        get drawTRY() { return 0; }
        get drawBRX() { return this.frameWidth + this.rightSpace; }
        get drawBRY() { return this.frameHeight; }
    }

    var CreateImageChild = function(key, frame, properties) {
        var child = this.poolManager.allocate(ImageTypeName);

        if (child === null) {
            child = new ImageData(
                this,               // parent
                key,
                frame
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setTexture(key, frame);
        }
        child.modifyPorperties(properties);

        return child;
    };

    var AppendImage = function (key, frame, properties) {
        var child = this.createImageChild(key, frame, properties);
        this.addChild(child);

        return this;
    };

    class Drawer extends RenderBase {
        constructor(parent, renderCallback, width, height) {
            super(parent, DrawerTypeName);

            this.setRenderCallback(renderCallback);
            this.setDrawerSize(width, height);
        }

        setRenderCallback(callback) {
            if (callback) {
                this.renderContent = callback.bind(this);
            } else {
                delete this.renderContent;
            }
            return this;
        }

        setDrawerSize(width, height) {
            // Whole canvas
            if (width === true) {
                this.toLocalPosition = false;
                width = undefined;
                height = undefined;
            } else {
                this.toLocalPosition = true;
            }

            if (width === undefined) {
                width = 0;
            }
            if (height === undefined) {
                height = width;
            }

            this.drawerWidth = width;
            this.drawerHeight = height;

            return this;
        }

        onFree() {
            super.onFree();
            this
                .setRenderCallback();
        }

        get width() {
            return this.drawerWidth * this.scaleX;
        }

        set width(value) {
            this.setDirty(this.width !== value);
            this.scaleX = (this.drawerWidth > 0) ? value / this.drawerWidth : 1;
        }

        get height() {
            return this.drawerHeight * this.scaleY;
        }

        set height(value) {
            this.setDirty(this.height !== value);
            this.scaleY = (this.drawerHeight > 0) ? value / this.drawerHeight : 1;
        }

        get offsetY() {
            return -this.height;
        }

        set offsetY(value) { }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return 0; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.drawerHeight; }
        get drawTRX() { return this.drawerWidth + this.rightSpace; }
        get drawTRY() { return 0; }
        get drawBRX() { return this.drawerWidth + this.rightSpace; }
        get drawBRY() { return this.drawerHeight; }

    }

    var CreateDrawerChild = function (renderCallback, width, height) {
        var child = this.poolManager.allocate(DrawerTypeName);

        if (child === null) {
            child = new Drawer(
                this,               // parent
                renderCallback,
                width, height
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setRenderCallback(renderCallback)
                .setDrawerSize(width, height);
        }

        return child;
    };

    var AppendDrawer = function (renderCallback, width, height) {
        var child = this.createDrawerChild(renderCallback, width, height);
        this.addChild(child);

        return this;
    };

    class Space extends RenderBase {
        constructor(
            parent,
            width
        ) {
            super(parent, SpaceTypeName);
            this.setSpaceWidth(width);
        }

        get width() {
            return this.spaceWidth * this.scaleX;
        }

        set width(value) {
            if (this.spaceWidth > 0) {
                this.scaleX = value / this.spaceWidth;
            } else {
                this.scaleX = 1;
            }
        }

        setSpaceWidth(width) {
            this.spaceWidth = width;
            return this;
        }

    }

    var CreateSpaceChild = function (width) {
        var child = this.poolManager.allocate(SpaceTypeName);

        if (child === null) {
            child = new Space(
                this,               // parent
                width
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setSpaceWidth(width);
        }
        return child;
    };

    var AppendSpace = function (width) {
        var child = this.createSpaceChild(width);
        this.addChild(child);

        return this;
    };

    class Command extends Base {
        constructor(parent, name, callback, param, scope) {
            super(parent, CmdTypeName);

            this
                .setName(name)
                .setParameter(param)
                .setCallback(callback, scope);
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setParameter(param) {
            this.param = param;
            return this;
        }

        setCallback(callback, scope) {
            this.callback = callback;
            this.scope = scope;
            return this;
        }

        exec() {
            var result;
            if (this.scope) {
                result = this.callback.call(this.scope, this.param, this.name);
            } else {
                result = this.callback(this.param, this.name);
            }
            return result;
        }

        onFree() {
            super.onFree();
            this
                .setName()
                .setCallback()
                .setParameter();
        }
    }

    var CreateCommandChild = function (name, callback, param, scope) {
        var child = this.poolManager.allocate(CmdTypeName);

        if (child === null) {
            child = new Command(
                this,               // parent
                name,
                callback, param, scope,
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setName(name)
                .setCallback(callback, scope)
                .setParameter(param);

        }

        return child;
    };

    var AppendCommand = function (name, callback, param, scope) {
        var child = this.createCommandChild(name, callback, param, scope);
        this.addChild(child);

        return this;
    };

    function DeepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            // If obj is a primitive value or null, return it directly
            return obj;
        }

        if (Array.isArray(obj)) {
            // If obj is an array, create a new array and clone each element
            return obj.map(item => DeepClone(item));
        }

        if (obj instanceof Date) {
            // If obj is a Date object, create a new Date object with the same value
            return new Date(obj);
        }

        if (obj instanceof RegExp) {
            // If obj is a RegExp object, create a new RegExp object with the same pattern and flags
            return new RegExp(obj);
        }

        if (Object.getPrototypeOf(obj) !== Object.prototype) {
            // If obj is a custom object, return a reference to it
            return obj;
        }

        // If obj is a plain object, create a new object and clone each property
        const clonedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = DeepClone(obj[key]);
            }
        }
        return clonedObj;
    }

    var SetWrapConfig = function (config) {
        if (config === undefined) {
            config = {};
        } else if (typeof (config) === 'object') {
            config = DeepClone(config);
        }

        this.wrapConfig = config;
        return this;
    };

    var CreateWrapResultData = function (config) {
        var data = {
            callback: undefined,
            start: 0,  // Next start index
            isLastPage: false,  // Is last page
            maxLines: undefined,
            padding: undefined,
            letterSpacing: undefined,
            hAlign: undefined,
            vAlign: undefined,
            children: [],       // Wrap result
            lines: [],          // Wrap result in lines

            // WordWrap
            maxLineWidth: 0,
            linesHeight: 0,
            lineHeight: undefined,

            // VerticalWrap
            maxLineHeight: 0,
            linesWidth: 0,
            lineWidth: undefined,
        };

        return Object.assign(data, config);
    };

    const WRAPMODE = {
        none: 0,
        word: 1,
        char: 2,
        character: 2,
        mix: 3
    };

    var GetWord = function (children, startIndex, wrapMode, result) {
        if (result === undefined) {
            result = { word: [], width: 0 };
        }

        result.word.length = 0;

        var isCharWrap = (wrapMode === 2);
        var isMixWrap = (wrapMode === 3);
        var isWordWrap = !isCharWrap && !isMixWrap;

        var endIndex = children.length;
        var currentIndex = startIndex;
        var word = result.word;
        var wordWidth = 0;
        var hasAnyASCIICharacter = false;
        while (currentIndex < endIndex) {
            var child = children[currentIndex];
            // Can't render (command child), put into output directly
            if (!child.renderable) {
                word.push(child);
                currentIndex++;
                continue;
            }

            var text = (child.type === CharTypeName) ? child.text : null;
            // Get image child, a new-line, or page-break
            if ((text === null) || (text === '\n') || (text === '\f')) {
                if (currentIndex === startIndex) { // Single child
                    word.push(child);
                    wordWidth += child.outerWidth;
                }
                break;
            }

            if (isWordWrap) {
                word.push(child);
                wordWidth += child.outerWidth;
                if (text === ' ') { // Word is end with a space character
                    break;
                }

                currentIndex++;

            } else if (isCharWrap) {  // Word only contains 1 character
                word.push(child);
                wordWidth += child.outerWidth;
                // Flush this 1 character
                break;

            } else if (isMixWrap) {
                if (!IsASCIIString(text)) {
                    if (!hasAnyASCIICharacter) {
                        word.push(child);
                        wordWidth += child.outerWidth;

                        // Is next child a space character?
                        var nextChild = children[currentIndex + 1];
                        if (nextChild &&
                            (nextChild.type === CharTypeName) &&
                            (nextChild.text === ' ')) {
                            word.push(nextChild);
                            wordWidth += nextChild.outerWidth;
                            // Include this space character
                        }
                        // Flush this 1 non-ascii character
                        break;

                    } else {
                        // Flush remainder children (all ascii character), except current child
                        break;

                    }
                } else {
                    word.push(child);
                    wordWidth += child.outerWidth;
                    if (text === ' ') { // Word is end with a space character
                        break;
                    }

                    currentIndex++;
                    hasAnyASCIICharacter = true;
                    // Test next child until ...
                }

            }
        }

        result.width = wordWidth;
        return result;
    };

    var GetChildrenAlign = function (children) {
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (child.align !== undefined) {
                return child.align;
            }
        }

        return undefined;
    };

    var OffsetChildren = function (children, offsetX, offsetY) {
        if ((offsetX === 0) && (offsetY === 0)) {
            return;
        }

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable) {
                continue;
            }

            child.x += offsetX;
            child.y += offsetY;
        }
    };

    var AlignLines$1 = function (result, width, height) {
        var hAlign = result.hAlign,
            vAlign = result.vAlign,
            justifyPercentage = result.justifyPercentage;

        var lines = result.lines;
        var offsetX, offsetY;
        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var line = lines[li];
            var lineWidth = line.width,
                children = line.children;

            var lineHAlign = GetChildrenAlign(children);
            if (lineHAlign === undefined) {
                lineHAlign = hAlign;
            }

            switch (lineHAlign) {
                case 0:
                case 'left':
                    offsetX = 0;
                    break;

                case 1:  // center
                case 'center':
                    var remainderWidth = width - lineWidth;
                    offsetX = remainderWidth / 2;
                    break;

                case 2:  // right
                case 'right':
                    var remainderWidth = width - lineWidth;
                    offsetX = remainderWidth;
                    break;

                case 3:
                case 'justify':
                case 'justify-left':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = 0;
                    }
                    break;

                case 4:
                case 'justify-center':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = remainderWidth / 2;
                    }
                    break;

                case 5:
                case 'justify-right':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = remainderWidth;
                    }
                    break;

                default:
                    offsetX = 0;
                    break;
            }

            var linesHeight = result.linesHeight;
            switch (vAlign) {
                case 1: // center
                case 'center':
                    offsetY = (height - linesHeight) / 2;
                    break;

                case 2: // bottom
                case 'bottom':
                    offsetY = height - linesHeight;
                    break;

                default:
                    offsetY = 0;
                    break;
            }

            OffsetChildren(children, offsetX, offsetY);

        }

    };

    var JustifyChildren = function (children, remainderWidth) {
        var offset = remainderWidth / children.length;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable) {
                continue;
            }

            child.x += offset * i;
        }
    };

    var GetDefaultTextHeight = function () {
        var metrics = this.defaultTextStyle.getTextMetrics(this.context, this.testString);
        var ascent, descent;
        if ('actualBoundingBoxAscent' in metrics) {
            ascent = metrics.actualBoundingBoxAscent;
            descent = metrics.actualBoundingBoxDescent;
        } else {
            ascent = 0;
            descent = 0;
        }
        
        Result.ascent = ascent;
        Result.descent = descent;
        Result.height = ascent + descent;

        return Result;
    };

    var Result = {};

    const GetValue$D = Phaser.Utils.Objects.GetValue;

    var RunWordWrap$1 = function (config) {
        // Parse parameters
        var startIndex = GetValue$D(config, 'start', 0);

        SetPadding$1(this.wrapPadding, GetValue$D(config, 'padding', 0));
        var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
        var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

        // Get lineHeight, maxLines
        var lineHeight = GetValue$D(config, 'lineHeight');
        var ascent = GetValue$D(config, 'ascent', lineHeight);
        var maxLines;
        if (lineHeight === undefined) {
            // Calculate lineHeight
            var useDefaultTextHeight = GetValue$D(config, 'useDefaultTextHeight', false);
            maxLines = GetValue$D(config, 'maxLines', 0);
            if ((this.fixedHeight > 0) && (!useDefaultTextHeight)) {
                var innerHeight = this.fixedHeight - paddingVertical;
                if (maxLines > 0) {
                    // Calculate lineHeight via maxLines, in fixedHeight mode
                    lineHeight = innerHeight / maxLines;
                } else {
                    var textHeightResult = GetDefaultTextHeight.call(this);
                    lineHeight = textHeightResult.height;
                    ascent = textHeightResult.ascent;
                    // Calculate maxLines via (ascent, lineHeight), in fixedHeight mode
                    maxLines = Math.floor((innerHeight - ascent) / lineHeight);
                }
            } else {
                var textHeightResult = GetDefaultTextHeight.call(this);
                lineHeight = textHeightResult.height;
                ascent = textHeightResult.ascent;
            }

        } else {
            // Calculate maxLines
            if (this.fixedHeight > 0) {
                // Calculate maxLines via lineHeight, in fixedHeight mode
                maxLines = GetValue$D(config, 'maxLines');
                if (maxLines === undefined) {
                    var innerHeight = this.fixedHeight - paddingVertical;
                    maxLines = Math.floor(innerHeight / lineHeight);
                }
            } else {
                maxLines = GetValue$D(config, 'maxLines', 0); // Default is show all lines
            }

        }

        // If ascent is undefined, assign to lineHeight
        if (ascent === undefined) {
            ascent = lineHeight;
        }

        var showAllLines = (maxLines === 0);

        var wrapMode = GetValue$D(config, 'wrapMode');
        if (wrapMode === undefined) {
            var charWrap = GetValue$D(config, 'charWrap', false);
            wrapMode = (charWrap) ? 'char' : 'word';
        }
        if (typeof (wrapMode) === 'string') {
            wrapMode = WRAPMODE[wrapMode];
        }

        // Get wrapWidth
        var wrapWidth = GetValue$D(config, 'wrapWidth', undefined);
        if (wrapWidth === undefined) {
            if (this.fixedWidth > 0) {
                wrapWidth = this.fixedWidth - paddingHorizontal;
            } else {
                wrapWidth = Infinity; // No word-wrap
                wrapMode = 0;
            }
        }

        var letterSpacing = GetValue$D(config, 'letterSpacing', 0);

        var hAlign = GetValue$D(config, 'hAlign', 0);
        var vAlign = GetValue$D(config, 'vAlign', 0);
        var justifyPercentage = GetValue$D(config, 'justifyPercentage', 0.25);

        var result = CreateWrapResultData({
            // Override properties
            callback: 'runWordWrap',
            start: startIndex,  // Next start index
            padding: this.wrapPadding,
            letterSpacing: letterSpacing,
            maxLines: maxLines,
            hAlign: hAlign,
            vAlign: vAlign,
            justifyPercentage: justifyPercentage,

            // Specific properties
            ascent: ascent,
            lineHeight: lineHeight,
            wrapWidth: wrapWidth,
            wrapMode: wrapMode,
        });

        // Set all children to inactive
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setActive(false);
        }

        // Layout children
        wrapWidth += letterSpacing;
        var startX = this.padding.left + this.wrapPadding.left,
            startY = this.padding.top + this.wrapPadding.top + ascent,  // Start(baseline) from ascent, not 0
            x = startX,
            y = startY;
        var remainderWidth = wrapWidth,
            childIndex = startIndex,
            lastChildIndex = children.length;
        var resultChildren = result.children;
        var resultLines = result.lines,
            lastLine = [], lastLineWidth = 0, maxLineWidth = 0;
        var wordResult;
        var isPageBreakChar = false;
        while (childIndex < lastChildIndex) {
            wordResult = GetWord(children, childIndex, wrapMode, wordResult);
            var word = wordResult.word;
            var charCnt = word.length;
            var wordWidth = wordResult.width + (charCnt * letterSpacing);

            childIndex += charCnt;
            // Next line
            var isNewLineChar = IsNewLineChar(word[0]);
            isPageBreakChar = IsPageBreakChar(word[0]);
            var isControlChar = isNewLineChar || isPageBreakChar;
            if ((remainderWidth < wordWidth) || isControlChar) {
                // Add to result
                if (isControlChar) {
                    var char = word[0];
                    char.setActive().setPosition(x, y);
                    resultChildren.push(char);
                    lastLine.push(char);
                }

                // Move cursor
                x = startX;
                y += lineHeight;
                remainderWidth = wrapWidth;
                resultLines.push({ children: lastLine, width: lastLineWidth });
                maxLineWidth = Math.max(maxLineWidth, lastLineWidth);

                lastLineWidth = 0;
                lastLine = [];

                var isPageEnd = isPageBreakChar ||
                    (!showAllLines && (resultLines.length === maxLines)); // Exceed maxLines
                if (isPageEnd) {
                    break;
                } else if (isControlChar) {  // Already add to result
                    continue;
                }
            }
            remainderWidth -= wordWidth;
            lastLineWidth += wordWidth;

            for (var i = 0, cnt = word.length; i < cnt; i++) {
                var child = word[i];
                child.setActive();
                resultChildren.push(child);
                lastLine.push(child);

                if (child.renderable) {
                    child.setPosition(x, y);
                    x += (child.outerWidth + letterSpacing);
                }
            }
        }

        if (lastLine.length > 0) {
            resultLines.push({ children: lastLine, width: lastLineWidth });
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        }

        result.start += resultChildren.length;
        result.isLastPage = (!isPageBreakChar) && (result.start === lastChildIndex);
        result.maxLineWidth = maxLineWidth;
        result.linesHeight = (resultLines.length * lineHeight);

        // Calculate size of game object
        var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.maxLineWidth + paddingHorizontal);
        var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.linesHeight + paddingVertical);

        // Size might be changed after wrapping
        var innerWidth = width - paddingHorizontal;
        var innerHeight = height - paddingVertical;
        AlignLines$1(result, innerWidth, innerHeight);

        // Resize
        this.setCanvasSize(width, height);

        // Set initial position
        for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
            var child = resultChildren[i];
            if (!child.renderable) {
                continue;
            }
            child.x0 = child.x;
            child.y0 = child.y;
        }

        return result;
    };

    const Merge$1 = Phaser.Utils.Objects.Merge;

    var RunWordWrap = function (config) {
        if (config === undefined) {
            config = {};
        }

        return RunWordWrap$1.call(this, Merge$1(config, this.wrapConfig));
    };

    var AlignLines = function (result, width, height) {
        var hAlign = result.hAlign,
            vAlign = result.vAlign;

        var offsetX, offsetY;

        var rtl = result.rtl;
        var lines = result.lines,
            lineWidth = result.lineWidth,
            linesWidth = result.linesWidth;
        switch (hAlign) {
            case 1:  // center
            case 'center':
                offsetX = (width - linesWidth) / 2;
                break;

            case 2:  // right
            case 'right':
                offsetX = width - linesWidth;
                break;

            default:  // left
                offsetX = 0;
                break;
        }
        if (rtl) {
            offsetX += lineWidth;
        }

        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var line = lines[(rtl) ? (lcnt - li - 1) : li];
            var children = line.children;
            var lineHeight = line.height;

            var lineVAlign = GetChildrenAlign(children);
            if (lineVAlign === undefined) {
                lineVAlign = vAlign;
            }

            switch (lineVAlign) {
                case 1: // center
                case 'center':
                    offsetY = (height - lineHeight) / 2;
                    break;

                case 2: // bottom
                case 'bottom':
                    offsetY = height - lineHeight;
                    break;

                default: // top
                    offsetY = 0;
                    break;
            }

            OffsetChildren(children, offsetX, offsetY);

            offsetX += lineWidth;
        }
    };

    const GetValue$C = Phaser.Utils.Objects.GetValue;

    var RunVerticalWrap$1 = function (config) {
        // Parse parameters
        var startIndex = GetValue$C(config, 'start', 0);

        SetPadding$1(this.wrapPadding, GetValue$C(config, 'padding', 0));
        var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
        var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

        var lineWidth = GetValue$C(config, 'lineWidth', undefined);
        var maxLines;
        if (lineWidth === undefined) {
            // Calculate lineWidth via maxLines, in fixedWidth mode
            maxLines = GetValue$C(config, 'maxLines', 0);
            if (this.fixedWidth > 0) {
                var innerWidth = this.fixedWidth - paddingHorizontal;
                lineWidth = innerWidth / maxLines;
            } else {
                lineWidth = 0;
            }
        } else {
            if (this.fixedWidth > 0) {
                // Calculate maxLines via lineWidth, in fixedWidth mode
                maxLines = GetValue$C(config, 'maxLines', undefined);
                if (maxLines === undefined) {
                    var innerWidth = this.fixedWidth - paddingHorizontal;
                    maxLines = Math.floor(innerWidth / lineWidth) + 1;
                }
            } else {
                maxLines = GetValue$C(config, 'maxLines', 0); // Default is show all lines
            }

        }
        var showAllLines = (maxLines === 0);

        // Get fixedCharacterHeight
        var fixedCharacterHeight = GetValue$C(config, 'fixedCharacterHeight', undefined);
        if (fixedCharacterHeight === undefined) {
            var charPerLine = GetValue$C(config, 'charPerLine', undefined);
            if (charPerLine !== undefined) {
                var innerHeight = this.fixedHeight - paddingVertical;
                fixedCharacterHeight = Math.floor(innerHeight / charPerLine);
            }
        }

        // Get wrapHeight
        var wrapHeight = GetValue$C(config, 'wrapHeight', undefined);
        if (wrapHeight === undefined) {
            if (this.fixedHeight > 0) {
                wrapHeight = this.fixedHeight - paddingVertical;
            } else {
                wrapHeight = Infinity; // No word-wrap
            }
        }

        var letterSpacing = GetValue$C(config, 'letterSpacing', 0);

        var rtl = GetValue$C(config, 'rtl', true);
        var hAlign = GetValue$C(config, 'hAlign', rtl ? 2 : 0);
        var vAlign = GetValue$C(config, 'vAlign', 0);

        var result = CreateWrapResultData({
            // Override properties
            callback: 'runVerticalWrap',
            start: startIndex,  // Next start index
            padding: this.wrapPadding,
            letterSpacing: letterSpacing,
            maxLines: maxLines,
            hAlign: hAlign,
            vAlign: vAlign,

            // Specific properties
            lineWidth: lineWidth,
            fixedCharacterHeight: fixedCharacterHeight,
            wrapHeight: wrapHeight,        
            rtl: rtl,
        });

        // Set all children to active
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setActive(false);
        }

        // Layout children
        wrapHeight += letterSpacing;
        var startX = this.padding.left + this.wrapPadding.left,  // Reset x of each character in AlignLines method
            startY = this.padding.top + this.wrapPadding.top,
            x = startX,
            y = startY;
        var remainderHeight = wrapHeight,
            childIndex = startIndex,
            lastChildIndex = children.length;
        var resultChildren = result.children;
        var resultLines = result.lines,
            lastLine = [], lastLineHeight = 0, maxLineHeight = 0;
        while (childIndex < lastChildIndex) {
            // Append non-typeable child directly
            var child = children[childIndex];
            childIndex++;
            if (!child.renderable) {
                child.setActive();
                resultChildren.push(child);
                lastLine.push(child);
                continue;
            }

            var childHeight = ((fixedCharacterHeight !== undefined) ? fixedCharacterHeight : child.height) + letterSpacing;
            // Next line
            var isNewLineChar = IsNewLineChar(child);
            var isPageBreakChar = IsPageBreakChar(child);
            var isControlChar = isNewLineChar || isPageBreakChar;
            if ((remainderHeight < childHeight) || isControlChar) {
                // Add to result
                if (isNewLineChar) {
                    child.setActive().setPosition(x, y).setOrigin(0.5);
                    resultChildren.push(child);
                    lastLine.push(child);
                }

                // Move cursor
                x = startX;
                y = startY;
                remainderHeight = wrapHeight;
                resultLines.push({ children: lastLine, height: lastLineHeight });
                maxLineHeight = Math.max(maxLineHeight, lastLineHeight);

                lastLineHeight = 0;
                lastLine = [];

                var isPageEnd = isPageBreakChar ||
                    (!showAllLines && (resultLines.length === maxLines)); // Exceed maxLines
                if (isPageEnd) {
                    break;
                } else if (isControlChar) {  // Already add to result                
                    continue;
                }
            }
            remainderHeight -= childHeight;
            lastLineHeight += childHeight;

            child.setActive().setPosition(x, y).setOrigin(0.5);
            resultChildren.push(child);
            lastLine.push(child);
            y += childHeight;
        }

        if (lastLine.length > 0) {
            resultLines.push({ children: lastLine, height: lastLineHeight });
            maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
        }

        result.start += resultChildren.length;
        result.isLastPage = (result.start === lastChildIndex);
        result.maxLineHeight = maxLineHeight;
        result.linesWidth = (resultLines.length * lineWidth);

        // Calculate size of game object
        var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.linesWidth + paddingHorizontal);
        var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.maxLineHeight + paddingVertical);

        // Size might be changed after wrapping
        var innerWidth = width - paddingHorizontal;
        var innerHeight = height - paddingVertical;
        AlignLines(result, innerWidth, innerHeight);

        // Resize
        this.setCanvasSize(width, height);

        // Set initial position
        for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
            var child = resultChildren[i];
            if (!child.renderable) {
                continue;
            }
            child.x0 = child.x;
            child.y0 = child.y;
        }

        return result;
    };

    const Merge = Phaser.Utils.Objects.Merge;

    var RunVerticalWrap = function (config) {
        if (config === undefined) {
            config = {};
        }

        return RunVerticalWrap$1.call(this, Merge(config, this.wrapConfig));
    };

    const GetValue$B = Phaser.Utils.Objects.GetValue;

    var RunWrap = function (config) {
        var wrapCallback = GetValue$B(this.wrapConfig, 'callback');
        if (!wrapCallback) {
            wrapCallback = GetValue$B(config, 'callback', this.runWordWrap);
        }
        if (typeof (wrapCallback) === 'string') {
            wrapCallback = this[wrapCallback];
        }

        return wrapCallback.call(this, config);
    };

    var SetAlignMethods = {
        setVAlign(align) {
            this.wrapConfig.vAlign = align;
            return this;
        },

        setHAlign(align) {
            this.wrapConfig.hAlign = align;
            return this;
        }
    };

    var SetTextOXYMethods = {
        setTextOX(ox) {
            if (ox === this._textOX) {
                return this;
            }

            this._textOX = ox;
            return this;
        },

        setTextOY(oy) {
            if (oy === this._textOY) {
                return this;
            }

            this._textOY = oy;
            return this;
        },

        setTextOXY(ox, oy) {
            if ((ox === this._textOX) && (oy === this._textOY)) {
                return;
            }

            this._textOX = ox;
            this._textOY = oy;
            return this;
        },

        addTextOX(incX) {
            this.setTextOX(this._textOX + incX);
            return this;
        },

        addTextOY(incY) {
            this.setTextOY(this._textOY + incY);
            return this;
        },

        addTextOXY(incX, incY) {
            this.setTextOXY(this._textOX + incX, this._textOY + incY);
            return this;
        }

    };

    var RenderContent = function () {
        this.clear();

        this.setCanvasSize(this.width, this.height);

        if (this.background.active) {
            this.background.render();
        }

        var child;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            child = this.children[i];
            if (child.active) {
                child.render();
            }
        }

        if (this.innerBounds.active) {
            this.innerBounds.render();
        }
    };

    var ForEachChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var ForEachRenderableChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            if (!child.renderable || child.removed) {
                return false;
            }

            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var ForEachCharChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            if (!IsChar(child) || child.removed) {
                return false;
            }

            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var GetChildren = function () {
        return this.children;
    };

    const GetAll = Phaser.Utils.Array.GetAll;

    var GetActiveChildren = function () {
        return GetAll(this.children, 'active', true);
    };

    var GetCharChildren = function (activeOnly, out) {
        if (out === undefined) {
            out = [];
        }

        this.forEachCharChild(function (child) {
            out.push(child);
        }, undefined, activeOnly);

        return out;
    };

    var GetLastAppendedChildren = function () {
        return this.lastAppendedChildren;
    };

    var GetBobCenterPosition = function (bob, offsetX, offsetY, out) {
        if (typeof (offsetX) !== 'number') {
            out = offsetX;
            offsetX = 0;
            offsetY = 0;
        }
        var bobX = bob.drawCenterX + offsetX;
        var bobY = bob.drawCenterY + offsetY;
        return BobPositionToCanvasPosition(bob, bobX, bobY, out);
    };

    const GetDistance = Phaser.Math.Distance.BetweenPointsSquared;

    var GetNearestChild = function (canvasX, canvasY) {
        var pointA = { x: canvasX, y: canvasY };

        var minDistance = Infinity;
        var nearestChild = null;
        this.forEachRenderableChild(function (child) {
            var distance = GetDistance(pointA, GetBobCenterPosition(child, true));
            if (minDistance > distance) {
                minDistance = distance;
                nearestChild = child;
            }
        });

        return nearestChild;
    };

    var GetCharWorldPosition = function (child, offsetX, offsetY, out) {
        if (typeof (child) === 'number') {
            child = this.getCharChild(child, true);
        }

        return GetBobWorldPosition(this, child, offsetX, offsetY, out);
    };

    var SetToMinSize = function () {
        var children = this.children;
        var maxX = 0,
            maxY = 0;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable || !child.active || !child.visible) {
                continue;
            }

            var x0 = (child.x0 !== undefined) ? child.x0 : child.x;
            var y0 = (child.y0 !== undefined) ? child.y0 : child.y;
            maxX = Math.max(maxX, x0);
            maxY = Math.max(maxY, y0);
        }

        var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
        var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

        // Ignore fixedWidth, and fixedHeight
        if ((this.width !== width) || (this.height !== height)) {
            this.dirty = true;
            this.setCanvasSize(width, height);
        }
        return this;
    };

    var GetCharChildIndex = function (charIndex, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                if (charIndex === 0) {
                    return i;
                } else {
                    charIndex--;
                }
            }
        }

        return undefined;
    };

    var GetCharChild = function (charIndex, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                if (charIndex === 0) {
                    return child;
                } else {
                    charIndex--;
                }
            }
        }

        return undefined;
    };

    var GetCharIndex = function (childIndex, activeOnly) {
        if (typeof (childIndex) !== 'number') {
            childIndex = this.children.indexOf(childIndex);
            if (childIndex < 0) {
                return null;
            }
        }

        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        if (childIndex >= children.length) {
            childIndex = children.length;
        }
        var charIndex = 0;
        for (var i = 0; i < childIndex; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                charIndex++;
            }
        }

        return charIndex;
    };

    var SetChildrenInteractiveEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.childrenInteractiveEnable !== enable) {
            this.lastOverChild = null;
        }

        this.childrenInteractiveEnable = enable;

        return this;
    };

    var GetFirstChildContains = function (children, x, y) {
        var children = children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.active || !child.renderable) {
                continue;
            }
            if (child.contains(x, y)) {
                return child;
            }
        }
        return null;
    };

    var SetChildrenInteractive = function () {
        this
            .on('pointerdown', OnPointerDown, this)

            .on('pointerdown', OnPointerUp, this)

            .on('pointermove', OnPointOverOut, this)
            .on('pointerover', OnPointOverOut, this)
            .on('pointerout', function (pointer, event) {
                OnPointOverOut.call(this, pointer, null, null, event);
            }, this);

        return this;
    };

    var OnPointerDown = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (!child) {
            return;
        }

        this.emit('child.pointerdown', child, pointer, localX, localY, event);
    };

    var OnPointerUp = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (!child) {
            return;
        }

        this.emit('child.pointerup', child, pointer, localX, localY, event);
    };

    var OnPointOverOut = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        if (localX === null) {  // Case of pointerout
            if (this.lastOverChild !== null) {
                this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
                this.lastOverChild = null;
            }
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (child === this.lastOverChild) {
            return;
        }

        if (this.lastOverChild !== null) {
            this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
        }

        if (child !== null) {
            this.emit('child.pointerover', child, pointer, localX, localY, event);
        }

        this.lastOverChild = child;
    };

    const GameObject = Phaser.GameObjects.GameObject;

    var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
        var isInteractived = !!this.input;

        GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

        if (!isInteractived) {
            SetChildrenInteractive.call(this);
        }

        return this;
    };

    const BringToTop = Phaser.Utils.Array.BringToTop;
    const SendToBack = Phaser.Utils.Array.SendToBack;
    const MoveUp = Phaser.Utils.Array.MoveUp;
    const MoveDown = Phaser.Utils.Array.MoveDown;
    const MoveAbove = Phaser.Utils.Array.MoveAbove;
    const MoveBelow = Phaser.Utils.Array.MoveBelow;

    var MoveChildMethods = {
        moveChildToFist(child) {
            SendToBack(this.children, child);
            return this;
        },

        moveChildToLast(child) {
            BringToTop(this.children, child);
            return this;
        },
        movechildUp(child) {
            MoveUp(this.children, child);
            return this;
        },

        movechildDown(child) {
            MoveDown(this.children, child);
            return this;
        },

        movechildAbove(child, baseChild) {
            MoveAbove(this.children, child, baseChild);
            return this;
        },

        movechildBelow(child, baseChild) {
            MoveBelow(this.children, child, baseChild);
            return this;
        },

    };

    var BackgroundMethods = {
        setBackgroundColor(color, color2, isHorizontalGradient) {
            this.background.setColor(color, color2, isHorizontalGradient);
            return this;
        },

        setBackgroundStroke(color, lineWidth) {
            this.background.setStroke(color, lineWidth);
            return this;
        },

        setBackgroundCornerRadius(radius, iteration) {
            this.background.setCornerRadius(radius, iteration);
            return this;
        }
    };

    var InnerBoundsMethods = {
        setInnerBoundsColor(color, color2, isHorizontalGradient) {
            this.innerBounds.setColor(color, color2, isHorizontalGradient);
            return this;
        },

        setInnerBoundsStroke(color, lineWidth) {
            this.innerBounds.setStroke(color, lineWidth);
            return this;
        },
    };

    var Methods$5 = {
        setFixedSize: SetFixedSize,
        setPadding: SetPadding,
        getPadding: GetPadding,
        modifyTextStyle: ModifyTextStyle,
        modifyDefaultTextStyle: ModifyDefaultTextStyle,
        resetTextStyle: ResetTextStyle,
        setTestString: SetTestString,

        removeChild: RemoveChild,
        removeChildren: RemoveChildren,
        popChild: PopChild,
        clearContent: ClearContent,
        addChild: AddChild$1,
        createCharChild: CreateCharChild,
        createCharChildren: CreateCharChildren,
        setText: SetText,
        appendText: AppendText,
        insertText: InsertText,
        removeText: RemoveText,
        getText: GetText,
        createImageChild: CreateImageChild,
        appendImage: AppendImage,
        createDrawerChild: CreateDrawerChild,
        appendDrawer: AppendDrawer,
        createSpaceChild: CreateSpaceChild,
        appendSpace: AppendSpace,
        createCommandChild: CreateCommandChild,
        appendCommand: AppendCommand,

        setWrapConfig: SetWrapConfig,
        runWordWrap: RunWordWrap,
        runVerticalWrap: RunVerticalWrap,
        runWrap: RunWrap,
        renderContent: RenderContent,

        forEachChild: ForEachChild,
        forEachRenderableChild: ForEachRenderableChild,
        forEachCharChild: ForEachCharChild,
        getChildren: GetChildren,
        getActiveChildren: GetActiveChildren,
        getCharChildren: GetCharChildren,
        getLastAppendedChildren: GetLastAppendedChildren,
        getNearestChild: GetNearestChild,
        getCharWorldPosition: GetCharWorldPosition,

        setToMinSize: SetToMinSize,

        getCharChildIndex: GetCharChildIndex,
        getCharChild: GetCharChild,
        getCharIndex: GetCharIndex,


        setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
        setInteractive: SetInteractive,
    };

    Object.assign(
        Methods$5,

        MoveChildMethods,
        BackgroundMethods,
        InnerBoundsMethods,
        SetAlignMethods,
        SetTextOXYMethods,

    );

    class Stack {
        constructor() {
            this.items = [];
        }

        destroy() {
            this.clear();
            this.items = undefined;
        }

        pop() {
            return (this.items.length > 0) ? this.items.pop() : null;
        }

        push(l) {
            this.items.push(l);
            return this;
        }

        pushMultiple(arr) {
            this.items.push.apply(this.items, arr);
            arr.length = 0;
            return this;
        }

        clear() {
            this.items.length = 0;
            return this;
        }
    }

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;

    var Pools = {};
    class PoolManager {
        constructor(config) {
            this.pools = GetFastValue(config, 'pools', Pools);
        }

        free(bob) {
            if (!this.pools) {
                return this;
            }

            var bobType = bob.type;
            if (!this.pools.hasOwnProperty(bobType)) {
                this.pools[bobType] = new Stack();
            }
            this.pools[bobType].push(bob);
            bob.onFree();
            return this;
        }

        freeMultiple(arr) {
            if (!this.pools) {
                return this;
            }

            for (var i = 0, cnt = arr.length; i < cnt; i++) {
                this.free(arr[i]);
            }
            return this;
        }

        allocate(bobType) {
            if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
                return null;
            }
            return this.pools[bobType].pop();
        }
    }

    const IsPlainObject$a = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$A = Phaser.Utils.Objects.GetValue;

    class DynamicText extends Canvas {
        constructor(scene, x, y, fixedWidth, fixedHeight, resolution, config) {
            if (IsPlainObject$a(x)) {
                config = x;
                x = GetValue$A(config, 'x', 0);
                y = GetValue$A(config, 'y', 0);
                fixedWidth = GetValue$A(config, 'width', 0);
                fixedHeight = GetValue$A(config, 'height', 0);
                resolution = GetValue$A(config, 'resolution', 1);
            } else if (IsPlainObject$a(fixedWidth)) {
                config = fixedWidth;
                fixedWidth = GetValue$A(config, 'width', 0);
                fixedHeight = GetValue$A(config, 'height', 0);
                resolution = GetValue$A(config, 'resolution', 1);
            } else if (IsPlainObject$a(resolution)) {
                config = resolution;
                resolution = GetValue$A(config, 'resolution', 1);
            }

            var width = (fixedWidth === 0) ? 1 : fixedWidth;
            var height = (fixedHeight === 0) ? 1 : fixedHeight;
            super(scene, x, y, width, height, resolution);
            this.type = 'rexDynamicText';
            this.autoRound = true;
            this.padding = SetPadding$1();
            this.wrapPadding = SetPadding$1();

            var textStyleConfig = GetValue$A(config, 'style', undefined);
            this.defaultTextStyle = new TextStyle(null, textStyleConfig);
            this.textStyle = this.defaultTextStyle.clone();
            this.setTestString(GetValue$A(config, 'testString', '|MÉqgy'));

            this._textOX = 0;
            this._textOY = 0;
            this.background = new Background(this, GetValue$A(config, 'background', undefined));
            this.innerBounds = new InnerBounds(this, GetValue$A(config, 'innerBounds', undefined));
            this.children = [];
            this.lastAppendedChildren = [];
            this.lastOverChild = null;
            this.poolManager = new PoolManager(config);

            this.setFixedSize(fixedWidth, fixedHeight);
            this.setPadding(GetValue$A(config, 'padding', 0));
            this.setWrapConfig(GetValue$A(config, 'wrap', undefined));
            this.setChildrenInteractiveEnable(GetValue$A(config, 'childrenInteractive', false));

            var text = GetValue$A(config, 'text', undefined);
            if (text) {
                this.setText(text);
            }
        }

        updateTexture() {
            super.updateTexture(function () {
                this.renderContent();
            }, this);
            return this;
        }

        get text() {
            return this.getText(true);
        }

        set text(value) {
            this.setText(value);
        }

        setSize(width, height) {
            this.setFixedSize(width, height);
            return this;
        }

        get textOX() {
            return this._textOX;
        }

        set textOX(value) {
            this.setTextOX(value);
        }

        get textOY() {
            return this._textOY;
        }

        set textOY(value) {
            this.setTextOY(value);
        }
    }

    Object.assign(
        DynamicText.prototype,
        Methods$5
    );

    var TextRunWidthWrap = function (textObject) {
        var RunWidthWrap = function (width) {
            var padding = textObject.padding;
            var wrapWidth = width - ((padding.left + padding.right) * textObject.scaleX);
            var style = textObject.style;
            if (IsTextGameObject(textObject)) {
                style.wordWrapWidth = wrapWidth;
                style.maxLines = 0;
            } else {  // BBCode text, Tag text
                if (style.wrapMode === 0) { // Turn no-wrap to word-wrap
                    style.wrapMode = 1;
                }
                style.wrapWidth = wrapWidth;
                style.maxLines = 0;
            }
            style.fixedWidth = width;
            style.fixedHeight = 0;
            textObject.updateText();  // Redraw text

            textObject.minHeight = textObject.height;
            return textObject;
        };
        return RunWidthWrap;
    };

    var DynamicTextRunWidthWrap = function (textObject) {
        var RunWidthWrap = function (width) {
            textObject
                .setFixedSize(width, 0)
                .runWordWrap();

            textObject.minHeight = textObject.height;
            return textObject;
        };
        return RunWidthWrap;
    };

    var BitmapTextRunWidthWrap = function (textObject) {
        var RunWidthWrap = function (width) {
            textObject.setMaxWidth(width);

            textObject.minHeight = textObject.height;
            return textObject;
        };
        return RunWidthWrap;
    };

    var IsDynamicTextGameObject = function (gameObject) {
        return (gameObject instanceof DynamicText);
    };

    var WrapExpandText = function (textObject, minWidth) {
        if (minWidth === undefined) {
            minWidth = 0;
        }

        textObject._minWidth = minWidth;

        textObject.runWidthWrap =
            IsDynamicTextGameObject(textObject) ? DynamicTextRunWidthWrap(textObject) :
                IsBitmapTextGameObject(textObject) ? BitmapTextRunWidthWrap(textObject) :
                    TextRunWidthWrap(textObject);

        return textObject;
    };

    const MaxTestCount = 65535;

    var FontSizeFit = function (textObject, width, height) {
        if (width == null) {
            // Do nothing if invalid width input
            return textObject;
        }
        if (width === 0) {
            SetTextWidth(textObject, 0, height);
            return textObject;
        }

        var textLength = textObject.text.length;
        if (textLength === 0) {
            SetTextWidth(textObject, width, height);
            return textObject;
        }

        var fontSize = Math.floor(width * 1.5 / textLength);
        if (height !== undefined) {
            if (fontSize > height) {
                fontSize = Math.floor(height);
            }
        }

        var sizeData = {};
        var testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
        for (var i = 0; i <= MaxTestCount; i++) {
            if (testResult === 0) {
                break;
            } else {
                fontSize += testResult;
                if (fontSize < 0) {
                    fontSize = 0;
                    break;
                }
            }
            testResult = TestFontSize(textObject, fontSize, width, height, sizeData);
            // console.log(fontSize, testResult)
        }

        if (i === MaxTestCount) {
            console.warn(`FontSizeFit: Test count exceeds ${MaxTestCount}`);
        }

        textObject.setFontSize(fontSize);
        SetTextWidth(textObject, width, height);

        return textObject;
    };

    var GetTextSize = function (textObject, fontSize, sizeData) {
        if (sizeData[fontSize] === undefined) {
            textObject.setFontSize(fontSize);
            sizeData[fontSize] = {
                width: textObject.width,
                height: textObject.height
            };
        }

        return sizeData[fontSize]
    };

    var TestFontSize = function (textObject, fontSize, width, height, sizeData) {
        var textSize = GetTextSize(textObject, fontSize, sizeData);
        var textSize1 = GetTextSize(textObject, fontSize + 1, sizeData);

        var deltaHeight;
        if (height !== undefined) {
            // Clamp by height
            if ((textSize.height <= height) && (textSize1.height > height)) {
                deltaHeight = 0;

            } else if (textSize.height > height) { // Reduce font size
                return -1;

            } else {
                // Increase font size
                deltaHeight = Math.floor(height - textSize.height);
            }
        }

        // Clamp by width
        var deltaWidth;
        if ((textSize.width <= width) && (textSize1.width > width)) {
            return 0;

        } else if (textSize.width > width) {  // Reduce font size
            return -1;

        } else {
            // Increase font size
            var deltaWidth = Math.floor(width - textSize.width);
            if (deltaHeight === undefined) {
                return deltaWidth;
            } else {
                return Math.min(deltaWidth, deltaHeight);
            }
        }
    };

    var SetTextWidth = function (textObject, width, height) {
        var style = textObject.style;

        if (!style) {
            // BitmapText game object does not have style property
            return;
        }

        style.fixedWidth = width;
        style.parent.width = width;

        if (height !== undefined) {
            style.fixedHeight = height;
            style.parent.height = height;
        }

        style.update(false);
    };

    const GetValue$z = Phaser.Utils.Objects.GetValue;

    var FontSizeExpandText = function (textObject, config) {
        if (typeof (config) === 'number') {
            config = {
                minWidth: config
            };
        }

        var minWidth = GetValue$z(config, 'minWidth', 0);
        var minHeight = GetValue$z(config, 'minHeight', 0);
        var fitHeight = GetValue$z(config, 'fitHeight', false);

        textObject._minWidth = minWidth;
        textObject._minHeight = minHeight;

        if (!fitHeight) {
            // Set font size to fit width only
            textObject.runWidthWrap = function (width) {
                if (textObject.setFixedSize) {
                    textObject.setFixedSize(0, 0);
                }
                FontSizeFit(textObject, width, undefined);
                return textObject;
            };
            textObject.resize = function (width, height) {
                if ((textObject.width === width) && (textObject.height === height)) {
                    return textObject;
                }

                // Font size is set under runWidthWrap/FontSizeFit
                textObject.setFixedSize(width, height);
                return textObject;
            };

        } else {
            // Set font size to fit width and height
            textObject.runWidthWrap = function (width) {
                // Minimun text size
                if (textObject.setFixedSize) {
                    textObject.setFixedSize(0, 0);
                }

                textObject.setFontSize(1);
                return textObject;
            };
            textObject.resize = function (width, height) {
                FontSizeFit(textObject, width, height);
                return textObject;
            };
        }

        return textObject;
    };

    const GetValue$y = Phaser.Utils.Objects.GetValue;

    class Label extends LabelBase {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            // Create sizer
            super(scene, config);
            this.type = 'rexLabel';

            // Add elements
            var background = GetValue$y(config, 'background', undefined);
            var icon = GetValue$y(config, 'icon', undefined);
            var iconMask = GetValue$y(config, 'iconMask', undefined);
            var text = GetValue$y(config, 'text', undefined);
            var action = GetValue$y(config, 'action', undefined);
            var actionMask = GetValue$y(config, 'actionMask', undefined);
            // Align
            var align = GetValue$y(config, 'align', undefined); // undefined/left/top: no space


            if (background) {
                this.addBackground(background);
            }

            if (icon) {
                var padding;
                if (this.orientation === 0) {
                    if (text || action) {
                        padding = {
                            right: GetValue$y(config, 'space.icon', 0),
                            top: GetValue$y(config, 'space.iconTop', 0),
                            bottom: GetValue$y(config, 'space.iconBottom', 0),
                            left: GetValue$y(config, 'space.iconLeft', 0),
                        };
                    }
                } else {
                    if (text || action) {
                        padding = {
                            bottom: GetValue$y(config, 'space.icon', 0),
                            left: GetValue$y(config, 'space.iconLeft', 0),
                            right: GetValue$y(config, 'space.iconRight', 0),
                            top: GetValue$y(config, 'space.iconTop', 0),
                        };
                    }
                }
                var fitRatio = GetValue$y(config, 'squareFitIcon', false) ? 1 : 0;

                this.add(
                    icon,
                    { proportion: 0, padding: padding, fitRatio: fitRatio }
                );

                if (iconMask) {
                    iconMask = AddChildMask.call(this, icon, icon, 1); // Circle mask
                }

                if (!fitRatio) {
                    var iconSize = GetValue$y(config, 'iconSize', undefined);
                    this.setIconSize(
                        GetValue$y(config, 'iconWidth', iconSize),
                        GetValue$y(config, 'iconHeight', iconSize)
                    );
                }
            }


            if (text) {
                var wrapText = GetValue$y(config, 'wrapText', false);
                var adjustTextFontSize = GetValue$y(config, 'adjustTextFontSize', false);
                if (wrapText) {
                    if (wrapText === true) {
                        wrapText = 'word';
                    }
                    SetWrapMode(text, wrapText);
                    config.expandTextWidth = true;
                    WrapExpandText(text);

                } else if (adjustTextFontSize) {
                    config.expandTextWidth = true;
                    config.expandTextHeight = true;
                    FontSizeExpandText(text, { fitHeight: true });

                }

                var textSpace = GetValue$y(config, 'space.text', 0);
                var expandTextWidth = GetValue$y(config, 'expandTextWidth', false);
                var expandTextHeight = GetValue$y(config, 'expandTextHeight', false);
                var proportion, padding, expand;
                if (this.orientation === 0) {
                    proportion = (expandTextWidth) ? 1 : 0;
                    if (action) {
                        padding = { right: textSpace };
                    }
                    expand = expandTextHeight;
                } else {
                    proportion = (expandTextHeight) ? 1 : 0;
                    if (action) {
                        padding = { bottom: textSpace };
                    }
                    expand = expandTextWidth;
                }

                this.add(
                    text,
                    { proportion: proportion, expand: expand, padding: padding, }
                );
            }

            if (action) {
                var padding;
                if (this.orientation === 0) {
                    padding = {
                        top: GetValue$y(config, 'space.actionTop', 0),
                        bottom: GetValue$y(config, 'space.actionBottom', 0),
                        right: GetValue$y(config, 'space.actionRight', 0),
                    };
                } else {
                    padding = {
                        left: GetValue$y(config, 'space.actionLeft', 0),
                        right: GetValue$y(config, 'space.actionRight', 0),
                        bottom: GetValue$y(config, 'space.actionBottom', 0),
                    };
                }
                var fitRatio = GetValue$y(config, 'squareFitAction', false) ? 1 : 0;
                this.add(
                    action,
                    { proportion: 0, padding: padding, fitRatio: fitRatio }
                );

                if (actionMask) {
                    actionMask = AddChildMask.call(this, action, action, 1); // Circle mask
                }

                if (!fitRatio) {
                    var actionSize = GetValue$y(config, 'actionSize');
                    this.setActionSize(
                        GetValue$y(config, 'actionWidth', actionSize),
                        GetValue$y(config, 'actionHeight', actionSize)
                    );
                }
            }

            this.setChildrenAlignMode(align);

            this.addChildrenMap('background', background);
            this.addChildrenMap('icon', icon);
            this.addChildrenMap('iconMask', iconMask);
            this.addChildrenMap('text', text);
            this.addChildrenMap('action', action);
            this.addChildrenMap('actionMask', actionMask);
        }
    }

    var methods$6 = {
        setWrapEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.listWrapEnable = enable;
            return this;
        },

        setCreateButtonCallback(callback) {
            this.listCreateButtonCallback = callback;
            return this;
        },

        setCreateListBackgroundCallback(callback) {
            this.listCreateBackgroundCallback = callback;
            return this;
        },

        setCreateListSliderTrackCallback(callback) {
            this.listCreateSliderTrackCallback = callback;
            return this;
        },

        setCreateListSliderThumbCallback(callback) {
            this.listCreateSliderThumbCallback = callback;
            return this;
        },

        setListSliderAdaptThumbSizeEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.listSliderAdaptThumbSizeEnable = enable;
            return this;
        },

        setListScrollerConfig(config) {
            if (config === undefined) {
                config = {};
            }
            this.listScrollerConfig = config;
            return this;
        },

        setListMouseWheelScrollerConfig(config) {
            this.listMouseWheelScrollerConfig = config;
            return this;
        },

        setButtonClickCallback(callback) {
            this.listOnButtonClick = callback;
            return this;
        },

        setButtonOverCallback(callback) {
            this.listOnButtonOver = callback;
            return this;
        },

        setButtonOutCallback(callback) {
            this.listOnButtonOut = callback;
            return this;
        },

        setListExpandDirection(direction) {
            if (typeof (direction) === 'string') {
                direction = ListExpandDirections[direction];
            }
            this.listExpandDirection = direction;
            return this;
        },

        setListEaseInDuration(duration) {
            if (duration === undefined) {
                duration = 0;
            }
            this.listEaseInDuration = duration;
            return this;
        },

        setListEaseOutDuration(duration) {
            if (duration === undefined) {
                duration = 0;
            }
            this.listEaseOutDuration = duration;
            return this;
        },

        setListTransitInCallback(callback) {
            this.listTransitInCallback = callback;
            // callback = function(gameObject, duration) {}
            return this;
        },

        settListTransitOutCallback(callback) {
            this.listTransitOutCallback = callback;
            // callback = function(gameObject, duration) {}
            return this;
        },

        setListBounds(bounds) {
            this.listBounds = bounds;
            return this;
        },

        setListWidth(width) {
            this.listWidth = width;
            return this;
        },

        setListHeight(height) {
            this.listHeight = height;
            return this;
        },

        setListSize(width, height) {
            this.setListWidth(width).setListHeight(height);
            return this;
        },

        setListMaxHeight(height) {
            this.listMaxHeight = height;
            return this;
        },


        setListAlignmentMode(mode) {
            this.listAlignMode = mode;
            return this;
        },

        setListAlignmentSide(side) {
            if (side === undefined) {
                side = '';
            }

            this.listAlignSide = side;
            return this;
        },

        setListSpace(space) {
            if (space === undefined) {
                space = {};
            }
            this.listSpace = space;
            return this;
        },

        setListDraggable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.listDraggable = enable;
            return this;
        },

    };

    const ListExpandDirections = {
        down: 0,
        up: 1
    };

    const SizerAdd$1 = Sizer.prototype.add;
    const SizerAddSpace = Sizer.prototype.addSpace;

    var Add$4 = function (gameObject) {
        var isNormalGameObject = !gameObject.isRexSpace;
        var proportion = (!isNormalGameObject || this.buttonsExpand) ? 1 : 0;

        if (this.sizerChildren.length === 0) {  // First element
            if (isNormalGameObject) {
                // Add space at head
                var hasHeadSpace = (!this.buttonsExpand) &&
                    ((this.buttonsAlign === 'right') || (this.buttonsAlign === 'center') || (this.buttonsAlign === 'bottom'));
                if (hasHeadSpace) {
                    SizerAddSpace.call(this);
                }

                SizerAdd$1.call(this,
                    gameObject,
                    { proportion: proportion, expand: true }
                );

                // Add space at tail
                var hasTailSpace = (!this.buttonsExpand) && (this.buttonsAlign === 'center');
                if (hasTailSpace) {
                    SizerAddSpace.call(this);
                }
                this.hasTailSpace = hasTailSpace;

            } else { // A space
                SizerAdd$1.call(this,
                    gameObject,
                    { proportion: proportion, expand: true }
                );
                this.hasTailSpace = false;

            }

        } else {   // Others
            if (this.hasTailSpace) {
                var lastIndex = this.sizerChildren.length - 1;
                SizerAdd$1.call(this,
                    gameObject,
                    { index: lastIndex, proportion: proportion, expand: true }
                );

            } else {
                SizerAdd$1.call(this,
                    gameObject,
                    { proportion: proportion, expand: true }
                );
            }

        }

        // Space or other game object as button
        if (isNormalGameObject) {
            this.buttonGroup.add(gameObject);
        }

        return this;
    };

    var AddChildMethods$3 = {
        addButton(gameObject) {
            if (IsArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    Add$4.call(this, gameObjects[i]);
                }
            } else {
                Add$4.call(this, gameObject);
            }
            return this;
        },

        addButtons(gameObjects) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Add$4.call(this, gameObjects[i]);
            }
            return this;
        }
    };

    const SizerRmove$1 = Sizer.prototype.remove;
    const SizerClear$1 = Sizer.prototype.clear;

    var Remove$1 = function (gameObject, destroyChild) {
        if (this.getParentSizer(gameObject) !== this) {
            return this;
        }

        this.buttonGroup.remove(gameObject);
        SizerRmove$1.call(this, gameObject, destroyChild);
        return this;
    };

    var RemoveChildMethods$3 = {
        remove(gameObject, destroyChild) {
            // Remove gameObject no matter it is a button or not
            if (IsArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    Remove$1.call(this, gameObjects[i], destroyChild);
                }
            } else {
                Remove$1.call(this, gameObject, destroyChild);
            }
            return this;
        },

        clear(destroyChild) {
            var buttons = this.buttonGroup.buttons;
            buttons.length = 0;
            SizerClear$1.call(this, destroyChild);
            return this;
        },

        removeButton(gameObject, destroyChild) {
            var gameObject = this.getButton(gameObject);
            // Don't remove this gameObject, it is not a button
            if (!gameObject) {
                return this;
            }
            this.remove(gameObject, destroyChild);
            return this;
        },

        clearButtons(destroyChild) {
            var buttons = this.buttonGroup.buttons;
            for (var i = buttons.length - 1; i >= 0; i--) {
                Remove$1.call(this, buttons[i], destroyChild);
            }
            return this;
        }
    };

    var OnButtonStateChange = function (button, value, previousValue) {
        if (!button) {
            return;
        }

        var callback = this.setValueCallback;
        var scope = this.setValueCallbackScope;
        if (callback) {
            if (scope) {
                callback.call(scope, button, value, previousValue);
            } else {
                callback(button, value, previousValue);
            }
        }

        this.fireEvent('button.statechange', button, value, previousValue);
    };

    var InjectSelectedProperty = function (gameObject) {
        var self = this;

        gameObject._selected = undefined;
        Object.defineProperty(gameObject, 'selected', {
            get: function () {
                return gameObject._selected;
            },
            set: function (newValue) {
                if (gameObject._selected === newValue) {
                    return;
                }
                var previousValue = gameObject._selected;
                gameObject._selected = newValue;

                OnButtonStateChange.call(self, gameObject, newValue, previousValue);
            },
            enumerable: true,
            configurable: true
        });

        gameObject.selected = false;
    };

    var AddMethods = {
        add(gameObject) {
            this.buttons.push(gameObject);

            //Default: Fire 'click' event when touch released after pressed.
            if (!gameObject._click) {
                gameObject._click = new Button(gameObject, this.clickConfig);

                gameObject._click
                    .on('click', function (buttonBehavior, gameObject, pointer, event) {
                        this.fireEvent('button.click', gameObject, pointer, event);
                    }, this)
                    .on('enable', function (buttonBehavior, gameObject) {
                        this.fireEvent('button.enable', gameObject);
                    }, this)
                    .on('disable', function (buttonBehavior, gameObject) {
                        this.fireEvent('button.disable', gameObject);
                    }, this)


                    .on('over', function (buttonBehavior, gameObject, pointer, event) {
                        this.fireEvent('button.over', gameObject, pointer, event);
                    }, this)
                    .on('out', function (buttonBehavior, gameObject, pointer, event) {
                        this.fireEvent('button.out', gameObject, pointer, event);
                    }, this)

                    .on('down', function (buttonBehavior, gameObject, pointer, event) {
                        this.fireEvent('button.down', gameObject, pointer, event);
                    }, this)
                    .on('up', function (buttonBehavior, gameObject, pointer, event) {
                        this.fireEvent('button.up', gameObject, pointer, event);
                    }, this);

                if (gameObject.isRexContainerLite) {
                    // Send touch detection sensor to back
                    gameObject.sendChildToBack(gameObject);
                }
            }

            if (this.buttonsType) {
                if (gameObject.name === undefined) {
                    console.error(`${this.parent.constructor.name}: Option button miss value`);
                }

                InjectSelectedProperty.call(this, gameObject);
            }


            return this;
        },

        addMultiple(gameObjects) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                this.add(gameObjects[i]);
            }
            return this;
        }
    };

    const RemoveItem$2 = Phaser.Utils.Array.Remove;

    var RemoveMethods = {
        remove(gameObject) {
            if (this.buttonsType) {
                delete gameObject.selected;
            }

            RemoveItem$2(this.buttons, gameObject);

            return this;
        },

        clear() {
            if (this.buttonsType) {
                var buttons = this.buttons;
                for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                    delete buttons[i].selected;
                }
            }

            this.buttons.length = 0;

            return this;
        }
    };

    var FireEvent = function (eventName, button, ...args) {
        if(!this.buttons) {
            // ButtonGroup has been destroyed
            return;
        }

        var index;
        if (typeof (button) === 'number') {
            index = button;
            button = this.buttons[index];
            if (!button) {
                return;
            }
        } else {
            index = this.buttons.indexOf(button);
            if (index === -1) {
                return;
            }
        }

        // Buttons is a child. Fire internal events.
        if (this.eventEmitter !== this.parent) {
            this.parent.emit(eventName, button, index, ...args);
        }

        if (this.groupName !== undefined) {
            this.eventEmitter.emit(eventName, button, this.groupName, index, ...args);
        } else {
            this.eventEmitter.emit(eventName, button, index, ...args);
        }
    };

    const GetValue$x = Phaser.Utils.Objects.GetValue;

    var ButtonsTypeMethods = {
        setButtonsType(config) {
            if (config === undefined) {
                config = {};
            }

            var buttonsType = GetValue$x(config, 'buttonsType', config.type);
            this.buttonsType = buttonsType;

            if (!this.buttonsType) {
                return this;
            }

            // Assign this.setValueCallback, this.setValueCallbackScope
            var setValueCallback, setValueCallbackScope;
            setValueCallback = GetValue$x(config, 'setValueCallback', undefined);
            setValueCallbackScope = GetValue$x(config, 'setValueCallbackScope', undefined);
            if (setValueCallback === undefined) {
                setValueCallback = GetValue$x(config, 'setButtonStateCallback', undefined);
                setValueCallbackScope = GetValue$x(config, 'setButtonStateCallbackScope', undefined);
            }
            this.setValueCallback = setValueCallback;
            this.setValueCallbackScope = setValueCallbackScope;

            switch (buttonsType) {
                case 'radio':
                    this.setRadioType();
                    break;
                case 'checkboxes':
                    this.setCheckboxesType();
                    break;
            }

            return this;
        },

        setRadioType() {
            var parent = this.parent,
                buttons = this.buttons;
            parent._value = undefined;
            var selectedIndex = undefined;
            Object.defineProperty(parent, 'value', {
                get: function () {
                    return parent._value;
                },
                set: function (newValue) {
                    if (parent._value === newValue) {
                        return;
                    }

                    parent._value = newValue;

                    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                        var button = buttons[i];
                        if (button.rexSizer.hidden) {
                            continue;
                        }

                        if (selectedIndex === undefined) {
                            if (button.name === newValue) {
                                button.selected = true;
                            } else {
                                button.selected = false;
                            }
                        } else {
                            if (selectedIndex === i) {
                                button.selected = true;
                            } else {
                                button.selected = false;
                            }
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });

            parent.on('button.click', function (button) {
                selectedIndex = this.buttons.indexOf(button);
                parent.value = button.name;
                selectedIndex = undefined;
            }, this);

            return this;
        },

        setCheckboxesType() {
            var parent = this.parent;
            parent.on('button.click', function (button) {
                button.selected = !button.selected;
            });

            return this;
        },

        // Common
        clearAllButtonsState() {
            var buttons = this.buttons;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                var button = buttons[i];
                button.selected = false;
            }
            return this;
        },

        getAllButtonsState() {
            var states = {};
            var buttons = this.buttons;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                var button = buttons[i];
                if (button.rexSizer.hidden) {
                    continue;
                }
                states[button.name] = button.selected;
            }
            return states;
        },

        // For radio
        setSelectedButtonName(name) {
            this.parent.value = name;
            return this;
        },

        getSelectedButtonName() {
            return this.parent.value;
        },

        // For checkboxes
        setButtonState(name, state) {
            if (state === undefined) {
                state = true;
            }

            var buttons = this.buttons;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                var button = buttons[i];
                if (button.rexSizer.hidden) {
                    continue;
                }
                if (button.name === name) {
                    button.selected = state;
                    break;
                }
            }
            return this;
        },

        getButtonState(name) {
            var buttons = this.buttons;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                var button = buttons[i];
                if (button.rexSizer.hidden) {
                    continue;
                }
                if (button.name === name) {
                    return button.selected;
                }
            }
            return undefined;
        }
    };

    var GetGameObjectByName = function (children, name) {
        if (!children) {
            return null;

        } else if (IsArray(children)) {
            var child;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = TestName(children[i], name);
                if (child) {
                    return child;
                }
            }

        } else { // Is plain object
            var child;
            for (var key in children) {
                child = TestName(children[key], name);
                if (child) {
                    return child;
                }
            }

        }
    };

    var TestName = function (gameObject, name) {
        if (!gameObject) {
            return null;
        } else if (gameObject.hasOwnProperty('name')) {
            return (gameObject.name === name) ? gameObject : null;
        } else { // Array, or plain object
            return GetElementByName(gameObject, name);
        }
    };

    // Include in ButtonGroup class and Buttons/GridButtons/FixedWidthButtons class


    var ButtonMethods = {
        getButton(index) {
            // buttonGroup and button-sizer have *buttons* member both
            var buttons = this.buttons,
                button;
            var indexType = typeof (index);
            switch (indexType) {
                case 'number':
                    button = buttons[index];
                    break;
                case 'string':
                    button = GetGameObjectByName(buttons, index);
                    break;
                default:
                    button = index;
                    if (buttons.indexOf(button) === -1) {
                        button = undefined;
                    }
                    break;
            }
            return button;
        },

        getButtons() {
            return this.buttons;
        },

        hasAnyButton() {
            return this.buttons.length > 0;
        },

        setButtonEnable(index, enabled) {
            // buttonGroup and button-sizer have *buttons* member both
            var buttons = this.buttons;
            if ((index === undefined) || (typeof (index) === 'boolean')) {
                enabled = index;
                for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                    buttons[i]._click.setEnable(enabled);
                }
            } else {
                this.getButton(index)._click.setEnable(enabled);
            }
            return this;
        },

        toggleButtonEnable(index) {
            // buttonGroup and button-sizer have *buttons* member both
            var buttons = this.buttons;
            if ((index === undefined) || (typeof (index) === 'boolean')) {
                for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                    buttons[i]._click.toggleEnable();
                }
            } else {
                this.getButton(index)._click.toggleEnable();
            }
            return this;
        },

        getButtonEnable(index) {
            if (index === undefined) {
                index = 0;
            }
            return this.getButton(index)._click.enable;
        },

        emitButtonClick(index) {
            // index or button game object
            // this: buttonGroup or button-sizer
            var buttonGroup = (this.buttonGroup) ? this.buttonGroup : this;
            buttonGroup.fireEvent('button.click', index);
            return this;
        },

        emitButtonOver(index) {
            // this: buttonGroup or button-sizer
            var buttonGroup = (this.buttonGroup) ? this.buttonGroup : this;

            var buttons = this.buttons;

            // Fire 'button.out' of overed button(s)
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                var button = buttons[i];
                if (!button._click.isOver) {
                    continue;
                }
                button._click.isOver = false;
                buttonGroup.fireEvent('button.out', button);
            }

            // Fire 'button.over'
            var button = this.getButton(index);
            if (button) {
                button._click.isOver = true;
                buttonGroup.fireEvent('button.over', button);
            }

            return this;
        },

        showButton(index) {
            Show(this.getButton(index));
            return this;
        },

        hideButton(index) {
            Hide(this.getButton(index));
            return this;
        },

        isButtonShown(index) {
            IsShown(this.getButton(index));
            return this;
        },

        forEachButtton(callback, scope) {
            // buttonGroup and button-sizer have *buttons* member both
            var buttons = this.buttons;
            for (var i = 0, cnt = buttons.length; i < cnt; i++) {
                if (scope) {
                    callback.call(scope, buttons[i], i, buttons);
                } else {
                    callback(buttons[i], i, buttons);
                }
            }
            return this;
        },


    };

    class ButtonGroup {
        constructor(config) {
            this.parent = config.parent;
            this.eventEmitter = config.eventEmitter;
            this.groupName = config.groupName;
            this.clickConfig = config.clickConfig;

            this.buttonsType = undefined;
            this.buttons = [];
        }

        destroy() {
            this.parent = undefined;
            this.eventEmitter = undefined;
            this.clickConfig = undefined;
            this.buttons = undefined; // GameObjects will be destroyed outside
        }
    }

    var methods$5 = {
        fireEvent: FireEvent
    };

    Object.assign(
        ButtonGroup.prototype,
        AddMethods,
        RemoveMethods,
        ButtonsTypeMethods,
        ButtonMethods,
        methods$5
    );

    // Include in Buttons/GridButtons/FixedWidthButtons class

    var ButtonStateMethods = {
        // Common
        clearAllButtonsState() {
            this.buttonGroup.clearAllButtonsState();
            return this;
        },

        getAllButtonsState() {
            return this.buttonGroup.getAllButtonsState();
        },

        // For radio
        setSelectedButtonName(name) {
            this.buttonGroup.setSelectedButtonName(name);
            return this;
        },

        getSelectedButtonName() {
            return this.buttonGroup.getSelectedButtonName();
        },

        // For checkboxes
        setButtonState(name, state) {
            this.buttonGroup.setButtonState(name, state);
            return this;
        },

        getButtonState(name) {
            return this.buttonGroup.getButtonState(name);
        }
    };

    const GetValue$w = Phaser.Utils.Objects.GetValue;

    let Buttons$1 = class Buttons extends Sizer {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            var buttonSpace = config.space;
            if (typeof (buttonSpace) === 'number') {
                config.space = { item: buttonSpace };
            }

            // Create
            super(scene, config);
            this.type = 'rexButtons';
            this.buttonGroup = new ButtonGroup({
                parent: this,
                eventEmitter: GetValue$w(config, 'eventEmitter', this),
                groupName: GetValue$w(config, 'groupName', undefined),
                clickConfig: GetValue$w(config, 'click', undefined)
            })
                .setButtonsType(config);

            // Add elements
            var background = GetValue$w(config, 'background', undefined);
            var buttons = GetValue$w(config, 'buttons', undefined);

            // Buttons properties
            this.buttonsExpand = GetValue$w(config, 'expand', false);
            this.buttonsAlign = GetValue$w(config, 'align', undefined); // undefined/left/top: no space                

            if (background) {
                this.addBackground(background);
            }

            if (buttons) {
                this.addButtons(buttons);
            }

            this.addChildrenMap('background', background);
            this.addChildrenMap('buttons', this.buttonGroup.buttons);
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);
            this.buttonGroup.destroy();
            this.buttonGroup = undefined;
        }

        get buttons() {
            return this.buttonGroup.buttons;
        }

        get groupName() {
            return this.buttonGroup.groupName;
        }

        set groupName(value) {
            this.buttonGroup.groupName = value;
        }

        get eventEmitter() {
            return this.buttonGroup.eventEmitter;
        }
    };

    Object.assign(
        Buttons$1.prototype,
        AddChildMethods$3,
        RemoveChildMethods$3,
        ButtonMethods,
        ButtonStateMethods
    );

    var GetChildrenWidth$2 = function (minimumMode) {
        if (this.rexSizer.hidden) {
            return 0;
        }

        if (minimumMode === undefined) {
            minimumMode = true;
        }

        var childrenWidth;
        if (this.orientation === 0) {
            if (minimumMode) {
                childrenWidth = this.maxChildWidth;
            } else {
                childrenWidth = (this.rexSizer.resolved) ? this.wrapResult.width : undefined;
            }
        } else {
            childrenWidth = (this.rexSizer.resolved) ? this.wrapResult.width : undefined;
        }

        if (childrenWidth === undefined) {
            return undefined;
        }

        return childrenWidth + ((this.space.left + this.space.right) * this.scaleX);
    };

    var GetChildrenHeight$2 = function (minimumMode) {
        if (this.rexSizer.hidden) {
            return 0;
        }

        if (minimumMode === undefined) {
            minimumMode = true;
        }

        var childrenHeight;
        if (this.orientation === 1) {
            if (minimumMode) {
                childrenHeight = this.maxChildHeight;
            } else {
                childrenHeight = (this.rexSizer.resolved) ? this.wrapResult.height : undefined;
            }
        } else {
            childrenHeight = (this.rexSizer.resolved) ? this.wrapResult.height : undefined;
        }

        if (childrenHeight === undefined) {
            return undefined;
        }

        return childrenHeight + ((this.space.top + this.space.bottom) * this.scaleY);
    };

    var GetChildrenSizers$2 = function (out) {
        if (out === undefined) {
            out = [];
        }
        var children = this.sizerChildren, child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child === '\n') {
                continue;
            }
            if (child.isRexSizer) {
                out.push(child);
            }
        }
        return out;
    };

    var PreLayout$1 = function () {
        this._maxChildWidth = undefined;
        this._maxChildHeight = undefined;
        this.wrapResult = undefined;
        this.rexSizer.resolved = false;
        PreLayout$3.call(this);
        return this;
    };

    var LayoutChildren$2 = function () {
        var horizontalWrap = (this.orientation === 0);

        var innerLineWidth = (horizontalWrap) ? this.innerWidth : this.innerHeight;
        var child, childConfig, padding, justifySpace = 0, indentLeft, indentTop;
        var startX = this.innerLeft,
            startY = this.innerTop;
        var x, y, width, height, alignOffsetX, alignOffsetY; // Align zone
        var lines = this.wrapResult.lines;  // Get this.wrapResult from RunChildrenWrap()
        var line, lineChlidren, remainderLineWidth;

        var itemX = startX,
            itemY = startY;
        for (var i = 0, icnt = lines.length; i < icnt; i++) {
            // Layout this line
            line = lines[i];
            lineChlidren = line.children;
            if (this.rtl) {
                lineChlidren.reverse();
            }

            if (horizontalWrap) {
                indentLeft = (i % 2) ? this.space.indentLeftEven : this.space.indentLeftOdd;
                itemX = startX + (indentLeft * this.scaleX);
            } else {
                indentTop = (i % 2) ? this.space.indentTopEven : this.space.indentTopOdd;
                itemY = startY + (indentTop * this.scaleY);
            }

            remainderLineWidth = innerLineWidth - ((horizontalWrap) ? line.width : line.height);

            switch (this.align) {
                case 0: // left
                    break;

                case 1: // right
                    if (horizontalWrap) {
                        itemX += remainderLineWidth;
                    } else {
                        itemY += remainderLineWidth;
                    }
                    break;

                case 2: // center
                    if (horizontalWrap) {
                        itemX += remainderLineWidth / 2;
                    } else {
                        itemY += remainderLineWidth / 2;
                    }
                    break;

                case 3: // justify-left            
                    justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, this.justifyPercentage, lineChlidren.length);
                    break;

                case 4: // justify-right
                    justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, this.justifyPercentage, lineChlidren.length);
                    if (justifySpace === 0) {
                        // Align right
                        if (horizontalWrap) {
                            itemX += remainderLineWidth;
                        } else {
                            itemY += remainderLineWidth;
                        }
                    }
                    break;

                case 5: // justify-center
                    justifySpace = GetJustifySpace(innerLineWidth, remainderLineWidth, this.justifyPercentage, lineChlidren.length);
                    if (justifySpace === 0) {
                        // Align center
                        if (horizontalWrap) {
                            itemX += remainderLineWidth / 2;
                        } else {
                            itemY += remainderLineWidth / 2;
                        }
                    }
                    break;
            }

            var isFirstChild = true;
            for (var j = 0, jcnt = lineChlidren.length; j < jcnt; j++) {
                child = lineChlidren[j];
                if (child.rexSizer.hidden) {
                    continue;
                }

                childConfig = child.rexSizer;
                padding = childConfig.padding;

                PreLayoutChild.call(this, child);

                if (horizontalWrap) {
                    x = itemX + (padding.left * this.scaleX);
                } else {
                    y = itemY + (padding.top * this.scaleY);
                }

                if (isFirstChild) {
                    isFirstChild = false;
                } else {
                    if (horizontalWrap) {
                        x += (this.space.item * this.scaleX);
                    } else {
                        y += (this.space.item * this.scaleY);
                    }
                }

                width = GetDisplayWidth(child);
                height = GetDisplayHeight(child);

                if (horizontalWrap) {
                    indentTop = (j % 2) ? this.space.indentTopEven : this.space.indentTopOdd;
                    y = itemY + (indentTop * this.scaleY) + (padding.top * this.scaleY);
                    itemX = x + width + (padding.right * this.scaleX) + justifySpace;
                } else {
                    indentLeft = (j % 2) ? this.space.indentLeftEven : this.space.indentLeftOdd;
                    x = itemX + (indentLeft * this.scaleX) + (padding.left * this.scaleX);
                    itemY = y + height + (padding.top * this.scaleY) + justifySpace;
                }

                alignOffsetX = (childConfig.alignOffsetX + (childConfig.alignOffsetOriginX * width)) * this.scaleX;
                alignOffsetY = (childConfig.alignOffsetY + (childConfig.alignOffsetOriginY * height)) * this.scaleY;

                LayoutChild.call(this,
                    child, x, y, width, height, childConfig.align,
                    alignOffsetX, alignOffsetY
                );
            }

            if (horizontalWrap) {
                itemY += line.height + (this.space.line * this.scaleY);
            } else {
                itemX += line.width + (this.space.line * this.scaleX);
            }
        }
    };

    var GetJustifySpace = function (total, remainder, justifyPercentage, childCount) {
        return ((remainder / total) <= justifyPercentage) ? (remainder / (childCount - 1)) : 0;
    };

    var HasWidthWrap = function () {
        if (this.orientation === 0) {
            return true;
        }

        return HasWidthWrap$2.call(this);
    };

    var RunChildrenWrap = function (lineWidth) {
        var out = {
            lines: [],
            width: 0,
            height: 0
        };

        var children = this.sizerChildren;
        var child, padding, childWidth, childHeight, remainder = 0, indentLeft, indentTop;
        var lines = out.lines,
            lastLine = undefined,
            newLine;

        if (this.orientation === 0) { // x
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (child === '\n') {
                    child = undefined;
                    childWidth = 0;
                    newLine = true;
                } else {
                    if (child.rexSizer.hidden) {
                        continue;
                    }

                    if (child.isRexSizer) {
                        child.runLayout(this);
                    }

                    childWidth = this.getChildWidth(child);
                    padding = child.rexSizer.padding;
                    childWidth += ((padding.left + padding.right) * this.scaleX);

                    newLine = (remainder < childWidth) || (lastLine === undefined);
                }
                // New line
                if (newLine) {
                    if (lastLine) {
                        lastLine.width = lineWidth - (remainder + (this.space.item * this.scaleX));
                        out.width = Math.max(out.width, lastLine.width);
                        out.height += lastLine.height + (this.space.line * this.scaleY);
                    }

                    lastLine = {
                        children: [],
                        width: 0,
                        height: 0
                    };
                    lines.push(lastLine);

                    indentLeft = (lines.length % 2) ? this.space.indentLeftOdd : this.space.indentLeftEven;
                    remainder = lineWidth - (indentLeft * this.scaleX);
                }

                remainder -= childWidth + (this.space.item * this.scaleX);
                if (child) {
                    lastLine.children.push(child);

                    childHeight = this.getChildHeight(child);
                    padding = child.rexSizer.padding;
                    childHeight += (padding.top + padding.bottom) * this.scaleY;

                    lastLine.height = Math.max(lastLine.height, childHeight);
                }
            }

            if (lastLine) {
                lastLine.width = lineWidth - (remainder + (this.space.item * this.scaleX));
                out.width = Math.max(out.width, lastLine.width);
                out.height += lastLine.height;
            }

            out.height += Math.max(this.space.indentTopOdd, this.space.indentTopEven) * this.scaleY;
        } else {

            var lineHeight = lineWidth;
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                child = children[i];
                if (child === '\n') {
                    child = undefined;
                    childWidth = 0;
                    newLine = true;
                } else {
                    if (child.rexSizer.hidden) {
                        continue;
                    }

                    if (child.isRexSizer) {
                        child.layout(); // Use original size
                    }

                    childHeight = this.getChildHeight(child);
                    padding = child.rexSizer.padding;
                    childHeight += (padding.top + padding.bottom) * this.scaleY;

                    newLine = (remainder < childHeight) || (lastLine === undefined);
                }
                // New line
                if (newLine) {
                    if (lastLine) {
                        lastLine.height = lineHeight - (remainder + (this.space.item * this.scaleY));
                        out.height = Math.max(out.height, lastLine.height);
                        out.width += lastLine.width + (this.space.line * this.scaleX);
                    }

                    lastLine = {
                        children: [],
                        width: 0,
                        height: 0
                    };
                    lines.push(lastLine);

                    indentTop = (lines.length % 2) ? this.space.indentTopOdd : this.space.indentTopEven;
                    remainder = lineHeight - (indentTop * this.scaleY);
                }

                remainder -= childHeight + (this.space.item * this.scaleY);
                if (child) {
                    lastLine.children.push(child);

                    childWidth = this.getChildWidth(child);
                    padding = child.rexSizer.padding;
                    childWidth += (padding.left + padding.right) * this.scaleX;

                    lastLine.width = Math.max(lastLine.width, childWidth);
                }
            }

            if (lastLine) {
                lastLine.height = lineHeight - (remainder + (this.space.item * this.scaleY));
                out.height = Math.max(out.height, lastLine.height);
                out.width += lastLine.width;
            }

            out.width += Math.max(this.space.indentLeftOdd, this.space.indentLeftEven) * this.scaleX;
        }

        return out;
    };

    var RunWidthWrap$1 = function (width) {
        if (this.wrapResult) {
            // Already got wrapResult
            return;
        }

        if (this.orientation === 0) {
            var innerWidth = width - ((this.space.left + this.space.right) * this.scaleX);
            this.wrapResult = RunChildrenWrap.call(this, innerWidth);
            this.rexSizer.resolved = true;
            RunWidthWrap$3.call(this, width);
        }
    };

    var HasHeightWrap = function () {
        if (this.orientation === 1) {
            return true;
        }

        return HasHeightWrap$2.call(this);
    };

    var RunHeightWrap$1 = function (height) {
        if (this.wrapResult) {
            // Already got wrapResult
            return;
        }

        if (this.orientation === 1) {
            var innerHeight = height - ((this.space.top + this.space.bottom) * this.scaleY);
            this.wrapResult = RunChildrenWrap.call(this, innerHeight);
            this.rexSizer.resolved = true;
            RunHeightWrap$3.call(this, height);
        }
    };

    // Override
    var GetExpandedChildWidth$1 = function (child, parentWidth) {
        return undefined;
    };

    // Override
    var GetExpandedChildHeight$1 = function (child, parentHeight) {
        return undefined;
    };

    const DistanceBetween$2 = Phaser.Math.Distance.Between;

    var GetNearestChildIndex = function (x, y) {
        var children = this.sizerChildren;
        if (children.length === 0) {
            return -1;
        }

        var nearestIndex = -1,
            minDistance = Infinity;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            // position is not at this line
            if (Math.abs(child.centerY - y) > (child.height / 2)) {
                continue;
            }

            // Check left bound
            var distance = DistanceBetween$2(child.left, child.centerY, x, y);
            if (minDistance > distance) {
                minDistance = distance;
                nearestIndex = i;
            }

            // Is last child of this line
            var nextChild = children[i + 1];
            if (nextChild && (nextChild.y === child.y)) {
                continue;
            }

            var distance = DistanceBetween$2(child.right, child.centerY, x, y);
            if (minDistance > distance) {
                minDistance = distance;
                nearestIndex = i + 1;
            }
        }

        return nearestIndex;
    };

    const IsPlainObject$9 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$v = Phaser.Utils.Objects.GetValue;
    const ALIGN_CENTER$1 = Phaser.Display.Align.CENTER;

    var Add$3 = function (gameObject, paddingConfig, childKey, index) {
        if (gameObject === '\n') {
            this.addNewLine();
            return this;
        }

        var offsetX, offsetY;
        var offsetOriginX, offsetOriginY;

        AddChild$2.call(this, gameObject);

        if (IsPlainObject$9(paddingConfig)) {
            var config = paddingConfig;
            paddingConfig = GetValue$v(config, 'padding', 0);
            childKey = GetValue$v(config, 'key', undefined);
            index = GetValue$v(config, 'index', undefined);

            offsetX = GetValue$v(config, 'offsetX', 0);
            offsetY = GetValue$v(config, 'offsetY', 0);
            offsetOriginX = GetValue$v(config, 'offsetOriginX', 0);
            offsetOriginY = GetValue$v(config, 'offsetOriginY', 0);
        }
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }

        if (offsetX === undefined) {
            offsetX = 0;
        }
        if (offsetY === undefined) {
            offsetY = 0;
        }
        if (offsetOriginX === undefined) {
            offsetOriginX = 0;
        }
        if (offsetOriginY === undefined) {
            offsetOriginY = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.align = ALIGN_CENTER$1;
        config.padding = GetBoundsConfig$1(paddingConfig);
        config.alignOffsetX = offsetX;
        config.alignOffsetY = offsetY;
        config.alignOffsetOriginX = offsetOriginX;
        config.alignOffsetOriginY = offsetOriginY;

        if ((index === undefined) || (index >= this.sizerChildren.length)) {
            this.sizerChildren.push(gameObject);
        } else {
            this.sizerChildren.splice(index, 0, gameObject);
        }

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject);
        }
        return this;
    };

    var AddChildMethods$2 = {
        add(gameObject, paddingConfig, childKey) {
            if (IsArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    Add$3.call(this, gameObjects[i], paddingConfig);
                }
            } else {
                Add$3.call(this, gameObject, paddingConfig, childKey);
            }
            return this;
        },

        addNewLine() {
            this.sizerChildren.push('\n');
            return this;
        },

        insert(index, gameObject, paddingConfig, childKey) {
            Add$3.call(this, gameObject, paddingConfig, childKey, index);
            return this;
        },

        insertAtPosition(x, y, gameObject, paddingConfig, childKey) {
            var index = GetNearestChildIndex.call(this, x, y);
            if (index === -1) {
                index = undefined;
            }
            this.insert(index, gameObject, paddingConfig, childKey);
            return this;
        }
    };

    const RemoveItem$1 = Phaser.Utils.Array.Remove;

    var RemoveChildMethods$2 = {
        remove(gameObject, destroyChild) {
            if (this.getParentSizer(gameObject) !== this) {
                return this;
            }
            RemoveItem$1(this.sizerChildren, gameObject);
            RemoveChild$1.call(this, gameObject, destroyChild);
            return this;
        },

        removeAll(destroyChild) {
            for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
                this.remove(this.sizerChildren[i], destroyChild);
            }
            return this;
        },

        clear(destroyChild) {
            this.sizerChildren.length = 0;
            ClearChildren.call(this, destroyChild);
            return this;
        }
    };

    var methods$4 = {
        getChildrenWidth: GetChildrenWidth$2,
        getChildrenHeight: GetChildrenHeight$2,
        getChildrenSizers: GetChildrenSizers$2,
        preLayout: PreLayout$1,
        layoutChildren: LayoutChildren$2,
        hasWidthWrap: HasWidthWrap,
        runWidthWrap: RunWidthWrap$1,
        hasHeightWrap: HasHeightWrap,
        runHeightWrap: RunHeightWrap$1,
        getExpandedChildWidth: GetExpandedChildWidth$1,
        getExpandedChildHeight: GetExpandedChildHeight$1,

    };

    Object.assign(
        methods$4,
        AddChildMethods$2,
        RemoveChildMethods$2,
        SortChildrenMethods
    );

    var GetMaxChildWidth = function (children) {
        if (children === undefined) {
            children = this.sizerChildren;
        }
        var result = 0;
        var child, childWidth;
        var hasUnknownChildWidth = false;

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child === '\n') {
                continue;
            }

            childWidth = this.getChildWidth(child);
            if (childWidth === undefined) {
                hasUnknownChildWidth = true;
            }

            if (hasUnknownChildWidth) {
                continue;
            }

            result = Math.max(childWidth, result);
        }
        
        if (hasUnknownChildWidth) {
            return undefined;
        }

        return result;
    };

    var GetMaxChildHeight = function (children) {
        if (children === undefined) {
            children = this.sizerChildren;
        }
        var result = 0;
        var child, childHeight;
        var hasUnknownChildHeight = false;

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child === '\n') {
                continue;
            }

            childHeight = this.getChildHeight(child);
            if (childHeight === undefined) {
                hasUnknownChildHeight = true;
            }

            if (hasUnknownChildHeight) {
                continue;
            }

            result = Math.max(childHeight, result);
        }

        if (hasUnknownChildHeight) {
            return undefined;
        }

        return result;
    };

    const IsPlainObject$8 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$u = Phaser.Utils.Objects.GetValue;

    class FixWidthSizer extends Base$1 {
        constructor(scene, x, y, minWidth, minHeight, config) {
            if (IsPlainObject$8(x)) {
                config = x;
                x = GetValue$u(config, 'x', 0);
                y = GetValue$u(config, 'y', 0);
                minWidth = GetValue$u(config, 'width', undefined);
                minHeight = GetValue$u(config, 'height', undefined);
            } else if (IsPlainObject$8(minWidth)) {
                config = minWidth;
                minWidth = GetValue$u(config, 'width', undefined);
                minHeight = GetValue$u(config, 'height', undefined);
            }

            super(scene, x, y, minWidth, minHeight, config);
            this.type = 'rexFixWidthSizer';
            this.sizerChildren = [];

            this.runChildrenWrapFlag = true;

            this.setOrientation(GetValue$u(config, 'orientation', 0));
            this.setItemSpacing(GetValue$u(config, 'space.item', 0));
            this.setLineSpacing(GetValue$u(config, 'space.line', 0));
            this.setIntentLeft(
                GetValue$u(config, 'space.indentLeftOdd', 0),
                GetValue$u(config, 'space.indentLeftEven', 0)
            );
            this.setIntentTop(
                GetValue$u(config, 'space.indentTopOdd', 0),
                GetValue$u(config, 'space.indentTopEven', 0)
            );
            this.setAlign(GetValue$u(config, 'align', 0));
            this.setJustifyPercentage(GetValue$u(config, 'justifyPercentage', 0.25));
            this.setRTL(GetValue$u(config, 'rtl', false));

            this.wrapResult = undefined;  // {lines, width, height}

            this.addChildrenMap('items', this.sizerChildren);
        }

        setOrientation(orientation) {
            this.orientation = GetOrientationMode(orientation);
            return this;
        }

        setItemSpacing(space) {
            this.space.item = space;
            return this;
        }

        setLineSpacing(space) {
            this.space.line = space;
            return this;
        }

        setIntentLeft(odd, even) {
            this.space.indentLeftOdd = odd;
            this.space.indentLeftEven = even;
            return this;
        }

        setIntentTop(odd, even) {
            this.space.indentTopOdd = odd;
            this.space.indentTopEven = even;
            return this;
        }

        setAlign(align) {
            if (typeof (align) === 'string') {
                align = ALIGN[align];
            }
            this.align = align;
            return this;
        }

        setJustifyPercentage(value) {
            this.justifyPercentage = value;
            return this;
        }

        setRTL(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.rtl = enabled;
            return this;
        }

        get maxChildWidth() {
            if (this._maxChildWidth === undefined) {
                this._maxChildWidth = GetMaxChildWidth.call(this);
            }
            return this._maxChildWidth;
        }

        get maxChildHeight() {
            if (this._maxChildHeight === undefined) {
                this._maxChildHeight = GetMaxChildHeight.call(this);
            }
            return this._maxChildHeight;
        }
    }

    const ALIGN = {
        left: 0, top: 0,
        right: 1, bottom: 1,
        center: 2,
        justify: 3,
        'justify-left': 3, 'justify-top': 3,
        'justify-right': 4, 'justify-bottom': 4,
        'justify-center': 5
    };

    Object.assign(
        FixWidthSizer.prototype,
        methods$4
    );

    const SizerAdd = FixWidthSizer.prototype.add;

    var Add$2 = function (gameObject) {
        SizerAdd.call(this, gameObject);
        this.buttonGroup.add(gameObject);
        return this;
    };

    var AddChildMethods$1 = {
        addButton(gameObject) {
            if (IsArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    Add$2.call(this, gameObjects[i]);
                }
            } else {
                Add$2.call(this, gameObject);
            }
            return this;
        },

        addButtons(gameObjects) {
            if (IsArray(gameObjects[0])) {
                // 2d array
                var lines = gameObjects, line;
                for (var lineIdx = 0, lastLineIdx = (lines.length - 1); lineIdx <= lastLineIdx; lineIdx++) {
                    line = lines[lineIdx];
                    for (var i = 0, cnt = line.length; i < cnt; i++) {
                        Add$2.call(this, line[i]);
                    }
                    if (lineIdx > lastLineIdx) {
                        SizerAdd.addNewLine(this);
                    }
                }
            } else {
                // 1d array
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    Add$2.call(this, gameObjects[i]);
                }
            }
            return this;
        }
    };

    const SizerRmove = FixWidthSizer.prototype.remove;
    const SizerClear = FixWidthSizer.prototype.clear;

    var Remove = function (gameObject, destroyChild) {
        var gameObject = this.getButton(gameObject);
        if (!gameObject) {
            return this;
        }

        this.buttonGroup.remove(gameObject);    
        SizerRmove.call(this, gameObject, destroyChild);
        return this;
    };

    var RemoveChildMethods$1 = {
        remove(gameObject, destroyChild) {
            if (IsArray(gameObject)) {
                var gameObjects = gameObject;
                for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                    Remove.call(this, gameObjects[i], destroyChild);
                }
            } else {
                Remove.call(this, gameObject, destroyChild);
            }
            return this;
        },

        clear(destroyChild) {
            var buttons = this.buttonGroup.buttons;
            buttons.length = 0;
            SizerClear.call(this, destroyChild);
            return this;
        },

        removeButton(gameObject, destroyChild) {
            this.remove(gameObject, destroyChild);
            return this;
        },

        clearButtons(destroyChild) {
            var buttons = this.buttonGroup.buttons;
            for (var i = buttons.length - 1; i >= 0; i--) {
                Remove.call(this, buttons[i], destroyChild);
            }
            return this;
        }
    };

    const GetValue$t = Phaser.Utils.Objects.GetValue;

    class Buttons extends FixWidthSizer {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            var buttonSpace = config.space;
            if (typeof (buttonSpace) === 'number') {
                config.space = { item: buttonSpace, line: buttonSpace };
            }

            // Create
            super(scene, config);
            this.type = 'rexFixWidthButtons';
            this.buttonGroup = new ButtonGroup({
                parent: this,
                eventEmitter: GetValue$t(config, 'eventEmitter', this),
                groupName: GetValue$t(config, 'groupName', undefined),
                clickConfig: GetValue$t(config, 'click', undefined)
            })
                .setButtonsType(config);

            // Add elements
            var background = GetValue$t(config, 'background', undefined);
            var buttons = GetValue$t(config, 'buttons', undefined);

            // Buttons properties
            this.buttonsAlign = GetValue$t(config, 'align', undefined);

            if (background) {
                this.addBackground(background);
            }

            if (buttons) {
                this.addButtons(buttons);
            }

            this.addChildrenMap('background', background);
            this.addChildrenMap('buttons', this.buttonGroup.buttons);
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);
            this.buttonGroup.destroy();
            this.buttonGroup = undefined;
        }

        get buttons() {
            return this.buttonGroup.buttons;
        }

        get groupName() {
            return this.buttonGroup.groupName;
        }

        set groupName(value) {
            this.buttonGroup.groupName = value;
        }

        get eventEmitter() {
            return this.buttonGroup.eventEmitter;
        }
    }

    Object.assign(
        Buttons.prototype,
        AddChildMethods$1,
        RemoveChildMethods$1,
        ButtonMethods,
        ButtonStateMethods
    );

    var SCROLLMODE = {
        v: 0,
        vertical: 0,
        y: 0,

        h: 1,
        horizontal: 1,
        x: 1,

        xy: 2,
        vh: 2,
    };

    var GetScrollMode = function (config, key) {
        if (key === undefined) {
            key = 'scrollMode';
        }

        if (!config.hasOwnProperty(key)) {
            config[key] = GetDefaultScrollMode(config);
        }

        var scrollMode = config[key];
        if (typeof (scrollMode) === 'string') {
            scrollMode = SCROLLMODE[scrollMode];
        }

        return scrollMode;
    };

    var GetDefaultScrollMode = function (config) {
        var hasSliderY = (!!config.sliderY) || (!!config.scrollerY);
        var hasSliderX = (!!config.sliderX) || (!!config.scrollerX);
        var scrollMode;
        if (hasSliderY && hasSliderX) {
            scrollMode = 2;
        } else if (hasSliderY) {
            scrollMode = 0;
        } else if (hasSliderX) {
            scrollMode = 1;
        } else {
            scrollMode = 0;
        }
        return scrollMode;
    };

    var Sum = function () {
        return Array.prototype.reduce.call(arguments, Add$1, 0);
    };

    var Add$1 = function (a, b) {
        return a + b;
    };

    var GetChildrenWidth$1 = function (minimumMode) {
        if (this.rexSizer.hidden) {
            return 0;
        }

        if (minimumMode === undefined) {
            minimumMode = true;
        }

        var result = 0,
            columnWidth;
        var children = this.sizerChildren;
        var child, padding, childWidth, proportion;
        var hasUnknownChildWidth = false;
        this.totalColumnProportions;  // To update this.hasColumnProportion0Child member

        for (var i = 0; i < this.columnCount; i++) {
            proportion = this.columnProportions[i];
            columnWidth = 0;
            if ((proportion === 0) || minimumMode) {
                for (var j = 0; j < this.rowCount; j++) {
                    child = children[(j * this.columnCount) + i];
                    if (!child) {
                        continue;
                    }
                    if (child.rexSizer.hidden) {
                        continue;
                    }

                    childWidth = this.getChildWidth(child);
                    if (childWidth === undefined) {
                        if ((proportion !== 0) && (!this.hasColumnProportion0Child)) {
                            childWidth = 0;
                        } else {
                            hasUnknownChildWidth = true;
                        }
                    }

                    if (hasUnknownChildWidth) {
                        continue;
                    }

                    padding = child.rexSizer.padding;
                    childWidth += (padding.left + padding.right) * this.scaleX;
                    columnWidth = Math.max(columnWidth, childWidth);
                }

                if (!hasUnknownChildWidth) {
                    result += columnWidth;
                }

            }

            // else,(proportion > 0) : columnWidth is 0
            if (!hasUnknownChildWidth) {
                if (minimumMode) {
                    this.columnWidth[i] = columnWidth;
                }
            }
        }

        if (hasUnknownChildWidth) {
            return undefined;
        }

        var indentLeft = Math.max(this.space.indentLeftOdd, this.space.indentLeftEven);
        var totalSpace = Sum(this.space.left, indentLeft, ...this.space.column, this.space.right);
        return result + (totalSpace * this.scaleX);
    };

    var GetChildrenHeight$1 = function (minimumMode) {
        if (this.rexSizer.hidden) {
            return 0;
        }

        if (minimumMode === undefined) {
            minimumMode = true;
        }

        var result = 0,
            rowHeight;
        var children = this.sizerChildren;
        var child, padding, childHeight, proportion;
        var hasUnknownChildHeight = false;
        this.totalRowProportions;  // To update this.hasColumnProportion0Child member

        for (var i = 0; i < this.rowCount; i++) {
            proportion = this.rowProportions[i];
            rowHeight = 0;
            if ((proportion === 0) || minimumMode) {
                for (var j = 0; j < this.columnCount; j++) {
                    child = children[(i * this.columnCount) + j];
                    if (!child) {
                        continue;
                    }
                    if (child.rexSizer.hidden) {
                        continue;
                    }

                    childHeight = this.getChildHeight(child);
                    if (childHeight === undefined) {
                        if ((proportion !== 0) && (!this.hasRowProportion0Child)) {
                            childHeight = 0;
                        } else {
                            hasUnknownChildHeight = true;
                        }
                    }

                    if (hasUnknownChildHeight) {
                        continue;
                    }

                    padding = child.rexSizer.padding;
                    childHeight += (padding.top + padding.bottom) * this.scaleY;
                    rowHeight = Math.max(rowHeight, childHeight);
                }

                if (!hasUnknownChildHeight) {
                    result += rowHeight;
                }

            }
            // else,(proportion > 0) : rowHeight is 0

            if (!hasUnknownChildHeight) {
                if (minimumMode) {
                    this.rowHeight[i] = rowHeight;
                }
            }

        }

        if (hasUnknownChildHeight) {
            return undefined;
        }

        var indentTop = Math.max(this.space.indentTopOdd, this.space.indentTopEven);
        var totalSpace = Sum(this.space.top, indentTop, ...this.space.row, this.space.bottom);
        return result + (totalSpace * this.scaleY);
    };

    var GetExpandedChildWidth = function (child, colWidth) {
        var childWidth;
        var childConfig = child.rexSizer;
        if (childConfig.expandWidth) {
            var padding = childConfig.padding;
            childWidth = colWidth - ((padding.left + padding.right) * this.scaleX);
        }
        return childWidth;
    };

    var GetExpandedChildHeight = function (child, rowHeight) {
        var childHeight;
        var childConfig = child.rexSizer;
        if (childConfig.expandHeight) {
            var padding = childConfig.padding;
            childHeight = rowHeight - ((padding.top + padding.bottom) * this.scaleY);
        }
        return childHeight;
    };

    var GetChildrenSizers$1 = function (out) {
        if (out === undefined) {
            out = [];
        }
        var children = this.sizerChildren,
            child;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];
            if (child && child.isRexSizer) {
                out.push(child);
            }
        }
        return out;
    };

    var PreLayout = function () {
        this._totalColumnProportions = undefined;
        this._totalRowProportions = undefined;
        this.hasColumnProportion0Child = false;
        this.hasRowProportion0Child = false;
        this.proportionWidthLength = undefined;  // Display proportion-length, contains scale
        this.proportionHeightLength = undefined; // Display proportion-length, contains scale
        PreLayout$3.call(this);
        return this;
    };

    var LayoutChildren$1 = function () {
        var child, childConfig, padding;
        var startX = this.innerLeft,
            startY = this.innerTop;
        var itemX,
            itemY = startY;
        var x, y, width, height, alignOffsetX, alignOffsetY; // Align zone
        var childWidth, childHeight;
        // Layout grid children
        var colWidth, rowHeight;
        var indentLeft, indentTop;
        for (var rowIndex = 0; rowIndex < this.rowCount; rowIndex++) {
            rowHeight = this.getRowHeight(rowIndex);

            indentLeft = (rowIndex % 2) ? this.space.indentLeftEven : this.space.indentLeftOdd;
            itemX = startX + (indentLeft * this.scaleX);
            for (var columnIndex = 0; columnIndex < this.columnCount; columnIndex++) {
                colWidth = this.getColumnWidth(columnIndex);

                child = this.getChildAt(columnIndex, rowIndex);
                if ((!child) || (child.rexSizer.hidden)) {
                    itemX += colWidth + (this.space.column[columnIndex] * this.scaleX);
                    continue;
                }

                PreLayoutChild.call(this, child);

                childWidth = this.getExpandedChildWidth(child, colWidth);
                childHeight = this.getExpandedChildHeight(child, rowHeight);
                if (child.isRexSizer) {
                    child.runLayout(this, childWidth, childHeight);
                    CheckSize(child, this);
                } else {
                    ResizeGameObject(child, childWidth, childHeight);
                }

                childConfig = child.rexSizer;
                padding = childConfig.padding;

                x = itemX + (padding.left * this.scaleX);
                width = colWidth - ((padding.left + padding.right) * this.scaleX);

                indentTop = (columnIndex % 2) ? this.space.indentTopEven : this.space.indentTopOdd;
                y = itemY + (indentTop * this.scaleY) + (padding.top * this.scaleY);
                height = rowHeight - ((padding.top + padding.bottom) * this.scaleY);

                if (childWidth === undefined) {
                    childWidth = GetDisplayWidth(child);
                }
                if (childHeight === undefined) {
                    childHeight = GetDisplayHeight(child);
                }
                alignOffsetX = (childConfig.alignOffsetX + (childConfig.alignOffsetOriginX * childWidth)) * this.scaleX;
                alignOffsetY = (childConfig.alignOffsetY + (childConfig.alignOffsetOriginY * childHeight)) * this.scaleY;

                LayoutChild.call(this,
                    child, x, y, width, height, childConfig.align,
                    alignOffsetX, alignOffsetY
                );

                itemX += colWidth + (this.space.column[columnIndex] * this.scaleX);
            }

            itemY += rowHeight + (this.space.row[rowIndex] * this.scaleY);
        }
    };

    var ResolveWidth = function (width) {
        var width = ResolveWidth$3.call(this, width);

        // Calculate proportionLength
        if ((width !== undefined) && (this.proportionWidthLength === undefined)) {
            var totalColumnProportions = this.totalColumnProportions;
            if (totalColumnProportions > 0) {
                var remainder = width - this.getChildrenWidth(false);
                if (remainder >= 0) {
                    this.proportionWidthLength = remainder / totalColumnProportions;
                }
            } else {
                this.proportionWidthLength = 0;
            }
        }

        return width;
    };

    var ResolveHeight = function (height) {
        var height = ResolveHeight$3.call(this, height);

        // Get proportionLength    
        if ((height !== undefined) && (this.proportionHeightLength === undefined)) {
            var totalRowProportions = this.totalRowProportions;
            if (totalRowProportions > 0) {
                var remainder = height - this.getChildrenHeight(false);
                if (remainder >= 0) {
                    this.proportionHeightLength = remainder / totalRowProportions;
                }
            } else {
                this.proportionHeightLength = 0;
            }
        }

        return height;
    };

    var ResolveChildrenWidth = function (parentWidth) {
        // Resolve width of sizer children
        var child, expandedChildWidth, childWidth;
        var colWidth;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (child && child.isRexSizer && !child.ignoreLayout) {
                colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
                expandedChildWidth = this.getExpandedChildWidth(child, colWidth);
                childWidth = child.resolveWidth(expandedChildWidth);
                if (childWidth === undefined) {
                    childWidth = expandedChildWidth;
                }
                child.resolveChildrenWidth(childWidth);
            }
        }
    };

    var ResolveChildrenHeight = function (parentHeight) {
        // Resolve width of sizer children
        var child, expandedChildHeight, childHeight;
        var rowHeight;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (child && child.isRexSizer && !child.ignoreLayout) {
                rowHeight = this.getRowHeight(Math.floor(parseInt(i) / this.rowCount));
                expandedChildHeight = this.getExpandedChildHeight(child, rowHeight);
                childHeight = child.resolveHeight(expandedChildHeight);
                if (childHeight === undefined) {
                    childHeight = expandedChildHeight;
                }
                child.resolveChildrenHeight(childHeight);
            }
        }
    };

    var RunWidthWrap = function (width) {
        var child, expandedChildWidth, childWidth;
        var colWidth;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (
                (!child) ||
                (child.isRexSizer && child.ignoreLayout) ||
                (!child.runWidthWrap)
            ) {
                continue;
            }

            colWidth = this.getColumnWidth(parseInt(i) % this.columnCount);
            expandedChildWidth = this.getExpandedChildWidth(child, colWidth);
            if (child.isRexSizer) {
                childWidth = child.resolveWidth(expandedChildWidth);
                if (childWidth === undefined) {
                    childWidth = expandedChildWidth;
                }
            }
            child.runWidthWrap(childWidth);
        }
        return this;
    };

    var RunHeightWrap = function (height) {
        var child, expandedChildHeight, childHeight;
        var rowHeight;
        for (var i in this.sizerChildren) {
            child = this.sizerChildren[i];
            if (
                (!child) ||
                (child.isRexSizer && child.ignoreLayout) ||
                (!child.runHeightWrap)
            ) {
                continue;
            }

            rowHeight = this.getRowHeight(Math.floor(parseInt(i) / this.rowCount));
            expandedChildHeight = this.getExpandedChildHeight(child, rowHeight);
            if (child.isRexSizer) {
                childHeight = child.resolveHeight(expandedChildHeight);
                if (childHeight === undefined) {
                    childHeight = expandedChildHeight;
                }
            }
            child.runHeightWrap(childHeight);
        }
        return this;
    };

    const IsPlainObject$7 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$s = Phaser.Utils.Objects.GetValue;
    const ALIGN_CENTER = Phaser.Display.Align.CENTER;


    var GetEmptyCellIndex = function (columnIndex, rowIndex, cells, columnCount, rowCount) {
        if ((typeof (columnIndex) === 'number') || (typeof (rowIndex) === 'number')) {
            if (columnIndex === undefined) {
                var idx;
                for (var i = 0; i < columnCount; i++) {
                    idx = (rowIndex * columnCount) + i;
                    if (!cells[idx]) {
                        return idx;
                    }
                }
            } else if (rowIndex === undefined) {
                var idx;
                for (var i = 0; i < rowCount; i++) {
                    idx = (i * columnCount) + columnIndex;
                    if (!cells[idx]) {
                        return idx;
                    }
                }
            } else {
                var idx = (rowIndex * columnCount) + columnIndex;
                if (!cells[idx]) {
                    return idx;
                }
            }

        } else if (rowIndex === true) {
            var idx;
            for (var i = 0; i < columnCount; i++) {
                for (var j = 0; j < rowCount; j++) {
                    idx = (j * columnCount) + i;
                    if (!cells[idx]) {
                        return idx;
                    }
                }
            }
        } else {
            for (var i = 0, cnt = cells.length; i < cnt; i++) {
                if (!cells[i]) {
                    return i;
                }
            }
        }
        return null;
    };

    var Add = function (gameObject, columnIndex, rowIndex, align, paddingConfig, expand, childKey) {
        var offsetX, offsetY;
        var offsetOriginX, offsetOriginY;

        AddChild$2.call(this, gameObject);
        if (IsPlainObject$7(columnIndex)) {
            var config = columnIndex;
            columnIndex = GetValue$s(config, 'column', undefined);
            rowIndex = GetValue$s(config, 'row', undefined);
            align = GetValue$s(config, 'align', ALIGN_CENTER);
            paddingConfig = GetValue$s(config, 'padding', 0);
            expand = GetValue$s(config, 'expand', false);
            childKey = GetValue$s(config, 'key', undefined);

            offsetX = GetValue$s(config, 'offsetX', 0);
            offsetY = GetValue$s(config, 'offsetY', 0);
            offsetOriginX = GetValue$s(config, 'offsetOriginX', 0);
            offsetOriginY = GetValue$s(config, 'offsetOriginY', 0);
        }

        // Get insert index
        var itemIndex = GetEmptyCellIndex(columnIndex, rowIndex, this.sizerChildren, this.columnCount, this.rowCount);
        if (itemIndex === null) {
            // Specific index mode
            if ((typeof (columnIndex) === 'number') && (typeof (rowIndex) === 'number')) {
                return this;
            }

            if ((rowIndex === true) || (typeof (rowIndex) === 'number')) {
                this.addEmptyColumn();
            } else {
                this.addEmptyRow();
            }

            // Get insert index again
            itemIndex = GetEmptyCellIndex(columnIndex, rowIndex, this.sizerChildren, this.columnCount, this.rowCount);
        }

        if (typeof (align) === 'string') {
            align = AlignConst[align];
        }
        if (align === undefined) {
            align = ALIGN_CENTER;
        }
        if (paddingConfig === undefined) {
            paddingConfig = 0;
        }
        if (expand === undefined) {
            expand = true;
        }

        if (offsetX === undefined) {
            offsetX = 0;
        }
        if (offsetY === undefined) {
            offsetY = 0;
        }
        if (offsetOriginX === undefined) {
            offsetOriginX = 0;
        }
        if (offsetOriginY === undefined) {
            offsetOriginY = 0;
        }

        var config = this.getSizerConfig(gameObject);
        config.align = align;
        config.padding = GetBoundsConfig$1(paddingConfig);

        if (IsPlainObject$7(expand)) {
            config.expandWidth = GetValue$s(expand, 'width', false);
            config.expandHeight = GetValue$s(expand, 'height', false);
        } else {
            config.expandWidth = expand;
            config.expandHeight = expand;
        }

        config.alignOffsetX = offsetX;
        config.alignOffsetY = offsetY;
        config.alignOffsetOriginX = offsetOriginX;
        config.alignOffsetOriginY = offsetOriginY;

        this.sizerChildren[itemIndex] = gameObject;

        if (childKey !== undefined) {
            this.addChildrenMap(childKey, gameObject);
        }
        return this;
    };

    var AddChildMethods = {
        add: Add
    };

    var Fill = function (arr, value, startIdx, endIdx) {
        if (startIdx === undefined) {
            startIdx = 0;
        }
        if (endIdx === undefined) {
            endIdx = arr.length - 1;
        }
        for (var i = startIdx; i <= endIdx; i++) {
            arr[i] = value;
        }
        return arr;
    };

    var RemoveChildMethods = {
        remove(gameObject, destroyChild) {
            if (this.getParentSizer(gameObject) !== this) {
                return this;
            }

            var idx = this.sizerChildren.indexOf(gameObject);
            if (idx !== -1) {
                this.sizerChildren[idx] = null;
            }

            RemoveChild$1.call(this, gameObject, destroyChild);
            return this;
        },

        removeAt(columnIndex, rowIndex, destroyChild) {
            var child = this.getChildAt(columnIndex, rowIndex);
            if (child) {
                this.remove(child, destroyChild);
            }
            return this;
        },

        removeAll(destroyChild) {
            for (var i = this.sizerChildren.length - 1; i >= 0; i--) {
                var child = this.sizerChildren[i];
                if (!child) {
                    continue;
                }

                this.remove(child, destroyChild);
            }
            return this;
        },

        clear(destroyChild) {
            Fill(this.sizerChildren, null);
            ClearChildren.call(this, destroyChild);
            return this;
        }
    };

    var SetSpaceMethods = {
        setColumnSpace(columnSpace) {
            if (!this.space.column) {
                this.space.column = [];
            }

            this.space.column.length = this.columnCount - 1;
            if (typeof (columnSpace) === 'number') {
                this.space.column0 = columnSpace;
                Fill(this.space.column, columnSpace);
            } else {
                this.space.column0 = columnSpace[0];
                for (var i = 0, cnt = this.columnCount - 1; i < cnt; i++) {
                    this.space.column[i] = columnSpace[i] || 0;
                }
            }
            return this;
        },

        setRowSpace(rowSpace) {
            if (!this.space.row) {
                this.space.row = [];
            }

            this.space.row.length = this.rowCount - 1;
            if (typeof (rowSpace) === 'number') {
                this.space.row0 = rowSpace;
                Fill(this.space.row, rowSpace);
            } else {
                this.space.row0 = rowSpace[i];
                for (var i = 0, cnt = this.rowCount - 1; i < cnt; i++) {
                    this.space.row[i] = rowSpace[i] || 0;
                }
            }

            return this;
        },

        setIndentLeft(odd, even) {
            this.space.indentLeftOdd = odd;
            this.space.indentLeftEven = even;
            return this;
        },

        setIndentTop(odd, even) {
            this.space.indentTopOdd = odd;
            this.space.indentTopEven = even;
            return this;
        }
    };

    const GetValue$r = Phaser.Utils.Objects.GetValue;

    var ResetGrid = function (
        columnCount, rowCount,
        columnProportions, rowProportions,
        space
    ) {
        if (columnCount === undefined) { columnCount = 0; }
        if (rowCount === undefined) { rowCount = 0; }
        if (columnProportions === undefined) { columnProportions = 0; }
        if (rowProportions === undefined) { rowProportions = 0; }

        this.columnCount = columnCount;
        this.rowCount = rowCount;
        this.gridCount = columnCount * rowCount;

        // children
        this.removeAll();
        this.sizerChildren.length = columnCount * rowCount;
        Fill(this.sizerChildren, null);

        // proportions
        this.columnProportions = [];
        this.columnProportions.length = columnCount;
        if (typeof (columnProportions) === 'number') {
            Fill(this.columnProportions, columnProportions);
        } else {
            for (var i = 0; i < columnCount; i++) {
                this.columnProportions[i] = columnProportions[i] || 0;
            }
        }
        this.rowProportions = [];
        this.rowProportions.length = rowCount;
        if (typeof (rowProportions) === 'number') {
            Fill(this.rowProportions, rowProportions);
        } else {
            for (var i = 0; i < rowCount; i++) {
                this.rowProportions[i] = rowProportions[i] || 0;
            }
        }

        // width & height
        this.columnWidth = [];
        this.columnWidth.length = columnCount;
        this.rowHeight = [];
        this.rowHeight.length = rowCount;

        // space
        this.setColumnSpace(GetValue$r(space, 'column', 0));
        this.setRowSpace(GetValue$r(space, 'row', 0));

        var scene = this.scene;
        var createCellContainerCallback = this.createCellContainerCallback;
        if (createCellContainerCallback) {
            for (var y = 0, ycnt = this.rowCount; y < ycnt; y++) {
                for (var x = 0, xcnt = this.columnCount; x < xcnt; x++) {
                    var addConfig = { column: x, row: y };
                    var child = createCellContainerCallback(scene, x, y, addConfig);
                    if (child) {
                        this.add(child, addConfig);
                    }
                }
            }
        }

        return this;
    };

    var InsertEmptyRow = function (rowIndex, proportion, space) {
        if (proportion === undefined) {
            proportion = this.rowProportions[0] || 0;
        }
        if (space === undefined) {
            space = this.space.row0 || 0;
        }

        this.rowCount += 1;
        this.gridCount += this.columnCount;

        var args = [rowIndex * this.columnCount, 0];
        for (var i = 0; i < this.columnCount; i++) {
            args.push(null);
        }
        this.sizerChildren.splice.apply(this.sizerChildren, args);

        this.rowProportions.push(proportion);

        this.rowHeight.length += 1;  // this.rowHeight will be recalculated when layout()    

        this.space.row.splice(rowIndex, 0, space);

        return this;
    };

    var AddEmptyRow = function (proportion, space) {
        InsertEmptyRow.call(this, this.rowCount, proportion, space);
        return this;
    };

    var InsertEmptyColumn = function (colIndex, proportion, space) {
        if (proportion === undefined) {
            proportion = this.columnProportions[0] || 0;
        }
        if (space === undefined) {
            space = this.space.column0 || 0;
        }

        this.columnCount += 1;
        this.gridCount += this.rowCount;

        for (var i = this.rowCount - 1; i >= 0; i--) {
            var insertIndex = (i * this.columnCount) + colIndex;
            this.sizerChildren.splice(insertIndex, 0, null);
        }

        this.columnProportions.push(proportion);

        this.columnWidth.length += 1;  // this.columnWidth will be recalculated when layout()    

        this.space.column.splice(colIndex, 0, space);

        return this;
    };

    var AddEmptyColumn = function (proportion, space) {
        InsertEmptyColumn.call(this, this.columnCount, proportion, space);
        return this;
    };

    var methods$3 = {
        getChildrenWidth: GetChildrenWidth$1,
        getChildrenHeight: GetChildrenHeight$1,
        getExpandedChildWidth: GetExpandedChildWidth,
        getExpandedChildHeight: GetExpandedChildHeight,
        getChildrenSizers: GetChildrenSizers$1,
        preLayout: PreLayout,
        layoutChildren: LayoutChildren$1,
        resolveWidth: ResolveWidth,
        resolveHeight: ResolveHeight,
        resolveChildrenWidth: ResolveChildrenWidth,
        resolveChildrenHeight: ResolveChildrenHeight,
        runWidthWrap: RunWidthWrap,
        runHeightWrap: RunHeightWrap,

        resetGrid: ResetGrid,
        insertEmptyRow: InsertEmptyRow,
        addEmptyRow: AddEmptyRow,
        insertEmptyColumn: InsertEmptyColumn,
        addEmptyColumn: AddEmptyColumn,
    };

    Object.assign(
        methods$3,
        AddChildMethods,
        RemoveChildMethods,
        SetSpaceMethods,
        SortChildrenMethods
    );

    var GetTotalColumnProportions = function () {
        var result = 0,
            proportion;
        for (var i = 0; i < this.columnCount; i++) {
            proportion = this.columnProportions[i];
            if (proportion > 0) {
                result += proportion;
            } else if (proportion === 0) {
                this.hasColumnProportion0Child = true;
            }
        }
        return result;
    };

    var GetTotalRowProportions = function () {
        var result = 0,
            proportion;
        for (var i = 0; i < this.rowCount; i++) {
            proportion = this.rowProportions[i];
            if (proportion > 0) {
                result += proportion;
            } else if (proportion === 0) {
                this.hasRowProportion0Child = true;
            }
        }
        return result;
    };

    const IsPlainObject$6 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$q = Phaser.Utils.Objects.GetValue;

    class GridSizer extends Base$1 {
        constructor(scene, x, y, minWidth, minHeight, columnCount, rowCount, columnProportions, rowProportions, config) {
            if (IsPlainObject$6(x)) {
                config = x;
                x = GetValue$q(config, 'x', 0);
                y = GetValue$q(config, 'y', 0);
                minWidth = GetValue$q(config, 'width', undefined);
                minHeight = GetValue$q(config, 'height', undefined);
                columnCount = GetValue$q(config, 'column', (config.col || 0));
                rowCount = GetValue$q(config, 'row', 0);
                columnProportions = GetValue$q(config, 'columnProportions', 0);
                rowProportions = GetValue$q(config, 'rowProportions', 0);
            } else if (IsPlainObject$6(minWidth)) {
                config = minWidth;
                minWidth = GetValue$q(config, 'width', undefined);
                minHeight = GetValue$q(config, 'height', undefined);
                columnCount = GetValue$q(config, 'column', (config.col || 0));
                rowCount = GetValue$q(config, 'row', 0);
                columnProportions = GetValue$q(config, 'columnProportions', 0);
                rowProportions = GetValue$q(config, 'rowProportions', 0);
            } else if (IsPlainObject$6(columnCount)) {
                config = columnCount;
                columnCount = GetValue$q(config, 'column', (config.col || 0));
                rowCount = GetValue$q(config, 'row', 0);
                columnProportions = GetValue$q(config, 'columnProportions', 0);
                rowProportions = GetValue$q(config, 'rowProportions', 0);
            } else if (IsPlainObject$6(columnProportions)) {
                config = columnProportions;
                columnProportions = GetValue$q(config, 'columnProportions', 0);
                rowProportions = GetValue$q(config, 'rowProportions', 0);
            }
            super(scene, x, y, minWidth, minHeight, config);

            this.type = 'rexGridSizer';
            this.sizerChildren = [];
            this.addChildrenMap('items', this.sizerChildren);
            this.setCreateCellContainerCallback(GetValue$q(config, 'createCellContainerCallback'));

            this.setIndentLeft(
                GetValue$q(config, 'space.indentLeftOdd', 0),
                GetValue$q(config, 'space.indentLeftEven', 0)
            );
            this.setIndentTop(
                GetValue$q(config, 'space.indentTopOdd', 0),
                GetValue$q(config, 'space.indentTopEven', 0)
            );

            this.resetGrid(
                columnCount, rowCount,
                columnProportions, rowProportions,
                GetValue$q(config, 'space', undefined)
            );

        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);

            // More free resources
            this.columnProportions = undefined;
            this.rowProportions = undefined;
            this.columnWidth = undefined;
            this.rowHeight = undefined;
            this.createCellContainerCallback = undefined;
        }

        setColumnProportion(columnIndex, proportion) {
            if (columnIndex >= this.columnProportions.length) {
                return this;
            }
            this.columnProportions[columnIndex] = proportion;
            return this;
        }

        setRowProportion(rowIndex, proportion) {
            if (rowIndex >= this.rowProportions.length) {
                return this;
            }
            this.rowProportions[rowIndex] = proportion;
            return this;
        }

        get totalColumnProportions() {
            if (this._totalColumnProportions === undefined) {
                this._totalColumnProportions = GetTotalColumnProportions.call(this);
            }
            return this._totalColumnProportions;
        }

        get totalRowProportions() {
            if (this._totalRowProportions === undefined) {
                this._totalRowProportions = GetTotalRowProportions.call(this);
            }
            return this._totalRowProportions;
        }

        getChildAt(columnIndex, rowIndex) {
            return this.sizerChildren[(rowIndex * this.columnCount) + columnIndex];
        }

        childToGridIndex(child, out) {
            if (!child) {
                return null;
            }

            var index = this.sizerChildren.indexOf(child);
            if (index === -1) {
                return null;
            }

            if (out === undefined) {
                out = {};
            }
            out.x = index % this.columnCount;
            out.y = Math.floor(index / this.columnCount);
            return out;
        }

        getColumnWidth(columnIndex) {
            var colProportion = this.columnProportions[columnIndex];
            var colWidth = (colProportion === 0) ? this.columnWidth[columnIndex] : (colProportion * this.proportionWidthLength);
            return colWidth;
        }

        getRowHeight(rowIndex) {
            var rowProportion = this.rowProportions[rowIndex];
            var rowHeight = (rowProportion === 0) ? this.rowHeight[rowIndex] : (rowProportion * this.proportionHeightLength);
            return rowHeight;
        }

        setCreateCellContainerCallback(callback) {
            this.createCellContainerCallback = callback;
            return this;
        }
    }

    Object.assign(
        GridSizer.prototype,
        methods$3
    );

    const GetValue$p = Phaser.Utils.Objects.GetValue;

    var AddChild = function (topPatent, childParent, config) {
        var childConfig = GetValue$p(config, 'child');
        var child = GetValue$p(childConfig, 'gameObject', undefined);
        if (child) {
            var childSpace = GetValue$p(config, 'space.child', 0);
            topPatent.childMargin = {};
            var childMargin = topPatent.childMargin;
            var childPadding = {};

            if (typeof (childSpace) === 'number') {
                // Legacy, add childSpace to slider
                switch (topPatent.scrollMode) {
                    case 0:
                    case 1:
                        childMargin.top = 0;
                        childMargin.bottom = 0;
                        childMargin.left = 0;
                        childMargin.right = 0;
                        break;

                    default:
                        childMargin.top = childSpace;
                        childMargin.bottom = childSpace;
                        childMargin.left = childSpace;
                        childMargin.right = childSpace;
                        break;
                }
            } else {
                switch (topPatent.scrollMode) {
                    case 0:
                        childMargin.top = GetValue$p(childSpace, 'top', 0);
                        childMargin.bottom = GetValue$p(childSpace, 'bottom', 0);

                        childPadding.left = GetValue$p(childSpace, 'left', 0);
                        childPadding.right = GetValue$p(childSpace, 'right', 0);
                        break;

                    case 1:
                        childMargin.top = GetValue$p(childSpace, 'left', 0);
                        childMargin.bottom = GetValue$p(childSpace, 'right', 0);

                        childPadding.top = GetValue$p(childSpace, 'top', 0);
                        childPadding.bottom = GetValue$p(childSpace, 'bottom', 0);
                        break;

                    default: // 2
                        childMargin.top = GetValue$p(childSpace, 'top', 0);
                        childMargin.bottom = GetValue$p(childSpace, 'bottom', 0);
                        childMargin.left = GetValue$p(childSpace, 'left', 0);
                        childMargin.right = GetValue$p(childSpace, 'right', 0);
                        break;

                }
            }

            childParent.add(child,
                {
                    column: 1,
                    row: 1,
                    align: GetValue$p(childConfig, 'align', 'center'),
                    padding: childPadding,
                    expand: {
                        width: GetValue$p(childConfig, 'expandWidth', true),  // Private
                        height: GetValue$p(childConfig, 'expandHeight', true) // Private
                    }
                }
            );
        }

        topPatent.addChildrenMap('child', child);

    };

    /*
    src: {
        fillColor, 
        fillAlpha, 
        pathData, 
        pathIndexes  // Earcut(pathData)
    }
    */

    var Utils$1 = Phaser.Renderer.WebGL.Utils;

    var FillPathWebGL = function (pipeline, calcMatrix, src, alpha, dx, dy)
    {
        var fillTintColor = Utils$1.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);

        var path = src.pathData;
        var pathIndexes = src.pathIndexes;

        for (var i = 0; i < pathIndexes.length; i += 3)
        {
            var p0 = pathIndexes[i] * 2;
            var p1 = pathIndexes[i + 1] * 2;
            var p2 = pathIndexes[i + 2] * 2;

            var x0 = path[p0 + 0] - dx;
            var y0 = path[p0 + 1] - dy;
            var x1 = path[p1 + 0] - dx;
            var y1 = path[p1 + 1] - dy;
            var x2 = path[p2 + 0] - dx;
            var y2 = path[p2 + 1] - dy;

            var tx0 = calcMatrix.getX(x0, y0);
            var ty0 = calcMatrix.getY(x0, y0);
            var tx1 = calcMatrix.getX(x1, y1);
            var ty1 = calcMatrix.getY(x1, y1);
            var tx2 = calcMatrix.getX(x2, y2);
            var ty2 = calcMatrix.getY(x2, y2);

            pipeline.batchTri(src, tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, 2);
        }
    };

    /*
    src: {
        strokeColor,
        strokeAlpha,
        pathData,
        lineWidth,
        closePath
    }
    */
    var Utils = Phaser.Renderer.WebGL.Utils;

    var StrokePathWebGL = function (pipeline, src, alpha, dx, dy)
    {
        var strokeTint = pipeline.strokeTint;
        var strokeTintColor = Utils.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);

        strokeTint.TL = strokeTintColor;
        strokeTint.TR = strokeTintColor;
        strokeTint.BL = strokeTintColor;
        strokeTint.BR = strokeTintColor;

        var path = src.pathData;
        var pathLength = path.length - 1;
        var lineWidth = src.lineWidth;
        var halfLineWidth = lineWidth / 2;

        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        if (!src.closePath)
        {
            pathLength -= 2;
        }

        for (var i = 2; i < pathLength; i += 2)
        {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;

            pipeline.batchLine(
                px1,
                py1,
                px2,
                py2,
                halfLineWidth,
                halfLineWidth,
                lineWidth,
                i - 2,
                (src.closePath) ? (i === pathLength - 1) : false
            );

            px1 = px2;
            py1 = py2;
        }
    };

    const GetCalcMatrix$1 = Phaser.GameObjects.GetCalcMatrix;

    var PolygonWebGLRenderer = function (renderer, src, camera, parentMatrix) {    
        if (src.dirty) {
            src.updateData();
            src.dirty = false;
        }

        camera.addToRenderList(src);

        var pipeline = renderer.pipelines.set(src.pipeline);

        var result = GetCalcMatrix$1(src, camera, parentMatrix);

        var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = camera.alpha * src.alpha;

        renderer.pipelines.preBatch(src);

        if (src.isFilled) {
            FillPathWebGL(pipeline, calcMatrix, src, alpha, dx, dy);
        }

        if (src.isStroked) {
            StrokePathWebGL(pipeline, src, alpha, dx, dy);
        }

        renderer.pipelines.postBatch(src);
    };

    var FillStyleCanvas = function (ctx, src, altColor, altAlpha)
    {
        var fillColor = (altColor) ? altColor : src.fillColor;
        var fillAlpha = (altAlpha) ? altAlpha : src.fillAlpha;

        var red = ((fillColor & 0xFF0000) >>> 16);
        var green = ((fillColor & 0xFF00) >>> 8);
        var blue = (fillColor & 0xFF);

        ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
    };

    var LineStyleCanvas = function (ctx, src, altColor, altAlpha)
    {
        var strokeColor = (altColor) ? altColor : src.strokeColor;
        var strokeAlpha = (altAlpha) ? altAlpha : src.strokeAlpha;

        var red = ((strokeColor & 0xFF0000) >>> 16);
        var green = ((strokeColor & 0xFF00) >>> 8);
        var blue = (strokeColor & 0xFF);

        ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
        ctx.lineWidth = src.lineWidth;
    };

    const SetTransform$1 = Phaser.Renderer.Canvas.SetTransform;

    var PolygonCanvasRenderer = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateData();
            src.dirty = false;
        }

        camera.addToRenderList(src);

        var ctx = renderer.currentContext;

        if (SetTransform$1(renderer, ctx, src, camera, parentMatrix)) {
            var dx = src._displayOriginX;
            var dy = src._displayOriginY;

            var path = src.pathData;
            var pathLength = path.length - 1;

            var px1 = path[0] - dx;
            var py1 = path[1] - dy;

            ctx.beginPath();

            ctx.moveTo(px1, py1);

            if (!src.closePath) {
                pathLength -= 2;
            }

            for (var i = 2; i < pathLength; i += 2) {
                var px2 = path[i] - dx;
                var py2 = path[i + 1] - dy;

                ctx.lineTo(px2, py2);
            }

            ctx.closePath();

            if (src.isFilled) {
                FillStyleCanvas(ctx, src);

                ctx.fill();
            }

            if (src.isStroked) {
                LineStyleCanvas(ctx, src);

                ctx.stroke();
            }

            //  Restore the context saved in SetTransform
            ctx.restore();
        }
    };

    var Render$1 = {
        renderWebGL: PolygonWebGLRenderer,
        renderCanvas: PolygonCanvasRenderer

    };

    const Shape$1 = Phaser.GameObjects.Shape;

    class PolygnBase extends Shape$1 {
        get fillColor() {
            return this._fillColor;
        }

        set fillColor(value) {
            this._fillColor = value;
            this.isFilled = (value != null) && (this._fillAlpha > 0);
        }

        get fillAlpha() {
            return this._fillAlpha;
        }

        set fillAlpha(value) {
            this._fillAlpha = value;
            this.isFilled = (value > 0) && (this._fillColor != null);
        }

        // Fully override setFillStyle method
        setFillStyle(color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.fillColor = color;
            this.fillAlpha = alpha;

            return this;
        }

        get strokeColor() {
            return this._strokeColor;
        }

        set strokeColor(value) {
            this._strokeColor = value;
            this.isStroked = (value != null) && (this._strokeAlpha > 0) && (this._lineWidth > 0);
        }

        get strokeAlpha() {
            return this._strokeAlpha;
        }

        set strokeAlpha(value) {
            this._strokeAlpha = value;
            this.isStroked = (value > 0) && (this._strokeColor != null) && (this._lineWidth > 0);
        }

        get lineWidth() {
            return this._lineWidth;
        }

        set lineWidth(value) {
            this._lineWidth = value;
            this.isStroked = (value > 0) && (this._strokeColor != null);
        }

        // Fully override setStrokeStyle method
        setStrokeStyle(lineWidth, color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;

            return this;
        }

        updateData() {
            return this;
        }

        get width() {
            return this.geom.width;
        }
        set width(value) {
            this.resize(value, this.height);
        }

        get height() {
            return this.geom.height;
        }
        set height(value) {
            this.resize(this.width, value);
        }

        setSize(width, height) {
            var input = this.input;
            if (input && !input.customHitArea) {
                input.hitArea.width = width;
                input.hitArea.height = height;
            }
            return this;
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }

    }

    Object.assign(
        PolygnBase.prototype,
        Render$1
    );

    var IsArcCorner = function (radius) {
        return ((radius.x > 0) && (radius.y > 0));
    };

    var LineTo = function (x, y, pathData) {
        var cnt = pathData.length;
        if (cnt >= 2) {
            var lastX = pathData[cnt - 2];
            var lastY = pathData[cnt - 1];
            if ((x === lastX) && (y === lastY)) {
                return pathData;
            }
        }

        pathData.push(x, y);
        return pathData;
    };

    const DegToRad$1 = Phaser.Math.DegToRad;

    var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        var deltaAngle = endAngle - startAngle;
        var step = DegToRad$1(deltaAngle) / iteration;
        startAngle = DegToRad$1(startAngle);
        for (var i = 0; i <= iteration; i++) {
            var angle = startAngle + (step * i);
            var x = centerX + (radiusX * Math.cos(angle));
            var y = centerY + (radiusY * Math.sin(angle));
            LineTo(x, y, pathData);
        }
        return pathData;
    };

    const IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$o = Phaser.Utils.Objects.GetValue;
    const Earcut$1 = Phaser.Geom.Polygon.Earcut;

    class RoundRectangle extends PolygnBase {
        constructor(scene, x, y, width, height, radiusConfig, fillColor, fillAlpha) {
            var strokeColor, strokeAlpha, strokeWidth, shapeType;
            if (IsPlainObject$5(x)) {
                var config = x;

                x = config.x;
                y = config.y;
                width = config.width;
                height = config.height;
                radiusConfig = config.radius;
                fillColor = config.color;
                fillAlpha = config.alpha;

                strokeColor = config.strokeColor;
                strokeAlpha = config.strokeAlpha;
                strokeWidth = config.strokeWidth;

                shapeType = config.shape;
            }

            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = 1; }
            if (height === undefined) { height = width; }
            if (radiusConfig === undefined) { radiusConfig = 0; }
            if (shapeType === undefined) { shapeType = 0; }

            var geom = new RoundRectangle$1();  // Configurate it later
            super(scene, 'rexRoundRectangleShape', geom);

            this.setShapeType(shapeType);

            if (this.shapeType === 0) {
                var radius = GetValue$o(radiusConfig, 'radius', radiusConfig);
                geom.setTo(0, 0, width, height, radius);
            } else {
                var radius = { x: (width / 2), y: (height / 2) };
                geom.setTo(0, 0, width, height, radius);
            }

            this.setIteration(GetValue$o(radiusConfig, 'iteration', undefined));
            this.setPosition(x, y);

            this.setFillStyle(fillColor, fillAlpha);

            if (strokeWidth === undefined) {
                strokeWidth = 2;
            }
            this.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);

            this.updateDisplayOrigin();
            this.dirty = true;
        }

        updateData() {
            var geom = this.geom;
            var pathData = this.pathData;

            pathData.length = 0;

            var width = geom.width,
                height = geom.height,
                cornerRadius = geom.cornerRadius,
                radius,
                iteration = this.iteration + 1;

            // Top-left
            radius = cornerRadius.tl;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = radius.x;
                    var centerY = radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 180, 270, false, iteration, pathData);
                } else {
                    var centerX = 0;
                    var centerY = 0;
                    ArcTo(centerX, centerY, radius.x, radius.y, 90, 0, true, iteration, pathData);
                }
            } else {
                LineTo(0, 0, pathData);
            }

            // Top-right
            radius = cornerRadius.tr;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = width - radius.x;
                    var centerY = radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 270, 360, false, iteration, pathData);
                } else {
                    var centerX = width;
                    var centerY = 0;
                    ArcTo(centerX, centerY, radius.x, radius.y, 180, 90, true, iteration, pathData);
                }
            } else {
                LineTo(width, 0, pathData);
            }

            // Bottom-right
            radius = cornerRadius.br;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = width - radius.x;
                    var centerY = height - radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 0, 90, false, iteration, pathData);
                } else {
                    var centerX = width;
                    var centerY = height;
                    ArcTo(centerX, centerY, radius.x, radius.y, 270, 180, true, iteration, pathData);
                }
            } else {
                LineTo(width, height, pathData);
            }

            // Bottom-left
            radius = cornerRadius.bl;
            if (IsArcCorner(radius)) {
                if (radius.convex) {
                    var centerX = radius.x;
                    var centerY = height - radius.y;
                    ArcTo(centerX, centerY, radius.x, radius.y, 90, 180, false, iteration, pathData);
                } else {
                    var centerX = 0;
                    var centerY = height;
                    ArcTo(centerX, centerY, radius.x, radius.y, 360, 270, true, iteration, pathData);
                }
            } else {
                LineTo(0, height, pathData);
            }

            pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
            this.pathIndexes = Earcut$1(pathData);
            return this;
        }

        setShapeType(shapeType) {
            if (typeof (shapeType) === 'string') {
                shapeType = ShapeTypeMap[shapeType];
            }

            this.shapeType = shapeType;
            return this;
        }

        setSize(width, height) {
            // Override Shape's setSize method
            if (height === undefined) {
                height = width;
            }
            if ((this.geom.width === width) && (this.geom.height === height)) {
                return this;
            }
            this.geom.setSize(width, height);

            if (this.shapeType === 1) {
                this.setRadius({ x: (width / 2), y: (height / 2) });
            }

            this.updateDisplayOrigin();
            this.dirty = true;

            super.setSize(width, height);
            return this;
        }

        get radius() {
            return this.geom.radius;
        }

        set radius(value) {
            this.geom.setRadius(value);
            this.updateDisplayOrigin();
            this.dirty = true;
        }

        get radiusTL() {
            return this.geom.radiusTL;
        }

        set radiusTL(value) {
            this.geom.radiusTL = value;
            this.dirty = true;
        }

        get radiusTR() {
            return this.geom.radiusTR;
        }

        set radiusTR(value) {
            this.geom.radiusTR = value;
            this.dirty = true;
        }

        get radiusBL() {
            return this.geom.radiusBL;
        }

        set radiusBL(value) {
            this.geom.radiusBL = value;
            this.dirty = true;
        }

        get radiusBR() {
            return this.geom.radiusBR;
        }

        set radiusBR(value) {
            this.geom.radiusBR = value;
            this.dirty = true;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setRadiusTL(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusTL = value;
            return this;
        }

        setRadiusTR(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusTR = value;
            return this;
        }

        setRadiusBL(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusBL = value;
            return this;
        }

        setRadiusBR(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusBR = value;
            return this;
        }

        get cornerRadius() {
            return this.geom.cornerRadius;
        }

        set cornerRadius(value) {
            this.radius = value;
        }

        setCornerRadius(value) {
            return this.setRadius(value);
        }

        get iteration() {
            return this._iteration;
        }

        set iteration(value) {
            // Set iteration first time
            if (this._iteration === undefined) {
                this._iteration = value;
                return;
            }

            // Change iteration value
            if (this._iteration === value) {
                return;
            }

            this._iteration = value;
            this.dirty = true;
        }

        setIteration(iteration) {
            if (iteration === undefined) {
                iteration = 6;
            }
            this.iteration = iteration;
            return this;
        }

    }

    const ShapeTypeMap = {
        rectangle: 0,
        circle: 1
    };

    var ExtractByPrefix = function (obj, prefix, delimiter, out) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        if (out === undefined) {
            out = {};
        }

        if (!obj) {
            return out;
        }

        if (prefix in obj) {
            return Object.assign(out, obj[prefix])
        }

        prefix += delimiter;

        for (var key in obj) {
            if (!key.startsWith(prefix)) {
                continue;
            }

            out[key.replace(prefix, '')] = obj[key];
        }

        return out;
    };

    var GetPartialData = function (obj, keys, out) {
        if (out === undefined) {
            out = {};
        }

        if (Array.isArray(keys)) {
            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                out[key] = obj[key];
            }
        } else {
            for (var key in keys) {
                out[key] = obj[key];
            }
        }

        return out;
    };

    const GetValue$n = Phaser.Utils.Objects.GetValue;

    class StyleManager extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.style = GetValue$n(config, 'style', this);

            var propertiesMap = GetValue$n(config, 'propertiesMap');
            this.activeStyle = ExtractStyle(config, 'active', propertiesMap);
            this.hoverStyle = ExtractStyle(config, 'hover', propertiesMap);
            this.disableStyle = ExtractStyle(config, 'disable', propertiesMap);

            this.onModifyStyle = GetValue$n(config, 'onModifyStyle');
        }

        getStyle(keys) {
            return GetPartialData(this.style, keys);
        }

        modifyStyle(style) {
            for (var key in style) {
                this.style[key] = style[key];
            }

            if (this.onModifyStyle) {
                this.onModifyStyle(this.parent, style);
            }

            return this;
        }

        applyStyle(newStyle) {
            if (!newStyle) {
                return undefined;
            }

            var currentStyle = this.getStyle(newStyle);
            if (!IsKeyValueEqual(currentStyle, newStyle)) {
                this.modifyStyle(newStyle);
                return currentStyle;
            } else {
                return undefined;
            }
        }

        setActiveState(enable) {
            SetStateEnableMethod.call(this, 'active', enable);
            return this;
        }

        setHoverState(enable) {
            SetStateEnableMethod.call(this, 'hover', enable);
            return this;
        }

        setDisableState(enable) {
            SetStateEnableMethod.call(this, 'disable', enable);
            return this;
        }
    }

    var ExtractStyle = function (config, prefix, propertiesMap) {
        var result = ExtractByPrefix(config, prefix);

        if (propertiesMap) {
            for (var name in result) {
                if (propertiesMap.hasOwnProperty(name)) {
                    result[propertiesMap[name]] = result[name];
                    delete result[name];
                }
            }
        }

        return result;
    };

    var SetStateEnableMethod = function (stateName, enable) {
        if (enable === undefined) {
            enable = true;
        }

        var stateVarName = `${stateName}State`;
        var styleVarName = `${stateName}Style`;
        var styleSaveVarName = `${stateName}StyleSave`;

        if (this[stateVarName] === enable) {
            return;
        }

        this[stateVarName] = enable;

        if (enable) {
            this[styleSaveVarName] = this.applyStyle(this[styleVarName]);
        } else {
            this.applyStyle(this[styleSaveVarName]);
            this[styleSaveVarName] = undefined;
        }
    };

    var HelperMethods = {
        addStyleManager(config) {
            this.styleManager = new StyleManager(this, config);
            return this;
        },

        setActiveState(enable) {
            this.styleManager.setActiveState(enable);
            return this;
        },

        setHoverState(enable) {
            this.styleManager.setHoverState(enable);
            return this;
        },

        setDisableState(enable) {
            this.styleManager.setDisableState(enable);
            return this;
        }
    };

    class StatesRoundRectangle extends RoundRectangle {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }
            super(scene, config);
            this.type = 'rexStatesRoundRectangleShape';

            config.style = this;
            config.propertiesMap = PropertiesMap$1;

            this.addStyleManager(config);

            delete config.style;
            delete config.propertiesMap;
        }
    }

    const PropertiesMap$1 = {
        color: 'fillColor',
        alpha: 'fillAlpha',
        // strokeColor: 'strokeColor',
        // strokeAlpha: 'strokeAlpha',
        strokeWidth: 'lineWidth',
    };

    Object.assign(
        StatesRoundRectangle.prototype,
        HelperMethods
    );

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        src.updateData();
        camera.addToRenderList(src);

        var pipeline = renderer.pipelines.set(src.pipeline);

        var result = GetCalcMatrix(src, camera, parentMatrix);

        var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = camera.alpha * src.alpha;

        renderer.pipelines.preBatch(src);

        var shapes = src.geom,
            shape;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            shape = shapes[i];
            if (shape.visible) {
                shape.webglRender(pipeline, calcMatrix, alpha, dx, dy);
            }
        }

        renderer.pipelines.postBatch(src);
    };

    const SetTransform = Phaser.Renderer.Canvas.SetTransform;

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
        src.updateData();
        camera.addToRenderList(src);

        var ctx = renderer.currentContext;

        if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
            var dx = src._displayOriginX;
            var dy = src._displayOriginY;

            var shapes = src.geom,
                shape;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                shape = shapes[i];
                if (shape.visible) {
                    shape.canvasRender(ctx, dx, dy);
                }
            }

            //  Restore the context saved in SetTransform
            ctx.restore();
        }
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    const Shape = Phaser.GameObjects.Shape;
    const RemoveItem = Phaser.Utils.Array.Remove;

    class BaseShapes extends Shape {
        constructor(scene, x, y, width, height) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 2;
            }
            if (height === undefined) {
                height = width;
            }

            super(scene, 'rexShapes', []);

            this._width = -1;
            this._height = -1;
            this.dirty = true;
            this.isSizeChanged = true;
            this.shapes = {};

            this.setPosition(x, y);
            this.setSize(width, height);

            this.updateDisplayOrigin();
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.setSize(value, this._height);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.setSize(this._width, value);
        }

        setDirty(value) {
            if (value === undefined) {
                value = true;
            }
            this.dirty = value;
            return this;
        }

        setSize(width, height) {
            this.isSizeChanged = this.isSizeChanged || (this._width !== width) || (this._height !== height);
            this.dirty = this.dirty || this.isSizeChanged;
            this._width = width;
            this._height = height;
            this.updateDisplayOrigin();
            var input = this.input;
            if (input && !input.customHitArea) {
                input.hitArea.width = width;
                input.hitArea.height = height;
            }
            return this;
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }

        get fillColor() {
            return this._fillColor;
        }

        set fillColor(value) {
            this.setFillStyle(value, this._fillAlpha);
        }

        get fillAlpha() {
            return this._fillAlpha;
        }

        set fillAlpha(value) {
            this.setFillStyle(this._fillColor, value);
        }

        setFillStyle(color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.dirty = this.dirty ||
                (this.fillColor !== color) ||
                (this.fillAlpha !== alpha);

            this._fillColor = color;
            this._fillAlpha = alpha;

            return this;
        }

        get lineWidth() {
            return this._lineWidth;
        }

        set lineWidth(value) {
            this.setStrokeStyle(value, this._strokeColor, this._strokeAlpha);
        }

        get strokeColor() {
            return this._strokeColor;
        }

        set strokeColor(value) {
            this.setStrokeStyle(this._lineWidth, value, this._strokeAlpha);
        }

        get strokeAlpha() {
            return this._strokeAlpha;
        }

        set strokeAlpha(value) {
            this.setStrokeStyle(this._lineWidth, this._strokeColor, value);
        }

        setStrokeStyle(lineWidth, color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.dirty = this.dirty ||
                (this.lineWidth !== lineWidth) ||
                (this.strokeColor !== color) ||
                (this.strokeAlpha !== alpha);

            this._lineWidth = lineWidth;
            this._strokeColor = color;
            this._strokeAlpha = alpha;

            return this;
        }

        updateShapes() {

        }

        updateData() {
            if (!this.dirty) {
                return this;
            }

            this.updateShapes();
            var shapes = this.geom;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];
                if (shape.dirty) {
                    shape.updateData();
                }
            }

            this.isSizeChanged = false;
            this.dirty = false;


            return this;
        }

        clear() {
            this.geom.length = 0;
            Clear(this.shapes);
            this.dirty = true;
            return this;
        }

        getShape(name) {
            return this.shapes[name];
        }

        getShapes() {
            return this.geom;
        }

        addShape(shape) {
            this.geom.push(shape);
            var name = shape.name;
            if (name) {
                this.shapes[name] = shape;
            }
            this.dirty = true;
            return this;
        }

        deleteShape(name) {
            var shape = this.getShape(name);
            if (shape) {
                delete this.shapes[name];
                RemoveItem(this.geom, shape);
            }
            return this;
        }
    }

    Object.assign(
        BaseShapes.prototype,
        Render
    );

    const Linear$2 = Phaser.Math.Linear;
    const Percent$2 = Phaser.Math.Percent;

    var ProgressValueMethods = {
        setValue(value, min, max) {
            if ((value === undefined) || (value === null)) {
                return this;
            }

            if (min !== undefined) {
                value = Percent$2(value, min, max);
            }
            this.value = value;
            return this;
        },

        addValue(inc, min, max) {
            if (min !== undefined) {
                inc = Percent$2(inc, min, max);
            }
            this.value += inc;
            return this;
        },

        getValue(min, max) {
            var value = this.value;
            if (min !== undefined) {
                value = Linear$2(min, max, value);
            }
            return value;
        }
    };

    const Percent$1 = Phaser.Math.Percent;

    var SetEaseValuePropName = function (name) {
        this.easeValuePropName = name;
        return this;
    };

    var SetEaseValueDuration = function (duration) {
        this.easeValueDuration = duration;
        return this;
    };

    var SetEaseValueFunction = function (ease) {
        this.easeFunction = ease;
        return this;
    };

    var StopEaseValue = function () {
        if (this.easeValueTask) {
            this.easeValueTask.stop();
        }
        return this;
    };

    var EaseValueTo = function (value, min, max) {
        if ((value === undefined) || (value === null)) {
            return this;
        }

        if (min !== undefined) {
            value = Percent$1(value, min, max);
        }

        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
        }

        this.easeValueTask.restart({
            key: this.easeValuePropName,
            to: value,
            duration: this.easeValueDuration,
            ease: this.easeFunction,
        });

        return this;
    };

    var EaseValueRepeat = function (from, to, repeat, repeatDelay) {     
        if (repeat === undefined) {
            repeat = -1;
        }
        if (repeatDelay === undefined) {
            repeatDelay = 0;
        }

        if (this.easeValueTask === undefined) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
        }

        this.easeValueTask.restart({
            key: this.easeValuePropName,
            from: from, to: to,
            duration: this.easeValueDuration,
            ease: this.easeFunction,
            repeat: repeat, repeatDelay: repeatDelay,
        });

        return this;
    };

    var EaseValueMethods = {
        setEaseValuePropName: SetEaseValuePropName,
        setEaseValueDuration: SetEaseValueDuration,
        setEaseValueFunction: SetEaseValueFunction,
        stopEaseValue: StopEaseValue,
        easeValueTo: EaseValueTo,
        easeValueRepeat: EaseValueRepeat
    };

    const GetValue$m = Phaser.Utils.Objects.GetValue;
    const Clamp$3 = Phaser.Math.Clamp;

    function ProgressBase (BaseClass) {
        class ProgressBase extends BaseClass {
            bootProgressBase(config) {
                this.eventEmitter = GetValue$m(config, 'eventEmitter', this);

                var callback = GetValue$m(config, 'valuechangeCallback', null);
                if (callback !== null) {
                    var scope = GetValue$m(config, 'valuechangeCallbackScope', undefined);
                    this.eventEmitter.on('valuechange', callback, scope);
                }

                this
                    .setEaseValuePropName('value')
                    .setEaseValueDuration(GetValue$m(config, 'easeValue.duration', 0))
                    .setEaseValueFunction(GetValue$m(config, 'easeValue.ease', 'Linear'));

                return this;
            }

            get value() {
                return this._value;
            }

            set value(value) {
                value = Clamp$3(value, 0, 1);

                var oldValue = this._value;
                var valueChanged = (oldValue != value);
                this.dirty = this.dirty || valueChanged;
                this._value = value;

                if (valueChanged) {
                    this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
                }
            }
        }

        Object.assign(
            ProgressBase.prototype,
            ProgressValueMethods,
            EaseValueMethods
        );

        return ProgressBase;
    }

    var FillStyle = function (color, alpha) {
        if (color == null) {
            this.isFilled = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isFilled = true;
            this.fillColor = color;
            this.fillAlpha = alpha;
        }
        return this;
    };

    var LineStyle = function (lineWidth, color, alpha) {
        if ((lineWidth == null) || (color == null)) {
            this.isStroked = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isStroked = true;
            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;
        }
        return this;
    };

    var StyleMethods = {
        fillStyle: FillStyle,
        lineStyle: LineStyle
    };

    class BaseGeom {
        constructor() {
            this.name = undefined;
            this.dirty = true;
            this.visible = true;
            this.data = undefined;

            this.isFilled = false;
            this.fillColor = undefined;
            this.fillAlpha = 1;

            this.isStroked = false;
            this.lineWidth = 1;
            this.strokeColor = undefined;
            this.strokeAlpha = 1;
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setVisible(visible) {
            if (visible === undefined) {
                visible = true;
            }
            this.visible = visible;
            return this;
        }

        reset() {
            this
                .setVisible()
                .fillStyle()
                .lineStyle();

            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {

        }

        canvasRender(ctx, dx, dy) {

        }

        updateData() {
            this.dirty = false;
        }
    }

    Object.assign(
        BaseGeom.prototype,
        StyleMethods,
        DataMethods
    );

    const Earcut = Phaser.Geom.Polygon.Earcut;

    class PathBase extends BaseGeom {
        constructor() {
            super();

            this.pathData = [];
            this.pathIndexes = [];
            this.closePath = false;
        }

        updateData() {
            this.pathIndexes = Earcut(this.pathData);

            super.updateData();
            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {
            if (this.isFilled) {
                FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
            }

            if (this.isStroked) {
                StrokePathWebGL(pipeline, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            var path = this.pathData;
            var pathLength = path.length - 1;

            var px1 = path[0] - dx;
            var py1 = path[1] - dy;

            ctx.beginPath();

            ctx.moveTo(px1, py1);

            if (!this.closePath) {
                pathLength -= 2;
            }

            for (var i = 2; i < pathLength; i += 2) {
                var px2 = path[i] - dx;
                var py2 = path[i + 1] - dy;
                ctx.lineTo(px2, py2);
            }

            if (this.closePath) {
                ctx.closePath();
            }


            if (this.isFilled) {
                FillStyleCanvas(ctx, this);
                ctx.fill();
            }

            if (this.isStroked) {
                LineStyleCanvas(ctx, this);
                ctx.stroke();
            }
        }
    }

    Phaser.Math.DegToRad;

    var StartAt = function (x, y, pathData) {
        pathData.length = 0;

        if (x != null) {
            pathData.push(x, y);
        }

        return pathData;
    };

    //import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

    const QuadraticBezierInterpolation = Phaser.Math.Interpolation.QuadraticBezier;

    var QuadraticBezierTo = function (cx, cy, x, y, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];
        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                QuadraticBezierInterpolation(t, p0x, cx, x),
                QuadraticBezierInterpolation(t, p0y, cy, y)
            );
        }
        return pathData;
    };

    // import CubicBezierInterpolation from '../../utils/math/interpolation/CubicBezierInterpolation.js';

    const CubicBezierInterpolation = Phaser.Math.Interpolation.CubicBezier;

    var CubicBezierCurveTo = function (cx0, cy0, cx1, cy1, x, y, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];
        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                CubicBezierInterpolation(t, p0x, cx0, cx1, x),
                CubicBezierInterpolation(t, p0y, cy0, cy1, y)
            );
        }
        return pathData;
    };

    //import CatmullRomInterpolation from '../../utils/math/interpolation/CatmullRomInterpolation.js';

    const CatmullRomInterpolation = Phaser.Math.Interpolation.CatmullRom;

    var CatmullRomTo = function (points, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];

        var xList = [p0x];
        var yList = [p0y];
        for (var i = 0, cnt = points.length; i < cnt; i += 2) {
            xList.push(points[i]);
            yList.push(points[i + 1]);
        }

        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                CatmullRomInterpolation(xList, t),
                CatmullRomInterpolation(yList, t)
            );
        }
        return pathData;
    };

    var DuplicateLast = function (pathData) {
        var len = pathData.length;
        if (len < 2) {
            return pathData;
        }

        var lastX = pathData[len - 2];
        var lastY = pathData[len - 1];
        pathData.push(lastX);
        pathData.push(lastY);

        return pathData;
    };

    var AddPathMethods = {
        clear() {
            this.start();
            return this;
        },

        start() {
            this.startAt();
            return this;
        },

        startAt(x, y) {
            this.restorePathData();
            this.accumulationLengths = undefined;

            StartAt(x, y, this.pathData);
            this.firstPointX = x;
            this.firstPointY = y;
            this.lastPointX = x;
            this.lastPointY = y;

            return this;
        },

        lineTo(x, y, relative) {
            if (relative === undefined) {
                relative = false;
            }
            if (relative) {
                x += this.lastPointX;
                y += this.lastPointY;
            }

            LineTo(x, y, this.pathData);

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        verticalLineTo(x, relative) {
            this.lineTo(x, this.lastPointY, relative);
            return this;
        },

        horizontalLineTo(y, relative) {
            this.lineTo(this.lastPointX, y, relative);
            return this;
        },

        ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
            if (anticlockwise === undefined) {
                anticlockwise = false;
            }

            ArcTo(
                centerX, centerY,
                radiusX, radiusY,
                startAngle, endAngle, anticlockwise,
                this.iterations,
                this.pathData
            );

            this.lastPointX = this.pathData[this.pathData.length - 2];
            this.lastPointY = this.pathData[this.pathData.length - 1];
            return this;
        },

        arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
            this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise);
            return this;
        },

        quadraticBezierTo(cx, cy, x, y) {
            QuadraticBezierTo(
                cx, cy, x, y,
                this.iterations,
                this.pathData
            );

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
            CubicBezierCurveTo(
                cx0, cy0, cx1, cy1, x, y,
                this.iterations,
                this.pathData
            );

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        catmullRomTo(...points) {
            CatmullRomTo(
                points,
                this.iterations,
                this.pathData
            );

            this.lastPointX = points[points.length-2];
            this.lastPointY = points[points.length-1];
            return this;
        },

        close() {
            // Line to first point        
            var startX = this.pathData[0],
                startY = this.pathData[1];
            if ((startX !== this.lastPointX) || (startY !== this.lastPointY)) {
                this.lineTo(startX, startY);
            }

            this.closePath = true;
            return this;
        },

        end() {
            DuplicateLast(this.pathData);
            return this;
        },

    };

    //import PointRotateAround from '../../utils/math/RotateAround.js';

    const PointRotateAround = Phaser.Math.RotateAround;

    var RotateAround = function (centerX, centerY, angle, pathData) {
        var point = { x: 0, y: 0 };
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            point.x = pathData[i];
            point.y = pathData[i + 1];
            PointRotateAround(point, centerX, centerY, angle);
            pathData[i] = point.x;
            pathData[i + 1] = point.y;
        }
        return pathData;
    };

    var Scale = function (centerX, centerY, scaleX, scaleY, pathData) {
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            var x = pathData[i] - centerX;
            var y = pathData[i + 1] - centerY;
            x *= scaleX;
            y *= scaleY;
            pathData[i] = x + centerX;
            pathData[i + 1] = y + centerY;
        }
        return pathData;
    };

    var Offset = function (x, y, pathData) {
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            pathData[i] += x;
            pathData[i + 1] += y;
        }
        return pathData;
    };

    const DegToRad = Phaser.Math.DegToRad;
    Phaser.Math.RotateAround;

    var TransformPointsMethods = {
        rotateAround(centerX, centerY, angle) {
            if (this.pathData.length === 0) {
                return this;
            }

            angle = DegToRad(angle);

            RotateAround(centerX, centerY, angle, this.pathData);

            var pathDataCnt = this.pathData.length;
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];
            return this;
        },

        scale(centerX, centerY, scaleX, scaleY) {
            if (this.pathData.length === 0) {
                return this;
            }

            Scale(centerX, centerY, scaleX, scaleY, this.pathData);
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];
            return this;
        },

        offset(x, y) {
            Offset(x, y, this.pathData);
            return this;
        }

    };

    var Copy = function (dest, src, startIdx, endIdx) {
        if (startIdx === undefined) {
            startIdx = 0;
        }    if (endIdx === undefined) {
            endIdx = src.length;
        }
        dest.length = endIdx - startIdx;
        for (var i = 0, len = dest.length; i < len; i++) {
            dest[i] = src[i + startIdx];
        }
        return dest;
    };

    var SavePathDataMethods = {
        savePathData() {
            if (this.pathDataSaved) {
                return this;
            }

            this.pathDataSave = [...this.pathData];
            this.pathData.length = 0;
            this.pathDataSaved = true;
            return this;
        },

        restorePathData() {
            if (!this.pathDataSaved) {
                return this;
            }

            Copy(this.pathData, this.pathDataSave);
            this.pathDataSave = undefined;
            this.pathDataSaved = false;
            return this;
        },
    };

    const DistanceBetween$1 = Phaser.Math.Distance.Between;
    const Wrap = Phaser.Math.Wrap;
    const Linear$1 = Phaser.Math.Linear;

    var AppendFromPathSegment = function (srcPathData, accumulationLengths, startT, endT, destPathData) {
        if (endT === undefined) {
            endT = startT;
            startT = 0;
        }

        startT = WrapT(startT);
        endT = WrapT(endT);

        if (startT === endT) {
            return;
        }

        var totalPathLength = accumulationLengths[accumulationLengths.length - 1];
        var startL = totalPathLength * startT;
        var endL = totalPathLength * endT;
        if (startT < endT) {
            AddPathSegment(srcPathData, accumulationLengths, startL, endL, destPathData);
        } else {
            AddPathSegment(srcPathData, accumulationLengths, startL, totalPathLength, destPathData);
            AddPathSegment(srcPathData, accumulationLengths, 0, endL, destPathData);
        }

        DuplicateLast(destPathData);
    };

    var AddPathSegment = function (srcPathData, accumulationLengths, startL, endL, destPathData) {
        var skipState = (startL > 0);
        for (var i = 0, cnt = accumulationLengths.length; i < cnt; i++) {
            var pIdx = i * 2;
            var d = accumulationLengths[i];

            if (skipState) {
                if (d < startL) {
                    continue;
                } else if (d == startL) {
                    skipState = false;
                } else { // d > startL
                    var deltaD = d - accumulationLengths[i - 1];
                    var t = 1 - ((d - startL) / deltaD);
                    destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
                    destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
                    skipState = false;
                }
            }

            if (d <= endL) {
                destPathData.push(srcPathData[pIdx]);
                destPathData.push(srcPathData[pIdx + 1]);
                if (d === endL) {
                    break;
                }
            } else { // d > endL
                var deltaD = d - accumulationLengths[i - 1];
                var t = 1 - ((d - endL) / deltaD);
                destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
                destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
                break;
            }
        }
    };

    var GetInterpolation = function (pathData, i0, i1, t) {
        var p0 = pathData[i0], p1 = pathData[i1];
        return Linear$1(p0, p1, t);
    };

    var WrapT = function (t) {
        if (t === 0) {
            return 0;
        } else if ((t % 1) === 0) {
            return 1;
        }
        return Wrap(t, 0, 1);
    };

    var PathSegmentMethods = {
        updateAccumulationLengths() {
            if (this.accumulationLengths == null) {
                this.accumulationLengths = [];
            } else if (this.accumulationLengths.length === (this.pathData.length / 2)) {
                return this;
            }

            var accumulationLengths = this.accumulationLengths;
            var pathData = this.pathData;
            var prevX, prevY, x, y;
            var d, accumulationLength = 0;
            for (var i = 0, cnt = pathData.length; i < cnt; i += 2) {
                x = pathData[i];
                y = pathData[i + 1];

                d = (prevX === undefined) ? 0 : DistanceBetween$1(prevX, prevY, x, y);
                accumulationLength += d;
                accumulationLengths.push(accumulationLength);

                prevX = x;
                prevY = y;
            }

            this.totalPathLength = accumulationLength;

            return this;
        },

        setDisplayPathSegment(startT, endT) {
            if (!this.pathDataSaved) {
                this.updateAccumulationLengths();
                this.savePathData();
            }

            this.pathData.length = 0;
            AppendFromPathSegment(this.pathDataSave, this.accumulationLengths, startT, endT, this.pathData);

            return this;
        },

        appendFromPathSegment(src, startT, endT) {
            if (startT === undefined) {
                this.pathData.push(...src.pathData);
            } else {
                src.updateAccumulationLengths();
                AppendFromPathSegment(src.pathData, src.accumulationLengths, startT, endT, this.pathData);
            }

            this.firstPointX = this.pathData[0];
            this.firstPointY = this.pathData[1];
            this.lastPointX = this.pathData[this.pathData.length - 2];
            this.lastPointY = this.pathData[this.pathData.length - 1];
            return this;
        },
    };

    var GraphicsMethods = {
        draw(graphics, isFill, isStroke) {
            var points = this.toPoints();
            if (isFill) {
                graphics.fillPoints(points, this.closePath, this.closePath);
            }
            if (isStroke) {
                graphics.strokePoints(points, this.closePath, this.closePath);
            }

            return this;
        }
    };

    var ToPoints = function (pathData, points) {
        if (points === undefined) {
            points = [];
        }
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            points.push({
                x: pathData[i],
                y: pathData[i + 1]
            });
        }
        return points;
    };

    //import Polygon from '../../utils/geom/polygon/Polygon.js';

    const Polygon = Phaser.Geom.Polygon;

    var ToPolygon = function (pathData, polygon) {
        if (polygon === undefined) {
            polygon = new Polygon();
        }
        polygon.setTo(pathData);
        return polygon;
    };

    class PathDataBuilder {
        constructor(pathData) {
            if (pathData === undefined) {
                pathData = [];
            }

            this.pathData = pathData;
            this.closePath = false;
            this.setIterations(32);

            this.firstPointX = undefined;
            this.firstPointY = undefined;
            this.lastPointX = undefined;
            this.lastPointY = undefined;
            this.accumulationLengths = undefined;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        toPoints() {
            return ToPoints(this.pathData);
        }

        toPolygon(polygon) {
            return ToPolygon(this.pathData, polygon);
        }

    }

    Object.assign(
        PathDataBuilder.prototype,
        AddPathMethods,
        TransformPointsMethods,
        SavePathDataMethods,
        PathSegmentMethods,
        GraphicsMethods,
    );

    class Lines extends PathBase {
        constructor() {
            super();
            this.builder = new PathDataBuilder(this.pathData);
        }

        get iterations() {
            return this.builder.iterations;
        }

        set iterations(value) {
            this.dirty = this.dirty || (this.builder.iterations !== value);
            this.builder.setIterations(value);
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        get lastPointX() {
            return this.builder.lastPointX;
        }

        get lastPointY() {
            return this.builder.lastPointY;
        }

        start() {
            this.builder.start();

            this.dirty = true;
            return this;
        }

        startAt(x, y) {
            this.builder.startAt(x, y);

            this.dirty = true;
            return this;
        }

        lineTo(x, y, relative) {
            this.builder.lineTo(x, y, relative);

            this.dirty = true;
            return this;
        }

        verticalLineTo(x, relative) {
            this.builder.verticalLineTo(x, relative);

            this.dirty = true;
            return this;
        }

        horizontalLineTo(y, relative) {
            this.builder.horizontalLineTo(y, relative);

            this.dirty = true;
            return this;
        }

        ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
            this.builder.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);

            this.dirty = true;
            return this;
        }

        arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
            this.builder.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

            this.dirty = true;
            return this;
        }

        quadraticBezierTo(cx, cy, x, y) {
            this.builder.quadraticBezierTo(cx, cy, x, y);

            this.dirty = true;
            return this;
        }

        cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
            this.builder.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);

            this.dirty = true;
            return this;
        }

        catmullRomTo(...points) {
            this.builder.catmullRomTo(...points);

            this.dirty = true;
            return this;
        }

        close() {
            this.builder.close();

            this.closePath = this.builder.closePath;
            this.dirty = true;
            return this;
        }

        end() {
            this.builder.end();
            this.dirty = true;
            return this;
        }

        rotateAround(centerX, centerY, angle) {
            this.builder.rotateAround(centerX, centerY, angle);

            this.dirty = true;
            return this;
        }

        scale(centerX, centerY, scaleX, scaleY) {
            this.builder.scale(centerX, centerY, scaleX, scaleY);

            this.dirty = true;
            return this;
        }

        offset(x, y) {
            this.builder.offset(x, y);

            this.dirty = true;
            return this;
        }

        toPolygon(polygon) {
            return this.builder.toPolygon(polygon);
        }

        appendPathFrom(src, startT, endT) {
            this.builder.appendFromPathSegment(src.builder, startT, endT);
            return this;
        }

        copyPathFrom(src, startT, endT) {
            this.builder.clear().appendFromPathSegment(src.builder, startT, endT);
            return this;
        }

        setDisplayPathSegment(startT, endT) {
            this.builder.setDisplayPathSegment(startT, endT);
            return this;
        }
    }

    Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

    Phaser.Utils.Objects.GetValue;

    Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

    var UpdateShapes = function () {
        var skewX = this.skewX;
        var width = this.width - Math.abs(skewX);
        var height = this.height;

        var trackFill = this.getShape('trackFill');
        trackFill.fillStyle(this.trackColor);
        if (trackFill.isFilled) {
            BuildRectangle(
                trackFill,      // lines
                0, 0,           // x0, y0
                width, height,  // x1, y1
                skewX           // skewX
            );
        }

        var bar = this.getShape('bar');
        bar.fillStyle(this.barColor);
        if (bar.isFilled) {
            var barX0, barX1;
            if (!this.rtl) {
                barX0 = 0;
                barX1 = width * this.value;
            } else {
                barX0 = width * (1 - this.value);
                barX1 = width;
            }

            BuildRectangle(
                bar,            // lines
                barX0, 0,       // x0, y0
                barX1, height,  // x1, y1
                skewX           // skew
            );
        }

        var trackStroke = this.getShape('trackStroke');
        trackStroke.lineStyle(this.trackStrokeThickness, this.trackStrokeColor);
        if (trackStroke.isStroked) {
            BuildRectangle(
                trackStroke,     // lines            
                0, 0,           // x0, y0
                width, height,  // x1, y1
                skewX           // skewX
            );
        }
    };

    var BuildRectangle = function (lines, x0, y0, x1, y1, skewX) {
        var startX = (x0 + x1) / 2;  // Start x from middle
        if (skewX >= 0) {
            lines
                .startAt(startX + skewX, y0).lineTo(x1 + skewX, y0)
                .lineTo(x1, y1)
                .lineTo(x0, y1)
                .lineTo(x0 + skewX, y0).lineTo(startX + skewX, y0);
        } else {
            lines
                .startAt(startX, y0).lineTo(x1, y0)
                .lineTo(x1 - skewX, y1)
                .lineTo(x0 - skewX, y1)
                .lineTo(x0, y0).lineTo(startX, y0);
        }

        lines.close();

        return lines;
    };

    const GetValue$l = Phaser.Utils.Objects.GetValue;
    const IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;

    class LineProgress extends ProgressBase(BaseShapes) {
        constructor(scene, x, y, width, height, barColor, value, config) {
            if (IsPlainObject$4(x)) {
                config = x;

                x = config.x;
                y = config.y;
                width = config.width;
                height = config.height;
                barColor = config.barColor;
                value = config.value;
            } else if (IsPlainObject$4(width)) {
                config = width;

                width = config.width;
                height = config.height;
                barColor = config.barColor;
                value = config.value;
            } else if (IsPlainObject$4(barColor)) {
                config = barColor;

                barColor = config.barColor;
                value = config.value;
            }

            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = 2; }
            if (height === undefined) { height = width; }
            if (value === undefined) { value = 0; }

            super(scene, x, y, width, height, config);
            this.type = 'rexLineProgress';

            this.bootProgressBase(config);

            this
                .addShape((new Lines()).setName('trackFill'))
                .addShape((new Lines()).setName('bar'))
                .addShape((new Lines()).setName('trackStroke'));

            this.setTrackColor(GetValue$l(config, 'trackColor', undefined));
            this.setBarColor(barColor);
            this.setTrackStroke(GetValue$l(config, 'trackStrokeThickness', 2), GetValue$l(config, 'trackStrokeColor', undefined));

            this.setSkewX(GetValue$l(config, 'skewX', 0));

            this.setRTL(GetValue$l(config, 'rtl', false));

            this.setValue(value);
        }

        get trackColor() {
            return this._trackColor;
        }

        set trackColor(value) {
            this.dirty = this.dirty || (this._trackColor != value);
            this._trackColor = value;
        }

        setTrackColor(color) {
            this.trackColor = color;
            return this;
        }

        get trackStrokeColor() {
            return this._trackStrokeColor;
        }

        set trackStrokeColor(value) {
            this.dirty = this.dirty || (this._trackStrokeColor != value);
            this._trackStrokeColor = value;
        }

        get trackStrokeThickness() {
            return this._trackStrokeThickness;
        }

        set trackStrokeThickness(value) {
            this.dirty = this.dirty || (this._trackStrokeThickness != value);
            this._trackStrokeThickness = value;
        }

        setTrackStroke(lineWidth, color) {
            this.trackStrokeThickness = lineWidth;
            this.trackStrokeColor = color;
            return this;
        }

        get barColor() {
            return this._barColor;
        }

        set barColor(value) {
            this.dirty = this.dirty || (this._barColor != value);
            this._barColor = value;
        }

        setBarColor(color) {
            this.barColor = color;
            return this;
        }

        get skewX() {
            return this._skewX;
        }

        set skewX(value) {
            this.dirty = this.dirty || (this._skewX != value);
            this._skewX = value;
        }

        setSkewX(value) {
            this.skewX = value;
            return this;
        }

        get rtl() {
            return this._rtl;
        }

        set rtl(value) {
            value = !!value;
            this.dirty = this.dirty || (this._rtl != value);
            this._rtl = value;
        }

        setRTL(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.rtl = enable;
            return this;
        }

    }

    var Methods$4 = {
        updateShapes: UpdateShapes,
    };

    Object.assign(
        LineProgress.prototype,
        Methods$4,
    );

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                    var newEntry;
                    if (i === cnt - 1) {
                        if (defaultEntry === undefined) {
                            newEntry = {};
                        } else {
                            newEntry = defaultEntry;
                        }
                    } else {
                        newEntry = {};
                    }

                    entry[key] = newEntry;
                }

                entry = entry[key];
            }
        }

        return entry;
    };

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    class StatesBarRectangle extends LineProgress {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            if (!config.hasOwnProperty('value')) {
                config.value = 0;
            }

            if (!config.hasOwnProperty('hover.bar')) {
                config['hover.bar'] = true;
            }

            if (!config.hasOwnProperty('easeDuration')) {
                config.easeDuration = 200;
            }

            if (!config.hasOwnProperty('ease')) {
                config.ease = 'Quad';
            }

            SetValue(config, 'easeValue.duration', config.easeDuration);
            SetValue(config, 'easeValue.ease', config.ease);

            super(scene, config);
            this.type = 'rexStatesBarRectangleShape';

            this.barState = false;

            config.style = this;
            config.propertiesMap = PropertiesMap;

            this.addStyleManager(config);

            delete config.style;
            delete config.propertiesMap;
        }

        get bar() {
            return this.barState;
        }

        set bar(value) {
            value = !!value;
            if (this.barState === value) {
                return;
            }
            this.barState = value;
            this.easeValueTo((this.barState) ? 1 : 0);
        }

    }

    const PropertiesMap = {
        color: 'trackColor',
        strokeColor: 'trackStrokeColor',
        strokeWidth: 'trackStrokeThickness',

        // barColor: 'barColor'
    };

    Object.assign(
        StatesBarRectangle.prototype,
        HelperMethods
    );

    var HasProperty = function (obj, prop) {
        if (!obj) {
            return false;
        }

        if (obj.hasOwnProperty(prop)) {
            return true;
        }

        while (obj) {
            if (Object.getOwnPropertyDescriptor(obj, prop)) {
                return true;
            }
            obj = obj.__proto__;
        }

        return false;
    };

    var GetFXFactory = function (gameObject) {
        if (gameObject.preFX) {
            return gameObject.preFX;
        }
        if (gameObject.postFX) {
            return gameObject.postFX;
        }
        return null;
    };

    var AddClearEffectCallback = function (gameObject, effectSwitchName) {
        if (!gameObject._effectSwitchNames) {
            gameObject._effectSwitchNames = [];

            gameObject.clearAllEffects = function () {
                var effectSwitchNames = gameObject._effectSwitchNames;
                for (var i = 0, cnt = effectSwitchNames.length; i < cnt; i++) {
                    gameObject[effectSwitchNames[i]] = null;
                }

                return gameObject;
            };
            gameObject.on('destroy', gameObject.clearAllEffects, gameObject);
        }

        gameObject._effectSwitchNames.push(effectSwitchName);
    };

    var AddBarrelProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'barrel')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var barrel;
        Object.defineProperty(gameObject, 'barrel', {
            get: function () {
                return barrel;
            },
            set: function (value) {
                if (barrel === value) {
                    return;
                }

                barrel = value;

                if ((barrel === null) || (barrel === false)) {
                    if (gameObject._barrelEffect) {
                        fxFactory.remove(gameObject._barrelEffect);
                        gameObject._barrelEffect = undefined;
                    }
                } else {
                    if (!gameObject._barrelEffect) {
                        gameObject._barrelEffect = fxFactory.addBarrel();
                    }
                    gameObject._barrelEffect.amount = barrel;
                }

            },
        });

        gameObject.barrel = null;

        AddClearEffectCallback(gameObject, 'barrel');

        return gameObject;
    };

    var AddColorMatrixEffectPropertiesBase = function (gameObject, effectName, inputMode) {
        // Don't attach properties again
        if (HasProperty(gameObject, effectName)) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var EffectInstancePropertyName = `_${effectName}Effect`;

        var currentValue;
        Object.defineProperty(gameObject, effectName, {
            get: function () {
                return currentValue;
            },
            set: function (value) {
                if (currentValue === value) {
                    return;
                }

                currentValue = value;

                if ((currentValue === null) || (currentValue === false)) {
                    if (gameObject[EffectInstancePropertyName]) {
                        fxFactory.remove(gameObject[EffectInstancePropertyName]);
                        gameObject[EffectInstancePropertyName] = undefined;
                    }
                } else {
                    if (!gameObject[EffectInstancePropertyName]) {
                        gameObject[EffectInstancePropertyName] = fxFactory.addColorMatrix();
                    }
                    var effectInstance = gameObject[EffectInstancePropertyName];
                    effectInstance[effectName]((inputMode === 1) ? value : undefined);
                }

            },
        });

        gameObject[effectName] = null;

        AddClearEffectCallback(gameObject, effectName);

        return gameObject;
    };

    var AddBlackWhiteProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'blackWhite');
        return gameObject;
    };

    var AddBloomProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'bloomColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var bloomColor,
            bloomOffsetX = 1,
            bloomOffsetY = 1,
            bloomBlurStrength = 1,
            bloomStrength = 1,
            bloomSteps = 4;
        Object.defineProperty(gameObject, 'bloomColor', {
            get: function () {
                return bloomColor;
            },
            set: function (value) {
                if (bloomColor === value) {
                    return;
                }

                bloomColor = value;

                if ((bloomColor === null) || (bloomColor === false)) {
                    if (gameObject._bloom) {
                        fxFactory.remove(gameObject._bloom);
                        gameObject._bloom = undefined;
                        fxFactory.setPadding(0);
                    }
                } else {
                    if (!gameObject._bloom) {
                        gameObject._bloom = fxFactory.addBloom(bloomColor, bloomOffsetX, bloomOffsetY, bloomBlurStrength, bloomStrength, bloomSteps);
                        fxFactory.setPadding(Math.max(bloomOffsetX, bloomOffsetY) + 1);
                    }

                    gameObject._bloom.color = bloomColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'bloomOffsetX', {
            get: function () {
                return bloomOffsetX;
            },
            set: function (value) {
                if (bloomOffsetX === value) {
                    return;
                }

                bloomOffsetX = value;

                if (gameObject._bloom) {
                    var offset = Math.max(bloomOffsetX, bloomOffsetY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._bloom.offsetX = bloomOffsetX;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomOffsetY', {
            get: function () {
                return bloomOffsetY;
            },
            set: function (value) {
                if (bloomOffsetY === value) {
                    return;
                }

                bloomOffsetY = value;

                if (gameObject._bloom) {
                    var offset = Math.max(bloomOffsetX, bloomOffsetY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._bloom.offsetY = bloomOffsetY;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomBlurStrength', {
            get: function () {
                return bloomBlurStrength;
            },
            set: function (value) {
                if (bloomBlurStrength === value) {
                    return;
                }

                bloomBlurStrength = value;

                if (gameObject._bloom) {
                    gameObject._bloom.blurStrength = bloomBlurStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomStrength', {
            get: function () {
                return bloomStrength;
            },
            set: function (value) {
                if (bloomStrength === value) {
                    return;
                }

                bloomStrength = value;

                if (gameObject._bloom) {
                    gameObject._bloom.strength = bloomStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomSteps', {
            get: function () {
                return bloomSteps;
            },
            set: function (value) {
                if (bloomSteps === value) {
                    return;
                }

                bloomSteps = value;

                if (gameObject._bloom) {
                    gameObject._bloom.steps = bloomSteps;
                }
            },
        });

        gameObject.bloomColor = null;

        AddClearEffectCallback(gameObject, 'bloomColor');

        return gameObject;
    };

    var AddBlurProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'blurColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var blurColor,
            blurQuality = 0,
            blurX = 1,
            blurY = 1,
            blurStrength = 1,
            blurSteps = 4;
        Object.defineProperty(gameObject, 'blurColor', {
            get: function () {
                return blurColor;
            },
            set: function (value) {
                if (blurColor === value) {
                    return;
                }

                blurColor = value;

                if ((blurColor === null) || (blurColor === false)) {
                    if (gameObject._blur) {
                        fxFactory.remove(gameObject._blur);
                        gameObject._blur = undefined;
                        fxFactory.setPadding(0);
                    }
                } else {
                    if (!gameObject._blur) {
                        gameObject._blur = fxFactory.addBlur(blurQuality, blurX, blurY, blurStrength, blurColor, blurSteps);
                        fxFactory.setPadding(Math.max(blurX, blurY) + 1);
                    }

                    gameObject._blur.color = blurColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'blurQuality', {
            get: function () {
                return blurQuality;
            },
            set: function (value) {
                if (blurQuality === value) {
                    return;
                }

                blurQuality = value;

                if (gameObject._blur) {
                    gameObject._blur.quality = blurQuality;
                }

            },
        });

        Object.defineProperty(gameObject, 'blurX', {
            get: function () {
                return blurX;
            },
            set: function (value) {
                if (blurX === value) {
                    return;
                }

                blurX = value;

                if (gameObject._blur) {
                    var offset = Math.max(blurX, blurY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._blur.x = blurX;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurY', {
            get: function () {
                return blurY;
            },
            set: function (value) {
                if (blurY === value) {
                    return;
                }

                blurY = value;

                if (gameObject._blur) {
                    var offset = Math.max(blurX, blurY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._blur.y = blurY;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurStrength', {
            get: function () {
                return blurStrength;
            },
            set: function (value) {
                if (blurStrength === value) {
                    return;
                }

                blurStrength = value;

                if (gameObject._blur) {
                    gameObject._blur.strength = blurStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurSteps', {
            get: function () {
                return blurSteps;
            },
            set: function (value) {
                if (blurSteps === value) {
                    return;
                }

                blurSteps = value;

                if (gameObject._blur) {
                    gameObject._blur.steps = blurSteps;
                }
            },
        });

        gameObject.blurColor = null;

        AddClearEffectCallback(gameObject, 'blurColor');

        return gameObject;
    };

    var AddBokehProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'bokehRadius')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var bokehRadius,
            bokehAmount = 1,
            bokehContrast = 0.2;
        Object.defineProperty(gameObject, 'bokehRadius', {
            get: function () {
                return bokehRadius;
            },
            set: function (value) {
                if (bokehRadius === value) {
                    return;
                }

                bokehRadius = value;

                if ((bokehRadius === null) || (bokehRadius === false)) {
                    if (gameObject._bokeh) {
                        fxFactory.remove(gameObject._bokeh);
                        gameObject._bokeh = undefined;
                    }
                } else {
                    if (!gameObject._bokeh) {
                        gameObject._bokeh = fxFactory.addBokeh(bokehRadius, bokehAmount, bokehContrast);
                    }

                    gameObject._bokeh.radius = bokehRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'bokehAmount', {
            get: function () {
                return bokehAmount;
            },
            set: function (value) {
                if (bokehAmount === value) {
                    return;
                }

                bokehAmount = value;

                if (gameObject._bokeh) {
                    gameObject._bokeh.amount = bokehAmount;
                }
            },
        });

        Object.defineProperty(gameObject, 'bokehContrast', {
            get: function () {
                return bokehContrast;
            },
            set: function (value) {
                if (bokehContrast === value) {
                    return;
                }

                bokehContrast = value;

                if (gameObject._bokeh) {
                    gameObject._bokeh.contrast = bokehContrast;
                }
            },
        });

        gameObject.bokehRadius = null;

        AddClearEffectCallback(gameObject, 'bokehRadius');

        return gameObject;
    };

    var AddBrightnessProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'brightness', 1);
        return gameObject;
    };

    var AddBrownProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'brown');
        return gameObject;
    };

    var AddCircleProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'circleColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var circleColor,
            circleThickness = 8,
            circleBackgroundColor = 0x000000,
            circleBackgroundAlpha = 0.4,
            circleScale = 1,
            circleFeather = 0.005;
        Object.defineProperty(gameObject, 'circleColor', {
            get: function () {
                return circleColor;
            },
            set: function (value) {
                if (circleColor === value) {
                    return;
                }

                circleColor = value;

                if ((circleColor === null) || (circleColor === false)) {
                    if (gameObject._circle) {
                        fxFactory.remove(gameObject._circle);
                        gameObject._circle = undefined;
                    }
                } else {
                    if (!gameObject._circle) {
                        gameObject._circle = fxFactory.addCircle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
                        gameObject.circleBackgroundAlpha = circleBackgroundAlpha;
                    }

                    gameObject._circle.color = circleColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'circleThickness', {
            get: function () {
                return circleThickness;
            },
            set: function (value) {
                if (circleThickness === value) {
                    return;
                }

                circleThickness = value;

                if (gameObject._circle) {
                    gameObject._circle.thickness = circleThickness;
                }
            },
        });

        Object.defineProperty(gameObject, 'circleBackgroundColor', {
            get: function () {
                return circleBackgroundColor;
            },
            set: function (value) {
                if (circleBackgroundColor === value) {
                    return;
                }

                circleBackgroundColor = value;

                if (gameObject._circle) {
                    gameObject._circle.backgroundColor = circleBackgroundColor;
                }
            },
        });

        Object.defineProperty(gameObject, 'circleBackgroundAlpha', {
            get: function () {
                return circleBackgroundAlpha;
            },
            set: function (value) {
                if (circleBackgroundAlpha === value) {
                    return;
                }

                circleBackgroundAlpha = value;

                if (gameObject._circle) {
                    gameObject._circle.glcolor2[3] = circleBackgroundAlpha;
                }
            },
        });


        Object.defineProperty(gameObject, 'circleScale', {
            get: function () {
                return circleScale;
            },
            set: function (value) {
                if (circleScale === value) {
                    return;
                }

                circleScale = value;

                if (gameObject._circle) {
                    gameObject._circle.scale = circleScale;
                }
            },
        });

        Object.defineProperty(gameObject, 'circleFeather', {
            get: function () {
                return circleFeather;
            },
            set: function (value) {
                if (circleFeather === value) {
                    return;
                }

                circleFeather = value;

                if (gameObject._circle) {
                    gameObject._circle.feather = circleFeather;
                }
            },
        });

        gameObject.circleColor = null;

        AddClearEffectCallback(gameObject, 'circleColor');

        return gameObject;
    };

    var AddContrastProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'contrast', 1);
        return gameObject;
    };

    var AddDesaturateProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'desaturate', 1);
        return gameObject;
    };

    var AddDesaturateLuminanceProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'desaturateLuminance');
        return gameObject;
    };

    var AddDisplacementProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'displacementKey')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var displacementKey,
            displacementX = 0.005,
            displacementY = 0.005;
        Object.defineProperty(gameObject, 'displacementKey', {
            get: function () {
                return displacementKey;
            },
            set: function (value) {
                if (displacementKey === value) {
                    return;
                }

                displacementKey = value;

                if ((displacementKey === null) || (displacementKey === false)) {
                    if (gameObject._displacement) {
                        fxFactory.remove(gameObject._displacement);
                        gameObject._displacement = undefined;
                    }
                } else {
                    if (!gameObject._displacement) {
                        gameObject._displacement = fxFactory.addDisplacement(displacementKey, displacementX, displacementY);
                    }

                    gameObject._displacement.setTexture(displacementKey);
                }

            },
        });

        Object.defineProperty(gameObject, 'displacementX', {
            get: function () {
                return displacementX;
            },
            set: function (value) {
                if (displacementX === value) {
                    return;
                }

                displacementX = value;

                if (gameObject._displacement) {
                    gameObject._displacement.x = displacementX;
                }
            },
        });

        Object.defineProperty(gameObject, 'displacementY', {
            get: function () {
                return displacementY;
            },
            set: function (value) {
                if (displacementY === value) {
                    return;
                }

                displacementY = value;

                if (gameObject._displacement) {
                    gameObject._displacement.y = displacementY;
                }
            },
        });

        gameObject.displacementKey = null;

        AddClearEffectCallback(gameObject, 'displacementKey');

        return gameObject;
    };

    var AddGlowProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'glowColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var glowColor,
            glowOuterStrength = 4,
            glowInnerStrength = 0;
        Object.defineProperty(gameObject, 'glowColor', {
            get: function () {
                return glowColor;
            },
            set: function (value) {
                if (glowColor === value) {
                    return;
                }

                glowColor = value;

                if ((glowColor === null) || (glowColor === false)) {
                    if (gameObject._glow) {
                        fxFactory.remove(gameObject._glow);
                        gameObject._glow = undefined;
                        fxFactory.setPadding(0);
                    }
                } else {
                    if (!gameObject._glow) {
                        gameObject._glow = fxFactory.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
                        fxFactory.setPadding(glowOuterStrength + 1);
                    }

                    gameObject._glow.color = glowColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'glowOuterStrength', {
            get: function () {
                return glowOuterStrength;
            },
            set: function (value) {
                if (glowOuterStrength === value) {
                    return;
                }

                glowOuterStrength = value;

                if (gameObject._glow) {
                    fxFactory.setPadding(glowOuterStrength + 1);
                    gameObject._glow.outerStrength = glowOuterStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'glowInnerStrength', {
            get: function () {
                return glowInnerStrength;
            },
            set: function (value) {
                if (glowInnerStrength === value) {
                    return;
                }

                glowInnerStrength = value;

                if (gameObject._glow) {
                    gameObject._glow.innerStrength = glowInnerStrength;
                }
            },
        });

        gameObject.glowColor = null;

        AddClearEffectCallback(gameObject, 'glowColor');

        return gameObject;
    };

    var AddGradientProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'gradientColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var gradientColor1,
            gradientColor2,
            gradientAlpha = 0.5,
            gradientFromX = 0,
            gradientFromY = 0,
            gradientToX = 0,
            gradientToY = 1,
            gradientSize = 0;
        Object.defineProperty(gameObject, 'gradientColor', {
            get: function () {
                return [gradientColor1, gradientColor2];
            },

            set: function (value) {
                var color1, color2;
                if ((value === null) || (value === false)) {
                    color1 = null;
                    color2 = null;
                } else {
                    color1 = value[0];
                    color2 = value[1];
                }

                if ((gradientColor1 === color1) && (gradientColor2 === color2)) {
                    return;
                }

                gradientColor1 = color1;
                gradientColor2 = color2;

                if ((gradientColor1 === null) || (gradientColor1 === false)) {
                    if (gameObject._gradient) {
                        fxFactory.remove(gameObject._gradient);
                        gameObject._gradient = undefined;
                    }
                } else {
                    if (!gameObject._gradient) {
                        gameObject._gradient = fxFactory.addGradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
                    }

                    gameObject._gradient.color1 = gradientColor1;
                    gameObject._gradient.color2 = gradientColor2;
                }

            },
        });

        Object.defineProperty(gameObject, 'gradientColor1', {
            get: function () {
                return gradientColor1;
            },
            set: function (value) {
                if ((value === null) || (value === false)) {
                    gameObject.gradientColor = value;
                    return;
                }

                if (gradientColor1 === value) {
                    return;
                }

                gradientColor1 = value;

                if (gameObject._gradient) {
                    gameObject._gradient.color1 = gradientColor1;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientColor2', {
            get: function () {
                return gradientColor2;
            },
            set: function (value) {
                if ((value === null) || (value === false)) {
                    gameObject.gradientColor = value;
                    return;
                }

                if (gradientColor2 === value) {
                    return;
                }

                gradientColor2 = value;

                if (gameObject._gradient) {
                    gameObject._gradient.color2 = gradientColor2;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientAlpha', {
            get: function () {
                return gradientAlpha;
            },
            set: function (value) {
                if (gradientAlpha === value) {
                    return;
                }

                gradientAlpha = value;

                if (gameObject._gradient) {
                    gameObject._gradient.alpha = gradientAlpha;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientFromX', {
            get: function () {
                return gradientFromX;
            },
            set: function (value) {
                if (gradientFromX === value) {
                    return;
                }

                gradientFromX = value;

                if (gameObject._gradient) {
                    gameObject._gradient.fromX = gradientFromX;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientFromY', {
            get: function () {
                return gradientFromY;
            },
            set: function (value) {
                if (gradientFromY === value) {
                    return;
                }

                gradientFromY = value;

                if (gameObject._gradient) {
                    gameObject._gradient.fromY = gradientFromY;
                }
            },
        });


        Object.defineProperty(gameObject, 'gradientToX', {
            get: function () {
                return gradientToX;
            },
            set: function (value) {
                if (gradientToX === value) {
                    return;
                }

                gradientToX = value;

                if (gameObject._gradient) {
                    gameObject._gradient.toX = gradientToX;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientToY', {
            get: function () {
                return gradientToY;
            },
            set: function (value) {
                if (gradientToY === value) {
                    return;
                }

                gradientToY = value;

                if (gameObject._gradient) {
                    gameObject._gradient.toY = gradientToY;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientSize', {
            get: function () {
                return gradientSize;
            },
            set: function (value) {
                if (gradientSize === value) {
                    return;
                }

                gradientSize = value;

                if (gameObject._gradient) {
                    gameObject._gradient.size = gradientSize;
                }
            },
        });

        gameObject.gradientColor = null;

        AddClearEffectCallback(gameObject, 'gradientColor');

        return gameObject;
    };

    var AddGrayscaleProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'grayscale', 1);
        return gameObject;
    };

    var AddHueProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'hue', 1);
        return gameObject;
    };

    var AddKodachromeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'kodachrome');
        return gameObject;
    };

    var AddLSDProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'lsd');
        return gameObject;
    };

    var AddNegativeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'negative');
        return gameObject;
    };

    var AddPixelateProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'pixelate')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var pixelate;
        Object.defineProperty(gameObject, 'pixelate', {
            get: function () {
                return pixelate;
            },
            set: function (value) {
                if (pixelate === value) {
                    return;
                }

                pixelate = value;

                if ((pixelate === null) || (pixelate === false)) {
                    if (gameObject._pixelateEffect) {
                        fxFactory.remove(gameObject._pixelateEffect);
                        gameObject._pixelateEffect = undefined;
                    }
                } else {
                    if (!gameObject._pixelateEffect) {
                        gameObject._pixelateEffect = fxFactory.addPixelate();
                    }
                    gameObject._pixelateEffect.amount = pixelate;
                }

            },
        });

        gameObject.pixelate = null;

        AddClearEffectCallback(gameObject, 'pixelate');

        return gameObject;
    };

    var AddPolaroidProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'polaroid');
        return gameObject;
    };

    var AddRevealProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'revealLeft')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var revealLeft,
            revealRight,
            revealUp,
            revealDown,
            revealWidth = 0.1;

        var ClearRevealFlags = function () {
            revealLeft = null;
            revealRight = null;
            revealUp = null;
            revealDown = null;
        };

        var RemoveEffect = function (gameObject) {
            if (gameObject._revealEffect) {
                fxFactory.remove(gameObject._revealEffect);
                gameObject._revealEffect = undefined;
            }
        };

        Object.defineProperty(gameObject, 'revealLeft', {
            get: function () {
                return revealLeft;
            },
            set: function (value) {
                if (revealLeft === value) {
                    return;
                }

                ClearRevealFlags();

                revealLeft = value;

                if ((revealLeft === null) || (revealLeft === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }

                    gameObject._revealEffect.direction = 1;
                    gameObject._revealEffect.axis = 0;
                    gameObject._revealEffect.progress = revealLeft;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealRight', {
            get: function () {
                return revealRight;
            },
            set: function (value) {
                if (revealRight === value) {
                    return;
                }

                ClearRevealFlags();

                revealRight = value;

                if ((revealRight === null) || (revealRight === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }
                    gameObject._revealEffect.direction = 0;
                    gameObject._revealEffect.axis = 0;
                    gameObject._revealEffect.progress = revealRight;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealUp', {
            get: function () {
                return revealUp;
            },
            set: function (value) {
                if (revealUp === value) {
                    return;
                }

                ClearRevealFlags();

                revealUp = value;

                if ((revealUp === null) || (revealUp === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }
                    gameObject._revealEffect.direction = 1;
                    gameObject._revealEffect.axis = 1;
                    gameObject._revealEffect.progress = revealUp;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealDown', {
            get: function () {
                return revealDown;
            },
            set: function (value) {
                if (revealDown === value) {
                    return;
                }

                ClearRevealFlags();

                revealDown = value;

                if ((revealDown === null) || (revealDown === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }
                    gameObject._revealEffect.direction = 0;
                    gameObject._revealEffect.axis = 1;
                    gameObject._revealEffect.progress = revealDown;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealWidth', {
            get: function () {
                return revealWidth;
            },
            set: function (value) {
                if (revealWidth === value) {
                    return;
                }

                revealWidth = value;

                if (gameObject._revealEffect) {
                    gameObject._revealEffect.wipeWidth = revealWidth;
                }
            },
        });

        gameObject.revealLeft = null;

        AddClearEffectCallback(gameObject, 'revealLeft');
        AddClearEffectCallback(gameObject, 'revealRight');
        AddClearEffectCallback(gameObject, 'revealUp');
        AddClearEffectCallback(gameObject, 'revealDown');

        return gameObject;
    };

    var AddSaturateProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'saturate', 1);
        return gameObject;
    };

    var AddSepiaProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'sepia');
        return gameObject;
    };

    var AddShadowProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'shadowColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var shadowColor,
            shadowX = 0,
            shadowY = 0,
            shadowDecay = 0.1,
            shadowPower = 1,
            shadowSamples = 6,
            shadowIntensity = 1;
        Object.defineProperty(gameObject, 'shadowColor', {
            get: function () {
                return shadowColor;
            },
            set: function (value) {
                if (shadowColor === value) {
                    return;
                }

                shadowColor = value;

                if ((shadowColor === null) || (shadowColor === false)) {
                    if (gameObject._shadow) {
                        fxFactory.remove(gameObject._shadow);
                        gameObject._shadow = undefined;
                    }
                } else {
                    if (!gameObject._shadow) {
                        gameObject._shadow = fxFactory.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
                    }

                    gameObject._shadow.color = shadowColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'shadowX', {
            get: function () {
                return shadowX;
            },
            set: function (value) {
                if (shadowX === value) {
                    return;
                }

                shadowX = value;

                if (gameObject._shadow) {
                    gameObject._shadow.x = shadowX;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowY', {
            get: function () {
                return shadowY;
            },
            set: function (value) {
                if (shadowY === value) {
                    return;
                }

                shadowY = value;

                if (gameObject._shadow) {
                    gameObject._shadow.y = shadowY;
                }
            },
        });

        Object.defineProperty(gameObject, 'decay', {
            get: function () {
                return shadowDecay;
            },
            set: function (value) {
                if (shadowDecay === value) {
                    return;
                }

                shadowDecay = value;

                if (gameObject._shadow) {
                    gameObject._shadow.decay = shadowDecay;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowPower', {
            get: function () {
                return shadowPower;
            },
            set: function (value) {
                if (shadowPower === value) {
                    return;
                }

                shadowPower = value;

                if (gameObject._shadow) {
                    gameObject._shadow.power = shadowPower;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowSamples', {
            get: function () {
                return shadowSamples;
            },
            set: function (value) {
                if (shadowSamples === value) {
                    return;
                }

                shadowSamples = value;

                if (gameObject._shadow) {
                    gameObject._shadow.samples = shadowSamples;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowIntensity', {
            get: function () {
                return shadowIntensity;
            },
            set: function (value) {
                if (shadowIntensity === value) {
                    return;
                }

                shadowIntensity = value;

                if (gameObject._shadow) {
                    gameObject._shadow.intensity = shadowIntensity;
                }
            },
        });

        gameObject.shadowColor = null;

        AddClearEffectCallback(gameObject, 'shadowColor');

        return gameObject;
    };

    var AddShiftToBGRProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'shiftToBGR');
        return gameObject;
    };

    var AddShineProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'shineSpeed')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var shineSpeed,
            shineLineWidth = 0.5,
            shineGradient = 3;
        Object.defineProperty(gameObject, 'shineSpeed', {
            get: function () {
                return shineSpeed;
            },
            set: function (value) {
                if (shineSpeed === value) {
                    return;
                }

                shineSpeed = value;

                if ((shineSpeed === null) || (shineSpeed === false)) {
                    if (gameObject._shine) {
                        fxFactory.remove(gameObject._shine);
                        gameObject._shine = undefined;
                    }
                } else {
                    if (!gameObject._shine) {
                        gameObject._shine = fxFactory.addShine(shineSpeed, shineLineWidth, shineGradient);
                    }

                    gameObject._shine.speed = shineSpeed;
                }

            },
        });

        Object.defineProperty(gameObject, 'shineLineWidth', {
            get: function () {
                return shineLineWidth;
            },
            set: function (value) {
                if (shineLineWidth === value) {
                    return;
                }

                shineLineWidth = value;

                if (gameObject._shine) {
                    gameObject._shine.lineWidth = shineLineWidth;
                }
            },
        });

        Object.defineProperty(gameObject, 'shineGradient', {
            get: function () {
                return shineGradient;
            },
            set: function (value) {
                if (shineGradient === value) {
                    return;
                }

                shineGradient = value;

                if (gameObject._shine) {
                    gameObject._shine.gradient = shineGradient;
                }
            },
        });

        gameObject.shineSpeed = null;

        AddClearEffectCallback(gameObject, 'shineSpeed');

        return gameObject;
    };

    var AddTechnicolorProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'technicolor');
        return gameObject;
    };

    var AddTiltShiftProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'tiltShiftRadius')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var tiltShiftRadius,
            tiltShiftAmount = 1,
            tiltShiftContrast = 0.2,
            tiltShiftBlurX = 1,
            tiltShiftBlurY = 1,
            tiltShiftStrength = 1;
        Object.defineProperty(gameObject, 'tiltShiftRadius', {
            get: function () {
                return tiltShiftRadius;
            },
            set: function (value) {
                if (tiltShiftRadius === value) {
                    return;
                }

                tiltShiftRadius = value;

                if ((tiltShiftRadius === null) || (tiltShiftRadius === false)) {
                    if (gameObject._tiltShift) {
                        fxFactory.remove(gameObject._tiltShift);
                        gameObject._tiltShift = undefined;
                    }
                } else {
                    if (!gameObject._tiltShift) {
                        gameObject._tiltShift = fxFactory.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
                    }

                    gameObject._tiltShift.radius = tiltShiftRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'tiltShiftAmount', {
            get: function () {
                return tiltShiftAmount;
            },
            set: function (value) {
                if (tiltShiftAmount === value) {
                    return;
                }

                tiltShiftAmount = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.amount = tiltShiftAmount;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftContrast', {
            get: function () {
                return tiltShiftContrast;
            },
            set: function (value) {
                if (tiltShiftContrast === value) {
                    return;
                }

                tiltShiftContrast = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.contrast = tiltShiftContrast;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftBlurX', {
            get: function () {
                return tiltShiftBlurX;
            },
            set: function (value) {
                if (tiltShiftBlurX === value) {
                    return;
                }

                tiltShiftBlurX = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.blurX = tiltShiftBlurX;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftBlurY', {
            get: function () {
                return tiltShiftBlurY;
            },
            set: function (value) {
                if (tiltShiftBlurY === value) {
                    return;
                }

                tiltShiftBlurY = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.blurY = tiltShiftBlurY;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftStrength', {
            get: function () {
                return tiltShiftStrength;
            },
            set: function (value) {
                if (tiltShiftStrength === value) {
                    return;
                }

                tiltShiftStrength = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.strength = tiltShiftStrength;
                }
            },
        });

        gameObject.tiltShiftRadius = null;

        AddClearEffectCallback(gameObject, 'tiltShiftRadius');

        return gameObject;
    };

    var AddVignetteProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'vignetteRadius')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var vignetteRadius,
            vignetteX = 0.5,
            vignetteY = 0.5,
            vignetteStrength = 0.5;
        Object.defineProperty(gameObject, 'vignetteRadius', {
            get: function () {
                return vignetteRadius;
            },
            set: function (value) {
                if (vignetteRadius === value) {
                    return;
                }

                vignetteRadius = value;

                if ((vignetteRadius === null) || (vignetteRadius === false)) {
                    if (gameObject._vignette) {
                        fxFactory.remove(gameObject._vignette);
                        gameObject._vignette = undefined;
                    }
                } else {
                    if (!gameObject._vignette) {
                        gameObject._vignette = fxFactory.addVignette(vignetteX, vignetteY, vignetteRadius, vignetteStrength);
                    }

                    gameObject._vignette.radius = vignetteRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'vignetteX', {
            get: function () {
                return vignetteX;
            },
            set: function (value) {
                if (vignetteX === value) {
                    return;
                }

                vignetteX = value;

                if (gameObject._vignette) {
                    gameObject._vignette.x = vignetteX;
                }
            },
        });

        Object.defineProperty(gameObject, 'vignetteY', {
            get: function () {
                return vignetteY;
            },
            set: function (value) {
                if (vignetteY === value) {
                    return;
                }

                vignetteY = value;

                if (gameObject._vignette) {
                    gameObject._vignette.y = vignetteY;
                }
            },
        });

        Object.defineProperty(gameObject, 'vignetteStrength', {
            get: function () {
                return vignetteStrength;
            },
            set: function (value) {
                if (vignetteStrength === value) {
                    return;
                }

                vignetteStrength = value;

                if (gameObject._vignette) {
                    gameObject._vignette.strength = vignetteStrength;
                }
            },
        });

        gameObject.vignetteRadius = null;

        AddClearEffectCallback(gameObject, 'vignetteRadius');

        return gameObject;
    };

    var AddVintagePinholeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'vintagePinhole');
        return gameObject;
    };

    var AddWipeProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'wipeLeft')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var wipeLeft,
            wipeRight,
            wipeUp,
            wipeDown,
            wipeWidth = 0.1;

        var ClearWipeFlags = function () {
            wipeLeft = null;
            wipeRight = null;
            wipeUp = null;
            wipeDown = null;
        };

        var RemoveEffect = function (gameObject) {
            if (gameObject._wipeEffect) {
                fxFactory.remove(gameObject._wipeEffect);
                gameObject._wipeEffect = undefined;
            }
        };

        Object.defineProperty(gameObject, 'wipeLeft', {
            get: function () {
                return wipeLeft;
            },
            set: function (value) {
                if (wipeLeft === value) {
                    return;
                }

                ClearWipeFlags();

                wipeLeft = value;

                if ((wipeLeft === null) || (wipeLeft === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }

                    gameObject._wipeEffect.direction = 1;
                    gameObject._wipeEffect.axis = 0;
                    gameObject._wipeEffect.progress = wipeLeft;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeRight', {
            get: function () {
                return wipeRight;
            },
            set: function (value) {
                if (wipeRight === value) {
                    return;
                }

                ClearWipeFlags();

                wipeRight = value;

                if ((wipeRight === null) || (wipeRight === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }
                    gameObject._wipeEffect.direction = 0;
                    gameObject._wipeEffect.axis = 0;
                    gameObject._wipeEffect.progress = wipeRight;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeUp', {
            get: function () {
                return wipeUp;
            },
            set: function (value) {
                if (wipeUp === value) {
                    return;
                }

                ClearWipeFlags();

                wipeUp = value;

                if ((wipeUp === null) || (wipeUp === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }
                    gameObject._wipeEffect.direction = 1;
                    gameObject._wipeEffect.axis = 1;
                    gameObject._wipeEffect.progress = wipeUp;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeDown', {
            get: function () {
                return wipeDown;
            },
            set: function (value) {
                if (wipeDown === value) {
                    return;
                }

                ClearWipeFlags();

                wipeDown = value;

                if ((wipeDown === null) || (wipeDown === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }
                    gameObject._wipeEffect.direction = 0;
                    gameObject._wipeEffect.axis = 1;
                    gameObject._wipeEffect.progress = wipeDown;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeWidth', {
            get: function () {
                return wipeWidth;
            },
            set: function (value) {
                if (wipeWidth === value) {
                    return;
                }

                wipeWidth = value;

                if (gameObject._wipeEffect) {
                    gameObject._wipeEffect.wipeWidth = wipeWidth;
                }
            },
        });

        gameObject.wipeLeft = null;

        AddClearEffectCallback(gameObject, 'wipeLeft');
        AddClearEffectCallback(gameObject, 'wipeRight');
        AddClearEffectCallback(gameObject, 'wipeUp');
        AddClearEffectCallback(gameObject, 'wipeDown');

        return gameObject;
    };

    const EffectMap = {
        barrel: AddBarrelProperties,
        blackWhite: AddBlackWhiteProperties,
        bloom: AddBloomProperties,
        blur: AddBlurProperties,
        bokeh: AddBokehProperties,
        brightness: AddBrightnessProperties,
        brown: AddBrownProperties,
        circle: AddCircleProperties,
        contrast: AddContrastProperties,
        desaturate: AddDesaturateProperties,
        desaturateLuminance: AddDesaturateLuminanceProperties,
        displacement: AddDisplacementProperties,
        glow: AddGlowProperties,
        gradient: AddGradientProperties,
        grayscale: AddGrayscaleProperties,
        hue: AddHueProperties,
        kodachrome: AddKodachromeProperties,
        lsd: AddLSDProperties,
        negative: AddNegativeProperties,
        pixelate: AddPixelateProperties,
        polaroid: AddPolaroidProperties,
        reveal: AddRevealProperties,
        saturate: AddSaturateProperties,
        sepia: AddSepiaProperties,
        shadow: AddShadowProperties,
        shiftToBGR: AddShiftToBGRProperties,
        shine: AddShineProperties,
        technicolor: AddTechnicolorProperties,
        tiltShift: AddTiltShiftProperties,
        vignette: AddVignetteProperties,
        vintagePinhole: AddVintagePinholeProperties,
        wipe: AddWipeProperties
    };

    var AddEffectProperties = function (gameObject, config) {
        if (config === undefined) {
            config = true;
        } else if (typeof (config) === 'string') {
            config = { config: true };
        } else if (Array.isArray(config)) {
            var nameList = config;
            var config = {};
            for (var i = 0, cnt = nameList.length; i < cnt; i++) {
                config[nameList[i]] = true;
            }
        }

        if (config === true) {
            // Enable all effect properties
            for (var name in EffectMap) {
                EffectMap[name](gameObject);
            }
        } else {
            for (var name in config) {
                if (config[name] && EffectMap[name]) {
                    EffectMap[name](gameObject);
                }
            }
        }

        return gameObject;
    };

    let Style$2 = class Style extends ComponentBase {
        constructor(gameObject, style) {
            super(gameObject);
            // this.parent = gameObject;

            return new Proxy(this, this);
        }

        get(target, prop) {
            if (HasProperty(target, prop)) {
                return target[prop];
            }

            var gameObject = target.parent;
            if (HasProperty(gameObject, prop)) {
                return gameObject[prop];
            }
        }

        set(target, prop, value) {
            if (HasProperty(target, prop)) {
                target[prop] = value;

            } else if (HasProperty(target.parent, prop)) {
                target.parent[prop] = value;
            }

            return true;
        }

        get key() {
            return this.parent.texture.key;
        }

        set key(value) {
            if (this.key === value) {
                return;
            }
            this.parent.setTexture(value, this.frame);
        }

        get frame() {
            return this.parent.frame.name;
        }

        set frame(value) {
            if (this.frame === value) {
                return;
            }
            this.parent.setFrame(value);
        }
    };

    const PhaserNineSlice = Phaser.GameObjects.NineSlice;
    const GetValue$k = Phaser.Utils.Objects.GetValue;

    class StatesNineSlice extends PhaserNineSlice {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            var x = GetValue$k(config, 'x', 0);
            var y = GetValue$k(config, 'y', 0);
            var key = GetValue$k(config, 'key', null);
            var frame = GetValue$k(config, 'frame', null);
            var width = GetValue$k(config, 'width', 0);
            var height = GetValue$k(config, 'height', 0);
            var leftWidth = GetValue$k(config, 'leftWidth', 0);
            var rightWidth = GetValue$k(config, 'rightWidth', 0);
            var topHeight = GetValue$k(config, 'topHeight', 0);
            var bottomHeight = GetValue$k(config, 'bottomHeight', 0);
            super(scene, x, y, key, frame, width, height, leftWidth, rightWidth, topHeight, bottomHeight);
            this.type = 'rexStatesNineSlice';

            var effectConfig = GetValue$k(config, 'effects', true);
            if (effectConfig) {
                AddEffectProperties(this, effectConfig);
            }

            this.style = new Style$2(this, config);

            config.style = this.style;
            this.addStyleManager(config);

            delete config.style;
        }
    }

    Object.assign(
        StatesNineSlice.prototype,
        HelperMethods
    );

    let Style$1 = class Style extends ComponentBase {
        constructor(gameObject, style) {
            super(gameObject);
            // this.parent = gameObject;

            return new Proxy(this, this);
        }

        get(target, prop) {
            if (HasProperty(target, prop)) {
                return target[prop];
            }

            var gameObject = target.parent;
            if (HasProperty(gameObject, prop)) {
                return gameObject[prop];
            }
        }

        set(target, prop, value) {
            if (HasProperty(target, prop)) {
                target[prop] = value;

            } else if (HasProperty(target.parent, prop)) {
                target.parent[prop] = value;
            }

            return true;
        }

        get key() {
            return this.parent.texture.key;
        }

        set key(value) {
            this.parent.setTexture(value, this.frame);
        }

        get frame() {
            return this.parent.frame.name;
        }

        set frame(value) {
            this.parent.setFrame(value);
        }

        get scale() {
            return this.parent.scaleX;
        }

        set scale(value) {
            this.parent.setScale(value);
        }
    };

    const PhaserImage = Phaser.GameObjects.Image;
    const GetValue$j = Phaser.Utils.Objects.GetValue;

    class StatesImage extends PhaserImage {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            var x = GetValue$j(config, 'x', 0);
            var y = GetValue$j(config, 'y', 0);
            var key = GetValue$j(config, 'key', '');
            var frame = GetValue$j(config, 'frame', undefined);
            super(scene, x, y, key, frame);
            this.type = 'rexStatesImage';

            var effectConfig = GetValue$j(config, 'effects', true);
            if (effectConfig) {
                AddEffectProperties(this, effectConfig);
            }

            this.style = new Style$1(this, config);

            config.style = this.style;
            this.addStyleManager(config);

            delete config.style;
        }
    }

    Object.assign(
        StatesImage.prototype,
        HelperMethods
    );

    var SetGetFrameNameCallback = function(callback) {
        if (callback === undefined) {
            callback = DefaultGetFrameNameCallback;
        }
        this.getFrameNameCallback = callback;
        return this;
    };

    var DefaultGetFrameNameCallback = function (colIndex, rowIndex, baseFrameName) {
        if (baseFrameName === '__BASE') {
            return `${colIndex},${rowIndex}`;
        } else {
            return `${baseFrameName}:${colIndex},${rowIndex}`;
        }
    };

    var SetBaseTexture = function (key, baseFrameName, columns, rows) {
        if (Array.isArray(baseFrameName)) {
            rows = columns;
            columns = baseFrameName;
            baseFrameName = undefined;
        }

        if (baseFrameName == null) {
            baseFrameName = '__BASE';
        }

        if ((typeof (columns) === 'number') && (arguments.length >= 6)) {
            columns = [arguments[2], undefined, arguments[3]];
            rows = [arguments[4], undefined, arguments[5]];
        } else if (
            (columns === undefined) &&
            (rows === undefined) &&
            (this.columns.data !== undefined) &&
            (this.rows.data !== undefined)
        ) {
            columns = this.columns.data;
            rows = this.rows.data;
        } else {
            columns = DeepClone(columns);
            rows = DeepClone(rows);
        }

        this.textureKey = key;
        this.baseFrameName = baseFrameName;
        this.columns.data = columns;
        this.columns.count = (columns) ? columns.length : 0;
        this.columns.stretch = 0;
        this.columns.minWidth = 0;
        this.columns.scale = 1;
        this.rows.data = rows;
        this.rows.count = (rows) ? rows.length : 0;
        this.rows.stretch = 0;
        this.rows.minHeight = 0;
        this.rows.scale = 1;

        var texture = this.scene.sys.textures.get(key);
        if (!texture) {
            this.clear();
            return this;
        }
        if (!columns || !rows) {
            this.clear();
            return this;
        }

        // Get remainder width/height for unknown width/height
        var baseFrame = texture.get(baseFrameName);
        var remainderTextureWidth = baseFrame.width;
        var unknownColumnWidthCount = 0;
        for (var i = 0, cnt = columns.length; i < cnt; i++) {
            if (columns[i] === undefined) {
                unknownColumnWidthCount++;
            } else if (typeof (columns[i]) === 'number') {
                remainderTextureWidth -= columns[i];
            } else {
                remainderTextureWidth -= columns[i].width;
            }
        }
        var unknownColumnWidth = (unknownColumnWidthCount > 0) ? (remainderTextureWidth / unknownColumnWidthCount) : 0;

        var remainderTextureHeight = baseFrame.height;
        var unknownRowHeightCount = 0;
        for (var i = 0, cnt = rows.length; i < cnt; i++) {
            if (rows[i] === undefined) {
                unknownRowHeightCount++;
            } else if (typeof (rows[i]) === 'number') {
                remainderTextureHeight -= rows[i];
            } else {
                remainderTextureHeight -= rows[i].width;
            }
        }
        var unknownRowHeight = (unknownRowHeightCount) ? (remainderTextureHeight / unknownRowHeightCount) : 0;

        var row, col, rowHeight, colWidth, frameName;
        var offsetX = 0, offsetY = 0;
        for (var j = 0, jcnt = rows.length; j < jcnt; j++) {
            // Unknown height
            if (rows[j] === undefined) {
                rows[j] = unknownRowHeight;
            }

            if (typeof (rows[j]) === 'number') {
                rows[j] = {
                    height: rows[j],
                    stretch: (j % 2),
                };
            }

            row = rows[j];
            rowHeight = row.height;

            this.rows.stretch += (row.stretch | 0);
            this.rows.minHeight += (row.stretch > 0) ? 0 : rowHeight;

            offsetX = 0;
            for (var i = 0, icnt = columns.length; i < icnt; i++) {
                // Unknown width
                if (columns[i] === undefined) {
                    columns[i] = unknownColumnWidth;
                }

                if (typeof (columns[i]) === 'number') {
                    columns[i] = {
                        width: columns[i],
                        stretch: (i % 2),
                    };
                }

                col = columns[i];
                colWidth = col.width;

                if (j === 0) {
                    this.columns.stretch += (col.stretch | 0);
                    this.columns.minWidth += (col.stretch > 0) ? 0 : colWidth;
                }

                if ((colWidth >= 1) && (rowHeight >= 1)) {
                    frameName = this.getFrameNameCallback(i, j, baseFrameName);
                    var frameNameType = typeof (frameName);
                    if ((frameNameType === 'string') || (frameNameType === 'number')) {
                        texture.add(
                            frameName, 0,
                            (offsetX + baseFrame.cutX), (offsetY + baseFrame.cutY),
                            colWidth, rowHeight
                        );
                        // Do nothing if frameName is existed
                    }
                }
                offsetX += colWidth;
            }
            offsetY += rowHeight;
        }

        this.updateTexture();
        return this;
    };

    var UpdateTexture = function () {
        this.clear();

        if (this.textureKey === undefined) {
            return this;
        }
        var texture = this.scene.sys.textures.get(this.textureKey);
        if (!texture) {
            return this;
        }

        var minWidth = this.columns.minWidth * this.maxFixedPartScaleX;  // Fixed-part width
        var minHeight = this.rows.minHeight * this.maxFixedPartScaleY;   // Fixed-part height
        var stretchWidth = this.width - minWidth;
        var stretchHeight = this.height - minHeight;
        var fixedPartScaleX = (stretchWidth >= 0) ? this.maxFixedPartScaleX : (this.width / minWidth);
        var fixedPartScaleY = (stretchHeight >= 0) ? this.maxFixedPartScaleY : (this.height / minHeight);

        if (this.preserveRatio) {
            var minScale = Math.min(fixedPartScaleX, fixedPartScaleY);
            if (fixedPartScaleX > minScale) {
                var compensationWidth = (fixedPartScaleX - minScale) * minWidth;
                if (stretchWidth >= 0) {
                    stretchWidth += compensationWidth;
                } else {
                    stretchWidth = compensationWidth;
                }
                fixedPartScaleX = minScale;
            }
            if (fixedPartScaleY > minScale) {
                var compensationHeight = (fixedPartScaleY - minScale) * minHeight;
                if (stretchHeight >= 0) {
                    stretchHeight += compensationHeight;
                } else {
                    stretchHeight = compensationHeight;
                }
                fixedPartScaleY = minScale;
            }
        }
        this.columns.scale = fixedPartScaleX;
        this.rows.scale = fixedPartScaleY;

        var proportionWidth;
        if (stretchWidth > 0) {
            proportionWidth = (this.columns.stretch > 0) ? (stretchWidth / this.columns.stretch) : 0;
        } else {
            proportionWidth = 0;
        }

        var proportionHeight;
        if (stretchHeight > 0) {
            proportionHeight = (this.rows.stretch > 0) ? (stretchHeight / this.rows.stretch) : 0;
        } else {
            proportionHeight = 0;
        }

        var frameName, col, row, colWidth, rowHeight;
        var offsetX = 0, offsetY = 0;
        var imageType;

        this._beginDraw();
        for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
            row = this.rows.data[j];
            rowHeight = (row.stretch === 0) ? (row.height * fixedPartScaleY) : (proportionHeight * row.stretch);

            offsetX = 0;
            for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
                col = this.columns.data[i];
                colWidth = (col.stretch === 0) ? (col.width * fixedPartScaleX) : (proportionWidth * col.stretch);

                frameName = this.getFrameNameCallback(i, j, this.baseFrameName);
                if (texture.has(frameName) && (colWidth > 0) && (rowHeight > 0)) {
                    if ((row.stretch === 0) && (col.stretch === 0)) { // Fixed parts
                        imageType = 0; // Draw image
                    } else { // Stretchable parts
                        if (this.getStretchMode(i, j) === 0) { // Scaled image
                            imageType = 0; // Draw scaled image
                        } else { // Repeat tile-sprite
                            imageType = 1; // Draw tile-sprite
                        }
                    }

                    if (imageType === 0) {
                        this._drawImage(
                            this.textureKey, frameName,
                            offsetX, offsetY,
                            colWidth, rowHeight
                        );
                    } else {
                        this._drawTileSprite(
                            this.textureKey, frameName,
                            offsetX, offsetY,
                            colWidth, rowHeight
                        );
                    }
                }

                offsetX += colWidth;
            }

            offsetY += rowHeight;
        }
        this._endDraw();
    };

    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$i = Phaser.Utils.Objects.GetValue;

    var SetStretchMode = function(mode) {
        if (IsPlainObject$3(mode)) {
            this.stretchMode.edge = parseMode(GetValue$i(mode, 'edge', 0));
            this.stretchMode.internal = parseMode(GetValue$i(mode, 'internal', 0));
        } else {
            mode = parseMode(mode);
            this.stretchMode.edge = mode;
            this.stretchMode.internal = mode;
        }
        return this;
    };

    var parseMode = function (mode) {
        if (typeof (mode) === 'string') {
            mode = EXTENDMODE[mode];
        }
        return mode;
    };

    const EXTENDMODE = {
        scale: 0,
        repeat: 1,
    };

    var IsEdge = function (colIndex, rowIndex) {
        return (colIndex === 0) || (colIndex === (this.columns.count - 1)) ||
            (rowIndex === 0) || (rowIndex === (this.rows.count - 1));
    };

    var GetStretchMode = function(colIndex, rowIndex) {
        return (IsEdge.call(this, colIndex, rowIndex)) ? this.stretchMode.edge : this.stretchMode.internal;
    };

    var SetPreserveRatio = function (enable) {
        if (enable == undefined) {
            enable = true;
        }

        this.preserveRatio = enable;
        return this;
    };

    var SetMaxFixedPartScale = function (scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }

        this.maxFixedPartScaleX = scaleX;
        this.maxFixedPartScaleY = scaleY;
        return this;
    };

    var Methods$3 = {
        _beginDraw: NOOP,
        _drawImage: NOOP,
        _drawTileSprite: NOOP,
        _endDraw: NOOP,

        setGetFrameNameCallback: SetGetFrameNameCallback,
        setBaseTexture: SetBaseTexture,
        updateTexture: UpdateTexture,
        setStretchMode: SetStretchMode,
        getStretchMode: GetStretchMode,
        setPreserveRatio: SetPreserveRatio,
        setMaxFixedPartScale: SetMaxFixedPartScale,
    };

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$h = Phaser.Utils.Objects.GetValue;

    var NinePatchBase = function (GOClass, type) {
        class NinePatch extends GOClass {
            constructor(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
                if (IsPlainObject$2(x)) {
                    config = x;
                    x = GetValue$h(config, 'x', 0);
                    y = GetValue$h(config, 'y', 0);
                    width = GetValue$h(config, 'width', 1);
                    height = GetValue$h(config, 'height', 1);
                    key = GetValue$h(config, 'key', undefined);
                    baseFrame = GetValue$h(config, 'baseFrame', undefined);
                    columns = GetValue$h(config, 'columns', undefined);
                    rows = GetValue$h(config, 'rows', undefined);
                } else if (IsPlainObject$2(width)) {
                    config = width;
                    width = GetValue$h(config, 'width', 1);
                    height = GetValue$h(config, 'height', 1);
                    key = GetValue$h(config, 'key', undefined);
                    baseFrame = GetValue$h(config, 'baseFrame', undefined);
                    columns = GetValue$h(config, 'columns', undefined);
                    rows = GetValue$h(config, 'rows', undefined);
                } else if (IsPlainObject$2(key)) {
                    config = key;
                    key = GetValue$h(config, 'key', undefined);
                    baseFrame = GetValue$h(config, 'baseFrame', undefined);
                    columns = GetValue$h(config, 'columns', undefined);
                    rows = GetValue$h(config, 'rows', undefined);
                } else if (IsPlainObject$2(baseFrame)) {
                    config = baseFrame;
                    baseFrame = GetValue$h(config, 'baseFrame', undefined);
                    columns = GetValue$h(config, 'columns', undefined);
                    rows = GetValue$h(config, 'rows', undefined);
                } else if (Array.isArray(baseFrame)) {
                    config = rows;
                    rows = columns;
                    columns = baseFrame;
                    baseFrame = GetValue$h(config, 'baseFrame', undefined);
                } else if (IsPlainObject$2(columns)) {
                    config = columns;
                    columns = GetValue$h(config, 'columns', undefined);
                    rows = GetValue$h(config, 'rows', undefined);
                }

                if (baseFrame === undefined) {
                    baseFrame = GetValue$h(config, 'frame', undefined);
                }

                if (columns === undefined) {
                    var leftWidth = GetValue$h(config, 'leftWidth', undefined);
                    var rightWidth = GetValue$h(config, 'rightWidth', undefined);
                    if ((leftWidth !== undefined) && (rightWidth !== undefined)) {
                        columns = [leftWidth, undefined, rightWidth];
                    }
                }

                if (rows === undefined) {
                    var topHeight = GetValue$h(config, 'topHeight', undefined);
                    var bottomHeight = GetValue$h(config, 'bottomHeight', undefined);
                    if ((topHeight !== undefined) && (bottomHeight !== undefined)) {
                        rows = [topHeight, undefined, bottomHeight];
                    }
                }

                super(scene);
                this.type = type;
                this
                    .setPosition(x, y)
                    .setSize(width, height)
                    .setOrigin(0.5, 0.5);

                this.columns = {};
                this.rows = {};
                this.stretchMode = {};
                this._tileSprite = undefined; // Reserved for drawing image
                this._image = undefined; // Reserved for drawing image

                this.setGetFrameNameCallback(GetValue$h(config, 'getFrameNameCallback', undefined));
                this.setStretchMode(GetValue$h(config, 'stretchMode', 0));
                this.setPreserveRatio(GetValue$h(config, 'preserveRatio', true));

                var maxFixedPartScale = GetValue$h(config, 'maxFixedPartScale', 1);
                var maxFixedPartScaleX = GetValue$h(config, 'maxFixedPartScaleX', maxFixedPartScale);
                var maxFixedPartScaleY = GetValue$h(config, 'maxFixedPartScaleY', undefined);
                this.setMaxFixedPartScale(maxFixedPartScaleX, maxFixedPartScaleY);

                this.setBaseTexture(key, baseFrame, columns, rows);
            }

            get minWidth() {
                return this.columns.minWidth;
            }

            get minHeight() {
                return this.rows.minHeight;
            }

            get fixedPartScaleX() {
                return this.columns.scale;
            }

            get fixedPartScaleY() {
                return this.rows.scale;
            }

            resize(width, height) {
                if ((this.width === width) && (this.height === height)) {
                    return this;
                }

                if (super.resize) {
                    super.resize(width, height);
                } else {
                    // Use setSize method for alternative 
                    super.setSize(width, height);
                }
                this.updateTexture();

                return this;
            }

            get leftWidth() {
                return this.columns.data[0];
            }

            get rightWidth() {
                return this.columns.data[this.columns.count - 1];
            }

            get topHeight() {
                return this.rows.data[0];
            }

            get bottomHeight() {
                return this.rows.data[this.rows.count - 1];
            }

        }

        Object.assign(
            NinePatch.prototype,
            Methods$3
        );

        return NinePatch;
    };

    const GameObjectClasses = Phaser.GameObjects;

    var GameObjects = undefined;

    var GetStampGameObject = function (gameObject, className) {
        if (!GameObjects) {
            GameObjects = {};

            GetGame(gameObject).events.once('destroy', function () {
                for (var name in GameObjects) {
                    GameObjects[name].destroy();
                }
                GameObjects = undefined;
            });
        }

        if (!GameObjects.hasOwnProperty(className)) {
            var scene = GetGame(gameObject).scene.systemScene;
            var gameObject = new GameObjectClasses[className](scene);
            gameObject.setOrigin(0);

            GameObjects[className] = gameObject;
        }

        return GameObjects[className];
    };

    var DrawImage = function (key, frame, x, y, width, height) {
        var gameObject = GetStampGameObject(this, 'Image')
            .setTexture(key, frame)
            .setDisplaySize(width, height);

        this.draw(gameObject, x, y);
    };

    var DrawTileSprite = function (key, frame, x, y, width, height) {
        var gameObject = GetStampGameObject(this, 'TileSprite')
            .setTexture(key, frame)
            .setSize(width, height);

        this.draw(gameObject, x, y);
    };

    const RenderTexture = Phaser.GameObjects.RenderTexture;

    class NinePatch extends NinePatchBase(RenderTexture, 'rexNinePatch') {
    }

    var Methods$2 = {
        _drawImage: DrawImage,
        _drawTileSprite: DrawTileSprite,
    };
    Object.assign(
        NinePatch.prototype,
        Methods$2
    );

    class Style extends ComponentBase {
        constructor(gameObject, style) {
            super(gameObject);
            // this.parent = gameObject;

            return new Proxy(this, this);
        }

        get(target, prop) {
            if (HasProperty(target, prop)) {
                return target[prop];
            }

            var gameObject = target.parent;
            if (HasProperty(gameObject, prop)) {
                return gameObject[prop];
            }
        }

        set(target, prop, value) {
            if (HasProperty(target, prop)) {
                target[prop] = value;

            } else if (HasProperty(target.parent, prop)) {
                target.parent[prop] = value;
            }

            return true;
        }

        get key() {
            return this.parent.textureKey;
        }

        set key(value) {
            if (this.key === value) {
                return;
            }
            this.parent.setBaseTexture(value, this.baseFrameName);
        }

        get frame() {
            return this.parent.baseFrameName;
        }

        set frame(value) {
            if (this.frame === value) {
                return;
            }
            this.parent.setBaseTexture(this.parent.textureKey, value);
        }
    }

    const GetValue$g = Phaser.Utils.Objects.GetValue;

    class StatesNinePatch extends NinePatch {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }
           
            super(scene, config);
            this.type = 'rexStatesNinePatch';

            var effectConfig = GetValue$g(config, 'effects', true);
            if (effectConfig) {
                AddEffectProperties(this, effectConfig);
            }

            this.style = new Style(this, config);

            config.style = this.style;
            this.addStyleManager(config);

            delete config.style;
        }
    }

    Object.assign(
        StatesNinePatch.prototype,
        HelperMethods
    );

    const Properties = [
        'alpha', 'tint', 'flipX', 'flipY'
    ];

    var DecorateGameObject = function (gameObject, config) {
        if (!config) {
            return gameObject;
        }

        for (var i = 0, cnt = Properties.length; i < cnt; i++) {
            var propertyName = Properties[i];
            if ((propertyName in config) && (propertyName in gameObject)) {
                gameObject[propertyName] = config[propertyName];
            }
        }

        if (('origin' in config) && ('originX' in gameObject)) {
            gameObject.setOrigin(config.origin);
        } else {
            var originX, originY;
            if (('originX' in config) && ('originX' in gameObject)) {
                originX = config.originX;
            }
            if (('originY' in config) && ('originY' in gameObject)) {
                originY = config.originY;
            }
            if ((originX !== undefined) && (originY !== undefined)) {
                gameObject.setOrigin(originX, originY);
            }
        }

        return gameObject;
    };

    var CreateBackground = function (scene, config) {
        var gameObjectType;
        if (config) {
            if (config.hasOwnProperty('$type')) {
                gameObjectType = config.$type;
            } else {
                if (config.hasOwnProperty('barColor')) {
                    gameObjectType = 'bar';
                } else if (config.hasOwnProperty('leftWidth')) {
                    gameObjectType = 'nineSlice';
                } else if (config.hasOwnProperty('key')) {
                    gameObjectType = 'image';
                }
            }
        }

        var gameObject;
        switch (gameObjectType) {
            case 'bar':
                gameObject = new StatesBarRectangle(scene, config);
                break;

            case 'image':
                gameObject = new StatesImage(scene, config);
                break;

            case 'nineSlice':
                if (!config.hasOwnProperty('stretchMode')) {
                    gameObject = new StatesNineSlice(scene, config);
                } else {
                    gameObject = new StatesNinePatch(scene, config);
                }
                break;

            default:
                gameObject = new StatesRoundRectangle(scene, config);
                break;
        }

        DecorateGameObject(gameObject, config);
        scene.add.existing(gameObject);
        return gameObject;
    };

    const Percent = Phaser.Math.Percent;

    var PositionToPercent = function (startPoint, endPoint, currentPoint) {
        var value;
        if (startPoint.y === endPoint.y) {
            value = Percent(currentPoint.x, startPoint.x, endPoint.x);
        } else if (startPoint.x === endPoint.x) {
            value = Percent(currentPoint.y, startPoint.y, endPoint.y);
        }
        return value
    };

    var OnDragThumb = function (pointer, dragX, dragY) {
        if (!this.enable) {
            return;
        }
        tmpPoint$4.x = dragX;
        tmpPoint$4.y = dragY;

        var startPoint, endPoint;
        if (!this.reverseAxis) {
            startPoint = this.getStartPoint();
            endPoint = this.getEndPoint();
        } else {
            startPoint = this.getEndPoint();
            endPoint = this.getStartPoint();
        }
        this.value = PositionToPercent(startPoint, endPoint, tmpPoint$4);
    };
    var tmpPoint$4 = {};

    var OnTouchTrack = function (pointer, localX, localY) {
        if (!this.enable) {
            return;
        }
        if (!pointer.isDown) {
            return;
        }

        tmpPoint$3.x = pointer.worldX;
        tmpPoint$3.y = pointer.worldY;

        var startPoint, endPoint;
        if (!this.reverseAxis) {
            startPoint = this.getStartPoint();
            endPoint = this.getEndPoint();
        } else {
            startPoint = this.getEndPoint();
            endPoint = this.getStartPoint();
        }
        var value = PositionToPercent(startPoint, endPoint, tmpPoint$3);

        this.stopEaseValue();
        if ((this.easeValueDuration === 0) || (Math.abs(this.value - value) < 0.1)) {
            this.value = value;
        } else {
            this.easeValueTo(value);
        }
    };
    var tmpPoint$3 = {};

    var GetThumbAlignPoint = function (align, out) {
        if (out === undefined) {
            out = tmpPoint$2;
        }
        var thumb = this.childrenMap.thumb;
        var currentX = thumb.x;
        var currentY = thumb.y;

        AlignIn(thumb, this.innerLeft, this.innerTop, this.innerWidth, this.innerHeight, align);
        out.x = thumb.x;
        out.y = thumb.y;

        thumb.x = currentX;
        thumb.y = currentY;

        return out;
    };

    var tmpPoint$2 = {};

    const AlignLeft$1 = Phaser.Display.Align.LEFT_CENTER;
    const AlignTop$1 = Phaser.Display.Align.TOP_CENTER;

    var GetStartPoint = function (out) {
        if (out === undefined) {
            out = tmpPoint$1;
        }
        if (this.childrenMap.thumb) {
            var align = (this.orientation === 0) ? AlignLeft$1 : AlignTop$1;
            GetThumbAlignPoint.call(this, align, out);
        } else {
            if (this.orientation === 0) {
                out.x = this.innerLeft + 1; // Add 1 pixel margin
                out.y = this.centerY;
            } else {
                out.x = this.centerX;
                out.y = this.innerTop + 1; // Add 1 pixel margin
            }
        }
        return out;
    };

    var tmpPoint$1 = {};

    const AlignRight$1 = Phaser.Display.Align.RIGHT_CENTER;
    const AlignBottom$1 = Phaser.Display.Align.BOTTOM_CENTER;

    var GetEndoint = function (out) {
        if (out === undefined) {
            out = tmpPoint;
        }
        if (this.childrenMap.thumb) {
            var align = (this.orientation === 0) ? AlignRight$1 : AlignBottom$1;
            GetThumbAlignPoint.call(this, align, out);
        } else {
            if (this.orientation === 0) {
                out.x = this.innerRight - 1; // Add 1 pixel margin
                out.y = this.centerY;
            } else {
                out.x = this.centerX;
                out.y = this.innerBottom - 1; // Add 1 pixel margin
            }
        }
        return out;
    };

    var tmpPoint = {};

    const Linear = Phaser.Math.Linear;

    var PercentToPosition = function (t, startPoint, endPoint, out) {
        if (out === undefined) {
            out = tmpOut;
        }
        out.x = Linear(startPoint.x, endPoint.x, t);
        out.y = Linear(startPoint.y, endPoint.y, t);
        return out;
    };
    var tmpOut = {};

    var UpdateThumb = function (t) {
        var thumb = this.childrenMap.thumb;
        if (thumb === undefined) {
            return this;
        }

        if (t === undefined) {
            t = this.value;
        }

        var startPoint, endPoint;
        if (!this.reverseAxis) {
            startPoint = this.getStartPoint();
            endPoint = this.getEndPoint();
        } else {
            startPoint = this.getEndPoint();
            endPoint = this.getStartPoint();
        }
        PercentToPosition(t, startPoint, endPoint, thumb);
        thumb.x += this.thumbOffsetX;
        thumb.y += this.thumbOffsetY;
        this.resetChildPositionState(thumb);
        return this;
    };

    const AlignLeft = Phaser.Display.Align.LEFT_CENTER;
    const AlignTop = Phaser.Display.Align.TOP_CENTER;
    const AlignRight = Phaser.Display.Align.RIGHT_CENTER;
    const AlignBottom = Phaser.Display.Align.BOTTOM_CENTER;

    var UpdateIndicator = function (t) {
        var indicator = this.childrenMap.indicator;
        if (indicator === undefined) {
            return this;
        }

        if (t === undefined) {
            t = this.value;
        }

        var reverseAxis = this.reverseAxis;
        var newWidth, newHeight;
        var thumb = this.childrenMap.thumb;
        if (thumb) {
            if (this.orientation === 0) { // x, extend width
                var thumbWidth = GetDisplayWidth(thumb);

                if (!reverseAxis) {
                    var thumbLeft = thumb.x - (thumbWidth * thumb.originX);
                    var thumbRight = thumbLeft + thumbWidth;
                    newWidth = thumbRight - this.left;
                } else {
                    var thumbLeft = thumb.x - (thumbWidth * thumb.originX);
                    newWidth = this.right - thumbLeft;
                }
            } else { // y, extend height
                var thumbHeight = GetDisplayHeight(thumb);

                if (!reverseAxis) {
                    var thumbTop = thumb.y - (thumbHeight * thumb.originY);
                    var thumbBottom = thumbTop + thumbHeight;
                    newHeight = thumbBottom - this.top;
                } else {
                    var thumbTop = thumb.y - (thumbHeight * thumb.originY);
                    newHeight = this.bottom - thumbTop;
                }
            }
        } else {
            if (this.orientation === 0) { // x, extend width
                newWidth = this.width * t;
            } else { // y, extend eight
                newHeight = this.height * t;
            }
        }
        ResizeGameObject(indicator, newWidth, newHeight);

        var align;
        if (!reverseAxis) {
            align = (this.orientation === 0) ? AlignLeft : AlignTop;
        } else {
            align = (this.orientation === 0) ? AlignRight : AlignBottom;
        }
        QuickSet(indicator, this, align);

        this.resetChildPositionState(indicator);
    };

    const GetValue$f = Phaser.Utils.Objects.GetValue;
    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const Clamp$2 = Phaser.Math.Clamp;
    const SnapTo = Phaser.Math.Snap.To;

    class Slider extends ProgressBase(Sizer) {
        constructor(scene, config) {
            // Create sizer
            super(scene, config);
            this.type = 'rexSlider';

            this.bootProgressBase(config);

            this.reverseAxis = GetValue$f(config, 'reverseAxis', false);

            // Add elements
            var background = GetValue$f(config, 'background', undefined);
            var track = GetValue$f(config, 'track', undefined);
            var indicator = GetValue$f(config, 'indicator', undefined);
            var thumb = GetValue$f(config, 'thumb', undefined);

            if (background) {
                if (IsPlainObject$1(background)) {
                    background = CreateBackground(scene, background);
                }
                this.addBackground(background);
            }

            if (track) {
                if (IsPlainObject$1(track)) {
                    track = CreateBackground(scene, track);
                }
                this.add(track,
                    {
                        proportion: 1,
                        expand: true,
                        minWidth: ((this.orientation === 0) ? 0 : undefined),
                        minHeight: ((this.orientation === 1) ? 0 : undefined)
                    }
                );
            }

            if (indicator) {
                if (IsPlainObject$1(indicator)) {
                    indicator = CreateBackground(scene, indicator);
                }
                this.pin(indicator); // Put into container but not layout it
            }

            if (thumb) {
                if (IsPlainObject$1(thumb)) {
                    thumb = CreateBackground(scene, thumb);
                }
                this.pin(thumb); // Put into container but not layout it

                var thumbOffsetX = GetValue$f(config, 'thumbOffsetX', 0);
                var thumbOffsetY = GetValue$f(config, 'thumbOffsetY', 0);
                this.setThumbOffset(thumbOffsetX, thumbOffsetY);
            }

            // Input
            var inputMode = GetValue$f(config, 'input', 0);
            if (typeof (inputMode) === 'string') {
                inputMode = INPUTMODE[inputMode];
            }
            switch (inputMode) {
                case 0: // 'drag'
                    if (thumb) {
                        thumb.setInteractive();
                        this.scene.input.setDraggable(thumb);
                        thumb
                            .on('drag', OnDragThumb, this)
                            .on('dragstart', function (pointer) {
                                this.eventEmitter.emit('inputstart', pointer);
                            }, this)
                            .on('dragend', function (pointer) {
                                this.eventEmitter.emit('inputend', pointer);
                            }, this);

                    }
                    break;
                case 1: // 'click'
                    this
                        .on('pointerdown', OnTouchTrack, this)
                        .on('pointermove', OnTouchTrack, this)
                        .on('pointerdown', function (pointer) {
                            this.eventEmitter.emit('inputstart', pointer);
                        }, this)
                        .on('pointerup', function (pointer) {
                            this.eventEmitter.emit('inputend', pointer);
                        }, this)
                        .on('pointerover', function (pointer) {
                            if (pointer.isDown) {
                                this.eventEmitter.emit('inputstart', pointer);
                            }
                        }, this)
                        .on('pointerout', function (pointer) {
                            if (pointer.isDown) {
                                this.eventEmitter.emit('inputend', pointer);
                            }
                        }, this)
                        .setInteractive();

                    break;
            }

            this.addChildrenMap('background', background);
            this.addChildrenMap('track', track);
            this.addChildrenMap('indicator', indicator);
            this.addChildrenMap('thumb', thumb);

            this.setEnable(GetValue$f(config, 'enable', undefined));

            var gap = GetValue$f(config, 'tick', undefined);
            if (gap === undefined) {
                gap = GetValue$f(config, 'gap', undefined);
            }
            this.setGap(gap);

            this.setValue(GetValue$f(config, 'value', 0), GetValue$f(config, 'min', undefined), GetValue$f(config, 'max', undefined));

        }

        setEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.enable = enable;
            return this;
        }

        setGap(gap, min, max) {
            if (gap && (min !== undefined)) {
                gap = gap / (max - min);
            }

            this.gap = gap;
            return this;
        }

        setTick(tick, min, max) {
            this.setGap(tick, min, max);
            return this;
        }

        get tick() {
            return this.gap;
        }

        set tick(value) {
            this.gap = value;
        }

        setThumbOffset(x, y) {
            this.thumbOffsetX = x;
            this.thumbOffsetY = y;
            return this;
        }

        // Override
        get value() {
            return this._value;
        }

        // Override
        set value(value) {
            if (this.gap !== undefined) {
                value = SnapTo(value, this.gap);
            }
            var oldValue = this._value;
            this._value = Clamp$2(value, 0, 1);

            if (oldValue !== this._value) {
                this.updateThumb(this._value);
                this.updateIndicator(this._value);
                this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
            }
        }

        postLayout(parent, newWidth, newHeight) {
            this.updateThumb();
            this.updateIndicator();
            super.postLayout(parent, newWidth, newHeight);
            return this;
        }
    }

    const INPUTMODE = {
        pan: 0,
        drag: 0,
        click: 1,
        none: -1,
    };

    var methods$2 = {
        getStartPoint: GetStartPoint,
        getEndPoint: GetEndoint,
        updateThumb: UpdateThumb,
        updateIndicator: UpdateIndicator,
    };

    Object.assign(
        Slider.prototype,
        methods$2,
    );

    const GetValue$e = Phaser.Utils.Objects.GetValue;

    class ScrollBar extends Sizer {
        constructor(scene, config) {
            // Create sizer
            super(scene, config);
            this.type = 'rexScrollBar';

            // Add elements
            var background = GetValue$e(config, 'background', undefined);

            var buttonsConfig = GetValue$e(config, 'buttons', undefined);
            var button0 = GetValue$e(buttonsConfig, 'top', GetValue$e(buttonsConfig, 'left', undefined));
            var button1 = GetValue$e(buttonsConfig, 'bottom', GetValue$e(buttonsConfig, 'right', undefined));

            var slider,
                sliderConfig = GetValue$e(config, 'slider', undefined);

            if (background) {
                this.addBackground(background);
            }

            if (button0) {
                this.add(button0);

                var inTouching = new InTouching(button0);
                inTouching
                    .on('intouch', function () {
                        if (!this.enable) {
                            return;
                        }
                        var step = (!slider.reverseAxis) ? -this.scrollStep : this.scrollStep;
                        this.value += step;
                    }, this);
            }

            if (sliderConfig) {
                sliderConfig.orientation = this.orientation;
                sliderConfig.eventEmitter = this;
                sliderConfig.value = null;

                var proportion;
                if (this.orientation === 0) {
                    var sliderWidth = GetValue$e(sliderConfig, 'width', undefined);
                    proportion = (sliderWidth === undefined) ? 1 : 0;
                } else {
                    var sliderHeight = GetValue$e(sliderConfig, 'height', undefined);
                    proportion = (sliderHeight === undefined) ? 1 : 0;
                }

                slider = new Slider(scene, sliderConfig);
                scene.add.existing(slider);
                this.add(
                    slider,
                    {
                        proportion: proportion,
                    }
                );
            }

            if (button1) {
                this.add(button1);

                var inTouching = new InTouching(button1);
                inTouching
                    .on('intouch', function () {
                        if (!this.enable) {
                            return;
                        }
                        var step = (!slider.reverseAxis) ? this.scrollStep : -this.scrollStep;
                        this.value += step;
                    }, this);
            }

            var buttons = [button0, button1];

            this.addChildrenMap('background', background);
            this.addChildrenMap('slider', slider);
            this.addChildrenMap('buttons', buttons);

            var callback = GetValue$e(config, 'valuechangeCallback', null);
            if (callback !== null) {
                var scope = GetValue$e(config, 'valuechangeCallbackScope', undefined);
                this.on('valuechange', callback, scope);
            }
            this.setEnable(GetValue$e(config, 'enable', undefined));
            this.setValue(GetValue$e(config, 'value', 0));
            this.setScrollStep(GetValue$e(buttonsConfig, 'step', 0.01));
        }

        setScrollStep(value) {
            this.scrollStep = value;
            return this;
        }

        get enable() {
            if (this.childrenMap.slider) {
                return this.childrenMap.slider.enable;
            } else {
                return false;
            }
        }

        set enable(value) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.setEnable(value);
            }
        }

        setEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.enable = enable;
            return this;
        }

        get value() {
            if (this.childrenMap.slider) {
                return this.childrenMap.slider.value;
            } else {
                return 0;
            }
        }

        set value(value) {
            if (!this.childrenMap.slider) {
                return;
            }
            this.childrenMap.slider.value = value;
        }

        setValue(value, min, max) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.setValue(value, min, max);
            }
            return this;
        }

        addValue(inc, min, max) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.addValue(inc, min, max);
            }
            return this;
        }

        getValue(min, max) {
            if (this.childrenMap.slider) {
                return this.childrenMap.slider.getValue(min, max);
            } else {
                return 0;
            }
        }

        easeValueTo(value, min, max) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.easeValueTo(value, min, max);
            }
            return this;
        }

        stopEaseValue() {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.stopEaseValue();
            }
            return this;
        }

        setEaseValueDuration(duration) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.setEaseValueDuration(duration);
            }
            return this;
        }

        setEaseValueFunction(ease) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.setEaseValueFunction(ease);
            }
            return this;
        }

        setGap(gap, min, max) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.setGap(gap, min, max);
            }
            return this;
        }

        get gap() {
            if (this.childrenMap.slider) {
                return this.childrenMap.slider.gap;
            }
            return undefined;
        }

        set gap(value) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.gap = value;
            }
        }

        setTick(tick, min, max) {
            this.setGap(tick, min, max);
            return this;
        }

        get tick() {
            if (this.childrenMap.slider) {
                return this.childrenMap.slider.tick;
            }
            return undefined;
        }

        set tick(value) {
            if (this.childrenMap.slider) {
                this.childrenMap.slider.tick = value;
            }
        }

    }

    var CreateScrollbar = function (scene, config) {
        if (config === undefined) {
            config = {};
        }

        var sliderConfig = Clone(config);
        config = {
            slider: sliderConfig
        };

        // Move orientation parameter from sliderConfig to config
        config.orientation = sliderConfig.orientation;
        delete sliderConfig.orientation;

        // Move background parameter from sliderConfig to config
        config.background = sliderConfig.background;
        delete sliderConfig.background;

        // Move buttons parameter from sliderConfig to config
        config.buttons = sliderConfig.buttons;
        delete sliderConfig.buttons;

        config.value = null;  // Don't assign initial value (0)

        var scrollBar = new ScrollBar(scene, config);
        scene.add.existing(scrollBar);

        var slider = scrollBar.childrenMap.slider;
        scrollBar.addChildrenMap('track', slider.childrenMap.track);
        scrollBar.addChildrenMap('indicator', slider.childrenMap.indicator);
        scrollBar.addChildrenMap('thumb', slider.childrenMap.thumb);

        return scrollBar;
    };

    class State extends FSM {
        constructor(parent, config) {
            super(config);
            this.parent = parent;
            this.init();
        }

        init() {
            this.start('IDLE');
        }

        // IDLE -> DRAGBEGIN|DRAG
        next_IDLE() {
            var nextState,
                parent = this.parent,
                dragState = parent.dragState;
            if (dragState.isDown) {
                nextState = (parent.dragThreshold === 0) ? 'DRAG' : 'DRAGBEGIN';
            }
            return nextState;
        }
        update_IDLE(time, delta) {
            this.next();
        }
        // IDLE

        // DRAGBEGIN -> DRAG|IDLE
        next_DRAGBEGIN() {
            var nextState,
                parent = this.parent,
                dragState = parent.dragState;
            if (dragState.isDown) {
                nextState = (dragState.pointer.getDistance() >= parent.dragThreshold) ? 'DRAG' : 'DRAGBEGIN';
            } else { // dragState.isUp
                nextState = 'IDLE';
            }
            return nextState;
        }
        update_DRAGBEGIN(time, delta) {
            this.next();
        }
        // DRAGBEGIN

        // DRAG -> BACK|SLIDE|IDLE
        next_DRAG() {
            var nextState,
                parent = this.parent,
                dragState = parent.dragState;
            if (dragState.isUp) {
                if (parent.outOfBounds) {
                    nextState = 'BACK';
                } else if (parent.slidingEnable) {
                    nextState = 'SLIDE';
                } else {
                    nextState = 'IDLE';
                }
            }
            return nextState;
        }
        update_DRAG(time, delta) {
            var parent = this.parent,
                dragState = parent.dragState;
            if (dragState.justMoved) {
                parent.dragging();
            }
            this.next();
        }
        enter_DRAG() {
            this.parent.onDragStart();
        }
        exit_DRAG() {
            this.parent.onDragEnd();
        }
        // DRAG    

        // SLIDE -> DRAG|IDLE
        next_SLIDE() {
            var nextState,
                parent = this.parent,
                dragState = parent.dragState;
            if (dragState.isDown) {
                nextState = 'DRAG';
            } else if (!parent.isSliding) {
                nextState = 'IDLE';
            }
            return nextState;
        }
        enter_SLIDE() {
            this.parent.onSliding();
        }
        exit_SLIDE() {
            this.parent.stop();
        }
        update_SLIDE(time, delta) {
            this.parent.sliding(time, delta);
            this.next();
        }
        // SLIDE    

        // BACK -> DRAG|IDLE
        next_BACK() {
            var nextState,
                parent = this.parent,
                dragState = parent.dragState;
            if (dragState.isDown) {
                nextState = 'DRAG';
            } else if (!parent.isPullBack) {
                nextState = 'IDLE';
            }
            return nextState;
        }
        enter_BACK() {
            this.parent.onPullBack();
        }
        exit_BACK() {
            this.parent.stop();
        }
        update_BACK(time, delta) {
            this.parent.pullBack(time, delta);
            this.next();
        }
        // BACK
    }

    const GetValue$d = Phaser.Utils.Objects.GetValue;
    const DistanceBetween = Phaser.Math.Distance.Between;

    class DragSpeed extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;

            this.rectBoundsInteractive = GetValue$d(config, 'rectBoundsInteractive', false);

            if (!this.rectBoundsInteractive) {
                gameObject.setInteractive(GetValue$d(config, "inputConfig", undefined));
            }

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.isInTouched = false;
            this.holdStartTime = undefined;
            this.x = undefined;
            this.y = undefined;
            this.preX = undefined;
            this.preY = undefined;
            this.localX = undefined;
            this.localY = undefined;
            this.justMoved = false;
            this.setEnable(GetValue$d(o, 'enable', true));
            this.holdThreshold = GetValue$d(o, 'holdThreshold', 50); // ms
            this.pointerOutReleaseEnable = GetValue$d(o, 'pointerOutRelease', true);
            return this;
        }

        boot() {
            var scene = this.scene;
            var gameObject = this.parent;

            if (!this.rectBoundsInteractive) {
                // Drag start only when pointer down
                gameObject.on('pointerdown', this.onPointIn, this);

                gameObject.on('pointerup', this.onPointOut, this);

                if (this.pointerOutReleaseEnable) {
                    gameObject.on('pointerout', this.onPointOut, this);
                }

                gameObject.on('pointermove', this.onPointerMove, this);

            } else {
                scene.input.on('pointerdown', this.onPointIn, this);

                scene.input.on('pointerup', this.onPointOut, this);

                scene.input.on('pointermove', this.onPointerMove, this);
            }

            scene.sys.events.on('preupdate', this.preupdate, this);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            var scene = this.scene;
            this.parent;

            if (!this.rectBoundsInteractive) ; else {
                scene.input.off('pointerdown', this.onPointIn, this);

                scene.input.off('pointerup', this.onPointOut, this);

                scene.input.off('pointermove', this.onPointerMove, this);
            }

            scene.sys.events.off('preupdate', this.preupdate, this);

            this.pointer = undefined;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            if (!e) {
                this.isInTouched = false;
                this.pointer = undefined;
            }
            this._enable = e;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        setPointerOutReleaseEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.pointerOutReleaseEnable = enable;
            return this;
        }

        get isDown() {
            return this.pointer && this.pointer.isDown;
        }

        get isUp() {
            return !this.isDown;
        }

        get dx() {
            return this.x - this.preX;
        }

        get dy() {
            return this.y - this.preY;
        }

        get dt() {
            var delta = GetTickDelta(this.scene);
            return delta;
        }

        get speed() {
            if ((this.x === this.preX) && (this.y === this.preY)) {
                return 0;
            }
            var d = DistanceBetween(this.preX, this.preY, this.x, this.y);
            var speed = d / (this.dt * 0.001);
            return speed;
        }

        get speedX() {
            return this.dx / (this.dt * 0.001);
        }

        get speedY() {
            return this.dy / (this.dt * 0.001);
        }

        // internal
        onPointIn(pointer, localX, localY) {
            if ((!this.enable) ||
                (!pointer.isDown) ||
                (this.pointer !== undefined)) {
                return;
            }

            if (
                this.rectBoundsInteractive &&
                !IsPointerInBounds(this.parent, pointer)
            ) {
                return;
            }

            this.pointer = pointer;
            this.localX = localX;
            this.localY = localY;
        }

        onPointOut(pointer) {
            if ((!this.enable) ||
                (this.pointer !== pointer)) {
                return;
            }
            this.pointer = undefined;
        }

        onPointerMove(pointer, localX, localY) {
            if ((!this.enable) ||
                (!pointer.isDown) ||
                (this.pointer !== pointer)) {
                return;
            }

            if (
                this.rectBoundsInteractive &&
                this.pointerOutReleaseEnable &&
                !IsPointerInBounds(this.parent, pointer)
            ) {
                this.onPointOut(pointer);
                return;
            }

            this.localX = localX;
            this.localY = localY;
        }

        preupdate(time, delta) {
            if (!this.enable) {
                return;
            }

            var pointer = this.pointer;
            this.justMoved = false;
            if (pointer && (!this.isInTouched)) {
                // Touch start
                this.x = pointer.worldX;
                this.y = pointer.worldY;
                this.preX = pointer.worldX;
                this.preY = pointer.worldY;
                this.isInTouched = true;
                this.holdStartTime = undefined;
                this.emit('touchstart', pointer, this.localX, this.localY);

            } else if (pointer && this.isInTouched) {
                // In touch
                if ((this.x === pointer.x) && (this.y === pointer.y)) {
                    // Hold
                    if (this.holdStartTime === undefined) {
                        this.holdStartTime = time;
                    } else if (time - this.holdStartTime > this.holdThreshold) {
                        this.preX = this.x;
                        this.preY = this.y;
                    }
                } else {
                    // Move
                    this.preX = this.x;
                    this.preY = this.y;
                    this.x = pointer.worldX;
                    this.y = pointer.worldY;
                    this.holdStartTime = undefined;
                    this.justMoved = true;
                    this.emit('touchmove', pointer, this.localX, this.localY);
                }

            } else if ((!pointer) && this.isInTouched) {
                // Touch end
                this.isInTouched = false;
                this.holdStartTime = undefined;
                this.emit('touchend', pointer);

            }
        }
    }

    const GetValue$c = Phaser.Utils.Objects.GetValue;

    class Movement {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setValue(GetValue$c(o, 'value', 0));
            this.setSpeed(GetValue$c(o, 'speed', 0));
            this.setAcceleration(GetValue$c(o, 'acceleration', 0));
            return this;
        }

        reset() {
            this.setValue(0);
            this.setSpeed(0);
            this.setAcceleration(0);
        }

        setValue(value) {
            this.value = value;
            return this;
        }

        setSpeed(speed) {
            // speed == 0 : stop
            // speed  > 0 : move
            this.speed = speed;
            return this;        
        }

        setAcceleration(acc) {
            // acc == 0 : constant speed
            // acc  > 0 : acceleration
            // acc  < 0 : deceleration
            this.acceleration = acc;
            return this;
        }

        updateSpeed(delta) {
            // delta in sec
            if (this.acceleration !== 0) {
                this.speed += (this.acceleration * delta);
                if (this.speed < 0) {
                    this.speed = 0;
                }
            }
            return this;
        }

        getDeltaValue(delta) {
            // delta in sec
            this.updateSpeed(delta);
            if (this.speed <= 0) {
                return 0;
            }
            return (this.speed * delta);
        }

        update(delta) {
            // delta in sec
            this.updateSpeed(delta);
            if (this.speed > 0) {
                this.value += this.getDeltaValue(delta);
            }
            return this;
        }

        get isMoving() {
            return (this.speed > 0);
        }
    }

    class SlowDown {
        constructor() {
            this.value;
            this.dir; // true:+, false:-
            this.movement = new Movement();
        }

        init(start, dir, speed, dec, end) {
            this.value = start;
            this.end = end;
            if (end !== undefined) {
                this.dir = (start < end);
            } else {
                this.dir = dir;
            }

            this.movement
                .setSpeed(speed)
                .setAcceleration(-dec);
            return this;
        }

        stop() {
            this.movement.reset();
        }

        update(delta) {
            // delta in sec
            var d = this.movement.getDeltaValue(delta);
            if (!this.dir) {
                d = -d;
            }

            if (this.end === undefined) {
                this.value += d;
            } else {
                if (d === 0) {
                    this.value = this.end;
                } else {
                    this.value += d;
                    if (this.dir) { // +
                        if (this.value > this.end) {
                            this.value = this.end;
                        }
                    } else { // -
                        if (this.value < this.end) {
                            this.value = this.end;
                        }
                    }
                }
            }
            return this;
        }

        get isMoving() {
            return this.movement.isMoving;
        }
    }

    const GetValue$b = Phaser.Utils.Objects.GetValue;
    const Clamp$1 = Phaser.Math.Clamp;

    class Scroller extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            var enable = GetValue$b(config, 'enable', true);
            this._state = new State(this, {
                enable: enable,
                eventEmitter: false,
            });

            var drapSpeedConfig = {
                rectBoundsInteractive: GetValue$b(config, 'rectBoundsInteractive', false),
                inputConfig: GetValue$b(config, 'inputConfig', undefined),
                enable: enable,
                pointerOutRelease: GetValue$b(config, 'pointerOutRelease', true),
                eventEmitter: false,
            };
            this.dragState = new DragSpeed(gameObject, drapSpeedConfig);

            this._enable = undefined;
            this._value = undefined;
            this._slowDown = new SlowDown();

            var callback = GetValue$b(config, 'valuechangeCallback', null);
            if (callback !== null) {
                var scope = GetValue$b(config, 'valuechangeCallbackScope', undefined);
                this.on('valuechange', callback, scope);
            }
            callback = GetValue$b(config, 'overmaxCallback', null);
            if (callback !== null) {
                var scope = GetValue$b(config, 'overmaxCallbackScope', undefined);
                this.on('overmax', callback, scope);
            }
            callback = GetValue$b(config, 'overminCallback', null);
            if (callback !== null) {
                var scope = GetValue$b(config, 'overminCallbackScope', undefined);
                this.on('overmin', callback, scope);
            }

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setOrientationMode(GetValue$b(o, 'orientation', 0));
            this.setDragThreshold(GetValue$b(o, 'threshold', 10));
            this.setSlidingDeceleration(GetValue$b(o, 'slidingDeceleration', 5000));
            this.setBackDeceleration(GetValue$b(o, 'backDeceleration', 2000));

            var dragRate = GetValue$b(o, 'dragRate', 1);
            dragRate = dragRate * (GetValue$b(o, 'dragReverse', false) ? -1 : 1);
            this.setDragRate(dragRate);

            var bounds = GetValue$b(o, 'bounds', undefined);
            if (bounds) {
                this.setBounds(bounds);
            } else {
                this.setBounds(GetValue$b(o, 'max', 0), GetValue$b(o, 'min', 0));
            }
            this.setValue(GetValue$b(o, 'value', this.maxValue || 0));
            this.setEnable(GetValue$b(o, "enable", true));
            return this;
        }

        boot() {
            this.scene.sys.events.on('preupdate', this._state.update, this._state);
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.scene.sys.events.off('preupdate', this._state.update, this._state);
            this._state.destroy(fromScene);
            this.dragState.destroy(fromScene);
            this._state = undefined;
            this.dragState = undefined;

            super.shutdown(fromScene);
        }

        get enable() {
            return this._enable;
        }

        set enable(e) {
            if (this._enable === e) {
                return;
            }

            this._enable = e;
            this._state.setEnable(e);
            this.dragState.setEnable(e);

            return this;
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        toggleEnable() {
            this.setEnable(!this.enable);
            return this;
        }

        setOrientationMode(m) {
            if (typeof (m) === 'string') {
                m = ORIENTATIONMODE[m];
            }
            this.orientationMode = m;
            return this;
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

        setSlidingDeceleration(dec) {
            this.slidingDeceleration = dec;
            return this;
        }

        setBackDeceleration(dec) {
            this.backDeceleration = dec;
            return this;
        }

        setDragRate(ratio) {
            this.dragRate = ratio;
            return this;
        }

        setBounds(value0, value1) {
            if (Array.isArray(value0)) {
                var bounds = value0;
                value0 = bounds[0];
                value1 = bounds[1];
            }
            if (value0 < value1) {
                this.minValue = value0;
                this.maxValue = value1;
            } else {
                this.minValue = value1;
                this.maxValue = value0;
            }
            return this;
        }

        get value() {
            return this._value;
        }

        set value(value) {
            if (value === this._value) {
                return;
            }

            var oldValue = this._value;
            var isOverMax = this.overMax(value);
            var isOverMin = this.overMin(value);
            if (isOverMax) {
                this.emit('overmax', value, oldValue);
            }
            if (isOverMin) {
                this.emit('overmin', value, oldValue);
            }
            if (!this.backEnable) {
                if (isOverMax) {
                    value = this.maxValue;
                }
                if (isOverMin) {
                    value = this.minValue;
                }
            }

            this._value = value;
            this.emit('valuechange', value, oldValue);
        }

        setValue(value, clamp) {
            if (clamp === undefined) {
                clamp = false;
            }

            if (clamp) {
                value = Clamp$1(value, this.minValue, this.maxValue);
            }

            this.value = value;
            return this;
        }

        addValue(inc, clamp) {
            this.setValue(this.value + inc, clamp);
            return this;
        }

        get state() {
            return this._state.state;
        }

        get isDragging() {
            return this.dragState.isInTouched;
        }

        get outOfMaxBound() {
            return this.overMax(this.value);
        }

        get outOfMinBound() {
            return this.overMin(this.value);
        }

        get outOfBounds() {
            return this.outOfMinBound || this.outOfMaxBound;
        }

        // internal
        overMax(value) {
            return (this.maxValue != null) && (value > this.maxValue);
        }

        overMin(value) {
            return (this.minValue != null) && (value < this.minValue);
        }

        get backEnable() {
            return (typeof (this.backDeceleration) === 'number');
        }

        get isPullBack() {
            return this._slowDown.isMoving;
        }

        get slidingEnable() {
            return (typeof (this.slidingDeceleration) === 'number');
        }

        get isSliding() {
            return this._slowDown.isMoving;
        }

        get dragDelta() {
            var delta;
            if (this.orientationMode === 0) { // y
                delta = this.dragState.dy;
            } else if (this.orientationMode === 1) { // x
                delta = this.dragState.dx;
            } else {
                delta = 0;
            }
            delta *= this.dragRate;
            return delta;
        }

        get dragSpeed() {
            var speed;
            if (this.orientationMode === 0) { // y
                speed = this.dragState.speedY;
            } else if (this.orientationMode === 1) { // x
                speed = this.dragState.speedX;
            } else {
                speed = 0;
            }
            speed *= this.dragRate;
            return speed;
        }

        // enter_DRAG
        onDragStart() {
            this.emit('dragstart');
        }

        // exit_DRAG
        onDragEnd() {
            this.emit('dragend');
        }

        // everyTick_DRAG
        dragging() {
            this.value += this.dragDelta;
        }

        // enter_SLIDE 
        onSliding() {
            var start = this.value;
            var speed = this.dragSpeed;
            if (speed === 0) {
                this._slowDown.stop();
                this._state.next();
                return;
            }
            var dec = this.slidingDeceleration;
            this._slowDown.init(start, (speed > 0), Math.abs(speed), dec);
        }

        // everyTick_SLIDE
        sliding(time, delta) {
            delta *= 0.001;
            var newValue = this._slowDown.update(delta).value;
            if (this.overMax(newValue)) {
                this.value = this.maxValue;
                this._slowDown.stop();
            } else if (this.overMin(newValue)) {
                this.value = this.minValue;
                this._slowDown.stop();
            } else {
                this.value = newValue;
            }
        }

        // enter_BACK
        onPullBack() {
            var start = this.value;
            var end = (this.outOfMinBound) ? this.minValue : this.maxValue;
            var dist = Math.abs(end - start);
            var dec = this.backDeceleration;
            var speed = Math.sqrt(2 * dec * dist);
            this._slowDown.init(start, undefined, speed, dec, end);
        }

        // everyTick_BACK
        pullBack(time, delta) {
            delta *= 0.001;
            this.value = this._slowDown.update(delta).value;

            if (!this._slowDown.isMoving) {
                this._state.next();
            }
        }

        // exit_SLIDE, exit_BACK
        stop() {
            this._slowDown.stop();
        }

    }

    const ORIENTATIONMODE = {
        y: 0,
        v: 0,
        vertical: 0,
        x: 1,
        h: 1,
        horizontal: 1,
    };

    const GetValue$a = Phaser.Utils.Objects.GetValue;

    class MouseWheelScroller extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            if (this.parent !== this.scene) {
                this.focusMode = GetValue$a(config, 'focus', true);
            } else {
                this.focusMode = false;
            }

            if (typeof (this.focusMode) === 'boolean') {
                this.focusMode = (this.focusMode) ? 1 : 0;
            }

            this.setSpeed(GetValue$a(config, 'speed', 0.1));
            this.setEnable(GetValue$a(config, 'enable', true));

            switch (this.focusMode) {
                case 0:
                case 2:
                    this.scene.input.on('wheel', this.onSceneScroll, this);
                    break;

                default:  // case 1
                    gameObject
                        .setInteractive(GetValue$a(config, "inputConfig", undefined))
                        .on('wheel', function (pointer, dx, dy, dz, event) {
                            this.tryScroll(dy);
                        }, this);
                    break;
            }
        }

        destroy() {
            switch (this.focusMode) {
                case 0:
                case 2:
                    this.scene.input.off('wheel', this.onSceneScroll, this);
                    break;
            }
        }

        onSceneScroll(pointer, currentlyOver, dx, dy, dz, event) {
            if (this.focusMode === 2) {
                if (!IsPointerInBounds(this.parent, pointer)) {
                    return;
                }
            }

            this.tryScroll(dy);
        }

        setEnable(e) {
            if (e === undefined) {
                e = true;
            }

            this.enable = e;
            return this;
        }

        setSpeed(speed) {
            this.speed = speed;
            return this;
        }

        tryScroll(dy) {
            if (!this.enable) {
                return;
            }
            this.scroll(dy);
            return this;
        }

        scroll(dy) {
            dy *= this.speed;
            this.emit('scroll', dy, this.parent, this);
            return this;
        }
    }

    const GetValue$9 = Phaser.Utils.Objects.GetValue;

    var AddSlider = function (topPatent, sliderParent, axis, config) {
        axis = axis.toUpperCase();
        var isAxisY = (axis === 'Y');
        var isScrollXYMode = (topPatent.scrollMode === 2);
        var child = topPatent.childrenMap.child;

        var sliderConfig, slider;
        var sliderConfigKey = `slider${axis}`;
        if (isScrollXYMode) {
            sliderConfig = GetValue$9(config, sliderConfigKey, undefined);
        } else {
            if (config.hasOwnProperty(sliderConfigKey)) {
                sliderConfig = GetValue$9(config, sliderConfigKey, undefined);
            } else {
                sliderConfig = GetValue$9(config, 'slider', undefined);
            }
        }

        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }

            sliderConfig.orientation = (isAxisY) ? 1 : 0;
            slider = CreateScrollbar(topPatent.scene, sliderConfig);

            slider.tickLength = GetValue$9(sliderConfig, 'tickLength', undefined);

            var column, row, padding;

            var sliderPosition = GetValue$9(sliderConfig, 'position', 0);
            if (typeof (sliderPosition) === 'string') {
                sliderPosition = SLIDER_POSITION_MAP[sliderPosition];
            }

            /*
            1. space.sliderX, space.sliderY
            2. space.slider
            3. space.child
            */
            var sliderPadding = GetValue$9(config, `space.slider${axis}`, undefined);
            var childPadding;  // Legacy
            if (sliderPadding === undefined) {
                sliderPadding = GetValue$9(config, 'space.slider', undefined);
                if (sliderPadding === undefined) {
                    if (isScrollXYMode) {
                        sliderPadding = 0;
                    } else {
                        childPadding = GetValue$9(config, 'space.child', 0);
                    }
                }
            }

            var isNumberSliderPadding;
            if (childPadding === undefined) {
                isNumberSliderPadding = (typeof (sliderPadding) === 'number');
            } else {
                isNumberSliderPadding = (typeof (childPadding) === 'number');
            }

            if (isAxisY) {
                if (sliderPosition === 0) { // right
                    column = 2;
                    row = 1;

                    if (childPadding === undefined) {
                        padding = (isNumberSliderPadding) ? { left: sliderPadding } : sliderPadding;
                    } else {
                        padding = { left: GetValue$9(childPadding, 'right', childPadding) };
                    }

                } else { // left
                    column = 0;
                    row = 1;

                    if (childPadding === undefined) {
                        padding = (isNumberSliderPadding) ? { right: sliderPadding } : sliderPadding;
                    } else {
                        padding = { right: GetValue$9(childPadding, 'left', childPadding) };
                    }
                }

            } else {
                if (sliderPosition === 0) { // bottom
                    column = 1;
                    row = 2;

                    if (childPadding === undefined) {
                        padding = (isNumberSliderPadding) ? { top: sliderPadding } : sliderPadding;
                    } else {
                        padding = { top: GetValue$9(childPadding, 'bottom', childPadding) };
                    }

                } else { // top
                    column = 1;
                    row = 0;

                    if (childPadding === undefined) {
                        padding = (isNumberSliderPadding) ? { bottom: sliderPadding } : sliderPadding;
                    } else {
                        padding = { bottom: GetValue$9(childPadding, 'top', childPadding) };
                    }
                }
            }

            sliderParent.add(slider,
                {
                    column: column,
                    row: row,
                    align: 'center',
                    padding: padding,
                    expand: true,
                }
            );

            topPatent[`hideUnscrollableSlider${axis}`] = GetValue$9(sliderConfig, 'hideUnscrollableSlider', false);
            topPatent[`disableUnscrollableDrag${axis}`] = GetValue$9(sliderConfig, 'disableUnscrollableDrag', false);
            topPatent[`adaptThumb${axis}SizeMode`] = GetValue$9(sliderConfig, 'adaptThumbSize', false);
            topPatent[`minThumb${axis}Size`] = GetValue$9(sliderConfig, 'minThumbSize', undefined);

        } else {
            topPatent[`hideUnscrollableSlider${axis}`] = false;
            topPatent[`disableUnscrollableDrag${axis}`] = false;
            topPatent[`adaptThumb${axis}SizeMode`] = false;
            topPatent[`minThumb${axis}Size`] = undefined;
        }

        // 0=gameObject, 1=rectBounds
        var scrollDetectionMode = GetValue$9(config, 'scrollDetectionMode');
        if (typeof (scrollDetectionMode) === 'string') {
            scrollDetectionMode = SCROLLDECTIONMODE_MAP[scrollDetectionMode];
        }

        var scrollerConfig, scroller;
        var scrollerConfigKey = `scroller${axis}`;
        if (isScrollXYMode) {
            scrollerConfig = GetValue$9(config, scrollerConfigKey, true);
        } else {
            if (config.hasOwnProperty(scrollerConfigKey)) {
                scrollerConfig = GetValue$9(config, scrollerConfigKey, true);
            } else {
                scrollerConfig = GetValue$9(config, 'scroller', true);
            }
        }

        if (scrollerConfig && child) {
            if (scrollerConfig === true) {
                scrollerConfig = {};
            }

            scrollerConfig.orientation = (isAxisY) ? 0 : 1;

            if (scrollDetectionMode !== undefined) {
                scrollerConfig.rectBoundsInteractive = (scrollDetectionMode === 1);
            }

            scroller = new Scroller(child, scrollerConfig);

            if (child.isRexContainerLite) {
                // Send touch detection sensor to back
                child.sendChildToBack(child);
            }
        }

        var mouseWheelScrollerConfig = GetValue$9(config, ((isScrollXYMode) ? `mouseWheelScroller${axis}` : 'mouseWheelScroller'), false),
            mouseWheelScroller;
        if (mouseWheelScrollerConfig && child) {
            if (scrollDetectionMode !== undefined) {
                mouseWheelScrollerConfig.focus = (scrollDetectionMode === 1) ? 2 : 0;
            }

            mouseWheelScroller = new MouseWheelScroller(child, mouseWheelScrollerConfig);
        }

        topPatent.addChildrenMap(`slider${axis}`, slider);
        topPatent.addChildrenMap(`scroller${axis}`, scroller);
        topPatent.addChildrenMap(`mouseWheelScroller${axis}`, mouseWheelScroller);

        if ((!isScrollXYMode) || (isAxisY)) {
            topPatent['hideUnscrollableSlider'] = topPatent[`hideUnscrollableSlider${axis}`];
            topPatent['disableUnscrollableDrag'] = topPatent[`disableUnscrollableDrag${axis}`];
            topPatent['adaptThumbSizeMode'] = topPatent[`adaptThumb${axis}SizeMode`];
            topPatent['minThumbSize'] = topPatent[`minThumb${axis}Size`];

            topPatent.addChildrenMap('slider', slider);
            topPatent.addChildrenMap('scroller', scroller);
            topPatent.addChildrenMap('mouseWheelScroller', mouseWheelScroller);
        }


        // Control
        if (slider) {
            var keyST, eventName;
            if (isScrollXYMode) {
                keyST = (isAxisY) ? 't' : 's';
                eventName = `scroll${axis}`;
            } else {
                keyST = 't';
                eventName = 'scroll';
            }
            slider
                .on('valuechange', function (newValue) {
                    topPatent[keyST] = newValue;
                    topPatent.emit(eventName, topPatent);
                });
        }

        if (scroller) {
            var keyChildOXY, eventName;
            if (isScrollXYMode) {
                keyChildOXY = `childO${axis}`;
                eventName = `scroll${axis}`;
            } else {
                keyChildOXY = 'childOY';
                eventName = 'scroll';
            }
            scroller
                .on('valuechange', function (newValue) {
                    topPatent[keyChildOXY] = newValue;
                    topPatent.emit(eventName, topPatent);
                });
        }

        if (mouseWheelScroller) {
            var methodAddChildOXY;
            if (isScrollXYMode) {
                methodAddChildOXY = `addChildO${axis}`;
            } else {
                methodAddChildOXY = 'addChildOY';
            }
            mouseWheelScroller
                .on('scroll', function (incValue) {
                    topPatent[methodAddChildOXY](-incValue, true);
                });
        }
    };

    const SLIDER_POSITION_MAP = {
        right: 0,
        left: 1,
        bottom: 0,
        top: 1,
    };

    const SCROLLDECTIONMODE_MAP = {
        gameObject: 0,
        rectBounds: 1,
    };

    const GetValue$8 = Phaser.Utils.Objects.GetValue;

    var CreateScrollableSizer = function (parent, config) {
        var scene = parent.scene;

        var columnProportions = [0, 1, 0],
            rowProportions = [0, 1, 0];
        var parentMinWidth = GetValue$8(config, 'width');
        var parentMinHeight = GetValue$8(config, 'height');
        if (!parentMinWidth) {
            var expandChildWidth = GetValue$8(config, 'child.expandWidth', true);
            if (!expandChildWidth) {
                columnProportions[1] = 0;  // Calculate parent's width by child's width
            }
        }
        if (!parentMinHeight) {
            var expandChildHeight = GetValue$8(config, 'child.expandHeight', true);
            if (!expandChildHeight) {
                rowProportions[1] = 0;    // Calculate parent's height by child's height
            }
        }

        var scrollableSizer = new GridSizer(scene, {
            column: 3, row: 3,
            columnProportions: columnProportions,
            rowProportions: rowProportions
        });

        AddChild(parent, scrollableSizer, config);

        switch (parent.scrollMode) {
            case 0:  // y
                AddSlider(parent, scrollableSizer, 'y', config);
                break;
            case 1:  // x
                AddSlider(parent, scrollableSizer, 'x', config);
                break;

            default: // xy
                AddSlider(parent, scrollableSizer, 'y', config);
                AddSlider(parent, scrollableSizer, 'x', config);
                break;
        }

        return scrollableSizer;
    };

    var ResizeController = function () {
        switch (this.scrollMode) {
            case 0:
            case 1:
                SetControllerBounds.call(this);

                this.updateController();

                HideUnscrollableSlider.call(this);

                AdaptThumbSize.call(this);

                break;

            default: // 2
                SetControllerBounds.call(this, 'y');
                SetControllerBounds.call(this, 'x');

                this.updateController();

                HideUnscrollableSlider.call(this, 'y');
                HideUnscrollableSlider.call(this, 'x');

                AdaptThumbSize.call(this, 'y');
                AdaptThumbSize.call(this, 'x');
                break;
        }

        return this;
    };


    var SetControllerBounds = function (axis) {
        // Scale will force to 1
        var bound0, bound1;
        var scroller, slider;
        switch (this.scrollMode) {
            case 0:
            case 1:
                bound0 = this.topChildOY;
                bound1 = this.bottomChildOY;
                scroller = this.childrenMap.scroller;
                slider = this.childrenMap.slider;
                axis = (this.scrollMode === 0) ? 'Y' : 'X';
                break;

            default:  // 2
                axis = axis.toUpperCase();
                if (axis === 'Y') {
                    bound0 = this.topChildOY;
                    bound1 = this.bottomChildOY;
                } else {
                    bound0 = this.leftChildOX;
                    bound1 = this.rightChildOX;
                }
                scroller = this.childrenMap[`scroller${axis}`];
                slider = this.childrenMap[`slider${axis}`];
        }

        var scale = (axis === 'Y') ? this.scaleY : this.scaleX;
        bound1 *= scale;

        if (scroller) {
            scroller.setBounds(bound0, bound1);
        }
        if (slider) {
            slider.setEnable(bound0 !== bound1);

            if (slider.tickLength) {
                slider.setTick(slider.tickLength, bound0, bound1);
            }
        }
    };

    var HideUnscrollableSlider = function (axis) {
        switch (this.scrollMode) {
            case 0:
            case 1:
                var slider = this.childrenMap.slider;
                if (slider && this.hideUnscrollableSlider) {
                    this.setChildVisible(slider, this.isOverflow);
                }

                var scroller = this.childrenMap.scroller;
                if (scroller && this.disableUnscrollableDrag) {
                    scroller.setEnable(this.isOverflow);
                }

                break;

            default:
                axis = axis.toUpperCase();
                var isOverflow = this[`isOverflow${axis}`];

                var slider = this.childrenMap[`slider${axis}`];
                var hideUnscrollableSlider = this[`hideUnscrollableSlider${axis}`];
                if (slider && hideUnscrollableSlider) {
                    this.setChildVisible(slider, isOverflow);
                }

                var scroller = this.childrenMap.scroller;
                var disableUnscrollableDrag = this[`disableUnscrollableDrag${axis}`];
                if (scroller && disableUnscrollableDrag) {
                    scroller.setEnable(isOverflow);
                }
                break;
        }
    };

    var AdaptThumbSize = function (axis) {
        switch (this.scrollMode) {
            case 0:
            case 1:
                if (!this.adaptThumbSizeMode) {
                    return;
                }
                var slider = this.childrenMap.slider;
                if (!slider) {
                    return;
                }

                // Change slider size according to visible ratio
                var ratio = Math.min(this.childVisibleHeight / this.childHeight, 1);
                var track = slider.childrenMap.track;
                var thumb = slider.childrenMap.thumb;
                var minThumbSize = this.minThumbSize;
                if (this.scrollMode === 0) {
                    var newHeight = track.displayHeight * ratio;
                    if ((minThumbSize !== undefined) && (newHeight < minThumbSize)) {
                        newHeight = minThumbSize;
                    }
                    ResizeGameObject(thumb, undefined, newHeight);
                } else {
                    var newWidth = track.displayWidth * ratio;
                    if ((minThumbSize !== undefined) && (newWidth < minThumbSize)) {
                        newWidth = minThumbSize;
                    }
                    ResizeGameObject(thumb, newWidth, undefined);

                }
                LayoutSlider(slider);
                break;

            default:
                // TODO
                axis = axis.toUpperCase();
                var adaptThumbSizeMode = this[`adaptThumb${axis}SizeMode`];
                if (!adaptThumbSizeMode) {
                    return;
                }
                var slider = this.childrenMap[`slider${axis}`];
                if (!slider) {
                    return;
                }

                // Change slider size according to visible ratio            
                var track = slider.childrenMap.track;
                var thumb = slider.childrenMap.thumb;
                var minThumbSize = this[`minThumb${axis}Size`];
                if (axis === 'Y') {
                    var ratio = Math.min(this.childVisibleHeight / this.childHeight, 1);
                    var newHeight = track.displayHeight * ratio;
                    if ((minThumbSize !== undefined) && (newHeight < minThumbSize)) {
                        newHeight = minThumbSize;
                    }
                    ResizeGameObject(thumb, undefined, newHeight);
                } else {
                    var ratio = Math.min(this.childVisibleWidth / this.childWidth, 1);
                    var newWidth = track.displayWidth * ratio;
                    if ((minThumbSize !== undefined) && (newWidth < minThumbSize)) {
                        newWidth = minThumbSize;
                    }
                    ResizeGameObject(thumb, newWidth, undefined);

                }
                LayoutSlider(slider);
                break;

        }


    };

    var LayoutSlider = function (slider) {
        // Save minSize
        var minWidthSave = slider.minWidth;
        var minHeightSave = slider.minHeight;
        // Set minSize to current size
        slider.minWidth = slider.width;
        slider.minHeight = slider.height;
        // Layout slider
        slider.layout();
        // Restore minSize
        slider.minWidth = minWidthSave;
        slider.minHeight = minHeightSave;
    };

    var UpdateController = function () {
        switch (this.scrollMode) {
            case 0:
            case 1:
                var scroller = this.childrenMap.scroller;
                var slider = this.childrenMap.slider;
                if (scroller) {
                    scroller.setValue(this.childOY);
                }
                if (slider) {
                    slider.setValue(this.t);
                }
                break;

            default:
                var scrollerY = this.childrenMap.scrollerY;
                var sliderY = this.childrenMap.sliderY;
                var scrollerX = this.childrenMap.scrollerX;
                var sliderX = this.childrenMap.sliderX;

                if (scrollerY) {
                    scrollerY.setValue(this.childOY);
                }
                if (sliderY) {
                    sliderY.setValue(this.t);
                }
                if (scrollerX) {
                    scrollerX.setValue(this.childOX);
                }
                if (sliderX) {
                    sliderX.setValue(this.s);
                }
                break;
        }

    };

    const GetValue$7 = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class Scrollable extends Sizer {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            var scrollMode = GetScrollMode(config); // 0:y, 1:x, 2:xy
            // Create sizer
            var isRevererXY = (scrollMode === 1);
            config.orientation = (!isRevererXY) ? 1 : 0;
            super(scene, config);
            this.type = GetValue$7(config, 'type', 'rexScrollable');
            this.scrollMode = scrollMode;

            // Add elements
            // Background
            var background = GetValue$7(config, 'background', undefined);
            if (background) {
                this.addBackground(background);
            }

            var header = GetValue$7(config, 'header', undefined);
            if (header) {
                var align = GetValue$7(config, 'align.header', 'center');
                var headerSpace = GetValue$7(config, 'space.header', 0);
                var padding;
                if (!isRevererXY) {
                    padding = { bottom: headerSpace };
                } else {
                    padding = { right: headerSpace };
                }
                this.add(header,
                    {
                        proportion: 0,
                        align: align,
                        padding: padding,
                        expand: GetValue$7(config, 'expand.header', true)
                    }
                );
            }

            var scrollableSizer = CreateScrollableSizer(this, config);
            if (scrollableSizer) {
                this.add(scrollableSizer,
                    {
                        proportion: 1,
                        align: 'center',
                        padding: 0,
                        expand: true
                    }
                );
            }

            var footer = GetValue$7(config, 'footer', undefined);
            if (footer) {
                var align = GetValue$7(config, 'align.footer', 'center');
                var footerSpace = GetValue$7(config, 'space.footer', 0);
                var padding;
                if (!isRevererXY) {
                    padding = { top: footerSpace };
                } else {
                    padding = { left: footerSpace };
                }
                this.add(footer,
                    {
                        proportion: 0,
                        align: align,
                        padding: padding,
                        expand: GetValue$7(config, 'expand.footer', true)
                    }
                );
            }

            this.addChildrenMap('background', background);
            this.addChildrenMap('header', header);
            this.addChildrenMap('footer', footer);

            this.runLayoutFlag = false;

            /* 
            Necessary properties of child object :

            - child.t (RW), 
            - child.childOY (RW)        
            - child.topChildOY (R)
            - child.bottomChildOY (R)
            - child.childVisibleHeight (R)
            - child.childHeight (R)

            - child.s (RW), 
            - child.childOX (RW)
            - child.leftChildOX (R)
            - child.rightChildOX (R)
            - child.childVisibleWidth (R)
            - child.childWidth (R)        
            */
        }

        postLayout(parent, newWidth, newHeight) {
            var s = 0, t = 0;
            if (!this.runLayoutFlag) {
                this.runLayoutFlag = true;
            } else {
                t = this.t;

                if (this.scrollMode === 2) {
                    s = this.s;
                }
            }

            this.resizeController();

            this.setT(t);
            if (this.scrollMode === 2) {
                this.setS(s);
            }

            super.postLayout(parent, newWidth, newHeight);

            return this;
        }

        set t(value) {
            // Get inner childT
            var childMargin = this.childMargin;
            if ((childMargin.top !== 0) || (childMargin.bottom !== 0)) {
                var child = this.childrenMap.child;
                var innerHeight = (child.topChildOY - child.bottomChildOY);
                var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
                var innerChildOY = (outerHeight * value) - childMargin.top;
                value = (innerHeight !== 0) ? (innerChildOY / innerHeight) : 0;
            }

            this.childrenMap.child.t = value;
            this.updateController();
        }

        get t() {
            var t = this.childrenMap.child.t;

            // Get outer childT
            var childMargin = this.childMargin;
            if ((childMargin.top !== 0) || (childMargin.bottom !== 0)) {
                var child = this.childrenMap.child;
                var innerHeight = (child.topChildOY - child.bottomChildOY);
                var outerHeight = innerHeight + childMargin.top + childMargin.bottom;
                var outerChildOY = (innerHeight * t) + childMargin.top;
                t = (outerHeight !== 0) ? (outerChildOY / outerHeight) : 0;
            }
            return t;
        }

        set s(value) {
            // Get inner childS
            var childMargin = this.childMargin;
            if ((childMargin.left !== 0) || (childMargin.right !== 0)) {
                var child = this.childrenMap.child;
                var innerWidth = (child.leftChildOX - child.rightChildOX);
                var outerWidth = innerWidth + childMargin.left + childMargin.right;
                var innerChildOX = (outerWidth * value) - childMargin.left;
                value = (innerWidth !== 0) ? (innerChildOX / innerWidth) : 0;
            }

            this.childrenMap.child.s = value;
            this.updateController();
        }

        get s() {
            var s = this.childrenMap.child.s;

            // Get outer childT
            var childMargin = this.childMargin;
            if ((childMargin.left !== 0) || (childMargin.right !== 0)) {
                var child = this.childrenMap.child;
                var innerWidth = (child.leftChildOX - child.rightChildOX);
                var outerWidth = innerWidth + childMargin.left + childMargin.right;
                var outerChildOX = (innerWidth * s) + childMargin.left;
                s = (outerWidth !== 0) ? (outerChildOX / outerWidth) : 0;
            }
            return s;
        }

        set childOY(value) {
            this.childrenMap.child.childOY = value;
            this.updateController();
        }

        get childOY() {
            return this.childrenMap.child.childOY;
        }

        set childOX(value) {
            this.childrenMap.child.childOX = value;
            this.updateController();
        }

        get childOX() {
            return this.childrenMap.child.childOX;
        }

        get topChildOY() {
            return this.childrenMap.child.topChildOY + this.childMargin.top;
        }

        get bottomChildOY() {
            return this.childrenMap.child.bottomChildOY - this.childMargin.bottom;
        }

        get leftChildOX() {
            return this.childrenMap.child.leftChildOX + this.childMargin.left;
        }

        get rightChildOX() {
            return this.childrenMap.child.rightChildOX - this.childMargin.right;
        }

        get childVisibleHeight() {
            return this.childrenMap.child.childVisibleHeight;
        }

        get childHeight() {
            return this.childrenMap.child.childHeight;
        }

        get childVisibleWidth() {
            return this.childrenMap.child.childVisibleWidth;
        }

        get childWidth() {
            return this.childrenMap.child.childWidth;
        }

        get isOverflow() {
            var child = this.childrenMap.child;
            return child.topChildOY !== child.bottomChildOY;
        }

        get isOverflowY() {
            return this.isOverflow;
        }

        get isOverflowX() {
            var child = this.childrenMap.child;
            return child.leftChildOX !== child.rightChildOX;
        }

        setChildOY(value, clamp) {
            if (clamp === undefined) {
                clamp = false;
            }
            if (clamp) {
                value = Clamp(value, this.bottomChildOY, this.topChildOY);
            }
            this.childOY = value;
            return this;
        }

        addChildOY(inc, clamp) {
            this.setChildOY(this.childOY + inc, clamp);
            return this;
        }

        setT(value, clamp) {
            if (clamp === undefined) {
                clamp = false;
            }
            if (clamp) {
                value = Clamp(value, 0, 1);
            }
            this.t = value;
            return this;
        }

        addT(inc, clamp) {
            this.setT(this.t + inc, clamp);
            return this;
        }

        scrollToTop() {
            this.t = 0;
            return this;
        }

        scrollToBottom() {
            this.t = 1;
            // t will be 0 if panel/table does not exceed visible area
            if (this.t === 0) {
                return this;
            }

            // Panel/Table height might be expanded while cells are visible        
            do {
                this.t = 1;
            } while (this.t !== 1)

            return this;
        }

        setChildOX(value, clamp) {
            if (clamp === undefined) {
                clamp = false;
            }
            if (clamp) {
                value = Clamp(value, this.leftChildOX, this.rightChildOX);
            }
            this.childOX = value;
            return this;
        }

        addChildOX(inc, clamp) {
            this.setChildOX(this.childOX + inc, clamp);
            return this;
        }

        setS(value, clamp) {
            if (clamp === undefined) {
                clamp = false;
            }
            if (clamp) {
                value = Clamp(value, 0, 1);
            }
            this.s = value;
            return this;
        }

        addS(inc, clamp) {
            this.setS(this.s + inc, clamp);
            return this;
        }

        scrollToLeft() {
            this.s = 0;
            return this;
        }

        scrollToRight() {
            this.s = 1;
            // s will be 0 if panel/table does not exceed visible area
            if (this.s === 0) {
                return this;
            }

            // Panel/Table height might be expanded while cells are visible        
            do {
                this.s = 1;
            } while (this.s !== 1)

            return this;
        }

        get sliderEnable() {
            var slider = this.childrenMap.slider;
            if (!slider) {
                return false;
            }

            return slider.enable;
        }

        set sliderEnable(value) {
            var slider = this.childrenMap.slider;
            if (!slider) {
                return;
            }
            slider.setEnable(value);
        }

        setSliderEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.sliderEnable = enabled;
            return this;
        }

        get sliderYEnable() {
            return this.sliderEnable
        }

        set sliderYEnable(value) {
            this.sliderEnable = value;
        }

        setSliderYEnable(enabled) {
            this.setSliderEnable(enabled);
            return this;
        }

        get sliderXEnable() {
            var slider = this.childrenMap.sliderX;
            if (!slider) {
                return false;
            }

            return slider.enable;
        }

        set sliderXEnable(value) {
            var slider = this.childrenMap.sliderX;
            if (!slider) {
                return;
            }
            slider.setEnable(value);
        }

        setSliderXEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.sliderXEnable = enabled;
            return this;
        }

        get scrollerEnable() {
            var scroller = this.childrenMap.scroller;
            if (!scroller) {
                return false;
            }

            return scroller.enable;
        }

        set scrollerEnable(value) {
            var scroller = this.childrenMap.scroller;
            if (!scroller) {
                return;
            }
            scroller.setEnable(value);
        }

        setScrollerEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.scrollerEnable = enabled;
            return this;
        }

        get scrollerYEnable() {
            return this.scrollerEnable;
        }

        set scrollerYEnable(value) {
            this.scrollerEnable = value;
        }

        setScrollerYEnable(enabled) {
            this.setScrollerEnable(enabled);
            return this;
        }

        get scrollerXEnable() {
            var scroller = this.childrenMap.scrollerX;
            if (!scroller) {
                return false;
            }

            return scroller.enable;
        }

        set scrollerXEnable(value) {
            var scroller = this.childrenMap.scrollerX;
            if (!scroller) {
                return;
            }
            scroller.setEnable(value);
        }

        setScrollerXEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.scrollerXEnable = enabled;
            return this;
        }

        get scrollerXEnable() {
            var scroller = this.childrenMap.scrollerX;
            if (!scroller) {
                return false;
            }

            return scroller.enable;
        }

        set scrollerXEnable(value) {
            var scroller = this.childrenMap.scrollerX;
            if (!scroller) {
                return;
            }
            scroller.setEnable(value);
        }

        setScrollerXEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.scrollerXEnable = enabled;
            return this;
        }

        get mouseWheelScrollerEnable() {
            var mouseWheelScroller = this.childrenMap.mouseWheelScroller;
            if (!mouseWheelScroller) {
                return false;
            }

            return mouseWheelScroller.enable;
        }

        set mouseWheelScrollerEnable(value) {
            var mouseWheelScroller = this.childrenMap.mouseWheelScroller;
            if (!mouseWheelScroller) {
                return;
            }
            mouseWheelScroller.setEnable(value);
        }

        setMouseWheelScrollerEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.mouseWheelScrollerEnable = enabled;
            return this;
        }

        get mouseWheelScrollerYEnable() {
            return this.mouseWheelScrollerEnable;
        }

        set mouseWheelScrollerYEnable(value) {
            this.mouseWheelScrollerEnable = value;
        }

        setMouseWheelScrollerYEnable(enabled) {
            this.setMouseWheelScrollerEnable(enabled);
            return this;
        }

        get mouseWheelScrollerXEnable() {
            var mouseWheelScroller = this.childrenMap.mouseWheelScrollerX;
            if (!mouseWheelScroller) {
                return false;
            }

            return mouseWheelScroller.enable;
        }

        set mouseWheelScrollerXEnable(value) {
            var mouseWheelScroller = this.childrenMap.mouseWheelScrollerX;
            if (!mouseWheelScroller) {
                return;
            }
            mouseWheelScroller.setEnable(value);
        }

        setMouseWheelScrollerXEnable(enabled) {
            if (enabled === undefined) {
                enabled = true;
            }
            this.mouseWheelScrollerXEnable = enabled;
            return this;
        }

        setDropZoneEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            var child = this.childrenMap.child;
            child.setInteractive();
            child.input.dropZone = enable;
            return this;
        }

    }

    var Methods$1 = {
        resizeController: ResizeController,
        updateController: UpdateController
    };

    // mixin
    Object.assign(
        Scrollable.prototype,
        Methods$1
    );

    var GetChildrenWidth = function () {
        if (this.rexSizer.hidden) {
            return 0;
        }

        var childWidth;
        var child = this.child,
            childConfig = child.rexSizer;
        var hasUnknownChildWidth = false;

        if (childConfig.hidden) {
            childWidth = 0;
        } else {
            switch (this.scrollMode) {
                case 0:
                    childWidth = this.getChildWidth(child);
                    if (childWidth === undefined) {
                        hasUnknownChildWidth = true;
                    }
                    break;

                case 1:
                    childWidth = 0;
                    break;

                default:
                    childWidth = 0;
                    break;
            }
        }

        if (hasUnknownChildWidth) {
            return undefined;
        }

        return childWidth;
    };

    var GetChildrenHeight = function () {
        if (this.rexSizer.hidden) {
            return 0;
        }

        var childHeight;
        var child = this.child,
            childConfig = child.rexSizer;
        var hasUnknownChildHeight = false;

        if (childConfig.hidden) {
            childHeight = 0;
        } else {
            switch (this.scrollMode) {
                case 0:
                    childHeight = 0;
                    break;

                case 1:
                    childHeight = this.getChildHeight(child);
                    if (childHeight === undefined) {
                        hasUnknownChildHeight = true;
                    }
                    break;

                default:
                    childHeight = 0;
                    break;
            }
        }

        if (hasUnknownChildHeight) {
            return undefined;
        }

        return childHeight;
    };

    var GetChildrenSizers = function(out) {
        if (out === undefined) {
            out = [];
        }
        if (this.child && this.child.isRexSizer) {
            out.push(this.child);
        }
        return out;
    };

    var ResetChildPosition = function () {
        var x = this.left;
        var y = this.top;

        switch (this.scrollMode) {
            case 0:
                y += this.childOY;
                break;
            case 1:
                x += this.childOY;
                break;

            default:  // xy
                y += this.childOY;
                x += this.childOX;
                break;
        }

        this.child.setPosition(x, y);
        this.resetChildPositionState(this.child);

        this.setMaskChildrenFlag();
    };

    var LayoutChildren = function () {
        // LayoutChildren child
        var child = this.child;
        var childWidth, childHeight;
        if (!child.rexSizer.hidden) {
            // Set size
            switch (this.scrollMode) {
                case 0:
                    childWidth = this.width * this.scaleX;
                    break;
                case 1:
                    childHeight = this.height * this.scaleY;
                    break;
            }

            if (child.isRexSizer) {
                child.runLayout(this, childWidth, childHeight);
            } else {
                ResizeGameObject(child, childWidth, childHeight);
            }

            // Update local state
            this.resetChildPosition();
            // Layout children-mask
            this.layoutChildrenMask();
            // Re-mask children
            this.maskChildren();
        }
    };

    var RemoveChildCallback = function (gameObject, destroyChild) {
        if (destroyChild) {
            return;
        }

        if (gameObject.clearMask) {
            gameObject.clearMask(false);
        }
    };

    var MaskToGameObject = function (mask) {
        return (mask.hasOwnProperty('geometryMask')) ? mask.geometryMask : mask.bitmapMask;
    };

    const Intersects = Phaser.Geom.Intersects.RectangleToRectangle;
    const Overlaps = Phaser.Geom.Rectangle.Overlaps;

    var MaskChildren = function ({
        parent, mask, children,    
        onVisible, onInvisible, scope,
    }) {

        if (!mask) {
            return;
        }

        if (children === undefined) {
            children = parent.getAllChildren();
        }

        var hasAnyVisibleCallback = !!onVisible || !!onInvisible;

        var parentBounds = parent.getBounds();
        var maskGameObject = MaskToGameObject(mask);

        var child, childBounds, visiblePointsNumber;
        var isChildVisible;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            child = children[i];

            if (child === maskGameObject) {
                continue;
            }
            if (!IsVisible(child)) {  // Child is invisible before masking
                continue;
            }

            isChildVisible = child.visible;
            if (child.getBounds) {
                childBounds = child.getBounds(childBounds);
                visiblePointsNumber = ContainsPoints(parentBounds, childBounds);
                switch (visiblePointsNumber) {
                    case 4: // 4 points are all inside visible window, set visible                     
                        ShowAll(parent, child);
                        break;
                    case 0: // No point is inside visible window
                        // Parent intersects with child, or parent is inside child, set visible, and apply mask
                        if (Intersects(parentBounds, childBounds) || Overlaps(parentBounds, childBounds)) {
                            ShowSome(parent, child, mask);
                        } else { // Set invisible
                            ShowNone(parent, child);
                        }
                        break;
                    default: // Part of points are inside visible window, set visible, and apply mask
                        ShowSome(parent, child, mask);
                        break;
                }
            } else {
                ShowSome(parent, child, mask);
            }

            if (hasAnyVisibleCallback && (child.visible !== isChildVisible)) {
                var callback = (child.visible) ? onVisible : onInvisible;
                if (callback) {
                    if (scope) {
                        callback.call(scope, child, parent);
                    } else {
                        callback(child, parent);
                    }
                }
            }
        }
    };

    var IsVisible = function (gameObject) {
        if (!gameObject.displayList) {
            return false;
        }

        while (1) {
            var localState = gameObject.rexContainer;
            if (!localState) { // Top game object
                return gameObject.visible;
            } else if (localState.visible) {
                var parent = localState.parent;
                if (parent) { // Test parent's visible
                    gameObject = parent;
                    continue;
                } else { // Top visible game object
                    return true;
                }
            } else { // Current game object is invisible
                return false;
            }
        }
    };

    var ContainsPoints = function (rectA, rectB) {
        var top = rectB.top,
            bottom = rectB.bottom,
            left = rectB.left,
            right = rectB.right;

        var result = 0;
        result += rectA.contains(left, top) ? 1 : 0;
        result += rectA.contains(left, bottom) ? 1 : 0;
        result += rectA.contains(right, top) ? 1 : 0;
        result += rectA.contains(right, bottom) ? 1 : 0;
        return result;
    };

    var ShowAll = function (parent, child, mask) {
        if (!child.hasOwnProperty('isRexContainerLite')) {
            if (child.clearMask) {
                child.clearMask();
            }

            parent.setChildMaskVisible(child, true);

        } else {
            child.syncChildrenEnable = false;
            parent.setChildMaskVisible(child, true);
            child.syncChildrenEnable = true;

        }

    };

    var ShowSome = function (parent, child, mask) {
        if (!child.hasOwnProperty('isRexContainerLite')) {
            if (child.setMask) {
                child.setMask(mask);
            }

            parent.setChildMaskVisible(child, true);

        } else {
            child.syncChildrenEnable = false;
            parent.setChildMaskVisible(child, true);
            child.syncChildrenEnable = true;

        }

    };

    var ShowNone = function (parent, child, mask) {
        if (!child.hasOwnProperty('isRexContainerLite')) {
            if (child.clearMask) {
                child.clearMask();
            }

            parent.setChildMaskVisible(child, false);

        } else {
            child.syncChildrenEnable = false;
            parent.setChildMaskVisible(child, false);
            child.syncChildrenEnable = true;

        }


    };

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    const MASKUPDATEMODE = {
        update: 0,
        everyTick: 1
    };

    var ChildrenMaskMethods = {
        setupChildrenMask(config) {
            if (config === false) {
                // No children mask
                return this;
            }

            this.setMaskUpdateMode(GetValue$6(config, 'updateMode', 0));
            this.enableChildrenMask(GetValue$6(config, 'padding', 0));
            this.setMaskLayer(GetValue$6(config, 'layer', undefined));

            this.onMaskGameObjectVisible = GetValue$6(config, 'onVisible');
            this.onMaskGameObjectInvisible = GetValue$6(config, 'onInvisible');
            this.maskGameObjectCallbackScope = GetValue$6(config, 'scope');

            this.startMaskUpdate();

            return this;
        },

        destroyChildrenMask() {
            if (!this.childrenMask) {
                return this;
            }

            this.stopMaskUpdate();
            this.childrenMask.destroy();
            this.childrenMask = undefined;

            this.onMaskGameObjectVisible = null;
            this.onMaskGameObjectInvisible = null;
            this.maskGameObjectCallbackScope = null;

            return this;
        },

        setMaskUpdateMode(mode) {
            if (typeof (mode) === 'string') {
                mode = MASKUPDATEMODE[mode];
            }
            this.maskUpdateMode = mode;
            return this;
        },

        startMaskUpdate() {
            this.scene.game.events.on('poststep', this.maskChildren, this);
        },

        stopMaskUpdate() {
            this.scene.game.events.off('poststep', this.maskChildren, this);
        },

        enableChildrenMask(maskPadding) {
            var maskGameObject = AddChildMask.call(this, null, this, 0, maskPadding);
            this.childrenMask = maskGameObject.createGeometryMask();
            // this.childrenMask is a mask object, not a (Graphics) game object
            return this;
        },

        setMaskChildrenFlag(value) {
            if (value === undefined) {
                value = true;
            }
            this.maskChildrenFlag = value;
            return this;
        },

        setMaskLayer(layer) {
            // To reduce amount of masked game object
            this.maskLayer = layer;
            return this;
        },

        maskChildren() {
            if (
                (!this.childrenMask) ||                // No childrenMask
                (!this.maskChildrenFlag) ||            // No maskChildrenFlag set
                (this.alpha === 0) || (!this.visible)  // Parent is not visible
            ) {
                return this;
            }

            if (this.privateRenderLayer) {
                this.privateRenderLayer.setMask(this.childrenMask);

            } else if (this.maskLayer) {
                // 1. Add parent and children into layer
                this.addToLayer(this.maskLayer);
                // 2. Mask this layer
                this.maskLayer.setMask(this.childrenMask);

            } else {
                MaskChildren({
                    parent: this,
                    mask: this.childrenMask,

                    onVisible: this.onMaskGameObjectVisible,
                    onInvisible: this.onMaskGameObjectInvisible,
                    scope: this.maskGameObjectCallbackScope
                });

            }

            if (this.maskUpdateMode === 0) {
                this.maskChildrenFlag = false;
            }
            return this;
        },

        layoutChildrenMask() {
            if (!this.childrenMask) {
                return this;
            }

            var maskGameObject = MaskToGameObject(this.childrenMask);
            maskGameObject.setPosition().resize();
            this.resetChildPositionState(maskGameObject);
            return this;
        }
    };

    var methods$1 = {
        getChildrenWidth: GetChildrenWidth,
        getChildrenHeight: GetChildrenHeight,
        getChildrenSizers: GetChildrenSizers,
        resetChildPosition: ResetChildPosition,
        layoutChildren: LayoutChildren,
        removeChildCallback: RemoveChildCallback,
    };

    Object.assign(
        methods$1,
        ChildrenMaskMethods
    );

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$5 = Phaser.Utils.Objects.GetValue;
    const ALIGN_LEFTTOP = Phaser.Display.Align.TOP_LEFT;

    class ScrollableBlock extends Base$1 {
        constructor(scene, x, y, minWidth, minHeight, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue$5(config, 'x', 0);
                y = GetValue$5(config, 'y', 0);
                minWidth = GetValue$5(config, 'width', undefined);
                minHeight = GetValue$5(config, 'height', undefined);
            } else if (IsPlainObject(minWidth)) {
                config = minWidth;
                minWidth = GetValue$5(config, 'width', undefined);
                minHeight = GetValue$5(config, 'height', undefined);
            }
            super(scene, x, y, minWidth, minHeight, config);

            this.type = 'rexScrollableBlock';
            this.child = undefined;
            this.childrenMask = undefined;
            this._childOY = 0;
            this._childOX = 0;
            this.execeedTopState = false;
            this.execeedBottomState = false;
            this.execeedLeftState = false;
            this.execeedRightState = false;

            this.setScrollMode(GetValue$5(config, 'scrollMode', 0));

            var clampChildOY = GetValue$5(config, 'clampChildOY', true);
            var clampChildOX = GetValue$5(config, 'clampChildOX', clampChildOY);
            this.setClampMode(clampChildOY, clampChildOX);

            // Add elements
            // No background object, and child does not have padding
            var child = GetValue$5(config, 'child', undefined);
            var expand = GetValue$5(config, 'expand', true);

            if (child.setOrigin) {
                child.setOrigin(0);
            }

            this.add(child);
            this.sizerChildren = [child];

            var sizerConfig = this.getSizerConfig(child);
            sizerConfig.align = ALIGN_LEFTTOP;
            sizerConfig.expand = expand;
            this.child = child;

            // Create mask of child object
            var maskConfig = GetValue$5(config, 'mask');
            this.setupChildrenMask(maskConfig);

            if (this.childrenMask) {
                this.maskGameObject = MaskToGameObject(this.childrenMask);
            }
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.destroyChildrenMask();

            this.child = undefined;

            super.destroy(fromScene);
        }

        setScrollMode(mode) {
            if (typeof (mode) === 'string') {
                mode = SCROLLMODE[mode.toLowerCase()];
            }
            this.scrollMode = mode;
            return this;
        }

        setClampMode(clampChildOY, clampChildOX) {
            this.clampChildOY = clampChildOY;
            this.clampChildOX = clampChildOX;
            return this;
        }

        get instHeight() {
            if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
                return this.displayHeight;
            } else { // scrollMode === 1
                return this.displayWidth;
            }
        }

        get instWidth() {
            if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
                return this.displayWidth;
            } else { // scrollMode === 1
                return this.displayHeight;
            }
        }

        get childHeight() {
            if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
                return GetDisplayHeight(this.child);
            } else { // scrollMode === 1
                return GetDisplayWidth(this.child);
            }
        }

        get childWidth() {
            if ((this.scrollMode === 0) || (this.scrollMode === 2)) {
                return GetDisplayWidth(this.child);
            } else { // scrollMode === 1
                return GetDisplayHeight(this.child);
            }
        }

        get topChildOY() {
            return 0;
        }

        get bottomChildOY() {
            return -this.visibleHeight;
        }

        get leftChildOX() {
            return 0;
        }

        get rightChildOX() {
            return -this.visibleWidth;
        }

        get childVisibleHeight() {
            return this.instHeight;
        }

        get childVisibleWidth() {
            return this.instWidth;
        }

        get visibleHeight() {
            var h = this.childHeight - this.childVisibleHeight;
            if (h < 0) {
                h = 0;
            }
            return h;
        }

        get visibleWidth() {
            var w = this.childWidth - this.childVisibleWidth;
            if (w < 0) {
                w = 0;
            }
            return w;
        }

        childOYExceedTop(oy) {
            if (oy === undefined) {
                oy = this.childOY;
            }
            return (oy > this.topChildOY);
        }

        childOYExeceedBottom(oy) {
            if (oy === undefined) {
                oy = this.childOY;
            }
            return (oy < this.bottomChildOY);
        }

        childOXExceedLeft(ox) {
            if (ox === undefined) {
                ox = this.childOX;
            }
            return (ox > this.leftChildOX);
        }

        childOXExeceedRight(ox) {
            if (ox === undefined) {
                ox = this.childOX;
            }
            return (ox < this.rightChildOX);
        }

        get childOY() {
            return this._childOY;
        }

        set childOY(oy) {
            var topChildOY = this.topChildOY;
            var bottomChildOY = this.bottomChildOY;
            var childOYExceedTop = this.childOYExceedTop(oy);
            var childOYExeceedBottom = this.childOYExeceedBottom(oy);

            if (this.clampChildOY) {
                if (this.childVisibleHeight > this.childHeight) {
                    oy = 0;
                } else if (childOYExceedTop) {
                    oy = topChildOY;
                } else if (childOYExeceedBottom) {
                    oy = bottomChildOY;
                }
            }

            if (this._childOY !== oy) {
                this._childOY = oy;
                this.resetChildPosition();
            }

            if (childOYExceedTop) {
                if (!this.execeedTopState) {
                    this.emit('execeedtop', this, oy, topChildOY);
                }
            }
            this.execeedTopState = childOYExceedTop;

            if (childOYExeceedBottom) {
                if (!this.execeedBottomState) {
                    this.emit('execeedbottom', this, oy, bottomChildOY);
                }
            }
            this.execeedBottomState = childOYExeceedBottom;
        }

        get childOX() {
            return this._childOX;
        }

        set childOX(ox) {
            var leftChildOX = this.leftChildOX;
            var rightChildOX = this.rightChildOX;
            var childOXExceedLeft = this.childOXExceedLeft(ox);
            var childOXExeceedRight = this.childOXExeceedRight(ox);

            if (this.clampChildOX) {
                if (this.childVisibleWidth > this.childWidth) {
                    ox = 0;
                } else if (childOXExceedLeft) {
                    ox = leftChildOX;
                } else if (childOXExeceedRight) {
                    ox = rightChildOX;
                }
            }

            if (this._childOX !== ox) {
                this._childOX = ox;
                this.resetChildPosition();
            }

            if (childOXExceedLeft) {
                if (!this.execeedLeftState) {
                    this.emit('execeedleft', this, ox, leftChildOX);
                }
            }
            this.execeedLeftState = childOXExceedLeft;

            if (childOXExeceedRight) {
                if (!this.execeedRightState) {
                    this.emit('execeedright', this, ox, rightChildOX);
                }
            }
            this.execeedRightState = childOXExeceedRight;
        }

        setChildOY(oy) {
            this.childOY = oy;
            return this;
        }

        setChildOX(ox) {
            this.childOX = ox;
            return this;
        }

        set t(value) {
            this.childOY = -this.visibleHeight * value;
        }

        get t() {
            var visibleHeight = this.visibleHeight;
            if (visibleHeight === 0) {
                return 0;
            }
            return (this.childOY / -visibleHeight);
        }

        set s(value) {
            this.childOX = -this.visibleWidth * value;
        }

        get s() {
            var visibleWidth = this.visibleWidth;
            if (visibleWidth === 0) {
                return 0;
            }
            return (this.childOX / -visibleWidth);
        }

        setChildOYByPercentage(percentage) {
            this.t = percentage;
            return this;
        }

        setChildOXByPercentage(percentage) {
            this.s = percentage;
            return this;
        }
    }

    Object.assign(
        ScrollableBlock.prototype,
        methods$1
    );

    var ScrollToChild = function (child, align) {
        if (!this.hasChild(child)) {
            return this;
        }

        switch (this.scrollMode) {
            case 0:
                AlignChild.call(this, child, 'y', align);
                break;

            case 1:
                AlignChild.call(this, child, 'x', align);
                break;

            default:
                AlignChild.call(this, child, 'y', align);
                AlignChild.call(this, child, 'x', align);
                break;
        }

        return this;
    };

    const AlignYModes = ['top', 'bottom', 'centerY', 'center'];
    const AlignXModes = ['left', 'right', 'centerX', 'center'];

    var AlignChild = function (child, axis, align) {
        axis = axis.toUpperCase();
        var isAxisY = (axis === 'Y');

        var scrollableBlock = this.childrenMap.child;
        var delta;
        if (isAxisY) {
            if (align) {
                for (var i = 0, cnt = AlignYModes.length; i < cnt; i++) {
                    var modeName = AlignYModes[i];
                    if (align.indexOf(modeName) !== -1) {
                        align = modeName;
                        break;
                    }
                }
            }

            switch (align) {
                case 'top':
                    delta = scrollableBlock.top - GetTopLeft(child).y;
                    break;

                case 'bottom':
                    delta = scrollableBlock.bottom - GetBottomLeft(child).y;
                    break;

                case 'centerY':
                case 'center':
                    delta = scrollableBlock.centerY - GetCenter(child).y;
                    break;

                default:
                    var dTop = scrollableBlock.top - GetTopLeft(child).y;
                    var dBottom = scrollableBlock.bottom - GetBottomLeft(child).y;
                    if ((dTop <= 0) && (dBottom >= 0)) {
                        delta = 0;
                    } else {
                        delta = (Math.abs(dTop) <= Math.abs(dBottom)) ? dTop : dBottom;
                    }
                    break;
            }
        } else {
            if (align) {
                for (var i = 0, cnt = AlignXModes.length; i < cnt; i++) {
                    var modeName = AlignXModes[i];
                    if (align.indexOf(modeName) !== -1) {
                        align = modeName;
                        break;
                    }
                }
            }

            switch (align) {
                case 'left':
                    delta = scrollableBlock.left - GetTopLeft(child).x;
                    break;

                case 'right':
                    delta = scrollableBlock.right - GetTopRight(child).x;
                    break;

                case 'centerX':
                case 'center':
                    delta = scrollableBlock.centerX - GetCenter(child).x;
                    break;

                default:
                    var dLeft = scrollableBlock.left - GetTopLeft(child).x;
                    var dRight = scrollableBlock.right - GetTopRight(child).x;
                    if ((dLeft <= 0) && (dRight >= 0)) {
                        delta = 0;
                    } else {
                        delta = (Math.abs(dLeft) <= Math.abs(dRight)) ? dLeft : dRight;
                    }
                    break;
            }
        }

        switch (this.scrollMode) {
            case 0:
            case 1:
                this.childOY += delta;
                break;

            default:
                this[`childO${axis}`] += delta;
                break;
        }
    };

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class ScrollablePanel extends Scrollable {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            // Create scrollable-block
            var scrollMode = GetScrollMode(config);
            var panelConfig = GetValue$4(config, 'panel', undefined);
            if (panelConfig === undefined) {
                panelConfig = {};
            }
            panelConfig.scrollMode = scrollMode;
            panelConfig.clampChildOY = GetValue$4(config, 'clampChildOY', false);
            panelConfig.clampChildOX = GetValue$4(config, 'clampChildOX', false);
            var scrollableBlock = new ScrollableBlock(scene, panelConfig);
            scene.add.existing(scrollableBlock); // Important: Add to display list for touch detecting

            var expandPanelWidth,
                expandPanelHeight;
            switch (scrollMode) {
                case 0:
                    expandPanelWidth = GetValue$4(config, 'expand.panel', true);
                    expandPanelHeight = true;
                    break;

                case 1:
                    expandPanelWidth = true;
                    expandPanelHeight = GetValue$4(config, 'expand.panel', true);
                    break;

                default: // 2
                    expandPanelWidth = true;
                    expandPanelHeight = true;
            }

            // Fill config of scrollable
            config.type = 'rexScrollablePanel';
            config.child = {
                gameObject: scrollableBlock,
                expandWidth: expandPanelWidth,
                expandHeight: expandPanelHeight,
                align: GetValue$4(config, 'align.panel', 'center')
            };
            var spaceConfig = GetValue$4(config, 'space', undefined);
            if (spaceConfig) {
                spaceConfig.child = GetValue$4(spaceConfig, 'panel', 0);
            }
            super(scene, config);

            this.addChildrenMap('panel', scrollableBlock.child);
            this.addChildrenMap('panelLayer', scrollableBlock.maskLayer);
            this.addChildrenMap('mask', scrollableBlock.maskGameObject);
            this.addChildrenMap('scrollableBlock', scrollableBlock);
        }

        setChildrenInteractive(config) {
            if (config === undefined) {
                config = {};
            }

            if (!config.hasOwnProperty('eventEmitter')) {
                config.eventEmitter = this;
            }

            if (!config.hasOwnProperty('targets')) {
                config.targets = [this.childrenMap.panel];
            }

            SetChildrenInteractive$1(this.childrenMap.child, config);
            return this;
        }
    }

    var methods = {
        scrollToChild: ScrollToChild
    };

    Object.assign(
        ScrollablePanel.prototype,
        methods,
    );

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    var CreateListPanel = function () {
        var scene = this.scene;

        var background;
        var createBackgroundCallback = this.listCreateBackgroundCallback;
        if (createBackgroundCallback) {
            background = createBackgroundCallback.call(this, scene);
            scene.add.existing(background);
        }

        var buttons = [];
        var createButtonCallback = this.listCreateButtonCallback;
        if (createButtonCallback) {
            var options = this.options;
            for (var i = 0, cnt = options.length; i < cnt; i++) {
                var button = createButtonCallback.call(this, scene, options[i], i, options);
                if (!button) {
                    continue;
                }
                scene.add.existing(button);
                buttons.push(button);
            }
        }

        var width = this.listWidth;
        if (width === undefined) {
            if (this.listAlignMode === 'text') {
                width = this.getElement('text').width;
            } else {
                width = this.width;
            }
        }

        var height = this.listHeight;

        var buttonConfig = {
            width: width,
            buttons: buttons,
            space: this.listSpace,
        };

        var buttons, listPanel;

        var isScrollable;
        if (this.listCreateSliderThumbCallback) {
            isScrollable = (height > 0) || (this.listMaxHeight > 0);
        } else {
            isScrollable = false;
        }

        if (!isScrollable) {
            buttonConfig.height = height;
            buttons = CreateButtons(scene, buttonConfig, this.listWrapEnable);
            listPanel = buttons;

        } else {
            var buttons = CreateButtons(scene, buttonConfig, this.listWrapEnable);

            if (this.listMaxHeight > 0) {
                buttons.layout();
                if (buttons.height <= this.listMaxHeight) {
                    listPanel = buttons;
                }
            }

            if (!listPanel) {
                if (height === 0) {
                    height = this.listMaxHeight;
                }

                var track = CreateGameObject(scene, this.listCreateSliderTrackCallback);
                var thumb = CreateGameObject(scene, this.listCreateSliderThumbCallback);

                listPanel = new ScrollablePanel(scene, {
                    height: height,
                    scrollMode: 0,

                    panel: {
                        child: buttons,
                        mask: {
                            padding: 1,
                        },
                    },

                    slider: {
                        track: track,
                        thumb: thumb,

                        adaptThumbSize: this.listSliderAdaptThumbSizeEnable,
                    },

                    scrollDetectionMode: 1,

                    scroller: this.listScrollerConfig,

                    mouseWheelScroller: this.listMouseWheelScrollerConfig,

                    space: {
                        panel: GetValue$3(this.listSpace, 'panel', 0),
                    },
                });
                scene.add.existing(listPanel);
            }
        }

        if (background) {
            listPanel.addBackground(background, 'background');
        }

        if (this.listDraggable) {
            listPanel.setDraggable(true);
        }

        if (listPanel !== buttons) {
            // Route buttons' events to listPanel
            buttons
                .on('button.over', function (button, index, pointer, event) {
                    listPanel.emit('button.over', button, index, pointer, event);
                })
                .on('button.out', function (button, index, pointer, event) {
                    listPanel.emit('button.out', button, index, pointer, event);
                })
                .on('button.click', function (button, index, pointer, event) {
                    listPanel.emit('button.click', button, index, pointer, event);
                });
        }

        return listPanel;
    };

    var CreateButtons = function (scene, config, isWrapEnable) {
        var gameObject;
        if (!isWrapEnable) {
            config.orientation = 'y';
            gameObject = new Buttons$1(scene, config);
        } else {
            config.orientation = 'x';
            gameObject = new Buttons(scene, config);
        }
        scene.add.existing(gameObject);
        return gameObject;
    };

    var CreateGameObject = function (scene, callback, scope) {
        var gameObject;
        if (callback) {
            gameObject = callback.call(scope, scene);
            scene.add.existing(gameObject);
        }

        return gameObject;
    };

    var ScaleDown = function (gameObject, duration, orientation, ease, scale) {
        if (ease === undefined) {
            ease = 'Linear';
        }

        var config = {};
        config.mode = 0;
        switch (orientation) {
            case 0:
            case 'x':
                config.end = {
                    x: 0
                };
                break;
            case 1:
            case 'y':
                config.end = {
                    y: 0
                };
                break;
            default:
                config.end = 0;
                break;
        }
        config.duration = duration;
        config.ease = ease;

        if (scale === undefined) {
            scale = new Scale$1(gameObject, config);
        } else {
            scale.resetFromJSON(config);
        }
        scale.restart();

        return scale;
    };

    var HasValue = function (source, key) {
        if (!source || typeof source === 'number') {
            return false;
        }
        else if (source.hasOwnProperty(key)) {
            return true;
        }
        else if (key.indexOf('.') !== -1) {
            var keys = key.split('.');
            var parent = source;

            //  Use for loop here so we can break early
            for (var i = 0; i < keys.length; i++) {
                if (parent.hasOwnProperty(keys[i])) {
                    parent = parent[keys[i]];
                }
                else {
                    //  Can't go any further
                    return false;
                }
            }

            return true;
        }
        else {
            return false;
        }
    };

    var GetValueFromAliasKeys = function (source, key0, key1, key2, defaultValue) {
        if (HasValue(source, key0)) {
            return GetValue$15(source, key0);
        } else if (key1 && HasValue(source, key1)) {
            return GetValue$15(source, key1);
        } else if (key2 && HasValue(source, key2)) {
            return GetValue$15(source, key2);
        } else {
            return defaultValue;
        }

    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var SetPosition = function (gameObject, config) {
        var expandDirection = GetValue$2(config, 'expandDirection', undefined);
        if (typeof (expandDirection) === 'string') {
            expandDirection = ExpandDirections[expandDirection];
        }
        var alignTargetX = GetValueFromAliasKeys(config, 'alignTarget', 'alignTargetX');
        var alignTargetY = GetValue$2(config, 'alignTargetY', alignTargetX);
        var alignOffsetX = GetValue$2(config, 'alignOffsetX', 0);
        var alignOffsetY = GetValue$2(config, 'alignOffsetY', 0);
        var alignSide = GetValue$2(config, 'alignSide', '');
        var alignRight = alignSide.includes('right');

        var positionBounds = GetValue$2(config, 'bounds');

        // Expand direction
        var isExpandDown = (expandDirection === 0);
        var isExpandUp = (expandDirection === 1);
        var flexExpand = !isExpandDown && !isExpandUp;

        var originX = (alignRight) ? 1 : 0;
        var originY = (isExpandDown || flexExpand) ? 0 : 1;
        gameObject.setOrigin(originX, originY);

        var x, y;
        if (alignRight) {
            x = alignTargetX.getTopRight().x;
        } else {
            x = alignTargetX.getTopLeft().x;
        }

        y = alignTargetY.getBottomLeft().y;
        gameObject.setPosition(
            x + alignOffsetX,
            y + alignOffsetY
        );

        var bounds = positionBounds;
        if (!bounds) {
            bounds = GetViewport(gameObject.scene);
        }

        if (flexExpand && (gameObject.getBottomLeft().y > bounds.bottom)) {
            // Out of bounds, can't put list-panel below parent
            y = alignTargetY.getTopLeft().y;
            gameObject
                .setOrigin(0, 1)
                .setPosition(
                    x + alignOffsetX,
                    y + alignOffsetY
                );
        }

    };

    const ExpandDirections = {
        down: 0,
        up: 1
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class DropDown extends OpenCloseTransition {
        constructor(gameObject, config) {
            if (config === undefined) {
                config = {};
            }
            if (config.transitIn == null) {
                config.transitIn = function (gameObject, duration) {
                    PopUp(gameObject, duration, 'y', 'Cubic');
                };
            }
            if (config.transitOut == null) {
                config.transitOut = function (gameObject, duration) {
                    // Don't destroy here
                    ScaleDown(gameObject, duration, 'y', 'Linear');
                };
            }
            config.manualClose = true;
            config.clickOutsideClose = true;
            config.destroy = true;

            super(gameObject, config);
            // this.parent = gameObject;
            // this.scene

            SetPosition(gameObject, config);

            if (gameObject.isRexSizer) {
                gameObject.layout();
            }

            // Close conditions:
            var touchOutsideClose = GetValue$1(config, 'touchOutsideClose', false);
            var anyTouchClose = GetValue$1(config, 'anyTouchClose', false);

            if (anyTouchClose) {
                touchOutsideClose = false;
            }

            // Registet touch-close event after opened
            if (anyTouchClose) {
                this.once('open', this.anyTouchClose, this);
            } else if (touchOutsideClose) {
                this.once('open', this.touchOutsideClose, this);
            }

            this.requestOpen();
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // Registered in touchOutsideClose()
            this.scene.input.off('pointerup', this.touchCloseCallback, this);

            super.shutdown(fromScene);
        }

        touchOutsideClose() {
            this.scene.input.on('pointerup', this.touchCloseCallback, this);
            this.clickOutsideTest = true;
            return this;
        }

        anyTouchClose() {
            this.scene.input.once('pointerup', this.touchCloseCallback, this);
            return this;
        }

        touchCloseCallback(pointer) {
            if (this.clickOutsideTest && IsPointInBounds(this.parent, pointer.worldX, pointer.worldY)) {
                return;
            }
            this.requestClose();
        }

        onOpen() {
            this.emit('open', this.parent, this);
            super.onOpen();
        }

        onClose() {
            this.emit('close', this.parent, this);
            super.onClose();
        }

    }

    var OpenListPanel = function () {
        if (this.listPanel) {
            return this;
        }

        if (this.options.length === 0) {
            return this;
        }

        var listPanel = CreateListPanel.call(this);

        // Button over/out
        listPanel
            .on('button.over', function (button, index, pointer, event) {
                this.currentOverIndex = index;

                if (this.listOnButtonOver) {
                    this.listOnButtonOver.call(this, button, index, pointer, event);
                }

                this.emit('button.over', this, listPanel, button, index, pointer, event);
            }, this)
            .on('button.out', function (button, index, pointer, event) {
                if (this.currentOverIndex === index) {
                    this.currentOverIndex = undefined;
                }

                if (this.listOnButtonOut) {
                    this.listOnButtonOut.call(this, button, index, pointer, event);
                }

                this.emit('button.out', this, listPanel, button, index, pointer, event);
            }, this);


        var alignTargetX;
        if (!this.listAlignMode || (this.listAlignMode === 'label')) {
            alignTargetX = this;
        } else {
            alignTargetX = this.getElement(this.listAlignMode);
        }

        var dropDownBehavior = new DropDown(listPanel, {
            // Transition
            duration: {
                in: this.listEaseInDuration,
                out: this.listEaseOutDuration
            },
            transitIn: this.listTransitInCallback,
            transitOut: this.listTransitOutCallback,

            // Position
            expandDirection: this.listExpandDirection,

            alignTargetX: alignTargetX,
            alignTargetY: this,
            alignSide: this.listAlignSide,

            bounds: this.listBounds,

            // Close condition        
        })
            .on('open', function () {
                // After popping up
                // Can click
                listPanel
                    .on('button.click', function (button, index, pointer, event) {
                        if (this.listOnButtonClick) {
                            this.listOnButtonClick.call(this, button, index, pointer, event);
                        }
                        this.emit('button.click', this, listPanel, button, index, pointer, event);
                        this.dropDownBehavior.requestClose();
                    }, this);

                this.emit('list.open', this, listPanel);
            }, this)

            .on('close', function () {
                this.listPanel = undefined;
                this.dropDownBehavior = undefined;

                this.emit('list.close', this);
            }, this);

        listPanel
            .onClickOutside(function () {
                dropDownBehavior.requestClose();
            });

        this.listPanel = listPanel;
        this.dropDownBehavior = dropDownBehavior;

        this.pin(listPanel);

        return this;
    };

    var CloseListPanel = function () {
        if (!this.dropDownBehavior) {
            return this;
        }

        this.dropDownBehavior.requestClose();
        this.currentOverIndex = undefined;

        return this;
    };

    var ToggleListPanel = function () {
        if (!this.listPanel) {
            this.openListPanel();
        } else {
            this.closeListPanel();
        }
        return this;
    };

    var EmitListButtonClick = function (index) {
        if (index === undefined) {
            index = this.currentOverIndex;
        }

        if (index === undefined) {
            return this;
        }

        var listPanel = this.listPanel;

        // Use option if listPanel is not created.
        var button = (listPanel) ? listPanel.getButton(index) : this.options[index];

        if (this.listOnButtonClick) {
            this.listOnButtonClick.call(this, button, index);
        }
        this.emit('button.click', this, listPanel, button, index);

        return this;
    };

    var EmitButtonOver = function (index) {
        var listPanel = this.listPanel;
        if (!listPanel) {
            return this;
        }

        listPanel.emitButtonOver(index);

        return this;
    };

    var FocusButtonMethods = {
        focusNextButton() {
            if (!this.isOpened) {
                return this;
            }

            var currentIndex = this.currentOverIndex;

            var nextIndex;
            if (currentIndex === undefined) {
                nextIndex = 0;
            } else {
                var total = this.listPanel.getButtons().length;
                nextIndex = (currentIndex + 1) % total;
            }

            this.emitButtonOver(nextIndex);

            return this;
        },

        focusPrevButton() {
            if (!this.isOpened) {
                return this;
            }

            var currentIndex = this.currentOverIndex;

            var nextIndex;
            if (currentIndex === undefined) {
                nextIndex = 0;
            } else {
                var total = this.listPanel.getButtons().length;
                nextIndex = (currentIndex - 1 + total) % total;
            }

            this.emitButtonOver(nextIndex);

            return this;
        }
    };

    var Methods = {
        openListPanel: OpenListPanel,
        closeListPanel: CloseListPanel,
        toggleListPanel: ToggleListPanel,
        emitButtonClick: EmitListButtonClick,
        emitButtonOver: EmitButtonOver,
    };

    Object.assign(
        Methods,
        methods$6,
        FocusButtonMethods,
    );

    const GetValue = Phaser.Utils.Objects.GetValue;

    class DropDownList extends Label {
        constructor(scene, config) {
            super(scene, config);
            this.type = 'rexDropDownList';
            this.timer = undefined;
            this.listPanel = undefined;
            this.currentOverIndex = undefined;

            this.setOptions(GetValue(config, 'options'));

            var listConfig = GetValue(config, 'list');
            this.setWrapEnable(GetValue(listConfig, 'wrap', false));
            this.setCreateButtonCallback(GetValue(listConfig, 'createButtonCallback'));
            this.setCreateListBackgroundCallback(GetValue(listConfig, 'createBackgroundCallback'));
            this.setCreateListSliderTrackCallback(GetValue(listConfig, 'createTrackCallback'));
            this.setCreateListSliderThumbCallback(GetValue(listConfig, 'createThumbCallback'));
            this.setListSliderAdaptThumbSizeEnable(GetValue(listConfig, 'sliderAdaptThumbSize', false));
            this.setListScrollerConfig(GetValue(listConfig, 'scroller'));
            this.setListMouseWheelScrollerConfig(GetValue(listConfig, 'mouseWheelScroller'));
            this.setButtonClickCallback(GetValue(listConfig, 'onButtonClick'));
            this.setButtonOverCallback(GetValue(listConfig, 'onButtonOver'));
            this.setButtonOutCallback(GetValue(listConfig, 'onButtonOut'));
            this.setListExpandDirection(GetValue(listConfig, 'expandDirection'));
            this.setListEaseInDuration(GetValue(listConfig, 'easeIn', 500));
            this.setListEaseOutDuration(GetValue(listConfig, 'easeOut', 100));
            this.setListTransitInCallback(GetValue(listConfig, 'transitIn'));
            this.settListTransitOutCallback(GetValue(listConfig, 'transitOut'));
            this.setListMaxHeight(GetValue(listConfig, 'maxHeight', 0));
            this.setListSize(GetValue(listConfig, 'width'), GetValue(listConfig, 'height', 0));
            this.setListAlignmentMode(GetValue(listConfig, 'alignParent', 'text'));
            this.setListAlignmentSide(GetValue(listConfig, 'alignSide', ''));
            this.setListBounds(GetValue(listConfig, 'bounds'));
            this.setListSpace(GetValue(listConfig, 'space'));
            this.setListDraggable(GetValue(listConfig, 'draggable', false));

            this.setValueChangeCallback(
                GetValue(config, 'setValueCallback'),
                GetValue(config, 'setValueCallbackScope')
            );
            this.setValue(GetValue(config, 'value'));

            this.onClick(this.toggleListPanel, this);
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            if (this.listPanel) {
                this.listPanel.destroy(fromScene);
                this.listPanel = undefined;
            }

            super.destroy(fromScene);
        }

        get isOpened() {
            return !!this.listPanel;
        }

        setOptions(options) {
            if (options === undefined) {
                options = [];
            }
            this.options = options;
            return this;
        }

        setValueChangeCallback(callback, scope) {
            this.valueChangeCallback = callback;
            this.valueChangeCallbackScope = scope;
            return this;
        }

        setValue(value) {
            this.value = value;
            return this;
        }

        get value() {
            return this._value;
        }

        set value(value) {
            if (this._value === value) {
                return;
            }

            var previousValue = this._value;
            this._value = value;

            var callback = this.valueChangeCallback,
                scope = this.valueChangeCallbackScope;
            if (callback) {
                if (scope) {
                    callback.call(scope, this, value, previousValue);
                } else {
                    callback(this, value, previousValue);
                }
            }

            this.emit('valuechange', this, value, previousValue);

        }

    }

    Object.assign(
        DropDownList.prototype,
        Methods,
    );

    return DropDownList;

}));
