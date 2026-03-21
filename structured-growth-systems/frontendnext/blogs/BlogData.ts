export type Blog = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  content: string;
};

export const flourBlogs: Blog[] = [
  {
    id: 1,
    title: "Heritage of Groce Berry Flour Manufacturing",
    category: "Company Overview",
    description:
      "Discover our legacy of high-quality flour production and supply.",
    image: "/flour-blog-imgs/flour5.1.png",
    date: "Feb 10, 2026",
    content:
      "Groce Berry has been delivering premium flour products with advanced milling technology and trusted sourcing practices across India...",
  },
  {
    id: 2,
    title: "Premium Flour Quality Standards",
    category: "Quality Control",
    description:
      "Understand how we maintain superior flour quality.",
    image: "/flour-blog-imgs/flour5.2.png",
    date: "Feb 08, 2026",
    content:
      "Every batch undergoes strict laboratory testing to ensure nutritional value, hygiene, and consistency...",
  },
  {
    id: 3,
    title: "From Grain to Flour: The Production Journey",
    category: "Manufacturing",
    description:
      "Learn how wheat transforms into high-quality flour.",
    image: "/flour-blog-imgs/flour5.3.png",
    date: "Feb 05, 2026",
    content:
      "Our production process starts with careful grain selection and continues through automated milling and packaging systems...",
  },
  {
    id: 4,
    title: "Types of Flour We Produce",
    category: "Product Range",
    description:
      "Explore the different flour varieties we offer.",
    image: "/flour-blog-imgs/flour50.1.png",
    date: "Feb 02, 2026",
    content:
      "We produce chakki atta, maida, semolina, and customized blends for industrial use...",
  },
  {
    id: 5,
    title: "Sustainable Milling Practices",
    category: "Sustainability",
    description:
      "How we ensure eco-friendly production.",
    image: "/flour-blog-imgs/flour50.2.png",
    date: "Jan 30, 2026",
    content:
      "Our plant incorporates energy-efficient systems and waste reduction strategies...",
  },
  {
    id: 6,
    title: "Bulk Supply for Businesses",
    category: "Wholesale",
    description:
      "Reliable flour supply for bakeries and restaurants.",
    image: "/flour-blog-imgs/flour5.1.png",
    date: "Jan 27, 2026",
    content:
      "We offer large-scale supply solutions with consistent quality and timely delivery...",
  },
  {
    id: 7,
    title: "Quality Testing & Packaging",
    category: "Testing",
    description:
      "Ensuring safety and freshness in every bag.",
    image: "/flour-blog-imgs/flour5.2.png",
    date: "Jan 25, 2026",
    content:
      "Advanced packaging ensures longer shelf life and contamination prevention...",
  },
  {
    id: 8,
    title: "Distribution Network Excellence",
    category: "Distribution",
    description:
      "Strong logistics for nationwide delivery.",
    image: "/flour-blog-imgs/flour5.3.png",
    date: "Jan 20, 2026",
    content:
      "Our distribution system guarantees timely delivery across regions...",
  },
];
