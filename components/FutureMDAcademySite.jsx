import React, { useState, useEffect, useRef, useCallback } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useSpring, useInView, useReducedMotion, animate } from "framer-motion";
import {
  ArrowRight,
  Star,
  Brain,
  LineChart,
  Clock,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Users2,
  Mail,
  Phone,
  Globe,
  Sparkles,
  HeartHandshake,
  Award,
  Rocket,
  Menu,
  X,
  Quote,
} from "lucide-react";
import { DollarSign, Plus, Minus, AlertTriangle } from "lucide-react";

// ========= Config =========
const FORM_ENDPOINT = "https://formspree.io/f/your-id"; // replace with your form endpoint

// ========= UI primitives =========
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`scroll-mt-24 py-20 ${className}`}>
    <motion.div
      data-section-highlight
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {children}
    </motion.div>
  </section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-[var(--gold)] via-amber-300 to-pink-300"
      style={{ scaleX }}
    />
  );
};

const FloatingOrbs = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <motion.div
      className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full opacity-40 blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(224,184,77,0.9) 0%, rgba(224,184,77,0) 70%)" }}
      animate={{ x: [0, 30, -20, 0], y: [0, -10, 20, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-[-25%] right-[-15%] h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(11,42,60,0) 70%)" }}
      animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
      transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 4 }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(129,207,255,0.8) 0%, rgba(129,207,255,0) 70%)" }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const Pill = ({ children }) => (
  <motion.span
    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur"
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    {children}
  </motion.span>
);

const Stat = ({ target, label, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, prefersReducedMotion, target]);

  const valueToRender = prefersReducedMotion ? target : Math.round(display);

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl bg-white/80 p-6 text-center shadow-sm ring-1 ring-black/5"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-3xl font-extrabold text-slate-900">
        {prefix}
        <span className="text-[var(--gold)]">{valueToRender.toLocaleString()}</span>
        {suffix}
      </div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, children }) => (
  <motion.div
    className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 30px 60px -24px rgba(11,42,60,0.25)" }}
  >
    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--gold)]/15 text-[var(--navy)]">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    <p className="mt-2 text-slate-600">{children}</p>
  </motion.div>
);

const HowStep = ({ step, title, children }) => (
  <motion.div
    className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    whileHover={{ y: -6, scale: 1.01, boxShadow: "0 25px 50px -30px rgba(11,42,60,0.25)" }}
  >
    <div className="absolute -top-4 left-6 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold text-[var(--navy)]">STEP {step}</div>
    <h4 className="mt-2 text-base font-semibold text-slate-900">{title}</h4>
    <p className="mt-2 text-slate-600">{children}</p>
  </motion.div>
);

const TestimonialCard = ({ quote, name, role, compact = false }) => (
  <motion.div
    className={`rounded-2xl bg-white ${compact ? 'p-4' : 'p-6'} shadow-sm ring-1 ring-black/5`}
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    whileHover={{ y: -6, scale: 1.01 }}
  >
    <p className="text-slate-700">“{quote}”</p>
    <div className="mt-4 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--navy)]/10 font-bold text-[var(--navy)]">
        {name?.charAt(0) || ""}
      </div>
      <div>
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-sm text-slate-600">{role}</div>
      </div>
    </div>
  </motion.div>
);

const FAQItem = ({ q, a }) => (
  <details className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
    <summary className="cursor-pointer list-none">
      <div className="flex items-start justify-between gap-6">
        <h4 className="text-base font-semibold text-slate-900">{q}</h4>
        <span className="mt-1 rounded-full border px-2 py-0.5 text-xs text-slate-500 group-open:hidden">+</span>
        <span className="mt-1 hidden rounded-full border px-2 py-0.5 text-xs text-slate-500 group-open:inline">–</span>
      </div>
    </summary>
    <p className="mt-3 text-slate-600">{a}</p>
  </details>
);

