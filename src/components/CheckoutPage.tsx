import { ArrowLeft, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface CheckoutPageProps {
  onBack: () => void;
  onCheckoutComplete: () => void;
}

const classToCheckout = {
  id: 1,
  title: 'Teknik Presentasi Efektif',
  coach: 'Dr. Sarah Johnson',
  price: 150000,
  image: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjB0ZWFjaGVyfGVufDF8fHx8MTc2MTc0OTM3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
};

export function CheckoutPage({ onBack, onCheckoutComplete }: CheckoutPageProps) {
  
  const handlePay = () => {
    toast.success("Pembayaran berhasil!", {
      description: `Anda telah terdaftar di kelas "${classToCheckout.title}".`
    });

    setTimeout(() => {
      onCheckoutComplete();
    }, 1500);
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
        <h2 className="text-primary-foreground">Checkout</h2>
        <p className="text-primary-foreground/80 text-sm mt-1">Selesaikan 1 langkah lagi</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Ringkasan Pesanan */}
        <div className="bg-card rounded-2xl p-4 shadow-md">
          <h3 className="text-foreground mb-4">Ringkasan Pesanan</h3>
          <div className="flex gap-4">
            <ImageWithFallback 
              src={classToCheckout.image}
              alt={classToCheckout.title}
              className="w-20 h-20 object-cover rounded-2xl flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-foreground mb-1 truncate">{classToCheckout.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{classToCheckout.coach}</p>
              <p className="text-foreground">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(classToCheckout.price)}
              </p>
            </div>
          </div>
          <div className="border-t border-border mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>Rp 150.000</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Biaya Admin</span>
              <span>Rp 2.500</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rp 152.500</span>
            </div>
          </div>
        </div>

        {/* Metode Pembayaran (Mock) */}
        <div className="bg-card rounded-2xl p-6 shadow-md space-y-4">
          <h3 className="text-foreground mb-4">Detail Pembayaran</h3>
          <div className="space-y-2">
            <Label htmlFor="card">Nomor Kartu</Label>
            <Input id="card" placeholder="0000 0000 0000 0000" className="rounded-2xl h-12" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Tanggal Exp.</Label>
              <Input id="expiry" placeholder="MM / YY" className="rounded-2xl h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" className="rounded-2xl h-12" />
            </div>
          </div>
        </div>

        {/* Tombol Bayar */}
        <Button
          onClick={handlePay}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-14 shadow-md active:scale-95 transition-transform"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Bayar Sekarang (Rp 152.500)
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Pembayaran Aman & Terenkripsi</span>
        </div>
      </div>
    </div>
  );
}