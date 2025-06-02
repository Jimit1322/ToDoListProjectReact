import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center bg-gradient-to-r from-[#FFF1E0] to-[#FBE8D3] py-3 px-6 shadow-md'>
      <div className="logo">
        <span className="text-2xl font-bold text-[#6D4C41]">MyTask</span>
      </div>
      <ul className="flex gap-6">
        <a href="#" className='text-[#5D4037] hover:text-[#8D6E63] font-medium transition-colors'>Home</a>
        <a href="#" className='text-[#5D4037] hover:text-[#8D6E63] font-medium transition-colors'>Your Tasks</a>
      </ul>
    </nav>
  );
};

export default Navbar;