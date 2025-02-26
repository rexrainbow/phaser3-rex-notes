export default Live2dGameObjectBase;

declare namespace Live2dGameObjectBase {

}

declare class Live2dGameObjectBase extends Phaser.GameObjects.Extern {

    clearAlpha(): this;
    setAlpha(value?: number): this;
    alpha: number;

    width: number;
    height: number;
    displayWidth: number;
    displayHeight: number;
    setSize(width: number, height: number): this;
    setDisplaySize(width: number, height: number): this;

    getCenter<O extends Phaser.Math.Vector2>(output?: O): O;
    getTopLeft<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getTopCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getTopRight<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getLeftCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getRightCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBottomLeft<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBottomCenter<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBottomRight<O extends Phaser.Math.Vector2>(output?: O, includeParent?: boolean): O;
    getBounds<O extends Phaser.Geom.Rectangle>(output?: O): O;

}