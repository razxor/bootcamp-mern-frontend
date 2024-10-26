import React, { useContext, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Link, useLocation, useNavigate  } from "react-router-dom";
import ROUTES from "../../routes";
import { AuthContext } from "../../Provider/AuthProvider";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdLogIn } from "react-icons/io";

const Header = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, logOutUser } = useContext(AuthContext)

    
    const handleLogout = () => {
        logOutUser().then(() => {
            navigate(ROUTES.LOGIN, { replace: true });        
        }).catch(error => {
            console.error("Logout failed:", error);
        });
    };
  
    return (
        <div className="navbar px-0 lg:px-16 shadow-md sticky top-0 z-50 bg-[#161a1d] text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li className={`text-black ${pathname == ROUTES.HOME && 'text-orange-500'}`}>
                            <Link to={ROUTES.HOME}>Home</Link>
                        </li>
                        <li className={`text-black ${pathname == ROUTES.COURSES && 'text-orange-500'}`}>                            
                            <Link to={ROUTES.COURSES}>All Products</Link>
                        </li>
                        {/* <li className={`${pathname == ROUTES.BLOG && 'text-orange-500'}`}><Link to={ROUTES.BLOG}>Blog</Link></li>
                        <li className={`${pathname == ROUTES.FAQ && 'text-orange-500'}`}><Link to={ROUTES.FAQ}>FAQ</Link></li> */}
                    </ul>
                </div>
                <Link className="font-bold flex items-center text-xl gap-2" to={ROUTES.HOME}>
                    <img src='/images/rs-l.png' width={60} height={60} /> 
                    <span>Online Bookshop</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex justify-end items-end text-right w-9/12">
                <ul className="flex gap-5 px-1">
                    <li className={`py-3 px-4 text-lg hover:text-orange-500 cursor-pointer ${pathname == ROUTES.HOME && 'text-orange-500'}`}>
                        <Link to={ROUTES.HOME}>Home</Link>
                    </li>
                    <li className={`py-3 px-4 text-lg hover:text-orange-500 cursor-pointer ${pathname == ROUTES.COURSES && 'text-orange-500'}`}>
                        <Link to={ROUTES.COURSES}>All Products</Link>
                    </li>
                    {/* <li className={`py-3 px-4 text-lg font-semibold hover:text-orange-500 cursor-pointer ${pathname==ROUTES.ABOUT && 'text-orange-500'}`}>
                        <Link to={ROUTES.ABOUT}>About</Link>
                    </li>
                    <li className={`py-3 px-4 text-lg font-semibold hover:text-orange-500 cursor-pointer ${pathname==ROUTES.BLOG && 'text-orange-500'}`}>
                        <Link to={ROUTES.BLOG}>Blog</Link>
                    </li>
                    <li className={`py-3 px-4 text-lg font-semibold hover:text-orange-500 cursor-pointer ${pathname==ROUTES.FAQ && 'text-orange-500'}`}>
                        <Link to={ROUTES.FAQ}>FAQ</Link>
                    </li> */}
                </ul>
            </div>
            <div className="navbar-end sm:1/2 lg:w-3/12 pr-2 lg:pr-0">
                <div className="flex gap-3 justify-center items-center font-bold">
                    <div className="tooltip tooltip-bottom" data-tip="Buy Book">
                        {/* <Link> */}
                            <AiOutlineShoppingCart  className="w-6 h-6 font-bold" />
                        {/* </Link> */}
                    </div>                    
                    {
                        user
                            ?
                            (
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img
                                                alt={user?.fullname}
                                                src={user?.photo} />
                                        </div>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-lg bg-[#161a1d]">
                                        <li>
                                            <Link to={ROUTES.USER_PROFILE} className="justify-between">
                                                {user?.fullname} - Profile
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="justify-between" to={ROUTES.USER_DASHBOARD}>
                                                Dashboard
                                                {/* <span className="badge">New</span> */}
                                            </Link>
                                        </li>
                                        {/* <li><a>Profile</a></li> */}
                                        
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            )
                            :
                            (
                                <div className="tooltip tooltip-bottom" data-tip="Login/Register">                                    
                                    <Link to={`${ROUTES.LOGIN}`}>
                                        <IoMdLogIn className="w-6 h-6 font-bold"/>
                                    </Link>                                                                       
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}

export default Header