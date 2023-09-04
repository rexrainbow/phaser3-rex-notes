import UpdateBoundRectangle from './boundsrectangle/UpdateBoundRectangle.js';
import UpdateControlPoints from './controlpoints/UpdateControlPoints.js';

var Layout = function () {
    UpdateBoundRectangle(this);
    UpdateControlPoints(this);

    return this;
}

export default Layout;