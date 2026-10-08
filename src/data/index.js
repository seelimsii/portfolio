// Relationship helpers: everything is looked up by id so content lives in one place.
import { projects } from "./projects";
import { achievements } from "./achievements";
import { leadership } from "./leadership";

export const achievementsForProject = (projectId) => achievements.filter((a) => a.projectId === projectId);
export const achievementsForLeadership = (id) => achievements.filter((a) => a.leadershipId === id);
export const findProject = (id) => projects.find((p) => p.id === id);
export const findLeadership = (id) => leadership.find((l) => l.id === id);
