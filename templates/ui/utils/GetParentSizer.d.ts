// import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer';

/**
 * Get the nearest parent sizer of a game object.
 *
 * @param gameObject - The game object to start searching from.
 * @param name - Optional parent sizer name to match.
 * @returns The matched parent sizer.
 */
export function GetParentSizer(
    gameObject: Phaser.GameObjects.GameObject,
    name?: string
): BaseSizer;

/**
 * Get the topmost sizer in the parent chain of a game object.
 *
 * @param gameObject - The game object to start searching from.
 * @returns The topmost parent sizer.
 */
export function GetTopmostSizer(
    gameObject: Phaser.GameObjects.GameObject
): BaseSizer;
