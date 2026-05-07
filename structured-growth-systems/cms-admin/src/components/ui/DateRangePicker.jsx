import { useState, useRef, useEffect } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X, ChevronDown } from 'lucide-react'
import clsx from 'clsx'

const presets = [
  { label: 'Today', getValue: () => { 
      const start = new Date(); start.setHours(0,0,0,0);
      const end = new Date(); end.setHours(23,59,59,999);
      return { start, end } 
    } 
  },
  { label: 'Yesterday', getValue: () => { 
      const start = new Date(); start.setDate(start.getDate() - 1); start.setHours(0,0,0,0);
      const end = new Date(); end.setDate(end.getDate() - 1); end.setHours(23,59,59,999);
      return { start, end } 
    } 
  },
  { label: 'Last 7 Days', getValue: () => { 
      const end = new Date(); end.setHours(23,59,59,999);
      const start = new Date(); start.setDate(start.getDate() - 6); start.setHours(0,0,0,0);
      return { start, end } 
    } 
  },
  { label: 'Last 14 Days', getValue: () => { 
      const end = new Date(); end.setHours(23,59,59,999);
      const start = new Date(); start.setDate(start.getDate() - 13); start.setHours(0,0,0,0);
      return { start, end } 
    } 
  },
  { label: 'Last 3 Months', getValue: () => { 
      const end = new Date(); end.setHours(23,59,59,999);
      const start = new Date(); start.setMonth(start.getMonth() - 3); start.setHours(0,0,0,0);
      return { start, end } 
    } 
  },
  { label: 'Last 6 Months', getValue: () => { 
      const end = new Date(); end.setHours(23,59,59,999);
      const start = new Date(); start.setMonth(start.getMonth() - 6); start.setHours(0,0,0,0);
      return { start, end } 
    } 
  },
  { label: 'This Month', getValue: () => { const d = new Date(); return { start: new Date(d.getFullYear(), d.getMonth(), 1), end: new Date(d.getFullYear(), d.getMonth() + 1, 0) } } },
  { label: 'This Financial Year', getValue: () => { 
      const d = new Date(); 
      const year = d.getMonth() < 3 ? d.getFullYear() - 1 : d.getFullYear();
      return { start: new Date(year, 3, 1), end: new Date(year + 1, 2, 31) };
    } 
  },
  { label: 'This Year', getValue: () => { const d = new Date(); return { start: new Date(d.getFullYear(), 0, 1), end: new Date(d.getFullYear(), 11, 31) } } },
]

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function DateRangePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(new Date())
  const containerRef = useRef(null)

  const { start, end } = value || { start: null, end: null }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleDateClick = (date) => {
    if (!start || (start && end)) {
      onChange({ start: date, end: null })
    } else {
      if (date < start) {
        onChange({ start: date, end: start })
      } else {
        onChange({ start, end: date })
      }
    }
  }

  const handlePresetClick = (preset) => {
    const range = preset.getValue()
    onChange(range)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange({ start: null, end: null })
  }

  const isSelected = (date) => {
    if (!date) return false
    return (start && date.toDateString() === start.toDateString()) || 
           (end && date.toDateString() === end.toDateString())
  }

  const isInRange = (date) => {
    if (!date || !start || !end) return false
    return date > start && date < end
  }

  const changeMonth = (offset) => {
    const next = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1)
    setViewDate(next)
  }

  const renderCalendar = () => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))

    return (
      <div className="flex-1 p-6 min-w-[320px]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-[var(--bg-elevated)] rounded-full transition-colors">
            <ChevronLeft size={16} className="text-[var(--text-muted)]" />
          </button>
          <h3 className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: 'Syne, sans-serif' }}>
            {months[month]} {year}
          </h3>
          <button onClick={() => changeMonth(1)} className="p-1 hover:bg-[var(--bg-elevated)] rounded-full transition-colors">
            <ChevronRight size={16} className="text-[var(--text-muted)]" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-1 mb-2">
          {weekDays.map(d => (
            <div key={d} className="text-center text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider py-2">
              {d}
            </div>
          ))}
          {days.map((date, i) => {
            const selected = isSelected(date)
            const inRange = isInRange(date)
            const isToday = date && date.toDateString() === new Date().toDateString()
            
            return (
              <div key={i} className="relative py-1">
                {inRange && (
                  <div className="absolute inset-0 bg-amber-500/10" />
                )}
                {date ? (
                  <button
                    onClick={() => handleDateClick(date)}
                    className={clsx(
                      "relative z-10 w-8 h-8 m-auto text-xs rounded-md transition-all flex items-center justify-center",
                      selected ? "bg-amber-500 text-black font-bold shadow-lg shadow-amber-500/20" : 
                      inRange ? "text-amber-400" :
                      "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]",
                      isToday && !selected && "border border-amber-500/30"
                    )}
                  >
                    {date.getDate()}
                  </button>
                ) : <div className="w-8 h-8" />}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const formatValue = () => {
    if (!start) return 'Select date range'
    const s = start.toLocaleDateString('en-GB')
    const e = end.toLocaleDateString('en-GB')
    return `${s} — ${e}`
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all bg-[var(--bg-elevated)]",
          isOpen ? "border-amber-500/50 ring-2 ring-amber-500/10" : "border-[var(--border)] hover:border-[var(--text-muted)]"
        )}
      >
        <CalendarIcon size={14} className="text-amber-500" />
        <span className="text-[var(--text-primary)] min-w-[120px] text-left">{formatValue()}</span>
        {start ? (
          <X 
            size={14} 
            className="text-[var(--text-muted)] hover:text-red-400 transition-colors" 
            onClick={handleClear} 
          />
        ) : (
          <ChevronDown size={14} className={clsx("text-[var(--text-muted)] transition-transform", isOpen && "rotate-180")} />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg shadow-2xl z-[100] flex overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Sidebar */}
          <div className="w-44 border-r border-[var(--border)] bg-[var(--bg-elevated)]/50 p-2 space-y-0.5">
            <div className="px-3 py-2 mb-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Presets</span>
            </div>
            {presets.map(p => (
              <button
                key={p.label}
                onClick={() => handlePresetClick(p)}
                className="w-full text-left px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-amber-400 hover:bg-amber-500/5 rounded-md transition-colors"
              >
                {p.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-[var(--border)]">
              <button
                onClick={(e) => { handleClear(e); setIsOpen(false); }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/5 rounded-md transition-colors flex items-center gap-2"
              >
                <X size={12} /> Clear Range
              </button>
            </div>
          </div>

          {/* Calendar */}
          {renderCalendar()}
        </div>
      )}
    </div>
  )
}
