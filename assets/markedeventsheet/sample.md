# Title

## [Condition]

金幣 > 5

## [Condition]

hp > 3

## Script

// single comment line

// comment line inside command lines\
print\
 // comment line inside command lines\
 text=Hello

```print
Hello, {{name}}
Line1
Line2
Line3
```

print\
 text=_(I have {{金幣}} 金幣)

set\
  金幣=#(金幣 + 10)

print\
 text=_(Now I have {{金幣}} 金幣)

## Before if 

print\
  text=Before if

## [If]

金幣 < 5

### Label A

print\
  text=If (金幣 < 5)

## [Else]

### Label Else

print\
  text=Else (金幣 < 5)

## [If]

金幣 > 10

### Label B

print\
  text=If (金幣 > 10)

## After If 

print\
  text=After If

## Before while

print\
  text=Before while

set\
  loopCount=3

## [while]

loopCount > 0

### do-while

print\
  text=_(do-while {{loopCount}})

set\
  loopCount=#(loopCount-1)

## After while

print\
  text=After while

## Break label test

print\
  text=Before break-label

[break]

print\
  text=After break-label

## Exit test

print\
  text=Before exit

[exit]

print\
  text=After exit

## Remainder

print\
  text=Here

print\
  text=Here

## [Catch]

print\
  text=Try again
