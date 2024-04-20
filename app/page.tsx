"use client";

import clsx from "clsx";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const params = useParams();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const currentHash = window.location.hash.replace("#", "");
    setHash(currentHash);
  }, [params]);

  return (
    <main className="flex min-h-screen lg:flex-row flex-col relative bg-surface-50 overflow-x-clip">
      <nav className="contents">
        <ul className="w-screen lg:w-max h-fit lg:h-screen bg-secondary-600 text-black flex lg:flex-col flex-col sm:flex-row justify-center sm:sticky left-0 top-0 items-end uppercase lg:pl-4 text-xl gap-x-8">
          <li
            className={clsx("w-max py-3 px-4 flex-1 lg:flex-none text-center", {
              "border-primary-50 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
                hash === "home",
            })}
          >
            <Link href="#home" >
              Home
            </Link>
          </li>
          <li
            className={clsx("w-max py-3 px-4 flex-1 text-center lg:flex-none", {
              "border-primary-50 font-bold border-b-2 lg:border-b-0 lg:border-r-2":
                hash === "contact",
            })}
          >
            <Link href="#contact" >
              Contact
            </Link>
          </li>
          <li className={clsx("w-max py-3 px-4 flex-1 text-center  lg:flex-none ")}>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSf3zQ7v5da7NYgnnPBfGzkIGbLJZdwnA5YbInfdDgm3zNWOYQ/viewform" target="_blank" rel="noreferrer" className="flex flex-row gap-x-2" >
              <span>
                Credit App
              </span>
              <span className="text-xs self-start flex">
                [_↗]
              </span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col w-full text-white">
        <section className="bg-primary-800/85  h-screen gap-y-4 w-full justify-center flex flex-col px-10">
          <div className="gap-y-2 flex flex-col">
            <h1 className="text-5xl font-black">CMB AUTO SALES</h1>
            <p className="font-bold text-xl">Family Owned Since 1946</p>
          </div>
          <a
            className="rounded-full p-4 bg-primary-200 w-max font-bold shadow-primary-50 shadow-sm hover:bg-primary-300 outline-primary-50 outline-4 transition-colors "
            href="https://docs.google.com/forms/d/e/1FAIpQLSf3zQ7v5da7NYgnnPBfGzkIGbLJZdwnA5YbInfdDgm3zNWOYQ/viewform"
            target="_blank"
          >
            <span className="text-surface-900 uppercase flex flex-row gap-2">
              <span>
                Submit Credit Application
              </span>
              <span className="text-xs self-start flex">
                [_↗]
              </span>
            </span>
          </a>
        </section>
        <section
          id="contact"
          className="bg-secondary-800/85 min-h-24 py-10 space-y-4  w-full flex flex-row flex-wrap px-4 lg:px-10 gap-x-4 justify-around"
        >
          <div className="flex-initial w-full border-b-2 pb-4 border-surface-400/25 ">
            <h2 className="text-xl underline">Contact</h2>
            <p>Send us an email or drop on by.</p>
          </div>
          <section className="flex flex-col sm:flex-none sm:grid gap-x-4 gap-y-2 grid-cols-[auto,_1fr] flex-1 sm:min-w-80" id="hours">
            <h3 className="col-span-full font-black underline uppercase text-lg ">
              Hours
            </h3>
            <span className="font-bold">Monday - Friday</span>
            <span>8:00 AM - 5:00 PM</span>
            <span className="font-bold">Saturday</span>
            <span>8:00 AM - 12:00 PM</span>
            <span className="font-bold">Sundays, Holy Days</span>
            <span>Closed</span>
          </section>
          <section className="flex-none min-w-32">
            <h3 className="col-span-full font-black underline uppercase text-lg">
              Address
            </h3>
            <p>
              16333 County Road V<br />
              Fort Morgan, CO 80701
            </p>
          </section>
          <section className="flex-none">
            <h3 className="col-span-full font-black underline uppercase text-lg">
              Phone
            </h3>
            <a href="tel:+9705676156">

              (970) 867-6156
            </a>
          </section>
        </section>
        <footer className="bg-primary-800 h-max text-sm py-4 w-full justify-around flex flex-col md:flex-row px-10 gap-y-2">
          <p>© CMB AUTO SALES</p>
          <a href="https://mattkbrat.com" target="_blank" rel="noreferrer" className="flex flex-row gap-2 text-xs">
            <span>
              Designed and Created by
              Matthew Bratrsovsky
            </span>
            <span className="text-xs self-start flex">
              [_↗]
            </span>
          </a>
        </footer>
      </div>
    </main>
  );
}
