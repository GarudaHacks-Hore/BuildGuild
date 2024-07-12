import React from 'react';
import SurveyRoom from '@/components/SurveyRoom';

export default function Survey() {
  return (
    <main
      style={{ height: 'calc(100vh)' }}
      className='flex flex-col items-center justify-center gap-3'
    >
      <div className='flex items-center w-full h-full justify-center'>
        {/* <div className='w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6'>
        </div> */}
        <div className='bg-white flex flex-col shadow-lg gap-2 rounded-3xl p-6 w-full h-full justify-center mx-60 mt-15'>
          <SurveyRoom />
        </div>
      </div>
    </main>
  );
}
