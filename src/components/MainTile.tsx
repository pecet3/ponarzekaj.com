import React, { FunctionComponent } from "react";
import { Main } from "./Main";

interface Props {
  children: React.ReactNode;
}

export const MainTile: FunctionComponent<Props> = ({ children }) => {
  return (
    <Main>
      <section className="w-full max-w-3xl flex flex-col lg:rounded-xl bg-transparent sm:bg-slate-800 sm:shadow-md shadow-black ">
        {children}
      </section>
    </Main>
  );
};
