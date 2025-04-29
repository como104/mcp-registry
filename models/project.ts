import { Project } from "@/types/project";
import projectsData from "@/pagejson/projects.json";
import { ProjectData, ProjectsData } from "@/types/projects-data";

export enum ProjectStatus {
  Created = "created",
  Deleted = "deleted",
}

function convertToProject(data: ProjectData): Project {
  return {
    ...data,
    target: data.target as "_blank" | "_self"
  };
}

export async function insertProject(project: Project) {
  // 在使用JSON文件时，这个方法暂时不可用
  throw new Error("Insert project is not supported in JSON mode");
}

export async function findProjectByUuid(
  uuid: string
): Promise<Project | undefined> {
  const project = (projectsData as ProjectsData).projects.find(p => p.uuid === uuid);
  if (!project) return undefined;
  return convertToProject(project);
}

export async function findProjectByName(
  name: string
): Promise<Project | undefined> {
  const project = (projectsData as ProjectsData).projects.find(p => p.name === name);
  if (!project) return undefined;
  return convertToProject(project);
}

export async function getProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const start = (page - 1) * limit;
  const end = page * limit;
  return (projectsData as ProjectsData).projects
    .slice(start, end)
    .map(convertToProject);
}

export async function getProjectsCount(): Promise<number> {
  return (projectsData as ProjectsData).projects.length;
}

export async function getProjectsCountByCategory(
  category: string
): Promise<number> {
  return (projectsData as ProjectsData).projects.filter(p => p.category === category).length;
}

export async function getProjectsByCategory(
  category: string,
  page: number,
  limit: number
): Promise<Project[]> {
  const filteredProjects = (projectsData as ProjectsData).projects.filter(p => p.category === category);
  const start = (page - 1) * limit;
  const end = page * limit;
  return filteredProjects
    .slice(start, end)
    .map(convertToProject);
}

export async function getFeaturedProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const start = (page - 1) * limit;
  const end = page * limit;
  return (projectsData as ProjectsData).projects
    .filter(p => p.is_featured)
    .slice(start, end)
    .map(convertToProject);
}

export async function getRandomProjects(
  page: number,
  limit: number
): Promise<Project[]> {
  const start = (page - 1) * limit;
  const end = page * limit;
  return [...(projectsData as ProjectsData).projects]
    .sort(() => Math.random() - 0.5)
    .slice(start, end)
    .map(convertToProject);
}

export async function getProjectsWithKeyword(
  keyword: string,
  page: number,
  limit: number
): Promise<Project[]> {
  const filteredProjects = (projectsData as ProjectsData).projects.filter((project) => {
    const searchStr = `${project.name} ${project.title} ${project.description}`.toLowerCase();
    return searchStr.includes(keyword.toLowerCase());
  });

  const start = (page - 1) * limit;
  const end = page * limit;
  return filteredProjects
    .slice(start, end)
    .map(convertToProject);
}

export async function getProjectsWithoutSummary(
  page: number,
  limit: number
): Promise<Project[]> {
  if (!page) {
    page = 1;
  }

  if (!limit) {
    limit = 20;
  }

  const filteredProjects = (projectsData as ProjectsData).projects.filter(p => !p.summary);
  const start = (page - 1) * limit;
  const end = page * limit;
  return filteredProjects
    .slice(start, end)
    .map(convertToProject);
}

export async function updateProject(uuid: string, project: Partial<Project>) {
  // 在使用JSON文件时，这个方法暂时不可用
  throw new Error("Update project is not supported in JSON mode");
}
