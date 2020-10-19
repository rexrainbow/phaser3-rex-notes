import OverlapSizer from '../overlapsizer/OverlapSizer.js';
import PerspectiveCard from '../perspectivecard/PerspectiveCard.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class PerspectivePanel extends OverlapSizer {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexPerspectivePanel';

        var background = GetValue(config, 'background', undefined);
        var back = GetValue(config, 'back', undefined);
        var front = GetValue(config, 'front', undefined);

        if (background) {
            this.addBackground(background);
        }
        if (back) {
            this.add(back, 'back');
            back.setVisible(false);
        }
        if (front) {
            this.add(front, 'front');
            front.setVisible(false);
        }
    }
}

export default PerspectivePanel;