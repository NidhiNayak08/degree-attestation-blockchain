"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { DegreeABI } from "@/lib/contract";
import { useWallet } from "../hooks/useWallet";

export default function VerifyDegree() {
  const [degreeId, setDegreeId] = useState("");
  const [degreeData, setDegreeData] = useState(null);
  const { provider } = useWallet();

  const handleVerify = async () => {
    if (!provider) return alert("Connect wallet");
    if (!degreeId) return alert("Enter degree ID");

    try {
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        DegreeABI,
        provider
      );

      const data = await contract.verifyDegree(degreeId);
      setDegreeData({
        studentName: data[0],
        ipfsHash: data[1],
        degreeName: data[2],
        issuedDate: data[3],
        university: data[4],
      });
    } catch (err) {
      console.error(err);
      alert("Verification failed or degree not found");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <input
        value={degreeId}
        onChange={(e) => setDegreeId(e.target.value)}
        placeholder="Enter Degree ID"
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
            <strong>Student:</strong> {degreeData.studentName}
          </p>
          <p>
            <strong>Degree:</strong> {degreeData.degreeName}
          </p>
          <p>
            <strong>Issued:</strong> {degreeData.issuedDate}
          </p>
          <p>
            <strong>University:</strong> {degreeData.university}
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
