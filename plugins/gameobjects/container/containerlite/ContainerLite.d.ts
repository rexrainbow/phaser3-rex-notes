// import * as Phaser from 'phaser';
import Base from './Base';

export default ContainerLite;

declare namespace ContainerLite {
/**
 * Snapshot of a child's local state inside this container.
 * @remarks Used to preserve and restore per-child local values.
 */
interface ILocalState {
    /**
     * Owning container.
     */
        parent: ContainerLite,
        /**
         * Child game object.
         */
        self: Phaser.GameObjects.GameObject,
        /**
         * Optional layer host.
         */
        layer: Phaser.GameObjects.Layer | null,

        /**
         * Local position x.
         */
        x: number,
        /**
         * Local position y.
         */
        y: number,
        /**
         * Local rotation in radians.
         */
        rotation: number,
        /**
         * Local rotation in degrees.
         */
        angle: number,
        /**
         * Local scale x.
         */
        scaleX: number,
        /**
         * Local scale y.
         */
        scaleY: number,
        /**
         * Local display width.
         */
        displayWidth: number,
        /**
         * Local display height.
         */
        displayHeight: number,
        /**
         * Local alpha.
         */
        alpha: number,
        /**
         * Local visibility flag.
         */
        visible: boolean,
        /**
         * Local active flag.
         */
        active: boolean,
    }

/**
 * Sync flags used when adding or pinning children.
 * @remarks Control which properties are synced to the container.
 */
interface IAddChildConfig {
        /**
         * Sync local position to world position.
         */
        syncPosition?: boolean,
        /**
         * Sync local rotation to world rotation.
         */
        syncRotation?: boolean,
        /**
         * Sync local scale to world scale.
         */
        syncScale?: boolean,
        /**
         * Sync local alpha to world alpha.
         */
        syncAlpha?: boolean,
        /**
         * Sync scroll factors.
         */
        syncScrollFactor?: boolean,
        /**
         * Sync camera filter settings.
         */
        syncCameraFilter?: boolean,
        /**
         * Sync display list membership.
         */
        syncDisplayList?: boolean,

    }

/**
 * Options for drawBounds().
 * @remarks Configure how bounds are rendered.
 */
interface IDrawBoundsConfig {
        /**
         * Draw container bounds.
         */
        drawContainer?: boolean,
        /**
         * Draw a specific child bounds.
         */
        children?: Phaser.GameObjects.GameObject,
        /**
         * Line color.
         */
        color?: number,
        /**
         * Line width.
         */
        lineWidth?: number,
        /**
         * Extra padding around bounds.
         */
        padding?: number,
    }
}

/**
 * Lightweight container implementation with local state syncing helpers.
 * @remarks Provides child management without Phaser.Container overhead.
 */
declare class ContainerLite extends Base {
    /**
     * Type flag for rex container lite.
     */
    isRexContainerLite: true;

