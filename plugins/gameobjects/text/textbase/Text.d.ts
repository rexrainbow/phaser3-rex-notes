import * as Phaser from 'phaser';

export interface TextStyle {
    fontFamily?: string,
    fontSiz?: string,
    fontStyle?: string,

    backgroundColor?: null | string | number,
    backgroundColor2?: null | string | number,
    backgroundHorizontalGradient?: boolean,
    backgroundStrokeColor?: null | string | number,
    backgroundStrokeLineWidth?: number,
    backgroundCornerRadius?: number,
    backgroundCornerIteration?: null | number,

    color?: null | string | number,
    fill?: null | string | number,

    stroke?: null | string | number,
    strokeThickness?: number,

    shadow?: {
        offsetX?: number,
        offsetY?: number,
        color?: number | string,
        blur?: number,
        stroke: false,
        fill: false
    },

    underline?: {
        color?: number | string,
        thickness?: number,
        offset?: number,
    },

    align?: 'left' | 'center' | 'right',
    halign?: 'left' | 'center' | 'right',
    valign?: 'top' | 'center' | 'bottom',

    padding?: {
        left?: number,
        right?: number,
        top?: number,
        bottom?: number,
    },

    maxLines?: number,
    lineSpacing?: number,

    fixedWidth?: number,
    fixedHeight?: number,

    testString?: string,

    wrap?: {
        mode?: 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character'
        width?: null | number,
    },

    metrics?: boolean |
    {
        ascent: number,
        descent: number,
        fontSize: number
    },
}

export default class Text extends Phaser.GameObjects.GameObject {
    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        content?: string,

        style?: TextStyle
    );

    text: string;
    setText(text: string): this;
    getPlainText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getWrappedText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getText(
        text?: string | undefined,
        start?: number, end?: number
    ): string;
    getSubString(
        text?: string | undefined,
        start?: number, end?: number
    ): string;

    updateText(runWrap?: boolean): this;

    setWrapMode(
        mode: 0 | 1 | 2 | 'none' | 'word' | 'char' | 'character'
    ): this;
    setWrapWidth(width: number): this;

    setFont(
        font: string |
        {
            fontFamily?: string,
            fontSize?: string,
            fontStyle?: string
        }
    ): this;
    setFontFamily(family: string): this;
    setFontSize(size: number | string): this;
    setFontStyle(style: string): this;
    setStyle(style: TextStyle): this;

    setColor(
        color?: null | string | number
    ): this;
    setFill(
        color?: null | string | number
    ): this;

    setStroke(
        color?: null | string | number,
        thickness?: number
    ): this;

    setUnderline(
        color?: null | string | number,
        thickness?: number,
        ofset?: number
    ): this;
    setUnderlineColor(
        color?: null | string | number
    ): this;
    setUnderlineThinkness(thickness: number): this;
    setUnderlineOffset(ofset: number): this;

    setBackgroundColor(
        color?: null | string | number,
        color2?: null | string | number,
        isHorizontalGradient?: boolean
    ): this;
    setBackgroundStrokeColor(
        color?: null | string | number,
        lineWidth?: number
    ): this;
    setBackgroundCornerRadius(
        radius?: number,
        iteration?: number
    ): this;

    setShadow(
        x?: number, y?: number,
        color?: null | string | number,
        blur?: number,
        shadowStroke?: boolean,
        shadowFill?: boolean
    ): this;
    setShadowOffset(x: number, y: number): this;
    setShadowColor(color?: null | string | number): this;
    setShadowBlur(blur: number): this;
    setShadowStroke(enabled?: boolean): this;
    setShadowFill(enabled?: boolean): this;

    setAlign(align?: 'left' | 'center' | 'right'): this;
    setHAlign(align?: 'left' | 'center' | 'right'): this;
    setVAlign(align?: 'top' | 'center' | 'bottom'): this;

    addImage(
        imgKey: string,
        config?: {
            key: string,
            frame?: string,
            width?: number,
            height?: number,
            y?: number,
            left?: number,
            right?: number,
        }
    ): this;

    drawAreaBounds(
        graphics: Phaser.GameObjects.Graphics,
        color?: number
    ): this;

    setLineSpacing(value: number): this;

    setPadding(
        left?: number | {
            left?: number, right?: number, top?: number, bottom?: number
        },
        top?: number,
        right?: number,
        bottom?: number,
    ): this;

    setMaxLines(max?: number): this;

    setFixedSize(width?: number, height?: number): this;
    setSize(width?: number, height?: number): this;
    resize(width?: number, height?: number): this;

    getTextMetrics(): {
        ascent: number,
        descent: number,
        fontSize: number
    }

    style: {
        color: string | null,
        stroke: string | null,
        strokeThickness: number,

        underlineColor: string | null,
        underlineThickness: number,
        underlineOffset: number,

        backgroundColor: string | null,
        backgroundColor2: string | null,
        backgroundHorizontalGradient: boolean,

        backgroundStrokeColor: string | null,
        backgroundStrokeLineWidth: number,

        backgroundCornerRadius: number,
        backgroundCornerIteration: number | undefined,

        shadowColor: string | null,
        shadowOffsetX: number,
        shadowOffsetY: number,
        shadowBlur: number,
        shadowStroke: boolean,
        shadowFill: boolean,

        lineSpacing: number,
        maxLines: number,

        fixedWidth: number,
        fixedHeight: number,

        halign: string,
        valign: string,

        wrapWidth: number | null,
        wrapMode: number
    };

    padding: {
        left: number,
        right: number,
        top: number,
        bottom: number
    };

    lineSpacing: number;

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

    originX: number;
    originY: number;
    displayOriginX: number;
    displayOriginY: number;
    setOrigin(x?: number, y?: number): this;
    setOriginFromFrame(): this;
    setDisplayOrigin(x?: number, y?: number): this;
    updateDisplayOrigin(): this;

    defaultPipeline: Phaser.Renderer.WebGL.WebGLPipeline;
    pipeline: Phaser.Renderer.WebGL.WebGLPipeline;
    hasPostPipeline: boolean;
    postPipelines: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
    pipelineData: object;
    initPipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline): boolean;
    setPipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline, pipelineData?: object, copyData?: boolean): this;
    setPostPipeline(pipelines: string | string[] | Function | Function[] | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[], pipelineData?: object, copyData?: boolean): this;
    setPipelineData(key: string, value?: any): this;
    getPostPipeline(pipeline: string | Function | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
    resetPipeline(resetPostPipelines?: boolean, resetData?: boolean): boolean;
    resetPostPipeline(resetData?: boolean): void;
    removePostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
    getPipelineName(): string;

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
    setScale(x: number, y?: number): this;
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