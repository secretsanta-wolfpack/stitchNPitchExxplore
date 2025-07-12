import React, { useState } from 'react';
import { X, Crown } from 'lucide-react';
import { Winner } from '../config/data';

interface ElitePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (action: 'pass' | 'fail') => void;
  elite: Winner;
  chatIds?: string[];
}

const ElitePasswordModal: React.FC<ElitePasswordModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  elite,
  chatIds = []
}) => {
  const [password, setPassword] = useState('');
  const [selectedAction, setSelectedAction] = useState<'pass' | 'fail' | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAction) {
      setError('Please select Elite Confirmed or Elite Rejected');
      return;
    }
    
    if (!password.trim()) {
      setError('Please enter the admin password');
      return;
    }
    
    onConfirm(selectedAction);
    setPassword('');
    setSelectedAction(null);
    setError('');
  };

  const handleClose = () => {
    setPassword('');
    setSelectedAction(null);
    setError('');
    onClose();
  };

  const handleActionSelect = (action: 'pass' | 'fail') => {
    setSelectedAction(action);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-yellow-500 to-orange-500 bg-opacity-10 backdrop-blur-xl border border-yellow-400 border-opacity-30 rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-500 bg-opacity-20 rounded-xl backdrop-blur-sm">
              <Crown className="w-6 h-6 text-yellow-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">Elite Audit Access</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors bg-white bg-opacity-10 rounded-full p-2 hover:bg-opacity-20 backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-20 rounded-xl p-4 mb-4 border border-yellow-400 border-opacity-30">
            <h3 className="font-bold text-white text-lg mb-2">Selected Elite Winner</h3>
            <p className="text-yellow-200 font-semibold">{elite.name}</p>
            <p className="text-yellow-300 text-sm">{elite.department} • {elite.supervisor}</p>
            <p className="text-yellow-300 text-xs mt-1">
              Original Win Date: {new Date(elite.timestamp).toLocaleDateString()}
            </p>
          </div>

          <p className="text-white text-opacity-90 mb-4">
            Mark <span className="font-semibold text-yellow-200">{elite.name}</span> as:
            {chatIds.length > 0 && (
              <span className="block text-sm text-yellow-300 mt-2">
                Elite Chat IDs: {chatIds.join(', ')}
              </span>
            )}
          </p>
          
          <div className="flex gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleActionSelect('pass')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all backdrop-blur-sm border ${
                selectedAction === 'pass'
                  ? 'bg-green-500 bg-opacity-80 text-white shadow-lg border-green-400 border-opacity-50'
                  : 'bg-white bg-opacity-10 text-white hover:bg-green-500 hover:bg-opacity-30 border-white border-opacity-20'
              }`}
            >
              👑 Elite Confirmed
            </button>
            <button
              type="button"
              onClick={() => handleActionSelect('fail')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all backdrop-blur-sm border ${
                selectedAction === 'fail'
                  ? 'bg-red-500 bg-opacity-80 text-white shadow-lg border-red-400 border-opacity-50'
                  : 'bg-white bg-opacity-10 text-white hover:bg-red-500 hover:bg-opacity-30 border-white border-opacity-20'
              }`}
            >
              ❌ Elite Rejected
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="elite-password" className="block text-sm font-medium text-white text-opacity-90 mb-2">
              Elite Audit Password
            </label>
            <input
              type="password"
              id="elite-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white bg-opacity-10 border border-yellow-400 border-opacity-30 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white placeholder-opacity-60 backdrop-blur-sm"
              placeholder="Enter elite audit password"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-400 border-opacity-50 text-red-200 rounded-lg backdrop-blur-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 px-4 bg-white bg-opacity-10 border border-white border-opacity-20 text-white rounded-xl hover:bg-opacity-20 transition-colors backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-500 bg-opacity-80 text-white rounded-xl hover:bg-opacity-90 transition-colors backdrop-blur-sm border border-yellow-400 border-opacity-50"
            >
              Confirm Elite Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ElitePasswordModal;