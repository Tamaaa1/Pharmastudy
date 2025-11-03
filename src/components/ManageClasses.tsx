import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Upload,
  Calendar,
  Users,
  Video,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3"; // Import toast for notifications

interface Class {
  id: number;
  title: string;
  topic: string;
  schedule: string;
  method: "online" | "offline";
  quota: number;
  enrolled: number;
  description: string;
  image: string;
}

interface ManageClassesProps {
  onBack: () => void;
}

export function ManageClasses({ onBack }: ManageClassesProps) {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [classes, setClasses] = useState<Class[]>([
    {
      id: 1,
      title: "Farmakologi Dasar: Mekanisme Aksi Obat",
      topic: "Farmakologi",
      schedule: "25 September 2025, 10:00 WIB",
      method: "online",
      quota: 50,
      enrolled: 35,
      description:
        "Mempelajari prinsip dasar farmakologi, termasuk farmakokinetik dan farmakodinamik obat.",
      image:
        "https://images.unsplash.com/photo-1628343719114-1e14909a349b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVnfHNlYXJjaHwxfHwwfHx8MTcyMDczOTczM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "Farmasetika Industri: Formulasi Tablet",
      topic: "Farmasetika",
      schedule: "28 September 2025, 09:00 WIB",
      method: "offline",
      quota: 30,
      enrolled: 18,
      description:
        "Workshop interaktif tentang proses formulasi dan produksi sediaan tablet di industri farmasi.",
      image:
        "https://images.unsplash.com/photo-1587854692137-8ffb09fa81d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtYWN5JTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3MjA3NDA2OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "Kimia Medisinal: Desain Obat Antikanker",
      topic: "Kimia Farmasi",
      schedule: "30 September 2025, 13:00 WIB",
      method: "online",
      quota: 40,
      enrolled: 25,
      description:
        "Eksplorasi prinsip desain molekuler dan sintesis obat-obatan antikanker modern.",
      image:
        "https://images.unsplash.com/photo-1616763355548-111812741d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVnJTIwc3RydWN0dXJlJTIwY2hlbWlzdHJ5fGVufDF8fHx8MTcyMDc0MDc3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ]);

  // Form state for creating/editing classes
  const [newClass, setNewClass] = useState({
    title: "",
    topic: "",
    schedule: "",
    method: "online" as "online" | "offline",
    quota: "",
    description: "",
  });

  const handleCreateClass = () => {
    if (
      !newClass.title.trim() ||
      !newClass.topic.trim() ||
      !newClass.schedule.trim() ||
      !newClass.quota.trim() ||
      !newClass.description.trim()
    ) {
      toast.error("Semua kolom harus diisi!");
      return;
    }

    const classToAdd: Class = {
      id: Date.now(),
      title: newClass.title,
      topic: newClass.topic,
      schedule: newClass.schedule,
      method: newClass.method,
      quota: parseInt(newClass.quota),
      enrolled: 0,
      description: newClass.description,
      image:
        "https://images.unsplash.com/photo-1584820980665-c7e6c51884c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2luZSUyMGxhYnxlbnwxfHx8fDE3MjA3NDE2Mzkw&ixlib=rb-4.1.0&q=80&w=1080", // Default pharmacy image
    };
    setClasses([...classes, classToAdd]);
    setShowCreateDialog(false);
    setNewClass({
      title: "",
      topic: "",
      schedule: "",
      method: "online",
      quota: "",
      description: "",
    });
    toast.success("Kelas farmasi berhasil ditambahkan!");
  };

  const handleDeleteClass = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus kelas farmasi ini?")) {
      setClasses(classes.filter((c) => c.id !== id));
      toast.info("Kelas farmasi telah dihapus.");
    }
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
        <h2 className="text-primary-foreground">Kelola Kelas Farmasi</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">
          Buat dan atur kelas perkuliahan/workshop farmasi Anda
        </p>
      </div>

      {/* Create Button */}
      <div className="px-6 mb-6">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-14 shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Buat Kelas Farmasi Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-3xl">
            <DialogHeader>
              <DialogTitle>Buat Kelas Farmasi Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Kelas Farmasi</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Farmakologi Sistem Saraf Pusat"
                  value={newClass.title}
                  onChange={(e) =>
                    setNewClass({ ...newClass, title: e.target.value })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topik Farmasi</Label>
                <Input
                  id="topic"
                  placeholder="Contoh: Farmakologi, Farmasetika, Kimia Medisinal"
                  value={newClass.topic}
                  onChange={(e) =>
                    setNewClass({ ...newClass, topic: e.target.value })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Jadwal Kelas</Label>
                <Input
                  id="schedule"
                  type="datetime-local"
                  value={newClass.schedule}
                  onChange={(e) =>
                    setNewClass({ ...newClass, schedule: e.target.value })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Metode Pembelajaran</Label>
                <Select
                  value={newClass.method}
                  onValueChange={(value: "online" | "offline") =>
                    setNewClass({ ...newClass, method: value })
                  }
                >
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue placeholder="Pilih metode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quota">Kuota Peserta</Label>
                <Input
                  id="quota"
                  type="number"
                  placeholder="Contoh: 30"
                  value={newClass.quota}
                  onChange={(e) =>
                    setNewClass({ ...newClass, quota: e.target.value })
                  }
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Deskripsi Singkat Kelas Farmasi
                </Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan tentang tujuan, materi, dan manfaat kelas farmasi ini..."
                  value={newClass.description}
                  onChange={(e) =>
                    setNewClass({ ...newClass, description: e.target.value })
                  }
                  className="rounded-2xl min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Gambar Thumbnail Kelas Farmasi</Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Klik untuk upload gambar relevan dengan farmasi
                  </p>
                </div>
              </div>

              <Button
                onClick={handleCreateClass}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 mt-4"
                disabled={
                  !newClass.title ||
                  !newClass.topic ||
                  !newClass.schedule ||
                  !newClass.quota ||
                  !newClass.description
                }
              >
                Simpan Kelas Farmasi
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes List */}
      <div className="px-6">
        <h3 className="text-foreground mb-4">
          Daftar Kelas Farmasi Anda ({classes.length})
        </h3>
        <div className="space-y-4">
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-card rounded-2xl shadow-md overflow-hidden"
            >
              <ImageWithFallback
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">{classItem.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {classItem.topic}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-xl text-xs ${
                      classItem.method === "online"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/30 text-accent-foreground"
                    }`}
                  >
                    {classItem.method === "online" ? (
                      <div className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        <span>Online</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Offline</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {classItem.enrolled}/{classItem.quota} peserta
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl active:scale-95 transition-transform"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Detail
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 rounded-xl active:scale-95 transition-transform"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl text-destructive hover:bg-destructive hover:text-destructive-foreground active:scale-95 transition-transform"
                    onClick={() => handleDeleteClass(classItem.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
