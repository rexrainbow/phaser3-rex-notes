(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexstencillayerplugin = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

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
        var version = phaser.VERSION.split('.');
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

    const SKIP_CHECK_BLEND_MODE = phaser.BlendModes.SKIP_CHECK;

    var WebGLRenderer = function (renderer, layer, drawingContext, parentMatrix, renderStep, displayList, displayListIndex) {
        var children = layer.list;
        var childCount = children.length;

        if (childCount === 0) {
            return;
        }

        var currentContext = drawingContext;
        var camera = currentContext.camera;

        layer.depthSort();

        var layerHasBlendMode = (layer.blendMode !== SKIP_CHECK_BLEND_MODE);
        var useStencilMask = (layer.stencilGameObjects.length > 0);

        if (!layerHasBlendMode && currentContext.blendMode !== 0) {
            //  If Layer is SKIP_TEST then set blend mode to be Normal
            currentContext = currentContext.getClone();
            currentContext.setBlendMode(0);
            currentContext.use();
        }

        var alpha = layer.alpha;

        if (useStencilMask) {
            PushStencilMask(renderer, layer.stencilGameObjects, layer.stencilInvert, currentContext);
        }

        for (var i = 0; i < childCount; i++) {
            var child = children[i];

            if (!child.willRender(camera)) {
                continue;
            }

            var childAlphaTopLeft;
            var childAlphaTopRight;
            var childAlphaBottomLeft;
            var childAlphaBottomRight;

            if (child.alphaTopLeft !== undefined) {
                childAlphaTopLeft = child.alphaTopLeft;
                childAlphaTopRight = child.alphaTopRight;
                childAlphaBottomLeft = child.alphaBottomLeft;
                childAlphaBottomRight = child.alphaBottomRight;
            }
            else {
                var childAlpha = child.alpha;

                childAlphaTopLeft = childAlpha;
                childAlphaTopRight = childAlpha;
                childAlphaBottomLeft = childAlpha;
                childAlphaBottomRight = childAlpha;
            }

            if (
                !layerHasBlendMode &&
                child.blendMode !== currentContext.blendMode &&
                child.blendMode !== SKIP_CHECK_BLEND_MODE
            ) {
                //  If Layer doesn't have its own blend mode, then a child can have one
                currentContext = currentContext.getClone();
                currentContext.setBlendMode(child.blendMode);
                currentContext.use();
            }

            child.setAlpha(childAlphaTopLeft * alpha, childAlphaTopRight * alpha, childAlphaBottomLeft * alpha, childAlphaBottomRight * alpha);

            //  Render
            child.renderWebGLStep(renderer, child, currentContext, undefined, undefined, children, i);

            //  Restore original values
            child.setAlpha(childAlphaTopLeft, childAlphaTopRight, childAlphaBottomLeft, childAlphaBottomRight);
        }

        if (useStencilMask) {
            PopStencilMask(renderer, layer.stencilGameObjects, layer.stencilInvert, currentContext);
        }

        // Release any remaining context.
        if (currentContext !== drawingContext) {
            currentContext.release();
        }
    };


    var PushStencilMask = function (renderer, stencilGameObjects, stencilInvert, drawingContext) {
        RenderStencilMask(renderer, stencilGameObjects, stencilInvert, drawingContext, true);
    };

    var PopStencilMask = function (renderer, stencilGameObjects, stencilInvert, drawingContext) {
        RenderStencilMask(renderer, stencilGameObjects, stencilInvert, drawingContext, false);
    };

    var RenderStencilMask = function (renderer, stencilGameObjects, stencilInvert, drawingContext, push) {
        var gl = renderer.gl;
        var opIncr = gl.INCR_WRAP;
        var opDecr = gl.DECR_WRAP;
        var fillOp;
        var maskOp;
        var maskFunc;
        var maskRef;

        if (stencilInvert) {
            fillOp = (push) ? opIncr : opDecr;
            maskOp = (push) ? opDecr : opIncr;
            maskFunc = gl.EQUAL;
            maskRef = (push) ? 1 : 0xFF;

        } else {
            maskOp = (push) ? opIncr : opDecr;
            maskFunc = gl.ALWAYS;
            maskRef = 0;
        }

        var currentContext = drawingContext.getClone();

        currentContext.setAlphaStrategy(renderer.config.stencilAlphaStrategy);
        currentContext.setColorWritemask(false, false, false, false);

        if (stencilInvert) {
            currentContext.setStencil(true, gl.ALWAYS, 0, 0xFF, fillOp, fillOp, fillOp, 0, 0xFF);
            currentContext.use();

            renderer.renderNodes.getNode('FillCamera').run(currentContext, 0xff000000, drawingContext.useCanvas);

            currentContext = currentContext.getClone();
        }

        currentContext.setStencil(true, maskFunc, maskRef, 0xFF, gl.KEEP, gl.KEEP, maskOp, 0, 0xFF);
        currentContext.use();

        for (var i = 0, cnt = stencilGameObjects.length; i < cnt; i++) {
            stencilGameObjects[i].renderWebGLStep(renderer, stencilGameObjects[i], currentContext);
        }

        currentContext.release();
    };

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2020 Photon Storm Ltd.
     * @license      {@link https://opensource.org/licenses/MIT|MIT License}
     */

    /**
     * Adds the given item, or array of items, to the array.
     *
     * Each item must be unique within the array.
     *
     * The array is modified in-place and returned.
     *
     * You can optionally specify a limit to the maximum size of the array. If the quantity of items being
     * added will take the array length over this limit, it will stop adding once the limit is reached.
     *
     * You can optionally specify a callback to be invoked for each item successfully added to the array.
     *
     * @function Phaser.Utils.Array.Add
     * @since 3.4.0
     *
     * @param {array} array - The array to be added to.
     * @param {any|any[]} item - The item, or array of items, to add to the array. Each item must be unique within the array.
     * @param {number} [limit] - Optional limit which caps the size of the array.
     * @param {function} [callback] - A callback to be invoked for each item successfully added to the array.
     * @param {object} [context] - The context in which the callback is invoked.
     *
     * @return {array} The input array.
     */
    var Add = function (array, item, limit, callback, context)
    {
        if (context === undefined) { context = array; }

        if (limit > 0)
        {
            var remaining = limit - array.length;

            //  There's nothing more we can do here, the array is full
            if (remaining <= 0)
            {
                return null;
            }
        }

        //  Fast path to avoid array mutation and iteration
        if (!Array.isArray(item))
        {
            if (array.indexOf(item) === -1)
            {
                array.push(item);

                if (callback)
                {
                    callback.call(context, item);
                }

                return item;
            }
            else
            {
                return null;
            }
        }

        //  If we got this far, we have an array of items to insert

        //  Ensure all the items are unique
        var itemLength = item.length - 1;

        while (itemLength >= 0)
        {
            if (array.indexOf(item[itemLength]) !== -1)
            {
                //  Already exists in array, so remove it
                item.splice(itemLength, 1);
            }

            itemLength--;
        }

        //  Anything left?
        itemLength = item.length;

        if (itemLength === 0)
        {
            return null;
        }

        if (limit > 0 && itemLength > remaining)
        {
            item.splice(remaining);

            itemLength = remaining;
        }

        for (var i = 0; i < itemLength; i++)
        {
            var entry = item[i];

            array.push(entry);

            if (callback)
            {
                callback.call(context, entry);
            }
        }

        return item;
    };

    var Add_1 = Add;

    var AddItem = /*@__PURE__*/getDefaultExportFromCjs(Add_1);

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2018 Photon Storm Ltd.
     * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
     */

    /**
     * Removes a single item from an array and returns it without creating gc, like the native splice does.
     * Based on code by Mike Reinstein.
     *
     * @function Phaser.Utils.Array.SpliceOne
     * @since 3.0.0
     *
     * @param {array} array - The array to splice from.
     * @param {integer} index - The index of the item which should be spliced.
     *
     * @return {*} The item which was spliced (removed).
     */
    var SpliceOne = function (array, index)
    {
        if (index >= array.length)
        {
            return;
        }

        var len = array.length - 1;

        var item = array[index];

        for (var i = index; i < len; i++)
        {
            array[i] = array[i + 1];
        }

        array.length = len;

        return item;
    };

    /**
     * @author       Richard Davey <rich@photonstorm.com>
     * @copyright    2019 Photon Storm Ltd.
     * @license      {@link https://opensource.org/licenses/MIT|MIT License}
     */


    /**
     * Removes the given item, or array of items, from the array.
     * 
     * The array is modified in-place.
     * 
     * You can optionally specify a callback to be invoked for each item successfully removed from the array.
     *
     * @function Phaser.Utils.Array.Remove
     * @since 3.4.0
     *
     * @param {array} array - The array to be modified.
     * @param {*|Array.<*>} item - The item, or array of items, to be removed from the array.
     * @param {function} [callback] - A callback to be invoked for each item successfully removed from the array.
     * @param {object} [context] - The context in which the callback is invoked.
     *
     * @return {*|Array.<*>} The item, or array of items, that were successfully removed from the array.
     */
    var Remove = function (array, item, callback, context)
    {
        if (context === undefined) { context = array; }

        var index;

        //  Fast path to avoid array mutation and iteration
        if (!Array.isArray(item))
        {
            index = array.indexOf(item);

            if (index !== -1)
            {
                SpliceOne(array, index);

                if (callback)
                {
                    callback.call(context, item);
                }

                return item;
            }
            else
            {
                return null;
            }
        }

        //  If we got this far, we have an array of items to remove

        var itemLength = item.length - 1;

        while (itemLength >= 0)
        {
            var entry = item[itemLength];

            index = array.indexOf(entry);

            if (index !== -1)
            {
                SpliceOne(array, index);

                if (callback)
                {
                    callback.call(context, entry);
                }
            }
            else
            {
                //  Item wasn't found in the array, so remove it from our return results
                item.pop();
            }

            itemLength--;
        }

        return item;
    };

    var StencilGameObjectMethods = {
        addStencilGameObject(gameObject) {
            AddItem(this.stencilGameObjects, gameObject);
            return this;
        },

        removeStencilGameObject(gameObject) {
            Remove(this.stencilGameObjects, gameObject);
            return this;
        },

        clearStencilGameObjects() {
            this.stencilGameObjects.length = 0;
            return this;
        },

        setStencilInvert(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.stencilInvert = enable;
            return this;
        },
    };

    CheckP3Version();
    const Layer = phaser.GameObjects.Layer;


    class StencilLayer extends Layer {
        constructor(scene, children) {
            super(scene, children);
            this.type = 'rexStencilLayer';

            this.stencilGameObjects = [];
            this.setStencilInvert();
        }

    }

    var Methods = {
        renderWebGL: WebGLRenderer
    };

    Object.assign(
        StencilLayer.prototype,
        Methods,
        StencilGameObjectMethods
    );

    function Factory (children) {
        var gameObject = new StencilLayer(this.scene, children);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var children = GetAdvancedValue(config, 'children');

        var gameObject = new StencilLayer(this.scene, children);
        BuildGameObject(this.scene, gameObject, config);
        return gameObject;
    }

    var IsNil = function (value) {
        return value === null || value === undefined;
    };

    var IsObjectLike = function (value) {
        return value !== null && typeof value === 'object';
    };

    var NormalizePath = function (path, delimiter) {
        if (Array.isArray(path)) ; else if (typeof path !== 'string') {
            path = [];
        } else if (path.trim() === '') {
            path = [];
        } else {
            path = path.split(delimiter).filter(Boolean);
        }
        return path;
    };

    /**
     * Set a nested value into target by path (mutates target).
     *
     * - If keys is a string and does NOT contain delimiter, write directly.
     * - Intermediate non-plain-object values are always overwritten with {}.
     *
     * @param {object} target
     * @param {string|string[]} keys
     * @param {*} value
     * @param {string} [delimiter='.']
     * @returns {object} the same target reference
     */
    var SetValue = function (target, keys, value, delimiter = '.') {
        if (!IsObjectLike(target)) {
            return target;
        }

        // Invalid key: no-op; don't replace root
        if (IsNil(keys) || keys === '' || (Array.isArray(keys) && keys.length === 0)) {
            return target;
        }

        // Fast path: single key
        if (
            (typeof keys === 'string' && keys.indexOf(delimiter) === -1) ||
            (typeof keys === 'number')
        ) {
            target[keys] = value;
            return target;
        }

        var pathSegments = NormalizePath(keys, delimiter);
        if (pathSegments.length === 0) {
            return target;
        }

        var cursor = target;
        var pathSegmentsCount = pathSegments.length;

        for (var index = 0; index < pathSegmentsCount - 1; index++) {
            var segment = pathSegments[index];
            var next = cursor[segment];

            if (!IsObjectLike(next)) {
                // Force overwrite intermediates
                cursor[segment] = {};
            }

            cursor = cursor[segment];
        }

        cursor[pathSegments[pathSegmentsCount - 1]] = value;
        return target;
    };

    class StencilLayerPlugin extends phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexStencilLayer', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.StencilLayer', StencilLayer);

    return StencilLayerPlugin;

}));
