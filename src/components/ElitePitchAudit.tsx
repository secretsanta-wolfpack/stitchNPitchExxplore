import React, { useState } from 'react';
import { Crown, Shuffle, User, Building, UserCheck, Trophy, Sparkles, MessageCircle, Plus, Trash2, Star } from 'lucide-react';
import { Winner } from '../config/data';

interface ElitePitchAuditProps {
  winners: Winner[];
  onEliteSelected: (elite: Winner & { chatIds?: string[] }) => void;
}

const ElitePitchAudit: React.FC<ElitePitchAuditProps> = ({
  winners,
  onEliteSelected
}) => {
  const [selectedElite, setSelectedElite] = useState<Winner | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpinElite, setCurrentSpinElite] = useState<Winner | null>(null);
  const [chatIds, setChatIds] = useState<string[]>(['']);

  const addChatIdField = () => {
    if (chatIds.length < 5) {
      setChatIds([...chatIds, '']);
    }
  };

  const removeChatIdField = (index: number) => {
    if (chatIds.length > 1) {
      setChatIds(chatIds.filter((_, i) => i !== index));
    }
  };

  const updateChatId = (index: number, value: string) => {
    const newChatIds = [...chatIds];
    newChatIds[index] = value;
    setChatIds(newChatIds);
  };

  const selectRandomElite = () => {
    if (winners.length === 0) {
      alert('No winners available for Elite Pitch Audit! Please select some winners first.');
      return;
    }

    setIsSpinning(true);
    setCurrentSpinElite(null);
    
    // Extended animation for 5-7 seconds with elite scrolling
    let spinCount = 0;
    const maxSpins = 80 + Math.floor(Math.random() * 40); // 80-120 spins for more suspense
    const totalDuration = 5000 + Math.random() * 2000; // 5-7 seconds
    const intervalTime = totalDuration / maxSpins;
    
    const spinInterval = setInterval(() => {
      const randomElite = winners[Math.floor(Math.random() * winners.length)];
      setCurrentSpinElite(randomElite);
      spinCount++;
      
      if (spinCount >= maxSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        const finalElite = winners[Math.floor(Math.random() * winners.length)];
        setSelectedElite(finalElite);
        setCurrentSpinElite(null);
      }
    }, intervalTime);
  };

  const handleMarkElite = () => {
    if (selectedElite) {
      const validChatIds = chatIds.filter(id => id.trim() !== '');
      onEliteSelected({ ...selectedElite, chatIds: validChatIds });
    }
  };

  const resetSelection = () => {
    setSelectedElite(null);
    setCurrentSpinElite(null);
    setChatIds(['']);
  };

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Crown Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white border-opacity-50">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-bounce flex items-center justify-center gap-4">
            <Star className="w-16 h-16 text-yellow-400 animate-pulse" />
            Elite's Pitch Audit
            <Star className="w-16 h-16 text-yellow-400 animate-pulse" />
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 font-medium">
            Select from the Elite Winners Pool for Advanced Audit
          </p>
        </div>

        {/* Winners Pool Info */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-20 text-white px-6 py-3 rounded-full backdrop-blur-sm border border-yellow-400 border-opacity-30">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Elite Pool: {winners.length} Winners Available</span>
          </div>
        </div>

        {/* Elite Selection Button */}
        <div className="text-center mb-12">
          <button
            onClick={selectRandomElite}
            disabled={isSpinning || winners.length === 0}
            className={`inline-flex items-center gap-4 text-2xl font-bold px-12 py-6 rounded-2xl transition-all transform shadow-2xl ${
              isSpinning || winners.length === 0
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-105'
            } text-white`}
          >
            <Crown className={`w-8 h-8 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? 'Selecting Elite...' : winners.length === 0 ? 'No Elite Winners Available' : 'Select Random Elite Winner'}
          </button>
          
          {isSpinning && (
            <div className="mt-6">
              <div className="text-white text-lg font-semibold animate-pulse mb-4">
                👑 Selecting from Elite Winners Pool... 👑
              </div>
              
              {/* Scrolling Names Animation */}
              {currentSpinElite && (
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-20 backdrop-blur-md rounded-2xl p-6 mb-4 border border-yellow-400 border-opacity-30">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2 animate-pulse">
                      {currentSpinElite.name}
                    </div>
                    <div className="text-yellow-200 text-lg">
                      {currentSpinElite.department} • {currentSpinElite.supervisor}
                    </div>
                    <div className="text-sm text-yellow-300 mt-1">
                      Winner since: {new Date(currentSpinElite.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="text-yellow-200 animate-bounce">
                Spinning through Elite Winners... ⏰
              </div>
            </div>
          )}
        </div>

        {/* Selected Elite Display */}
        {selectedElite && !isSpinning && (
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 bg-opacity-10 backdrop-blur-md rounded-3xl p-8 shadow-2xl mb-8 transform transition-all hover:scale-105 border border-yellow-400 border-opacity-30">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 bg-opacity-30 rounded-full mb-4 backdrop-blur-sm">
                <Crown className="w-8 h-8 text-yellow-300" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Selected Elite Winner
              </h2>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 from-opacity-20 to-orange-500 to-opacity-20 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-yellow-400 border-opacity-20">
              <h3 className="text-4xl font-bold text-white mb-4 text-center">
                {selectedElite.name}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                  <Building className="w-6 h-6 text-yellow-300" />
                  <div>
                    <div className="font-semibold text-yellow-200">Department</div>
                    <div className="text-xl text-white">{selectedElite.department}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                  <UserCheck className="w-6 h-6 text-green-300" />
                  <div>
                    <div className="font-semibold text-yellow-200">Supervisor</div>
                    <div className="text-xl text-white">{selectedElite.supervisor}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-xl p-4 shadow-sm backdrop-blur-sm">
                  <Trophy className="w-6 h-6 text-yellow-300" />
                  <div>
                    <div className="font-semibold text-yellow-200">Won On</div>
                    <div className="text-lg text-white">{new Date(selectedElite.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat IDs Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-yellow-300" />
                <label className="text-lg font-medium text-white">
                  Elite Audit Chat IDs (Optional - Max 5)
                </label>
              </div>
              
              <div className="space-y-3">
                {chatIds.map((chatId, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={chatId}
                      onChange={(e) => updateChatId(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-white bg-opacity-10 border border-yellow-400 border-opacity-30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
                      placeholder={`Elite Chat ID ${index + 1}`}
                    />
                    {chatIds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChatIdField(index)}
                        className="p-3 bg-red-500 bg-opacity-20 text-red-300 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                
                {chatIds.length < 5 && (
                  <button
                    type="button"
                    onClick={addChatIdField}
                    className="flex items-center gap-2 px-4 py-3 bg-yellow-500 bg-opacity-20 text-yellow-300 rounded-xl hover:bg-yellow-500 hover:text-white transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Add Elite Chat ID
                  </button>
                )}
              </div>
              
              <p className="text-sm text-yellow-200 mt-2 opacity-75">
                Elite audit chat IDs for advanced tracking and record-keeping
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetSelection}
                className="inline-flex items-center gap-3 bg-white bg-opacity-10 text-white px-6 py-3 rounded-xl hover:bg-white hover:bg-opacity-20 transition-all backdrop-blur-sm border border-white border-opacity-20"
              >
                <Shuffle className="w-5 h-5" />
                Select Another Elite
              </button>
              
              <button
                onClick={handleMarkElite}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
              >
                <Crown className="w-6 h-6" />
                Mark Elite as Selected/Not Selected
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-10 backdrop-blur-md rounded-2xl p-6 text-center border border-yellow-400 border-opacity-30">
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-yellow-400" />
            Elite Pitch Audit Process
          </h3>
          <div className="grid md:grid-cols-4 gap-4 text-yellow-100">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">1</span>
              </div>
              <p>Elite pool from winners</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">2</span>
              </div>
              <p>Random elite selection</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">3</span>
              </div>
              <p>Advanced audit process</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-2">
                <span className="text-white font-bold">4</span>
              </div>
              <p>Elite status confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElitePitchAudit;