import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading, AiFillLike } from "react-icons/ai";
import { RiChatPrivateLine } from "react-icons/ri";
import { BsWechat, BsPersonAdd } from "react-icons/bs";
import { MdLogout, MdDeleteForever } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { BiError, BiCommentAdd } from "react-icons/bi";
import { HiPencilAlt } from "react-icons/hi";
import { FaRegComments } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { ImFilePicture } from "react-icons/im";
import { BsDiscord } from "react-icons/bs"
 
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
  AddComment: ({ ...props }) => {
    return <HiPencilAlt {...props} />;
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
  Delete: ({ ...props }) => {
    return <MdDeleteForever {...props} />;
  },
  Comments: ({ ...props }) => {
    return <FaRegComments {...props} />;
  },
  AddFriend: ({ ...props }) => {
    return <BsPersonAdd {...props} />;
  },
  Notification: ({ ...props }) => {
    return <IoMdNotifications {...props} />;
  },
  Image: ({ ...props }) => {
    return <ImFilePicture {...props} />;
  },
  Discord: ({...props}) => { 
    return <BsDiscord {...props} />
  },
};
