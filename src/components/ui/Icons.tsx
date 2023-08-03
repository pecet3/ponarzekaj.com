import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading, AiFillLike } from "react-icons/ai";
import { RiChatPrivateLine } from "react-icons/ri";
import { BsPersonFillAdd, BsWechat } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { BiError } from "react-icons/bi";
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
  Error: ({ ...props }) => {
    return <BiError {...props} />;
  },
  Chat: ({ ...props }) => {
    return <BsWechat {...props} />;
  },
  Like: ({ ...props }) => {
    return <AiFillLike {...props} />;
  },
};
