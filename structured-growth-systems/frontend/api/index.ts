import { OutputData } from "@editorjs/editorjs";

export interface EditorJsData {
  time: number;
  blocks: EditorJsBlock[];
  version: string;
}

export interface EditorJsBlock {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

export interface ProjectImage {
  id?: number;
  url: string;
  alt_text?: string;
  section: string;
  sort_order: number;
}

export interface ProjectPoint {
  id?: number;
  label: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  section: string;
}

export interface FloorPlan {
  id?: number;
  image: string;
  image_alt?: string;
  name: string;
  area_range: string;
  price_label: string;
  download_link: string;
  design_for: string[];
}

export interface Project {
  id?: number;
  slug: string;
  name: string;
  location: string;
  price: number;
  price_label: string;
  project_type: string;
  builder: string;
  status: string;
  brochure_url: string;
  rera_id: string;
  floors: string;
  area_range: string;
  overview_title?: string;
  overview_body_markdown: OutputData;
  specifications_markdown: OutputData;
  images: ProjectImage[];
  points: ProjectPoint[];
  floor_plans: FloorPlan[];
  is_published?: boolean;
}

export interface ProjectListItem {
  id: number;
  slug: string;
  name: string;
  location: string;
  price: number;
  price_label: string;
  project_type: string;
  status: string;
  floors: string;
  area_range: string;
  is_published: boolean;
  images: ProjectImage[];
}

export interface UploadedFile {
  url: string;
  contentType: string;
}

// ── API Config ─────────────────────────────────────────────────────────────

export const BASE_API =
  import.meta.env.VITE_API_BASE_URL || "http://192.168.0.192:3001";
export const UPLOAD_API =
  import.meta.env.VITE_UPLOAD_API_BASE_URL ||
  "http://192.168.0.192:3002/assets";

const defaultEmptyEditor = (): EditorJsData => ({
  time: Date.now(),
  blocks: [],
  version: "2.31.3",
});

export const emptyProject = (): Omit<Project, "id"> => ({
  slug: "",
  name: "",
  location: "",
  price: 0,
  price_label: "",
  project_type: "",
  builder: "",
  status: "",
  brochure_url: "",
  rera_id: "",
  floors: "",
  area_range: "",
  overview_title: "",
  overview_body_markdown: defaultEmptyEditor(),
  specifications_markdown: defaultEmptyEditor(),
  images: [],
  points: [],
  floor_plans: [],
});

// ── API Calls ──────────────────────────────────────────────────────────────

export async function fetchProjects(page: any): Promise<ProjectListItem[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_API}/api/v1/project?page=${page.page}`, {
    headers: {
      Authorization: token ? token : "",
    },
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function fetchProject(slug: string): Promise<Project> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_API}/api/v1/project/${slug}`, {
    headers: {
      Authorization: token ? token : "",
    },
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

export async function createProject(data: Omit<Project, "id">): Promise<void> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_API}/api/v1/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
}

export async function updateProject(data: Project): Promise<void> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_API}/api/v1/project`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify({
      ...data,
      price: parseInt(data.price.toString()),
    }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
}

export async function uploadFiles(
  files: File[],
  folder = "/uploads",
): Promise<UploadedFile[]> {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  const res = await fetch(
    `${UPLOAD_API}/api/v1/upload/multiple?folder=${folder}`,
    {
      method: "POST",
      body: formData,
    },
  );
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}
