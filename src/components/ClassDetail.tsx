import { ArrowLeft, Calendar, MapPin, Users, Star, Play, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ClassDetailProps {
  classId: number;
  userRole: "coach" | "peserta";
  onBack: () => void;
  onGoToCheckout: (classId: number) => void;
  onPlayLesson: (lessonId: number) => void;
  isEnrolled: boolean;
}

export function ClassDetail({ classId, userRole, onBack, onGoToCheckout, onPlayLesson, isEnrolled }: ClassDetailProps) {
  const classData = {
    id: classId,
    title: "Farmakologi Dasar: Mekanisme Aksi Obat",
    coach: "Prof. Dr. apt. Budi Santoso",
    topic: "Farmakologi",
    schedule: "28 Oktober 2025, 10:00 WIB",
    method: "Online",
    quota: 50,
    enrolled: 35,
    description:
      "Dalam kelas ini, Anda akan menyelami dunia farmakologi dasar, memahami prinsip-prinsip mekanisme aksi obat, farmakokinetik, dan farmakodinamik. Materi mencakup interaksi obat-reseptor, jalur metabolisme, serta efek terapeutik dan toksik obat. Kelas ini dirancang untuk memberikan fondasi kuat bagi mahasiswa farmasi.",
    image:
      "https://images.unsplash.com/photo-1628343719114-1e14909a349b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVnfHNlYXJjaHwxfHwwfHx8MTcyMDczOTczM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
  };

  const allMaterials = [
    {
      id: 1,
      title: "Pengantar Farmakologi",
      duration: "10 menit",
      type: "materi",
      completed: true,
    },
    {
      id: 2,
      title: "Konsep Farmakokinetik",
      duration: "15 menit",
      type: "materi",
      completed: true,
    },
    {
      id: 3,
      title: "Konsep Farmakodinamik",
      duration: "12 menit",
      type: "materi",
      completed: false,
    },
    {
      id: 4,
      title: "Interaksi Obat-Reseptor",
      duration: "8 menit",
      type: "materi",
      completed: false,
    },
    {
      id: 5,
      title: "Video Materi: Jalur Absorpsi Obat",
      duration: "20 menit",
      type: "video-materi",
      completed: false,
    },
    {
      id: 6,
      title: "Video Materi: Metabolisme dan Ekskresi",
      duration: "18 menit",
      type: "video-materi",
      completed: false,
    },
    {
      id: 7,
      title: "Video Materi: Agonis dan Antagonis",
      duration: "15 menit",
      type: "video-materi",
      completed: false,
    },
    {
      id: 8,
      title: "Video Materi: Efek Samping Obat",
      duration: "10 menit",
      type: "video-materi",
      completed: false,
    },
    {
      id: 9,
      title: "Video Kelas Live: Studi Kasus Farmakologi",
      duration: "60 menit",
      type: "video-kelas",
      completed: false,
    },
    {
      id: 10,
      title: "Video Kelas Live: Diskusi Obat-Obatan Umum",
      duration: "40 menit",
      type: "video-kelas",
      completed: false,
    },
  ];

  // Filter materials based on user package
  const materials =
    userPackage === "free"
      ? allMaterials
          .filter((m) => m.type === "materi")
          .slice(0, 2)
          .concat(
            allMaterials.filter((m) => m.type === "video-materi").slice(0, 2),
          )
      : allMaterials;

  const feedback = [
    {
      id: 1,
      name: "Rina Apoteker",
      avatar: "",
      rating: 5,
      comment:
        "Penjelasan Prof. Budi sangat mendalam. Membantu saya memahami konsep farmakologi yang kompleks!",
      date: "3 hari lalu",
    },
    {
      id: 2,
      name: "Bima Farmasis",
      avatar: "",
      rating: 5,
      comment:
        "Materi sangat relevan dengan kurikulum perkuliahan. Contoh kasusnya juga aplikatif.",
      date: "1 minggu lalu",
    },
    {
      id: 3,
      name: "Dewi Mahasiswa",
      avatar: "",
      rating: 4,
      comment:
        "Awalnya sulit, tapi setelah mengikuti kelas ini jadi lebih mudah memahami mekanisme kerja obat.",
      date: "1 hari lalu",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Image */}
      <div className="relative">
        <ImageWithFallback
          src={classData.image}
          alt={classData.title}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-3 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg hover:bg-card transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Class Info */}
      <div className="px-6 py-6">
        <div className="bg-card rounded-2xl p-6 shadow-lg -mt-12 relative z-10">
          <h2 className="text-foreground mb-2">{classData.title}</h2>
          <p className="text-muted-foreground mb-4">oleh {classData.coach}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-foreground">{classData.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {classData.enrolled} peserta
            </span>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span>{classData.schedule}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span>{classData.method}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span>
                {classData.enrolled} / {classData.quota} peserta terdaftar
              </span>
            </div>
          </div>

          {userRole === "coach" ? (
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 shadow-md">
              <Play className="w-5 h-5 mr-2" />
              Mulai Kelas
            </Button>
          ) : isEnrolled ? (
            <Button 
              onClick={() => onPlayLesson(materials[0].id)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 shadow-md"
            >
              <Play className="w-5 h-5 mr-2" />
              Lanjutkan Belajar
            </Button>
          ) : (
            <Button 
              onClick={() => onGoToCheckout(classId)}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-12 shadow-md"
            >
              Daftar Kelas (Rp 150.000)
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="materi" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-card rounded-2xl p-1 mb-6">
            <TabsTrigger value="materi" className="rounded-xl text-xs">
              Materi
            </TabsTrigger>
            <TabsTrigger value="diskusi" className="rounded-xl text-xs">
              Diskusi
            </TabsTrigger>
            <TabsTrigger value="tugas" className="rounded-xl text-xs">
              Tugas
            </TabsTrigger>
            <TabsTrigger value="feedback" className="rounded-xl text-xs">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="materi" className="space-y-3">
            <h3 className="text-foreground mb-4">Materi Pembelajaran</h3>
            {materials.map((material) => (
              <button
              <div
                key={material.id}
                onClick={() => onPlayLesson(material.id)}
                disabled={!isEnrolled}
                className="w-full bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      material.completed
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Play className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground text-sm mb-1">
                      {material.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {material.duration}
                    </p>
                  </div>
                </div>
                {/* --- AKHIR PERBAIKAN VISUAL --- */}
              </button>
            ))}
          </TabsContent>

          <TabsContent value="diskusi" className="space-y-3">
            <div className="bg-card rounded-2xl p-6 shadow-md text-center">
              <p className="text-muted-foreground mb-4">Belum ada diskusi</p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl">
                Mulai Diskusi
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tugas" className="space-y-3">
            <div className="bg-card rounded-2xl p-6 shadow-md text-center">
              <p className="text-muted-foreground mb-4">
                Belum ada tugas tersedia
              </p>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <div className="bg-card rounded-2xl p-6 shadow-md">
              <h4 className="text-foreground mb-4">Berikan Rating & Komentar</h4>
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="p-2 hover:scale-110 transition-transform active:scale-95"
                  >
                    <Star className="w-6 h-6 text-accent/30 hover:text-accent" />
                  </button>
                ))}
              </div>
              <Textarea
                placeholder="Tuliskan pengalaman Anda tentang kelas ini..."
                className="rounded-2xl mb-4 min-h-24"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl">
                Kirim Feedback
              </Button>
            </div>

            <h3 className="text-foreground mb-4">Feedback dari Peserta</h3>
            {feedback.map((item) => (
              <div key={item.id} className="bg-card rounded-2xl p-4 shadow-md">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {item.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-foreground text-sm">{item.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-1">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-accent text-accent"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{item.comment}</p>
                {userRole === "coach" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 rounded-xl"
                  >
                    Balas
                  </Button>
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Description Section */}
      <div className="px-6 mt-6">
        <div className="bg-card rounded-2xl p-6 shadow-md">
          <h3 className="text-foreground mb-3">Tentang Kelas</h3>
          <p className="text-muted-foreground leading-relaxed">
            {classData.description}
          </p>
        </div>
      </div>
    </div>
  );
}