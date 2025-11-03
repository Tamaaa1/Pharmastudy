import { ArrowLeft, Plus, MessageSquare, ThumbsUp, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface CommunityPageProps {
  onBack: () => void;
  onCreateThread: () => void;
}

export function CommunityPage({ onBack, onCreateThread }: CommunityPageProps) {
  const threads = [
    {
      id: 1,
      author: "Farmasis Muda",
      authorLevel: 8,
      title: "Diskusi: Mekanisme Aksi Antibiotik",
      content:
        "Halo teman-teman, ada yang bisa jelaskan lebih detail tentang mekanisme aksi antibiotik golongan Beta-Laktam?",
      category: "Farmakologi",
      replies: 15,
      likes: 30,
      timeAgo: "3 jam lalu",
    },
    {
      id: 2,
      author: "Mahasiswa Farmasi",
      authorLevel: 12,
      title: "Pertanyaan: Cara Identifikasi Senyawa Aktif Tanaman",
      content:
        "Saya sedang meneliti tanaman obat. Ada tips atau metode standar untuk mengidentifikasi senyawa aktifnya?",
      category: "Farmakognosi",
      replies: 10,
      likes: 22,
      timeAgo: "6 jam lalu",
    },
    {
      id: 3,
      author: "Apoteker Klinik",
      authorLevel: 15,
      title: "Studi Kasus: Interaksi Obat pada Pasien Geriatri",
      content:
        "Mari berdiskusi tentang studi kasus pasien geriatri dengan polifarmasi. Bagaimana manajemen interaksi obatnya?",
      category: "Farmasi Klinis",
      replies: 20,
      likes: 45,
      timeAgo: "1 hari lalu",
    },
    {
      id: 4,
      author: "Rina Kimia",
      authorLevel: 7,
      title: "Tips Mempelajari Kimia Medisinal",
      content:
        "Kimia medisinal cukup menantang. Ada tips dari senior untuk mempermudah pemahaman?",
      category: "Kimia Farmasi",
      replies: 8,
      likes: 15,
      timeAgo: "1 hari lalu",
    },
    {
      id: 5,
      author: "Budi Farmasetika",
      authorLevel: 9,
      title: "Prosedur Pembuatan Sediaan Suspensi",
      content:
        "Ada yang punya pengalaman atau referensi tentang prosedur standar pembuatan sediaan suspensi di lab?",
      category: "Farmasetika",
      replies: 12,
      likes: 28,
      timeAgo: "2 hari lalu",
    },
  ];

  const categories = [
    { name: "Semua", count: 200 },
    { name: "Farmakologi", count: 55 },
    { name: "Farmasetika", count: 48 },
    { name: "Kimia Farmasi", count: 40 },
    { name: "Farmakognosi", count: 35 },
    { name: "Farmasi Klinis", count: 22 },
    { name: "Regulasi Obat", count: 18 },
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
        <h2 className="text-primary-foreground mb-2">
          Forum Komunitas Farmasi
        </h2>
        <p className="text-primary-foreground/80 text-sm">
          Berbagi pengetahuan, pengalaman, dan berdiskusi seputar farmasi
        </p>
      </div>

      {/* Create Thread Button */}
      <div className="px-6 mb-6">
        <Button
          onClick={onCreateThread}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-12 shadow-md active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5 mr-2" />
          Buat Diskusi Baru
        </Button>
      </div>

      {/* Category Pills */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.name}
              className="flex-shrink-0 px-4 py-2 bg-card rounded-2xl shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <span className="text-foreground text-sm">{category.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                ({category.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Threads List */}
      <div className="px-6">
        <h3 className="text-foreground mb-4">Diskusi Terbaru</h3>
        <div className="space-y-3">
          {threads.map((thread) => (
            <button
              key={thread.id}
              className="w-full bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all active:scale-95 text-left"
            >
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {thread.author[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-foreground text-sm">{thread.author}</h4>
                    <Badge variant="secondary" className="rounded-lg text-xs">
                      Lvl {thread.authorLevel}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{thread.timeAgo}</span>
                  </div>
                </div>
              </div>

              {/* Thread Content */}
              <div className="mb-3">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-foreground">{thread.title}</h3>
                  <Badge className="bg-accent/20 text-accent-foreground hover:bg-accent/30 rounded-xl text-xs flex-shrink-0">
                    {thread.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {thread.content}
                </p>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>{thread.replies} balasan</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{thread.likes} suka</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Load More */}
        <Button
          variant="outline"
          className="w-full mt-6 rounded-2xl h-12 active:scale-95 transition-transform"
        >
          Muat Lebih Banyak
        </Button>
      </div>
    </div>
  );
}
