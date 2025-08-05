# Title

## [Condition]

CharA.hp > 50 && CharA.mp > 50

## Script

setData
  CharA.hp=#( CharA.hp - 10 )

print
  text=Sheet: {{CharA.hp}}


## [Catch]

print\
  text=Condition failed
