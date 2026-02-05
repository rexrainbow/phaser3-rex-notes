// import * as Phaser from 'phaser';

/**
 * Show a game object.
 *
 * @param gameObject - The game object to show.
 * @returns Nothing.
 */
export function Show(
    gameObject: Phaser.GameObjects.GameObject
): void;

/**
 * Hide a game object.
 *
 * @param gameObject - The game object to hide.
 * @returns Nothing.
 */
export function Hide(
    gameObject: Phaser.GameObjects.GameObject
): void;

/**
 * Check whether a game object is currently shown.
 *
 * @param gameObject - The game object to check.
 * @returns True if the game object is shown.
 */
export function IsShown(
    gameObject: Phaser.GameObjects.GameObject
): boolean;
