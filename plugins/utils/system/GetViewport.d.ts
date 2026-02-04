// import * as Phaser from 'phaser';

/**
 * Get viewport rectangle of a specific camera.
 *
 * @param scene - Scene instance.
 * @param camera - Target camera.
 * @param out - Output rectangle or true to use an internal object.
 * @returns Viewport rectangle.
 */
export default function GetViewport(
    scene: Phaser.Scene,
    camera: Phaser.Cameras.Scene2D.BaseCamera,
    out?: Phaser.Geom.Rectangle | true
): Phaser.Geom.Rectangle;

/**
 * Get viewport rectangle of the default camera.
 *
 * @param scene - Scene instance.
 * @param out - Output rectangle or true to use an internal object.
 * @returns Viewport rectangle.
 */
export default function GetViewport(
    scene: Phaser.Scene,
    out?: Phaser.Geom.Rectangle | true
): Phaser.Geom.Rectangle;
