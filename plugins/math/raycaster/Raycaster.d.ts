export default Raycaster;

declare namespace Raycaster {
    /**
     * Configuration options for ray casting.
     */
    interface IConfig {
        /**
         * Maximum ray length used when no hit is found earlier.
         */
        maxRayLength?: number
    }

    /**
     * Ray cast hit result.
     */
    interface IResult {
        /**
         * Hit obstacle game object.
         */
        gameObject: Phaser.GameObjects.GameObject,
        /**
         * Polygon used as the obstacle shape.
         */
        polygon: Phaser.Geom.Polygon,
        /**
         * Hit segment on the obstacle polygon.
         */
        segment: Phaser.Geom.Line,
        /**
         * Hit point x coordinate.
         */
        x: number,
        /**
         * Hit point y coordinate.
         */
        y: number,
        /**
         * Reflection angle in radians at the hit point.
         */
        reflectAngle: number,
    }
}

/**
 * Utility for casting rays against polygon obstacles.
 */
declare class Raycaster {
    /**
     * Add an obstacle with optional custom polygon.
     *
     * @param gameObject - Obstacle game object.
     * @param polygon - Optional polygon shape of the obstacle.
     * @returns This raycaster instance.
     */
    addObstacle(
        gameObject: Phaser.GameObjects.GameObject,
        polygon?: Phaser.Geom.Polygon
    ): this;

    /**
     * Add multiple obstacle game objects.
     *
     * @param gameObjects - Obstacle game objects to add.
     * @returns This raycaster instance.
     */
    addObstacle(
        gameObjects: Phaser.GameObjects.GameObject[]
    ): this;

    /**
     * Remove an obstacle.
     *
     * @param gameObject - Obstacle game object to remove.
     * @returns This raycaster instance.
     */
    removeObstacle(
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    /**
     * Remove all obstacles.
     *
     * @returns This raycaster instance.
     */
    clearObstacle(): this;

    /**
     * Update obstacle polygon data.
     *
     * @param gameObject - Obstacle game object to update.
     * @param polygon - Optional replacement polygon shape.
     * @returns This raycaster instance.
     */
    updateObstacle(
        gameObject: Phaser.GameObjects.GameObject,
        polygon?: Phaser.Geom.Polygon
    ): this;

    /**
     * Cast a ray from a world position toward an angle.
     *
     * @param x - Ray origin x coordinate.
     * @param y - Ray origin y coordinate.
     * @param angle - Ray direction angle in radians.
     * @returns Hit result or false when no obstacle is hit.
     */
    rayToward(
        x: number,
        y: number,
        angle: number
    ): Raycaster.IResult | false;

}
