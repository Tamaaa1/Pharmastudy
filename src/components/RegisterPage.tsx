import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { GraduationCap, ArrowLeft } from "lucide-react";

interface RegisterPageProps {
  onRegister: (name: string, email: string, password: string, role: 'coach' | 'peserta') => void;
  onNavigateToLogin: () => void;
  defaultRole: 'coach' | 'peserta';
}

export function RegisterPage({ onRegister, onNavigateToLogin, defaultRole }: RegisterPageProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password tidak cocok!");
      return;
    }
    if (!agreedToTerms) {
      alert("Anda harus menyetujui ketentuan untuk melanjutkan");
      return;
    }
    onRegister(name, email, password, defaultRole);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onNavigateToLogin}
          className="flex items-center gap-2 text-primary mb-6 hover:gap-3 transition-all active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>

        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-primary mb-2">Buat Akun Baru</h1>
          <p className="text-muted-foreground">
            Daftar sebagai {defaultRole === 'coach' ? 'Coach' : 'Peserta'}
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-card rounded-3xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2xl bg-input-background border-border h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2xl bg-input-background border-border h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl bg-input-background border-border h-12"
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Masukkan password lagi"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-2xl bg-input-background border-border h-12"
                required
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="rounded-lg mt-1"
              />
              <label htmlFor="terms" className="text-sm text-foreground cursor-pointer leading-relaxed">
                Saya setuju dengan syarat dan ketentuan yang berlaku di EduCoach
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 mt-6 shadow-md active:scale-95 transition-transform"
            >
              Buat Akun
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Sudah punya akun?{" "}
              <button
                onClick={onNavigateToLogin}
                className="text-primary hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
