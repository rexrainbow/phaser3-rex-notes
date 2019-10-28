import GetEaseConfig from './GetEaseConfig.js';

var Collapse = function () {
    var easeOut = GetEaseConfig(this, this.root.easeOut);
    this.scaleDownDestroy(easeOut);
    this.collapseSubMenu();
    return this;
}
export default Collapse;