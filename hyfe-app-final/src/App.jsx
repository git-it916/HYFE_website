import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(38);
  const [historyBatches, setHistoryBatches] = useState([37, 36, 35]);
  const [expandedBatch, setExpandedBatch] = useState(null);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const archiveCurrentBatch = () => {
    setHistoryBatches([currentBatch, ...historyBatches]);
    setCurrentBatch(currentBatch + 1);
  };

  const toggleAccordion = (batch) => {
    setExpandedBatch(expandedBatch === batch ? null : batch);
  };

  const TeamCard = ({ teamName, showEdit }) => (
    <div className="relative p-4 m-2 w-40 h-24 flex items-center justify-center rounded-lg shadow-md bg-white text-blue-900 font-semibold hover:bg-gray-100 transition duration-200 border border-gray-200">
      <span className="text-xl">{teamName}</span>
      {showEdit && (
        <button className="absolute top-1 right-1 px-2 py-0.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
          Edit
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white text-blue-900 p-4 shadow-md flex justify-between items-center sticky top-0 z-10 border-b">
        <h1 className="text-3xl font-bold">HYFE</h1>
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:text-blue-600 transition duration-200">About</a>
          <a href="#" className="hover:text-blue-600 transition duration-200">Teams</a>
          <a href="#" className="hover:text-blue-600 transition duration-200">History</a>
          <button
            onClick={toggleLogin}
            className="ml-4 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition duration-200"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </nav>
      </header>

      <main className="container mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">{currentBatch}th Teams</h2>
        <div className="flex justify-center flex-wrap gap-4">
          <TeamCard teamName="Quant" showEdit={isLoggedIn} />
          <TeamCard teamName="IB" showEdit={isLoggedIn} />
          <TeamCard teamName="Research" showEdit={isLoggedIn} />
          <TeamCard teamName="Derivative" showEdit={isLoggedIn} />
        </div>
        {isLoggedIn && (
          <div className="text-center mt-8">
            <button
              onClick={archiveCurrentBatch}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
            >
              Archive Current to History
            </button>
          </div>
        )}
      </main>

      <section className="container mx-auto mt-12 p-6 bg-white rounded-xl shadow-lg mb-10">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">History</h2>
        <div className="max-w-2xl mx-auto space-y-2">
          {historyBatches.map((batch) => (
            <div key={batch} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(batch)}
                className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 text-blue-900 font-semibold text-lg transition duration-200 focus:outline-none"
              >
                <span>{batch}th Batch</span>
                <span className={`transform transition-transform duration-300 ${expandedBatch === batch ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {expandedBatch === batch && (
                <div className="p-4 border-t border-gray-200 flex justify-center flex-wrap gap-4 bg-gray-50">
                  <TeamCard teamName="Quant" showEdit={false} />
                  <TeamCard teamName="IB" showEdit={false} />
                  <TeamCard teamName="Research" showEdit={false} />
                  <TeamCard teamName="Derivative" showEdit={false} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