const testimonials = [
  {
    quote:
      "I had taken the MCAT once before and plateaued at a 508. Working with my tutor completely changed how I approached passages and managed time. The strategies felt natural and I could finally apply them consistently. When I scored a 520 on my retake, it was proof that the system worked.",
    name: "Jason M.",
    role: "520 Official",
  },
  {
    quote:
      "Trying to prep while juggling classes and work left me burned out. Future MD Academy gave me a schedule I could actually stick to and someone who kept me accountable. I learned to focus on the weak spots without getting lost in endless content review. The result was a 12-point increase and much more confidence heading into applications.",
    name: "Amrita K.",
    role: "+12 Point Increase",
  },
  {
    quote:
      "I had been studying on my own for months without much progress. My tutor identified patterns in my mistakes that I never noticed myself. Once we targeted those, I felt more in control of my practice exams and less frustrated. The consistent improvement gave me the confidence to aim for schools I never thought possible.",
    name: "Lauren S.",
    role: "NYU Applicant",
  },
  {
    quote:
      "Chem/Phys was the section I dreaded every single time. My tutor showed me how to simplify setups and recognize when estimation was enough. That single shift in approach boosted both my speed and accuracy. For the first time I felt calm going through the section, and scoring a 131 proved it paid off.",
    name: "Marcus D.",
    role: "131 C/P",
  },
  {
    quote:
      "I was convinced I had peaked at 508 after months of prep. The coaching I got here wasn’t just about content but about mindset and pacing. I started practicing smarter instead of just harder, which made the long hours sustainable. On my official test I jumped to a 519, something I never imagined.",
    name: "Sofia H.",
    role: "519 Official",
  },
  {
    quote:
      "The accountability in this program was a game changer. I knew I’d get a message checking in, so I pushed myself to complete the daily goals even when I was tired. My tutor’s encouragement kept me from giving up when I hit plateaus. At the end I had an 11-point score increase and a level of confidence I’d never had before.",
    name: "Neha L.",
    role: "+11 Point Jump",
  },
  {
    quote:
      "Reading Bio/Biochem passages used to leave me overwhelmed and second-guessing every answer. My tutor introduced a passage-mapping method that gave me structure and focus. Instead of panicking, I knew exactly how to break things down. That clarity helped me earn consistent 131s in practice and on the real exam.",
    name: "Caleb W.",
    role: "131 B/B",
  },
  {
    quote:
      "I worried tutoring would feel like another class, but it was completely tailored to me. The plan included realistic daily tasks and built-in check-ins that kept me accountable. I started hitting milestones earlier than expected and felt prepared rather than scrambling. Reaching my 515 goal ahead of schedule was the best feeling.",
    name: "Janelle T.",
    role: "515 Official",
  },
];

const trustSignals = [
  { icon: ShieldCheck, label: "Guaranteed Score Growth" },
  { icon: Award, label: "Top 5% Tutors" },
  { icon: Rocket, label: "Fast Score Momentum" },
  { icon: HeartHandshake, label: "Compatibility Match" },
];

