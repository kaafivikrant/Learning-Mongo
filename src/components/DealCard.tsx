import { Deal } from '../types';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{deal.name}</h3>
          <span className="text-sm text-gray-500">Deal #{deal.id}</span>
        </div>
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 capitalize">
          {deal.state}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vanum:</span>
          <span className="font-medium">{deal.vanum}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Source Account:</span>
          <span className="font-medium">{deal.sourceAccount}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Last Transaction:</span>
          <span className="font-medium">{deal.lastTransaction}</span>
        </div>
      </div>
      
      <Link
        to={`/deals/${deal.state}/${deal.id}`}
        className="mt-4 flex items-center justify-center w-full py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        View Details
        <ChevronRight size={16} className="ml-1" />
      </Link>
    </div>
  );
}