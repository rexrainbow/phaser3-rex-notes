import DataMethods from '../../../../../utils/data/DataMethods.js';

/**
 * Base geometry for custom shapes.
 */
export default class BaseGeom extends DataMethods {
    /**
     * Geometry name.
     */
    name: string;
    /**
     * Dirty flag.
     */
    dirty: boolean;
    /**
     * Visibility flag.
     */
    visible: boolean;
    /**
     * Custom data storage.
     */
    data: Record<string, unknown> | undefined;

    /**
     * True if filled.
     */
    isFilled: boolean;
    /**
     * Fill color.
     */
    fillColor: number;
    /**
     * Fill alpha.
     */
    fillAlpha: number;

    /**
     * True if stroked.
     */
    isStroked: boolean;
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
     * Set geometry name.
     * @param name - Geometry name.
     * @returns This instance.
     */
    setName(name: string): this;

    /**
     * Set visibility.
     * @param visible - True to show.
     * @returns This instance.
     */
    setVisible(visible?: boolean): this;

    /**
     * Set fill style.
     * @param color - Fill color.
     * @param alpha - Fill alpha.
     * @returns This instance.
     */
    fillStyle(
        color?: number,
        alpha?: number
    ): this;

    /**
     * Set line style.
     * @param lineWidth - Line width.
     * @param color - Stroke color.
     * @param alpha - Stroke alpha.
     * @returns This instance.
     */
    lineStyle(
        lineWidth?: number,
        color?: number,
        alpha?: number
    ): this;
}
