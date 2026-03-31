import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link, Route } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  X,
  ImageIcon,
  Save,
  Eye,
  Loader2,
} from "lucide-react";
import { useBlog } from "../hooks/useData";
import { blogApi } from "../lib/api";
import { useToast } from "../context/ToastContext";
import { Spinner, Skeleton } from "../components/ui/index";
import RichEditor from "../components/blog/RichEditor";

const MAX_SIZE = 5 * 1024 * 1024;

export default function BlogFormPage() {
  const { id } = useParams();
  const isEdit = !!id && id !== "new";
  const navigate = useNavigate();
  const toast = useToast();
  const fileRef = useRef();

  const { blog, isLoading } = useBlog(isEdit ? id : null);

  const [form, setForm] = useState({
    heading: "",
    subHeading: "",
    status: "draft",
  });
  const [content, setContent] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [editorReady, setEditorReady] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (blog && isEdit) {
      setForm({
        heading: blog.heading || "",
        subHeading: blog.subHeading || "",
        status: blog.status || "draft",
      });
      if (blog.content && Object.keys(blog.content).length > 0)
        setContent(blog.content);
      if (blog.image?.hasImage) setImagePreview(blogApi.imageUrl(id));
    }
    // Mark editor as ready after data is populated
    if (!isEdit || blog) setEditorReady(true);
  }, [blog, isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_SIZE) {
      toast.error("Image must be under 5MB.");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const validate = () => {
    const e = {};
    if (!form.heading.trim()) e.heading = "Heading is required.";
    return e;
  };

  const handleSave = async (statusOverride) => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSaving(true);

    try {
      const fd = new FormData();
      fd.append("heading", form.heading.trim());
      fd.append("subHeading", form.subHeading.trim());
      fd.append("status", statusOverride || form.status);
      fd.append("content", JSON.stringify(content));
      if (imageFile) fd.append("image", imageFile);

      if (isEdit) {
        await blogApi.update(id, fd);
        toast.success("Blog updated.");
        navigate("/blogs");
      } else {
        await blogApi.create(fd);
        toast.success("Blog created.");
        navigate("/blogs");
      }
    } catch (e) {
      toast.error(e.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 h-14 border-b border-[var(--border)] bg-[var(--bg-surface)]">
          <Skeleton className="h-5 w-48" />
        </div>
        <div className="flex flex-1 overflow-hidden p-6 gap-5">
          <div className="flex-1 space-y-4">
            {[80, 60, 300].map((h, i) => (
              <Skeleton key={i} className={`h-${h === 300 ? 64 : 10}`} />
            ))}
          </div>
          <div className="w-64 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 h-14 border-b border-[var(--border)] bg-[var(--bg-surface)] shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/blogs"
            className="p-1.5 rounded-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
          >
            <ArrowLeft size={15} />
          </Link>
          <div className="w-px h-4 bg-[var(--border)]" />
          <h1
            className="text-sm font-semibold text-[var(--text-primary)]"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            {isEdit ? "Edit Blog Post" : "New Blog Post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="btn-ghost text-xs py-1.5 px-3"
          >
            {saving ? <Spinner size={12} /> : <Save size={12} />}
            Save draft
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving}
            className="btn-primary text-xs py-1.5 px-3"
          >
            {saving ? <Spinner size={12} /> : <Eye size={12} />}
            Publish
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main editor area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Heading */}
          <div className="mb-4">
            <input
              value={form.heading}
              onChange={(e) =>
                setForm((p) => ({ ...p, heading: e.target.value }))
              }
              placeholder="Post title…"
              className={`w-full bg-transparent border-0 border-b text-2xl font-bold
                text-[var(--text-primary)] placeholder-[var(--text-muted)]
                focus:outline-none pb-3 mb-1
                ${errors.heading ? "border-red-500/60" : "border-[var(--border)] focus:border-amber-500/40"}
                transition-colors`}
              style={{ fontFamily: "Syne, sans-serif" }}
            />
            {errors.heading && (
              <p className="text-xs text-red-400 mt-1">{errors.heading}</p>
            )}
          </div>

          {/* Subheading */}
          <div className="mb-6">
            <input
              value={form.subHeading}
              onChange={(e) =>
                setForm((p) => ({ ...p, subHeading: e.target.value }))
              }
              placeholder="Subtitle or short description…"
              className="w-full bg-transparent border-0 text-base text-[var(--text-secondary)] placeholder-[var(--text-muted)] focus:outline-none pb-2 italic"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            />
          </div>

          {/* EditorJS */}
          <div className="card p-4 min-h-[400px]">
            {editorReady ? (
              <RichEditor
                data={content}
                onChange={setContent}
                holder={`editor-${id || "new"}`}
              />
            ) : (
              <div className="flex items-center justify-center h-64">
                <Spinner size={20} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 shrink-0 border-l border-[var(--border)] overflow-y-auto bg-[var(--bg-surface)]">
          <div className="p-4 space-y-5">
            {/* Status */}
            <div>
              <p className="section-label mb-2">Status</p>
              <div className="flex gap-2">
                {["draft", "published"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setForm((p) => ({ ...p, status: s }))}
                    className={`flex-1 py-1.5 text-xs rounded-sm border transition-colors capitalize
                      ${
                        form.status === s
                          ? s === "published"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-[var(--bg-hover)] border-[var(--border-light)] text-[var(--text-primary)]"
                          : "border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured image */}
            <div>
              <p className="section-label mb-2">Featured Image</p>
              {imagePreview ? (
                <div className="relative rounded-sm overflow-hidden border border-[var(--border)]">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="w-full h-36 object-cover"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-sm bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                  >
                    <X size={11} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full h-28 rounded-sm border-2 border-dashed border-[var(--border)] hover:border-amber-500/30 hover:bg-amber-500/5 transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <ImageIcon size={18} className="text-[var(--text-muted)]" />
                  <span className="text-xs text-[var(--text-muted)]">
                    Click to upload
                  </span>
                  <span className="text-xs text-[var(--text-muted)] opacity-60">
                    JPEG, PNG, WEBP · max 5MB
                  </span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <button
                  onClick={() => fileRef.current?.click()}
                  className="mt-2 w-full btn-ghost text-xs py-1.5 justify-center"
                >
                  <Upload size={11} /> Replace image
                </button>
              )}
            </div>

            {/* Meta */}
            {isEdit && blog && (
              <div className="border-t border-[var(--border)] pt-4 space-y-2">
                <p className="section-label mb-2">Meta</p>
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]">
                    Created
                  </span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[var(--text-muted)]">ID</span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">
                    {blog._id?.slice(-8)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
