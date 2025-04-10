"use client";

import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers"; // ethers v6

export const useWallet = () => {
  const [account, setAccount] = useState(null);
  const [signer, setSigner] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure it only runs in the browser
    if (!window.ethereum) {
      console.warn("MetaMask not detected");
      return;
    }

    const connect = async () => {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const newProvider = new BrowserProvider(window.ethereum);
        const newSigner = await newProvider.getSigner();
        const address = await newSigner.getAddress();

        setProvider(newProvider);
        setSigner(newSigner);
        setAccount(address);
      } catch (err) {
        console.error("Failed to connect wallet:", err);
      }
    };

    connect();
  }, []);

  return { account, signer, provider };
};
