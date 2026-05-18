import UpdateBoundRectangle from './boundsrectangle/UpdateBoundRectangle';
import UpdateControlPoints from './controlpoints/UpdateControlPoints';

var Layout = function() {
    UpdateBoundRectangle(this);
    UpdateControlPoints(this);

    return this;
}

export default Layout;