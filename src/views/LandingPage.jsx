import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle,
  HelpCircle,
  Heart,
  Droplet,
  Flame,
  Wind
} from 'lucide-react';
import { initialTreatments, initialHerbs } from '../data/mockData';

export default function LandingPage({ setView, navigateToBooking }) {
  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const quizQuestions = [
    {
      id: 1,
      question: "Which option best describes your physical frame and build?",
      options: [
        { key: "A", text: "Slender, thin, light build, bones and joints are prominent." },
        { key: "B", text: "Medium frame, muscular, active, maintain weight easily." },
        { key: "C", text: "Larger frame, broad shoulders, gain weight easily, struggle to lose it." }
      ]
    },
    {
      id: 2,
      question: "How does your skin feel to the touch most of the time?",
      options: [
        { key: "A", text: "Dry, rough, cool, thin, and prone to cracking." },
        { key: "B", text: "Warm, oily, sensitive, prone to redness or freckles." },
        { key: "C", text: "Thick, smooth, soft, cool, and relatively oily." }
      ]
    },
    {
      id: 3,
      question: "How do you typically react to mental stress or pressure?",
      options: [
        { key: "A", text: "I become anxious, worried, nervous, and restless." },
        { key: "B", text: "I get angry, frustrated, impatient, or highly critical." },
        { key: "C", text: "I stay calm, quiet, but can become withdrawn, sluggish, and stubbon." }
      ]
    },
    {
      id: 4,
      question: "Which pattern best describes your digestion and appetite?",
      options: [
        { key: "A", text: "Irregular and unpredictable; I get bloated or constipated easily." },
        { key: "B", text: "Strong and intense; I feel irritable if I skip or delay a meal." },
        { key: "C", text: "Slow and steady; I feel heavy after eating and can easily skip meals." }
      ]
    }
  ];

  const handleAnswer = (optionKey) => {
    const updatedAnswers = { ...answers, [currentQuestion]: optionKey };
    setAnswers(updatedAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate Result
      const counts = { A: 0, B: 0, C: 0 };
      Object.values(updatedAnswers).forEach(key => {
        counts[key] = (counts[key] || 0) + 1;
      });

      let dominant = "A";
      if (counts.B > counts.A && counts.B > counts.C) dominant = "B";
      else if (counts.C > counts.A && counts.C > counts.B) dominant = "C";
      else if (counts.A === counts.B) dominant = "A-B"; // Mixed
      else if (counts.B === counts.C) dominant = "B-C";
      else if (counts.A === counts.C) dominant = "A-C";

      let doshaInfo = {};
      if (dominant === "A" || dominant === "A-B") {
        doshaInfo = {
          name: "Vata (Air & Space)",
          description: "Vata is characterized by qualities of movement, lightness, dryness, and cold. When in balance, you are creative, energetic, and adaptable. Out of balance, you experience anxiety, dry skin, insomnia, and bloating.",
          diet: "Favor warm, cooked, grounding foods like hearty stews, sweet fruits, and healthy fats. Avoid dry, raw, and cold foods.",
          treatments: ["Shirodhara Therapy", "Abhyanga Massage"],
          herbs: ["Ashwagandha", "Brahmi"]
        };
      } else if (dominant === "B" || dominant === "B-C" || dominant === "A-C") {
        doshaInfo = {
          name: "Pitta (Fire & Water)",
          description: "Pitta governs metabolism, heat, and transformation. In balance, you are sharp, intelligent, and focused. Out of balance, you experience inflammation, heartburn, skin rashes, and irritability.",
          diet: "Favor cooling, refreshing foods like sweet fruits, leafy greens, cucumber, and coconut. Avoid spicy, fried, and highly acidic foods.",
          treatments: ["Shirodhara Therapy", "Abhyanga Massage"],
          herbs: ["Shatavari", "Brahmi"]
        };
      } else {
        doshaInfo = {
          name: "Kapha (Earth & Water)",
          description: "Kapha represents stability, structure, and lubrication. In balance, you are loving, loyal, calm, and strong. Out of balance, you experience lethargy, weight gain, congestion, and fluid retention.",
          diet: "Favor light, warm, spicy, and stimulating foods like ginger, lentils, and hot vegetables. Limit sweet, salty, and heavy dairy items.",
          treatments: ["Nasya Therapy", "Elakizhi Bolus Therapy"],
          herbs: ["Tulsi (Holy Basil)", "Triphala"]
        };
      }
      setQuizResult(doshaInfo);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setAnswers({});
    setQuizResult(null);
    setCurrentQuestion(0);
  };

  return (
    <div className="min-h-screen">
      {/* Serene Hero Section */}
      <section className="relative pt-12 pb-24 md:py-32 overflow-hidden hero-gradient">
        {/* Subtle decorative circles */}
        <div className="absolute top-20 right-[-10%] w-96 h-96 rounded-full bg-brand-green-50/70 blur-3xl" />
        <div className="absolute bottom-10 left-[-10%] w-80 h-80 rounded-full bg-brand-earth-100/50 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green-100/80 text-brand-green-800 text-sm font-medium border border-brand-green-200">
              <Sparkles className="w-4 h-4 text-brand-green-600" />
              <span>Ancient Wisdom for Modern Wellness</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-brand-green-900 leading-tight">
              Restore Your Natural <span className="italic text-brand-earth-700">State of Balance</span>
            </h1>
            <p className="text-lg text-stone-600 max-w-xl">
              SomaVeda brings authentic Ayurvedic consultations, customized detoxification treatments (Panchakarma), and organic herbal medicine formulas to soothe your mind, body, and spirit.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={navigateToBooking}
                className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-medium px-8 py-4 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="#dosha-quiz"
                className="bg-white hover:bg-brand-earth-100 text-brand-green-800 font-medium px-8 py-4 rounded-xl border border-stone-200 shadow-xs transition-all duration-200 hover:-translate-y-0.5 inline-block text-center cursor-pointer"
              >
                Find Your Dosha
              </a>
            </div>
          </div>
          
          <div className="flex justify-center relative">
            <div className="w-80 h-80 md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-white shadow-xl bg-brand-green-50 flex items-center justify-center animate-float">
              {/* SERENE ILLUSTRATION SIMULATION */}
              <div className="text-center p-8 space-y-6">
                <div className="flex justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Wind className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-stone-500 mt-2">Vata</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <Flame className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-stone-500 mt-2">Pitta</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-brand-green-600">
                      <Droplet className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-stone-500 mt-2">Kapha</span>
                  </div>
                </div>
                <div className="border-t border-brand-green-100 pt-6">
                  <h3 className="font-serif text-2xl text-brand-green-800">SomaVeda Sanctuary</h3>
                  <p className="text-stone-500 text-xs italic mt-1">Peaceful Healing & Natural Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-white border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-green-900">Understanding Ayurveda</h2>
            <div className="w-12 h-1 bg-brand-earth-600 mx-auto rounded-full" />
            <p className="text-stone-600">
              Ayurveda, the "Science of Life", teaches us that wellness is a dynamic state of harmony between our unique biological constitution (Prakriti) and the environment around us. We help you balance the three energies:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-8 border border-stone-200/50 bg-stone-50/50 hover:bg-stone-50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-700 mb-6">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-brand-green-900 mb-3">Vata Dosha</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Composed of **Air & Space**. Governs all bodily movements, blood flow, elimination, breathing, and neural impulses. When Vata is balanced, you are creative, vibrant, and enthusiastic.
              </p>
            </div>
            
            <div className="glass-card p-8 border border-stone-200/50 bg-stone-50/50 hover:bg-stone-50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-700 mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-brand-green-900 mb-3">Pitta Dosha</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Composed of **Fire & Water**. Governs digestion, metabolic transformation, thermal regulation, and mental focus. When Pitta is balanced, you possess leadership, intelligence, and sharp focus.
              </p>
            </div>

            <div className="glass-card p-8 border border-stone-200/50 bg-stone-50/50 hover:bg-stone-50 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-brand-green-700 mb-6">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif text-brand-green-900 mb-3">Kapha Dosha</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Composed of **Earth & Water**. Governs structural growth, fluid balance, skeletal protection, and lubrication. When Kapha is balanced, you exhibit loyalty, patience, compassion, and sound sleep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-20 bg-brand-earth-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif text-brand-green-900">Ayurvedic Treatments & Services</h2>
              <p className="text-stone-600 max-w-xl">
                Experience traditional restorative therapies prepared by our specialists using organic oils and custom-mixed herbal decoctions.
              </p>
            </div>
            <button 
              onClick={navigateToBooking}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-brand-green-800 hover:text-brand-green-950 font-semibold cursor-pointer"
            >
              <span>Book Appointment</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {initialTreatments.map((treatment) => (
              <div key={treatment.id} className="glass-card p-6 flex flex-col justify-between glass-card-hover bg-white">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-green-50 text-brand-green-800 border border-brand-green-100">
                      {treatment.category}
                    </span>
                    <span className="text-stone-500 text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {treatment.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-brand-green-900 mb-2">{treatment.name}</h3>
                  <p className="text-stone-600 text-sm mb-4 line-clamp-3">{treatment.description}</p>
                  
                  <div className="space-y-1.5 mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Key Benefits:</h4>
                    {treatment.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-stone-600 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-green-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block font-medium">Session Rate</span>
                    <span className="text-xl font-bold text-brand-earth-700">${treatment.price}</span>
                  </div>
                  <button 
                    onClick={navigateToBooking}
                    className="text-xs bg-brand-green-100 hover:bg-brand-green-200 text-brand-green-800 font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    Select & Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Dosha Quiz Section */}
      <section id="dosha-quiz" className="py-20 bg-white border-y border-stone-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-card border border-brand-green-200/40 bg-brand-green-50/30 p-8 md:p-12 rounded-3xl shadow-sm text-center relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-brand-earth-100/30 blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 rounded-full bg-brand-green-100/30 blur-2xl pointer-events-none" />

            {!quizStarted && !quizResult && (
              <div className="space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-brand-green-100 text-brand-green-800 flex items-center justify-center mx-auto shadow-sm">
                  <Compass className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-brand-green-900">What is Your Ayurvedic Dosha?</h2>
                <p className="text-stone-600 max-w-xl mx-auto">
                  Take our simple 4-question profile diagnostic to understand your primary energetic state (Prakriti) and discover personalized advice on herbs, diet, and treatments.
                </p>
                <button 
                  onClick={() => setQuizStarted(true)}
                  className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-medium px-8 py-3 rounded-xl shadow-md transition-colors inline-block cursor-pointer"
                >
                  Begin Diagnostic Quiz
                </button>
              </div>
            )}

            {quizStarted && !quizResult && (
              <div className="space-y-6 relative z-10 text-left">
                {/* Question progress */}
                <div className="flex items-center justify-between text-xs text-stone-400 font-semibold uppercase tracking-wider mb-2">
                  <span>Ayurvedic Constitution Quiz</span>
                  <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-6">
                  <div 
                    className="bg-brand-green-600 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-brand-green-900 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.key)}
                      className="w-full p-5 text-left rounded-xl border border-stone-200 bg-white hover:bg-brand-green-50/50 hover:border-brand-green-300 transition-all duration-200 flex gap-4 cursor-pointer group"
                    >
                      <span className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-brand-green-100 text-stone-600 group-hover:text-brand-green-800 font-bold flex items-center justify-center text-sm flex-shrink-0">
                        {option.key}
                      </span>
                      <span className="text-stone-700 leading-relaxed text-sm md:text-base">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizResult && (
              <div className="space-y-6 relative z-10 text-left">
                <div className="flex items-center justify-between border-b border-brand-green-100 pb-4 mb-4">
                  <div>
                    <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider block">Your Primary Dosha Result</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-brand-green-950 font-bold">{quizResult.name}</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-green-100 text-brand-green-800 flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-brand-green-800 mb-1 uppercase tracking-wider">Constitution Analysis</h4>
                      <p className="text-stone-600 text-sm leading-relaxed">{quizResult.description}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-brand-green-800 mb-1 uppercase tracking-wider">Suggested Diet & Lifestyle</h4>
                      <p className="text-stone-600 text-sm leading-relaxed">{quizResult.diet}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/80 rounded-xl border border-brand-green-100 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-brand-earth-700 uppercase tracking-wider mb-2">Recommended Treatments:</h4>
                      <ul className="space-y-1">
                        {quizResult.treatments.map((t, i) => (
                          <li key={i} className="text-xs text-stone-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green-500" />
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-brand-earth-700 uppercase tracking-wider mb-2">Recommended Herbs:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {quizResult.herbs.map((h, i) => (
                          <span key={i} className="px-2.5 py-1 bg-brand-green-50 text-brand-green-800 text-[10px] rounded-md font-semibold border border-brand-green-100">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-brand-green-100 justify-between items-center">
                  <button
                    onClick={resetQuiz}
                    className="text-stone-400 hover:text-stone-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={navigateToBooking}
                    className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Schedule Consult Based on Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Herbal Showcase */}
      <section className="py-20 bg-brand-earth-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-green-900">The Herbal Apothecary</h2>
            <div className="w-12 h-1 bg-brand-earth-600 mx-auto rounded-full" />
            <p className="text-stone-600">
              Browse our display of organic, wild-harvested single herbs and traditional compound formulations. Prepared according to classical Sanskrit pharmacopoeias.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {initialHerbs.slice(0, 3).map((herb) => (
              <div key={herb.id} className="glass-card p-6 flex flex-col justify-between bg-white border border-stone-200/50 glass-card-hover">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-earth-700 bg-brand-earth-50 px-2 py-1 rounded">
                      {herb.category}
                    </span>
                    <span className="text-xs text-stone-400 font-semibold">{herb.form}</span>
                  </div>
                  <h3 className="text-xl font-serif text-brand-green-900 mb-2">{herb.name}</h3>
                  <p className="text-stone-600 text-sm mb-4 leading-relaxed">{herb.description}</p>
                  
                  <div className="space-y-1.5 mb-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Primary Uses:</h4>
                    {herb.benefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-stone-600 text-xs">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-green-600" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-stone-800">${herb.price} <span className="text-xs text-stone-400 font-normal">/ bottle</span></span>
                  <span className="text-xs font-semibold text-brand-green-700 bg-brand-green-50 px-2 py-1 rounded-md">
                    In Stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info & Footer Section */}
      <footer className="bg-brand-green-900 text-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 border-b border-brand-green-800 pb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-white">SomaVeda</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Restoring physiological balance, longevity, and mental stillness through customized natural healing programs.
            </p>
            <p className="text-xs text-brand-earth-200">© 2026 SomaVeda Clinic. All rights reserved.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-white text-lg">Contact Info</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-earth-300" />
                <span>+1 (555) 766-8332</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-earth-300" />
                <span>consult@somaveda.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-earth-300 flex-shrink-0" />
                <span>842 Shanti Boulevard, Sanctuary Circle, CA 90210</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-white text-lg">Clinic Hours</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-white font-medium">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white font-medium">9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-amber-300 italic">Closed for Meditation</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif text-white text-lg">Quick Portals</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <button onClick={() => setView('patient')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 text-brand-earth-300" />
                Patient Portal Log In
              </button>
              <button onClick={() => setView('doctor')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 text-brand-earth-300" />
                Doctor / Practitioner Login
              </button>
              <button onClick={() => setView('admin')} className="text-left text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                <ArrowRight className="w-3.5 h-3.5 text-brand-earth-300" />
                Administrator Dashboard
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-wrap justify-between items-center text-xs text-stone-500">
          <p>Traditional diagnostic procedures do not replace emergency medical interventions. Take herbal medicines with supervision.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-stone-400">Privacy Policy</a>
            <a href="#" className="hover:text-stone-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
