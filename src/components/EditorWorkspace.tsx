import React, { useState, useEffect, useRef } from "react";
import { Project, ChatMessage } from "../types.ts";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Rocket,
  Play,
  Check,
  Send,
  Code,
  Globe,
  FileCode,
  FolderOpen,
  Sparkles,
  Undo,
  Redo,
  Terminal,
  Clock,
  ChevronRight
} from "lucide-react";
import JSZip from "jszip";

interface EditorWorkspaceProps {
  project: Project;
  onUpdateProject: (updater: Project | ((prev: Project) => Project)) => void;
  onBack: () => void;
}

export const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  project,
  onUpdateProject,
  onBack
}) => {
  // Navigation & Page Selection
  const [activePageName, setActivePageName] = useState<string>(project.currentPage);
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [viewMode, setViewMode] = useState<"split" | "preview" | "code">("split");
  const [viewportSize, setViewportSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

  // File Tree Selection
  const initialFiles = Object.keys(project.files);
  const [selectedFilePath, setSelectedFilePath] = useState<string>(
    initialFiles.find(f => f.endsWith(".tsx")) || initialFiles[0] || ""
  );
  const [editorCode, setEditorCode] = useState<string>("");

  // Code editor modifications
  useEffect(() => {
    if (project.files[selectedFilePath] !== undefined) {
      setEditorCode(project.files[selectedFilePath]);
    }
  }, [selectedFilePath, project.files]);

  // AI Chat State
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hello! I have generated a complete, production-ready multi-page codebase for **${project.name}**. You can test the interactive navigation in the Live Preview panel or browse the Next.js files. \n\nHow can I help you customize or improve the website? You can ask me to:
- *Add a testimonials section on the home page*
- *Change the entire theme to dark emerald*
- *Update the pricing plans to include a free tier*
- *Add custom FAQs in the contact page*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiStatus, setAiStatus] = useState<string>("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Undo / Redo History stack
  const [historyStack, setHistoryStack] = useState<Project[]>([]);
  const [redoStack, setRedoStack] = useState<Project[]>([]);

  // Deployment Modal State
  const [showDeployModal, setShowDeployModal] = useState<boolean>(false);
  const [deployStep, setDeployStep] = useState<number>(0);
  const [deployLogs, setDeployLogs] = useState<string[]>([]);

  // Track page navigation changes inside iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "LIVE_NAVIGATE") {
        const targetPage = event.data.page;
        const exists = project.pages.some(p => p.name === targetPage);
        if (exists) {
          setActivePageName(targetPage);
          onUpdateProject(prev => ({ ...prev, currentPage: targetPage }));
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [project.pages, onUpdateProject]);

  // Auto Scroll Chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiLoading]);

  // Retrieve current active page's HTML
  const activePageObj = project.pages.find(p => p.name === activePageName) || project.pages[0];

  // Manual save for Code Editor changes
  const handleSaveCode = () => {
    onUpdateProject(prev => {
      const updatedFiles = { ...prev.files, [selectedFilePath]: editorCode };
      
      // Keep state fully aligned
      return {
        ...prev,
        files: updatedFiles
      };
    });
    alert("Source code saved successfully! Compiled React components updated.");
  };

  // Convert File Tree to human folder groupings
  const getFileGroups = () => {
    const groups: { [folder: string]: string[] } = {};
    Object.keys(project.files).forEach(filePath => {
      const parts = filePath.split("/");
      if (parts.length > 1) {
        const folder = parts.slice(0, -1).join("/");
        if (!groups[folder]) groups[folder] = [];
        groups[folder].push(filePath);
      } else {
        if (!groups["/"]) groups["/"] = [];
        groups["/"].push(filePath);
      }
    });
    return groups;
  };

  // Conversational Chat AI Edits
  const handleSendChatMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isAiLoading) return;

    const userMessage: ChatMessage = {
      id: `msg_${Math.random().toString(36).substring(2, 9)}`,
      role: "user",
      content: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");
    setIsAiLoading(true);

    // Save previous state to Undo stack
    setHistoryStack(prev => [...prev, { ...project }]);
    setRedoStack([]); // Clear redo stack on new modification

    const statuses = [
      "Analyzing workspace configuration...",
      "Reading theme elements & stylesheets...",
      "Executing layout compilation scripts...",
      "Validating component routing constraints...",
      "Compiling final Tailwind outputs..."
    ];
    let statusIdx = 0;
    setAiStatus(statuses[0]);
    const interval = setInterval(() => {
      statusIdx = (statusIdx + 1) % statuses.length;
      setAiStatus(statuses[statusIdx]);
    }, 1800);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project: project,
          message: userMessage.content,
          history: chatMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error("Failed to receive structured updates from builder API.");
      }

      const updatedProject: Project = await response.json();

      onUpdateProject(updatedProject);

      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_${Math.random().toString(36).substring(2, 9)}`,
          role: "assistant",
          content: `I've successfully updated your project based on your request. Check out the **Live Preview** and updated source files! Let me know if you would like any other modifications.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      clearInterval(interval);
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg_err_${Date.now()}`,
          role: "assistant",
          content: `Oops! I encountered an error while processing that edit. Details: ${err.message || String(err)}. Please try again or rephrase your prompt.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Export Project to standard ZIP package
  const handleExportZIP = async () => {
    try {
      const zip = new JSZip();
      
      Object.entries(project.files).forEach(([filePath, content]) => {
        zip.file(filePath, content as string);
      });

      project.pages.forEach(page => {
        zip.file(`static-previews/${page.name.toLowerCase()}-page.html`, page.previewHtml);
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = `${project.name.toLowerCase()}-export.zip`;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to package files to ZIP.");
    }
  };

  // Undo Action
  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack(prev => prev.slice(0, -1));
    setRedoStack(prev => [...prev, { ...project }]);
    onUpdateProject(previous);
  };

  // Redo Action
  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    setHistoryStack(prev => [...prev, { ...project }]);
    onUpdateProject(next);
  };

  // Simulated Vercel Deploy logs
  const handleTriggerDeploy = () => {
    setShowDeployModal(true);
    setDeployStep(0);
    setDeployLogs([]);

    const logList = [
      "[1/5] Extracting current Next.js modular layout...",
      "[2/5] Creating optimal edge slot on serverless deployment zones...",
      "[3/5] Bundling component routing trees and assets...",
      "[4/5] Pre-rendering static HTML pages (Home, About, Pricing)...",
      "[5/5] Success! Active live SSL certs configured."
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < logList.length) {
        setDeployLogs(prev => [...prev, logList[step]]);
        setDeployStep(step + 1);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-neutral-900 text-neutral-100 overflow-hidden font-sans">
      
      {/* Top workspace controller header */}
      <header className="h-14 px-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between shrink-0 relative z-10 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 hover:bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="h-4 w-px bg-neutral-800"></div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-white">{project.name}</span>
              <span className="text-[9px] bg-violet-900/40 text-violet-300 font-semibold px-2 py-0.5 rounded-full border border-violet-800/40 uppercase tracking-widest">
                AI Built
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 max-w-sm truncate hidden sm:block">
              {project.description}
            </p>
          </div>
        </div>

        {/* View Mode selectors & Screen togglers */}
        <div className="hidden md:flex items-center gap-1.5 bg-neutral-900 p-1 border border-neutral-800 rounded-lg">
          <button
            onClick={() => setViewMode("split")}
            className={`text-xs px-2.5 py-1 rounded font-medium transition-all cursor-pointer ${
              viewMode === "split" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Split Workspace
          </button>
          <button
            onClick={() => { setViewMode("preview"); setActiveTab("preview"); }}
            className={`text-xs px-2.5 py-1 rounded font-medium transition-all cursor-pointer ${
              viewMode === "preview" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Preview Only
          </button>
          <button
            onClick={() => { setViewMode("code"); setActiveTab("code"); }}
            className={`text-xs px-2.5 py-1 rounded font-medium transition-all cursor-pointer ${
              viewMode === "code" ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            Code Explorer
          </button>
        </div>

        {/* Actions panel (Undo, Redo, Download, Deploy) */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo controls */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 mr-2">
            <button
              onClick={handleUndo}
              disabled={historyStack.length === 0}
              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title="Undo Edit"
            >
              <Undo className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
              title="Redo Edit"
            >
              <Redo className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleExportZIP}
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold px-3.5 h-9 rounded-lg flex items-center gap-1.5 border border-neutral-700 transition-all shadow-md cursor-pointer"
            title="Download complete Next.js code ZIP"
          >
            <Download className="w-3.5 h-3.5" /> Export ZIP
          </button>

          <button
            onClick={handleTriggerDeploy}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold px-3.5 h-9 rounded-lg flex items-center gap-1.5 transition-all shadow-lg shadow-violet-600/10 cursor-pointer"
            title="Simulate production deploy to Vercel"
          >
            <Rocket className="w-3.5 h-3.5" /> Deploy
          </button>
        </div>
      </header>

      {/* Main workspace container */}
      <div className="flex-1 w-full flex overflow-hidden min-h-0">
        
        {/* Left Panel: Page navigator, file explorer & AI Chat */}
        <div className="w-80 border-r border-neutral-800 bg-neutral-950 flex flex-col shrink-0 min-h-0 overflow-y-auto">
          
          {/* Section 1: Page List */}
          <div className="p-4 border-b border-neutral-900">
            <div className="flex items-center gap-1.5 mb-2 text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              <Globe className="w-3.5 h-3.5 text-neutral-500" /> Active Pages
            </div>
            <div className="space-y-1">
              {project.pages.map((p) => {
                const isActive = p.name === activePageName;
                return (
                  <button
                    key={p.name}
                    onClick={() => {
                      setActivePageName(p.name);
                      onUpdateProject(prev => ({ ...prev, currentPage: p.name }));
                    }}
                    className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium flex items-center justify-between transition-colors cursor-pointer ${
                      isActive ? "bg-neutral-800 text-white" : "text-neutral-400 hover:text-neutral-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-violet-500" : "bg-neutral-700"}`}></span>
                      {p.name} Page
                    </div>
                    <span className="text-[9px] font-mono text-neutral-500">{p.path}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Code File Tree Explorer */}
          <div className="p-4 border-b border-neutral-900 max-h-56 overflow-y-auto">
            <div className="flex items-center gap-1.5 mb-2 text-xs uppercase tracking-widest text-neutral-500 font-semibold">
              <FolderOpen className="w-3.5 h-3.5 text-neutral-500" /> Source File Tree
            </div>
            
            <div className="space-y-2">
              {Object.entries(getFileGroups()).map(([folder, files]) => (
                <div key={folder} className="space-y-1">
                  <div className="text-[10px] font-semibold text-neutral-600 flex items-center gap-1 uppercase tracking-wider pl-1">
                    <ChevronRight className="w-2.5 h-2.5" /> {folder}
                  </div>
                  {files.map(file => {
                    const isSelected = file === selectedFilePath;
                    const fileName = file.includes("/") ? file.split("/").pop() : file;
                    return (
                      <button
                        key={file}
                        onClick={() => {
                          setSelectedFilePath(file);
                          setActiveTab("code");
                        }}
                        className={`w-full text-left text-xs pl-4 pr-2 py-1 rounded flex items-center gap-2 truncate font-medium transition-colors cursor-pointer ${
                          isSelected ? "bg-neutral-900 text-violet-400" : "text-neutral-400 hover:text-neutral-200"
                        }`}
                      >
                        <FileCode className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                        <span className="truncate">{fileName}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: AI Chat Editor */}
          <div className="flex-1 flex flex-col min-h-[300px]">
            <div className="px-4 py-3 border-b border-neutral-900 bg-neutral-950 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Conversational AI Chat</span>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[350px]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-neutral-800 text-white self-end ml-auto"
                      : "bg-neutral-900/60 border border-neutral-800/80 text-neutral-300 self-start"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-[9px] text-neutral-500 self-end mt-1.5">{msg.timestamp}</span>
                </div>
              ))}

              {isAiLoading && (
                <div className="bg-neutral-900/60 border border-neutral-800/80 text-neutral-300 self-start max-w-[85%] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping"></span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">AI Builder Working</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 italic font-mono">{aiStatus}</p>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Chat input bar */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-neutral-950 border-t border-neutral-900 shrink-0">
              <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden focus-within:border-violet-500 transition-colors">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask AI to update the website..."
                  disabled={isAiLoading}
                  className="flex-1 bg-transparent px-3 py-2 text-xs text-white focus:outline-none placeholder-neutral-500 disabled:opacity-40"
                />
                <button
                  type="submit"
                  disabled={isAiLoading || !chatInput.trim()}
                  className="p-1.5 mr-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-all disabled:opacity-20 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Middle/Right Workspace area */}
        <div className="flex-1 flex flex-col min-h-0 bg-neutral-900">
          
          {/* Tabs header bar */}
          {viewMode !== "split" && (
            <div className="h-10 px-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between shrink-0">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`text-xs font-semibold flex items-center gap-1.5 h-10 border-b-2 transition-all cursor-pointer ${
                    activeTab === "preview"
                      ? "border-violet-500 text-white"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" /> Interactive Live Preview
                </button>
                <button
                  onClick={() => setActiveTab("code")}
                  className={`text-xs font-semibold flex items-center gap-1.5 h-10 border-b-2 transition-all cursor-pointer ${
                    activeTab === "code"
                      ? "border-violet-500 text-white"
                      : "border-transparent text-neutral-400 hover:text-neutral-200"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" /> Source Code Editor
                </button>
              </div>
            </div>
          )}

          {/* Core Content Area */}
          <div className="flex-1 flex min-h-0 relative">
            
            {/* SPLIT VIEW WORKSPACE LAYOUT */}
            {viewMode === "split" ? (
              <div className="w-full h-full flex divide-x divide-neutral-800">
                
                {/* Left split side: Live Preview */}
                <div className="flex-1 flex flex-col min-w-0 bg-neutral-950/20">
                  <div className="h-10 px-4 bg-neutral-950/40 border-b border-neutral-800/80 flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-neutral-500" /> Live Interactive Preview
                    </span>

                    {/* Resize device sizes */}
                    <div className="flex items-center gap-1.5 bg-neutral-900 p-0.5 border border-neutral-800 rounded-md">
                      <button
                        onClick={() => setViewportSize("desktop")}
                        className={`p-1.5 rounded transition-all cursor-pointer ${
                          viewportSize === "desktop" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                        title="Desktop view"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setViewportSize("tablet")}
                        className={`p-1.5 rounded transition-all cursor-pointer ${
                          viewportSize === "tablet" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                        title="Tablet view (768px)"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setViewportSize("mobile")}
                        className={`p-1.5 rounded transition-all cursor-pointer ${
                          viewportSize === "mobile" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                        }`}
                        title="Mobile view (380px)"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Sandbox Frame */}
                  <div className="flex-1 p-6 flex items-center justify-center bg-neutral-900 overflow-hidden relative">
                    <div
                      className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-white ${
                        viewportSize === "desktop" ? "w-full" : viewportSize === "tablet" ? "w-[768px]" : "w-[380px] border-8 border-neutral-800"
                      }`}
                    >
                      <iframe
                        srcDoc={activePageObj?.previewHtml}
                        title="Builder Sandbox Preview"
                        sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                        className="w-full h-full border-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Right split side: Code Editor */}
                <div className="flex-1 flex flex-col min-w-0 bg-neutral-950/20">
                  <div className="h-10 px-4 bg-neutral-950/40 border-b border-neutral-800/80 flex items-center justify-between shrink-0">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-neutral-500" /> Code Editor &mdash; {selectedFilePath.split("/").pop()}
                    </span>

                    <button
                      onClick={handleSaveCode}
                      className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-semibold h-7 px-3 rounded flex items-center gap-1 border border-neutral-700 transition-all cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-emerald-400" /> Apply Code Changes
                    </button>
                  </div>

                  {/* Textarea code container */}
                  <div className="flex-1 flex min-h-0 font-mono text-xs overflow-hidden">
                    {/* Visual Line Numbers */}
                    <div className="w-12 bg-neutral-950 py-4 text-neutral-600 text-right pr-3 select-none border-r border-neutral-900 leading-normal">
                      {Array.from({ length: editorCode.split("\n").length || 1 }).map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    
                    <textarea
                      value={editorCode}
                      onChange={(e) => setEditorCode(e.target.value)}
                      className="flex-1 bg-[#10121a] py-4 px-4 text-slate-300 focus:outline-none resize-none leading-normal font-mono select-text"
                      spellCheck="false"
                    />
                  </div>
                </div>

              </div>
            ) : (
              // FULL SCREEN TABS LAYOUT
              <div className="w-full h-full flex flex-col">
                {activeTab === "preview" ? (
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Device selectors */}
                    <div className="h-10 px-4 bg-[#141622] border-b border-neutral-800/80 flex items-center justify-end shrink-0 gap-1.5">
                      <div className="flex items-center gap-1 bg-neutral-900 p-0.5 border border-neutral-800 rounded-md">
                        <button
                          onClick={() => setViewportSize("desktop")}
                          className={`p-1 rounded transition-all cursor-pointer ${
                            viewportSize === "desktop" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setViewportSize("tablet")}
                          className={`p-1 rounded transition-all cursor-pointer ${
                            viewportSize === "tablet" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          <Tablet className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setViewportSize("mobile")}
                          className={`p-1 rounded transition-all cursor-pointer ${
                            viewportSize === "mobile" ? "bg-neutral-800 text-white" : "text-neutral-500 hover:text-neutral-300"
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 p-6 flex items-center justify-center bg-neutral-900 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-white ${
                          viewportSize === "desktop" ? "w-full" : viewportSize === "tablet" ? "w-[768px]" : "w-[380px] border-8 border-neutral-800"
                        }`}
                      >
                        <iframe
                          srcDoc={activePageObj?.previewHtml}
                          title="Builder Sandbox Full Preview"
                          sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                          className="w-full h-full border-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col min-h-0 bg-neutral-950">
                    <div className="h-10 px-4 bg-[#141622] border-b border-neutral-800/80 flex items-center justify-between shrink-0">
                      <span className="text-xs text-neutral-400 font-mono">Editing {selectedFilePath}</span>
                      <button
                        onClick={handleSaveCode}
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold h-7 px-3 rounded flex items-center gap-1 border border-neutral-700 transition-all cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-emerald-400" /> Apply Changes
                      </button>
                    </div>

                    <div className="flex-1 flex min-h-0 font-mono text-xs overflow-hidden">
                      {/* Visual Line Numbers */}
                      <div className="w-12 bg-neutral-950 py-4 text-neutral-600 text-right pr-3 select-none border-r border-neutral-900 leading-normal">
                        {Array.from({ length: editorCode.split("\n").length || 1 }).map((_, i) => (
                          <div key={i}>{i + 1}</div>
                        ))}
                      </div>
                      
                      <textarea
                        value={editorCode}
                        onChange={(e) => setEditorCode(e.target.value)}
                        className="flex-1 bg-[#10121a] py-4 px-4 text-slate-300 focus:outline-none resize-none leading-normal font-mono select-text"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* MODAL: VERCEL DEPLOYMENT DIALOG */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-6 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-violet-400" />
                <span className="font-bold text-sm text-white">Vercel Deployment Serverless Logs</span>
              </div>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-neutral-500 hover:text-white text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-[#0b0c13] rounded-lg p-4 font-mono text-xs text-slate-300 border border-neutral-800/60 max-h-64 overflow-y-auto space-y-2">
                {deployLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-neutral-600 select-none">[{i+1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
                {deployStep < 5 && (
                  <div className="flex items-center gap-2 text-neutral-500 italic animate-pulse">
                    <span>* Generating Serverless compilation blocks...</span>
                  </div>
                )}
              </div>

              {/* Progress and outcome link */}
              {deployStep === 5 ? (
                <div className="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-400">Deploy Successful!</h4>
                    <p className="text-[11px] text-neutral-400 mt-1 leading-normal">Your Next.js project is fully cached and active on the Vercel CDN grid.</p>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-xs font-semibold text-white hover:underline mt-2 inline-flex items-center gap-1 bg-neutral-800 px-3 py-1.5 rounded"
                    >
                      Visit Subdomain: <span className="text-violet-400 font-mono">https://{project.name.toLowerCase()}.vercel.app</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Clock className="w-4 h-4 text-neutral-500 animate-spin" />
                  <span>Packaging static assets and setting DNS records... Please wait.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
