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
}

export default ({ query }: Props) => {
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
    if (!searchTerm.trim()) return;
    
    try {
      const url = `?q=${encodeURIComponent(searchTerm)}`;
      await router.push(url);
      setInputDisabled(true);
    } catch (e) {
      console.error("Search failed:", e);
      setInputDisabled(false);
    }
  };

  useEffect(() => {
    if (query) {
      setContent(query);
      setInputDisabled(false);
    }
  }, [query]);

  return (
    <div className="relative w-full max-w-xl mx-auto px-4">
      <input
        type="text"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:bg-gray-50 disabled:text-gray-500"
        placeholder="Search with keywords"
        ref={inputRef}
        value={content}
        disabled={inputDisabled}
        onChange={handleInputChange}
        onKeyDown={handleInputKeydown}
      />
      <button 
        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:text-gray-300"
        onClick={() => handleSubmit(content)}
        disabled={inputDisabled || !content.trim()}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  );
};
