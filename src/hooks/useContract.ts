import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, encodeFunctionData } from 'viem';
import { CipherGrantLabABI } from '../lib/contractABI';

// Contract address - this should be set after deployment
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export const useGrantContract = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, isPending, error } = useWriteContract();

  // Create a new grant with encrypted data
  const createGrant = async (amount: string, deadline: number, maxApplicants: number, description: string) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet');
    }

    try {
      // In a real implementation, you would encrypt the data using FHE
      // For demo purposes, we'll use the raw values
      const encryptedAmount = parseEther(amount);
      const encryptedDeadline = BigInt(deadline);
      const encryptedMaxApplicants = BigInt(maxApplicants);

      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CipherGrantLabABI,
        functionName: 'createGrant',
        args: [encryptedAmount, encryptedDeadline, encryptedMaxApplicants, description],
      });
    } catch (err) {
      console.error('Error creating grant:', err);
      throw err;
    }
  };

  // Submit an application for a grant
  const submitApplication = async (grantId: number, requestedAmount: string, proposal: string) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet');
    }

    try {
      const encryptedAmount = parseEther(requestedAmount);
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CipherGrantLabABI,
        functionName: 'submitApplication',
        args: [BigInt(grantId), encryptedAmount, proposal],
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      throw err;
    }
  };

  // Review an application with encrypted scoring
  const reviewApplication = async (grantId: number, applicant: string, score: number) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet');
    }

    try {
      // In FHE implementation, score would be encrypted
      const encryptedScore = BigInt(score);
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CipherGrantLabABI,
        functionName: 'reviewApplication',
        args: [BigInt(grantId), applicant as `0x${string}`, encryptedScore],
      });
    } catch (err) {
      console.error('Error reviewing application:', err);
      throw err;
    }
  };

  // Approve an application
  const approveApplication = async (grantId: number, applicant: string) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet');
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CipherGrantLabABI,
        functionName: 'approveApplication',
        args: [BigInt(grantId), applicant as `0x${string}`],
      });
    } catch (err) {
      console.error('Error approving application:', err);
      throw err;
    }
  };

  // Fund a grant
  const fundGrant = async (grantId: number, amount: string) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet');
    }

    try {
      const fundAmount = parseEther(amount);
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CipherGrantLabABI,
        functionName: 'fundGrant',
        args: [BigInt(grantId), fundAmount],
      });
    } catch (err) {
      console.error('Error funding grant:', err);
      throw err;
    }
  };

  return {
    createGrant,
    submitApplication,
    reviewApplication,
    approveApplication,
    fundGrant,
    isPending,
    error,
    isConnected,
    address,
  };
};

// Hook for reading contract data
export const useGrantData = () => {
  const { data: grants, isLoading: grantsLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherGrantLabABI,
    functionName: 'getAllGrants',
  });

  const { data: applications, isLoading: applicationsLoading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CipherGrantLabABI,
    functionName: 'getAllApplications',
  });

  return {
    grants,
    applications,
    isLoading: grantsLoading || applicationsLoading,
  };
};
