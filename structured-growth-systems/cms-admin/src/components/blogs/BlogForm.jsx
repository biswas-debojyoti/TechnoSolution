import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, X, Image, Save, Eye } from 'lucide-react'
import { useBlog } from '../../hooks/useData'
import { api, getErrorMessage } from '../../lib/api'
import { LoadingState, Spinner } from '../ui'
import EditorField from '../ui/EditorField'
import toast from 'react-hot-toast'

export default function BlogForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const { blog, isLoading } = useBlog(id)

  const [form, setForm] = useState({
    heading: '', subHeading: '', status: 'draft'
  })
  const [content, setContent] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    if (blog) {
      setForm({
        heading: blog.heading || '',
        subHeading: blog.subHeading || '',
        status: blog.status || 'draft',
      })
      setContent(blog.content || {})
      if (blog.image?.hasImage) {
        setImagePreview(`/api/blogs/${blog._id}/image`)
      }
    }
  }, [blog])

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB')
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const validate = () => {
    const e = {}
    if (!form.heading.trim()) e.heading = 'Heading is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('heading', form.heading.trim())
      fd.append('subHeading', form.subHeading.trim())
      fd.append('status', form.status)
      fd.append('content', JSON.stringify(content))
      if (imageFile) fd.append('image', imageFile)

      if (isEdit) {
        await api.put(`/blogs/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Blog updated!')
      } else {
        await api.post('/blogs', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        toast.success('Blog created!')
      }
      navigate('/blogs')
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (isEdit && isLoading) return <LoadingState text="Loading blog…" />

  return (
    <div className="space-y-5 page-enter max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/blogs')} className="btn-icon btn-ghost">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h2 className="font-display text-2xl font-bold text-cream">
            {isEdit ? 'Edit Blog' : 'New Blog'}
          </h2>
          <p className="text-ink-500 text-sm mt-0.5">
            {isEdit ? `Editing: ${blog?.heading}` : 'Create a new blog post'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Main card */}
        <div className="card p-5 space-y-4">
          {/* Heading */}
          <div>
            <label className="label">Heading *</label>
            <input
              type="text"
              value={form.heading}
              onChange={set('heading')}
              placeholder="Enter blog title"
              className={`input ${errors.heading ? 'border-danger/60' : ''}`}
            />
            {errors.heading && <p className="text-danger text-xs mt-1">{errors.heading}</p>}
          </div>

          {/* Sub Heading */}
          <div>
            <label className="label">Sub Heading</label>
            <input
              type="text"
              value={form.subHeading}
              onChange={set('subHeading')}
              placeholder="Optional sub-title or summary"
              className="input"
            />
          </div>

          {/* Content */}
          <div>
            <label className="label">Content</label>
            <EditorField value={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar-style right column */}
        <div className="card p-5 space-y-4">
          {/* Status */}
          <div>
            <label className="label">Status</label>
            <div className="flex gap-2">
              {['draft', 'published'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({ ...form, status: s })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-150 ${
                    form.status === s
                      ? s === 'published'
                        ? 'bg-success/15 text-success border-success/30'
                        : 'bg-ink-600/60 text-ink-200 border-ink-500'
                      : 'bg-transparent text-ink-500 border-ink-700 hover:border-ink-500'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="label">Featured Image</label>
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border border-ink-600">
                <img src={imagePreview} alt="Preview" className="w-full h-44 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-7 h-7 bg-ink-950/80 rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-cream" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full h-36 rounded-lg border-2 border-dashed border-ink-600 hover:border-amber/50 hover:bg-amber/5 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-ink-500 hover:text-amber"
              >
                <Image className="w-7 h-7" />
                <span className="text-sm">Click to upload image</span>
                <span className="text-xs text-ink-600">JPEG, PNG, WEBP · max 5MB</span>
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => navigate('/blogs')} className="btn-ghost btn">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="btn-primary btn min-w-[120px] justify-center">
            {saving ? <Spinner size="sm" /> : (
              <>
                <Save className="w-4 h-4" />
                {isEdit ? 'Update' : 'Publish'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
