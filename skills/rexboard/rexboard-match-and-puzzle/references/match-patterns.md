# Match Patterns

## Fixed-Length Line Match

```js
matcher.match(3, (result) => {
  const tiles = result.tileXY;
  const direction = result.direction;
  const pattern = result.pattern;
});
```

`pattern` is the matched symbol for fixed-length matches.

## Array Pattern Match

```js
matcher.match(['red', 'red', 'blue'], (result) => {
  removePattern(result.tileXY);
});
```

Array patterns are useful for puzzle rules that are not just same-symbol lines.

## Wildcards

```js
matcher.setWildcard('*');
matcher.setSymbol(2, 3, '*');
```

Use one explicit wildcard symbol. Avoid `null` as wildcard because `null` usually means no symbol.

## Direction Mask

```js
matcher.setDirMask(0, true);
matcher.setDirMask(1, true);
matcher.setDirMask(2, false);
```

Direction indexes depend on grid mode. Configure masks after selecting grid topology.

## Group Matching

```js
const group = matcher.group(startTileX, startTileY);
if (group.length >= 4) {
  clearTiles(group);
}
```

Use `group` for flood-fill style connected symbols, not line-only match-3 rules.
