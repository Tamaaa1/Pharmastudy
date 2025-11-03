import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GraduationCap } from "lucide-react";

interface LoginPageProps {
  onLogin: (
    email: string,
    password: string,
    role: "coach" | "peserta" | "premium-user",
  ) => void;
  onNavigateToRegister: () => void;
}

export function LoginPage({ onLogin, onNavigateToRegister }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"coach" | "peserta" | "premium-user">(
    "peserta",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password, role);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-4 shadow-lg">
            <GraduationCap className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-primary mb-2">PharmaStudy</h1>
          <p className="text-muted-foreground">
            Platform Coaching & Pembelajaran
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-3xl p-6 shadow-lg">
          <h2 className="text-primary mb-6">Masuk ke Akun</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2xl bg-input-background border-border h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Pilih Role</Label>
              <Select
                value={role}
                onValueChange={(value: "coach" | "peserta" | "premium-user") =>
                  setRole(value)
                }
              >
                <SelectTrigger className="rounded-2xl bg-input-background border-border h-12">
                  <SelectValue placeholder="Pilih role Anda" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coach">Coach (Admin)</SelectItem>
                  <SelectItem value="peserta">Peserta (free)</SelectItem>
                  <SelectItem value="premium-user">
                    Peserta (Premium)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 mt-6 shadow-md active:scale-95 transition-transform"
            >
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Belum punya akun?{" "}
              <button
                onClick={onNavigateToRegister}
                className="text-primary hover:underline"
              >
                Daftar Akun Baru
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
