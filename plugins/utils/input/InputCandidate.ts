import { GameObjects as PhaserGameObjects } from 'phaser';
const RENDER_MASK = PhaserGameObjects.GameObject.RENDER_MASK;

var InputCandidate = function(gameObject?: any) {
    if (gameObject.renderFlags !== RENDER_MASK) {
        return false;
    }

    var visible = true;
    var parent = gameObject.parentContainer;

    if (parent?: any) {
        do {
            if (parent.renderFlags !== RENDER_MASK) {
                visible = false;
                break;
            }

            parent = parent.parentContainer;

        } while (parent);
    }

    return visible;
}

export default InputCandidate;