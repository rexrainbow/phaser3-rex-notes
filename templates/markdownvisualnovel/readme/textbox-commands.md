# Text-box commands

## Create Game Object Instance

```

TEXTBOX
  id=NAME
  param0=value
  param1=value

```

Create TextBox as Text-box game object

- Default origin is `(0.5, 1)`

## Destroy

```

NAME.destroy

```

## Set properties

```

NAME.set
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

## Ease properties

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

## Call methods

### Typing

```

NAME.typing
  name=
  // expression=
  // icon=
  // iconFrame=
  text=
  speed=

```

or

~~~

```NAME.typing,name=,expression=,icon=,iconFrame=,speed=
text-line0
text-line1
text-line2
```

~~~

- `name` : Display `name` at title element.
    - `undefined` : Hide title element.
- `icon`, `iconFrame` : Texture key and frame name of icon element.
- `expression` : Generate `iconFrame` by `${name}-${expression}`.