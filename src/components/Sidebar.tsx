import { CircleDollarSign, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 h-screen p-4 border-r">
      <div className="text-xl font-bold mb-8">XCRO-Lite</div>

      <div className="space-y-2">
        <div className="text-sm font-semibold text-gray-500 mb-2">Deals</div>
        <NavLink
          to="/deals/live"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg ${
              isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`
          }
        >
          <CircleDollarSign size={18} />
          <span>Live Deals</span>
        </NavLink>

        <NavLink
          to="/deals/maker"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg ${
              isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`
          }
        >
          <CircleDollarSign size={18} />
          <span>Maker Deals</span>
        </NavLink>

        <NavLink
          to="/deals/checker"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg ${
              isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`
          }
        >
          <CircleDollarSign size={18} />
          <span>Checker Deals</span>
        </NavLink>

        <div className="text-sm font-semibold text-gray-500 mt-6 mb-2">
          Party Management
        </div>
        <NavLink
          to="/parties"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg ${
              isActive ? 'bg-gray-200' : 'hover:bg-gray-100'
            }`
          }
        >
          <Users size={18} />
          <span>Parties</span>
        </NavLink>
      </div>
    </div>
  );
}
