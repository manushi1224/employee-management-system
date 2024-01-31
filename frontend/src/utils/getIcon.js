import { CiCalendarDate } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { RxDashboard } from "react-icons/rx";
import { IoShareSocialSharp, IoBanOutline } from "react-icons/io5";
import { FaLinkedin, FaUserPlus, FaMailBulk, FaGithub } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";

const getIcon = (icon) => {
  switch (icon) {
    case "leave":
      return <CiCalendarDate className="mb-1 me-1" />;
    case "profile":
      return <CgProfile className="mb-1 me-1" />;
    case "dashboard":
      return <RxDashboard className="mb-1 me-1" />;
    case "email":
      return <FaMailBulk className="mb-1 me-2" />;
    case "linkedIn":
      return <FaLinkedin className="mb-1 me-2" />;
    case "joiningDate":
      return <FaUserPlus className="mb-1 me-2" />;
    case "githubId":
      return <FaGithub className="mb-1 me-2" />;
    case "share":
      return <IoShareSocialSharp className="mb-1 me-3" />;
    case "check":
      return <GiCheckMark className="mb-1 me-3" />;
    case "reject":
      return <IoBanOutline className="mb-1 me-3" />;
    default:
      return;
  }
};

export default getIcon;
