import React from "react";
import { Link, NavLink } from "react-router-dom";
import MainDrawer from "./MainDrawer";
import { IoClose } from "react-icons/io5";
import { BsCollectionPlay } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiPhoneCall } from "react-icons/bi";
import { FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa";

function MenuDrawer({ drawerOpen, toggleDrawer }) {
  const active = "bg-dry text-subMain";
  const hover = "hover:bg-dry";
  const inActive =
    "rounded sm:gap-10 font-medium text-sm transitions flex gap-6 items-center sm:px-8 px-4 py-4 items-center";
  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  const Links = [
    {
      name: "Movies",
      link: "/movies",
      icon: BsCollectionPlay,
    },
    {
      name: "About Us",
      link: "/about-us",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      icon: BiPhoneCall,
    },
  ];

  const LinkDatas = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/",
    },
    
    {
      icon: FaTelegram,
      link: "https://t.me/",
    },
    {
      icon: FaYoutube,
      link: "https://www.youtube.com",
    },
  ];

  return (
    <MainDrawer drawerOpen={drawerOpen} closeDrawer={toggleDrawer}>
      <div className="flex flex-col w-full h-screen bg-main text-white">
        <div className="flex justify-between items-center p-4 bg-dry">
          <Link onClick={toggleDrawer} to="/">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-24 h-24 object-contain"
            />
          </Link>
          <button
            onClick={toggleDrawer}
            type="button"
            className="w-10 h-10 flex items-center justify-center text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white transitions"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-scroll flex-grow">
          <div className="p-4 space-y-2">
            {Links.map((link, index) => (
              <NavLink
                to={link.link}
                key={index}
                onClick={toggleDrawer}
                className={Hover}
              >
                <link.icon className="text-2xl" /> 
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="p-4 flex justify-center gap-4">
            {LinkDatas.map((link, index) => (
              <a
                href={link.link}
                key={index}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center transitions hover:bg-subMain text-lg bg-white rounded bg-opacity-30"
              >
                <link.icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </MainDrawer>
  );
}

export default MenuDrawer;
