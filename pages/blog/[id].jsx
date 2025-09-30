import { useRouter } from "next/router";
import { useBlog } from "../context/BlogContext";
import Pagedetail from "@/components/Blogdetail";
import { Box, Button } from "@mui/material";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { blogs } = useBlog();

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <p className="text-gray-500">No Result.</p>
      </div>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" p={3}>
      <Pagedetail
        author={blog.author}
        category={blog.category}
        date={blog.date}
        content={blog.content}
        title={blog.title}
        summary={blog.summary}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
