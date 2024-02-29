let vowelCount = 0;

const textInput = document.getElementById("textInput")
document.getElementById("submitButton").onclick = () => {
    if (textInput.value) {
        for (let char of textInput.value) {
            switch (char.toLowerCase()) {
                case "a":
                case "e":
                case "i":
                case "o":
                case "u":
                    vowelCount++;
                    break;
            }
        }
        let plural = (vowelCount != 1);
        alert(`There ${plural ? "are" : "is"} ${vowelCount} vowel${(plural ? "s" : "")} in the input!`);
        vowelCount = 0;
    }
}