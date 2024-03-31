# Text-box commands

## Create Game Object Instance

```
TEXTBOX
  id=NAME
  param0=value
  param1=value
```

Create TextBox as Text-box game object

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

### Typing

```
NAME.typing
  name=
  text=
  speed=
```

or

~~~
```NAME.typing,name=,speed=
text-line0
text-line1
text-line2
```
~~~