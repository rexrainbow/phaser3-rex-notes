import * as Phaser from 'phaser';
import BaseSizer from '../basesizer/BaseSizer';

export type GetParentSizer = (
    gameObject: Phaser.GameObjects.GameObject
) => BaseSizer;

export type GetTopmostSizer = (
    gameObject: Phaser.GameObjects.GameObject
) => BaseSizer;