import {
    QuestionType as QuestionTypeRef,
    OptionsType as OptionsTypeRef
} from '../questions/types';
import DataMethods from '../../../utils/data/DataMethods';

export default Quest;

declare namespace Quest {
    /**
     * Question data type.
     */
    type QuestionType = QuestionTypeRef;
    /**
     * Question option data type.
     */
    type OptionsType = OptionsTypeRef;

    /**
     * Configuration options for creating a Quest.
     */
    interface IConfig {
        /**
         * Shuffle question order.
         */
        shuffleQuestions?: boolean,
        /**
         * Shuffle options order.
         */
        shuffleOptions?: boolean,
    }
}

/**
 * Quest flow controller for questions and options.
 */
declare class Quest extends DataMethods {
    /**
     * Get the next question.
     *
     * @param questionKey - Current question key.
     * @returns Next question data.
     */
    getNextQuestion(
        questionKey?: string
    ): Quest.QuestionType;

    /**
     * Check whether current question is the last one.
     *
     * @returns True if last question.
     */
    isLastQuestion(): boolean;

    /**
     * Start the quest.
     *
     * @returns This Quest instance.
     */
    start(): this;

    /**
     * Get option data from a question.
     *
     * @param question - Question key or question data.
     * @param optionKey - Option key.
     * @returns Option data.
     */
    getOption(
        question: string | Quest.QuestionType,
        optionKey: string
    ): Quest.OptionsType;

}
