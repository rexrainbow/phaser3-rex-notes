import CreateListPanel from './CreateListPanel.js';
import GetViewPort from '../../../../plugins/utils/system/GetViewport.js';

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

    var onButtonOver = this.listOnButtonOver;
    if (onButtonOver) {
        listPanel.on('button.over', onButtonOver, this);
    }

    var onButtonOut = this.listOnButtonOut;
    if (onButtonOut) {
        listPanel.on('button.out', onButtonOut, this);
    }

    listPanel
        .popUp(this.listEaseInDuration, 'y', 'Cubic')
        .once('popup.complete', function (listPanel) {
            // After popping up
            // Can click
            var onButtonClick = this.listOnButtonClick;
            if (onButtonClick) {
                listPanel.on('button.click', function (button, index, pointer, event) {
                    onButtonClick.call(this, button, index, pointer, event);
                    this.emit('list.click', this, listPanel, button, index, pointer, event);
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