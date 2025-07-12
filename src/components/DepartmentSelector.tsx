import React from 'react';
import { Building2, Users, ChevronRight, Trophy } from 'lucide-react';
import { DEPARTMENTS, getGuidesByDepartment, Winner } from '../config/data';

interface DepartmentSelectorProps {
  selectedDepartment: string | null;
  onDepartmentSelect: (department: string) => void;
  winners: Winner[];
}

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({
  selectedDepartment,
  onDepartmentSelect,
  winners
}) => {
  // Get winner guide IDs to exclude from selection
  const winnerGuideIds = new Set(winners.map(winner => winner.guide_id));

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <Building2 className="w-8 h-8" />
          Select Department
        </h2>
        <p className="text-purple-200">Choose a department to select guides from</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {DEPARTMENTS.map((department) => {
          const allGuides = getGuidesByDepartment(department);
          const availableGuides = allGuides.filter(guide => !winnerGuideIds.has(guide.id));
          const winnersCount = allGuides.length - availableGuides.length;
          const isSelected = selectedDepartment === department;
          
          return (
            <button
              key={department}
              onClick={() => onDepartmentSelect(department)}
              className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'bg-gradient-to-br from-orange-500 to-pink-500 shadow-2xl scale-105'
                  : 'bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20'
              }`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <Building2 className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-purple-300'}`} />
                  <ChevronRight className={`w-5 h-5 transition-transform ${
                    isSelected ? 'text-white rotate-90' : 'text-purple-300 group-hover:translate-x-1'
                  }`} />
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${
                  isSelected ? 'text-white' : 'text-white'
                }`}>
                  {department}
                </h3>
                
                <div className="space-y-2">
                  <div className={`flex items-center gap-2 text-sm ${
                    isSelected ? 'text-white text-opacity-90' : 'text-purple-200'
                  }`}>
                    <Users className="w-4 h-4" />
                    <span>{availableGuides.length} Available</span>
                  </div>
                  
                  {winnersCount > 0 && (
                    <div className={`flex items-center gap-2 text-sm ${
                      isSelected ? 'text-yellow-200' : 'text-yellow-300'
                    }`}>
                      <Trophy className="w-4 h-4" />
                      <span>{winnersCount} Already Won</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Animated background effect */}
              <div className={`absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                isSelected ? 'opacity-30' : ''
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentSelector;