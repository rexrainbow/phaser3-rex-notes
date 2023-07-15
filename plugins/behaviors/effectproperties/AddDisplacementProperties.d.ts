export default AddDisplacementProperties;

declare namespace AddDisplacementProperties {
    interface DisplacementGameObject extends Phaser.GameObjects.GameObject {
        displacementKey: string | null | false;
        displacementX: number;
        displacementY: number;

    }
}

declare function AddDisplacementProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddDisplacementProperties.DisplacementGameObject;
