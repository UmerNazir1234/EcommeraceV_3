import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';



const Navebar = () => {
    const [visibale, setvisible] = useState(false)
    const {setshowsearch,getcartCont,navigate,token,settoken,setcartitem} =useContext(ShopContext);

    const logout =() =>{
        localStorage.removeItem('token')
        settoken('')
        setcartitem({})
        navigate('/login')

    }
  return (
    <div className='flex items-center justify-between py-10 font-medim'>
       <Link to={'/'}><img src={assets.logo} className='w-36 ' alt="" /></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink 
                to="/" 
                className="flex flex-col items-center gap-1 font-medim text-lg">
                <p>Home</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink 
                to="/collection" 
                className="flex flex-col items-center gap-1 text-lg">
                <p>Collection</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink 
                to="/about" 
                className="flex flex-col items-center gap-1 text-lg">
                <p>About</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
            <NavLink 
                to="/contact" 
                className="flex flex-col items-center gap-1 text-lg">
                <p>Conatct</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>

        </ul>
        <div className='flex item-center gap-6'>
            <img onClick={()=>setshowsearch(true)} src={assets.search_icon} className = 'w-5 cursor-pointer' alt="" />
            <div className='group relative'>
                <img onClick={()=>token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                {/*Dropdown Menu */}
            {token && 
            <div className="hidden group-hover:block absolute right-0 pt-4">
                    <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p onClick={(()=>navigate('/order'))} className='cursor-pointer hover:text-black'>Orders</p>
                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
 
                </div>
                </div>}
            </div>
            <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
           <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getcartCont()}</p>
            </Link>
            <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>
       {/* side bar menu for small screen */}

        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visibale ? 'w-full' : 'w-0'}`}>
         <div className='flex flex-col text-gray-600'>
            <div onClick={()=>setvisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img src={assets.dropdown_icon}className='h-4 rotate-180' alt="" />
                <p>Back</p>
            </div>
            <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
            <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
            <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
            <NavLink onClick={()=>setvisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
         </div>
        </div>

    </div>
  )
}

export default Navebar