import BullshitCollection from "./bullshit.js";

export default class BullshitParser extends HTMLElement {
    constructor() {
        super();
        let bullshit = this.getBullShit();
        this.parseBullshit(bullshit);
    }

    /**
     * This method builds a array of alphabets in the most bullshit manner I could think of
     *
     * @returns {Array} of alphabet, from a to the mother fucking ö
     */
    getAlphabets() {
        let alphabet = [];
        for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
            alphabet.push(String.fromCharCode(i));
        }
        // For some bullshit reason these don't come straight after z
        alphabet.push("å");
        alphabet.push("ä");
        alphabet.push("ö");
        return alphabet;
    }

    getBullShit() {
        return BullshitCollection.bullshits;
    }

    isABullshitSpaceOrLetter(bullshitSpace) {
        return bullshitSpace < 0;
    }

    parseBullshit(bullshit) {
        let wordsToSearchFor = [" ja ", " kun ", " vai ", " tai ", " sai ", " sekä ", " että ", " eli ",
            " joko ", " mutta ", " vaan ", " siksi ", " siis ", " sillä ", " näet ", " nimittäin ",
            " vaikka ", " kunnes ", " mikäli ", " koska ", " jotta ", " että "];
        let alphabet = this.getAlphabets();
        let notBullshitCount = 0;
        bullshit.map(bullShitSentence => {
            for (let i = 1; i < alphabet.length; i++) {
                let bs = bullShitSentence.message.toLowerCase();
                let rotatedShit = bs.split("");
                rotatedShit.map((a, j) => {
                    let whatIndexIsThisBullshitAlphabet = alphabet.indexOf(a);
                    // We ain't giving this rotation no space whatsoever
                    if (this.isABullshitSpaceOrLetter(whatIndexIsThisBullshitAlphabet)) {
                        return;
                    }
                    let whatKindOfBullshitShouldThisLetterTurnInto = whatIndexIsThisBullshitAlphabet + i;
                    // We don't want any bullshit index out of bounds
                    if (whatKindOfBullshitShouldThisLetterTurnInto >= alphabet.length) {
                        whatKindOfBullshitShouldThisLetterTurnInto -= alphabet.length;
                    }
                    rotatedShit[j] = alphabet[whatKindOfBullshitShouldThisLetterTurnInto];
                });
                //console.log("Rotated " + i);
                //console.log(rotatedShit.join(""));
                let joinedShit = rotatedShit.join("");
                for (let w of wordsToSearchFor) {
                    if (joinedShit.match(w) != null) {
                        console.log(joinedShit);
                        notBullshitCount++;
                        break;
                    }
                }
            }
        });
        console.log("NotBUllshitCOunt: " + notBullshitCount);
    }

}

if (!customElements.get("bullshit-parser")) {
    customElements.define("bullshit-parser", BullshitParser);
}
