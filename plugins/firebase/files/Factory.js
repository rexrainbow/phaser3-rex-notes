import Files from './Files.js';
import ObjectFactory from '../ObjectFactory.js';
import SetValue from '../../utils/object/SetValue.js';

ObjectFactory.register('files', function (config) {
    return new Files(this.app, config);
});

SetValue(window, 'RexPlugins.Fire.Files', Files);

export default Files;