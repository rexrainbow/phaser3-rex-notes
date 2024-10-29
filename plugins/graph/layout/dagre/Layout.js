import LayoutBase from '../utils/Layout.js';
import BuildGraphData from './BuildGraphData.js';
import RunLayout from './RunLayout.js';
import PlaceGameObjects from './PlaceGameObjects.js';

var LayoutConfig = {
    buildGraphData: BuildGraphData,
    isAsyncRunLayout: false,
    runLayout: RunLayout,
    placeGameObjects: PlaceGameObjects,
}

var Layout = async function (graph, userConfig) {
    if (userConfig === undefined) {
        userConfig = {};
    }
    await LayoutBase(LayoutConfig, graph, userConfig);
}

export default Layout;