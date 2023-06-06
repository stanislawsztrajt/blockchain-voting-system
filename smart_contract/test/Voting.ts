import { assert, expect } from 'chai';
import '@nomiclabs/hardhat-ethers'
import hre, { ethers } from 'hardhat'

interface Vote {
  owner: string
  on_id: number,
  message: string;
}

interface Voting {
  addVote: (on_id: number, message: string) => Promise<void>,
  getAllVotes: () => Promise<Vote[]>;
  getVotesCount: () => Promise<number>
  deployed: () => Promise<void>
}

describe("Voting.sol", () => {
  let voting: Voting;
  let deployer;

  beforeEach(async () => {
    deployer = (await hre.getNamedAccounts()).deployer;
    const c_voting = await ethers.getContractFactory('Voting');
    voting = await c_voting.deploy() as unknown as Voting;
    await voting.deployed()
  })

  describe("votes", () => {
    it("add vote to votes", async () => {
      await voting.addVote(1, "He must win!");
      const votes = await voting.getAllVotes();
      assert.equal(votes[0].message, "He must win!");
    })

    it("fail if the same person vote", async () => {
      await voting.addVote(1, "He must win!")
      await expect(voting.addVote(1, "He must win!")).to.be.revertedWith("You have already voted");
    })

    it("returns votes", async () => {
      await voting.addVote(1, "He must win!")
      const votes = await voting.getAllVotes();
      assert.equal(votes.length, 1);
    })

    it("returns votes count", async () => {
      await voting.addVote(1, "He must win!")
      const votes = await voting.getAllVotes();
      assert.equal(votes.length, 1);
    })
  })
})