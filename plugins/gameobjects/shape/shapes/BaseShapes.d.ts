// import * as Phaser from 'phaser';
import BaseGeom from './geoms/base/BaseGeom';

/**
 * Base shape container for custom shapes.
 */
export default class BaseShapes extends Phaser.GameObjects.Shape {
    /**
     * Create a shape container.
     * @param scene - The Scene to which this object belongs.
     * @param x - The x position.
     * @param y - The y position.
     * @param width - The width.
     * @param height - The height.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number
    );

    /**
     * Set size.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    setSize(width: number, height: number): this;
    /**
     * Resize the shapes.
     * @param width - Width value.
     * @param height - Height value.
     * @returns This instance.
     */
    resize(width: number, height: number): this;
    /**
     * Width value.
     */
    width: number;
    /**
     * Height value.
     */
    height: number;
    /**
     * True if size changed.
     */
    isSizeChanged: boolean;

    /**
     * Set fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    setFillStyle(color: number, alpha: number): this;
    /**
     * Fill color.
     */
    fillColor: number;
    /**
     * Fill alpha.
     */
    fillAlpha: number;
    /**
     * Set stroke style.
     * @param lineWidth - Line width.
     * @param color - Stroke color.
     * @param alpha - Stroke alpha.
     * @returns This instance.
     */
    setStrokeStyle(lineWidth: number, color: number, alpha: number): this;
    /**
     * Line width.
     */
    lineWidth: number;
    /**
     * Stroke color.
     */
    strokeColor: number;
    /**
     * Stroke alpha.
     */
    strokeAlpha: number;

    /**
     * Set dirty flag.
     * @param dirty - True to mark dirty.
     * @returns This instance.
     */
    setDirty(dirty?: boolean): this;
    /**
     * Dirty flag.
     */
    dirty: boolean;

    /**
     * Update shapes.
     * @returns This instance.
     */
    updateShapes(): this;

    /**
     * Get a shape by name.
     * @param name - Shape name.
     * @returns Shape instance.
     */
    getShape(name: string): BaseGeom;
    /**
     * Get all shapes.
     * @returns Shapes array.
     */
    getShapes(): BaseGeom[];
    /**
     * Add a shape.
     * @param shape - Shape instance.
     * @returns This instance.
     */
    addShape(shape: BaseGeom): this;
    /**
     * Delete a shape by name.
     * @param name - Shape name.
     * @returns This instance.
     */
    deleteShape(name: string): this;
    /**
     * Clear all shapes.
     * @returns This instance.
     */
    clear(): this;
}
