import React from 'react';
import PersonnelInfo from './settings/PersonnelInfo';
import QRcode from './settings/QRcode';
import CloseAccont from './settings/CloseAccont';

export default function SearchPanel() {
  return (
    <>
      <div className='searchBar w-6/12 lg:w-4/12'>
        <form className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img src="./images/Research.svg" alt="searchicon" className="w-4 h-4" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-[100%] p-4 pl-10 text-sm text-gray-900 border  rounded-lg  focus:ring-blue-500 focus:border-gray-500 vbg-[rgba(217, 217, 217, 0.38)] dark:placeholder-gray-400 dark:text-gray dark:focus:ring-black"
              placeholder="Search..."
            />
          </div>
        </form>
      </div>
      <div className='notifications '>
        <img src="./images/Bell.svg" alt="notif" className='w-8 h-8' />
      </div>
    </>
  )
}