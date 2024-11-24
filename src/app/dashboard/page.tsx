'use client'

import { useAuth } from "@/context/Authentication/AuthenticationCheckProvider";
import React from "react";
function DashboardHome() {
  const { user_info, role } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        {
          role == "eco" ?
            "ECO"
            :
            "Voter Details"
        }
      </h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <tbody>
          <tr className="bg-gray-100">
            <td className="border border-gray-200 p-2">Full Name</td>
            <td className="border border-gray-200 p-2">{user_info?.full_name}</td>
          </tr>
          {
            role == "eco" ||
            <>
              <tr>
                <td className="border border-gray-200 p-2">Date of Birth</td>
                <td className="border border-gray-200 p-2">
                  {
                    new Date(user_info?.DOB).toLocaleDateString()
                  }
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-200 p-2">Unique Voter Code</td>
                <td className="border border-gray-200 p-2">{user_info?.UVC}</td>
              </tr>
              <tr>
                <td className="border border-gray-200 p-2">Constituency ID</td>
                <td className="border border-gray-200 p-2">{user_info?.constituency_id}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="border border-gray-200 p-2">Voter ID</td>
                <td className="border border-gray-200 p-2">{user_info?.voter_id}</td>
              </tr>
            </>
          }
        </tbody>
      </table>
    </div>
  );
}

export default DashboardHome;
