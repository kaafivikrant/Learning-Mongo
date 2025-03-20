import { Party } from '../types';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PartyCardProps {
  party: Party;
}

export function PartyCard({ party }: PartyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold">{party.name[0]}</span>
          </div>
          <div>
            <h3 className="font-semibold">{party.name}</h3>
            <span className="text-sm text-gray-500">ID: {party.id}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vanum:</span>
          <span className="font-medium">{party.vanum}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Account Type:</span>
          <span className="font-medium">{party.accountType}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Status:</span>
          <span className={`font-medium ${
            party.status === 'Verified' ? 'text-green-600' : 
            party.status === 'Pending' ? 'text-orange-600' : 'text-gray-600'
          }`}>
            {party.status}
          </span>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <Link
          to={`/parties/${party.id}/edit`}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Edit Details
        </Link>
        <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
          •••
        </button>
      </div>
    </div>
  );
}