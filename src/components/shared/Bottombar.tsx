import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

interface IProps {}

const Bottombar = ({}: IProps) => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            key={link.label}
            className={` ${isActive && "bg-primary-500 rounded-[10px]"} bottombar-link group flex-center gap-1 flex-col p-2 transition`}
            to={link.route}
          >
            <img
              src={link.imgURL}
              alt="link.label"
              width={24}
              height={24}
              className={`${
                isActive && "invert-white"
              }`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
