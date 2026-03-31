// import { useEffect, useRef } from "react";

// export default function RichEditor({
//   data,
//   onChange,
//   holder = "editorjs-container",
// }) {
//   const editorRef = useRef(null);
//   const holderRef = useRef(null);

//   useEffect(() => {
//     if (editorRef.current) return; // already initialized

//     let editor;

//     const initEditor = async () => {
//       const EditorJS = (await import("@editorjs/editorjs")).default;
//       const Header = (await import("@editorjs/header")).default;
//       const List = (await import("@editorjs/list")).default;
//       const Quote = (await import("@editorjs/quote")).default;
//       const Code = (await import("@editorjs/code")).default;

//       editor = new EditorJS({
//         holder: holderRef.current,
//         data: data || {},
//         placeholder: "Start writing your content here…",
//         tools: {
//           header: {
//             class: Header,
//             config: { levels: [2, 3, 4], defaultLevel: 2 },
//           },
//           list: { class: List, inlineToolbar: true },
//           quote: { class: Quote, inlineToolbar: true },
//           code: { class: Code },
//         },
//         onChange: async () => {
//           const saved = await editor.save();
//           onChange?.(saved);
//         },
//         onReady: () => {
//           editorRef.current = editor;
//         },
//       });
//     };

//     initEditor().catch(console.error);

//     return () => {
//       editorRef.current?.destroy?.();
//       editorRef.current = null;
//     };
//   }, []); // only mount once

//   // Update data externally (e.g. when loading existing blog)
//   useEffect(() => {
//     if (editorRef.current && data && Object.keys(data).length > 0) {
//       editorRef.current.render?.(data).catch(() => {});
//     }
//   }, [JSON.stringify(data?.blocks?.length)]);

