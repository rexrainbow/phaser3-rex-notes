# Text-box commands

## Create Game Object Instance

```
TEXTBOX
  id=NAME
  param0=value
  param1=value
```

Create TextBox as Text-box game object

## Destroy

```
NAME.destroy
```

## Set properties

```
NAME
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