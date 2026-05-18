import Graph from './Graph';
import ObjectFactory from '../ObjectFactory';
import SetValue from '../../utils/object/SetValue';

ObjectFactory.register('graph', function(config?: any) {
    return new Graph(this.scene, config);
});

SetValue(window, 'RexPlugins.Graph.Graph', Graph);

export default Graph;