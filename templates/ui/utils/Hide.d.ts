import * as Phaser from 'phaser';

export type Show = (
    gameObject: Phaser.GameObjects.GameObject
) => void;
export type Hide = (
    gameObject: Phaser.GameObjects.GameObject
) => void;

export type IsShown = (
    gameObject: Phaser.GameObjects.GameObject
) => boolean;
