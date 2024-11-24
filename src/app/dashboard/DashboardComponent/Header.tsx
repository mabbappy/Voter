/* eslint-disable @next/next/no-img-element */
'use client'
import { useAuth } from "@/context/Authentication/AuthenticationCheckProvider";

const Header = () => {
  const { role, user_info } = useAuth()
  return (
    <>
      <header id="header" className="px-4 py-[10px] z-40 border-b-2">
        <div className="flex items-center justify-between h-full py-0 px-6 w-full">

          <ul style={{ display: "flex", alignItems: "center", flexShrink: 0, }} className="justify-start w-full">

            <li>
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={"https://ionicframework.com/docs/img/demos/avatar.svg"}
                alt="Avatar"
                loading="lazy"
              />
            </li>
            <h3 className="font-semibold capitalize pr-2">
              {
                user_info?.full_name
              }
            </h3>
          </ul>

          <label
            className=" flex lg:hidden items-center cursor-pointer w-fit mr-4"
            htmlFor="sideNavMobile"
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </label>

        </div>
      </header>
    </>
  );
};

export default Header;