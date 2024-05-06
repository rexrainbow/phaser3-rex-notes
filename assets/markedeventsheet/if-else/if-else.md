# Title

## Test 0

print\
  text=----

set
  coin=8

### [If coin < 10]

print\
  text=(coin < 10)

### [Else]

print\
  text=NOT (coin < 10)


## Test 1

print\
  text=----

set
  coin=8

### [If coin > 10]

print\
  text=(coin > 10)

### [Else]

print\
  text=NOT (coin > 10)


## Test 2

print\
  text=----

set
  coin=8

### [If coin > 10]

print\
  text=(coin > 10)

### [Else If (coin > 5) && (coin <=10)]

print\
  text=(coin > 5 and coin <10)

### [Else]

print\
  text=(coin < 5)

