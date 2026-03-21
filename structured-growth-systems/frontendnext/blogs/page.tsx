import BlogCard from "./BlogCard";

async function getFlourBlogs() {
  const response = await fetch(
    "https://client-blog.ommnews.in/wp-json/custom/v1/posts?categories=Groceberry",
    {
      cache: "no-store", // always fresh data
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
}

export const metadata = {
  title: "Groceberry Blogs | Health Tips & Natural Food Insights",
  description:
    "Discover Groceberry blogs on healthy living, nutrition tips, Chakki Atta benefits, and natural food insights to help you make better everyday food choices.",
};

export default async function FlourBlogPage() {
  const flourBlogs = await getFlourBlogs();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <h1 className="text-green-900 text-3xl md:text-4xl font-bold text-center mb-12">
        Flour Insights & Articles
      </h1>

      <div className="max-w-7xl mx-auto grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {flourBlogs?.map((blog: any) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
