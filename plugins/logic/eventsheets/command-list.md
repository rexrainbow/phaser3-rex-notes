# Command List

## Main headings

```
# Title

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

```
### [If coin > 10]

actions...

### [Else If (coin > 5) && (coin <10)]

actions...

### [Else]

actions...
```

### Repeat Loop

```
## [Repeat 3]

actions...
```

### While Loop

```
## [While loopCount > 0]

actions...
```

### Leave Current Heading

```
[break]
```

### Leave Current Event Sheet

```
[exit]
```

### Deactive Event Sheet

```
[deactivate]
```

or

```
[deactivate title]
```

### Active Event Sheet

```
[activate]
```

or

```
[activate title]
```

## BBCode Log

### Print message
    
```

log
  text=...
  // logType='log'
  // showTitle=true
  // title
  // titleColor='green'

```

### Disable printing

```

log.disable

```

or

```

log.disable
  title=...

```

### Enable printing

```

log.enable

```

or

```

log.disable
  title=...

```

### Dump memory


```

log.memory

```

or


```

log.memory
  text=...
  keys=a,b,c

```


## Custom game object

### Create Game Object Instance

```

GOTYPE
  id=NAME
  param0=value
  param1=value

```

### Set properties

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

```
GOTYPE.set
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

```
!NAME
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

### Ease properties

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

```
GOTYPE.to
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

```
!NAME.to
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

```
GOTYPE.yoyo
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

```
!NAME.yoyo
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

### Call methods

```
NAME.commandName
  param0=value
  param1=value
```

```
GOTYPE.commandName
  param0=value
  param1=value
```

```
!NAME.commandName
  param0=value
  param1=value
```

Registed by

```javascript
commandExecutor.addGameObjectManager({
    name: GOTYPE,

    // ...

    commands: {
        commandName(gameObject, config, commandExecutor, eventSheetManager, eventSheet) {
            // commandExecutor.waitEvent(eventEmitter, eventName);
        }
    }
})
```

More command list of Custom Game Object...

### Destroy game object

```
NAME.destroy
```

## Wait

### Wait click

```

click

```

### Wait any

```

wait
  click
  key=keyName
  time=

```

## Music

### Sound properties

```

bgm.set
  volume
  mute
  unmute

```

Command name : `bgm`, `bgm2`, `se`, `se2`

### Play sound

```

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

```

bgm.pause

```

Command name : `bgm.pause`, `bgm2.pause`

### Resume sound

```

bgm.resume

```

Command name : `bgm.resume`, `bgm2.resume`

### Mute sound

```

bgm.mute

```

Command name : `bgm.mute`, `bgm2.mute`, `se.mute`, `se2.mute`

### Unmute sound

```

bgm.unmute

```

Command name : `bgm.unmute`, `bgm2.unmute`, `se.unmute`, `se2.unmute`


### Cross fade sound

```

bgm.cross
  key=
  duration=500
  wait=false

```

Command name : `bgm.cross`, `bgm2.cross`

### Stop sound

```

bgm.stop

```

Command name : `bgm.stop`, `bgm2.stop`, `se.stop`, `se2.stop`

### Fade in sound

```

bgm.fadeIn
  duration=500

```

Command name : `bgm.stop`, `bgm2.stop`

### Fade out sound

```

bgm.fadeOut
  duration=500
  stop=true
  wait=false

```

Command name : `bgm.fadeOut`, `bgm2.fadeOut`, `se.fadeOut`, `se2.fadeOut`

## Camera

### Camera properties

```

camera.set
  x=
  y=
  rotate=
  zoom=
  name=

```

### Camera fade in

```

camera.fadeIn
  duration=1000
  red
  green
  blue
  name
  wait=false

```

### Camera fade out

```

camera.fadeOut
  duration=1000
  red
  green
  blue
  name
  wait=false

```

### Camera flash

```

camera.flash
  duration=1000
  red
  green
  blue
  name
  wait=false

```

### Camera shake

```

camera.shake
  duration=1000
  intensity
  name
  wait=false

```

### Camera zoom

```

camera.zoomTo
  duration=1000
  zoom
  name
  wait=false

```

### Camera rotate-to

```

camera.rotateTo
  duration=1000
  rotate
  ease
  name
  wait=false

```

### Camera scroll-to

```

camera.scrollTo
  duration=1000
  x
  y
  ease
  name
  wait=false

```


