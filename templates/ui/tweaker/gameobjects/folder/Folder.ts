import FolderBase from '../../../folder/Folder';
import BindingTargetMethods from './BindingTargetMethods';
import InputRowTitleWidthMethods from './InputRowTitleWidthMethods';
import SetReadOnlyMethods from './SetReadOnlyMethods';

class Folder extends FolderBase {
    childrenMap: any;
    type: any;

    constructor(scene?: any, config?: any) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 1;

        super(scene, config);
        this.type = 'rexTweaker.Folder';
    }

    setTitle(config?: any) {
        var title = this.childrenMap.title;
        title.setTitle(config);
        return this;
    }

}

Object.assign(
    Folder.prototype,
    BindingTargetMethods,
    InputRowTitleWidthMethods,
    SetReadOnlyMethods,
)

export default Folder;