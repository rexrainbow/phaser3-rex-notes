import MergeStyle from './MergeStyle.js';
import NinePatch from '../../ninepatch/NinePatch.js';

var CreateNinePatch = function (scene, data, view, styles, customBuilders) {
    data = MergeStyle(data, styles);

    var gameObject = new NinePatch(scene, data);

    scene.add.existing(gameObject);
    return gameObject;
}
export default CreateNinePatch;