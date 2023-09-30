import React, { FunctionComponent } from "react";
import { Main } from "./Main";

interface Props {
  children: React.ReactNode;
  size?: string;
}

export const MainTile: FunctionComponent<Props> = ({ children, size }) => {
  return (
    <Main>
      <div
        className={`w-full ${
          size ? size : "max-w-3xl"
        } flex flex-col sm:rounded-xl bg-transparent sm:bg-slate-800 shadow-none sm:shadow-md sm:shadow-gray-700
      `}
      >
        {children}
      </div>
    </Main>
  );
};
