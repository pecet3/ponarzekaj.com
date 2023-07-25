import React from "react";
import { getAuthSession } from "../../../lib/auth";

const page = async () => {
  const session = await getAuthSession();
  if (!session)
    return (
      <p className="flex flex-col background min-h-screen">
        Nie jesteś zalogowany, aby przeglądać profil
      </p>
    );
  return (
    <main className="flex flex-col background min-h-screen">
      {session.user.name}
    </main>
  );
};

export default page;
