import { Button } from "./ui/button";
import { Check, ArrowLeft } from "lucide-react";

interface PackagesPageProps {
  onBack: () => void;
}

export function PackagesPage({ onBack }: PackagesPageProps) {
  const packages = [
    {
      id: 1,
      name: 'Paket Basic',
      price: 'Rp35.000',
      features: [
        'Akses ke seluruh materi pembelajaran, video materi, kuis, serta kunci jawaban.',
        '1 kelas live (bisa konsultasi selama sesi berlangsung).',
        'Durasi akses: 1 minggu.',
        'Pengajar: Mahasiswa aktif.'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Paket Standard',
      price: 'Rp50.000',
      features: [
        'Akses ke seluruh materi pembelajaran, video materi, kuis, serta kunci jawaban.',
        '3 kelas live (bisa konsultasi selama sesi berlangsung).',
        'Durasi akses: 2 minggu.',
        'Pengajar: Sarjana (S1) dan Apoteker.'
      ],
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Paket Premium',
      price: 'Rp75.000',
      features: [
        'Akses ke seluruh materi pembelajaran, video materi, kuis, serta kunci jawaban.',
        '5 kelas live (bisa konsultasi selama sesi berlangsung dan diskusi lanjutan melalui telegram selama 24 jam setelah kelas).',
        'Pengajar: Dosen.'
      ],
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 bg-primary-foreground/10 rounded-xl hover:bg-primary-foreground/20 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <h1 className="text-primary-foreground text-2xl font-bold">Paket Pembelajaran</h1>
        </div>
      </div>

      {/* Packages List */}
      <div className="p-6 space-y-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-card rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground text-xl font-bold">{pkg.name}</h2>
              <span className="text-primary font-bold text-2xl">{pkg.price}</span>
            </div>

            <ul className="space-y-3 mb-6">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 text-lg font-semibold">
              {pkg.name === 'Paket Premium' ? 'Paket Aktif' : 'Pilih Paket'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
