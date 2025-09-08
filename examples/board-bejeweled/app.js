import phaser from 'phaser/src/phaser.js';
import BoardPlugin from '../../plugins/board-plugin.js';
import Bejeweled from '../../templates/bejeweled/Bejeweled.js';

const CELLSIZE = 60;


const PIECE_TYPES = {
    RED: 0, BLUE: 1, GREEN: 2, YELLOW: 3, PURPLE: 4, ORANGE: 5,
    H: 6,
    V: 7,
    SNOW: 8
};
const SYMBOL_KEY = 'symbol';
const GeneralPieceTypes = [
    PIECE_TYPES.RED,
    PIECE_TYPES.BLUE,
    PIECE_TYPES.GREEN,
    PIECE_TYPES.YELLOW,
    PIECE_TYPES.PURPLE,
    PIECE_TYPES.ORANGE
];

class PieceSystem {
    constructor({ types, cellSize = 60, meta } = {}) {
        this.types = types;
        this.cellSize = cellSize;

        this.meta = meta ?? {
            [types.RED]: { key: 'diamond', color: 0xDC143C, swappable: true, clickable: false },
            [types.BLUE]: { key: 'diamond', color: 0x1E90FF, swappable: true, clickable: false },
            [types.GREEN]: { key: 'diamond', color: 0x32CD32, swappable: true, clickable: false },
            [types.YELLOW]: { key: 'diamond', color: 0xFFD700, swappable: true, clickable: false },
            [types.PURPLE]: { key: 'diamond', color: 0x9400D3, swappable: true, clickable: false },
            [types.ORANGE]: { key: 'diamond', color: 0xFF8C00, swappable: true, clickable: false },

            [types.H]: { key: 'horizontal', color: 0xF5F5F5, swappable: true, clickable: true },
            [types.V]: { key: 'vertical', color: 0xF5F5F5, swappable: true, clickable: true },
            [types.SNOW]: { key: 'snowflake', color: 0xF5F5F5, swappable: true, clickable: true },
        };

        this.DATA_KEYS = {
            SYMBOL: SYMBOL_KEY,
            NEW_SYMBOL: 'newSymbol',
            MOVE_TO_XY: 'moveToXY',
            SWAPPABLE: 'swappable',
            CLICKABLE: 'clickable',
        };

        this._onSymbolChanged = this._onSymbolChanged.bind(this);
    }

    createGameObject(board) {
        const scene = board.scene;
        const go = scene.add.image();
        go.setDataEnabled();
        go.data.events.on('changedata-symbol', this._onSymbolChanged);
        return go;
    }

    _onSymbolChanged(gameObject, value /* new symbol */, previousValue) {
        const cfg = this.meta[value];
        if (!cfg) return;

        gameObject
            .setTexture(cfg.key)
            .setTint(cfg.color)
            .setData(this.DATA_KEYS.SWAPPABLE, cfg.swappable)
            .setData(this.DATA_KEYS.CLICKABLE, cfg.clickable);

        const size = this.cellSize * 0.9;
        gameObject.setDisplaySize(size, size);
    }

    clickAction(chess, board, bejeweled) {
        const symbol = chess.getData(this.DATA_KEYS.SYMBOL);
        const tileXY = bejeweled.chessToTileXY(chess);

        const set = new Set();

        const pushAll = (arr) => arr.forEach(p => set.add(p));

        switch (symbol) {
            case this.types.H: {
                const arr = [];
                bejeweled.getChessArrayAtTileY(tileXY.y, arr);
                pushAll(arr);
                break;
            }
            case this.types.V: {
                const arr = [];
                bejeweled.getChessArrayAtTileX(tileXY.x, arr);
                pushAll(arr);
                break;
            }
            case this.types.SNOW: {
                const ys = [tileXY.y - 1, tileXY.y, tileXY.y + 1];
                const xs = [tileXY.x - 1, tileXY.x, tileXY.x + 1];

                for (const y of ys) {
                    const arr = [];
                    bejeweled.getChessArrayAtTileY(y, arr);
                    pushAll(arr);
                }
                for (const x of xs) {
                    const arr = [];
                    bejeweled.getChessArrayAtTileX(x, arr);
                    pushAll(arr);
                }
                break;
            }
            default:
                return;
        }

        bejeweled.setEliminatingChess(Array.from(set));
    }

