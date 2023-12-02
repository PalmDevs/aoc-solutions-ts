# 🎄 2023 AoC TypeScript solutions

_"The year is 2023, Palm is solving Advent of Code questions..."_

## 📂 Directory structure

```sh
📂 2023
|
|_ 📂 dd  # The day number
| |_ 📂 s  # Part number (usually just 1 or 2)
|   |_ 📄 input.test.txt   # Test input (usually the one that Advent of Code gives)
|   |_ 📄 answer.test.txt  # Test output (same as above)
|   |_ 📘 constants.ts     # Shared components
|   |_ 📘 index.ts         # The solution
|
|_ 📁 utils  # Utility functions
|
|_ ❔ (other files...)  # Ignore them
```

File like `constants.ts`, `input.answer.txt`, or `answer.test.txt` may appear occasionally above the `s` (part number) directories.  
This signals that the question may have shared components or inputs. If you add an input file in the same directory, the solutions will import them accordingly.

## ❔ How to run

**Input using file**

```sh
# Change to the respective directory
cd 01/1

# Add input file (MUST BE IN UTF-8 ENCODING)
echo "some input" > input.txt

# Execute
bun run .
```

**Input using stdin**

```sh
# Change to the respective directory
cd 01/1

# Echo the input into the process
echo "some input" | bun run .
# You can even read from any file, if you want to
cat input.custom.txt | bun run .
```

If you're using the provided test inputs, their expected answers are also provided the `answer.test.txt` file.