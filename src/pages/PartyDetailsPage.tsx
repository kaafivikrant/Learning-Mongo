import { useParams, Link, Route, Routes } from 'react-router-dom';
import { mockParties } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

export function PartyDetailsPage() {
  const { id } = useParams();
  const party = mockParties.find(p => p.id === id);

  if (!party) {
    return <div>Party not found</div>;
  }

  return (
    <div>
      <Link 
        to="/parties"
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Parties
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold">{party.name[0]}</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{party.name}</h1>
            <p className="text-gray-500">ID: {party.id}</p>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <Link
            to={`/parties/${id}/basic`}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            Basic Details
          </Link>
          <Link
            to={`/parties/${id}/ecomm`}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            E-commerce Details
          </Link>
          <Link
            to={`/parties/${id}/contacts`}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            Contacts
          </Link>
          <Link
            to={`/parties/${id}/accounts`}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            Accounts
          </Link>
          <Link
            to={`/parties/${id}/documents`}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 hover:bg-gray-200"
          >
            Documents
          </Link>
        </div>

        <Routes>
          <Route path="basic" element={<PartyBasicDetails party={party} />} />
          <Route path="ecomm" element={<div>E-commerce Details</div>} />
          <Route path="contacts" element={<div>Contacts</div>} />
          <Route path="accounts" element={<div>Accounts</div>} />
          <Route path="documents" element={<div>Documents</div>} />
        </Routes>
      </div>
    </div>
  );
}

interface PartyBasicDetailsProps {
  party: {
    id: string;
    name: string;
    vanum: string;
    accountType: string;
    status: string;
  };
}

function PartyBasicDetails({ party }: PartyBasicDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Participant ID</label>
        <input
          type="text"
          value={party.id}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Business Name</label>
        <input
          type="text"
          value={party.name}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Vanum</label>
        <input
          type="text"
          value={party.vanum}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Account Type</label>
        <input
          type="text"
          value={party.accountType}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <input
          type="text"
          value={party.status}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
        />
      </div>
    </div>
  );
}