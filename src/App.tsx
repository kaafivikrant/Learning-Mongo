import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DealsPage } from './pages/DealsPage';
import { DealDetailsPage } from './pages/DealDetailsPage';
import { PartiesPage } from './pages/PartiesPage';
import { PartyDetailsPage } from './pages/PartyDetailsPage';
import { Bell } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        
        <div className="flex-1">
          <header className="h-16 bg-white border-b flex items-center justify-between px-6">
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
                <span className="text-sm font-medium">Admin User</span>
              </div>
            </div>
          </header>
          
          <main className="p-6">
            <Routes>
              <Route path="/deals/:state" element={<DealsPage />} />
              <Route path="/deals/:state/:id" element={<DealDetailsPage />} />
              <Route path="/parties" element={<PartiesPage />} />
              <Route path="/parties/:id/*" element={<PartyDetailsPage />} />
              <Route path="*" element={<DealsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;