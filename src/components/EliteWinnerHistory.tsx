import React, { useState } from 'react';
import { Crown, Calendar, User, Building, UserCheck, Trash2, AlertTriangle, X, Filter, Users, Star, MessageCircle, Eye, EyeOff, Trophy } from 'lucide-react';
import { Winner, ADMIN_PASSWORD, DEPARTMENTS } from '../config/data';

interface EliteWinnerHistoryProps {
  eliteWinners: Winner[];
  onDeleteEliteWinner?: (winnerId: string) => void;
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eliteName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, eliteName }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onConfirm();
      setPassword('');
      setError('');
    } else {
      setError('Invalid password. Access denied.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-red-500 to-pink-500 bg-opacity-10 backdrop-blur-xl border border-red-400 border-opacity-30 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500 bg-opacity-20 rounded-xl backdrop-blur-sm">
              <AlertTriangle className="w-8 h-8 text-red-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Delete Elite Winner</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-2 hover:bg-opacity-20 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-white text-opacity-90 mb-4">
            Are you sure you want to delete <span className="font-semibold text-yellow-200">{eliteName}</span> from the Elite Winners list? This action cannot be undone.
          </p>
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="delete-elite-password" className="block text-sm font-medium text-white text-opacity-90 mb-2">
              Admin Password
            </label>
            <input
              type="password"
              id="delete-elite-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-red-400 border-opacity-30 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
              placeholder="Enter admin password"
            />
            
            {error && (
              <div className="mt-3 p-3 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 text-red-200 rounded-lg backdrop-blur-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 px-4 bg-white bg-opacity-10 border border-white border-opacity-20 text-white rounded-xl hover:bg-opacity-20 transition-colors backdrop-blur-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-red-600 bg-opacity-80 text-white rounded-xl hover:bg-opacity-90 transition-colors backdrop-blur-sm border border-red-500 border-opacity-50"
              >
                Delete Elite Winner
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const EliteWinnerHistory: React.FC<EliteWinnerHistoryProps> = ({ eliteWinners, onDeleteEliteWinner }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [expandedWinner, setExpandedWinner] = useState<string | null>(null);
  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    winnerId: string | null;
    winnerName: string;
  }>({
    isOpen: false,
    winnerId: null,
    winnerName: ''
  });

  const handleDeleteClick = (winner: Winner) => {
    setDeleteModalState({
      isOpen: true,
      winnerId: winner.id || '',
      winnerName: winner.name
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModalState.winnerId && onDeleteEliteWinner) {
      onDeleteEliteWinner(deleteModalState.winnerId);
    }
    setDeleteModalState({
      isOpen: false,
      winnerId: null,
      winnerName: ''
    });
  };

  const handleDeleteModalClose = () => {
    setDeleteModalState({
      isOpen: false,
      winnerId: null,
      winnerName: ''
    });
  };

  const toggleWinnerExpansion = (winnerId: string) => {
    setExpandedWinner(expandedWinner === winnerId ? null : winnerId);
  };

  // Filter elite winners based on selected department
  const filteredEliteWinners = selectedDepartment === 'All' 
    ? eliteWinners 
    : eliteWinners.filter(winner => winner.department === selectedDepartment);

  // Get department counts for display
  const departmentCounts = DEPARTMENTS.reduce((acc, dept) => {
    acc[dept] = eliteWinners.filter(winner => winner.department === dept).length;
    return acc;
  }, {} as Record<string, number>);

  // Department button colors
  const getDepartmentColor = (department: string, index: number) => {
    const colors = [
      'from-yellow-400 to-orange-500',
      'from-orange-400 to-red-500',
      'from-yellow-500 to-orange-600',
      'from-orange-500 to-red-600',
      'from-yellow-600 to-orange-700',
      'from-orange-600 to-red-700',
      'from-yellow-400 to-red-500',
      'from-orange-400 to-yellow-600',
      'from-red-400 to-orange-600',
      'from-yellow-500 to-red-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 backdrop-blur-sm">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            👑 Elite Winner History
          </h1>
          <p className="text-xl text-yellow-200">
            {eliteWinners.length} Elite {eliteWinners.length === 1 ? 'Winner' : 'Winners'} Achieved
          </p>
        </div>

        {/* Department Filter Buttons */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
              <Filter className="w-6 h-6" />
              Filter Elite Winners by Department
            </h2>
            <p className="text-yellow-200">Click on a department to filter elite winners</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {/* All Button */}
            <button
              onClick={() => setSelectedDepartment('All')}
              className={`group relative overflow-hidden rounded-2xl px-6 py-3 transition-all duration-300 transform hover:scale-105 ${
                selectedDepartment === 'All'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-2xl scale-105'
                  : 'bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20'
              }`}
            >
              <div className="relative z-10 flex items-center gap-2">
                <Crown className={`w-5 h-5 ${selectedDepartment === 'All' ? 'text-white' : 'text-yellow-300'}`} />
                <span className={`font-semibold ${selectedDepartment === 'All' ? 'text-white' : 'text-white'}`}>
                  All Elite Winners
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  selectedDepartment === 'All' 
                    ? 'bg-white bg-opacity-20 text-white' 
                    : 'bg-yellow-500 bg-opacity-30 text-yellow-200'
                }`}>
                  {eliteWinners.length}
                </span>
              </div>
              
              {/* Animated background effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                selectedDepartment === 'All' ? 'opacity-30' : ''
              }`} />
            </button>

            {/* Department Buttons */}
            {DEPARTMENTS.map((department, index) => {
              const count = departmentCounts[department] || 0;
              const isSelected = selectedDepartment === department;
              const colorClass = getDepartmentColor(department, index);
              
              return (
                <button
                  key={department}
                  onClick={() => setSelectedDepartment(department)}
                  className={`group relative overflow-hidden rounded-2xl px-6 py-3 transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? `bg-gradient-to-r ${colorClass} shadow-2xl scale-105`
                      : 'bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    <Building className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-yellow-300'}`} />
                    <span className={`font-semibold ${isSelected ? 'text-white' : 'text-white'}`}>
                      {department}
                    </span>
                    {count > 0 && (
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        isSelected 
                          ? 'bg-white bg-opacity-20 text-white' 
                          : 'bg-yellow-500 bg-opacity-30 text-yellow-200'
                      }`}>
                        {count}
                      </span>
                    )}
                  </div>
                  
                  {/* Animated background effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                    isSelected ? 'opacity-30' : ''
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Filter Status */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-20 text-white px-4 py-2 rounded-full backdrop-blur-sm border border-yellow-400 border-opacity-30">
              <Users className="w-4 h-4" />
              <span className="font-medium">
                Showing {filteredEliteWinners.length} elite {filteredEliteWinners.length === 1 ? 'winner' : 'winners'}
                {selectedDepartment !== 'All' && ` from ${selectedDepartment}`}
              </span>
            </div>
          </div>
        </div>

        {/* Elite Winners List */}
        {filteredEliteWinners.length === 0 ? (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-10 backdrop-blur-md rounded-2xl p-12 text-center border border-yellow-400 border-opacity-30">
            <Crown className="w-16 h-16 text-white opacity-50 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              {selectedDepartment === 'All' ? 'No Elite Winners Yet' : `No Elite Winners from ${selectedDepartment}`}
            </h2>
            <p className="text-yellow-200">
              {selectedDepartment === 'All' 
                ? 'Start the Elite Pitch Audit to see elite winners here!' 
                : `No guides from ${selectedDepartment} have achieved elite status yet.`
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredEliteWinners.map((winner, index) => (
              <div
                key={`${winner.id}-${winner.timestamp}`}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-10 backdrop-blur-md rounded-2xl p-6 shadow-xl transform transition-all hover:scale-105 border border-yellow-400 border-opacity-30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-bold text-lg">
                        #{selectedDepartment === 'All' 
                          ? eliteWinners.findIndex(w => w.id === winner.id) + 1
                          : index + 1
                        }
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Crown className="w-6 h-6 text-yellow-400" />
                        {winner.name}
                      </h3>
                      <div className="flex items-center gap-2 text-yellow-200">
                        <Calendar className="w-4 h-4" />
                        <span>Elite achieved: {new Date(winner.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-8 h-8 text-yellow-400 fill-current" />
                    {winner.chat_ids && winner.chat_ids.length > 0 && (
                      <button
                        onClick={() => toggleWinnerExpansion(winner.id || '')}
                        className="p-2 bg-yellow-500 bg-opacity-20 text-yellow-300 rounded-lg hover:bg-yellow-500 hover:text-white transition-all"
                        title="View Elite Chat IDs"
                      >
                        {expandedWinner === winner.id ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    )}
                    {onDeleteEliteWinner && (
                      <button
                        onClick={() => handleDeleteClick(winner)}
                        className="p-2 bg-red-500 bg-opacity-20 text-red-300 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        title="Delete this elite winner"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm border border-yellow-400 border-opacity-20">
                    <Building className="w-5 h-5 text-yellow-300" />
                    <div>
                      <div className="font-medium text-yellow-200">Department</div>
                      <div className="text-lg text-white">{winner.department}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm border border-yellow-400 border-opacity-20">
                    <UserCheck className="w-5 h-5 text-green-300" />
                    <div>
                      <div className="font-medium text-yellow-200">Supervisor</div>
                      <div className="text-lg text-white">{winner.supervisor}</div>
                    </div>
                  </div>
                </div>

                {/* Elite Chat IDs Section */}
                {expandedWinner === winner.id && winner.chat_ids && winner.chat_ids.length > 0 && (
                  <div className="mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-10 rounded-lg p-4 backdrop-blur-sm border border-yellow-400 border-opacity-20">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle className="w-5 h-5 text-yellow-300" />
                      <h4 className="font-medium text-yellow-200">Elite Audit Chat IDs</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {winner.chat_ids.map((chatId, chatIndex) => (
                        <div key={chatIndex} className="bg-white bg-opacity-10 rounded-lg p-3 border border-yellow-400 border-opacity-20">
                          <div className="text-xs text-yellow-200 mb-1">Elite Chat ID {chatIndex + 1}</div>
                          <div className="text-white font-mono text-sm">{chatId}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <DeleteModal
          isOpen={deleteModalState.isOpen}
          onClose={handleDeleteModalClose}
          onConfirm={handleDeleteConfirm}
          eliteName={deleteModalState.winnerName}
        />
      </div>
    </div>
  );
};

export default EliteWinnerHistory;