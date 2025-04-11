export const contractAddress = "0xf7D2172b75ED67FE613988945a58Bebb15315076";
export const DegreeABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "degreeId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "studentName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "DegreeIssued",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "degrees",
    outputs: [
      {
        internalType: "string",
        name: "studentName",
        type: "string",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "degreeName",
        type: "string",
      },
      {
        internalType: "string",
        name: "issuedDate",
        type: "string",
      },
      {
        internalType: "address",
        name: "university",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_studentName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "_degreeName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_issuedDate",
        type: "string",
      },
    ],
    name: "issueDegree",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_degreeId",
        type: "bytes32",
      },
    ],
    name: "verifyDegree",
    outputs: [
      {
        internalType: "string",
        name: "studentName",
        type: "string",
      },
      {
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
      {
        internalType: "string",
        name: "degreeName",
        type: "string",
      },
      {
        internalType: "string",
        name: "issuedDate",
        type: "string",
      },
      {
        internalType: "address",
        name: "university",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