const TestimonialCarousel = () => {
  const perSlide = 3;
  const totalSlides = Math.ceil(testimonials.length / perSlide);
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || totalSlides <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(id);
  }, [prefersReducedMotion, totalSlides]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(query.matches);
    update();
    if (query.addEventListener) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, []);

  const slideTo = (n) => setIndex((n + totalSlides) % totalSlides);

  const handleDragEnd = useCallback(
    (_, info) => {
      if (!isTouch) return;
      if (Math.abs(info.offset.x) < 50) return;
      setIndex((prev) => (prev + (info.offset.x < 0 ? 1 : -1) + totalSlides) % totalSlides);
    },
    [isTouch, totalSlides]
  );

  return (
    <div className="mt-10">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${(index * 100) / totalSlides}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          drag={isTouch ? "x" : false}
          dragConstraints={isTouch ? { left: 0, right: 0 } : undefined}
          dragElastic={0.18}
          dragTransition={{ bounceDamping: 20, bounceStiffness: 180 }}
          onDragEnd={handleDragEnd}
          style={{ width: `${100 * totalSlides}%`, touchAction: isTouch ? "pan-y" : "auto" }}
        >
          {Array.from({ length: totalSlides }).map((_, slide) => (
            <div
              key={slide}
              className="grid shrink-0 grid-cols-1 gap-6 px-2 md:grid-cols-3"
              style={{ width: `${100 / totalSlides}%` }}
            >
              {testimonials
                .slice(slide * perSlide, slide * perSlide + perSlide)
                .map((t, i) => (
                  <TestimonialCard key={`${slide}-${i}`} quote={t.quote} name={t.name} role={t.role} compact />
                ))}
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--light)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--light)] to-transparent" />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={() => slideTo(index - 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Previous testimonials"
          >
            ‹
          </motion.button>
          <motion.button
            type="button"
            onClick={() => slideTo(index + 1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Next testimonials"
          >
            ›
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => slideTo(i)}
              className={`h-2.5 w-6 rounded-full transition ${i === index ? "bg-[var(--navy)]" : "bg-slate-300"}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ========= Pricing helpers =========
function formatUSD(n) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD" });
}
function getSmoothRate(hours) {
  if (hours <= 9) return 195;
  if (hours <= 19) return 195 - ((hours - 10) * (195 - 185)) / (19 - 10); // 195 → 185
  if (hours <= 40) return 180 - ((hours - 20) * (180 - 160)) / (40 - 20); // 180 → 160
  if (hours <= 80) return 160 - ((hours - 40) * (160 - 150)) / (80 - 40); // 160 → 150
  if (hours <= 120) return 150 - ((hours - 80) * (150 - 145)) / (120 - 80); // 150 → 145
  return 145;
}
function getDiscount(hours) {
  if (hours < 20) return 0;
  if (hours <= 40) return 600 - 10 * (hours - 20); // 600 → 400
  return 400; // 40h+
}
function LineItem({ label, value, bold = false, accent }) {
  const color = accent === "emerald" ? "text-emerald-600" : value < 0 ? "text-emerald-600" : "";
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-700">{label}</span>
      <span className={`${bold ? "font-semibold" : ""} ${color}`}>
        {value < 0 ? "-" + formatUSD(Math.abs(value)) : formatUSD(value)}
      </span>
    </div>
  );
}
function RadioRow({ label, caption, right, selected, onSelect }) {
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
        selected ? "border-fuchsia-300 bg-fuchsia-50 ring-1 ring-fuchsia-200" : "border-neutral-200 hover:bg-neutral-50"
      }`}
    >
      <div>
        <div className="text-sm font-medium">{label}</div>
        {caption && <div className="text-xs text-neutral-500">{caption}</div>}
      </div>
      <div className="text-sm font-semibold">{right}</div>
    </motion.button>
  );
}

