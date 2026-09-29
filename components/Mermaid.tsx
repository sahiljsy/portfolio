"use client";

import { useEffect, useRef } from "react";

// Renders ```mermaid code blocks (and explicit diagrams) client-side, re-rendering on theme change.
export default function Mermaid({ chart, scope }: { chart?: string; scope?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      const { default: mermaid } = await import("mermaid");
      const dark = true;
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        fontFamily: "var(--font-body)",
        themeVariables: dark
          ? { primaryColor: "#10121A", primaryTextColor: "#F2F3F7", primaryBorderColor: "#6B8CFF", lineColor: "#6E7488", background: "#0B0B0F", edgeLabelBackground: "#0B0B0F", tertiaryColor: "#0B0B0F" }
          : { primaryColor: "#FFFFFF", primaryTextColor: "#13203A", primaryBorderColor: "#2B55D6", lineColor: "#5B6B85", background: "#EDF1F5", edgeLabelBackground: "#FFFFFF", tertiaryColor: "#FFFFFF" },
      });
      const targets: { el: HTMLElement; code: string }[] = [];
      if (chart && ref.current) targets.push({ el: ref.current, code: chart });
      if (scope) {
        document.querySelectorAll<HTMLElement>(`${scope} pre > code.language-mermaid`).forEach((code) => {
          const pre = code.parentElement as HTMLElement;
          const holder = document.createElement("div");
          holder.className = "diagram";
          holder.dataset.code = code.textContent ?? "";
          pre.replaceWith(holder);
        });
        document.querySelectorAll<HTMLElement>(`${scope} .diagram[data-code]`).forEach((el) => {
          targets.push({ el, code: el.dataset.code ?? "" });
        });
      }
      for (const [i, t] of targets.entries()) {
        try {
          const { svg } = await mermaid.render(`m${Date.now()}${i}`, t.code);
          if (!cancelled) t.el.innerHTML = svg;
        } catch {
          if (!cancelled) t.el.textContent = "Diagram could not be rendered.";
        }
      }
    };
    render();
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [chart, scope]);

  return chart ? <div ref={ref} className="diagram" role="img" aria-label="Architecture diagram" /> : null;
}