    processMatches(lines, board, bejeweled) {
        for (const line of lines) {
            const parts = [`Match ${line.size}`];
            for (const piece of line) {
                const { x, y } = board.chessToTileXYZ(piece);
                parts.push(`(${x},${y})`);
            }
            console.log(parts.join(' '));
        }

        for (let i = 0; i < lines.length; i++) {
            const setA = lines[i];
            let hasIntersection = false;

            for (let j = i + 1; j < lines.length; j++) {
                const setB = lines[j];
                const intersection = bejeweled.intersection(setA, setB);
                if (intersection.size === 0) continue;

                hasIntersection = true;
                let intersectionChess = null;
                let intersectionTileXYZ = null;

                const coords = [];
                for (const piece of intersection) {
                    intersectionTileXYZ = board.chessToTileXYZ(piece);
                    if (intersectionTileXYZ) coords.push(`(${intersectionTileXYZ.x},${intersectionTileXYZ.y})`);
                    intersectionChess = piece;
                    break;
                }
                console.log(`Intersection Line ${i} ∩ Line ${j} -> ${intersection.size}: ${coords.join(' ')}`);

                intersectionChess.setData(this.DATA_KEYS.NEW_SYMBOL, this.types.SNOW);

                const intersectionXY = { x: intersectionChess.x, y: intersectionChess.y };
                for (const p of setA) p.setData(this.DATA_KEYS.MOVE_TO_XY, intersectionXY);
                for (const p of setB) p.setData(this.DATA_KEYS.MOVE_TO_XY, intersectionXY);
            }

            if (!hasIntersection && setA.size > 3) {
                const arr = Array.from(setA);
                const isHorizontal = arr[0].rexChess.tileXYZ.y === arr[1].rexChess.tileXYZ.y;
                const newSymbol = isHorizontal ? this.types.H : this.types.V;

                const s1 = bejeweled.getSelectedChess1();
                const s2 = bejeweled.getSelectedChess2();

                let newChessXY = null;
                if (s1 && setA.has(s1)) {
                    s1.setData(this.DATA_KEYS.NEW_SYMBOL, newSymbol);
                    newChessXY = { x: s1.x, y: s1.y };
                } else if (s2 && setA.has(s2)) {
                    s2.setData(this.DATA_KEYS.NEW_SYMBOL, newSymbol);
                    newChessXY = { x: s2.x, y: s2.y };
                } else {
                    arr[0].setData(this.DATA_KEYS.NEW_SYMBOL, newSymbol);
                    newChessXY = { x: arr[0].x, y: arr[0].y };
                }

                for (const p of setA) {
                    p.setData(this.DATA_KEYS.MOVE_TO_XY, newChessXY);
                }
            }
        }
    }

    async eliminatingAction(chessArray, board, bejeweled) {
        const scene = board.scene;
        const duration = 500;

        for (let i = 0; i < chessArray.length; i++) {
            const gameObject = chessArray[i];

            const moveToXY = gameObject.getData(this.DATA_KEYS.MOVE_TO_XY);
            if (moveToXY) {
                scene.tweens.add({
                    targets: gameObject,
                    x: moveToXY.x,
                    y: moveToXY.y,
                    duration: duration - 10
                });
            }

            const fadeTween = scene.tweens.add({
                targets: gameObject,
                alpha: 0,
                duration,
                onComplete(tw, targets) {
                    targets[0].destroy();
                }
            });

            bejeweled.waitEvent(fadeTween, 'complete');

            const newSymbol = gameObject.getData(this.DATA_KEYS.NEW_SYMBOL);
            if (newSymbol !== undefined) {
                const { x, y, z } = gameObject.rexChess.tileXYZ; // z 未使用，但保留語意
                const newChess = bejeweled.createChess(x, y, newSymbol).setAlpha(0);

                const appearTween = scene.tweens.add({
                    targets: newChess,
                    alpha: 1,
                    delay: duration / 2,
                    duration
                });

                bejeweled.waitEvent(appearTween, 'complete');
            }
        }
    }
}

class ScoreSystem {

    constructor(cfg = {}) {
        this.types = cfg.types;
        this.symbolKey = cfg.symbolKey ?? SYMBOL_KEY;
        this.cfg = Object.assign(
            {
                basePerPiece: 10,
                combo: { mode: 'linear', base: 1, step: 0.5, maxMultiplier: 5 },
                specialMultiplier: {
                    [this.types.H]: 1.5,
                    [this.types.V]: 1.5,
                    [this.types.SNOW]: 2.0,
                },
                lengthBonusPerExtra: 5,
                simultaneousLinesBonus: 10,
                intersectionBonus: 20,
            },
            cfg
        );

        this.bj = null;
        this.state = {
            combo: 0,
            lastMatchMeta: null, // { lineLens:number[], linesCount:number, intersections:number, totalUnique:number }
        };
    }

    attach(bejeweled) {
        this.bj = bejeweled;
        if (bejeweled.getData('scores') == null) bejeweled.setData('scores', 0);
        if (bejeweled.getData('combo') == null) bejeweled.setData('combo', 0);

        bejeweled
            .on('match-start', (board, bj) => this.onMatchStart(board, bj))
            .on('match', (lines, board, bj) => this.onMatch(lines, board, bj))
            .on('eliminate', (chessArray, board, bj) => this.onEliminate(chessArray, board, bj))
            .on('match-end', (board, bj) => this.onMatchEnd(board, bj));
    }

    onMatchStart(_board, bj) {
        this.state.combo = 0;
        bj.setData('combo', 0);
        this.state.lastMatchMeta = null;
    }

    onMatch(lines, board, bj) {
        this.state.combo += 1;
        bj.setData('combo', this.state.combo);
        this.state.lastMatchMeta = this._computeMatchMeta(lines, board);
    }

