import { calculateOpenScore } from "./index"
import { calculateSpareScore } from "./index";
import { calculateStrikeScore } from "./index";


//open score calculator
test("it should return 90 for a game with all open frames(no strikes or spare)", () => {
    const rolls = [ "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-",
    ];
    expect(calculateOpenScore(rolls)).toBe(90);
})

//spare score calculator
test("it should calculate a game with spares correctly", () => {
    const rolls = ["5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5"]
    expect(calculateSpareScore(rolls)).toBe(150)

})

//strike score calculator
test("it should calculate a game with spares correctly", () => {
    const rolls = ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"];
    expect(calculateStrikeScore(rolls)).toBe(300)

})

