import Faq from "../components/faq";
import Hero from "../components/hero";
import { Page } from "@/types/landing";
import { Project } from "@/types/project";
import Projects from "../components/projects";
import Search from "../components/search";

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
  return (
    <div>
      {/* 英雄区域，当page.hero存在时显示 */}
      {page.hero && <Hero hero={page.hero} count={projectsCount} />}
      
      {/* 搜索组件 */}
      <Search />
      
      {/* 项目列表组件 */}
      <Projects projects={projects} />
      
      {/* 常见问题区域，当page.faq存在时显示 */}
      {page.faq && <Faq section={page.faq} />}
    </div>
  );
}
