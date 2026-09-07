import { Major, PredefinedSubject } from '../types';

/**
 * Global Academic Faculties / Categories
 */
export const GLOBAL_CATEGORIES = [
  'Engineering & Computing',
  'Business & Management',
  'Medical & Health Sciences',
  'Natural Sciences & Mathematics',
  'Law & Social Sciences',
  'Design & Architecture',
  'General Degree Electives',
] as const;

/**
 * Global Majors & Degree Programs across all faculties worldwide
 */
export const POPULAR_MAJORS: Major[] = [
  // ==================== 1. ENGINEERING & COMPUTING ====================
  {
    id: 'cs',
    name: 'Computer Science',
    degreeType: 'B.Sc. / B.Tech',
    category: 'Engineering & Computing',
    icon: '💻',
    subjects: [
      { name: 'Introduction to Programming', credits: 4, code: 'CS101' },
      { name: 'Data Structures & Algorithms', credits: 4, code: 'CS201' },
      { name: 'Object-Oriented Programming (OOP)', credits: 3, code: 'CS202' },
      { name: 'Computer Systems & Architecture', credits: 3, code: 'CS210' },
      { name: 'Discrete Mathematics', credits: 3, code: 'MATH220' },
      { name: 'Operating Systems', credits: 4, code: 'CS310' },
      { name: 'Database Management Systems (DBMS)', credits: 3, code: 'CS320' },
      { name: 'Computer Networks', credits: 3, code: 'CS340' },
      { name: 'Software Engineering Principles', credits: 3, code: 'CS350' },
      { name: 'Web Application Development', credits: 3, code: 'CS380' },
      { name: 'Artificial Intelligence & Machine Learning', credits: 3, code: 'CS410' },
      { name: 'Calculus for Computing', credits: 4, code: 'MATH101' },
      { name: 'Cloud Computing & Distributed Systems', credits: 3, code: 'CS450' },
      { name: 'Mobile Application Development', credits: 3, code: 'CS390' },
      { name: 'Theory of Computation & Automata', credits: 3, code: 'CS330' },
      { name: 'Compiler Design & Construction', credits: 3, code: 'CS420' },
      { name: 'Computer Graphics & Visualization', credits: 3, code: 'CS430' },
      { name: 'Information & Network Security', credits: 3, code: 'CS440' },
      { name: 'Linear Algebra for Computing', credits: 3, code: 'MATH210' },
      { name: 'Human-Computer Interaction (HCI)', credits: 3, code: 'CS370' },
      { name: 'Algorithms & Computational Complexity', credits: 4, code: 'CS302' },
      { name: 'Big Data & Cloud Analytics', credits: 3, code: 'CS460' },
      { name: 'Natural Language Processing', credits: 3, code: 'CS470' },
      { name: 'Capstone Senior Design Project', credits: 6, code: 'CS499' },
    ],
  },
  {
    id: 'se',
    name: 'Software Engineering',
    degreeType: 'B.Sc. / B.Eng',
    category: 'Engineering & Computing',
    icon: '⚙️',
    subjects: [
      { name: 'Fundamentals of Software Engineering', credits: 3, code: 'SE101' },
      { name: 'Object-Oriented Design & Analysis', credits: 4, code: 'SE201' },
      { name: 'Software Requirements & Specifications', credits: 3, code: 'SE220' },
      { name: 'Software Testing & Quality Assurance', credits: 3, code: 'SE310' },
      { name: 'Software Project Management & Agile', credits: 3, code: 'SE330' },
      { name: 'Full-Stack Web Engineering', credits: 4, code: 'SE350' },
      { name: 'Distributed Systems & Microservices', credits: 3, code: 'SE410' },
      { name: 'DevOps & Continuous Delivery (CI/CD)', credits: 3, code: 'SE420' },
      { name: 'Algorithms & Complexity', credits: 4, code: 'CS205' },
      { name: 'Database Systems Engineering', credits: 3, code: 'CS325' },
      { name: 'Human-Computer Interaction (HCI)', credits: 3, code: 'SE370' },
      { name: 'Software Architecture & Design Patterns', credits: 3, code: 'SE340' },
      { name: 'Secure Software Development Lifecycle', credits: 3, code: 'SE360' },
      { name: 'Cloud-Native Software Engineering', credits: 3, code: 'SE430' },
      { name: 'Embedded & Real-Time Software Systems', credits: 3, code: 'SE440' },
      { name: 'Software Maintenance & Evolution', credits: 3, code: 'SE450' },
      { name: 'Mobile Computing & App Engineering', credits: 3, code: 'SE380' },
      { name: 'Engineering Economics & Software Estimation', credits: 2, code: 'SE460' },
      { name: 'Data Engineering & Pipelines', credits: 3, code: 'SE470' },
      { name: 'Software Engineering Industry Capstone', credits: 6, code: 'SE490' },
    ],
  },
  {
    id: 'it',
    name: 'Information Technology',
    degreeType: 'B.Sc. IT',
    category: 'Engineering & Computing',
    icon: '🌐',
    subjects: [
      { name: 'Introduction to IT Systems & Hardware', credits: 3, code: 'IT101' },
      { name: 'Network Administration & Routing Protocols', credits: 4, code: 'IT201' },
      { name: 'System Administration & Linux Server OS', credits: 3, code: 'IT210' },
      { name: 'Information Security & Defense Principles', credits: 3, code: 'IT250' },
      { name: 'Web Technologies & Content Management', credits: 3, code: 'IT280' },
      { name: 'Database Administration (DBA)', credits: 3, code: 'IT310' },
      { name: 'Cloud Infrastructure & AWS Solutions', credits: 3, code: 'IT340' },
      { name: 'IT Service Management (ITIL & Helpdesk)', credits: 3, code: 'IT360' },
      { name: 'Enterprise Resource Planning (ERP) Systems', credits: 3, code: 'IT410' },
      { name: 'IT Project Management & Governance', credits: 3, code: 'IT420' },
      { name: 'Data Communications & Wireless Networks', credits: 3, code: 'IT220' },
      { name: 'Virtualization & Containerization (Docker)', credits: 3, code: 'IT370' },
      { name: 'Cyber Incident Handling & Forensics', credits: 3, code: 'IT430' },
      { name: 'Scripting & Automation (Bash & Python)', credits: 3, code: 'IT240' },
      { name: 'Storage Area Networks & Data Backup', credits: 3, code: 'IT380' },
      { name: 'Mobile Device Management & Endpoint Sec', credits: 2, code: 'IT440' },
      { name: 'Business Continuity & Disaster Recovery', credits: 3, code: 'IT450' },
      { name: 'Final Applied IT Project', credits: 6, code: 'IT490' },
    ],
  },
  {
    id: 'ai-ds',
    name: 'Artificial Intelligence & Data Science',
    degreeType: 'B.Sc.',
    category: 'Engineering & Computing',
    icon: '🤖',
    subjects: [
      { name: 'Introduction to Data Science & Python', credits: 4, code: 'DS101' },
      { name: 'Linear Algebra & Probability for AI', credits: 4, code: 'MATH210' },
      { name: 'Data Structures & Algorithms for AI', credits: 4, code: 'CS203' },
      { name: 'Applied Statistics & Data Analysis', credits: 3, code: 'STAT201' },
      { name: 'Machine Learning Fundamentals', credits: 4, code: 'AI301' },
      { name: 'Deep Learning & Neural Networks', credits: 3, code: 'AI320' },
      { name: 'Natural Language Processing (NLP)', credits: 3, code: 'AI340' },
      { name: 'Computer Vision & Image Processing', credits: 3, code: 'AI350' },
      { name: 'Big Data Analytics & Spark', credits: 3, code: 'DS380' },
      { name: 'Data Visualization & Storytelling', credits: 3, code: 'DS250' },
      { name: 'AI Ethics, Bias & Governance', credits: 2, code: 'AI410' },
      { name: 'Reinforcement Learning & Decision AI', credits: 3, code: 'AI420' },
      { name: 'Generative AI & Large Language Models', credits: 3, code: 'AI430' },
      { name: 'Time Series Analysis & Forecasting', credits: 3, code: 'DS360' },
      { name: 'Feature Engineering & Data Preprocessing', credits: 3, code: 'DS280' },
      { name: 'MLOps: Machine Learning in Production', credits: 3, code: 'AI440' },
      { name: 'Data Mining & Knowledge Discovery', credits: 3, code: 'DS330' },
      { name: 'Cloud AI Services & APIs', credits: 3, code: 'AI450' },
      { name: 'AI & Data Science Capstone Research', credits: 6, code: 'AI490' },
    ],
  },
  {
    id: 'cyber',
    name: 'Cybersecurity & Information Assurance',
    degreeType: 'B.Sc.',
    category: 'Engineering & Computing',
    icon: '🛡️',
    subjects: [
      { name: 'Introduction to Cybersecurity', credits: 3, code: 'SEC101' },
      { name: 'Network Security & Next-Gen Firewalls', credits: 4, code: 'SEC201' },
      { name: 'Cryptography & Encryption Algorithms', credits: 3, code: 'SEC220' },
      { name: 'Ethical Hacking & Penetration Testing', credits: 4, code: 'SEC301' },
      { name: 'Digital Forensics & Incident Investigation', credits: 3, code: 'SEC320' },
      { name: 'Operating System & Kernel Hardening', credits: 3, code: 'SEC330' },
      { name: 'Security Compliance, Risk & Governance', credits: 3, code: 'SEC410' },
      { name: 'Cloud Security Architecture (AWS/Azure)', credits: 3, code: 'SEC420' },
      { name: 'Malware Analysis & Reverse Engineering', credits: 3, code: 'SEC440' },
      { name: 'Secure Software Development Lifecycle', credits: 3, code: 'SEC360' },
      { name: 'Security Operations Center (SOC) & SIEM', credits: 3, code: 'SEC380' },
      { name: 'Wireless & Mobile Security Protocols', credits: 3, code: 'SEC350' },
      { name: 'Threat Hunting & Cyber Intelligence', credits: 3, code: 'SEC450' },
      { name: 'Identity & Access Management (IAM)', credits: 2, code: 'SEC370' },
      { name: 'Cyber Defense Capstone Project', credits: 6, code: 'SEC490' },
    ],
  },
  {
    id: 'ee',
    name: 'Electrical & Electronic Engineering',
    degreeType: 'B.Eng / B.Tech',
    category: 'Engineering & Computing',
    icon: '⚡',
    subjects: [
      { name: 'Electric Circuit Analysis I', credits: 4, code: 'EE101' },
      { name: 'Electric Circuit Analysis II', credits: 4, code: 'EE102' },
      { name: 'Digital Logic & System Design', credits: 4, code: 'EE201' },
      { name: 'Signals and Systems Analysis', credits: 3, code: 'EE210' },
      { name: 'Electromagnetic Field Theory', credits: 3, code: 'EE301' },
      { name: 'Electronic Devices & Analog Circuits', credits: 4, code: 'EE310' },
      { name: 'Microprocessors & Embedded Systems', credits: 4, code: 'EE330' },
      { name: 'Feedback Control Systems Theory', credits: 3, code: 'EE350' },
      { name: 'Electrical Power Systems & Grids', credits: 3, code: 'EE410' },
      { name: 'Communication Engineering & Antennas', credits: 3, code: 'EE420' },
      { name: 'Renewable Energy & Photovoltaic Tech', credits: 3, code: 'EE450' },
      { name: 'Engineering Mathematics & Calculus', credits: 4, code: 'MATH150' },
      { name: 'Power Electronics & Inverters', credits: 4, code: 'EE360' },
      { name: 'Electrical Machines & Transformers', credits: 4, code: 'EE280' },
      { name: 'Digital Signal Processing (DSP)', credits: 3, code: 'EE430' },
      { name: 'VLSI Circuit Design', credits: 3, code: 'EE440' },
      { name: 'High Voltage Engineering', credits: 3, code: 'EE460' },
      { name: 'Electrical Engineering Design Project', credits: 6, code: 'EE490' },
    ],
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    degreeType: 'B.Eng / B.Tech',
    category: 'Engineering & Computing',
    icon: '🔧',
    subjects: [
      { name: 'Engineering Mechanics: Statics', credits: 3, code: 'ME101' },
      { name: 'Engineering Mechanics: Dynamics', credits: 3, code: 'ME102' },
      { name: 'Engineering Thermodynamics I', credits: 4, code: 'ME201' },
      { name: 'Applied Fluid Mechanics', credits: 4, code: 'ME202' },
      { name: 'Strength of Materials & Mechanics', credits: 3, code: 'ME301' },
      { name: 'Materials Science & Metallurgy', credits: 3, code: 'ME210' },
      { name: 'Computer-Aided Design (CAD/CAM/SolidWorks)', credits: 3, code: 'ME220' },
      { name: 'Heat and Mass Transfer', credits: 3, code: 'ME310' },
      { name: 'Design of Machine Elements', credits: 4, code: 'ME350' },
      { name: 'Mechanical Vibrations & Acoustics', credits: 3, code: 'ME401' },
      { name: 'Manufacturing Processes & CNC Machining', credits: 3, code: 'ME330' },
      { name: 'Robotics & Industrial Automation', credits: 3, code: 'ME460' },
      { name: 'Internal Combustion Engines & Hybrid Power', credits: 3, code: 'ME420' },
      { name: 'Refrigeration & Air Conditioning (HVAC)', credits: 3, code: 'ME430' },
      { name: 'Finite Element Analysis (FEA)', credits: 3, code: 'ME440' },
      { name: 'Mechatronics & Sensor Interfacing', credits: 3, code: 'ME370' },
      { name: 'Mechanical Engineering Senior Capstone', credits: 6, code: 'ME490' },
    ],
  },
  {
    id: 'ce',
    name: 'Civil & Structural Engineering',
    degreeType: 'B.Eng / B.Tech',
    category: 'Engineering & Computing',
    icon: '🏗️',
    subjects: [
      { name: 'Engineering Surveying & Levelling', credits: 3, code: 'CE101' },
      { name: 'Structural Mechanics & Analysis I', credits: 3, code: 'CE201' },
      { name: 'Structural Mechanics & Analysis II', credits: 3, code: 'CE202' },
      { name: 'Soil Mechanics & Geotechnical Engineering', credits: 4, code: 'CE301' },
      { name: 'Reinforced Concrete Design', credits: 3, code: 'CE310' },
      { name: 'Structural Steel Design', credits: 3, code: 'CE320' },
      { name: 'Transportation & Highway Engineering', credits: 3, code: 'CE330' },
      { name: 'Fluid Mechanics & Open Channel Hydraulics', credits: 4, code: 'CE220' },
      { name: 'Hydrology & Water Resources Engineering', credits: 3, code: 'CE350' },
      { name: 'Environmental Engineering & Wastewater', credits: 3, code: 'CE360' },
      { name: 'Construction Planning & Cost Estimating', credits: 3, code: 'CE410' },
      { name: 'Foundation & Retaining Wall Engineering', credits: 3, code: 'CE430' },
      { name: 'Earthquake Engineering & Seismic Design', credits: 3, code: 'CE440' },
      { name: 'Bridge & Tunnel Engineering', credits: 3, code: 'CE450' },
      { name: 'GIS & Remote Sensing for Civil Engineers', credits: 2, code: 'CE370' },
      { name: 'Civil Engineering Senior Design Capstone', credits: 6, code: 'CE490' },
    ],
  },
  {
    id: 'chem-eng',
    name: 'Chemical Engineering',
    degreeType: 'B.Eng',
    category: 'Engineering & Computing',
    icon: '⚗️',
    subjects: [
      { name: 'Chemical Process Principles & Mass Balance', credits: 4, code: 'CHE101' },
      { name: 'Chemical Engineering Thermodynamics', credits: 4, code: 'CHE201' },
      { name: 'Fluid Flow Operations', credits: 3, code: 'CHE210' },
      { name: 'Heat Transfer Operations', credits: 3, code: 'CHE301' },
      { name: 'Mass Transfer & Separation Processes', credits: 4, code: 'CHE310' },
      { name: 'Chemical Reaction Engineering', credits: 4, code: 'CHE320' },
      { name: 'Process Dynamics & Automatic Control', credits: 3, code: 'CHE401' },
      { name: 'Plant Design & Economics', credits: 4, code: 'CHE420' },
      { name: 'Petroleum Refining & Petrochemicals', credits: 3, code: 'CHE430' },
      { name: 'Biochemical Engineering Fundamentals', credits: 3, code: 'CHE440' },
    ],
  },
  {
    id: 'bio-eng',
    name: 'Biomedical Engineering',
    degreeType: 'B.Eng',
    category: 'Engineering & Computing',
    icon: '🔬',
    subjects: [
      { name: 'Introduction to Biomedical Engineering', credits: 3, code: 'BME101' },
      { name: 'Human Anatomy and Physiology for Engineers', credits: 4, code: 'BME201' },
      { name: 'Biomedical Signals and Systems', credits: 3, code: 'BME210' },
      { name: 'Biomaterials & Tissue Compatibility', credits: 3, code: 'BME301' },
      { name: 'Medical Imaging Systems (MRI, CT, Ultrasound)', credits: 4, code: 'BME320' },
      { name: 'Biomechanics & Rehabilitation Engineering', credits: 3, code: 'BME330' },
      { name: 'Biomedical Instrumentation & Sensors', credits: 4, code: 'BME350' },
      { name: 'Artificial Organs & Prosthetics', credits: 3, code: 'BME410' },
      { name: 'Clinical Engineering & Regulatory Affairs', credits: 2, code: 'BME420' },
    ],
  },
  {
    id: 'aero',
    name: 'Aerospace & Aeronautical Engineering',
    degreeType: 'B.Eng',
    category: 'Engineering & Computing',
    icon: '✈️',
    subjects: [
      { name: 'Introduction to Flight & Aerospace', credits: 3, code: 'AERO101' },
      { name: 'Aerodynamics & Flow Fields', credits: 4, code: 'AERO201' },
      { name: 'Aircraft Structures & Materials', credits: 4, code: 'AERO210' },
      { name: 'Propulsion Systems & Jet Engines', credits: 4, code: 'AERO301' },
      { name: 'Flight Dynamics & Stability', credits: 3, code: 'AERO310' },
      { name: 'Aircraft Performance & Control', credits: 3, code: 'AERO320' },
      { name: 'Avionics & Flight Navigation', credits: 3, code: 'AERO340' },
      { name: 'Spacecraft Design & Orbital Mechanics', credits: 3, code: 'AERO410' },
      { name: 'Compressible Aerodynamics & Gas Dynamics', credits: 3, code: 'AERO420' },
    ],
  },

  // ==================== 2. BUSINESS & MANAGEMENT ====================
  {
    id: 'ba',
    name: 'Business Administration',
    degreeType: 'BBA',
    category: 'Business & Management',
    icon: '📊',
    subjects: [
      { name: 'Principles of Management', credits: 3, code: 'MGT101' },
      { name: 'Financial Accounting', credits: 3, code: 'ACC101' },
      { name: 'Managerial Accounting', credits: 3, code: 'ACC102' },
      { name: 'Principles of Marketing', credits: 3, code: 'MKT201' },
      { name: 'Corporate Financial Management', credits: 3, code: 'FIN301' },
      { name: 'Organizational Behavior', credits: 3, code: 'MGT202' },
      { name: 'Microeconomics for Business', credits: 3, code: 'ECO101' },
      { name: 'Macroeconomics for Business', credits: 3, code: 'ECO102' },
      { name: 'Business Statistics & Analytics', credits: 3, code: 'QNT201' },
      { name: 'Operations & Supply Chain Management', credits: 3, code: 'OPS301' },
      { name: 'Business Law & Ethics', credits: 3, code: 'LAW201' },
      { name: 'Strategic Management & Policy', credits: 3, code: 'MGT490' },
      { name: 'International Business Environment', credits: 3, code: 'MGT340' },
      { name: 'Human Resource Management', credits: 3, code: 'HRM201' },
      { name: 'Entrepreneurship & New Venture Creation', credits: 3, code: 'ENT310' },
      { name: 'Management Information Systems (MIS)', credits: 3, code: 'MIS210' },
      { name: 'Business Communication & Negotiation', credits: 2, code: 'COM201' },
      { name: 'Digital Business & E-Commerce', credits: 3, code: 'MKT350' },
      { name: 'Corporate Governance & Social Responsibility', credits: 2, code: 'MGT420' },
      { name: 'BBA Senior Capstone Consulting Project', credits: 6, code: 'MGT499' },
    ],
  },
  {
    id: 'acc',
    name: 'Accounting & Auditing',
    degreeType: 'B.Com / B.Acc',
    category: 'Business & Management',
    icon: '📑',
    subjects: [
      { name: 'Financial Accounting Fundamentals', credits: 3, code: 'ACC110' },
      { name: 'Intermediate Financial Accounting I', credits: 4, code: 'ACC201' },
      { name: 'Intermediate Financial Accounting II', credits: 4, code: 'ACC202' },
      { name: 'Cost Accounting & Control', credits: 3, code: 'ACC220' },
      { name: 'Advanced Managerial Accounting', credits: 3, code: 'ACC310' },
      { name: 'Auditing & Assurance Services', credits: 4, code: 'ACC330' },
      { name: 'Corporate & Individual Taxation', credits: 3, code: 'ACC340' },
      { name: 'Accounting Information Systems (AIS)', credits: 3, code: 'ACC350' },
      { name: 'Forensic Accounting & Fraud Detection', credits: 3, code: 'ACC410' },
      { name: 'International Financial Reporting Standards (IFRS)', credits: 3, code: 'ACC420' },
      { name: 'Corporate Financial Reporting', credits: 3, code: 'ACC450' },
      { name: 'Advanced Auditing Practices', credits: 3, code: 'ACC460' },
      { name: 'Governmental & Not-For-Profit Accounting', credits: 3, code: 'ACC370' },
      { name: 'Corporate Tax Strategy & Planning', credits: 3, code: 'ACC440' },
      { name: 'Financial Statement Analysis', credits: 3, code: 'ACC480' },
      { name: 'Ethics in Professional Accounting', credits: 2, code: 'ACC490' },
    ],
  },
  {
    id: 'fin',
    name: 'Finance & Banking',
    degreeType: 'B.Sc. Finance',
    category: 'Business & Management',
    icon: '💰',
    subjects: [
      { name: 'Financial Management Principles', credits: 3, code: 'FIN101' },
      { name: 'Financial Markets & Institutions', credits: 3, code: 'FIN201' },
      { name: 'Investment Analysis & Portfolio Management', credits: 4, code: 'FIN301' },
      { name: 'Commercial Banking & Risk Management', credits: 3, code: 'FIN310' },
      { name: 'Corporate Valuation & M&A', credits: 3, code: 'FIN330' },
      { name: 'Derivatives, Options & Futures', credits: 3, code: 'FIN350' },
      { name: 'International Financial Management', credits: 3, code: 'FIN370' },
      { name: 'Fintech & Financial Innovation', credits: 3, code: 'FIN410' },
      { name: 'Quantitative Finance & Modelling', credits: 3, code: 'FIN420' },
      { name: 'Real Estate Finance & Investments', credits: 3, code: 'FIN430' },
      { name: 'Fixed Income Securities & Bonds', credits: 3, code: 'FIN440' },
      { name: 'Behavioral Finance & Market Psychology', credits: 3, code: 'FIN450' },
      { name: 'Venture Capital & Private Equity', credits: 3, code: 'FIN460' },
      { name: 'Wealth & Asset Management', credits: 3, code: 'FIN470' },
      { name: 'Financial Risk Modelling (VaR)', credits: 3, code: 'FIN480' },
      { name: 'Finance Capstone Research Project', credits: 6, code: 'FIN499' },
    ],
  },
  {
    id: 'mkt',
    name: 'Marketing & Digital Commerce',
    degreeType: 'BBA Marketing',
    category: 'Business & Management',
    icon: '📈',
    subjects: [
      { name: 'Marketing Principles & Strategy', credits: 3, code: 'MKT101' },
      { name: 'Consumer Behavior & Psychology', credits: 3, code: 'MKT210' },
      { name: 'Digital Marketing & Social Media', credits: 3, code: 'MKT250' },
      { name: 'Market Research & Analytics', credits: 4, code: 'MKT310' },
      { name: 'Brand Strategy & Management', credits: 3, code: 'MKT320' },
      { name: 'Content Marketing & SEO Strategy', credits: 3, code: 'MKT330' },
      { name: 'Advertising & Public Relations', credits: 3, code: 'MKT340' },
      { name: 'E-Commerce & Digital Retailing', credits: 3, code: 'MKT360' },
      { name: 'Sales Management & Key Account Strategy', credits: 3, code: 'MKT410' },
      { name: 'Global & Cross-Cultural Marketing', credits: 3, code: 'MKT420' },
      { name: 'Customer Relationship Management (CRM)', credits: 3, code: 'MKT430' },
      { name: 'Product Management & Innovation', credits: 3, code: 'MKT440' },
      { name: 'Marketing Analytics & Attribution', credits: 3, code: 'MKT450' },
      { name: 'Marketing Strategy Capstone Campaign', credits: 6, code: 'MKT499' },
    ],
  },
  {
    id: 'scm',
    name: 'Supply Chain & Logistics',
    degreeType: 'B.Sc. SCM',
    category: 'Business & Management',
    icon: '📦',
    subjects: [
      { name: 'Supply Chain Management Fundamentals', credits: 3, code: 'SCM101' },
      { name: 'Logistics & Transportation Operations', credits: 3, code: 'SCM201' },
      { name: 'Inventory & Warehouse Management', credits: 3, code: 'SCM220' },
      { name: 'Procurement & Strategic Sourcing', credits: 3, code: 'SCM310' },
      { name: 'Global Logistics & Customs', credits: 3, code: 'SCM320' },
      { name: 'Supply Chain Analytics & Forecasting', credits: 4, code: 'SCM340' },
      { name: 'Lean Operations & Quality Management (Six Sigma)', credits: 3, code: 'SCM360' },
      { name: 'Sustainable & Green Supply Chains', credits: 3, code: 'SCM410' },
      { name: 'Supply Chain Risk Management', credits: 3, code: 'SCM420' },
    ],
  },
  {
    id: 'eco',
    name: 'Economics & Econometrics',
    degreeType: 'B.A. / B.Sc.',
    category: 'Business & Management',
    icon: '📉',
    subjects: [
      { name: 'Principles of Microeconomics', credits: 3, code: 'ECO101' },
      { name: 'Principles of Macroeconomics', credits: 3, code: 'ECO102' },
      { name: 'Intermediate Microeconomic Theory', credits: 3, code: 'ECO201' },
      { name: 'Intermediate Macroeconomic Theory', credits: 3, code: 'ECO202' },
      { name: 'Econometrics & Regression Analysis', credits: 4, code: 'ECO310' },
      { name: 'Money, Banking & Monetary Policy', credits: 3, code: 'ECO250' },
      { name: 'Public Finance & Fiscal Policy', credits: 3, code: 'ECO330' },
      { name: 'International Trade & Globalization', credits: 3, code: 'ECO320' },
      { name: 'Development Economics', credits: 3, code: 'ECO350' },
      { name: 'Behavioral & Experimental Economics', credits: 3, code: 'ECO410' },
      { name: 'Mathematical Economics & Game Theory', credits: 4, code: 'ECO220' },
    ],
  },

  // ==================== 3. MEDICAL & HEALTH SCIENCES ====================
  {
    id: 'med',
    name: 'Medicine & Surgery',
    degreeType: 'MBBS / Pre-Med',
    category: 'Medical & Health Sciences',
    icon: '🩺',
    subjects: [
      { name: 'Human Gross Anatomy & Embryology', credits: 5, code: 'MED101' },
      { name: 'Medical Physiology & Biophysics', credits: 5, code: 'MED102' },
      { name: 'Medical Biochemistry & Genetics', credits: 4, code: 'MED103' },
      { name: 'General Pathology & Histopathology', credits: 4, code: 'MED201' },
      { name: 'Medical Microbiology & Immunology', credits: 4, code: 'MED202' },
      { name: 'Medical Pharmacology & Therapeutics', credits: 4, code: 'MED203' },
      { name: 'Forensic Medicine & Toxicology', credits: 3, code: 'MED301' },
      { name: 'Community Medicine & Public Health', credits: 3, code: 'MED302' },
      { name: 'General Internal Medicine & Wards', credits: 6, code: 'MED401' },
      { name: 'General Surgery & Operating Techniques', credits: 6, code: 'MED402' },
      { name: 'Obstetrics and Gynaecology (OB-GYN)', credits: 5, code: 'MED501' },
      { name: 'Pediatrics & Neonatal Care', credits: 5, code: 'MED502' },
    ],
  },
  {
    id: 'nur',
    name: 'Nursing & Patient Care',
    degreeType: 'B.Sc. Nursing',
    category: 'Medical & Health Sciences',
    icon: '🏥',
    subjects: [
      { name: 'Anatomy and Physiology for Nurses I', credits: 4, code: 'NUR110' },
      { name: 'Anatomy and Physiology for Nurses II', credits: 4, code: 'NUR111' },
      { name: 'Microbiology for Health Sciences', credits: 4, code: 'BIO220' },
      { name: 'Foundations of Nursing Practice', credits: 4, code: 'NUR101' },
      { name: 'Pharmacology for Nursing Practice', credits: 3, code: 'NUR210' },
      { name: 'Pathophysiology', credits: 3, code: 'NUR220' },
      { name: 'Health Assessment & Clinical Skills', credits: 4, code: 'NUR205' },
      { name: 'Medical-Surgical Nursing I', credits: 4, code: 'NUR301' },
      { name: 'Medical-Surgical Nursing II', credits: 4, code: 'NUR302' },
      { name: 'Maternal-Newborn Nursing', credits: 3, code: 'NUR320' },
      { name: 'Pediatric Nursing Care', credits: 3, code: 'NUR330' },
      { name: 'Psychiatric & Mental Health Nursing', credits: 3, code: 'NUR340' },
      { name: 'Community & Public Health Nursing', credits: 3, code: 'NUR420' },
    ],
  },
  {
    id: 'pharm',
    name: 'Pharmacy & Pharmaceutical Sciences',
    degreeType: 'B.Pharm / Pharm.D',
    category: 'Medical & Health Sciences',
    icon: '💊',
    subjects: [
      { name: 'Pharmaceutics & Dosage Form Design I', credits: 4, code: 'PHAR101' },
      { name: 'Pharmaceutical Organic Chemistry', credits: 4, code: 'PHAR102' },
      { name: 'Human Anatomy & Physiology', credits: 4, code: 'BIO120' },
      { name: 'Pharmacology & Toxicology I', credits: 4, code: 'PHAR201' },
      { name: 'Pharmacology & Toxicology II', credits: 4, code: 'PHAR202' },
      { name: 'Medicinal Chemistry', credits: 4, code: 'PHAR301' },
      { name: 'Pharmacognosy & Natural Products', credits: 3, code: 'PHAR310' },
      { name: 'Biopharmaceutics & Pharmacokinetics', credits: 3, code: 'PHAR330' },
      { name: 'Hospital & Clinical Pharmacy', credits: 4, code: 'PHAR401' },
      { name: 'Pharmaceutical Quality Control & Assurance', credits: 3, code: 'PHAR420' },
      { name: 'Pharmacy Jurisprudence & Ethics', credits: 2, code: 'PHAR430' },
    ],
  },
  {
    id: 'mlt',
    name: 'Medical Laboratory Technology',
    degreeType: 'B.Sc. MLT',
    category: 'Medical & Health Sciences',
    icon: '🧪',
    subjects: [
      { name: 'Clinical Biochemistry I', credits: 4, code: 'MLT101' },
      { name: 'Clinical Biochemistry II', credits: 4, code: 'MLT102' },
      { name: 'Diagnostic Hematology & Coagulation', credits: 4, code: 'MLT201' },
      { name: 'Clinical Microbiology & Bacteriology', credits: 4, code: 'MLT210' },
      { name: 'Immunology & Serology Testing', credits: 3, code: 'MLT220' },
      { name: 'Blood Banking & Transfusion Medicine', credits: 3, code: 'MLT301' },
      { name: 'Histotechnology & Cytology Techniques', credits: 3, code: 'MLT310' },
      { name: 'Molecular Diagnostics & PCR Techniques', credits: 3, code: 'MLT330' },
      { name: 'Medical Parasitology & Mycology', credits: 3, code: 'MLT340' },
      { name: 'Laboratory Safety & Quality Management', credits: 2, code: 'MLT410' },
    ],
  },
  {
    id: 'pub-health',
    name: 'Public Health & Health Sciences',
    degreeType: 'BSPH',
    category: 'Medical & Health Sciences',
    icon: '🌱',
    subjects: [
      { name: 'Introduction to Global Public Health', credits: 3, code: 'PH101' },
      { name: 'Epidemiology Fundamentals', credits: 4, code: 'PH201' },
      { name: 'Biostatistics for Public Health', credits: 3, code: 'STAT220' },
      { name: 'Environmental Health Sciences', credits: 3, code: 'PH250' },
      { name: 'Health Policy & Healthcare Systems', credits: 3, code: 'PH301' },
      { name: 'Social & Behavioral Determinants of Health', credits: 3, code: 'PH310' },
      { name: 'Health Promotion & Disease Prevention', credits: 3, code: 'PH320' },
      { name: 'Infectious Disease Control', credits: 3, code: 'PH340' },
      { name: 'Global Health & Humanitarian Crises', credits: 3, code: 'PH410' },
    ],
  },
  {
    id: 'physio',
    name: 'Physiotherapy & Rehabilitation',
    degreeType: 'BPT',
    category: 'Medical & Health Sciences',
    icon: '🏃',
    subjects: [
      { name: 'Anatomy for Physiotherapists', credits: 4, code: 'PT101' },
      { name: 'Physiology & Exercise Physiology', credits: 4, code: 'PT102' },
      { name: 'Kinesiology & Biomechanics of Movement', credits: 4, code: 'PT201' },
      { name: 'Electrotherapy & Physical Modalities', credits: 3, code: 'PT210' },
      { name: 'Exercise Therapy & Functional Training', credits: 4, code: 'PT220' },
      { name: 'Orthopedic Physiotherapy', credits: 4, code: 'PT301' },
      { name: 'Neurological Physiotherapy', credits: 4, code: 'PT310' },
      { name: 'Cardiopulmonary Physiotherapy', credits: 3, code: 'PT320' },
      { name: 'Sports Physical Therapy & Injury Prevention', credits: 3, code: 'PT401' },
    ],
  },

  // ==================== 4. NATURAL SCIENCES & MATHEMATICS ====================
  {
    id: 'bio',
    name: 'Biology & Biotechnology',
    degreeType: 'B.Sc.',
    category: 'Natural Sciences & Mathematics',
    icon: '🧬',
    subjects: [
      { name: 'General Biology I (Cellular & Molecular)', credits: 4, code: 'BIO101' },
      { name: 'General Biology II (Organisms & Ecology)', credits: 4, code: 'BIO102' },
      { name: 'General Chemistry I with Lab', credits: 4, code: 'CHEM101' },
      { name: 'General Chemistry II with Lab', credits: 4, code: 'CHEM102' },
      { name: 'Organic Chemistry I', credits: 4, code: 'CHEM201' },
      { name: 'Organic Chemistry II', credits: 4, code: 'CHEM202' },
      { name: 'Genetics & Genomics', credits: 3, code: 'BIO210' },
      { name: 'Biochemistry & Metabolism', credits: 4, code: 'BIO301' },
      { name: 'Molecular Cell Biology', credits: 3, code: 'BIO320' },
      { name: 'Microbiology & Virology', credits: 4, code: 'BIO330' },
      { name: 'Recombinant DNA & Biotechnology Techniques', credits: 3, code: 'BIO410' },
      { name: 'Biostatistics', credits: 3, code: 'STAT230' },
    ],
  },
  {
    id: 'chem',
    name: 'Chemistry & Biochemistry',
    degreeType: 'B.Sc.',
    category: 'Natural Sciences & Mathematics',
    icon: '🧪',
    subjects: [
      { name: 'General Chemistry I', credits: 4, code: 'CHEM101' },
      { name: 'General Chemistry II', credits: 4, code: 'CHEM102' },
      { name: 'Organic Chemistry I & Lab', credits: 4, code: 'CHEM201' },
      { name: 'Organic Chemistry II & Lab', credits: 4, code: 'CHEM202' },
      { name: 'Inorganic Chemistry & Coordination Complexes', credits: 3, code: 'CHEM210' },
      { name: 'Physical Chemistry: Thermodynamics', credits: 4, code: 'CHEM301' },
      { name: 'Physical Chemistry: Quantum Mechanics', credits: 4, code: 'CHEM302' },
      { name: 'Analytical Chemistry & Spectroscopy', credits: 4, code: 'CHEM320' },
      { name: 'Instrumental Methods of Chemical Analysis', credits: 3, code: 'CHEM340' },
      { name: 'Biochemistry I', credits: 4, code: 'CHEM401' },
      { name: 'Polymer Chemistry & Nanomaterials', credits: 3, code: 'CHEM420' },
    ],
  },
  {
    id: 'phys',
    name: 'Physics & Applied Physics',
    degreeType: 'B.Sc.',
    category: 'Natural Sciences & Mathematics',
    icon: '🌌',
    subjects: [
      { name: 'Classical Mechanics & Waves', credits: 4, code: 'PHYS101' },
      { name: 'Electricity and Magnetism with Lab', credits: 4, code: 'PHYS102' },
      { name: 'Modern Physics & Relativity', credits: 3, code: 'PHYS201' },
      { name: 'Thermal & Statistical Physics', credits: 3, code: 'PHYS210' },
      { name: 'Mathematical Methods for Physicists', credits: 4, code: 'PHYS250' },
      { name: 'Quantum Mechanics I', credits: 4, code: 'PHYS301' },
      { name: 'Quantum Mechanics II', credits: 4, code: 'PHYS302' },
      { name: 'Electrodynamics & Optics', credits: 3, code: 'PHYS320' },
      { name: 'Solid State & Condensed Matter Physics', credits: 3, code: 'PHYS401' },
      { name: 'Nuclear & Particle Physics', credits: 3, code: 'PHYS420' },
      { name: 'Computational Physics & Simulations', credits: 3, code: 'PHYS430' },
    ],
  },
  {
    id: 'math',
    name: 'Mathematics & Statistics',
    degreeType: 'B.Sc.',
    category: 'Natural Sciences & Mathematics',
    icon: '📐',
    subjects: [
      { name: 'Calculus I: Differential Calculus', credits: 4, code: 'MATH101' },
      { name: 'Calculus II: Integral Calculus', credits: 4, code: 'MATH102' },
      { name: 'Multivariable & Vector Calculus', credits: 4, code: 'MATH201' },
      { name: 'Linear Algebra & Matrix Theory', credits: 4, code: 'MATH210' },
      { name: 'Ordinary Differential Equations', credits: 3, code: 'MATH220' },
      { name: 'Probability Theory & Distributions', credits: 3, code: 'STAT201' },
      { name: 'Mathematical Statistics & Inference', credits: 4, code: 'STAT301' },
      { name: 'Real Analysis', credits: 4, code: 'MATH310' },
      { name: 'Abstract Algebra & Group Theory', credits: 3, code: 'MATH320' },
      { name: 'Numerical Analysis & Scientific Computing', credits: 3, code: 'MATH350' },
      { name: 'Complex Variables & Analysis', credits: 3, code: 'MATH401' },
    ],
  },

  // ==================== 5. LAW & SOCIAL SCIENCES ====================
  {
    id: 'law',
    name: 'Law & Legal Studies',
    degreeType: 'LL.B / Pre-Law',
    category: 'Law & Social Sciences',
    icon: '⚖️',
    subjects: [
      { name: 'Introduction to Legal Systems & Methods', credits: 3, code: 'LAW101' },
      { name: 'Constitutional Law', credits: 4, code: 'LAW110' },
      { name: 'Law of Contract I', credits: 3, code: 'LAW120' },
      { name: 'Law of Contract II', credits: 3, code: 'LAW121' },
      { name: 'Law of Torts', credits: 4, code: 'LAW201' },
      { name: 'Criminal Law & Procedure', credits: 4, code: 'LAW210' },
      { name: 'Property & Land Law', credits: 4, code: 'LAW230' },
      { name: 'Company & Commercial Law', credits: 3, code: 'LAW301' },
      { name: 'Public International Law', credits: 3, code: 'LAW310' },
      { name: 'Human Rights Law', credits: 3, code: 'LAW330' },
      { name: 'Civil Litigation & Evidence', credits: 4, code: 'LAW401' },
      { name: 'Alternative Dispute Resolution (ADR)', credits: 3, code: 'LAW420' },
    ],
  },
  {
    id: 'psy',
    name: 'Psychology',
    degreeType: 'B.A. / B.Sc.',
    category: 'Law & Social Sciences',
    icon: '🧠',
    subjects: [
      { name: 'Introduction to Psychology', credits: 3, code: 'PSY101' },
      { name: 'Research Methods in Psychology', credits: 4, code: 'PSY201' },
      { name: 'Psychological Statistics', credits: 3, code: 'PSY202' },
      { name: 'Developmental Psychology', credits: 3, code: 'PSY220' },
      { name: 'Cognitive Psychology', credits: 3, code: 'PSY310' },
      { name: 'Abnormal Psychology & Psychopathology', credits: 3, code: 'PSY320' },
      { name: 'Social Psychology', credits: 3, code: 'PSY240' },
      { name: 'Biopsychology & Neuroscience', credits: 4, code: 'PSY350' },
      { name: 'Personality Theories', credits: 3, code: 'PSY330' },
      { name: 'Clinical Psychology Fundamentals', credits: 3, code: 'PSY410' },
      { name: 'Psychological Testing & Assessment', credits: 3, code: 'PSY420' },
    ],
  },
  {
    id: 'pol-sci',
    name: 'Political Science & International Relations',
    degreeType: 'B.A.',
    category: 'Law & Social Sciences',
    icon: '🏛️',
    subjects: [
      { name: 'Introduction to Political Theory', credits: 3, code: 'POL101' },
      { name: 'Comparative Politics', credits: 3, code: 'POL110' },
      { name: 'International Relations Theory', credits: 3, code: 'IR201' },
      { name: 'Public Administration & Governance', credits: 3, code: 'POL220' },
      { name: 'Global Geopolitics & Foreign Policy', credits: 3, code: 'IR250' },
      { name: 'International Organizations (UN, EU, WTO)', credits: 3, code: 'IR310' },
      { name: 'Political Economy & Development', credits: 3, code: 'POL320' },
      { name: 'Conflict Resolution & Peace Studies', credits: 3, code: 'IR340' },
      { name: 'Constitutional Government & Politics', credits: 3, code: 'POL350' },
    ],
  },
  {
    id: 'eng-lit',
    name: 'English Language & Literature',
    degreeType: 'B.A.',
    category: 'Law & Social Sciences',
    icon: '📚',
    subjects: [
      { name: 'Introduction to Literary Studies', credits: 3, code: 'ENG101' },
      { name: 'English Composition & Academic Writing', credits: 3, code: 'ENG102' },
      { name: 'History of English Literature', credits: 3, code: 'ENG110' },
      { name: 'Shakespeare & Renaissance Drama', credits: 3, code: 'ENG201' },
      { name: '19th Century British & American Poetry', credits: 3, code: 'ENG210' },
      { name: 'Modern & Contemporary Fiction', credits: 3, code: 'ENG220' },
      { name: 'Introduction to Linguistics & Phonetics', credits: 3, code: 'ENG250' },
      { name: 'Literary Theory & Criticism', credits: 3, code: 'ENG310' },
      { name: 'Post-Colonial & World Literature', credits: 3, code: 'ENG320' },
      { name: 'Creative Writing & Rhetoric', credits: 3, code: 'ENG350' },
    ],
  },
  {
    id: 'soc',
    name: 'Sociology & Social Development',
    degreeType: 'B.A.',
    category: 'Law & Social Sciences',
    icon: '👥',
    subjects: [
      { name: 'Introduction to Sociology', credits: 3, code: 'SOC101' },
      { name: 'Sociological Theory & Thinkers', credits: 3, code: 'SOC201' },
      { name: 'Social Research Methods & Fieldwork', credits: 4, code: 'SOC210' },
      { name: 'Social Inequality, Class & Stratification', credits: 3, code: 'SOC230' },
      { name: 'Sociology of Family & Gender', credits: 3, code: 'SOC240' },
      { name: 'Urban Sociology & Community Planning', credits: 3, code: 'SOC310' },
      { name: 'Criminology & Deviant Behavior', credits: 3, code: 'SOC320' },
      { name: 'Globalization & Social Change', credits: 3, code: 'SOC340' },
    ],
  },
  {
    id: 'media',
    name: 'Journalism & Mass Media',
    degreeType: 'B.A.',
    category: 'Law & Social Sciences',
    icon: '🎙️',
    subjects: [
      { name: 'Introduction to Mass Communication', credits: 3, code: 'COMM101' },
      { name: 'News Reporting & Writing', credits: 3, code: 'JOUR110' },
      { name: 'Media Ethics & Freedom of Speech Law', credits: 3, code: 'JOUR201' },
      { name: 'Digital Journalism & Multimedia Storytelling', credits: 4, code: 'JOUR220' },
      { name: 'Broadcast Journalism: Radio & TV', credits: 3, code: 'JOUR301' },
      { name: 'Public Relations & Strategic Communication', credits: 3, code: 'COMM310' },
      { name: 'Photojournalism & Visual Media', credits: 3, code: 'JOUR330' },
      { name: 'Investigative Journalism', credits: 3, code: 'JOUR410' },
    ],
  },

  // ==================== 6. DESIGN & ARCHITECTURE ====================
  {
    id: 'arch',
    name: 'Architecture & Spatial Design',
    degreeType: 'B.Arch',
    category: 'Design & Architecture',
    icon: '🏛️',
    subjects: [
      { name: 'Architectural Design Studio I', credits: 5, code: 'ARCH101' },
      { name: 'Architectural Design Studio II', credits: 5, code: 'ARCH102' },
      { name: 'Architectural Drawing & Drafting', credits: 3, code: 'ARCH110' },
      { name: 'History of World Architecture', credits: 3, code: 'ARCH201' },
      { name: 'Building Materials & Construction Tech', credits: 4, code: 'ARCH210' },
      { name: 'Building Structures for Architects', credits: 3, code: 'ARCH220' },
      { name: 'Digital Architecture & 3D BIM Modelling', credits: 3, code: 'ARCH301' },
      { name: 'Environmental Control Systems & Acoustics', credits: 3, code: 'ARCH310' },
      { name: 'Urban Planning & Landscape Design', credits: 3, code: 'ARCH340' },
      { name: 'Sustainable Architecture & Green Buildings', credits: 3, code: 'ARCH410' },
    ],
  },
  {
    id: 'des',
    name: 'Graphic Design & Digital Media',
    degreeType: 'B.Des',
    category: 'Design & Architecture',
    icon: '🎨',
    subjects: [
      { name: 'Two-Dimensional Design Principles', credits: 3, code: 'DES101' },
      { name: 'Typography & Lettering Systems', credits: 3, code: 'DES110' },
      { name: 'Digital Vector Illustration', credits: 3, code: 'DES120' },
      { name: 'Raster Imaging & Digital Compositing', credits: 3, code: 'DES130' },
      { name: 'History of Visual Communication', credits: 3, code: 'DES201' },
      { name: 'User Interface (UI) Design', credits: 3, code: 'DES210' },
      { name: 'User Experience (UX) Research', credits: 3, code: 'DES220' },
      { name: 'Motion Graphics & Animation', credits: 3, code: 'DES310' },
      { name: 'Brand Identity & Visual Systems', credits: 3, code: 'DES320' },
      { name: 'Packaging & Spatial Graphics', credits: 3, code: 'DES340' },
    ],
  },
  {
    id: 'uiux',
    name: 'UI/UX & Product Design',
    degreeType: 'B.Des',
    category: 'Design & Architecture',
    icon: '📱',
    subjects: [
      { name: 'Introduction to User Experience (UX)', credits: 3, code: 'UI101' },
      { name: 'User Research & Personas', credits: 3, code: 'UI110' },
      { name: 'Information Architecture & Wireframing', credits: 3, code: 'UI201' },
      { name: 'Visual Design & Design Systems (Figma)', credits: 4, code: 'UI210' },
      { name: 'Interaction Design & Micro-interactions', credits: 3, code: 'UI250' },
      { name: 'Usability Testing & Heuristic Evaluation', credits: 3, code: 'UI301' },
      { name: 'Mobile App UX/UI Design (iOS/Android)', credits: 3, code: 'UI310' },
      { name: 'Design for Accessibility (WCAG)', credits: 2, code: 'UI330' },
      { name: 'Product Management for Designers', credits: 3, code: 'UI410' },
    ],
  },

  // ==================== 7. GENERAL UNIVERSITY ELECTIVES ====================
  {
    id: 'general',
    name: 'General University Electives (All Degrees)',
    degreeType: 'Core / Elective',
    category: 'General Degree Electives',
    icon: '🎓',
    subjects: [
      { name: 'Academic Writing & Research', credits: 3, code: 'GEN101' },
      { name: 'Critical Thinking & Logic', credits: 3, code: 'GEN102' },
      { name: 'Public Speaking & Oral Presentation', credits: 2, code: 'GEN105' },
      { name: 'Introduction to World History', credits: 3, code: 'HIST101' },
      { name: 'Ethics & Moral Philosophy', credits: 3, code: 'PHIL101' },
      { name: 'Environmental Studies & Sustainability', credits: 3, code: 'ENV101' },
      { name: 'Basic College Mathematics', credits: 3, code: 'MATH100' },
      { name: 'General Psychology', credits: 3, code: 'PSY100' },
      { name: 'Introduction to Sociology', credits: 3, code: 'SOC100' },
      { name: 'Principles of Economics', credits: 3, code: 'ECO100' },
      { name: 'Foreign Language I (Conversational)', credits: 3, code: 'LANG101' },
      { name: 'Leadership & Team Dynamics', credits: 2, code: 'LDR101' },
    ],
  },
];

