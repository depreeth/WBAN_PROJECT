require("dotenv").config();
const jwt = require("jsonwebtoken");
secretKey = process.env.SECRET_KEY;
normal = process.env.NORMAL;

console.log(normal);
console.log(secretKey);

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  createChildren() {
    if (this.left === null) {
      this.left = new TreeNode(this.value + "0");
    }
    if (this.right === null) {
      this.right = new TreeNode(this.value + "1");
    }

    return [this.left, this.right];
  }
}

function printTree(root, level = 0, prefix = "Root: ") {
  if (root !== null) {
    console.log(" ".repeat(level * 4) + prefix + (root.value || "null"));
    if (level < n) {
      // Print up to level n
      if (root.left) {
        printTree(root.left, level + 1, "L: ");
      }

      if (root.right) {
        printTree(root.right, level + 1, "R: ");
      }
    }
  }
}

function constructTree(level) {
  if (level < 0) {
    console.log("Invalid level.");
    return null;
  }
  const root = new TreeNode("");
  let currentLevel = 0;
  const queue = [root];

  while (currentLevel < level) {
    const nodesAtCurrentLevel = queue.length;

    for (let i = 0; i < nodesAtCurrentLevel; i++) {
      const currentNode = queue.shift();
      const children = currentNode.createChildren();
      queue.push(...children);
    }

    currentLevel++;
  }
  return root;
}

function findNodesInPath(root, targetValue) {
  const nodesInPath = [];
  let current = root;

  while (current !== null) {
    nodesInPath.push(current);
    if (current.value === targetValue) {
      break;
    } else if (targetValue.startsWith(current.value + "0") && current.left) {
      current = current.left;
    } else if (targetValue.startsWith(current.value + "1") && current.right) {
      current = current.right;
    } else {
      return [];
    }
  }
  return nodesInPath;
}


function generateSetInRange(root, rangeStart, rangeEnd) {
  const resultSet = new Set();
  const parentsToRemove = new Set();

  function traverse(node) {
    if (!node) {
      return;
    }
    const leftChildInRange =
      node.left && node.left.value >= rangeStart && node.left.value <= rangeEnd;
    const rightChildInRange =
      node.right &&
      node.right.value >= rangeStart &&
      node.right.value <= rangeEnd;

    if (leftChildInRange && rightChildInRange) {
      // Remove children and add the parent to the result set
      // node.left = null;
      // node.right = null;
      resultSet.delete(node.left.value);
      resultSet.delete(node.right.value);
      resultSet.add(node.value);
    } else if (leftChildInRange) {
      resultSet.add(node.left.value);
    } else if (rightChildInRange) {
      resultSet.add(node.right.value);
    }
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return Array.from(resultSet);
}


const n = 5;
const root = constructTree(n);
printTree(root);

const targetValue = "0010";
const nodesInPath = findNodesInPath(root, targetValue);

const valuesInPath = nodesInPath.map((node) => node.value);
console.log("Nodes in the path for value", targetValue + ":", valuesInPath);

const rangeStart = "0010";
const rangeEnd = "1010";

const resultSet = generateSetInRange(root, rangeStart, rangeEnd);

console.log("Generated set:", resultSet);

// ----------------------- Encode the arrays --------------------
function encodeArrayToTokens(stringArray, secretKey) {
  const encodedTokens = [];

  stringArray.forEach((str) => {
    const payload = str;
    const encodedToken = jwt.sign(payload, secretKey);
    encodedTokens.push(encodedToken);
  });

  return encodedTokens;
}

const pathSet = encodeArrayToTokens(valuesInPath, secretKey);
console.log("Encoded Tokens - Path Set Array :", pathSet);
const rangeSet = encodeArrayToTokens(resultSet, secretKey);
console.log("Encoded Tokens - Generated Set Array :", rangeSet);

function xorStringMatch(constant, str1, str2) {
  if (str1.length != str2.length) {
    return false;
  }
  const diff = str1.length - constant.length;

  const nullChars = "\0".repeat(diff);
  const modConstant = constant + nullChars;

  const charCodes1 = str1.split("").map((char) => char.charCodeAt(0));
  const charCodes2 = str2.split("").map((char) => char.charCodeAt(0));
  const constCodes = modConstant.split("").map((char) => char.charCodeAt(0));

  const xorResults = charCodes1.map(
    (charCode, index) => constCodes[index] ^ charCode ^ charCodes2[index]
  );

  const characters = xorResults.map((charCode) =>
    String.fromCharCode(charCode)
  );
  const result = characters.join("");
  const match = result == modConstant;
  return match;
}

function findMatchingPair(array1, array2) {
  for (const str1 of array1) {
    for (const str2 of array2) {
      const xorResult = xorStringMatch(normal, str1, str2);
      if (xorResult) {
        return [str1, str2, { xorResult: xorResult }];
      }
    }
  }
  return null;
}

const matchingPair = findMatchingPair(pathSet, rangeSet, normal);
if (matchingPair) {
  console.log("Matching Pair Found:", matchingPair);
} else {
  console.log("No Matching Pair Found.");
}

// Create a route that will call the function