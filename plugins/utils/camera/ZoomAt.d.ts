/**
 * Zoom a camera around a local focus point.
 *
 * @param camera - Target camera.
 * @param zoom - Zoom value.
 * @param focusLocalX - Local focus x.
 * @param focusLocalY - Local focus y.
 */
declare function ZoomAt(
    camera: Phaser.Cameras.Scene2D.Camera,
    zoom: number,
    focusLocalX?: number,
    focusLocalY?: number
): void

export default ZoomAt;
