import { createContext, useState, useContext, useEffect } from "react";

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }, [blogs]);

  const addBlog = (blog) => {
    setBlogs((prev) => [...prev, { ...blog, id: Date.now() }]);
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
