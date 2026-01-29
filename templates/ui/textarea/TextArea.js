import Scrollable from '../utils/scrollable/Scrollable.js';
import { TagTextType } from '../../../plugins/utils/text/GetTextObjectType.js';
import GetTextObjectType from '../../../plugins/utils/text/GetTextObjectType.js';
import TextBlock from './textblock/TextBlock.js';
import TagTextBlock from './textblock/TagTextBlock.js';
import InjectProperties from './InjectProperties.js';
import SetTextMethods from './SetTextMethods.js';
import ScrollMethods from './ScrollMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextArea extends Scrollable {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        // Create text-block
        var textObject = GetValue(config, 'text', undefined);
        var textWidth = GetValue(config, 'textWidth', undefined);
        var textHeight = GetValue(config, 'textHeight', undefined);
        var textCrop = GetValue(config, 'textCrop', !!textObject.setCrop);
        var textMask = GetValue(config, 'textMask', !textCrop);
        var content = GetValue(config, 'content', '');
        var textBlockConfig = {
            width: textWidth,
            height: textHeight,
            text: textObject,
            textMask: textMask,
            textCrop: textCrop && !textMask,
            content: content,
            clampTextOY: GetValue(config, 'clampChildOY', false),
            alwaysScrollable: GetValue(config, 'alwaysScrollable', false),
        };
        var textBlock;
        if (textObject && (GetTextObjectType(textObject) === TagTextType)) {
            textBlock = new TagTextBlock(scene, textBlockConfig);
        } else {
            textBlock = new TextBlock(scene, textBlockConfig);
        }
        scene.add.existing(textBlock); // Important: Add to display list for touch detecting
        // Inject properties for scrollable interface
        InjectProperties(textBlock);

        // Fill config of scrollable
        config.scrollMode = 0; // Vertical
        config.type = 'rexTextArea';
        config.child = {
            gameObject: textBlock,
            expandWidth: (textWidth === undefined),
            expandHeight: (textHeight === undefined),
        };
        var spaceConfig = GetValue(config, 'space', undefined);
        if (spaceConfig) {
            spaceConfig.child = GetValue(spaceConfig, 'text', 0);
        }

        super(scene, config);

        this.addChildrenMap('text', textObject);
    }

    get text() {
        var textBlock = this.childrenMap.child;
        return textBlock.text;
    }

    get lineIndex() {
        var textBlock = this.childrenMap.child;
        return textBlock.lineIndex;
    }

    get linesCount() {
        var textBlock = this.childrenMap.child;
        return textBlock.linesCount;
    }

    get contentHeight() {
        var textBlock = this.childrenMap.child;
        return textBlock.textHeight;
    }
}

Object.assign(
    TextArea.prototype,
    SetTextMethods,
    ScrollMethods,
);

export default TextArea;
