export default GetBoundsConfig;

declare namespace GetBoundsConfig {
    /**
     * Bounds object with optional edges.
     */
    type BoundsType = {
        /**
         * Left bound.
         */
        left?: number,
        /**
         * Right bound.
         */
        right?: number,
        /**
         * Top bound.
         */
        top?: number,
        /**
         * Bottom bound.
         */
        bottom?: number
    }
    /**
     * Padding config as uniform value or per-edge bounds.
     */
    type PaddingConfigType = number | BoundsType;
}

/**
 * Normalize padding config into a bounds object.
 *
 * @param config - Padding config value.
 * @param out - Output bounds object.
 * @returns Normalized bounds object.
 */
declare function GetBoundsConfig(
    config: GetBoundsConfig.PaddingConfigType,
    out?: GetBoundsConfig.BoundsType
): GetBoundsConfig.BoundsType;
