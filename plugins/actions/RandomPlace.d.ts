export default RandomPlace;

declare namespace RandomPlace {

    /**
     * 2D vector with x and y coordinates.
     */
    type Vec2Type = { x: number, y: number };
    /**
     * Callback that returns a position.
     *
     * @param out - Output vector.
     * @returns The position vector.
     */
    type GetPositionCallback = (out?: Vec2Type) => Vec2Type

    /**
     * Area object that provides random points.
     */
    type AreaType = {
        getRandomPoint: GetPositionCallback
    }

    /**
     * Configuration options for RandomPlace.
     */
    interface IConfig {
        /**
         * Radius for random placement.
         */
        radius?: number,
        /**
         * Custom position callback.
         */
        getPositionCallback?: GetPositionCallback
        /**
         * Area to pick random points from.
         */
        area?: AreaType,
    }
}

/**
 * Randomly place a game object using a configuration.
 *
 * @param gameObjects - Target game object.
 * @param config - Configuration options.
 * @returns The placed game object.
 */
declare function RandomPlace(
    gameObjects: Phaser.GameObjects.GameObject,
    config: RandomPlace.IConfig
): Phaser.GameObjects.GameObject;

/**
 * Randomly place a game object using a config object.
 *
 * @param config - Configuration options.
 * @returns The placed game object.
 */
declare function RandomPlace(
    config: {
        /**
         * Target game object.
         */
        gameObjects: Phaser.GameObjects.GameObject,
        /**
         * Radius for random placement.
         */
        radius?: number,
    }
): Phaser.GameObjects.GameObject;
