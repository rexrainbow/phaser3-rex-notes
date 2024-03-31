# Choice dialog commands

## Create Game Object Instance

```
CHOICE
  id=NAME
  param0=value
  param1=value
```

Create ConfirmDialog as Choice dailog game object

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

### Choice

```
NAME.choice
  title=
  content=
  option1=
  option2=
  option3=
  resultKey=choiceIndex
```

- If click button1 (option1), resultKey( choiceIndex) will set to `1`
- If click button2 (option2), resultKey( choiceIndex) will set to `2`
- If click button3 (option3), resultKey( choiceIndex) will set to `3`