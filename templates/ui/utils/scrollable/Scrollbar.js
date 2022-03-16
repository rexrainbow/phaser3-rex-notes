import Sizer from '../../sizer/Sizer.js';
import Slider from '../../slider/Slider.js';
import TouchState from '../../touchstate/TouchState.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Scrollbar extends Sizer {
    constructor(scene, config) {
        super(scene, config);

        var background = GetValue(config, 'background', undefined);
        // background is used in scrollbar, to cover slider and buttons
        if (background) {
            this.addBackground(background);
            delete config.background;
        }

        var slider = new Slider(scene, config);
        var button0 = GetValue(config, 'buttons.top', GetValue(config, 'buttons.left', undefined));
        var button1 = GetValue(config, 'buttons.bottom', GetValue(config, 'buttons.right', undefined));
        var step = GetValue(config, 'buttons.step', 0.01);

        if (button0) {
            this.add(button0);

            var touchState = new TouchState(button0);
            touchState
                .on('intouch', function () {
                    slider.value -= step;
                })
        }

        this.add(slider,
            {
                proportion: 1
            }
        );

        if (button1) {
            this.add(button1);

            var touchState = new TouchState(button1);
            touchState
                .on('intouch', function () {
                    slider.value += step;
                })
        }

        this.addChildrenMap('slider', slider);
        this.addChildrenMap('buttons', [button0, button1]);
    }
}

export default Scrollbar;