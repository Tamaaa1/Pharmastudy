import { ArrowLeft, Bell, BookOpen, MessageSquare, Trophy, CheckCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface NotificationsPageProps {
  onBack: () => void;
  userRole: 'coach' | 'peserta';
}

export function NotificationsPage({ onBack, userRole }: NotificationsPageProps) {
  const notifications = userRole === 'coach' ? [
    {
      id: 1,
      type: 'student',
      icon: BookOpen,
      title: 'Pendaftaran Baru',
      message: '5 peserta baru mendaftar di kelas "Teknik Presentasi Efektif"',
      time: '5 menit lalu',
      read: false,
    },
    {
      id: 2,
      type: 'feedback',
      icon: MessageSquare,
      title: 'Feedback Baru',
      message: 'Ahmad Rizki memberikan rating 5★ untuk kelas Leadership',
      time: '1 jam lalu',
      read: false,
    },
    {
      id: 3,
      type: 'achievement',
      icon: Trophy,
      title: 'Pencapaian Baru!',
      message: 'Selamat! Anda mencapai 100 total peserta',
      time: '2 jam lalu',
      read: true,
    },
    {
      id: 4,
      type: 'class',
      icon: Bell,
      title: 'Kelas Akan Dimulai',
      message: 'Kelas "Public Speaking" akan dimulai dalam 30 menit',
      time: '3 jam lalu',
      read: true,
    },
  ] : [
    {
      id: 1,
      type: 'class',
      icon: BookOpen,
      title: 'Kelas Baru Tersedia',
      message: 'Kelas "Creative Problem Solving" sudah dapat diikuti',
      time: '10 menit lalu',
      read: false,
    },
    {
      id: 2,
      type: 'reminder',
      icon: Bell,
      title: 'Pengingat Kelas',
      message: 'Kelas "Teknik Presentasi" akan dimulai besok pukul 14:00',
      time: '2 jam lalu',
      read: false,
    },
    {
      id: 3,
      type: 'achievement',
      icon: Trophy,
      title: 'Badge Baru!',
      message: 'Anda mendapatkan badge "Quick Learner" 🎯',
      time: '1 hari lalu',
      read: true,
    },
    {
      id: 4,
      type: 'forum',
      icon: MessageSquare,
      title: 'Balasan Thread',
      message: 'Siti Nurhaliza membalas thread Anda di forum',
      time: '1 hari lalu',
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    // Mark all as read logic
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary-foreground mb-4 hover:gap-3 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-primary-foreground">Notifikasi</h2>
            <p className="text-primary-foreground/80 text-sm mt-1">
              {unreadCount} notifikasi belum dibaca
            </p>
          </div>
          {unreadCount > 0 && (
            <Badge className="bg-accent text-accent-foreground rounded-xl">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      {/* Mark All Read Button */}
      {unreadCount > 0 && (
        <div className="px-6 mb-6">
          <Button
            onClick={markAllAsRead}
            variant="outline"
            className="w-full rounded-2xl h-12 active:scale-95 transition-transform"
          >
            <CheckCheck className="w-5 h-5 mr-2" />
            Tandai Semua Sudah Dibaca
          </Button>
        </div>
      )}

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card rounded-2xl p-1 mb-6">
            <TabsTrigger value="all" className="rounded-xl">
              Semua ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="rounded-xl">
              Belum Dibaca ({unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {notifications.map((notif) => {
              const Icon = notif.icon;
              return (
                <button
                  key={notif.id}
                  className={`w-full text-left bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 ${
                    !notif.read ? 'border-2 border-primary' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`p-3 rounded-2xl flex-shrink-0 ${
                      notif.type === 'achievement' ? 'bg-accent/20 text-accent' :
                      notif.type === 'feedback' ? 'bg-primary/20 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-foreground">{notif.title}</h4>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {notifications.filter(n => !n.read).map((notif) => {
              const Icon = notif.icon;
              return (
                <button
                  key={notif.id}
                  className="w-full text-left bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 border-2 border-primary"
                >
                  <div className="flex gap-3">
                    <div className={`p-3 rounded-2xl flex-shrink-0 ${
                      notif.type === 'achievement' ? 'bg-accent/20 text-accent' :
                      notif.type === 'feedback' ? 'bg-primary/20 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-foreground">{notif.title}</h4>
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notif.message}
                      </p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                  </div>
                </button>
              );
            })}
            {unreadCount === 0 && (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Tidak ada notifikasi baru</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
