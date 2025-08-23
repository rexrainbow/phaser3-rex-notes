# Title commands

## Create Game Object Instance

```markdown

TITLE
  id=NAME
  width=0
  height=0  
  vpx=0.5
  vpy=1
  vpw=
  vph=
  alignLeft=false
  alignRight=true
  alignTop=true
  alignBottom=false
  text0=
  text1=

```

Create TitleLabel as Title game object

- `alignLeft`, `alignRight`, `alignTop`, `alignBottom` : Assign Origin. Default behavior is align at top-right.
- `text0` : Text content of upper text game object.
- `text1` : Text content of lower text game object.

## Destroy

```markdown

NAME.destroy

```

## Set properties

```markdown

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

```markdown

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

```markdown

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

### Set text

```markdown

NAME.setText
  text0=
  text1=

```

### Pop up

```markdown

NAME.popUp
  text0=
  text1=
  separatorDir=right
  text0Dir=up
  text1Dir=down
  separatorThenText=true
  duration
  wait=true

```

- `separatorDir` : Ease direction, `right` or `left`
- `text0Dir`, `text1Dir` : Ease direction, `up`, `down`, `right`, or `left`
- `separatorThenText` :
    - `true` : Ease separator then ease text0, text1
    - `false` : Ease separator, text0, text1 at the same time


### Shake

```markdown

NAME.shake
  duration=
  magnitude=
  wait=true

```
