import AddChildMask from '../../../plugins/gameobjects/container/containerlite/mask/AddChildMask.js';
import IsWebGLRenderMode from '../../../plugins/utils/system/IsWebGLRenderMode.js';
import RegisterFilter from '../../../plugins/utils/renderer/filterpluginbase/RegisterFilter.js';
import { CircleFilter, CircleController } from '../../../plugins/circlefilter.js';

var AddChildCircleMask = function (parent, child) {
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