import React from 'react';
import { IoBagHandle } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi';
import { FcBusinessman } from 'react-icons/fc';
import { FcGraduationCap } from 'react-icons/fc';

function DashboardStatsGrid() {
  return (
    <div className="flex w-full gap-4">
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Sales</span>
          <div>
            <strong>$3452</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500">
          <HiOutlineUsers className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Customers
          </span>
          <div>
            <strong>$3452</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
          <FcBusinessman className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">
            Total Clients
          </span>
          <div>
            <strong>$3452</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500">
          <FcGraduationCap className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm font-light text-gray-500">Total Jobs</span>
          <div>
            <strong>$3452</strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default DashboardStatsGrid;

function BoxWrapper({ children, bgColor }) {
  return (
    <div
      className={`flex h-40 w-80 flex-shrink-0 items-center rounded-xl border border-gray-200 ${bgColor} transform p-6 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
    >
      {children}
    </div>
  );
}
