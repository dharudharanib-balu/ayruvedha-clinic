import React, { useState } from 'react';
import { 
  Leaf, 
  User, 
  Settings, 
  ShieldAlert, 
  Stethoscope, 
  Menu, 
  X,
  Compass
} from 'lucide-react';
import LandingPage from './views/LandingPage';
import PatientPortal from './views/PatientPortal';
import DoctorPortal from './views/DoctorPortal';
import AdminDashboard from './views/AdminDashboard';
import { 
  initialTreatments, 
  initialHerbs, 
  initialDoctors, 
  initialPatients, 
  initialAppointments 
} from './data/mockData';

export default function App() {
  const [view, setView] = useState('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global State (shared across portals to simulate databases)
  const [appointments, setAppointments] = useState(initialAppointments);
  const [patients, setPatients] = useState(initialPatients);
  const [inventory, setInventory] = useState(initialHerbs);
  const [doctors] = useState(initialDoctors);
  const [treatments] = useState(initialTreatments);
  
  // Logged-in Simulation context
  const [loggedInPatientId, setLoggedInPatientId] = useState('pat_1');

  // Callback to update patient metrics (called in PatientPortal)
  const updatePatientMetrics = (patientId, metric, value) => {
    setPatients(prevPatients => prevPatients.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          healthMetrics: {
            ...p.healthMetrics,
            [metric]: value
          }
        };
      }
      return p;
    }));
  };

  const navigateToBooking = () => {
    setView('patient');
    // We can assume they want to book, so if PatientPortal handles tabs, it'll start in default or book.
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-earth-50">
      
      {/* Serene Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo & Branding */}
          <button 
            onClick={() => setView('landing')} 
            className="flex items-center gap-2 cursor-pointer group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-green-700 flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-12">
              <Leaf className="w-5 h-5 fill-white/10" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-brand-green-950 block">SomaVeda</span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest block">Ayurvedic Sanctuary</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => setView('landing')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${view === 'landing' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-500 hover:text-brand-green-755 hover:bg-stone-50'}`}
            >
              Public Site
            </button>
            
            <button
              onClick={() => setView('patient')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${view === 'patient' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-500 hover:text-brand-green-755 hover:bg-stone-50'}`}
            >
              <User className="w-4 h-4" />
              Patient Portal
            </button>

            <button
              onClick={() => setView('doctor')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${view === 'doctor' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-500 hover:text-brand-green-755 hover:bg-stone-50'}`}
            >
              <Stethoscope className="w-4 h-4" />
              Practitioner Panel
            </button>

            <button
              onClick={() => setView('admin')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${view === 'admin' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-500 hover:text-brand-green-755 hover:bg-stone-50'}`}
            >
              <Settings className="w-4 h-4" />
              Admin Operations
            </button>
          </div>

          {/* Desktop Right Action button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-6 w-px bg-stone-200" />
            <button
              onClick={navigateToBooking}
              className="bg-brand-green-700 hover:bg-brand-green-850 hover:bg-brand-green-800 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Schedule Consult
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-50 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-2 text-left animate-in fade-in slide-in-from-top-4 duration-200">
            <button
              onClick={() => { setView('landing'); setMobileMenuOpen(false); }}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${view === 'landing' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-650 hover:bg-stone-50'}`}
            >
              <Compass className="w-5 h-5" />
              Public Landing Page
            </button>
            <button
              onClick={() => { setView('patient'); setMobileMenuOpen(false); }}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${view === 'patient' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-650 hover:bg-stone-50'}`}
            >
              <User className="w-5 h-5" />
              Patient Portal
            </button>
            <button
              onClick={() => { setView('doctor'); setMobileMenuOpen(false); }}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${view === 'doctor' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-650 hover:bg-stone-50'}`}
            >
              <Stethoscope className="w-5 h-5" />
              Doctor Portal
            </button>
            <button
              onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center gap-3 ${view === 'admin' ? 'bg-brand-green-50 text-brand-green-800' : 'text-stone-650 hover:bg-stone-50'}`}
            >
              <Settings className="w-5 h-5" />
              Admin Operations
            </button>
            <div className="h-px bg-stone-100 my-2" />
            <button
              onClick={() => { navigateToBooking(); setMobileMenuOpen(false); }}
              className="w-full bg-brand-green-700 text-white font-semibold text-center py-3 rounded-xl shadow-xs block"
            >
              Book Consultation
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1">
        {view === 'landing' && (
          <LandingPage 
            setView={setView} 
            navigateToBooking={navigateToBooking} 
          />
        )}
        
        {view === 'patient' && (
          <PatientPortal 
            patients={patients} 
            loggedInPatientId={loggedInPatientId} 
            setLoggedInPatientId={setLoggedInPatientId} 
            appointments={appointments} 
            setAppointments={setAppointments} 
            doctors={doctors}
            treatments={treatments}
            updatePatientMetrics={updatePatientMetrics} 
          />
        )}
        
        {view === 'doctor' && (
          <DoctorPortal 
            doctors={doctors} 
            patients={patients} 
            setPatients={setPatients} 
            appointments={appointments} 
            setAppointments={setAppointments} 
            inventory={inventory} 
            setInventory={setInventory} 
          />
        )}
        
        {view === 'admin' && (
          <AdminDashboard 
            patients={patients} 
            appointments={appointments} 
            setAppointments={setAppointments} 
            inventory={inventory} 
            setInventory={setInventory} 
            doctors={doctors} 
          />
        )}
      </main>
    </div>
  );
}
