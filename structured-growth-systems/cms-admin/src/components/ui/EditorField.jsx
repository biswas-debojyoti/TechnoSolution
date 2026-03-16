import { useEffect, useRef } from 'react'

export default function EditorJSField({ value, onChange, readOnly = false }) {
  const editorRef = useRef(null)
  const holderRef = useRef(null)
  const isReadyRef = useRef(false)

  useEffect(() => {
    if (editorRef.current || !holderRef.current) return

    let editor

    const initEditor = async () => {
      const [
        EditorJS,
        Header,
        List,
        Quote,
        Code,
      ] = await Promise.all([
        import('@editorjs/editorjs').then(m => m.default),
        import('@editorjs/header').then(m => m.default),
        import('@editorjs/list').then(m => m.default),
        import('@editorjs/quote').then(m => m.default),
        import('@editorjs/code').then(m => m.default),
      ])

      editor = new EditorJS({
        holder: holderRef.current,
        readOnly,
        data: value && Object.keys(value).length ? value : undefined,
        tools: {
          header: {
            class: Header,
            config: { levels: [2, 3, 4], defaultLevel: 2 },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          code: Code,
        },
        placeholder: 'Start writing your blog content…',
        onChange: async () => {
          if (!isReadyRef.current) return
          try {
            const data = await editor.save()
            onChange?.(data)
          } catch (e) {
            console.warn('EditorJS save error:', e)
          }
        },
        onReady: () => {
          isReadyRef.current = true
        },
      })

      editorRef.current = editor
    }

    initEditor().catch(console.error)

    return () => {
      if (editorRef.current?.destroy) {
        try {
          editorRef.current.destroy()
        } catch (_) {}
        editorRef.current = null
        isReadyRef.current = false
      }
    }
  }, []) // eslint-disable-line

  return (
    <div className="bg-ink-800 border border-ink-600 rounded-lg min-h-[280px] px-4 py-3
                    focus-within:border-amber/60 focus-within:ring-1 focus-within:ring-amber/20
                    transition-all duration-200">
      <div ref={holderRef} />
    </div>
  )
}
