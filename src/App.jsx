import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { ProjectsPage, ExperiencePage, LeadershipPage, AchievementsPage } from "./pages/Lists";
import { ProjectDetail, ExperienceDetail, LeadershipDetail } from "./pages/Details";
import { AboutPage, EducationPage, SkillsPage, ContactPage, NotFound } from "./pages/Static";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/experience/:id" element={<ExperienceDetail />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/leadership/:id" element={<LeadershipDetail />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
