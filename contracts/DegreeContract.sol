// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DegreeContract {
    struct Degree {
        string studentName;
        string ipfsHash;
        string degreeName;
        string issuedDate;
        address university;
    }

    mapping(bytes32 => Degree) public degrees;

    event DegreeIssued(bytes32 indexed degreeId, string studentName, string ipfsHash);

    function issueDegree(string memory _studentName, string memory _ipfsHash, string memory _degreeName, string memory _issuedDate) public {
        bytes32 degreeId = keccak256(abi.encodePacked(_studentName, _ipfsHash, _degreeName, _issuedDate, msg.sender));
        degrees[degreeId] = Degree(_studentName, _ipfsHash, _degreeName, _issuedDate, msg.sender);
        emit DegreeIssued(degreeId, _studentName, _ipfsHash);
    }

    function verifyDegree(bytes32 _degreeId) public view returns (Degree memory) {
        return degrees[_degreeId];
    }
}
