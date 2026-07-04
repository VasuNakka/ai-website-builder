import { GoogleGenAI, Type } from "@google/genai";
import { Project, ProjectPage, ProjectFiles, ProjectTheme } from "../types.ts";

// Initialize Gemini client safely with standard options
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Helper to provide a robust system instruction for website generation
const SYSTEM_INSTRUCTION = `You are a world-class UI/UX Designer and Frontend Architect. Your goal is to generate extremely polished, premium, modern, and fully interactive SaaS and commercial websites.
Your design aesthetic is heavily inspired by Apple, Stripe, Linear, and Framer:
- Expansive negative space and generous padding.
- Clean high-contrast typography (Inter, Space Grotesk, or elegant serif display pairs).
- Subtle gradients, thin borders (border-neutral-200/border-slate-800), and elegant shadows.
- Beautiful, realistic copywriting. No placeholder lorum-ipsum text.
- Full responsive design (mobile-first layout).
- Beautiful SVG vector accents or styled mockups.

You must generate:
1. High-fidelity HTML pages (Home, About, Services/Products, Pricing, Contact) for immediate rendering inside a Live Preview iframe.
2. A complete Next.js (App Router) + Tailwind CSS + Lucide React codebase for the code explorer and export.

For the Live Preview 'previewHtml' field, generate a COMPLETE single-file HTML document for each page:
- Include CDN links: Tailwind CSS (<script src="https://cdn.tailwindcss.com"></script>) and Lucide Icons (<script src="https://unpkg.com/lucide@latest"></script>).
- Apply a matching, elegant visual theme (either premium dark mode or ultra-clean light mode).
- Use Lucide icons appropriately (e.g. <i data-lucide="zap"></i>). Run "lucide.createIcons()" in the footer scripts.
- MUST contain realistic, fully-functioning interactive vanilla JavaScript inside a <script> tag for:
  a) Mobile responsive hamburger menu (open/close animations and overlay).
  b) Interactive Pricing Toggle (Monthly vs. Annual switching prices dynamically with a beautiful transition!).
  c) Contact Form submission (prevent default, show a beautiful glassmorphism Success state popup with positive reinforcement).
  d) Custom interactivity relevant to the theme (tabs, accordions for FAQs, dark/light theme toggle).

For the Next.js 'files' key-value map, generate production-ready React component files, layout files, and configuration files that mirror the HTML structure, including:
- 'src/app/layout.tsx': layout with font styling and main structure
- 'src/app/page.tsx': Home page combining components
- 'src/app/about/page.tsx': About page with team grid
- 'src/app/pricing/page.tsx': Pricing page with monthly/yearly toggle
- 'src/app/contact/page.tsx': Contact page with interactive form
- 'src/components/Navbar.tsx': Premium header with blur backdrop and responsive menu
- 'src/components/Hero.tsx': Engaging title, subtitles, CTAs, and a browser-mockup visual
- 'src/components/Features.tsx': Bento grid or responsive feature cards with icons
- 'src/components/Pricing.tsx': Styled pricing cards with monthly/annual states
- 'src/components/Footer.tsx': Organized links and copyright
- 'package.json': Next.js package configuration with standard scripts and dependencies
- 'tailwind.config.js': Custom theme extending colors and fonts
- 'README.md': Clean documentation explaining how to run and deploy the site to Vercel.

Always ensure the JSON is valid, fully-formed, and completely matches the requested JSON Schema.`;

