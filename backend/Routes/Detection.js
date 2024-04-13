const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bodyParser = require("body-parser").json();

const {
  TreeNode,
  constructTree,
  findNodesInPath,
  generateSetInRange,
  encodeArrayToTokens,
  findMatchingPair,
} = require("./Utils/wban.js");

router.post("/detect",bodyParser ,(req, res) => {
  const { targetValue, rangeStart, rangeEnd } = req.body;
      const targetValueBinary = targetValue.toString(2);
      const rangeStartBinary = rangeStart.toString(2);
      const rangeEndBinary = rangeEnd.toString(2);
  const secretKey = process.env.SECRET_KEY;
  const normal = process.env.NORMAL;
  const n = 10;

  try {
    const root = constructTree(n);
    const nodesInPath = findNodesInPath(root, targetValueBinary);
    const valuesInPath = nodesInPath.map((node) => node.value);
    const resultSet = generateSetInRange(root, rangeStartBinary, rangeEndBinary);

    const pathSet = encodeArrayToTokens(valuesInPath, secretKey);
    const rangeSet = encodeArrayToTokens(resultSet, secretKey);

    const matchingPair = findMatchingPair(pathSet, rangeSet, normal);

      if (matchingPair) {
        res.status(200).send("Normal")
      }
      else {
          res.send("Critical")
      }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

module.exports = router;
