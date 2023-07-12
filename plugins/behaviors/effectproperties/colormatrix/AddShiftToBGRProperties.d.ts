export default AddShiftToBGRProperties;

declare namespace AddShiftToBGRProperties {
    interface ShiftToBGRGameObject extends Phaser.GameObjects.GameObject {
        shiftToBGR: null | boolean;
    }
}

declare function AddShiftToBGRProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddShiftToBGRProperties.ShiftToBGRGameObject;
