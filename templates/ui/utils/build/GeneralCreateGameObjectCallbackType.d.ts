/**
 * Callback used to create a game object.
 * @param scene - The Scene to which this object belongs.
 * @param config - Optional creation configuration.
 * @returns The created game object.
 */
export type GeneralCreateGameObjectCallbackType = (
    scene: Phaser.Scene,
    config?: Object
) => Phaser.GameObjects.GameObject;
