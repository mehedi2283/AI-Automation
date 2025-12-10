import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "1",
    title: "FinTech Recon Engine",
    client: "NeoBank Corp",
    industry: "Financial Services",
    description: "Replaced a team of 12 data entry clerks with a deterministic AI pipeline.",
    challenge: "The client was manually reconciling 50,000+ transactions monthly, leading to a 4% error rate.",
    solution: "We built a custom computer vision pipeline to extract data from invoices and a deterministic matching engine.",
    mainImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
    extraImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    videoPoster: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop",
    videoLink: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
    publishDate: "2025-09-26",
    isFeatured: true,
    stats: [
      { label: "Reduction in Labor", value: "94%" },
      { label: "Annual Savings", value: "$1.2M" },
      { label: "Processing Time", value: "< 2s" }
    ],
    tags: ["Python", "Computer Vision", "AWS", "FastAPI"],
    clientFeedback: {
      quote: "The team didn't just automate our process; they completely reinvented how we handle data validation.",
      author: "James Wilson",
      role: "CTO, NeoBank Corp"
    }
  },
  {
    id: "2",
    title: "Global Supply Chain AI",
    client: "Logistics Intl",
    industry: "Logistics",
    description: "Predictive inventory system connecting 40+ legacy API endpoints.",
    challenge: "Inventory stockouts were costing the client millions in lost revenue.",
    solution: "We deployed a federated learning model that aggregates data from all endpoints to predict demand.",
    mainImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
    extraImage: "",
    videoPoster: "",
    publishDate: "2025-08-15",
    isFeatured: true,
    stats: [
      { label: "Stockouts Prevented", value: "100%" },
      { label: "Efficiency Gain", value: "35%" },
      { label: "ROI (Year 1)", value: "300%" }
    ],
    tags: ["TensorFlow", "Kubernetes", "React", "Node.js"],
    clientFeedback: {
      quote: "The predictive accuracy allows us to move inventory before we even know we need it. Game changer.",
      author: "Sarah Jenkins",
      role: "VP of Operations"
    }
  },
  {
    id: "3",
    title: "Customer GenAI Agent",
    client: "E-Comm Giant",
    industry: "Retail",
    description: "Fine-tuned LLM handling 12k+ support tickets monthly.",
    challenge: "Support costs were skyrocketing as the user base grew.",
    solution: "We trained a custom LLM on 3 years of support logs, enabling it to resolve complex queries.",
    mainImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2595&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
    extraImage: "",
    videoPoster: "",
    publishDate: "2025-07-20",
    stats: [
      { label: "Auto-Resolution", value: "78%" },
      { label: "CSAT Score", value: "4.8/5" },
      { label: "24/7 Uptime", value: "Yes" }
    ],
    tags: ["LLM", "RAG", "Vector DB", "TypeScript"],
    clientFeedback: {
      quote: "Our support costs dropped by 60% while customer satisfaction actually went up. Pure magic.",
      author: "Michael Chang",
      role: "Director of CX"
    }
  },
  {
    id: "4",
    title: "Legal Contract Analyzer",
    client: "Pearson & Hardman",
    industry: "Legal Tech",
    description: "Automated risk assessment for high-volume contract review.",
    challenge: "Paralegals spent 40 hours/week reviewing standard NDAs manually.",
    solution: "NLP pipeline that highlights risk clauses and suggests redlines based on company playbook.",
    mainImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2600&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
    extraImage: "",
    videoPoster: "",
    publishDate: "2025-06-10",
    stats: [
      { label: "Review Speed", value: "10x" },
      { label: "Accuracy", value: "99.5%" },
      { label: "Cost Saved", value: "$400k/yr" }
    ],
    tags: ["NLP", "Spacy", "React", "Python"],
    clientFeedback: {
      quote: "It's like having a senior partner review every single NDA instantly.",
      author: "Jessica Pearson",
      role: "Managing Partner"
    }
  },
  {
    id: "5",
    title: "Smart Manufacturing Hub",
    client: "Tesla Motors (Mock)",
    industry: "Manufacturing",
    description: "IoT digital twin for real-time assembly line monitoring.",
    challenge: "Downtime on the assembly line was unpredictable and costly.",
    solution: "Digital twin architecture processing 1M+ sensor events per second for predictive maintenance.",
    mainImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop",
    extraImage: "",
    videoPoster: "",
    publishDate: "2025-05-05",
    stats: [
      { label: "Downtime Reduced", value: "85%" },
      { label: "Data Throughput", value: "1TB/day" },
      { label: "Sensors", value: "5,000+" }
    ],
    tags: ["IoT", "Kafka", "Go", "Vue.js"],
    clientFeedback: {
      quote: "We can now predict component failure 48 hours before it happens.",
      author: "Plant Manager",
      role: "Operations Lead"
    }
  },
  {
    id: "6",
    title: "Healthcare Patient Triage",
    client: "MediCare Plus",
    industry: "Healthcare",
    description: "AI-driven symptom checker and appointment routing system.",
    challenge: "Emergency rooms were overcrowded with non-critical cases.",
    solution: "Bayesian network symptom checker integrated into the mobile app to route patients correctly.",
    mainImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2670&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1576091160550-2187d80a18f7?q=80&w=2670&auto=format&fit=crop",
    extraImage: "",
    videoPoster: "",
    publishDate: "2025-04-12",
    stats: [
      { label: "Wait Times", value: "-40%" },
      { label: "Triage Accuracy", value: "92%" },
      { label: "Daily Users", value: "15k" }
    ],
    tags: ["HealthKit", "Python", "Security", "Azure"],
    clientFeedback: {
        quote: "Patient flow has never been smoother. The AI triage is surprisingly empathetic and accurate.",
        author: "Dr. A. Smith",
        role: "Chief of Staff"
    }
  },
  {
    id: "7",
    title: "Real Estate Valuation",
    client: "PropTech Vision",
    industry: "Real Estate",
    description: "Automated property valuation using satellite imagery and market data.",
    challenge: "Manual appraisals took 5-7 days, slowing down mortgage approvals.",
    solution: "Multi-modal model analyzing satellite images and street view for instant valuation estimates.",
    mainImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2573&auto=format&fit=crop",
    extraImage: "",
    videoPoster: "",
    publishDate: "2025-03-01",
    stats: [
      { label: "Time to Value", value: "30s" },
      { label: "Variance", value: "< 2%" },
      { label: "Coverage", value: "Nationwide" }
    ],
    tags: ["Geospatial", "PyTorch", "Mapbox", "AWS"],
    clientFeedback: {
        quote: "We cut our closing times by 70% thanks to instant automated appraisals.",
        author: "Robert Stark",
        role: "CEO"
    }
  },
  {
    id: "8",
    title: "EdTech Personal Tutor",
    client: "LearnFast",
    industry: "Education",
    description: "Adaptive learning path generation for K-12 students.",
    challenge: "Standardized curriculum was leaving behind 30% of students.",
    solution: "Knowledge graph engine that adapts curriculum difficulty in real-time based on student quiz performance.",
    mainImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2622&auto=format&fit=crop",
    clientMeetingImage: "https://images.unsplash.com/photo-1427504746696-ea5abd7dfe5b?q=80&w=2600&auto=format&fit=crop",
    extraImage: "",
    videoPoster: "",
    publishDate: "2025-02-14",
    stats: [
      { label: "Grade Improvement", value: "+1.5 GPA" },
      { label: "Engagement", value: "+200%" },
      { label: "Students", value: "500k" }
    ],
    tags: ["GraphDB", "Neo4j", "React Native", "Node"],
    clientFeedback: {
        quote: "The adaptive engine is spotting learning gaps that our teachers missed for months.",
        author: "Principal Skinner",
        role: "District Superintendent"
    }
  }
];