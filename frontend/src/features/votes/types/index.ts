export type Vote = [owner: string, on_id: number, message: string];

export interface VotingContract {
  addVote: (on_id: number, message: string) => Promise<void>,
  getAllVotes: () => Promise<Vote[]>;
  getVotesCount: () => Promise<number>
  deployed: () => Promise<void>
}