    onEliminate(chessArray, _board, bj) {
        const base = chessArray.length * this.cfg.basePerPiece;

        const matchBonus = this._getMatchBonus();

        const comboMult = this._getComboMultiplier();

        const specialMult = this._getSpecialUseMultiplier(chessArray);

        const delta = Math.round((base + matchBonus) * comboMult * specialMult);
        bj.incData('scores', delta);

        this.state.lastMatchMeta = null;
    }

    onMatchEnd(_board, bj) {
        this.state.combo = 0;
        bj.setData('combo', 0);
        this.state.lastMatchMeta = null;
    }

    _computeMatchMeta(lines, board) {
        const lineLens = lines.map(s => s.size);
        let intersections = 0;
        for (let i = 0; i < lines.length; i++) {
            for (let j = i + 1; j < lines.length; j++) {
                if (this._setIntersectionSize(lines[i], lines[j]) > 0) intersections += 1;
            }
        }
        const uniq = new Set();
        lines.forEach(s => s.forEach(p => uniq.add(p)));
        return {
            lineLens,
            linesCount: lines.length,
            intersections,
            totalUnique: uniq.size,
        };
    }

    _setIntersectionSize(a, b) {
        let cnt = 0;
        for (const x of a) if (b.has(x)) cnt++;
        return cnt;
    }

    _getMatchBonus() {
        const m = this.state.lastMatchMeta;
        if (!m) return 0;

        const lenBonus = m.lineLens.reduce(
            (acc, len) => acc + Math.max(0, len - 3) * this.cfg.lengthBonusPerExtra,
            0
        );
        const linesBonus =
            (m.linesCount > 1 ? (m.linesCount - 1) * this.cfg.simultaneousLinesBonus : 0);
        const interBonus = m.intersections * this.cfg.intersectionBonus;

        return lenBonus + linesBonus + interBonus;
    }

    _getComboMultiplier() {
        const { mode, base, step, maxMultiplier } = this.cfg.combo;
        const n = Math.max(0, this.state.combo - 1);
        let mult = base;
        if (mode === 'linear') {
            mult = base + step * n;
        } else if (mode === 'expo') {
            mult = base * Math.pow(1 + step, n);
        }
        return maxMultiplier ? Math.min(maxMultiplier, mult) : mult;
    }

    _getSpecialUseMultiplier(chessArray) {
        const multTable = this.cfg.specialMultiplier;
        let mult = 1;
        for (const obj of chessArray) {
            const s = obj.getData(this.symbolKey);
            if (multTable[s]) {
                mult = Math.max(mult, multTable[s]);
            }
        }
        return mult;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({ key: 'examples' });
    }

    preload() {
        this.load.image('diamond', 'assets/images/diamond.png');
        this.load.image('horizontal', 'assets/images/horizontal-flip.png');
        this.load.image('vertical', 'assets/images/vertical-flip.png');
        this.load.image('snowflake', 'assets/images/snowflake.png');
    }

    create() {
        const initSymbols = `\
01010101
01121010
10020101
00202210
01010101
10011010
00100101
01101010\
`.trim().split('\n').map(line => line.split('').map(Number));

        const scene = this;
        const pieceSystem = new PieceSystem({ types: PIECE_TYPES, cellSize: CELLSIZE });

        const bejeweled = new Bejeweled(scene, {
            board: {
                x: CELLSIZE, y: CELLSIZE,
                cellWidth: CELLSIZE,
                cellHeight: CELLSIZE,
                width: 8, height: 8
            },
            initSymbols,

            chess: {
                symbols: GeneralPieceTypes,
                create: board => pieceSystem.createGameObject(board),
                moveTo: { speed: 400 }
            },

            match: {
                accept: GeneralPieceTypes
            },

            clickAction: (chess, board, bj) => pieceSystem.clickAction(chess, board, bj),

            eliminatingAction: (arr, board, bj) => pieceSystem.eliminatingAction(arr, board, bj),

            debug: true
        })
            .on('match', (lines, board, bj) => {
                pieceSystem.processMatches(lines, board, bj);
            })

        const scoreSystem = new ScoreSystem({
            types: PIECE_TYPES,
            basePerPiece: 10,
            combo: { mode: 'linear', base: 1, step: 0.5, maxMultiplier: 5 },
            specialMultiplier: {
                [PIECE_TYPES.H]: 1.5,
                [PIECE_TYPES.V]: 1.5,
                [PIECE_TYPES.SNOW]: 2.0
            },
            lengthBonusPerExtra: 5,
            simultaneousLinesBonus: 10,
            intersectionBonus: 20
        });
        scoreSystem.attach(bejeweled);

        const txtScore = this.add.text(650, 30, bejeweled.getData('scores'), {
            fontSize: '24px', color: '#fff'
        });
        bejeweled.on('changedata-scores', (bj, value) => {
            txtScore.setText(value);
        });

        bejeweled.start();
    }

    update() { }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexBoard',
            plugin: BoardPlugin,
            mapping: 'rexBoard'
        }]
    }
};

new Phaser.Game(config);