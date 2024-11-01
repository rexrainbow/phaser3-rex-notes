import Buttons from '../../../buttons/Buttons.js';
import FixWidthButtons from '../../../fixwidthbuttons/FixWidthButtons.js';
import ScrollablePanel from '../../../scrollablepanel/ScrollablePanel.js';

const GetValue = Phaser.Utils.Objects.GetValue;

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

    var buttonConfig = {
        width: width,
        buttons: buttons,
        space: this.listSpace,
    }

    var buttons, listPanel;

    var isScrollable;
    if (this.listCreateSliderThumbCallback) {
        isScrollable = (height > 0) || (this.listMaxHeight > 0);
    } else {
        isScrollable = false;
    }

    if (!isScrollable) {
        buttonConfig.height = height;
        buttons = CreateButtons(scene, buttonConfig, this.listWrapEnable);
        listPanel = buttons;

    } else {
        var buttons = CreateButtons(scene, buttonConfig, this.listWrapEnable);

        if (this.listMaxHeight > 0) {
            buttons.layout();
            if (buttons.height <= this.listMaxHeight) {
                listPanel = buttons;
            }
        }

        if (!listPanel) {
            if (height === 0) {
                height = this.listMaxHeight;
            }

            var track = CreateGameObject(scene, this.listCreateSliderTrackCallback);
            var thumb = CreateGameObject(scene, this.listCreateSliderThumbCallback);

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

                scrollDetectionMode: 1,

                scroller: this.listScrollerConfig,

                mouseWheelScroller: this.listMouseWheelScrollerConfig,

                space: {
                    panel: GetValue(this.listSpace, 'panel', 0),
                },
            })
            scene.add.existing(listPanel);
        }
    }

    if (background) {
        listPanel.addBackground(background, 'background');
    }

    if (this.listDraggable) {
        listPanel.setDraggable(true);
    }

    if (listPanel !== buttons) {
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

var CreateButtons = function (scene, config, isWrapEnable) {
    var gameObject;
    if (!isWrapEnable) {
        config.orientation = 'y';
        gameObject = new Buttons(scene, config);
    } else {
        config.orientation = 'x';
        gameObject = new FixWidthButtons(scene, config);
    }
    scene.add.existing(gameObject);
    return gameObject;
}

var CreateGameObject = function (scene, callback, scope) {
    var gameObject;
    if (callback) {
        gameObject = callback.call(scope, scene);
        scene.add.existing(gameObject);
    }

    return gameObject;
}

export default CreateListPanel;