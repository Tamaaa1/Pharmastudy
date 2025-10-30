import { ArrowLeft, Star, MessageSquare, TrendingUp, Filter } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface FeedbackPageProps {
  onBack: () => void;
}

export function FeedbackPage({ onBack }: FeedbackPageProps) {
  const feedbackStats = [
    { rating: 5, count: 142, percentage: 72 },
    { rating: 4, count: 38, percentage: 19 },
    { rating: 3, count: 12, percentage: 6 },
    { rating: 2, count: 4, percentage: 2 },
    { rating: 1, count: 2, percentage: 1 },
  ];

  const feedback = [
    {
      id: 1,
      studentName: 'Ahmad Rizki',
      className: 'Teknik Presentasi Efektif',
      rating: 5,
      comment: 'Kelas yang sangat bermanfaat! Coach Sarah menjelaskan dengan sangat detail dan mudah dipahami. Saya langsung bisa praktikkan di kantor.',
      date: '2 hari lalu',
      replied: true,
    },
    {
      id: 2,
      studentName: 'Siti Nurhaliza',
      className: 'Leadership & Team Management',
      rating: 5,
      comment: 'Materinya bagus dan praktis. Langsung bisa diterapkan di pekerjaan. Terima kasih coach!',
      date: '5 hari lalu',
      replied: false,
    },
    {
      id: 3,
      studentName: 'Budi Santoso',
      className: 'Teknik Presentasi Efektif',
      rating: 4,
      comment: 'Overall bagus, cuma mungkin bisa ditambah lebih banyak contoh kasus nyata.',
      date: '1 minggu lalu',
      replied: true,
    },
  ];

  const averageRating = 4.8;

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
        <h2 className="text-primary-foreground mb-2">Feedback & Rating</h2>
        <p className="text-primary-foreground/80 text-sm">Tanggapan dari peserta kelas Anda</p>
      </div>

      {/* Average Rating Card */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-6 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-3xl mb-4">
            <Star className="w-10 h-10 text-accent fill-accent" />
          </div>
          <h1 className="text-foreground mb-2">{averageRating}</h1>
          <p className="text-muted-foreground mb-4">Rating Rata-rata</p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-6 h-6 ${
                  star <= Math.floor(averageRating) 
                    ? 'fill-accent text-accent' 
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Dari 198 ulasan</p>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-6 shadow-md">
          <h3 className="text-foreground mb-4">Distribusi Rating</h3>
          <div className="space-y-3">
            {feedbackStats.map((stat) => (
              <div key={stat.rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16">
                  <span className="text-sm text-foreground">{stat.rating}</span>
                  <Star className="w-4 h-4 text-accent fill-accent" />
                </div>
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-accent h-full rounded-full transition-all"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {stat.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="px-6 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground">Semua Feedback</h3>
          <button className="flex items-center gap-1 text-sm text-primary active:scale-95 transition-transform">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Feedback List */}
      <div className="px-6 space-y-4">
        {feedback.map((item) => (
          <div key={item.id} className="bg-card rounded-2xl p-4 shadow-md">
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {item.studentName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-foreground">{item.studentName}</h4>
                  {item.replied && (
                    <Badge variant="secondary" className="rounded-lg text-xs">
                      Dibalas
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{item.className}</p>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">• {item.date}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {item.comment}
            </p>

            {!item.replied && (
              <div className="space-y-2">
                <Textarea 
                  placeholder="Tulis balasan Anda..."
                  className="rounded-2xl text-sm min-h-20"
                />
                <Button 
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Balas
                </Button>
              </div>
            )}

            {item.replied && (
              <div className="bg-secondary/50 rounded-2xl p-3 mt-3 border-l-4 border-primary">
                <p className="text-xs text-primary mb-1">Balasan Anda:</p>
                <p className="text-sm text-foreground">
                  Terima kasih atas feedbacknya! Senang mendengar kelas ini bermanfaat untuk Anda.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
