export default VPXYToXY;

/**
 * Convert viewport percentage coordinates to world coordinates with offsets.
 *
 * @param vpx - Viewport x percentage (0..1).
 * @param vpy - Viewport y percentage (0..1).
 * @param vpxOffset - Extra x offset in pixels.
 * @param vpyOffset - Extra y offset in pixels.
 * @param viewport - Target viewport rectangle.
 * @param out - Optional output vector to write results into.
 * @returns The converted world position.
 */
declare function VPXYToXY(
    vpx: number,
    vpy: number,
    vpxOffset: number,
    vpyOffset: number,
    viewport: Phaser.Geom.Rectangle,
    out?: Phaser.Math.Vector2,
): Phaser.Math.Vector2;

/**
 * Convert viewport percentage coordinates to world coordinates.
 *
 * @param vpx - Viewport x percentage (0..1).
 * @param vpy - Viewport y percentage (0..1).
 * @param viewport - Target viewport rectangle.
 * @param out - Optional output vector to write results into.
 * @returns The converted world position.
 */
declare function VPXYToXY(
    vpx: number,
    vpy: number,
    viewport: Phaser.Geom.Rectangle,
    out?: Phaser.Math.Vector2,
): Phaser.Math.Vector2;
