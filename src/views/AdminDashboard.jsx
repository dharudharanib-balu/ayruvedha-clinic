import React, { useState } from 'react';
import { 
  BarChart, 
  Users, 
  Calendar, 
  Leaf, 
  DollarSign, 
  PlusCircle, 
  ArrowUpRight, 
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  XCircle,
  TrendingUp,
  Settings
} from 'lucide-react';

export default function AdminDashboard({ 
  patients, 
  appointments, 
  setAppointments, 
  inventory, 
  setInventory, 
  doctors 
}) {
  const [activeSubTab, setActiveSubTab] = useState('appointments');
  const [priceEditingHerbId, setPriceEditingHerbId] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  // 1. Calculations for Stats
  const totalAppointments = appointments.length;
  const activePatientsCount = patients.length;
  
  // Calculate Revenue (Confirmed & Completed appointments sum of treatment prices)
  const confirmedAndCompleted = appointments.filter(apt => apt.status === 'Confirmed' || apt.status === 'Completed');
  const estimatedRevenue = confirmedAndCompleted.reduce((sum, apt) => {
    // Find matching treatment in descriptions to get cost, fallback to $80
    // Shirodhara is 95, Panchakarma is 150, Abhyanga is 80, Nasya is 60, Elakizhi is 110
    let cost = 80;
    if (apt.treatment.includes("Panchakarma")) cost = 150;
    else if (apt.treatment.includes("Shirodhara")) cost = 95;
    else if (apt.treatment.includes("Abhyanga")) cost = 80;
    else if (apt.treatment.includes("Nasya")) cost = 60;
    else if (apt.treatment.includes("Elakizhi")) cost = 110;
    return sum + cost;
  }, 0);

  const lowStockCount = inventory.filter(item => item.stock < 10).length;

  // 2. Appointment Actions
  const updateAppointmentStatus = (id, newStatus) => {
    const updated = appointments.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: newStatus };
      }
      return apt;
    });
    setAppointments(updated);
  };

  // 3. Inventory Restock
  const restockHerb = (id) => {
    const updated = inventory.map(item => {
      if (item.id === id) {
        return { ...item, stock: item.stock + 30 }; // Adds 30 bottles to stock
      }
      return item;
    });
    setInventory(updated);
  };

  const handlePriceUpdate = (id) => {
    if (!newPrice || isNaN(newPrice) || parseFloat(newPrice) <= 0) {
      alert("Please enter a valid price.");
      return;
    }
    const updated = inventory.map(item => {
      if (item.id === id) {
        return { ...item, price: parseFloat(newPrice) };
      }
      return item;
    });
    setInventory(updated);
    setPriceEditingHerbId(null);
    setNewPrice('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      
      {/* Admin Title */}
      <div>
        <span className="text-xs font-semibold text-brand-green-800 uppercase tracking-wider bg-brand-green-50 px-2.5 py-1 rounded-md border border-brand-green-150">
          Clinic Administrator Console
        </span>
        <h1 className="text-3xl font-serif text-brand-green-950 mt-2">Clinic Operations Control</h1>
        <p className="text-stone-500 text-xs mt-1">Review live metrics, schedule approvals, and manage the herbal apothecary supply.</p>
      </div>

      {/* Analytics stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <div className="glass-card p-5 bg-white border border-stone-200/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-green-50 text-brand-green-850 flex items-center justify-center text-brand-green-800">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-400 font-semibold block">Total Appointments</span>
            <span className="text-2xl font-bold text-stone-800">{totalAppointments}</span>
          </div>
        </div>

        {/* Active Patients */}
        <div className="glass-card p-5 bg-white border border-stone-200/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-green-50 text-brand-green-850 flex items-center justify-center text-brand-green-800">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-400 font-semibold block">Registered Patients</span>
            <span className="text-2xl font-bold text-stone-800">{activePatientsCount}</span>
          </div>
        </div>

        {/* Estimated Revenue */}
        <div className="glass-card p-5 bg-white border border-stone-200/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-green-50 text-brand-green-850 flex items-center justify-center text-brand-green-850 text-brand-green-800">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-stone-400 font-semibold block">Confirmed Revenue</span>
            <span className="text-2xl font-bold text-stone-800">${estimatedRevenue}</span>
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="glass-card p-5 bg-white border border-stone-200/50 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lowStockCount > 0 ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-brand-green-50 text-brand-green-800'}`}>
            {lowStockCount > 0 ? <AlertTriangle className="w-6 h-6" /> : <Leaf className="w-6 h-6" />}
          </div>
          <div>
            <span className="text-xs text-stone-400 font-semibold block">Apothecary Warnings</span>
            <span className={`text-2xl font-bold ${lowStockCount > 0 ? 'text-amber-700' : 'text-stone-800'}`}>{lowStockCount} Low Herbs</span>
          </div>
        </div>
      </div>

      {/* Admin Tab Controls */}
      <div className="border-b border-stone-200 flex gap-6">
        <button
          onClick={() => setActiveSubTab('appointments')}
          className={`pb-3 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ${activeSubTab === 'appointments' ? 'border-b-2 border-brand-green-850 text-brand-green-950 font-bold border-brand-green-800' : 'text-stone-450 hover:text-stone-700 text-stone-500'}`}
        >
          Master Schedule
        </button>
        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`pb-3 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ${activeSubTab === 'inventory' ? 'border-b-2 border-brand-green-850 text-brand-green-950 font-bold border-brand-green-800' : 'text-stone-450 hover:text-stone-700 text-stone-500'}`}
        >
          Apothecary Inventory
        </button>
        <button
          onClick={() => setActiveSubTab('practitioners')}
          className={`pb-3 font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ${activeSubTab === 'practitioners' ? 'border-b-2 border-brand-green-850 text-brand-green-950 font-bold border-brand-green-800' : 'text-stone-450 hover:text-stone-700 text-stone-500'}`}
        >
          Practitioners Schedule
        </button>
      </div>

      {/* TAB 1: MASTER SCHEDULE */}
      {activeSubTab === 'appointments' && (
        <div className="glass-card p-6 bg-white border border-stone-200/50">
          <h2 className="text-xl font-serif text-brand-green-950 mb-4">Clinic Consultations Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Patient Name</th>
                  <th className="pb-3">Assigned Practitioner</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Therapy / Remedy</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                    <td className="py-4 font-bold text-brand-green-950">{apt.patientName}</td>
                    <td className="py-4 text-stone-600 font-medium">{apt.doctorName}</td>
                    <td className="py-4 text-stone-550 text-stone-500">{apt.date}</td>
                    <td className="py-4 text-stone-550 text-stone-500">{apt.time}</td>
                    <td className="py-4 text-stone-600 font-medium">{apt.treatment}</td>
                    <td className="py-4">
                      <span className={`inline-block font-bold px-2 py-0.5 rounded border text-[10px] ${apt.status === 'Confirmed' ? 'bg-green-50 text-green-700 border-green-200' : apt.status === 'Completed' ? 'bg-stone-50 text-stone-550 border-stone-200 text-stone-500' : apt.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-4 text-right flex gap-1 justify-end">
                      {apt.status === 'Pending' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                          className="p-1 rounded hover:bg-green-50 text-green-600 cursor-pointer"
                          title="Confirm Appointment"
                        >
                          <CheckCircle className="w-5 h-5" />
                        </button>
                      )}
                      {(apt.status === 'Confirmed' || apt.status === 'Pending') && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                          className="p-1 rounded hover:bg-red-50 text-red-600 cursor-pointer"
                          title="Cancel Session"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                      {apt.status === 'Confirmed' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                          className="bg-brand-green-100 hover:bg-brand-green-200 text-brand-green-800 font-semibold px-2 py-1 rounded text-[10px] cursor-pointer"
                          title="Mark Completed"
                        >
                          Complete
                        </button>
                      )}
                      {(apt.status === 'Completed' || apt.status === 'Cancelled') && (
                        <span className="text-[10px] text-stone-400 font-medium italic pr-2">Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: APOTHECARY INVENTORY */}
      {activeSubTab === 'inventory' && (
        <div className="glass-card p-6 bg-white border border-stone-200/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif text-brand-green-950">Apothecary Pharmacy Stock</h2>
            <span className="text-xs text-stone-400 font-medium">Reorder levels trigger alert badges. Restock increases inventory immediately.</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3">Herb Formula</th>
                  <th className="pb-3">Therapeutic Class</th>
                  <th className="pb-3">Preparation Form</th>
                  <th className="pb-3">Price / Bottle</th>
                  <th className="pb-3">Current Stock</th>
                  <th className="pb-3">Stock Level</th>
                  <th className="pb-3 text-right">Inventory Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                    <td className="py-4 font-bold text-brand-green-950">{item.name}</td>
                    <td className="py-4 text-stone-600">{item.category}</td>
                    <td className="py-4 text-stone-500 font-medium">{item.form}</td>
                    <td className="py-4">
                      {priceEditingHerbId === item.id ? (
                        <div className="flex items-center gap-1.5">
                          <input 
                            type="number"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            className="w-14 p-1 text-xs border border-stone-300 rounded focus:outline-none focus:border-brand-green-600"
                            placeholder="Price"
                          />
                          <button
                            onClick={() => handlePriceUpdate(item.id)}
                            className="bg-brand-green-700 hover:bg-brand-green-800 text-white px-2 py-0.5 text-[10px] rounded cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setPriceEditingHerbId(null)}
                            className="text-stone-400 text-[10px] cursor-pointer"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 group">
                          <span className="font-semibold text-stone-850 font-medium">${item.price}</span>
                          <button
                            onClick={() => {
                              setPriceEditingHerbId(item.id);
                              setNewPrice(item.price.toString());
                            }}
                            className="text-[10px] text-brand-green-700 opacity-0 group-hover:opacity-100 hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-4 font-semibold text-stone-800">{item.stock} Units</td>
                    <td className="py-4">
                      {item.stock < 10 ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 border border-red-200 font-bold animate-pulse">
                          Reorder Required
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-green-50 text-green-700 border border-green-250">
                          Sufficient
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right">
                      <button
                        onClick={() => restockHerb(item.id)}
                        className="bg-stone-100 hover:bg-brand-green-50 hover:text-brand-green-800 text-stone-600 font-semibold py-1.5 px-3.5 rounded-lg border border-stone-200 transition-colors cursor-pointer text-[10px]"
                      >
                        Restock (+30)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRACTITIONERS */}
      {activeSubTab === 'practitioners' && (
        <div className="glass-card p-6 bg-white border border-stone-200/50">
          <h2 className="text-xl font-serif text-brand-green-950 mb-4">SomaVeda Ayurvedic Physicians</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {doctors.map(doc => {
              const docApts = appointments.filter(apt => apt.doctorId === doc.id);
              return (
                <div key={doc.id} className="border border-stone-200 p-5 rounded-2xl space-y-3 bg-stone-50/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-base text-brand-green-950 font-bold">{doc.name}</h3>
                      <p className="text-xs text-stone-400 italic mt-0.5">{doc.specialty}</p>
                    </div>
                    <span className="text-xs font-semibold text-brand-green-850 bg-brand-green-50 px-2 py-0.5 rounded-md">
                      ★ {doc.rating}
                    </span>
                  </div>

                  <p className="text-stone-600 text-xs leading-relaxed">{doc.bio}</p>

                  <div className="border-t border-stone-200/80 pt-3 flex justify-between items-center text-xs text-stone-500">
                    <span>Expertise: <strong className="text-brand-green-800">{doc.doshaExpertise}</strong></span>
                    <span><strong>{docApts.length}</strong> Appts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
