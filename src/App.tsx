import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { CoachDashboard } from "./components/CoachDashboard";
import { StudentDashboard } from "./components/StudentDashboard";
import { ManageClasses } from "./components/ManageClasses";
import { ClassList } from "./components/ClassList"; 
import { ClassDetail } from "./components/ClassDetail";
import { ReportsPage } from "./components/ReportsPage";
import { CommunityPage } from "./components/CommunityPage";
import { ProfilePage } from "./components/ProfilePage";
import { StudentsPage } from "./components/StudentsPage";
import { FeedbackPage } from "./components/FeedbackPage";
import { QuizPage } from "./components/QuizPage";
import { EditProfilePage } from "./components/EditProfilePage";
import { ChangePasswordPage } from "./components/ChangePasswordPage";
import { NotificationsPage } from "./components/NotificationsPage";
import { CreateThreadPage } from "./components/CreateThreadPage";
import { BottomNav } from "./components/BottomNav";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { ThreadDetailPage } from "./components/ThreadDetailPage";
import { MyClassesPage } from "./components/MyClassesPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { CoursePlayerPage } from "./components/CoursePlayerPage";
import { BadgeListPage } from "./components/BadgeListPage";

type Page = 
  | 'login' 
  | 'register' 
  | 'coach-dashboard' 
  | 'student-dashboard'
  | 'manage-classes'
  | 'class-list'
  | 'class-detail'
  | 'reports'
  | 'community'
  | 'profile'
  | 'students'
  | 'feedback'
  | 'quiz'
  | 'edit-profile'
  | 'change-password'
  | 'notifications'
  | 'create-thread'
  | 'thread-detail'
  | 'my-classes'
  | 'checkout'
  | 'course-player'
  | 'badge-list';

interface User {
  name: string;
  email: string;
  role: 'coach' | 'peserta';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const [registerRole, setRegisterRole] = useState<'coach' | 'peserta'>('peserta');

  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [mockEnrolledClasses, setMockEnrolledClasses] = useState<number[]>([1, 2]); 

  const handleLogin = (email: string, password: string, role: 'coach' | 'peserta') => {
    const mockUser: User = {
      name: role === 'coach' ? 'Dr. Sarah Johnson' : 'Ahmad Rizki',
      email: email,
      role: role,
    };
    setUser(mockUser);
    setCurrentPage(role === 'coach' ? 'coach-dashboard' : 'student-dashboard');
    setActiveTab('home');
    toast.success(`Selamat datang, ${mockUser.name}!`);
  };

  const handleRegister = (name: string, email: string, password: string, role: 'coach' | 'peserta') => {
    const newUser: User = { name, email, role };
    setUser(newUser);
    setCurrentPage(role === 'coach' ? 'coach-dashboard' : 'student-dashboard');
    setActiveTab('home');
    toast.success('Akun berhasil dibuat!');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
    setActiveTab('home');
    toast.success('Anda telah keluar dari akun');
  };
  
  // --- LOGIKA TAB YANG DIPERBARUI ---
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (!user) return;

    if (tab === 'home') {
      setCurrentPage(user.role === 'coach' ? 'coach-dashboard' : 'student-dashboard');
    } else if (tab === 'community') {
      setCurrentPage('community');
    } else if (tab === 'profile') {
      setCurrentPage('profile');
    }

    if (user.role === 'peserta') {
      if (tab === 'my-classes') {
        setCurrentPage('my-classes');
      } else if (tab === 'kelas') { // "Kelas" untuk peserta adalah "Jelajahi"
        setCurrentPage('class-list');
      }
    }
    
