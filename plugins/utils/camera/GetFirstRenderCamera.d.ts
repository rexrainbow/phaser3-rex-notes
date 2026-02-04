/**
 * Get the first camera that renders a game object.
 *
 * @param gameObject - Target game object.
 * @returns The first render camera.
 */
declare function GetFirstRenderCamera(
    gameObject: Phaser.GameObjects.GameObject
): Phaser.Cameras.Scene2D.Camera;

export default GetFirstRenderCamera;
