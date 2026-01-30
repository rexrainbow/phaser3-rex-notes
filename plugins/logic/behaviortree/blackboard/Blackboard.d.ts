import Base from './Base';

export default Blackboard;

declare namespace Blackboard {
    /**
     * Memory storage type.
     */
    type MemoryType = Base.MemoryType;

    /**
     * Configuration options for creating a Blackboard.
     */
    interface IConfig {
        /**
         * Key used for current time.
         */
        currentTimeKey?: string;
    }
}

/**
 * Blackboard with tree time helpers.
 */
declare class Blackboard extends Base {
    /**
     * Create a Blackboard.
     *
     * @param config - Configuration options.
     */
    constructor(config?: Blackboard.IConfig);

    /**
     * Current time key.
     */
    currentTimeKey: string;

    /**
     * Get tree state.
     *
     * @param treeID - Tree id.
     * @returns The tree state code.
     */
    getTreeState(treeID: string): number;

    /**
     * Set tree state.
     *
     * @param treeID - Tree id.
     * @param state - State code.
     * @returns This Blackboard instance.
     */
    setTreeState(
        treeID: string,
        state: number
    ): this;

    /**
     * Check if current time is valid.
     *
     * @returns True if current time exists.
     */
    hasValidCurrentTime(): boolean;

    /**
     * Set current time.
     *
     * @param time - Current time value.
     * @returns This Blackboard instance.
     */
    setCurrentTime(time: number): this;

    /**
     * Get current time.
     *
     * @returns The current time value.
     */
    getCurrentTime(): number;

    /**
     * Increment current time.
     *
     * @param time - Increment value.
     * @returns This Blackboard instance.
     */
    incCurrentTime(time: number): this;

}
