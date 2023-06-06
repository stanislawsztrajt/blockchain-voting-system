import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import { ethers } from 'ethers'
import { contractAbi, contractAddress } from "utils/constans/contract";
import { voteInitialStateSlice } from "./vote-initial-state.slice";
import { VotingContract } from "../types";


const { ethereum } = window as any;

const createEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner();
  const votingContract = new ethers.Contract(contractAddress, contractAbi, signer)

  return votingContract as unknown as VotingContract
}

export const getAllVotes = async () => {
  const votingContract = await createEthereumContract();
  const votes = await votingContract.getAllVotes();
  return votes
}

export const sendVote: (on_id: number, message: string) => Promise<'Success! Vote will soon be counted' | 'You have already voted'> = async (on_id, message) => {
  try {
    const votingContract = await createEthereumContract();
    await votingContract.addVote(on_id, message)
    return 'Success! Vote will soon be counted'
  } catch (err) {
    return 'You have already voted'
  }
}

export const connectWallet: () => Promise<string | null> = async () => {
  try {
    if (!ethereum) return alert("Please install metamask");
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0]
  } catch (err) {
    console.log(err)
    return null
  }
}



const VoteSlice = createSlice({
  name: "vote",
  initialState: voteInitialStateSlice,
  reducers: {
    setAccount: (state, action) => {
      state.account = action.payload
    }
  },
});

export const { setAccount } = VoteSlice.actions;
export const getAccount = (state: RootState) => state.vote.account;

export default VoteSlice.reducer;