/**
 * Option data shape.
 */
export type OptionsType = {
    /**
     * Option key.
     */
    key?: string
    /**
     * Additional option parameters.
     */
    [param: string]: unknown
}

/**
 * Question data shape.
 */
export type QuestionType = {
    /**
     * Question key.
     */
    key?: string
    /**
     * Question options.
     */
    options?: OptionsType[]
    /**
     * Additional question parameters.
     */
    [param: string]: unknown
}
