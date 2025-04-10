"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { DegreeABI } from "@/lib/contract";
import { uploadToIPFS } from "@/lib/pinata";
import { useWallet } from "../hooks/useWallet";

export default function IssueDegree() {
  const [form, setForm] = useState({
    studentName: "",
    degreeName: "",
    issuedDate: "",
  });
  const [file, setFile] = useState(null);
  const { signer } = useWallet();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    try {
      const ipfsUrl = await uploadToIPFS(file);
      console.log("ipsUrl", ipfsUrl);
      const userAddress = await signer.getAddress();

      // Generate degreeId same as smart contract logic
      const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
        ["string", "string", "string", "string", "address"],
        [
          form.studentName,
          ipfsUrl,
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
        signer
      );

      const tx = await contract.issueDegree(
        form.studentName,
        ipfsUrl,
        form.degreeName,
        form.issuedDate
      );

      await tx.wait();
      alert("Degree Issued Successfully!");
    } catch (error) {
      console.error("Error issuing degree:", error);
      alert("Failed to issue degree.");
    }
  };

  return (
    <div className="p-6 space-y-4">
      <input
        name="studentName"
        onChange={handleChange}
        placeholder="Student Name"
        className="border p-2 w-full"
      />
      <input
        name="degreeName"
        onChange={handleChange}
        placeholder="Degree"
        className="border p-2 w-full"
      />
      <input
        name="issuedDate"
        onChange={handleChange}
        placeholder="Issued Date (YYYY-MM-DD)"
        className="border p-2 w-full"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Issue Degree
      </button>
    </div>
  );
}
