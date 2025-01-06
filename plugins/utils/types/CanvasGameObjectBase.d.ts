// import * as Phaser from 'phaser';

export default class CanvasGameObjectBase extends Phaser.GameObjects.GameObject {
    // Components

    clearAlpha(): this;
    setAlpha(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    alpha: number;
    alphaTopLeft: number;
    alphaTopRight: number;
    alphaBottomLeft: number;
    alphaBottomRight: number;

    blendMode: Phaser.BlendModes | string;
    setBlendMode(value: string | Phaser.BlendModes): this;

    width: number;
    height: number;
    displayWidth: number;
    displayHeight: number;
    setSize(width: number, height: number): this;
    setDisplaySize(width: number, height: number): this;
    texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    frame: Phaser.Textures.Frame;
    isCropped: boolean;
    setCrop(x?: number | Phaser.Geom.Rectangle, y?: number, width?: number, height?: number): this;

    depth: number;
    setDepth(value: number): this;
    setToTop(): this;
    setToBack(): this;
    setAbove(gameObject: Phaser.GameObjects.GameObject): this;
    setBelow(gameObject: Phaser.GameObjects.GameObject): this;

    flipX: boolean;
    flipY: boolean;
    toggleFlipX(): this;
    toggleFlipY(): this;
    setFlipX(value: boolean): this;
    setFlipY(value: boolean): this;
    setFlip(x: boolean, y: boolean): this;
    resetFlip(): this;

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

    mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask;
    setMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask): this;
    clearMask(destroyMask?: boolean): this;
    createBitmapMask(renderable?: Phaser.GameObjects.GameObject): Phaser.Display.Masks.BitmapMask;
    createGeometryMask(graphics?: Phaser.GameObjects.Graphics): Phaser.Display.Masks.GeometryMask;

    readonly originX: number;
    readonly originY: number;
    displayOriginX: number;
    displayOriginY: number;
    setOrigin(x?: number, y?: number): this;
    setOriginFromFrame(): this;
    setDisplayOrigin(x?: number, y?: number): this;
    updateDisplayOrigin(): this;

    customRenderNodes: object;
    defaultRenderNodes: object;
    renderNodeData: object;
    initRenderNodes(defaultNodes: Map<string, string>): void;
    setRenderNodeRole(key: string, renderNode: string | Phaser.Renderer.WebGL.RenderNodes.RenderNode | null, renderNodeData?: object, copyData?: boolean): this;
    setRenderNodeData(renderNode: string | Phaser.Renderer.WebGL.RenderNodes.RenderNode, key: string, value: any): this;

    scrollFactorX: number;
    scrollFactorY: number;
    setScrollFactor(x: number, y?: number): this;

    tintTopLeft: number;
    tintTopRight: number;
    tintBottomLeft: number;
    tintBottomRight: number;
    tintFill: boolean;
    clearTint(): this;
    setTint(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    setTintFill(topLeft?: number, topRight?: number, bottomLeft?: number, bottomRight?: number): this;
    tint: number;
    readonly isTinted: boolean;

    readonly hasTransformComponent: boolean;
    x: number;
    y: number;
    z: number;
    w: number;
    scale: number;
    scaleX: number;
    scaleY: number;
    angle: number;
    rotation: number;
    setPosition(x?: number, y?: number, z?: number, w?: number): this;
    copyPosition(source: Phaser.Types.Math.Vector2Like | Phaser.Types.Math.Vector3Like | Phaser.Types.Math.Vector4Like): this;
    setRandomPosition(x?: number, y?: number, width?: number, height?: number): this;
    setRotation(radians?: number): this;
    setAngle(degrees?: number): this;
    setScale(x?: number, y?: number): this;
    setX(value?: number): this;
    setY(value?: number): this;
    setZ(value?: number): this;
    setW(value?: number): this;
    getLocalTransformMatrix(tempMatrix?: Phaser.GameObjects.Components.TransformMatrix): Phaser.GameObjects.Components.TransformMatrix;
    getWorldTransformMatrix(tempMatrix?: Phaser.GameObjects.Components.TransformMatrix, parentMatrix?: Phaser.GameObjects.Components.TransformMatrix): Phaser.GameObjects.Components.TransformMatrix;
    getLocalPoint(x: number, y: number, point?: Phaser.Math.Vector2, camera?: Phaser.Cameras.Scene2D.Camera): Phaser.Math.Vector2;
    getParentRotation(): number;

    visible: boolean;
    setVisible(value: boolean): this;
}