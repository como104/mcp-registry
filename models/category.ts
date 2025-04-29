import { Category } from "@/types/category";
import { getProjectsCountByCategory } from "./project";
import categoriesData from "@/pagejson/categories.json";
import { CategoryData, CategoriesData } from "@/types/categories-data";

function convertToCategory(data: CategoryData): Category {
  return {
    ...data
  };
}

export async function insertCategory(category: Category) {
  // 在使用JSON文件时，这个方法暂时不可用
  throw new Error("Insert category is not supported in JSON mode");
}

export async function findCategoryByName(
  name: string
): Promise<Category | undefined> {
  if (!name) return undefined;
  
  const category = (categoriesData as CategoriesData).categories.find(c => c.name === name);
  if (!category) return undefined;
  
  return convertToCategory(category);
}

export async function getCategories(
  page: number,
  limit: number
): Promise<Category[]> {
  const start = (page - 1) * limit;
  const end = page * limit;
  
  const categories = (categoriesData as CategoriesData).categories.slice(start, end);
  
  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => ({
      ...convertToCategory(category),
      projects_count: await getProjectsCountByCategory(category.name)
    }))
  );
  
  return categoriesWithCount;
}
