import Link from "next/link";
import Image from "next/image";
import { Blog } from "./BlogData";

export default function BlogCard({ blog }: any) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div
        className="
        bg-white 
        shadow-md 
        rounded-lg 
        overflow-hidden 
        hover:shadow-xl   
        transition 
        cursor-pointer
        flex 
        flex-col
        h-full     /* FIXED HEIGHT */
      "
      >
        {/* IMAGE */}
        <div className="relative h-[320px] overflow-hidden group">
          <Image
            src={blog?.thumbnail}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute top-3 left-2 bg-green-900 text-white text-xs px-1 py-1 rounded">
            {blog.date}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="font-semibold text-green-900 text-base mb-2 line-clamp-2">
            <div
              className="text-black browser-default blog_content"
              dangerouslySetInnerHTML={{
                __html: blog?.title || "",
              }}
            />
            {/* {blog.title} */}
          </h2>

          {/* <p className="text-green-800 text-sm mb-3 line-clamp-3 flex-grow">
            {blog.description}
          </p> */}

          <span className="text-green-700 text-sm font-medium hover:underline mt-auto">
            Continue reading
          </span>
        </div>
      </div>
    </Link>
  );
}
