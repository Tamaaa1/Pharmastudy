import { useState } from "react";
import { Plus, Edit, Trash2, Eye, ArrowLeft, Upload, Calendar, Users, Video, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Class {
  id: number;
  title: string;
  topic: string;
  schedule: string;
  method: 'online' | 'offline';
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
      title: 'Teknik Presentasi Efektif',
      topic: 'Public Speaking',
      schedule: '15 Nov 2024, 14:00',
      method: 'online',
      quota: 30,
      enrolled: 24,
      description: 'Pelajari cara presentasi yang menarik dan efektif untuk audience',
      image: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTc0OTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Leadership & Team Management',
      topic: 'Leadership',
      schedule: '18 Nov 2024, 10:00',
      method: 'offline',
      quota: 25,
      enrolled: 18,
      description: 'Kembangkan skill kepemimpinan dan manajemen tim yang efektif',
      image: 'https://images.unsplash.com/photo-1745970649913-2edb9dca4f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvYWNoaW5nJTIwc2Vzc2lvbnxlbnwxfHx8fDE3NjE2NzMzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ]);

  // Form state
  const [newClass, setNewClass] = useState({
    title: '',
    topic: '',
    schedule: '',
    method: 'online' as 'online' | 'offline',
    quota: '',
    description: '',
  });

  const handleCreateClass = () => {
    const classToAdd: Class = {
      id: Date.now(),
      title: newClass.title,
      topic: newClass.topic,
      schedule: newClass.schedule,
      method: newClass.method,
      quota: parseInt(newClass.quota),
      enrolled: 0,
      description: newClass.description,
      image: 'https://images.unsplash.com/photo-1562939651-9359f291c988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjE3ODQ2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    };
    setClasses([...classes, classToAdd]);
    setShowCreateDialog(false);
    setNewClass({
      title: '',
      topic: '',
      schedule: '',
      method: 'online',
      quota: '',
      description: '',
    });
  };

  const handleDeleteClass = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
      setClasses(classes.filter(c => c.id !== id));
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
        <h2 className="text-primary-foreground">Kelola Kelas</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">Buat dan atur kelas coaching Anda</p>
      </div>

      {/* Create Button */}
      <div className="px-6 mb-6">
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-14 shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Buat Kelas Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-3xl">
            <DialogHeader>
              <DialogTitle>Buat Kelas Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Judul Kelas</Label>
                <Input
                  id="title"
                  placeholder="Contoh: Teknik Presentasi Efektif"
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topik</Label>
                <Input
                  id="topic"
                  placeholder="Contoh: Public Speaking"
                  value={newClass.topic}
                  onChange={(e) => setNewClass({ ...newClass, topic: e.target.value })}
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">Jadwal</Label>
                <Input
                  id="schedule"
                  type="datetime-local"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Metode</Label>
                <Select 
                  value={newClass.method} 
                  onValueChange={(value: 'online' | 'offline') => setNewClass({ ...newClass, method: value })}
                >
                  <SelectTrigger className="rounded-2xl">
                    <SelectValue />
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
                  onChange={(e) => setNewClass({ ...newClass, quota: e.target.value })}
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Singkat</Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan tentang kelas ini..."
                  value={newClass.description}
                  onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
                  className="rounded-2xl min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label>Upload Gambar Thumbnail</Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Klik untuk upload gambar</p>
                </div>
              </div>

              <Button
                onClick={handleCreateClass}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 mt-4"
                disabled={!newClass.title || !newClass.topic || !newClass.schedule || !newClass.quota}
              >
                Simpan Kelas
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Classes List */}
      <div className="px-6">
        <h3 className="text-foreground mb-4">Daftar Kelas ({classes.length})</h3>
        <div className="space-y-4">
          {classes.map((classItem) => (
            <div key={classItem.id} className="bg-card rounded-2xl shadow-md overflow-hidden">
              <ImageWithFallback 
                src={classItem.image}
                alt={classItem.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-foreground mb-1">{classItem.title}</h4>
                    <p className="text-sm text-muted-foreground">{classItem.topic}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-xl text-xs ${
                    classItem.method === 'online' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-accent/30 text-accent-foreground'
                  }`}>
                    {classItem.method === 'online' ? (
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
                    <span>{classItem.enrolled}/{classItem.quota}</span>
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
