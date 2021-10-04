import React from 'react';
import ClarityContentLayout from '../layouts/ClarityContentLayout';

export default function HomePage() {
  return (
    <ClarityContentLayout>
      <h1 cds-text='title' className='mb-8'>
        Home Page
      </h1>
    </ClarityContentLayout>
  );
}
