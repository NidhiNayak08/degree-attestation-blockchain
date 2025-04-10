// lib/hash.js
import { ethers } from "ethers";

export function generateDegreeId(
  studentName,
  ipfsHash,
  degreeName,
  issuedDate,
  universityAddress
) {
  return ethers.utils.keccak256(
    ethers.utils.defaultAbiCoder.encode(
      ["string", "string", "string", "string", "address"],
      [studentName, ipfsHash, degreeName, issuedDate, universityAddress]
    )
  );
}
