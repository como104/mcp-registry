"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface Props {
  query?: string;
  compact?: boolean;
}

export default ({ query, compact }: Props) => {
  const router = useRouter();
  const [inputDisabled, setInputDisabled] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit(e.currentTarget.value);
      }
    }
  };

  const handleSubmit = async (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();
    let url: string;

    if (!trimmedSearchTerm) {
      url = "?q="; // Navigate with an empty query to signify "show all"
    } else {
      url = `?q=${encodeURIComponent(trimmedSearchTerm)}`;
    }
    
    try {
      await router.push(url);
    } catch (e) {
      console.error("Search failed:", e);
      setInputDisabled(false); // Re-enable on error
    }
  };

  useEffect(() => {
    if (query) {
      setContent(query);
      setInputDisabled(false);
    } else {
      setContent("");
    }
  }, [query]);

  const containerClasses = compact
    ? "relative w-80"
    : "relative w-full max-w-2xl mx-auto px-4";

  const inputClasses = compact
    ? "w-full rounded-md border border-gray-300 px-3 py-2 pr-8 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
    : "w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500";
  
  const buttonClasses = compact
    ? "absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:text-gray-300"
    : "absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:text-gray-300";

  return (
    <div className={containerClasses}>
      <input
        type="text"
        className={inputClasses}
        placeholder={compact ? "Search MCP..." : "Search with keywords"}
        ref={inputRef}
        value={content}
        disabled={inputDisabled}
        onChange={handleInputChange}
        onKeyDown={handleInputKeydown}
      />
      <button 
        className={buttonClasses}
        onClick={() => handleSubmit(content)}
        disabled={inputDisabled}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
};
