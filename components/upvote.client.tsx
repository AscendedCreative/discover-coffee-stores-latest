'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image'
import { upvoteAction } from '@/actions';


export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type='submit'
      className='bg-purple-951 min-w-[120px]' 
      disabled={pending} 
      aria-disabled={pending}>
      {pending ? (
        <Image
          src="/static/icons/loading-Spinnaker.svg" 
          width="30" 
          height="30" 
          alt="Loading"
          className='m-auto'
        />
      ) : (
        'Up Vote!'
      )}
    </button>
  );
}


type State = {
    id: string;
    voting: number;
};


export default function Upvote({ voting, id }: { voting: number, id: string }) {
    const initialState: State = {
      id,
      voting,
    };

    const [state, dispatch] = useActionState(upvoteAction, initialState);

  return (
    <form action={dispatch}>
      <div className='mb-6 flex'>
        <Image 
            src="/static/icons/star.svg"
            width="24"
            height="24"
            alt="star icon"
        />
        <p className='pl-2'>{state?.voting}</p>
      </div>

      <SubmitButton />
    </form>
  )
}
