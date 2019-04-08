import Sizer from '../sizer/Sizer.js';
import TextBlock from '../textblock/TextBlock.js';
import Slider from '../slider/Slider.js';
import Scroller from '../../../plugins/scroller.js';
import SetText from './SetText.js';
import AppendText from './AppendText.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TextArea extends Sizer {
    constructor(scene, config) {
        // Create sizer
        config.orientation = 0; // Left-to-right
        super(scene, config);
        this.type = 'rexTextArea';

        // Add elements
        var background = GetValue(config, 'background', undefined);
        var textObject = GetValue(config, 'text', undefined);
        var sliderConfig = GetValue(config, 'slider', undefined);
        var scrollerConfig = GetValue(config, 'scrollerConfig', true);

        // Space
        var paddingLeft = GetValue(config, 'space.left', 0);
        var paddingRight = GetValue(config, 'space.right', 0);
        var paddingTop = GetValue(config, 'space.top', 0);
        var paddingBottom = GetValue(config, 'space.bottom', 0);
        var textSpace = GetValue(config, 'space.text', 0);


        if (background) {
            this.addBackground(background);
        }

        var textWidth = GetValue(config, 'textWidth', undefined);
        var textHeight = GetValue(config, 'textHeight', undefined);
        var textMask = GetValue(config, 'textMask', true);
        var textBlock = new TextBlock(scene, {
            width: textWidth,
            height: textHeight,
            text: textObject,
            textMask: textMask,
        });
        var proportion = (textWidth === undefined) ? 1 : 0;
        var padding = {
            left: paddingLeft,
            right: (sliderConfig) ? textSpace : paddingRight,
            top: paddingTop,
            bottom: paddingBottom
        }
        var expand = (textHeight === undefined);
        this.add(textBlock, proportion, 'center', padding, expand);

        var slider;
        if (sliderConfig) {
            if (sliderConfig === true) {
                sliderConfig = {};
            }
            sliderConfig.orientation = this.orientation;
            slider = new Slider(scene, sliderConfig);
            var padding = {
                left: 0,
                right: paddingRight,
                top: paddingTop,
                bottom: paddingBottom
            }
            this.add(slider, 0, 'center', padding, true);
        }

        var scroller;
        if (scrollerConfig) {
            if (scrollerConfig === true) {
                scrollerConfig = {};
            }
            scroller = new Scroller(textBlock, scrollerConfig);
        }

        // Control
        if (slider) {
            slider.on('valuechange', function (newValue) {
                textBlock.t = newValue;
                this.updateController();
            }, this);
        }
        if (scroller) {
            scroller.on('valuechange', function (newValue) {
                textBlock.textOY = newValue;
                this.updateController();
            }, this);
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('text', textObject);
        this.addChildrenMap('textBlock', textBlock);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('scroller', scroller);
    }

    updateController() {
        var textBlock = this.childrenMap.textBlock;
        var scroller = this.childrenMap.scroller;
        var slider = this.childrenMap.slider;
        if (scroller) {
            scroller.setValue(textBlock.textOY);
        }
        if (slider) {
            slider.setValue(textBlock.t);
        }
    }

    get text() {
        return this.childrenMap.textBlock.text;
    }

    get linesCount() {
        return this.childrenMap.textBlock.linesCount;
    }

    set t(value) {
        this.childrenMap.textBlock.t = value;
        this.updateController();
    }

    get t() {
        return this.childrenMap.textBlock.t;
    }

    setTextOYByPercentage(percentage) {
        this.t = percentage;
        return this;
    }

    get textOY() {
        return this.childrenMap.textBlock.textOY;
    }

    set textOY(value) {
        this.childrenMap.textBlock.textOY = value;
        this.updateController();
    }

    setTextOY(value) {
        this.textOY = value;
        return this;
    }

    get topTextOY() {
        return this.childrenMap.textBlock.topTextOY;
    }

    get bottomTextOY() {
        return this.childrenMap.textBlock.bottomTextOY;
    }

    scrollToTop() {
        this.t = 0;
        return this;
    }

    scrollToBottom() {
        this.t = 1;
        return this;
    }
}

var methods = {
    setText: SetText,
    appendText: AppendText,
}
Object.assign(
    TextArea.prototype,
    methods
);

export default TextArea;