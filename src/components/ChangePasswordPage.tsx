import { useState } from "react";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";

interface ChangePasswordPageProps {
  onBack: () => void;
}

export function ChangePasswordPage({ onBack }: ChangePasswordPageProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Semua field harus diisi!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password baru minimal 8 karakter!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    // Simulate password change
    toast.success("Password berhasil diubah!");
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
        <h2 className="text-primary-foreground">Ubah Password</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">Perbarui kata sandi Anda</p>
      </div>

      <div className="px-6">
        <div className="bg-card rounded-2xl p-6 shadow-md space-y-5">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="current">Password Saat Ini</Label>
            <div className="relative">
              <Input
                id="current"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-2xl h-12 pr-12"
                placeholder="Masukkan password saat ini"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new">Password Baru</Label>
            <div className="relative">
              <Input
                id="new"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-2xl h-12 pr-12"
                placeholder="Minimal 8 karakter"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {newPassword && (
              <div className="space-y-1 text-xs">
                <div className={newPassword.length >= 8 ? "text-primary" : "text-muted-foreground"}>
                  ✓ Minimal 8 karakter
                </div>
                <div className={/[A-Z]/.test(newPassword) ? "text-primary" : "text-muted-foreground"}>
                  ✓ Mengandung huruf besar
                </div>
                <div className={/[0-9]/.test(newPassword) ? "text-primary" : "text-muted-foreground"}>
                  ✓ Mengandung angka
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm">Konfirmasi Password Baru</Label>
            <div className="relative">
              <Input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-2xl h-12 pr-12"
                placeholder="Ketik ulang password baru"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-xs text-destructive">Password tidak cocok</p>
            )}
          </div>

          {/* Security Tips */}
          <div className="bg-accent/10 rounded-2xl p-4 border border-accent/20">
            <div className="flex gap-2">
              <Lock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs text-foreground">
                <p className="font-medium">Tips Keamanan:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Gunakan kombinasi huruf, angka, dan simbol</li>
                  <li>• Jangan gunakan informasi pribadi</li>
                  <li>• Ubah password secara berkala</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-6">
          <Button
            onClick={handleChangePassword}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 shadow-md active:scale-95 transition-transform"
          >
            Ubah Password
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
