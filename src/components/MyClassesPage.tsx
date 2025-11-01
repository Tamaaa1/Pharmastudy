import { ArrowLeft, BookOpen, Clock, Play } from "lucide-react";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";

interface MyClassesPageProps {
  onBack: () => void;
  onClassClick: (classId: number) => void;
}

const enrolledClasses = [
  {
    id: 1,
    title: 'Teknik Presentasi Efektif',
    coach: 'Dr. Sarah Johnson',
    progress: 75,
    image: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTc0OTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    lastLesson: 'Struktur Presentasi',
  },
  {
    id: 2,
    title: 'Leadership & Team Management',
    coach: 'Prof. Michael Chen',
    progress: 45,
    image: 'https://images.unsplash.com/photo-1745970649913-2edb9dca4f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvYWNoaW5nJTIwc2Vzc2lvbnxlbnwxfHx8fDE3NjE2NzMzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    lastLesson: 'Gaya Kepemimpinan',
  },
];

export function MyClassesPage({ onBack, onClassClick }: MyClassesPageProps) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg mb-6">
        {/* Kita tidak perlu tombol back di halaman tab utama */}
        <div className="flex items-center gap-2 text-primary-foreground mb-4">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-primary-foreground">Kelas Saya</h2>
        </div>
        <p className="text-primary-foreground/80 text-sm">
          Lanjutkan proses belajar Anda
        </p>
      </div>

      {/* Daftar Kelas */}
      <div className="px-6 space-y-4">
        {enrolledClasses.map((course) => (
          <div 
            key={course.id} 
            className="bg-card rounded-2xl shadow-md overflow-hidden"
          >
            <div className="flex gap-4 p-4">
              <ImageWithFallback 
                src={course.image}
                alt={course.title}
                className="w-24 h-24 object-cover rounded-2xl flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-foreground mb-1 truncate">{course.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{course.coach}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              </div>
            </div>
            
            <div className="border-t border-border p-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="truncate">Terakhir: {course.lastLesson}</span>
              </div>
              <Button 
                size="sm" 
                className="rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 flex-shrink-0"
                onClick={() => onClassClick(course.id)}
              >
                <Play className="w-4 h-4 mr-1" />
                Lanjut
              </Button>
            </div>
          </div>
        ))}
        
        {enrolledClasses.length === 0 && (
           <div className="text-center py-12">
             <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
             <p className="text-muted-foreground">Anda belum mendaftar kelas apapun</p>
           </div>
        )}
      </div>
    </div>
  );
}