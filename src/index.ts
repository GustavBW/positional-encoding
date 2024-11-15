import { getRandomValidKey, getRandomValidStarterKey, inverseOffsets, isValidCellKey, TABLE, type Cell } from "./charTable";

const getRandomUppercaseChar = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);

const generateEmptyCell = (): Cell => [
    [getRandomUppercaseChar(), getRandomUppercaseChar(), getRandomUppercaseChar()],
    [getRandomUppercaseChar(), getRandomUppercaseChar(), getRandomUppercaseChar()],
    [getRandomUppercaseChar(), getRandomUppercaseChar(), getRandomUppercaseChar()]
];

const encodeString = (input: string): Cell[] => {
    const normalized = input.toUpperCase();
    const cells: Cell[] = [];
    let currentInputPos = 0;
    let currentKeys = [getRandomValidStarterKey()];
    let currentKeyIndex = 0;

    //... while... something
    while (currentInputPos < normalized.length) {
        let currentCell = generateEmptyCell();
        if (cells.length <= 1) {
            currentCell[0][0] = currentKeys[currentKeyIndex];
        }
        let currentOffsets = TABLE[currentKeys[currentKeyIndex]];

        for (let i = 0; i < currentOffsets.length; i++) {
            const [x, y] = currentOffsets[i];
            currentCell[y][x] = normalized[currentInputPos];
            currentInputPos++;
        }
        cells.push(currentCell);

        if (cells.length <= 1) {
            currentKeys.push(currentCell[0][1]);
            currentKeys.push(currentCell[0][2]);
        } else {
            currentKeys.push(...currentCell[0]);
        }
        currentKeyIndex++;
    }
    
    
    return cells;
};

// Example usage
const input = "TILLYKKE";
const encoded = encodeString(input);

// Print them nicely
const firstLine = encoded.map(cell => cell[0].join(' ')).join('  ');
const secondLine = encoded.map(cell => cell[1].join(' ')).join('  ');
const thirdLine = encoded.map(cell => cell[2].join(' ')).join('  ');
console.log(firstLine);
console.log(secondLine);
console.log(thirdLine);

console.log(`Original: ${input}`);