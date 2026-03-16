import { useEffect, useRef } from 'react'

export default function RichEditor({ data, onChange, holder = 'editorjs-container' }) {
  const editorRef = useRef(null)
  const holderRef = useRef(null)

  useEffect(() => {
    if (editorRef.current) return // already initialized

    let editor

    const initEditor = async () => {
      const EditorJS    = (await import('@editorjs/editorjs')).default
      const Header      = (await import('@editorjs/header')).default
      const List        = (await import('@editorjs/list')).default
      const Quote       = (await import('@editorjs/quote')).default
      const Code        = (await import('@editorjs/code')).default

      editor = new EditorJS({
        holder: holderRef.current,
        data: data || {},
        placeholder: 'Start writing your content here…',
        tools: {
          header: { class: Header, config: { levels: [2, 3, 4], defaultLevel: 2 } },
          list:   { class: List, inlineToolbar: true },
          quote:  { class: Quote, inlineToolbar: true },
          code:   { class: Code },
        },
        onChange: async () => {
          const saved = await editor.save()
          onChange?.(saved)
        },
        onReady: () => {
          editorRef.current = editor
        },
      })
    }

    initEditor().catch(console.error)

    return () => {
      editorRef.current?.destroy?.()
      editorRef.current = null
    }
  }, []) // only mount once

  // Update data externally (e.g. when loading existing blog)
  useEffect(() => {
    if (editorRef.current && data && Object.keys(data).length > 0) {
      editorRef.current.render?.(data).catch(() => {})
    }
  }, [JSON.stringify(data?.blocks?.length)])

  return (
    <div
      ref={holderRef}
      id={holder}
      className="min-h-[300px] text-[var(--text-primary)] text-sm leading-relaxed"
    />
  )
}
