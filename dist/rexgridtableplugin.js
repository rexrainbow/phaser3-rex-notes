(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexgridtableplugin = factory());
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

    const Zone = Phaser.GameObjects.Zone;
    const AddItem = Phaser.Utils.Array.Add;
    const RemoveItem = Phaser.Utils.Array.Remove;

    class Base extends Zone {
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
            RemoveItem(this.children, gameObjects,
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
    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Base,
        [
            Components.Alpha,
            Components.Flip
        ]
    );

    var GetParent = function (gameObject, name) {
        var parent;
        if (name === undefined) {
            if (gameObject.hasOwnProperty('rexContainer')) {
                parent = gameObject.rexContainer.parent;
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

    const DegToRad$1 = Phaser.Math.DegToRad;
    const RadToDeg = Phaser.Math.RadToDeg;

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
                    return RadToDeg(this.rotation);
                },
                set: function (value) {
                    this.rotation = DegToRad$1(value);
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
            return GetParent(gameObject, name);
        },

        getTopmostParent(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetTopmostParent(gameObject);
        }
    };

    const GetValue$9 = Phaser.Utils.Objects.GetValue;
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
            state.syncPosition = GetValue$9(config, 'syncPosition', true);
            state.syncRotation = GetValue$9(config, 'syncRotation', true);
            state.syncScale = GetValue$9(config, 'syncScale', true);
            state.syncAlpha = GetValue$9(config, 'syncAlpha', true);
            state.syncScrollFactor = GetValue$9(config, 'syncScrollFactor', true);
            state.syncCameraFilter = GetValue$9(config, 'syncCameraFilter', true);
            state.syncDisplayList = GetValue$9(config, 'syncDisplayList', true);
        }

    };

    var SyncDisplayList = function (gameObject, state) {
        this.addToParentContainer(gameObject);     // Sync parent's container to child

        if (state.syncDisplayList) {
            this.addToPatentLayer(gameObject);     // Sync parent's layer to child
        }

        this.addToRenderLayer(gameObject);         // Sync parent's render-layer
    };

    var AddChild = {
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

    const BaseRemove = Base.prototype.remove;
    const BaseClear = Base.prototype.clear;

    var RemoveChild = {
        // Can override this method
        remove(gameObject, destroyChild) {
            if (GetParent(gameObject) !== this) {
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
            if (GetParent(gameObject) !== this) {
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

    const DegToRad = Phaser.Math.DegToRad;

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
            localState.rotation = DegToRad(angle);
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

    var Scale = {
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
            var parent = GetParent(gameObject);
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

    var P3Container$1 = {
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

    const Rectangle$1 = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround$1 = Phaser.Math.RotateAround;
    const P3Container = Phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$1();
        } else if (output === true) {
            if (GlobRect$1 === undefined) {
                GlobRect$1 = new Rectangle$1();
            }
            output = GlobRect$1;
        }

        if (gameObject.getBounds && !(gameObject instanceof P3Container)) {
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

    var GlobRect$1 = undefined;

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
            RotateAround$1(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const Rectangle = Phaser.Geom.Rectangle;
    const Union = Phaser.Geom.Rectangle.Union;

    var GetBoundsOfGameObjects = function (gameObjects, out) {
        if (out === undefined) {
            out = new Rectangle();
        } else if (out === true) {
            if (GlobRect === undefined) {
                GlobRect = new Rectangle();
            }
            out = GlobRect;
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

    var GlobRect;

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

    var GetValue$8 = Phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
        var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
        var saveTexture = config.saveTexture;
        var x = GetValue$8(config, 'x', undefined);
        var y = GetValue$8(config, 'y', undefined);
        var width = GetValue$8(config, 'width', undefined);
        var height = GetValue$8(config, 'height', undefined);
        var originX = GetValue$8(config, 'originX', 0);
        var originY = GetValue$8(config, 'originY', 0);
        var padding = GetValue$8(config, 'padding', 0);

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

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$7(config, 'color');
            lineWidth = GetValue$7(config, 'lineWidth');
            fillColor = GetValue$7(config, 'fillColor');
            fillAlpha = GetValue$7(config, 'fillAlpha', 1);
            padding = GetValue$7(config, 'padding', 0);
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

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    var DrawBounds = function (graphics, config) {
        var drawContainer = GetValue$6(config, 'drawContainer', true);

        var gameObjects = GetValue$6(config, 'children');
        if (gameObjects === undefined) {
            gameObjects = this.getAllVisibleChildren([this]);
        }

        if (!drawContainer) {
            gameObjects = gameObjects.filter(function (gameObject) {
                return !gameObject.isRexContainerLite;
            });
        }

        DrawBounds$1(gameObjects, graphics, config);

        return this;
    };

    const RotateAround = Phaser.Math.RotateAround;

    var ChangeOrigin$1 = function (gameObject, originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var deltaXY = {
            x: (originX - gameObject.originX) * gameObject.displayWidth,
            y: (originY - gameObject.originY) * gameObject.displayHeight
        };
        RotateAround(deltaXY, 0, 0, gameObject.rotation);

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

    var methods$1 = {
        changeOrigin: ChangeOrigin,
        drawBounds: DrawBounds,
    };

    Object.assign(
        methods$1,
        Parent,
        AddChild,
        RemoveChild,
        ChildState,
        Transform,
        Position,
        Rotation,
        Scale,
        Visible,
        Alpha,
        Active,
        ScrollFactor,
        CameraFilter,
        Mask,
        Depth,
        Children,
        Tween,
        P3Container$1,
        RenderLayer,
        RenderTexture,
    );

    class ContainerLite extends Base {
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
            return GetParent(child);
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
            var parent = GetParent(this);
            return (parent) ? parent.setParentContainerFlag : false;
        }

    }

    Object.assign(
        ContainerLite.prototype,
        methods$1
    );

    var GetValue$5 = function (source, key, defaultValue) {
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
            return (key === undefined) ? this.data : GetValue$5(this.data, key, defaultValue);
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

    class Cell {
        constructor(parent, config) {
            this.container = null;
            this._deltaHeight = 0;
            this.setParent(parent);
            // this.resetFromJSON(config);
        }

        setParent(parent) {
            this.parent = parent; // parent: table
            this.parentContainer = parent.getParentContainer();
        }

        // resetFromJSON(o) {
        //     return this;
        // }

        destroy(fromScene) {
            if (fromScene === undefined) {
                fromScene = false;
            }

            if (!fromScene) {
                this.destroyContainer();
            }

            this.deltaHeight = 0;
            this.data = undefined;
            this.container = null;
            this.parent = undefined;
            this.parentContainer = undefined;
        }

        get table() {
            return this.parent;
        }

        get scrollMode() {
            return this.parentContainer.scrollMode;
        }

        get colIndx() {
            return this.parent.cellIndxeToColIndex(this.index);
        }

        get rowIndx() {
            return this.parent.cellIndxeToRowIndex(this.index);
        }

        getContainer() {
            return this.container;
        }

        setContainer(container) {
            if (!container) {
                this.destroyContainer();
                return this;
            }

            if (this.container) {
                this.container.destroy();
            }
            this.container = container;
            this.parentContainer.add(container);
            return this;
        }

        destroyContainer() {
            if (this.container) {
                this.container.destroy();
                this.container = null;
            }
            return this;
        }

        popContainer() {
            if (this.container) {
                var container = this.container;
                this.container = null;
                this.parentContainer.remove(container);
                return container;
            } else {
                return null;
            }
        }

        setXY(x, y) {
            if (this.container) {
                this.parentContainer.setChildLocalPosition(this.container, x, y);
            }
            return this;
        }

        setCellContainerAlign(align) {
            if (typeof (align) === 'string') {
                align = AlignConst[align];
            }
            this.cellContainerAlign = align;
            return this;
        }

        get deltaHeight() {
            return this._deltaHeight;
        }

        set deltaHeight(deltaHeight) {
            if (deltaHeight == null) {
                deltaHeight = 0;
            }
            var table = this.parent;
            if ((this._deltaHeight === 0) && (deltaHeight !== 0)) {
                table.nonZeroDeltaHeightCount++;
            } else if ((this._deltaHeight !== 0) && (deltaHeight === 0)) {
                table.nonZeroDeltaHeightCount--;
            }

            var isTableHeightChanged = (this._deltaHeight !== deltaHeight);

            this._deltaHeight = deltaHeight;

            if (isTableHeightChanged) {
                table.resetTotalRowsHeight();
                var eventName = (this.scrollMode === 0) ? 'cellheightchange' : 'cellwidthchange';
                this.parentContainer.emit(eventName, this, this.container, this.parentContainer);
            }
        }

        get deltaWidth() {
            return this.deltaHeight;
        }

        set deltaWidth(deltaWidth) {
            this.deltaHeight = deltaWidth;
        }

        setDeltaHeight(deltaHeight) {
            this.deltaHeight = deltaHeight;
            return this;
        }

        setDeltaWidth(deltaWidth) {
            this.deltaHeight = deltaWidth;
            return this;
        }

        get height() {
            if (this.scrollMode === 0) {
                return this.deltaHeight + this.parent.defaultCellHeight;
            } else {
                return this.parent.defaultCellWidth;
            }
        }

        set height(height) {
            // Only worked when scrollMode is 0
            if (this.scrollMode === 1) {
                return;
            }
            this.setDeltaHeight(height - this.parent.defaultCellHeight);
        }

        setHeight(height) {
            // Only worked when scrollMode is 0
            this.height = height;
            return this;
        }

        get width() {
            if (this.scrollMode === 0) {
                return this.parent.defaultCellWidth;
            } else {
                return this.deltaHeight + this.parent.defaultCellHeight;
            }
        }

        set width(width) {
            // Only worked when scrollMode is 1
            if (this.scrollMode === 0) {
                return;
            }
            this.setDeltaHeight(width - this.parent.defaultCellHeight);
        }

        setWidth(width) {
            this.width = width;
            return this;
        }

        get scene() {
            return this.parentContainer.scene;
        }
    }

    Object.assign(
        Cell.prototype,
        DataMethods
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

    const GetValue$4 = Phaser.Utils.Objects.GetValue;
    const SpliceOne = Phaser.Utils.Array.SpliceOne;

    class Table {
        constructor(parent, config) {
            this.parent = parent; // parent: GridTable game object (Container)
            this.cells = [];
            this.cellPool = new Stack();
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            if (o === undefined) {
                o = {};
            }
            this.colCount = undefined;
            this.nonZeroDeltaHeightCount = 0;
            this.resetTotalRowsHeight();

            var cellHeight = o.cellHeight;
            if (cellHeight === undefined) {
                cellHeight = 60;
            }

            var cellWidth = o.cellWidth;
            if (cellWidth === undefined) {
                cellWidth = 60;
            }

            this.setDefaultCellHeight(cellHeight);
            this.setDefaultCellWidth(cellWidth);
            this.initCells(GetValue$4(o, 'cellsCount', 0));
            this.setColumnCount(GetValue$4(o, 'columns', 1));
            return this;
        }

        destroy(fromScene) {
            // GridTable is destroyed, all cell containers will also be destroyed too
            // Don't have to freeCell
            this.cellPool.destroy();
            this.cells = undefined;
            this.parent = undefined;
        }

        get defaultCellHeightMode() {
            return (this.nonZeroDeltaHeightCount === 0);
        }

        setDefaultCellHeight(height) {
            this.defaultCellHeight = height;
            return this;
        }

        setDefaultCellWidth(width) {
            this.defaultCellWidth = width;
            return this;
        }

        initCells(size) {
            var cells = this.cells;
            cells.length = size;
            for (var i = 0; i < size; i++) {
                cells[i] = null;
            }
            return this;
        }

        insertNewCells(cellIdx, count) {
            var cells = this.cells;
            if (cellIdx === cells.length) {
                // append at end of array
                var endIdx = cellIdx + count;
                cells.legth = endIdx;
                for (var i = cellIdx; i < endIdx; i++) {
                    cells[i] = null;
                }
            } else {
                var newCells = [];
                newCells.length = count;
                for (var i = 0; i < count; i++) {
                    newCells[i] = null;
                }
                this.cells.splice(cellIdx, 0, ...newCells);
            }

            this.resetTotalRowsHeight();
            return this;
        }

        removeCells(cellIdx, count) {
            var endIdx = cellIdx + count;
            for (var i = cellIdx; i < endIdx; i++) {
                this.freeCell(i);
            }

            if (endIdx === this.cells.length) {
                // remove until end of array
                this.cells.length = cellIdx;
            } else {
                if (count === 1) {
                    SpliceOne(this.cells, cellIdx);
                } else {
                    this.cells.splice(cellIdx, count);
                }
                this.buildCellIndex(cellIdx);
            }

            this.resetTotalRowsHeight();
            return this;
        }

        setColumnCount(columns) {
            this.colCount = columns;

            this.resetTotalRowsHeight();

            // Set cellWith according to parent width/height and columns
            var parent = this.parent;
            if (parent.expandCellSize) {
                var width = (parent.scrollMode === 0) ? parent.width : parent.height;
                var cellWidth = width / columns;
                this.setDefaultCellWidth(cellWidth);
            }

            return this;
        }

        get rowCount() {
            return Math.ceil(this.cells.length / this.colCount);
        }

        get cellsCount() {
            return this.cells.length;
        }

        isValidCellIdx(idx) {
            return ((idx >= 0) && (idx < this.cells.length));
        }

        heightToRowIndex(height, roundMode) {
            if (roundMode === undefined) {
                roundMode = 0;
            }
            /*
            roundMode:
            - 0 : floor
            - 1 : ceil
            - 2 :             
                - Default : floor
                - Vary : plus one if rowIdx is an integer, else floor
            */

            if (height === 0) {
                return 0;
            }

            // defaultCellHeightMode
            if (this.defaultCellHeightMode) {
                var rowIdx = height / this.defaultCellHeight;
                switch (roundMode) {
                    case 1:
                        rowIdx = Math.ceil(rowIdx);
                        break;

                    default: // 0, 2
                        rowIdx = Math.floor(rowIdx);
                        break;
                }

                return rowIdx;
            }

            // count cell height one by one
            var rowCount = this.rowCount;
            var remainder = height,
                isValidIdx;
            var rowHeight, rowIdx = 0;

            while (1) {
                rowHeight = this.getRowHeight(rowIdx);
                remainder -= rowHeight;

                isValidIdx = (rowIdx >= 0) && (rowIdx < rowCount);
                if ((remainder > 0) && isValidIdx) {
                    rowIdx += 1;
                } else if (remainder === 0) {
                    if (roundMode === 2) {
                        rowIdx += 1;
                    }
                    return rowIdx;
                } else {
                    if (roundMode === 1) {
                        var preRowIdx = rowIdx;
                        rowIdx += 1;
                        isValidIdx = (rowIdx >= 0) && (rowIdx < rowCount);

                        if (!isValidIdx) {
                            rowIdx = preRowIdx;
                        }
                    }

                    return rowIdx;
                }
            }

        }

        widthToColIndex(width, isCeil) {
            if (width === 0) {
                return 0;
            }

            var colIdx = width / this.defaultCellWidth;
            if (isCeil) {
                colIdx = Math.ceil(colIdx);
            } else {
                colIdx = Math.floor(colIdx);
            }

            return colIdx;
        }

        colRowToCellIndex(colIdx, rowIdx) {
            if (colIdx >= this.colCount) {
                return null;
            }
            return (rowIdx * this.colCount) + colIdx;
        }

        rowIndexToHeight(start, end) {
            // defaultCellHeightMode
            if (this.defaultCellHeightMode) {
                return (end - start + 1) * this.defaultCellHeight;
            }

            var h, sum = 0;
            for (var i = start; i <= end; i++) {
                h = this.getRowHeight(i);
                sum += h;
            }

            return sum;
        }

        colIndexToWidth(start, end) {
            return (end - start + 1) * this.defaultCellWidth;
        };

        getRowHeight(rowIdx) {
            var cnt = this.colCount;
            // single column
            if (cnt <= 1) {
                return this.getCellHeight(this.colRowToCellIndex(0, rowIdx));
            }

            // multiple columns, get the maximum height
            var maxHeight = 0,
                cellHeight;
            for (var i = 0; i < cnt; i++) {
                cellHeight = this.getCellHeight(this.colRowToCellIndex(i, rowIdx));
                if (maxHeight < cellHeight)
                    maxHeight = cellHeight;
            }
            return maxHeight;
        }

        getColWidth(idx) {
            return this.defaultCellWidth;
        }

        getCellHeight(cellIdx) {
            if (!this.isValidCellIdx(cellIdx)) {
                return 0;
            }

            var cellHeight;
            if (this.defaultCellHeightMode)
                cellHeight = this.defaultCellHeight;
            else {
                var cell = this.getCell(cellIdx, false);
                var deltaHeight = (cell) ? cell.deltaHeight : 0;
                cellHeight = this.defaultCellHeight + deltaHeight;
            }

            return cellHeight;
        }

        resetTotalRowsHeight() {
            this._totalRowsHeight = null;
        }

        get totalRowsHeight() {
            if (this._totalRowsHeight === null) {
                this._totalRowsHeight = this.rowIndexToHeight(0, this.rowCount - 1);
            }

            return this._totalRowsHeight;
        }

        get totalColumnWidth() {
            return this.colCount * this.defaultCellWidth;
        }

        cellIndxeToColIndex(cellIdx) {
            return cellIdx % this.colCount;
        }

        cellIndxeToRowIndex(cellIdx) {
            return Math.floor(cellIdx / this.colCount);
        }

        getCell(cellIdx, createNewCell) {
            if (!this.isValidCellIdx(cellIdx)) {
                return null;
            }

            if (createNewCell === undefined) {
                createNewCell = true;
            }
            if ((this.cells[cellIdx] === null) && createNewCell) {
                var cell = this.newCell(cellIdx);
                this.cells[cellIdx] = cell;
            }

            return this.cells[cellIdx];
        }

        newCell(cellIdx) {
            var cell = this.cellPool.pop();
            if (cell === null) {
                cell = new Cell(this);
            } else {
                cell.setParent(this);
            }
            cell.index = cellIdx;

            return cell;
        }

        buildCellIndex(startIdx) {
            if (startIdx === undefined) {
                startIdx = 0;
            }
            var cells = this.cells,
                cell;
            for (var i = startIdx, len = cells.length; i < len; i++) {
                cell = cells[i];
                if (cell) {
                    cell.index = i;
                }
            }
            return this;
        }

        getParentContainer() {
            return this.parent;
        }

        freeCell(cell) {
            if (typeof (cell) === 'number') {
                cell = this.cells[cell];
            }

            if (!cell) {
                return this;
            }

            cell.destroy();
            this.cellPool.push(cell);
            return this;
        }
    }

    var SetTableOY = function (oy) {
        var table = this.table;
        var topTableOY = this.topTableOY;
        var bottomTableOY = this.bottomTableOY;
        var tableOYExceedTop = (oy > topTableOY);
        var tableOYExeceedBottom = (oy < bottomTableOY);
        if (this.clampTableOXY) {
            var rowCount = table.rowCount;
            var visibleRowCount = table.heightToRowIndex(this.instHeight, 1);

            // less then 1 page
            if (rowCount < visibleRowCount) {
                oy = 0;
            } else if (tableOYExceedTop) {
                oy = topTableOY;
            } else if (tableOYExeceedBottom) {
                oy = bottomTableOY;
            }
        }

        if (this._tableOY !== oy) {
            this._tableOY = oy;
        }


        if (tableOYExceedTop) {
            if (!this.execeedTopState) {
                this.emit('execeedtop', this, oy, topTableOY);
            }
        }
        this.execeedTopState = tableOYExceedTop;

        if (tableOYExeceedBottom) {
            if (!this.execeedBottomState) {
                this.emit('execeedbottom', this, oy, bottomTableOY);
            }
        }
        this.execeedBottomState = tableOYExeceedBottom;
        return this;
    };

    var SetTableOX = function (ox) {
        var table = this.table;
        var leftTableOX = this.leftTableOX;
        var rightTableOX = this.rightTableOX;
        var tableOXExeceedLeft = (ox > this.leftTableOX);
        var tableOXExeceedRight = (ox < this.rightTableOX);
        if (this.clampTableOXY) {
            var colCount = table.colCount;
            var visibleColCount = table.widthToColIndex(this.instWidth, true);

            // less then 1 page            
            if (colCount < visibleColCount) {
                ox = 0;
            } else if (tableOXExeceedLeft) {
                ox = leftTableOX;
            } else {
                // var tableVisibleWidth = this.tableVisibleWidth;
                if (tableOXExeceedRight)
                    ox = rightTableOX;
            }
        }

        if (this._tableOX !== ox) {
            this._tableOX = ox;
        }

        if (tableOXExeceedLeft) {
            if (!this.execeedLeftState) {
                this.emit('execeedleft', this, ox, leftTableOX);
            }
        }
        this.execeedLeftState = tableOXExeceedLeft;

        if (tableOXExeceedRight) {
            if (!this.execeedRightState) {
                this.emit('execeedright', this, ox, rightTableOX);
            }
        }
        this.execeedRightState = tableOXExeceedRight;
        return this;
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

    const SetPositionBase = Phaser.GameObjects.Graphics.prototype.setPosition;

    var SetPosition = function (x, y) {
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

    var Contains = function (x, y) {
        x -= this.x;
        y -= this.y;
        return this.geom.contains(x, y);
    };

    var Methods = {
        setPosition: SetPosition,
        resize: Resize,
        setOrigin: SetOrigin,
        contains: Contains,
    };

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

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
            out.left = GetValue$3(config, 'left', 0);
            out.right = GetValue$3(config, 'right', 0);
            out.top = GetValue$3(config, 'top', 0);
            out.bottom = GetValue$3(config, 'bottom', 0);
        }
        return out;
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
        Methods
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

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

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

            this.setMaskUpdateMode(GetValue$2(config, 'updateMode', 0));
            this.enableChildrenMask(GetValue$2(config, 'padding', 0));
            this.setMaskLayer(GetValue$2(config, 'layer', undefined));

            this.onMaskGameObjectVisible = GetValue$2(config, 'onVisible');
            this.onMaskGameObjectInvisible = GetValue$2(config, 'onInvisible');
            this.maskGameObjectCallbackScope = GetValue$2(config, 'scope');

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

    var ShowCells = function () {
        if (this.cellsCount === 0) {
            return;
        }

        // Save scale
        var scaleXSave = this.scaleX;
        var scaleYSave = this.scaleY;
        var scale1 = (scaleXSave === 1) && (scaleYSave === 1);
        if (!scale1) {
            this.setScale(1);
        }

        var table = this.table;

        var tableOYOffset = this.tableOYOffset;
        var tableOY = this.tableOY + tableOYOffset,
            tableOX = this.tableOX;

        this.startRowIndex = Math.max(table.heightToRowIndex(-tableOY, 2), 0);
        var rowIndex = this.startRowIndex;

        var startColumnIndex = Math.max(table.widthToColIndex(-tableOX), 0);
        var columnIndex = startColumnIndex;

        var cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
        var bottomBound = this.bottomBound;
        var rightBound = this.rightBound;
        var lastIdx = table.cellsCount - 1;
        var lastColIdx = table.colCount - 1;

        var startCellTLX = this.getCellTLX(columnIndex),
            cellTLX = startCellTLX;
        var startCellTLY = this.getCellTLY(rowIndex) + tableOYOffset,
            cellTLY = startCellTLY;
        while ((cellTLY < bottomBound) && (cellIdx <= lastIdx)) {
            if (this.table.isValidCellIdx(cellIdx)) {
                var cell = table.getCell(cellIdx, true);
                this.visibleCells.set(cell);
                if (!this.preVisibleCells.contains(cell)) {
                    this.showCell(cell);
                }

                var x, y;
                if (this.scrollMode === 0) {
                    x = cellTLX;
                    y = cellTLY;
                } else {
                    x = cellTLY;
                    y = cellTLX;
                }
                if (cell.cellContainerAlign == null) {
                    cell.setXY(x, y);
                } else {
                    var cellContainer = cell.getContainer();
                    AlignIn(cellContainer, x, y, cell.width, cell.height, cell.cellContainerAlign);
                    cell.setXY(cellContainer.x, cellContainer.y);
                }
            }

            if ((cellTLX < rightBound) && (columnIndex < lastColIdx)) {
                cellTLX += table.getColWidth(columnIndex);
                columnIndex += 1;
            } else {
                cellTLX = startCellTLX;
                cellTLY += table.getRowHeight(rowIndex);

                columnIndex = startColumnIndex;
                rowIndex += 1;
            }

            cellIdx = table.colRowToCellIndex(columnIndex, rowIndex);
        }

        // Restore scale
        if (!scale1) {
            this.setScale(scaleXSave, scaleYSave);
        }
    };

    var ShowCell = function (cell) {
        // Attach container to cell by cell.setContainer(container) under this event
        var reusedCellContainer = null;
        var cellContainer = cell.getContainer();
        if (cellContainer) {
            reusedCellContainer = cellContainer;
            cell.popContainer();
        } else if (this.cellContainersPool) {
            reusedCellContainer = this.cellContainersPool.getFirstDead();
            if (reusedCellContainer !== null) { // Reuse this game object
                reusedCellContainer.setActive(true).setVisible(true);
            }
        }

        this.emit('cellvisible', cell, reusedCellContainer, this);

        if (this.cellContainersPool) {
            var cellContainer = cell.getContainer();
            if (cellContainer) {
                if (reusedCellContainer === null) {
                    this.cellContainersPool.add(cellContainer); // New cell container, add to pool
                } else if (reusedCellContainer !== cellContainer) {
                    // Why reusedCellContainer is not equal to cellContainer?
                    this.cellContainersPool.add(cellContainer); // New cell container, add to pool
                    this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
                }
            } else { // No cell container added
                if (reusedCellContainer !== null) {
                    this.cellContainersPool.killAndHide(reusedCellContainer); // Unused cell container, put back to pool
                }
            }
        }
    };

    var GetCellTLX = function (colIdx) {
        var ox = (this.scrollMode === 0) ? this.topLeftX : this.topLeftY;
        var x = this.tableOX + this.table.colIndexToWidth(0, colIdx - 1) + ox;
        return x;
    };

    var GetCellTLY = function (rowIdx) {
        var oy = (this.scrollMode === 0) ? this.topLeftY : this.topLeftX;
        var y = this.tableOY + this.table.rowIndexToHeight(0, rowIdx - 1) + oy;
        return y;
    };

    var HideCells = function () {
        var preList = this.preVisibleCells;
        var curList = this.visibleCells;
        preList.iterate(function (cell) {
            if (!curList.contains(cell)) {
                this.hideCell(cell);
            }
        }, this);
    };

    var HideCell = function (cell) {
        // Option: pop container of cell by cell.popContainer() under this event 
        this.emit('cellinvisible', cell);

        if (this.cellContainersPool) {
            var cellContainer = cell.popContainer(); // null if already been removed
            if (cellContainer) {
                cellContainer.setScale(1).setAlpha(1);
                this.cellContainersPool.killAndHide(cellContainer);
            }
        }

        cell.destroyContainer(); // Destroy container of cell
    };

    var UpdateTable = function (refresh, maskChildren) {
        if (refresh === undefined) {
            refresh = false;
        }
        if (maskChildren === undefined) {
            maskChildren = false;
        }

        if (refresh) {
            ClearVisibleCellIndexes.call(this);
            this.hideCells();
        }
        ClearVisibleCellIndexes.call(this);
        this.showCells();
        this.hideCells();

        this.setMaskChildrenFlag();

        if (maskChildren) {
            // Layout children-mask
            this.layoutChildrenMask();
            // Re-mask children
            this.maskChildren();
        }

        return this;
    };

    var ClearVisibleCellIndexes = function () {
        var tmp = this.preVisibleCells;
        this.preVisibleCells = this.visibleCells;
        this.visibleCells = tmp;
        this.visibleCells.clear();
    };

    var IsCellVisible = function (cellIdx) {
        var cell = this.table.getCell(cellIdx, false);
        return cell && this.visibleCells.contains(cell);
    };

    var PointToCellIndex = function (x, y) {
        y -= (this.y + this.topLeftY);
        x -= (this.x + this.topLeftX);
        var offsetTableOY = this.tableOY - ((this.scrollMode === 0) ? y : x);
        var offsetTableOX = this.tableOX - ((this.scrollMode === 0) ? x : y);

        var table = this.table;
        var rowIdx = table.heightToRowIndex(-offsetTableOY, 0);
        var colIdx = table.widthToColIndex(-offsetTableOX);
        var cellIdx = table.colRowToCellIndex(colIdx, rowIdx);
        if (cellIdx === null) {
            return null;
        }
        if (!this.isCellVisible(cellIdx)) {
            return null;
        }
        return cellIdx;
    };

    var PointToCellContainer = function (x, y) {
        var cellIdx = PointToCellIndex.call(this, x, y);
        if (cellIdx === null) {
            return undefined;
        }
        return this.getCellContainer(cellIdx);
    };

    // For when you know this Set will be modified during the iteration
    var EachVisibleCell = function (callback, scope) {
        this.visibleCells.each(callback, scope);
        return this;
    };

    // For when you absolutely know this Set won't be modified during the iteration
    var IterateVisibleCell = function (callback, scope) {
        this.visibleCells.iterate(callback, scope);
        return this;
    };

    var EachCell = function (callback, scope) {
        this.table.cells.slice().forEach(callback, scope);
        return this;
    };

    var IterateCell = function (callback, scope) {
        this.table.cells.forEach(callback, scope);
        return this;
    };

    var SetCellsCount = function (count) {
        var cellsCount = this.cellsCount;
        if (cellsCount === count) {
            return this;
        }

        if (cellsCount > count) {
            this.removeCells(count, cellsCount - count);
        } else { // cellsCount < count
            this.insertNewCells(cellsCount, count - cellsCount);
        }
        return this;
    };

    const Clamp = Phaser.Math.Clamp;

    var InsertNewCells = function (cellIdx, count) {
        if (typeof (cellIdx) === 'object') {
            cellIdx = cellIdx.index;
        }
        if (count === undefined) {
            count = 1;
        }
        if (count <= 0) {
            return this;
        }
        cellIdx = Clamp(cellIdx, 0, this.cellsCount);
        this.table.insertNewCells(cellIdx, count);
        return this;
    };

    var RemoveCells = function (cellIdx, count) {
        if (typeof (cellIdx) === 'object') {
            cellIdx = cellIdx.index;
        }
        if (count === undefined) {
            count = 1;
        }
        if (cellIdx < 0) {
            count += cellIdx;
            cellIdx = 0;
        }
        if (count <= 0) {
            return this;
        }
        // out-of-range
        if (cellIdx > this.cellsCount) {
            return this;
        }

        var cell;
        for (var i = cellIdx, endIdx = cellIdx + count; i < endIdx; i++) {
            cell = this.getCell(i, false);
            if (cell) {
                if (this.visibleCells.contains(cell)) {
                    HideCell.call(this, cell);
                    this.visibleCells.delete(cell);
                }
                this.preVisibleCells.delete(cell);
            }
        }

        this.table.removeCells(cellIdx, count);
        return this;
    };

    var SetColumnCount = function (count) {
        if (this.table.colCount === count) {
            return this;
        }
        this.table.setColumnCount(count);
        return this;
    };

    var SetGridSize = function (colCount, rowCount) {
        this.setCellsCount(colCount * rowCount);
        this.table.setColumnCount(colCount);
        return this;
    };

    var UpdateVisibleCell = function (cellIdx) {
        var cell = this.table.getCell(cellIdx, false);
        if (!cell || !cell.container) {
            return this;
        }

        ShowCell.call(this, cell);

        return this;
    };

    var methods = {
        setTableOY: SetTableOY,
        setTableOX: SetTableOX,

        showCells: ShowCells,
        showCell: ShowCell,
        getCellTLX: GetCellTLX,
        getCellTLY: GetCellTLY,
        hideCells: HideCells,
        hideCell: HideCell,
        updateTable: UpdateTable,

        isCellVisible: IsCellVisible,
        pointToCellIndex: PointToCellIndex,
        pointToCellContainer: PointToCellContainer,
        eachVisibleCell: EachVisibleCell,
        iterateVisibleCell: IterateVisibleCell,
        eachCell: EachCell,
        iterateCell: IterateCell,

        setCellsCount: SetCellsCount,
        insertNewCells: InsertNewCells,
        removeCells: RemoveCells,
        setColumnCount: SetColumnCount,
        setGridSize: SetGridSize,
        updateVisibleCell: UpdateVisibleCell
    };

    Object.assign(
        methods,
        ChildrenMaskMethods
    );

    const Group = Phaser.GameObjects.Group;
    const Set = Phaser.Structs.Set;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class GridTable extends ContainerLite {
        constructor(scene, x, y, width, height, config) {
            if (config === undefined) {
                config = {};
            }
            super(scene, x, y, width, height);
            this.type = 'rexGridTable';
            this._tableOX = 0;
            this._tableOY = 0;
            this.visibleCells = new Set();
            this.preVisibleCells = new Set();
            this.execeedTopState = false;
            this.execeedBottomState = false;
            this.execeedLeftState = false;
            this.execeedRightState = false;

            var reuseCellContainer = GetValue$1(config, 'reuseCellContainer', false);
            if (reuseCellContainer) {
                this.cellContainersPool = new Group(scene); // Don't add Group into update list, I will destroy it manually
            }

            var callback = GetValue$1(config, 'cellVisibleCallback', null);
            if (callback !== null) {
                var scope = GetValue$1(config, 'cellVisibleCallbackScope', undefined);
                this.on('cellvisible', callback, scope);
            }
            callback = GetValue$1(config, 'cellInvisibleCallback', null);
            if (callback !== null) {
                var scope = GetValue$1(config, 'cellInvisibleCallbackScope', undefined);
                this.on('cellinvisible', callback, scope);
            }

            if (GetValue$1(config, 'enableLayer', false)) {
                this.enableLayer();
            }

            this.setupChildrenMask(GetValue$1(config, 'mask', undefined));

            this.setScrollMode(GetValue$1(config, 'scrollMode', 0));
            this.setClampMode(GetValue$1(config, 'clampTableOXY', true));
            this.setStartFromBottomEnable(GetValue$1(config, 'startFromBottom', false));

            // Pre-process cell size
            var cellWidth, cellHeight, columns;
            var scrollY = (this.scrollMode === 0);
            if (scrollY) {  // scroll y
                cellWidth = config.cellWidth;
                cellHeight = config.cellHeight;
                columns = config.columns;
            } else {  // scroll x
                cellWidth = config.cellHeight;
                cellHeight = config.cellWidth;
                columns = GetValue$1(config, 'rows', config.columns);
            }

            this.fixedCellSize = GetValue$1(config, 'fixedCellSize', false);
            this.expandCellSize = (!this.fixedCellSize) && (cellWidth === undefined);

            if (!columns) {
                columns = 1;  // Default columns
            }
            if (this.fixedCellSize) {
                columns = Math.max(Math.floor(this.instWidth / cellWidth), 1);
            } else if (this.expandCellSize) {
                var width = (scrollY) ? this.width : this.height;
                cellWidth = width / columns;
            }

            config.cellWidth = cellWidth;
            config.cellHeight = cellHeight;
            config.columns = columns;

            this.table = new Table(this, config);

            this.updateTable();
        }

        destroy(fromScene) {  // preDestroy method does not have fromScene parameter
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.destroyChildrenMask();

            this.table.destroy(fromScene);
            this.table = undefined;
            if (this.cellContainersPool) {
                this.cellContainersPool.destroy(true);
                this.cellContainersPool = undefined;
            }

            super.destroy(fromScene);
        }

        setScrollMode(mode) {
            if (typeof (mode) === 'string') {
                mode = SCROLLMODE[mode.toLowerCase()];
            }
            this.scrollMode = mode;
            return this;
        }

        setClampMode(mode) {
            if (mode === undefined) {
                mode = true;
            }
            this.clampTableOXY = mode;
            return this;
        }

        setStartFromBottomEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.startFromBottomEnable = enable;
            return this;
        }

        get tableOY() {
            return this._tableOY;
        }

        get tableOX() {
            return this._tableOX;
        }

        set tableOY(oy) {
            this.setTableOY(oy).updateTable();
        }

        set tableOX(ox) {
            this.setTableOX(ox).updateTable();
        }

        setTableOXY(ox, oy) {
            this.setTableOY(oy).setTableOX(ox);
            return this;
        }

        addTableOY(dy) {
            this.setTableOY(this.tableOY + dy);
            return this;
        }

        addTableOX(dx) {
            this.setTableOX(this.tableOX + dx);
            return this;
        }

        addTableOXY(dx, dy) {
            this.addTableOY(dy).addTableOX(dx);
            return this;
        }

        setTableOYByPercentage(percentage) {
            this.setTableOY(-this.tableVisibleHeight * percentage);
            return this;
        }

        getTableOYPercentage() {
            var tableVisibleHeight = this.tableVisibleHeight;
            if (tableVisibleHeight === 0) {
                return 0;
            }
            return (this.tableOY / -tableVisibleHeight);
        }

        setTableOXByPercentage(percentage) {
            this.setTableOX(-this.tableVisibleWidth * percentage);
            return this;
        }

        getTableOXPercentage() {
            var tableVisibleWidth = this.tableVisibleWidth;
            if (tableVisibleWidth === 0) {
                return 0;
            }
            return (this.tableOX / -tableVisibleWidth);
        }

        set t(value) {
            this.setTableOYByPercentage(value).updateTable();
        }

        get t() {
            return this.getTableOYPercentage();
        }

        set s(value) {
            this.setTableOXByPercentage(value).updateTable();
        }

        get s() {
            return this.getTableOXPercentage();
        }

        scrollToBottom() {
            this.t = 1;
            // t will be 0 if table does not exceed visible area
            if (this.t === 0) {
                return this;
            }

            // Table height might be expanded while cells are visible        
            do {
                this.t = 1;
            } while (this.t !== 1)

            return this;
        }

        scrollToRow(rowIndex) {
            // To get all height of cells
            this.scrollToBottom();

            var height = this.table.rowIndexToHeight(0, rowIndex - 1);
            this.setTableOY(-height).updateTable();
            return this;
        }

        scrollToNextRow(rowCount) {
            if (rowCount === undefined) {
                rowCount = 1;
            }
            this.scrollToRow(this.startRowIndex + rowCount);
            return this;
        }

        getCell(cellIdx) {
            return this.table.getCell(cellIdx, true);
        }

        getCellContainer(cellIdx) {
            var cell = this.table.getCell(cellIdx, false);
            var container;
            if (cell) {
                container = cell.getContainer();
            }
            return container;
        }

        get cellsCount() {
            return this.table.cellsCount;
        }

        get columnCount() {
            return this.table.colCount;
        }

        setCellHeight(cellIdx, height) {
            var cell;
            if (typeof (cellIdx) === 'number') {
                cell = this.table.getCell(cellIdx, true);
            } else {
                cell = cellIdx;
            }
            cell.height = height; // Only worked when scrollMode is 0
            return this;
        }

        setCellWidth(cellIdx, width) {
            var cell;
            if (typeof (cellIdx) === 'number') {
                cell = this.table.getCell(cellIdx, true);
            } else {
                cell = cellIdx;
            }
            cell.width = width; // Only worked when scrollMode is 1
            return this;
        }

        resetAllCellsSize(width, height) {
            // Swap width and height if scrollMode is 1
            if (this.scrollMode === 1) {
                var temp = width;
                width = height;
                height = temp;
            }

            this.table
                .setDefaultCellHeight(height)
                .setDefaultCellWidth(width);

            var cells = this.table.cells;
            for (var i = 0, cnt = cells.length; i < cnt; i++) {
                var cell = cells[i];
                if (!cell) {
                    continue;
                }
                cell.deltaHeight = 0;
            }

            if (this.fixedCellSize) {
                var colCount = Math.floor(this.instWidth / width);
                this.table.setColumnCount(colCount);
            }

            this.updateTable(true, true);

            return this;
        }

        get instHeight() {
            return (this.scrollMode === 0) ? this.height : this.width;
        }

        get instWidth() {
            return (this.scrollMode === 0) ? this.width : this.height;
        }

        get tableHeight() {
            return this.table.totalRowsHeight;
        }

        get tableWidth() {
            return this.table.totalColumnWidth;
        }

        get tableOYOffset() {
            if (this.startFromBottomEnable) {
                var h = this.tableHeight - this.instHeight;
                if (h < 0) {
                    return -h;
                }
            }

            return 0;
        }

        get topTableOY() {
            return 0;
        }

        get bottomTableOY() {
            return -this.tableVisibleHeight;
        }

        get leftTableOX() {
            return 0;
        }

        get rightTableOX() {
            return -this.tableVisibleWidth;
        }

        get tableVisibleHeight() {
            var h = this.tableHeight - this.instHeight;
            if (h < 0) {
                h = 0;
            }
            return h;
        }

        get tableVisibleWidth() {
            var w = this.tableWidth - this.instWidth;
            if (w < 0) {
                w = 0;
            }
            return w;
        }

        get bottomLeftY() {
            return -(this.displayHeight * this.originY) + this.displayHeight;
        }

        get topRightX() {
            return -(this.displayWidth * this.originX) + this.displayWidth;
        }

        get topLeftX() {
            return -(this.displayWidth * this.originX);
        }

        get topLeftY() {
            return -(this.displayHeight * this.originY)
        }

        get bottomBound() {
            if (this.scrollMode === 0) {
                return this.bottomLeftY;
            } else {
                return this.topRightX;
            }
        }

        get rightBound() {
            if (this.scrollMode === 0) {
                return this.topRightX;
            } else {
                return this.bottomLeftY;
            }
        }

        resize(width, height) {
            if ((this.width === width) && (this.height === height)) {
                return this;
            }

            super.resize(width, height);

            if (this.fixedCellSize) {
                var colCount = Math.floor(this.instWidth / this.table.defaultCellWidth);
                this.table.setColumnCount(colCount);
            } else if (this.expandCellSize) {
                this.table.setDefaultCellWidth(this.instWidth / this.table.colCount);
            }

            this.updateTable(true, true);

            return this;
        }
    }
    // mixin
    Object.assign(
        GridTable.prototype,
        methods
    );

    const SCROLLMODE = {
        v: 0,
        vertical: 0,
        h: 1,
        horizontal: 1
    };

    function Factory (x, y, width, height, config) {
        var gameObject = new GridTable(this.scene, x, y, width, height, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetValue = Phaser.Utils.Objects.GetValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetValue(config, 'width', 256);
        var height = GetValue(config, 'height', 256);
        var gameObject = new GridTable(this.scene, 0, 0, width, height, config);

        // set properties wo modify children
        gameObject.syncChildrenEnable = false;
        BuildGameObject(this.scene, gameObject, config);
        // sync properties of children
        gameObject.syncChildrenEnable = true;
        gameObject.syncPosition().syncVisible().syncAlpha();

        return gameObject;
    }

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

    class GridTablePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexGridTable', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.GridTable', GridTable);

    return GridTablePlugin;

}));
