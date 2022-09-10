const encryptOpt = document.getElementById("option-E");
const decryptOpt = document.getElementById("option-D");
const encryptBox = document.getElementById("encrypt-box");
const decryptBox = document.getElementById("decrypt-box");
const encryptInput = document.getElementById("encrypt-input");
const decryptInput = document.getElementById("decrypt-input");
const keyInput = document.getElementById("key-input");
const keyOutput = document.getElementById("key");
const codeOutput = document.getElementById("code");
const msgOutput = document.getElementById("message");
const submitButton = document.getElementById("submit");

let msg = "";
let code = "";
let key = 0;

// controls selecting and deselcting of Encrypt and Decrypt boxes
encryptInput.disabled = true;
decryptInput.disabled = true;
keyInput.disabled = true;
encryptOpt.addEventListener("input", () => {
  encryptBox.style.color = "black";
  decryptBox.style.color = "grey";
  encryptInput.disabled = false;
  decryptInput.disabled = true;
  keyInput.disabled = true;
});
decryptOpt.addEventListener("input", () => {
  encryptBox.style.color = "grey";
  decryptBox.style.color = "black";
  decryptInput.disabled = false;
  keyInput.disabled = false;
  encryptInput.disabled = true;
});

const refresher = setInterval(() => {
  // displays Submit button when either of the inputs is typed in
  if (encryptInput.value == "" && decryptInput.value == "") {
    submitButton.style.color = "grey";
    submitButton.disabled = true;
  } else {
    submitButton.style.color = "black";
    submitButton.disabled = false;
  }
  // clears encrypt input when decrypt input is selected and vice verca
  if (encryptOpt.checked) {
    decryptInput.value = "";
    keyInput.value = "";
    msgOutput.textContent = "";
  }
  if (decryptOpt.checked) {
    encryptInput.value = "";
    keyOutput.textContent = "";
    codeOutput.textContent = "";
  }
}, 100);

// calls functions for encryption or decryption when submit button is pressed
submitButton.addEventListener("click", () => {
  if (encryptOpt.checked) {
    msg = encryptInput.value;
    key = Math.floor(Math.random() * 25) + 1;
    code = encrypter(msg, key);
    codeOutput.textContent = code;
    keyOutput.textContent = key;
  }
  if (decryptOpt.checked) {
    code = decryptInput.value;
    key = keyInput.value;
    msg = decrypter(code, key);
    msgOutput.textContent = msg;
  }
});

// encryption and decryption functions
alph = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let upper = 0;
let char = "";
function encrypter(msg, key) {
  let code = "";
  for (i in msg) {
    char = msg[i];
    // console.log(`char: ${char}`); //debug
    // console.log(`char index: ${alph.indexOf(char.toLowerCase())}`); //debug
    // console.log(`key: ${key}`); //debug
    if (char == char.toUpperCase()) {
      upper = 1;
    } else {
      upper = 0;
    }
    if (char.toUpperCase() != char.toLowerCase()) {
      char = char.toLowerCase();
      newInd = alph.indexOf(char) + key;
      // console.log(`newInd: ${newInd}`); //debug
      while (newInd > 25) {
        newInd = newInd - 26;
      }
      // console.log(`newInd (after loop): ${newInd}`); //debug
      // console.log(`alph:[newInd]: ${alph[newInd]}`); //debug
      // console.log(`code: ${code}`); //debug
      if (upper) {
        code += alph[newInd].toUpperCase();
      } else {
        code += alph[newInd];
      }
    } else {
      code += char;
      // console.log(`Char is not alphabetic`); //debug
    }
    // console.log(" "); //debug
  }
  return code;
}

function decrypter(code, key) {
  let msg = "";
  for (i in code) {
    char = code[i];
    if (char == char.toUpperCase()) {
      upper = 1;
    } else {
      upper = 0;
    }
    if (char.toUpperCase() != char.toLowerCase()) {
      char = char.toLowerCase();
      newInd = alph.indexOf(char) - key;
      while (newInd < 0) {
        newInd = newInd + 26;
      }
      if (upper) {
        msg += alph[newInd].toUpperCase();
      } else {
        msg += alph[newInd];
      }
    } else {
      msg += char;
    }
  }
  return msg;
}
