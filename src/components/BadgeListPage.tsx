import { ArrowLeft, Award, Lock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";

interface BadgeListPageProps {
  onBack: () => void;
}

const allBadges = [
  { 
    id: 1, 
    name: 'Early Bird', 
    icon: '🌅', 
    description: 'Bergabung di minggu pertama rilis.', 
    earned: true 
  },
  { 
    id: 2, 
    name: 'Quick Learner', 
    icon: '⚡', 
    description: 'Selesaikan 1 kelas dalam 24 jam.', 
    earned: true 
  },
  { 
    id: 3, 
    name: 'Consistent', 
    icon: '🎯', 
    description: 'Login 7 hari berturut-turut.', 
    earned: true 
  },
  { 
    id: 4, 
    name: 'Forum Starter', 
    icon: '💬', 
    description: 'Membuat thread diskusi pertama Anda.', 
    earned: true 
  },
  { 
    id: 5, 
    name: 'Social Butterfly', 
    icon: '🦋', 
    description: 'Beri 50 balasan di forum komunitas.', 
    earned: true 
  },
  { 
    id: 6, 
    name: 'Quiz Master', 
    icon: '🧠', 
    description: 'Dapatkan nilai 100% di 3 kuis.', 
    earned: false 
  },
  { 
    id: 7, 
    name: 'Class Master', 
    icon: '👑', 
    description: 'Selesaikan 10 kelas premium.', 
    earned: false 
  },
  { 
    id: 8, 
    name: 'Night Owl', 
    icon: '🦉', 
    description: 'Belajar 5 kali setelah jam 10 malam.', 
    earned: false 
  },
  { 
    id: 9, 
    name: 'Perfect Score', 
    icon: '💯', 
    description: 'Dapatkan nilai sempurna di kuis akhir.', 
    earned: true 
  },
  { 
    id: 10, 
    name: 'Feedback Giver', 
    icon: '✍️', 
    description: 'Berikan 5 feedback untuk 5 kelas berbeda.', 
    earned: false 
  },
];

// Komponen Card internal
function BadgeCard({ badge }: { badge: typeof allBadges[0] }) {
  const isLocked = !badge.earned;
  return (
    <div 
      className={`bg-card rounded-2xl p-4 shadow-md text-center flex flex-col items-center ${
        isLocked && 'opacity-50 grayscale'
      }`}
    >
      <div className="text-5xl mb-3">{isLocked ? '🔒' : badge.icon}</div>
      <h4 className="text-foreground text-sm mb-1">{badge.name}</h4>
      <p className="text-xs text-muted-foreground flex-1">{badge.description}</p>
    </div>
  );
}


export function BadgeListPage({ onBack }: BadgeListPageProps) {
  const earnedBadges = allBadges.filter(b => b.earned);
  const lockedBadges = allBadges.filter(b => !b.earned);
  const progressPercentage = Math.round((earnedBadges.length / allBadges.length) * 100);

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
        <h2 className="text-primary-foreground">Badge & Pencapaian</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">Semua koleksi badge Anda</p>
      </div>

      {/* Progress Card */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-foreground">Total Badge Didapat</h3>
            <div className="flex items-center gap-1 text-primary">
              <Award className="w-5 h-5" />
              <span className="font-bold">{earnedBadges.length} / {allBadges.length}</span>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {progressPercentage}% badge telah Anda kumpulkan.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6">
        <Tabs defaultValue="earned" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card rounded-2xl p-1 mb-6">
            <TabsTrigger value="earned" className="rounded-xl">
              Didapat ({earnedBadges.length})
            </TabsTrigger>
            <TabsTrigger value="locked" className="rounded-xl">
              Terkunci ({lockedBadges.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="earned">
            <div className="grid grid-cols-2 gap-3">
              {earnedBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locked">
            <div className="grid grid-cols-2 gap-3">
              {lockedBadges.map(badge => (
                <BadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}