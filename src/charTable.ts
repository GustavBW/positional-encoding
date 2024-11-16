export type Vec2 = [number, number];
export type CharReadOffsets = Vec2[];
//All outer edges / spike-like
//Decoded in reading order
export const TABLE: Readonly<{ [key: string]: CharReadOffsets }> = {
    " ": [],
    "A": [[1,0],[0,2],[2,2]],
    "B": [[0,0],[0,2]],
    "C": [[2, 0],[2,2]],
    "D": [[0,0],[0,2]],
    "E": [[0,0],[2,0],[2,1],[0,2],[2,2]],
    "F": [[0,0],[2,0],[2,1],[0,2]],
    "G": [[2,0],[1,1],[2,1],[2,2]],
    "H": [[0,0],[2,0],[0,2],[2,2]],
    "I": [[0,0],[2,0],[0,2],[2,2]],
    "J": [[0,0],[2,0],[0,2]],
    "K": [[0,0],[2,0],[0,2],[2,2]],
    "L": [[0,0],[0,2],[2,2]],
    "M": [[0,0],[2,0],[1,1],[0,2],[2,2]],
    "N": [[0,0],[2,0],[0,2],[2,2]],
    "O": [],
    "P": [[0,0],[0,2]],
    "Q": [],
    "R": [[0,0],[0,2],[2,2]],
    "S": [[2,0],[0,2]],
    "T": [[0,0],[2,0],[1,2]],
    "U": [[0,0],[0,2]],
    "V": [[0,0],[2,0],[1,2]],
    "W": [[0,0],[2,0],[1,2],[0,2],[2,2]],
    "X": [[0,0],[2,0],[0,2],[2,2]],
    "Y": [[0,0],[2,0],[1,1],[1,2]],
    "Z": [[0,0],[2,0],[0,2],[2,2]],
    "Æ": [[1,0],[2,0],[2,1],[0,2],[1,2],[2,2]],
    "Ø": [[2,0],[0,2]],
    "Å": [[1,0],[0,2],[2,2]],
    "0": [],
    "1": [[0,0],[1,0],[0,2],[2,2]],
    "2": [[0,0],[0,2],[2,2]],
    "3": [[0,0],[0,1],[0,2]],
    /** Edge case. Intepreted as written like:
     *  |_|
     *    |
     */
    "4": [[0,0],[0,2],[0,1],[2,2]],
    "5": [[0,0],[0,2],[0,1],[0,2]],
    "6": [[2,0]],
    "7": [[0,0],[2,0],[1,2]],
    "8": [],
    "9": [[0,2]]
}
export const VALID_KEYS = Object.keys(TABLE).filter(key => TABLE[key].length > 0);

export const getRandomValidKey = (): string => 
    VALID_KEYS[Math.floor(Math.random() * VALID_KEYS.length)];

export const isValidCellKey = (key: string): boolean => VALID_KEYS.includes(key);

export const NON_SELF_REFERENCING_KEYS = VALID_KEYS.filter(key => {
    return !(TABLE[key][0][0] === 0 && TABLE[key][0][1] === 0 )
});

export const getRandomValidStarterKey = (): string => 
    NON_SELF_REFERENCING_KEYS[Math.floor(Math.random() * NON_SELF_REFERENCING_KEYS.length)];

export type Cell = [
    [string, string, string],
    [string, string, string],
    [string, string, string]
]

const EMPTY_CELL = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
]
export const inverseOffsets = (offsets: CharReadOffsets): CharReadOffsets => {
    const copy = [[...EMPTY_CELL[0]], [...EMPTY_CELL[1]], [...EMPTY_CELL[2]]];
    for (const [x, y] of offsets) {
        copy[x][y] = true;
    }
    const inverted: CharReadOffsets = [];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (!copy[x][y]) {
                inverted.push([x, y]);
            }
        }
    }
    return inverted;
}