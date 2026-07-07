import React, { useState } from 'react';
import { 
  Calendar, 
  Activity, 
  Leaf, 
  BookOpen, 
  FileText, 
  PlusCircle, 
  User, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

export default function PatientPortal({ 
  patients, 
  loggedInPatientId, 
  setLoggedInPatientId, 
  appointments, 
  setAppointments, 
  doctors, 
  treatments,
  updatePatientMetrics 
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Find the currently logged-in patient
  const patient = patients.find(p => p.id === loggedInPatientId) || patients[0];

  // Get active patient's appointments
  const myAppointments = appointments.filter(apt => apt.patientId === patient.id);

  // Health Metrics Slider handlers
  const handleMetricChange = (metric, value) => {
    updatePatientMetrics(patient.id, metric, parseInt(value));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedTime || !selectedTreatment) {
      alert("Please fill in all booking fields.");
      return;
    }

    const doctorObj = doctors.find(d => d.id === selectedDoctor);
    
    const newApt = {
      id: `apt_${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      doctorId: selectedDoctor,
      doctorName: doctorObj ? doctorObj.name : "Ayurvedic Specialist",
      date: selectedDate,
      time: selectedTime,
      treatment: selectedTreatment,
      complaint: complaintText,
      status: "Pending" // Starts as pending, Admin approves
    };

    setAppointments([newApt, ...appointments]);
    setBookingSuccess(true);
    
    // Reset form
    setSelectedDoctor('');
    setSelectedTreatment('');
    setSelectedDate('');
    setSelectedTime('');
    setComplaintText('');

    setTimeout(() => {
      setBookingSuccess(false);
      setActiveTab('appointments');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Portal Header & Quick Patient Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-xs mb-8">
        <div>
          <span className="text-xs font-semibold text-brand-green-700 uppercase tracking-wider bg-brand-green-50 px-2.5 py-1 rounded-md border border-brand-green-100">
            SomaVeda Patient Portal
          </span>
          <h1 className="text-3xl font-serif text-brand-green-950 mt-2">Welcome Back, {patient.name}</h1>
          <p className="text-stone-500 text-xs mt-1">Patient ID: {patient.id} | Age: {patient.age} | Constitution: <strong className="text-brand-earth-700">{patient.doshaType}</strong></p>
        </div>
        
        <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
          <User className="w-4 h-4 text-stone-400" />
          <label className="text-xs text-stone-500 font-semibold" htmlFor="patient-select">Simulate Patient:</label>
          <select 
            id="patient-select"
            value={loggedInPatientId} 
            onChange={(e) => setLoggedInPatientId(e.target.value)}
            className="text-xs font-medium text-brand-green-900 focus:outline-none bg-transparent cursor-pointer"
          >
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.doshaType})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="md:col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'dashboard' ? 'bg-brand-green-800 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'}`}
          >
            <Activity className="w-5 h-5" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'prescriptions' ? 'bg-brand-green-800 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'}`}
          >
            <FileText className="w-5 h-5" />
            My Treatment Plan
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'appointments' ? 'bg-brand-green-800 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'}`}
          >
            <Calendar className="w-5 h-5" />
            Appointments ({myAppointments.length})
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'book' ? 'bg-brand-green-800 text-white shadow-xs animate-pulse' : 'text-brand-green-800 bg-brand-green-50 hover:bg-brand-green-100 border border-brand-green-200'}`}
          >
            <PlusCircle className="w-5 h-5" />
            Book Ayurvedic Consult
          </button>

          <button
            onClick={() => setActiveTab('dinacharya')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'dinacharya' ? 'bg-brand-green-800 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'}`}
          >
            <BookOpen className="w-5 h-5" />
            Daily Dinacharya Guide
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 space-y-6">
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Health Metrics & Slider Logger */}
              <div className="glass-card p-6 bg-white border border-stone-200/50">
                <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
                  <div>
                    <h2 className="text-xl font-serif text-brand-green-950">Daily Ayurvedic Tracker</h2>
                    <p className="text-xs text-stone-500 mt-0.5">Tune in to your body and update your current wellness sliders.</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-brand-green-600" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Energy slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-stone-600">Prana / Physical Energy</span>
                      <span className="font-bold text-brand-green-800">{patient.healthMetrics.energy}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={patient.healthMetrics.energy} 
                      onChange={(e) => handleMetricChange('energy', e.target.value)}
                      className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-brand-green-600"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>Sluggish / Heavy</span>
                      <span>Balanced Prana</span>
                    </div>
                  </div>

                  {/* Digestion slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-stone-600">Agni / Digestive Fire</span>
                      <span className="font-bold text-brand-green-800">{patient.healthMetrics.digestion}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={patient.healthMetrics.digestion} 
                      onChange={(e) => handleMetricChange('digestion', e.target.value)}
                      className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-brand-green-600"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>Bloated / Indigested</span>
                      <span>Strong Absorption</span>
                    </div>
                  </div>

                  {/* Sleep slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-stone-600">Nidra / Sleep Restfulness</span>
                      <span className="font-bold text-brand-green-800">{patient.healthMetrics.sleep}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={patient.healthMetrics.sleep} 
                      onChange={(e) => handleMetricChange('sleep', e.target.value)}
                      className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-brand-green-600"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>Restless Mind / Insomnia</span>
                      <span>Deep Rejuvenation</span>
                    </div>
                  </div>

                  {/* Stress slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-stone-600">Manas / Mental Stress</span>
                      <span className="font-bold text-brand-earth-750 text-amber-700">{patient.healthMetrics.stress}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={patient.healthMetrics.stress} 
                      onChange={(e) => handleMetricChange('stress', e.target.value)}
                      className="w-full h-2 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400">
                      <span>Calm & Centered</span>
                      <span>Overwhelmed / Hyperactive</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Status Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Active treatments & herb prescription brief */}
                <div className="glass-card p-6 bg-white border border-stone-200/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif text-brand-green-950 mb-3 flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-brand-green-600" />
                      Active Remedies
                    </h3>
                    {patient.prescriptions && patient.prescriptions.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-stone-500 text-xs italic">Prescribed by {patient.prescriptions[0].doctorName} on {patient.prescriptions[0].date}:</p>
                        <div className="flex flex-wrap gap-2">
                          {patient.prescriptions[0].herbs.map((h, i) => (
                            <span key={i} className="px-2.5 py-1 bg-brand-green-50 text-brand-green-800 text-xs rounded-md border border-brand-green-100 font-medium">
                              {h.name} ({h.dosage})
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-stone-600">
                          <strong>Treatments:</strong> {patient.prescriptions[0].treatments.join(", ")}
                        </div>
                      </div>
                    ) : (
                      <p className="text-stone-500 text-sm">No current herbal prescription active. Schedule a consult.</p>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab('prescriptions')}
                    className="text-xs font-semibold text-brand-green-800 hover:text-brand-green-950 mt-4 flex items-center gap-1 cursor-pointer"
                  >
                    View detailed dosing guidelines &rarr;
                  </button>
                </div>

                {/* Upcoming appointment brief */}
                <div className="glass-card p-6 bg-white border border-stone-200/50 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-serif text-brand-green-950 mb-3 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-brand-green-600" />
                      Next Appointment
                    </h3>
                    
                    {myAppointments.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-brand-green-600" />
                          <span className="font-semibold">{myAppointments[0].treatment}</span>
                        </div>
                        <p className="text-xs text-stone-600">{myAppointments[0].doctorName}</p>
                        <div className="text-xs text-stone-500 font-medium bg-stone-50 border border-stone-200/80 p-2 rounded-lg inline-block">
                          {myAppointments[0].date} @ {myAppointments[0].time}
                        </div>
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border mt-2 ${myAppointments[0].status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {myAppointments[0].status}
                        </span>
                      </div>
                    ) : (
                      <p className="text-stone-500 text-sm">No scheduled visits. Book a diagnostic checkup.</p>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab(myAppointments.length > 0 ? 'appointments' : 'book')}
                    className="text-xs font-semibold text-brand-green-800 hover:text-brand-green-950 mt-4 flex items-center gap-1 cursor-pointer"
                  >
                    {myAppointments.length > 0 ? 'Manage all appointments' : 'Book first session'} &rarr;
                  </button>
                </div>

              </div>
              
              {/* Serene informational tip */}
              <div className="bg-brand-green-50/70 border border-brand-green-100 p-5 rounded-2xl flex items-start gap-4">
                <Leaf className="w-5 h-5 text-brand-green-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-brand-green-950">Ayurvedic Insight: Maintaining Agni</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    According to your constitution, raw food weakens the digestive fire (Agni) causing dry skin and stress. Focus on sipping warm warm water throughout the day, and use digestive spices like ginger, cumin, and cardamom.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRESCRIPTIONS & DETAILED TREATMENT PLAN */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              <div className="glass-card p-6 bg-white border border-stone-200/50">
                <h2 className="text-2xl font-serif text-brand-green-950 mb-1">Your Rejuvenation Plan (Rasayana)</h2>
                <p className="text-xs text-stone-400 mb-6">Herbal medicine and specific clinical therapies prescribed by clinic practitioners.</p>
                
                {patient.prescriptions && patient.prescriptions.length > 0 ? (
                  <div className="space-y-8">
                    {patient.prescriptions.map((rx, idx) => (
                      <div key={idx} className="border-l-4 border-brand-green-600 pl-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-brand-green-900 text-sm">Consultation with {rx.doctorName}</h3>
                            <span className="text-[10px] font-bold text-stone-400">{rx.date}</span>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-600 text-xs leading-relaxed">
                          <strong>Doctor's Constitutional Notes:</strong> <br />
                          {rx.notes}
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Prescribed Apothecary Items:</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {rx.herbs.map((h, i) => (
                              <div key={i} className="bg-white p-3 rounded-lg border border-stone-200 flex items-start gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-brand-green-500 flex-shrink-0 mt-1" />
                                <div className="text-xs">
                                  <strong className="text-brand-green-950 font-bold block">{h.name}</strong>
                                  <span className="text-stone-500 font-medium block">Dosage: {h.dosage}</span>
                                  <span className="text-stone-400 italic block">Timing: {h.timing}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Rehabilitation Treatments:</h4>
                          <div className="flex flex-wrap gap-2">
                            {rx.treatments.map((t, i) => (
                              <span key={i} className="px-3 py-1 bg-brand-earth-100 text-brand-earth-800 rounded-lg text-xs font-medium border border-brand-earth-200/50">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-stone-400 text-sm">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                    No prescriptions found. Please book an initial consult to establish your routine.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MY APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="glass-card p-6 bg-white border border-stone-200/50">
              <h2 className="text-2xl font-serif text-brand-green-950 mb-1">Appointment Schedule</h2>
              <p className="text-xs text-stone-400 mb-6">Manage confirmed, completed, or upcoming clinical treatment sessions.</p>

              {myAppointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3">Therapy / Treatment</th>
                        <th className="pb-3">Practitioner</th>
                        <th className="pb-3">Scheduled Date</th>
                        <th className="pb-3">Slot Time</th>
                        <th className="pb-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAppointments.map((apt) => (
                        <tr key={apt.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                          <td className="py-4 font-bold text-brand-green-950">{apt.treatment}</td>
                          <td className="py-4 text-stone-600">{apt.doctorName}</td>
                          <td className="py-4 text-stone-500">{apt.date}</td>
                          <td className="py-4 text-stone-500">{apt.time}</td>
                          <td className="py-4 text-right">
                            <span className={`inline-block font-semibold px-2 py-1 rounded text-[10px] ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : apt.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-650'}`}>
                              {apt.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-stone-400 text-sm">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                  No appointment logs on file.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: BOOK CONSULTATION */}
          {activeTab === 'book' && (
            <div className="glass-card p-6 bg-white border border-stone-200/50">
              <h2 className="text-2xl font-serif text-brand-green-950 mb-1">Book Ayurvedic Consultation</h2>
              <p className="text-xs text-stone-400 mb-6">Select your doctor, traditional therapy, and select an open hours slot.</p>
              
              {bookingSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm animate-pulse">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Success! Your appointment has been booked. Redirecting to schedule...</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Select Treatment */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 block" htmlFor="treatment-select">Select Therapy / Treatment:</label>
                    <select 
                      id="treatment-select"
                      value={selectedTreatment}
                      onChange={(e) => setSelectedTreatment(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                    >
                      <option value="">-- Choose Ayurvedic Therapy --</option>
                      <option value="Initial Nadi Consultation">Initial Nadi Consultation (Pulse Diagnostic)</option>
                      {treatments.map(t => (
                        <option key={t.id} value={t.name}>{t.name} (${t.price} | {t.duration})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Doctor */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 block" htmlFor="doctor-select">Choose Ayurvedic Practitioner:</label>
                    <select 
                      id="doctor-select"
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                    >
                      <option value="">-- Select Specialist --</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 block" htmlFor="date-input">Appointment Date:</label>
                    <input 
                      type="date"
                      id="date-input"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min="2026-07-06"
                      max="2026-08-01"
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                    />
                  </div>

                  {/* Select Time Slot */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 block" htmlFor="time-select">Available Time Slot:</label>
                    <select 
                      id="time-select"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                    >
                      <option value="">-- Choose Slot --</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:30 PM">03:30 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Complaint Text */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-500 block" htmlFor="complaint-textarea">Primary Physical Complaints / Symptoms:</label>
                  <textarea 
                    id="complaint-textarea"
                    rows="4"
                    value={complaintText}
                    onChange={(e) => setComplaintText(e.target.value)}
                    placeholder="Describe how you are feeling (e.g. skin dryness, insomnia, acid reflux, weak energy levels...)"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold py-3 px-8 rounded-xl shadow-xs transition-colors cursor-pointer text-xs"
                  >
                    Confirm Appointment Request
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: DINACHARYA GUIDE */}
          {activeTab === 'dinacharya' && (
            <div className="glass-card p-6 bg-white border border-stone-200/50 space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-brand-green-950">Daily Ayurvedic Routine (Dinacharya)</h2>
                <p className="text-xs text-stone-400">Establish a rhythmic daily conduct to stabilize Vata, Pitta, and Kapha energies.</p>
              </div>

              <div className="relative border-l border-brand-green-100 ml-4 space-y-8">
                {/* Morning routine */}
                <div className="relative pl-8">
                  <div className="absolute left-[-10px] top-0.5 w-5 h-5 rounded-full bg-brand-green-100 border-2 border-brand-green-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green-700" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-earth-700 uppercase tracking-wider block">Brahma Muhurta (05:00 AM - 06:00 AM)</span>
                  <h3 className="font-serif text-base text-brand-green-950 font-semibold mt-1">Wake & Purify Sensory Channels</h3>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                    Awake before sunrise when the atmosphere is rich in pure energy (Prana). Immediately scrape your tongue (Jihwa Nirlekhana) to remove Ama toxins and splash cool water on eyes. Sip a cup of warm water.
                  </p>
                </div>

                {/* Self massage */}
                <div className="relative pl-8">
                  <div className="absolute left-[-10px] top-0.5 w-5 h-5 rounded-full bg-brand-green-100 border-2 border-brand-green-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green-700" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-earth-700 uppercase tracking-wider block">Morning Self Massage (06:30 AM)</span>
                  <h3 className="font-serif text-base text-brand-green-950 font-semibold mt-1">Abhyanga Oil & Light Exercise</h3>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                    Apply warm organic sesame oil (for Vata) or coconut oil (for Pitta) to your skin. Massage downwards on limbs and circularly on joints. Rest for 15 minutes, then rinse in a warm shower. Practice 10 minutes of Pranayama (alternate nostril breathing).
                  </p>
                </div>

                {/* Solar Noon */}
                <div className="relative pl-8">
                  <div className="absolute left-[-10px] top-0.5 w-5 h-5 rounded-full bg-brand-green-100 border-2 border-brand-green-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green-700" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-earth-700 uppercase tracking-wider block">Solar Peak (12:00 PM - 01:00 PM)</span>
                  <h3 className="font-serif text-base text-brand-green-950 font-semibold mt-1">Principal Meal of the Day</h3>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                    Eat your heaviest meal when the sun is at its highest, as your digestive fire (Agni) mirrors the sun's intensity. Sit quietly for 5 minutes after eating. Avoid cold ice water during digestion.
                  </p>
                </div>

                {/* Evening Rest */}
                <div className="relative pl-8">
                  <div className="absolute left-[-10px] top-0.5 w-5 h-5 rounded-full bg-brand-green-100 border-2 border-brand-green-700 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green-700" />
                  </div>
                  <span className="text-[10px] font-bold text-brand-earth-700 uppercase tracking-wider block">Sunset / Sleep Preparation (09:00 PM - 10:00 PM)</span>
                  <h3 className="font-serif text-base text-brand-green-950 font-semibold mt-1">Unwind & Early Sleep</h3>
                  <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                    Avoid digital screens. Drink warm spiced milk (nutmeg and cardamom for Vata/sleep). Retire to bed by 10:00 PM when Kapha energy is naturally building, facilitating deep restorative sleep.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
