import Image from "next/image";
import "@/app/blog_content.css";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetail({ params }: BlogPageProps) {
  const bolgSlug = (await params)["id"];
  const response = await fetch(
    `https://client-blog.ommnews.in/wp-json/custom/v1/posts/${bolgSlug}`,
    {
      cache: "no-store", // disable caching (optional)
    },
  );

  if (!response) {
    throw new Error("Failed to fetch blog");
  }

  const blog = await response.json();
  console.log("bolgSlug", bolgSlug);

  return (
    <div className="bg-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-900 text-center mb-6">
          <div
            className="text-black browser-default blog_content"
            dangerouslySetInnerHTML={{
              __html: blog?.title || "",
            }}
          />
          {/* {blog?.title} */}
        </h1>

        <div className="relative h-[350px] md:h-[550px] w-full mb-6">
          <Image
            src={blog?.thumbnail}
            alt={blog?.title || "Blog Image"}
            fill
            className="object-contain rounded-lg"
          />
        </div>

        <p className="text-gray-700 mt-6 text-center mx-auto text-justify leading-relaxed">
          {blog?.author?.description}
        </p>

        <div className="mt-12">
          <div
            className="text-black browser-default blog_content"
            dangerouslySetInnerHTML={{
              __html: blog?.content?.rendered || "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
