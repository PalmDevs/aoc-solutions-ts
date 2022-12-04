# Advent of Code 2022 TS Solutions ❄️☃️
Oh hey, it's December already. Time really flies huh...  
Anyway here are my TypeScript solutions for each day of AOC 2022.

## 💡 Fun fact
This was all done on my mobile phone using [Termux](https://termux.dev)!  
I know it may seem unbelievable, but I'm actually doing it all on mobile!

### 🤯 How I did it
Firstly, I write my solutions in a Node.js REPL (or a TS Node REPL).  
Then, after I solved the puzzle, I start refactoring my solutions as best as I could and to my liking.  
I also use GNU nano for editing the code!

## ❔ How to use
Import the `getAnswer` function and pass the input (as a string) to it to get the solution for each puzzle.  
AOC gives you 2 puzzles for each day, so there will be 2 solutions.  
*I do not provide exmaples for inputs, please check test/example inputs from the official puzzle instead.*
```ts
// WARNING: If you're using the "Node" moduleResolution
// You'll have to add the .js extension at the end
// import { getAnswer } from './day-x/solution-y.js'

import { getAnswer } from './day-x/solution-y'

console.log(getAnswer('input here'))
```
