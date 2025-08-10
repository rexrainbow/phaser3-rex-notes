# Command List

## Main headings

```markdown
# Title

groupName=
parallel
active=false
once

## [Condition]

coin > 5

## Script

## [Catch]
```

## Flow control

### If, Else if, Else

```markdown
### [If coin > 10]

actions...

### [Else If (coin > 5) && (coin <10)]

actions...

### [Else]

actions...
```

### Repeat Loop

```markdown
## [Repeat 3]

actions...
```

### While Loop

```markdown
## [While loopCount > 0]

actions...
```

### Leave Current Heading

```markdown
[break]
```

### Leave Current Event Sheet

```markdown
[exit]
```

### Deactive Event Sheet

```markdown
[deactivate]
```

or

```markdown
[deactivate title]
```

### Active Event Sheet

```markdown
[activate]
```

or

```markdown
[activate title]
```

## BBCode Log

### Print message
    
```markdown

log
  text=...
  // logType='log'
  // showTitle=true
  // title
  // titleColor='green'

```

### Disable printing

```markdown

log.disable

```

or

```markdown

log.disable
  title=...

```

### Enable printing

```markdown

log.enable

```

or

```markdown

log.disable
  title=...

```

### Dump memory


```markdown

log.memory

```

or


```markdown

log.memory
  text=...
  keys=a,b,c

```

## Wait

### Wait click

```markdown

click

```

### Wait any

```markdown

wait
  click
  key=keyName
  time=

```

## Music

### Sound properties

```markdown

bgm.set
  volume=
  mute
  unmute

```

Command name : `bgm`, `bgm2`, `se`, `se2`

### Play sound

```markdown

bgm.play
  key=
  // volume
  // detune
  // rate
  fadeIn=0
  // loop
  wait=false

```

Command name : `bgm.play`, `bgm2.play`, `se.play`, `se2.play`

### Pause sound

```markdown

bgm.pause

```

Command name : `bgm.pause`, `bgm2.pause`

### Resume sound

```markdown

bgm.resume

```

Command name : `bgm.resume`, `bgm2.resume`

### Mute sound

```markdown

bgm.mute

```

Command name : `bgm.mute`, `bgm2.mute`, `se.mute`, `se2.mute`

### Unmute sound

```markdown

bgm.unmute

```

Command name : `bgm.unmute`, `bgm2.unmute`, `se.unmute`, `se2.unmute`


### Cross fade sound

```markdown

bgm.cross
  key=
  duration=500
  wait=false

```

Command name : `bgm.cross`, `bgm2.cross`

### Stop sound

```markdown

bgm.stop

```

Command name : `bgm.stop`, `bgm2.stop`, `se.stop`, `se2.stop`

### Fade in sound

```markdown

bgm.fadeIn
  duration=500

```

Command name : `bgm.stop`, `bgm2.stop`

### Fade out sound

```markdown

bgm.fadeOut
  duration=500
  stop=true
  wait=false

```

Command name : `bgm.fadeOut`, `bgm2.fadeOut`, `se.fadeOut`, `se2.fadeOut`

## Camera

### Camera properties

```markdown

camera.set
  x=
  y=
  rotate=
  zoom=
  name=

```

### Camera fade in

```markdown

camera.fadeIn
  duration=1000
  red
  green
  blue
  name
  wait=false

```

### Camera fade out

```markdown

camera.fadeOut
  duration=1000
  red
  green
  blue
  name
  wait=false

```

### Camera flash

```markdown

camera.flash
  duration=1000
  red
  green
  blue
  name
  wait=false

```

### Camera shake

```markdown

camera.shake
  duration=1000
  intensity
  name
  wait=false

```

### Camera zoom

```markdown

camera.zoomTo
  duration=1000
  zoom
  name
  wait=false

```

### Camera rotate-to

```markdown

camera.rotateTo
  duration=1000
  rotate
  ease
  name
  wait=false

```

### Camera scroll-to

```markdown

camera.scrollTo
  duration=1000
  x
  y
  ease
  name
  wait=false

```


