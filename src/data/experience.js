// Listed in reverse-chronological order. Add a logo to public/images/companies/ and set `logo`.
const logo = "/images/companies/company-placeholder.svg";

export const experience = [
  {
    id: "united-airlines",
    company: "United Airlines",
    role: "Associate Analyst",
    type: "Full-time",
    dates: "Jul 2026 – Present",
    logo,
    featured: true,
    summary: "Business analysis role supported by Infosys training in DevOps, AWS, the aviation domain and cyber security.",
    highlights: [
      "Completed Infosys training covering DevOps, AWS, the Aviation domain and Cyber Security.",
      "Shadowed a Senior Business Analyst, working directly under his supervision.",
      "Separated the offshore team (8 members) into its own Scrum process, previously shared with onshore, so offshore work could be measured more accurately. Maintained records and coordinated the team.",
    ],
    tech: ["DevOps", "AWS", "Scrum"],
    learned: [], // TODO: add what you learned
  },
  {
    id: "blu-parrot",
    company: "Blu Parrot Ventures",
    role: "DevOps Analyst",
    type: "Internship",
    dates: "May 2025 – Jul 2025",
    logo,
    featured: true,
    summary: "Sole member of the DevOps function, deploying client projects across AWS, Azure and GCP.",
    highlights: [
      "Led end-to-end deployment of 15+ projects (web apps, ML/LLM models, data scrapers) for clients including Suzuki, Bajaj Capital and Josef.",
      "Built a Jenkins server and CI/CD pipelines from scratch, reducing deployment time by 20%.",
      "Worked directly with developers and clients and managed infrastructure single-handedly.",
      "Managed IT assets using the ITAM software Apexa-IQ.",
    ],
    tech: ["AWS", "Azure", "GCP", "Jenkins", "CI/CD", "Apexa-IQ"],
  },
  {
    id: "zigram",
    company: "ZIGRAM",
    role: "Technology Intern (AWS)",
    type: "Internship",
    dates: "Jan 2025 – Mar 2025",
    logo,
    summary: "Hybrid-cloud operations covering API deployments, database upgrades, monitoring and cost optimisation.",
    highlights: [
      "Managed API deployments, RDS upgrades, CloudWatch alarms and Jenkins CI/CD in a hybrid cloud.",
      "Used Python and cloud shell scripting to speed up routine tasks.",
      "Documented deployment processes and maintained a resource data sheet of cloud services.",
      "Optimised costs by 10% through analysis and infrastructure clean-ups.",
    ],
    tech: ["AWS", "RDS", "CloudWatch", "Jenkins", "Python", "Shell"],
  },
  {
    // TODO: add dates for Dezario Infotech and confirm which company the bullets below belong to.
    id: "dezario-infotech",
    company: "Dezario Infotech",
    role: "Cloud Intern",
    type: "Internship",
    dates: "",
    logo,
    summary: "Cloud and web delivery work for the firm.",
    highlights: [
      "Delivered the firm's complete website with web hosting and domain mapping.",
      "Researched and implemented cost-effective solutions, including free hosting on Netlify and EmailJS for the contact form backend.",
      "Managed data transfer on cloud.",
    ],
    tech: ["Netlify", "EmailJS", "Cloud"],
  },
  {
    // TODO: add dates and responsibilities for ACORPORATE X.
    id: "acorporate-x",
    company: "ACORPORATE X",
    role: "Business Analyst",
    type: "",
    dates: "",
    logo,
    summary: "Business analyst experience.",
    highlights: [],
    tech: [],
  },
];
