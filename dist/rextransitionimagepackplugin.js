(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextransitionimagepackplugin = factory());
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
    const RemoveItem$1 = Phaser.Utils.Array.Remove;

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
            RemoveItem$1(this.children, gameObjects,
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

    const DegToRad$4 = Phaser.Math.DegToRad;
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
                    this.rotation = DegToRad$4(value);
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

    const GetValue$k = Phaser.Utils.Objects.GetValue;
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
            state.syncPosition = GetValue$k(config, 'syncPosition', true);
            state.syncRotation = GetValue$k(config, 'syncRotation', true);
            state.syncScale = GetValue$k(config, 'syncScale', true);
            state.syncAlpha = GetValue$k(config, 'syncAlpha', true);
            state.syncScrollFactor = GetValue$k(config, 'syncScrollFactor', true);
            state.syncCameraFilter = GetValue$k(config, 'syncCameraFilter', true);
            state.syncDisplayList = GetValue$k(config, 'syncDisplayList', true);
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

    const DegToRad$3 = Phaser.Math.DegToRad;

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
            localState.rotation = DegToRad$3(angle);
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

    const Rectangle$2 = Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround$3 = Phaser.Math.RotateAround;
    const P3Container = Phaser.GameObjects.Container;

    var GetBounds = function (gameObject, output) {
        if (output === undefined) {
            output = new Rectangle$2();
        } else if (output === true) {
            if (GlobRect$1 === undefined) {
                GlobRect$1 = new Rectangle$2();
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
            RotateAround$3(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const Rectangle$1 = Phaser.Geom.Rectangle;
    const Union = Phaser.Geom.Rectangle.Union;

    var GetBoundsOfGameObjects = function (gameObjects, out) {
        if (out === undefined) {
            out = new Rectangle$1();
        } else if (out === true) {
            if (GlobRect === undefined) {
                GlobRect = new Rectangle$1();
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

    var GetValue$j = Phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
        var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
        var saveTexture = config.saveTexture;
        var x = GetValue$j(config, 'x', undefined);
        var y = GetValue$j(config, 'y', undefined);
        var width = GetValue$j(config, 'width', undefined);
        var height = GetValue$j(config, 'height', undefined);
        var originX = GetValue$j(config, 'originX', 0);
        var originY = GetValue$j(config, 'originY', 0);
        var padding = GetValue$j(config, 'padding', 0);

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

    const GetValue$i = Phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$i(config, 'color');
            lineWidth = GetValue$i(config, 'lineWidth');
            fillColor = GetValue$i(config, 'fillColor');
            fillAlpha = GetValue$i(config, 'fillAlpha', 1);
            padding = GetValue$i(config, 'padding', 0);
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

    const GetValue$h = Phaser.Utils.Objects.GetValue;

    var DrawBounds = function (graphics, config) {
        var drawContainer = GetValue$h(config, 'drawContainer', true);

        var gameObjects = GetValue$h(config, 'children');
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

    const RotateAround$2 = Phaser.Math.RotateAround;

    var ChangeOrigin$1 = function (gameObject, originX, originY) {
        if (originY === undefined) {
            originY = originX;
        }

        var deltaXY = {
            x: (originX - gameObject.originX) * gameObject.displayWidth,
            y: (originY - gameObject.originY) * gameObject.displayHeight
        };
        RotateAround$2(deltaXY, 0, 0, gameObject.rotation);

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

    var SetTransitionCallbackMethods = {
        setTransitionStartCallback(callback, scope) {
            this.onStartCallback = callback;
            this.onStartCallbackScope = scope;
            return this;
        },

        setTransitionProgressCallback(callback, scope) {
            this.onProgressCallback = callback;
            this.onProgressCallbackScope = scope;
            return this;
        },

        setTransitionCompleteCallback(callback, scope) {
            this.onCompleteCallback = callback;
            this.onCompleteCallbackScope = scope;
            return this;
        },
    };

    var EventEmitterMethods = {
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

    const GetValue$g = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$g(config, 'eventEmitter', true));

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
        EventEmitterMethods
    );

    const GetValue$f = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$f(config, 'tickingMode', 1));
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

    const GetValue$e = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$e(config, 'tickEventName', defaultEventName);
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

    const GetValue$d = Phaser.Utils.Objects.GetValue;
    const Clamp$3 = Phaser.Math.Clamp;

    class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$d(o, 'state', IDLE);
            this.timeScale = GetValue$d(o, 'timeScale', 1);
            this.delay = GetValue$d(o, 'delay', 0);
            this.repeat = GetValue$d(o, 'repeat', 0);
            this.repeatCounter = GetValue$d(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$d(o, 'repeatDelay', 0);
            this.duration = GetValue$d(o, 'duration', 0);
            this.nowTime = GetValue$d(o, 'nowTime', 0);
            this.justRestart = GetValue$d(o, 'justRestart', false);
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
            this.state = IDLE;
            return this;
        }

        update(time, delta) {
            if (this.state === IDLE || this.state === DONE ||
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
                case IDLE:
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
            return Clamp$3(t, 0, 1);
        }

        set t(value) {
            value = Clamp$3(value, -1, 1);
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
            return this.state === IDLE;
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

    const IDLE = 0;
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

    const GetValue$c = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$c(o, 'timer'));
            this.setEnable(GetValue$c(o, 'enable', true));
            this.setTarget(GetValue$c(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
            this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
            this.setEase(GetValue$c(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$c(o, 'repeat', 0));

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

    const GetValue$b = Phaser.Utils.Objects.GetValue;
    const Linear$2 = Phaser.Math.Linear;

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
            this.propertyKey = GetValue$b(config, 'key', 'value');
            var currentValue = target[this.propertyKey];
            this.fromValue = GetValue$b(config, 'from', currentValue);
            this.toValue = GetValue$b(config, 'to', currentValue);

            this.setEase(GetValue$b(config, 'ease', this.ease));
            this.setDuration(GetValue$b(config, 'duration', this.duration));
            this.setRepeat(GetValue$b(config, 'repeat', 0));
            this.setDelay(GetValue$b(config, 'delay', 0));
            this.setRepeatDelay(GetValue$b(config, 'repeatDelay', 0));

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

            target[this.propertyKey] = Linear$2(this.fromValue, this.toValue, t);
        }
    }

    var FitTo = function (source, target, fitMode, out) {
        if (fitMode === undefined) {
            fitMode = 0;
        } else {
            var fitModeType = typeof (fitMode);
            if (fitModeType === 'boolean') {
                out = fitMode;
                fitMode = 0;
            } else if (fitModeType === 'string') {
                fitMode = FitModeMap[fitMode];
            }
        }

        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globalSize;
        }

        var scaleX = target.width / source.width;
        var scaleY = target.height / source.height;
        var scale = (!fitMode) ? Math.min(scaleX, scaleY) : Math.max(scaleX, scaleY);
        out.width = source.width * scale;
        out.height = source.height * scale;

        return out;
    };

    const FitModeMap = {
        'fit': 0,
        'FIT': 0,
        'envelop': 1,
        'ENVELOP': 1
    };

    var globalSize = {};

    var FitImages = function () {
        var scaleMode = this.scaleMode - 1;  // 1->0(FIT), 2->1(ENVELOP)
        for (var i = 0, cnt = this.images.length; i < cnt; i++) {
            var image = this.images[i];
            var result = FitTo(image, this, scaleMode, true);
            var biasScale = result.width / image.width;
            this.setChildLocalScale(image, biasScale);
            image.biasScale = biasScale;
        }
    };

    var OnTextureChange = function (newImage) {
        if (this.scaleMode === 0) {
            this.resize(newImage.width, newImage.height);

        } else {
            // Fit all images to parent's size
            FitImages.call(this);
        }
    };

    const IsPlainObject$5 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$a = Phaser.Utils.Objects.GetValue;
    const GetRandomItem = Phaser.Utils.Array.GetRandom;

    var DirMode = {
        out: 0,
        in: 1
    };

    var GetValueFromConfigs = function (key, defaultValue, ...configs) {
        for (var i = 0, cnt = configs.length; i < cnt; i++) {
            var config = configs[i];
            if (config && config.hasOwnProperty(key)) {
                return config[key];
            }
        }
        return defaultValue;
    };

    var TransitionMethods = {
        setTransitionDirection(dir) {
            if (typeof (dir) === 'string') {
                dir = DirMode[dir];
            }
            this.dir = dir;
            return this;
        },

        setDuration(duration) {
            this.duration = duration;
            return this;
        },

        setEaseFunction(ease) {
            this.easeFunction = ease;
            return this;
        },

        setNextTexture(texture, frame) {
            this.nextImage.setTexture(texture, frame);

            OnTextureChange.call(this, this.nextImage);
            return this;
        },

        transit(texture, frame, mode) {
            if (this.isRunning) {
                this.ignoreCompleteEvent = true;
                this.stop();
                this.ignoreCompleteEvent = false;
            }

            if (mode !== undefined) {
                texture = {
                    key: texture,
                    frame: frame,
                    mode: mode
                };
            }

            this.currentTransitionMode = undefined;

            if (IsPlainObject$5(texture)) {
                var config = texture;
                texture = GetValue$a(config, 'key', undefined);
                frame = GetValue$a(config, 'frame', undefined);

                mode = GetValue$a(config, 'mode');
                if (Array.isArray(mode)) {
                    mode = GetRandomItem(mode);
                }

                var modeConfig;
                if (this.transitionModes && this.transitionModes.hasOwnProperty(mode)) {
                    modeConfig = this.transitionModes[mode];
                    this.currentTransitionMode = mode;
                }

                this
                    .setDuration(GetValueFromConfigs('duration', this.duration, config, modeConfig))
                    .setEaseFunction(GetValueFromConfigs('ease', this.easeFunction, config, modeConfig))
                    .setTransitionDirection(GetValueFromConfigs('dir', this.dir, config, modeConfig));

                var maskGameObject = GetValueFromConfigs('mask', undefined, config, modeConfig);
                if (maskGameObject) {
                    this.setMaskGameObject(maskGameObject);
                }
                this.setMaskEnable(maskGameObject === true);

                var onStart = GetValueFromConfigs('onStart', undefined, config, modeConfig);
                var onProgress = GetValueFromConfigs('onProgress', undefined, config, modeConfig);
                var onComplete = GetValueFromConfigs('onComplete', undefined, config, modeConfig);
                if ((onStart !== undefined) || (onProgress !== undefined) || (onComplete !== undefined)) {
                    this
                        .setTransitionStartCallback(
                            onStart,
                            GetValueFromConfigs('onStartScope', undefined, config, modeConfig)
                        )
                        .setTransitionProgressCallback(
                            onProgress,
                            GetValueFromConfigs('onProgressScope', undefined, config, modeConfig)
                        )
                        .setTransitionCompleteCallback(
                            onComplete,
                            GetValueFromConfigs('onCompleteScope', undefined, config, modeConfig)
                        );
                }
            }

            this.setNextTexture(texture, frame);

            this.start();
            return this;
        },

        addTransitionMode(name, config) {
            if (this.transitionModes === undefined) {
                this.transitionModes = {};
            }

            if (IsPlainObject$5(name)) {
                config = name;
                name = config.name;
                delete config.name;
            }

            this.transitionModes[name] = config;
            return this;
        },

        start() {
            if (this.easeValueTask === undefined) {
                this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
            }
            this.easeValueTask.restart({
                key: 't', from: 0, to: 1,
                duration: this.duration,
                ease: this.easeFunction
            });
            return this;
        },

        pause() {
            if (this.easeValueTask) {
                this.easeValueTask.pause();
            }
            return this;
        },

        resume() {
            if (this.easeValueTask) {
                this.easeValueTask.resume();
            }
            return this;
        },

        stop() {
            if (this.easeValueTask) {
                this.easeValueTask.stop();
            }
            this.setT(1);
            return this;
        },
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

    const GetValue$9 = Phaser.Utils.Objects.GetValue;

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
            out.left = GetValue$9(config, 'left', 0);
            out.right = GetValue$9(config, 'right', 0);
            out.top = GetValue$9(config, 'top', 0);
            out.bottom = GetValue$9(config, 'bottom', 0);
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

    var MaskMethods = {
        setMaskGameObject(gameObject) {
            if (!gameObject) {
                this.removeMaskGameObject();
                return this;
            }

            if (this.maskGameObject) {
                if ((gameObject === true) && (this.maskGameObject instanceof DefaultMaskGraphics)) {
                    return this;
                }
                if (this.maskGameObject === gameObject) {
                    return this;
                }

                // Remove previous Mask Game Object
                this.removeMaskGameObject();
            }

            // Add new Mask Game Object
            if (gameObject === true) {
                gameObject = new DefaultMaskGraphics(this);
            }

            gameObject
                .resize(this.width, this.height)
                .setOrigin(this.originX, this.originY)
                .setPosition(0, 0)
                .setScale(1)
                .setVisible(false);
            this.addLocal(gameObject);
            this.maskGameObject = gameObject;

            if (!gameObject._maskObject) {
                gameObject._maskObject = gameObject.createGeometryMask();
                gameObject.once('destroy', function () {
                    gameObject._maskObject.destroy();
                    gameObject._maskObject = undefined;
                });
            }
            this.childrenMask = gameObject._maskObject;

            return this;
        },

        removeMaskGameObject(destroyMaskGameObject) {
            if (destroyMaskGameObject === undefined) {
                destroyMaskGameObject = true;
            }

            this.backImage.clearMask();
            this.frontImage.clearMask();
            this.childrenMask = undefined;
            this.remove(this.maskGameObject, destroyMaskGameObject);
            this.maskGameObject = undefined;
            return this;
        },

        setImageMaskEnable(gameObject, enable, invertAlpha) {
            if (enable === undefined) {
                enable = true;
            }
            if (invertAlpha === undefined) {
                invertAlpha = false;
            }

            if (enable) {
                // Use DefaultMaskGraphics if not given    
                if (!this.childrenMask) {
                    this.setMaskGameObject(true);
                }
                gameObject.setMask(this.childrenMask);
                this.childrenMask.setInvertAlpha(invertAlpha);
            } else {
                gameObject.clearMask();
            }

            return this;
        },

        setCurrentImageMaskEnable(enable, invertAlpha) {
            this.setImageMaskEnable(this.currentImage, enable, invertAlpha);
            return this;
        },

        setNextImageMaskEnable(enable, invertAlpha) {
            this.setImageMaskEnable(this.nextImage, enable, invertAlpha);
            return this;
        },

        setCellImagesMaskEnable(enable, invertAlpha) {
            var cellImages = this.getCellImages();
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                this.setImageMaskEnable(cellImages[i], enable, invertAlpha);
            }
            return this;
        },

        setMaskEnable(enable, invertAlpha) {
            this.setImageMaskEnable(this.backImage, enable, invertAlpha);
            this.setImageMaskEnable(this.frontImage, enable, invertAlpha);
            this.setCellImagesMaskEnable(enable, invertAlpha);
            return this;
        }
    };

    var GetFrameNameCallback = function (baseFrameName, delimiter) {
        if (typeof (baseFrameName) === 'object') {
            baseFrameName = baseFrameName.name;
        }

        if (delimiter === undefined) {
            delimiter = ',';
        }

        var callback;
        if (baseFrameName === '__BASE') {
            callback = function (colIndex, rowIndex) {
                return `${colIndex}${delimiter}${rowIndex}`;
            };
        } else {
            callback = function (colIndex, rowIndex) {
                return `${baseFrameName}_${colIndex}${delimiter}${rowIndex}`;
            };
        }

        return callback;
    };

    var GenerateFrames = function (scene, key, frame, columns, rows, getFrameNameCallback) {
        if (frame == null) {
            frame = '__BASE';
        }

        if (!getFrameNameCallback) {
            getFrameNameCallback = GetFrameNameCallback(frame, getFrameNameCallback);
        }

        var texture = scene.sys.textures.get(key);
        var baseFrame = (typeof (frame) === 'object') ? frame : texture.get(frame);

        var baseWidth = baseFrame.width,
            baseHeight = baseFrame.height;

        var cellX, cellY, cellName;
        var cellWidth = baseWidth / columns,
            cellHeight = baseHeight / rows;

        var frameCutX = baseFrame.cutX,
            frameCutY = baseFrame.cutY;
        var offsetX = 0,
            offsetY = 0;
        for (var y = 0; y < rows; y++) {
            offsetX = 0;
            for (var x = 0; x < columns; x++) {
                cellName = getFrameNameCallback(x, y);

                cellX = offsetX + frameCutX;
                cellY = offsetY + frameCutY;

                texture.add(
                    cellName, 0,
                    cellX, cellY,
                    cellWidth, cellHeight
                );

                offsetX += cellWidth;
            }
            offsetY += cellHeight;
        }

        return {
            getFrameNameCallback: getFrameNameCallback,
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            columns: columns,
            rows: rows
        }
    };

    const GetValue$8 = Phaser.Utils.Objects.GetValue;
    const DefaultImageClass = Phaser.GameObjects.Image;
    const IsPlainObject$4 = Phaser.Utils.Objects.IsPlainObject;
    const RotateAround$1 = Phaser.Math.RotateAround;

    var GridCutImage = function (gameObject, columns, rows, config) {
        if (IsPlainObject$4(columns)) {
            config = columns;
            columns = GetValue$8(config, 'columns', 1);
            rows = GetValue$8(config, 'rows', 1);
        }

        var createImageCallback = GetValue$8(config, 'createImageCallback');
        if (!createImageCallback) {
            var ImageClass = GetValue$8(config, 'ImageClass', DefaultImageClass);
            createImageCallback = function (scene, key, frame) {
                return new ImageClass(scene, 0, 0, key, frame);
            };
        }

        var originX = GetValue$8(config, 'originX', 0.5);
        var originY = GetValue$8(config, 'originY', 0.5);

        var addToScene = GetValue$8(config, 'add', true);

        var align = GetValue$8(config, 'align', addToScene);

        var imageObjectPool = GetValue$8(config, 'objectPool', undefined);

        var scene = gameObject.scene;
        var texture = gameObject.texture;
        var frame = gameObject.frame;

        var result = GenerateFrames(scene, texture, frame, columns, rows);
        var getFrameNameCallback = result.getFrameNameCallback;
        var scaleX = gameObject.scaleX,
            scaleY = gameObject.scaleY;
        var rotation = gameObject.rotation;
        var topLeft = gameObject.getTopLeft(),
            startX = topLeft.x,
            startY = topLeft.y;

        var cellGameObjects = [];
        var scaleCellWidth = result.cellWidth * scaleX,
            scaleCellHeight = result.cellHeight * scaleY;
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < columns; x++) {
                var cellGameObject;

                var frameName = getFrameNameCallback(x, y);
                if (imageObjectPool && (imageObjectPool.length > 0)) {
                    cellGameObject = (imageObjectPool.pop()).setTexture(texture, frameName);
                } else {
                    cellGameObject = createImageCallback(scene, texture, frameName);
                }

                if (addToScene) {
                    scene.add.existing(cellGameObject);
                }

                if (align) {
                    var cellTLX = startX + (scaleCellWidth * x);
                    var cellTLY = startY + (scaleCellHeight * y);
                    var cellX = cellTLX + (originX * scaleCellWidth);
                    var cellY = cellTLY + (originY * scaleCellHeight);

                    cellGameObject
                        .setOrigin(originX, originY)
                        .setPosition(cellX, cellY)
                        .setScale(scaleX, scaleY)
                        .setRotation(rotation);
                    RotateAround$1(cellGameObject, startX, startY, rotation);
                }

                cellGameObjects.push(cellGameObject);
            }
        }

        return cellGameObjects;
    };

    var GridCutMethods = {
        gridCutImage(gameObject, columns, rows, config) {
            if (config === undefined) {
                config = {};
            }
            config.objectPool = this.imagesPool;
            var cellImages = GridCutImage(gameObject, columns, rows, config),
                cellImage;
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                cellImage = cellImages[i];
                cellImage.setVisible(true);
                this.add(cellImage);
            }

            this.cellImages = cellImages;
            this.setChildLocalVisible(gameObject, false);  // Set cut target to invisible
            return cellImages;
        },

        gridCutCurrentImage(columns, rows, config) {
            return this.gridCutImage(this.currentImage, columns, rows, config);
        },

        gridCutNextImage(columns, rows, config) {
            return this.gridCutImage(this.nextImage, columns, rows, config);
        },

        getCellImages() {
            return this.cellImages;
        },

        freeCellImages() {
            if (this.cellImages.length === 0) {
                return this;
            }

            var texture = this.cellImages[0].texture;
            var cellImages = this.cellImages,
                cellImage, frameName;
            for (var i = 0, cnt = cellImages.length; i < cnt; i++) {
                cellImage = cellImages[i];

                // Reset property of cell image
                this
                    .setChildLocalAlpha(cellImage, 1)
                    .setChildLocalScale(cellImage, 1)
                    .setChildLocalVisible(cellImage, false);

                cellImage.clearMask();

                // Remove frame object
                frameName = cellImage.frame.name;
                cellImage.setTexture();
                texture.remove(frameName);
            }

            this.imagesPool.push(...cellImages);
            cellImages.length = 0;

            return this;
        }
    };

    var FlipMethods = {
        setFlipX(value) {
            this.flipX = value;
            return this;
        },
        setFlipY(value) {
            this.flipY = value;
            return this;
        },
        toggleFlipX() {
            this.flipX = !this.flipX;
            return this;
        },
        toggleFlipY() {
            this.flipY = !this.flipY;
            return this;
        },
        setFlip(x, y) {
            this.flipX = x;
            this.flipY = y;
            return this;
        },
        resetFlip() {
            this.flipX = false;
            this.flipY = false;
            return this;
        }
    };

    var methods = {
    };

    Object.assign(
        methods,
        SetTransitionCallbackMethods,
        TransitionMethods,
        MaskMethods,
        GridCutMethods,
        FlipMethods
    );

    var OnStart = function (parent, currentImage, nextImage, t) {
    };

    var OnProgress = function (parent, currentImage, nextImage, t) {
        parent
            .setChildLocalAlpha(currentImage, 1 - t)
            .setChildLocalAlpha(nextImage, t);
    };

    var OnComplete = function (parent, currentImage, nextImage, t) {
        parent.setChildLocalAlpha(currentImage, 1);
    };

    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$7 = Phaser.Utils.Objects.GetValue;
    const Clamp$2 = Phaser.Math.Clamp;

    class TransitionImage extends ContainerLite {
        constructor(scene, x, y, texture, frame, config) {
            if (IsPlainObject$3(x)) {
                config = x;
                x = GetValue$7(config, 'x', 0);
                y = GetValue$7(config, 'y', 0);
                texture = GetValue$7(config, 'key', undefined);
                frame = GetValue$7(config, 'frame', undefined);
            } else if (IsPlainObject$3(frame)) {
                config = frame;
                frame = undefined;
            }

            var backImage = GetValue$7(config, 'back', undefined);
            var frontImage = GetValue$7(config, 'front', undefined);
            if (!backImage) {
                backImage = scene.add.image(x, y, texture, frame);
            }
            if (!frontImage) {
                frontImage = scene.add.image(x, y, texture, frame);
            }

            var width = GetValue$7(config, 'width', undefined);
            var height = GetValue$7(config, 'height', undefined);
            var scaleMode = ((width !== undefined) && (height !== undefined)) ? 1 : 0;

            if (width === undefined) {
                width = frontImage.width;
            }
            if (height === undefined) {
                height = frontImage.height;
            }

            super(scene, x, y, width, height);
            this.type = 'rexTransitionImage';
            this._flipX = false;
            this._flipY = false;

            scaleMode = GetValue$7(config, 'scaleMode', scaleMode);
            if (typeof (scaleMode) === 'string') {
                scaleMode = ScaleModeMap[scaleMode];
            }
            this.scaleMode = scaleMode;

            backImage.setVisible(false);
            this.addMultiple([backImage, frontImage]);

            this.backImage = backImage;
            this.frontImage = frontImage;
            this.images = [this.backImage, this.frontImage];
            this.maskGameObject = undefined;
            this.cellImages = [];
            this.imagesPool = [];
            this.transitionModes = undefined;
            this.currentTransitionMode = undefined;

            // Transition parameters
            var onStart = GetValue$7(config, 'onStart', undefined);
            var onProgress = GetValue$7(config, 'onProgress', undefined);
            var onComplete = GetValue$7(config, 'onComplete', undefined);
            var dir = GetValue$7(config, 'dir', 0);
            if ((onStart === undefined) && (onProgress === undefined) && (onComplete === undefined)) {
                onStart = OnStart;
                onProgress = OnProgress;
                onComplete = OnComplete;
                dir = 0;
            }

            this
                .setTransitionStartCallback(
                    onStart,
                    GetValue$7(config, 'onStartScope', undefined)
                )
                .setTransitionProgressCallback(
                    onProgress,
                    GetValue$7(config, 'onProgressScope', undefined)
                )
                .setTransitionCompleteCallback(
                    onComplete,
                    GetValue$7(config, 'onCompleteScope', undefined)
                )
                .setTransitionDirection(dir)
                .setDuration(GetValue$7(config, 'duration', 1000))
                .setEaseFunction(GetValue$7(config, 'ease', 'Linear'));

            var maskGameObject = GetValue$7(config, 'mask', undefined);
            if (maskGameObject) {
                this.setMaskGameObject(maskGameObject);
            }
            this.setMaskEnable(false);

            this.ignoreCompleteEvent = false;

            OnTextureChange.call(this, this.frontImage);
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            if (this.childrenMask) {
                this.childrenMask.destroy();
                this.childrenMask = undefined;
            }
            this.backImage = undefined;
            this.frontImage = undefined;
            this.images.length = 0;
            this.maskGameObject = undefined;
            this.cellImages.length = 0;
            this.imagesPool.length = 0;
            this.transitionModes = undefined;

            super.destroy(fromScene);

            this.onStartCallback = undefined;
            this.onStartCallbackScope = undefined;
            this.onProgressCallback = undefined;
            this.onProgressCallbackScope = undefined;
            this.onCompleteCallback = undefined;
            this.onCompleteCallbackScope = undefined;
            this.easeValueTask = undefined;
        }

        get currentImage() {
            return (this.dir === 0) ? this.frontImage : this.backImage;
        }

        get nextImage() {
            return (this.dir === 0) ? this.backImage : this.frontImage;
        }

        get texture() {
            return this.nextImage.texture;
        }

        get frame() {
            return this.nextImage.frame;
        }

        get tint() {
            return this._tint;
        }

        set tint(value) {
            if (this._tint === value) {
                return;
            }

            this._tint = value;
            this.backImage.setTint(value);
            this.frontImage.setTint(value);
        }

        setTint(value) {
            this.tint = value;
            return this;
        }

        get flipX() {
            return this._flipX;
        }

        set flipX(value) {
            if (this._flipX === value) {
                return;
            }

            this._flipX = value;
            this.backImage.setFlipX(value);
            this.frontImage.setFlipX(value);
        }

        setFlipX(value) {
            this.flipX = value;
            return this;
        }

        toggleFlipX() {
            this.flipX = !this.flipX;
            return this;
        }

        get flipY() {
            return this._flipY;
        }

        set flipY(value) {
            if (this._flipY === value) {
                return;
            }
            this._flipY = value;
            this.backImage.setFlipY(value);
            this.frontImage.setFlipY(value);
        }

        setFlipY(value) {
            this.flipY = value;
            return this;
        }

        toggleFlipY() {
            this.flipY = !this.flipY;
            return this;
        }

        setFlip(flipX, flipY) {
            this.flipX = flipX;
            this.flipY = flipY;
            return this;
        }

        get t() {
            return this._t;
        }

        set t(value) {
            value = Clamp$2(value, 0, 1);
            if (this._t === value) {
                return;
            }
            this._t = value;

            var currentImage = this.currentImage;
            var nextImage = this.nextImage;

            // Start
            if (value === 0) {
                this
                    .setChildVisible(this.frontImage, true)
                    .setChildVisible(this.backImage, true);

                RunCallback.call(this,
                    this.onStartCallback, this.onStartCallbackScope,
                    this, currentImage, nextImage, value
                );
            }

            // Progress
            RunCallback.call(this,
                this.onProgressCallback, this.onProgressCallbackScope,
                this, currentImage, nextImage, value
            );

            // Complete
            if (value === 1) {
                RunCallback.call(this,
                    this.onCompleteCallback, this.onCompleteCallbackScope,
                    this, currentImage, nextImage, value
                );

                var key = nextImage.texture.key,
                    frame = nextImage.frame.name;
                this.frontImage.setTexture(key, frame);
                this.backImage.setTexture(key, frame);
                OnTextureChange.call(this, nextImage);

                this
                    .setChildVisible(this.frontImage, true)
                    .setChildVisible(this.backImage, false)
                    .setMaskEnable(false)
                    .freeCellImages();
            }

            if ((value === 1) && (!this.ignoreCompleteEvent)) {
                this.emit('complete');
            }
        }

        setT(value) {
            this.t = value;
            return this;
        }

        get isRunning() {
            return (this.easeValueTask) ? this.easeValueTask.isRunning : false;
        }

        setOrigin(originX, originY) {
            super.setOrigin(originX, originY);

            this.backImage.setOrigin(originX, originY);
            this.frontImage.setOrigin(originX, originY);

            if (this.maskGameObject) {
                this.maskGameObject.setOrigin(originX, originY);
            }

            return this;
        }

        setTexture(texture, frame) {
            // Without transition
            this.frontImage.setTexture(texture, frame);
            this.backImage.setTexture(texture, frame).setVisible(false);

            OnTextureChange.call(this, this.frontImage);

            return this;
        }

        setSize(width, height) {
            super.setSize(width, height);

            if (this.scaleMode) {
                FitImages.call(this);
            }

            return this;
        }
    }

    var RunCallback = function (callback, scope, parent, currentImage, nextImage, t) {
        if (!callback) {
            return;
        }

        if (this.scaleMode) {
            var localScale;
            if (currentImage.biasScale > 0) {
                localScale = this.getChildLocalScaleX(currentImage);
                localScale = localScale / currentImage.biasScale;
                this.setChildLocalScale(currentImage, localScale);
            }
            if (nextImage.biasScale) {
                localScale = this.getChildLocalScaleX(nextImage);
                localScale = localScale / nextImage.biasScale;
                this.setChildLocalScale(nextImage, localScale);
            }
        }

        if (scope) {
            callback.call(scope, parent, currentImage, nextImage, t);
        } else {
            callback(parent, currentImage, nextImage, t);
        }

        if (this.scaleMode) {
            var localScale;
            if (currentImage.biasScale > 0) {
                localScale = this.getChildLocalScaleX(currentImage);
                localScale = localScale * currentImage.biasScale;
                this.setChildLocalScale(currentImage, localScale);
            }
            if (nextImage.biasScale) {
                localScale = this.getChildLocalScaleX(nextImage);
                localScale = localScale * nextImage.biasScale;
                this.setChildLocalScale(nextImage, localScale);
            }
        }
    };

    // mixin
    Object.assign(
        TransitionImage.prototype,
        methods
    );

    const ScaleModeMap = {
        fit: 1,
        FIT: 1,
        envelop: 2,
        ENVELOP: 2
    };

    // Slide modes
    const SlideLeft = 'slideLeft';
    const SlideRight = 'slideRight';
    const SlideUp = 'slideUp';
    const SlideDown = 'slideDown';
    const SlideAwayLeft = 'slideAwayLeft';
    const SlideAwayRight = 'slideAwayRight';
    const SlideAwayUp = 'slideAwayUp';
    const SlideAwayDown = 'slideAwayDown';
    const PushLeft = 'pushLeft';
    const PushRight = 'pushRight';
    const PushUp = 'pushUp';
    const PushDown = 'pushDown';

    // Zoom modes
    const ZoomOut = 'zoomOut';
    const ZoomIn = 'zoomIn';
    const ZoomInOut = 'zoomInOut';

    // Fade effect mode
    const Fade = 'fade';
    const CrossFade = 'crossFade';

    // Wipe modes
    const WipeLeft = 'wipeLeft';
    const WipeRight = 'wipeRight';
    const WipeUp = 'wipeUp';
    const WipeDown = 'wipeDown';

    // Iris modes
    const IrisOut = 'irisOut';
    const IrisIn = 'irisIn';
    const IrisInOut = 'irisInOut';

    // Pie modes
    const PieOut = 'pieOut';
    const PieIn = 'pieIn';
    const PieInOut = 'pieInOut';

    // blinds, squares, diamonds, circles, curtain
    const Blinds = 'blinds';
    const Squares = 'squares';
    const Diamonds = 'diamonds';
    const Circles = 'circles';
    const Curtain = 'curtain';

    // Shader effect modes
    const Pixellate = 'pixellate';
    const Dissolve = 'dissolve';

    const RevealLeft = 'revealLeft';
    const RevealRight = 'revealRight';
    const RevealUp = 'revealUp';
    const RevealDown = 'revealDown';

    var AddSlideAwayModes = function (image) {
        image
            .addTransitionMode(SlideAwayRight, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = currentImage.width * (t);
                    parent.setChildLocalPosition(currentImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                },
            })
            .addTransitionMode(SlideAwayLeft, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = currentImage.width * (-t);
                    parent.setChildLocalPosition(currentImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                },
            })
            .addTransitionMode(SlideAwayDown, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var y = currentImage.height * (t);
                    parent.setChildLocalPosition(currentImage, 0, y);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                },
            })
            .addTransitionMode(SlideAwayUp, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var y = currentImage.height * (-t);
                    parent.setChildLocalPosition(currentImage, 0, y);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                },
            });

    };

    var AddSlideModes = function (image) {
        image
            .addTransitionMode(SlideRight, {
                ease: 'Linear', dir: 'in', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = nextImage.width * (t - 1);
                    parent.setChildLocalPosition(nextImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .addTransitionMode(SlideLeft, {
                ease: 'Linear', dir: 'in', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var x = nextImage.width * (1 - t);
                    parent.setChildLocalPosition(nextImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .addTransitionMode(SlideDown, {
                ease: 'Linear', dir: 'in', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var y = nextImage.height * (t - 1);
                    parent.setChildLocalPosition(nextImage, 0, y);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .addTransitionMode(SlideUp, {
                ease: 'Linear', dir: 'in', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var y = nextImage.height * (1 - t);
                    parent.setChildLocalPosition(nextImage, 0, y);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            });
    };

    var AddSliderModes = function (image) {
        image
            .addTransitionMode(PushRight, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    // SlideAwayRight
                    var x = currentImage.width * (t);
                    parent.setChildLocalPosition(currentImage, x, 0);

                    // SlideLeft
                    var x = nextImage.width * (t - 1);
                    parent.setChildLocalPosition(nextImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .addTransitionMode(PushLeft, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    // SlideAwayLeft
                    var x = currentImage.width * (-t);
                    parent.setChildLocalPosition(currentImage, x, 0);

                    // SlideRight
                    var x = nextImage.width * (1 - t);
                    parent.setChildLocalPosition(nextImage, x, 0);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .addTransitionMode(PushDown, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    // SlideAwayDown
                    var y = currentImage.height * (t);
                    parent.setChildLocalPosition(currentImage, 0, y);

                    // SlideUp
                    var y = nextImage.height * (t - 1);
                    parent.setChildLocalPosition(nextImage, 0, y);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            })
            .addTransitionMode(PushUp, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    // SlideAwayUp
                    var y = currentImage.height * (-t);
                    parent.setChildLocalPosition(currentImage, 0, y);

                    // SlideDown
                    var y = nextImage.height * (1 - t);
                    parent.setChildLocalPosition(nextImage, 0, y);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalPosition(currentImage, 0, 0);
                    parent.setChildLocalPosition(nextImage, 0, 0);
                },
            });

    };

    var Yoyo = function (t, threshold) {
        if (threshold === undefined) {
            threshold = 0.5;
        }
        if (t <= threshold) {
            t = t / threshold;
        } else {
            t = 1 - ((t - threshold) / (1 - threshold));
        }

        return t;
    };

    var AddZoomModes = function (image) {
        image
            .addTransitionMode(ZoomOut, {
                ease: 'Linear', dir: 'out', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var scale = 1 - t;
                    parent.setChildLocalScale(currentImage, scale, scale);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalScale(currentImage, 1, 1);
                },
            })
            .addTransitionMode(ZoomIn, {
                ease: 'Linear', dir: 'in', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var scale = t;
                    parent.setChildLocalScale(nextImage, scale, scale);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalScale(nextImage, 1, 1);
                },
            })
            .addTransitionMode(ZoomInOut, {
                ease: 'Linear', dir: 'out', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.tint = 0;  // Turn nextImage to black
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var scale;
                    if (t < 0.5) {
                        scale = 1 - Yoyo(t);
                        parent.setChildLocalScale(currentImage, scale, scale);
                    } else {
                        if (currentImage.visible) {
                            parent.setChildVisible(currentImage, false);
                        }

                        scale = 1 - Yoyo(t);
                        parent.setChildLocalScale(nextImage, scale, scale);
                    }
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalScale(currentImage, 1, 1);
                    parent.setChildVisible(currentImage, true);
                    currentImage.tint = 0xffffff;

                    parent.setChildLocalScale(nextImage, 1, 1);
                    parent.setChildVisible(nextImage, true);
                    nextImage.tint = 0xffffff;
                },
            });


    };

    var AddFadeModes = function (image) {
        image
            .addTransitionMode(Fade, {
                ease: 'Linear', dir: 'out', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.tint = 0;  // Turn nextImage to black
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var tintGray;
                    if (t < 0.5) {
                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                    } else {
                        if (currentImage.visible) {
                            parent.setChildVisible(currentImage, false);
                        }

                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                    }
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildVisible(currentImage, true);
                    currentImage.tint = 0xffffff;

                    parent.setChildVisible(nextImage, true);
                    nextImage.tint = 0xffffff;
                },
            })
            .addTransitionMode(CrossFade, {
                ease: 'Linear', dir: 'out', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalAlpha(currentImage, 1 - t);
                    parent.setChildLocalAlpha(nextImage, t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.setChildLocalAlpha(currentImage, 1);
                },
            });

    };

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

    var GetValue$6 = function (source, key, defaultValue) {
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
            return (key === undefined) ? this.data : GetValue$6(this.data, key, defaultValue);
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

    const DegToRad$2 = Phaser.Math.DegToRad;

    var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        var deltaAngle = endAngle - startAngle;
        var step = DegToRad$2(deltaAngle) / iteration;
        startAngle = DegToRad$2(startAngle);
        for (var i = 0; i <= iteration; i++) {
            var angle = startAngle + (step * i);
            var x = centerX + (radiusX * Math.cos(angle));
            var y = centerY + (radiusY * Math.sin(angle));
            LineTo(x, y, pathData);
        }
        return pathData;
    };

    const DegToRad$1 = Phaser.Math.DegToRad;

    class Arc extends PathBase {
        constructor(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, pie) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (radiusX === undefined) { radiusX = 0; }
            if (radiusY === undefined) { radiusY = 0; }
            if (startAngle === undefined) { startAngle = 0; }
            if (endAngle === undefined) { endAngle = 360; }
            if (anticlockwise === undefined) { anticlockwise = false; }
            if (pie === undefined) { pie = false; }

            super();

            this.setCenterPosition(x, y);
            this.setRadius(radiusX, radiusY);
            this.setAngle(startAngle, endAngle, anticlockwise);
            this.setPie(pie);
            this.setIterations(32);
        }

        get x() {
            return this._x;
        }

        set x(value) {
            this.dirty = this.dirty || (this._x !== value);
            this._x = value;
        }

        get y() {
            return this._y;
        }

        set y(value) {
            this.dirty = this.dirty || (this._y !== value);
            this._y = value;
        }

        setCenterPosition(x, y) {
            if (y === undefined) {
                y = x;
            }
            this.x = x;
            this.y = y;
            return this;
        }

        get radiusX() {
            return this._radiusX;
        }

        set radiusX(value) {
            this.dirty = this.dirty || (this._radiusX !== value);
            this._radiusX = value;
        }

        get radiusY() {
            return this._radiusY;
        }

        set radiusY(value) {
            this.dirty = this.dirty || (this._radiusY !== value);
            this._radiusY = value;
        }

        setRadius(radiusX, radiusY) {
            if (radiusY === undefined) {
                radiusY = radiusX;
            }
            this.radiusX = radiusX;
            this.radiusY = radiusY;
            return this;
        }

        get startAngle() {
            return this._startAngle;
        }

        set startAngle(value) {
            this.dirty = this.dirty || (this._startAngle !== value);
            this._startAngle = value;
        }

        get endAngle() {
            return this._endAngle;
        }

        set endAngle(value) {
            this.dirty = this.dirty || (this._endAngle !== value);
            this._endAngle = value;
        }

        get anticlockwise() {
            return this._anticlockwise;
        }

        set anticlockwise(value) {
            this.dirty = this.dirty || (this._anticlockwise !== value);
            this._anticlockwise = value;
        }

        setAngle(startAngle, endAngle, anticlockwise) {
            // startAngle, endAngle in degrees
            if (anticlockwise === undefined) {
                anticlockwise = false;
            }

            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.anticlockwise = anticlockwise;
            return this;
        }

        get pie() {
            return this._pie;
        }

        set pie(value) {
            this.dirty = this.dirty || (this._pie !== value);
            this._pie = value;
        }

        setPie(pie) {
            if (pie === undefined) {
                pie = true;
            }
            this.pie = pie;
            return this;
        }

        get iterations() {
            return this._iterations;
        }

        set iterations(value) {
            this.dirty = this.dirty || (this._iterations !== value);
            this._iterations = value;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            if (this.pie) {
                this.pathData.push(this.x, this.y);
            }
            ArcTo(
                this.x, this.y,
                this.radiusX, this.radiusY,
                this.startAngle, this.endAngle, this.anticlockwise,
                this.iterations,
                this.pathData
            );
            if (this.pie) {
                this.pathData.push(this.x, this.y);
            }
            // Close
            this.pathData.push(this.pathData[0], this.pathData[1]);

            super.updateData();
            return this;
        }

        canvasRender(ctx, dx, dy) {
            ctx.beginPath();
            var x = this.x - dx,
                y = this.y - dy,
                startAngle = DegToRad$1(this.startAngle),
                endAngle = DegToRad$1(this.endAngle);
            if (this.pie) {
                ctx.moveTo(x, y);
                ctx.lineTo(
                    x + Math.cos(startAngle) * this.radiusX,
                    y + Math.sin(startAngle) * this.radiusY
                );
            }
            ctx.ellipse(
                x, y,
                this.radiusX, this.radiusY,
                0,
                startAngle, endAngle, this.anticlockwise
            );
            if (this.pie) {
                ctx.lineTo(x, y);
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

    class Circle extends Arc {
        constructor(x, y, radius) {
            super(x, y, radius, radius, 0, 360);
        }
    }

    class Curve extends PathBase {
        constructor(curve) {
            super();
            this.setCurve(curve);
            this.setIterations(32);
        }

        get curve() {
            return this._curve;
        }

        set curve(value) {
            this.dirty = this.dirty || (this._curve !== value);
            this._curve = value;
        }

        setCurve(curve) {
            this.curve = curve;
            return this;
        }

        get iterations() {
            return this._iterations;
        }

        set iterations(value) {
            this.dirty = this.dirty || (this._iterations !== value);
            this._iterations = value;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            var points = this.curve.getPoints(this.iterations);
            for (var i = 0, cnt = points.length; i < cnt; i++) {
                this.pathData.push(points[i].x, points[i].y);
            }
            this.pathData.push(points[0].x, points[0].y);

            super.updateData();
            return this;
        }

    }

    class Ellipse extends Arc {
        constructor(x, y, radiusX, radiusY) {
            super(x, y, radiusX, radiusY, 0, 360);
        }
    }

    class Line extends PathBase {
        constructor(x0, y0, x1, y1) {
            if (x0 === undefined) { x0 = 0; }
            if (y0 === undefined) { y0 = 0; }
            if (x1 === undefined) { x1 = 0; }
            if (y1 === undefined) { y1 = 0; }

            super();

            this.setP0(x0, y0);
            this.setP1(x1, y1);
        }

        get x0() {
            return this._x0;
        }

        set x0(value) {
            this.dirty = this.dirty || (this._x0 !== value);
            this._x0 = value;
        }

        get y0() {
            return this._y0;
        }

        set y0(value) {
            this.dirty = this.dirty || (this._y0 !== value);
            this._y0 = value;
        }

        setP0(x, y) {
            this.x0 = x;
            this.y0 = y;
            return this;
        }

        get x1() {
            return this._x1;
        }

        set x1(value) {
            this.dirty = this.dirty || (this._x1 !== value);
            this._x1 = value;
        }

        get y1() {
            return this._y1;
        }

        set y1(value) {
            this.dirty = this.dirty || (this._y1 !== value);
            this._y1 = value;
        }

        setP1(x, y) {
            this.x1 = x;
            this.y1 = y;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            this.pathData.push(this.x0, this.y0);
            this.pathData.push(this.x1, this.y1);
            this.pathData.push(this.x0, this.y0);

            super.updateData();
            return this;
        }
    }

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

    const DistanceBetween = Phaser.Math.Distance.Between;
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

                d = (prevX === undefined) ? 0 : DistanceBetween(prevX, prevY, x, y);
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

    const GetTint$1 = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

    class Rectangle extends BaseGeom {
        constructor(x, y, width, height) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = width; }

            super();

            this.pathData = [];
            this.closePath = true;

            this.setTopLeftPosition(x, y);
            this.setSize(width, height);
        }

        get x() {
            return this._x;
        }

        set x(value) {
            this.dirty = this.dirty || (this._x !== value);
            this._x = value;
        }

        get y() {
            return this._y;
        }

        set y(value) {
            this.dirty = this.dirty || (this._y !== value);
            this._y = value;
        }

        setTopLeftPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.dirty = this.dirty || (this._width !== value);
            this._width = value;
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.dirty = this.dirty || (this._height !== value);
            this._height = value;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get centerX() {
            return this.x + (this.width / 2);
        }

        set centerX(value) {
            this.x = value - (this.width / 2);
        }

        get centerY() {
            return this.y + (this.height / 2);
        }

        set centerY(value) {
            this.y = value - (this.height / 2);
        }

        setCenterPosition(x, y) {
            this.centerX = x;
            this.centerY = y;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            var x0 = this.x,
                x1 = x0 + this.width,
                y0 = this.y,
                y1 = y0 + this.height;
            this.pathData.push(x0, y0);
            this.pathData.push(x1, y0);
            this.pathData.push(x1, y1);
            this.pathData.push(x0, y1);
            this.pathData.push(x0, y0);

            super.updateData();
            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {
            if (this.isFilled) {
                var fillTint = pipeline.fillTint;
                var fillTintColor = GetTint$1(this.fillColor, this.fillAlpha * alpha);

                fillTint.TL = fillTintColor;
                fillTint.TR = fillTintColor;
                fillTint.BL = fillTintColor;
                fillTint.BR = fillTintColor;

                pipeline.batchFillRect(-dx + this.x, -dy + this.y, this.width, this.height);
            }

            if (this.isStroked) {
                StrokePathWebGL(pipeline, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            if (this.isFilled) {
                FillStyleCanvas(ctx, this);
                ctx.fillRect(-dx, -dy, this.width, this.height);
            }

            if (this.isStroked) {
                LineStyleCanvas(ctx, this);
                ctx.beginPath();
                ctx.rect(-dx, -dy, this.width, this.height);
                ctx.stroke();
            }
        }
    }

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    class RoundRectangle extends PathBase {
        constructor(x, y, width, height, radius, iterations) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = width; }
            if (radius === undefined) { radius = 0; }
            if (iterations === undefined) { iterations = 6; }

            super();

            this.setTopLeftPosition(x, y);
            this.setSize(width, height);
            this.setRadius(radius);
            this.setIterations(iterations);
            this.closePath = true;
        }

        get x() {
            return this._x;
        }

        set x(value) {
            this.dirty = this.dirty || (this._x !== value);
            this._x = value;
        }

        get y() {
            return this._y;
        }

        set y(value) {
            this.dirty = this.dirty || (this._y !== value);
            this._y = value;
        }

        setTopLeftPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.dirty = this.dirty || (this._width !== value);
            this._width = value;
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.dirty = this.dirty || (this._height !== value);
            this._height = value;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get centerX() {
            return this.x + (this.width / 2);
        }

        set centerX(value) {
            this.x = value - (this.width / 2);
        }

        get centerY() {
            return this.y + (this.height / 2);
        }

        set centerY(value) {
            this.y = value - (this.height / 2);
        }

        setCenterPosition(x, y) {
            this.centerX = x;
            this.centerY = y;
            return this;
        }

        get radiusTL() {
            return this._radiusTL;
        }

        set radiusTL(value) {
            var isConvex = (value > 0);
            this.dirty = this.dirty || (this._radiusTL !== value) || (this._convexTL !== isConvex);
            this._convexTL = isConvex;
            this._radiusTL = Math.abs(value);

        }

        get radiusTR() {
            return this._radiusTR;
        }

        set radiusTR(value) {
            var isConvex = (value > 0);
            this.dirty = this.dirty || (this._radiusTR !== value) || (this._convexTR !== isConvex);
            this._convexTR = isConvex;
            this._radiusTR = Math.abs(value);
        }

        get radiusBL() {
            return this._radiusBL;
        }

        set radiusBL(value) {
            var isConvex = (value > 0);
            this.dirty = this.dirty || (this._radiusBL !== value) || (this._convexBL !== isConvex);
            this._convexBL = isConvex;
            this._radiusBL = Math.abs(value);
        }

        get radiusBR() {
            return this._radiusBR;
        }

        set radiusBR(value) {
            var isConvex = (value > 0);
            this.dirty = this.dirty || (this._radiusBR !== value) || (this._convexBR !== isConvex);
            this._convexBR = isConvex;
            this._radiusBR = Math.abs(value);
        }

        get radius() {
            return Math.max(this.radiusTL, this.radiusTR, this.radiusBL, this.radiusBR,);
        }

        set radius(value) {
            if (typeof (value) === 'number') {
                this.radiusTL = value;
                this.radiusTR = value;
                this.radiusBL = value;
                this.radiusBR = value;
            } else {
                this.radiusTL = GetValue$5(value, 'tl', 0);
                this.radiusTR = GetValue$5(value, 'tr', 0);
                this.radiusBL = GetValue$5(value, 'bl', 0);
                this.radiusBR = GetValue$5(value, 'br', 0);
            }
        }

        setRadius(radius) {
            if (radius === undefined) {
                radius = 0;
            }
            this.radius = radius;
            return this;
        }

        get iterations() {
            return this._iterations;
        }

        set iterations(value) {
            this.dirty = this.dirty || (this._iterations !== value);
            this._iterations = value;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        updateData() {
            var pathData = this.pathData;
            pathData.length = 0;

            var width = this.width, height = this.height,
                radius,
                iterations = this.iterations + 1;

            // top-left
            radius = this.radiusTL;
            if (radius > 0) {
                if (this._convexTL) {
                    var centerX = radius;
                    var centerY = radius;
                    ArcTo(centerX, centerY, radius, radius, 180, 270, false, iterations, pathData);
                } else {
                    var centerX = 0;
                    var centerY = 0;
                    ArcTo(centerX, centerY, radius, radius, 90, 0, true, iterations, pathData);
                }
            } else {
                LineTo(0, 0, pathData);
            }

            // top-right
            radius = this.radiusTR;
            if (radius > 0) {
                if (this._convexTR) {
                    var centerX = width - radius;
                    var centerY = radius;
                    ArcTo(centerX, centerY, radius, radius, 270, 360, false, iterations, pathData);
                } else {
                    var centerX = width;
                    var centerY = 0;
                    ArcTo(centerX, centerY, radius, radius, 180, 90, true, iterations, pathData);
                }
            } else {
                LineTo(width, 0, pathData);
            }

            // bottom-right
            radius = this.radiusBR;
            if (radius > 0) {
                if (this._convexBR) {
                    var centerX = width - radius;
                    var centerY = height - radius;
                    ArcTo(centerX, centerY, radius, radius, 0, 90, false, iterations, pathData);
                } else {
                    var centerX = width;
                    var centerY = height;
                    ArcTo(centerX, centerY, radius, radius, 270, 180, true, iterations, pathData);
                }
            } else {
                LineTo(width, height, pathData);
            }

            // bottom-left
            radius = this.radiusBL;
            if (radius > 0) {
                if (this._convexBL) {
                    var centerX = radius;
                    var centerY = height - radius;
                    ArcTo(centerX, centerY, radius, radius, 90, 180, false, iterations, pathData);
                } else {
                    var centerX = 0;
                    var centerY = height;
                    ArcTo(centerX, centerY, radius, radius, 360, 270, true, iterations, pathData);
                }
            } else {
                LineTo(0, height, pathData);
            }

            pathData.push(pathData[0], pathData[1]); // Repeat first point to close curve
            Offset(this.x, this.y, pathData);

            super.updateData();
            return this;
        }
    }

    const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

    class Triangle extends BaseGeom {
        constructor(x0, y0, x1, y1, x2, y2) {
            if (x0 === undefined) { x0 = 0; }
            if (y0 === undefined) { y0 = 0; }
            if (x1 === undefined) { x1 = 0; }
            if (y1 === undefined) { y1 = 0; }
            if (x2 === undefined) { x2 = 0; }
            if (y2 === undefined) { y2 = 0; }

            super();

            this.pathData = [];
            this.closePath = true;

            this.setP0(x0, y0);
            this.setP1(x1, y1);
            this.setP2(x2, y2);
        }

        get x0() {
            return this._x0;
        }

        set x0(value) {
            this.dirty = this.dirty || (this._x0 !== value);
            this._x0 = value;
        }

        get y0() {
            return this._y0;
        }

        set y0(value) {
            this.dirty = this.dirty || (this._y0 !== value);
            this._y0 = value;
        }

        setP0(x, y) {
            this.x0 = x;
            this.y0 = y;
            return this;
        }

        get x1() {
            return this._x1;
        }

        set x1(value) {
            this.dirty = this.dirty || (this._x1 !== value);
            this._x1 = value;
        }

        get y1() {
            return this._y1;
        }

        set y1(value) {
            this.dirty = this.dirty || (this._y1 !== value);
            this._y1 = value;
        }

        setP1(x, y) {
            this.x1 = x;
            this.y1 = y;
            return this;
        }

        get x2() {
            return this._x2;
        }

        set x2(value) {
            this.dirty = this.dirty || (this._x2 !== value);
            this._x2 = value;
        }

        get y2() {
            return this._y2;
        }

        set y2(value) {
            this.dirty = this.dirty || (this._y2 !== value);
            this._y2 = value;
        }

        setP2(x, y) {
            this.dirty = this.dirty || (this.x2 !== x) || (this.y2 !== y);
            this.x2 = x;
            this.y2 = y;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            this.pathData.push(this.x0, this.y0);
            this.pathData.push(this.x1, this.y1);
            this.pathData.push(this.x2, this.y2);
            this.pathData.push(this.x0, this.y0);

            super.updateData();
            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {
            if (this.isFilled) {
                var fillTintColor = GetTint(this.fillColor, this.fillAlpha * alpha);

                var x0 = this.x0 - dx;
                var y0 = this.y0 - dy;
                var x1 = this.x1 - dx;
                var y1 = this.y1 - dy;
                var x2 = this.x2 - dx;
                var y2 = this.y2 - dy;

                var tx0 = calcMatrix.getX(x0, y0);
                var ty0 = calcMatrix.getY(x0, y0);
                var tx1 = calcMatrix.getX(x1, y1);
                var ty1 = calcMatrix.getY(x1, y1);
                var tx2 = calcMatrix.getX(x2, y2);
                var ty2 = calcMatrix.getY(x2, y2);

                pipeline.batchTri(tx0, ty0, tx1, ty1, tx2, ty2, fillTintColor, fillTintColor, fillTintColor);
            }

            if (this.isStroked) {
                StrokePathWebGL(pipeline, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            var x1 = this.x1 - dx;
            var y1 = this.y1 - dy;
            var x2 = this.x2 - dx;
            var y2 = this.y2 - dy;
            var x3 = this.x3 - dx;
            var y3 = this.y3 - dy;

            ctx.beginPath();

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);

            ctx.closePath();

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

    const ShapeClasses = {
        arc: Arc,
        circle: Circle,
        curve: Curve,
        ellipse: Ellipse,
        line: Line,
        lines: Lines,
        rectangle: Rectangle,
        roundRectangle: RoundRectangle,
        triangle: Triangle
    };

    const GetValue$4 = Phaser.Utils.Objects.GetValue;
    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;

    const ClearAll = function () {
        var shapes = this.getShapes();
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            shapes[i].lineStyle().fillStyle();
        }
    };

    var ShapesUpdateMethods = {
        createShape(shapeType, name) {
            var ShapeClass = ShapeClasses[shapeType];
            var shape = new ShapeClass();
            if (name) {
                shape.setName(name);
            }
            return shape;
        },

        buildShapes(config) {
            var createCallback = GetValue$4(config, 'create', undefined);

            if (IsPlainObject$2(createCallback)) {
                var shapes = createCallback;
                for (var shapeType in shapes) {
                    var name = shapes[shapeType];
                    switch (typeof (name)) {
                        case 'number':
                            for (var i = 0; i < name; i++) {
                                this.addShape(this.createShape(shapeType));
                            }
                            break;

                        case 'string':
                            this.addShape(this.createShape(shapeType, name));
                            break;

                        default: //Array
                            var names = name;
                            for (var i = 0, cnt = names.length; i < cnt; i++) {
                                this.addShape(this.createShape(shapeType, names[i]));
                            }
                            break;
                    }
                }
            } else if (Array.isArray(createCallback)) {
                var shapes = createCallback;
                for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                    var shape = shapes[i];
                    this.addShape(this.createShape(shape.type, shape.name));
                }

            } else if (typeof (createCallback) === 'function') {
                createCallback.call(this);

            }

            this.setUpdateShapesCallback(GetValue$4(config, 'update'));
        },

        setUpdateShapesCallback(callback) {
            if (callback === undefined) {
                callback = ClearAll;
            }
            this.dirty = this.dirty || (this.updateCallback !== callback);
            this.updateCallback = callback;
            return this;
        },

        updateShapes() {
            this.updateCallback.call(this);
        }
    };

    const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
    const TransformXY = Phaser.Math.TransformXY;

    var WorldXYToGameObjectLocalXY = function (gameObject, worldX, worldY, camera, out) {
        if (camera === undefined) {
            camera = gameObject.scene.cameras.main;
        }

        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        var csx = camera.scrollX;
        var csy = camera.scrollY;
        var px = worldX + (csx * gameObject.scrollFactorX) - csx;
        var py = worldY + (csy * gameObject.scrollFactorY) - csy;
        if (gameObject.parentContainer) {
            if (tempMatrix === undefined) {
                tempMatrix = new TransformMatrix();
                parentMatrix = new TransformMatrix();
            }

            gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
            tempMatrix.applyInverse(px, py, out);
        }
        else {
            TransformXY(px, py, gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY, out);
        }

        out.x += gameObject.displayOriginX;
        out.y += gameObject.displayOriginY;

        return out;
    };

    var tempMatrix, parentMatrix;
    var globOut = {};

    const GetValue$3 = Phaser.Utils.Objects.GetValue;
    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;

    class CustomShapes extends BaseShapes {
        constructor(scene, x, y, width, height, config) {
            if (IsPlainObject$1(x)) {
                config = x;
                x = GetValue$3(config, 'x', 0);
                y = GetValue$3(config, 'y', 0);
                width = GetValue$3(config, 'width', 2);
                height = GetValue$3(config, 'height', 2);
            }

            super(scene, x, y, width, height);
            this.type = GetValue$3(config, 'type', 'rexCustomShapes');
            this.buildShapes(config);
        }

        get centerX() {
            return this.width / 2;
        }

        get centerY() {
            return this.height / 2;
        }

        worldToLocalXY(worldX, worldY, camera, out) {
            if (typeof (camera) === 'boolean') {
                out = camera;
                camera = undefined;
            }

            return WorldXYToGameObjectLocalXY(this, worldX, worldY, camera, out);
        }
    }

    Object.assign(
        CustomShapes.prototype,
        ShapesUpdateMethods
    );

    const Linear = Phaser.Math.Linear;
    const Percent$1 = Phaser.Math.Percent;

    var ProgressValueMethods = {
        setValue(value, min, max) {
            if ((value === undefined) || (value === null)) {
                return this;
            }

            if (min !== undefined) {
                value = Percent$1(value, min, max);
            }
            this.value = value;
            return this;
        },

        addValue(inc, min, max) {
            if (min !== undefined) {
                inc = Percent$1(inc, min, max);
            }
            this.value += inc;
            return this;
        },

        getValue(min, max) {
            var value = this.value;
            if (min !== undefined) {
                value = Linear(min, max, value);
            }
            return value;
        }
    };

    const Percent = Phaser.Math.Percent;

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
            value = Percent(value, min, max);
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

    const GetValue$2 = Phaser.Utils.Objects.GetValue;
    const Clamp$1 = Phaser.Math.Clamp;

    function ProgressBase (BaseClass) {
        class ProgressBase extends BaseClass {
            bootProgressBase(config) {
                this.eventEmitter = GetValue$2(config, 'eventEmitter', this);

                var callback = GetValue$2(config, 'valuechangeCallback', null);
                if (callback !== null) {
                    var scope = GetValue$2(config, 'valuechangeCallbackScope', undefined);
                    this.eventEmitter.on('valuechange', callback, scope);
                }

                this
                    .setEaseValuePropName('value')
                    .setEaseValueDuration(GetValue$2(config, 'easeValue.duration', 0))
                    .setEaseValueFunction(GetValue$2(config, 'easeValue.ease', 'Linear'));

                return this;
            }

            get value() {
                return this._value;
            }

            set value(value) {
                value = Clamp$1(value, 0, 1);

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

    const GetValue$1 = Phaser.Utils.Objects.GetValue;
    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    class CustomProgress extends ProgressBase(CustomShapes) {
        constructor(scene, x, y, width, height, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue$1(config, 'x', 0);
                y = GetValue$1(config, 'y', 0);
                width = GetValue$1(config, 'width', 2);
                height = GetValue$1(config, 'height', 2);
            }
            if (config === undefined) {
                config = {};
            }
            if (!config.type) {
                config.type = 'rexCustomProgress';
            }

            super(scene, x, y, width, height, config);

            this.bootProgressBase(config);

            this.setValue(GetValue$1(config, 'value', 0));
        }

        get centerX() {
            return this.width / 2;    }

        get centerY() {
            return this.height / 2;
        }

        get radius() {
            return Math.min(this.centerX, this.centerY);
        }
    }

    var CreateMask$7 = function (scene) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: [
                { name: 'rect', type: 'rectangle' },
            ],
            update: function () {
                var rect = this.getShape('rect')
                    .fillStyle(0xffffff);

                var t = 1 - this.value;
                switch (this.wipeMode) {
                    case 'right':
                        rect
                            .setSize(this.width * t, this.height)
                            .setTopLeftPosition(this.width - rect.width, 0);
                        break;

                    case 'left':
                        rect
                            .setSize(this.width * t, this.height)
                            .setTopLeftPosition(0, 0);
                        break;

                    case 'down':
                        rect
                            .setSize(this.width, this.height * t)
                            .setTopLeftPosition(0, this.height - rect.height);
                        break;

                    case 'up':
                        rect
                            .setSize(this.width, this.height * t)
                            .setTopLeftPosition(0, 0);
                        break;
                }
            },
        });
        return maskGameObject;
    };

    var AddWipeModes = function (image) {
        var maskGameObject = CreateMask$7(image.scene);

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(WipeRight, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true);
                    parent.maskGameObject.wipeMode = 'right';
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            })
            .addTransitionMode(WipeLeft, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true);
                    parent.maskGameObject.wipeMode = 'left';
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            })
            .addTransitionMode(WipeDown, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true);
                    parent.maskGameObject.wipeMode = 'down';
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            })
            .addTransitionMode(WipeUp, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true);
                    parent.maskGameObject.wipeMode = 'up';
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            });

    };

    var CreateMask$6 = function (scene) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: [
                { name: 'rect', type: 'rectangle' },
            ],
            update: function () {
                this.getShape('rect')
                    .fillStyle(0xffffff)
                    .setSize(this.width * this.value, this.height * this.value)
                    .setCenterPosition(this.centerX, this.centerY);
            },
        });
        return maskGameObject;
    };

    var AddIrisModes = function (image) {
        var maskGameObject = CreateMask$6(image.scene);

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(IrisOut, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            })
            .addTransitionMode(IrisIn, {
                ease: 'Linear', dir: 'in', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setNextImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(1 - t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            })
            .addTransitionMode(IrisInOut, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.tint = 0;  // Turn nextImage to black
                    parent.setCurrentImageMaskEnable(true);
                    parent.setNextImageMaskEnable(true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var tintGray;
                    if (t < 0.5) {
                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        parent.maskGameObject.setValue(1 - t);
                        currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;

                    } else {
                        if (currentImage.visible) {
                            parent.setChildVisible(currentImage, false);
                        }

                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        parent.maskGameObject.setValue(1 - t);
                        nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                    }
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);

                    parent.setChildVisible(currentImage, true);
                    currentImage.tint = 0xffffff;

                    parent.setChildVisible(nextImage, true);
                    nextImage.tint = 0xffffff;
                },
            });
    };

    var CreateMask$5 = function (scene) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: [
                { name: 'pie', type: 'arc' },
            ],
            update: function () {
                var radius = Math.max(this.width, this.height) * 2;
                var deltaAngle = 90 * this.value;

                this.getShape('pie')
                    .fillStyle(0xffffff)
                    .setCenterPosition(this.centerX, 0)
                    .setRadius(radius)
                    .setAngle(90 - deltaAngle, 90 + deltaAngle)
                    .setPie();

            },
        });
        return maskGameObject;
    };

    var AddPieModes = function (image) {
        var maskGameObject = CreateMask$5(image.scene);

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(PieOut, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            })
            .addTransitionMode(PieIn, {
                ease: 'Linear', dir: 'in', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setNextImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(1 - t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            })
            .addTransitionMode(PieInOut, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.tint = 0;  // Turn nextImage to black
                    parent.setCurrentImageMaskEnable(true);
                    parent.setNextImageMaskEnable(true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var tintGray;
                    if (t < 0.5) {
                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        parent.maskGameObject.setValue(1 - t);
                        currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                    } else {
                        if (currentImage.visible) {
                            parent.setChildVisible(currentImage, false);
                        }

                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        parent.maskGameObject.setValue(1 - t);
                        nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                    }
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);

                    parent.setChildVisible(currentImage, true);
                    currentImage.tint = 0xffffff;

                    parent.setChildVisible(nextImage, true);
                    nextImage.tint = 0xffffff;
                },
            });

    };

    var CreateMask$4 = function (scene, columns) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: {
                rectangle: columns
            },
            update: function () {
                var shapes = this.getShapes();
                var shapeWidth = this.width / columns;
                for (var i = 0; i < columns; i++) {
                    shapes[i]
                        .fillStyle(0xffffff)
                        .setSize(shapeWidth * this.value, this.height)
                        .setTopLeftPosition(shapeWidth * i, 0);
                }
            },
        });
        return maskGameObject;
    };

    var AddBlindsModes = function (image) {
        var maskGameObject = CreateMask$4(image.scene, 10);

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(Blinds, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            });
    };

    var CreateMask$3 = function (scene, columns, rows) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: {
                rectangle: columns * rows
            },
            update: function () {
                var shapes = this.getShapes();
                var shapeWidth = this.width / columns,
                    shapeHeight = this.height / rows;
                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < columns; c++) {
                        shapes[c * rows + r]
                            .fillStyle(0xffffff)
                            .setSize(shapeWidth * this.value, shapeHeight * this.value)
                            .setCenterPosition(shapeWidth * (c + 0.5), shapeHeight * (r + 0.5));
                    }
                }
            },
        });
        return maskGameObject;
    };

    var AddSquaresModes = function (image) {
        var maskGameObject = CreateMask$3(image.scene, Math.ceil(image.width / 40), Math.ceil(image.height / 40));

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(Squares, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            });
    };

    var CreateMask$2 = function (scene, columns, rows) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: {
                lines: columns * rows
            },
            update: function () {
                var shapes = this.getShapes();
                var shapeHalfWidth = this.width / (columns - 1),
                    shapeHelfHeight = this.height / rows;
                var shapeHeight = shapeHelfHeight * 2;
                var halfWidth = shapeHalfWidth * this.value,
                    halfHeight = shapeHelfHeight * this.value;
                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < columns; c++) {
                        var centerX = c * shapeHalfWidth;
                        var centerY = r * shapeHeight + (c % 2) * shapeHelfHeight;
                        shapes[c * rows + r]
                            .fillStyle(0xffffff)
                            .start(centerX + halfWidth, centerY)
                            .lineTo(centerX, centerY + halfHeight)
                            .lineTo(centerX - halfWidth, centerY)
                            .lineTo(centerX, centerY - halfHeight)
                            .lineTo(centerX + halfWidth, centerY)
                            .close();
                    }
                }
            },
        });
        return maskGameObject;
    };

    var AddDiamondsMode = function (image) {
        var maskGameObject = CreateMask$2(image.scene, Math.ceil(image.width / 60), Math.ceil(image.height / 60));

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(Diamonds, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            });
    };

    var CreateMask$1 = function (scene, columns, rows) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: {
                circle: columns * rows
            },
            update: function () {
                var shapes = this.getShapes();
                var shapeHalfWidth = this.width / (columns - 1),
                    shapeHelfHeight = this.height / rows;
                var shapeHeight = shapeHelfHeight * 2;
                var radius = Math.max(shapeHalfWidth, shapeHelfHeight) * this.value;
                for (var r = 0; r < rows; r++) {
                    for (var c = 0; c < columns; c++) {
                        var centerX = c * shapeHalfWidth;
                        var centerY = r * shapeHeight + (c % 2) * shapeHelfHeight;
                        shapes[c * rows + r]
                            .fillStyle(0xffffff)
                            .setCenterPosition(centerX, centerY)
                            .setRadius(radius);
                    }
                }
            },
        });
        return maskGameObject;
    };

    var AddCirclesMode = function (image) {
        var maskGameObject = CreateMask$1(image.scene, Math.ceil(image.width / 60), Math.ceil(image.height / 60));

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(Circles, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setCurrentImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    parent.maskGameObject.setValue(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);
                },
            });
    };

    var CreateMask = function (scene, columns) {
        var maskGameObject = new CustomProgress(scene, {
            type: 'Graphics',
            create: {
                lines: columns
            },
            update: function () {
                var shapes = this.getShapes();
                var shapeWidth = this.width / columns;
                var radius = shapeWidth / 2;
                for (var i = 0; i < columns; i++) {
                    var leftX = shapeWidth * i;
                    var bottomY = this.height * this.value;
                    var centerX = leftX + radius;
                    shapes[i]
                        .fillStyle(0xffffff)
                        .start(leftX, 0)
                        .horizontalLineTo(bottomY)
                        .arc(centerX, bottomY, radius, 180, 0, true)
                        .horizontalLineTo(-bottomY)
                        .lineTo(leftX, 0)
                        .close();
                }
            },
        });
        return maskGameObject;
    };

    var AddCurtainMode = function (image) {
        var maskGameObject = CreateMask(image.scene, 10);

        image
            .once('destroy', function () {
                maskGameObject.destroy();
            })
            .addTransitionMode(Curtain, {
                ease: 'Linear', dir: 'out', mask: maskGameObject,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.tint = 0;  // Turn nextImage to black
                    parent.setCurrentImageMaskEnable(true, true);
                    parent.setNextImageMaskEnable(true, true);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    var tintGray;
                    if (t < 0.5) {
                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        parent.maskGameObject.setValue(t);
                        currentImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;

                    } else {
                        if (currentImage.visible) {
                            parent.setChildVisible(currentImage, false);
                        }

                        t = Yoyo(t);
                        tintGray = Math.floor(255 * (1 - t));
                        parent.maskGameObject.setValue(t);
                        nextImage.tint = (tintGray << 16) + (tintGray << 8) + tintGray;
                    }
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    parent.removeMaskGameObject(false);

                    parent.setChildVisible(currentImage, true);
                    currentImage.tint = 0xffffff;

                    parent.setChildVisible(nextImage, true);
                    nextImage.tint = 0xffffff;
                },
            });
    };

    var AddPixellateMode = function (image) {
        image
            .addTransitionMode(Pixellate, {
                ease: 'Linear', dir: 'out', mask: true,

                onStart: function (parent, currentImage, nextImage, t) {
                    parent.setChildVisible(nextImage, false);
                    currentImage.effect = currentImage.preFX.addPixelate(0);
                    nextImage.effect = nextImage.preFX.addPixelate(0);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    if (t < 0.5) {
                        t = Yoyo(t);
                        var maxAmount = Math.min(currentImage.width, currentImage.height) / 5;
                        currentImage.effect.amount = Math.ceil(maxAmount * t);
                    } else {
                        if (currentImage.visible) {
                            parent.setChildVisible(currentImage, false);
                        }
                        if (!nextImage.visible) {
                            parent.setChildVisible(nextImage, true);
                        }

                        t = Yoyo(t);
                        var maxAmount = Math.min(nextImage.width, nextImage.height) / 5;
                        nextImage.effect.amount = Math.ceil(maxAmount * t);
                    }
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    currentImage.preFX.remove(currentImage.effect);
                    delete currentImage.effect;
                    parent.setChildVisible(currentImage, true);

                    nextImage.preFX.remove(nextImage.effect);
                    delete nextImage.effect;
                },
            });

    };

    // Reference: https://medium.com/neosavvy-labs/webgl-with-perlin-noise-part-1-a87b56bbc9fb
    const frag$1 = `\
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
float Perlin(vec3 P) {
    vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));
    vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);
    vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);
    vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;
    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0); gx1 = fract(gx1);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),
        g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),
        g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),
        g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));
    vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));
    g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;
    g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;
    vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),
        dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),
        vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),
            dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);
    return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);
}
float Perlin(vec2 P) { return Perlin(vec3(P, 0.0)); }
`;

    // https://github.com/ykob/glsl-dissolve/blob/master/src/glsl/dissolve.fs


    const frag = `\
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;
// Scene buffer
uniform sampler2D uMainSampler;
uniform sampler2D uMainSampler2;

uniform int resizeMode;
uniform float progress;
uniform float fromRatio;
uniform float toRatio;
varying vec2 outFragCoord;
// Effect parameters
uniform float noiseX;
uniform float noiseY;
uniform float noiseZ;
uniform float fromEdgeStart;
uniform float fromEdgeWidth;
uniform float toEdgeStart;
uniform float toEdgeWidth;

${frag$1}

vec4 getFromColor (vec2 uv) {
  return texture2D(uMainSampler, uv);
}

vec4 getToColor (vec2 uv) {
  if (resizeMode == 2) {
    //  cover
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(min(fromRatio / toRatio, 1.0), min((toRatio / fromRatio), 1.0)));
  } else if (resizeMode == 1) {
    //  contain
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(max(fromRatio / toRatio, 1.0), max((toRatio / fromRatio), 1.0)));
  } else {
    //  stretch
    return texture2D(uMainSampler2, vec2(uv.x, 1.0 - uv.y));
  }
}

vec4 transition (vec2 uv) {    
  vec4 colorFront = getFromColor(uv);
  vec4 colorTo = getToColor(uv);

  float noise = (Perlin(vec3(uv.x * noiseX, uv.y * noiseY, noiseZ)) + 1.0) / 2.0
    * (1.0 - (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth))
    + (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth) * 0.5;
  vec4 colorResult = colorFront * smoothstep(progress - (fromEdgeStart + fromEdgeWidth), progress - fromEdgeStart, noise)
    + colorTo * smoothstep((1.0 - progress) - (toEdgeStart + toEdgeWidth), (1.0 - progress) - toEdgeStart, (1.0 - noise));
  return colorResult;
}

void main () {
  vec2 uv = outFragCoord;
  gl_FragColor = transition(uv);
}
`;

    const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
    const GetValue = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class DissolvePostFxPipeline extends PostFXPipeline {
        constructor(game) {
            super({
                name: 'rexDissolvePostFx',
                game: game,
                renderTarget: true,
                fragShader: frag
            });

            this._progress = 0;
            this.toFrame = null;
            this.targetTexture = null;
            this.resizeMode = 1;
            this.toRatio = 1;

            this.noiseX = 0;
            this.noiseY = 0;
            this.noiseZ = 0;
            this.fromEdgeStart = 0.01;
            this.fromEdgeWidth = 0.05;
            this.toEdgeStart = 0.01;
            this.toEdgeWidth = 0.05;
        }

        resetFromJSON(o) {
            this.setProgress(GetValue(o, 'progress', 0));
            this.setTransitionTargetTexture(GetValue(o, 'toTexture', '__DEFAULT'), GetValue(o, 'toFrame', undefined), GetValue(o, 'resizeMode', 1));
            this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
            this.setFromEdge(GetValue(o, 'fromEdgeStart', 0.01), GetValue(o, 'fromEdgeWidth', 0.05));
            this.setToEdge(GetValue(o, 'toEdgeStart', 0.01), GetValue(o, 'toEdgeWidth', 0.05));
            return this;
        }

        onBoot() {

        }

        onPreRender() {
            this.set1f('progress', this.progress);
            this.set1i('resizeMode', this.resizeMode);

            this.set1f('noiseX', this.noiseX);
            this.set1f('noiseY', this.noiseY);
            this.set1f('noiseZ', this.noiseZ);
            this.set1f('fromEdgeStart', this.fromEdgeStart);
            this.set1f('fromEdgeWidth', this.fromEdgeWidth);
            this.set1f('toEdgeStart', this.toEdgeStart);
            this.set1f('toEdgeWidth', this.toEdgeWidth);
        }

        onDraw(renderTarget) {
            this.set1f('fromRatio', renderTarget.width / renderTarget.height);

            this.set1f('toRatio', this.toRatio);

            this.set1i('uMainSampler2', 1);

            this.bindTexture(this.targetTexture, 1);

            this.bindAndDraw(renderTarget);
        }

        get progress() {
            return this._progress;
        }

        set progress(value) {
            this._progress = Clamp(value, 0, 1);
        }

        setProgress(value) {
            this.progress = value;
            return this;
        }

        setTransitionTargetTexture(key, frame, resizeMode) {
            if (key === undefined) {
                key = '__DEFAULT';
            }
            var phaserTexture = this.game.textures.getFrame(key, frame);

            if (!phaserTexture) {
                phaserTexture = this.game.textures.getFrame('__DEFAULT');
            }

            this.toRatio = phaserTexture.width / phaserTexture.height;

            this.toFrame = phaserTexture;
            this.targetTexture = phaserTexture.glTexture;

            if (resizeMode !== undefined) {
                this.resizeMode = resizeMode;
            }

            return this;
        }

        setResizeMode(mode) {
            if (typeof (mode) === 'string') {
                mode = ResizeMode[mode];
            }
            this.resizeMode = mode;
            return this;
        }

        setNoise(x, y, z) {
            if (x === undefined) {
                x = 4 + Math.random() * 6;
            }
            if (y === undefined) {
                y = 4 + Math.random() * 6;
            }
            if (z === undefined) {
                z = Math.random() * 10;
            }
            this.noiseX = x;
            this.noiseY = y;
            this.noiseZ = z;
            return this;
        }

        setFromEdge(edgeStart, edgeWidth) {
            this.fromEdgeStart = edgeStart;
            this.fromEdgeWidth = edgeWidth;
            return this;
        }

        setToEdge(edgeStart, edgeWidth) {
            this.toEdgeStart = edgeStart;
            this.toEdgeWidth = edgeWidth;
            return this;
        }
    }

    /**
     * Set the resize mode of the target texture.
     * 
     * Can be either:
     * 
     * 0 - Stretch. The target texture is stretched to the size of the source texture.
     * 1 - Contain. The target texture is resized to fit the source texture. This is the default.
     * 2 - Cover. The target texture is resized to cover the source texture.
     * 
     * If the source and target textures are the same size, then use a resize mode of zero
     * for speed.
     *
     */
    var ResizeMode = {
        stretch: 0,
        contain: 1,
        cover: 2
    };

    var RegisterPostPipeline = function (game, postFxPipelineName, PostFxPipelineClass) {
        GetGame(game).renderer.pipelines.addPostPipeline(postFxPipelineName, PostFxPipelineClass);
    };

    var AddPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, config) {
        if (config === undefined) {
            config = {};
        }

        gameObject.setPostPipeline(PostFxPipelineClass);
        var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
        pipeline.resetFromJSON(config);

        if (config.name) {
            pipeline.name = config.name;
        }

        return pipeline;
    };

    const SpliceOne = Phaser.Utils.Array.SpliceOne;

    var RemovePostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {
        if (name === undefined) {
            var pipelines = gameObject.postPipelines;
            for (var i = (pipelines.length - 1); i >= 0; i--) {
                var instance = pipelines[i];
                if (instance instanceof PostFxPipelineClass) {
                    instance.destroy();
                    SpliceOne(pipelines, i);
                }
            }
        } else {
            var pipelines = gameObject.postPipelines;
            for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
                var instance = pipelines[i];
                if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
                    instance.destroy();
                    SpliceOne(pipelines, i);
                }
            }
        }

        gameObject.hasPostPipeline = (gameObject.postPipelines.length > 0);

    };

    var AddDissolveMode = function (image) {
        RegisterPostPipeline(image.scene.game, 'rexDissolvePostFx', DissolvePostFxPipeline);

        image
            .addTransitionMode(Dissolve, {
                ease: 'Linear', dir: 'out', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                    currentImage.effect = AddPostFxPipelineInstance(currentImage, DissolvePostFxPipeline);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    currentImage.effect.setProgress(t);
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    RemovePostFxPipelineInstance(currentImage, DissolvePostFxPipeline);
                    delete currentImage.effect;
                },
            });
    };

    const WipeWidth = 0.1;
    const DirLeftToRight = 0;
    const DirTopToBottom = 0;
    const DirRightToLeft = 1;
    const DirBottomToTop = 1;
    const AxisX = 0;
    const AxisY = 1;

    var AddRevealModes = function (image) {
        image
            .addTransitionMode(RevealRight, {
                ease: 'Linear', dir: 'in', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirLeftToRight, AxisX);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    nextImage.effect.progress = t;
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    nextImage.preFX.remove(nextImage.effect);
                    delete nextImage.effect;
                },
            })
            .addTransitionMode(RevealLeft, {
                ease: 'Linear', dir: 'in', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirRightToLeft, AxisX);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    nextImage.effect.progress = t;
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    nextImage.preFX.remove(nextImage.effect);
                    delete nextImage.effect;
                },
            })
            .addTransitionMode(RevealDown, {
                ease: 'Linear', dir: 'in', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirTopToBottom, AxisY);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    nextImage.effect.progress = t;
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    nextImage.preFX.remove(nextImage.effect);
                    delete nextImage.effect;
                },
            })
            .addTransitionMode(RevealUp, {
                ease: 'Linear', dir: 'in', mask: false,

                onStart: function (parent, currentImage, nextImage, t) {
                    nextImage.effect = nextImage.preFX.addReveal(WipeWidth, DirBottomToTop, AxisY);
                },
                onProgress: function (parent, currentImage, nextImage, t) {
                    nextImage.effect.progress = t;
                },
                onComplete: function (parent, currentImage, nextImage, t) {
                    nextImage.preFX.remove(nextImage.effect);
                    delete nextImage.effect;
                },
            });

    };

    const Modes = [
        AddSlideAwayModes, AddSlideModes, AddSliderModes,
        AddZoomModes,
        AddFadeModes,
        AddIrisModes, AddPieModes, AddWipeModes,
        AddBlindsModes, AddSquaresModes, AddDiamondsMode, AddCirclesMode, AddCurtainMode,
        AddPixellateMode, AddDissolveMode, AddRevealModes
    ];

    class TransitionImagePack extends TransitionImage {
        constructor(scene, x, y, texture, frame, config) {
            super(scene, x, y, texture, frame, config);

            for (var i = 0, cnt = Modes.length; i < cnt; i++) {
                Modes[i](this);
            }
        }
    }

    function Factory (x, y, texture, frame, config) {
        var gameObject = new TransitionImagePack(this.scene, x, y, texture, frame, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue(config, 'key', null);
        var frame = GetAdvancedValue(config, 'frame', null);

        var gameObject = new TransitionImagePack(this.scene, 0, 0, key, frame, config);
        BuildGameObject(this.scene, gameObject, config);
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

    class TransitionImagePackPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexTransitionImagePack', Factory, Creator);
        }

        boot() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.TransitionImagePack', TransitionImagePack);

    return TransitionImagePackPlugin;

}));
