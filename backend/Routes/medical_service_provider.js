const {
  signatureH,
  concealedLocation,
  encryptedLocationSquare,
  N,
  ePK,
  publicKey,
  P,
} = require("./MU.js");
const paillier = require("paillier-bigint");
const { Pcs, PRcs, hash1, hashAll } = require("./CS.js");

//-----------------------------------------------------------------------

//msp checks the integrity of ePK, publicKey, N, signatureH and hash1 using Pcs
function checkIntegrity(ePK, publicKey, N, signatureH, hash1, Pcs) {
  const hash2 = hashAll(ePK, publicKey, signatureH, N);
  if (hash1 === hash2) {
    return true; //we can even decypt the signature
  }
  return false;
}

//function call
const integrity = checkIntegrity(ePK, publicKey, N, signatureH, hash1, Pcs);
console.log("Integrity:", integrity);

//-----------------------------------------------------------------------------
//generate public and private key pair for MSP
function generateKeys() {
  const p = BigInt(17);
  const q = BigInt(19);
  const publicKey = new paillier.PublicKey(p, q);
  const privateKey = new paillier.PrivateKey(p, q, publicKey);

  return { publicKey, privateKey };
}

//function call to generate public key as PK and private key as PR
const { publicKey: PK, privateKey: PR } = generateKeys();

console.log("Public Key:", PK);
console.log("Private Key:", PR);

//--------------------------------------------------------------------------

const mspLocation = [BigInt(42), BigInt(63), BigInt(65)];
console.log("MSP Location:", mspLocation);

//function to multiply the vector mspLocation with
function matrixMultiply(matrix, vector) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    let sum = 0n;
    for (let j = 0; j < vector.length; j++) {
      sum += matrix[i][j] * vector[j];
    }
    result.push(sum);
  }
  return result;
}

//? applied matrix multiplication sir s yeh equation puchni h

//function to encrypt the genrated matrix using public key
function concealLocation(matrix, publicKey) {
  const Concealed_location = matrixMultiply(matrix, mspLocation);
  return publicKey.encrypt(Concealed_location);
}

//function call
const CLs = concealLocation(P, PK);
console.log("Concealed Location:", CLs);

//-----------------------------------------------------------------------
//encrypting the location square using public key
function encryptLocationSquare(locationSquare, publicKey) {
  return publicKey.encrypt(locationSquare);
}

//function for location square
const locationSquare = mspLocation.reduce((sum, val) => sum + val ** 2n, 0n);

//function call
const ELS = encryptLocationSquare(locationSquare, PK);
console.log("Encrypted Location Square:", ELS);

//-----------------------------------------------------------------------
// CIPHERTEXT
// Compute the sum of the vector mspLocation
function sumVector(vector) {
  return vector.reduce((sum, val) => sum + val, 0n);
}

//compute the sum of squares of the vector mspLocation
function sumSquares(vector) {
  return vector.reduce((sum, val) => sum + val ** 2n, 0n);
}

//append the sumVector and sumSquares to PK
const sumV = sumVector(mspLocation);
const sumS = sumSquares(mspLocation);
const T = publicKey.encrypt(PK + sumV + sumS);

console.log("T:", T);

//-----------------------------------------------------------------------

//msp encrypts (CLs, ELs, N, T) using Pcs and store in Cs and send to Cs
function encryptData(CLs, ELS, N, T, Pcs) {
  const data = [CLs, ELS, N, T];
  return data.map((val) => Pcs.encrypt(val));
}

// Function call
const Cs = encryptData(CLs, ELS, N, T, Pcs);
console.log("Encrypted Data:", Cs);
// it returns a list should it return a value

// send this value to Cs

// ??

//-----------------------------------------------------------------------
module.exports = Cs;



// ----------------------------------------------------------------
// const paillier = require("paillier-js");

// Function to encrypt Cs <- EPcs (CLs, ELs, CAs, EAs, N, T), and send Cs to CS
function encryptCs(CLs, ELs, CAs, EAs, N, T, publicKeyCS) {
  const data = [CLs, ELs, CAs, EAs, N, T];
  return data.map((val) => publicKeyCS.encrypt(val));
}

module.exports = {
  encryptCs,
};
