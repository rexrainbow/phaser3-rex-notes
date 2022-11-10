import SingleLineInput from '../../../singlelineinput/SingleLineInput.js';
// import HasValue from '../../../../../plugins/utils/object/HasValue.js';
// import SetValue from '../../../../../plugins/utils/object/SetValue.js';
import DeepClone from '../../../../../plugins/utils/object/DeepClone.js';

var CreateSingleLineInput = function (scene, config) {
    config = (config) ? DeepClone(config) : {};

    //if (!HasValue(config, 'wrap.hAlign')) {
    //    SetValue(config, 'wrap.hAlign', 'right');
    //}

    var gameObject = new SingleLineInput(scene, config);
    scene.add.existing(gameObject);

    return gameObject;
}

export default CreateSingleLineInput;