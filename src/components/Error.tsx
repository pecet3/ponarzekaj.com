import * as React from 'react';
import { Icons } from './ui/Icons';


export default function Error () {
  return (
    <main className="flex justify-center flex-col items-center mt-4">
        <Icons.Error size={32} />
        <p className="text-2xl">Ups coś poszło nie tak...</p>
    </main>
  );
}
