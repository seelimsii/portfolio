// type: "award" | "hackathon" | "certification" | "recommendation"
// Link to a project with projectId and to a leadership entry with leadershipId (one source of truth).
// Replace `image` with a file in public/images/certificates/ or public/images/hackathons/.
const CERT = "/images/certificates/certificate-placeholder.svg";

export const achievements = [
  { id: "research-display", title: "2nd Best Research Award", issuer: "Hansraj College", date: "Jun 2026", type: "award", featured: true, projectId: "rice-disease-detection", description: "Research Display Week, where all final-year students presented their research to the public.", image: CERT },
  { id: "best-poster", title: "Best Poster Presentation", issuer: "Sai School of Physical Sciences, Sri Sai University", date: "Mar 2026", type: "award", featured: true, projectId: "rice-disease-detection", description: "National Conference NCAIPS-2026 (24 March 2026), for the poster on rice disease detection using deep learning.", image: CERT },
  { id: "sih24", title: "Smart India Hackathon 2024: Internal Round Finalist", issuer: "Hansraj College", date: "Nov 2024", type: "hackathon", featured: true, projectId: "child-safety", description: "Selected in the college-level round before submitting the idea to SIH. Theme: child safety and well-being.", image: CERT }, // TODO: add the SIH certificate as a second image
  { id: "hunt-it-out", title: "1st Position: Hunt It Out", issuer: "Shyam Lal College, University of Delhi", date: "Mar 2024", type: "hackathon", featured: true, description: "First place among 22 teams in a treasure hunt at the Yudaspandana fest (15 March 2024).", image: CERT },
  { id: "dpbh23", title: "Certificate of Excellence: DPBH'23", issuer: "IIT (BHU) Varanasi", date: "Mar 2024", type: "hackathon", featured: true, projectId: "dark-pattern-buster", description: "Awarded for contributions to the Dark Pattern Buster application at the DPBH'23 hackathon.", image: CERT },
  { id: "yuvamanthan", title: "Certificate of Appreciation: Yuvamanthan Hackathon", issuer: "Hansraj College", date: "Aug 2024", type: "hackathon", description: "Participation certificate.", image: CERT },
  { id: "lor-ehsaas", title: "Letter of Recommendation", issuer: "Ujjwal Gaur, Founding Director, Ehsaas for Humanity Foundation, and Supreme Court advocate", date: "Jul 2024", type: "recommendation", leadershipId: "ehsaas", description: "Recommendation for leadership of the Ehsaas Hansraj unit.", image: CERT },
  { id: "cert-ducat", title: "Cloud Computing & DevOps (CCNA, RHCSA, AWS, DevOps)", issuer: "Ducat", date: "", type: "certification", description: "Classroom certification course.", image: CERT }, // TODO: add certificate number / date
  { id: "cert-apexa", title: "Apexa MSP iQ: IT Asset Management", issuer: "Apexa", date: "", type: "certification", description: "Certified course in ITAM.", image: CERT },
  { id: "cert-sql", title: "Become SQL Champion", issuer: "Udemy", date: "", type: "certification", description: "Course by Harshit Bhadiyadra.", image: CERT },
];

export const achievementTypes = [
  { key: "all", label: "All" },
  { key: "award", label: "Awards" },
  { key: "hackathon", label: "Hackathons" },
  { key: "certification", label: "Certifications" },
  { key: "recommendation", label: "Recommendation" },
];
