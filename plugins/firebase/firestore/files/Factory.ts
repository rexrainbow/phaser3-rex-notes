import Files from './Files';
import ObjectFactory from '../../ObjectFactory';
import SetValue from '../../../utils/object/SetValue';

ObjectFactory.register('files', function(config?: any) {
    return new Files(config);
});

SetValue(window, 'RexPlugins.Fire.Files', Files);

export default Files;