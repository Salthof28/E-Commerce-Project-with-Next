import React, { Suspense } from 'react';
import LoginClient from './LoginClient';

export default function PageLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginClient />
    </Suspense>
  );
}