export async function generateWebsite(prompt: string): Promise<Project> {
  const userPrompt = `Generate a complete multi-page premium website for this request: "${prompt}".
Create at least 4 pages: "Home" (path: "/"), "About" (path: "/about"), "Pricing" (path: "/pricing"), and "Contact" (path: "/contact"). Feel free to add a "Services" or "Blog" page if appropriate for the request.

Make the visual design stunning and highly tailored to the domain.
Return a single JSON object matching the following TypeScript structure:
{
  "name": "string (The name of the website/brand)",
  "description": "string (A catchy, premium tagline or brand description)",
  "theme": {
    "primary": "string (Tailwind color class or hex, e.g. '#6366f1' or 'indigo-600')",
    "secondary": "string",
    "accent": "string",
    "fontSans": "string",
    "fontDisplay": "string",
    "mode": "'light' | 'dark'"
  },
  "pages": [
    {
      "name": "string (e.g. 'Home')",
      "path": "string (e.g. '/')",
      "previewHtml": "string (Fully complete, self-contained interactive HTML document with Tailwind, Lucide, fonts, full components, responsive hamburger navigation, interactive pricing toggle, and interactive contact form feedback)"
    }
  ],
  "files": {
    "src/app/layout.tsx": "string",
    "src/app/page.tsx": "string",
    "src/app/about/page.tsx": "string",
    "src/app/pricing/page.tsx": "string",
    "src/app/contact/page.tsx": "string",
    "src/components/Navbar.tsx": "string",
    "src/components/Hero.tsx": "string",
    "src/components/Features.tsx": "string",
    "src/components/Pricing.tsx": "string",
    "src/components/Footer.tsx": "string",
    "package.json": "string",
    "tailwind.config.js": "string",
    "README.md": "string"
  }
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.7,
        responseSchema: {
          type: Type.OBJECT,
          required: ["name", "description", "theme", "pages", "files"],
          properties: {
            name: { type: Type.STRING, description: "Brand/website name" },
            description: { type: Type.STRING, description: "Catchy tagline or brand concept" },
            theme: {
              type: Type.OBJECT,
              required: ["primary", "secondary", "accent", "fontSans", "fontDisplay", "mode"],
              properties: {
                primary: { type: Type.STRING },
                secondary: { type: Type.STRING },
                accent: { type: Type.STRING },
                fontSans: { type: Type.STRING },
                fontDisplay: { type: Type.STRING },
                mode: { type: Type.STRING, enum: ["light", "dark"] },
              }
            },
            pages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["name", "path", "previewHtml"],
                properties: {
                  name: { type: Type.STRING },
                  path: { type: Type.STRING },
                  previewHtml: { type: Type.STRING, description: "Full self-contained interactive HTML document with inline CSS/Tailwind CSS and embedded JS scripts" },
                }
              }
            },
            files: {
              type: Type.OBJECT,
              description: "Key-value pair of file paths to source code content string",
            }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    
    // Add unique ID and prompt properties to complete the Project type
    const project: Project = {
      id: `proj_${Math.random().toString(36).substring(2, 11)}`,
      name: parsed.name || "My Website",
      description: parsed.description || "",
      prompt: prompt,
      theme: parsed.theme || {
        primary: "indigo-600",
        secondary: "slate-600",
        accent: "pink-500",
        fontSans: "Inter",
        fontDisplay: "Inter",
        mode: "light"
      },
      currentPage: parsed.pages?.[0]?.name || "Home",
      pages: parsed.pages || [],
      files: parsed.files || {}
    };

    return project;
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
}

export async function chatEditWebsite(
  project: Project,
  message: string,
  history: { role: 'user' | 'assistant'; content: string }[]
): Promise<Project> {
  const userPrompt = `The user wants to edit their current website project.
User request: "${message}"

Current Website State:
- Name: ${project.name}
- Current Description: ${project.description}
- Active Pages: ${project.pages.map(p => p.name).join(", ")}

Your task is to implement the user's request across both the interactive Live Preview HTML (in 'pages') and the Next.js React files (in 'files').
Keep everything else identical unless requested, but execute the changes with elite precision.
For example, if they ask to make the design dark mode, change the theme mode to 'dark', update all page preview HTML body classes, backgrounds, and text, and adjust the corresponding tailwind config and components.
If they ask to add a "Testimonials" section to the Home page, insert a beautiful modern testimonials cards section in both the Home page's 'previewHtml' and 'src/components/Features.tsx' or a new component in the Next.js source code.

Return the FULL updated project JSON matching the same schema:
{
  "name": "string",
  "description": "string",
  "theme": { "primary": "string", "secondary": "string", "accent": "string", "fontSans": "string", "fontDisplay": "string", "mode": "'light' | 'dark'" },
  "pages": [
    { "name": "string", "path": "string", "previewHtml": "string" }
  ],
  "files": {
    [filePath: string]: "string"
  }
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        { text: `Current Project JSON: ${JSON.stringify(project)}` },
        { text: `Conversation History:\n${history.map(h => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join("\n")}` },
        { text: userPrompt }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        temperature: 0.5,
        responseSchema: {
          type: Type.OBJECT,
          required: ["name", "description", "theme", "pages", "files"],
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            theme: {
              type: Type.OBJECT,
              required: ["primary", "secondary", "accent", "fontSans", "fontDisplay", "mode"],
              properties: {
                primary: { type: Type.STRING },
                secondary: { type: Type.STRING },
                accent: { type: Type.STRING },
                fontSans: { type: Type.STRING },
                fontDisplay: { type: Type.STRING },
                mode: { type: Type.STRING, enum: ["light", "dark"] },
              }
            },
            pages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["name", "path", "previewHtml"],
                properties: {
                  name: { type: Type.STRING },
                  path: { type: Type.STRING },
                  previewHtml: { type: Type.STRING },
                }
              }
            },
            files: {
              type: Type.OBJECT,
            }
          }
        }
      }
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");

    const updatedProject: Project = {
      id: project.id,
      name: parsed.name || project.name,
      description: parsed.description || project.description,
      prompt: project.prompt,
      theme: parsed.theme || project.theme,
      currentPage: project.currentPage,
      pages: parsed.pages || project.pages,
      files: parsed.files || project.files
    };

    return updatedProject;
  } catch (error) {
    console.error("Gemini Chat Edit Error:", error);
    throw error;
  }
}
