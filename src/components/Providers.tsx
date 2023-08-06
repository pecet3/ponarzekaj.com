import * as React from "react";
import { Toaster } from "react-hot-toast";

interface IProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FunctionComponent<IProvidersProps> = ({ children }) => {
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {children}
    </>
  );
};

export default Providers;
