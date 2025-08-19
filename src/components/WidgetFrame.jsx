import React from 'react'

const WidgetFrame = ({ children }) => (
  <div className="relative mx-auto my-8 rounded-3xl shadow-2xl border border-white bg-[#111111] w-[375px] h-[650px] overflow-hidden flex flex-col   ">
    {/* Optional: mobile notch */}
    <img src="/top.png" alt="bg" className=' absolute top-0 left-0 z-0 ' />
    {children}
  </div>
)

export default WidgetFrame
