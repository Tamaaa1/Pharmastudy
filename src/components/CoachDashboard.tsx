import { BookOpen, Users, MessageSquare, TrendingUp, Bell, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CoachDashboardProps {
  userName: string;
  onNavigateToManageClasses: () => void;
  onNavigateToStudents: () => void;
  onNavigateToFeedback: () => void;
  onNavigateToReports: () => void;
  onNavigateToNotifications: () => void;
}

export function CoachDashboard({ 
  userName, 
  onNavigateToManageClasses,
  onNavigateToStudents,
  onNavigateToFeedback,
  onNavigateToReports,
  onNavigateToNotifications
}: CoachDashboardProps) {
  const stats = [
    { label: 'Kelas Aktif', value: '12', icon: BookOpen, color: 'bg-primary' },
    { label: 'Total Peserta', value: '248', icon: Users, color: 'bg-accent' },
    { label: 'Rating', value: '4.8', icon: MessageSquare, color: 'bg-primary/80' },
    { label: 'Pendapatan', value: 'Rp 12M', icon: TrendingUp, color: 'bg-accent/80' },
  ];

  const menuItems = [
    { 
      id: 'manage', 
      title: 'Kelola Kelas', 
      icon: BookOpen, 
      description: 'Buat dan atur kelas Anda',
      onClick: onNavigateToManageClasses,
      color: 'bg-primary'
    },
    { 
      id: 'students', 
      title: 'Peserta Terdaftar', 
      icon: Users, 
      description: 'Lihat semua peserta kelas',
      onClick: onNavigateToStudents,
      color: 'bg-accent'
    },
    { 
      id: 'feedback', 
      title: 'Feedback & Rating', 
      icon: MessageSquare, 
      description: 'Tanggapan dari peserta',
      onClick: onNavigateToFeedback,
      color: 'bg-primary/80'
    },
    { 
      id: 'reports', 
      title: 'Laporan & Pendapatan', 
      icon: TrendingUp, 
      description: 'Statistik dan analisis',
      onClick: onNavigateToReports,
      color: 'bg-accent/80'
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-primary-foreground/80 text-sm">Selamat Datang,</p>
            <h2 className="text-primary-foreground">{userName}</h2>
            <Badge className="mt-2 bg-accent text-accent-foreground rounded-xl">
              Coach of The Month
            </Badge>
          </div>
          <button 
            onClick={onNavigateToNotifications}
            className="p-3 bg-primary-foreground/10 rounded-2xl hover:bg-primary-foreground/20 active:scale-95 transition-all relative"
          >
            <Bell className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
              <span className="text-xs text-accent-foreground">2</span>
            </div>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-primary-foreground/10 rounded-2xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-4 h-4 text-primary-foreground/80" />
                  <p className="text-xs text-primary-foreground/80">{stat.label}</p>
                </div>
                <p className="text-primary-foreground">{stat.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action */}
      <div className="p-6">
        <Button 
          onClick={onNavigateToManageClasses}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-14 shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Buat Kelas Baru
        </Button>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        <h3 className="text-foreground mb-4">Menu Utama</h3>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="w-full bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-4"
            >
              <div className={`${item.color} p-3 rounded-2xl text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}