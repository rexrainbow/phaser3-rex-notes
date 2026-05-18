import LayoutBase from '../utils/Layout';
import BuildGraphData from './BuildGraphData';
import RunLayout from './RunLayout';
import PlaceGameObjects from './PlaceGameObjects';

var LayoutConfig = {
    buildGraphData: BuildGraphData,
    isAsyncRunLayout: false,
    runLayout: RunLayout,
    placeGameObjects: PlaceGameObjects,
}

var Layout = async function(graph?: any, config?: any) {
    if (config === undefined) {
        config = {};
    }
    await LayoutBase(LayoutConfig, graph, config);
}

export default Layout;