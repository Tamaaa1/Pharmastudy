import {
  Trophy,
  Star,
  Book,
  MessageSquare,
  Search,
  TrendingUp,
  Brain,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface StudentDashboardProps {
  userName: string;
  onNavigateToClassList: () => void;
  onNavigateToCommunity: () => void;
  onNavigateToQuiz: () => void;
  onNavigateToMyClasses: () => void;
  onNavigateToBadgeList: () => void;
}

export function StudentDashboard({ 
  userName, 
  onNavigateToClassList, 
  onNavigateToCommunity, 
  onNavigateToQuiz,
  onNavigateToMyClasses,
  onNavigateToBadgeList
}: StudentDashboardProps) {
  
  const userStats = {
    points: 1500, // Adjusted points for pharmacy context
    level: 9, // Adjusted level
    coursesCompleted: 18, // Adjusted completed courses
    currentStreak: 10, // Adjusted streak
  };

  const badges = [
    { name: "Farmasis Pemula", icon: "🌱", earned: true },
    { name: "Ahli Farmakologi", icon: "🔬", earned: true },
    { name: "Master Formulasi", icon: "🧪", earned: true },
    { name: "Peneliti Obat", icon: "🧬", earned: false },
  ];

  const learningPackages = [
    {
      id: 1,
      name: "Paket Basic Farmasi",
      price: "Rp.30.000",
      features: [
        "Akses materi dasar farmasi (teks & video)",
        "1 kelas live sesi tanya jawab bulanan",
        "Durasi akses 1 bulan",
        "Pengajar: Asisten Dosen/Mahasiswa Senior",
      ],
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Paket Standard Farmasi",
      price: "Rp.60.000",
      features: [
        "Akses penuh materi farmasi (teks, video, kuis)",
        "3 kelas live workshop/studi kasus",
        "Durasi akses 3 bulan",
        "Pengajar: Apoteker/Dosen Muda",
      ],
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Paket Premium Farmasi",
      price: "Rp.100.000",
      features: [
        "Akses penuh semua materi & fitur",
        "5 kelas live interaktif (termasuk konsultasi privat)",
        "Durasi akses 6 bulan",
        "Pengajar: Profesor/Pakar Farmasi",
      ],
      color: "bg-purple-500",
    },
  ];

  const enrolledClasses = [
    {
      id: 1,
      title: "Farmakologi Dasar: Mekanisme Aksi Obat",
      coach: "Prof. Dr. apt. Budi Santoso",
      progress: 80,
      image:
        "https://images.unsplash.com/photo-1628343719114-1e14909a349b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVnfHNlYXJjaHwxfHwwfHx8MTcyMDczOTczM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      nextSession: "Besok, 10:00 WIB",
    },
    {
      id: 2,
      title: "Farmasetika: Formulasi Sediaan Tablet",
      coach: "Dr. apt. Siti Aminah",
      progress: 55,
      image:
        "https://images.unsplash.com/photo-1587854692137-8ffb09fa81d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtYWN5JTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3MjA3NDA2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      nextSession: "3 hari lagi, 14:00 WIB",
    },
    {
      id: 3,
      title: "Kimia Medisinal: Pengenalan Desain Obat",
      coach: "Prof. Ir. Joko Susanto",
      progress: 30,
      image:
        "https://images.unsplash.com/photo-1616763355548-111812741d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVnJTIwc3RydWN0dXJlJTIwY2hlbWlzdHJ5fGVufDF8fHx8MTcyMDc0MDc3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      nextSession: "Minggu depan",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <h2 className="text-primary-foreground mb-1">
          Selamat Datang, Mahasiswa Farmasi
        </h2>
        <h1 className="text-primary-foreground mb-6">{userName}</h1>

        {/* Points & Level Card */}
        <div className="bg-primary-foreground/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground">
                Level Farmasi {userStats.level}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-primary-foreground">
                {userStats.points} Poin Keilmuan
              </span>
            </div>
          </div>
          <Progress
            value={(userStats.points % 1000) / 10}
            className="h-2 bg-primary-foreground/20"
          />{" "}
          {/* Adjusted progress logic */}
          <p className="text-xs text-primary-foreground/70 mt-2">
            {1000 - (userStats.points % 1000)} poin lagi ke Level Farmasi{" "}
            {userStats.level + 1}
          </p>
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
            <span>Forum Diskusi Farmasi</span>
          </Button>
          <Button
            onClick={onNavigateToQuiz}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-24 flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
          >
            <Brain className="w-6 h-6" />
            <span>Uji Pemahaman Farmasi</span>
          </Button>
          <Button
            onClick={onNavigateToPackages}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-24 flex flex-col items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
          >
            <Book className="w-6 h-6" />
            <span>Upgrade Paket Belajar</span>
          </Button>
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Badge Saya</h3>
          <button onClick={onNavigateToBadgeList} className="text-primary text-sm">Lihat Semua</button>
          <h3 className="text-foreground">Badge Keilmuan Farmasi</h3>
          <button className="text-primary text-sm">Lihat Semua Badge</button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className={`flex-shrink-0 bg-card rounded-2xl p-4 shadow-md w-28 text-center ${
                !badge.earned && "opacity-40 grayscale"
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
            <div
              key={course.id}
              className="bg-card rounded-2xl shadow-md overflow-hidden active:scale-95 transition-transform cursor-pointer"
            >
              <div className="flex gap-4 p-4">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-foreground mb-1 truncate">
                    {course.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {course.coach}
                  </p>
                  <div className="space-y-1">
                    <Progress value={course.progress} className="h-1.5" />
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {course.progress}% Selesai
                      </span>
                      <span className="text-primary">
                        Sesi Selanjutnya: {course.nextSession}
                      </span>
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
              <p className="text-xs text-muted-foreground mt-1">
                Kelas Farmasi Selesai
              </p>
            </div>
            <div className="text-center px-2">
              <p className="text-primary">{userStats.currentStreak}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Hari Belajar Beruntun
              </p>
            </div>
            <div className="text-center px-2">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <p className="text-primary">4.9</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Rating Kelas Rata-rata
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
