import Vertex from './vertex/Vertex';
import Face from './vertex/Face';

export default Mesh;

declare namespace Mesh {
    /**
     * Debug rendering callback for mesh triangle vertices.
     */
    type DebugCallback = (
        /**
         * Source mesh object.
         */
        src: Mesh,
        /**
         * Vertex array length used for rendering.
         */
        meshLength: number,
        /**
         * Flattened triangle vertex positions.
         */
        verts: number[]
    ) => void;
}

/**
 * Mesh image game object built from custom vertices and faces.
 */
declare class Mesh extends Phaser.GameObjects.GameObject {

    /**
     * Remove all faces and vertices.
     *
     * @returns This mesh instance.
     */
    clear(): this;

    /**
     * Create a vertex with optional UV coordinates.
     *
     * @param u - Horizontal UV coordinate.
     * @param v - Vertical UV coordinate.
     * @returns The created vertex.
     */
    createVertex(u?: number, v?: number): Vertex;

    /**
     * Create a face from 3 optional vertices.
     *
     * @param vertex0 - First vertex.
     * @param vertex1 - Second vertex.
     * @param vertex2 - Third vertex.
     * @returns The created face.
     */
    createFace(
        vertex0?: Vertex,
        vertex1?: Vertex,
        vertex2?: Vertex
    ): Face;
    /**
     * Add a face to this mesh.
     *
     * @param face - Face to add.
     * @returns This mesh instance.
     */
    addFace(face: Face): this;
    /**
     * Add multiple faces to this mesh.
     *
     * @param faces - Faces to add.
     * @returns This mesh instance.
     */
    addFaces(faces: Face[]): this;

    /**
     * Reset all face frame sizes to current texture frame size.
     *
     * @returns This mesh instance.
     */
    resetFaceSize(): this;

    /**
     * Generate and add faces in a grid layout.
     *
     * @param columns - Number of grid columns.
     * @param rows - Number of grid rows.
     * @param sharedVertexMode - Reuse vertices across adjacent faces.
     * @returns This mesh instance.
     */
    addGridFaces(
        columns?: number,
        rows?: number,
        sharedVertexMode?: boolean
    ): this;
    /**
     * Generate and add faces in a grid layout.
     *
     * @param config - Grid generation configuration.
     * @returns This mesh instance.
     */
    addGridFaces(config?: {
        /**
         * Number of grid columns.
         */
        columns?: number,
        /**
         * Number of grid rows.
         */
        rows?: number,
        /**
         * Reuse vertices across adjacent faces.
         */
        sharedVertexMode?: boolean
    }): this;

    /**
     * Get a vertex by name.
     *
     * @param name - Vertex name or id.
     * @returns The matched vertex, or null if not found.
     */
    getVertexByName(name: string | number): Vertex | null;
    /**
     * Get a face by name.
     *
     * @param name - Face name or id.
     * @returns The matched face, or null if not found.
     */
    getFaceByName(name: string | number): Face | null;

    /**
     * Reset all vertices to their frame positions.
     *
     * @returns This mesh instance.
     */
    resetVerticesPosition(): this;

    /**
     * Get face under a world position.
     *
     * @param worldX - World x coordinate.
     * @param worldY - World y coordinate.
     * @param camera - Camera used for coordinate conversion.
     * @returns The face at this position, or null if none.
     */
    getFaceAt(
        worldX: number,
        worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera
    ): Face | null;

    /**
     * Test whether there is a face under a world position.
     *
     * @param worldX - World x coordinate.
     * @param worldY - World y coordinate.
     * @param camera - Camera used for coordinate conversion.
     * @returns True if a face exists at this position.
     */
    hasFaceAt(
        worldX: number,
        worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera
    ): boolean;

    /**
     * Set tint fill mode.
     *
     * @param mode - Tint mode value.
     * @returns This mesh instance.
     */
    setTintFill(mode: number): this;
    /**
     * Set tint color on all faces.
     *
     * @param tint - Tint color as a hex number.
     * @returns This mesh instance.
     */
    setTint(tint?: number): this;
    /**
     * Clear tint and reset tint mode.
     *
     * @returns This mesh instance.
     */
    clearTint(): this;

    /**
     * Enable debug rendering callback.
     *
     * @param graphic - Graphics object used for debug drawing.
     * @param callback - Optional custom debug callback.
     * @returns This mesh instance.
     */
    setDebug(
        graphic: Phaser.GameObjects.Graphics,
        callback?: Mesh.DebugCallback
    ): this;

    /**
     * Enable face-based pointer interaction.
     *
     * @param config - Optional interactive configuration.
     * @returns This mesh instance.
     */
    setFaceInteractive(config?: Phaser.Types.Input.InputConfiguration): this;

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
