
var upperChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var lowerChars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var symbols = [" ", "!", "\"", "#", "$", "%", "&", "\'", "(", ")", "*", "+", ",", "-", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"];

let generateBtn = document.querySelector("#generate");
let validatedInput = false;
let userOptions = {
    pwLength: 0,
    includeLower: false,
    includeUpper: false,
    includeNumbers: false,
    includeSymbols: false
};


function clearUserOptions() {
    userOptions.pwLength = 0;
    userOptions.includeLower = false;
    userOptions.includeUpper = false;
    userOptions.includeNumbers = false;
    userOptions.includeSymbols = false;
}

function isInteger(str) {
    //test to see if string is a valid integer
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseInt(str))
}

function isCharYorN(str) {
    console.log(str);
    //test to see if string is a single character
    if (typeof str != "string") return false;
    if (!(str.length === 1 && str.match(/[a-z]/i))) return false;

    //also test to see if it is Y or N, case insensitive
    if (str.toUpperCase() !== "Y" && str.toUpperCase() !== "N") {
        return false;
    }
    return true;
}

function askForLength() {
    clearUserOptions();  //clear last response, if any

    let response = prompt("Enter minimum password length (8 - 128): ");

    //check for valid interger
    if (!isInteger(response)) {
        alert("Invalid integer value.");
        return false;
    }

    //check to see if integer is within range
    let intResponse = parseInt(response);
    if (intResponse < 8 || intResponse > 128) {
        alert("Invalid password length.  Value must be (8 - 128).");
        return false;
    }

    //success
    userOptions.pwLength = intResponse;
    return true;

}

function askForComposition() {
    let selectionCount = 0;

    let response1 = prompt("Should the password contain at least one lowercase character? Enter Y or N: ")
    if (!isCharYorN(response1)) {
        alert("Invalid Y/N response.");
        clearUserOptions();
        return false;
    } else if (response1.toUpperCase() === "Y") {
        userOptions.includeLower = true;
        selectionCount++;
    }

    let response2 = prompt("Should the password contain at least one uppercase character? Enter Y or N: ")
    if (isCharYorN(response2)) {
        if (response2.toUpperCase() === "Y") {
            userOptions.includeUpper = true;
            selectionCount++;
        }
    } else {
        alert("Invalid Y/N response.");
        clearUserOptions();
        return false;
    }

    let response3 = prompt("Should the password contain at least one numeric value? Enter Y or N: ")
    if (isCharYorN(response3)) {
        if (response3.toUpperCase() === "Y") {
            userOptions.includeNumbers = true;
            selectionCount++;
        }
    } else {
        alert("Invalid Y/N response.");
        clearUserOptions();
        return false;
    }

    let response4 = prompt("Should the password contain at least one special character? Enter Y or N: ")
    if (isCharYorN(response4)) {
        if (response4.toUpperCase() === "Y") {
            userOptions.includeSymbols = true;
            selectionCount++;
        }
    } else {
        alert("Invalid Y/N response.");
        clearUserOptions();
        return false;
    }

    //at least one set needed to be selected for success
    if (selectionCount > 0) {
        return true;
    } else {
        alert("Error: No character types were selected for password generation.")
        return false;
    }


}

function contains(string, array) {
    //see if the string contains at least one item from the array 
    length = array.length;
    while (length--) {
        if (string.indexOf(array[length]) != -1) {
            return true;
        }
    }
    return false;
}

function generatePassword() {
    if (!validatedInput) {
        return "";
    }

    //combine characters from all selected sets into one array
    let comboChars = [];
    if (userOptions.includeLower) {
        for (let i = 0; i < lowerChars.length; i++) {
            comboChars.push(lowerChars[i]);
        }
    }
    if (userOptions.includeUpper) {
        for (let i = 0; i < upperChars.length; i++) {
            comboChars.push(upperChars[i]);
        }
    }
    if (userOptions.includeNumbers) {
        for (let i = 0; i < numbers.length; i++) {
            comboChars.push(numbers[i]);
        }
    }
    if (userOptions.includeSymbols) {
        for (let i = 0; i < symbols.length; i++) {
            comboChars.push(symbols[i]);
        }
    }
    //console.log("Chars to select from", comboChars);

    let password = "";
    let isPasswordSet;
    do {
        //randomly select n number of characters from the combo array
        for (var i = 0; i < userOptions.pwLength; i++) {
            let randomIndex = Math.floor(Math.random() * comboChars.length);
            password = password + comboChars[randomIndex];
        }

        isPasswordSet = true;

        //make sure we have matched all criteria , try again if we missed including something
        if (userOptions.includeLower) {
            if (!contains(password, lowerChars)) {
                isPasswordSet = false;
            }
        }
        if (userOptions.includeUpper) {
            if (!contains(password, upperChars)) {
                isPasswordSet = false;
            }
        }
        if (userOptions.includeNumbers) {
            if (!contains(password, numbers)) {
                isPasswordSet = false;
            }
        }
        if (userOptions.includeSymbols) {
            if (!contains(password, symbols)) {
                isPasswordSet = false;
            }
        }

        //console.log("test pw", password, isPasswordSet);
    } while (!isPasswordSet);


    return password;

}


function writePassword() {
    document.querySelector("#password").value = "";
    document.querySelector("#password").setAttribute("style", "background-color:white;")
    validatedInput = false;

    //prompt for user inputs
    if (askForLength() && askForComposition()) {
        // Write password to the #password input
        validatedInput = true;
        document.querySelector("#password").value = generatePassword();
        document.querySelector("#password").setAttribute("style", "background-color:#AEE583;")
    }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

