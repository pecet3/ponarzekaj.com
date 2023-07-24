import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";
import { RiChatPrivateLine } from "react-icons/ri";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";
export const Icons = {
  Logo: ({ ...props }) => {
    return <RiChatPrivateLine {...props} />;
  },
  Google: ({ ...props }) => {
    return <FcGoogle {...props} />;
  },
  Spinner: ({ ...props }) => {
    return <AiOutlineLoading {...props} />;
  },
  Add: ({ ...props }) => {
    return <BsPersonFillAdd {...props} />;
  },
  Signout: ({ ...props }) => {
    return <MdLogout {...props} />;
  },
  Friend: ({ ...props }) => {
    return <FaUserFriends {...props} />;
  },
  Confirm: ({ ...props }) => {
    return <GiConfirmed {...props} />;
  },
  Reject: ({ ...props }) => {
    return <GiCancel {...props} />;
  },
};
