import BullshitCollection from "./bullshit.js";
import bullshit from "./bullshit";

export default class BullshitParser extends HTMLElement {
    constructor() {
        super();
        let bullshit = this.getBullShit();
        let windowPathName = window.location.pathname.substring(1);
        if (windowPathName !== "") {
            this.test(window.location.pathname.substring(1));
        } else {
            this.parseBullshit(bullshit);
        }
    }

    test(x) {

        let bullshit = this.getBullShit();
        let alphabet = this.getAlphabets();
        for (let i = 1; i < alphabet.length; i++) {
            let bs = bullshit[x].message.toLowerCase();
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
            let joinedShit = rotatedShit.join("");
            console.log("ROT-" + i + ": " +joinedShit)
        }
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

        let conjuctions = ["että", "jotta", "koska", "kun", "jos", "vaikka", "kunnes", "mikäli"];
        let reflectionConjuctions = ["eli", "joko", "tai", "kuin", "myös", "mutta", "niin", "kuin", "kin", "sekä", "vaan", "vai"];
        let pronouns = ["minä", "sinä", "me", "te", "he", "tuo", "nämä", "nuo", "ne",
        "kuka", "mikä", "kumpi", "joka", "jokainen", "jompikumpi", "jokin", "kukin", "mikin", "kumpikin", "kumpianenkin", "kukaan", "kenkään",
        "mikään", "kumpikaan", "kumpianenkaan", "eräs", "muuan", "itse", "kaikki", "molemmat", "moni", "toinen",
        "sama", "samainen", "ainoa", "usea", "harva", "itse", "toinen"];

        let endings = ["mme", "ssa", "llä", "jen", "neet", "mman", "mmat", "nsa", "nsä",
            "asti", "jät", "ijat", "kaan", "ttä", "ssä", "kään", "ntää", "yään", "dään", "kään",
            "mään", "estä", "äisi", "yksi", "ättä", "ässä",  "ästä", "ämme", "tävä", "nät", "alle", "elle",
        "lasta", "vasta", "jasta", "kasta", "ihin", "stö", "steen"];
        let wordsToSearchFor = [...conjuctions, ...reflectionConjuctions, ...pronouns, "eikä"];

        let alphabet = this.getAlphabets();
        let notBullshitCount = 0;
        bullshit.map((bullShitSentence, bullshitIndex) => {
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
                let joinedShit = rotatedShit.join("");
                let found = false;
                for (let w of wordsToSearchFor) {
                    if (joinedShit.match(" " + w + " ") != null &&
                        joinedShit.match(/[xzwqf]/) == null) {
                        console.log( bullshitIndex + ": ROT-" + i + ": " + joinedShit);
                        found = true;
                        notBullshitCount++;
                        break;
                    }
                }
                if (found) {
                    break;
                }
                for (let end of endings) {
                    if (joinedShit.split(" ").some(w => w.endsWith(end)) &&
                        joinedShit.match(/[xzwqf]/) == null) {
                        console.log(bullshitIndex + ": ROT-" + i + ": " + joinedShit);
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
