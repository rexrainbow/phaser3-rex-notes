export default AddTiltShiftProperties;

declare namespace AddTiltShiftProperties {
    interface TiltShift {
        tiltShiftRadius: number | null | false;
        tiltShiftAmount: number;
        tiltShiftContrast: number;
        tiltShiftBlurX: number;
        tiltShiftBlurY: number;
        tiltShiftStrength: number;
    }

    interface TiltShiftGameObject extends TiltShift, Phaser.GameObjects.GameObject {
    }

    interface TiltShiftCamera extends TiltShift, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddTiltShiftProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddTiltShiftProperties.TiltShiftGameObject;

declare function AddTiltShiftProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddTiltShiftProperties.TiltShiftCamera;