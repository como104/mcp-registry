import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import { Project } from "@/types/project";
import moment from "moment";

export default ({ project }: { project: Project }) => {
  return (
    <Link
      href={
        project.target === "_blank"
          ? project.url || ""
          : `/server/${project.name}`
      }
      target={project.target || "_self"}
      className="block"
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <div className="absolute right-4 top-4">
          <button className="text-yellow-400 hover:text-yellow-500">
            <span className="text-xl">★</span>
          </button>
        </div>

        <div className="mb-4 flex items-center space-x-3">
          {project.avatar_url ? (
            <LazyLoadImage
              src={project.avatar_url}
              placeholderSrc="/logo.png"
              alt={project.title}
              className="h-10 w-10 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <span className="text-xl text-gray-400">?</span>
            </div>
          )}
          <h3 className="flex-1 font-medium text-gray-900">{project.title}</h3>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {project.description}
        </p>

        <div className="flex items-center text-sm text-gray-500">
          <span>{moment(project.created_at).fromNow()}</span>
        </div>
      </div>
    </Link>
  );
};
