import CreateListPanel from './CreateListPanel.js';
import GetViewPort from '../../../../plugins/utils/system/GetViewport.js';

var OpenListPanel = function () {
    if (this.listPanel) {
        return this;
    }

    var scene = this.scene;
    var listPanel = CreateListPanel(scene, this)
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

    listPanel.popUp(this.listEaseInDuration, 'y', 'Cubic')
        .on('popup.complete', function (listPanel) {
            listPanel.on('button.click', function () {

            }, this)

            scene.input.once('pointerup', this.closeListPanel, this);
        }, this);

    this.listPanel = listPanel;
    return this;
}

export default OpenListPanel;