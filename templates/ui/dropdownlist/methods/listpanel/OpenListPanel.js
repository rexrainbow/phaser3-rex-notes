import CreateListPanel from './CreateListPanel.js';
import GetViewport from '../../../../../plugins/utils/system/GetViewport.js';

var OpenListPanel = function () {
    if (this.listPanel) {
        return this;
    }

    var scene = this.scene;
    // Expand direction
    var isExpandDown = (this.listExpandDirection === 0);
    var isExpandUp = (this.listExpandDirection === 1);
    var flexExpand = !isExpandDown && !isExpandUp;

    var listPanel = CreateListPanel.call(this, scene);

    var originX = 0;
    var originY = (isExpandDown || flexExpand) ? 0 : 1;
    listPanel
        .setOrigin(originX, originY)
        .layout();

    var x = this.getElement(this.listAlignMode).getTopLeft().x;
    var y = (isExpandDown || flexExpand) ? this.bottom : this.top;
    listPanel.setPosition(x, y);

    var bounds = this.listBounds;
    if (!bounds) {
        bounds = GetViewport(scene);
    }
    if (flexExpand && (listPanel.bottom > bounds.bottom)) {
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