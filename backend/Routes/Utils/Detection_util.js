const jwt = require("jsonwebtoken");

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
  createChildren() {
    this.left = new TreeNode(this.value + "0");
    this.right = new TreeNode(this.value + "1");
    return [this.left, this.right];
  }
}

function constructTree(level) {
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
  while (current) {
    nodesInPath.push(current);
    if (current.value === targetValue) break;
    // current = targetValue.startsWith(current.value + "0")
    //   ? current.left
    //   : current.right;
    else if (targetValue.startsWith(current.value + "0") && current.left)
      current = current.left;
    else if (targetValue.startsWith(current.value + "1") && current.right)
      current = current.right;
    else return [];
  }
  return nodesInPath;
}

function generateSetInRange(root, rangeStart, rangeEnd) {
  const resultSet = new Set();
  function traverse(node) {
    if (!node) return;
    const leftChildInRange =
      node.left && node.left.value >= rangeStart && node.left.value <= rangeEnd;
    const rightChildInRange =
      node.right &&
      node.right.value >= rangeStart &&
      node.right.value <= rangeEnd;
    if (leftChildInRange) resultSet.add(node.left.value);
    if (rightChildInRange) resultSet.add(node.right.value);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return Array.from(resultSet);
}

function encodeArrayToTokens(stringArray, secretKey) {
  return stringArray.map((str) => jwt.sign({ data: str }, secretKey));
}

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
    (charCode, index) =>
      charCodes1[index] ^ charCodes2[index] ^ constCodes[index]
  );
  const result = String.fromCharCode(...xorResults);
  return result === modConstant;
}

function findMatchingPair(array1, array2, constant) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (xorStringMatch(constant, array1[i], array2[j])) {
        return { str1: array1[i], str2: array2[j] };
      }
    }
  }
  return null;
}

module.exports = {
  TreeNode,
  constructTree,
  findNodesInPath,
  generateSetInRange,
  encodeArrayToTokens,
  xorStringMatch,
  findMatchingPair,
};
