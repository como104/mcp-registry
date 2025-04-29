export interface CategoryData {
  uuid: string;
  name: string;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
  status: string;
  sort: number;
}

export interface CategoriesData {
  categories: CategoryData[];
} 