//   return (
//     <div
//       ref={holderRef}
//       id={holder}
//       className="min-h-[300px] text-[var(--text-primary)] text-sm leading-relaxed"
//     />
//   );
// }

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const FONT_SIZES = [
  10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 32, 36, 40, 48, 56, 64, 72,
];
const FONT_FAMILIES = [
  { label: "Default", value: "inherit" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Mono", value: "'Courier New', monospace" },
  { label: "Sans", value: "'Helvetica Neue', sans-serif" },
  { label: "Cursive", value: "cursive" },
  { label: "System UI", value: "system-ui, sans-serif" },
];
const COLORS = [
  "#000000",
  "#374151",
  "#6B7280",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#FFFFFF",
  "#FEF2F2",
  "#FFF7ED",
  "#FFFBEB",
  "#F0FDF4",
  "#EFF6FF",
  "#F5F3FF",
  "#FDF2F8",
  "#1E3A5F",
  "#7C3AED",
];
const HIGHLIGHT_COLORS = [
  "transparent",
  "#FEF08A",
  "#BBF7D0",
  "#BAE6FD",
  "#F5D0FE",
  "#FED7AA",
  "#FECACA",
  "#E0E7FF",
  "#FFFFFF",
];
const EMOJIS = [
  "😀",
  "😍",
  "👍",
  "🎉",
  "🔥",
  "💡",
  "✅",
  "⚠️",
  "📌",
  "🚀",
  "❤️",
  "🎯",
];

// ─── Small UI pieces ──────────────────────────────────────────────────────────
function Sep() {
  return <div className="w-px h-5 bg-slate-200 mx-0.5 flex-shrink-0" />;
}

function ToolbarBtn({
  onClick,
  title,
  active,
  disabled,
  children,
  className = "",
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onMouseDown={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className={`
        flex items-center justify-center w-7 h-7 rounded text-xs transition-all duration-100 select-none
        ${
          active
            ? "bg-indigo-600 text-white shadow-inner"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }
        ${disabled ? "opacity-30 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

function Dropdown({ label, options, onSelect, width = "w-28" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        className="flex items-center gap-1 h-7 px-2 rounded text-xs text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all select-none"
      >
        <span className="max-w-[64px] truncate">{label}</span>
        <svg
          className="w-3 h-3 opacity-40 flex-shrink-0"
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M0 0l5 6 5-6z" />
        </svg>
      </button>
      {open && (
        <div
          className={`absolute top-full mt-1 left-0 ${width} bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 max-h-52 overflow-y-auto`}
        >
          {options.map((opt) => (
            <button
              key={opt.value ?? opt.label}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(opt.value ?? opt.label);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              style={opt.style}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ColorPicker({ icon, title, colors, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        title={title}
        onMouseDown={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
        className="flex items-center gap-0.5 h-7 px-1.5 rounded text-xs text-slate-600 hover:bg-slate-100 border border-slate-200 transition-all select-none"
      >
        <span className="text-sm leading-none">{icon}</span>
        <svg
          className="w-3 h-3 opacity-40"
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M0 0l5 6 5-6z" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-slate-200 rounded-lg shadow-xl z-50 p-2.5 w-44">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(c);
                  setOpen(false);
                }}
                title={c}
                className="w-5 h-5 rounded-full border border-slate-200 hover:scale-110 transition-transform shadow-sm"
                style={{
                  background:
                    c === "transparent"
                      ? "linear-gradient(135deg, #fff 45%, #f00 45%, #f00 55%, #fff 55%)"
                      : c,
                }}
              />
            ))}
          </div>
          <label className="flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer">
            Custom:
            <input
              type="color"
              className="w-5 h-5 rounded cursor-pointer border-0"
              onChange={(e) => {
                onSelect(e.target.value);
                setOpen(false);
              }}
            />
          </label>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
/**
 * RichEditor
 *
 * Props:
 *   value    {string}   – HTML string (the stored format)
 *   onChange {function} – called with the new HTML string on every edit
 *   placeholder {string}
 *   minHeight   {string}  – e.g. "400px"
 *   className   {string}  – wrapper className
 *
 * Storage format: plain HTML string — innerHTML of the contenteditable div.
 * To render it back anywhere: <div dangerouslySetInnerHTML={{ __html: savedHTML }} />
 */
export default function RichEditor({
  value = "",
  onChange,
  placeholder = "Start writing your content here…",
  minHeight = "400px",
  className = "",
}) {
  const editorRef = useRef(null);
  const imageInputRef = useRef(null);
  const isInternalChange = useRef(false);

  // Toolbar state
  const [fmt, setFmt] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
  });
  const [align, setAlign] = useState("left");
  const [fontSize, setFontSize] = useState("16");
  const [fontFam, setFontFam] = useState("inherit");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // ── Sync toolbar state from selection ──────────────────────────────────────
  const syncState = useCallback(() => {
    setFmt({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strike: document.queryCommandState("strikeThrough"),
    });
    // Sync alignment
    if (document.queryCommandState("justifyCenter")) setAlign("center");
    else if (document.queryCommandState("justifyRight")) setAlign("right");
    else if (document.queryCommandState("justifyFull")) setAlign("justify");
    else setAlign("left");
  }, []);

  // ── execCommand wrapper ────────────────────────────────────────────────────
  const exec = useCallback((cmd, val = null) => {
    editorRef.current?.focus();
    document.execCommand(cmd, false, val);
    syncState();
    emitChange();
  }, []);

  // ── Emit HTML to parent ────────────────────────────────────────────────────
  const emitChange = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    // Update word/char counts
    const text = editorRef.current.innerText || "";
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    setCharCount(text.length);
    onChange?.(html);
  }, [onChange]);

  // ── Load initial value ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!editorRef.current) return;
    // Only update DOM if value differs from current innerHTML (avoid cursor jump)
    if (editorRef.current.innerHTML !== value) {
      isInternalChange.current = true;
      editorRef.current.innerHTML = value || "";
      isInternalChange.current = false;
    }
  }, [value]);

  // ── Selection listener ─────────────────────────────────────────────────────
  useEffect(() => {
    document.addEventListener("selectionchange", syncState);
    return () => document.removeEventListener("selectionchange", syncState);
  }, [syncState]);

  // ── Font size (wraps selection in <span>) ──────────────────────────────────
  const applyFontSize = (size) => {
    setFontSize(size);
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement("span");
    span.style.fontSize = `${size}px`;
    try {
      range.surroundContents(span);
      editorRef.current?.focus();
      emitChange();
    } catch {
      // surroundContents fails on partial selections across elements — fallback
      exec("fontSize", "7");
      editorRef.current?.querySelectorAll('font[size="7"]').forEach((el) => {
        el.removeAttribute("size");
        el.style.fontSize = `${size}px`;
      });
    }
  };

  // ── Font color & highlight ─────────────────────────────────────────────────
  const applyFontColor = (color) => exec("foreColor", color);
  const applyHighlight = (color) =>
    exec("hiliteColor", color === "transparent" ? "transparent" : color);

  // ── Alignment ─────────────────────────────────────────────────────────────
  const applyAlign = (dir) => {
    const map = {
      left: "justifyLeft",
      center: "justifyCenter",
      right: "justifyRight",
      justify: "justifyFull",
    };
    setAlign(dir);
    exec(map[dir]);
  };

  // ── Insert helpers ─────────────────────────────────────────────────────────
  const insertImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      exec(
        "insertHTML",
        `<img src="${e.target.result}" style="max-width:100%;border-radius:6px;margin:8px 0;display:block;" alt="image"/>`,
      );
    };
    reader.readAsDataURL(file);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) exec("createLink", url);
  };

  const insertTable = () => {
    const cols = ["Column 1", "Column 2", "Column 3"];
    const th = cols
      .map(
        (h) =>
          `<th style="border:1px solid #e2e8f0;padding:8px 12px;background:#f8fafc;font-size:13px;font-weight:600;text-align:left;">${h}</th>`,
      )
      .join("");
    const td = cols
      .map(
        () =>
          `<td style="border:1px solid #e2e8f0;padding:8px 12px;min-width:90px;"> </td>`,
      )
      .join("");
    exec(
      "insertHTML",
      `<table style="border-collapse:collapse;width:100%;margin:12px 0;"><thead><tr>${th}</tr></thead><tbody><tr>${td}</tr><tr>${td}</tr></tbody></table><p><br></p>`,
    );
  };

  const insertCodeBlock = () => {
    exec(
      "insertHTML",
      `<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:8px;font-family:'Courier New',monospace;font-size:13px;margin:12px 0;overflow-x:auto;"><code>// your code here</code></pre><p><br></p>`,
    );
  };

  const insertBlockquote = () => {
    exec(
      "insertHTML",
      `<blockquote style="border-left:4px solid #6366f1;margin:12px 0;padding:10px 16px;background:#f5f3ff;border-radius:0 6px 6px 0;color:#374151;font-style:italic;">Quote text here</blockquote><p><br></p>`,
    );
  };

  // ── Keyboard shortcuts ─────────────────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      exec("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className={`flex flex-col border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden ${className}`}
    >
      {/* ── TOOLBAR ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 px-2 py-1.5 flex flex-wrap items-center gap-0.5 sticky top-0 z-50 select-none">
        {/* Undo / Redo */}
        <ToolbarBtn onClick={() => exec("undo")} title="Undo (Ctrl+Z)">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
          </svg>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("redo")} title="Redo (Ctrl+Y)">
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 -scale-x-100"
            fill="currentColor"
          >
            <path d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
          </svg>
        </ToolbarBtn>

        <Sep />

        {/* Font family */}
        <Dropdown
          label={
            FONT_FAMILIES.find((f) => f.value === fontFam)?.label ?? "Font"
          }
          options={FONT_FAMILIES.map((f) => ({
            ...f,
            style: { fontFamily: f.value },
          }))}
          onSelect={(v) => {
            setFontFam(v);
            exec("fontName", v);
          }}
          width="w-32"
        />

        {/* Font size */}
        <Dropdown
          label={`${fontSize}px`}
          options={FONT_SIZES.map((s) => ({
            label: `${s}px`,
            value: String(s),
          }))}
          onSelect={applyFontSize}
          width="w-24"
        />

        <Sep />

        {/* Text style */}
        <ToolbarBtn
          onClick={() => exec("bold")}
          title="Bold (Ctrl+B)"
          active={fmt.bold}
        >
          {" "}
          <b className="font-bold text-[13px]">B</b>{" "}
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => exec("italic")}
          title="Italic (Ctrl+I)"
          active={fmt.italic}
        >
          {" "}
          <i className="text-[13px]">I</i>{" "}
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => exec("underline")}
          title="Underline (Ctrl+U)"
          active={fmt.underline}
        >
          {" "}
          <u className="text-[13px]">U</u>{" "}
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => exec("strikeThrough")}
          title="Strikethrough"
          active={fmt.strike}
        >
          {" "}
          <s className="text-[13px]">S</s>{" "}
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("superscript")} title="Superscript">
          {" "}
          X<sup className="text-[9px]">2</sup>{" "}
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("subscript")} title="Subscript">
          {" "}
          X<sub className="text-[9px]">2</sub>{" "}
        </ToolbarBtn>

        <Sep />

        {/* Colors */}
        <ColorPicker
          icon="A"
          title="Font color"
          colors={COLORS}
          onSelect={applyFontColor}
        />
        <ColorPicker
          icon="▌"
          title="Highlight color"
          colors={HIGHLIGHT_COLORS}
          onSelect={applyHighlight}
        />

        <Sep />

        {/* Alignment */}
        {[
          {
            dir: "left",
            title: "Align left",
            icon: (
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5"
                fill="currentColor"
              >
                <path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            ),
          },
          {
            dir: "center",
            title: "Align center",
            icon: (
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5"
                fill="currentColor"
              >
                <path d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            ),
          },
          {
            dir: "right",
            title: "Align right",
            icon: (
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5"
                fill="currentColor"
              >
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            ),
          },
          {
            dir: "justify",
            title: "Justify",
            icon: (
              <svg
                viewBox="0 0 16 16"
                className="w-3.5 h-3.5"
                fill="currentColor"
              >
                <path d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            ),
          },
        ].map(({ dir, title, icon }) => (
          <ToolbarBtn
            key={dir}
            onClick={() => applyAlign(dir)}
            title={title}
            active={align === dir}
          >
            {icon}
          </ToolbarBtn>
        ))}

        <Sep />

        {/* Lists & indent */}
        <ToolbarBtn
          onClick={() => exec("insertUnorderedList")}
          title="Bullet list"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
            />
          </svg>
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => exec("insertOrderedList")}
          title="Numbered list"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588 0 .954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.416-.348h-.287zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"
            />
          </svg>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("indent")} title="Indent">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3 8a.5.5 0 0 1 .5-.5h6.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H3.5A.5.5 0 0 1 3 8zm-2.5 7a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("outdent")} title="Outdent">
          <svg
            viewBox="0 0 16 16"
            className="w-3.5 h-3.5 -scale-x-100"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 8a.5.5 0 0 1 .5-.5h6.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H3.5A.5.5 0 0 1 3 8zm-2.5 7a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </ToolbarBtn>

        <Sep />

        {/* Insert: Heading shortcuts */}
        {[1, 2, 3].map((n) => (
          <ToolbarBtn
            key={n}
            onClick={() => exec("formatBlock", `<h${n}>`)}
            title={`Heading ${n}`}
            className="font-bold text-[11px] w-8"
          >
            H{n}
          </ToolbarBtn>
        ))}
        <ToolbarBtn
          onClick={() => exec("formatBlock", "<p>")}
          title="Paragraph"
          className="text-[10px] w-7"
        >
          P
        </ToolbarBtn>

        <Sep />

        {/* Insert: Image */}
        <ToolbarBtn
          onClick={() => imageInputRef.current?.click()}
          title="Insert image"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
          </svg>
        </ToolbarBtn>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) insertImage(f);
            e.target.value = "";
          }}
        />

        {/* Insert: Link / Unlink */}
        <ToolbarBtn onClick={insertLink} title="Insert link">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 9H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
            <path d="M9 5a3 3 0 0 0 0 6h3a3 3 0 0 0 0-6H9zm0 1h3a2 2 0 1 1 0 4H9a2 2 0 1 1 0-4z" />
          </svg>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("unlink")} title="Remove link">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M4 4C2.343 4 1 5.343 1 7v2c0 1.657 1.343 3 3 3h3V11H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3V4H4zm5 0v1h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H9v1h3c1.657 0 3-1.343 3-3V7c0-1.657-1.343-3-3-3H9zm-2.5 4a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
        </ToolbarBtn>

        {/* Insert: HR */}
        <ToolbarBtn
          onClick={() => exec("insertHorizontalRule")}
          title="Horizontal rule"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M12 8a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 .5.5zm4-3H0v1h16V5zm0 6H0v1h16v-1z" />
          </svg>
        </ToolbarBtn>

        {/* Insert: Table */}
        <ToolbarBtn onClick={insertTable} title="Insert table">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
          </svg>
        </ToolbarBtn>

        {/* Insert: Code block */}
        <ToolbarBtn onClick={insertCodeBlock} title="Code block">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z" />
          </svg>
        </ToolbarBtn>

        {/* Insert: Blockquote */}
        <ToolbarBtn onClick={insertBlockquote} title="Blockquote">
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2z" />
          </svg>
        </ToolbarBtn>

        <Sep />

        {/* Emoji */}
        <Dropdown
          label="😀"
          options={EMOJIS.map((e) => ({ label: e, value: e }))}
          onSelect={(v) => exec("insertText", v)}
          width="w-44"
        />

        <Sep />

        {/* Clear formatting */}
        <ToolbarBtn
          onClick={() => exec("removeFormat")}
          title="Clear formatting"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor">
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zm.004-3.148a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            <path d="M1 13.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM1 1.5A.5.5 0 0 1 1.5 1h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
            <path
              fillRule="evenodd"
              d="M13.354 1.646a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </ToolbarBtn>
      </div>

      {/* ── EDITOR BODY ─────────────────────────────────────────────────────── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emitChange}
        onKeyUp={syncState}
        onMouseUp={syncState}
        onKeyDown={handleKeyDown}
        spellCheck
        className="outline-none text-slate-800 text-sm leading-relaxed px-6 py-4 overflow-y-auto"
        style={{
          minHeight,
          fontFamily: "inherit",
          // Placeholder via CSS
        }}
      />

      {/* ── STATUS BAR ──────────────────────────────────────────────────────── */}
      <div className="border-t border-slate-100 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400 select-none bg-slate-50/60">
        <span className="flex gap-3">
          <span>
            {wordCount} {wordCount === 1 ? "word" : "words"}
          </span>
          <span>
            {charCount} {charCount === 1 ? "character" : "characters"}
          </span>
        </span>
        <span className="flex gap-2 opacity-70">
          <kbd className="bg-slate-100 px-1 rounded text-[10px]">Ctrl+B</kbd>{" "}
          bold
          <kbd className="bg-slate-100 px-1 rounded text-[10px]">
            Ctrl+I
          </kbd>{" "}
          italic
          <kbd className="bg-slate-100 px-1 rounded text-[10px]">
            Ctrl+Z
          </kbd>{" "}
          undo
        </span>
      </div>

      {/* Placeholder CSS */}
      <style>{`
        [contenteditable][data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        [contenteditable] h1 { font-size: 2em; font-weight: 700; margin: 0.5em 0; }
        [contenteditable] h2 { font-size: 1.5em; font-weight: 600; margin: 0.5em 0; }
        [contenteditable] h3 { font-size: 1.25em; font-weight: 600; margin: 0.5em 0; }
        [contenteditable] a  { color: #6366f1; text-decoration: underline; }
        [contenteditable] ul { list-style: disc;    padding-left: 1.5em; margin: 0.4em 0; }
        [contenteditable] ol { list-style: decimal; padding-left: 1.5em; margin: 0.4em 0; }
        [contenteditable] table { border-collapse: collapse; width: 100%; margin: 8px 0; }
        [contenteditable] blockquote { border-left: 4px solid #6366f1; margin: 12px 0; padding: 10px 16px; background: #f5f3ff; border-radius: 0 6px 6px 0; color: #374151; font-style: italic; }
        [contenteditable] pre { background: #1e293b; color: #e2e8f0; padding: 14px 18px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 13px; margin: 12px 0; overflow-x: auto; }
        [contenteditable] hr { border: none; border-top: 2px solid #e2e8f0; margin: 16px 0; }
      `}</style>
    </div>
  );
}
