# Command List

## Main headings

```yaml
title: Title
groupName: 
parallel: true
active: false
once: true

condition: coin > 5

script: 

fallback:
```

## Flow control

### If, Else if, Else

```yaml
- type: if
  branches:
    - condition: coin > 10
      actions:
        # - name:

    - condition: (coin > 5) && (coin <10)
      actions:
        # - name:

    - actions:
        # - name:
```

### Repeat Loop

```yaml
- type: repeat
  times: 3
  actions:
    # - name:
```

### For loop

```yaml
- type: for
  init:
    # - name:
  condition: expression
  step:
    # - name:
  actions:
    # - name:
```

### While Loop

```yaml
- type: while
  condition: loopCount > 0
  actions:
    # - name:
```

### Leave Current Loop

```yaml
- type: break
```

### Leave Current Event Sheet

```yaml
- type: exit
```

### Restart next loop

```yaml
- type: continue
```

Simulate `continue` instruction of programming language.

### Deactive Event Sheet

```yaml
- type: deactivate
```

or

```yaml
- type: deactivate 
  target: 
```

### Active Event Sheet

```yaml
- type: activate
```

or

```yaml
- type: activate 
  target: 
```

## BBCode Log

### Print message
    
```yaml
- name: log
  parameters:
    text: ...
    # logType: 'log'
    # showTitle: true
    # title
    # titleColor: 'green'
```

### Disable printing

```yaml
- name: log.disable
```

or

```yaml
- name: log.disable
  parameters: 
    title: "..."
```

### Enable printing

```yaml
- name: log.enable
```

or

```yaml
- name: log.disable
  parameters:
    title: "..."
```

### Dump memory


```yaml
- name: log.memory
```

or


```yaml
- name: log.memory
  parameters: 
    text: ...
    keys: a,b,c
```

## Wait

### Wait click

```yaml
- name: click
```

### Wait any

```yaml
- name: wait
  parameters:
    click: true
    key: keyName
    time: 
```

## Music

### Sound properties

```yaml
- name: bgm.set
  parameters:
    volume: 
    mute: 
    unmute: 
```

Command name : `bgm`, `bgm2`, `se`, `se2`

### Play sound

```yaml
- name: bgm.play
  parameters:
    key: 
    # volume
    # detune
    # rate
    fadeIn: 0
    # loop
    wait: false
```

Command name : `bgm.play`, `bgm2.play`, `se.play`, `se2.play`

### Pause sound

```yaml
- name: bgm.pause
```

Command name : `bgm.pause`, `bgm2.pause`

### Resume sound

```yaml
- name: bgm.resume
```

Command name : `bgm.resume`, `bgm2.resume`

### Mute sound

```yaml
- name: bgm.mute
```

Command name : `bgm.mute`, `bgm2.mute`, `se.mute`, `se2.mute`

### Unmute sound

```yaml
- name: bgm.unmute
```

Command name : `bgm.unmute`, `bgm2.unmute`, `se.unmute`, `se2.unmute`


### Cross fade sound

```yaml
- name: bgm.cross
  parameters:
    key: 
    duration: 500
    wait: false
```

Command name : `bgm.cross`, `bgm2.cross`

### Stop sound

```yaml
- name: bgm.stop
```

Command name : `bgm.stop`, `bgm2.stop`, `se.stop`, `se2.stop`

### Fade in sound

```yaml
- name: bgm.fadeIn
  parameters:
    duration: 500
```

Command name : `bgm.stop`, `bgm2.stop`

### Fade out sound

```yaml
- name: bgm.fadeOut
  parameters:
    duration: 500
    stop: true
    wait: false
```

Command name : `bgm.fadeOut`, `bgm2.fadeOut`, `se.fadeOut`, `se2.fadeOut`

## Camera

### Camera properties

```yaml
- name: camera.set
  parameters:
    x: 
    y: 
    rotate: 
    zoom: 
    name: 
```

### Camera fade in

```yaml
- name: camera.fadeIn
  parameters:
    duration: 1000
    red:
    green:
    blue:
    name:
    wait: false
```

### Camera fade out

```yaml
- name: camera.fadeOut
  parameters:
    duration: 1000
    red:
    green:
    blue:
    name:
    wait: false
```

### Camera flash

```yaml
- name: camera.flash
  parameters:
    duration: 1000
    red:
    green:
    blue:
    name:
    wait: false
```

### Camera shake

```yaml
- name: camera.shake
  parameters:
    duration: 1000
    intensity:
    name:
    wait: false
```

### Camera zoom

```yaml
- name: camera.zoomTo
  parameters:
    duration: 1000
    zoom:
    name:
    wait: false
```

### Camera rotate-to

```yaml
- name: camera.rotateTo
  parameters:
    duration: 1000
    rotate:
    ease:
    name:
    wait: false
```

### Camera scroll-to

```yaml
- name: camera.scrollTo
  parameters:
    duration: 1000
    x:
    y:
    ease:
    name:
    wait: false
```


