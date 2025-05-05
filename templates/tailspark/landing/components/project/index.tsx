"use client";

import { BiCategory } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import { Category } from "@/types/category";
import Crumb from "./crumb";
import Markdown from "@/components/markdown";
import Preview from "./preview";
import { Project } from "@/types/project";
import { recommendProjects } from "../projects";
import Projects from "../projects";
import Stars from "../stars";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default ({
  category,
  project,
  more_projects,
}: {
  category?: Category;
  project: Project;
  more_projects?: Project[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState(currentTab);

  const tabs = [
    { id: "overview", label: "Overview", href: `?` },
    { id: "content", label: "Content", href: `?tab=content` },
    { id: "tools", label: "Tools", href: `?tab=tools` },
    { id: "comment", label: "Comments", href: `?tab=comment` },
  ];

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const tagsArr = project.tags || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Crumb category={category} project={project} />

        {/* <div className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden"> */}
        <div>
          {/* <div className="grid lg:grid-cols-2 gap-0"> */}
            {/* 左侧内容区 */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                {(project.img_url || project.avatar_url) && (
                  <div className="h-10 w-10 rounded-lg object-cover">
                    <Preview project={project} />
                </div>
                )}
                <h1 className="text-3xl sm:text-3xl font-bold text-gray-900">{project.title}</h1>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0">
                    <Stars />
                  </span>
                  <span>Created by</span>
                  <span className="font-medium text-primary">{project.author_name}</span>
                  <span>{moment(project.updated_at).fromNow()}</span>
              </div>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                {project.description}
              </p>

              {/* <div className="mt-8 pt-8 border-t border-gray-200"> */}
              <div className="mt-1 pt-4 border-gray-200">
                <div className="space-y-6">
                  {/* <div>
                    <h3 className="flex items-center text-gray-900 font-medium mb-3">
                      <BiCategory className="w-5 h-5 mr-2" />
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/15 text-primary">
                        {project.category}
                      </Badge>
                    </div>
                  </div> */}

                  <div>
                    {/* <h3 className="flex items-center text-gray-900 font-medium mb-3">
                      <BsTags className="w-5 h-5 mr-2" />
                      Tags
                    </h3> */}
                    <div className="flex flex-wrap gap-2">
                      {tagsArr.map((tag) => (
                        // <Badge key={tag} variant="outline" className="border-gray-200 hover:bg-gray-100/80">
                        <Badge key={tag} variant="outline" className="border px-2 py-1 rounded-full text-xs truncate">
                          <span># {tag}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="mt-10">
                <a
                  href={project.url}
                  target="_blank"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Visit {project.title}
                  <span className="ml-2">→</span>
                </a>
              </div> */}
            </div>

            {/* 右侧预览图
            {(project.img_url || project.avatar_url) && (
              <div className="relative h-full min-h-[400px] lg:min-h-full bg-gray-100">
                <Preview project={project} />
              </div>
            )} */}
          </div>
        

        {/* {project.summary && (
          <div className="mt-12 bg-white rounded-xl shadow p-8">
            <Markdown content={project.summary || ""} />
          </div>
        )} */}
        
        <div className="flex flex-wrap items-start gap-4 border-t mt-8">
          {/* 左侧块 */}
          <div className="w-full md:flex-1">
            <div className="flex items-center gap-2 my-4">
              {tabs.map((tab) => (
                <a
                  key={tab.id}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.id);
                    router.push(tab.href);
                  }}
                  className={`cursor-pointer py-2 px-4 font-medium flex items-center border-b-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-primary border-primary"
                      : "text-gray-700 border-transparent hover:text-primary hover:border-primary"
                  }`}
                >
                  {tab.label}
                </a>
              ))}
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <div className="text-2xl font-semibold leading-none tracking-tight mb-4">{project.title || ""}</div>
                <div>{project.summary || ""}</div>
              </div>
            </div>
          </div>
          {/* 右侧块 */}
          <div className="w-full md:w-2/5 px-0 md:px-8 py-8">
            <div className="w-full mt-4 mb-8">
              <div className="mt-5">
                <a
                  href={project.url}
                  target="_blank"
                  className="inline-flex items-center px-4 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors duration-200"
                >
                  Visit {project.title}
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
            <div className="rounded-lg mb-8">
              <h2 className="text-lg font-medium mb-4">Server Config</h2>
            </div>
            <div>
              <div className="text-lg font-medium mb-4">
                <span>Recommend Servers</span>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {more_projects && <Projects projects={more_projects} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
