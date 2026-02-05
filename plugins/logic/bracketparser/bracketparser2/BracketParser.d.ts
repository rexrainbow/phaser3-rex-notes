import BracketParserBase from '../bracketparserbase/BracketParser';

export default BracketParser;

declare namespace BracketParser {
    /**
     * Configuration options for the bracket parser.
     */
    interface IConfig extends BracketParserBase.IConfig {

    }

    /**
     * Event callback types emitted by the bracket parser.
     */
    namespace Events {
        /**
         * Callback fired when parser starts processing.
         */
        type StartCallbackType = (
            /**
             * Parser instance that emitted this event.
             */
            parser: BracketParser
        ) => void;
        /**
         * Callback fired when parser reaches completion.
         */
        type CompleteCallbackType = (
            /**
             * Parser instance that emitted this event.
             */
            parser: BracketParser
        ) => void;
        /**
         * Callback fired when parser is paused.
         */
        type PauseCallbackType = (
            /**
             * Parser instance that emitted this event.
             */
            parser: BracketParser
        ) => void;
        /**
         * Callback fired when parser resumes from a paused state.
         */
        type ResumeCallbackType = (
            /**
             * Parser instance that emitted this event.
             */
            parser: BracketParser
        ) => void;

        /**
         * Callback fired when a tag-on event is emitted.
         */
        type TagOnCallbackType = (
            /**
             * Parsed payload data of the current tag.
             */
            payload: Record<string, unknown>
        ) => void;
        /**
         * Callback fired when any tag-on event is emitted.
         */
        type AnyTagOnCallbackType = (
            /**
             * Name of the emitted tag.
             */
            tagName: string,
            /**
             * Parsed payload data of the current tag.
             */
            payload: Record<string, unknown>
        ) => void;
        /**
         * Callback fired when a tag-off event is emitted.
         */
        type TagOffCallbackType = (
            /**
             * Parsed payload data of the current tag.
             */
            payload: Record<string, unknown>
        ) => void;
        /**
         * Callback fired when any tag-off event is emitted.
         */
        type AnyTagOffCallbackType = (
            /**
             * Name of the emitted tag.
             */
            tagName: string,
            /**
             * Parsed payload data of the current tag.
             */
            payload: Record<string, unknown>
        ) => void;
        /**
         * Callback fired when parser emits plain content.
         */
        type ContentCallbackType = (
            /**
             * Parsed content string.
             */
            content: string
        ) => void;
    }
}

/**
 * Bracket parser that parses tags and content with payload support.
 */
declare class BracketParser extends BracketParserBase {
    /**
     * Create a bracket parser instance.
     *
     * @param config - Optional parser configuration.
     */
    constructor(config?: BracketParser.IConfig);
}
