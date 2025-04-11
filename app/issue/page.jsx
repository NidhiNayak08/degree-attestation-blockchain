"use client";

import { useState, useCallback } from "react";
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
  const [loading, setLoading] = useState(false);
  const { signer } = useWallet();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useCallback(async () => {
    if (!signer) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    setLoading(true);
    try {
      const ipfsUrl = await uploadToIPFS(file);
      console.log("📁 Uploaded to IPFS:", ipfsUrl);

      const userAddress = await signer.getAddress();

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
      console.log("🆔 Generated Degree ID:", degreeId);

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

      const receipt = await tx.wait();
      console.log("📦 Tx Receipt:", receipt);

      // Manually decode the logs
      const iface = new ethers.Interface(DegreeABI);
      let found = false;

      for (const log of receipt.logs) {
        if (log.address.toLowerCase() === contract.target.toLowerCase()) {
          try {
            const parsed = iface.parseLog(log);
            if (parsed.name === "DegreeIssued") {
              console.log("✅ DegreeIssued Event:", parsed.args);
              alert(
                `Degree Issued Successfully!\nDegree ID: ${parsed.args.degreeId}`
              );
              found = true;
              break;
            }
          } catch (err) {
            continue; // log may not be related to this contract
          }
        }
      }

      if (!found) {
        console.warn("⚠️ DegreeIssued event not found in logs.");
        alert("Degree issued, but event log not found.");
      }
    } catch (error) {
      console.error("❌ Error issuing degree:", error);
      alert("Failed to issue degree.");
    } finally {
      setLoading(false);
    }
  }, [signer, file, form]);

  return (
    <div className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-xl font-semibold">Issue Degree</h1>
      <input
        name="studentName"
        value={form.studentName}
        onChange={handleChange}
        placeholder="Student Name"
        className="border p-2 w-full rounded"
      />
      <input
        name="degreeName"
        value={form.degreeName}
        onChange={handleChange}
        placeholder="Degree"
        className="border p-2 w-full rounded"
      />
      <input
        name="issuedDate"
        value={form.issuedDate}
        onChange={handleChange}
        placeholder="Issued Date (YYYY-MM-DD)"
        className="border p-2 w-full rounded"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full text-white px-4 py-2 rounded ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
        }`}
      >
        {loading ? "Issuing..." : "Issue Degree"}
      </button>
    </div>
  );
}
