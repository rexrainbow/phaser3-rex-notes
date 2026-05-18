import TextManager from '../../../../../utils/text/textmanager/TextManager';
import OnParseSetTextTag from './OnParseSetTextTag';
import OnParseTypingTextTag from './OnParseTypingTextTag';

const ParseCallbacks = [
    OnParseSetTextTag,
    OnParseTypingTextTag
];

var AddTextManager = function(config?: any) {
    if (config === undefined) {
        config = {};
    }
    config.name = 'text';
    config.parseCallbacks = ParseCallbacks;
    this.addGameObjectManager(config, TextManager);
}

export default AddTextManager;