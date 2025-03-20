import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockDeals, mockParties, updateDeal, submitDeal, approveDeal, rejectDeal } from '../data/mockData';
import { ArrowLeft, ExternalLink, Edit, Check, X } from 'lucide-react';
import { useState } from 'react';

export function DealDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const deal = mockDeals.find(d => d.id === id);

  if (!deal) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Deal not found</h2>
        <Link 
          to="/deals/live"
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Deals
        </Link>
      </div>
    );
  }

  const dealParties = mockParties.filter(party => deal.parties.includes(party.id));
  const [editedDeal, setEditedDeal] = useState(deal);

  const handleEdit = () => {
    if (deal.state === 'live') {
      const makerDeal = updateDeal(deal.id, {});
      if (makerDeal) {
        navigate(`/deals/maker/${makerDeal.id}`);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    updateDeal(deal.id, editedDeal);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    submitDeal(deal.id);
    navigate(`/deals/checker/${deal.id}`);
  };

  const handleApprove = () => {
    const liveDeal = approveDeal(deal.id);
    if (liveDeal) {
      navigate(`/deals/live/${liveDeal.id}`);
    }
  };

  const handleReject = () => {
    rejectDeal(deal.id);
    navigate(`/deals/maker/${deal.id}`);
  };

  return (
    <div>
      <Link 
        to={`/deals/${deal.state}`}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Deals
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editedDeal.name}
                  onChange={(e) => setEditedDeal({ ...editedDeal, name: e.target.value })}
                  className="text-2xl font-semibold border-b"
                />
              ) : deal.name}
            </h1>
            <p className="text-gray-500">Deal #{deal.id}</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 capitalize">
              {deal.state}
            </span>
            {deal.state !== 'live' && (
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                  >
                    <Edit size={20} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Vanum</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDeal.vanum}
                    onChange={(e) => setEditedDeal({ ...editedDeal, vanum: e.target.value })}
                    className="font-medium border-b text-right"
                  />
                ) : (
                  <span className="font-medium">{deal.vanum}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Source Account</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedDeal.sourceAccount}
                    onChange={(e) => setEditedDeal({ ...editedDeal, sourceAccount: e.target.value })}
                    className="font-medium border-b text-right"
                  />
                ) : (
                  <span className="font-medium">{deal.sourceAccount}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Transaction</span>
                <span className="font-medium">{deal.lastTransaction}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Configuration</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Transaction Limit</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedDeal.transactionLimit}
                    onChange={(e) => setEditedDeal({ ...editedDeal, transactionLimit: Number(e.target.value) })}
                    className="font-medium border-b text-right"
                  />
                ) : (
                  <span className="font-medium">${deal.transactionLimit.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Daily Limit</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedDeal.dailyLimit}
                    onChange={(e) => setEditedDeal({ ...editedDeal, dailyLimit: Number(e.target.value) })}
                    className="font-medium border-b text-right"
                  />
                ) : (
                  <span className="font-medium">${deal.dailyLimit.toLocaleString()}</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Processing Fee</span>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.1"
                    value={editedDeal.processingFee}
                    onChange={(e) => setEditedDeal({ ...editedDeal, processingFee: Number(e.target.value) })}
                    className="font-medium border-b text-right"
                  />
                ) : (
                  <span className="font-medium">{deal.processingFee}%</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Associated Parties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dealParties.map(party => (
              <div key={party.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold">{party.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{party.name}</h3>
                      <p className="text-sm text-gray-500">{party.vanum}</p>
                    </div>
                  </div>
                  <Link 
                    to={`/parties/${party.id}`}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ExternalLink size={18} />
                  </Link>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Account Type:</span>
                    <span className="ml-2 font-medium">{party.accountType}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <span className={`ml-2 font-medium ${
                      party.status === 'Verified' ? 'text-green-600' : 
                      party.status === 'Pending' ? 'text-orange-600' : 'text-gray-600'
                    }`}>
                      {party.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Configuration Updated</p>
                <p className="text-sm text-gray-500">Transaction limit increased to $50,000</p>
              </div>
              <span className="text-sm text-gray-500">Jan 15, 2025</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Deal Approved</p>
                <p className="text-sm text-gray-500">Moved to live state</p>
              </div>
              <span className="text-sm text-gray-500">Jan 14, 2025</span>
            </div>
          </div>
        </div>

        {deal.state === 'maker' && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Submit for Review
            </button>
          </div>
        )}

        {deal.state === 'checker' && (
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={handleReject}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
            >
              Reject
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}