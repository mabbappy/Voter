import { useParams, usePathname } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdHowToVote, MdOutlineWhereToVote } from "react-icons/md";
import { RiDashboardFill } from "react-icons/ri";

import { useAuth } from "@/context/Authentication/AuthenticationCheckProvider";
import {
  MdSupportAgent
} from "react-icons/md";


export const Router = () => {
  const pathname = usePathname();
  const params = useParams()

  const path_check = [
    {
      svg: <RiDashboardFill />,
      link: "/dashboard",
      html: "Dashboard",
      access: "eco/voter",
    },
    {
      svg: <MdOutlineWhereToVote />,
      link: "/dashboard/constituency",
      html: "Constituency",
      access: "eco",
    },
    {
      svg: <AiOutlineUser className="" />,
      link: "/dashboard/candidate",
      html: "Candidate",
      access: "eco",
    },
    {
      svg: <AiOutlineUser className="" />,
      link: "/dashboard/candidate/add",
      html: "Add Candidate",
      access: "eco",
    },
    {
      svg: <FaPeopleGroup className="" />,
      link: "/dashboard/party",
      html: "Party",
      access: "eco",
    },
    {
      svg: <MdHowToVote className="" />,
      link: "/dashboard/add-vote",
      html: "Add vote",
      access: "voter",
    },
    {
      svg: <MdHowToVote className="" />,
      link: "/dashboard/result",
      html: "Result",
      access: "voter/eco",
    },
    {
      svg: <IoSettings className="" />,
      link: "/dashboard/settings",
      html: "Settings",
      access: "eco",
    },
  ];
  const { role }: any = useAuth()
  const check = path_check?.filter(r => r?.access.includes(role));
  return check
}

export const CheckRouter = async () => {
  const path_check = Router()
  const pathname = usePathname()
  const params = useParams()
  const { productID, orderID } = params
  const { role }: any = useAuth()

  const route_check = [
    ...path_check,
    {
      svg: <MdSupportAgent className="" />,
      link: "/dashboard/create-blog",
      html: "Create blog",
      access: "admin/manager  ",
    },
  ]

  const check: any = route_check?.find(r => r?.link === pathname && r?.access.includes(role));
  return check
}