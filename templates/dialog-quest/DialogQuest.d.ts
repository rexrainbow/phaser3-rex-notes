import { Dialog } from '../ui/ui-components';
import QuestManager from '../../plugins/quest'

export default DialogQuest;

declare namespace DialogQuest {
    /**
     * Configuration for creating a dialog quest controller.
     */
    interface IConfig extends QuestManager.IConfig {
        /** Dialog UI instance used to render questions and choices. */
        dialog: Dialog,
    }

    /**
     * Event callback type definitions emitted by dialog quest.
     */
    namespace Events {
        /**
         * Called when a choice object should be updated from question data.
         */
        type UpdateChoiceCallbackType = (
            /**
             * Choice game object to update.
             */
            choice: Phaser.GameObjects.GameObject,
            /**
             * Question option data bound to this choice.
             */
            option: QuestManager.QuestionType,
            /**
             * Active quest instance.
             */
            quest: QuestManager.Quest
        ) => void;

        /**
         * Called when dialog content should be updated for a question.
         */
        type UpdateDialogCallbackType = (
            /**
             * Dialog UI instance to update.
             */
            dialog: Dialog,
            /**
             * Current question data.
             */
            question: QuestManager.QuestionType,
            /**
             * Active quest instance.
             */
            quest: QuestManager.Quest
        ) => void;

        /**
         * Called when a choice is clicked.
         */
        type ClickChoiceCallbackType = (
            /**
             * Clicked choice game object.
             */
            choice: Phaser.GameObjects.GameObject,
            /**
             * Dialog UI instance that owns the choice.
             */
            dialog: Dialog,
            /**
             * Active quest instance.
             */
            quest: QuestManager.Quest
        ) => void;

        /**
         * Called when an action button is clicked.
         */
        type ClickActionCallbackType = (
            /**
             * Clicked action game object.
             */
            action: Phaser.GameObjects.GameObject,
            /**
             * Dialog UI instance that owns the action.
             */
            dialog: Dialog,
            /**
             * Active quest instance.
             */
            quest: QuestManager.Quest
        ) => void;
    }
}

/**
 * Controller that binds quest flow to a dialog UI component.
 */
declare class DialogQuest extends Phaser.Events.EventEmitter {
    /**
     * Create a dialog quest controller.
     *
     * @param config - Optional quest and dialog configuration.
     */
    constructor(
        config?: DialogQuest.IConfig
    );

    /**
     * Start dialog flow from the first question.
     *
     * @returns This dialog quest instance.
     */
    start(): this;

    /**
     * Advance to the next question by answer key.
     *
     * @param key - Optional answer key used to choose next branch.
     * @returns This dialog quest instance.
     */
    next(key?: string): this;

    /**
     * Check whether current question is the last one.
     *
     * @returns True if current question is the final question.
     */
    isLast(): boolean;

    /**
     * Remove all questions from this quest.
     *
     * @returns This dialog quest instance.
     */
    removeAll(): this;

    /**
     * Add question entries into the quest.
     *
     * @param questions - Question list or CSV string source.
     * @param config - Optional add-questions configuration.
     * @returns This dialog quest instance.
     */
    add(
        questions: QuestManager.QuestionType[] | string,
        config?: QuestManager.IAddQuestionsConfig
    ): this;

    /**
     * Get a data value by key.
     *
     * @param key - Data key to read.
     * @param defaultValue - Fallback value when key is not found.
     * @returns The stored data value.
     */
    getData(
        key: string,
        defaultValue?: any
    ): any;

    /**
     * Get all stored data values.
     *
     * @returns Array of stored data values.
     */
    getData(): any[];

    /**
     * Set a data value by key.
     *
     * @param key - Data key to write.
     * @param value - Value to store.
     * @returns This dialog quest instance.
     */
    setData(
        key: string,
        value: any
    ): this;

    /**
     * Increase a numeric data value by key.
     *
     * @param key - Data key to update.
     * @param inc - Increment amount.
     * @param defaultValue - Initial value when key is not found.
     * @returns This dialog quest instance.
     */
    incData(
        key: string,
        inc: number,
        defaultValue?: number
    ): this;

    /**
     * Multiply a numeric data value by key.
     *
     * @param key - Data key to update.
     * @param mul - Multiplier amount.
     * @param defaultValue - Initial value when key is not found.
     * @returns This dialog quest instance.
     */
    mulData(
        key: string,
        mul: number,
        defaultValue?: number
    ): this;

    /**
     * Clear all stored data values.
     *
     * @returns This dialog quest instance.
     */
    clearData(): this;
}
