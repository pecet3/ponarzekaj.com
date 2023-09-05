import * as React from "react";
import { Icons } from "./ui/Icons";

export const Error = () => {
  return (
    <main className="flex justify-start flex-col items-center h-screen">
      <div className="flex flex-col mt-24 items-center">
        <Icons.Error size={64} />
        <p className="text-xl">Ups coś poszło nie tak...</p>
      </div>
    </main>
  );
};
