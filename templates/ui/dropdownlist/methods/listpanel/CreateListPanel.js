import Buttons from '../../../buttons/Buttons.js';
import FixWidthButtons from '../../../fixwidthbuttons/FixWidthButtons.js';
import ScrollablePanel from '../../../scrollablepanel/ScrollablePanel.js';

var CreateListPanel = function () {
    var scene = this.scene;

    var background;
    var createBackgroundCallback = this.listCreateBackgroundCallback;
    if (createBackgroundCallback) {
        background = createBackgroundCallback.call(this, scene);
        scene.add.existing(background);
    }

    var buttons = [];
    var createButtonCallback = this.listCreateButtonCallback;
    if (createButtonCallback) {
        var options = this.options;
        for (var i = 0, cnt = options.length; i < cnt; i++) {
            var button = createButtonCallback.call(this, scene, options[i], i, options);
            if (!button) {
                continue;
            }
            scene.add.existing(button);
            buttons.push(button);
        }
    }

    var width = this.listWidth;
    if (width === undefined) {
        if (this.listAlignMode === 'text') {
            width = this.getElement('text').width;
        } else {
            width = this.width;
        }
    }

    var height = this.listHeight;

    var listPanel;
    var isScrollable = (height > 0) && (this.listCreateSliderThumbCallback);
    if (!isScrollable) {
        if (!this.listWrapEnable) {
            listPanel = new Buttons(scene, {
                width: width, height: height,
                orientation: 'y',

                background: background,
                buttons: buttons,

                space: this.listSpace,
                draggable: this.listDraggable,
            });
        } else {
            listPanel = new FixWidthButtons(scene, {
                width: width, height: height,
                orientation: 'x',

                background: background,
                buttons: buttons,

                space: this.listSpace,
                draggable: this.listDraggable,
            });
        }
        scene.add.existing(listPanel);

    } else {
        var buttons;
        if (!this.listWrapEnable) {
            buttons = new Buttons(scene, {
                width: width,
                orientation: 'y',

                buttons: buttons,

                space: this.listSpace,
                draggable: this.listDraggable,
            });
        } else {
            buttons = new FixWidthButtons(scene, {
                width: width,
                orientation: 'x',

                buttons: buttons,

                space: this.listSpace,
            });
        }
        scene.add.existing(buttons);

        var track;
        var createSliderTrackCallback = this.listCreateSliderTrackCallback;
        if (createSliderTrackCallback) {
            track = createSliderTrackCallback.call(this, scene);
            scene.add.existing(track);
        }

        var thumb;
        var createSliderThumbCallback = this.listCreateSliderThumbCallback;
        if (createSliderThumbCallback) {
            thumb = createSliderThumbCallback.call(this, scene);
            scene.add.existing(thumb);
        }

        listPanel = new ScrollablePanel(scene, {
            height: height,
            scrollMode: 0,

            panel: {
                child: buttons,
                mask: {
                    padding: 1,
                },
            },

            slider: {
                track: track,
                thumb: thumb,

                adaptThumbSize: this.listSliderAdaptThumbSizeEnable,
            },

            background: background,
            draggable: this.listDraggable,
        })
        scene.add.existing(listPanel);

        // Route buttons' events to listPanel
        buttons
            .on('button.over', function (button, index, pointer, event) {
                listPanel.emit('button.over', button, index, pointer, event)
            })
            .on('button.out', function (button, index, pointer, event) {
                listPanel.emit('button.out', button, index, pointer, event)
            })
            .on('button.click', function (button, index, pointer, event) {
                listPanel.emit('button.click', button, index, pointer, event)
            })
    }

    return listPanel;
}

export default CreateListPanel;