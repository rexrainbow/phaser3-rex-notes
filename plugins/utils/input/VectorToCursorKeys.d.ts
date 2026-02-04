import CursorKeys from './CursorKeys';

/**
 * Vector-to-cursor-key conversion helpers.
 */
declare namespace VectorToCursorKeys {
    /**
     * Direction mode values.
     */
    type DirTypes = 0 | 1 | 2 | 3 | 'up&down' | 'left&right' | '4dir' | '8dir';


    /**
     * Configuration options for creating VectorToCursorKeys.
     */
    interface IConfig {
        /**
         * Enable conversion.
         */
        enable?: boolean,
        /**
         * Direction mode.
         */
        dir?: DirTypes,
        /**
         * Minimum force threshold.
         */
        forceMin?: number,
    }
}
/**
 * Convert vector input into cursor key states.
 */
declare class VectorToCursorKeys extends CursorKeys {
    /**
     * Create a VectorToCursorKeys instance.
     *
     * @param scene - Scene instance.
     * @param config - Configuration options.
     */
    constructor(
        scene: any,
        config?: VectorToCursorKeys.IConfig
    )

    /**
     * Set direction mode.
     *
     * @param mode - Direction mode.
     * @returns This VectorToCursorKeys instance.
     */
    setMode(mode: VectorToCursorKeys.DirTypes): this;

    /**
     * Enable or disable conversion.
     *
     * @param enable - Enable state.
     * @returns This VectorToCursorKeys instance.
     */
    setEnable(enable?: boolean): this;
    /**
     * Toggle enabled state.
     *
     * @returns This VectorToCursorKeys instance.
     */
    toggleEnable(): this;
    /**
     * Whether conversion is enabled.
     */
    enable: boolean;

    /**
     * Set distance threshold.
     *
     * @param distance - Minimum distance.
     * @returns This VectorToCursorKeys instance.
     */
    setDistanceThreshold(distance?: number): this;

    /**
     * Set start and end vector points.
     *
     * @param x0 - Start x.
     * @param y0 - Start y.
     * @param x1 - End x.
     * @param y1 - End y.
     * @returns This VectorToCursorKeys instance.
     */
    setVector(
        x0: number,
        y0: number,
        x1: number,
        y1: number
    ): this;
    /**
     * Clear vector and key states.
     *
     * @returns This VectorToCursorKeys instance.
     */
    clearVector(): this;

    /**
     * Horizontal force value.
     */
    readonly forceX: number;
    /**
     * Vertical force value.
     */
    readonly forceY: number;
    /**
     * Total force magnitude.
     */
    readonly force: number;
    /**
     * Rotation in radians.
     */
    readonly rotation: number;
    /**
     * Angle in degrees.
     */
    readonly angle: number;
    /**
     * Octant index.
     */
    readonly octant: number;
}

export default VectorToCursorKeys;
