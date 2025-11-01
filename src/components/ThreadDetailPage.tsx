// src/components/ThreadDetailPage.tsx

import { useState } from "react";
import { ArrowLeft, MessageSquare, ThumbsUp, Clock, Send, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner@2.0.3";

interface ThreadDetailPageProps {
  onBack: () => void;
  threadId: number; // Nanti bisa dipakai untuk fetch data
}

// Data mock-up untuk prototipe
const mockThread = {
  id: 1,
  author: 'Ahmad Rizki',
  authorLevel: 8,
  title: 'Tips Mengatasi Nervous Saat Presentasi',
  content: 'Saya sering nervous saat presentasi di depan banyak orang. Sudah coba tarik napas tapi kadang masih blank di panggung. Ada yang punya tips efektif lainnya? Terima kasih!',
  category: 'Public Speaking',
  repliesCount: 3,
  likes: 24,
  timeAgo: '2 jam lalu',
};

const mockReplies = [
  {
    id: 1,
    author: 'Dr. Sarah Johnson',
    authorRole: 'coach',
    timeAgo: '1 jam lalu',
    content: 'Itu hal yang wajar, Ahmad. Tips dari saya: 1) Kuasai materi 100%, 2) Latihan di depan cermin, 3) Fokus pada 3 poin utama yang ingin Anda sampaikan. Anda pasti bisa!',
  },
  {
    id: 2,
    author: 'Siti Nurhaliza',
    authorRole: 'peserta',
    authorLevel: 12,
    timeAgo: '45 menit lalu',
    content: 'Saya biasanya minum air putih hangat sebelum mulai, lumayan bikin rileks. Sama satu lagi, jangan lupa senyum di awal!',
  },
  {
    id: 3,
    author: 'Budi Santoso',
    authorRole: 'peserta',
    authorLevel: 5,
    timeAgo: '15 menit lalu',
    content: 'Pernah dengar "power pose"? Coba lakukan itu 2 menit sebelum naik panggung. Kedengarannya aneh tapi beneran ngefek ke percaya diri.',
  },
];

export function ThreadDetailPage({ onBack, threadId }: ThreadDetailPageProps) {
  const [newReply, setNewReply] = useState("");
  const [replies, setReplies] = useState(mockReplies);

  const handleSubmitReply = () => {
    if (!newReply.trim()) {
      toast.error("Balasan tidak boleh kosong");
      return;
    }

    // Simulasi penambahan balasan
    const newReplyData = {
      id: replies.length + 10,
      author: 'Anda (Ahmad Rizki)', // Asumsi user saat ini
      authorRole: 'peserta' as 'peserta',
      authorLevel: 8,
      timeAgo: 'Baru saja',
      content: newReply,
    };

    setReplies([...replies, newReplyData]);
    setNewReply("");
    toast.success("Balasan berhasil dikirim!");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg mb-6 sticky top-0 z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary-foreground mb-4 hover:gap-3 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Komunitas</span>
        </button>
        <h2 className="text-primary-foreground line-clamp-2">{mockThread.title}</h2>
      </div>

      <div className="px-6 space-y-4">
        {/* Konten Thread Utama */}
        <div className="bg-card rounded-2xl p-4 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {mockThread.author[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-foreground text-sm">{mockThread.author}</h4>
                <Badge variant="secondary" className="rounded-lg text-xs">
                  Lvl {mockThread.authorLevel}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{mockThread.timeAgo}</span>
              </div>
            </div>
            <Badge className="bg-accent/20 text-accent-foreground hover:bg-accent/30 rounded-xl text-xs flex-shrink-0">
              {mockThread.category}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {mockThread.content}
          </p>

          <div className="flex items-center gap-4 pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageSquare className="w-4 h-4" />
              <span>{replies.length} balasan</span>
            </div>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              <ThumbsUp className="w-4 h-4" />
              <span>{mockThread.likes} suka</span>
            </button>
          </div>
        </div>

        {/* Daftar Balasan */}
        <h3 className="text-foreground pt-4">Balasan ({replies.length})</h3>
        <div className="space-y-3">
          {replies.map((reply) => (
            <div key={reply.id} className="bg-card rounded-2xl p-4 shadow-md">
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className={reply.authorRole === 'coach' ? "bg-accent text-accent-foreground" : "bg-muted"}>
                    {reply.author[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-foreground text-sm">{reply.author}</h4>
                      {reply.authorRole === 'coach' ? (
                        <Badge className="bg-accent text-accent-foreground rounded-lg text-xs">
                          Coach
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="rounded-lg text-xs">
                          Lvl {reply.authorLevel}
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{reply.timeAgo}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reply.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Balasan */}
        <div className="bg-card rounded-2xl p-4 shadow-md sticky bottom-24 z-10">
          <h4 className="text-foreground mb-3">Tulis Balasan Anda</h4>
          <Textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Tulis balasan Anda di sini..."
            className="rounded-2xl min-h-24 mb-3"
          />
          <Button
            onClick={handleSubmitReply}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12"
          >
            <Send className="w-4 h-4 mr-2" />
            Kirim Balasan
          </Button>
        </div>
      </div>
    </div>
  );
}