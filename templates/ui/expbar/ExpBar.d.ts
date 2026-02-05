import NameValueLabel from '../namevaluelabel/NameValueLabel';
import LevelCounter from '../../../plugins/levelcounter';

export default ExpBar;

declare namespace ExpBar {
    /**
     * Configuration options for creating an experience bar.
     */
    interface IConfig extends NameValueLabel.IConfig {
        /**
         * Total easing duration used for exp-bar transitions.
         */
        easeDuration?: number,

        /**
         * Level counter configuration.
         */
        levelCounter?: LevelCounter.IConfig,

    }
}

/**
 * Name-value label specialized for experience and level progression display.
 */
declare class ExpBar extends NameValueLabel {
    /**
     * Create an experience bar component.
     *
     * @param scene - Scene that owns this component.
     * @param config - Optional experience bar configuration.
     */
    constructor(
        scene: Phaser.Scene,
        config?: ExpBar.IConfig
    );

    /**
     * Current experience value.
     */
    exp: number;
    /**
     * Current level.
     */
    level: number;
    /**
     * Required exp value to reach the next level.
     */
    readonly requiredExp: number;

    /**
     * Set total easing duration for exp transitions.
     *
     * @param duration - Easing duration in milliseconds.
     * @returns This component instance.
     */
    setTotalEaseDuration(duration: number): this;

    /**
     * Set level-exp table.
     *
     * @param table - Level counter table data.
     * @returns This component instance.
     */
    setExpTable(table: LevelCounter.TableType): this;

    /**
     * Reset experience value directly.
     *
     * @param exp - Experience value to assign.
     * @returns This component instance.
     */
    resetExp(exp: number): this;

    /**
     * Get current experience value.
     *
     * @returns Current experience.
     */
    getExp(): number;
    /**
     * Get required experience value for a level.
     *
     * @param level - Target level.
     * @returns Required experience at the target level.
     */
    getExp(level: number): number;

    /**
     * Get current level.
     *
     * @returns Current level.
     */
    getLevel(): number;
    /**
     * Resolve level from experience.
     *
     * @param exp - Experience value.
     * @param level - Optional start level hint.
     * @returns Resolved level.
     */
    getLevel(
        exp: number,
        level?: number
    ): number;

    /**
     * Get required additional exp to the next level.
     *
     * @param level - Optional current level override.
     * @param exp - Optional current exp override.
     * @returns Required exp to next level.
     */
    getRequiredExpToNextLevel(
        level?: number,
        exp?: number
    ): number;

    /**
     * Increase experience by an increment.
     *
     * @param incExp - Experience increment.
     * @returns This component instance.
     */
    gainExp(incExp: number): this;

    /**
     * Set experience value.
     *
     * @param exp - Experience value to assign.
     * @returns This component instance.
     */
    setExp(exp: number): this;

    /**
     * Set level directly.
     *
     * @param level - Level value to assign.
     * @returns This component instance.
     */
    setLevel(level: number): this;

}
