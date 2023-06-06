import { Vote } from 'features/votes/types';
import VoteBoxItem from 'features/votes/vote-box-item';
import { getAllVotes } from 'features/votes/vote-slice/vote.slice';
import React, { FC, useEffect, useState } from 'react';


const Index: FC = () => {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const getVotes = async () => {
      const data = await getAllVotes();
      setVotes(data);
    }
    getVotes()
  }, [])
  
  return (
    <>
      <h1 className='text-5xl text-center mt-8'>
        Votes amount: {votes.length}
      </h1>
      <main className='flex gap-4 p-4 mt-12'>
        <VoteBoxItem
          name='George H.W. Bush'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam reprehenderit natus ipsum aliquam quam. Delectus ex aspernatur temporibus totam, cupiditate explicabo mollitia tenetur optio, iste quis dolore, exercitationem eos dolorem?'
          id={1}
          votes={votes.filter((vote) => Number(vote[1]) === 1)}
        />

        <VoteBoxItem
          name='Bill Clinton'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam reprehenderit natus ipsum aliquam quam. Delectus ex aspernatur temporibus totam, cupiditate explicabo mollitia tenetur optio, iste quis dolore, exercitationem eos dolorem?'
          id={2}
          votes={votes.filter((vote) => Number(vote[1]) === 2)}
        />

        <VoteBoxItem
          name='Ross Perot'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam reprehenderit natus ipsum aliquam quam. Delectus ex aspernatur temporibus totam, cupiditate explicabo mollitia tenetur optio, iste quis dolore, exercitationem eos dolorem?'
          id={3}
          votes={votes.filter((vote) => Number(vote[1]) === 3)}
        />
      </main>
    </>
  )
}

export default Index;