# Example

## Initialize

// Create gameobjects

BG
  id=Background
  key=classroom

TEXTBOX
  id=Dialog
  width=500
  height=120

SPRITE
  id=CharacterA
  key=characters
  frame=A-smile

CHOICE
  id=Choice
  width=500


## Section A

// Manipulate gameobjects

log.disable

log
  text=Test disable

log.enable

log
  text=Start...


Dialog
  vpy=0.99
  alpha=0.8

CharacterA
  vpx=-0.2

bgm.play
  key=theme0

camera
  x=0
  y=200
  rotate=-90
  zoom=2

camera.rotateTo
  rotate=0
  duration=2000
  ease=Cubic

camera.zoomTo
  zoom=1
  duration=2000
  ease=Cubic
  wait

wait
  time=300

camera.scrollTo
  x=0
  y=0
  duration=2000
  ease=Cubic
  wait

camera.shake
  duration=500

camera.flash


CharacterA.to
  vpx=0.7
  ease=Back
  duration=2000
// Wait until tween complete

```Dialog.typing, name=Me Me Me, speed=100
Line0...
Line1...
Line2...
Line3...
```
// Wait until typing complete

## Section B

// Test choice and IF-branch

setData
  hp=5
  coin=100


log.memory
  text=Befor choice


Choice.choice
  title=Would you like some...
  resultKey=choiceIndex
  option1=Ice cream
  option2=Burger
  option3=Cola
// Wait until clicking any chioce button

log
  text=Select option[color=red]{{choiceIndex}}[/color]

### [IF choiceIndex == 1]

Dialog.typing
  name=Me Me Me
  text=Too cool
  speed=100

setData
  hp=#(hp+3)
  coin=#(coin-10)

### [IF choiceIndex == 2]

Dialog.typing
  name=Me Me Me
  text=Too fat
  speed=100

incData
  hp=5
  coin=-10

### [IF choiceIndex == 3]

Dialog.typing
  name=Me Me Me
  text=Another bottle!
  speed=100

incData
  hp=10
  coin=-20


## Section C

log.memory
  text=After choice

wait
  time=3000
  click
// Wait until 3s or any touch

se.play
  key=explosion
  wait
// Wait until playing se complete

CharacterA.cross
  key=characters
  frame=A-dizzy

bgm.cross
  key=theme1

wait
  time=200

Background.cross
  key=road
  mode=irisOut

wait
  time=200

CharacterA.to
  vpx=-0.2
// Wait until tween complete

uiLayer.to
  alpha=0
// Wait until ui layer fade-out

bgm.stop

