import Vertex from './vertex/Vertex';
import Face from './vertex/Face';

export default Mesh;

declare namespace Mesh {
    type DebugCallback = (
        src: Mesh,
        meshLength: number,
        verts: number[]
    ) => void;
}

declare class Mesh extends Phaser.GameObjects.GameObject {

    clear(): this;

    createVertex(u?: number, v?: number): Vertex;

    createFace(
        vertex0?: Vertex,
        vertex1?: Vertex,
        vertex2?: Vertex
    ): Face;
    addFace(face: Face): this;
    addFaces(faces: Face[]): this;

    resetFaceSize(): this;

    addGridFaces(
        columns?: number,
        rows?: number,
        sharedVertexMode?: boolean
    ): this;
    addGridFaces(config?: {
        columns?: number,
        rows?: number,
        sharedVertexMode?: boolean
    }): this;

    getVertexByName(name: string | number): Vertex | null;
    getFaceByName(name: string | numbeclearTintr): Face | null;

    resetVerticesPosition(): this;

    getFaceAt(
        worldX: number, worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera
    ): Face;

    hasFaceAt(
        worldX: number, worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera
    ): boolean;

    setTintFill(value?: boolean): this;
    setTint(tint?: number): this;
    clearTint(): this;

    setDebug(
        graphic: Phaser.GameObjects.Graphics,
        callback?: Mesh.DebugCallback
    ): this;

    setFaceInteractive(): this;

    // Components
    clearAlpha(): this;
    setAlpha(value?: number): this;
    alpha: number;

    blendMode: Phaser.BlendModes | string | number;
    setBlendMode(value: string | Phaser.BlendModes | number): this;

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

    width: number;
    height: number;
    displayWidth: number;
    displayHeight: number;
    setSizeToFrame(frame?: Phaser.Textures.Frame | boolean): this;
    setSize(width: number, height: number): this;
    setDisplaySize(width: number, height: number): this;

    texture: Phaser.Textures.Texture | Phaser.Textures.CanvasTexture;
    frame: Phaser.Textures.Frame;
    setTexture(key: string | Phaser.Textures.Texture, frame?: string | number, updateSize?: boolean, updateOrigin?: boolean): this;
    setFrame(frame: string | number | Phaser.Textures.Frame, updateSize?: boolean, updateOrigin?: boolean): this;

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

    scrollFactorX: number;
    scrollFactorY: number;
    setScrollFactor(x: number, y?: number): this;

}