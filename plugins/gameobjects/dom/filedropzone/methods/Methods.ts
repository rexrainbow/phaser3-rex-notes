import Resize from '../../utils/Resize';
import SyncTo from '../../utils/SyncTo';
import LoadFileMethods from '../../utils/LoadFileMethods';
import DropEnableMethods from './DropEnableMethods';
import FilterMethods from './FilterMethods';

var Methods = {
    resize: Resize,
    syncTo: SyncTo,
}

Object.assign(
    Methods,
    DropEnableMethods,
    FilterMethods,
    LoadFileMethods,
)

export default Methods;