import { useState } from "react";
import { Search, Star, Clock, Users, ArrowLeft, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ClassListProps {
  onBack: () => void;
  onClassClick: (classId: number) => void;
}

export function ClassList({ onBack, onClassClick }: ClassListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'gratis' | 'premium'>('all');

  const classes = [
    {
      id: 1,
      title: 'Teknik Presentasi Efektif',
      coach: 'Dr. Sarah Johnson',
      duration: '25 menit',
      rating: 4.9,
      students: 248,
      price: 'Premium',
      image: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTc0OTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Public Speaking',
    },
    {
      id: 2,
      title: 'Leadership & Team Management',
      coach: 'Prof. Michael Chen',
      duration: '30 menit',
      rating: 4.8,
      students: 189,
      price: 'Premium',
      image: 'https://images.unsplash.com/photo-1745970649913-2edb9dca4f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvYWNoaW5nJTIwc2Vzc2lvbnxlbnwxfHx8fDE3NjE2NzMzODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Leadership',
    },
    {
      id: 3,
      title: 'Time Management Essentials',
      coach: 'Lisa Anderson',
      duration: '20 menit',
      rating: 4.7,
      students: 312,
      price: 'Gratis',
      image: 'https://images.unsplash.com/photo-1701576766277-c6160505581d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYxNzczMDAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Productivity',
    },
    {
      id: 4,
      title: 'Creative Problem Solving',
      coach: 'Dr. James Wilson',
      duration: '28 menit',
      rating: 4.9,
      students: 156,
      price: 'Gratis',
      image: 'https://images.unsplash.com/photo-1562939651-9359f291c988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc3Jvb20lMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjE3ODQ2NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Innovation',
    },
  ];

  const filteredClasses = classes.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'gratis') return matchesSearch && c.price === 'Gratis';
    if (activeFilter === 'premium') return matchesSearch && c.price === 'Premium';
    return matchesSearch;
  });

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
        <h2 className="text-primary-foreground mb-2">Jelajahi Kelas</h2>
        <p className="text-primary-foreground/80 text-sm">Temukan kelas yang sesuai untuk Anda</p>
      </div>

      {/* Search Bar */}
      <div className="px-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Cari kelas, coach, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 rounded-2xl h-12 bg-card shadow-md"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-6">
        <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card rounded-2xl p-1 h-auto">
            <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Semua
            </TabsTrigger>
            <TabsTrigger value="gratis" className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Gratis
            </TabsTrigger>
            <TabsTrigger value="premium" className="rounded-xl data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Premium
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Classes Grid */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">
            {filteredClasses.length} Kelas Tersedia
          </h3>
          <button className="flex items-center gap-1 text-sm text-primary active:scale-95 transition-transform">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="space-y-4">
          {filteredClasses.map((classItem) => (
            <button
              key={classItem.id}
              onClick={() => onClassClick(classItem.id)}
              className="w-full bg-card rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all active:scale-95 text-left"
            >
              <div className="relative">
                <ImageWithFallback 
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={`${
                    classItem.price === 'Premium' 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-primary text-primary-foreground'
                  } rounded-xl shadow-md`}>
                    {classItem.price}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-card/90 text-foreground rounded-xl backdrop-blur-sm">
                    {classItem.category}
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-foreground mb-2">{classItem.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{classItem.coach}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{classItem.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{classItem.students}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-foreground">{classItem.rating}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl">
                  Lihat Detail
                </Button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
