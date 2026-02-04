import BracketParserBase from '../bracketparserbase/BracketParser';

export default BracketParser;

declare namespace BracketParser {
    interface IConfig extends BracketParserBase.IConfig {

    }

    namespace Events {
        type StartCallbackType = (parser: BracketParser) => void;
        type CompleteCallbackType = (parser: BracketParser) => void;
        type PauseCallbackType = (parser: BracketParser) => void;
        type ResumeCallbackType = (parser: BracketParser) => void;

        type TagOnCallbackType = (payload: Record<string, unknown>) => void;
        type AnyTagOnCallbackType = (tagName: string, payload: Record<string, unknown>) => void;
        type TagOffCallbackType = (payload: Record<string, unknown>) => void;
        type AnyTagOffCallbackType = (tagName: string, payload: Record<string, unknown>) => void;
        type ContentCallbackType = (content: string) => void;
    }
}

declare class BracketParser extends BracketParserBase {
    constructor(config?: BracketParser.IConfig);
}