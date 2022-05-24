import MergeStyle from './utils/MergeStyle.js';
import BadgeLabel from '../../badgelabel/BadgeLabel.js';
import CreateChild from './utils/CreateChild.js';

var CreateBadgeLabel = function (scene, data, styles, customBuilders) {
    data = MergeStyle(data, styles);

    // Replace data by child game object
    CreateChild(scene, data, 'background', styles, customBuilders);
    CreateChild(scene, data, 'main', styles, customBuilders);
    CreateChild(scene, data, 'leftTop', styles, customBuilders);
    CreateChild(scene, data, 'centerTop', styles, customBuilders);
    CreateChild(scene, data, 'rightTop', styles, customBuilders);
    CreateChild(scene, data, 'leftCenter', styles, customBuilders);
    CreateChild(scene, data, 'center', styles, customBuilders);
    CreateChild(scene, data, 'rightCenter', styles, customBuilders);
    CreateChild(scene, data, 'leftBottom', styles, customBuilders);
    CreateChild(scene, data, 'centerBottom', styles, customBuilders);
    CreateChild(scene, data, 'rightBottom', styles, customBuilders);

    var gameObject = new BadgeLabel(scene, data);
    scene.add.existing(gameObject);
    return gameObject;
}

export default CreateBadgeLabel;