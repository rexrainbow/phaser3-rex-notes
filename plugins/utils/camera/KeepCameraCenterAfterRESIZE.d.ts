/**
 * Keep camera centers after scene resize.
 *
 * @param scene - Scene instance.
 * @param cameras - Camera list to adjust.
 */
declare function KeepCameraCenterAfterRESIZE(
    scene: Phaser.Scene,
    cameras?: Phaser.Cameras.Scene2D.Camera[]
): void;

export default KeepCameraCenterAfterRESIZE;
