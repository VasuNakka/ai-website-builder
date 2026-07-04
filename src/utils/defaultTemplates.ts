import { Project } from "../types.ts";

export const DEFAULT_TEMPLATES: Project[] = [
  {
    id: "proj_vitall",
    name: "Vitall",
    description: "AI-powered patient management and telemetry for modern healthtech clinics.",
    prompt: "A modern dark-themed SaaS dashboard and landing page for a healthtech startup named Vitall with interactive graphs and pricing tables",
    theme: {
      primary: "#8b5cf6",
      secondary: "#06b6d4",
      accent: "#f43f5e",
      fontSans: "Inter",
      fontDisplay: "Space Grotesk",
      mode: "dark"
    },
    currentPage: "Home",
    pages: [
      {
        name: "Home",
        path: "/",
        previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vitall - Patient Analytics</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              primary: '#8b5cf6',
              secondary: '#06b6d4',
              accent: '#f43f5e'
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#0b0f19] text-slate-100 min-h-screen selection:bg-brand-primary/30">

  <!-- Floating Header -->
  <header class="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/60">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white">V</div>
        <span class="text-xl font-bold tracking-tight text-white">Vitall</span>
      </div>
      
      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="javascript:void(0)" onclick="navigateTo('Home')" class="text-white font-semibold">Home</a>
        <a href="javascript:void(0)" onclick="navigateTo('About')" class="hover:text-white transition-colors">About</a>
        <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="hover:text-white transition-colors">Pricing</a>
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="hover:text-white transition-colors">Contact</a>
      </nav>

      <div class="flex items-center gap-4">
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-medium px-4 h-9 flex items-center justify-center rounded-lg transition-all shadow-lg shadow-brand-primary/20">Book Demo</a>
        <button id="menu-btn" class="md:hidden text-slate-300 hover:text-white p-1">
          <i data-lucide="menu"></i>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-slate-800 bg-[#0b0f19] px-6 py-4 absolute top-16 left-0 w-full flex flex-col gap-4 text-sm font-medium shadow-xl">
      <a href="javascript:void(0)" onclick="navigateTo('Home')" class="text-white">Home</a>
      <a href="javascript:void(0)" onclick="navigateTo('About')" class="text-slate-300">About</a>
      <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="text-slate-300">Pricing</a>
      <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="text-slate-300">Contact</a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative pt-24 pb-20 px-6 overflow-hidden">
    <!-- Purple ambient glows -->
    <div class="absolute -top-40 left-1/4 w-[400px] h-[400px] bg-brand-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-20 right-10 w-[300px] h-[300px] bg-brand-secondary/15 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full text-xs font-semibold text-brand-primary mb-6">
        <i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Powered by Clinical Intelligence
      </div>
      <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
        Next-Generation <br/><span class="bg-gradient-to-r from-brand-primary via-violet-400 to-brand-secondary bg-clip-text text-transparent">Telemetry & Patient Care</span>
      </h1>
      <p class="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
        Vitall synchronizes real-time wearable analytics, clinical charts, and smart triage logs to build a single comprehensive timeline of patient health.
      </p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-all shadow-lg shadow-brand-primary/25 text-center">Book a Trial</a>
        <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold px-6 py-3 rounded-lg transition-all text-center">Explore Pricing</a>
      </div>
    </div>

    <!-- Live telemetry dashboard mockup -->
    <div class="max-w-5xl mx-auto mt-16 p-3 bg-slate-900/40 border border-slate-800 rounded-2xl shadow-2xl relative">
      <div class="absolute inset-0 bg-gradient-to-t from-[#0b0f19] to-transparent pointer-events-none z-10 h-1/3 bottom-0 top-auto"></div>
      <div class="bg-[#0f1524] rounded-xl overflow-hidden border border-slate-800">
        <!-- Dashboard Header -->
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span class="text-xs font-mono text-slate-400">PATIENT ID: #VT-4920</span>
          </div>
          <div class="flex gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
          </div>
        </div>
        <!-- Dashboard Charts grid -->
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-4 bg-slate-900/50 border border-slate-800/60 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-400">Heart Rate</span>
              <span class="text-[10px] px-2 py-0.5 bg-rose-500/10 text-rose-400 rounded-full">Normal</span>
            </div>
            <div class="text-2xl font-bold text-white flex items-baseline gap-1">
              72 <span class="text-xs text-slate-500">BPM</span>
            </div>
            <!-- Mock visual waveform bar -->
            <div class="h-10 flex items-end gap-1 mt-4">
              <span class="w-1.5 h-3 bg-rose-500/80 rounded-full"></span>
              <span class="w-1.5 h-5 bg-rose-500/80 rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
              <span class="w-1.5 h-8 bg-rose-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
              <span class="w-1.5 h-4 bg-rose-500/80 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
              <span class="w-1.5 h-6 bg-rose-500/80 rounded-full"></span>
              <span class="w-1.5 h-3 bg-rose-500/80 rounded-full"></span>
            </div>
          </div>
          <div class="p-4 bg-slate-900/50 border border-slate-800/60 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-400">Oxygen Saturation</span>
              <span class="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full">Stable</span>
            </div>
            <div class="text-2xl font-bold text-white flex items-baseline gap-1">
              98% <span class="text-xs text-slate-500">SpO2</span>
            </div>
            <div class="h-10 flex items-end gap-1 mt-4">
              <span class="w-1.5 h-6 bg-brand-secondary/80 rounded-full"></span>
              <span class="w-1.5 h-6 bg-brand-secondary/80 rounded-full"></span>
              <span class="w-1.5 h-7 bg-brand-secondary rounded-full"></span>
              <span class="w-1.5 h-8 bg-brand-secondary rounded-full"></span>
              <span class="w-1.5 h-7 bg-brand-secondary/80 rounded-full"></span>
              <span class="w-1.5 h-6 bg-brand-secondary/80 rounded-full"></span>
            </div>
          </div>
          <div class="p-4 bg-slate-900/50 border border-slate-800/60 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-semibold text-slate-400">Patient Load</span>
              <span class="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full">Average</span>
            </div>
            <div class="text-2xl font-bold text-white flex items-baseline gap-1">
              128 <span class="text-xs text-slate-500">Active</span>
            </div>
            <div class="h-10 flex items-end gap-1 mt-4">
              <span class="w-1.5 h-4 bg-brand-primary/80 rounded-full"></span>
              <span class="w-1.5 h-6 bg-brand-primary/80 rounded-full"></span>
              <span class="w-1.5 h-5 bg-brand-primary rounded-full"></span>
              <span class="w-1.5 h-8 bg-brand-primary rounded-full"></span>
              <span class="w-1.5 h-7 bg-brand-primary/80 rounded-full"></span>
              <span class="w-1.5 h-4 bg-brand-primary/80 rounded-full"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Bento Grid -->
  <section class="py-24 px-6 border-t border-slate-800 bg-slate-950/40">
    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">Engineered to elevate clinic outputs</h2>
        <p class="text-slate-400">Everything needed to monitor cardiac rhythms, patient workflows, and smart alarm alerts seamlessly.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-8 bg-[#0f1524]/60 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-all group">
          <div class="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
            <i data-lucide="zap"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Real-Time Waveforms</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Stream seamless high-frequency patient biometric lines directly to central telemetry screens with sub-5ms lag.</p>
        </div>
        <div class="p-8 bg-[#0f1524]/60 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-all group">
          <div class="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-6 group-hover:scale-110 transition-transform">
            <i data-lucide="bell"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">Smart Alarm Filtering</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Our AI models filter out up to 85% of clinical alarm noise by analyzing posture changes and electrode connections.</p>
        </div>
        <div class="p-8 bg-[#0f1524]/60 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-all group">
          <div class="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform">
            <i data-lucide="shield-check"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-2">HIPAA Compliant</h3>
          <p class="text-slate-400 text-sm leading-relaxed">Encrypted end-to-end at rest and in transit. Standard enterprise auditing, access logging, and simple SSO sync.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-[#070911] border-t border-slate-900 py-12 px-6">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white text-xs">V</div>
        <span class="text-lg font-bold text-white">Vitall</span>
      </div>
      <p class="text-xs text-slate-500">&copy; 2026 Vitall Inc. All clinical data representation is mock telemetry.</p>
      <div class="flex gap-4 text-xs text-slate-400">
        <a href="javascript:void(0)" class="hover:text-white">Privacy Policy</a>
        <a href="javascript:void(0)" class="hover:text-white">Terms of Use</a>
      </div>
    </div>
  </footer>

  <script>
    lucide.createIcons();
    
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Parent messaging for live navigation simulation
    function navigateTo(page) {
      console.log('Navigating to', page);
      window.parent.postMessage({ type: 'LIVE_NAVIGATE', page: page }, '*');
    }
  </script>
</body>
</html>`
      },
      {
        name: "About",
        path: "/about",
        previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Vitall</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              primary: '#8b5cf6',
              secondary: '#06b6d4',
              accent: '#f43f5e'
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#0b0f19] text-slate-100 min-h-screen">

  <header class="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/60">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white">V</div>
        <span class="text-xl font-bold tracking-tight text-white">Vitall</span>
      </div>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="javascript:void(0)" onclick="navigateTo('Home')" class="hover:text-white transition-colors">Home</a>
        <a href="javascript:void(0)" onclick="navigateTo('About')" class="text-white font-semibold">About</a>
        <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="hover:text-white transition-colors">Pricing</a>
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="hover:text-white transition-colors">Contact</a>
      </nav>
      <div class="flex items-center gap-4">
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-medium px-4 h-9 flex items-center justify-center rounded-lg transition-all shadow-lg shadow-brand-primary/20">Book Demo</a>
        <button id="menu-btn" class="md:hidden text-slate-300 hover:text-white p-1">
          <i data-lucide="menu"></i>
        </button>
      </div>
    </div>
  </header>

  <section class="py-20 px-6 max-w-4xl mx-auto text-center relative">
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Our Mission</h1>
    <p class="text-lg text-slate-300 leading-relaxed mb-12">
      We believe that medical staff deserve software that feels as high-quality and reliable as the machinery they operate in surgical blocks. Vitall was founded in 2024 to replace dated, slow EHR grids with rapid, fluid dashboards.
    </p>

    <!-- Key metrics stats grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-slate-900/30 border border-slate-800 rounded-2xl">
      <div>
        <div class="text-3xl font-extrabold text-brand-primary mb-1">20M+</div>
        <div class="text-xs text-slate-400">Signals Logged</div>
      </div>
      <div>
        <div class="text-3xl font-extrabold text-brand-secondary mb-1">99.99%</div>
        <div class="text-xs text-slate-400">Server Uptime</div>
      </div>
      <div>
        <div class="text-3xl font-extrabold text-brand-accent mb-1">&lt;5ms</div>
        <div class="text-xs text-slate-400">Signal Latency</div>
      </div>
      <div>
        <div class="text-3xl font-extrabold text-emerald-400 mb-1">150+</div>
        <div class="text-xs text-slate-400">Clinics Served</div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-[#070911] border-t border-slate-900 py-12 px-6 mt-16">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white text-xs">V</div>
        <span class="text-lg font-bold text-white">Vitall</span>
      </div>
      <p class="text-xs text-slate-500">&copy; 2026 Vitall Inc. All clinical data representation is mock telemetry.</p>
    </div>
  </footer>

  <script>
    lucide.createIcons();
    function navigateTo(page) {
      window.parent.postMessage({ type: 'LIVE_NAVIGATE', page: page }, '*');
    }
  </script>
</body>
</html>`
      },
      {
        name: "Pricing",
        path: "/pricing",
        previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pricing Plans - Vitall</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              primary: '#8b5cf6',
              secondary: '#06b6d4',
              accent: '#f43f5e'
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#0b0f19] text-slate-100 min-h-screen">

  <header class="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/60">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white">V</div>
        <span class="text-xl font-bold tracking-tight text-white">Vitall</span>
      </div>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="javascript:void(0)" onclick="navigateTo('Home')" class="hover:text-white transition-colors">Home</a>
        <a href="javascript:void(0)" onclick="navigateTo('About')" class="hover:text-white transition-colors">About</a>
        <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="text-white font-semibold">Pricing</a>
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="hover:text-white transition-colors">Contact</a>
      </nav>
      <div class="flex items-center gap-4">
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-medium px-4 h-9 flex items-center justify-center rounded-lg transition-all shadow-lg shadow-brand-primary/20">Book Demo</a>
      </div>
    </div>
  </header>

  <section class="py-20 px-6">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <h1 class="text-4xl font-bold tracking-tight text-white mb-4">Pricing plans for clinics of all scales</h1>
      <p class="text-slate-400">Scale biometrics stream nodes as your active patient load demands.</p>
      
      <!-- Interactive Pricing Toggle -->
      <div class="flex items-center justify-center gap-3 mt-8">
        <span id="label-monthly" class="text-sm font-medium text-white">Monthly billing</span>
        <button id="toggle-btn" class="w-12 h-6 rounded-full bg-brand-primary p-1 flex items-center transition-all duration-300">
          <span id="toggle-knob" class="w-4 h-4 rounded-full bg-white transition-all transform translate-x-0"></span>
        </button>
        <span id="label-yearly" class="text-sm font-medium text-slate-400">Annual <span class="text-emerald-400 font-semibold">(20% Off)</span></span>
      </div>
    </div>

    <!-- Pricing Grid -->
    <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      <div class="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-white mb-2">Practice</h3>
          <p class="text-slate-400 text-sm mb-6">Best for small localized family clinics.</p>
          <div class="text-4xl font-extrabold text-white mb-6">
            $<span id="price-practice">149</span><span class="text-sm text-slate-500 font-medium">/mo</span>
          </div>
          <ul class="space-y-3.5 text-sm text-slate-300">
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Up to 20 Patients</li>
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Real-time Telemetry</li>
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Standard HIPAA Logs</li>
          </ul>
        </div>
        <button onclick="navigateTo('Contact')" class="w-full mt-8 py-2.5 rounded-lg border border-slate-700 hover:border-slate-600 font-semibold text-slate-200 transition-all">Get Started</button>
      </div>

      <div class="p-8 bg-[#0f1524] border-2 border-brand-primary rounded-2xl relative flex flex-col justify-between shadow-xl shadow-brand-primary/5">
        <div class="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">Most Popular</div>
        <div>
          <h3 class="text-lg font-bold text-white mb-2">Clinic Pro</h3>
          <p class="text-slate-400 text-sm mb-6">Standard for medium multi-room centers.</p>
          <div class="text-4xl font-extrabold text-white mb-6">
            $<span id="price-clinic">399</span><span class="text-sm text-slate-500 font-medium">/mo</span>
          </div>
          <ul class="space-y-3.5 text-sm text-slate-300">
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Up to 150 Patients</li>
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Waveform Stream History (30d)</li>
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Smart Alarm Noise Suppression</li>
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Priority SSO Integration</li>
          </ul>
        </div>
        <button onclick="navigateTo('Contact')" class="w-full mt-8 py-2.5 rounded-lg bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold transition-all shadow-lg shadow-brand-primary/20">Subscribe Pro</button>
      </div>

      <div class="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 class="text-lg font-bold text-white mb-2">Hospital</h3>
          <p class="text-slate-400 text-sm mb-6">Advanced telemetry node orchestration.</p>
          <div class="text-4xl font-extrabold text-white mb-6">Custom</div>
          <ul class="space-y-3.5 text-sm text-slate-300">
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Unlimited Patients</li>
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> Dedicated Node Hosting</li>
            <li class="flex items-center gap-2"><i data-lucide="check" class="text-brand-secondary w-4 h-4"></i> 24/7 Phone SLA Support</li>
          </ul>
        </div>
        <button onclick="navigateTo('Contact')" class="w-full mt-8 py-2.5 rounded-lg border border-slate-700 hover:border-slate-600 font-semibold text-slate-200 transition-all">Contact Sales</button>
      </div>
    </div>
  </section>

  <script>
    lucide.createIcons();
    function navigateTo(page) {
      window.parent.postMessage({ type: 'LIVE_NAVIGATE', page: page }, '*');
    }

    // Toggle logic
    const toggleBtn = document.getElementById('toggle-btn');
    const toggleKnob = document.getElementById('toggle-knob');
    const monthlyLabel = document.getElementById('label-monthly');
    const yearlyLabel = document.getElementById('label-yearly');
    const pricePractice = document.getElementById('price-practice');
    const priceClinic = document.getElementById('price-clinic');

    let isYearly = false;

    toggleBtn.addEventListener('click', () => {
      isYearly = !isYearly;
      if (isYearly) {
        toggleKnob.classList.add('translate-x-6');
        toggleKnob.classList.remove('translate-x-0');
        toggleBtn.classList.replace('bg-brand-primary', 'bg-emerald-500');
        yearlyLabel.classList.replace('text-slate-400', 'text-white');
        monthlyLabel.classList.replace('text-white', 'text-slate-400');
        
        // Apply yearly prices
        pricePractice.innerText = "119";
        priceClinic.innerText = "319";
      } else {
        toggleKnob.classList.add('translate-x-0');
        toggleKnob.classList.remove('translate-x-6');
        toggleBtn.classList.replace('bg-emerald-500', 'bg-brand-primary');
        monthlyLabel.classList.replace('text-slate-400', 'text-white');
        yearlyLabel.classList.replace('text-white', 'text-slate-400');
        
        // Apply monthly prices
        pricePractice.innerText = "149";
        priceClinic.innerText = "399";
      }
    });
  </script>
</body>
</html>`
      },
      {
        name: "Contact",
        path: "/contact",
        previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Vitall</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3 { font-family: 'Space Grotesk', sans-serif; }
  </style>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              primary: '#8b5cf6',
              secondary: '#06b6d4',
              accent: '#f43f5e'
            }
          }
        }
      }
    }
  </script>
</head>
<body class="bg-[#0b0f19] text-slate-100 min-h-screen">

  <header class="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/60">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center font-bold text-white">V</div>
        <span class="text-xl font-bold tracking-tight text-white">Vitall</span>
      </div>
      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <a href="javascript:void(0)" onclick="navigateTo('Home')" class="hover:text-white transition-colors">Home</a>
        <a href="javascript:void(0)" onclick="navigateTo('About')" class="hover:text-white transition-colors">About</a>
        <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="hover:text-white transition-colors">Pricing</a>
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="text-white font-semibold">Contact</a>
      </nav>
      <div class="flex items-center gap-4">
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="bg-brand-primary hover:bg-brand-primary/90 text-white text-sm font-medium px-4 h-9 flex items-center justify-center rounded-lg transition-all shadow-lg shadow-brand-primary/20">Book Demo</a>
      </div>
    </div>
  </header>

  <section class="py-20 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
    <div>
      <h1 class="text-4xl font-bold tracking-tight text-white mb-6">Talk with our Clinical Solutions team</h1>
      <p class="text-slate-400 mb-8 leading-relaxed">
        Let us set up a secure mock-stream telemetry simulation for your clinical board or IT leads. We can model up to 50 active telemetry cards inside a secure sandbox sandbox.
      </p>

      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <i data-lucide="mail" class="text-brand-primary mt-1"></i>
          <div>
            <div class="text-sm font-semibold text-white">Email Us</div>
            <div class="text-xs text-slate-400">solutions@vitalltelemetry.co</div>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <i data-lucide="map-pin" class="text-brand-secondary mt-1"></i>
          <div>
            <div class="text-sm font-semibold text-white">Office</div>
            <div class="text-xs text-slate-400">One Health Plaza, San Francisco, CA 94107</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Contact form -->
    <div class="p-8 bg-slate-900/30 border border-slate-800 rounded-2xl relative overflow-hidden">
      <form id="contact-form" class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Clinic Name</label>
          <input type="text" required class="w-full bg-[#070a13] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
          <input type="email" required class="w-full bg-[#070a13] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors">
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes or special SLA needs</label>
          <textarea required rows="4" class="w-full bg-[#070a13] border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-primary transition-colors"></textarea>
        </div>
        <button type="submit" class="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-brand-primary/20">Send Request</button>
      </form>

      <!-- Glass Success Popup -->
      <div id="success-panel" class="hidden absolute inset-0 bg-[#0b0f19]/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
        <div class="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
          <i data-lucide="check-circle" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">Request Logged</h3>
        <p class="text-xs text-slate-400 max-w-xs">Your clinical stream token is generated. Our integration architect will email you in &lt;1 hour.</p>
      </div>
    </div>
  </section>

  <script>
    lucide.createIcons();
    function navigateTo(page) {
      window.parent.postMessage({ type: 'LIVE_NAVIGATE', page: page }, '*');
    }

    const form = document.getElementById('contact-form');
    const successPanel = document.getElementById('success-panel');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      successPanel.classList.remove('hidden');
    });
  </script>
</body>
</html>`
      }
    ],
    files: {
      "src/app/layout.tsx": `import './globals.css';
import { Space_Grotesk, Inter } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'Vitall - Next-Gen Clinical Telemetry',
  description: 'AI-powered telemetry streaming analytics.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${spaceGrotesk.variable} \${inter.variable} bg-[#0b0f19] text-slate-100 antialiased font-sans\`}>
        {children}
      </body>
    </html>
  );
}`,
      "src/app/page.tsx": `import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}`,
      "src/components/Navbar.tsx": `import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/60">
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center font-bold text-white">V</div>
          <span class="text-xl font-bold tracking-tight text-white">Vitall</span>
        </div>
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" class="text-white">Home</Link>
          <Link href="/about" class="hover:text-white">About</Link>
          <Link href="/pricing" class="hover:text-white">Pricing</Link>
          <Link href="/contact" class="hover:text-white">Contact</Link>
        </nav>
        <Link href="/contact" class="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 h-9 flex items-center justify-center rounded-lg transition-all shadow-lg shadow-violet-600/20">
          Book Demo
        </Link>
      </div>
    </header>
  );
}`,
      "package.json": `{
  "name": "vitall-telemetry",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.359.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0"
  }
}`
    }
  },
  {
    id: "proj_tuscana",
    name: "Tuscana Photography",
    description: "Editorial photography and visual cataloging for countryside weddings in Italy.",
    prompt: "An elegant serif editorial website for a luxury destination wedding photographer in Tuscany with image grids and reservation forms",
    theme: {
      primary: "#1c1917",
      secondary: "#78716c",
      accent: "#a8a29e",
      fontSans: "Inter",
      fontDisplay: "Playfair Display",
      mode: "light"
    },
    currentPage: "Home",
    pages: [
      {
        name: "Home",
        path: "/",
        previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tuscana Photography</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, .serif-font { font-family: 'Playfair Display', serif; }
  </style>
</head>
<body class="bg-[#faf8f6] text-[#2c2724] selection:bg-[#dfd7d0]">

  <!-- Minimal Header -->
  <header class="border-b border-stone-200 bg-stone-50/50 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="text-xl font-semibold uppercase tracking-[0.2em]">Tuscana</div>
      <nav class="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest font-medium text-stone-600">
        <a href="javascript:void(0)" onclick="navigateTo('Home')" class="text-stone-900 border-b border-stone-800">Home</a>
        <a href="javascript:void(0)" onclick="navigateTo('About')" class="hover:text-stone-900 transition-colors">Story</a>
        <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="hover:text-stone-900 transition-colors">Pricing</a>
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="hover:text-stone-900 transition-colors">Bookings</a>
      </nav>
      <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="text-xs uppercase tracking-widest bg-stone-900 text-[#faf8f6] font-medium px-5 py-2.5 rounded hover:bg-stone-800 transition-colors">Inquire</a>
    </div>
  </header>

  <!-- Editorial Hero Section -->
  <section class="max-w-6xl mx-auto px-6 pt-24 pb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <div>
      <h1 class="text-5xl md:text-6xl font-normal leading-tight mb-8">
        Capturing <span class="italic">honest, fleeting</span> elegance in Tuscany.
      </h1>
      <p class="text-stone-600 leading-relaxed max-w-md mb-10 text-sm md:text-base">
        A boutique editorial approach specializing in luxury wedding photography and timeless portraits against classic Italian landscapes.
      </p>
      <div class="flex gap-6">
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="text-xs uppercase tracking-widest bg-stone-900 text-stone-100 font-medium px-6 py-3.5 rounded hover:bg-stone-800 transition-colors">Book Date</a>
        <a href="javascript:void(0)" onclick="navigateTo('About')" class="text-xs uppercase tracking-widest border border-stone-300 font-medium px-6 py-3.5 rounded hover:bg-stone-100 transition-colors">Our Philosophy</a>
      </div>
    </div>
    
    <!-- Hero Image Stack -->
    <div class="relative h-[480px] bg-stone-100 rounded overflow-hidden shadow-lg border border-stone-200">
      <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" alt="Tuscany wedding" class="w-full h-full object-cover grayscale-[15%] brightness-[95%]">
      <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 text-[10px] uppercase tracking-widest">Siena, Italy</div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="bg-stone-100/50 py-24 border-t border-b border-stone-200/60">
    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center max-w-lg mx-auto mb-16">
        <span class="text-xs uppercase tracking-[0.25em] text-stone-500">Visual Catalog</span>
        <h2 class="text-3xl font-light mt-2">The Collection</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-4">
          <div class="aspect-[3/4] bg-stone-200 overflow-hidden rounded relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div class="text-[11px] uppercase tracking-widest text-stone-500 font-medium">I. Florence Cathedral Vows</div>
        </div>
        <div class="space-y-4">
          <div class="aspect-[3/4] bg-stone-200 overflow-hidden rounded relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          </div>
          <div class="text-[11px] uppercase tracking-widest text-stone-500 font-medium">II. Chianti Vineyard Sunset</div>
        </div>
        <div class="space-y-4">
          <div class="aspect-[3/4] bg-stone-200 overflow-hidden rounded relative group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
          </div>
          <div class="text-[11px] uppercase tracking-widest text-stone-500 font-medium">III. Olive Grove Intimate Dinner</div>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-stone-900 text-stone-400 py-16 px-6">
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 border-b border-stone-800 pb-10 mb-10">
      <div class="text-stone-100 uppercase tracking-[0.2em] font-medium">Tuscana</div>
      <div class="flex gap-8 text-xs uppercase tracking-widest">
        <a href="javascript:void(0)" class="hover:text-stone-200">Story</a>
        <a href="javascript:void(0)" class="hover:text-stone-200">Galleries</a>
        <a href="javascript:void(0)" class="hover:text-stone-200">Contact</a>
      </div>
    </div>
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] tracking-widest uppercase">
      <div>&copy; 2026 Tuscana Photography. All rights reserved.</div>
      <div>Designed in Florence</div>
    </div>
  </footer>

  <script>
    lucide.createIcons();
    function navigateTo(page) {
      window.parent.postMessage({ type: 'LIVE_NAVIGATE', page: page }, '*');
    }
  </script>
</body>
</html>`
      },
      {
        name: "About",
        path: "/about",
        previewHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About Tuscana</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
    body { font-family: 'Inter', sans-serif; }
    h1, h2, h3, .serif-font { font-family: 'Playfair Display', serif; }
  </style>
</head>
<body class="bg-[#faf8f6] text-[#2c2724]">

  <header class="border-b border-stone-200 bg-stone-50/50 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <div class="text-xl font-semibold uppercase tracking-[0.2em]">Tuscana</div>
      <nav class="hidden md:flex items-center gap-10 text-xs uppercase tracking-widest font-medium text-stone-600">
        <a href="javascript:void(0)" onclick="navigateTo('Home')" class="hover:text-stone-900 transition-colors">Home</a>
        <a href="javascript:void(0)" onclick="navigateTo('About')" class="text-stone-900 border-b border-stone-800">Story</a>
        <a href="javascript:void(0)" onclick="navigateTo('Pricing')" class="hover:text-stone-900 transition-colors">Pricing</a>
        <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="hover:text-stone-900 transition-colors">Bookings</a>
      </nav>
      <a href="javascript:void(0)" onclick="navigateTo('Contact')" class="text-xs uppercase tracking-widest bg-stone-900 text-[#faf8f6] font-medium px-5 py-2.5 rounded hover:bg-stone-800 transition-colors">Inquire</a>
    </div>
  </header>

  <section class="max-w-4xl mx-auto px-6 py-24 text-center">
    <span class="text-xs uppercase tracking-[0.3em] text-stone-500">The Story</span>
    <h1 class="text-4xl md:text-5xl font-light mt-2 mb-10">We photograph memories that breathe</h1>
    <p class="text-stone-600 leading-relaxed text-sm md:text-base max-w-2xl mx-auto mb-12">
      Founded by Clara and Matteo in Siena, Tuscana is built on the pursuit of raw wedding elements: the rustle of olive trees, warm afternoon terracotta glows, and tearful embraces.
    </p>
    <img src="https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?auto=format&fit=crop&q=80&w=800" alt="Photographers" class="w-full h-[400px] object-cover rounded shadow">
  </section>

  <script>
    function navigateTo(page) {
      window.parent.postMessage({ type: 'LIVE_NAVIGATE', page: page }, '*');
    }
  </script>
</body>
</html>`
      }
    ],
    files: {
      "src/app/page.tsx": `import Header from '@/components/Header';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <div className="bg-[#faf8f6] text-[#2c2724] min-h-screen">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-serif text-center mb-12">Tuscana Photography</h1>
        <Gallery />
      </main>
    </div>
  );
}`,
      "src/components/Gallery.tsx": `export default function Gallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="aspect-[3/4] bg-stone-200 rounded overflow-hidden">
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
      </div>
      <div className="aspect-[3/4] bg-stone-200 rounded overflow-hidden">
        <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
      </div>
      <div className="aspect-[3/4] bg-stone-200 rounded overflow-hidden">
        <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}`
    }
  }
];
