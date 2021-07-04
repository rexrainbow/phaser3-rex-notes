
import BoardFactory from './board/board/Factory.js';

declare class Factories {
    board: typeof BoardFactory
}

export default class BoardPlugin extends Phaser.Plugins.ScenePlugin {
    add: Factories
}


// Export class definitions
import Board from './board/board/Board';

export {
    Board
}
