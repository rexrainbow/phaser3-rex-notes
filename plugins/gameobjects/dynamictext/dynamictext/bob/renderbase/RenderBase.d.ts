// import * as Phaser from 'phaser';
import Base from '../Base';

export default RenderBase;

declare namespace RenderBase {
    /**
     * Callback used for drawing a bob.
     */
    type DrawCallbackType = (
        bob: RenderBase
    ) => void;
}

/**
 * Base renderable bob with transform and layout helpers.
 */
declare class RenderBase extends Base {
    /**
     * True if renderable.
     */
    renderable: boolean;
    /**
     * True if removed from layout.
     */
    removed: boolean;
    /**
     * True to use local positions.
     */
    toLocalPosition: boolean;

    /**
     * Set visibility.
     * @param visible - True to show.
     * @returns This instance.
     */
    setVisible(visible?: boolean): this;
    /**
     * Visibility flag.
     */
    visible: boolean;

    /**
     * Set alpha value.
     * @param alpha - Alpha value.
     * @returns This instance.
     */
    setAlpha(alpha: number): this;
    /**
     * Alpha value.
     */
    alpha: number;

    /**
     * Set position.
     * @param x - X position.
     * @param y - Y position.
     * @returns This instance.
     */
    setPosition(x: number, y: number): this;
    /**
     * Set x position.
     * @param x - X position.
     * @returns This instance.
     */
    setX(x: number): this;
    /**
     * Set y position.
     * @param y - Y position.
     * @returns This instance.
     */
    setY(y: number): this;
    /**
     * X position.
     */
    x: number;
    /**
     * Y position.
     */
    y: number;

    /**
     * Set scroll factor X.
     * @param x - Scroll factor x.
     * @returns This instance.
     */
    setScrollFactorX(x: number): this;
    /**
     * Set scroll factor Y.
     * @param y - Scroll factor y.
     * @returns This instance.
     */
    setScrollFactorY(y: number): this;
    /**
     * Set scroll factors.
     * @param x - Scroll factor x.
     * @param y - Scroll factor y.
     * @returns This instance.
     */
    setScrollFactor(x: number, y?: number): this;
    /**
     * Scroll factor X.
     */
    scrollFactorX: number;
    /**
     * Scroll factor Y.
     */
    scrollFactorY: number;

    /**
     * Set angle in degrees.
     * @param degrees - Angle in degrees.
     * @returns This instance.
     */
    setAngle(degrees: number): this;
    /**
     * Set rotation in radians.
     * @param radians - Rotation in radians.
     * @returns This instance.
     */
    setRotation(radians: number): this;
    /**
     * Angle in degrees.
     */
    angle: number;
    /**
     * Rotation in radians.
     */
    rotation: number;

    /**
     * Set scale.
     * @param scaleX - Scale x.
     * @param scaleY - Scale y.
     * @returns This instance.
     */
    setScale(scaleX: number, scaleY?: number): this;
    /**
     * Set scale x.
     * @param scaleX - Scale x.
     * @returns This instance.
     */
    setScaleX(scaleX: number): this;
    /**
     * Set scale y.
     * @param scaleY - Scale y.
     * @returns This instance.
     */
    setScaleY(scaleY: number): this;
    /**
     * Scale x.
     */
    scaleX: number;
    /**
     * Scale y.
     */
    scaleY: number;

    /**
     * Set width.
     * @param width - Width value.
     * @param keepAspectRatio - True to keep aspect ratio.
     * @returns This instance.
     */
    setWidth(width: number, keepAspectRatio?: boolean): this;
    /**
     * Width value.
     */
    width: number;
    /**
     * Set left spacing.
     * @param value - Left spacing value.
     * @returns This instance.
     */
    setLeftSpace(value: number): this;
    /**
     * Left spacing value.
     */
    leftSpace: number;
    /**
     * Set right spacing.
     * @param value - Right spacing value.
     * @returns This instance.
     */
    setRightSpace(value: number): this;
    /**
     * Right spacing value.
     */
    rightSpace: number;
    /**
     * Outer width value.
     */
    readonly outerWidth: number;

    /**
     * Set height.
     * @param height - Height value.
     * @param keepAspectRatio - True to keep aspect ratio.
     * @returns This instance.
     */
    setHeight(height: number, keepAspectRatio?: boolean): this;
    /**
     * Height value.
     */
    height: number;

    /**
     * Set origin x.
     * @param x - Origin x.
     * @returns This instance.
     */
    setOrigin(x: number): this;
    /**
     * Origin x.
     */
    originX: number;
    /**
     * Offset x.
     */
    offsetX: number;
    /**
     * Offset y.
     */
    offsetY: number;

    /**
     * True if this bob will render.
     */
    readonly willRender: boolean;

    /**
     * Set draw-below callback.
     * @param callback - Draw callback.
     * @returns This instance.
     */
    setDrawBelowCallback(
        callback?: RenderBase.DrawCallbackType
    ): this;

    /**
     * Set draw-above callback.
     * @param callback - Draw callback.
     * @returns This instance.
     */
    setDrawAboveCallback(
        callback?: RenderBase.DrawCallbackType
    ): this;

    /**
     * Draw top-left x.
     */
    readonly drawTLX: number;
    /**
     * Draw top-left y.
     */
    readonly drawTLY: number;
    /**
     * Draw bottom-left x.
     */
    readonly drawBLX: number;
    /**
     * Draw bottom-left y.
     */
    readonly drawBLY: number;
    /**
     * Draw top-right x.
     */
    readonly drawTRX: number;
    /**
     * Draw top-right y.
     */
    readonly drawTRY: number;
    /**
     * Draw bottom-right x.
     */
    readonly drawBRX: number;
    /**
     * Draw bottom-right y.
     */
    readonly drawBRY: number;
}
