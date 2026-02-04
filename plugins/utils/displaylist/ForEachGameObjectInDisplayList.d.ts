export default ForEachGameObjectInDisplayList;

/**
 * Parent object that owns a display list.
 */
type ParentType = Phaser.Scene | Phaser.GameObjects.Layer | Phaser.GameObjects.Container;
/**
 * Optional type-name filter list.
 */
type TypeNameFilterType = string[] | null | undefined;
/**
 * Callback invoked for each game object.
 *
 * @param GameObject - Current game object.
 */
type CallbackType = (GameObject: Phaser.GameObjects.GameObject) => void;

/**
 * Iterate all game objects in a display list with optional type filter.
 *
 * @param parent - Display list parent.
 * @param typeNameFilter - Type-name filter list.
 * @param callback - Callback invoked for each game object.
 * @param scope - Callback scope.
 */
declare function ForEachGameObjectInDisplayList(
    parent: ParentType,
    typeNameFilter: TypeNameFilterType,
    callback: CallbackType,
    scope?: Object
): void;

/**
 * Iterate all game objects in a display list.
 *
 * @param parent - Display list parent.
 * @param callback - Callback invoked for each game object.
 * @param scope - Callback scope.
 */
declare function ForEachGameObjectInDisplayList(
    parent: ParentType,
    callback: CallbackType,
    scope?: Object
): void;
