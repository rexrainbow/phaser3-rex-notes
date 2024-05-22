export default ForEachGameObjectInDisplayList;

type ParentType = Phaser.Scene | Phaser.GameObjects.Layer | Phaser.GameObjects.Container;
type TypeNameFilterType = string[] | null | undefined;
type CallbackType = (GameObject: Phaser.GameObjects.GameObject) => void;

declare function ForEachGameObjectInDisplayList(
    parent: ParentType,
    typeNameFilter: TypeNameFilterType,
    callback: CallbackType,
    scope?: Object
): void;

declare function ForEachGameObjectInDisplayList(
    parent: ParentType,
    callback: CallbackType,
    scope?: Object
): void;