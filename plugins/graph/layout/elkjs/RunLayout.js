import ELK from '../../../utils/elkjs/elk.bundled.js';

var RunLayout = async function (graphData, config) {
    if (config === undefined) {
        config = {};
    }

    var elk = new ELK();
    graphData = await elk.layout(graphData, config.layoutConfig);
}

export default RunLayout;