import { ArrowLeft, Edit, Lock, LogOut, Trophy, Award, BookOpen, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

interface ProfilePageProps {
  userName: string;
  userRole: 'coach' | 'peserta';
  onBack: () => void;
  onLogout: () => void;
  onEditProfile: () => void;
  onChangePassword: () => void;
}

export function ProfilePage({ userName, userRole, onBack, onLogout, onEditProfile, onChangePassword }: ProfilePageProps) {
  const userStats = userRole === 'peserta' ? {
    points: 1250,
    level: 8,
    coursesCompleted: 15,
    badges: 12,
  } : {
    totalStudents: 248,
    totalClasses: 12,
    averageRating: 4.8,
    revenue: 'Rp 12M',
  };

  const badges = [
    { name: 'Early Bird', icon: '🌅', description: 'Bergabung sejak awal' },
    { name: 'Quick Learner', icon: '⚡', description: 'Selesaikan 10 kelas' },
    { name: 'Consistent', icon: '🎯', description: '7 hari beruntun' },
    { name: 'Top Contributor', icon: '💬', description: '50+ diskusi forum' },
  ];

  const achievements = userRole === 'peserta' ? [
    { label: 'Kelas Selesai', value: '15', icon: BookOpen },
    { label: 'Total Poin', value: '1,250', icon: Trophy },
    { label: 'Badge Terkumpul', value: '12', icon: Award },
    { label: 'Rating Diberikan', value: '4.9', icon: Star },
  ] : [
    { label: 'Total Peserta', value: '248', icon: BookOpen },
    { label: 'Kelas Aktif', value: '12', icon: Trophy },
    { label: 'Rating Rata-rata', value: '4.8', icon: Star },
    { label: 'Pendapatan', value: '12M', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-lg mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary-foreground mb-4 hover:gap-3 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>

        {/* Profile Card */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary-foreground/20">
            <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
              {userName[0]}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-primary-foreground mb-1">{userName}</h2>
          <Badge className={`${
            userRole === 'coach' 
              ? 'bg-accent text-accent-foreground' 
              : 'bg-primary-foreground/20 text-primary-foreground'
          } rounded-xl mb-4`}>
            {userRole === 'coach' ? '👨‍🏫 Coach' : '🎓 Peserta'}
          </Badge>

          {userRole === 'peserta' && (
            <div className="w-full bg-primary-foreground/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-foreground/80">Level {userStats.level}</span>
                <span className="text-sm text-primary-foreground/80">{userStats.points} poin</span>
              </div>
              <Progress value={65} className="h-2 bg-primary-foreground/20" />
              <p className="text-xs text-primary-foreground/70 mt-2">350 poin lagi ke Level 9</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-2xl p-4 shadow-md text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-xl mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Section */}
      {userRole === 'peserta' && (
        <div className="px-6 mb-6">
          <h3 className="text-foreground mb-4">Badge & Pencapaian</h3>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div key={badge.name} className="bg-card rounded-2xl p-4 shadow-md text-center">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h4 className="text-foreground text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Menu */}
      <div className="px-6 mb-6">
        <h3 className="text-foreground mb-4">Pengaturan</h3>
        <div className="space-y-3">
          <button className="w-full bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-4" onClick={onEditProfile}>
            <div className="p-3 bg-primary/10 rounded-2xl">
              <Edit className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-foreground">Edit Profil</h4>
              <p className="text-sm text-muted-foreground">Ubah informasi profil Anda</p>
            </div>
          </button>

          <button className="w-full bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-4" onClick={onChangePassword}>
            <div className="p-3 bg-accent/30 rounded-2xl">
              <Lock className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-foreground">Ubah Password</h4>
              <p className="text-sm text-muted-foreground">Perbarui kata sandi Anda</p>
            </div>
          </button>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6">
        <Button 
          onClick={onLogout}
          variant="outline"
          className="w-full rounded-2xl h-12 border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Keluar dari Akun
        </Button>
      </div>
    </div>
  );
}