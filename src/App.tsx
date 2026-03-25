import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters, dspMathTopics, type Chapter } from './chaptersData';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Topic Modal Component
function TopicModal({ chapter, isOpen, onClose }: { chapter: Chapter | null; isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, { y: 30, opacity: 0, duration: 0.2 });
      gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
    } else {
      onClose();
    }
  };

  if (!isOpen || !chapter) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(7, 7, 10, 0.92)', backdropFilter: 'blur(12px)' }}
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-lg"
        style={{ background: 'rgba(14, 14, 20, 0.98)', border: '1px solid rgba(244, 246, 250, 0.14)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-5 border-b border-[rgba(244,246,250,0.14)]" style={{ background: 'rgba(14, 14, 20, 0.98)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neon mb-2">
                {chapter.label}
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F4F6FA]">
                {chapter.title}
              </h2>
              <p className="text-[#A7ACB8] mt-1 text-sm">{chapter.subtitle}</p>
            </div>
            <button 
              onClick={handleClose}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md border border-[rgba(244,246,250,0.2)] text-[#A7ACB8] hover:text-[#F4F6FA] hover:border-neon transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Topics List */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-6">
          <div className="grid gap-3">
            {chapter.topics.map((topic, index) => (
              <div 
                key={index}
                className="p-4 rounded-md transition-colors hover:bg-[rgba(244,246,250,0.04)]"
                style={{ border: '1px solid rgba(244, 246, 250, 0.08)' }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-neon/10 text-neon font-mono text-xs">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-[#F4F6FA] mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-[#A7ACB8] leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// DSP Math Modal Component
function DSPMathModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current && contentRef.current) {
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 });
    }
  }, [isOpen]);

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      gsap.to(contentRef.current, { y: 30, opacity: 0, duration: 0.2 });
      gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: onClose });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(7, 7, 10, 0.92)', backdropFilter: 'blur(12px)' }}
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-lg"
        style={{ background: 'rgba(14, 14, 20, 0.98)', border: '1px solid rgba(244, 246, 250, 0.14)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-5 border-b border-[rgba(244,246,250,0.14)]" style={{ background: 'rgba(14, 14, 20, 0.98)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neon mb-2">
                BONUS PHASE
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#F4F6FA]">
                DSP & Mathematics
              </h2>
              <p className="text-[#A7ACB8] mt-1 text-sm">The mathematical foundations of digital audio</p>
            </div>
            <button 
              onClick={handleClose}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md border border-[rgba(244,246,250,0.2)] text-[#A7ACB8] hover:text-[#F4F6FA] hover:border-neon transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Topics List */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-6">
          <div className="grid gap-3">
            {dspMathTopics.map((topic, index) => (
              <div 
                key={index}
                className="p-4 rounded-md transition-colors hover:bg-[rgba(244,246,250,0.04)]"
                style={{ border: '1px solid rgba(244, 246, 250, 0.08)' }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded bg-neon/10 text-neon font-mono text-xs">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-[#F4F6FA] mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-[#A7ACB8] leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDSPModalOpen, setIsDSPModalOpen] = useState(false);

  const openModal = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedChapter(null), 300);
  };

  // Hero load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo('.hero-bg', 
        { opacity: 0 },
        { opacity: 1, duration: 0.6 }
      );
      
      tl.fromTo('.hero-nav',
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.15
      );
      
      tl.fromTo('.hero-headline-word',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05 },
        0.35
      );
      
      tl.fromTo('.hero-subcontent',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.55
      );
      
      tl.fromTo('.hero-bottom',
        { opacity: 0 },
        { opacity: 1, duration: 0.35 },
        0.75
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Scroll animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero scroll exit animation
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-headline-group', {
              x: -18 * exitProgress + 'vw',
              opacity: 1 - exitProgress * 0.75,
            });
            gsap.set('.hero-bottom-left', {
              y: 6 * exitProgress + 'vh',
              opacity: 1 - exitProgress * 0.8,
            });
            gsap.set('.hero-bg', {
              scale: 1 + 0.04 * exitProgress,
            });
          } else {
            gsap.set('.hero-headline-group', { x: 0, opacity: 1 });
            gsap.set('.hero-bottom-left', { y: 0, opacity: 1 });
            gsap.set('.hero-bg', { scale: 1 });
          }
        },
        onLeaveBack: () => {
          gsap.set('.hero-headline-group', { x: 0, opacity: 1 });
          gsap.set('.hero-bottom-left', { y: 0, opacity: 1 });
          gsap.set('.hero-bg', { scale: 1 });
        },
      });

      // Chapter sections
      chapterRefs.current.forEach((chapter, index) => {
        if (!chapter) return;

        const numberEl = chapter.querySelector('.chapter-number');
        const panelEl = chapter.querySelector('.info-panel');
        const titleEl = chapter.querySelector('.chapter-title');
        const bgEl = chapter.querySelector('.chapter-bg');

        const isRightNumber = chapters[index].numberPosition === 'right';

        ScrollTrigger.create({
          trigger: chapter,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;

            if (progress <= 0.3) {
              const enterProgress = progress / 0.3;
              
              gsap.set(panelEl, {
                x: -55 * (1 - enterProgress) + 'vw',
                opacity: enterProgress,
              });

              const numberStartX = isRightNumber ? 30 : -40;
              gsap.set(numberEl, {
                x: numberStartX * (1 - enterProgress) + 'vw',
                opacity: enterProgress * 0.1,
              });

              gsap.set(titleEl, {
                y: 10 * (1 - enterProgress) + 'vh',
                opacity: enterProgress,
              });

              gsap.set(bgEl, {
                scale: 1.08 - 0.08 * enterProgress,
              });
            }
            else if (progress <= 0.7) {
              gsap.set(panelEl, { x: 0, opacity: 1 });
              gsap.set(numberEl, { x: 0, opacity: 0.1 });
              gsap.set(titleEl, { y: 0, opacity: 1 });
              gsap.set(bgEl, { scale: 1 });
            }
            else {
              const exitProgress = (progress - 0.7) / 0.3;
              
              gsap.set(panelEl, {
                x: -28 * exitProgress + 'vw',
                opacity: 1 - exitProgress * 0.75,
              });

              const numberExitX = isRightNumber ? 12 : -18;
              gsap.set(numberEl, {
                x: numberExitX * exitProgress + 'vw',
                opacity: 0.1 - exitProgress * 0.1,
              });

              gsap.set(bgEl, {
                scale: 1 + 0.05 * exitProgress,
              });
            }
          },
        });
      });

      if (ctaRef.current) {
        gsap.fromTo('.cta-headline',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo('.cta-form',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.15,
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (maxScroll && pinned.length > 0) {
        const pinnedRanges = pinned.map(st => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              const inPinned = pinnedRanges.some(
                r => value >= r.start - 0.02 && value <= r.end + 0.02
              );
              if (!inPinned) return value;

              const target = pinnedRanges.reduce(
                (closest, r) =>
                  Math.abs(r.center - value) < Math.abs(closest - value)
                    ? r.center
                    : closest,
                pinnedRanges[0]?.center ?? 0
              );
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out',
          },
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = 'The Full‑Stack Music Production Masterclass'.split(' ');

  return (
    <div ref={mainRef} className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <nav className="hero-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[4vw] py-[4vh]">
        <div className="font-display text-xl font-bold tracking-tight text-[#F4F6FA]">
          Prodbox
        </div>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.12em] text-[#A7ACB8]">
          <a href="#syllabus" className="nav-link hover:text-[#F4F6FA] transition-colors">Syllabus</a>
          <a href="#instructors" className="nav-link hover:text-[#F4F6FA] transition-colors">Instructors</a>
          <a href="#community" className="nav-link hover:text-[#F4F6FA] transition-colors">Community</a>
          <a href="#enroll" className="nav-link hover:text-[#F4F6FA] transition-colors">Enroll</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="section-pinned z-10">
        <img 
          src="/hero_bg.jpg" 
          alt="Studio" 
          className="hero-bg bg-image"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        
        <div className="relative z-10 h-full flex flex-col justify-center px-[6vw]">
          <div className="hero-headline-group max-w-[42vw] mt-[4vh]">
            <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] text-[#F4F6FA] mb-6">
              {headlineWords.map((word, i) => (
                <span key={i} className="hero-headline-word inline-block mr-[0.3em]">
                  {word}
                </span>
              ))}
            </h1>
            <div className="hero-subcontent">
              <p className="text-lg text-[#A7ACB8] mb-8 max-w-md">
                A comprehensive guide to sound, technology, and the creative process.
              </p>
              <div className="flex gap-4">
                <button className="btn-primary">Explore the Syllabus</button>
                <button className="btn-secondary">Join the Community</button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom absolute bottom-[5vh] left-[6vw] right-[4vw] flex justify-between items-end z-10">
          <div className="hero-bottom-left max-w-[34vw]">
            <p className="text-sm text-[#A7ACB8] leading-relaxed">
              From acoustics and theory to mixing, mastering, and the music business—build a complete practice with real-world projects and feedback.
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.12em] text-[#A7ACB8]">
            Scroll
          </div>
        </div>
      </section>

      {/* Chapter Sections */}
      {chapters.map((chapter, index) => (
        <section
          key={chapter.number}
          ref={(el) => { chapterRefs.current[index] = el; }}
          className="section-pinned"
          style={{ zIndex: 20 + index }}
        >
          <img
            src={chapter.image}
            alt={chapter.title}
            className="chapter-bg bg-image"
          />
          <div className="absolute inset-0 bg-gradient-overlay" />

          {/* Chapter Number */}
          <div
            className={`chapter-number absolute text-[clamp(120px,18vw,280px)] font-bold ${
              chapter.numberPosition === 'right'
                ? 'right-[-2vw] bottom-[-10vh]'
                : 'left-[-4vw] bottom-[-10vh]'
            }`}
          >
            {chapter.number}
          </div>

          {/* Info Panel */}
          <div className="absolute left-[6vw] top-[18vh] w-[34vw] max-w-md">
            <div className="info-panel p-6 rounded-sm">
              <div className="font-mono text-xs uppercase tracking-[0.12em] text-neon mb-3">
                {chapter.label}
              </div>
              <h2 className="chapter-title font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[#F4F6FA] leading-tight mb-1">
                {chapter.title}
              </h2>
              <div className="font-mono text-sm uppercase tracking-[0.08em] text-[#A7ACB8] mb-4">
                {chapter.subtitle}
              </div>
              <p className="text-sm text-[#A7ACB8] leading-relaxed mb-6">
                {chapter.description}
              </p>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => openModal(chapter)}
                  className="btn-primary text-sm"
                >
                  View {chapter.topics.length} topics
                </button>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Closing CTA Section */}
      <section ref={ctaRef} className="relative z-[100] bg-[#0E0E14] py-24 px-[6vw]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="cta-headline font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[#F4F6FA] leading-tight mb-6">
                Ready to build your sound?
              </h2>
              <p className="text-[#A7ACB8] leading-relaxed mb-8">
                Enroll to get the full syllabus, project briefs, and community access. 
                Join thousands of producers who have transformed their craft through 
                the Prodbox masterclass.
              </p>
              <div className="flex items-center gap-2 text-sm text-[#A7ACB8]">
                <span>Questions?</span>
                <a href="mailto:hello@prodbox.audio" className="text-neon hover:underline">
                  hello@prodbox.audio
                </a>
              </div>
            </div>

            <div className="cta-form info-panel p-8 rounded-sm">
              <h3 className="font-display text-xl font-semibold text-[#F4F6FA] mb-4">
                Get updates
              </h3>
              <p className="text-sm text-[#A7ACB8] mb-6">
                Subscribe to receive course announcements, free tutorials, and early access.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 bg-[rgba(244,246,250,0.05)] border border-[rgba(244,246,250,0.14)] rounded-md text-[#F4F6FA] placeholder:text-[#A7ACB8] focus:outline-none focus:border-neon transition-colors"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Get updates
                </button>
              </form>
            </div>
          </div>

          {/* DSP Math Bonus Section */}
          <div className="mt-16 pt-16 border-t border-[rgba(244,246,250,0.14)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.12em] text-neon mb-2">
                  Bonus Phase
                </div>
                <h3 className="font-display text-2xl font-bold text-[#F4F6FA] mb-2">
                  DSP & Mathematics
                </h3>
                <p className="text-[#A7ACB8] max-w-xl">
                  Dive deep into the mathematical foundations of digital audio. Understanding DSP is crucial for advanced plugin use and custom tool development.
                </p>
              </div>
              <button 
                onClick={() => setIsDSPModalOpen(true)}
                className="btn-secondary whitespace-nowrap"
              >
                View {dspMathTopics.length} topics
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-24 pt-8 border-t border-[rgba(244,246,250,0.14)]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="font-display text-lg font-bold text-[#F4F6FA]">
                Prodbox
              </div>
              <div className="flex gap-8 font-mono text-xs uppercase tracking-[0.12em] text-[#A7ACB8]">
                <a href="#" className="hover:text-[#F4F6FA] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#F4F6FA] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#F4F6FA] transition-colors">Contact</a>
              </div>
              <div className="text-xs text-[#A7ACB8]">
                © 2026 Prodbox. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </section>

      {/* Modals */}
      <TopicModal 
        chapter={selectedChapter} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
      <DSPMathModal 
        isOpen={isDSPModalOpen} 
        onClose={() => setIsDSPModalOpen(false)} 
      />
    </div>
  );
}

export default App;
