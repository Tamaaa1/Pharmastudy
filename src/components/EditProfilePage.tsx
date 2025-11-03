import { useState } from "react";
import { ArrowLeft, Camera, Save } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { toast } from "sonner@2.0.3";

interface EditProfilePageProps {
  userName: string;
  userEmail: string;
  userRole: "coach" | "peserta";
  onBack: () => void;
  onSave: (name: string, bio: string, phone: string) => void;
}

export function EditProfilePage({
  userName,
  userEmail,
  userRole,
  onBack,
  onSave,
}: EditProfilePageProps) {
  const [name, setName] = useState(userName);
  const [bio, setBio] = useState(
    userRole === "coach"
      ? "Apoteker ahli dengan 10+ tahun pengalaman di farmasi klinis dan pengembangan obat."
      : "Mahasiswa farmasi yang antusias dan ingin berkontribusi pada kesehatan masyarakat melalui ilmu farmasi.",
  );
  const [phone, setPhone] = useState("+62 812-3456-7890");
  const [organization, setOrganization] = useState(
    userRole === "coach"
      ? "Fakultas Farmasi Universitas Tanjung Pura"
      : "Universitas Tanjung Pura",
  );

  const handleSave = () => {
    onSave(name, bio, phone);
    toast.success("Profil berhasil diperbarui!");
    setTimeout(() => onBack(), 1000);
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
        <h2 className="text-primary-foreground">Edit Profil Farmasi</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">
          Perbarui informasi profil anda
        </p>
      </div>

      <div className="px-6 space-y-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="w-32 h-32 border-4 border-card shadow-lg">
              <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                {name[0]}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 p-3 bg-accent text-accent-foreground rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Klik untuk ubah foto profil
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-2xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Institusi/Pribadi</Label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              disabled
              className="rounded-2xl h-12 bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Email tidak dapat diubah
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-2xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">
              {userRole === "coach"
                ? "Institusi/Afiliasi Farmasi"
                : "Institusi/Universitas"}
            </Label>
            <Input
              id="organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="rounded-2xl h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">
              Bio (Deskripsi Diri/Bidang Minat Farmasi)
            </Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-2xl min-h-28"
              placeholder="Ceritakan tentang latar belakang atau minat farmasi Anda..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleSave}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 shadow-md active:scale-95 transition-transform"
          >
            <Save className="w-5 h-5 mr-2" />
            Simpan Perubahan Profil Farmasi
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
