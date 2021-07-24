import {
    QuestionType as QuestionTypeRef,
    OptionsType as OptionsTypeRef
} from '../questions/types';
export default Quest;

declare namespace Quest {
    type QuestionType = QuestionTypeRef;
    type OptionsType = OptionsTypeRef;

    interface IConfig {
        shuffleQuestions?: boolean,
        shuffleOptions?: boolean,
    }
}

declare class Quest {
    getNextQuestion(
        questionKey?: string
    ): Quest.QuestionType;


    isLastQuestion(): boolean;

    start(): this;

    getData(
        key: string,
        defaultValue?: any
    ): any;

    getData(): any[];

    setData(
        key: string,
        value: any
    ): this;

    incData(
        key: string,
        inc: number,
        defaultValue?: number
    ): this;

    mulData(
        key: string,
        mul: number,
        defaultValue?: number
    ): this;

    clearData(): this;

    getOption(
        question: string | Quest.QuestionType,
        optionKey: string
    ): Quest.OptionsType;

}