import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileCode, 
  FolderTree, 
  BookOpen, 
  CheckCircle2, 
  Terminal,
  Layers,
  Sparkles
} from 'lucide-react';
import { WORDPRESS_THEME_FILES, WORDPRESS_SETUP_GUIDE } from '../data/wordpressThemeFiles';

interface WordPressThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordPressThemeModal: React.FC<WordPressThemeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'files' | 'architecture' | 'guide' | 'checklist'>('files');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = WORDPRESS_THEME_FILES[selectedFileIndex];

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCurrent = () => {
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFile.filename.split('/').pop() || 'theme-file.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    let bundle = `/**\n * PINK AURA BD - ASTRA CHILD THEME DISTRIBUTION PACKAGE\n * Version: 1.0.0\n * Description: Complete copy-ready theme files\n */\n\n`;
    WORDPRESS_THEME_FILES.forEach((f) => {
      bundle += `\n/* ==========================================================\n * FILE: ${f.path}\n * ========================================================== */\n\n${f.content}\n\n`;
    });
    bundle += `\n/* ==========================================================\n * SETUP & DEPLOYMENT GUIDE\n * ========================================================== */\n\n${WORDPRESS_SETUP_GUIDE}\n`;

    const blob = new Blob([bundle], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pink-aura-bd-astra-child-theme.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#07070B]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#101016] border border-[#302333] w-full max-w-6xl rounded-2xl md:rounded-3xl shadow-2xl flex flex-col h-[90vh] overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#302333] flex items-center justify-between bg-[#14141D]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF2D95]/20 text-[#FF2D95] flex items-center justify-center font-bold">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base md:text-lg text-white flex items-center gap-2">
                <span>WordPress Astra Child Theme Suite</span>
                <span className="text-[10px] bg-[#FF2D95]/20 text-[#FF2D95] px-2 py-0.5 rounded font-mono">v1.0.0 Ready</span>
              </h2>
              <p className="text-xs text-[#A8A1B3]">
                Production PHP architecture, Astra child templates, and setup deliverables
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadAll}
              className="hidden sm:flex items-center gap-1.5 bg-[#FF2D95] hover:bg-[#FF007F] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-md shadow-[#FF2D95]/30"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Bundle</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#A8A1B3] hover:text-white hover:bg-[#302333] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 border-b border-[#302333] bg-[#07070B] flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'files'
                ? 'bg-[#FF2D95]/20 text-[#FF2D95] border border-[#FF2D95]/40'
                : 'text-[#A8A1B3] hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Theme Source Code ({WORDPRESS_THEME_FILES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'architecture'
                ? 'bg-[#FF2D95]/20 text-[#FF2D95] border border-[#FF2D95]/40'
                : 'text-[#A8A1B3] hover:text-white'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Directory Tree & Architecture</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'guide'
                ? 'bg-[#FF2D95]/20 text-[#FF2D95] border border-[#FF2D95]/40'
                : 'text-[#A8A1B3] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>WordPress Setup Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'bg-[#FF2D95]/20 text-[#FF2D95] border border-[#FF2D95]/40'
                : 'text-[#A8A1B3] hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Deployment & Rollback Checklist</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* TAB 1: CODE FILES VIEW */}
          {activeTab === 'files' && (
            <>
              {/* File List Sidebar */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#302333] bg-[#14141D]/60 p-3 overflow-y-auto shrink-0 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#A8A1B3] px-2 py-1 block">
                  Astra Child Theme Files
                </span>
                {WORDPRESS_THEME_FILES.map((file, idx) => (
                  <button
                    key={file.filename}
                    onClick={() => {
                      setSelectedFileIndex(idx);
                      setCopied(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                      selectedFileIndex === idx
                        ? 'bg-[#FF2D95] text-white shadow-md shadow-[#FF2D95]/30'
                        : 'text-[#A8A1B3] hover:text-white hover:bg-[#302333]/50'
                    }`}
                  >
                    <span className="truncate">{file.filename}</span>
                    <span className="text-[10px] uppercase opacity-75 font-mono">{file.language}</span>
                  </button>
                ))}
              </div>

              {/* Code Viewer Panel */}
              <div className="flex-1 flex flex-col bg-[#07070B] overflow-hidden">
                {/* Code Header */}
                <div className="px-4 py-2.5 bg-[#14141D] border-b border-[#302333] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#FF2D95] font-mono font-bold">{currentFile.path}</span>
                    <span className="text-[#A8A1B3] hidden sm:inline">&middot; {currentFile.description}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopy(currentFile.content)}
                      className="flex items-center gap-1 bg-[#101016] border border-[#302333] hover:border-[#FF2D95] text-white px-2.5 py-1 rounded-lg transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={handleDownloadCurrent}
                      className="p-1 rounded-lg text-[#A8A1B3] hover:text-white hover:bg-[#302333] transition"
                      title="Download file"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Code Body */}
                <div className="flex-1 overflow-auto p-4 font-mono text-xs text-[#F8F5FA] leading-relaxed bg-[#07070B] select-text">
                  <pre className="whitespace-pre">
                    <code>{currentFile.content}</code>
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: ARCHITECTURE & DIRECTORY TREE */}
          {activeTab === 'architecture' && (
            <div className="flex-1 p-6 overflow-y-auto bg-[#07070B] space-y-6">
              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  1. Child Theme Directory Structure
                </h3>
                <p className="text-sm text-[#A8A1B3] mb-4">
                  The Pink Aura BD video platform is packaged as a standard Astra Child Theme. It leaves Astra core completely untouched and layers custom templates, post types, and styling safely on top.
                </p>

                <div className="bg-[#14141D] border border-[#302333] rounded-2xl p-4 font-mono text-xs text-[#FF2D95] leading-relaxed">
                  <pre>{`wp-content/themes/astra-child-pink-aura/
├── style.css                      # Child theme declaration & neon-pink styling
├── functions.php                  # CPT 'video', taxonomy, AJAX filter endpoints
├── front-page.php                 # Sections A to G homepage template
├── single-video.php               # Single post template with 16:9 player
├── archive-video.php              # Video archive grid with sorting & filter
├── taxonomy-video_category.php    # Regional & creator taxonomy archive
├── template-parts/
│   └── video-card.php             # Reusable 16:9 video card component
└── assets/
    ├── css/
    │   └── custom.css             # Supplementary responsive overrides
    └── js/
        └── pink-aura.js           # AJAX filtering, player modal, bottom nav`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  2. Architectural Trade-offs: CPT vs Standard Posts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#A8A1B3]">
                  <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D]">
                    <span className="font-bold text-white text-sm block mb-1">Custom Post Type ('video') &mdash; Chosen</span>
                    <p>Clean separation from standard blog posts; dedicated rewrites (<code className="text-[#FF2D95]">/video/post-name</code>); custom meta boxes for video embeds, views, duration, and quality without cluttering standard WordPress feeds.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D]">
                    <span className="font-bold text-white text-sm block mb-1">Standard Posts &mdash; Rejected</span>
                    <p>Standard posts pollute the default blog feed, require hacks to filter out non-video articles, and complicate REST API endpoints for discovery apps.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORDPRESS SETUP GUIDE */}
          {activeTab === 'guide' && (
            <div className="flex-1 p-6 overflow-y-auto bg-[#07070B] space-y-6">
              <h3 className="font-display text-lg font-bold text-white mb-2">
                WordPress Configuration & Content Management Walkthrough
              </h3>

              <div className="space-y-4 text-xs text-[#A8A1B3] leading-relaxed">
                <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D]">
                  <span className="font-bold text-white text-sm block mb-1">Step 1: Installing the Child Theme</span>
                  <p>Upload the <code className="text-[#FF2D95]">astra-child-pink-aura</code> folder to <code className="text-white">/wp-content/themes/</code>. In WordPress Admin, go to <strong>Appearance &gt; Themes</strong> and click <strong>Activate</strong> on Astra Child - Pink Aura BD.</p>
                </div>

                <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D]">
                  <span className="font-bold text-white text-sm block mb-1">Step 2: Assigning Categories & Taxonomies</span>
                  <p>Navigate to <strong>Videos &gt; Video Categories</strong>. Pre-seed the taxonomies:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-white">
                    <li><strong className="text-[#FF2D95]">Bangladeshi</strong> (slug: bangladeshi)</li>
                    <li><strong className="text-[#FF2D95]">Pakistani</strong> (slug: pakistani)</li>
                    <li><strong className="text-[#FF2D95]">Indian</strong> (slug: indian)</li>
                    <li><strong className="text-[#FF2D95]">TikToker</strong> (slug: tiktoker)</li>
                    <li><strong className="text-[#FF2D95]">Trending Now</strong> (slug: trending-now)</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D]">
                  <span className="font-bold text-white text-sm block mb-1">Step 3: Setting the Static Homepage</span>
                  <p>Create a new page called <strong>Home</strong>. In Page Attributes, choose <strong>Pink Aura BD Homepage</strong> template. Then go to <strong>Settings &gt; Reading</strong>, set "Your homepage displays" to "A static page", and select Home.</p>
                </div>

                <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D]">
                  <span className="font-bold text-white text-sm block mb-1">Step 4: Configuring Navigation Menus</span>
                  <p>Go to <strong>Appearance &gt; Menus</strong>. Create a menu named "Primary Discovery Menu" with links for Home, Trending Now, Bangladeshi, Pakistani, Indian, Most Trending, TikToker, and Latest Videos. Assign to Primary Menu location.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DEPLOYMENT & ROLLBACK CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="flex-1 p-6 overflow-y-auto bg-[#07070B] space-y-6">
              <h3 className="font-display text-lg font-bold text-white mb-2">
                Production Deployment & Rollback Checklist
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D] space-y-2">
                  <span className="font-bold text-[#FF2D95] text-sm block">Pre-Flight Deployment Checklist</span>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#FF2D95]">✓</span>
                    <span>Verify PHP 8.1+ compatibility and Astra version 4.6+</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#FF2D95]">✓</span>
                    <span>Run <code className="text-white">wp rewrite flush</code> to register custom post type permalinks</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#FF2D95]">✓</span>
                    <span>Test AJAX security nonce verification in <code className="text-white">pink-aura.js</code></span>
                  </div>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#FF2D95]">✓</span>
                    <span>Confirm 16:9 responsive aspect ratio on mobile devices (375px–430px)</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#FF2D95]">✓</span>
                    <span>Verify zero broken image fallbacks across all category archives</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#302333] bg-[#14141D] space-y-2">
                  <span className="font-bold text-[#9B5CFF] text-sm block">Backup & Rollback Procedures</span>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#9B5CFF]">1</span>
                    <span>Take a full database snapshot using WP-CLI (<code className="text-white">wp db export backup.sql</code>)</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#9B5CFF]">2</span>
                    <span>Archive current active theme folder before switching</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#9B5CFF]">3</span>
                    <span>In event of critical error, switch back to parent Astra via WP-CLI: <code className="text-white">wp theme activate astra</code></span>
                  </div>
                  <div className="flex items-start gap-2 text-[#A8A1B3]">
                    <span className="text-[#9B5CFF]">4</span>
                    <span>All video post metadata remains preserved in <code className="text-white">wp_postmeta</code> safely</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
