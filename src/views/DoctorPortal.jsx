import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  Search, 
  Clipboard, 
  PlusCircle, 
  CheckCircle, 
  Heart, 
  AlertCircle, 
  Activity, 
  Leaf, 
  Database 
} from 'lucide-react';

export default function DoctorPortal({ 
  doctors, 
  patients, 
  setPatients, 
  appointments, 
  setAppointments, 
  inventory, 
  setInventory 
}) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0].id);
  const [activeTab, setActiveTab] = useState('appointments');
  
  // Selected Patient for Consultation Form
  const [activeConsultationPatientId, setActiveConsultationPatientId] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  
  // Consultation Form States
  const [pulseReading, setPulseReading] = useState('');
  const [diagnosedImbalance, setDiagnosedImbalance] = useState('Vata Imbalance');
  const [treatmentNotes, setTreatmentNotes] = useState('');
  const [recommendedTreatments, setRecommendedTreatments] = useState([]);
  const [rxHerbs, setRxHerbs] = useState([{ name: '', dosage: '', timing: '' }]);
  
  const [consultationSuccess, setConsultationSuccess] = useState(false);

  // Find current doctor object
  const currentDoctor = doctors.find(d => d.id === selectedDoctorId);

  // Filter appointments for this doctor that are NOT completed
  const doctorAppointments = appointments.filter(apt => apt.doctorId === selectedDoctorId);

  const startConsultation = (apt) => {
    setActiveConsultationPatientId(apt.patientId);
    setSelectedAppointmentId(apt.id);
    setActiveTab('consult');
    
    // Clear form states
    setPulseReading('');
    setDiagnosedImbalance('Vata Imbalance');
    setTreatmentNotes('');
    setRecommendedTreatments([]);
    setRxHerbs([{ name: '', dosage: '', timing: '' }]);
  };

  const handleHerbChange = (index, field, value) => {
    const updated = [...rxHerbs];
    updated[index][field] = value;
    setRxHerbs(updated);
  };

  const addHerbField = () => {
    setRxHerbs([...rxHerbs, { name: '', dosage: '', timing: '' }]);
  };

  const removeHerbField = (index) => {
    const updated = rxHerbs.filter((_, i) => i !== index);
    setRxHerbs(updated.length ? updated : [{ name: '', dosage: '', timing: '' }]);
  };

  const toggleTreatmentSelection = (treatmentName) => {
    if (recommendedTreatments.includes(treatmentName)) {
      setRecommendedTreatments(recommendedTreatments.filter(t => t !== treatmentName));
    } else {
      setRecommendedTreatments([...recommendedTreatments, treatmentName]);
    }
  };

  const handleConsultationSubmit = (e) => {
    e.preventDefault();
    if (!activeConsultationPatientId) {
      alert("No patient selected for consultation.");
      return;
    }

    const patientObj = patients.find(p => p.id === activeConsultationPatientId);
    if (!patientObj) return;

    // 1. Process Prescription
    // Build prescription object
    const newRx = {
      date: new Date().toISOString().split('T')[0],
      doctorName: currentDoctor.name,
      notes: `Diagnosed Imbalance: ${diagnosedImbalance}. Pulse analysis: ${pulseReading}. Clinical Notes: ${treatmentNotes}`,
      herbs: rxHerbs.filter(h => h.name !== ''),
      treatments: recommendedTreatments
    };

    // Update patient record
    const updatedPatients = patients.map(p => {
      if (p.id === activeConsultationPatientId) {
        return {
          ...p,
          doshaType: diagnosedImbalance,
          prescriptions: [newRx, ...(p.prescriptions || [])],
          // Increase health metrics slightly simulated upon completion of a plan
          healthMetrics: {
            ...p.healthMetrics,
            energy: Math.min(100, p.healthMetrics.energy + 10),
            digestion: Math.min(100, p.healthMetrics.digestion + 10),
            stress: Math.max(0, p.healthMetrics.stress - 15)
          }
        };
      }
      return p;
    });
    setPatients(updatedPatients);

    // 2. Adjust Apothecary Stock
    // Decrease inventory for each prescribed herb
    const updatedInventory = inventory.map(item => {
      const rxItem = rxHerbs.find(h => h.name.toLowerCase() === item.name.toLowerCase());
      if (rxItem) {
        // Decrease by 1 bottle / box per prescription
        return {
          ...item,
          stock: Math.max(0, item.stock - 1)
        };
      }
      return item;
    });
    setInventory(updatedInventory);

    // 3. Mark Appointment as Completed in global state
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === selectedAppointmentId) {
        return { ...apt, status: 'Completed' };
      }
      return apt;
    });
    setAppointments(updatedAppointments);

    // Success State
    setConsultationSuccess(true);
    setTimeout(() => {
      setConsultationSuccess(false);
      setActiveTab('appointments');
      setActiveConsultationPatientId('');
      setSelectedAppointmentId('');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Portal Header & Doctor Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-stone-200/60 shadow-xs mb-8">
        <div>
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            SomaVeda Practitioner Terminal
          </span>
          <h1 className="text-3xl font-serif text-brand-green-950 mt-2">Consultation Dashboard</h1>
          <p className="text-stone-500 text-xs mt-1">Logged In: <strong>{currentDoctor.name}</strong> | Specialty: {currentDoctor.specialty}</p>
        </div>
        
        <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 p-2.5 rounded-xl">
          <UserCheck className="w-4 h-4 text-stone-400" />
          <label className="text-xs text-stone-500 font-semibold" htmlFor="doctor-select">Select Doctor Panel:</label>
          <select 
            id="doctor-select"
            value={selectedDoctorId} 
            onChange={(e) => {
              setSelectedDoctorId(e.target.value);
              setActiveTab('appointments');
              setActiveConsultationPatientId('');
            }}
            className="text-xs font-medium text-brand-green-900 focus:outline-none bg-transparent cursor-pointer"
          >
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.doshaExpertise})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {/* Navigation Sidebar & Stock Warning widget */}
        <div className="md:col-span-1 space-y-6">
          <div className="space-y-2">
            <button
              onClick={() => {
                setActiveTab('appointments');
                setActiveConsultationPatientId('');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'appointments' ? 'bg-brand-green-800 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              <Calendar className="w-5 h-5" />
              Doctor Schedule ({doctorAppointments.length})
            </button>
            
            <button
              onClick={() => {
                if (!activeConsultationPatientId) {
                  alert("Please click 'Consult' on a patient appointment in the Schedule tab to open the workspace.");
                  return;
                }
                setActiveTab('consult');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'consult' ? 'bg-brand-green-800 text-white shadow-xs' : 'text-stone-400 hover:bg-stone-50'}`}
              disabled={!activeConsultationPatientId}
            >
              <Clipboard className="w-5 h-5" />
              Active Consultation
            </button>
            
            <button
              onClick={() => {
                setActiveTab('patients');
                setActiveConsultationPatientId('');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${activeTab === 'patients' ? 'bg-brand-green-800 text-white shadow-xs' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              <Search className="w-5 h-5" />
              Patient Records
            </button>
          </div>

          {/* Real-time Apothecary stock checker */}
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
            <h3 className="text-xs font-semibold text-stone-450 uppercase tracking-wider mb-3 flex items-center gap-1.5 text-stone-500">
              <Leaf className="w-4 h-4 text-brand-green-700" />
              Apothecary Stocks
            </h3>
            <div className="space-y-2">
              {inventory.map(item => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <span className="text-stone-650 truncate max-w-[120px]">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-800">{item.stock}</span>
                    {item.stock < 10 ? (
                      <span className="px-1.5 py-0.5 bg-red-105 bg-red-100 text-red-750 text-[9px] font-bold rounded border border-red-200">
                        Low
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-green-50 text-green-755 text-[9px] font-medium rounded">
                        OK
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* main workspace content */}
        <div className="md:col-span-3 space-y-6">

          {/* TAB 1: SCHEDULE LIST */}
          {activeTab === 'appointments' && (
            <div className="glass-card p-6 bg-white border border-stone-200/50">
              <h2 className="text-2xl font-serif text-brand-green-950 mb-1">Your Schedule & Consultations</h2>
              <p className="text-xs text-stone-400 mb-6">Select a pending or confirmed patient below to launch the clinical diagnostic form.</p>

              {doctorAppointments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-stone-200 text-stone-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3">Patient</th>
                        <th className="pb-3">Therapy Requested</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Slot Time</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doctorAppointments.map((apt) => (
                        <tr key={apt.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                          <td className="py-4">
                            <strong className="text-brand-green-950 font-bold block">{apt.patientName}</strong>
                            <span className="text-[10px] text-stone-400">ID: {apt.patientId}</span>
                          </td>
                          <td className="py-4 text-stone-700">{apt.treatment}</td>
                          <td className="py-4 text-stone-500">{apt.date}</td>
                          <td className="py-4 text-stone-500">{apt.time}</td>
                          <td className="py-4">
                            <span className={`inline-block font-semibold px-2 py-0.5 rounded text-[10px] ${apt.status === 'Confirmed' ? 'bg-green-50 text-green-700 border border-green-200' : apt.status === 'Completed' ? 'bg-stone-100 text-stone-600 border border-stone-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {apt.status === 'Completed' ? (
                              <span className="text-xs text-stone-450 italic font-semibold text-stone-400">Completed</span>
                            ) : (
                              <button
                                onClick={() => startConsultation(apt)}
                                className="bg-brand-green-700 hover:bg-brand-green-800 text-white text-xs font-semibold py-1.5 px-4 rounded-lg shadow-xs transition-colors cursor-pointer"
                              >
                                Consult
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-stone-450 text-stone-400">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                  No patients scheduled for you today.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ACTIVE CONSULTATION FORM */}
          {activeTab === 'consult' && activeConsultationPatientId && (
            <div className="glass-card p-6 bg-white border border-stone-200/50">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-6">
                <div>
                  <h2 className="text-2xl font-serif text-brand-green-950">Patient Consultation Workspace</h2>
                  <p className="text-xs text-stone-400 mt-0.5">Diagnosing: <strong className="text-brand-green-900">{(patients.find(p => p.id === activeConsultationPatientId) || {}).name}</strong></p>
                </div>
                <Clipboard className="w-6 h-6 text-brand-green-700" />
              </div>

              {consultationSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl mb-6 flex items-center gap-3 text-sm animate-pulse">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>Consultation recorded. Patient chart updated. Deducted herb stocks...</span>
                </div>
              )}

              <form onSubmit={handleConsultationSubmit} className="space-y-6">
                
                {/* 1. Pulse diagnosis notes */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                    <Activity className="w-4 h-4 text-brand-green-755 text-brand-green-700" />
                    Nadi Pariksha (Pulse Reading Notes)
                  </h3>
                  <textarea 
                    rows="2"
                    value={pulseReading}
                    onChange={(e) => setPulseReading(e.target.value)}
                    placeholder="Describe character of the pulse (e.g. Cobra Vata pulse - fast, irregular; Frog Pitta pulse - jumping, hot; Swan Kapha pulse - slow, steady...)"
                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                    required
                  />
                </div>

                {/* 2. Dosha Imbalance Diagnostic */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 block" htmlFor="diagnosed-imbalance">Dosha Imbalance Diagnostic:</label>
                    <select 
                      id="diagnosed-imbalance"
                      value={diagnosedImbalance}
                      onChange={(e) => setDiagnosedImbalance(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-semibold text-brand-green-950"
                    >
                      <option value="Vata-dominant">Vata Aggravated</option>
                      <option value="Pitta-dominant">Pitta Aggravated</option>
                      <option value="Kapha-dominant">Kapha Aggravated</option>
                      <option value="Vata-Pitta">Vata-Pitta Imbalance</option>
                      <option value="Pitta-Kapha">Pitta-Kapha Imbalance</option>
                      <option value="Vata-Kapha">Vata-Kapha Imbalance</option>
                      <option value="Tridoshic (Balanced)">Tridoshic (Balanced)</option>
                    </select>
                  </div>

                  {/* Consultation Notes */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-500 block" htmlFor="dietary-notes">Dietary & Daily Routine Guidelines (Dinacharya):</label>
                    <input 
                      type="text"
                      id="dietary-notes"
                      value={treatmentNotes}
                      onChange={(e) => setTreatmentNotes(e.target.value)}
                      placeholder="e.g. strict avoidance of dairy, increase solar digestion walk..."
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                      required
                    />
                  </div>
                </div>

                {/* 3. Clinical Therapies */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-500 block">Prescribe Rehabilitation Treatments / Therapies:</label>
                  <div className="flex flex-wrap gap-2.5">
                    {['Panchakarma Detoxification', 'Shirodhara Therapy', 'Abhyanga Massage', 'Nasya Therapy', 'Elakizhi Bolus Therapy'].map((tName) => {
                      const isSelected = recommendedTreatments.includes(tName);
                      return (
                        <button
                          key={tName}
                          type="button"
                          onClick={() => toggleTreatmentSelection(tName)}
                          className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer font-medium ${isSelected ? 'bg-brand-earth-100 text-brand-earth-800 border-brand-earth-300' : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'}`}
                        >
                          {tName}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Herbal medicine Rx */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-t border-stone-100 pt-4">
                    <label className="text-xs font-semibold text-stone-500 block">Herbal Apothecary Formulation Prescription (Rx):</label>
                    <button
                      type="button"
                      onClick={addHerbField}
                      className="text-xs font-bold text-brand-green-700 hover:text-brand-green-900 cursor-pointer flex items-center gap-1"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Herb
                    </button>
                  </div>

                  <div className="space-y-3">
                    {rxHerbs.map((hRecord, index) => (
                      <div key={index} className="grid md:grid-cols-4 gap-4 items-center bg-stone-50 p-4 rounded-xl border border-stone-200">
                        {/* Herb Selection */}
                        <div className="md:col-span-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Herb Name</label>
                          <select
                            value={hRecord.name}
                            onChange={(e) => handleHerbChange(index, 'name', e.target.value)}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                            required
                          >
                            <option value="">-- Select Herb --</option>
                            {inventory.map(item => (
                              <option key={item.id} value={item.name} disabled={item.stock === 0}>
                                {item.name} (Stock: {item.stock})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Dosage */}
                        <div className="md:col-span-1">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Dosage Form</label>
                          <input
                            type="text"
                            value={hRecord.dosage}
                            onChange={(e) => handleHerbChange(index, 'dosage', e.target.value)}
                            placeholder="e.g. 1 Capsule, 1/2 tsp"
                            className="w-full p-2 rounded-lg border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                            required
                          />
                        </div>

                        {/* Timing */}
                        <div className="md:col-span-1.5 flex gap-2 items-center">
                          <div className="flex-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">Dosing Timing</label>
                            <input
                              type="text"
                              value={hRecord.timing}
                              onChange={(e) => handleHerbChange(index, 'timing', e.target.value)}
                              placeholder="e.g. Before sleep with warm milk"
                              className="w-full p-2 rounded-lg border border-stone-200 focus:outline-none focus:border-brand-green-600 bg-white text-xs font-medium"
                              required
                            />
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => removeHerbField(index)}
                            className="text-red-500 hover:text-red-700 cursor-pointer pt-4 font-bold text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('appointments');
                      setActiveConsultationPatientId('');
                    }}
                    className="px-6 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-semibold px-8 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer text-xs"
                  >
                    Complete Consultation & Prescribe
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB 3: PATIENT RECORDS */}
          {activeTab === 'patients' && (
            <div className="glass-card p-6 bg-white border border-stone-200/50">
              <h2 className="text-2xl font-serif text-brand-green-950 mb-1">Clinical Patient History</h2>
              <p className="text-xs text-stone-400 mb-6 font-medium">Verify primary health metrics and previous prescriptions of clinical records.</p>
              
              <div className="space-y-6">
                {patients.map(p => (
                  <div key={p.id} className="border border-stone-200 p-5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                      <div>
                        <h3 className="font-serif text-lg text-brand-green-950 font-bold">{p.name}</h3>
                        <p className="text-xs text-stone-400">ID: {p.id} | Age: {p.age} | Contact: {p.contact} | Email: {p.email}</p>
                      </div>
                      <span className="text-xs font-bold text-brand-earth-700 bg-brand-earth-50 border border-brand-earth-100 px-2 py-0.5 rounded">
                        Constitution: {p.doshaType}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-xs text-stone-600">
                      <div>
                        <strong className="block mb-1 text-stone-400 uppercase tracking-wider text-[10px]">Primary Complaint Summary:</strong>
                        <p className="leading-relaxed bg-stone-50 p-2.5 rounded-lg border border-stone-100">{p.complaints}</p>
                      </div>
                      <div>
                        <strong className="block mb-1 text-stone-400 uppercase tracking-wider text-[10px]">Patient Vitality Levels:</strong>
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold mt-1.5">
                          <div>Prana (Energy): <strong className="text-brand-green-800">{p.healthMetrics.energy}%</strong></div>
                          <div>Agni (Digestion): <strong className="text-brand-green-800">{p.healthMetrics.digestion}%</strong></div>
                          <div>Nidra (Sleep): <strong className="text-brand-green-800">{p.healthMetrics.sleep}%</strong></div>
                          <div>Manas (Stress): <strong className="text-amber-700">{p.healthMetrics.stress}%</strong></div>
                        </div>
                      </div>
                    </div>

                    {p.prescriptions && p.prescriptions.length > 0 && (
                      <div className="space-y-2">
                        <strong className="block text-stone-400 uppercase tracking-wider text-[10px] mb-1">Previous Prescriptions Logs:</strong>
                        {p.prescriptions.map((rx, rxIdx) => (
                          <div key={rxIdx} className="bg-stone-50/50 p-3 rounded-lg border border-stone-200 text-xs space-y-2">
                            <div className="flex justify-between font-bold text-brand-green-950 text-[11px]">
                              <span>By {rx.doctorName}</span>
                              <span className="text-stone-400">{rx.date}</span>
                            </div>
                            <p className="text-[11px] text-stone-600 leading-relaxed italic">{rx.notes}</p>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {rx.herbs.map((h, hIdx) => (
                                <span key={hIdx} className="px-2 py-0.5 bg-brand-green-50 text-brand-green-800 rounded font-semibold text-[10px]">
                                  {h.name} ({h.dosage})
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
