import LayoutBase from '../utils/Layout.js';
import BuildGraphData from './BuildGraphData.js';
import RunLayout from './RunLayout.js';
import PlaceGameObjects from './PlaceGameObjects.js';

var callbacks = {
    buildGraphData: BuildGraphData,
    isAsyncRunLayout: false,
    runLayout: RunLayout,
    placeGameObjects: PlaceGameObjects,
}

var Layout = async function (graph, config) {
    if (config === undefined) {
        config = {};
    }
    await LayoutBase(callbacks, graph, config);
}

export default Layout;