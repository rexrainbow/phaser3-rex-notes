# Name-input dialog commands

## Create Game Object Instance

```markdown

NAMEINPUT
  id=NameInput
  width=0
  height=0
  vpx=0.5
  vpy=0.5
  vpw=
  vph=

```

Create Name-input dailog game object

## Destroy game object

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

### Name-input

```markdown

NAME.input
  title=
  firstNameTitle=
  lastNameTitle=
  button=
  firstName=
  lastName=
  firstNameKey=firstName
  lastNameKey=lastName

```

- Store input to variable by key `firstNameKey` and `lastNameKey`

### Shake

```markdown

NAME.shake
  duration=
  magnitude=
  wait=true

```
