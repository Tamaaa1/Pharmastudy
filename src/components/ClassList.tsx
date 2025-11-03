import { useState } from "react";
import { Search, Star, Clock, Users, ArrowLeft, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ClassListProps {
  onBack: () => void;
  onClassClick: (classId: number) => void;
  userPackage?: "free" | "premium";
}

export function ClassList({
  onBack,
  onClassClick,
  userPackage,
}: ClassListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "gratis" | "premium" | "video-kelas"
  >("all");

  const classes = [
    {
      id: 1,
      title: "Farmakologi Umum: Prinsip Dasar Obat",
      coach: "Prof. Dr. apt. Budi Santoso",
      duration: "30 menit",
      rating: 4.9,
      students: 280,
      price: "Premium",
      image:
        "https://images.unsplash.com/photo-1628343719114-1e14909a349b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVnfHNlYXJjaHwxfHwwfHx8MTcyMDczOTczM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Farmakologi",
      type: "video-materi",
    },
    {
      id: 2,
      title: "Farmasetika: Formulasi Sediaan Tablet",
      coach: "Dr. apt. Siti Aminah",
      duration: "35 menit",
      rating: 4.8,
      students: 210,
      price: "Premium",
      image:
        "https://images.unsplash.com/photo-1587854692137-8ffb09fa81d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtYWN5JTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3MjA3NDA2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Farmasetika",
      type: "video-materi",
    },
    {
      id: 3,
      title: "Kimia Medisinal: Dasar Desain Obat",
      coach: "Prof. Ir. Joko Susanto",
      duration: "25 menit",
      rating: 4.7,
      students: 350,
      price: "Gratis",
      image:
        "https://images.unsplash.com/photo-1616763355548-111812741d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVnJTIwc3RydWN0dXJlJTIwY2hlbWlzdHJ5fGVufDF8fHx8MTcyMDc0MDc3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Kimia Farmasi",
      type: "materi",
    },
    {
      id: 4,
      title: "Farmakognosi: Identifikasi Tanaman Obat",
      coach: "Dr. apt. Lia Agustina",
      duration: "28 menit",
      rating: 4.9,
      students: 180,
      price: "Gratis",
      image:
        "https://images.unsplash.com/photo-1599026402241-15545f448e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJibWVkJTIwdGhlcmFweXxlbnwxfHx8fDE3MjA3NDEwNDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Farmakognosi",
      type: "materi",
    },
    {
      id: 5,
      title: "Live Session: Studi Kasus Farmasi Klinis",
      coach: "Prof. Dr. apt. Budi Santoso",
      duration: "60 menit",
      rating: 4.9,
      students: 110,
      price: "Live",
      image:
        "https://images.unsplash.com/photo-1587370335205-067677d2489c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwcHJvZmVzc2lvbmFsc3xlbnwxfHx8fDE3MjA3NDEwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Farmasi Klinis",
      type: "video-kelas-live",
      isLive: true,
    },
    {
      id: 6,
      title: "Interactive Workshop: Biologi Farmasi",
      coach: "Dr. apt. Siti Aminah",
      duration: "75 menit",
      rating: 4.8,
      students: 85,
      price: "Live",
      image:
        "https://images.unsplash.com/photo-1596707325257-ec936357502c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaW9sb2d5JTIwc2NpZW5jZXxlbnwxfHx8fDE3MjA3NDExOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Biologi Farmasi",
      type: "video-kelas-live",
      isLive: true,
    },
    {
      id: 7,
      title: "Regulasi Farmasi & Kebijakan Obat",
      coach: "Lisa Haryati, M.H.Kes",
      duration: "40 menit",
      rating: 4.7,
      students: 150,
      price: "Premium",
      image:
        "https://images.unsplash.com/photo-1585443560696-fa3d96924376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBtZWRpY2luZXxlbnwxfHx8fDE3MjA3NDE1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Kefarmasian",
      type: "video-materi",
    },
    {
      id: 8,
      title: "Inovasi Teknologi Sediaan Obat",
      coach: "Dr. James Anwar",
      duration: "55 menit",
      rating: 4.9,
      students: 95,
      price: "Live",
      image:
        "https://images.unsplash.com/photo-1584820980665-c7e6c51884c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGxhYnxlbnwxfHx8fDE3MjA3NDE2Mzkw&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Teknologi Farmasi",
      type: "video-kelas-live",
      isLive: true,
    },
  ];

  const filteredClasses = classes.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "gratis") {
      // Show only "materi" classes (text-based content), but limit based on package
      if (userPackage === "free") {
        // Free users: show only 2 materi classes per category
        const categoryClasses = classes.filter(
          (cls) => cls.category === c.category && cls.type === "materi",
        );
        const categoryIndex = categoryClasses.findIndex(
          (cls) => cls.id === c.id,
        );
        return matchesSearch && c.type === "materi" && categoryIndex < 2;
      } else {
        // Premium users: show all materi classes
        return matchesSearch && c.type === "materi";
      }
    }
    if (activeFilter === "premium") {
      // Show only "video-materi" classes (recorded video content), but limit based on package
      if (userPackage === "free") {
        // Free users: show only 2 video-materi classes per category
        const categoryClasses = classes.filter(
          (cls) => cls.category === c.category && cls.type === "video-materi",
        );
        const categoryIndex = categoryClasses.findIndex(
          (cls) => cls.id === c.id,
        );
        return matchesSearch && c.type === "video-materi" && categoryIndex < 2;
      } else {
        // Premium users: show all video-materi classes
        return matchesSearch && c.type === "video-materi";
      }
    }
    if (activeFilter === "video-kelas") {
      // Video Kelas Live - only for premium users
      if (userPackage === "free") {
        // Free users: no access to video kelas live
        return false;
      } else {
        // Premium users: show all video-kelas-live classes
        return matchesSearch && c.type === "video-kelas-live";
      }
    }
    return matchesSearch;
  });

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
        <h2 className="text-primary-foreground mb-2">Jelajahi Kelas</h2>
        <p className="text-primary-foreground/80 text-sm">
          Temukan kelas yang sesuai untuk Anda
        </p>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cari kelas, coach, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 rounded-2xl h-12 bg-card shadow-md"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-6">
        <Tabs
          value={activeFilter}
          onValueChange={(value: string) => {
            if (value === "video-kelas" && userPackage === "free") {
              // Prevent free users from selecting video-kelas
              return;
            }
            setActiveFilter(
              value as "all" | "gratis" | "premium" | "video-kelas",
            );
          }}
          className="w-full"
        >
          <div className="overflow-x-auto">
            <TabsList className="inline-flex w-max bg-card rounded-2xl p-1 h-auto gap-1">
              <TabsTrigger
                value="all"
                className="rounded-xl whitespace-nowrap px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="gratis"
                className="rounded-xl whitespace-nowrap px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Materi
              </TabsTrigger>
              <TabsTrigger
                value="premium"
                className="rounded-xl whitespace-nowrap px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                Video Materi
              </TabsTrigger>
              <TabsTrigger
                value="video-kelas"
                className={`rounded-xl whitespace-nowrap px-4 py-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground ${userPackage === "free" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Video Kelas Live
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Classes Grid */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">
            {filteredClasses.length} Kelas Tersedia
          </h3>
          <button className="flex items-center gap-1 text-sm text-primary active:scale-95 transition-transform">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="space-y-4">
          {filteredClasses.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => onClassClick(classItem.id)}
              className="w-full bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all active:scale-95 text-left"
            >
              <div className="relative">
                <ImageWithFallback
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    className={`${
                      classItem.price === "Premium"
                        ? "bg-accent text-accent-foreground"
                        : classItem.price === "Live"
                          ? "bg-red-500 text-white"
                          : "bg-primary text-primary-foreground"
                    } rounded-xl shadow-md`}
                  >
                    {classItem.price}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-card/90 text-foreground rounded-xl backdrop-blur-sm">
                    {classItem.category}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-foreground mb-2">{classItem.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {classItem.coach}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{classItem.students}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-foreground">{classItem.rating}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl">
                  Lihat Detail
                </Button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
