import React from 'react'
import { FaEthereum } from 'react-icons/fa'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { motion } from 'framer-motion'

const SwapHome = () => {
  return (
    <motion.div
      className="bg-[#111111] rounded-3xl px-6 py-8 w-full max-w-sm mx-auto mt-10 shadow-xl text-white font-sans relative h-[650px] border border-white flex flex-col justify-between"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="font-black text-2xl tracking-widest flex items-center">
          <img src="/swap.png" alt="logo" className="" />
        </div>
        <img src="/cat.png" alt="menu" className="" />
      </div>
      {/* Main Content */}
      <div className="flex flex-col gap-6 flex-1 justify-center">
        {/* Spend input */}
        <div>
          <div className="text-xs text-gray-400 mb-2 ml-1">YOU SPEND</div>
          <div className="flex items-center bg-[#232526] rounded-xl px-5 py-4">
            <input
              type="number"
              defaultValue="789.315"
              className="bg-transparent border-none text-white text-3xl font-semibold w-40 outline-none mr-3"
            />
            <span className="flex items-center gap-1 text-base font-medium">
              <span role="img" aria-label="us-flag">🇺🇸</span> USD <MdKeyboardArrowDown className="inline text-lg ml-1" />
            </span>
          </div>
        </div>
        {/* For token select */}
        <div>
          <div className="text-xs text-gray-400 mb-2 ml-1">FOR</div>
          <div className="flex items-center bg-[#232526] rounded-xl px-5 py-4 text-lg font-medium">
            <FaEthereum className="mr-2 text-xl" /> ETH <MdKeyboardArrowDown className="ml-auto text-lg" />
          </div>
        </div>
      </div>
      {/* Fetch button */}
      <button className="w-full bg-teal-700 hover:bg-teal-800 transition-colors text-white rounded-xl py-4 text-lg font-semibold mt-8">
        Fetch Best Quote
      </button>
    </motion.div>
  )
}

export default SwapHome