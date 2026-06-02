# Match Recipes

## Match Symbols From Chess

```js
const matcher = this.rexBoard.add.match({ board });

function refreshMatcher() {
  matcher.refreshSymbols((tileXY, board) => {
    const gem = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
    return gem ? gem.symbol : null;
  });
}

refreshMatcher();
matcher.match(3, (result) => {
  result.tileXY.forEach((tileXY) => {
    const gem = board.tileXYZToChess(tileXY.x, tileXY.y, 0);
    if (gem) {
      board.removeChess(gem, null, null, null, true);
    }
  });
});
```

## Test Swap Before Commit

```js
function wouldCreateMatch(chessA, chessB) {
  board.swapChess(chessA, chessB, true);
  matcher.refreshSymbols(readSymbol);
  const ok = matcher.anyMatch(3);
  board.swapChess(chessA, chessB, true);
  matcher.refreshSymbols(readSymbol);
  return ok;
}
```

## Connected Group Rule

```js
matcher.refreshSymbols(readSymbol);

const group = matcher.group(tileX, tileY);
if (group.length >= 4) {
  group.forEach((tileXY) => clearTile(tileXY));
}
```

These recipes are reduced for skill reference from common RexBoard match puzzle patterns. They do not require the `examples/` directory.
