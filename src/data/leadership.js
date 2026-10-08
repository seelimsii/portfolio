// One entry per organisation; `roles` lists positions newest first. Certificates/LOR come from achievements.js.
const logo = "/images/leadership/org-placeholder.svg";

export const leadership = [
  {
    id: "ordinateur", org: "Ordinateur: The Computer Science Society, Hansraj College", short: "Ordinateur", logo, featured: true,
    roles: [{ title: "Technical Head", dates: "Oct 2023 – Sep 2024" }, { title: "Technical Team Member", dates: "Nov 2022 – Sep 2023" }],
    summary: "Led the society's technical team and its flagship events.",
    highlights: ["Organised and led the Code Crash hackathon and the Anomaly treasure hunt with the wider society team.", "Managed and trained technical team members, including beginner-level editing software instruction."],
    skills: ["Leadership", "Event management", "Research", "Communication"],
  },
  {
    id: "culinary-arts-society", org: "Culinary Arts Society, Hansraj College", short: "Culinary Arts Society", logo, featured: true,
    roles: [{ title: "Technical Head", dates: "Jul 2023 – Jun 2024" }, { title: "Technical Team Member", dates: "Nov 2022 – Jul 2023" }],
    summary: "Ran the society's technical and design work.",
    highlights: ["Learned design skills as part of the technical team.", "Conducted Nemesis, the society's treasure hunt: prepared clues, quizzes and puzzles."],
    skills: ["Design", "Team management", "Event management"],
  },
  {
    id: "bitwise", org: "Bitwise Vol. 5, Computer Science Department Magazine, Hansraj College", short: "Bitwise", logo, featured: true,
    roles: [{ title: "Senior Designer", dates: "Aug 2024 – Dec 2024" }],
    summary: "Designed the fifth edition of the department's tech magazine.",
    highlights: ["Designed the look of the magazine and managed the designer team.", "Collaborated with teachers and past designers and helped the editorial team refine articles."],
    skills: ["Design", "Team management", "Collaboration"],
    links: [], // TODO: add the link to Vol. 5 on the college website
  },
  {
    id: "ehsaas", org: "Ehsaas for Humanity Foundation (Hansraj unit)", short: "Ehsaas Foundation", logo, featured: true,
    roles: [{ title: "College President", dates: "Mar 2023 – Apr 2024" }],
    summary: "Founded and led the college unit of a social-service foundation.",
    highlights: ["Initiated and led the society, recruiting and inspiring members while overseeing strategic operations.", "Initiated the Pashu Aahar, Shikanji and Cloth Donation drives.", "Received a Letter of Recommendation from the foundation's founding director."],
    skills: ["Leadership", "Recruitment", "Operations", "Community service"],
  },
  {
    id: "nss", org: "National Service Scheme, Hansraj College", short: "NSS", logo,
    roles: [{ title: "Volunteer", dates: "Nov 2022 – Sep 2023" }],
    summary: "Volunteer with the college NSS unit.",
    highlights: [],
    skills: ["Community service"],
  },
];
