var array5bit_A = [
    "f//AAAAAAAAAAAAAAAAAAAA",
    "f//AAAAAAAAAAAAAAAAAAAB",
    "f//AAAAAAAAAAAAAAEAAAD/",
    "f//AAAAAAAAAAAAAAEAAAAA",
    "f//AAAAAAAAAQAAAP8AAAAA",
    "f//AAAAAAAAAQAAAP8AAAAB",
    "f//AAAAAAAAAQAAAAAAAAD/",
    "f//AAAAAAAAAQAAAAAAAAAA",
    "f//AAABAAAA/wAAAAAAAAAA",
    "f//AAABAAAA/wAAAAAAAAAB",
    "f//AAABAAAA/wAAAAEAAAD/",
    "f//AAABAAAA/wAAAAEAAAAA",
    "f//AAABAAAAAAAAAP8AAAAA",
    "f//AAABAAAAAAAAAP8AAAAB",
    "f//AAABAAAAAAAAAAAAAAD/",
    "f//AAABAAAAAAAAAAAAAAAA",
    "QD/AAD/AAAAAAAAAAAAAAAA",
    "QD/AAD/AAAAAAAAAAAAAAAB",
    "QD/AAD/AAAAAAAAAAEAAAD/",
    "QD/AAD/AAAAAAAAAAEAAAAA",
    "QD/AAD/AAAAAQAAAP8AAAAA",
    "QD/AAD/AAAAAQAAAP8AAAAB",
    "QD/AAD/AAAAAQAAAAAAAAD/",
    "QD/AAD/AAAAAQAAAAAAAAAA",
    "QD/AAAAAAAA/wAAAAAAAAAA",
    "QD/AAAAAAAA/wAAAAAAAAAB",
    "SL/AADeAAAA/gAAAAIAAAD+",
    "QD/AAAAAAAA/wAAAAEAAAAA",
    "QD/AAAAAAAAAAAAAP8AAAAA",
    "QD/AAAAAAAAAAAAAP8AAAAB",
    "QD/AAAAAAAAAAAAAAAAAAD/",
    "QD/AAAAAAAAAAAAAAAAAAAA"
];
var array5bit_B = [
    "US0CAuSD38g",
    "UUYCA7QBErs",
    "ajEDAm49ReY",
    "UUoCA+juogg",
    "bjEDAjQrOn0",
    "bkoDA3iPVH4",
    "ajUDAt82atY",
    "UU4CA1nljTg",
    "cjEDAghkmFU",
    "ckoDA0TA9lY",
    "izUEAhrxcbg",
    "ck4DAxY8F10",
    "bjUDAlvFFR8",
    "bk4DAxdhexw",
    "ajkDAr7LFAw",
    "UVICAyQ+UJI",
    "TTECAq7UnEM",
    "TUoCA+Jw8kA",
    "ZjUDAmZGozo",
    "TU4CA7CME0s",
    "ajUDAvnk9E4",
    "ak4DA7VAmk0",
    "ZjkDAtle3bI",
    "TVICAxOyzrM",
    "STUCAqHeHtM",
    "SU4CA+16cNA",
    "h6QEAZKdo54",
    "SVICA62zYxM",
    "RTkCAqx1lb4",
    "RVICA/z3WM0",
    "QT0CAkdoxRU",
    "KFYBA46vJCA"
];
var arrayCodeEANBin = [
    [
        "0001101",
        "0011001",
        "0010011",
        "0111101",
        "0100011",
        "0110001",
        "0101111",
        "0111011",
        "0110111",
        "0001011",
    ],
    [
        "0100111",
        "0110011",
        "0011011",
        "0100001",
        "0011101",
        "0111001",
        "0000101",
        "0010001",
        "0001001",
        "0010111",
    ],
    [
        "1110010",
        "1100110",
        "1101100",
        "1000010",
        "1011100",
        "1001110",
        "1010000",
        "1000100",
        "1001000",
        "1110100",
    ],
];
var arrayStructEAN = [
    "000000",
    "001011",
    "001101",
    "001110",
    "010011",
    "011001",
    "011100",
    "010101",
    "010110",
    "011010",
];

var stringStart = "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAACCAQAAADLaIVbAAAANUlEQVQIHQEqANX/A";
var stringMid = "AAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAA";
var stringEnd = "AAAAASUVORK5CYII=\"";

function generateBarcodeImage(inputString, intWidth, intHeight) {
    // Input is a long string of 1"s and 0"s, output is the HTML <img> stack
    // Pads to the last character to ensure length is divisible by 5
    var intRawmod = inputString.length % 5; // Modulo 5 remainder
    // If not evenly divisible, pad with zeroes
    if (intRawmod > 0) {
        for (var i = 0; i < 5 - intRawmod; i++) {
            inputString += "0"
        };
    }
    var arraySeq = new Array((intChunks = inputString.length / 5)); // Create array for as many chunks as are now in input string
    for (var i = 0; i < intChunks; i++) {
        arraySeq[i] = parseInt(inputString.substr(i * 5, 5), 2); // Converts string of 1"s and 0"s to integer array
    }
    // Takes integer array and converts to "<img ...>" graphics for display
    var resultString = "";
    for (var i = 0; i < arraySeq.length; i++) {
        // resultString += `${stringStart}${array5bit_A[arraySeq[i]]}${stringMid}${array5bit_B[arraySeq[i]]}${stringEnd} width="${intWidth}" height="${intHeight}">`;
        resultString += `${stringStart}${array5bit_A[arraySeq[i]]}${stringMid}${array5bit_B[arraySeq[i]]}${stringEnd}>`;
    }
    return resultString;
}

function generateEAN(text) {
    // EAN-13
    var raw = "";
    var intSumOdd = 0;
    var intSumEven = 0;
    var intCheck, i, strStruct;

    // Compute check digit and add it to raw string
    for (i = 0; i < 12; i += 2) {
        intSumEven += parseInt(text[i]);
        intSumOdd += parseInt(text[i + 1]);
    }
    intCheck = (intSumOdd * 3 + intSumEven) % 10;
    if (intCheck > 0) {
        intCheck = 10 - intCheck;
    }
    text += intCheck;

    // Converts Code EAN array into string of 1"s and 0"s
    raw = "101";
    // First six bar sequences
    strStruct = arrayStructEAN[text[0]];
    for (i = 1; i < 7; i += 1) {
        raw += arrayCodeEANBin[strStruct[i - 1]][text[i]];
    }
    // Middle sequence
    raw += "01010";
    // Last six bar sequences, including check digit
    for (i = 0; i < 6; i += 1) {
        raw += arrayCodeEANBin[2][text[i + 7]];
    }
    raw += "101";
    return raw;
}

function barcode(text, height, width) {
    return generateBarcodeImage(generateEAN(text), height, width);
}