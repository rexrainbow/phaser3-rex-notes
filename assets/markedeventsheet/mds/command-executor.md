# Example

groupName=Story

## Initialize

// Create gameobjects

BG
  id=Background
  vpw=1
  vph=1
  scaleMode=ENVELOP

TEXTBOX
  id=Dialog
  vpw=0.6
  vph=0.2
  vpy=0.99

TITLE
  id=Title
  vpx=0.99
  vpy=0.1
  text0=Day0
  text1=Classroom

SPRITE
  id=CharacterA
  key=characters
  name=A
  expression=smile
  vpx=-1

SPRITE
  id=CharacterB
  key=characters
  name=B
  expression=smile
  vpx=-1

SPRITE
  id=CharacterC
  key=characters
  name=C
  expression=smile
  vpx=-1

CHOICE
  id=Choice
  vpw=0.6

NAMEINPUT
  id=NameInput
  vpw=0.4

## Section A

// Manipulate gameobjects

log.disable

log
  text=Test disable

log.enable

log
  text=Start...

setData
  coin=#(randomInt(1,10))

log
  text=I have {{coin}} coins

Dialog.set
  alpha=0.8

Title.popUp
  separatorDir=left
  duration=1000

CharacterA.set
  vpx=-0.2

CharacterB.set
  vpx=-0.4

CharacterC.set
  vpx=-0.3

Dialog.typing, displayName=null, icon=null

bgm.play
  key=theme0

Background.cross
  key=classroom
  mode=curtain
  duration=2000

NameInput.input
  title=My name is ...
  firstName=BBB
  lastName=AAA

CharacterA.to
  vpx=0.8
  ease=Back
  duration=2000
  wait=false

CharacterB.to
  vpx=0.2
  ease=Back
  duration=2000
  wait=false

CharacterC.to
  vpx=0.5
  ease=Back
  duration=2000
// Wait until tween complete

// Ease all SPRITE game objects excluding CharacterA
// !CharacterA.to
//   alpha=0.5
//   duration=300
// Wait until tween complete


CharacterA.say
  name=A
  expression=smile
  displayName=???
  icon=portraits
  text=Hi, {{firstName}} {{lastName}}

CharacterA.say
  expression=happy
  text=Hello
  clickAfterComplete=false

CharacterA.say
  text= World
  typingSpeed=500
  more=true

!CharacterA.shake

Dialog.shake
  wait=false

```Dialog.typing, displayName=A, icon=portraits, name=A, expression=smile
Line0...
Line1...
Line2...
Line3...
```
// Wait until typing complete + one more click

```Dialog.typing
AAAA
BBBB
CCCC
DDDD
```
// Wait until typing complete + one more click

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
  option3=Cola Cola Cola Cola Cola Cola Cola Cola Cola Cola Cola Cola
// Wait until clicking any chioce button

log
  text=Select option[color=red]{{choiceIndex}}[/color]

### [IF choiceIndex == 1]

Dialog.typing
  name=A
  expression=anger
  text=Not today
  speed=100

setData
  hp=#(hp+3)
  coin=#(coin-10)

### [IF choiceIndex == 2]

Dialog.typing
  name=A
  expression=dizzy
  text=Too fat
  speed=100

incData
  hp=5
  coin=-10

### [IF choiceIndex == 3]

Dialog.typing
  name=A
  expression=happy
  text=Another bottle!
  speed=100

incData
  hp=10
  coin=-20


## Section C

Title.setText
  text0=Day1

log.memory
  text=After choice

wait
  time=3000
  click
// Wait until 3s or any touch

// SPRITE.set
//  tint=0xffffff

CharacterA.unfocus

se.play
  key=explosion
  wait
// Wait until playing se complete

SPRITE.cross
  expression=dizzy

bgm.cross
  key=theme1

wait
  time=200

Background.cross
  key=road
  mode=irisOut

wait
  time=200

// Ease all SPRITE game objects
SPRITE.to
  vpx=-0.3
// Wait until tween complete

bgm.stop

