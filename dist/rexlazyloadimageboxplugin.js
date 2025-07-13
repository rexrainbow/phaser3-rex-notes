(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlazyloadimageboxplugin = factory());
})(this, (function () { 'use strict';

    const MainVersionNumber = 4;
    const SubVersionNumber = 0;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = SubVersionNumber;
        }
        var version = Phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === MainVersionNumber) {
            var subVersion = parseInt(version[1]);
            if (subVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${subVersion}`);
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

    let Base$1 = class Base extends Zone {
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
    };

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Base$1,
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

    const DegToRad$6 = Phaser.Math.DegToRad;
    const RadToDeg$1 = Phaser.Math.RadToDeg;

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
                    return RadToDeg$1(this.rotation);
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
            return GetParent(gameObject, name);
        },

        getTopmostParent(gameObject) {
            if (gameObject === undefined) {
                gameObject = this;
            }
            return GetTopmostParent(gameObject);
        }
    };

    const GetValue$f = Phaser.Utils.Objects.GetValue;
    const BaseAdd = Base$1.prototype.add;

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
            state.syncPosition = GetValue$f(config, 'syncPosition', true);
            state.syncRotation = GetValue$f(config, 'syncRotation', true);
            state.syncScale = GetValue$f(config, 'syncScale', true);
            state.syncAlpha = GetValue$f(config, 'syncAlpha', true);
            state.syncScrollFactor = GetValue$f(config, 'syncScrollFactor', true);
            state.syncCameraFilter = GetValue$f(config, 'syncCameraFilter', true);
            state.syncDisplayList = GetValue$f(config, 'syncDisplayList', true);
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

    const BaseRemove = Base$1.prototype.remove;
    const BaseClear = Base$1.prototype.clear;

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

    var Transform$1 = {
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

    // canvas mask only
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

    const LayerClass$1 = Phaser.GameObjects.Layer;

    var IsLayerGameObject = function (gameObject) {
        return (gameObject instanceof LayerClass$1);
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
    const RotateAround$2 = Phaser.Math.RotateAround;
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
            RotateAround$2(output, gameObject.x, gameObject.y, gameObject.rotation);
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
    const LayerClass = Phaser.GameObjects.Layer;

    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass) || (object instanceof LayerClass);
    };

    var GetValue$e = Phaser.Utils.Objects.GetValue;

    var Snapshot = function (config) {
        if (!config) {
            return;
        }

        var gameObjects = config.gameObjects;
        if (!Array.isArray(gameObjects)) {
            gameObjects = [gameObjects];
        }
        var renderTexture = config.renderTexture;  // renderTexture, or dynamicTexture
        var saveTexture = config.saveTexture;
        var x = GetValue$e(config, 'x', undefined);
        var y = GetValue$e(config, 'y', undefined);
        var width = GetValue$e(config, 'width', undefined);
        var height = GetValue$e(config, 'height', undefined);
        var originX = GetValue$e(config, 'originX', 0);
        var originY = GetValue$e(config, 'originY', 0);
        var padding = GetValue$e(config, 'padding', 0);

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
        renderTexture.draw(gameObjects).render();

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

    const GetValue$d = Phaser.Utils.Objects.GetValue;

    var DrawBounds$1 = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$d(config, 'color');
            lineWidth = GetValue$d(config, 'lineWidth');
            fillColor = GetValue$d(config, 'fillColor');
            fillAlpha = GetValue$d(config, 'fillAlpha', 1);
            padding = GetValue$d(config, 'padding', 0);
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

    const GetValue$c = Phaser.Utils.Objects.GetValue;

    var DrawBounds = function (graphics, config) {
        var drawContainer = GetValue$c(config, 'drawContainer', true);

        var gameObjects = GetValue$c(config, 'children');
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

    var methods = {
        changeOrigin: ChangeOrigin,
        drawBounds: DrawBounds,
    };

    Object.assign(
        methods,
        Parent,
        AddChild,
        RemoveChild,
        ChildState,
        Transform$1,
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
        methods
    );

    const GetValue$b = Phaser.Utils.Objects.GetValue;

    var CreateRectangle = function (scene, config) {
        var x = GetValue$b(config, 'x', 0);
        var y = GetValue$b(config, 'y', 0);
        var width = GetValue$b(config, 'width', 1);
        var height = GetValue$b(config, 'height', 1);
        var color = GetValue$b(config, 'color', undefined);
        var alpha = GetValue$b(config, 'alpha', 1);
        var strokeColor = GetValue$b(config, 'strokeColor', undefined);
        var strokeAlpha = GetValue$b(config, 'strokeAlpha', 1);
        var strokeWidth = GetValue$b(config, 'strokeWidth', 2);

        var gameObject = scene.add.rectangle(x, y, width, height);
        if (color !== undefined) {
            gameObject.setFillStyle(color, alpha);
        }
        if (strokeColor !== undefined) {
            gameObject.setStrokeStyle(strokeWidth, strokeColor, strokeAlpha);
        }
        return gameObject;
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
        var newWidth = source.width * scale;
        var newHeight = source.height * scale;

        if (IsGameObject(out)) {
            ResizeGameObject(out, newWidth, newHeight);
        } else {
            out.width = newWidth;
            out.height = newHeight;
        }

        return out;
    };

    const FitModeMap = {
        'fit': 0,
        'FIT': 0,
        'envelop': 1,
        'ENVELOP': 1
    };

    var globalSize = {};

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    class ImageBoxBase extends ContainerLite {

        setBackground(background) {
            if (IsPlainObject(background)) {
                background = CreateRectangle(this.scene, background);
                this.scene.add.existing(background);
            }
            if (background) {
                this.add(background);
            }
            this.background = background;
            return this;
        }

        setImage(image) {
            if (!image) {
                image = this.scene.add.image(this.x, this.y);
            } else {
                image.setPosition(this.x, this.y).setOrigin(0.5);
            }
            this.add(image);
            this.image = image;

            this.image.setFlipX(this.flipX).setFlipY(this.flipY);
            if (this._colorTopLeft !== undefined) {
                this.image.setTint(this._colorTopLeft, this._colorTopRight, this._colorBottomLeft, this._colorBottomRight);
            }
            return this;
        }

        get texture() {
            return this.image.texture;
        }

        get frame() {
            return this.image.frame;
        }

        get flipX() {
            return this._flipX;
        }

        set flipX(value) {
            if (this._flipX === value) {
                return;
            }

            this._flipX = value;
            this.image.setFlipX(value);
        }

        get flipY() {
            return this._flipY;
        }

        set flipY(value) {
            if (this._flipY === value) {
                return;
            }
            this._flipY = value;
            this.image.setFlipY(value);
        }

        set tint(value) {
            this.image.tint = value;
        }

        get isTinted() {
            return this.image.isTinted;
        }

        setTint(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight) {
            this._colorTopLeft = colorTopLeft;
            this._colorTopRight = colorTopRight;
            this._colorBottomLeft = colorBottomLeft;
            this._colorBottomRight = colorBottomRight;
            this.image.setTint(colorTopLeft, colorTopRight, colorBottomLeft, colorBottomRight);
            return this;
        }

        resizeBackground() {
            var background = this.background;
            if (!background) {
                return this;
            }

            background.setOrigin(this.originX, this.originY);
            background.setPosition(this.x, this.y);
            ResizeGameObject(background, this.displayWidth, this.displayHeight);
            this.resetChildScaleState(background);
            return this;
        }

        scaleImage() {
            var image = this.image;

            if ((!this.scaleUp) &&
                (image.width <= this.width) && (image.height <= this.height)
            ) {
                return this;
            }

            var result = FitTo(image, this, 'FIT', true);
            image.setDisplaySize(result.width * this.scaleX, result.height * this.scaleY);
            this.resetChildScaleState(image);
            return this;
        }

        resize(width, height) {
            super.resize(width, height);

            this.resizeBackground();
            this.scaleImage();
            return this;
        }

        setTexture(texture, frame) {
            var image = this.image;
            image.setTexture(texture, frame);

            if (texture) {
                this.setChildVisible(image, true);
                this.scaleImage();

            } else {
                this.setChildVisible(image, false);

            }
            return this;
        }
    }

    Object.assign(
        ImageBoxBase.prototype,
        FlipMethods,
    );

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
        src.updateData();

        var camera = drawingContext.camera;
        camera.addToRenderList(src);

        var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = src.alpha;

        var submitter = src.customRenderNodes.Submitter || src.defaultRenderNodes.Submitter;

        var shapes = src.geom,
            shape;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            shape = shapes[i];
            if (shape.visible) {
                shape.webglRender(drawingContext, submitter, calcMatrix, src, alpha, dx, dy);
            }
        }
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

    const GetValue$a = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$a(config, 'eventEmitter', true));

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

    const GetValue$9 = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$9(config, 'tickingMode', 1));
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

    const GetValue$8 = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$8(config, 'tickEventName', defaultEventName);
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

    const GetValue$7 = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$7(o, 'state', IDLE);
            this.timeScale = GetValue$7(o, 'timeScale', 1);
            this.delay = GetValue$7(o, 'delay', 0);
            this.repeat = GetValue$7(o, 'repeat', 0);
            this.repeatCounter = GetValue$7(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$7(o, 'repeatDelay', 0);
            this.duration = GetValue$7(o, 'duration', 0);
            this.nowTime = GetValue$7(o, 'nowTime', 0);
            this.justRestart = GetValue$7(o, 'justRestart', false);
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

    const GetValue$6 = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$6(o, 'timer'));
            this.setEnable(GetValue$6(o, 'enable', true));
            this.setTarget(GetValue$6(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue(o, 'delay', 0));
            this.setDuration(GetAdvancedValue(o, 'duration', 1000));
            this.setEase(GetValue$6(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$6(o, 'repeat', 0));

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

    const GetValue$5 = Phaser.Utils.Objects.GetValue;
    const Linear$c = Phaser.Math.Linear;

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
            this.propertyKey = GetValue$5(config, 'key', 'value');
            var currentValue = target[this.propertyKey];
            this.fromValue = GetValue$5(config, 'from', currentValue);
            this.toValue = GetValue$5(config, 'to', currentValue);

            this.setEase(GetValue$5(config, 'ease', this.ease));
            this.setDuration(GetValue$5(config, 'duration', this.duration));
            this.setRepeat(GetValue$5(config, 'repeat', 0));
            this.setDelay(GetValue$5(config, 'delay', 0));
            this.setRepeatDelay(GetValue$5(config, 'repeatDelay', 0));

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

            target[this.propertyKey] = Linear$c(this.fromValue, this.toValue, t);
        }
    }

    var Start = function (duration) {
        if (!this.easeValueTask) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
        }

        if (duration !== undefined) {
            this.duration = duration;
            this.easeValueTask.stop();  // Will restart with new duration
        }

        // Won't restart if easeValueTask is running
        if (this.easeValueTask.isRunning) {
            return this;
        }

        // Start easeValueTask
        this.easeValueTask.restart({
            key: 'value',
            from: 0, to: 1,
            duration: this.duration,
            ease: this.ease,
            repeat: -1,  // -1: infinity

            delay: this.delay,
            repeatDelay: this.repeatDelay
        });

        this.setDirty();

        return this;
    };

    var Stop = function () {
        if (!this.easeValueTask) {
            return this;
        }
        this.easeValueTask.stop();
        this.setDirty();
        return this;
    };

    var Pause = function () {
        if (!this.easeValueTask) {
            return this;
        }
        this.easeValueTask.pause();
        this.setDirty();
        return this;
    };

    var Resume = function () {
        if (!this.easeValueTask) {
            return this;
        }
        this.easeValueTask.pause();
        this.setDirty();
        return this;
    };

    var EaseValueMethods = {
        start: Start,
        stop: Stop,
        pause: Pause,
        resume: Resume
    };

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class Base extends BaseShapes {
        constructor(scene, config) {
            var x = GetValue$4(config, 'x', 0);
            var y = GetValue$4(config, 'y', 0);
            var width = GetValue$4(config, 'width', 64);
            var height = GetValue$4(config, 'height', 64);

            super(scene, x, y, width, height);

            this.resetFromConfig(config, true);

            this.buildShapes(config);

            if (GetValue$4(config, 'start', true)) {
                this.start();
            }
        }

        resetFromConfig(config, setDefaults) {
            if (setDefaults === undefined) {
                setDefaults = false;
            }

            var defaultValue;

            defaultValue = (setDefaults) ? 1000 : this.duration;
            this.setDuration(GetValue$4(config, 'duration', defaultValue));

            defaultValue = (setDefaults) ? 'Linear' : this.ease;
            this.setEase(GetValue$4(config, 'ease', defaultValue));

            defaultValue = (setDefaults) ? 0 : this.delay;
            this.setDelay(GetValue$4(config, 'delay', defaultValue));

            defaultValue = (setDefaults) ? 0 : this.repeatDelay;
            this.setRepeatDelay(GetValue$4(config, 'repeatDelay', defaultValue));

            defaultValue = (setDefaults) ? 0xffffff : this.color;
            this.setColor(GetValue$4(config, 'color', defaultValue));

            defaultValue = (setDefaults) ? 0 : this.value;
            this.setValue(GetValue$4(config, 'value', defaultValue));

            return this;
        }

        buildShapes() {
        }

        get centerX() {
            return this.width / 2;    }

        get centerY() {
            return this.height / 2;
        }

        get radius() {
            return Math.min(this.centerX, this.centerY);
        }

        get color() {
            return this._color;
        }

        set color(value) {
            this.isColorChanged = this.isColorChanged || (this._color !== value);
            this.dirty = this.dirty || this.isColorChanged;
            this._color = value;
            this.setShapesColor(value);
        }

        setColor(color) {
            this.color = color;
            return this;
        }

        setShapesColor(color) {

        }

        get value() {
            return this._value;
        }

        set value(value) {
            value = Phaser.Math.Clamp(value, 0, 1);
            this.dirty = this.dirty || (this._value != value);
            this._value = value;
        }

        setValue(value) {
            this.value = value;
            return this;
        }

        setDuration(duration) {
            this.duration = duration;
            return this;
        }

        setDelay(delay) {
            this.delay = delay;
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            return this;
        }

        setEase(ease) {
            this.ease = ease;
            return this;
        }

        get isRunning() {
            return (this.tweenTask) ? this.tweenTask.isRunning : false;
        }
    }

    Object.assign(
        Base.prototype,
        EaseValueMethods
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

    var GetValue$3 = function (source, key, defaultValue) {
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
            return (key === undefined) ? this.data : GetValue$3(this.data, key, defaultValue);
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

        webglRender(drawingContext, submitter, gameObject, calcMatrix, alpha, dx, dy) {

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
    shapeData: {
        fillColor, 
        fillAlpha, 
        pathData, 
        pathIndexes  // Earcut(pathData)
    }
    */

    var Utils$1 = Phaser.Renderer.WebGL.Utils;

    var FillPathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
        // This is very similar to the FillPath RenderNode, but it already
        // has access to the Earcut indexes, so it doesn't need to calculate them.

        var fillTintColor = Utils$1.getTintAppendFloatAlpha(shapeData.fillColor, shapeData.fillAlpha * alpha);

        var path = shapeData.pathData;
        var pathIndexes = shapeData.pathIndexes;

        var length = path.length;
        var pathIndex, pointX, pointY, x, y;

        var vertices = Array(length * 2);
        var colors = Array(length);

        var verticesIndex = 0;
        var colorsIndex = 0;

        for (pathIndex = 0; pathIndex < length; pathIndex += 2) {
            pointX = path[pathIndex] - dx;
            pointY = path[pathIndex + 1] - dy;

            // Transform the point.
            x = calcMatrix.getX(pointX, pointY);
            y = calcMatrix.getY(pointX, pointY);

            vertices[verticesIndex++] = x;
            vertices[verticesIndex++] = y;
            colors[colorsIndex++] = fillTintColor;
        }

        submitter.batch(
            drawingContext,
            pathIndexes,
            vertices,
            colors
        );
    };

    /*
    shapeData: {
        strokeColor,
        strokeAlpha,
        pathData,
        lineWidth,
        closePath
    }
    */
    var Utils = Phaser.Renderer.WebGL.Utils;

    var StrokePathWebGL = function (drawingContext, submitter, matrix, gameObject, shapeData, alpha, dx, dy) {
        var strokeTintColor = Utils.getTintAppendFloatAlpha(shapeData.strokeColor, shapeData.strokeAlpha * alpha);

        var path = shapeData.pathData;
        var pathLength = path.length - 1;
        var lineWidth = shapeData.lineWidth;
        var openPath = !shapeData.closePath;

        var strokePath = gameObject.customRenderNodes.StrokePath || gameObject.defaultRenderNodes.StrokePath;

        var pointPath = [];

        // Don't add the last point to open paths.
        if (openPath) {
            pathLength -= 2;
        }

        for (var i = 0; i < pathLength; i += 2) {
            var x = path[i] - dx;
            var y = path[i + 1] - dy;
            if (i > 0) {
                if (x === path[i - 2] && y === path[i - 1]) {
                    // Duplicate point, skip it
                    continue;
                }
            }
            pointPath.push({
                x: x,
                y: y,
                width: lineWidth
            });
        }

        strokePath.run(
            drawingContext,
            submitter,
            pointPath,
            lineWidth,
            openPath,
            matrix,
            strokeTintColor, strokeTintColor, strokeTintColor, strokeTintColor
        );
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

        webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
            if (this.isFilled) {
                FillPathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
            }

            if (this.isStroked) {
                StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
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

    var StartAt = function (x, y, pathData) {
        pathData.length = 0;

        if (x != null) {
            pathData.push(x, y);
        }

        return pathData;
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

    const DegToRad$4 = Phaser.Math.DegToRad;

    var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        var deltaAngle = endAngle - startAngle;
        var step = DegToRad$4(deltaAngle) / iteration;
        startAngle = DegToRad$4(startAngle);
        for (var i = 0; i <= iteration; i++) {
            var angle = startAngle + (step * i);
            var x = centerX + (radiusX * Math.cos(angle));
            var y = centerY + (radiusY * Math.sin(angle));
            LineTo(x, y, pathData);
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

    const DegToRad$3 = Phaser.Math.DegToRad;
    Phaser.Math.RotateAround;

    var TransformPointsMethods = {
        rotateAround(centerX, centerY, angle) {
            if (this.pathData.length === 0) {
                return this;
            }

            angle = DegToRad$3(angle);

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
    const Linear$b = Phaser.Math.Linear;

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
        return Linear$b(p0, p1, t);
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

    const DegToRad$2 = Phaser.Math.DegToRad;
    const Linear$a = Phaser.Math.Linear;
    const ExpoIn$4 = Phaser.Math.Easing.Expo.In;

    const DIRMAP = {
        right: 0,
        down: 1,
        left: 2,
        up: 3
    };

    var ArrowPolygon = function (polygon, innerX, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d) {
        var p0 = Transform(innerX, 0, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.startAt(p0.x, p0.y);
        var p1 = Transform(outerX, 0, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p1.x, p1.y);
        var p2 = Transform(outerX, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p2.x, p2.y);
        var p3 = Transform(0, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p3.x, p3.y);
        var p4 = Transform(0, innerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p4.x, p4.y);
        var p5 = Transform(innerX, innerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p5.x, p5.y);
        polygon.close();
    };

    var GlobPoint = {};
    var Transform = function (gridX, gridY, gridWidth, gridHeight, x0, y0, a, b, c, d) {
        var x = gridX * gridWidth;
        var y = gridY * gridHeight;
        GlobPoint.x = a * x + b * y + x0;
        GlobPoint.y = c * x + d * y + y0;
        return GlobPoint;
    };

    var ArrowUpdateShapesMethods = {
        setDirection(direction) {
            if (typeof (direction) === 'string') {
                direction = DIRMAP[direction];
            }
            this.direction = direction;
            return this;
        },

        buildShapes() {
            for (var i = 0; i < 3; i++) {
                this.addShape(new Lines());
            }
        },

        updateShapes() {
            var x0, y0, a, b, c, d;
            switch (this.direction) {
                case 1:
                    x0 = this.centerX;
                    y0 = this.centerY - this.radius;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(315);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(45);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;

                case 3:
                    x0 = this.centerX;
                    y0 = this.centerY + this.radius;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(135);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(225);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;

                case 2:
                    x0 = this.centerX + this.radius;
                    y0 = this.centerY;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(225);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(315);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;

                default:
                    x0 = this.centerX - this.radius;
                    y0 = this.centerY;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(45);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(135);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;
            }

            var gridSize = this.radius / 7;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];

                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn$4(Yoyo(t));
                var alpha = Linear$a(0.25, 1, t);

                shape.fillStyle(this.color, alpha);

                var innerX = (i * 3) + 1;
                var outerX = innerX + 2;
                ArrowPolygon(shape, innerX, outerX, gridSize, gridSize, x0, y0, a, b, c, d);
            }
        }
    };

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

    const Linear$9 = Phaser.Math.Linear;

    var AudioUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 4; i++) {
                this.addShape(new Line());
            }
            this.prevValue = undefined;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;
            var bottomBound = centerY + radius;
            var maxLineHeight = radius * 2;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var lineWidth = cellWidth * 0.7;

            // Reset range of value
            if ((this.prevValue === undefined) || (this.prevValue > this.value)) {
                for (var i = 0; i < cnt; i++) {
                    var line = shapes[i];
                    var from = (this.prevValue === undefined) ? Math.random() : line.getData('to');
                    line
                        .setData('from', from)
                        .setData('to', Math.random());
                }
            }
            this.prevValue = this.value;

            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var from = line.getData('from'),
                    to = line.getData('to'),
                    current = Linear$9(from, to, this.value);
                var lineHeight = current * maxLineHeight;
                var x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, 1)
                    .setP0(x, bottomBound)
                    .setP1(x, (bottomBound - lineHeight));

            }
        }
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

    const Linear$8 = Phaser.Math.Linear;

    var BallUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 3; i++) {
                this.addShape(new Circle());
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var ballRadius = radius * 0.1;
            var lineWidth = Math.ceil(ballRadius * 0.25);

            var t = 1 - Yoyo(this.value);
            var trackRadius = Linear$8(0.3, 0.9, t) * radius;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var ball = shapes[i];
                var t = (this.value + (i / cnt)) % 1;
                var angle = Math.PI * 2 * t;
                ball
                    .lineStyle(lineWidth, this.color)
                    .setRadius(ballRadius)
                    .setCenterPosition(
                        centerX + Math.cos(angle) * trackRadius,
                        centerY + Math.sin(angle) * trackRadius
                    );
            }
        }
    };

    const Linear$7 = Phaser.Math.Linear;
    const ExpoIn$3 = Phaser.Math.Easing.Expo.In;

    var BarsUpdateShapeMethods = {
        buildShapes() {
            var cnt = 5;
            for (var i = 0; i < cnt; i++) {
                var line = new Line();
                this.addShape(line);
                var offset = Yoyo(i / (cnt - 1)) / 2;
                line.setData('offset', offset);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;
            var maxLineHeight = radius * 2;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var lineWidth = cellWidth * 0.7;


            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var t = (this.value + line.getData('offset')) % 1;
                t = ExpoIn$3(Yoyo(t));

                var lineHeight = Linear$7(0.4, 1, t) * maxLineHeight;
                var x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, 1)
                    .setP0(x, (centerY - (lineHeight / 2)))
                    .setP1(x, (centerY + (lineHeight / 2)));

            }
        }
    };

    var BoxUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Lines()).setName('border'));
            this.addShape((new Lines()).setName('fill'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;

            var halfWidth = radius * 0.7;
            var left = centerX - halfWidth,
                top = centerY - halfWidth,
                width = halfWidth * 2;

            this.getShape('border')
                .lineStyle(2, this.color, 1)
                .startAt(left, top).lineTo(width, 0, true)
                .lineTo(0, width, true).lineTo(-width, 0, true)
                .lineTo(0, -width, true).close();

            if (this.value < 0.5) {
                var t = (0.5 - this.value) * 2;
                var height = width * t;
                this.getShape('fill')
                    .fillStyle(this.color, 1)
                    .startAt(left, top).lineTo(width, 0, true)
                    .lineTo(0, height, true).lineTo(-width, 0, true)
                    .lineTo(0, -height, true).close();

            } else { // Rotate
                var t = (this.value - 0.5) * 2;
                var angle = 180 * t;

                this.getShape('border').rotateAround(centerX, centerY, angle);
                this.getShape('fill').fillStyle().lineStyle();
            }
        }
    };

    const RadToDeg = Phaser.Math.RadToDeg;
    const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
    const WrapRad = Phaser.Math.Angle.Wrap;
    const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
    const DegToRad = Phaser.Math.DegToRad;
    const Rad270 = Phaser.Math.DegToRad(270);

    var ClockUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('border'));
            this.addShape((new Line()).setName('minuteHand'));
            this.addShape((new Line()).setName('hourHand'));

            this.minuteHandAngle = 0;
            this.hourHandAngle = 0;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var borderRadius = radius - (lineWidth / 2);
            var minuteHandLength = radius * 0.8;
            var hourHandLength = radius * 0.5;

            var prevMinuteHandAngle = this.minuteHandAngle;
            this.minuteHandAngle = Math.PI * 2 * this.value;
            var angle0 = WrapDegrees(RadToDeg(prevMinuteHandAngle));
            var angle1 = WrapDegrees(RadToDeg(this.minuteHandAngle));
            var deltaAngle = ShortestBetween(angle0, angle1);
            this.hourHandAngle = WrapRad(this.hourHandAngle + (DegToRad(deltaAngle) / 12));

            this.getShape('border')
                .lineStyle(lineWidth, this.color)
                .setRadius(borderRadius)
                .setCenterPosition(centerX, centerY);

            var angle = this.minuteHandAngle + Rad270;
            this.getShape('minuteHand')
                .lineStyle(lineWidth, this.color)
                .setP0(centerX, centerY)
                .setP1(
                    centerX + (Math.cos(angle) * minuteHandLength),
                    centerY + (Math.sin(angle) * minuteHandLength)
                );

            var angle = this.hourHandAngle + Rad270;
            this.getShape('hourHand')
                .lineStyle(lineWidth, this.color)
                .setP0(centerX, centerY)
                .setP1(
                    centerX + (Math.cos(angle) * hourHandLength),
                    centerY + (Math.sin(angle) * hourHandLength)
                );
        }
    };

    const Linear$6 = Phaser.Math.Linear;
    const ExpoIn$2 = Phaser.Math.Easing.Expo.In;
    const RowNum$1 = 2;
    const ColNum$1 = 2;

    var CubeUpdateShapeMethods = {
        buildShapes() {
            var cnt = RowNum$1 * ColNum$1;
            for (var i = 0; i < cnt; i++) {
                var line = new Line();
                this.addShape(line);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;
            var topBound = centerY - radius;
            var cellWidth = (radius * 2) / ColNum$1;
            var cellHeight = (radius * 2) / RowNum$1;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            for (var i = 0; i < cnt; i++) {
                var colIdx = (i % ColNum$1);
                var rowIdx = Math.floor(i / RowNum$1);
                var x = leftBound + (cellWidth * (colIdx + 0.5));
                var y = topBound + (cellHeight * (rowIdx + 0.5));

                var line = shapes[i];
                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn$2(Yoyo(t));

                var lineAlpha = (cnt - i) / cnt;
                var lineHeight = Linear$6(0.7, 1, t) * cellHeight;
                var lineWidth = Linear$6(0.7, 1, t) * cellWidth;

                line
                    .lineStyle(lineWidth, this.color, lineAlpha)
                    .setP0(x - (lineHeight / 2), y)
                    .setP1(x + (lineHeight / 2), y);
            }
        }
    };

    const Linear$5 = Phaser.Math.Linear;

    var DotsUpdateShapeMethods = {
        buildShapes() {
            var cnt = 3;
            for (var i = 0; i < cnt; i++) {
                var dot = new Circle();
                this.addShape(dot);

                var offset = Yoyo(i / (cnt - 1)) / 2;
                dot.setData('offset', offset);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var maxDotRadius = cellWidth / 2;

            for (var i = 0; i < cnt; i++) {
                var dot = shapes[i];
                var t = (this.value + dot.getData('offset')) % 1;
                t = Yoyo(t);

                var dotAlpha = Linear$5(0.25, 1, t);
                var dotRadius = Linear$5(0.5, 1, t) * maxDotRadius;
                dot
                    .fillStyle(this.color, dotAlpha)
                    .setRadius(dotRadius)
                    .setCenterPosition(
                        leftBound + (cellWidth * (i + 0.5)),
                        centerY
                    );
            }
        }
    };

    const Linear$4 = Phaser.Math.Linear;
    const ExpoIn$1 = Phaser.Math.Easing.Expo.In;

    var FacebookUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 3; i++) {
                var shape = new Line();
                this.addShape(shape);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var cellHeight = radius * 2;

            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn$1(Yoyo(t));

                var lineAlpha = (i + 1) / cnt;
                var lineHeight = Linear$4(0.7, 1, t) * cellHeight;
                var lineWidth = Linear$4(0.7, 1, t) * cellWidth;
                var x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, lineAlpha)
                    .setP0(x, centerY - (lineHeight / 2))
                    .setP1(x, centerY + (lineHeight / 2));
            }
        }
    };

    const Linear$3 = Phaser.Math.Linear;
    const RowNum = 3;
    const ColNum = 3;

    var GridUpdateShapeMethods = {
        buildShapes() {
            var cnt = RowNum * ColNum;
            for (var i = 0; i < cnt; i++) {
                var dot = new Circle();
                this.addShape(dot);

                dot.setData('offset', Math.random());
            }
            this.isInitialize = true;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var needLayout = this.isInitialize || this.isSizeChanged;

            var leftBound = centerX - radius;
            var topBound = centerY - radius;
            var cellWidth = (radius * 2) / ColNum;
            var cellHeight = (radius * 2) / RowNum;
            var maxDotRadius = (Math.min(cellWidth, cellHeight) / 2) * 0.8;


            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var colIdx = (i % ColNum);
                var rowIdx = Math.floor(i / RowNum);
                var x = leftBound + cellWidth * (colIdx + 0.5);
                var y = topBound + cellHeight * (rowIdx + 0.5);

                var dot = shapes[i];
                var t = (this.value + dot.getData('offset')) % 1;
                t = Yoyo(t);
                dot.fillStyle(this.color, Linear$3(0.25, 1, t));

                if (needLayout) {
                    dot
                        .setRadius(maxDotRadius)
                        .setCenterPosition(x, y);
                }
            }

            this.isInitialize = false;
        }
    };

    var HeartsUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 2; i++) {
                this.addShape(new Lines());
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var maxW50 = radius - lineWidth,
                maxW30 = maxW50 * 0.6,
                maxW35 = maxW50 * 0.7,
                maxW60 = maxW50 * 1.2;


            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var heart = shapes[i];
                var t = (this.value + (i / cnt)) % 1;
                var alpha = Yoyo(t);
                var x = centerX,
                    y = centerY - (15 * t);
                var w50 = maxW50 * t,
                    w30 = maxW30 * t,
                    w35 = maxW35 * t,
                    w60 = maxW60 * t;

                heart
                    .lineStyle(lineWidth, this.color, alpha)
                    .startAt(
                        x, y
                    )
                    .cubicBezierTo(
                        x, y - w30,
                        x - w50, y - w30,
                        x - w50, y
                    )
                    .cubicBezierTo(
                        x - w50, y + w30,
                        x, y + w35,
                        x, y + w60
                    )
                    .cubicBezierTo(
                        x, y + w35,
                        x + w50, y + w30,
                        x + w50, y
                    )
                    .cubicBezierTo(
                        x + w50, y - w30,
                        x, y - w30,
                        x, y
                    )
                    .close();
            }
        }
    };

    const Linear$2 = Phaser.Math.Linear;

    var IosUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 12; i++) {
                this.addShape(new Line());
            }
            this.isInitialize = true;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var needLayout = this.isInitialize || this.isSizeChanged;

            var radius = this.radius;
            var startRadius = radius / 2;
            var lineWidth = Math.ceil(radius / 20);
            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var line = shapes[i];
                var t = i / cnt;
                var angle = Math.PI * 2 * t;
                var alpha = Linear$2(0.25, 1, (1 - this.value + t) % 1);
                line.lineStyle(lineWidth, this.color, alpha);

                if (needLayout) {
                    line
                        .setP0(
                            centerX + Math.cos(angle) * startRadius,
                            centerY + Math.sin(angle) * startRadius
                        )
                        .setP1(
                            centerX + Math.cos(angle) * radius,
                            centerY + Math.sin(angle) * radius
                        );
                }
            }

            this.isInitialize = false;
        }
    };

    var OribitUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('track'));
            this.addShape((new Circle()).setName('thumb'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var trackRadius = radius * 0.9;
            var trackThickness = Math.ceil(trackRadius / 25);
            var thumbRadius = radius * 0.1;
            var thumbAngle = Math.PI * 2 * this.value;

            this.getShape('track')
                .lineStyle(trackThickness, this.color, 0.7)
                .setRadius(trackRadius)
                .setCenterPosition(centerX, centerY);

            this.getShape('thumb')
                .fillStyle(this.color)
                .setRadius(thumbRadius)
                .setCenterPosition(
                    centerX + Math.cos(thumbAngle) * trackRadius,
                    centerY + Math.sin(thumbAngle) * trackRadius
                );
        }
    };

    var OvalUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('track'));
            this.addShape((new Arc()).setName('arc'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var maxRadius = radius - (lineWidth / 2);

            this.getShape('track')
                .lineStyle(lineWidth, this.color, 0.5)
                .setRadius(maxRadius)
                .setCenterPosition(centerX, centerY);

            var startAngle = this.value * 360;
            var endAngle = startAngle + 60;
            this.getShape('arc')
                .lineStyle(lineWidth, this.color, 1)
                .setRadius(maxRadius)
                .setCenterPosition(centerX, centerY)
                .setAngle(startAngle, endAngle);

        }
    };

    const Linear$1 = Phaser.Math.Linear;

    var PieUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 4; i++) {
                var pie = (new Arc()).setPie();
                this.addShape(pie);

                pie.setData('speed', Linear$1(180, 360, Math.random()));
            }
            this.prevValue = undefined;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;

            var deltaValue;
            if (this.prevValue !== undefined) {
                deltaValue = this.value - this.prevValue;
                if (this.prevValue > this.value) {
                    deltaValue += 1;
                }
            }

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var pie = shapes[i];
                var pieAlpha = (i + 1) / cnt;

                if (this.prevValue === undefined) {
                    var startAngle = (i / cnt) * 360;
                    var endAngle = startAngle + 90;
                    pie
                        .fillStyle(this.color, pieAlpha)
                        .setRadius(radius)
                        .setCenterPosition(centerX, centerY)
                        .setAngle(startAngle, endAngle)
                        .setData('angle', startAngle);
                } else {
                    var startAngle = pie.getData('angle') + pie.getData('speed') * deltaValue;
                    startAngle = startAngle % 360;
                    var endAngle = startAngle + 90;
                    pie
                        .fillStyle(this.color, pieAlpha)
                        .setRadius(radius)
                        .setCenterPosition(centerX, centerY)
                        .setAngle(startAngle, endAngle)
                        .setData('angle', startAngle);

                }

            }

            this.prevValue = this.value;

        }
    };

    var PuffUpdateShapeMethods = {
        buildShapes() {
            this.addShape(new Circle());
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var puffRadius = radius * this.value;
            var lineWidth = Math.ceil(radius / 25);
            var alpha = Yoyo(this.value);

            this.getShapes()[0]
                .lineStyle(lineWidth, this.color, alpha)
                .setRadius(puffRadius)
                .setCenterPosition(centerX, centerY);
        }
    };

    const Linear = Phaser.Math.Linear;
    const ExpoIn = Phaser.Math.Easing.Expo.In;

    var RadioUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('center'));
            this.addShape((new Lines()).setName('arc0'));
            this.addShape((new Lines()).setName('arc1'));
            this.isInitialize = true;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var needLayout = this.isInitialize || this.isSizeChanged;

            var centerRadius = (radius * 2) / 6;
            var x = centerX - radius + centerRadius;
            var y = centerY + radius - centerRadius;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];

                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn(Yoyo(t));
                var alpha = Linear(0.25, 1, t);

                switch (shape.name) {
                    case 'center':
                        shape.fillStyle(this.color, alpha);

                        if (needLayout) {
                            shape
                                .setRadius(centerRadius)
                                .setCenterPosition(x, y);
                        }
                        break;
                    case 'arc0':
                        shape.fillStyle(this.color, alpha);

                        if (needLayout) {
                            var radius0 = centerRadius * 2,
                                radius1 = centerRadius * 3;
                            shape
                                .startAt(x, y - radius0)
                                .lineTo(x, y - radius1)
                                .setIterations(8).arc(x, y, radius1, 270, 360)
                                .lineTo(x + radius0, y)
                                .setIterations(6).arc(x, y, radius0, 360, 270, true)
                                .close();
                        }
                        break;
                    case 'arc1':
                        shape.fillStyle(this.color, alpha);

                        if (needLayout) {
                            var radius0 = centerRadius * 4,
                                radius1 = centerRadius * 5;
                            shape
                                .startAt(x, y - radius0)
                                .lineTo(x, y - radius1)
                                .setIterations(8).arc(x, y, radius1, 270, 360)
                                .lineTo(x + radius0, y)
                                .setIterations(6).arc(x, y, radius0, 360, 270, true)
                                .close();
                        }
                        break;
                }
            }

            this.isInitialize = false;
        }
    };

    var RingsUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 2; i++) {
                this.addShape(new Circle());
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var maxRingRadius = radius - lineWidth;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var ring = shapes[i];
                var t = (this.value + (i / cnt)) % 1;
                var alpha = Yoyo(t);
                ring
                    .lineStyle(lineWidth, this.color, alpha)
                    .setRadius(t * maxRingRadius)
                    .setCenterPosition(centerX, centerY);
            }
        }
    };

    var SpinnerUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Arc()).setName('arc'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 10);
            var maxRadius = radius - lineWidth;

            var endAngle = this.value * 720;
            var arcAngle = Yoyo(this.value) * 180;
            var startAngle = endAngle - arcAngle;
            this.getShape('arc')
                .lineStyle(lineWidth, this.color, 1)
                .setRadius(maxRadius)
                .setCenterPosition(centerX, centerY)
                .setAngle(startAngle + 315, endAngle + 315);

        }
    };

    Phaser.Utils.Objects.GetValue;

    const AnimationModeMap = {
        leftArrow: ArrowUpdateShapesMethods,
        rightArrow: ArrowUpdateShapesMethods,
        upArrow: ArrowUpdateShapesMethods,
        downArrow: ArrowUpdateShapesMethods,
        audio: AudioUpdateShapeMethods,
        ball: BallUpdateShapeMethods,
        bars: BarsUpdateShapeMethods,
        box: BoxUpdateShapeMethods,
        clock: ClockUpdateShapeMethods,
        cube: CubeUpdateShapeMethods,
        dots: DotsUpdateShapeMethods,
        facebook: FacebookUpdateShapeMethods,
        grid: GridUpdateShapeMethods,
        hearts: HeartsUpdateShapeMethods,
        ios: IosUpdateShapeMethods,
        oribit: OribitUpdateShapeMethods,
        oval: OvalUpdateShapeMethods,
        pie: PieUpdateShapeMethods,
        puff: PuffUpdateShapeMethods,
        radio: RadioUpdateShapeMethods,
        rings: RingsUpdateShapeMethods,
        spinner: SpinnerUpdateShapeMethods
    };

    const AnimationModeList = [];
    for (var name in AnimationModeMap) {
        AnimationModeList.push(name);
    }

    const GetRandomItem = Phaser.Utils.Array.GetRandom;

    var UpdateShapeMethods = {
        setAnimationMode(mode, config) {
            if (!AnimationModeMap.hasOwnProperty(mode)) {
                mode = GetRandomItem(AnimationModeList);
            }
            this.animationMode = mode;
            var updateMethods = AnimationModeMap[mode];

            if (config) {
                this.resetFromConfig(config);
            }

            switch (mode) {
                case 'leftArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'left');
                    break;

                case 'rightArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'right');
                    break;

                case 'upArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'up');
                    break;

                case 'downArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'down');
                    break;
            }

            this.clear();
            updateMethods.buildShapes.call(this);
            this.updateShapes = updateMethods.updateShapes.bind(this);

            this.stop().start();

            return this;
        },

        setRandomAnimationMode(config) {
            var mode = GetRandomItem(AnimationModeList);
            this.setAnimationMode(mode, config);
            return this;
        }
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    class AIO extends Base {
        constructor(scene, config) {
            super(scene, config);
            this.type = 'rexSpinnerAIO';

            this.setAnimationMode(GetValue$2(config, 'animationMode'));
        }
    }

    Object.assign(
        AIO.prototype,
        UpdateShapeMethods,
    );

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var SpinnerMethods = {
        setSpinner(spinner) {
            if (spinner === null) {
                this.spinner = spinner;
                return this;
            }

            var sizeRatio;
            if (!IsGameObject(spinner)) {
                var scene = this.scene;
                var animationMode = GetValue$1(spinner, 'animationMode', 'ios');
                sizeRatio = GetValue$1(spinner, 'sizeRatio', 0.6);
                var size = Math.min(this.displayWidth, this.displayHeight) * sizeRatio;
                spinner = new AIO(scene, {
                    width: size, height: size,
                    animationMode: animationMode,
                });
                scene.add.existing(spinner);
            } else {
                sizeRatio = spinner.width / Math.min(this.width, this.height);
            }

            this.spinnerSizeRatio = sizeRatio;
            spinner.setPosition(this.x, this.y).setOrigin(0.5);
            this.add(spinner);
            this.spinner = spinner;

            this.stopSpinner();
            return this;
        },

        startSpinner() {
            var spinner = this.spinner;
            if (!spinner) {
                return this;
            }

            spinner.start();
            this.setChildVisible(spinner, true);
            return this;
        },

        stopSpinner() {
            var spinner = this.spinner;
            if (!spinner) {
                return this;
            }
            spinner.stop();
            this.setChildVisible(spinner, false);
            return this;
        },

        resizeSpinner() {
            var spinner = this.spinner;
            if (!spinner) {
                return this;
            }
            var size = Math.min(this.displayWidth, this.displayHeight) * this.spinnerSizeRatio;
            spinner.setSize(size, size);
            this.resetChildScaleState(spinner);
            return this;
        },

    };

    const GetValue = Phaser.Utils.Objects.GetValue;

    class LazyLoadImageBox extends ImageBoxBase {
        constructor(scene, config) {
            var x = GetValue(config, 'x', 0);
            var y = GetValue(config, 'y', 0);
            var width = GetValue(config, 'width', 0);
            var height = GetValue(config, 'height', 0);
            super(scene, x, y, width, height);
            this.type = 'rexLazyLoadImageBox';

            this.scaleUp = GetValue(config, 'scaleUp', false);

            var background = GetValue(config, 'background');
            this.setBackground(background);

            var image = GetValue(config, 'image');
            this.setImage(image);

            var texture = GetValue(config, 'key', undefined);
            var frame = GetValue(config, 'frame', undefined);
            var url = GetValue(config, 'url', undefined);
            this.setTexture(texture, frame, url);

            var spinner = GetValue(config, 'spinner');
            this.setSpinner(spinner);

            this.resize(width, height);
        }


        setTexture(texture, frame, url) {
            this._textureKey = texture;
            this._frameName = frame;
            var scene = this.scene;
            var runLazyLoading = !scene.sys.textures.exists(texture);

            if (runLazyLoading && !!texture && !!url) {
                super.setTexture();
                this.startSpinner();

                // Lazy loading
                var self = this;
                var callback = super.setTexture;
                scene.load.image(texture, url)
                    .once(`filecomplete-image-${texture}`, function (key) {
                        // This Image game object might be destroyed -> scene = undefined
                        if (!!self.scene && (key === self._textureKey)) {
                            callback.call(self, texture, frame);
                            self.stopSpinner();
                        }
                    })
                    .start();

            } else {
                super.setTexture(texture, frame);
                this.stopSpinner();
            }

            return this;
        }

        resize(width, height) {
            super.resize(width, height);

            this.resizeSpinner();
            return this;
        }
    }

    Object.assign(
        LazyLoadImageBox.prototype,
        SpinnerMethods,
    );

    function Factory (config) {
        var gameObject = new LazyLoadImageBox(this.scene, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new LazyLoadImageBox(this.scene, config);
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

    class LazyLoadImageBoxPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexLazyLoadImageBox', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.LazyLoadImageBox', LazyLoadImageBox);

    return LazyLoadImageBoxPlugin;

}));
