import ELK from '../../../utils/elkjs/elk.bundled.js';

var RunLayout = async function (graphData, config) {
    var elk = new ELK();
    graphData = await elk.layout(graphData, {
        layoutOptions: config.layoutOptions,
    });
}

export default RunLayout;