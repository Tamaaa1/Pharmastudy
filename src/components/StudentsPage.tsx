import { ArrowLeft, Search, Mail, Award, TrendingUp } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface StudentsPageProps {
  onBack: () => void;
}

export function StudentsPage({ onBack }: StudentsPageProps) {
  const students = [
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi.santoso@farmasi.com",
      level: 10,
      coursesEnrolled: 5,
      coursesCompleted: 4,
      progress: 90,
      status: "active",
      specialization: "Farmakologi",
    },
    {
      id: 2,
      name: "Rina Apoteker",
      email: "rina.apoteker@farmasi.com",
      level: 15,
      coursesEnrolled: 8,
      coursesCompleted: 7,
      progress: 95,
      status: "active",
      specialization: "Farmasi Klinis",
    },
    {
      id: 3,
      name: "Ahmad Mahasiswa",
      email: "ahmad.mhs@farmasi.com",
      level: 6,
      coursesEnrolled: 3,
      coursesCompleted: 2,
      progress: 70,
      status: "active",
      specialization: "Farmasetika",
    },
    {
      id: 4,
      name: "Dewi Peneliti",
      email: "dewi.peneliti@farmasi.com",
      level: 18,
      coursesEnrolled: 10,
      coursesCompleted: 9,
      progress: 99,
      status: "graduate",
      specialization: "Kimia Medisinal",
    },
    {
      id: 5,
      name: "Joko Dosen",
      email: "joko.dosen@farmasi.com",
      level: 20,
      coursesEnrolled: 12,
      coursesCompleted: 12,
      progress: 100,
      status: "graduate",
      specialization: "Farmakognosi",
    },
  ];

  const stats = [
    { label: "Total Peserta Farmasi", value: "350", icon: TrendingUp },
    { label: "Aktif Bulan Ini", value: "280", icon: Award },
    { label: "Lulus Kelas Farmasi", value: "200", icon: Award },
  ];

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
        <h2 className="text-primary-foreground mb-2">Daftar Peserta Farmasi</h2>
        <p className="text-primary-foreground/80 text-sm">
          Kelola dan pantau progres mahasiswa/praktisi farmasi
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-3 shadow-md text-center"
              >
                <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-xl mb-2">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground text-sm mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cari peserta farmasi berdasarkan nama atau spesialisasi..."
            className="pl-12 rounded-2xl h-12 bg-card shadow-md"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card rounded-2xl p-1 mb-6">
            <TabsTrigger value="all" className="rounded-xl">
              Semua Peserta
            </TabsTrigger>
            <TabsTrigger value="active" className="rounded-xl">
              Peserta Aktif
            </TabsTrigger>
            <TabsTrigger value="graduate" className="rounded-xl">
              Lulusan Terbaik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-card rounded-2xl p-4 shadow-md"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {student.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-foreground">{student.name}</h4>
                      <Badge variant="secondary" className="rounded-lg text-xs">
                        Lvl {student.level}
                      </Badge>
                      <Badge className="bg-blue-500/10 text-blue-500 rounded-xl text-xs">
                        {student.specialization}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Mail className="w-3 h-3" />
                      <span>{student.email}</span>
                    </div>
                  </div>
                  {student.status === "graduate" && (
                    <Badge className="bg-accent text-accent-foreground rounded-xl">
                      Lulus
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progress Keseluruhan
                    </span>
                    <span className="text-foreground">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="h-2" />
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>{student.coursesEnrolled} kelas farmasi diikuti</span>
                    <span>
                      {student.coursesCompleted} kelas farmasi selesai
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-3">
            {students
              .filter((s) => s.status === "active")
              .map((student) => (
                <div
                  key={student.id}
                  className="bg-card rounded-2xl p-4 shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {student.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{student.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {student.email}
                      </p>
                      <Badge className="bg-blue-500/10 text-blue-500 rounded-xl text-xs">
                        {student.specialization}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="graduate" className="space-y-3">
            {students
              .filter((s) => s.status === "graduate")
              .map((student) => (
                <div
                  key={student.id}
                  className="bg-card rounded-2xl p-4 shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {student.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-foreground mb-1">{student.name}</h4>
                      <p className="text-xs text-muted-foreground mb-1">
                        {student.email}
                      </p>
                      <Badge className="bg-blue-500/10 text-blue-500 rounded-xl text-xs">
                        {student.specialization}
                      </Badge>
                    </div>
                    <Badge className="bg-accent text-accent-foreground rounded-xl">
                      Lulus
                    </Badge>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
