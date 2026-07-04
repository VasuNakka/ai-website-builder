import React from "react";
import { DEFAULT_TEMPLATES } from "../utils/defaultTemplates.ts";
import { Project } from "../types.ts";
import { Sparkles, Check, ArrowRight } from "lucide-react";

interface TemplateGalleryProps {
  onSelectProject: (project: Project) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectProject }) => {
  return (
    <div id="template-gallery" className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-violet-500 animate-pulse" />
        <h2 className="text-xs uppercase tracking-widest font-semibold text-neutral-500">Explore Preloaded Blueprints</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEFAULT_TEMPLATES.map((tpl) => {
          const isDark = tpl.theme.mode === "dark";
          return (
            <div
              key={tpl.id}
              id={`card-${tpl.id}`}
              className="border border-neutral-200 hover:border-neutral-300 rounded-xl overflow-hidden bg-white hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="p-6">
                {/* Header block with icon and simulated tags */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-[10px]"
                      style={{
                        background: `linear-gradient(135deg, ${tpl.theme.primary}, ${tpl.theme.secondary})`,
                      }}
                    >
                      {tpl.name[0]}
                    </div>
                    <span className="font-bold text-sm text-neutral-900">{tpl.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] font-semibold bg-neutral-100 text-neutral-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {tpl.pages.length} Pages
                    </span>
                    <span
                      className={`text-[9px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isDark ? "bg-slate-900 text-slate-300" : "bg-orange-50 text-orange-700"
                      }`}
                    >
                      {tpl.theme.mode} Mode
                    </span>
                  </div>
                </div>

                {/* Prompt reference & concept summary */}
                <p className="text-xs text-neutral-500 mb-4 line-clamp-2 italic">
                  &ldquo;{tpl.prompt}&rdquo;
                </p>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {tpl.description}
                </p>

                {/* Color chips display */}
                <div className="flex gap-1.5 mt-4">
                  <span className="text-[10px] text-neutral-400 mr-1.5 font-medium self-center">Palette:</span>
                  <div className="w-3.5 h-3.5 rounded-full border border-neutral-200" style={{ backgroundColor: tpl.theme.primary }} title="Primary Color"></div>
                  <div className="w-3.5 h-3.5 rounded-full border border-neutral-200" style={{ backgroundColor: tpl.theme.secondary }} title="Secondary Color"></div>
                  <div className="w-3.5 h-3.5 rounded-full border border-neutral-200" style={{ backgroundColor: tpl.theme.accent }} title="Accent Color"></div>
                </div>
              </div>

              {/* Action button panel */}
              <div className="px-6 py-4 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between group-hover:bg-neutral-50 transition-colors">
                <div className="flex gap-4">
                  <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-500" /> Live Preview
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-500" /> Next.js Router
                  </span>
                </div>
                <button
                  onClick={() => onSelectProject(tpl)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 group-hover:text-violet-600 transition-colors"
                >
                  Open Sandbox <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
