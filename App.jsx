import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(38);
  const [historyBatches, setHistoryBatches] = useState([37, 36, 35]);
  const [expandedBatch, setExpandedBatch] = useState(null); // State for accordion

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

  const TeamCard = ({ batchNumber, teamName, showEdit }) => (
    <button className="flex flex-col items-center justify-center p-4 m-2 rounded-lg shadow-md bg-white text-blue-900 font-semibold hover:bg-gray-100 transition duration-200">
      <span className="text-xl">{teamName}</span>
      {showEdit && (
        <button className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
          Edit
        </button>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold">HYFE</h1>
        <nav className="flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300 transition duration-200">About</a>
          <a href="#" className="hover:text-gray-300 transition duration-200">Teams</a>
          <a href="#" className="hover:text-gray-300 transition duration-200">History</a>
          <button
            onClick={toggleLogin}
            className="ml-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
        </nav>
      </header>

      {/* Main Section: Current Teams */}
      <main className="container mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">{currentBatch}th Teams</h2>
        <div className="flex justify-center flex-wrap">
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

      {/* History Section */}
      <section className="container mx-auto mt-12 p-4 bg-white rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">History</h2>
        <div className="max-w-md mx-auto">
          {historyBatches.map((batch) => (
            <div key={batch} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0">
              <button
                onClick={() => toggleAccordion(batch)}
                className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-blue-900 font-semibold text-lg transition duration-200"
              >
                <span>{batch}th Batch</span>
                <span>{expandedBatch === batch ? '▲' : '▼'}</span>
              </button>
              {expandedBatch === batch && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center flex-wrap">
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
