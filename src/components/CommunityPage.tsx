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
      author: 'Ahmad Rizki',
      authorLevel: 8,
      title: 'Tips Mengatasi Nervous Saat Presentasi',
      content: 'Saya sering nervous saat presentasi di depan banyak orang. Ada yang punya tips efektif?',
      category: 'Public Speaking',
      replies: 12,
      likes: 24,
      timeAgo: '2 jam lalu',
    },
    {
      id: 2,
      author: 'Siti Nurhaliza',
      authorLevel: 12,
      title: 'Sharing: Teknik Pomodoro untuk Produktivitas',
      content: 'Mau share pengalaman menggunakan teknik Pomodoro. Sangat membantu meningkatkan fokus!',
      category: 'Productivity',
      replies: 8,
      likes: 18,
      timeAgo: '5 jam lalu',
    },
    {
      id: 3,
      author: 'Budi Santoso',
      authorLevel: 5,
      title: 'Rekomendasi Buku Leadership',
      content: 'Ada yang bisa rekomendasikan buku tentang leadership yang bagus untuk pemula?',
      category: 'Leadership',
      replies: 15,
      likes: 32,
      timeAgo: '1 hari lalu',
    },
  ];

  const categories = [
    { name: 'Semua', count: 156 },
    { name: 'Public Speaking', count: 45 },
    { name: 'Leadership', count: 38 },
    { name: 'Productivity', count: 42 },
    { name: 'Tips & Trik', count: 31 },
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
        <h2 className="text-primary-foreground mb-2">Forum Komunitas</h2>
        <p className="text-primary-foreground/80 text-sm">Berbagi pengalaman dan belajar bersama</p>
      </div>

      {/* Create Thread Button */}
      <div className="px-6 mb-6">
        <Button
          onClick={onCreateThread}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-12 shadow-md active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5 mr-2" />
          Buat Thread Baru
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
              <span className="ml-2 text-xs text-muted-foreground">({category.count})</span>
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
                <p className="text-sm text-muted-foreground line-clamp-2">{thread.content}</p>
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