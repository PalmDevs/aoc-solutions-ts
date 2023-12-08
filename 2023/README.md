# 🎄 2023 AoC TypeScript solutions

_"The year is 2023, Palm is solving Advent of Code questions..."_

## 📂 Directory structure

```sh
📂 2023
┣╸ 📂 (dd)  # The day number
┃  ┣╸ 🤩 extras     # Cool scripts
┃  ┣╸ 📂 (sN)       # Part number (usually just 1 or 2)
┃  ┃  ┣╸ 📄 input.test.txt   # Test input
┃  ┃  ┣╸ 📄 answer.test.txt  # Test output
┃  ┃  ┣╸ 📘 index.ts         # The solution
┃  ┃  ┗╸ 📘 constants.ts     # Constants
┃  ┗╸ 📘 shared.ts  # Shared components between solutions
┣╸ 📁 utils  # Utility functions
┗╸ ❔ (...)  # They're probably not important, ignore them
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
bun run . ./input.txt
#         ^^^^^^^^^^^
# This argument is optional. If a file named `input.txt` exists, the solution will read it automatically.
# Unless you specify the path to another *existing* file. It'll try to read from `input.txt` then stdin.
```

**Input using stdin**

```sh
# Change to the respective directory
cd 01/1

# Echo the input into the process
echo "some input" | bun run .

# You can even read from any file, if you want to
cat input.custom.txt | bun run .
# But the recommended way is to pass the file path as an argument likewise:
# bun run . ./input.custom.txt
```

If you're using the provided test inputs, their expected answers are also provided the `answer.test.txt` file.
