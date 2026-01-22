import BaseGeom from '../base/BaseGeom';

/**
 * Base class for path-based geometries.
 */
export default class PathBase extends BaseGeom {
    /**
     * True if the path should be closed.
     */
    closePath: boolean;
}
