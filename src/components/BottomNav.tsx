import { Home, BookOpen, MessageCircle, User } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'coach' | 'peserta';
}

export function BottomNav({ activeTab, onTabChange, role }: BottomNavProps) {
  
  // Susunan tab untuk Peserta (4 tab)
  const studentTabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'kelas', label: 'Kelas', icon: BookOpen }, // Ini akan membuka 'Jelajahi'
    { id: 'community', label: 'Komunitas', icon: MessageCircle },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  // Susunan tab untuk Coach (4 tab)
  const coachTabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'kelas', label: 'Kelola', icon: BookOpen }, // Ini akan membuka 'Kelola Kelas'
    { id: 'peserta', label: 'Peserta', icon: User },
    { id: 'profil', label: 'Profil', icon: User },
  ];
  
  // Logika untuk memilih tabset yang benar
  const finalTabs = role === 'coach' ? coachTabs : studentTabs;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-4 py-3">
          {finalTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className="flex flex-col items-center gap-1 min-w-[60px] transition-all duration-200 active:scale-95"
              >
                <div className={`p-2 rounded-2xl transition-colors ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}