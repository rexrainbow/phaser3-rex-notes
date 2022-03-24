// import * as Phaser from 'phaser';

export default class Base {
    readonly type: string;

    setActive(active?: boolean): this;
    active: boolean;

    setDirty(dirty?: boolean): this;

    scene: Phaser.Scene;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}