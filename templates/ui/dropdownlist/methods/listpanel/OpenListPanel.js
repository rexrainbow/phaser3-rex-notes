import CreateListPanel from './CreateListPanel.js';
import GetViewPort from '../../../../../plugins/utils/system/GetViewport.js';

var OpenListPanel = function () {
    if (this.listPanel) {
        return this;
    }

    var scene = this.scene;
    var listPanel = CreateListPanel.call(this, scene)
        .setOrigin(0, 0)
        .layout();

    var x = this.getElement(this.listAlignMode).getTopLeft().x;
    listPanel.setPosition(x, this.bottom);

    var bounds = this.listBounds;
    if (!bounds) {
        bounds = GetViewPort(scene);
    }
    if (listPanel.bottom > bounds.bottom) {
        // Out of bounds, can't put list-panel below parent
        listPanel
            .changeOrigin(0, 1)
            .setPosition(x, this.top);
    }

    listPanel
        .on('button.over', function (button, index, pointer, event) {
            if (this.listOnButtonOver) {
                this.listOnButtonOver.call(this, button, index, pointer, event);
            }

            this.emit('button.over', this, listPanel, button, index, pointer, event);
        }, this)
        .on('button.out', function (button, index, pointer, event) {
            if (this.listOnButtonOut) {
                this.listOnButtonOut.call(this, button, index, pointer, event);
            }

            this.emit('button.out', this, listPanel, button, index, pointer, event);
        }, this);

    var duration = this.listEaseInDuration;
    this.listTransitInCallback(listPanel, duration);
    this.delayCall(duration, function () {
        // After popping up
        // Can click
        var onButtonClick = this.listOnButtonClick;
        if (onButtonClick) {
            listPanel.on('button.click', function (button, index, pointer, event) {
                onButtonClick.call(this, button, index, pointer, event);
                this.emit('button.click', this, listPanel, button, index, pointer, event);
            }, this);
        }

        // Can close list panel
        scene.input.once('pointerup', this.closeListPanel, this);

        this.emit('list.open', this, listPanel);
    }, this);

    this.pin(listPanel);

    this.listPanel = listPanel;

    return this;
}

export default OpenListPanel;