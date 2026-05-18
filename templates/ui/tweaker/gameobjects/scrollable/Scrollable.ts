import ScrollableBase from '../../../scrollablepanel/ScrollablePanel';
import BindingTargetMethods from './BindingTargetMethods';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods';
import SetReadOnlyMethods from './SetReadOnlyMethods';

class Scrollable extends ScrollableBase {
    childrenMap: any;
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexTweaker.Scrollable';
    }

    setTitle(config?: any) {
        var title = this.childrenMap.header;
        if (config.text || config.title || config.icon) {
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
    SetReadOnlyMethods,
)

export default Scrollable;