// ========= Page =========
export default function FutureMDAcademySite() {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState(15);
  const [installments, setInstallments] = useState(null);
  const highlightTimeout = useRef(null);
  const reduceMotion = useReducedMotion();

  const rate = getSmoothRate(hours);
  const subtotal = hours * rate;
  const discount = getDiscount(hours);
  const total = Math.max(0, subtotal - discount);

  useEffect(() => {
    try {
      const approxEq = (a, b, tol = 1e-9) => Math.abs(a - b) < tol;
      console.assert(getSmoothRate(0) === 195, "rate(0)=195");
      console.assert(getSmoothRate(9) === 195, "rate(9)=195");
      console.assert(approxEq(getSmoothRate(10), 195), "rate(10)=195");
      console.assert(approxEq(getSmoothRate(19), 185), "rate(19)=~185");
      console.assert(approxEq(getSmoothRate(20), 180), "rate(20)=~180");
      console.assert(approxEq(getSmoothRate(40), 160), "rate(40)=~160");
      console.assert(approxEq(getSmoothRate(80), 150), "rate(80)=~150");
      console.assert(approxEq(getSmoothRate(120), 145), "rate(120)=~145");
      console.assert(getDiscount(0) === 0, "disc(0)=0");
      console.assert(getDiscount(19) === 0, "disc(19)=0");
      console.assert(getDiscount(20) === 600, "disc(20)=600");
      console.assert(getDiscount(40) === 400, "disc(40)=400");
      console.assert(getDiscount(80) === 400, "disc(80)=400");
      console.assert(Math.max(0, 0 - getDiscount(100)) === 0, "total clamped >= 0");
      console.assert(getSmoothRate(21) <= getSmoothRate(20), "rate non-increasing around 20");
    } catch (e) {
      console.warn("Test failure:", e);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (highlightTimeout.current) {
        clearTimeout(highlightTimeout.current);
      }
    };
  }, []);

  const handleAnchorNavigation = useCallback(
    (event) => {
      const href = event.currentTarget.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      event.preventDefault();

      if (typeof window === "undefined") return;

      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

      if (window.history?.pushState) {
        window.history.pushState(null, "", href);
      } else {
        window.location.hash = targetId;
      }

      if (reduceMotion) return;

      const highlightEl = target.querySelector("[data-section-highlight]") || target;
      if (!highlightEl || !highlightEl.animate) return;

      if (highlightTimeout.current) {
        clearTimeout(highlightTimeout.current);
      }

      highlightTimeout.current = window.setTimeout(() => {
        highlightEl.animate(
          [
            { boxShadow: "0 0 0 0 rgba(224,184,77,0)", backgroundColor: "transparent" },
            {
              boxShadow: "0 28px 60px -40px rgba(224,184,77,0.6)",
              backgroundColor: "rgba(224,184,77,0.15)",
            },
            { boxShadow: "0 0 0 0 rgba(224,184,77,0)", backgroundColor: "transparent" },
          ],
          {
            duration: 900,
            easing: "ease-out",
          }
        );
      }, 120);
    },
    [reduceMotion]
  );

  return (
    <div className="min-h-screen scroll-smooth bg-[var(--light)] [--navy:#0b2a3c] [--gold:#e0b84d]">
      <ScrollProgress />
      {/* SEO */}
      <Helmet>
        <title>Future MD Academy — MCAT Tutoring</title>
        <meta name="description" content="Top 5% tutors. Top 1% section specialists. Personalized MCAT tutoring with a +10 point improvement guarantee." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Future MD Academy — MCAT Tutoring" />
        <meta property="og:description" content="Crush the MCAT with personalized coaching designed around you." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Top bar */}
      <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-[var(--navy)]/90 backdrop-blur">
        <Container className="flex items-center justify-between py-4">
          <a href="#home" className="flex items-center gap-3" onClick={handleAnchorNavigation}>
  <img
    src="/logo.png"
    alt="Future MD Academy"
    className="h-16 w-16 object-contain"   // change to h-16 w-16 if you want bigger
  />
  <div className="text-white">
    <div className="text-sm uppercase tracking-wider text-white/70">Future MD Academy</div>
    <div className="-mt-1 text-lg font-extrabold">MCAT Tutoring</div>
  </div>
</a>


          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 text-sm text-white/90 md:flex">
            {[ 
              { href: "#services", label: "Services" },
              { href: "#how", label: "How it Works" },
              { href: "#guarantee", label: "Guarantee" },
              { href: "#pricing", label: "Pricing" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ opacity: 1, y: -2 }}
                className="transition hover:text-white"
                onClick={handleAnchorNavigation}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[var(--navy)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnchorNavigation}
            >
              Free Consultation
            </motion.a>
          </nav>

          {/* Mobile menu */}
          <motion.button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </Container>
        {open && (
          <div className="md:hidden border-t border-white/10 bg-[var(--navy)]/95">
            <Container className="py-3">
              <div className="flex flex-col gap-2 text-white/90">
                {[ 
                  { href: "#services", label: "Services" },
                  { href: "#how", label: "How it Works" },
                  { href: "#guarantee", label: "Guarantee" },
                  { href: "#pricing", label: "Pricing" },
                  { href: "#faq", label: "FAQ" },
                ].map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className="py-2"
                    whileTap={{ scale: 0.97 }}
                    onClick={(event) => {
                      handleAnchorNavigation(event);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#contact"
                  onClick={(event) => {
                    handleAnchorNavigation(event);
                    setOpen(false);
                  }}
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[var(--navy)]"
                  whileTap={{ scale: 0.96 }}
                >
                  Free Consultation
                </motion.a>
              </div>
            </Container>
          </div>
        )}
      </div>

      {/* Hero */}
      <Section id="home" className="relative overflow-hidden bg-[var(--navy)]">
        <FloatingOrbs />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80rem_40rem_at_50%_-10%,rgba(255,255,255,0.18),transparent)]" />
        <Container>
          <div className="grid items-center gap-12 py-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Pill>
                <Sparkles className="h-4 w-4" />
                Top 5% Tutors • Top 1% Section Specialists • +10 Points Guaranteed
              </Pill>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
                Crush the MCAT with personalized coaching designed around <span className="text-[var(--gold)]">you</span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                One-on-one tutoring with specialists for C/P, CARS, B/B, and P/S, custom study plans, and test-taking systems built by 100th percentile scorers.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl bg-[var(--gold)] px-5 py-3 font-semibold text-[var(--navy)] shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 25px 40px -20px rgba(224,184,77,0.45)" }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAnchorNavigation}
                >
                  Get Your FREE Consultation <ArrowRight className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 font-semibold text-white"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.12)", scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAnchorNavigation}
                >
                  Explore Our Programs
                </motion.a>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-3 gap-4">
                <Stat target={518} suffix="+" label="Tutor composite scores" />
                <Stat target={131} suffix="/132" label="Section subscores" />
                <Stat prefix="+" target={10} label="Point Guarantee" />
              </div>
            </motion.div>

            {/* Student Score Trend card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative rounded-3xl bg-white/10 p-2 shadow-2xl ring-1 ring-white/20">
                <div className="rounded-2xl bg-white p-6 text-[var(--navy)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-[var(--navy)]/10 text-[var(--gold)] flex items-center justify-center">
                        <svg viewBox="0 0 40 40" className="h-7 w-7">
                          <polyline points="4,28 14,22 22,24 30,16 36,14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="text-lg font-semibold text-slate-900">Student Score Trend</div>
                    </div>
                    <div className="flex items-center gap-1 text-[var(--gold)]">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
                  </div>
                  <div className="mt-6 grid items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
                    <div className="rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-200">
                      <div className="text-5xl font-extrabold text-[var(--gold)]">516.3</div>
                      <div className="mt-3 text-lg font-medium text-slate-900"><span className="inline-block rounded-sm bg-[var(--gold)]/80 px-1 text-[var(--navy)]">Average</span><span className="ml-2">Student Score</span></div>
                    </div>
                    <div className="hidden h-auto w-px bg-slate-200 md:block" />
                    <div className="rounded-2xl bg-slate-50 p-6 text-center ring-1 ring-slate-200">
                      <div className="text-5xl font-extrabold text-[var(--gold)]">14.1</div>
                      <div className="mt-3 text-lg font-medium text-slate-900"><span className="inline-block rounded-sm bg-[var(--gold)]/80 px-1 text-[var(--navy)]">Average</span><span className="ml-2">Score Increase</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Trust strip */}
      <div className="border-y bg-white">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 py-6 text-slate-500">
            {trustSignals.map(({ icon: Icon, label }, idx) => (
              <motion.div
                key={label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: "easeOut" }}
                whileHover={{ scale: 1.04 }}
              >
                <Icon className="h-5 w-5 text-[var(--navy)]" /> {label}
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Services */}
      <Section id="services">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Not all MCAT prep is created equal. Here's why serious students choose us.</h2>
            <p className="mt-3 text-slate-600">Expert-led MCAT prep with proven results and personalized coaching designed around your unique needs</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Brain} title="Top 1% Section Specialists">Tutors with ≥518 overall and 131/132 in their specialized section. Get expert guidance in C/P, CARS, B/B, and P/S from those who've mastered each domain.</FeatureCard>
            <FeatureCard icon={LineChart} title="Compatibility-Based Matching">We match you with a tutor based on compatibility and comprehensive strength/weakness analysis to ensure the best learning experience.</FeatureCard>
            <FeatureCard icon={Clock} title="Study Schedules by 100th Percentile Scorers">Custom study plans and strategies created by 100th percentile scorers, designed around your timeline and goals.</FeatureCard>
            <FeatureCard icon={Clock} title="Flexible Scheduling">Evenings, weekends, and accelerated plans available. Regular check-ins in between sessions to maintain consistency.</FeatureCard>
            <FeatureCard icon={Users2} title="10% Hours Refunded After 20 Hours">If you don't see a +10 point increase after 20 hours of tutoring, we'll refund 10% of your hours. We stand behind our results.</FeatureCard>
            <FeatureCard icon={BookOpen} title="Personalized Content Review">Focused content review tailored to your specific knowledge gaps and learning style, not generic one-size-fits-all approaches.</FeatureCard>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section id="how" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">How it works</h2>
            <p className="mt-3 text-slate-600">Simple, transparent, effective.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <HowStep step={1} title="Free Consultation">Share your target schools, test date, and constraints. We identify your quickest win conditions.</HowStep>
            <HowStep step={2} title="Match with a Specialist">We pair you with a tutor whose strengths and teaching style complement your needs.</HowStep>
            <HowStep step={3} title="Custom Plan + Coaching">Follow a week-by-week schedule. Meet regularly to refine timing, reasoning, and endurance.</HowStep>
          </div>
        </Container>
      </Section>

      {/* Guarantee */}
      <Section id="guarantee" className="bg-[var(--navy)] text-white">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold">+10 Points Guaranteed</h2>
              <p className="mt-4 text-white/80">Complete 20 hours of tutoring and follow your custom plan. If you don't gain at least 10 points from your verified baseline, we'll refund 10% of your hours.</p>
              <ul className="mt-6 space-y-2 text-white/90">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-[var(--gold)]"/> Eligibility reviewed during your consult</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-[var(--gold)]"/> Applies to official AAMC full-length scaled scores</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-1 h-5 w-5 text-[var(--gold)]"/> Transparent terms, no fine print surprises</li>
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="rounded-3xl bg-white/10 p-2 ring-1 ring-white/20">
                <div className="rounded-2xl bg-white p-8 text-[var(--navy)]">
                  <Quote className="mb-4 h-8 w-8 text-[var(--gold)] opacity-70" />
                  <p className="text-lg leading-8">Working with students at Future MD Academy, I’ve seen how much of a difference a structured, personalized plan makes. When students know they’re not studying alone and have someone guiding the process, their confidence—and scores—move fast.</p>
                  <div className="mt-6 font-semibold">Teri Johnson</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Build your plan</h2>
            <p className="mt-3 text-slate-600">Slide to choose hours. Pricing adjusts automatically. Pay in full or split into installments.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <motion.div layout className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="mt-2 rounded-xl border border-neutral-200 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-neutral-400" /><p className="text-sm font-medium">Select Your Tutoring Hours</p></div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => setHours((h) => Math.max(0, h - 1))}
                      className="rounded-full border border-neutral-200 p-1 hover:bg-neutral-50"
                      aria-label="decrease hours"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="h-4 w-4" />
                    </motion.button>
                    <div className="min-w-10 text-center text-lg font-semibold">{hours}</div>
                    <motion.button
                      onClick={() => setHours((h) => Math.min(120, h + 1))}
                      className="rounded-full border border-neutral-200 p-1 hover:bg-neutral-50"
                      aria-label="increase hours"
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
                <input type="range" min={0} max={120} step={1} value={hours} onChange={(e) => setHours(parseInt(e.target.value))} className="w-full accent-[var(--gold)]" />
                <div className="mt-4 grid grid-cols-3 items-end gap-4">
                  <div><div className="text-xs text-neutral-500">Hours</div><div className="text-lg font-semibold">{hours}</div></div>
                  <div><div className="text-xs text-neutral-500">Rate/hr</div><div className="text-lg font-semibold">{formatUSD(rate)}</div></div>
                  <div><div className="text-xs text-neutral-500">Total</div><div className="text-lg font-semibold">{formatUSD(total)}</div></div>
                </div>
                <div className="mt-3 text-xs text-neutral-600"><div className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200"><AlertTriangle className="h-3.5 w-3.5" /> Limited-time: secure these rates while seats last.</div></div>
              </div>
            </motion.div>
            <motion.div layout className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="text-lg font-semibold">Your Program</h3>
              <div className="mt-4 space-y-3">
                <LineItem label={`Tutoring – ${hours} hr${hours === 1 ? "" : "s"} @ ${formatUSD(rate)}/hr`} value={subtotal} />
                {discount > 0 && <LineItem label="Bundle Discount" value={-discount} accent="emerald" />}
                <div className="my-2 border-t" />
                <LineItem label="Total" value={total} bold />
              </div>
              <div className="mt-6">
                <h4 className="mb-2 text-sm font-semibold text-neutral-700">Payment Options</h4>
                <div className="space-y-2">
                  <RadioRow label="One-time payment" caption="Pay in full today" selected={installments === null} onSelect={() => setInstallments(null)} right={formatUSD(total)} />
                  {[2,3,4,5,6].map((n) => (
                    <RadioRow key={n} label={`${n} installments`} caption={`${n} monthly payments`} selected={installments === n} onSelect={() => setInstallments(n)} right={`${formatUSD(total / n)}/mo`} />
                  ))}
                </div>
              </div>
              <motion.a
                href="#contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--navy)] px-4 py-3 font-semibold text-white shadow-sm"
                whileHover={{ scale: 1.01, boxShadow: "0 20px 45px -25px rgba(11,42,60,0.45)" }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAnchorNavigation}
              >
                Start now — lock in {hours} hours
              </motion.a>
              <p className="mt-3 text-center text-xs text-neutral-500">No interest. No hidden fees. You can edit your plan anytime.</p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" className="bg-[var(--light)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Student wins</h2>
            <p className="mt-3 text-slate-600">Real outcomes from tailored coaching.</p>
          </div>

          <TestimonialCarousel />
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">FAQ</h2>
            <p className="mt-3 text-slate-600">Quick answers to common questions.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <FAQItem q="Who are the tutors?" a="All coaches are top 5% scorers (≥518) with demonstrated section expertise (131/132). We match you based on strengths and teaching style." />
            <FAQItem q="Do you offer online sessions?" a="Yes. We tutor via Zoom/Google Meet with shared whiteboarding and recorded notes when requested." />
            <FAQItem q="What materials do you use?" a="AAMC resources first, paired with high-yield third-party practice tailored to your needs." />
            <FAQItem q="How does the guarantee work?" a="With 20 hours completed and adherence to your plan, we guarantee a +10 point increase from your verified baseline or refund 10% of your hours." />
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section id="contact" className="bg-[var(--light)]">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold text-slate-900">Book your free consultation</h2>
            <p className="mt-3 text-slate-600">Tell us your target date and goals. We’ll reply within 24 hours with next steps and available times.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <form method="POST" action={FORM_ENDPOINT} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="grid gap-4">
                <input required name="name" placeholder="Full name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <input name="phone" placeholder="Phone (optional)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <input name="test_date" placeholder="Target MCAT date (e.g., June 28, 2026)" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <textarea required name="message" rows={5} placeholder="Tell us about your goals and biggest hurdles" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-[var(--navy)]" />
                <motion.button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--navy)] px-5 py-3 font-semibold text-white"
                  whileHover={{ scale: 1.02, boxShadow: "0 18px 35px -20px rgba(11,42,60,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Request Consultation <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
              <p className="mt-3 text-xs text-slate-500">By submitting, you agree to be contacted about scheduling and services. No spam ever.</p>
            </form>
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="space-y-4 text-slate-700">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-[var(--navy)]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Email</div>
                    <a href="mailto:hello@futuremdacademy.org" className="text-[var(--navy)] hover:underline">hello@futuremdacademy.org</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-[var(--navy)]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Phone</div>
                    <a href="tel:123456789" className="text-[var(--navy)] hover:underline">(123) 456-789</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="mt-0.5 h-5 w-5 text-[var(--navy)]" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Website</div>
                    <a href="https://FutureMDAcademy.org" className="text-[var(--navy)] hover:underline">FutureMDAcademy.org</a>
                  </div>
                </div>
                <div className="rounded-xl bg-[var(--navy)]/5 p-4 text-sm">Prefer email? Send your availability and target score to <span className="font-semibold">hello@futuremdacademy.org</span> and we’ll set it up.</div>
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">Optional: embed your flyer or QR here.</div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <Container className="grid gap-8 py-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Future MD Academy" className="h-12 w-12 object-contain rounded-xl" />
              <div className="text-slate-900"><div className="text-lg font-extrabold">Future MD Academy</div><div className="text-xs text-slate-500">MCAT Tutoring</div></div>
            </div>
            <p className="mt-4 text-sm text-slate-600">Top 5% tutors. Top 1% section specialists. Guaranteed score growth.</p>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#services" className="hover:text-slate-900" onClick={handleAnchorNavigation}>Services</a></li>
              <li><a href="#pricing" className="hover:text-slate-900" onClick={handleAnchorNavigation}>Pricing</a></li>
              <li><a href="#faq" className="hover:text-slate-900" onClick={handleAnchorNavigation}>FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Legal</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">Terms</a></li>
              <li><a href="#" className="hover:text-slate-900">Privacy</a></li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4"/> hello@futuremdacademy.org</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4"/> 123-456-789</li>
              <li className="flex items-center gap-2"><Globe className="h-4 w-4"/> FutureMDAcademy.org</li>
            </ul>
          </div>
        </Container>
        <div className="border-t py-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Future MD Academy. All rights reserved.</div>
      </footer>
    </div>
  );
}
