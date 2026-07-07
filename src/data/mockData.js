export const initialTreatments = [
  {
    id: "panchakarma",
    name: "Panchakarma Detoxification",
    duration: "90 mins",
    price: 150,
    category: "Detoxification",
    description: "A comprehensive five-fold purification therapy designed to eliminate deep-seated toxins (Ama) from the tissues, restore metabolic fire (Agni), and balance all three Doshas.",
    benefits: ["Flushes metabolic wastes", "Boosts immune function", "Deeply rejuvenates tissues"]
  },
  {
    id: "shirodhara",
    name: "Shirodhara Therapy",
    duration: "60 mins",
    price: 95,
    category: "Mental Serenity",
    description: "A therapeutic procedure where a continuous, warm stream of herbalized sesame oil is gently poured over the forehead (the 'third eye' area). Excellent for calming the nervous system.",
    benefits: ["Relieves anxiety & insomnia", "Alleviates chronic headaches", "Improves mental clarity"]
  },
  {
    id: "abhyanga",
    name: "Abhyanga Massage",
    duration: "60 mins",
    price: 80,
    category: "Rejuvenation",
    description: "A synchronized, full-body warm herbal oil massage customized to your specific Dosha constitution. Increases circulation, joint lubrication, and lymphatic drainage.",
    benefits: ["Nourishes the skin", "Reduces joint stiffness", "Relieves muscle soreness"]
  },
  {
    id: "nasya",
    name: "Nasya Therapy",
    duration: "45 mins",
    price: 60,
    category: "Respiratory & Mind",
    description: "Administration of medicated herbal oils or powders through the nasal passages. Clears sinuses, improves breathing quality, and stimulates vital energy channels in the head.",
    benefits: ["Clears chronic sinus congestion", "Reduces allergy symptoms", "Relieves neck & shoulder tension"]
  },
  {
    id: "elakizhi",
    name: "Elakizhi Bolus Therapy",
    duration: "75 mins",
    price: 110,
    category: "Pain Management",
    description: "A specialized massage using warm linen bags filled with fresh medicinal leaves, spices, and roots, dipped in heated oils. Ideal for musculoskeletal stiffness.",
    benefits: ["Reduces nerve pain & inflammation", "Improves range of motion", "Combats chronic back pain"]
  }
];

export const initialHerbs = [
  {
    id: "ashwagandha",
    name: "Ashwagandha",
    category: "Rasayana (Rejuvenator)",
    form: "Capsules",
    description: "A powerful adaptogenic herb known as 'Indian Ginseng'. It supports body adaptation to stress, increases energy levels, and balances excess Vata & Kapha.",
    benefits: ["Reduces stress & anxiety", "Improves sleep quality", "Strengthens nervous system"],
    stock: 42,
    price: 25
  },
  {
    id: "triphala",
    name: "Triphala",
    category: "Digestive & Detox",
    form: "Powder (Churna)",
    description: "A classic Ayurvedic formulation made of three fruits: Amalaki, Bibhitaki, and Haritaki. Supports digestive health, regular elimination, and gentle colon cleansing.",
    benefits: ["Promotes gentle digestion", "Rich source of Vitamin C", "Removes toxic build-up (Ama)"],
    stock: 12,
    price: 18
  },
  {
    id: "shatavari",
    name: "Shatavari",
    category: "Hormonal Balance",
    form: "Tablets",
    description: "Known as the 'queen of herbs', Shatavari translates to 'she who possesses a hundred husbands', referring to its rejuvenation support for the female reproductive system.",
    benefits: ["Balances female hormones", "Soothes the digestive tract", "Enhances vitality & strength"],
    stock: 35,
    price: 22
  },
  {
    id: "brahmi",
    name: "Brahmi",
    category: "Nerve & Brain Tonic",
    form: "Liquid (Arishta)",
    description: "An exceptional herb for mind and brain functions. It nourishes the nervous system, supports memory retention, focus, and general cognitive wellness.",
    benefits: ["Improves concentration", "Calms restless mind (Sadhaka Pitta)", "Supports memory longevity"],
    stock: 8,
    price: 28
  },
  {
    id: "tulsi",
    name: "Tulsi (Holy Basil)",
    category: "Immunity & Respiratory",
    form: "Teabag blend",
    description: "Revered as 'The Elixir of Life', Holy Basil supports respiration, increases immunity against seasonal colds, and helps clear Kapha accumulations.",
    benefits: ["Supports bronchial health", "Enhances defense against stress", "Provides antioxidant defense"],
    stock: 65,
    price: 15
  },
  {
    id: "guggulu",
    name: "Guggulu",
    category: "Joint & Cholesterol",
    form: "Tablets",
    description: "A purified resin famous for its binding and detoxifying properties. Cleanses channels (Srotas), reduces joint swelling, and manages healthy lipid levels.",
    benefits: ["Relieves joint inflammation", "Clears arterial pathways", "Balances Vata & Kapha"],
    stock: 5,
    price: 32
  }
];

