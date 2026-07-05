import { useState } from "react";
import { Project } from "./types.ts";
import { TemplateGallery } from "./components/TemplateGallery.tsx";
import { EditorWorkspace } from "./components/EditorWorkspace.tsx";
import {
  Sparkles,
  ArrowRight,
  Globe,
  Terminal,
  Clock,
  Code,
  Layout,
  CheckCircle2,
  FileCode2,
  Cpu
} from "lucide-react";

export default function App() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [promptInput, setPromptInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);
  const [currentLogStep, setCurrentLogStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Suggested preset prompts for users to click
  const PRESET_PROMPTS = [
    {
      label: "Architect Portfolio",
      prompt: "A minimalist light-themed portfolio for an architectural design studio in Berlin, with project grids and contact inquiry forms"
    },
    {
      label: "Vegan Cafe Website",
      prompt: "A warm and organic-themed website for a vegan bakery in Brooklyn featuring menu highlights, hours, and booking reservations"
    },
    {
      label: "DevOps SaaS Platform",
      prompt: "A dark premium developer tool SaaS website for continuous security monitoring with charts, bento grids, and monthly plans"
    }
  ];

  // Call backend to generate a website
  const handleGenerateWebsite = async (promptText: string) => {
    if (!promptText.trim() || isGenerating) return;

    setIsGenerating(true);
    setErrorMessage(null);
    setGenerationLogs([]);
    setCurrentLogStep(0);

    const logSteps = [
      "Analyzing business domain & semantic requirements...",
      "Designing site layout & mapping navigation routes...",
      "Generating high-fidelity responsive HTML templates with Tailwind CSS...",
      "Assembling modular Next.js components & TypeScript code files...",
      "Integrating interactive scripts & Lucide icon elements...",
      "Bundling Sandbox environment & launching Live Hot-Reload..."
    ];

    // Cycle through logs slowly to create an immersive visual building flow
    let step = 0;
    const interval = setInterval(() => {
      if (step < logSteps.length) {
        setGenerationLogs(prev => [...prev, logSteps[step]]);
        setCurrentLogStep(step + 1);
        step++;
      }
    }, 1500);

    try {
      const response = await fetch(
        "https://ai-website-builder-a1lk.onrender.com/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: promptText }),
        }
      );

      clearInterval(interval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Server failed to compile AI website.");
      }

      const project: Project = await response.json();
      setCurrentProject(project);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setErrorMessage(err.message || String(err));
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePresetClick = (prompt: string) => {
    setPromptInput(prompt);
    handleGenerateWebsite(prompt);
  };

  // Switch project state
  const handleSelectProject = (project: Project) => {
    setCurrentProject(project);
  };

  // If inside editor, switch full layout to workspace
  if (currentProject) {
    return (
      <EditorWorkspace
        project={currentProject}
        onUpdateProject={setCurrentProject}
        onBack={() => setCurrentProject(null)}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#fafafd] text-[#111218] flex flex-col font-sans">

      {/* Top Banner / Navbar */}
      <header className="h-16 px-6 bg-white border-b border-neutral-150 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-violet-600/20">
            W
          </div>
          <span className="text-lg font-bold tracking-tight text-neutral-900">AI Website Builder</span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
          <span>Active Session</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col">

        {/* Onboarding Dashboard */}
        {!isGenerating ? (
          <div className="space-y-12 animate-fade-in">

            {/* Visual Header Block */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 border border-violet-100 rounded-full text-xs font-semibold text-violet-700 mb-2">
                <Sparkles className="w-3.5 h-3.5" /> 100% Production-Ready Outputs
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
                Instantly build multi-page websites <br />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">with fully editable source code</span>
              </h1>
              <p className="text-sm md:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed">
                Describe your business model or software concept. Gemini will design custom color palettes, compile interactive Tailwind preview HTMLs, and write Next.js code modules.
              </p>
            </div>

            {/* Prompt input field */}
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={(e) => { e.preventDefault(); handleGenerateWebsite(promptInput); }}
                className="bg-white p-2.5 rounded-2xl border border-neutral-200 shadow-xl flex items-center gap-2 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-100 transition-all"
              >
                <div className="flex-1 pl-3">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="E.g. A sleek wedding photography portfolio with an interactive gallery..."
                    className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none placeholder-neutral-400 font-medium"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold h-11 px-5 rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-98 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" /> Assemble Website
                </button>
              </form>

              {/* Preset prompt tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2 justify-center">
                <span className="text-[11px] text-neutral-400 font-medium uppercase tracking-wider mr-1">Suggestions:</span>
                {PRESET_PROMPTS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePresetClick(preset.prompt)}
                    className="text-xs bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-600 hover:text-neutral-800 px-3 py-1.5 rounded-lg transition-all font-medium flex items-center gap-1 cursor-pointer"
                  >
                    {preset.label} <ArrowRight className="w-3 h-3 text-neutral-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message banner */}
            {errorMessage && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <Cpu className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-red-700">Compilation Error</h4>
                  <p className="text-[11px] text-red-600 mt-1 leading-normal">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Template blueprints gallery */}
            <div className="pt-6 border-t border-neutral-200">
              <TemplateGallery onSelectProject={handleSelectProject} />
            </div>

          </div>
        ) : (
          /* IMMERSIVE COMPILER LOADING PAGE */
          <div className="flex-1 flex flex-col items-center justify-center py-16 animate-pulse">
            <div className="max-w-lg w-full bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl p-6 space-y-6">

              {/* Dynamic Header */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-violet-400 animate-spin" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-widest">
                    Gemini Compiler Engine
                  </span>
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  Step {currentLogStep}/6
                </div>
              </div>

              {/* Dynamic Log Feed */}
              <div className="bg-[#0b0c13] border border-neutral-900 rounded-xl p-4 font-mono text-xs text-neutral-300 min-h-48 flex flex-col justify-end space-y-2.5 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c13] to-transparent h-8"></div>
                {generationLogs.map((log, index) => {
                  const isLast = index === generationLogs.length - 1;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-2.5 transition-all duration-300 ${isLast ? "text-violet-400 font-semibold" : "text-neutral-500"
                        }`}
                    >
                      {isLast ? (
                        <Terminal className="w-3.5 h-3.5 text-violet-400 animate-pulse shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      <span>{log}</span>
                    </div>
                  );
                })}
              </div>

              {/* Status footer spinner */}
              <div className="flex items-center justify-between text-neutral-400 text-xs font-medium pt-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-500 animate-spin" />
                  <span className="italic">Assembling layouts... Estimated &lt;20s</span>
                </div>
                <div className="flex gap-2">
                  <Layout className="w-4 h-4 text-neutral-500" />
                  <Code className="w-4 h-4 text-neutral-500" />
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Footer footer info */}
      <footer className="h-12 border-t border-neutral-150 flex items-center justify-center text-[10px] text-neutral-400 uppercase tracking-widest shrink-0 font-medium">
        &copy; 2026 AI Website Builder. Powered by Google Gemini 3.5.
      </footer>

    </div>
  );
}
