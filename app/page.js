'use client';

import { TikTok_Sans } from "next/font/google"; 
import { useState, useEffect, useRef } from "react";

const tiktokSans = TikTok_Sans({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
});

// ─── DATA ───────────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Roxanne Williams",
  title: "Digital Marketer · Social Media Manager · Graphic Designer · Ad Specialist",
  bio: "I engineer social strategies that convert. 5+ yrs optimizing digital campaigns, ad performance, and brand presence across platforms.",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face",
  location: "Johannesburg, South Africa",
  available: true,
  links: {
    linkedin: "#",
    github: "#",
    instagram: "#",
    dribbble: "#",
    TikTok_Sans: "#",
  },
};

const ROLES = ["All", "Designer", "Developer", "Photographer", "Researcher"];

const PROJECTS = [
  {
    id: 1,
    title: "Helix Finance App",
    role: "Designer",
    tags: ["Designer", "Developer"],
    summary: "Redesigned a fintech app for Gen Z investors, boosting engagement by 340%.",
    cover: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop",
    views: "12.4k",
    featured: true,
    size: "large",
    challenge: "Helix had strong backend infrastructure but a UI that felt like it was designed for 50-year-olds. Gen Z users were churning within 3 sessions.",
    approach: "Ran 6 rounds of user testing with 18–26 year olds. Rebuilt the information architecture from scratch. Introduced motion-first UI patterns and a dark-first design system.",
    result: "DAU increased 340%, session length up 2.1x, App Store rating went from 3.2 to 4.8.",
    tools: ["Figma", "React Native", "Lottie", "Amplitude"],
    metrics: [{ label: "DAU Growth", value: "+340%" }, { label: "App Store Rating", value: "4.8★" }, { label: "Session Length", value: "+2.1×" }],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Urban Pulse",
    role: "Photographer",
    tags: ["Photographer"],
    summary: "Documentary series capturing the hidden lives of night-shift workers across 7 cities.",
    cover: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
    views: "8.9k",
    featured: false,
    size: "medium",
    challenge: "Night-shift workers are invisible to mainstream media. I wanted to change that.",
    approach: "Spent 4 months embedded with workers — bakers, nurses, security guards. Shot only with available light to preserve authenticity.",
    result: "Series published in Wired and featured at SF Photo Festival.",
    tools: ["Sony A7IV", "Lightroom", "Capture One"],
    metrics: [{ label: "Cities", value: "7" }, { label: "Subjects", value: "43" }, { label: "Publications", value: "3" }],
    gallery: [
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Lattice Design System",
    role: "Designer",
    tags: ["Designer", "Developer"],
    summary: "Built a cross-platform design system used by 40+ engineers across 3 product lines.",
    cover: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop",
    views: "21.1k",
    featured: true,
    size: "medium",
    challenge: "Four teams, four codebases, zero consistency. Every sprint produced more visual debt.",
    approach: "Audited all four products. Identified 200+ component variants, reduced to 47. Built token-based theming and Storybook documentation.",
    result: "Design-to-dev handoff time reduced by 60%. Brand consistency score (internal audit) went from 42% to 91%.",
    tools: ["Figma", "Storybook", "React", "TypeScript", "Style Dictionary"],
    metrics: [{ label: "Components", value: "47" }, { label: "Dev Time Saved", value: "60%" }, { label: "Consistency", value: "91%" }],
    gallery: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 4,
    title: "Forma — AI Writing Tool",
    role: "Developer",
    tags: ["Developer", "Researcher"],
    summary: "Full-stack AI writing assistant that adapts to individual user voice over time.",
    cover: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=600&fit=crop",
    views: "15.7k",
    featured: false,
    size: "small",
    challenge: "Generic AI writing tools strip personality. Users feel like they're being replaced, not assisted.",
    approach: "Built a voice-learning pipeline that ingests the user's past writing and fine-tunes prompts dynamically. Edge-deployed for sub-200ms response.",
    result: "Beta launched with 800 users. 68% weekly retention at 30 days.",
    tools: ["Next.js", "OpenAI API", "Supabase", "Vercel Edge", "Python"],
    metrics: [{ label: "Beta Users", value: "800" }, { label: "W4 Retention", value: "68%" }, { label: "Response Time", value: "<200ms" }],
    gallery: [],
  },
  {
    id: 5,
    title: "Empty Storefronts",
    role: "Researcher",
    tags: ["Researcher", "Photographer"],
    summary: "Research + photo essay on post-pandemic retail death in mid-sized American cities.",
    cover: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop",
    views: "6.2k",
    featured: false,
    size: "medium",
    challenge: "Data on retail closures exists. Visual documentation of what that looks like at street level does not.",
    approach: "Combined census data analysis with 18 months of street photography in 5 cities. Co-authored research paper with urban planning professor.",
    result: "Paper cited 14 times. Photo essay in The Atlantic.",
    tools: ["R", "QGIS", "Illustrator", "Fujifilm X-T4"],
    metrics: [{ label: "Cities", value: "5" }, { label: "Citations", value: "14" }, { label: "Months", value: "18" }],
    gallery: [
      "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=500&fit=crop",
    ],
  },
  {
    id: 6,
    title: "Pulse Health Dashboard",
    role: "Designer",
    tags: ["Designer"],
    summary: "Redesigned a clinical monitoring dashboard used in 12 ICUs across California.",
    cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    views: "9.3k",
    featured: false,
    size: "small",
    challenge: "ICU nurses were missing critical alerts because the interface had too many low-priority pings.",
    approach: "Shadowed 8 nurses across 3 shifts. Redesigned the alert hierarchy using urgency-based color coding and haptic patterns.",
    result: "Alert fatigue incidents reduced 44%. FDA cleared the updated UI.",
    tools: ["Figma", "Principle", "User Interviews", "ProtoPie"],
    metrics: [{ label: "Alert Fatigue", value: "-44%" }, { label: "ICUs", value: "12" }, { label: "FDA Cleared", value: "✓" }],
    gallery: [],
  },
];

// ─── ICONS ──────────────────────────────────────────────────────────────────

const Icon = ({ name, size = 18 }) => {
  const icons = {
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    eye: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    send: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
    dribbble: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>,
  };
  return icons[name] || null;
};

// ─── ROLE BADGE ─────────────────────────────────────────────────────────────

const roleColors = {
  Designer: { bg: "#fff0e6", text: "#c45d00", border: "#f5c499" },
  Developer: { bg: "#e8f4fd", text: "#0057a8", border: "#93c5e8" },
  Photographer: { bg: "#f0e8ff", text: "#6b00c4", border: "#c9a8f5" },
  Researcher: { bg: "#e6fff5", text: "#006b3c", border: "#7fd4aa" },
  "Content Creator": { bg: "#fff8e6", text: "#8a6000", border: "#f5d888" },
};

const RoleBadge = ({ role, small }) => {
  const c = roleColors[role] || { bg: "#f0f0f0", text: "#555", border: "#ccc" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 6, padding: small ? "2px 8px" : "4px 12px",
      fontSize: small ? 11 : 12, fontWeight: 600, letterSpacing: "0.03em",
      fontFamily: "'DM Mono', monospace",
    }}>{role}</span>
  );
};

