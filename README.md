# TOY ROBOT

## CONCEPT

This application simulates the movement of a robot on a 5 x 5 unit square tabletop.

```
 Tabletop layout
                       NORTH
          /-----|-----|-----|-----|-----\
          | 0,4 | 1,4 | 2,4 | 3,4 | 4,4 |
          |-----|-----|-----|-----|-----|
          | 0,3 | 1,3 | 2,3 | 3,3 | 4,3 |
    WEST  |-----|-----|-----|-----|-----| EAST
          | 0,2 | 1,2 | 2,2 | 3,2 | 4,2 |
          |-----|-----|-----|-----|-----|
          | 0,1 | 1,1 | 2,1 | 3,1 | 4,1 |
          |-----|-----|-----|-----|-----|
          | 0,0 | 1,0 | 2,0 | 3,0 | 4,0 |
          \-----|-----|-----|-----|-----/
                       SOUTH
```

There are 5 possible commands (All other commands are ignored and will print `Invalid command 'command'`):

1. `PLACE X,Y,F` where:

-   `X` is the x-coordinate
-   `Y` is the y-coordinate
-   `F` is the direction the robot is facing at time of placement. Options include `NORTH`, `EAST`, `SOUTH` and `WEST`

2. `MOVE` - Will move 1 unit in the direction the robot is facing at the time, as long as the robot will still be on the tabletop AFTER the move is completed. For example, if the robot is on `4,4` and facing `NORTH`, then the move command will be ignored because that will make the robot fall off the table.

3. `LEFT` - Rotate the robot 90° to the left

4. `RIGHT` - Rotate the robot 90° to the left

5. `REPORT` - Report the current place of the robot to STDOUT. Example:

```json
{
    "X": 0,
    "Y": 0,
    "F": "NORTH"
}
```

# ASSUMPTIONS

-   Once `REPORT` has been called, the current cycle ends. The first accepted command after this will only be a `PLACE` command
-   Input's will be valid, i.e. no letters for coordinates `X,Y` or non-existant directions for `F`
-   Input file will always be named `input_commands.txt`
-   Typos (invisible spaces, special characters, etc) will be ignored. Example, `'LEFT'` does not equal `'LEFT '`
-   Commands are case-sensitive

# HOW TO RUN:

## Option 1: Run the unit tests

-   `npm run test` - Multiple tests (positive and negative) are included

## Option 2: Run from file

-   Input commands in `input_commands.txt` file (example file provided)
-   Run application using

    -   `npm run dev`

    or

    -   `ts-node src/index.ts`

-   Example input from file:

    ```shell
    PLACE 0,0,NORTH
    MOVE
    REPORT
    PLACE 0,0,NORTH
    LEFT
    REPORT
    ```

    Output:

    ```json
    {
        "X": 0,
        "Y": 1,
        "F": "NORTH"
    }
    {
        "X": 0,
        "Y": 0,
        "F": "WEST"
    }
    ```
