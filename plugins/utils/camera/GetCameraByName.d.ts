/**
 * Get a camera by name or return the provided camera.
 *
 * @param scene - Scene instance.
 * @param name - Camera name, index, or camera instance.
 * @returns The resolved camera.
 */
declare function GetCameraByName(
    scene: Phaser.Scene,
    name?: string | number | Phaser.Cameras.Scene2D.Camera
): Phaser.Cameras.Scene2D.Camera;

export default GetCameraByName;
