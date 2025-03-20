import { useState } from 'react';
import { PartyCard } from '../components/PartyCard';
import { mockParties } from '../data/mockData';
import { Plus, Search, SlidersHorizontal } from 'lucide-react';

export function PartiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredParties = mockParties.filter(party => 
    party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    party.vanum.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Parties</h1>
        <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
          <Plus size={20} />
          <span>New Party</span>
        </button>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search parties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center space-x-2 hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredParties.map(party => (
          <PartyCard key={party.id} party={party} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
        <span>Showing 1-10 of 24 parties</span>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
          <button className="px-3 py-1 bg-gray-200 rounded">1</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
        </div>
      </div>
    </div>
  );
}