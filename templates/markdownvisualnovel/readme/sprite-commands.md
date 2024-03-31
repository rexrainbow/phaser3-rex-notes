# Sprite commands

## Create Game Object Instance

```
SPRITE
  id=NAME
  param0=value
  param1=value
```

Create Image as Sprite game object.

## Destroy game object

```
NAME.destroy
```

## Game Object properties

```
NAME.to
  x=
  vpx=
  y=
  vpy=
  alpha=
  duration=1000
  ease=Linear
  repeat=0
  wait=
```

or

```
NAME.yoyo
  x=
  vpx=
  y=
  vpy=
  alpha=
  duration=1000
  ease=Linear
  repeat=0
  wait=
```

## Game object methods

### Set frame

```
NAME.cross
  key=
  frame=
```