import React, { useState } from 'react';
import { 
  TrendingUp, 
  Building2, 
  BookOpen, 
  LineChart,
  ChevronDown,
  ChevronUp,
  Edit,
  Archive,
  LogIn,
  LogOut
} from 'lucide-react';

function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Current Batch State
  const [currentBatch, setCurrentBatch] = useState({
    number: 38,
    teams: [
      {
        id: 1,
        name: 'Quant',
        icon: TrendingUp,
        description: 'Quantitative Analysis & Algorithmic Trading',
        color: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600'
      },
      {
        id: 2,
        name: 'IB',
        icon: Building2,
        description: 'Investment Banking & Corporate Finance',
        color: 'bg-navy-700',
        hoverColor: 'hover:bg-navy-800'
      },
      {
        id: 3,
        name: 'Research',
        icon: BookOpen,
        description: 'Financial Research & Market Analysis',
        color: 'bg-gray-600',
        hoverColor: 'hover:bg-gray-700'
      },
      {
        id: 4,
        name: 'Derivative',
        icon: LineChart,
        description: 'Derivatives Trading & Risk Management',
        color: 'bg-indigo-600',
        hoverColor: 'hover:bg-indigo-700'
      }
    ]
  });

  // History State
  const [historyBatches, setHistoryBatches] = useState([
    {
      number: 37,
      teams: ['Quant', 'IB', 'Research', 'Derivative']
    },
    {
      number: 36,
      teams: ['Quant', 'IB', 'Research', 'Derivative']
    },
    {
      number: 35,
      teams: ['Quant', 'IB', 'Research', 'Derivative']
    },
    {
      number: 34,
      teams: ['Quant', 'IB', 'Research', 'Derivative']
    }
  ]);

  // Expanded batch state for accordion
  const [expandedBatch, setExpandedBatch] = useState(null);

  // Toggle Login
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Archive Current Teams to History
  const handleArchive = () => {
    const confirmed = window.confirm(
      `Are you sure you want to archive ${currentBatch.number}th teams to history?`
    );
    
    if (confirmed) {
      // Add current batch to history
      const newHistoryBatch = {
        number: currentBatch.number,
        teams: currentBatch.teams.map(team => team.name)
      };
      
      setHistoryBatches([newHistoryBatch, ...historyBatches]);
      
      // Increment current batch number
      setCurrentBatch({
        ...currentBatch,
        number: currentBatch.number + 1
      });
      
      alert(`${currentBatch.number}th batch archived successfully! Now showing ${currentBatch.number + 1}th batch.`);
    }
  };

  // Toggle batch expansion in history
  const toggleBatchExpansion = (batchNumber) => {
    setExpandedBatch(expandedBatch === batchNumber ? null : batchNumber);
  };

  // Handle team card click
  const handleTeamClick = (teamName, batchNumber) => {
    alert(`Navigating to ${teamName} - Batch ${batchNumber}`);
  };

  // Handle edit click
  const handleEditTeam = (teamName) => {
    alert(`Edit mode for ${teamName} team`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Club Name */}
            <div className="flex items-center space-x-3">
              <div className="bg-navy-800 text-white w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl">
                HY
              </div>
              <div>
                <h1 className="text-2xl font-bold text-navy-900">HYFE</h1>
                <p className="text-xs text-gray-600">Financial Engineering Club</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <a href="#about" className="text-gray-700 hover:text-navy-800 font-medium transition-colors">
                About
              </a>
              <a href="#teams" className="text-gray-700 hover:text-navy-800 font-medium transition-colors">
                Teams
              </a>
              <button
                onClick={handleLogin}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isLoggedIn
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-navy-800 hover:bg-navy-900 text-white'
                }`}
              >
                {isLoggedIn ? (
                  <>
                    <LogOut size={18} />
                    <span>Logout</span>
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Admin Controls */}
        {isLoggedIn && (
          <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-800 font-semibold">Admin Mode Active</span>
              </div>
              <button
                onClick={handleArchive}
                className="flex items-center space-x-2 bg-navy-800 hover:bg-navy-900 text-white px-4 py-2 rounded-lg font-medium transition-all"
              >
                <Archive size={18} />
                <span>Archive Current Teams to History</span>
              </button>
            </div>
          </div>
        )}

        {/* Current Teams Section */}
        <section id="teams" className="mb-16">
          <h2 className="text-4xl font-bold text-center text-navy-900 mb-8">
            {currentBatch.number}th Teams
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentBatch.teams.map((team) => {
              const IconComponent = team.icon;
              return (
                <div
                  key={team.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleTeamClick(team.name, currentBatch.number)}
                >
                  <div className={`${team.color} h-32 flex items-center justify-center`}>
                    <IconComponent size={64} className="text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">{team.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{team.description}</p>
                    
                    {isLoggedIn && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditTeam(team.name);
                        }}
                        className="flex items-center space-x-2 w-full justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all"
                      >
                        <Edit size={16} />
                        <span>Edit Team</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* History Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-8">
            Team History
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-3">
            {historyBatches.map((batch) => (
              <div key={batch.number} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Batch Bar */}
                <button
                  onClick={() => toggleBatchExpansion(batch.number)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-navy-800 text-white w-16 h-16 rounded-lg flex items-center justify-center font-bold text-lg">
                      {batch.number}th
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-navy-900">
                        Batch {batch.number}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {batch.teams.length} Teams
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-gray-500">
                    {expandedBatch === batch.number ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </div>
                </button>

                {/* Expanded Team Buttons */}
                {expandedBatch === batch.number && (
                  <div className="border-t border-gray-200 p-5 bg-gray-50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {batch.teams.map((teamName, index) => {
                        // Get icon and color based on team name
                        const teamInfo = currentBatch.teams.find(t => t.name === teamName);
                        const IconComponent = teamInfo?.icon || TrendingUp;
                        const teamColor = teamInfo?.color || 'bg-gray-600';
                        
                        return (
                          <button
                            key={index}
                            onClick={() => handleTeamClick(teamName, batch.number)}
                            className={`${teamColor} hover:opacity-90 text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2`}
                          >
                            <IconComponent size={18} />
                            <span>{teamName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-navy-900 mb-6">
            About HYFE
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              The Financial Engineering Club at Hanyang University (HYFE) is dedicated to 
              fostering excellence in quantitative finance, investment banking, research, 
              and derivatives trading.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our members engage in cutting-edge financial analysis, market research, 
              and practical trading strategies to prepare for careers in the financial industry.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; 2024 HYFE - Hanyang Financial Engineering Club. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
