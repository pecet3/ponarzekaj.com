import Auth from "./Auth";
import { getAuthSession } from "../../../lib/auth";
const page = async () => {
  const session = await getAuthSession();
  if (session)
    return <p className="my-16 h-screen text-center">Jesteś już zalogowany!</p>;
  return <Auth />;
};
export default page;
