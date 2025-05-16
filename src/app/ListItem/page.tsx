import React, { Suspense } from 'react';
import ListClient from './ListClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ListClient />
    </Suspense>
  );
}