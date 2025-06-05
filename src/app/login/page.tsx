import React, { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function PageLogin() {
  const initialLoading: boolean = false
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient initialLoading={initialLoading} />
    </Suspense>
  );
}