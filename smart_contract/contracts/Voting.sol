// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Voting {
  uint256 votesCount;

  struct Vote {
    address owner;
    uint256 on_id;
    string message;
  }

  Vote[] votes;

  function addVote (uint256 on_id, string memory message) public payable {
    for (uint256 i; i < votes.length; i++) {
      require(votes[i].owner != msg.sender, "You have already voted");
    }

    votesCount += 1;
    votes.push(Vote(msg.sender, on_id, message));
  }

  function getAllVotes () public view returns (Vote[] memory) {
    return votes;
  }

  function getVotesCount () public view returns (uint256) {
    return votesCount;
  }
}