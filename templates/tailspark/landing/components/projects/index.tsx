"use client";

import { Project } from "@/types/project";
import ProjectItem from "./item";
import Link from "next/link";
import { useState } from "react";

const NavButton = ({ 
  icon, 
  text, 
  isActive, 
  isCollapsed 
}: { 
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
  isCollapsed: boolean;
}) => (
  <button 
    className={`
      flex items-center w-full 
      ${isCollapsed ? 'justify-center' : 'justify-start'} 
      space-x-2 px-3 py-2 rounded-lg
      ${isActive 
        ? 'bg-orange-100 text-orange-600' 
        : 'text-gray-600 hover:bg-gray-50'
      }
    `}
  >
    {icon}
    {!isCollapsed && <span>{text}</span>}
  </button>
);

export default ({
  projects,
  loading,
}: {
  projects: Project[];
  loading?: boolean;
}) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        {/* View All 链接 */}
        <div className="flex justify-end mb-6">
          <Link href="/view-all" className="text-orange-500 hover:text-orange-600">
            View All →
          </Link>
        </div>

        <div className="flex gap-6">
          {/* 左侧导航 */}
          <div 
            className={`
              transition-all duration-300 ease-in-out
              ${isNavCollapsed ? 'w-16' : 'w-56'}
            `}
          >
            <div className="sticky top-4 bg-white rounded-xl border border-gray-200 p-4">
              {/* 折叠按钮 */}
              <button 
                onClick={() => setIsNavCollapsed(!isNavCollapsed)}
                className="mb-4 text-gray-400 hover:text-gray-600 block w-full text-left"
              >
                {isNavCollapsed ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                )}
              </button>

              {/* 导航按钮 */}
              <div className="space-y-2">
                <NavButton
                  icon={<span className="text-lg">★</span>}
                  text="Featured"
                  isActive={true}
                  isCollapsed={isNavCollapsed}
                />
                
                <NavButton
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                  text="Latest"
                  isCollapsed={isNavCollapsed}
                />

                <NavButton
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  }
                  text="Clients"
                  isCollapsed={isNavCollapsed}
                />

                <NavButton
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  }
                  text="Hosted"
                  isCollapsed={isNavCollapsed}
                />

                <NavButton
                  icon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  }
                  text="Official"
                  isCollapsed={isNavCollapsed}
                />
              </div>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="flex-1">
            {!loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((item: Project, idx: number) => (
                  <ProjectItem key={idx} project={item} />
                ))}
              </div>
            ) : (
              <div className="mx-auto text-center">Loading data...</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
