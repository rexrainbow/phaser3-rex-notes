export default AddDisplacementProperties;

declare namespace AddDisplacementProperties {
    interface Displacement {
        displacementKey: string | null | false;
        displacementX: number;
        displacementY: number;
    }

    interface DisplacementGameObject extends Displacement, Phaser.GameObjects.GameObject {
    }

    interface DisplacementCamera extends Displacement, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddDisplacementProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddDisplacementProperties.DisplacementGameObject;

declare function AddDisplacementProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddDisplacementProperties.DisplacementCamera;