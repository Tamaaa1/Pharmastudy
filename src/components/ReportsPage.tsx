import { ArrowLeft, Download, TrendingUp, Users, Star, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsPageProps {
  onBack: () => void;
}

export function ReportsPage({ onBack }: ReportsPageProps) {
  const stats = [
    { label: 'Kelas Aktif', value: 12, icon: TrendingUp, change: '+3 bulan ini' },
    { label: 'Total Peserta', value: 248, icon: Users, change: '+45 bulan ini' },
    { label: 'Rating Rata-rata', value: 4.8, icon: Star, change: '+0.2 bulan ini' },
    { label: 'Pendapatan', value: 'Rp 12M', icon: DollarSign, change: '+Rp 3M bulan ini' },
  ];

  const monthlyData = [
    { month: 'Jul', peserta: 35, pendapatan: 8.5 },
    { month: 'Agu', peserta: 42, pendapatan: 10.2 },
    { month: 'Sep', peserta: 38, pendapatan: 9.1 },
    { month: 'Okt', peserta: 51, pendapatan: 12.3 },
    { month: 'Nov', peserta: 45, pendapatan: 10.8 },
  ];

  const categoryData = [
    { name: 'Public Speaking', value: 35, color: '#8B1E24' },
    { name: 'Leadership', value: 28, color: '#D6B370' },
    { name: 'Productivity', value: 22, color: '#A0826D' },
    { name: 'Innovation', value: 15, color: '#F5EDE0' },
  ];

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
        <h2 className="text-primary-foreground mb-2">Laporan & Pendapatan</h2>
        <p className="text-primary-foreground/80 text-sm">Statistik dan analisis performa Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <p className="text-foreground mb-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-xs text-primary">{stat.change}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download Button */}
      <div className="px-6 mb-6">
        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-12 shadow-md active:scale-95 transition-transform">
          <Download className="w-5 h-5 mr-2" />
          Unduh Laporan PDF
        </Button>
      </div>

      {/* Bar Chart - Monthly Performance */}
      <div className="px-6 mb-6">
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-foreground">Performa Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#8B7F7C" />
                <YAxis stroke="#8B7F7C" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '12px'
                  }}
                />
                <Legend />
                <Bar dataKey="peserta" fill="#8B1E24" name="Peserta Baru" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pendapatan" fill="#D6B370" name="Pendapatan (Juta)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pie Chart - Category Distribution */}
      <div className="px-6 mb-6">
        <Card className="rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-foreground">Distribusi Kategori Kelas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Classes */}
      <div className="px-6">
        <h3 className="text-foreground mb-4">Kelas Terpopuler</h3>
        <div className="space-y-3">
          {[
            { name: 'Teknik Presentasi Efektif', rating: 4.9, students: 78 },
            { name: 'Leadership & Team Management', rating: 4.8, students: 65 },
            { name: 'Time Management Essentials', rating: 4.7, students: 52 },
          ].map((classItem, index) => (
            <div key={index} className="bg-card rounded-2xl p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-foreground flex-1">{classItem.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-foreground">{classItem.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{classItem.students} peserta terdaftar</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
