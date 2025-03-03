
//function to calculate open score
export function calculateOpenScore(rolls: string[]): number {
    //rolls = ["9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-", "9", "-"]
    let sum = 0
    for (let i = 0; i < rolls.length; i++){
        if (rolls[i] !== "-") {
            sum += parseInt(rolls[i])
        }
    }
    return sum;
}

//function to calculate spare score
export function calculateSpareScore(rolls: string[]): number{
    //rolls = ["5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5", "/", "5"]
    let sum = 0
    for (let i = 0; i < rolls.length; i+=2) { 
        if (rolls[i+1] === '/') {
            sum += 10 + parseInt(rolls[i])
        }
    } 
  return sum;
}

//function to calculate strike score
export function calculateStrikeScore(rolls: string[]): number{
    //rolls = ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
    let sum = 0
    for (let i = 0; i = rolls.length-2; i++){
        if (rolls[i] === "X") {
            sum += 10 + rollsValue(rolls[i + 1]) + rollsValue(rolls[i + 2])
           
        }
    }
    return sum;
}

function rollsValue(rolls: string): number{
    if (rolls === "X") return 10
    if (rolls === "-") return 0
    return parseInt(rolls)
   }
