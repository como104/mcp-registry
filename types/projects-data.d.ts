export interface ProjectData {
  uuid: string;
  name: string;
  title: string;
  description: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
  status?: string;
  author_name: string;
  author_avatar_url?: string;
  tags?: string[];
  category?: string;
  is_featured?: boolean;
  sort?: number;
  url: string;
  target: string;
  content?: string;
  summary?: string;
  img_url?: string;
  features?: string[];
}

export interface ProjectsData {
  projects: ProjectData[];
} 