    /**
     * Create a container with optional size and children.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the container.
     * @param y - The y position of the container.
     * @param width - The width of the container.
     * @param height - The height of the container.
     * @param children - Initial children to add.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        children?: Phaser.GameObjects.GameObject[]
    );

    /**
     * Create a container at a position with optional children.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position of the container.
     * @param y - The y position of the container.
     * @param children - Initial children to add.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        children?: Phaser.GameObjects.GameObject[]
    );

    /**
     * Add one or more children.
     * @param gameObject - A child or array of children to add.
     * @returns This instance.
     */
    add(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Pin one or more children and optionally sync their state.
     * @param gameObject - A child or array of children to pin.
     * @param config - Sync options or a boolean to enable/disable syncing.
     * @returns This instance.
     */
    pin(
        gameObject: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
        config?: ContainerLite.IAddChildConfig | boolean
    ): this;

    /**
     * Unpin a child, optionally destroying it.
     * @param gameObject - The child to unpin.
     * @param destroyChild - True to destroy the child.
     * @returns This instance.
     */
    unpin(
        gameObject: Phaser.GameObjects.GameObject,
        destroyChild?: boolean
    ): this;

    /**
     * Add multiple children.
     * @param children - Children to add.
     * @returns This instance.
     */
    addMultiple(
        children: Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Add one or more children without syncing to world values.
     * @param child - A child or array of children to add.
     * @returns This instance.
     */
    addLocal(
        child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Pin one or more children using local values.
     * @param child - A child or array of children to pin.
     * @param config - Sync options or a boolean to enable/disable syncing.
     * @returns This instance.
     */
    pinLocal(
        child: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
        config?: ContainerLite.IAddChildConfig | boolean
    ): this;

    /**
     * Add multiple children using local values.
     * @param children - Children to add.
     * @returns This instance.
     */
    addLocalMultiple(
        children: Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Set child position in world space.
     * @param child - The child to update.
     * @param x - World x.
     * @param y - World y.
     * @returns This instance.
     */
    setChildPosition(
        child: Phaser.GameObjects.GameObject,
        x: number,
        y: number
    ): this;

    /**
     * Set child position in local space.
     * @param child - The child to update.
     * @param x - Local x.
     * @param y - Local y.
     * @returns This instance.
     */
    setChildLocalPosition(
        child: Phaser.GameObjects.GameObject,
        x: number,
        y: number
    ): this;

    /**
     * Get child local x.
     * @param child - The child to query.
     * @returns Local x.
     */
    getChildLocalX(
        child: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Get child local y.
     * @param child - The child to query.
     * @returns Local y.
     */
    getChildLocalY(
        child: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Set child rotation in world space.
     * @param child - The child to update.
     * @param rotation - Rotation in radians.
     * @returns This instance.
     */
    setChildRotation(
        child: Phaser.GameObjects.GameObject,
        rotation: number
    ): this;

    /**
     * Set child angle in world space.
     * @param child - The child to update.
     * @param angle - Rotation in degrees.
     * @returns This instance.
     */
    setChildAngle(
        child: Phaser.GameObjects.GameObject,
        angle: number
    ): this;

    /**
     * Set child rotation in local space.
     * @param child - The child to update.
     * @param rotation - Rotation in radians.
     * @returns This instance.
     */
    setChildLocalRotation(
        child: Phaser.GameObjects.GameObject,
        rotation: number
    ): this;

    /**
     * Set child angle in local space.
     * @param child - The child to update.
     * @param angle - Rotation in degrees.
     * @returns This instance.
     */
    setChildLocalAngle(
        child: Phaser.GameObjects.GameObject,
        angle: number
    ): this;

    /**
     * Get child local rotation in radians.
     * @param child - The child to query.
     * @returns Local rotation in radians.
     */
    getChildLocalRotation(
        child: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Set child scale in world space.
     * @param child - The child to update.
     * @param scaleX - World scale x.
     * @param scaleY - World scale y.
     * @returns This instance.
     */
    setChildScale(
        child: Phaser.GameObjects.GameObject,
        scaleX: number,
        scaleY: number
    ): this;

    /**
     * Set child scale in local space.
     * @param child - The child to update.
     * @param scaleX - Local scale x.
     * @param scaleY - Local scale y.
     * @returns This instance.
     */
    setChildLocalScale(
        child: Phaser.GameObjects.GameObject,
        scaleX: number,
        scaleY: number
    ): this;

    /**
     * Get child local scale x.
     * @param child - The child to query.
     * @returns Local scale x.
     */
    getChildLocalScaleX(
        child: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Get child local scale y.
     * @param child - The child to query.
     * @returns Local scale y.
     */
    getChildLocalScaleY(
        child: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Set child display size in world space.
     * @param child - The child to update.
     * @param width - World display width.
     * @param height - World display height.
     * @returns This instance.
     */
    setChildDisplaySize(
        child: Phaser.GameObjects.GameObject,
        width: number,
        height: number
    ): this;

    /**
     * Set child visibility in world space.
     * @param child - The child to update.
     * @param visible - True to show, false to hide.
     * @returns This instance.
     */
    setChildVisible(
        child: Phaser.GameObjects.GameObject,
        visible: boolean
    ): this;

    /**
     * Set child visibility in local space.
     * @param child - The child to update.
     * @param visible - True to show, false to hide.
     * @returns This instance.
     */
    setChildLocalVisible(
        child: Phaser.GameObjects.GameObject,
        visible: boolean): this;

    /**
     * Get child local visibility.
     * @param child - The child to query.
     * @returns Local visibility.
     */
    getChildLocalVisible(
        child: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Set child alpha in world space.
     * @param child - The child to update.
     * @param alpha - Alpha value.
     * @returns This instance.
     */
    setChildAlpha(
        child: Phaser.GameObjects.GameObject,
        alpha: number
    ): this;

    /**
     * Set child alpha in local space.
     * @param child - The child to update.
     * @param alpha - Alpha value.
     * @returns This instance.
     */
    setChildLocalAlpha(
        child: Phaser.GameObjects.GameObject,
        alpha: number
    ): this;

    /**
     * Get child local alpha.
     * @param child - The child to query.
     * @returns Local alpha.
     */
    getChildLocalAlpha(
        child: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Reset all tracked local state for a child.
     * @param child - The child to reset.
     * @returns This instance.
     */
    resetChildState(
        child: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Reset local position state for a child.
     * @param child - The child to reset.
     * @returns This instance.
     */
    resetChildPositionState(
        child: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Reset local rotation state for a child.
     * @param child - The child to reset.
     * @returns This instance.
     */
    resetChildRotationState(
        child: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Reset local scale state for a child.
     * @param child - The child to reset.
     * @returns This instance.
     */
    resetChildScaleState(
        child: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Reset local alpha state for a child.
     * @param child - The child to reset.
     * @returns This instance.
     */
    resetChildAlphaState(
        child: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Reset local visibility state for a child.
     * @param child - The child to reset.
     * @returns This instance.
     */
    resetChildVisibleState(
        child: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Reset local active state for a child.
     * @param child - The child to reset.
     * @returns This instance.
     */
    resetChildActiveState(
        child: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Set child active in world space.
     * @param child - The child to update.
     * @param active - True to mark active.
     * @returns This instance.
     */
    setChildActive(
        child: Phaser.GameObjects.GameObject,
        active: boolean
    ): this;

    /**
     * Set child active in local space.
     * @param child - The child to update.
     * @param active - True to mark active.
     * @returns This instance.
     */
    setChildLocalActive(
        child: Phaser.GameObjects.GameObject,
        active: boolean
    ): this;

    /**
     * Get child local active state.
     * @param child - The child to query.
     * @returns Local active state.
     */
    getChildLocalActive(
        child: Phaser.GameObjects.GameObject
    ): boolean;

    /**
     * Apply a mask to this container.
     * @param mask - The mask to apply.
     * @returns This instance.
     */
    setMask(
        mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask
    ): this;

    /**
     * Clear the current mask.
     * @param destroyMask - True to destroy the mask.
     * @returns This instance.
     */
    clearMask(
        destroyMask?: boolean
    ): this;

    /**
     * Create a tween for all children.
     * @param config - Tween configuration.
     * @returns The created tween.
     */
    tween(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Tweens.Tween;

    /**
     * Create a tween for a specific child.
     * @param config - Tween configuration.
     * @returns The created tween.
     */
    tweenChild(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Tweens.Tween;

    /**
     * Create a tween for the container itself.
     * @param config - Tween configuration.
     * @returns The created tween.
     */
    tweenSelf(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Tweens.Tween;

    /**
     * Create tween config adjusted for child transforms.
     * @param config - Base tween configuration.
     * @returns A tween configuration adapted for child transforms.
     */
    createTweenChildConfig(
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): Phaser.Types.Tweens.TweenBuilderConfig;

    /**
     * Get direct children.
     * @param out - Optional array to store results.
     * @returns The direct children array.
     */
    getChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get all children, including nested ones.
     * @param out - Optional array to store results.
     * @returns All children.
     */
    getAllChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Get all visible children, including nested ones.
     * @param out - Optional array to store results.
     * @returns All visible children.
     */
    getAllVisibleChildren(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.GameObject[];

    /**
     * Breadth-first traversal of children.
     * @param callback - Called per child; return true to continue.
     * @returns This instance.
     */
    bfs(
        callback: (child: Phaser.GameObjects.GameObject) => boolean
    ): this;

    /**
     * Depth-first traversal of children.
     * @param callback - Called per child; return true to continue.
     * @returns This instance.
     */
    dfs(
        callback: (child: Phaser.GameObjects.GameObject) => boolean
    ): this;

    /**
     * Find a child by name.
     * @param name - The name to match.
     * @param recursive - True to search recursively.
     * @returns The first matching child.
     */
    getByName(
        name: string,
        recursive?: boolean
    ): Phaser.GameObjects.GameObject;

    /**
     * Get a random child.
     * @returns A random child.
     */
    getRandom(): Phaser.GameObjects.GameObject;

    /**
     * Get the first child matching a property value.
     * @param property - Property name to match.
     * @param value - Value to match.
     * @param startIndex - Start index for the search.
     * @param endIndex - End index for the search.
     * @returns The first matching child.
     */
    getFirst(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): Phaser.GameObjects.GameObject;

    /**
     * Get all children matching a property value.
     * @param property - Property name to match.
     * @param value - Value to match.
     * @param startIndex - Start index for the search.
     * @param endIndex - End index for the search.
     * @returns The matching children.
     */
    getAll(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): Phaser.GameObjects.GameObject[];

    /**
     * Count children matching a property value.
     * @param property - Property name to match.
     * @param value - Value to match.
     * @param startIndex - Start index for the search.
     * @param endIndex - End index for the search.
     * @returns This instance.
     */
    count(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): this;

    /**
     * Swap two children in the list.
     * @param child1 - First child.
     * @param child2 - Second child.
     * @returns The swap result from the internal list.
     */
    swap(
        child1: Phaser.GameObjects.GameObject,
        child2: Phaser.GameObjects.GameObject
    ): number;

    /**
     * Set a property on all children.
     * @param property - Property name to set.
     * @param value - Value to assign.
     * @param startIndex - Start index for the update.
     * @param endIndex - End index for the update.
     * @returns This instance.
     */
    setAll(
        property: string,
        value?: unknown,
        startIndex?: number,
        endIndex?: number
    ): this;

    /**
     * Set depth for the container or the whole hierarchy.
     * @param value - The depth value.
     * @param containerOnly - True to affect only the container.
     * @returns This instance.
     */
    setDepth(
        value: number,
        containerOnly?: boolean
    ): this;

    /**
     * Swap depth with another container.
     * @param containerB - The other container.
     * @returns This instance.
     */
    swapDepth(
        containerB: ContainerLite
    ): this;

    /**
     * Increment depth.
     * @param inc - The depth increment.
     * @returns This instance.
     */
    incDepth(
        inc: number
    ): this;

    /**
     * Bring this container to the top of the display list.
     * @returns This instance.
     */
    bringToTop(): this;
    /**
     * Alias of bringToTop().
     * @returns This instance.
     */
    bringMeToTop(): this;

    /**
     * Send this container to the back of the display list.
     * @returns This instance.
     */
    sendToBack(): this;
    /**
     * Alias of sendToBack().
     * @returns This instance.
     */
    sendMeToBack(): this;

    /**
     * Move this container depth below a game object.
     * @param gameObject - The target object.
     * @returns This instance.
     */
    moveDepthBelow(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    /**
     * Alias of moveDepthBelow().
     * @param gameObject - The target object.
     * @returns This instance.
     */
    moveMyDepthBelow(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Move this container depth above a game object.
     * @param gameObject - The target object.
     * @returns This instance.
     */
    moveDepthAbove(
        gameObject: Phaser.GameObjects.GameObject
    ): this;
    /**
     * Alias of moveDepthAbove().
     * @param gameObject - The target object.
     * @returns This instance.
     */
    moveMyDepthAbove(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Bring a child to the top within this container.
     * @param gameObject - The child to move.
     * @returns This instance.
     */
    bringChildToTop(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Send a child to the back within this container.
     * @param gameObject - The child to move.
     * @returns This instance.
     */
    sendChildToBack(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Get parent by name.
     * @param name - Optional parent name to match.
     * @returns The matched parent container.
     */
    getParent(
        name?: string
    ): ContainerLite;

    /**
     * Get parent of a game object, optionally filtering by name.
     * @param gameObject - The child object.
     * @param name - Optional parent name to match.
     * @returns The matched parent container.
     */
    getParent(
        gameObject?: Phaser.GameObjects.GameObject,
        name?: string
    ): ContainerLite;

    /**
     * Get the topmost parent for a game object.
     * @param gameObject - The child object.
     * @returns The topmost parent container.
     */
    getTopmostParent(
        gameObject?: Phaser.GameObjects.GameObject
    ): ContainerLite;

    /**
     * Get cached local state for a child.
     * @param child - The child to query.
     * @returns The cached local state.
     */
    getLocalState(
        child: Phaser.GameObjects.GameObject
    ): ContainerLite.ILocalState;

    /**
     * Add this container to a Phaser Container.
     * @param container - The target container.
     * @returns This instance.
     */
    addToContainer(
        container: Phaser.GameObjects.Container
    ): this;

    /**
     * Add this container to a Layer.
     * @param layer - The target layer.
     * @returns This instance.
     */
    addToLayer(
        layer: Phaser.GameObjects.Layer
    ): this;

    /**
     * Remove this container from its parent container.
     * @returns This instance.
     */
    removeFromContainer(): this;

    /**
     * Remove this container from its layer.
     * @param addToScene - True to add the object back to the Scene.
     * @returns This instance.
     */
    removeFromLayer(addToScene?: boolean): this;

    /**
     * Return true if renderer layer is enabled.
     * @returns True if renderer layer is enabled.
     */
    hasLayer(): boolean;

    /**
     * Enable renderer layer
     * @returns This instance.
     */
    enableLayer(): this;

    /**
     * Backward compatible, enable renderer layer and return containerlite itself
     * @returns This instance.
     */
    getLayer(): this;

    /**
     * Snapshot to a render texture.
     * @param config - Snapshot options.
     * @returns The render texture.
     */
    snapshot(
        config?: {
            renderTexture?: Phaser.GameObjects.RenderTexture,
            padding?: number,
        }
    ): Phaser.GameObjects.RenderTexture;

    /**
     * Snapshot and save to a texture key.
     * @param config - Snapshot options.
     * @returns This instance.
     */
    snapshot(
        config?: {
            padding?: number,
            saveTexture: string,
        }
    ): this;

    /**
     * Change origin for this container and its children.
     * @param originX - New origin x.
     * @param originY - New origin y.
     * @returns This instance.
     */
    changeOrigin(
        originX: number,
        originY: number
    ): this;

    /**
     * Draw bounds using a graphics object.
     * @param graphics - The Graphics object to draw to.
     * @param color - Line color.
     * @returns This instance.
     */
    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    /**
     * Draw bounds using a graphics object with options.
     * @param graphics - The Graphics object to draw to.
     * @param config - Draw options.
     * @returns This instance.
     */
    drawBounds(
        graphics: Phaser.GameObjects.Graphics,
        config?: ContainerLite.IDrawBoundsConfig,
    ): this;

}
