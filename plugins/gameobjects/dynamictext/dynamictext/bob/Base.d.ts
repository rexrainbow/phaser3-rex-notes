// import * as Phaser from 'phaser';

export default class Base {
    readonly type: string;

    setVisible(visible?: boolean): this;
    visible: boolean;

    setAlpha(alpha: number): this;
    alpha: number;

    setPosition(x: number, y: number): this;
    setX(x: number): this;
    setY(y: number): this;
    x: number;
    y: number;

    setAngle(degrees: number): this;
    setRotation(radians: number): this;
    angle: number;
    rotation: number;

    setScale(scaleX: number, scaleY?: number): this;
    setScaleX(scaleX: number): this;
    setScaleY(scaleY: number): this;
    scaleX: number;
    scaleY: number;

    setActive(active?: boolean): this;
    active: boolean;

    setWidth(width: number, keepAspectRatio?: boolean): this;
    width: number;
    setLeftSpace(value: number): this;
    leftSpace: number;
    setRightSpace(value: number): this;
    rightSpace: number;
    readonly outerWidth: number;

    setHeight(height: number, keepAspectRatio?: boolean): this;
    height: number;

    setOrigin(x: number): this;
    originX: number;
    offsetX: number;
    offsetY: number;

    setDirty(dirty?: boolean): this;

    scene: Phaser.Scene;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
}