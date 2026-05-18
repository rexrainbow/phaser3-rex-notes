import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask';
import IsWebGLRenderMode from '../../../plugins/utils/system/IsWebGLRenderMode';
import RegisterFilter from '../../../plugins/utils/renderer/filterpluginbase/RegisterFilter';
import { CircleFilter, CircleController } from '../../../plugins/circlefilter';

var AddChildCircleMask = function(parent?: any, child?: any) {
    if (IsWebGLRenderMode(parent)) {
        RegisterFilter(parent, CircleFilter);

        child.enableFilters().focusFilters()
        var filterList = child.filters.internal
        filterList.add(
            new CircleController(filterList.camera, { thickness: 0 })
        );

        child.filtersFocusContext = false;

    } else {
        return AddChildMask.call(parent, child, child, 1); // Circle mask
    }
}

export default AddChildCircleMask;