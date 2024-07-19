import ScrollableBase from '../../../scrollablepanel/ScrollablePanel.js';
import BindingTargetMethods from './BindingTargetMethods.js';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods.js';

class Scrollable extends ScrollableBase {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexTweaker.Scrollable';
    }

    setTitle(config) {
        var title = this.childrenMap.header;

        if (config.title || config.icon) {
            title.show().setTitle(config);
        } else {
            title.hide();
        }

        return this;
    }
}

Object.assign(
    Scrollable.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
)

export default Scrollable;