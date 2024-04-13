const paillier = require("paillier");

// Constants
const N = 1024; // Replace with your desired constant value

// Function to generate a random 3x3 invertible matrix
function generateInvertibleMatrix() {
  let matrix;
  do {
    matrix = [
      [Math.random(), Math.random(), Math.random()],
      [Math.random(), Math.random(), Math.random()],
      [Math.random(), Math.random(), Math.random()],
    ];
  } while (Math.abs(paillier.utils.det(matrix)) < 1e-5);

  return matrix;
}

// Function to perform matrix multiplication
function matrixMultiply(matrix, vector) {
  return [
    matrix[0][0] * vector[0] +
      matrix[0][1] * vector[1] +
      matrix[0][2] * vector[2],
    matrix[1][0] * vector[0] +
      matrix[1][1] * vector[1] +
      matrix[1][2] * vector[2],
    matrix[2][0] * vector[0] +
      matrix[2][1] * vector[1] +
      matrix[2][2] * vector[2],
  ];
}

// Generate MU location
const muLocation = [
  /* Replace with your actual coordinates */
];
console.log("MU Location:", muLocation);

// Step 1: Generate invertible matrix P
const P = generateInvertibleMatrix();

// Step 2: Conceal location in C_lu
const PInverse = paillier.utils.modInv(paillier.utils.det(P), N);
const concealedLocation = matrixMultiply(P, muLocation);
console.log("Concealed Location:", concealedLocation);

// Step 3: Encrypt location in E_lu
const { publicKey, privateKey } = new paillier();
const encryptedLocation = publicKey.encrypt(
  muLocation.reduce((sum, val) => sum + val ** 2, 0)
);
console.log("Encrypted Location:", encryptedLocation);

// Step 4: Generate signature H using hash function
const hashInput = publicKey.encrypt(paillier.utils.det(P)); // Assuming PK_mu(P) is the determinant of P
const hashValue = hash(hashInput, N, publicKey);
console.log("Signature H:", hashValue);

// Hash function
function hash(...args) {
  const hash = require("crypto").createHash("sha256");
  args.forEach((arg) => hash.update(arg.toString()));
  return hash.digest("hex");
}
