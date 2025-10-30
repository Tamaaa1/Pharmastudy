import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner@2.0.3";

interface CreateThreadPageProps {
  onBack: () => void;
  onThreadCreated: () => void;
}

export function CreateThreadPage({ onBack, onThreadCreated }: CreateThreadPageProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Public Speaking",
    "Leadership",
    "Productivity",
    "Tips & Trik",
    "Sharing Pengalaman",
    "Tanya Jawab",
  ];

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Judul thread harus diisi!");
      return;
    }
    if (!content.trim()) {
      toast.error("Konten thread harus diisi!");
      return;
    }
    if (!category) {
      toast.error("Pilih kategori thread!");
      return;
    }

    // Simulate thread creation
    toast.success("Thread berhasil dibuat!");
    setTimeout(() => {
      onThreadCreated();
    }, 500);
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
        <h2 className="text-primary-foreground">Buat Thread Baru</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">Mulai diskusi dengan komunitas</p>
      </div>

      <div className="px-6">
        <div className="bg-card rounded-2xl p-6 shadow-md space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Judul Thread</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Tips Mengatasi Nervous Saat Presentasi"
              className="rounded-2xl h-12"
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground text-right">
              {title.length}/100 karakter
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-2xl h-12">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis pertanyaan atau topik diskusi Anda di sini..."
              className="rounded-2xl min-h-40"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground text-right">
              {content.length}/1000 karakter
            </p>
          </div>

          {/* Tips */}
          <div className="bg-accent/10 rounded-2xl p-4 border border-accent/20">
            <h4 className="text-foreground text-sm mb-2">💡 Tips Membuat Thread:</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Gunakan judul yang jelas dan spesifik</li>
              <li>• Pilih kategori yang sesuai</li>
              <li>• Jelaskan konteks dengan detail</li>
              <li>• Bersikap sopan dan menghargai pendapat orang lain</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-6">
          <Button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 shadow-md active:scale-95 transition-transform"
          >
            <Send className="w-5 h-5 mr-2" />
            Posting Thread
          </Button>
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full rounded-2xl h-12 active:scale-95 transition-transform"
          >
            Batal
          </Button>
        </div>
      </div>
    </div>
  );
}
