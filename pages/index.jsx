import { useBlog } from "../context/BlogContext";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Card from "@/components/Card";

export default function HomePage() {
  const { blogs } = useBlog();

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">List Blog</h1>

      {blogs.length === 0 && (
        <p className="text-center text-gray-500">No posts yet.</p>
      )}
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid item size={{md:3, xs:12}} key={blog.id}>
            <Link href={`/blog/${blog.id}`} passHref>
             <Card title={(blog.title)} author={blog.author} date={blog.date} summary={blog.summary}category={blog.category}/> 
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
