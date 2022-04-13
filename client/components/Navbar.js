import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Nav from './Nav';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <>
      <header className="relative max-w-5xl mx-auto px-6 sm:px-12 lg:px-20 py-7">
        <div className="flex justify-between items-center">
          {/* Menu Icon */}
          <MenuIcon
            className="md:!hidden !w-6 !h-6 transition text-secondary hover:!text-white hover:!cursor-pointer"
            onClick={() => setOpen(true)}
          />

          {/* Brand Logo */}
          <Link href="/" passHref>
            <div className="w-2/12 flex items-center hover:cursor-pointer">
              <div className="bg-[#4B5563] text-center h-9 w-9 flex justify-center items-center shrink-0 mr-2 rounded">
                <h1 className="">E</h1>
              </div>
              <h1 className="text-lg">Epictetus</h1>
            </div>
          </Link>

          {/* Nav */}
          <div className="hidden md:flex items-center justify-end w-10/12">
            <Nav />

            {/* Search Input */}
            <div className="flex items-center justify-between shrink-0 rounded-full bg-[#1F2937] py-2.5 px-5">
              <input
                type="text"
                className="bg-transparent focus:outline-none text-sm placeholder:opacity-70 w-full"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <SearchIcon className="!h-4 !w-4 hover:!cursor-pointer hover:!opacity-75" />
            </div>
          </div>

          {/* Search Logo (Mobile) */}
          <SearchIcon className="md:!hidden !h-6 !w-6 !text-secondary hover:!cursor-pointer transition hover:!text-white" />

          {/* Search Input (Mobile) */}
          {/* <div className="absolute -bottom-10 z-10 w-full max-w-lg">
            <div className="flex items-center justify-between rounded-full bg-[#1F2937] py-2.5 px-5">
              <input
                type="text"
                className="bg-transparent focus:outline-none text-sm placeholder:opacity-70 w-full"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon className="!h-4 !w-4 hover:!cursor-pointer hover:!opacity-75" />
            </div>
          </div> */}
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        className={classNames(
          `fixed z-10 h-full w-full top-0 bg-primary p-8 transition-all`,
          open ? 'left-0' : '-left-full'
        )}
      >
        <Nav dir="vertical" />

        <CloseIcon
          className="absolute !w-10 !h-10 !top-0 !right-0 !m-6 !text-secondary hover:!text-white hover:!cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
    </>
  );
}
