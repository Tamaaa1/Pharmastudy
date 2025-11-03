
import { ArrowLeft, CheckCircle, Lock, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

interface CoursePlayerPageProps {
  onBack: () => void;
  lessonId: number;
}

const courseData = {
  title: "Teknik Presentasi Efektif",
  currentLesson: {
    id: 2,
    title: "Struktur Presentasi yang Baik",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Membuat struktur yang baik adalah kunci. Dalam materi ini, kita akan membahas 3 bagian utama: Pembukaan yang memikat (Hook), Isi (Body) yang terstruktur, dan Penutupan (Conclusion) yang berkesan.",
  },
  lessons: [
    { id: 1, title: 'Pengantar Presentasi Efektif', duration: '5:10', completed: true },
    { id: 2, title: 'Struktur Presentasi yang Baik', duration: '8:30', completed: false },
    { id: 3, title: 'Body Language & Vocal Variety', duration: '7:15', completed: false },
    { id: 4, title: 'Handling Q&A Session', duration: '5:45', completed: false },
    { id: 5, title: 'Studi Kasus: Presentasi TED', duration: '10:00', completed: false },
  ],
};

export function CoursePlayerPage({ onBack, lessonId }: CoursePlayerPageProps) {
  const { title, currentLesson, lessons } = courseData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary-foreground mb-4 hover:gap-3 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali ke Kelas</span>
        </button>
        <h2 className="text-primary-foreground line-clamp-2">{title}</h2>
      </div>

      {/* Video Player */}
      <div className="p-6">
        <div className="aspect-video bg-card rounded-2xl shadow-md overflow-hidden mb-4">
          {/* Ini adalah placeholder, bisa diganti dengan <iframe> atau <video> */}
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <PlayCircle className="w-16 h-16 text-primary/30" />
          </div>
        </div>
        <Badge className="bg-accent text-accent-foreground rounded-xl">
          Materi #{currentLesson.id}
        </Badge>
        <h1 className="text-foreground my-3">{currentLesson.title}</h1>
      </div>

      {/* Tabs (Deskripsi & Daftar Materi) */}
      <div className="px-6 pb-24">
        <Tabs defaultValue="deskripsi" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card rounded-2xl p-1 mb-6">
            <TabsTrigger value="deskripsi" className="rounded-xl">Deskripsi</TabsTrigger>
            <TabsTrigger value="materi" className="rounded-xl">Daftar Materi</TabsTrigger>
          </TabsList>

          <TabsContent value="deskripsi">
            <div className="bg-card rounded-2xl p-6 shadow-md">
              <h3 className="text-foreground mb-3">Tentang Materi Ini</h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentLesson.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="materi" className="space-y-3">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                className={`w-full text-left bg-card rounded-2xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-4 ${
                  lesson.id === currentLesson.id ? 'border-2 border-primary' : ''
                }`}
                disabled={!lesson.completed && lesson.id > currentLesson.id}
              >
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  lesson.completed ? 'bg-primary/10 text-primary' : 
                  lesson.id === currentLesson.id ? 'bg-primary text-primary-foreground' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {lesson.completed ? <CheckCircle className="w-5 h-5" /> : 
                   lesson.id === currentLesson.id ? <PlayCircle className="w-5 h-5" /> :
                   <Lock className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm mb-1 ${
                    !lesson.completed && lesson.id > currentLesson.id ? 'text-muted-foreground/50' : 'text-foreground'
                  }`}>{lesson.title}</h4>
                  <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                </div>
              </button>
            ))}
          </TabsContent>
        </Tabs>
        
        <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 shadow-md">
          Tandai Selesai & Lanjut
        </Button>
      </div>
    </div>
  );
}