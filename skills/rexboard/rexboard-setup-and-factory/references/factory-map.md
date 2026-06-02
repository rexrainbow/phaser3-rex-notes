# Factory Map

## Scene Plugin Factories

| Factory | Direct class/helper | Source path | Common use |
| --- | --- | --- | --- |
| `this.rexBoard.add.board(config)` | `Board` | `plugins/board/board` | Main board data model with input support |
| `this.rexBoard.add.quadGrid(config)` | `QuadGrid` | `plugins/board/grid/quad` | Orthogonal or isometric square/diamond grids |
| `this.rexBoard.add.hexagonGrid(config)` | `HexagonGrid` | `plugins/board/grid/hexagon` | Staggered hex coordinate conversion |
| `this.rexBoard.add.shape(board, tileX, tileY, tileZ, fillColor, fillAlpha, addToBoard)` | `Shape` | `plugins/board/shape` | Polygon tile/chess game object |
| `this.rexBoard.add.image(board, tileX, tileY, tileZ, key, frame, addToBoard)` | `Image` | `plugins/board/image` | Image chess game object |
| `this.rexBoard.add.sprite(board, tileX, tileY, tileZ, key, frame, addToBoard)` | `Sprite` | `plugins/board/sprite` | Sprite chess game object |
| `this.rexBoard.add.moveTo(gameObject, config)` | `MoveTo` | `plugins/board/moveto` | Tile-by-tile movement component |
| `this.rexBoard.add.pathFinder(gameObject, config)` | `PathFinder` | `plugins/board/pathfinder` | Reachable area and path queries |
| `this.rexBoard.add.match(config)` | `Match` | `plugins/board/match` | Symbol and pattern matching |
| `this.rexBoard.add.fieldOfView(gameObject, config)` | `FieldOfView` | `plugins/board/fieldofview` | Line-of-sight and visible tile queries |
| `this.rexBoard.add.monopoly(gameObject, config)` | `Monopoly` | `plugins/board/monopoly` | Route traversal with direction/cost rules |
| `this.rexBoard.add.miniBoard(x, y, config)` | `MiniBoard` | `plugins/board/miniboard` | Composite movable group of chess objects |

## Scene Plugin Helpers

| Helper | Direct helper | Source path | Common use |
| --- | --- | --- | --- |
| `this.rexBoard.hexagonMap.hexagon(board, radius, out)` | `HexagonMap.hexagon` | `plugins/board/hexagonmap` | Hexagon-shaped tile coordinate sets |
| `this.rexBoard.hexagonMap.triangle(board, type, height, out)` | `HexagonMap.triangle` | `plugins/board/hexagonmap` | Triangle-shaped hex coordinate sets |
| `this.rexBoard.hexagonMap.parallelogram(board, type, width, height, out)` | `HexagonMap.parallelogram` | `plugins/board/hexagonmap` | Parallelogram-shaped hex coordinate sets |
| `this.rexBoard.createTileTexture(board, key, fill, stroke, lineWidth, overlapGrid, lineJoin)` | `CreateTileTexture` | `plugins/board/texture` | Runtime tile texture for board shapes |
| `this.rexBoard.createBoardFromTilemap(tilemap, layers)` | `CreateBoardFromTilemap` | `plugins/board/tilemap` | Board construction from tilemap layers |

Use the exact factory name from `board-plugin.d.ts`; do not invent singular/plural aliases.
