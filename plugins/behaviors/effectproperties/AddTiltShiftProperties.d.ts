export default AddTiltShiftProperties;

declare namespace AddTiltShiftProperties {
    interface TiltShiftGameObject extends Phaser.GameObjects.GameObject {
        tiltShiftRadius: number | null | false;
        tiltShiftAmount: number;
        tiltShiftContrast: number;
        tiltShiftBlurX: number;
        tiltShiftBlurY: number;
        tiltShiftStrength: number;
    }
}

declare function AddTiltShiftProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddTiltShiftProperties.TiltShiftGameObject;
