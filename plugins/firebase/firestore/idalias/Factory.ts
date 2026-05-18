import IdAlias from './IdAlias';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils//object/SetValue';

ObjectFactory.register('idAlias', function(config?: any) {
    return new IdAlias(config);
});

SetValue(window, 'RexPlugins.Fire.IdAlias', IdAlias);

export default IdAlias;