// ─── PROJECT CARD ────────────────────────────────────────────────────────────

const ProjectCard = ({ project, onClick, index }) => {
  const [hovered, setHovered] = useState(false);
  const isLarge = project.size === "large";

  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: isLarge ? "span 2" : "span 1",
        cursor: "pointer",
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #e8e8e8",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.12)" : "0 2px 16px rgba(0,0,0,0.05)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        animationDelay: `${index * 0.08}s`,
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", height: isLarge ? 340 : 220 }}>
        <img
          src={project.cover}
          alt={project.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
          transition: "all 0.3s ease",
        }} />
        {project.featured && (
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "#f5a623", color: "#fff",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
            padding: "4px 10px", borderRadius: 20, fontFamily: "'DM Mono', monospace",
          }}>FEATURED</div>
        )}
        <div style={{
          position: "absolute", bottom: 14, right: 14,
          display: "flex", alignItems: "center", gap: 5,
          color: "rgba(255,255,255,0.85)", fontSize: 12, fontFamily: "'DM Mono', monospace",
        }}>
          <Icon name="eye" size={14} />{project.views}
        </div>
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {project.tags.map(t => <RoleBadge key={t} role={t} small />)}
        </div>
        <h3 style={{
          margin: "0 0 6px", fontSize: 17, fontWeight: 700,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: "#111", lineHeight: 1.3,
        }}>{project.title}</h3>
        <p style={{
          margin: 0, fontSize: 13.5, color: "#666", lineHeight: 1.55,
          fontFamily: "'DM Sans', sans-serif",
        }}>{project.summary}</p>
        <div style={{
          marginTop: 16, display: "flex", alignItems: "center",
          gap: 6, color: "#c45d00", fontSize: 13, fontWeight: 600,
          fontFamily: "'DM Mono', monospace",
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.2s",
        }}>
          View Case Study <Icon name="arrow" size={14} />
        </div>
      </div>
    </div>
  );
};

