(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexfolder = factory());
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
    const RemoveItem$4 = Phaser.Utils.Array.Remove;

    let Base$1 = class Base extends Zone$1 {
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
            RemoveItem$4(this.children, gameObjects,
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

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Base$1,
        [
            Components.Alpha,
            Components.Flip
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

    const DegToRad$2 = Phaser.Math.DegToRad;
    const RadToDeg$2 = Phaser.Math.RadToDeg;

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
                    return RadToDeg$2(this.rotation);
                },
                set: function (value) {
                    this.rotation = DegToRad$2(value);
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

    const GetValue$H = Phaser.Utils.Objects.GetValue;
    const BaseAdd = Base$1.prototype.add;

    var Add$1 = function (gameObject, config) {
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
            state.syncPosition = GetValue$H(config, 'syncPosition', true);
            state.syncRotation = GetValue$H(config, 'syncRotation', true);
            state.syncScale = GetValue$H(config, 'syncScale', true);
            state.syncAlpha = GetValue$H(config, 'syncAlpha', true);
            state.syncScrollFactor = GetValue$H(config, 'syncScrollFactor', true);
            state.syncCameraFilter = GetValue$H(config, 'syncCameraFilter', true);
            state.syncDisplayList = GetValue$H(config, 'syncDisplayList', true);
        }

    };

    var SyncDisplayList = function (gameObject, state) {
        this.addToParentContainer(gameObject);     // Sync parent's container to child

        if (state.syncDisplayList) {
            this.addToPatentLayer(gameObject);     // Sync parent's layer to child
        }

        this.addToRenderLayer(gameObject);         // Sync parent's render-layer
    };

    var AddChild$1 = {
        // Can override this method
        add(gameObject) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject);
            } else {
                Add$1.call(this, gameObject);
            }
            return this;
        },

        // Don't override this method
        pin(gameObject, config) {
            if (Array.isArray(gameObject)) {
                this.addMultiple(gameObject, config);
            } else {
                Add$1.call(this, gameObject, config);
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

    const BaseRemove = Base$1.prototype.remove;
    const BaseClear = Base$1.prototype.clear;

    var RemoveChild$1 = {
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

    const DegToRad$1 = Phaser.Math.DegToRad;

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
            localState.rotation = DegToRad$1(angle);
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

    var Scale$1 = {
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

    const Rectangle$3 = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround$2 = Phaser.Math.RotateAround;
    const P3Container$1 = Phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$3();
        } else if (output === true) {
            if (GlobRect$2 === undefined) {
                GlobRect$2 = new Rectangle$3();
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

    var GlobVector = undefined;

    var PrepareBoundsOutput = function (gameObject, output, includeParent) {
        if (includeParent === undefined) { includeParent = false; }

        if (gameObject.rotation !== 0) {
            RotateAround$2(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const Rectangle$2 = Phaser.Geom.Rectangle;
    const Union = Phaser.Geom.Rectangle.Union;

    var GetBoundsOfGameObjects = function (gameObjects, out) {
        if (out === undefined) {
            out = new Rectangle$2();
        } else if (out === true) {
            if (GlobRect$1 === undefined) {
                GlobRect$1 = new Rectangle$2();
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

    var GetValue$G = Phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
        var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
        var saveTexture = config.saveTexture;
        var x = GetValue$G(config, 'x', undefined);
        var y = GetValue$G(config, 'y', undefined);
        var width = GetValue$G(config, 'width', undefined);
        var height = GetValue$G(config, 'height', undefined);
        var originX = GetValue$G(config, 'originX', 0);
        var originY = GetValue$G(config, 'originY', 0);
        var padding = GetValue$G(config, 'padding', 0);

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

    var RenderTexture = {
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

    const GetValue$F = Phaser.Utils.Objects.GetValue;

    var DrawBounds$2 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$F(config, 'color');
            lineWidth = GetValue$F(config, 'lineWidth');
            fillColor = GetValue$F(config, 'fillColor');
            fillAlpha = GetValue$F(config, 'fillAlpha', 1);
            padding = GetValue$F(config, 'padding', 0);
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

    const GetValue$E = Phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (graphics, config) {
        var drawContainer = GetValue$E(config, 'drawContainer', true);

        var gameObjects = GetValue$E(config, 'children');
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

    const RotateAround$1 = Phaser.Math.RotateAround;

    var ChangeOrigin$1 = function (gameObject, originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var deltaXY = {
            x: (originX - gameObject.originX) * gameObject.displayWidth,
            y: (originY - gameObject.originY) * gameObject.displayHeight
        };
        RotateAround$1(deltaXY, 0, 0, gameObject.rotation);

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

    var methods$7 = {
        changeOrigin: ChangeOrigin,
        drawBounds: DrawBounds$1,
    };

    Object.assign(
        methods$7,
        Parent,
        AddChild$1,
        RemoveChild$1,
        ChildState,
        Transform,
        Position,
        Rotation,
        Scale$1,
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
        RenderTexture,
    );

    class ContainerLite extends Base$1 {
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
        methods$7
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

    const Rectangle$1 = Phaser.Geom.Rectangle;

    var GetViewport = function (scene, camera, out) {
        if (!IsCameraObject(camera)) {
            out = camera;
            camera = undefined;
        }

        if (out === undefined) {
            out = new Rectangle$1();
        } else if (out === true) {
            out = globRect;
        }

        if (camera) {
            return scene.scale.getViewPort(camera, out);
        } else {
            return scene.scale.getViewPort(out);
        }
    };

    var globRect = new Rectangle$1();

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

    const ALIGN = Phaser.Display.Align;
    var AlignConst = {
        center: ALIGN.CENTER,
        left: ALIGN.LEFT_CENTER,
        right: ALIGN.RIGHT_CENTER,
        top: ALIGN.TOP_CENTER,
        bottom: ALIGN.BOTTOM_CENTER,

        'left-top': ALIGN.TOP_LEFT,
        'top-left': ALIGN.TOP_LEFT,

        'left-center': ALIGN.LEFT_CENTER,
        'center-left': ALIGN.LEFT_CENTER,

        'left-bottom': ALIGN.BOTTOM_LEFT,
        'bottom-left': ALIGN.BOTTOM_LEFT,

        'center-top': ALIGN.TOP_CENTER,
        'top-center': ALIGN.TOP_CENTER,

        'center-center': ALIGN.CENTER,

        'center-bottom': ALIGN.BOTTOM_CENTER,
        'bottom-center': ALIGN.BOTTOM_CENTER,

        'right-top': ALIGN.TOP_RIGHT,
        'top-right': ALIGN.TOP_RIGHT,

        'right-center': ALIGN.RIGHT_CENTER,
        'center-right': ALIGN.RIGHT_CENTER,

        'right-bottom': ALIGN.BOTTOM_RIGHT,
        'bottom-right': ALIGN.BOTTOM_RIGHT,
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

    const GetValue$D = Phaser.Utils.Objects.GetValue;
    const Group = Phaser.GameObjects.Group;
    const P3Container = Phaser.GameObjects.Container;

    var DrawBounds = function (graphics, config) {
        var scene = graphics.scene;

        var color, lineWidth;
        var createTextCallback, createTextCallbackScope, textAlign;
        if (typeof (config) === 'number') {
            color = config;
        } else {
            color = GetValue$D(config, 'color');
            lineWidth = GetValue$D(config, 'lineWidth');
            var nameTextConfig = GetValue$D(config, 'name', false);
            if (nameTextConfig) {
                createTextCallback = GetValue$D(nameTextConfig, 'createTextCallback', DefaultCreateTextCallback);
                createTextCallbackScope = GetValue$D(nameTextConfig, 'createTextCallbackScope', undefined);
                textAlign = GetValue$D(nameTextConfig, 'align', 'left-top');
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

    const GetValue$C = Phaser.Utils.Objects.GetValue;

    var GetBoundsConfig = function (config, out) {
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
            out.left = GetValue$C(config, 'left', 0);
            out.right = GetValue$C(config, 'right', 0);
            out.top = GetValue$C(config, 'top', 0);
            out.bottom = GetValue$C(config, 'bottom', 0);
        }
        return out;
    };

    const ContainerAdd = ContainerLite.prototype.add;

    var AddChild = function (gameObject) {
        ContainerAdd.call(this, gameObject);

        if (this.sizerEventsEnable) {
            gameObject.emit('sizer.add', gameObject, this);
            this.emit('add', gameObject, this);
        }

        return this;
    };

    var AddChildMethods$1 = {
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

            AddChild.call(this, gameObject);
            this.backgroundChildren.push(gameObject);

            var config = this.getSizerConfig(gameObject);
            config.padding = GetBoundsConfig(paddingConfig);

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

    const RemoveItem$3 = Phaser.Utils.Array.Remove;
    const ContainerRemove = ContainerLite.prototype.remove;
    const GetParentSizer$1 = GetParentSizerMethods.getParentSizer;

    var RemoveChild = function (gameObject, destroyChild) {
        // Invoke parent's removeChildCallback method
        var parent = GetParentSizer$1(gameObject);
        while (parent) {
            if (parent.removeChildCallback) {
                parent.removeChildCallback(gameObject, destroyChild);
            }
            parent = GetParentSizer$1(parent);
        }

        if (this.isBackground(gameObject)) {
            RemoveItem$3(this.backgroundChildren, gameObject);
        }
        ContainerRemove.call(this, gameObject, destroyChild);

        if (!destroyChild && this.sizerEventsEnable) {
            gameObject.emit('sizer.remove', gameObject, this);
            this.emit('remove', gameObject, this);
        }

        return this;
    };

    const RemoveItem$2 = Phaser.Utils.Array.Remove;
    const GetParentSizer = GetParentSizerMethods.getParentSizer;

    var RemoveChildMethods$1 = {
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

            RemoveItem$2(this.backgroundChildren, gameObject);
            RemoveChild.call(this, gameObject, destroyChild);
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

    const GetValue$B = Phaser.Utils.Objects.GetValue;

    var GetPadding = function (padding, key) {
        if (key === undefined) {
            return padding;
        }
        return padding[key];
    };

    var SetPadding = function (padding, key, value) {
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
            padding.left = GetValue$B(key, 'left', 0);
            padding.right = GetValue$B(key, 'right', 0);
            padding.top = GetValue$B(key, 'top', 0);
            padding.bottom = GetValue$B(key, 'bottom', 0);
        }
        return padding;
    };

    var PaddingMethods = {
        getInnerPadding(key) {
            return GetPadding(this.space, key);
        },

        setInnerPadding(key, value) {
            SetPadding(this.space, key, value);
            return this;
        },

        getOuterPadding(key) {
            return GetPadding(this.getSizerConfig(this).padding, key);
        },

        setOuterPadding(key, value) {
            SetPadding(this.getSizerConfig(this).padding, key, value);
            return this;
        },

        getChildOuterPadding(child, key) {
            if (typeof (child) === 'string') {
                child = this.getElement(child);
            }
            return GetPadding(this.getSizerConfig(child).padding, key);
        },

        setChildOuterPadding(child, key, value) {
            if (typeof (child) === 'string') {
                child = this.getElement(child);
            }
            SetPadding(this.getSizerConfig(child).padding, key, value);
            return this;
        },
    };

    var ResolveWidth$2 = function (width) {
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

    var HasWidthWrap$1 = function () {
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

    var ResolveChildrenWidth = function (parentWidth) {
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
    var RunWidthWrap$1 = function (parentWidth) {
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

    var ResolveHeight$2 = function (height) {
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

    var HasHeightWrap$1 = function () {
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

    var ResolveChildrenHeight = function (parentHeight) {
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
    var RunHeightWrap$1 = function (parentHeight) {
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
    var GetExpandedChildWidth$1 = function (child, parentWidth) {
        return parentWidth;
    };

    // Override
    var GetExpandedChildHeight$1 = function (child, parentHeight) {
        return parentHeight;
    };

    // Override
    var GetChildrenWidth$1 = function () {
        return 0;
    };

    // Override
    var GetChildrenHeight$1 = function () {
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
    var GetChildrenSizers$1 = function(out) {
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

    var PreLayout$1 = function () {
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
        var newWidth = ResolveWidth$1(self, width, runWidthWrap);

        var newHeight = ResolveHeight$1(self, height, runHeightWrap);

        if (newWidth === undefined) {
            newWidth = ResolveWidth$1(self, width, runWidthWrap);
        }

        if ((newWidth !== undefined) && (newHeight !== undefined)) {
            return {
                width: newWidth,
                height: newHeight
            }
        }

        return false;
    };

    var ResolveWidth$1 = function (self, width, runWidthWrap) {
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

    var ResolveHeight$1 = function (self, height, runHeightWrap) {
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
    var LayoutChildren$1 = function () {

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

    const GetValue$A = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$A(config, 'eventEmitter', true));

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

    const GetValue$z = Phaser.Utils.Objects.GetValue;

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

            var onResizeCallback = GetValue$z(o, 'onResizeCallback', DefaultResizeCallback);
            var onResizeCallbackScope = GetValue$z(o, 'onResizeCallbackScope');
            this.setResizeCallback(onResizeCallback, onResizeCallbackScope);

            var onUpdateViewportCallback = GetValue$z(o, 'onUpdateViewportCallback');
            var onUpdateViewportCallbackScope = GetValue$z(o, 'onUpdateViewportCallbackScope');
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

    const GetValue$y = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$y(config, 'tickingMode', 1));
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

    const GetValue$x = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$x(config, 'tickEventName', defaultEventName);
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

    const GetValue$w = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$w(o, 'state', IDLE$6);
            this.timeScale = GetValue$w(o, 'timeScale', 1);
            this.delay = GetValue$w(o, 'delay', 0);
            this.repeat = GetValue$w(o, 'repeat', 0);
            this.repeatCounter = GetValue$w(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$w(o, 'repeatDelay', 0);
            this.duration = GetValue$w(o, 'duration', 0);
            this.nowTime = GetValue$w(o, 'nowTime', 0);
            this.justRestart = GetValue$w(o, 'justRestart', false);
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
            return Clamp(t, 0, 1);
        }

        set t(value) {
            value = Clamp(value, -1, 1);
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

    const GetValue$v = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$3 = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$v(o, 'timer'));
            this.setEnable(GetValue$v(o, 'enable', true));
            this.setTarget(GetValue$v(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue$3(o, 'delay', 0));
            this.setDuration(GetAdvancedValue$3(o, 'duration', 1000));
            this.setEase(GetValue$v(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$v(o, 'repeat', 0));

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

    const GetValue$u = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$2 = Phaser.Utils.Objects.GetAdvancedValue;
    const Linear$3 = Phaser.Math.Linear;

    class Scale extends EaseValueTaskBase {
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

            this.setMode(GetValue$u(o, 'mode', 0));
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
                gameObject.scaleX = Linear$3(this.startX, this.endX, t);
            }
            if (this.hasScaleY) {
                gameObject.scaleY = Linear$3(this.startY, this.endY, t);
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
            scale = new Scale(gameObject, config);
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
        if (destroyMode instanceof Scale) {
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
            scale = new Scale(gameObject, config);
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
            scale = new Scale(gameObject, config);
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

    const IsPlainObject$8 = Phaser.Utils.Objects.IsPlainObject;

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
            if (IsPlainObject$8(duration)) {
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
            if (IsPlainObject$8(duration)) {
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
            if (IsPlainObject$8(duration)) {
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

    var methods$6 = {};
    Object.assign(methods$6, ScaleMethods);

    methods$6.onInitScale = function () {
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

    const GetValue$t = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const Linear$2 = Phaser.Math.Linear;

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

            this.setMode(GetValue$t(o, 'mode', 0));
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

            gameObject.alpha = Linear$2(this.alphaStart, this.alphaEnd, t);
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

    const IsPlainObject$7 = Phaser.Utils.Objects.IsPlainObject;

    var FadeIn = function (gameObject, duration, alpha, fade) {
        var startAlpha, endAlpha;
        if (IsPlainObject$7(alpha)) {
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

    const IsPlainObject$6 = Phaser.Utils.Objects.IsPlainObject;

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
            if (IsPlainObject$6(duration)) {
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
            if (IsPlainObject$6(duration)) {
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

    var methods$5 = {};
    Object.assign(methods$5, FadeMethods);

    methods$5.onInitFade = function () {
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

    const GetValue$s = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const Linear$1 = Phaser.Math.Linear;

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

            this.setMode(GetValue$s(o, 'mode', 0));

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
                gameObject.x = Linear$1(this.startX, this.endX, t);
            }
            if (this.hasMoveY) {
                gameObject.y = Linear$1(this.startY, this.endY, t);
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

    const IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
    const DistanceBetween$3 = Phaser.Math.Distance.Between;

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
            if (IsPlainObject$5(duration)) {
                var config = duration;
                x = config.x;
                y = config.y;
                if (config.hasOwnProperty('speed')) {
                    duration = (DistanceBetween$3(x, y, this.x, this.y) * 1000) / config.speed;
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
            if (IsPlainObject$5(duration)) {
                var config = duration;
                x = config.x;
                y = config.y;
                if (config.hasOwnProperty('speed')) {
                    duration = (DistanceBetween$3(x, y, this.x, this.y) * 1000) / config.speed;
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

    var methods$4 = {};
    Object.assign(methods$4, EaseMoveMethods);

    methods$4.onInitEaseMove = function () {
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

    const GetValue$r = Phaser.Utils.Objects.GetValue;

    class ShakePosition extends TickTask {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.timer = new Timer();
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$r(o, 'timer'));
            this.setEnable(GetValue$r(o, 'enable', true));
            this.setMode(GetValue$r(o, 'mode', 1));
            this.isRunning = GetValue$r(o, 'isRunning', false);
            this.setMagnitudeMode(GetValue$r(o, 'magnitudeMode', 1));
            this.setAxisMode(GetValue$r(o, "axis", 0));
            this.setDuration(GetValue$r(o, 'duration', 500));
            this.setMagnitude(GetValue$r(o, 'magnitude', 10));
            this.ox = GetValue$r(o, 'ox', undefined);
            this.oy = GetValue$r(o, 'oy', undefined);
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
                magnitude = GetValue$r(config, 'magnitude', undefined);
                duration = GetValue$r(config, 'duration', undefined);
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

    const IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;

    var OnInitShake = function (gameObject, shake) {
        // Route 'complete' of shake to gameObject
        shake.on('complete', function () {
            gameObject.emit('shake.complete', gameObject);
        });

        // Shake effect won't change position
    };

    var ShakeMethods = {
        shake(duration, magnitude, magnitudeMode) {
            if (IsPlainObject$4(duration)) {
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

    const GetValue$q = Phaser.Utils.Objects.GetValue;
    const Linear = Phaser.Math.Linear;

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
            this.propertyKey = GetValue$q(config, 'key', 'value');
            var currentValue = target[this.propertyKey];
            this.fromValue = GetValue$q(config, 'from', currentValue);
            this.toValue = GetValue$q(config, 'to', currentValue);

            this.setEase(GetValue$q(config, 'ease', this.ease));
            this.setDuration(GetValue$q(config, 'duration', this.duration));
            this.setRepeat(GetValue$q(config, 'repeat', 0));
            this.setDelay(GetValue$q(config, 'delay', 0));
            this.setRepeatDelay(GetValue$q(config, 'repeatDelay', 0));

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

            target[this.propertyKey] = Linear(this.fromValue, this.toValue, t);
        }
    }

    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;

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
            if (IsPlainObject$3(key)) {
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
            if (IsPlainObject$3(key)) {
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

    var RemoveItem$1 = Phaser.Utils.Array.Remove;

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
                RemoveItem$1(self._delayCallTimers, timer);
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

    var GetValue$p = function (source, key, defaultValue) {
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
            var states = GetValue$p(config, 'states', undefined);
            if (states) {
                this.addStates(states);
            }

            // Attach extend members
            var extend = GetValue$p(config, 'extend', undefined);
            if (extend) {
                for (var name in extend) {
                    if (!this.hasOwnProperty(name) || this[name] === undefined) {
                        this[name] = extend[name];
                    }
                }
            }

            // Event emitter
            var eventEmitter = GetValue$p(config, 'eventEmitter', undefined);
            var EventEmitterClass = GetValue$p(config, 'EventEmitterClass', undefined);
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
            this.setEnable(GetValue$p(o, 'enable', true));
            this.start(GetValue$p(o, 'start', undefined));
            var init = GetValue$p(o, 'init', undefined);
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
            this._scene = GetValue$p(o, 'scene', undefined);
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

    class State extends FSM {
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
    }

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

    var ConfigurationMethods$1 = {
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

    var methods$3 = {};

    Object.assign(
        methods$3,
        DelayCallMethods,
        ConfigurationMethods$1,
        OpenMethods,
        CloseMethods,
    );

    const GetValue$o = Phaser.Utils.Objects.GetValue;

    class OpenCloseTransition extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.scene

            this.setTransitInTime(GetValue$o(config, 'duration.in', 200));
            this.setTransitOutTime(GetValue$o(config, 'duration.out', 200));
            this.setTransitInCallback(GetValue$o(config, 'transitIn'));
            this.setTransitOutCallback(GetValue$o(config, 'transitOut'));

            this.oneShotMode = GetValue$o(config, 'destroy', false);

            this.delayCallTimer = undefined;
            this._state = new State(this, {
                eventEmitter: false,
                initState: GetValue$o(config, 'initState', 'IDLE')
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
        methods$3,
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

    const Rectangle = Phaser.GameObjects.Rectangle;

    class FullWindowRectangle extends Rectangle {
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

    const GetValue$n = Phaser.Utils.Objects.GetValue;

    class TouchEventStop extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, { eventEmitter: false });
            // No event emitter
            // this.parent = gameObject;

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setHitAreaMode(GetValue$n(o, 'hitAreaMode', 0));
            this.setEnable(GetValue$n(o, 'enable', true));
            this.setStopMode(GetValue$n(o, 'stopAllLevels', true));
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

    const GetValue$m = Phaser.Utils.Objects.GetValue;

    class Cover extends FullWindowRectangle {
        constructor(scene, config) {
            var fillColor = GetValue$m(config, 'color', 0x0);
            var fillAlpha = GetValue$m(config, 'alpha', 0.8);
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

    const GetValue$l = Phaser.Utils.Objects.GetValue;

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

            config.destroy = GetValue$l(config, 'destroy', true);

            super(gameObject, config);
            // this.parent = gameObject;
            // this.scene

            // Cover : key of modal, to block touch input        
            var coverConfig = GetValue$l(config, 'cover');
            this.cover = (coverConfig !== false) ? CreateCover(gameObject, coverConfig) : undefined;
            if (this.cover) {
                this.setCoverTransitInCallback(GetValue$l(coverConfig, 'transitIn', DefaultCoverTransitInCallback));
                this.setCoverTransitOutCallback(GetValue$l(coverConfig, 'transitOut', DefaultCoverTransitOutCallback));
            }

            // Close conditions:
            var touchOutsideClose = GetValue$l(config, 'touchOutsideClose', false);
            var timeOutDuration = GetValue$l(config, 'duration.hold', -1);
            var timeOutClose = GetValue$l(config, 'timeOutClose', (timeOutDuration >= 0));
            var anyTouchClose = GetValue$l(config, 'anyTouchClose', false);
            var manualClose = GetValue$l(config, 'manualClose', false);

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

            if (GetValue$l(config, 'openOnStart', true)) {
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

    var PointerTest = function (gameObject, pointer, mainTest, preTest, postTest) {
        var mainCamera = gameObject.scene.sys.cameras.main,
            worldXY;

        var useScreenXY = (gameObject.scrollFactorX === 0) && (gameObject.scrollFactorY === 0);

        if (pointer) {
            if (useScreenXY) {
                return mainTest(gameObject, pointer.x, pointer.y, preTest, postTest);

            } else {
                worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                if (!worldXY) {
                    return false;
                }
                return mainTest(gameObject, worldXY.x, worldXY.y, preTest, postTest);

            }

        } else {
            var inputManager = gameObject.scene.input.manager;
            var pointersTotal = inputManager.pointersTotal;
            var pointers = inputManager.pointers;
            for (var i = 0; i < pointersTotal; i++) {
                pointer = pointers[i];

                if (useScreenXY) {
                    if (mainTest(gameObject, pointer.x, pointer.y, preTest, postTest)) {
                        return true;
                    }

                } else {
                    worldXY = GetPointerWorldXY(pointer, mainCamera, true);
                    if (!worldXY) {
                        continue;
                    }

                    if (mainTest(gameObject, worldXY.x, worldXY.y, preTest, postTest)) {
                        return true;
                    }

                }

            }
            return false;

        }};

    var IsPointerInBounds = function (gameObject, pointer, preTest, postTest) {
        return PointerTest(gameObject, pointer, IsPointInBounds, preTest, postTest)
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

    const ALIGN_CENTER$1 = Phaser.Display.Align.CENTER;

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
                child, x, y, width, height, ALIGN_CENTER$1,
                0, 0
            );
        }
    };

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    var SetDraggable = function (sensor, draggable, dragTarget) {
        if (IsPlainObject$2(sensor)) {
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

    const GetValue$k = Phaser.Utils.Objects.GetValue;

    class Button extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;
            gameObject.setInteractive(GetValue$k(config, "inputConfig", undefined));
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.lastClickTime = undefined;
            this.isDown = false;
            this.isOver = false;
            this.setEnable(GetValue$k(o, "enable", true));
            this.setMode(GetValue$k(o, "mode", 1));
            this.setClickInterval(GetValue$k(o, "clickInterval", 100));
            this.setDragThreshold(GetValue$k(o, 'threshold', undefined));
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

    const GetValue$j = Phaser.Utils.Objects.GetValue;

    class ClickOutside extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;

            var inputConfig = GetValue$j(config, "inputConfig", undefined);
            if (inputConfig) {
                gameObject.setInteractive(inputConfig);
            }

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.lastClickTime = undefined;
            this.setEnable(GetValue$j(o, "enable", true));
            this.setMode(GetValue$j(o, "mode", 1));
            this.setClickInterval(GetValue$j(o, "clickInterval", 100));
            this.setDragThreshold(GetValue$j(o, 'threshold', undefined));
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

    const GetValue$i = Phaser.Utils.Objects.GetValue;

    class InTouching extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this._enable = undefined;
            this.cooldown = new Cooldown();
            this.parent.setInteractive(GetValue$i(config, 'inputConfig', undefined));
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.pointer = undefined;
            this.prevIsInTouch = false;
            this.isInTouching = false;
            this.setEnable(GetValue$i(o, 'enable', true));
            this.setCooldown(GetValue$i(o, 'cooldown', undefined));
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

    const GetValue$h = Phaser.Utils.Objects.GetValue;

    var DownChild = function (config) {
        var downConfig = GetValue$h(config, 'down', undefined);
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

    const GetValue$g = Phaser.Utils.Objects.GetValue;

    var UpChild = function (config) {
        var upConfig = GetValue$g(config, 'up', undefined);
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

    const GetValue$f = Phaser.Utils.Objects.GetValue;

    var OverChild = function (config) {
        var overConfig = GetValue$f(config, 'over', undefined);
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

    const GetValue$e = Phaser.Utils.Objects.GetValue;

    var ClickChild = function (config) {
        var clickConfig = GetValue$e(config, 'click', undefined);
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

    const GetValue$d = Phaser.Utils.Objects.GetValue;

    class OnePointerTracer extends TickTask {
        constructor(gameObject, config) {
            var scene = GetSceneObject(gameObject);
            if (scene === gameObject) {
                gameObject = undefined;
            }
            super(scene, config);

            this.gameObject = gameObject;
            if (gameObject) {
                gameObject.setInteractive(GetValue$d(config, 'inputConfig', undefined));
            }
            this._enable = undefined;
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setEnable(GetValue$d(o, 'enable', true));

            this.setDetectBounds();
            if (this.gameObject === undefined) {
                this.setDetectBounds(GetValue$d(o, 'bounds', undefined));
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

    const GetValue$c = Phaser.Utils.Objects.GetValue;
    const DistanceBetween$2 = Phaser.Math.Distance.Between;

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
            this.setHoldTime(GetValue$c(o, 'time', 250)); // min-hold-time of Press is 251
            this.setTapInterval(GetValue$c(o, 'tapInterval', 200));
            this.setDragThreshold(GetValue$c(o, 'threshold', 9));
            this.setTapOffset(GetValue$c(o, 'tapOffset', 10));

            var taps = GetValue$c(o, 'taps', undefined);
            if (taps !== undefined) {
                this.setTaps(taps);
            } else {
                this.setMaxTaps(GetValue$c(o, 'maxTaps', undefined));
                this.setMinTaps(GetValue$c(o, 'minTaps', undefined));
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
                    var tapsOffset = DistanceBetween$2(
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

    const GetValue$b = Phaser.Utils.Objects.GetValue;

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
            this.setDragThreshold(GetValue$b(o, 'threshold', 9));
            this.setHoldTime(GetValue$b(o, 'time', 251));
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

    const DistanceBetween$1 = Phaser.Math.Distance.Between;
    const AngleBetween$1 = Phaser.Math.Angle.Between;

    var VelocityMethods = {
        getDt: function () {
            var dt = GetTickDelta(this.scene);
            return dt;
        },

        getVelocity: function () {
            var p1 = this.pointer.position;
            var p0 = this.pointer.prevPosition;
            var d = DistanceBetween$1(p0.x, p0.y, p1.x, p1.y);
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
            out = globOut;
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

    var globOut = {};

    const GetValue$a = Phaser.Utils.Objects.GetValue;
    const RadToDeg$1 = Phaser.Math.RadToDeg;

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
            this.setDragThreshold(GetValue$a(o, 'threshold', 10));
            this.setVelocityThreshold(GetValue$a(o, 'velocityThreshold', 1000));
            this.setDirectionMode(GetValue$a(o, 'dir', '8dir'));
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
            var angle = RadToDeg$1(this.getVelocityAngle());
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

    const GetValue$9 = Phaser.Utils.Objects.GetValue;
    const SpliceOne = Phaser.Utils.Array.SpliceOne;
    const DistanceBetween = Phaser.Math.Distance.Between;
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
                gameObject.setInteractive(GetValue$9(config, 'inputConfig', undefined));
            }

            // Event emitter
            this.setEventEmitter(GetValue$9(config, 'eventEmitter', undefined));

            this._enable = undefined;
            this.pointers = [];
            this.movedState = {};
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setEnable(GetValue$9(o, "enable", true));
            this.bounds = GetValue$9(o, 'bounds', undefined);

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
            return DistanceBetween(p0.x, p0.y, p1.x, p1.y);
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

    const RotateAround = Phaser.Math.RotateAround;

    var RotateObjectAround = function (gameObject, x, y, angle) {
        RotateAround(gameObject, x, y, angle);
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

    const GetValue$8 = Phaser.Utils.Objects.GetValue;
    const WrapDegrees = Phaser.Math.Angle.WrapDegrees; // Wrap degrees: -180 to 180 
    const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
    const RadToDeg = Phaser.Math.RadToDeg;
    const DegToRad = Phaser.Math.DegToRad;

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
            this.setDragThreshold(GetValue$8(o, 'threshold', 0));
            return this;
        }

        onDrag2Start() {
            this.prevAngle = WrapDegrees(RadToDeg(this.angleBetween)); // Degrees
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
                        var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
                        this.angle = ShortestBetween(this.prevAngle, curAngle);
                        this.prevAngle = curAngle;
                        this.state = RECOGNIZED;
                    }
                    break;
                case RECOGNIZED:
                    var curAngle = WrapDegrees(RadToDeg(this.angleBetween));
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
            return DegToRad(this.angle);
        }

        setDragThreshold(distance) {
            this.dragThreshold = distance;
            return this;
        }

    }

    var methods$2 = {
        spinObject: SpinObject,
    };
    Object.assign(
        Rotate.prototype,
        methods$2
    );


    const IDLE = 'IDLE';
    const BEGIN = 'BEGIN';
    const RECOGNIZED = 'RECOGNIZED';

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    var TapChild = function (config) {
        var tapConfig = GetValue$7(config, 'tap', undefined);
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

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    var PressChild = function (config) {
        var pressConfig = GetValue$6(config, 'press', undefined);
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

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    var SwipeChild = function (config) {
        var swipeConfig = GetValue$5(config, 'swipe', undefined);
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

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    var SetChildrenInteractive = function (gameObject, config) {
        gameObject.setInteractive();

        if (GetValue$4(config, 'dropZone', false)) {
            gameObject.input.dropZone = true;
        }

        gameObject._childrenInteractive = {
            targetSizers: GetValue$4(config, 'targets', [gameObject]),
            targetMode: GetValue$4(config, 'targetMode', 'parent'),
            eventEmitter: GetValue$4(config, 'eventEmitter', gameObject),
            eventNamePrefix: GetValue$4(config, 'inputEventPrefix', 'child.')
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
        SetChildrenInteractive(this, config);
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

    var methods$1 = {
        getSizerConfig: GetSizerConfig,
        getChildPrevState: GetChildPrevState,
        pushIntoBounds: PushIntoBounds,
        drawBounds: DrawBounds,
        resolveWidth: ResolveWidth$2,
        hasWidthWrap: HasWidthWrap$1,
        resolveChildrenWidth: ResolveChildrenWidth,
        runWidthWrap: RunWidthWrap$1,
        resolveHeight: ResolveHeight$2,
        hasHeightWrap: HasHeightWrap$1,
        resolveChildrenHeight: ResolveChildrenHeight,
        runHeightWrap: RunHeightWrap$1,
        getChildWidth: GetChildWidth,
        getChildHeight: GetChildHeight,
        getExpandedChildWidth: GetExpandedChildWidth$1,
        getExpandedChildHeight: GetExpandedChildHeight$1,

        getChildrenWidth: GetChildrenWidth$1,
        getChildrenHeight: GetChildrenHeight$1,
        addChildrenMap: AddChildrenMap,
        addElement: AddChildrenMap,
        removeChildrenMap: RemoveChildrenMap,
        getElement: GetElement,
        getChildIndex: GetChildIndex,
        getAllChildrenSizers: GetAllChildrenSizers,
        getChildrenSizers: GetChildrenSizers$1,
        preLayout: PreLayout$1,
        layout: Layout,
        runLayout: RunLayout,
        layoutChildren: LayoutChildren$1,

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
        methods$1,
        PaddingMethods,
        AddChildMethods$1,
        RemoveChildMethods$1,
        GetParentSizerMethods,
        methods$6,
        methods$5,
        methods$4,
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

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    class Base extends ContainerLite {
        constructor(scene, x, y, minWidth, minHeight, config) {
            super(scene, x, y, 1, 1);
            this.isRexSizer = true;

            var origin = GetValue$3(config, 'origin', 0.5);
            var originX = GetValue$3(config, 'originX', origin);
            var originY = GetValue$3(config, 'originY', origin);
            this.setOrigin(originX, originY);

            this.setMinSize(minWidth, minHeight);
            this.setName(GetValue$3(config, 'name', ''));
            this.rexSizer = {};
            this.space = {};
            this.backgroundChildren = undefined;
            this.sizerChildren = undefined; // [] or {}
            this.childrenMap = {};
            this.layoutedChildren = undefined;

            // FixWidthSizer uses these flag
            this.runChildrenWrapFlag = false;

            this.enableLayoutWarn(false);

            var anchorConfig = GetValue$3(config, 'anchor', undefined);
            if (anchorConfig) {
                this.setAnchor(anchorConfig);
            }

            this.setInnerPadding(GetValue$3(config, 'space', 0));

            var draggable = GetValue$3(config, 'draggable', false);
            if (draggable) {
                this.setDraggable(draggable);
            }

            this.setSizerEventsEnable(GetValue$3(config, 'sizerEvents', false));
            this.setDirty(true);

            if (GetValue$3(config, 'enableLayer', false)) {
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
    }

    Object.assign(
        Base.prototype,
        methods$1
    );

    var GetChildrenWidth = function (minimumMode) {
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

    var GetChildrenHeight = function (minimumMode) {
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

    var GetExpandedChildWidth = function (child, parentWidth) {
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

    var GetExpandedChildHeight = function (child, parentHeight) {
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

    var GetChildrenSizers = function(out) {
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

    var PreLayout = function () {
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
        PreLayout$1.call(this);
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

    const Wrap = Phaser.Math.Wrap;

    var LayoutChildren = function () {
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
                childIndex = Wrap((i + startChildIndex), 0, cnt);
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

    var ResolveWidth = function (width) {
        var width = ResolveWidth$2.call(this, width);

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

    var ResolveHeight = function (height) {
        var height = ResolveHeight$2.call(this, height);

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

    var HasWidthWrap = function () {
        if (this.hasRatioFitChild && (this.orientation === 1)) {
            return true;
        }

        return HasWidthWrap$1.call(this);
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

    var RunWidthWrap = function (width) {
        if (this.wrapResult) {
            // Already got wrapResult
            return;
        }

        if (this.orientation === 1) {
            ExpandFitRatioChildren.call(this, width, undefined);
        }

        RunWidthWrap$1.call(this, width);
    };

    var HasHeightWrap = function () {
        if (this.hasRatioFitChild && (this.orientation === 0)) {
            return true;
        }

        return HasHeightWrap$1.call(this);
    };

    var RunHeightWrap = function (height) {
        if (this.wrapResult) {
            // Already got wrapResult
            return;
        }

        if (this.orientation === 0) {
            ExpandFitRatioChildren.call(this, undefined, height);
        }

        RunHeightWrap$1.call(this, height);
    };

    const Zone = Phaser.GameObjects.Zone;

    class Space extends Zone {
        constructor(scene) {
            super(scene, 0, 0, 1, 1);
            // Don't add Zone into scene
            this.isRexSpace = true;
        }
    }

    var GetNearestChildIndex = function (x, y) {
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

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const ALIGN_CENTER = Phaser.Display.Align.CENTER;
    const PROPORTIONMODE = {
        min: 0,
        full: -1,
    };

    var Add = function (
        gameObject,
        proportion, align, paddingConfig, expand,
        childKey, index,
        minWidth, minHeight,
        fitRatio
    ) {
        var offsetX, offsetY;
        var offsetOriginX, offsetOriginY;

        AddChild.call(this, gameObject);

        var isRexSpace = gameObject.isRexSpace;
        var proportionType = typeof (proportion);
        if (proportion === null) {
            return this;
        } else if (proportionType === 'number') ; else if (proportionType === 'string') {
            proportion = PROPORTIONMODE[proportion];
        } else if (IsPlainObject$1(proportion)) {
            var config = proportion;
            proportion = GetValue$2(config, 'proportion', undefined);
            align = GetValue$2(config, 'align', ALIGN_CENTER);
            paddingConfig = GetValue$2(config, 'padding', 0);
            expand = GetValue$2(config, 'expand', false);
            childKey = GetValue$2(config, 'key', undefined);
            index = GetValue$2(config, 'index', undefined);

            if (!gameObject.isRexSizer) {
                minWidth = GetValue$2(config, 'minWidth', undefined);
                minHeight = GetValue$2(config, 'minHeight', undefined);
            }

            fitRatio = GetValue$2(config, 'fitRatio', 0);  // width/height

            offsetX = GetValue$2(config, 'offsetX', 0);
            offsetY = GetValue$2(config, 'offsetY', 0);
            offsetOriginX = GetValue$2(config, 'offsetOriginX', 0);
            offsetOriginY = GetValue$2(config, 'offsetOriginY', 0);
        }

        if (typeof (align) === 'string') {
            align = AlignConst[align];
        }

        if (proportion === undefined) {
            proportion = (isRexSpace) ? 1 : 0;
        }
        if (align === undefined) {
            align = ALIGN_CENTER;
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
        config.padding = GetBoundsConfig(paddingConfig);
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

    var AddChildMethods = {
        add: Add, // sizer.add could be override

        addSpace(proportion) {
            this.insertSpace(undefined, proportion);
            return this;
        },

        insertSpace(index, proportion) {
            if (proportion === undefined) {
                proportion = 1;
            }
            Add.call(this, new Space(this.scene),
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
            if (IsPlainObject$1(proportion)) {
                proportion.index = index;
            }

            Add.call(this, gameObject, proportion, align, paddingConfig, expand, childKey, index, minSize);
            // No problem if sizer.add is override
            return this;
        },

        insertAtPosition(x, y, gameObject, proportion, align, paddingConfig, expand, childKey, minSize) {
            var index = GetNearestChildIndex.call(this, x, y);
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

    const RemoveItem = Phaser.Utils.Array.Remove;

    var RemoveChildMethods = {
        remove(gameObject, destroyChild) {
            if (this.getParentSizer(gameObject) !== this) {
                return this;
            }

            RemoveItem(this.sizerChildren, gameObject);
            RemoveChild.call(this, gameObject, destroyChild);
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

    var ExpandMethods$1 = {
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

    var methods = {
        getChildrenWidth: GetChildrenWidth,
        getChildrenHeight: GetChildrenHeight,
        getExpandedChildWidth: GetExpandedChildWidth,
        getExpandedChildHeight: GetExpandedChildHeight,
        getChildrenSizers: GetChildrenSizers,
        preLayout: PreLayout,
        layoutChildren: LayoutChildren,
        resolveWidth: ResolveWidth,
        resolveHeight: ResolveHeight,
        hasWidthWrap: HasWidthWrap,
        runWidthWrap: RunWidthWrap,
        hasHeightWrap: HasHeightWrap,
        runHeightWrap: RunHeightWrap,

        setChildrenAlignMode: SetChildrenAlignMode,
    };

    Object.assign(
        methods,
        AddChildMethods,
        RemoveChildMethods,
        AlignMethods,
        ProportionMethods,
        ExpandMethods$1,
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

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class Sizer extends Base {
        constructor(scene, x, y, minWidth, minHeight, orientation, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue$1(config, 'x', 0);
                y = GetValue$1(config, 'y', 0);
                minWidth = GetValue$1(config, 'width', undefined);
                minHeight = GetValue$1(config, 'height', undefined);
                orientation = GetValue$1(config, 'orientation', 0);
            } else if (IsPlainObject(minWidth)) {
                config = minWidth;
                minWidth = GetValue$1(config, 'width', undefined);
                minHeight = GetValue$1(config, 'height', undefined);
                orientation = GetValue$1(config, 'orientation', 0);
            } else if (IsPlainObject(orientation)) {
                config = orientation;
                orientation = GetValue$1(config, 'orientation', 0);
            }

            if (orientation === undefined) {
                orientation = 0;
            }
            super(scene, x, y, minWidth, minHeight, config);

            this.type = 'rexSizer';
            this.sizerChildren = [];
            this.setOrientation(orientation);
            this.setItemSpacing(GetValue$1(config, 'space.item', 0));
            this.setStartChildIndex(GetValue$1(config, 'startChildIndex', 0));
            this.setRTL(GetValue$1(config, 'rtl', false));

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
        methods
    );

    class Transition extends OpenCloseTransition {
        constructor(gameObject, config) {
            if (config === undefined) {
                config = {};
            }
            config.destroy = false;
            super(gameObject, config);
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

    var ExpandMethods = {
        expand(duration) {
            if (this.expanded === true) {
                return this;
            }

            if (duration === undefined) {
                duration = this.transitionDuration;
            }

            this.expanded = true;

            var title = this.childrenMap.title;
            var child = this.childrenMap.child;

            this.show(child);

            if (this.reLayoutEnable) {
                var layoutTarget = (this.reLayoutTarget) ? this.reLayoutTarget : this.getTopmostSizer();
                layoutTarget.layout();
            }

            title.emit('folder.expand', duration, this);
            child.emit('folder.expand', duration, this);
            this.emit('expand.start', this);

            this.childTransition
                .once('open', function () {
                    this.emit('expand.complete', this);
                }, this)
                .requestOpen(null, duration);

            return this;
        },

        collapse(duration) {
            if (this.expanded === false) {
                return this;
            }

            if (duration === undefined) {
                duration = this.transitionDuration;
            }

            this.expanded = false;

            var title = this.childrenMap.title;
            var child = this.childrenMap.child;

            title.emit('folder.collapse', duration, this);
            child.emit('folder.collapse', duration, this);
            this.emit('collapse.start', this);

            this.childTransition
                .once('close', function () {
                    this.setChildScale(child, 1, 1).hide(child);

                    if (this.reLayoutEnable) {
                        var layoutTarget = (this.reLayoutTarget) ? this.reLayoutTarget : this.getTopmostSizer();
                        layoutTarget.layout();
                    }

                    this.emit('collapse.complete', this);
                }, this)
                .requestClose(null, duration);

            return this;
        },

        toggle(duration) {
            if (this.expanded) {
                this.collapse(duration);
            } else {
                this.expand(duration);
            }

            return this;
        },

        setExpandedState(expanded) {
            this.reLayoutEnable = false;

            if (expanded === undefined) {
                this.expanded = undefined;
            } else if (expanded) {
                this.expand(0);
            } else {
                this.collapse(0);
            }

            this.reLayoutEnable = true;

            return this;
        }
    };

    var DefaultExpandCallback = function (gameObject, duration) {
        methods$6.popUp.call(gameObject, duration, this.expandDirection);
    };

    var DefaultCollapseCallback = function (gameObject, duration) {
        methods$6.scaleDown.call(gameObject, duration, this.expandDirection);
    };

    var ConfigurationMethods = {
        setTransitionDuration(duration) {
            this.transitionDuration = duration;

            this.childTransition
                .setTransitInTime(duration)
                .setTransitOutTime(duration);

            return this;
        },

        setExpandCallback(callback) {
            if (callback === undefined) {
                callback = DefaultExpandCallback.bind(this);
            }
            this.childTransition.setTransitInCallback(callback);
            return this;
        },

        setCollapseCallback(callback) {
            if (callback === undefined) {
                callback = DefaultCollapseCallback.bind(this);
            }
            this.childTransition.setTransitOutCallback(callback);
            return this;
        }
    };

    const GetValue = Phaser.Utils.Objects.GetValue;

    class Folder extends Sizer {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            if (!config.hasOwnProperty('orientation')) {
                config.orientation = 1;
            }

            super(scene, config);
            this.type = 'rexFolder';

            this.reLayoutEnable = true;
            this.expanded = undefined;
            this.expandDirection = (this.orientation === 1) ? 'y' : 'x';

            var background = config.background;
            var title = config.title;
            var child = config.child;

            // background
            if (background) {
                this.addBackground(background);
            }

            var spaceConfig = GetValue(config, 'space');

            // title
            var defaultAlign = (this.orientation === 1) ? 'left' : 'top';
            var align = GetValue(config, 'align.title', defaultAlign);
            var expand = GetValue(config, 'expand.title', true);
            this.add(
                title,
                {
                    proportion: 0,
                    align: align,
                    expand: expand,
                    padding: {
                        left: GetValue(spaceConfig, 'titleLeft', 0),
                        right: GetValue(spaceConfig, 'titleRight', 0),
                        top: GetValue(spaceConfig, 'titleTop', 0),
                        bottom: GetValue(spaceConfig, 'titleBottom', 0)
                    }
                }
            );

            var toggleByTarget = GetValue(config, 'toggleByTarget', undefined);
            var toggleClickConfig = GetValue(config, 'toggleClickConfig');

            if (toggleByTarget === undefined) {
                toggleByTarget = title;
            }
            if (toggleByTarget) {
                ClickMethods.onClick.call(
                    toggleByTarget,
                    function () {
                        this.toggle();
                    },
                    this,
                    toggleClickConfig
                );
            }

            // child
            this.childTransition = new Transition(child);

            var customOrigin = GetValue(config, 'customChildOrigin', false);
            if (!customOrigin) {
                var origin = (!this.rtl) ? 0 : 1;
                child.setOrigin(origin);
            }

            var align = GetValue(config, 'align.child', 'left');
            var expand = GetValue(config, 'expand.child', true);
            var proportion = (expand) ? 1 : 0;
            this.add(
                child,
                {
                    proportion: proportion,
                    align: align,
                    expand: expand,
                    padding: {
                        left: GetValue(spaceConfig, 'childLeft', 0),
                        right: GetValue(spaceConfig, 'childRight', 0),
                        top: GetValue(spaceConfig, 'childTop', 0),
                        bottom: GetValue(spaceConfig, 'childBottom', 0)
                    }
                }
            );

            this.addChildrenMap('title', title);
            this.addChildrenMap('child', child);
            this.addChildrenMap('background', background);

            var transitionConfig = config.transition;
            this.setTransitionDuration(GetValue(transitionConfig, 'duration', 200));
            this.setExpandCallback(GetValue(transitionConfig, 'expandCallback', undefined));
            this.setCollapseCallback(GetValue(transitionConfig, 'collapseCallback', undefined));

            this.reLayoutTarget = GetValue(config, 'reLayoutTarget', undefined);

            var onExpandStart = config.onExpandStart;
            if (onExpandStart) {
                this.on('expand.start', onExpandStart);
            }

            var onExpandComplete = config.onExpandComplete;
            if (onExpandComplete) {
                this.on('expand.complete', onExpandComplete);
            }

            var onCollapseStart = config.onCollapseStart;
            if (onCollapseStart) {
                this.on('collapse.start', onCollapseStart);
            }

            var onCollapseComplete = config.onCollapseComplete;
            if (onCollapseComplete) {
                this.on('collapse.complete', onCollapseComplete);
            }

            var expanded = GetValue(config, 'expanded', undefined);
            if (expanded !== undefined) {
                this.setExpandedState(expanded);
            }
        }
    }

    Object.assign(
        Folder.prototype,
        ExpandMethods,
        ConfigurationMethods,
    );

    return Folder;

}));
