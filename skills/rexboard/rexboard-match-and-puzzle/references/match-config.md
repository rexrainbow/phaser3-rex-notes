# Match Config

Factory:

```js
const matcher = this.rexBoard.add.match({
  board,
  wildcard: '*',
  dirMask: {
    0: true,
    1: true
  }
});
```

Constructor:

```js
const matcher = new Match({ board });
```

## Config Fields

| Field | Meaning |
| --- | --- |
| `board` | Logic board or board instance |
| `wildcard` | Symbol that matches any symbol |
| `dirMask` | Object keyed by direction index to enable/disable directions |

## Refresh Symbols

```js
matcher.refreshSymbols((tileXY, board) => {
  const chess = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
  return chess ? chess.symbol : null;
});
```

## Direct Symbol Access

```js
matcher.setSymbol(tileX, tileY, symbol);
const symbol = matcher.getSymbol(tileX, tileY);
```

Use direct symbols for generated puzzle logic. Use `refreshSymbols` when symbols live on chess objects.

## Methods

```js
matcher.setBoard(board);
matcher.setWildcard('*');
matcher.setDirMask(0, true);
matcher.forEach((tileXY, symbol, board) => {});
matcher.match(3, (result, board) => {});
matcher.match(['A', 'A', 'B'], (result, board) => {});
const exists = matcher.anyMatch(3);
const group = matcher.group(tileX, tileY);
```
