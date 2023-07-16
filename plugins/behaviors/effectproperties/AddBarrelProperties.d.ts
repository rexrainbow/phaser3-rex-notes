export default AddBarrelProperties;

declare namespace AddBarrelProperties {
    interface Barrel {
        barrel: number | null | false;
    }

    interface BarrelGameObject extends Barrel, Phaser.GameObjects.GameObject {
    }

    interface BarrelCamera extends Barrel, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBarrelProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBarrelProperties.BarrelGameObject;

declare function AddBarrelProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddBarrelProperties.BarrelCamera;