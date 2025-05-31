export default AddBlockyProperties;

declare namespace AddBlockyProperties {
    interface Blocky {
        blockySize: number | null | false;
        blockyOffsetX: number;
        blockyOffsetY: number;
    }

    interface BlockyGameObject extends Blocky, Phaser.GameObjects.GameObject {
    }

    interface BlockyCamera extends Blocky, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddBlockyProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBlockyProperties.BlockyGameObject;

declare function AddBlockyProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddBlockyProperties.BlockyCamera;