import React, { FunctionComponent } from "react";
import { Main } from "./Main";

interface Props {
  children: React.ReactNode;
  paddingBottom?: boolean;
}

export const MainTile: FunctionComponent<Props> = ({
  children,
  paddingBottom,
}) => {
  return (
    <Main>
      <section
        className={`w-full max-w-3xl flex flex-col sm:rounded-md bg-transparent sm:bg-slate-800 sm:shadow-md shadow-black ${
          paddingBottom ? "" : ""
        }`}
      >
        {children}
      </section>
    </Main>
  );
};
