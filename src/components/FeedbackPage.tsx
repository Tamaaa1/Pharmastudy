import {
  ArrowLeft,
  Star,
  MessageSquare,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";

interface FeedbackPageProps {
  onBack: () => void;
}

export function FeedbackPage({ onBack }: FeedbackPageProps) {
  const feedbackStats = [
    { rating: 5, count: 180, percentage: 75 },
    { rating: 4, count: 48, percentage: 20 },
    { rating: 3, count: 8, percentage: 3 },
    { rating: 2, count: 2, percentage: 1 },
    { rating: 1, count: 2, percentage: 1 },
  ];

  const feedback = [
    {
      id: 1,
      studentName: "Budi Farmasi",
      className: "Farmakologi Dasar: Mekanisme Aksi Obat",
      rating: 5,
      comment:
        "Penjelasan Prof. Budi sangat jelas dan mudah dipahami. Konsep farmakologi jadi tidak membingungkan lagi!",
      date: "3 hari lalu",
      replied: true,
    },
    {
      id: 2,
      studentName: "Siti Apoteker",
      className: "Farmasetika: Formulasi Sediaan Solid",
      rating: 5,
      comment:
        "Materi formulasi sediaan tablet sangat aplikatif. Langsung bisa diterapkan saat praktikum. Terima kasih Dr. Siti!",
      date: "1 minggu lalu",
      replied: false,
    },
    {
      id: 3,
      studentName: "Rina Mahasiswa",
      className: "Kimia Medisinal: Pengenalan Desain Obat",
      rating: 4,
      comment:
        "Kelasnya informatif, hanya saja beberapa bagian perlu contoh yang lebih beragam dari obat-obatan baru.",
      date: "5 hari lalu",
      replied: true,
    },
    {
      id: 4,
      studentName: "Ahmad Peneliti",
      className: "Farmakognosi: Identifikasi Tumbuhan Obat",
      rating: 5,
      comment:
        "Sangat terbantu dalam memahami metode identifikasi. Video demonya sangat membantu!",
      date: "2 minggu lalu",
      replied: false,
    },
  ];

  const averageRating = 4.8; // Updated based on new stats

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
          Feedback & Rating Kelas Farmasi
        </h2>
        <p className="text-primary-foreground/80 text-sm">
          Tanggapan dari peserta kelas farmasi Anda
        </p>
      </div>

      {/* Average Rating Card */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-6 shadow-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/20 rounded-3xl mb-4">
            <Star className="w-10 h-10 text-accent fill-accent" />
          </div>
          <h1 className="text-foreground mb-2">{averageRating}</h1>
          <p className="text-muted-foreground mb-4">
            Rating Rata-rata Kelas Farmasi
          </p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.floor(averageRating)
                    ? "fill-accent text-accent"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Dari 240 ulasan</p>{" "}
          {/* Updated total reviews */}
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-6 shadow-md">
          <h3 className="text-foreground mb-4">
            Distribusi Rating Kelas Farmasi
          </h3>
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
          <h3 className="text-foreground">Semua Feedback Kelas Farmasi</h3>
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
                <p className="text-xs text-muted-foreground mb-2">
                  Kelas: {item.className}
                </p>{" "}
                {/* Added "Kelas:" prefix */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    • {item.date}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
              {item.comment}
            </p>

            {!item.replied && (
              <div className="space-y-2">
                <Textarea
                  placeholder="Tulis balasan Anda untuk feedback ini..." // Updated placeholder
                  className="rounded-2xl text-sm min-h-20"
                />
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Balas Feedback
                </Button>
              </div>
            )}

            {item.replied && (
              <div className="bg-secondary/50 rounded-2xl p-3 mt-3 border-l-4 border-primary">
                <p className="text-xs text-primary mb-1">Balasan Anda:</p>
                <p className="text-sm text-foreground">
                  Terima kasih atas feedback Anda yang berharga! Kami senang
                  kelas ini bermanfaat.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
