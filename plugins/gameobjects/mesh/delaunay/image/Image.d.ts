export default DelaunayImage;

declare namespace DelaunayImage {
    /**
     * Legacy callback type placeholder.
     */
    type GetRingRadiusListCallback = (width: number, height: number) => number[];

    /**
     * Configuration for creating a delaunay image mesh.
     */
    interface IConfig {
        /**
         * World x position.
         */
        x?: number,
        /**
         * World y position.
         */
        y?: number,
        /**
         * Texture key.
         */
        key: string,
        /**
         * Texture frame key.
         */
        frame?: string,

        /**
         * Number of triangles used for triangulation.
         */
        triangleCount?: number,
    }

    /**
     * Configuration used when re-triangulating.
     */
    interface DelaunayIConfig {
        /**
         * Number of triangles used for triangulation.
         */
        triangleCount?: number,
    }
}

/**
 * Mesh image triangulated with a delaunay algorithm.
 */
declare class DelaunayImage extends Phaser.GameObjects.Mesh {
    /**
     * Create a delaunay image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param x - World x position.
     * @param y - World y position.
     * @param key - Texture key.
     * @param frame - Texture frame key.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        frame?: string,
        config?: DelaunayImage.IConfig
    );

    /**
     * Create a delaunay image mesh.
     *
     * @param scene - Scene that owns this game object.
     * @param config - Optional configuration object.
     */
    constructor(
        scene: Phaser.Scene,
        config?: DelaunayImage.IConfig
    );

    /**
     * Rebuild faces using delaunay triangulation.
     *
     * @param config - Optional triangulation configuration.
     * @returns This delaunay image instance.
     */
    reTriangulate(
        config?: DelaunayImage.DelaunayIConfig
    ): this;

    /**
     * Number of triangles used for triangulation.
     */
    triangleCount: number;
    /**
     * Set number of triangles used for triangulation.
     *
     * @param triangleCount - Number of triangles.
     * @returns This delaunay image instance.
     */
    setTriangleCount(triangleCount: number): this;

    /**
     * Reset image to a single quad face.
     *
     * @returns This delaunay image instance.
     */
    resetImage(): this;
}
