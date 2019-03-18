import Sizer from '../sizer/Sizer.js';
import TextBlock from '../textblock/TextBlock.js';
import Slider from '../slider/Slider.js';
import Scroller from '../../../plugins/scroller.js';

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
        var textSpace = GetValue(config, 'space.table', 0);


        if (background) {
            this.addBackground(background);
        }

        var textWidth = GetValue(config, 'textWidth', undefined);
        var textHeight = GetValue(config, 'textHeight', undefined);
        var textblock = new TextBlock(scene, {
            width: textWidth,
            height: textHeight,
            text: textObject,
        });
        var padding = {
            left: paddingLeft,
            right: (sliderConfig) ? textSpace : paddingRight,
            top: paddingTop,
            bottom: paddingBottom
        }
        var proportion = (textWidth === undefined) ? 1 : 0;
        this.add(textblock, proportion, 'center', padding, true);

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
            scroller = new Scroller(textblock, scrollerConfig);
        }

        // Control
        var ignored = false; // Set true to ignore event handler
        if (slider) {
            slider.on('valuechange', function (newValue) {
                if (ignored) {
                    ignored = false;
                    return;
                }
                table.setTableOYByPercentage(newValue).updateTable();
                // reflect to scroller
                if (scroller) {
                    ignored = true;
                    scroller.setValue(table.tableOY);
                }
            })
        }

        this.addChildrenMap('background', background);
        this.addChildrenMap('text', textObject);
        this.addChildrenMap('slider', slider);
        this.addChildrenMap('scroller', scroller);
    }
}

export default TextArea;