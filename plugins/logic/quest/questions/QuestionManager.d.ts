import EventEmitter from "../../../utils/eventemitter/EventEmitter";
import {
    QuestionType as QuestionTypeRef,
    OptionsType as OptionsTypeRef
} from './types';
import Quest from '../quest/Quest';

export default QuestionManager;

declare namespace QuestionManager {

    /**
     * Question data type.
     */
    type QuestionType = QuestionTypeRef;

    /**
     * Question option data type.
     */
    type OptionsType = OptionsTypeRef;

    /**
     * Callback that converts parsed parameter values.
     *
     * @param s - Source string value.
     * @param key - Parameter key.
     * @returns Converted value.
     */
    type ConvertParamCallbackType = (s: string, key: string) => any;

    /**
     * Configuration for adding question data.
     */
    interface IAddQuestionsConfig {
        /**
         * Delimiter used by string parser.
         */
        delimiter?: string,
        /**
         * Type field names in string parser.
         */
        types?: {
            /**
             * Question type label.
             */
            question?: string,
            /**
             * Option type label.
             */
            option?: string,
        },
        /**
         * Enable or customize parameter conversion.
         */
        convert?: true | ConvertParamCallbackType,
    }

    /**
     * Configuration options for creating a QuestionManager.
     */
    interface IConfig extends IAddQuestionsConfig {
        /**
         * Initial questions as list or string source.
         */
        questions?: QuestionType[] | string,

        /**
         * Quest configuration.
         */
        quest?: Quest.IConfig,

        /**
         * Event emitter instance or false to disable.
         */
        eventEmitter?: EventEmitter | false,
    }

    namespace Events {
        /**
         * Quest callback signature.
         *
         * @param question - Current question data.
         * @param questionManager - QuestionManager instance.
         * @param quest - Quest instance.
         */
        type QuestCallbackType = (
            question: QuestionTypeRef,
            questionManager: QuestionManager,
            quest: Quest
        ) => void;
    }

    export class Quest { }

}

/**
 * Question manager with quest flow support.
 */
declare class QuestionManager extends EventEmitter {
    /**
     * Create a QuestionManager.
     *
     * @param config - Configuration options.
     */
    constructor(
        config?: QuestionManager.IConfig
    );

    /**
     * Add questions.
     *
     * @param questions - Question list or source string.
     * @param config - Add configuration.
     * @returns This QuestionManager instance.
     */
    add(
        questions: QuestionManager.QuestionType[] | string,
        config?: QuestionManager.IAddQuestionsConfig
    ): this;

    /**
     * Remove a question by key.
     *
     * @param key - Question key.
     * @returns This QuestionManager instance.
     */
    remove(key: string): this;

    /**
     * Remove all questions.
     *
     * @returns This QuestionManager instance.
     */
    removeAll(): this;

    /**
     * Get question by key.
     *
     * @param key - Question key.
     * @returns Question data.
     */
    get(key: string): QuestionManager.QuestionType;

    /**
     * Get all question keys.
     *
     * @param out - Output key list.
     * @returns Key list.
     */
    getKeys(out?: string[]): string[];

    /**
     * Check whether a question key exists.
     *
     * @param key - Question key.
     * @returns True if exists.
     */
    has(key: string): boolean;

    /**
     * Current question list.
     */
    readonly questions: QuestionManager.QuestionType[];

    /**
     * Get option data from a question.
     *
     * @param question - Question key or question data.
     * @param optionKey - Option key.
     * @returns Option data.
     */
    getOption(
        question: string | QuestionManager.QuestionType,
        optionKey: string
    ): QuestionManager.OptionsType;

    /**
     * Start quest mode.
     *
     * @param config - Quest configuration.
     * @returns This QuestionManager instance.
     */
    startQuest(
        config?: Quest.IConfig
    ): this;

    /**
     * Get the next question.
     *
     * @param questionKey - Current question key.
     * @returns Next question data.
     */
    getNextQuestion(
        questionKey?: string
    ): QuestionManager.QuestionType;

    /**
     * Check whether current question is the last one.
     *
     * @returns True if last question.
     */
    isLastQuestion(): boolean;

    /**
     * Restart quest progress.
     *
     * @returns This QuestionManager instance.
     */
    restartQuest(): this;

    /**
     * Get data by key.
     *
     * @param key - Data key.
     * @param defaultValue - Default value if missing.
     * @returns Stored value.
     */
    getData(
        key: string,
        defaultValue?: any
    ): any;

    /**
     * Get all data values.
     *
     * @returns Data value list.
     */
    getData(): any[];

    /**
     * Set data by key.
     *
     * @param key - Data key.
     * @param value - Value to set.
     * @returns This QuestionManager instance.
     */
    setData(
        key: string,
        value: any
    ): this;

    /**
     * Increment numeric data.
     *
     * @param key - Data key.
     * @param inc - Increment value.
     * @param defaultValue - Default value if missing.
     * @returns This QuestionManager instance.
     */
    incData(
        key: string,
        inc: number,
        defaultValue?: number
    ): this;

    /**
     * Multiply numeric data.
     *
     * @param key - Data key.
     * @param mul - Multiplier value.
     * @param defaultValue - Default value if missing.
     * @returns This QuestionManager instance.
     */
    mulData(
        key: string,
        mul: number,
        defaultValue?: number
    ): this;

    /**
     * Clear all data values.
     *
     * @returns This QuestionManager instance.
     */
    clearData(): this;

    /**
     * Create a new Quest instance from current questions.
     *
     * @param config - Quest configuration.
     * @returns New Quest instance.
     */
    newQuest(
        config?: Quest.IConfig
    ): Quest;
}
