# Title

## [Condition]

coin > 5

## [Condition]

hp > 0

## Script

print\
 text=Hello


```print
World


World
```

print\
 text=I have {{coin}} coin

set
  coin=coin + 10

print\
 text=Now I have {{coin}} coin

## [Catch]

print\
  text=Try again