// ─── CASE STUDY MODAL ────────────────────────────────────────────────────────

const CaseStudy = ({ project, onClose }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
      display: "flex", justifyContent: "flex-end",
      animation: "fadeIn 0.2s ease",
    }} onClick={onClose}>
      <div
        ref={ref}
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(680px, 100vw)", height: "100vh",
          background: "#fafaf8", overflowY: "auto",
          animation: "slideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: "-20px 0 80px rgba(0,0,0,0.15)",
        }}
      >
        {/* Hero */}
        <div style={{ position: "relative", height: 320 }}>
          <img src={project.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)" }} />
          <button onClick={onClose} style={{
            position: "absolute", top: 20, left: 20,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10,
            color: "#fff", padding: "8px 14px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 6,
            fontFamily: "'DM Mono', monospace", fontSize: 12,
          }}>
            <Icon name="back" size={14} /> Back
          </button>
          <div style={{ position: "absolute", bottom: 24, left: 28, right: 28 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {project.tags.map(t => (
                <span key={t} style={{
                  background: "rgba(255,255,255,0.2)", backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.35)", borderRadius: 6,
                  color: "#fff", fontSize: 11, fontWeight: 600,
                  padding: "3px 10px", fontFamily: "'DM Mono', monospace",
                }}>{t}</span>
              ))}
            </div>
            <h1 style={{
              margin: 0, color: "#fff", fontSize: 28, fontWeight: 800,
              fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.2,
            }}>{project.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "36px 36px 60px" }}>
          {/* Summary */}
          <p style={{
            fontSize: 16, color: "#333", lineHeight: 1.7,
            fontFamily: "'DM Sans', sans-serif",
            margin: "0 0 32px",
            paddingBottom: 28, borderBottom: "1px solid #e8e4df",
          }}>{project.summary}</p>

          {/* Metrics */}
          {project.metrics?.length > 0 && (
            <div style={{
              display: "grid", gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`,
              gap: 12, marginBottom: 36,
            }}>
              {project.metrics.map(m => (
                <div key={m.label} style={{
                  background: "#fff", border: "1px solid #e8e4df",
                  borderRadius: 12, padding: "18px 16px", textAlign: "center",
                }}>
                  <div style={{
                    fontSize: 26, fontWeight: 800, color: "#c45d00",
                    fontFamily: "'Playfair Display', serif", lineHeight: 1,
                  }}>{m.value}</div>
                  <div style={{
                    fontSize: 11, color: "#888", marginTop: 4,
                    fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {[
            { label: "The Challenge", content: project.challenge },
            { label: "The Approach", content: project.approach },
            { label: "The Result", content: project.result },
          ].map(section => (
            <div key={section.label} style={{ marginBottom: 30 }}>
              <h2 style={{
                margin: "0 0 10px",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#c45d00",
                fontFamily: "'DM Mono', monospace",
              }}>{section.label}</h2>
              <p style={{
                margin: 0, fontSize: 15, color: "#333", lineHeight: 1.75,
                fontFamily: "'DM Sans', sans-serif",
              }}>{section.content}</p>
            </div>
          ))}

          {/* Tools */}
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              margin: "0 0 12px", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#c45d00", fontFamily: "'DM Mono', monospace",
            }}>Tools Used</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tools.map(t => (
                <span key={t} style={{
                  background: "#f0ede9", color: "#555", borderRadius: 8,
                  padding: "6px 14px", fontSize: 13,
                  fontFamily: "'DM Mono', monospace",
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          {project.gallery?.length > 0 && (
            <div>
              <h2 style={{
                margin: "0 0 12px", fontSize: 12, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#c45d00", fontFamily: "'DM Mono', monospace",
              }}>Gallery</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {project.gallery.map((img, i) => (
                  <img key={i} src={img} alt="" style={{
                    width: "100%", borderRadius: 12, display: "block",
                    border: "1px solid #e8e4df",
                  }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── PROFILE SECTION ─────────────────────────────────────────────────────────

const ProfileHeader = () => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "48px 24px 36px", textAlign: "center",
  }}>
    <div style={{ position: "relative", marginBottom: 18 }}>
      <img src={PROFILE.avatar} alt={PROFILE.name} style={{
        width: 96, height: 96, borderRadius: "50%",
        border: "3px solid #f5a623",
        boxShadow: "0 0 0 6px rgba(245,166,35,0.15)",
      }} />
      {PROFILE.available && (
        <div style={{
          position: "absolute", bottom: 4, right: 4,
          width: 18, height: 18, borderRadius: "50%",
          background: "#22c55e", border: "3px solid #fafaf8",
        }} title="Available for work" />
      )}
    </div>
    <h1 style={{
      margin: "0 0 4px", fontSize: 24, fontWeight: 800, color: "#111",
      fontFamily: "'Playfair Display', Georgia, serif",
    }}>{PROFILE.name}</h1>
    <p style={{
      margin: "0 0 12px", fontSize: 13, color: "#c45d00", fontWeight: 600,
      fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em",
    }}>{PROFILE.title}</p>
    <p style={{
      margin: "0 0 20px", fontSize: 14, color: "#555", lineHeight: 1.6,
      maxWidth: 360, fontFamily: "'DM Sans', sans-serif",
    }}>{PROFILE.bio}</p>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, color: "#888", fontSize: 13 }}>
      <Icon name="map" size={14} />
      <span style={{ fontFamily: "'DM Mono', monospace" }}>{PROFILE.location}</span>
      {PROFILE.available && (
        <>
          <span style={{ color: "#ddd" }}>·</span>
          <span style={{ color: "#22c55e", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>● Available</span>
        </>
      )}
    </div>
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      {Object.entries(PROFILE.links).map(([key]) => (
        <a key={key} href="#" style={{
          width: 38, height: 38, borderRadius: 10,
          border: "1px solid #e8e4df", display: "flex",
          alignItems: "center", justifyContent: "center",
          color: "#555", textDecoration: "none",
          transition: "all 0.2s",
          background: "#fff",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#f0ede9"; e.currentTarget.style.color = "#c45d00"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; }}
        >
          <Icon name={key} size={16} />
        </a>
      ))}
    </div>
    <button style={{
      background: "#c45d00", color: "#fff", border: "none",
      borderRadius: 10, padding: "10px 28px", cursor: "pointer",
      fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono', monospace",
      letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 8,
      transition: "all 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#a34d00"}
      onMouseLeave={e => e.currentTarget.style.background = "#c45d00"}
    >
      <Icon name="send" size={14} /> Get in Touch
    </button>
  </div>
);

// ─── NAV ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = ["Feed", "Roles", "About"];

const Nav = ({ activeTab, setActiveTab }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(250,250,248,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid #e8e4df",
    }}>
      <div style={{
        maxWidth: 900, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 24px",
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif", fontWeight: 800,
          fontSize: 18, color: "#111", letterSpacing: "-0.01em",
        }}>ar<span style={{ color: "#c45d00" }}>.</span></span>
        <div style={{ display: "flex", gap: 4 }}>
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => setActiveTab(item)} style={{
              background: activeTab === item ? "#f0ede9" : "transparent",
              color: activeTab === item ? "#c45d00" : "#555",
              border: "none", borderRadius: 8,
              padding: "7px 16px", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
              fontFamily: "'DM Mono', monospace",
              transition: "all 0.2s",
            }}>{item}</button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ─── ROLES GALLERY ────────────────────────────────────────────────────────────

const RolesGallery = ({ onProjectClick }) => {
  const [activeRole, setActiveRole] = useState("Designer");
  const roles = ["Designer", "Developer", "Photographer", "Researcher"];
  const filtered = PROJECTS.filter(p => p.tags.includes(activeRole));

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <h2 style={{
        margin: "0 0 8px", fontSize: 28, fontWeight: 800,
        fontFamily: "'Playfair Display', serif", color: "#111",
      }}>Roles Gallery</h2>
      <p style={{ margin: "0 0 28px", color: "#777", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
        Browse work organized by discipline.
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {roles.map(r => (
          <button key={r} onClick={() => setActiveRole(r)} style={{
            border: activeRole === r ? "none" : "1px solid #e0dbd5",
            background: activeRole === r ? roleColors[r]?.bg || "#f0ede9" : "#fff",
            color: activeRole === r ? roleColors[r]?.text || "#c45d00" : "#555",
            borderRadius: 10, padding: "8px 18px", cursor: "pointer",
            fontSize: 13, fontWeight: 600, fontFamily: "'DM Mono', monospace",
            transition: "all 0.2s",
          }}>{r} <span style={{ opacity: 0.6 }}>({PROJECTS.filter(p => p.tags.includes(r)).length})</span></button>
        ))}
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 20,
      }}>
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} project={{ ...p, size: "small" }} onClick={onProjectClick} index={i} />
        ))}
      </div>
    </div>
  );
};

// ─── ABOUT ───────────────────────────────────────────────────────────────────

const About = () => (
  <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
    <h2 style={{
      margin: "0 0 24px", fontSize: 32, fontWeight: 800,
      fontFamily: "'Playfair Display', serif", color: "#111",
    }}>About Me</h2>
    {[
      { label: "Background", text: "I'm a designer and developer based in San Francisco. I've spent the last 5 years building products at the intersection of design systems, full-stack engineering, and visual storytelling." },
      { label: "Philosophy", text: "I believe the best interfaces feel inevitable — not designed, but discovered. I obsess over the gap between how something looks and how it feels to use." },
      { label: "Currently", text: "Open to senior IC roles in product design or design engineering. Also taking on select freelance projects for early-stage startups." },
    ].map(s => (
      <div key={s.label} style={{ marginBottom: 32 }}>
        <h3 style={{
          margin: "0 0 10px", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#c45d00", fontFamily: "'DM Mono', monospace",
        }}>{s.label}</h3>
        <p style={{ margin: 0, fontSize: 15.5, color: "#333", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>{s.text}</p>
      </div>
    ))}
    <div style={{
      background: "#fff", border: "1px solid #e8e4df", borderRadius: 16,
      padding: "28px", marginTop: 12,
    }}>
      <h3 style={{
        margin: "0 0 16px", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.12em", textTransform: "uppercase",
        color: "#c45d00", fontFamily: "'DM Mono', monospace",
      }}>Skills</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {["Figma", "React", "Next.js", "TypeScript", "Python", "Tailwind", "Framer Motion", "User Research", "Design Systems", "Storybook", "SQL", "Photography"].map(s => (
          <span key={s} style={{
            background: "#f0ede9", color: "#555", borderRadius: 8,
            padding: "6px 14px", fontSize: 13,
            fontFamily: "'DM Mono', monospace",
          }}>{s}</span>
        ))}
      </div>
    </div>
  </div>
);

// ─── FEED ─────────────────────────────────────────────────────────────────────

const Feed = ({ onProjectClick }) => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 24px 60px" }}>
      {/* Filter bar */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap",
        marginBottom: 28, paddingBottom: 20,
        borderBottom: "1px solid #e8e4df",
      }}>
        {ROLES.map(r => (
          <button key={r} onClick={() => setFilter(r)} style={{
            border: filter === r ? "none" : "1px solid #e0dbd5",
            background: filter === r
              ? (roleColors[r]?.bg || "#f0ede9")
              : "#fff",
            color: filter === r ? (roleColors[r]?.text || "#c45d00") : "#666",
            borderRadius: 20, padding: "6px 16px",
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            fontFamily: "'DM Mono', monospace",
            transition: "all 0.2s",
          }}>{r}</button>
        ))}
      </div>

      {/* Masonry grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 20,
      }}>
        {filtered.map((p, i) => (
          <ProjectCard key={p.id} project={p} onClick={onProjectClick} index={i} />
        ))}
      </div>
    </div>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [activeTab, setActiveTab] = useState("Feed");
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className={tiktokSans.className}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fafaf8; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d5cfc8; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#fafaf8" }}>
        <Nav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Profile always visible above feed */}
        {activeTab === "Feed" && <ProfileHeader />}

        {activeTab === "Feed" && <Feed onProjectClick={setSelectedProject} />}
        {activeTab === "Roles" && <RolesGallery onProjectClick={setSelectedProject} />}
        {activeTab === "About" && <About />}

        {selectedProject && (
          <CaseStudy project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </div>
    </div>
  );
}