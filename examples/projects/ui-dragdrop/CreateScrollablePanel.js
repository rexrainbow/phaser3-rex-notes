import { COLOR_LIGHT, COLOR_PRIMARY, COLOR_DARK } from './Const.js';
import CreateColumnPanelsBox from './CreateColumnPanelsBox.js';

var CreateScrollablePanel = function (scene, itemCountArray) {
    var scrollablePanel = scene.rexUI.add.scrollablePanel({
        width: 400, height: 400,

        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            strokeColor: COLOR_DARK
        }),

        panel: {
            child: CreateColumnPanelsBox(scene, itemCountArray),
            mask: {
                padding: 2,
                updateMode: 'everyTick'
            },
        },

        sliderX: {
            track: { width: 20, radius: 10, color: COLOR_DARK },
            thumb: { radius: 13, color: COLOR_LIGHT }
        },

        sliderY: {
            track: { width: 20, radius: 10, color: COLOR_DARK },
            thumb: { radius: 13, color: COLOR_LIGHT }
        },

        scrollerX: false,
        scrollerY: false,

        space: {
            left: 10, right: 10, top: 10, bottom: 10,

            sliderX: 10, sliderY: 10
        },
    })

    return scrollablePanel;
}

export default CreateScrollablePanel;