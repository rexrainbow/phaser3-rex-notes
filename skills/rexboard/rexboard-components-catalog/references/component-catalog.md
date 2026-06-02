# Component Catalog

| Need | Use | Scene plugin factory/helper | Direct export | Related skill |
| --- | --- | --- | --- | --- |
| Install RexBoard into a scene | BoardPlugin | configured plugin with `mapping: 'rexBoard'` | default from `board-plugin.js` | `rexboard-setup-and-factory` |
| Main board model with input | Board | `this.rexBoard.add.board(config)` | `Board` | `rexboard-board-and-chess` |
| Orthogonal/isometric grid | QuadGrid | `this.rexBoard.add.quadGrid(config)` | `QuadGrid` | `rexboard-grids-and-coordinates` |
| Hex grid | HexagonGrid | `this.rexBoard.add.hexagonGrid(config)` | `HexagonGrid` | `rexboard-grids-and-coordinates` |
| Chess metadata on pieces | ChessData | none | `ChessData` | `rexboard-board-and-chess` |
| Polygon rendered chess/tile | Shape | `this.rexBoard.add.shape(...)` | `Shape` | `rexboard-rendered-tiles-and-pieces` |
| Image rendered chess/tile | Image | `this.rexBoard.add.image(...)` | `Image` | `rexboard-rendered-tiles-and-pieces` |
| Sprite rendered chess/tile | Sprite | `this.rexBoard.add.sprite(...)` | `Sprite` | `rexboard-rendered-tiles-and-pieces` |
| Tile-by-tile motion | MoveTo | `this.rexBoard.add.moveTo(gameObject, config)` | `MoveTo` | `rexboard-movement-and-pathfinding` |
| Reachable area/path | PathFinder | `this.rexBoard.add.pathFinder(gameObject, config)` | `PathFinder` | `rexboard-movement-and-pathfinding` |
| Pattern/match-3 logic | Match | `this.rexBoard.add.match(config)` | `Match` | `rexboard-match-and-puzzle` |
| Line of sight/FOV | FieldOfView | `this.rexBoard.add.fieldOfView(gameObject, config)` | `FieldOfView` | `rexboard-visibility-and-routes` |
| Route traversal | Monopoly | `this.rexBoard.add.monopoly(gameObject, config)` | `Monopoly` | `rexboard-visibility-and-routes` |
| Composite movable piece | MiniBoard | `this.rexBoard.add.miniBoard(x, y, config)` | `MiniBoard` | `rexboard-miniboard-and-composite` |
| Hex coordinate map shapes | HexagonMap | `this.rexBoard.hexagonMap.*` | `HexagonMap` | `rexboard-map-generation-and-import` |
| Runtime tile texture | CreateTileTexture | `this.rexBoard.createTileTexture(...)` | `CreateTileTexture` | `rexboard-rendered-tiles-and-pieces`, `rexboard-map-generation-and-import` |
| Tilemap to board | CreateBoardFromTilemap | `this.rexBoard.createBoardFromTilemap(...)` | `CreateBoardFromTilemap` | `rexboard-map-generation-and-import` |

## Selection Notes

- Use `Board` for placement, occupancy, neighbors, bounds, events, and coordinate conversion.
- Use `QuadGrid` or `HexagonGrid` before constructing a board.
- Use plain Phaser game objects plus `board.addChess(...)` when custom rendering is needed.
- Use RexBoard `Shape`, `Image`, or `Sprite` when the object should be constructed directly at tile coordinates and optionally added to the board.
- Use `MoveTo` for animated movement and `PathFinder` for planning; they are often used together but solve different problems.
- Use `Match` for symbol/pattern logic; it does not replace board occupancy.
- Use `MiniBoard` when several chess pieces move, rotate, mirror, or place as one composite object.
