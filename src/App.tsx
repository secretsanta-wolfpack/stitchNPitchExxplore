import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import RandomGuideSelector from './components/RandomGuideSelector';
import PasswordModal from './components/PasswordModal';
import WinnerDisplay from './components/WinnerDisplay';
import WinnerHistory from './components/WinnerHistory';
import ElitePitchAudit from './components/ElitePitchAudit';
import ElitePasswordModal from './components/ElitePasswordModal';
import EliteWinnerDisplay from './components/EliteWinnerDisplay';
import EliteFailAnimation from './components/EliteFailAnimation';
import EliteWinnerHistory from './components/EliteWinnerHistory';
import WinHistoryDashboard from './components/WinHistoryDashboard';
import ExportData from './components/ExportData';
import BackupRestore from './components/BackupRestore';
import ConfettiAnimation from './components/ConfettiAnimation';
import FailAnimation from './components/FailAnimation';
import DynamicOrbs from './components/DynamicOrbs';
import Navigation from './components/Navigation';
import { Guide, Winner, Loser, EliteWinner, ADMIN_PASSWORD } from './config/data';

type AppTab = 'selection' | 'winners' | 'elite-audit' | 'elite-winners';

function App() {
  const [currentTab, setCurrentTab] = useState<AppTab>('selection');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [currentWinner, setCurrentWinner] = useState<Winner | null>(null);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [losers, setLosers] = useState<Loser[]>([]);
  const [eliteWinners, setEliteWinners] = useState<EliteWinner[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isElitePasswordModalOpen, setIsElitePasswordModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFailAnimation, setShowFailAnimation] = useState(false);
  const [showEliteConfetti, setShowEliteConfetti] = useState(false);
  const [showEliteFailAnimation, setShowEliteFailAnimation] = useState(false);
  const [failedGuideName, setFailedGuideName] = useState('');
  const [failedEliteName, setFailedEliteName] = useState('');
  const [selectedElite, setSelectedElite] = useState<Winner | null>(null);
  const [currentEliteWinner, setCurrentEliteWinner] = useState<EliteWinner | null>(null);
  const [loading, setLoading] = useState(true);
  
  // New modal states
  const [isWinHistoryDashboardOpen, setIsWinHistoryDashboardOpen] = useState(false);
  const [isExportDataOpen, setIsExportDataOpen] = useState(false);
  const [isBackupRestoreOpen, setIsBackupRestoreOpen] = useState(false);

  // Load winners from Supabase on component mount
  useEffect(() => {
    loadWinners();
    loadLosers();
    loadEliteWinners();
  }, []);

  const loadWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('winners')
        .select('*')
        .order('created_at', { ascending: true }); // Changed to ascending order

      if (error) {
        console.error('Error loading winners:', error);
        // Fallback to localStorage if Supabase fails
        const savedWinners = localStorage.getItem('stitchAndPitchWinners');
        if (savedWinners) {
          const localWinners = JSON.parse(savedWinners);
          // Sort local winners by timestamp in ascending order
          localWinners.sort((a: Winner, b: Winner) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setWinners(localWinners);
        }
      } else {
        setWinners(data || []);
        // Also sync to localStorage as backup
        localStorage.setItem('stitchAndPitchWinners', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const savedWinners = localStorage.getItem('stitchAndPitchWinners');
      if (savedWinners) {
        const localWinners = JSON.parse(savedWinners);
        // Sort local winners by timestamp in ascending order
        localWinners.sort((a: Winner, b: Winner) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setWinners(localWinners);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadLosers = async () => {
    try {
      const { data, error } = await supabase
        .from('losers')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading losers:', error);
        // Fallback to localStorage if Supabase fails
        const savedLosers = localStorage.getItem('stitchAndPitchLosers');
        if (savedLosers) {
          const localLosers = JSON.parse(savedLosers);
          localLosers.sort((a: Loser, b: Loser) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setLosers(localLosers);
        }
      } else {
        setLosers(data || []);
        localStorage.setItem('stitchAndPitchLosers', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      const savedLosers = localStorage.getItem('stitchAndPitchLosers');
      if (savedLosers) {
        const localLosers = JSON.parse(savedLosers);
        localLosers.sort((a: Loser, b: Loser) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setLosers(localLosers);
      }
    }
  };

  const loadEliteWinners = async () => {
    try {
      const { data, error } = await supabase
        .from('elite_winners')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading elite winners:', error);
        // Fallback to localStorage if Supabase fails
        const savedEliteWinners = localStorage.getItem('stitchAndPitchEliteWinners');
        if (savedEliteWinners) {
          const localEliteWinners = JSON.parse(savedEliteWinners);
          localEliteWinners.sort((a: EliteWinner, b: EliteWinner) => new Date(a.elite_timestamp).getTime() - new Date(b.elite_timestamp).getTime());
          setEliteWinners(localEliteWinners);
        }
      } else {
        setEliteWinners(data || []);
        localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(data || []));
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      const savedEliteWinners = localStorage.getItem('stitchAndPitchEliteWinners');
      if (savedEliteWinners) {
        const localEliteWinners = JSON.parse(savedEliteWinners);
        localEliteWinners.sort((a: EliteWinner, b: EliteWinner) => new Date(a.elite_timestamp).getTime() - new Date(b.elite_timestamp).getTime());
        setEliteWinners(localEliteWinners);
      }
    }
  };

  const saveWinnerToDatabase = async (winner: Winner) => {
    try {
      const { data, error } = await supabase
        .from('winners')
        .insert([{
          guide_id: winner.guide_id,
          name: winner.name,
          department: winner.department,
          supervisor: winner.supervisor,
          timestamp: winner.timestamp,
          chat_ids: winner.chat_ids || []
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving winner to database:', error);
        // Fallback to localStorage
        const updatedWinners = [...winners, winner].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setWinners(updatedWinners);
        localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
      } else {
        // Reload winners from database to get the latest data
        await loadWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedWinners = [...winners, winner].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setWinners(updatedWinners);
      localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
    }
  };

  const saveLoserToDatabase = async (loser: Loser) => {
    try {
      const { data, error } = await supabase
        .from('losers')
        .insert([{
          guide_id: loser.guide_id,
          name: loser.name,
          department: loser.department,
          supervisor: loser.supervisor,
          timestamp: loser.timestamp,
          chat_ids: loser.chat_ids || []
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving loser to database:', error);
        // Fallback to localStorage
        const updatedLosers = [...losers, loser].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setLosers(updatedLosers);
        localStorage.setItem('stitchAndPitchLosers', JSON.stringify(updatedLosers));
      } else {
        // Reload losers from database to get the latest data
        await loadLosers();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedLosers = [...losers, loser].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setLosers(updatedLosers);
      localStorage.setItem('stitchAndPitchLosers', JSON.stringify(updatedLosers));
    }
  };

  const saveEliteWinnerToDatabase = async (eliteWinner: EliteWinner) => {
    try {
      const { data, error } = await supabase
        .from('elite_winners')
        .insert([{
          guide_id: eliteWinner.guide_id,
          name: eliteWinner.name,
          department: eliteWinner.department,
          supervisor: eliteWinner.supervisor,
          timestamp: eliteWinner.timestamp,
          elite_timestamp: eliteWinner.elite_timestamp,
          chat_ids: eliteWinner.chat_ids || [],
          elite_chat_ids: eliteWinner.elite_chat_ids || []
        }])
        .select()
        .single();

      if (error) {
        console.error('Error saving elite winner to database:', error);
        // Fallback to localStorage
        const updatedEliteWinners = [...eliteWinners, eliteWinner].sort((a, b) => new Date(a.elite_timestamp).getTime() - new Date(b.elite_timestamp).getTime());
        setEliteWinners(updatedEliteWinners);
        localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
      } else {
        // Reload elite winners from database to get the latest data
        await loadEliteWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedEliteWinners = [...eliteWinners, eliteWinner].sort((a, b) => new Date(a.elite_timestamp).getTime() - new Date(b.elite_timestamp).getTime());
      setEliteWinners(updatedEliteWinners);
      localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
    }
  };

  const deleteWinnerFromDatabase = async (winnerId: string) => {
    try {
      const { error } = await supabase
        .from('winners')
        .delete()
        .eq('id', winnerId);

      if (error) {
        console.error('Error deleting winner from database:', error);
        // Fallback to localStorage
        const updatedWinners = winners.filter(winner => winner.id !== winnerId);
        setWinners(updatedWinners);
        localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
      } else {
        // Reload winners from database to get the latest data
        await loadWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedWinners = winners.filter(winner => winner.id !== winnerId);
      setWinners(updatedWinners);
      localStorage.setItem('stitchAndPitchWinners', JSON.stringify(updatedWinners));
    }
  };

  const deleteEliteWinnerFromDatabase = async (eliteWinnerId: string) => {
    try {
      const { error } = await supabase
        .from('elite_winners')
        .delete()
        .eq('id', eliteWinnerId);

      if (error) {
        console.error('Error deleting elite winner from database:', error);
        // Fallback to localStorage
        const updatedEliteWinners = eliteWinners.filter(winner => winner.id !== eliteWinnerId);
        setEliteWinners(updatedEliteWinners);
        localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
      } else {
        // Reload elite winners from database to get the latest data
        await loadEliteWinners();
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      // Fallback to localStorage
      const updatedEliteWinners = eliteWinners.filter(winner => winner.id !== eliteWinnerId);
      setEliteWinners(updatedEliteWinners);
      localStorage.setItem('stitchAndPitchEliteWinners', JSON.stringify(updatedEliteWinners));
    }
  };

  const handleRestoreWinners = async (restoredWinners: Winner[], restoredLosers?: Loser[]) => {
    try {
      // First, purge existing data
      const { error: winnersError } = await supabase
        .from('winners')
        .delete()
        .gte('created_at', '1900-01-01');

      if (restoredLosers) {
        const { error: losersError } = await supabase
          .from('losers')
          .delete()
          .gte('created_at', '1900-01-01');
      }
      
      // Then insert restored data
      for (const winner of restoredWinners) {
        await saveWinnerToDatabase(winner);
      }
      
      if (restoredLosers) {
        for (const loser of restoredLosers) {
          await saveLoserToDatabase(loser);
        }
      }
      
      // Reload to get fresh data
      await loadWinners();
      await loadLosers();
    } catch (error) {
      console.error('Error restoring winners:', error);
      // Fallback to localStorage
      setWinners(restoredWinners);
      localStorage.setItem('stitchAndPitchWinners', JSON.stringify(restoredWinners));
      if (restoredLosers) {
        setLosers(restoredLosers);
        localStorage.setItem('stitchAndPitchLosers', JSON.stringify(restoredLosers));
      }
    }
  };

  const handleGuideSelected = (guide: Guide) => {
    // Extract chat IDs from the guide object if they exist
    const { chatIds, ...guideData } = guide as Guide & { chatIds?: string[] };
    setSelectedGuide(guideData);
    setSelectedChatIds(chatIds || []);
    setIsPasswordModalOpen(true);
  };

  const handleEliteSelected = (elite: Winner & { chatIds?: string[] }) => {
    // Extract chat IDs from the elite object if they exist
    const { chatIds, ...eliteData } = elite;
    setSelectedElite(eliteData);
    setSelectedEliteChatIds(chatIds || []);
    setIsElitePasswordModalOpen(true);
  };

  const [selectedChatIds, setSelectedChatIds] = useState<string[]>([]);
  const [selectedEliteChatIds, setSelectedEliteChatIds] = useState<string[]>([]);

  const handlePasswordConfirm = async (action: 'pass' | 'fail') => {
    setIsPasswordModalOpen(false);
    
    if (action === 'pass' && selectedGuide) {
      // Create winner object
      const winner: Winner = {
        guide_id: selectedGuide.id,
        name: selectedGuide.name,
        department: selectedGuide.department,
        supervisor: selectedGuide.supervisor,
        timestamp: new Date().toISOString(),
        chat_ids: selectedChatIds
      };
      
      // Save to database
      await saveWinnerToDatabase(winner);
      setCurrentWinner(winner);
      setShowConfetti(true);
      
      // Winner display and confetti will stay until manually closed
    } else if (action === 'fail' && selectedGuide) {
      // Create loser object
      const loser: Loser = {
        guide_id: selectedGuide.id,
        name: selectedGuide.name,
        department: selectedGuide.department,
        supervisor: selectedGuide.supervisor,
        timestamp: new Date().toISOString(),
        chat_ids: selectedChatIds
      };
      
      // Save loser to database
      await saveLoserToDatabase(loser);
      
      // Show fail animation
      setFailedGuideName(selectedGuide.name);
      setShowFailAnimation(true);
      
      // Fail animation will stay until manually closed
    }
    
    // Reset selected guide
    setSelectedGuide(null);
    setSelectedChatIds([]);
  };

  const handleElitePasswordConfirm = async (action: 'pass' | 'fail') => {
    setIsElitePasswordModalOpen(false);
    
    if (action === 'pass' && selectedElite) {
      // Create elite winner object
      const eliteWinner: EliteWinner = {
        ...selectedElite,
        elite_timestamp: new Date().toISOString(),
        elite_chat_ids: selectedEliteChatIds
      };
      
      // Save to database
      await saveEliteWinnerToDatabase(eliteWinner);
      setCurrentEliteWinner(eliteWinner);
      setShowEliteConfetti(true);
      
    } else if (action === 'fail' && selectedElite) {
      // Show elite fail animation
      setFailedEliteName(selectedElite.name);
      setShowEliteFailAnimation(true);
    }
    
    // Reset selected elite
    setSelectedElite(null);
    setSelectedEliteChatIds([]);
  };

  const handleCloseWinner = () => {
    setShowConfetti(false);
    setCurrentWinner(null);
  };

  const handleCloseEliteWinner = () => {
    setShowEliteConfetti(false);
    setCurrentEliteWinner(null);
  };

  const handleCloseFail = () => {
    setShowFailAnimation(false);
    setFailedGuideName('');
  };

  const handleCloseEliteFail = () => {
    setShowEliteFailAnimation(false);
    setFailedEliteName('');
  };

  const validatePassword = (password: string): boolean => {
    return password === ADMIN_PASSWORD;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="/stitch-n-pitch-logo.png" 
              alt="Stitch n Pitch Logo" 
              className="h-20 w-auto animate-pulse"
            />
          </div>
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading Stitch n Pitch contest data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Dynamic Orbs Background */}
      <DynamicOrbs />

      {/* Navigation */}
      <Navigation
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        winnerCount={winners.length}
        eliteWinnerCount={eliteWinners.length}
        onOpenWinHistoryDashboard={() => setIsWinHistoryDashboardOpen(true)}
        onOpenExportData={() => setIsExportDataOpen(true)}
        onOpenBackupRestore={() => setIsBackupRestoreOpen(true)}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {currentTab === 'selection' && (
          <RandomGuideSelector 
            onGuideSelected={handleGuideSelected} 
            winners={winners}
          />
        )}

        {currentTab === 'winners' && (
          <WinnerHistory 
            winners={winners} 
            onDeleteWinner={deleteWinnerFromDatabase}
          />
        )}

          {currentTab === 'elite-audit' && (
            <ElitePitchAudit 
              winners={winners}
              onEliteSelected={handleEliteSelected}
            />
          )}

          {currentTab === 'elite-winners' && (
            <EliteWinnerHistory 
              eliteWinners={eliteWinners}
              onDeleteEliteWinner={deleteEliteWinnerFromDatabase}
            />
          )}
      </div>

      {/* Winner Display Overlay */}
      {currentWinner && (
        <WinnerDisplay
          winner={currentWinner}
          onBack={handleCloseWinner}
          onOpenElitePitchAudit={() => setCurrentTab('elite-audit')}
        />
        )}
        {currentEliteWinner && (
          <EliteWinnerDisplay
            elite={currentEliteWinner}
            onBack={handleCloseEliteWinner}
          />
        )}

      {/* Password Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setSelectedGuide(null);
          setSelectedChatIds([]);
        }}
        onConfirm={(action) => {
          const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
          if (passwordInput && validatePassword(passwordInput.value)) {
            handlePasswordConfirm(action);
          } else {
            alert('Invalid password. Access denied.');
          }
        }}
        guideName={selectedGuide?.name || ''}
        chatIds={selectedChatIds}
      />

      {/* Elite Password Modal */}
      <ElitePasswordModal
          isOpen={isElitePasswordModalOpen}
          onClose={() => {
            setIsElitePasswordModalOpen(false);
            setSelectedElite(null);
            setSelectedEliteChatIds([]);
          }}
          onConfirm={(action) => {
            const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
            if (passwordInput && validatePassword(passwordInput.value)) {
              handleElitePasswordConfirm(action);
            } else {
              alert('Invalid password. Access denied.');
            }
          }}
          elite={selectedElite!}
          chatIds={selectedEliteChatIds}

      />

      {/* New Feature Modals */}
      <WinHistoryDashboard
        isOpen={isWinHistoryDashboardOpen}
        onClose={() => setIsWinHistoryDashboardOpen(false)}
        winners={winners}
      />

      <ExportData
        isOpen={isExportDataOpen}
        onClose={() => setIsExportDataOpen(false)}
        winners={winners}
        losers={losers}
      />

      <BackupRestore
        isOpen={isBackupRestoreOpen}
        onClose={() => setIsBackupRestoreOpen(false)}
        winners={winners}
        losers={losers}
        onRestoreWinners={handleRestoreWinners}
      />

        <ConfettiAnimation isActive={showEliteConfetti} />
      {/* Confetti Animation */}
      <ConfettiAnimation isActive={showConfetti} />

      {/* Fail Animation */}
      <FailAnimation 
        isActive={showFailAnimation} 
        guideName={failedGuideName}
        onClose={handleCloseFail}
      />

      {/* Elite Fail Animation */}
      <EliteFailAnimation 
        isActive={showEliteFailAnimation} 
        onClose={handleCloseEliteFail}
      />
    </div>
  );
}

export default App;