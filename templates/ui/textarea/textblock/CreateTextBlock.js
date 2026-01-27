import { TagTextType } from '../../../../plugins/utils/text/GetTextObjectType.js';
import GetTextObjectType from '../../../../plugins/utils/text/GetTextObjectType.js';
import TextBlock from './TextBlock.js';
import TagTextBlock from './TagTextBlock.js';

var CreateTextBlock = function (scene, config) {
    var textObject = (config) ? config.text : undefined;
    var textBlock;
    if (textObject && (GetTextObjectType(textObject) === TagTextType)) {
        textBlock = new TagTextBlock(scene, config);
    } else {
        textBlock = new TextBlock(scene, config);
    }

    return textBlock;
};

export default CreateTextBlock;
