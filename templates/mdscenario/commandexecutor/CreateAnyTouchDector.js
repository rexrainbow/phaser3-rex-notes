import { FullWindowRectangle } from '../../ui/ui-components.js';
import ClickableWhenHidden from '../../../plugins/utils/gameobject/clickablewhenhidden/ClickableWhenHidden';

const GOClass = ClickableWhenHidden(FullWindowRectangle);
var CreateAnyTouchDector = function (scene, color, alpha) {
    var gameObject = new GOClass(scene, color, alpha);
    scene.add.existing(gameObject);
    gameObject.setInteractive();
    return gameObject;
}

export default CreateAnyTouchDector;