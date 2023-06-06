import React, { FC, useEffect, useState } from 'react';
import { sendVote } from '../vote-slice/vote.slice';
import { Vote } from '../types';

export interface VoteBoxItemProps {
  name: string,
  description: string,
  id: number;
  votes: Vote[]
}

const VoteBoxItem: FC<VoteBoxItemProps> = ({ name, description, id, votes }) => {
  const [valueMessage, setValueMessage] = useState('');
  const [response, setResponse] = useState<'' | 'Success! Vote will soon be counted' | 'You have already voted'>('')
  const [loading, setLoading] = useState(false)

  const handleSendVote = async () => {
    setLoading(true)
    try {
      const res = await sendVote(id, valueMessage)
      setResponse(res)
      if (res !== 'You have already voted')
      window.location.reload()
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-3xl'>
        {name}
      </h1>
      <p className='text-sm'>
        {description.substring(0, 150)}
      </p>
      <div className='text-lg'>
        Votes count: {votes.length}
      </div>
      <input type="text" className='rounded px-4 py-1 text-black' placeholder='Message' value={valueMessage} onChange={(e) => setValueMessage(e.target.value)} />
      <button className='bg-indigo-500 px-8 py-1 rounded' onClick={handleSendVote}>
        Vote
      </button>
      {loading ? 'Loading...' : response}
      <div className='mt-8'>
        { votes.length === 0 ? "No votes" : (
          <>
            <h2 className='text-2xl'>
              Votes
            </h2>
            { votes.map(([ owner, on_id, message ]) => (
              <div key={owner}>
                <h4 className='font-black text-sm'>{owner}</h4>
                <p className='text-lg'>
                  {message}
                </p>
              </div>
            ))}
          </>
        ) }
       
      </div>
    </div>
  )
}

export default VoteBoxItem;