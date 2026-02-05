import Live2dGameObjectBase from './Live2dGameObjectBase';

export default Live2dGameObject;

declare namespace Live2dGameObject {
    /**
     * Configuration options used when setting or creating a Live2D model.
     */
    interface IConfig {
        /**
         * Idle motion name that should auto-play after model setup.
         */
        autoPlayIdleMotion?: string
    }

    /**
     * Mapping from parameter names to current numeric values.
     */
    type ParametersType = Record<string, number>;

    /**
     * Configuration options for look-at behavior.
     */
    interface ILookAtConfig {
        /**
         * Camera used to convert world coordinates.
         */
        camera?: Phaser.Cameras.Scene2D.Camera;

        /**
         * Eye-ball horizontal factor.
         */
        eyeBallX?: number,
        /**
         * Eye-ball vertical factor.
         */
        eyeBallY?: number,
        /**
         * Head angle horizontal factor.
         */
        angleX?: number,
        /**
         * Head angle vertical factor.
         */
        angleY?: number,
        /**
         * Head angle roll factor.
         */
        angleZ?: number,
        /**
         * Body angle horizontal factor.
         */
        bodyAngleX?: number,
    }

    /**
     * Mapping from hit-area names to hit-test results.
     */
    type HitTestResultType = Record<string, boolean>;

    /**
     * World-space point in model coordinates.
     */
    interface IModelPoint {
        /**
         * X position in model space.
         */
        x: number,
        /**
         * Y position in model space.
         */
        y: number
    }
}

/**
 * Live2D model game object.
 */
declare class Live2dGameObject extends Live2dGameObjectBase {
    /**
     * Create a Live2D game object.
     *
     * @param scene - Scene that owns this game object.
     * @param x - Initial x position.
     * @param y - Initial y position.
     * @param key - Texture or model key.
     * @param config - Optional model setup configuration.
     */
    constructor(
        scene: Phaser.Scene,
        x?: number,
        y?: number,
        key?: string,
        config?: Live2dGameObject.IConfig
    );

    /**
     * Set or replace model data by key.
     *
     * @param key - Model key.
     * @param config - Optional model setup configuration.
     * @returns This game object.
     */
    setModel(
        key: string,
        config?: Live2dGameObject.IConfig
    ): this;

    /**
     * Get available expression names.
     *
     * @returns Expression name list.
     */
    getExpressionNames(): string[];

    /**
     * Set active expression.
     *
     * @param expressionName - Expression name to apply.
     * @returns This game object.
     */
    setExpression(expressionName: string): this;

    /**
     * Current expression name.
     */
    expressionName: string;

    /**
     * Get motion names in a group.
     *
     * @param groupName - Motion group name.
     * @returns Motion names.
     */
    getMotionNames(groupName?: string): string[];

    /**
     * Get all motion group names.
     *
     * @returns Motion group names.
     */
    getMotionGroupNames(): string[];

    /**
     * Start motion playback.
     *
     * @param group - Motion group name.
     * @param no - Motion index inside the group.
     * @param priority - Playback priority.
     * @returns This game object.
     */
    startMotion(
        group: string,
        no?: number | undefined,
        priority?: 'none' | 'idle' | 'normal' | 'force' | 0 | 1 | 2 | 3
    ): this;

    /**
     * Stop all playing motions.
     *
     * @returns This game object.
     */
    stopAllMotions(): this;

    /**
     * Get names of currently playing motions.
     *
     * @returns Playing motion names.
     */
    getPlayinigMotionNames(): string[];

    /**
     * Check whether any motion is currently playing.
     *
     * @returns True if at least one motion is playing.
     */
    isAnyMotionPlaying(): boolean;

    /**
     * Set idle motion name for automatic playback.
     *
     * @param motionName - Idle motion name.
     * @returns This game object.
     */
    autoPlayIdleMotion(motionName: string): this;

    /**
     * Set global time scale for model updates.
     *
     * @param timeScale - Time scale multiplier.
     * @returns This game object.
     */
    setTimeScale(timeScale: number): this;
    /**
     * Current global time scale.
     */
    timeScale: number;

    /**
     * Register a model parameter for external control.
     *
     * @param name - Parameter name.
     * @returns This game object.
     */
    registerParameter(name: string): this;

    /**
     * Add value to a registered model parameter.
     *
     * @param name - Parameter name.
     * @param value - Value to add.
     * @returns This game object.
     */
    addParameterValue(
        name: string,
        value: number
    ): this;

    /**
     * Reset a registered parameter value.
     *
     * @param name - Parameter name.
     * @returns This game object.
     */
    resetParameterValue(name: string): this

    /**
     * Get all registered parameter values.
     *
     * @returns Parameter map.
     */
    getParameters(): Live2dGameObject.ParametersType;

    /**
     * Get all registered parameter values.
     */
    get params(): Live2dGameObject.ParametersType;

    /**
     * Make model look at a world-space target point.
     *
     * @param x - Target world x coordinate.
     * @param y - Target world y coordinate.
     * @param config - Optional look-at configuration.
     * @returns This game object.
     */
    lookAt(
        x: number,
        y: number,
        config?: Live2dGameObject.ILookAtConfig
    ): this;

    /**
     * Reset look-at target to forward direction.
     *
     * @param config - Optional look-at configuration.
     * @returns This game object.
     */
    lookForward(config?: Live2dGameObject.ILookAtConfig): this;

    /**
     * Set lip-sync intensity value.
     *
     * @param value - Lip-sync value.
     * @returns This game object.
     */
    setLipSyncValue(value: number): this;

    /**
     * Current lip-sync intensity value.
     */
    lipSyncValue: number;

    /**
     * Get hit-test result map for all hit areas.
     *
     * @returns Hit-test result map.
     */
    getHitTestResult(): Live2dGameObject.HitTestResultType;

    /**
     * Get hit-test result map for all hit areas.
     */
    get hitTestResult(): Live2dGameObject.HitTestResultType;

    /**
     * Perform hit test against a named hit area.
     *
     * @param hitAreaName - Hit area name.
     * @param worldX - World x coordinate.
     * @param worldY - World y coordinate.
     * @param camera - Optional camera used for coordinate conversion.
     * @returns True if the point hits the area.
     */
    hitTest(
        hitAreaName: string,
        worldX: number,
        worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera
    ): boolean;

    /**
     * Convert world coordinates to model-space coordinates.
     *
     * @param worldX - World x coordinate.
     * @param worldY - World y coordinate.
     * @param camera - Optional camera used for coordinate conversion.
     * @param out - Optional output point object.
     * @returns Model-space point.
     */
    getModelXY(
        worldX: number,
        worldY: number,
        camera?: Phaser.Cameras.Scene2D.Camera,
        out?: Live2dGameObject.IModelPoint
    ): Live2dGameObject.IModelPoint;

}
