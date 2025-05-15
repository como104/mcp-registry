import Faq from "../components/faq";
import Hero from "../components/hero";
import { Page } from "@/types/landing";
import { Project } from "@/types/project";
import Projects from "../components/projects";
// Search component is now rendered within Header

/**
 * 首页组件
 * @param {Object} props - 组件属性
 * @param {Page} props.page - 页面配置数据
 * @param {Project[]} props.projects - 项目列表数据
 * @param {number} props.projectsCount - 项目总数
 * @returns {JSX.Element} 首页布局
 */
export default function ({
  page,
  projects,
  projectsCount,
}: {
  page: Page;
  projects: Project[];
  projectsCount: number;
}) {
  // Extract search query from page data if available, or from URL query params
  const searchQuery = page?.metadata?.searchQuery; // Assuming searchQuery might come from page data

  return (
    <div>
      {/* Hero区域，Header现在内部处理搜索框 */}
      {page.hero && <Hero hero={page.hero} count={projectsCount} />}
      
      {/* Search component is removed from here, it's now part of the Header or another specific section */}
      {/* If you need a search bar here specifically, it would be a different instance */}
      
      {/* 项目列表组件 */}
      <Projects projects={projects} />
      
      {/* 常见问题区域，当page.faq存在时显示 */}
      {page.faq && <Faq section={page.faq} />}
    </div>
  );
}
