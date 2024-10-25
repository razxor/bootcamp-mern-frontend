import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';
import { AuthContext } from '../../Provider/AuthProvider';

export default function SidebarComponent() {
    const { user, logOutUser } = useContext(AuthContext)
    const handleLogout = () => {
        logOutUser().then(() => {
            navigate(ROUTES.LOGIN, { replace: true });        
        }).catch(error => {
            console.error("Logout failed:", error);
        });
    };
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
            <nav className="p-4">
                <ul>
                    <li className="mb-4">
                        <Link to={ROUTES.USER_DASHBOARD} className="hover:bg-gray-700 p-2 block rounded">Dashboard</Link>
                    </li>                                      
                    
                    {/* <li className="mb-4">
                        <Link to="/manage-orders" className="hover:bg-gray-700 p-2 block rounded">My Orders</Link>
                    </li> */}

                    <li className="mb-4">
                        <Link to='javascript:void(0)' onClick={handleLogout} className="hover:bg-gray-700 p-2 block rounded">Logout</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
