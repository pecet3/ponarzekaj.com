import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: PageProps) => {
  const { id } = params;
  return <main className="flex flex-col min-h-screen">{id}</main>;
};

export default page;
