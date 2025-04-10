"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { DegreeABI } from "@/lib/contract";
import { useWallet } from "../hooks/useWallet";

export default function VerifyDegree() {
  const [form, setForm] = useState({
    studentName: "",
    degreeName: "",
    issuedDate: "",
    ipfsHash: "",
  });
  const [degreeData, setDegreeData] = useState(null);
  const { provider } = useWallet();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVerify = async () => {
    if (!provider) {
      alert("Please connect your wallet first.");
      return;
    }

    try {
      const userAddress = await provider
        .getSigner()
        .then((s) => s.getAddress());

      const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
        ["string", "string", "string", "string", "address"],
        [
          form.studentName,
          form.ipfsHash,
          form.degreeName,
          form.issuedDate,
          userAddress,
        ]
      );

      const degreeId = ethers.keccak256(encoded);
      console.log("Generated Degree ID:", degreeId);

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        DegreeABI,
        provider
      );

      const degree = await contract.verifyDegree(degreeId);

      if (!degree.studentName) {
        alert("Degree not found.");
      } else {
        setDegreeData(degree);
      }
    } catch (error) {
      console.error("Error verifying degree:", error);
      alert("Failed to verify degree.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <input
        name="studentName"
        placeholder="Student Name"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="degreeName"
        placeholder="Degree Name"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="issuedDate"
        placeholder="Issued Date (YYYY-MM-DD)"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="ipfsHash"
        placeholder="IPFS URL used during issuing"
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        onClick={handleVerify}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Verify Degree
      </button>

      {degreeData && (
        <div className="mt-4 border p-4 rounded bg-gray-50">
          <p>
            <strong>Student Name:</strong> {degreeData.studentName}
          </p>
          <p>
            <strong>Degree Name:</strong> {degreeData.degreeName}
          </p>
          <p>
            <strong>Issued Date:</strong> {degreeData.issuedDate}
          </p>
          <a
            href={degreeData.ipfsHash}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Document
          </a>
        </div>
      )}
    </div>
  );
}
