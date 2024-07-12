"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SurveyRoom from '@/components/SurveyRoom';
import { Button } from '@/components/ui/button';

export default function Survey() {
  const router = useRouter();
  const [phase, setPhase] = useState<number>(1);

  const handleNext = () => {
    if (phase === 4) {
      router.push('/profile'); 
    }
  };

  return (
    <main
      style={{ height: 'calc(100vh)' }}
      className='flex flex-col items-center justify-center gap-3 relative'
    >
      <div className='flex items-center w-full h-full justify-center'>
        <div className='bg-white flex flex-col shadow-lg gap-2 rounded-3xl p-6 w-full h-full justify-center mx-60 mt-15'>
          <SurveyRoom setPhase={setPhase} />
        </div>
      </div>
      {phase === 4 && (
        <Button
          onClick={handleNext}
          className='absolute bottom-10 right-10'
        >
          Next
        </Button>
      )}
    </main>
  );
}
