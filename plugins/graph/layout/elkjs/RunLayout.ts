import ELK from '../../../utils/elkjs/elk.bundled';

var RunLayout = async function(graphData?: any, config?: any) {
    if (config === undefined) {
        config = {};
    }

    var elk = new ELK();
    graphData = await elk.layout(graphData, config.layoutConfig);
}

export default RunLayout;