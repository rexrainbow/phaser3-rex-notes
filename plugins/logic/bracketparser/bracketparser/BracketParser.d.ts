import BracketParserBase from '../bracketparserbase/BracketParser';
export default BracketParser;

declare namespace BracketParser {
    interface IConfig extends BracketParserBase.IConfig {
        /**
         * Regex overrides.
         */
        regex?: {
            /**
             * Tag regex.
             */
            tag?: string,
            /**
             * Value regex.
             */
            value?: string,
        }
    }
    namespace Events {
        /**
         * Fired on start.
         */
        type StartCallbackType = (parser: BracketParser) => void;
        /**
         * Fired on complete.
         */
        type CompleteCallbackType = (parser: BracketParser) => void;
        /**
         * Fired on pause.
         */
        type PauseCallbackType = (parser: BracketParser) => void;
        /**
         * Fired on resume.
         */
        type ResumeCallbackType = (parser: BracketParser) => void;

        /**
         * Fired on tag on.
         * @param values - Tag values.
         */
        type TagOnCallbackType = (...values: any) => void;
        /**
         * Fired on any tag on.
         * @param tagName - Tag name.
         * @param values - Tag values.
         */
        type AnyTagOnCallbackType = (tagName: string, ...values: any) => void;
        /**
         * Fired on tag off.
         */
        type TagOffCallbackType = () => void;
        /**
         * Fired on any tag off.
         * @param tagName - Tag name.
         */
        type AnyTagOffCallbackType = (tagName: string) => void;
        /**
         * Fired on content.
         * @param content - Parsed content.
         */
        type ContentCallbackType = (content: string) => void;
    }
}

/**
 * Bracket parser with regex support.
 */
declare class BracketParser extends BracketParserBase {
    /**
     * Create a bracket parser.
     * @param config - Parser configuration.
     */
    constructor(config?: BracketParser.IConfig);
}