export interface AutocompleteSubjectItem {
  name: string;
  credits: number;
  majorName: string;
  majorId: string;
  category: string;
  degreeType?: string;
  code?: string;
}

/**
 * Flat, pre-indexed array of all subjects across all global degrees
 */
export const ALL_PREDEFINED_SUBJECTS: AutocompleteSubjectItem[] = POPULAR_MAJORS.flatMap((major) =>
  major.subjects.map((sub) => ({
    name: sub.name,
    credits: sub.credits,
    majorName: major.name,
    majorId: major.id,
    category: major.category,
    degreeType: major.degreeType,
    code: sub.code,
  }))
);

/**
 * Helper to get all subjects for a specific major
 */
export function getSubjectsByMajorId(majorId?: string): AutocompleteSubjectItem[] {
  if (!majorId) return [];
  const major = POPULAR_MAJORS.find((m) => m.id === majorId);
  if (!major) return [];
  return major.subjects.map((sub) => ({
    name: sub.name,
    credits: sub.credits,
    majorName: major.name,
    majorId: major.id,
    category: major.category,
    degreeType: major.degreeType,
    code: sub.code,
  }));
}

/**
 * Search autocomplete subjects by query string.
 * If query is empty:
 *  - If preferredMajorId provided, returns all subjects for that major!
 *  - Else, returns standard subjects across popular fields.
 * If query has characters:
 *  - Filters by query, prioritizing matches in preferredMajorId, then startsWith, then alphabetical.
 */