    if (user.role === 'coach') {
      if (tab === 'kelas') { // "Kelas" untuk coach adalah "Kelola"
        setCurrentPage('manage-classes');
      } else if (tab === 'peserta') {
        setCurrentPage('students');
      }
    }
  };

  const handleNavigateToBadgeList = () => {
    setCurrentPage('badge-list');
  };

  const handleBackToDashboard = () => {
    setActiveTab('home');
    setCurrentPage(user?.role === 'coach' ? 'coach-dashboard' : 'student-dashboard');
  };

  const handleNavigateToRegister = () => {
    setCurrentPage('register');
  };

  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };
  
  const handleClassClick = (classId: number) => {
    setSelectedClassId(classId);
    setCurrentPage('class-detail');
  };
  
  const handleThreadClick = (threadId: number) => {
    setSelectedThreadId(threadId);
    setCurrentPage('thread-detail');
  };

  const handleSaveProfile = (name: string, bio: string, phone: string) => {
    if (user) {
      setUser({ ...user, name });
    }
  };

  const handleGoToCheckout = (classId: number) => {
    setSelectedClassId(classId);
    setCurrentPage('checkout');
  };

  const handleCheckoutComplete = () => {
    if (selectedClassId) {
      setMockEnrolledClasses([...mockEnrolledClasses, selectedClassId]);
    }
    setCurrentPage('class-detail'); 
  };

  const handlePlayLesson = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setCurrentPage('course-player');
  };


  // Render pages based on current state
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigateToRegister={handleNavigateToRegister} />;
      
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigateToLogin={handleNavigateToLogin} defaultRole={registerRole} />;

      case 'coach-dashboard':
        if (!user) return null;
        return <CoachDashboard userName={user.name} onNavigateToManageClasses={() => handleTabChange('kelas')} onNavigateToStudents={() => handleTabChange('peserta')} onNavigateToFeedback={() => setCurrentPage('feedback')} onNavigateToReports={() => setCurrentPage('reports')} onNavigateToNotifications={() => setCurrentPage('notifications')} />;

      case 'student-dashboard':
        if (!user) return null;
        return <StudentDashboard 
                  userName={user.name} 
                  onNavigateToClassList={() => setCurrentPage('class-list')} 
                  onNavigateToCommunity={() => handleTabChange('community')} 
                  onNavigateToQuiz={() => setCurrentPage('quiz')} 
                  onNavigateToMyClasses={() => {
                    setCurrentPage('my-classes');
                    setActiveTab('my-classes');
                  }}
                  onNavigateToBadgeList={handleNavigateToBadgeList}
               />;

      case 'manage-classes':
        return <ManageClasses onBack={handleBackToDashboard} />;

      case 'class-list': // Ini halaman "Jelajahi"
        return <ClassList onBack={handleBackToDashboard} onClassClick={handleClassClick} />;

      case 'class-detail':
        if (!user || !selectedClassId) return null;
        return <ClassDetail 
                  classId={selectedClassId} 
                  userRole={user.role} 
                  // Logika onBack yang diperbarui
                  onBack={() => {
                    if (user.role === 'coach') {
                      setCurrentPage('manage-classes');
                      setActiveTab('kelas');
                      return;
                    }
                    // Cek apakah kelas ini sudah dimiliki
                    const isEnrolled = mockEnrolledClasses.includes(selectedClassId);
                    if (isEnrolled) {
                      setCurrentPage('my-classes');
                      setActiveTab('my-classes'); // Set tab aktif!
                    } else {
                      setCurrentPage('class-list');
                      // Tidak perlu set tab, karena 'class-list' tidak ada di tab
                    }
                  }}
                  onGoToCheckout={handleGoToCheckout}
                  onPlayLesson={handlePlayLesson}
                  isEnrolled={mockEnrolledClasses.includes(selectedClassId)} 
               />;

      case 'reports':
        return <ReportsPage onBack={handleBackToDashboard} />;

      case 'community':
        return <CommunityPage onBack={handleBackToDashboard} onCreateThread={() => setCurrentPage('create-thread')} onThreadClick={handleThreadClick} />;

      case 'profile':
        if (!user) return null;
        return <ProfilePage userName={user.name} userRole={user.role} onBack={handleBackToDashboard} onLogout={handleLogout} onEditProfile={() => setCurrentPage('edit-profile')} onChangePassword={() => setCurrentPage('change-password')} />;

      case 'students':
        return <StudentsPage onBack={handleBackToDashboard} />;

      case 'feedback':
        return <FeedbackPage onBack={handleBackToDashboard} />;

      case 'quiz':
        return <QuizPage onBack={handleBackToDashboard} className="Teknik Presentasi Efektif" />;

      case 'edit-profile':
        if (!user) return null;
        return <EditProfilePage userName={user.name} userEmail={user.email} userRole={user.role} onBack={() => setCurrentPage('profile')} onSave={handleSaveProfile} />;

      case 'change-password':
        return <ChangePasswordPage onBack={() => setCurrentPage('profile')} />;

      case 'notifications':
        if (!user) return null;
        return <NotificationsPage onBack={handleBackToDashboard} userRole={user.role} />;

      case 'create-thread':
        return <CreateThreadPage onBack={() => setCurrentPage('community')} onThreadCreated={() => setCurrentPage('community')} />;
      
      case 'thread-detail':
        if (!selectedThreadId) return null;
        return <ThreadDetailPage onBack={() => setCurrentPage('community')} threadId={selectedThreadId} />;

      case 'my-classes':
        return <MyClassesPage onBack={handleBackToDashboard} onClassClick={handleClassClick} />;

      case 'checkout':
        return <CheckoutPage onBack={() => setCurrentPage('class-detail')} onCheckoutComplete={handleCheckoutComplete} />;

      case 'course-player':
        if (!selectedLessonId) return null;
        return <CoursePlayerPage 
                  onBack={() => setCurrentPage('class-detail')} 
                  lessonId={selectedLessonId} 
               />;
      
      case 'badge-list':
        return <BadgeListPage onBack={handleBackToDashboard} />;

      default:
        return null;
    }
  };

  // Halaman yang tidak menampilkan Navigasi Bawah
  const showBottomNav = user && ![
    'login', 'register', 'quiz', 'edit-profile', 'change-password', 
    'notifications', 'create-thread', 'thread-detail', 'checkout', 
    'course-player', 'class-detail', 'class-list', 'badge-list'
  ].includes(currentPage);

  return (
    <div className="relative max-w-md mx-auto bg-background min-h-screen">
      {renderPage()}
      
      {showBottomNav && (
        <BottomNav 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          role={user.role}
        />
      )}
      
      <Toaster position="top-center" richColors />
    </div>
  );
}