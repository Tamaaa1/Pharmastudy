import { Trophy, Star, Book, MessageSquare, Search, TrendingUp, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StudentDashboardProps {
  userName: string;
  onNavigateToClassList: () => void; // Untuk 'Jelajahi Kelas'
  onNavigateToCommunity: () => void;
  onNavigateToQuiz: () => void;
  onNavigateToMyClasses: () => void; // <-- TAMBAHKAN INI
}

export function StudentDashboard({ 
  userName, 
  onNavigateToClassList, 
  onNavigateToCommunity, 
  onNavigateToQuiz,
  onNavigateToMyClasses // <-- TAMBAHKAN INI
}: StudentDashboardProps) {
  
  const userStats = {
    points: 1250,
    level: 8,
    coursesCompleted: 15,
    currentStreak: 7,
  };

  const badges = [
    { name: 'Early Bird', icon: '🌅', earned: true },
    { name: 'Quick Learner', icon: '⚡', earned: true },
    { name: 'Consistent', icon: '🎯', earned: true },
    { name: 'Master', icon: '👑', earned: false },
  ];

  const enrolledClasses = [
    {
      id: 1,
      title: 'Teknik Presentasi Efektif',
      coach: 'Dr. Sarah Johnson',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTc0OTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      nextSession: 'Besok, 14:00',
    },
    {
      id: 2,
      title: 'Leadership & Team Management',
      coach: 'Prof. Michael Chen',
      progress: 45,
      image: 'https://images.unsplash.com/photo-1745970649913-2edb9dca4f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvYWNoaW5nJTIwc2Vzc2lvbnxlbnwxfHx8fDE3NjE2NzMzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      nextSession: '3 hari lagi',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <h2 className="text-primary-foreground mb-1">Selamat Datang,</h2>
        <h1 className="text-primary-foreground mb-6">{userName}</h1>
        
        {/* Points & Level Card */}
        <div className="bg-primary-foreground/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground">Level {userStats.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground">{userStats.points} Poin</span>
            </div>
          </div>
          <Progress value={65} className="h-2 bg-primary-foreground/20" />
          <p className="text-xs text-primary-foreground/70 mt-2">350 poin lagi ke Level 9</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={onNavigateToClassList}
            className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-24 flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
          >
            <Search className="w-6 h-6" />
            <span>Jelajahi Kelas</span>
          </Button>
          <Button 
            onClick={onNavigateToCommunity}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-24 flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
          >
            <MessageSquare className="w-6 h-6" />
            <span>Komunitas</span>
          </Button>
          <Button 
            onClick={onNavigateToQuiz}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-24 flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
          >
            <Brain className="w-6 h-6" />
            <span>Kuis</span>
          </Button>
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Badge Saya</h3>
          <button className="text-primary text-sm">Lihat Semua</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {badges.map((badge) => (
            <div 
              key={badge.name}
              className={`flex-shrink-0 bg-card rounded-2xl p-4 shadow-md w-24 text-center ${
                !badge.earned && 'opacity-40 grayscale'
              }`}
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <p className="text-xs text-foreground">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Classes */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Kelas Saya</h3>
          <button 
            className="text-primary text-sm" 
            onClick={onNavigateToMyClasses} // <-- SAMBUNGKAN FUNGSI DI SINI
          >
            Lihat Semua
          </button>
        </div>
        <div className="space-y-3">
          {enrolledClasses.map((course) => (
            <div key={course.id} className="bg-card rounded-2xl shadow-md overflow-hidden active:scale-95 transition-transform cursor-pointer">
              <div className="flex gap-4 p-4">
                <ImageWithFallback 
                  src={course.image}
                  alt={course.title}
                  className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground mb-1 truncate">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{course.coach}</p>
                  <div className="space-y-1">
                    <Progress value={course.progress} className="h-1.5" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{course.progress}% Selesai</span>
                      <span className="text-primary">{course.nextSession}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="px-6 mt-6">
        <div className="bg-card rounded-2xl p-4 shadow-md">
          <div className="grid grid-cols-3 divide-x divide-border">
            <div className="text-center px-2">
              <p className="text-primary">{userStats.coursesCompleted}</p>
              <p className="text-xs text-muted-foreground mt-1">Kelas Selesai</p>
            </div>
            <div className="text-center px-2">
              <p className="text-primary">{userStats.currentStreak}</p>
              <p className="text-xs text-muted-foreground mt-1">Hari Beruntun</p>
            </div>
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <p className="text-primary">4.9</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Rating Rata-rata</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}