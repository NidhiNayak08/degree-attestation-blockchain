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

    function issueDegree(
        string memory _studentName,
        string memory _ipfsHash,
        string memory _degreeName,
        string memory _issuedDate
    ) public returns (bytes32) {
        bytes32 degreeId = keccak256(
            abi.encodePacked(_studentName, _ipfsHash, _degreeName, _issuedDate, msg.sender)
        );

        degrees[degreeId] = Degree(_studentName, _ipfsHash, _degreeName, _issuedDate, msg.sender);

        emit DegreeIssued(degreeId, _studentName, _ipfsHash);
        return degreeId;
    }

    function verifyDegree(bytes32 _degreeId) public view returns (
        string memory studentName,
        string memory ipfsHash,
        string memory degreeName,
        string memory issuedDate,
        address university
    ) {
        Degree memory degree = degrees[_degreeId];
        require(degree.university != address(0), "Degree not found");
        return (degree.studentName, degree.ipfsHash, degree.degreeName, degree.issuedDate, degree.university);
    }
}