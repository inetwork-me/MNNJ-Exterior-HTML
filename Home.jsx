import { useState, useRef, useEffect } from "react";
import { ShieldCheck, ChevronRight, ChevronDown, Phone, Star, ArrowUpRight, ChevronLeft, Check, Mail, MapPin, Clock, Twitter, Instagram, Linkedin, Facebook, MessageSquare, User, Sparkles, CheckCircle2 } from "lucide-react";

/* ---------- Motion system (spring physics) ---------- */
const viewport = { once: true, margin: "-100px" };
const spring = { type: "spring", stiffness: 80, damping: 20 };
const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: spring };
const stagger = (index) => ({ initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 }, viewport, transition: { ...spring, delay: 0.15 * index } });
const scaleIn = { initial: { scale: 1.1, opacity: 0, y: 40 }, whileInView: { scale: 1, opacity: 1, y: 0 }, viewport, transition: spring };
const popIn = (delay = 0) => ({ initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { type: "spring", stiffness: 220, damping: 16, delay } });
const gridStagger = { initial: "hidden", whileInView: "show", viewport, variants: { hidden: {}, show: { transition: { staggerChildren: 0.15 } } } };
const cardItem = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: spring } };

/* Word-by-word headline reveal */
const wordItem = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } } };
function AnimatedText({ text, delay = 0, className = "" }) {
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 + delay } } };
  return (
    <motion.span className={className} variants={container} initial="hidden" whileInView="show" viewport={viewport}>
      {text.split(" ").map((word, i, arr) => (
        <React.Fragment key={i}>
          <motion.span variants={wordItem} className="inline-block">{word}</motion.span>
          {i < arr.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
}

const img = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

const services = [
  { title: "Roof Cleaning", desc: "Soft-wash removal of moss, algae and lichen that restores your roof without damaging tiles.", price: "$350", image: img("photo-1632759145351-1d592919f522") },
  { title: "Window Cleaning", desc: "Streak-free, pure-water cleaning for frames, sills and glass — inside and out.", price: "$95", image: img("photo-1581578731548-c64695cc6952") },
  { title: "Gutter Cleaning", desc: "Full clear-out of leaves and debris, with downpipe flushing to prevent leaks and overflow.", price: "$140", image: img("photo-1600585154340-be6161a56a0c") },
  { title: "Moss/Weed Removal", desc: "Targeted treatment that lifts moss and weeds from paths and joints, and keeps them away.", price: "$120", image: img("photo-1558904541-efa843a96f01") },
  { title: "Cladding Cleaning", desc: "Gentle low-pressure wash that brings uPVC, timber and composite cladding back to life.", price: "$220", image: img("photo-1564013799919-ab600027ffc6") },
  { title: "Driveway & Patio Cleaning", desc: "Deep pressure cleaning and re-sanding for block paving, concrete and natural stone.", price: "$180", image: img("photo-1600566753190-17f0baa2a6c3") },
  { title: "Solar Panel Cleaning", desc: "Deionised-water cleaning that removes grime and bird mess to recover lost efficiency.", price: "$150", image: img("photo-1509391366360-2e959784a276") },
  { title: "Cherry Picker Hire", desc: "Operated access platform for high or hard-to-reach jobs, with a trained, insured operator.", price: "$450", image: img("photo-1504307651254-35680f356dfd") },
];

const reasons = [
  { title: "Experienced Professionals", text: "Our trained cleaning team knows how to handle every space with care, precision, and attention to detail.", cls: "top-32 z-10" },
  { title: "Reliable & On Time", text: "We respect your schedule and deliver dependable cleaning services when you need them.", cls: "top-40 z-20" },
  { title: "Safe Cleaning Products", text: "We use carefully selected products and professional methods to keep your space fresh, clean, and comfortable.", cls: "top-48 z-30" },
  { title: "100% Satisfaction", text: "Your satisfaction comes first. We go the extra mile to make sure every clean meets your expectations.", cls: "top-56 z-40" },
];

const reviews = [
  { name: "Eleanor Pena", role: "Homeowner in Sheffield", avatar: "https://i.pravatar.cc/96?img=44", text: "The MNNJ Exterior team exceeded our expectations by completely restoring our roof and gutters with zero hassle." },
  { name: "Jerome Bell", role: "Property Manager", avatar: "https://i.pravatar.cc/96?img=13", text: "Our windows and cladding look brand new. Their friendly crew delivered exceptional quality and stayed strictly on schedule." },
  { name: "Guy Hawkins", role: "Homeowner in Rotherham", avatar: "https://i.pravatar.cc/96?img=53", text: "Outstanding craftsmanship on our driveway pressure washing. Every detail exceeded expectations!" },
  { name: "Darrell Steward", role: "Business Owner", avatar: "https://i.pravatar.cc/96?img=59", text: "We loved working with MNNJ Exterior. Clear communication, fair pricing, and remarkable results." },
  { name: "Sarah Mitchell", role: "Homeowner in Doncaster", avatar: "https://i.pravatar.cc/96?img=45", text: "Prompt, professional, and thorough. They made cleaning our solar panels and gutters effortless." },
  { name: "David Miller", role: "Homeowner in Barnsley", avatar: "https://i.pravatar.cc/96?img=60", text: "Marvin's team brings professional athlete discipline to their work. Truly the best exterior cleaning service in town." },
];

const avatars = [12, 33, 47].map((n) => `https://i.pravatar.cc/96?img=${n}`);

/* Rolling label: text + icon slide up, duplicate slides in from below */
function Roll({ children, gap = "gap-1.5" }) {
  const row = <span className={`flex h-5 items-center justify-center ${gap}`}>{children}</span>;
  return (
    <span className="block h-5 overflow-hidden">
      <span className="flex flex-col transition-transform duration-[450ms] ease-[cubic-bezier(.7,0,.2,1)] group-hover/btn:-translate-y-5">
        {row}
        {row}
      </span>
    </span>
  );
}

const GoogleG = () => (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
);

/* Custom brand dropdown (replaces native <select>) */
function Dropdown({ label, options, value, onChange, placeholder = "Select an option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    const esc = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, []);
  return (
    <div ref={ref} className={`relative flex flex-col gap-2 ${isOpen ? "z-50" : "z-10"}`}>
      <span className="text-sm font-semibold text-stone-600">{label}</span>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`flex w-full cursor-pointer items-center justify-between rounded-xl border bg-[#F8F7F4] p-4 text-left transition-all hover:border-blue-900/40 ${isOpen ? "border-blue-900/50 ring-2 ring-blue-900/20" : "border-stone-200"} ${value ? "text-stone-800" : "text-stone-400"}`}
      >
        {value || placeholder}
        <ChevronDown className={`h-[18px] w-[18px] text-stone-900 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} strokeWidth={2.2} />
      </button>
      {isOpen && (
        <ul role="listbox" className="absolute left-0 right-0 top-full z-50 mt-2 animate-in fade-in slide-in-from-top-2 overflow-hidden rounded-2xl border border-stone-200/80 bg-white py-1.5 shadow-xl backdrop-blur-md duration-200">
          {options.map((o) => {
            const selected = o === value;
            return (
              <li
                key={o}
                role="option"
                aria-selected={selected}
                onClick={() => { onChange(o); setIsOpen(false); }}
                className={`flex cursor-pointer items-center justify-between px-4 py-3 text-sm transition-colors ${selected ? "bg-blue-900 font-semibold text-white hover:bg-blue-800" : "font-medium text-stone-800 hover:bg-blue-50/80 hover:text-blue-900"}`}
              >
                {o}
                {selected && <Check className="h-4 w-4" strokeWidth={2.4} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const contactServices = ["Exterior Wash", "Roof Cleaning", "Window Cleaning", "Gutter Cleaning", "Driveway & Patio", "Other"];

const contactDetails = [
  { icon: Phone, label: "Phone", value: "(469) 555-0123", href: "tel:4695550123" },
  { icon: Mail, label: "Email", value: "quotes@mnnjexterior.com", href: "mailto:quotes@mnnjexterior.com" },
  { icon: MapPin, label: "Location", value: "Sheffield, UK (Serving South Yorkshire)" },
  { icon: Clock, label: "Hours", value: "Mon-Sat, 8:00 AM - 6:00 PM" },
];

const inputCls = "w-full rounded-xl border border-stone-200 bg-[#F8F7F4] p-4 text-stone-800 placeholder-stone-400 transition-all focus:outline-none focus:ring-2 focus:ring-blue-900/20";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [sliderPos, setSliderPos] = useState(50);
  const [quoteService, setQuoteService] = useState("");
  const [quoteSent, setQuoteSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F4] font-['Plus_Jakarta_Sans',system-ui,sans-serif]">
      {/* 0. Top Navigation */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 90, damping: 18 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "top-0 mx-0 rounded-none border-b border-stone-200/50 bg-[#F8F7F4]/95 shadow-sm backdrop-blur-md"
            : "top-4 mx-4 rounded-2xl border-none bg-transparent shadow-none sm:mx-8"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" aria-label="MNNJ Exterior Property Care home">
            <img
              src={isScrolled ? "/logo-dark.png" : "/logo-light.png"}
              alt="MNNJ Exterior Property Care"
              className="h-10 w-auto object-contain transition-all duration-300 sm:h-12"
            />
          </a>
          <nav className="hidden gap-8 md:flex">
            {[["Services", "#services"], ["Why Us", "#why"], ["Testimonials", "#testimonials"], ["About", "#about"]].map(([label, href]) => (
              <a key={href} href={href} className={`text-sm font-medium transition-colors duration-300 ${isScrolled ? "text-stone-600 hover:text-blue-900" : "text-white/90 hover:text-white"}`}>{label}</a>
            ))}
          </nav>
          <a href="#contact" className="group/btn inline-flex items-center rounded-full bg-blue-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800">
            <Roll>Get a Quote <ChevronRight className="h-4 w-4" strokeWidth={2.4} /></Roll>
          </a>
        </div>
      </motion.header>

      {/* 1. Floating Framed Hero */}
      <section className="p-2">
        <div className="relative flex min-h-[calc(100vh-1rem)] flex-col overflow-hidden rounded-2xl bg-slate-900 text-white">
          <img
            src={img("photo-1581578731548-c64695cc6952", 2000)}
            alt=""
            className="absolute inset-0 h-full w-full -scale-x-100 object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,22,48,.94)_0%,rgba(12,22,48,.82)_35%,rgba(12,22,48,.45)_65%,rgba(12,22,48,.6)_100%)]" />


          <div className="relative flex flex-1 flex-col justify-center gap-7 px-5 pb-14 pt-32 md:px-[6vw] lg:px-24">
            <h1 className="text-5xl font-extrabold leading-none tracking-[-0.04em] sm:text-6xl lg:text-[84px]">
              <AnimatedText text="Trusted cleaning" /><br />
              <AnimatedText text="exceptional" delay={0.16} /><br />
              <AnimatedText text="results" delay={0.24} />
            </h1>
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.4 }} className="max-w-[440px] text-[17px] leading-relaxed text-slate-200 [text-wrap:pretty]">
              Experience dependable cleaning services that leave every room fresh, spotless, healthier, and ready for you to enjoy daily.
            </motion.p>
            <div className="flex flex-wrap gap-3">
              <motion.a {...popIn(0.55)} href="#" className="group/btn inline-flex h-[54px] min-w-[210px] items-center justify-center rounded-full bg-blue-900 px-7 text-[15px] font-bold shadow-[0_8px_24px_rgba(30,58,138,.4)] transition-colors hover:bg-[#2547A8]">
                <Roll gap="gap-2">Get a Quote <ChevronRight className="h-4 w-4" strokeWidth={2.4} /></Roll>
              </motion.a>
              <motion.a {...popIn(0.67)} href="tel:4695550123" className="group/btn inline-flex h-[54px] min-w-[210px] items-center justify-center rounded-full bg-white px-7 text-[15px] font-bold text-[#0F1E3D] shadow-[0_8px_24px_rgba(0,0,0,.18)] transition-colors hover:text-blue-900">
                <Roll gap="gap-3"><Phone className="h-4 w-4" /> (469) 555-0123</Roll>
              </motion.a>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.85 }} className="mt-6 flex flex-wrap items-center gap-5">
              <div className="flex items-center">
                {avatars.map((src, i) => (
                  <img key={src} src={src} alt="" className={`h-10 w-10 rounded-full border-2 border-white object-cover ${i ? "-ml-2.5" : ""}`} />
                ))}
                <div className="-ml-2 flex h-11 items-center gap-2 rounded-full bg-white pl-3.5 pr-[18px] text-[#0F1E3D] shadow-[0_4px_14px_rgba(0,0,0,.15)]">
                  <GoogleG />
                  <Star className="h-[18px] w-[18px] fill-[#F5A300] text-[#F5A300]" />
                  <span className="text-[19px] font-bold">5.0</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 leading-tight">
                <span className="text-base font-medium">500+ Real Customer Reviews</span>
                <a href="#" className="self-start border-b border-white pb-1 text-base font-medium hover:border-indigo-200 hover:text-indigo-200">See all reviews</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us — sticky stacking cards + pinned image */}
      <section id="why" className="scroll-mt-[88px] px-4 text-stone-900 sm:px-8 lg:px-14">
        <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-12 py-24 lg:flex-row">
          <div className="flex w-full flex-col pb-32 lg:w-1/2">
            <div className="flex flex-col gap-5 pb-10">
              <motion.span {...fadeUp} className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-900">
                <CheckCircle2 className="h-4 w-4 text-blue-900" /> Why Choose Us
              </motion.span>
              <h2 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] [text-wrap:balance] md:text-[68px]">
                <AnimatedText text="Cleaning You Can Trust," /><br />
                <span className="font-['Instrument_Serif',Georgia,serif] text-[1.1em] font-normal italic tracking-tight text-blue-900"><AnimatedText text="Every Time." delay={0.32} /></span>
              </h2>
            </div>
            {reasons.map((r, i) => (
              <motion.div {...stagger(i)} key={r.title} className={`sticky mb-6 rounded-3xl border border-stone-200 bg-[#F8F7F4] p-8 ${r.cls}`}>
                <div className="flex items-start gap-5">
                  <span className="grid h-[52px] w-[52px] flex-none place-items-center rounded-[14px] bg-[#E8EDF7] text-xl font-extrabold text-blue-900">{i + 1}</span>
                  <div className="flex flex-col gap-2 pt-1">
                    <h3 className="text-2xl font-bold tracking-tight">{r.title}</h3>
                    <p className="max-w-[460px] leading-relaxed text-stone-600 [text-wrap:pretty]">{r.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="sticky top-32 h-[600px] w-full overflow-hidden rounded-3xl bg-slate-100 lg:w-1/2">
            <motion.img {...scaleIn} src="https://images.unsplash.com/photo-1642505172378-a6f5e5b15580?auto=format&fit=crop&w=1600&q=80" alt="Professional cleaner wiping down a bright kitchen counter" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section id="services" className="scroll-mt-[88px] rounded-t-[3rem] bg-[#0F172A] px-4 pb-20 pt-24 text-[#0F1E3D] sm:px-8 md:rounded-t-[4rem] md:pb-28 md:pt-28 lg:px-14">
        <div className="flex justify-center">
          <motion.span {...fadeUp} className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-200">
            <ShieldCheck className="h-4 w-4 text-blue-200" /> Our Services
          </motion.span>
        </div>
        <h2 className="mx-auto mb-12 max-w-4xl text-center text-white text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] [text-wrap:balance] md:mb-16 md:text-6xl">
          <AnimatedText text="Expert cleaning for" /><br />
          <span className="font-['Instrument_Serif',Georgia,serif] text-[1.12em] font-normal italic tracking-tight text-blue-200"><AnimatedText text="beautiful properties" delay={0.24} /></span>
        </h2>
        <motion.div {...gridStagger} className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.a variants={cardItem} key={s.title} href="#" className="group flex flex-col gap-5 rounded-[2rem] bg-white p-4 shadow-sm transition-shadow duration-500 hover:shadow-md">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:rotate-2 group-hover:scale-110" />
              </div>
              <div className="flex flex-1 flex-col gap-2 border-b border-[#ECEAE4] px-1 pb-5">
                <h3 className="text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500 [text-wrap:pretty]">{s.desc}</p>
              </div>
              <div className="flex items-end justify-between gap-3 px-1 pb-1">
                <span className="flex items-center gap-1.5 text-sm font-bold text-blue-900">
                  Read More
                  <span className="relative inline-block h-[18px] w-[18px] overflow-hidden">
                    <ArrowUpRight className="absolute inset-0 h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-full group-hover:translate-x-full" />
                    <ArrowUpRight className="absolute inset-0 h-[18px] w-[18px] -translate-x-full translate-y-full transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </span>
                <span className="flex flex-col items-end leading-tight">
                  <span className="text-[11px] tracking-wide text-gray-500">Starting at</span>
                  <span className="text-[22px] font-extrabold tracking-tight">{s.price}</span>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* 4. Before & After */}
      <section className="text-stone-900">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 pb-10 pt-20 md:flex-row md:items-end">
          <div className="flex flex-col gap-5">
            <motion.span {...fadeUp} className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-900">
              <Sparkles className="h-4 w-4 text-blue-900" /> Cleaning Result
            </motion.span>
            <h2 className="text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] md:text-[68px]">
              <AnimatedText text="See the Difference." /><br />
              <span className="font-['Instrument_Serif',Georgia,serif] text-[1.12em] font-normal italic tracking-tight text-blue-900"><AnimatedText text="Feel the Freshness." delay={0.24} /></span>
            </h2>
          </div>
          <a href="#" className="group/btn inline-flex h-[52px] items-center justify-center rounded-full bg-blue-900 px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#2547A8]">
            <Roll gap="gap-2">Get a Quote <ChevronRight className="h-4 w-4" strokeWidth={2.4} /></Roll>
          </a>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <motion.div {...scaleIn} className="relative h-[500px] w-full select-none overflow-hidden rounded-[2.5rem] shadow-2xl md:h-[600px]">
          {/* After (clean) */}
          <img src="https://images.unsplash.com/photo-1758448511322-8bfc73daf606?auto=format&fit=crop&w=2400&q=80" alt="Spotless living room after cleaning" className="absolute inset-0 h-full w-full object-cover" />
          <span className="pointer-events-none absolute right-6 top-6 z-[25] rounded-full bg-white/90 px-4 py-2 text-[13px] font-bold tracking-wider text-[#0F1E3D]">AFTER</span>

          {/* Before (dirty) — same photo, grimed with filters, clipped to slider */}
          <div className="absolute inset-0 z-10" style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
            <img src="https://images.unsplash.com/photo-1758448511322-8bfc73daf606?auto=format&fit=crop&w=2400&q=80" alt="Same living room before cleaning" className="absolute inset-0 h-full w-full object-cover [filter:sepia(.6)_saturate(.55)_brightness(.68)_contrast(1.15)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_75%,rgba(70,48,20,.45),transparent_45%),radial-gradient(ellipse_at_65%_85%,rgba(60,40,15,.4),transparent_40%),radial-gradient(ellipse_at_50%_20%,rgba(90,80,60,.3),transparent_55%)]" />
            <span className="pointer-events-none absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-[13px] font-bold tracking-wider text-[#0F1E3D]">BEFORE</span>
          </div>

          {/* Divider + handle */}
          <div className="pointer-events-none absolute inset-y-0 z-20 -ml-0.5 w-1 bg-white" style={{ left: `${sliderPos}%` }}>
            <div className="absolute left-1/2 top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-200 bg-white text-[#0F1E3D] shadow-xl">
              <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
              <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
            </div>
          </div>

          <input
            type="range" min="0" max="100" value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            aria-label="Before and after comparison"
            className="absolute inset-0 z-40 m-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </motion.div>
        </div>
      </section>

      {/* 5. Full Image CTA */}
      <section className="relative mt-20 flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-blue-950 py-24 text-center sm:py-32 md:min-h-[600px]">
            <motion.img {...scaleIn} src="https://images.unsplash.com/photo-1782594700873-bbeefef37e11?auto=format&fit=crop&w=2400&q=80" alt="Pristine home exterior with a clean winding driveway" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-blue-950/75" />
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6">
              <motion.span {...fadeUp} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-200">
                <Sparkles className="h-4 w-4 text-blue-300" /> Ready to transform your home?
              </motion.span>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white [text-wrap:balance] sm:text-5xl md:text-6xl">
                <AnimatedText text="Book your expert cleaning" /><br />
                <span className="font-['Instrument_Serif',Georgia,serif] text-[1.12em] font-normal italic tracking-tight text-blue-300"><AnimatedText text="today." delay={0.32} /></span>
              </h2>
              <motion.p {...fadeUp} className="mb-10 mt-6 max-w-2xl text-lg leading-relaxed text-blue-100 [text-wrap:pretty]">
                Experience dependable, detail-focused exterior cleaning that leaves every surface spotless and ready for you to enjoy.
              </motion.p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#" className="group/btn inline-flex min-w-[220px] items-center justify-center rounded-full bg-white px-8 py-4 font-bold text-blue-950 transition-colors hover:bg-stone-100">
                  <Roll gap="gap-2">Get a Free Quote <ChevronRight className="h-4 w-4" strokeWidth={2.4} /></Roll>
                </a>
                <a href="tel:4695550123" className="group/btn inline-flex min-w-[220px] items-center justify-center rounded-full border-2 border-white/30 px-8 py-4 font-medium text-white transition-colors hover:bg-white/10">
                  <Roll gap="gap-2"><Phone className="h-4 w-4" /> Call (469) 555-0123</Roll>
                </a>
              </div>
            </div>
      </section>

      {/* 6. Founder / CEO Word */}
      <section id="about" className="scroll-mt-[88px] text-stone-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <motion.span {...fadeUp} className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-900">
              <User className="h-4 w-4 text-blue-900" /> About Our Founder
            </motion.span>
            <h2 className="max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] [text-wrap:balance] md:text-6xl">
              <AnimatedText text="Built on discipline," /><br />
              <span className="font-['Instrument_Serif',Georgia,serif] text-[1.12em] font-normal italic tracking-tight text-blue-900"><AnimatedText text="driven by excellence." delay={0.24} /></span>
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 overflow-hidden rounded-[2.5rem] border border-stone-200/70 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-12">
            <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-slate-100 lg:col-span-5">
              <motion.img {...scaleIn} src="/assets/founder.png" alt="Marvin Johnson, founder of MNNJ Exterior Property Care" className="absolute inset-0 h-full w-full object-cover object-center" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2.5 text-[13px] font-bold text-white backdrop-blur">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> English Professional Footballer | Winger &amp; Wing-back
              </span>
            </div>

            <div className="flex flex-col justify-between gap-10 rounded-2xl border border-stone-200/50 bg-[#F8F7F4] p-8 sm:p-12 lg:col-span-7">
              <div>
                <p className="mb-6 text-xl font-medium leading-relaxed text-stone-900 [text-wrap:pretty] sm:text-2xl">
                  “Playing professional football as a winger and wing-back taught me that success comes down to{" "}
                  <span className="font-bold text-blue-900">pace, precision, discipline</span>, and attention to detail. At MNNJ Exterior Property Care, we bring that exact{" "}
                  <span className="font-bold text-blue-900">professional athlete mindset</span> to every home—ensuring your property is looked after like it's our own.”
                </p>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4 border-t border-stone-200 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-stone-900">Marvin Nicholas Johnson</span>
                  <span className="text-sm text-stone-500">Founder &amp; CEO, MNNJ Exterior Property Care | Professional Footballer</span>
                </div>
                <span className="select-none font-['Instrument_Serif',Georgia,serif] text-3xl italic leading-none text-blue-900">Marvin Johnson</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Google Reviews / Testimonials */}
      <section id="testimonials" className="scroll-mt-[88px] rounded-t-[3rem] bg-[#0F172A] pt-24 text-stone-900 md:rounded-t-[4rem] md:pt-32">
        <div className="flex flex-col items-center gap-4 px-4 text-center">
          <motion.span {...fadeUp} className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-200">
            <MessageSquare className="h-4 w-4 text-blue-200" /> Testimonials
          </motion.span>
          <h2 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white [text-wrap:balance] md:text-[64px]">
            <AnimatedText text="Real results happy homeowners" /><br />
            <span className="font-['Instrument_Serif',Georgia,serif] text-[1.12em] font-normal italic tracking-tight text-blue-300"><AnimatedText text="always" delay={0.32} /></span>
          </h2>
        </div>
        <motion.div {...gridStagger} className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-24 pt-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {reviews.map((r, i) => (
            <motion.div variants={cardItem} key={r.name} className="flex flex-col justify-between gap-6 rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col gap-[18px]">
                <div className="flex items-center gap-3">
                  <img src={r.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div className="flex flex-col">
                    <span className="font-bold text-stone-900">{r.name}</span>
                    <span className="text-sm text-stone-500">{r.role}</span>
                  </div>
                </div>
                <p className="leading-relaxed text-stone-700 [text-wrap:pretty]">“{r.text}”</p>
              </div>
              <div className="flex items-center justify-between border-t border-stone-100 pt-[18px]">
                <div className="flex gap-1 text-amber-400">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-[18px] w-[18px] fill-current" />)}
                </div>
                <GoogleG />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 8. Contact & Quote Form */}
      <section id="contact" className="scroll-mt-[88px] text-stone-900">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="flex flex-col">
            <motion.span {...fadeUp} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-blue-900">
              <Phone className="h-4 w-4 text-blue-900" /> Get in Touch
            </motion.span>
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-stone-900 [text-wrap:balance] sm:text-5xl md:text-6xl">
              <AnimatedText text="Let's discuss your" /><br />
              <span className="font-['Instrument_Serif',Georgia,serif] text-[1.12em] font-normal italic tracking-tight text-blue-900"><AnimatedText text="next project." delay={0.24} /></span>
            </h2>
            <motion.p {...fadeUp} className="mb-12 mt-6 max-w-[520px] text-lg leading-relaxed text-stone-600 [text-wrap:pretty]">
              Ready to restore your property's curb appeal? Fill out the form or reach out directly for a free, no-obligation quote.
            </motion.p>
            <motion.div {...gridStagger} className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2">
              {contactDetails.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div variants={cardItem} key={label} className="flex items-start gap-3.5">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[#E8EDF7] text-blue-900">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="flex flex-col gap-0.5 pt-0.5">
                    <span className="text-[13px] font-semibold text-stone-500">{label}</span>
                    {href
                      ? <a href={href} className="font-bold text-stone-900 hover:text-blue-900">{value}</a>
                      : <span className="font-bold text-stone-900">{value}</span>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.form {...gridStagger}
            onSubmit={(e) => { e.preventDefault(); setQuoteSent(true); }}
            className="flex flex-col gap-5 rounded-[2rem] border border-stone-200/80 bg-white p-8 shadow-lg shadow-stone-200/20 sm:p-10"
          >
            <motion.div variants={cardItem} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-stone-600">First Name</span>
                  <input type="text" placeholder="Enter your first name" autoComplete="given-name" required className={inputCls} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-stone-600">Last Name</span>
                  <input type="text" placeholder="Enter your last name" autoComplete="family-name" required className={inputCls} />
                </label>
            </motion.div>
            <motion.div variants={cardItem} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-stone-600">Email Address</span>
                  <input type="email" placeholder="Enter your email address" autoComplete="email" required className={inputCls} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-stone-600">Phone Number</span>
                  <input type="tel" placeholder="Enter your phone number" autoComplete="tel" required className={inputCls} />
                </label>
            </motion.div>
            <motion.div variants={cardItem}>
              <Dropdown label="Service Required" options={contactServices} value={quoteService} placeholder="Select a service" onChange={(v) => { setQuoteService(v); setQuoteSent(false); }} />
            </motion.div>
            <motion.label variants={cardItem} className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-stone-600">Property Details / Message</span>
              <textarea rows={4} placeholder="Tell us about your property and what needs cleaning…" className={`${inputCls} resize-y`} />
            </motion.label>
            <motion.button variants={cardItem} type="submit" className="group/btn mt-4 flex w-full items-center justify-center rounded-full bg-blue-900 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-blue-800">
              <Roll gap="gap-2">Request Free Quote <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.4} /></Roll>
            </motion.button>
            {quoteSent && <p className="text-center text-sm font-semibold text-blue-900">Thanks — we'll be in touch within one business day with your free quote.</p>}
          </motion.form>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="relative overflow-hidden rounded-t-[3rem] bg-[#0F172A]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 flex w-full select-none items-end justify-center overflow-hidden opacity-5">
          <motion.h1 variants={{ hidden: { y: 140, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 40, damping: 20 } } }} className="text-[12rem] font-bold leading-[0.8] tracking-tighter text-white md:text-[20rem]">MNNJ</motion.h1>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-24 sm:px-6 lg:px-8">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <img src="/logo-light.png" alt="MNNJ Exterior Property Care" className="mb-6 h-12 w-auto object-contain sm:h-16" />
              <p className="max-w-xs text-sm leading-relaxed text-blue-100/70">
                Delivering athlete-level discipline and precision to exterior property care. Creating spotless, beautiful properties for every homeowner, every season.
              </p>
            </div>

            {[
              { title: "Discover", links: ["Home", "About our Founder", "Services", "Testimonials", "Get a Quote"] },
              { title: "Services", links: ["Roof cleaning", "Window cleaning", "Gutter flushing", "Driveway washing", "Solar panel care"] },
            ].map((c, i) => (
              <motion.div {...stagger(i + 1)} key={c.title} className="lg:col-span-1">
                <h3 className="mb-6 font-semibold text-white">{c.title}</h3>
                <ul className="flex flex-col gap-4 text-sm text-blue-100/70">
                  {c.links.map((l) => (
                    <li key={l}><a href="#" className="transition-colors hover:text-white">{l}</a></li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <div className="lg:col-span-2">
              <h3 className="mb-6 font-semibold text-white">Contact us</h3>
              <a href="mailto:quotes@mnnjexterior.com" className="mb-4 block text-sm text-blue-100/70 transition-colors hover:text-white">quotes@mnnjexterior.com</a>
              <a href="tel:4695550123" className="mb-4 block text-sm text-blue-100/70 transition-colors hover:text-white">(469) 555-0123</a>
              <p className="mb-4 text-sm text-blue-100/70">Sheffield, South Yorkshire, UK</p>
            </div>
          </div>

          <hr className="mb-8 border-white/10" />

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-blue-100/50 md:flex-row">
            <p>© 2026 MNNJ Exterior Property Care. All rights reserved.</p>
            <div className="flex gap-6">
              {[
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Facebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="cursor-pointer transition-colors hover:text-white">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
