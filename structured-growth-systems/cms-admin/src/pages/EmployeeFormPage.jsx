import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, UploadCloud, File as FileIcon, X, Info, Eye, EyeOff } from 'lucide-react'
import { employeeApi } from '../lib/api'
import { useEmployee } from '../hooks/useData'
import { useToast } from '../context/ToastContext'

const MODULES = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'inquiries', label: 'Inquiries' },
  { id: 'employees', label: 'Employees' },
]

export default function EmployeeFormPage() {
  const { id } = useParams()
  const isEdit = !!id
  const navigate = useNavigate()
  const toast = useToast()
  
  const { employee, isLoading: isFetching } = useEmployee(id)
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contactNo: '',
    whatsappNo: '',
    designation: '',
    joiningDate: '',
    salary: '',
    userId: '',
    password: '',
    permissions: ['dashboard:read']
  })

  const [imageFile, setImageFile] = useState(null)
  const [documentFiles, setDocumentFiles] = useState([])
  const [existingDocs, setExistingDocs] = useState([])
  const [showPassword, setShowPassword] = useState(false)

  // Populate form if editing
  useEffect(() => {
    if (isEdit && employee) {
      setFormData({
        name: employee.name || '',
        age: employee.age || '',
        contactNo: employee.contactNo || '',
        whatsappNo: employee.whatsappNo || '',
        designation: employee.designation || '',
        joiningDate: employee.joiningDate ? employee.joiningDate.split('T')[0] : '',
        salary: employee.salary || '',
        userId: employee.userId || '',
        password: '', // Don't populate password
        permissions: employee.permissions || ['dashboard:read']
      })
      setExistingDocs(employee.documents || [])
    }
  }, [isEdit, employee])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleModulePermissionChange = (moduleId, type, checked) => {
    setFormData((prev) => {
      let perms = [...prev.permissions]
      const readStr = `${moduleId}:read`
      const writeStr = `${moduleId}:write`
      
      if (type === 'read') {
        if (checked) {
          if (!perms.includes(readStr)) perms.push(readStr)
        } else {
          perms = perms.filter(p => p !== readStr && p !== writeStr) 
        }
      } else if (type === 'write') {
        if (checked) {
          if (!perms.includes(writeStr)) perms.push(writeStr)
          if (!perms.includes(readStr)) perms.push(readStr)
        } else {
          perms = perms.filter(p => p !== writeStr)
        }
      }
      return { ...prev, permissions: perms }
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > 1024 * 1024) {
      toast.error('Image limits strictly to 1MB')
      return
    }
    if (file) setImageFile(file)
  }

  const handleDocumentChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = []
    for (const file of files) {
      if (file.size > 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 1MB limit and was rejected`)
      } else {
        validFiles.push(file)
      }
    }
    if (validFiles.length > 0) {
      setDocumentFiles((prev) => [...prev, ...validFiles])
    }
  }

  const removeDocument = (index) => {
    setDocumentFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      
      Object.keys(formData).forEach((key) => {
        if (key === 'permissions') {
          data.append(key, JSON.stringify(formData[key]))
        } else if (key === 'password') {
          if (formData[key]) data.append(key, formData[key]) // Only send if not empty
        } else {
          data.append(key, formData[key])
        }
      })

      if (imageFile) data.append('image', imageFile)
      documentFiles.forEach((file) => data.append('documents', file))

      if (isEdit) {
        await employeeApi.update(id, data)
        toast.success('Employee updated successfully')
      } else {
        await employeeApi.create(data)
        toast.success('Employee created successfully')
      }
      navigate('/employees')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error saving employee')
    } finally {
      setLoading(false)
    }
  }

  if (isEdit && isFetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/employees')}
            className="p-1.5 rounded-md hover:bg-[var(--bg-hover)] transition-colors text-[var(--text-secondary)]"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold font-display text-[var(--text-primary)] leading-none">
              {isEdit ? 'Edit Employee' : 'Add Employee'}
            </h1>
          </div>
        </div>
        
        <button onClick={handleSubmit} disabled={loading} className="btn-primary text-sm px-4 py-1.5 h-8">
          {loading ? (
            <span className="w-3 h-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <Save size={14} />
          )}
          <span>{isEdit ? 'Update' : 'Save'}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10">
        <form onSubmit={handleSubmit} className="card p-5 space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            <div className="space-y-5">
              <div>
                <h3 className="section-label mb-3 pb-1 border-b border-[var(--border)] text-xs">Personal & Job Info</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Name</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input-field text-sm py-1.5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Age</label>
                    <input type="number" name="age" required value={formData.age} onChange={handleChange} className="input-field text-sm py-1.5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Contact No</label>
                    <input type="text" name="contactNo" required value={formData.contactNo} onChange={handleChange} className="input-field text-sm py-1.5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">WhatsApp No</label>
                    <input type="text" name="whatsappNo" value={formData.whatsappNo} onChange={handleChange} className="input-field text-sm py-1.5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Designation</label>
                    <input type="text" name="designation" required value={formData.designation} onChange={handleChange} className="input-field text-sm py-1.5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Joining Date</label>
                    <input type="date" name="joiningDate" required value={formData.joiningDate} onChange={handleChange} className="input-field text-sm py-1.5" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">Salary</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] text-sm">$</span>
                      <input type="number" name="salary" required value={formData.salary} onChange={handleChange} className="input-field pl-6 text-sm py-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="section-label mb-3 pb-1 border-b border-[var(--border)] text-xs">Credentials</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">User ID</label>
                    <input type="text" name="userId" required value={formData.userId} onChange={handleChange} className="input-field text-sm py-1.5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[var(--text-secondary)]">New Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        required={!isEdit} 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="input-field text-sm py-1.5 pr-8" 
                        placeholder={isEdit ? "•••••••• (Leave blank to keep same)" : "••••••••"} 
                        minLength="6" 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                        tabIndex="-1"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] sticky top-0">
              <label className="text-sm font-semibold text-[var(--text-primary)] block mb-3">Module Permissions</label>
              <div className="space-y-3">
                <div className="grid grid-cols-[1fr,auto,auto] gap-4 mb-2 px-2 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  <div>Module</div>
                  <div className="text-center w-12">Read</div>
                  <div className="text-center w-12">Write</div>
                </div>

                <div className="divide-y divide-[var(--border)]">
                  {MODULES.map(mod => {
                    const canRead = formData.permissions.includes(`${mod.id}:read`)
                    const canWrite = formData.permissions.includes(`${mod.id}:write`)
                    return (
                      <div key={mod.id} className="grid grid-cols-[1fr,auto,auto] gap-4 items-center py-2.5 px-2 hover:bg-[var(--bg-surface)] rounded-md transition-colors">
                        <span className="text-sm font-medium text-[var(--text-primary)]">{mod.label}</span>
                        <div className="flex justify-center w-12">
                          <input type="checkbox" checked={canRead} onChange={(e) => handleModulePermissionChange(mod.id, 'read', e.target.checked)} className="checkbox-standard" />
                        </div>
                        <div className="flex justify-center w-12">
                          <input type="checkbox" checked={canWrite} onChange={(e) => handleModulePermissionChange(mod.id, 'write', e.target.checked)} className="checkbox-standard" disabled={!canRead && !formData.permissions.includes(`${mod.id}:read`)} />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] flex gap-2 items-start">
                  <Info size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Read access allows viewing the module grid. Write access allows creation, editing, and management.
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div>
            <h3 className="section-label mb-3 pb-1 border-b border-[var(--border)] flex items-center justify-between text-xs">
              <span>Files & Attachments</span>
              <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-amber-600 bg-amber-500/10 rounded font-medium">
                <Info size={12} /> Strict Max Size: 1 MB
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)] block">Profile Image {isEdit && "(Upload new to replace)"}</label>
                <div className="relative group">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-surface)] cursor-pointer hover:border-amber-500 hover:bg-amber-500/5 transition-all overflow-hidden relative">
                    {imageFile ? (
                      <img src={URL.createObjectURL(imageFile)} alt="Preview" className="w-full h-full object-cover" />
                    ) : isEdit && employee?.image ? (
                      <img src={employeeApi.imageUrl(id)} alt="Current" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <UploadCloud className="w-5 h-5 mb-1.5 text-[var(--text-muted)] group-hover:text-amber-500" />
                        <p className="text-xs text-[var(--text-secondary)]">Click to upload</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                  {imageFile && (
                    <button type="button" onClick={() => setImageFile(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[var(--text-secondary)] block">Onboarding Documents</label>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[var(--border)] rounded-xl bg-[var(--bg-surface)] cursor-pointer hover:border-amber-500 hover:bg-amber-500/5 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <FileIcon className="w-5 h-5 mb-1.5 text-[var(--text-muted)] group-hover:text-amber-500" />
                    <p className="text-xs text-[var(--text-secondary)]">Upload new files</p>
                  </div>
                  <input type="file" multiple className="hidden" accept=".pdf,.doc,.docx,image/*" onChange={handleDocumentChange} />
                </label>

                <div className="mt-2 space-y-1.5">
                  {/* Existing Docs */}
                  {existingDocs.map((doc) => (
                    <div key={doc._id} className="flex items-center justify-between px-2.5 py-1.5 bg-[var(--bg-elevated)]/50 border border-[var(--border)] rounded-md text-[10px]">
                      <div className="flex items-center gap-2 truncate text-[var(--text-secondary)]">
                        <FileIcon size={10} className="text-blue-500 shrink-0" />
                        <span className="truncate">{doc.filename}</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-[var(--text-muted)]">Current</span>
                    </div>
                  ))}
                  {/* New Docs */}
                  {documentFiles.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between px-2.5 py-1.5 bg-amber-500/5 border border-amber-500/20 rounded-md text-[10px]">
                      <div className="flex items-center gap-2 truncate text-[var(--text-secondary)]">
                        <FileIcon size={10} className="text-amber-500 shrink-0" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <button type="button" onClick={() => removeDocument(idx)} className="text-[var(--text-muted)] hover:text-red-500 shrink-0">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
