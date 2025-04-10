export const contractAddress = "0x9E0AAC3bB7326aE2e4557433BB17493ceb32eE01";
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
    outputs: [],
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
        components: [
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
        internalType: "struct DegreeContract.Degree",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