export const initialDoctors = [
  {
    id: "dr_vasant",
    name: "Dr. Vasant Lad Jr.",
    specialty: "Nadi Pariksha (Pulse Diagnosis) & Internal Medicine",
    doshaExpertise: "Vata, Pitta, Kapha imbalances",
    rating: 4.9,
    bio: "With over 18 years of clinical experience trained in Pune, India, Dr. Vasant specializes in reading the pulse to diagnose deep constitutional imbalances.",
    availableHours: ["09:00 AM", "10:30 AM", "11:00 AM", "02:00 PM", "03:30 PM", "04:00 PM"]
  },
  {
    id: "dr_ananda",
    name: "Dr. Ananda Prasad",
    specialty: "Panchakarma Detox & Spine Rehabilitation",
    doshaExpertise: "Vata & Kapha disorders",
    rating: 4.8,
    bio: "Dr. Ananda focuses on traditional detoxification processes and structural alignment therapies using therapeutic herbalized oils.",
    availableHours: ["09:30 AM", "10:00 AM", "11:30 AM", "01:30 PM", "03:00 PM", "04:30 PM"]
  },
  {
    id: "dr_meera",
    name: "Dr. Meera Nair",
    specialty: "Ayurvedic Gynecology & Rejuvenative Nutrition",
    doshaExpertise: "Pitta & Vata disorders",
    rating: 5.0,
    bio: "An expert in dietetics (Ahara) and mental calmness, Dr. Meera develops herbal programs and routine guidelines tailored for hormonal harmony.",
    availableHours: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"]
  }
];

export const initialPatients = [
  {
    id: "pat_1",
    name: "Rohan Sharma",
    age: 34,
    gender: "Male",
    doshaType: "Vata-Pitta",
    contact: "+1 (555) 019-2834",
    email: "rohan@example.com",
    complaints: "Chronic anxiety, racing mind at night, bloating after raw meals, dry skin.",
    healthMetrics: { energy: 55, digestion: 40, sleep: 35, stress: 78 },
    prescriptions: [
      {
        date: "2026-06-25",
        doctorName: "Dr. Vasant Lad Jr.",
        notes: "High Vata imbalance drying out digestive fire (Agni) and irritating the nervous system. Advised warm cooked foods and early sleep routine.",
        herbs: [
          { name: "Ashwagandha", dosage: "1 Capsule", timing: "At night with warm milk/water" },
          { name: "Triphala", dosage: "1/2 tsp Powder", timing: "Before sleep with warm water" }
        ],
        treatments: ["Shirodhara Therapy", "Abhyanga Massage"]
      }
    ]
  },
  {
    id: "pat_2",
    name: "Alice Cooper",
    age: 45,
    gender: "Female",
    doshaType: "Kapha-dominant",
    contact: "+1 (555) 012-9843",
    email: "alice@example.com",
    complaints: "Lethargy, slow metabolism, fluid retention in ankles, congestion in the mornings.",
    healthMetrics: { energy: 40, digestion: 45, sleep: 80, stress: 45 },
    prescriptions: [
      {
        date: "2026-06-18",
        doctorName: "Dr. Ananda Prasad",
        notes: "Excess Kapha sluggishness. Need light, spicy meals, ginger tea, and stimulating massages. Avoid heavy dairy.",
        herbs: [
          { name: "Tulsi (Holy Basil)", dosage: "1 Cup Tea", timing: "Twice daily, morning and afternoon" },
          { name: "Triphala", dosage: "1 Tablet", timing: "Before meals in the morning" }
        ],
        treatments: ["Nasya Therapy", "Elakizhi Bolus Therapy"]
      }
    ]
  },
  {
    id: "pat_3",
    name: "Priya Patel",
    age: 29,
    gender: "Female",
    doshaType: "Pitta-dominant",
    contact: "+1 (555) 014-4821",
    email: "priya@example.com",
    complaints: "Heartburn, skin rashes, hot flushes, irritability, high stress levels at work.",
    healthMetrics: { energy: 75, digestion: 60, sleep: 55, stress: 70 },
    prescriptions: [
      {
        date: "2026-07-02",
        doctorName: "Dr. Meera Nair",
        notes: "Aggravated Pitta heat. Avoid hot spices, alcohol, and direct sunlight. Recommending cooling herbs and calming therapies.",
        herbs: [
          { name: "Shatavari", dosage: "1 Tablet", timing: "Twice daily after meals" },
          { name: "Brahmi", dosage: "15 ml Liquid", timing: "In the morning to calm irritability" }
        ],
        treatments: ["Shirodhara Therapy", "Abhyanga Massage"]
      }
    ]
  }
];

export const initialAppointments = [
  {
    id: "apt_1",
    patientId: "pat_1",
    patientName: "Rohan Sharma",
    doctorId: "dr_vasant",
    doctorName: "Dr. Vasant Lad Jr.",
    date: "2026-07-06",
    time: "10:30 AM",
    treatment: "Shirodhara Therapy",
    complaint: "Anxiety and sleep issues remain high, hoping to calm mind.",
    status: "Confirmed"
  },
  {
    id: "apt_2",
    patientId: "pat_2",
    patientName: "Alice Cooper",
    doctorId: "dr_ananda",
    doctorName: "Dr. Ananda Prasad",
    date: "2026-07-06",
    time: "02:00 PM",
    treatment: "Elakizhi Bolus Therapy",
    complaint: "Lower back feels stiff, joints hurt during rains.",
    status: "Pending"
  },
  {
    id: "apt_3",
    patientId: "pat_3",
    patientName: "Priya Patel",
    doctorId: "dr_meera",
    doctorName: "Dr. Meera Nair",
    date: "2026-07-07",
    time: "09:00 AM",
    treatment: "Abhyanga Massage",
    complaint: "Full body cooling massage to relieve skin heat and stress.",
    status: "Confirmed"
  }
];
