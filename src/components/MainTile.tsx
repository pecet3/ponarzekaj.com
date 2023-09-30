import React, { FunctionComponent } from "react";
import { Main } from "./Main";

interface Props {
  children: React.ReactNode;
}

export const MainTile: FunctionComponent<Props> = ({ children }) => {
  return (
    <Main>
      <div className="w-full max-w-3xl flex flex-col md:rounded-xl bg-transparent sm:bg-slate-800 shadow-none sm:shadow-md sm:shadow-gray-700">
        {children}
      </div>
    </Main>
  );
};