export function searchPredefinedSubjects(
  query: string,
  preferredMajorId?: string,
  limit: number = 100
): AutocompleteSubjectItem[] {
  const trimmed = query.trim().toLowerCase();

  // If query is blank/empty:
  if (!trimmed || trimmed.length === 0) {
    if (preferredMajorId) {
      const majorSubs = getSubjectsByMajorId(preferredMajorId);
      if (majorSubs.length > 0) {
        return majorSubs.slice(0, limit);
      }
    }
    // Return sample from diverse global categories
    return ALL_PREDEFINED_SUBJECTS.slice(0, 15);
  }

  // Filter candidates
  const seenNames = new Set<string>();
  const results: AutocompleteSubjectItem[] = [];

  for (const item of ALL_PREDEFINED_SUBJECTS) {
    const itemNameLower = item.name.toLowerCase();
    const itemCodeLower = item.code ? item.code.toLowerCase() : '';
    const itemMajorLower = item.majorName.toLowerCase();

    if (
      itemNameLower.includes(trimmed) ||
      itemCodeLower.includes(trimmed) ||
      itemMajorLower.includes(trimmed)
    ) {
      const key = `${itemNameLower}-${item.majorId}`;
      if (!seenNames.has(key)) {
        seenNames.add(key);
        results.push(item);
      }
    }
  }

  // Sort: preferred major first, then startsWith query, then alphabetical
  results.sort((a, b) => {
    const aMatchMajor = preferredMajorId && a.majorId === preferredMajorId ? 1 : 0;
    const bMatchMajor = preferredMajorId && b.majorId === preferredMajorId ? 1 : 0;
    if (aMatchMajor !== bMatchMajor) {
      return bMatchMajor - aMatchMajor;
    }

    const aStarts = a.name.toLowerCase().startsWith(trimmed) ? 1 : 0;
    const bStarts = b.name.toLowerCase().startsWith(trimmed) ? 1 : 0;
    if (aStarts !== bStarts) {
      return bStarts - aStarts;
    }

    return a.name.localeCompare(b.name);
  });

  return results.slice(0, limit);
}
