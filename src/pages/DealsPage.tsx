import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DealCard } from '../components/DealCard';
import { mockDeals, mockParties, addDeal } from '../data/mockData';
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { Deal } from '../types';

export function DealsPage() {
  const { state = 'live' } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewDealModal, setShowNewDealModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    transactionMin: '',
    transactionMax: '',
    processingFeeMin: '',
    processingFeeMax: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const [newDeal, setNewDeal] = useState({
    name: '',
    vanum: '',
    sourceAccount: '',
    parties: [] as string[],
    transactionLimit: 50000,
    dailyLimit: 200000,
    processingFee: 2.5
  });
  
  const filteredDeals = mockDeals.filter(deal => {
    // State filter
    if (deal.state !== state) return false;
    
    // Search query
    if (searchQuery && !deal.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !deal.vanum.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !deal.sourceAccount.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Transaction limit filter
    if (filters.transactionMin && deal.transactionLimit < Number(filters.transactionMin)) return false;
    if (filters.transactionMax && deal.transactionLimit > Number(filters.transactionMax)) return false;
    
    // Processing fee filter
    if (filters.processingFeeMin && deal.processingFee < Number(filters.processingFeeMin)) return false;
    if (filters.processingFeeMax && deal.processingFee > Number(filters.processingFeeMax)) return false;
    
    // Date filter
    if (filters.dateFrom || filters.dateTo) {
      const dealDate = new Date(deal.lastTransaction);
      if (filters.dateFrom && dealDate < new Date(filters.dateFrom)) return false;
      if (filters.dateTo && dealDate > new Date(filters.dateTo)) return false;
    }
    
    return true;
  });

  const handleCreateDeal = () => {
    const deal = addDeal(newDeal);
    setShowNewDealModal(false);
    navigate(`/deals/${deal.state}/${deal.id}`);
  };

  const handleResetFilters = () => {
    setFilters({
      transactionMin: '',
      transactionMax: '',
      processingFeeMin: '',
      processingFeeMax: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold capitalize">{state} Deals</h1>
        {state === 'live' && (
          <button 
            onClick={() => setShowNewDealModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors"
          >
            <Plus size={20} />
            <span>New Deal</span>
          </button>
        )}
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 border rounded-lg flex items-center space-x-2 transition-colors ${
            showFilters ? 'bg-gray-100' : 'hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal size={20} />
          <span>Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Transaction Limit</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.transactionMin}
                  onChange={(e) => setFilters({ ...filters, transactionMin: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.transactionMax}
                  onChange={(e) => setFilters({ ...filters, transactionMax: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Processing Fee (%)</h3>
              <div className="flex space-x-2">
                <input
                  type="number"
                  step="0.1"
                  placeholder="Min"
                  value={filters.processingFeeMin}
                  onChange={(e) => setFilters({ ...filters, processingFeeMin: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Max"
                  value={filters.processingFeeMax}
                  onChange={(e) => setFilters({ ...filters, processingFeeMax: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Last Transaction Date</h3>
              <div className="flex space-x-2">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDeals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {showNewDealModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Deal</h2>
              <button onClick={() => setShowNewDealModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deal Name
                </label>
                <input
                  type="text"
                  value={newDeal.name}
                  onChange={(e) => setNewDeal({ ...newDeal, name: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vanum
                </label>
                <input
                  type="text"
                  value={newDeal.vanum}
                  onChange={(e) => setNewDeal({ ...newDeal, vanum: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source Account
                </label>
                <input
                  type="text"
                  value={newDeal.sourceAccount}
                  onChange={(e) => setNewDeal({ ...newDeal, sourceAccount: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Associated Parties
                </label>
                <select
                  multiple
                  value={newDeal.parties}
                  onChange={(e) => setNewDeal({
                    ...newDeal,
                    parties: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                  className="w-full p-2 border rounded-lg"
                >
                  {mockParties.map(party => (
                    <option key={party.id} value={party.id}>
                      {party.name} ({party.vanum})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Limit
                  </label>
                  <input
                    type="number"
                    value={newDeal.transactionLimit}
                    onChange={(e) => setNewDeal({ ...newDeal, transactionLimit: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Daily Limit
                  </label>
                  <input
                    type="number"
                    value={newDeal.dailyLimit}
                    onChange={(e) => setNewDeal({ ...newDeal, dailyLimit: Number(e.target.value) })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processing Fee (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={newDeal.processingFee}
                  onChange={(e) => setNewDeal({ ...newDeal, processingFee: Number(e.target.value) })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewDealModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDeal}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Create Deal
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredDeals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No deals found matching your criteria</p>
        </div>
      )}
    </div>
  );
}