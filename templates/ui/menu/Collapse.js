import GetEaseConfig from './GetEaseConfig.js';

var Collapse = function () {
    this.root.emit('collapse', this, this.parentButton, this.root);
    this.scaleDownDestroy(GetEaseConfig(this.root.easeOut, this));
    this.collapseSubMenu();
    return this;
}

export default Collapse;