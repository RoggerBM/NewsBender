import React from "react";
import Navbar from "../components/Navbar";
import { Body } from "../components/Body";
import { Header } from "../components/Header";
import { RiMenuLine, RiCloseLine } from "@remixicon/react";
import { Icon } from "@tremor/react";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function PageReport() {
  const [isNavbarVisible, setNavbarVisible] = useState(true);

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };
  return (

    <div className="relative bg-white dark:bg-slate-950 w-full h-screen">
      <div className="md:w-64 fixed hidden md:block">
        <Navbar />
      </div>
      <div className="md:ml-[18rem] text-black dark:text-white">
        <div className="p-4 lg:hidden" onClick={toggleNavbar}>
          <Icon
            icon={RiMenuLine}
            className="cursor-pointer rounded-full w-8 h-8 border-transparent bg-slate-400 dark:bg-white text-black dark:text-black"
            variant="solid"
          />
        </div>
        <Header />
        <div className="p-4 h-full">
          <div className="rounded-md max-h-max">
            <Outlet />
          </div>
        </div>

      </div>
    </div>

  );
}

export default PageReport;
