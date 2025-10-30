import { useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface QuizPageProps {
  onBack: () => void;
  className: string;
}

export function QuizPage({ onBack, className }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'Apa yang paling penting dalam membuka presentasi?',
      options: [
        'Menyapa audience',
        'Hook yang menarik perhatian',
        'Memperkenalkan diri panjang lebar',
        'Langsung ke materi',
      ],
      correctAnswer: 1,
      explanation: 'Hook yang menarik perhatian di awal akan membuat audience lebih engaged dengan presentasi Anda.',
    },
    {
      id: 2,
      question: 'Berapa durasi ideal untuk microlearning?',
      options: [
        '5-10 menit',
        '20-30 menit',
        '45-60 menit',
        '1-2 jam',
      ],
      correctAnswer: 1,
      explanation: 'Microlearning idealnya berdurasi 20-30 menit agar materi dapat diserap dengan baik tanpa membuat jenuh.',
    },
    {
      id: 3,
      question: 'Apa yang harus dilakukan saat audience terlihat bosan?',
      options: [
        'Terus melanjutkan presentasi',
        'Mengubah tempo dan melibatkan audience',
        'Mempercepat presentasi',
        'Berhenti presentasi',
      ],
      correctAnswer: 1,
      explanation: 'Mengubah tempo dan melibatkan audience dengan pertanyaan atau aktivitas dapat mengembalikan perhatian mereka.',
    },
  ];

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === currentQ.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

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
          <h2 className="text-primary-foreground">Kuis Selesai!</h2>
        </div>

        {/* Result Card */}
        <div className="px-6">
          <div className="bg-card rounded-3xl p-8 shadow-lg text-center mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
              passed ? 'bg-primary/10' : 'bg-muted'
            }`}>
              {passed ? (
                <Trophy className="w-12 h-12 text-primary" />
              ) : (
                <XCircle className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            <h1 className="text-foreground mb-2">{percentage}%</h1>
            <p className="text-muted-foreground mb-6">
              {passed ? 'Selamat! Anda Lulus!' : 'Hampir Berhasil!'}
            </p>

            <div className="bg-secondary rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-muted-foreground">Skor Anda</span>
                <span className="text-foreground">{score} / {totalQuestions}</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>

            {passed ? (
              <div className="space-y-3">
                <Badge className="bg-accent text-accent-foreground rounded-xl px-6 py-2">
                  + 50 Poin
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Anda mendapatkan badge "Quiz Master" 🏆
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Pelajari kembali materi dan coba lagi. Nilai minimal untuk lulus adalah 70%.
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleRetry}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12"
            >
              Coba Lagi
            </Button>
            <Button 
              onClick={onBack}
              variant="outline"
              className="w-full rounded-2xl h-12"
            >
              Kembali ke Kelas
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        <h2 className="text-primary-foreground mb-2">Kuis: {className}</h2>
        <p className="text-primary-foreground/80 text-sm">
          Pertanyaan {currentQuestion + 1} dari {totalQuestions}
        </p>
      </div>

      {/* Progress */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm text-foreground">
              {Math.round(((currentQuestion) / totalQuestions) * 100)}%
            </span>
          </div>
          <Progress value={(currentQuestion / totalQuestions) * 100} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <div className="px-6 mb-6">
        <div className="bg-card rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="rounded-xl">
              Soal #{currentQ.id}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>30 detik</span>
            </div>
          </div>
          
          <h3 className="text-foreground mb-6 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === currentQ.correctAnswer;
              const showResult = isAnswered;

              let buttonClass = "w-full text-left p-4 rounded-2xl border-2 transition-all ";
              
              if (!showResult) {
                buttonClass += isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 bg-card";
              } else {
                if (isCorrect) {
                  buttonClass += "border-primary bg-primary/10";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "border-destructive bg-destructive/10";
                } else {
                  buttonClass += "border-border bg-card opacity-50";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      showResult && isCorrect
                        ? 'bg-primary text-primary-foreground'
                        : showResult && isSelected && !isCorrect
                        ? 'bg-destructive text-destructive-foreground'
                        : isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {showResult && isCorrect ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : showResult && isSelected && !isCorrect ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        <span>{String.fromCharCode(65 + index)}</span>
                      )}
                    </div>
                    <span className="text-foreground">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explanation (shown after answer) */}
      {isAnswered && (
        <div className="px-6 mb-6">
          <div className={`rounded-2xl p-4 ${
            selectedAnswer === currentQ.correctAnswer
              ? 'bg-primary/10 border-2 border-primary'
              : 'bg-destructive/10 border-2 border-destructive'
          }`}>
            <h4 className={`mb-2 ${
              selectedAnswer === currentQ.correctAnswer ? 'text-primary' : 'text-destructive'
            }`}>
              {selectedAnswer === currentQ.correctAnswer ? '✓ Benar!' : '✗ Kurang Tepat'}
            </h4>
            <p className="text-sm text-foreground leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="px-6">
        <Button
          onClick={handleNext}
          disabled={!isAnswered}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-2xl h-12 disabled:opacity-50"
        >
          {currentQuestion < totalQuestions - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil'}
        </Button>
      </div>
    </div>
  );
}
