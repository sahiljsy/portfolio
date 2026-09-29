# sahiljariwala.vercel.app

My personal portfolio: [sahiljariwala.vercel.app](https://sahiljariwala.vercel.app)

Built with Next.js 15 (App Router, static export), React 19 and TypeScript, deployed on Vercel.

## What's in it

- **Agent run hero**: a scripted, streaming replay of the kind of multi-agent system I build (orchestrator, tool calls, context gate, sandbox, human approval).
- **Case studies**: one page per project with a Mermaid architecture diagram.
- **Blog**: Markdown posts in `content/blog/`, rendered with unified/remark/rehype, with syntax highlighting, a table of contents and an RSS feed. Posts marked `draft: true` never ship to production.
- **Resume**: generated from `resume/resume.html` with headless Chrome.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000, drafts visible
npm run build    # static export to out/
```

All copy lives in `data/portfolio.ts`.

Regenerate the resume PDF:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/Sahil_Jariwala_Resume.pdf "file://$PWD/resume/resume.html"
```
