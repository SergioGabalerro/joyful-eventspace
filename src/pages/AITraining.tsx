import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Download, Menu, X } from "lucide-react";

import eventChill from "@/assets/event-chill-code-workshop.jpg";
import eventHackathon from "@/assets/event-hackathon-ai.jpg";
import eventJam from "@/assets/event-late-night-jam.jpg";
import eventStartup from "@/assets/event-startup-weekend.jpg";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarMarcus from "@/assets/avatar-marcus.jpg";
import avatarPriya from "@/assets/avatar-priya.jpg";

const stats = [
  { value: "8", label: "занятий" },
  { value: "1.5ч", label: "каждое" },
  { value: "67%", label: "практики" },
  { value: "3", label: "трека на выбор" },
];

const tracks = [
  {
    tag: "Базовый модуль",
    title: "Общий для всех участников",
    lessons: 2,
    focus: "Ключевые концепции AI-агентов, LangFlow, n8n, оркестрация",
  },
  {
    tag: "Трек разработки",
    title: "Клиентские и продуктовые агенты",
    lessons: 2,
    focus: "RAG-агенты, гибридные агенты на инструментах, автоматизация поддержки",
  },
  {
    tag: "Инфраструктурный трек",
    title: "Автоматизация NOC и инцидентов",
    lessons: 2,
    focus: "Триаж инцидентов, событийная архитектура, анализ влияния релизов",
  },
  {
    tag: "Трек Digital Tech",
    title: "Корпоративные ассистенты и BSS/OSS",
    lessons: 2,
    focus: "RAG-помощники для сотрудников, автоматизация бизнес-процессов",
  },
];

const lessons = [
  {
    n: "01",
    track: "Базовый модуль",
    title: "Основы AI-агентов и архитектура LLM",
    bullets: [
      "Чем агент отличается от чат-бота и workflow",
      "Цикл принятия решений: задача → инструмент → результат",
      "System Prompt, вызов функций, первый агент в LangFlow",
    ],
  },
  {
    n: "02",
    track: "Базовый модуль",
    title: "Интеграция и оркестрация n8n",
    bullets: [
      "LangFlow — рассуждение, n8n — исполнение",
      "Событийно-ориентированный AI-паттерн",
      "Структурированный JSON-вывод и ветвление по priority",
    ],
  },
  {
    n: "03",
    track: "Трек разработки",
    title: "RAG-агент для клиентской поддержки",
    bullets: [
      "Chunking, embeddings, vector store, retriever",
      "Промпты, ориентированные на поддержку",
      "Оценка уверенности и явный отказ при низком confidence",
    ],
  },
  {
    n: "04",
    track: "Трек разработки",
    title: "Гибридный продуктовый агент на инструментах",
    bullets: [
      "Выбор между RAG и API-инструментами",
      "JSON-контракты и маршрутизация в n8n",
      "Evaluation suite для качества выбора инструментов",
    ],
  },
  {
    n: "05",
    track: "Инфраструктурный трек",
    title: "AI-агент для сортировки инцидентов в NOC",
    bullets: [
      "Жизненный цикл инцидента: классификация, приоритизация, маршрутизация",
      "Подключение runbook-базы знаний через RAG",
      "Incident Agent на потоке алертов (CPU, latency, packet loss)",
    ],
  },
  {
    n: "06",
    track: "Инфраструктурный трек",
    title: "Анализ влияния релизов",
    bullets: [
      "Индексация коммитов, diff и метаданных пайплайна",
      "Корреляция деплоев с всплесками ошибок и латенси",
      "Рекомендации rollback / escalate / ignore",
    ],
  },
  {
    n: "07",
    track: "Трек Digital Tech",
    title: "Агент-помощник для сотрудников на основе RAG",
    bullets: [
      "Единая точка доступа к внутренней документации",
      "Память диалога и связность ответов",
      "HR-политики, регламенты, инструкции, FAQ",
    ],
  },
  {
    n: "08",
    track: "Трек Digital Tech",
    title: "Агент для автоматизации бизнес-процессов",
    bullets: [
      "Подключение услуг, смена тарифа, обработка обращений",
      "Интеграция с OSS/BSS-системами через n8n",
      "Валидация входных данных и сбор недостающих полей",
    ],
  },
];

const outcomes = [
  { track: "Базовый модуль", skills: "Архитектура агентов, вызов инструментов, структурированный вывод, интеграция с n8n" },
  { track: "Трек разработки", skills: "Реализация RAG, гибридные агенты, интеграция API, продуктовые сценарии" },
  { track: "Инфраструктурный трек", skills: "Триаж инцидентов, событийно-ориентированная автоматизация, анализ влияния релизов" },
  { track: "Трек Digital Tech", skills: "Корпоративные интеграции, автоматизация CRM/BSS, оркестрация бизнес-процессов" },
];

const faqs = [
  {
    q: "Какой уровень подготовки нужен участникам?",
    a: "Программа рассчитана на технические команды: разработчиков, DevOps/SRE, инженеров Digital Tech. Базовое знание Python и REST API будет плюсом, но не обязательно.",
  },
  {
    q: "На каких инструментах работаем?",
    a: "LangFlow для построения агентов и LLM-логики, n8n для оркестрации и исполнения workflow. Все упражнения выполняются на реалистичных корпоративных сценариях.",
  },
  {
    q: "Можно ли пройти только один трек?",
    a: "Да. Базовый модуль обязателен для всех (2 занятия), далее участник выбирает один из трёх треков — суммарно 4 занятия на человека.",
  },
  {
    q: "Формат проведения?",
    a: "8 занятий по 1.5 часа. Теория — не более 30 минут, остальное время — практика. После каждого занятия — домашнее задание на 30–60 минут.",
  },
  {
    q: "Что получают участники на выходе?",
    a: "Работающих агентов под свои рабочие сценарии, evaluation suite для оценки качества, runbook-базу для инцидентов и навык встраивания агентов в корпоративную инфраструктуру.",
  },
];

const nav = [
  { href: "#program", label: "Программа" },
  { href: "#tracks", label: "Треки" },
  { href: "#lessons", label: "Занятия" },
  { href: "#outcomes", label: "Результаты" },
  { href: "#faq", label: "FAQ" },
];

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-foreground/10 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        {eyebrow && <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</p>}
        {title && (
          <h2 className="mb-12 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

export default function AITraining() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'DM Sans', system-ui" }}>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background text-[10px] font-bold">AI</span>
            AI-агенты · корпоративная программа
          </a>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#demo" className="hidden rounded-none bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-background hover:bg-foreground/85 md:inline-block">
            Записаться на демо
          </a>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-foreground/10 px-6 py-4 md:hidden">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block py-2 text-sm">
                {n.label}
              </a>
            ))}
            <a href="#demo" onClick={() => setMenuOpen(false)} className="mt-3 block bg-foreground px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.15em] text-background">
              Записаться на демо
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-32">
        <div className="relative mx-auto max-w-6xl">
          {/* Floating cards — like original template */}
          <motion.div
            className="hidden lg:block absolute left-[-60px] top-[40px] w-[220px]"
            initial={{ opacity: 0, scale: 0.3, x: -60, y: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg rotate-[6deg]">
              <img src={eventChill} alt="Code workshop" className="w-full h-[140px] object-cover" />
              <div className="bg-card px-3 py-2">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Workshop</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block absolute left-[-80px] bottom-[80px] w-[220px]"
            initial={{ opacity: 0, scale: 0.3, x: -60, y: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.35 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg rotate-[-5deg]">
              <img src={eventJam} alt="Late night session" className="w-full h-[140px] object-cover" />
              <div className="bg-card px-3 py-2">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Lab</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block absolute right-[-60px] top-[60px] w-[220px]"
            initial={{ opacity: 0, scale: 0.3, x: 60, y: -40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.25 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg rotate-[-6deg]">
              <img src={eventStartup} alt="Startup sprint" className="w-full h-[140px] object-cover" />
              <div className="bg-card px-3 py-2">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Sprint</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block absolute right-[-80px] bottom-[60px] w-[220px]"
            initial={{ opacity: 0, scale: 0.3, x: 60, y: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg rotate-[5deg]">
              <img src={eventHackathon} alt="AI hackathon" className="w-full h-[140px] object-cover" />
              <div className="bg-card px-3 py-2">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Hackathon</span>
              </div>
            </div>
          </motion.div>

          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Корпоративная программа · 2026</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-[88px]"
          >
            AI-агенты — не магия,{" "}
            <span className="text-muted-foreground">а архитектура.</span> Научим вашу команду строить их под реальные задачи.
          </motion.h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            8 занятий, три специализированных трека и интенсивная практика на LangFlow и n8n. Подготовка технических команд к разработке AI-агентов для поддержки, инфраструктуры и Digital Tech.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#demo" className="inline-flex items-center gap-2 bg-foreground px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-background hover:bg-foreground/85">
              Записаться на демо <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#program" className="inline-flex items-center gap-2 border border-foreground/20 px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] hover:border-foreground/60">
              <Download className="h-4 w-4" /> Программа
            </a>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-8">
                <div className="text-4xl font-semibold tracking-tight md:text-5xl">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM OVERVIEW */}
      <Section id="program" eyebrow="Обзор" title="Теория — 30 минут. Остальное — руки на клавиатуре.">
        <div className="grid gap-12 md:grid-cols-2">
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            Программа сочетает теоретическую базу с интенсивной практикой на реалистичных корпоративных сценариях. Каждое занятие длится 1.5 часа: 30 минут теории и час практики. После занятия — домашнее задание, которое превращает учебный пример в рабочий навык.
          </p>
          <ul className="space-y-4 text-base">
            {[
              "Общий базовый модуль для всех участников",
              "Три специализированных трека на выбор",
              "Сквозные инструменты: LangFlow и n8n",
              "Домашние задания на реальных кейсах команды",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 border-b border-foreground/10 pb-4">
                <Check className="mt-1 h-4 w-4 shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* TRACKS */}
      <Section id="tracks" eyebrow="Структура" title="Один базовый модуль и три параллельных трека.">
        <div className="grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-2">
          {tracks.map((t, i) => (
            <motion.div
              key={t.tag}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-background p-10"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.tag}</span>
                <span className="text-xs text-muted-foreground">{t.lessons} занятия</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-tight md:text-3xl">{t.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.focus}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* LESSONS */}
      <Section id="lessons" eyebrow="Программа" title="8 занятий — каждое заканчивается работающим агентом.">
        <div className="grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10 md:grid-cols-2">
          {lessons.map((l) => (
            <div key={l.n} className="bg-background p-10">
              <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>Занятие {l.n}</span>
                <span>{l.track}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-tight tracking-tight md:text-2xl">{l.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {l.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-px w-4 shrink-0 bg-foreground/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* OUTCOMES */}
      <Section id="outcomes" eyebrow="Результаты" title="Что участники забирают с собой.">
        <div className="overflow-hidden border border-foreground/10">
          {outcomes.map((o, i) => (
            <div
              key={o.track}
              className={`grid grid-cols-1 gap-6 p-8 md:grid-cols-[280px_1fr] md:gap-12 ${
                i !== outcomes.length - 1 ? "border-b border-foreground/10" : ""
              }`}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.15em]">{o.track}</div>
              <div className="text-base text-muted-foreground md:text-lg">{o.skills}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Частые вопросы">
        <div className="border-t border-foreground/10">
          {faqs.map((f, i) => (
            <div key={f.q} className="border-b border-foreground/10">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-medium md:text-xl">{f.q}</span>
                <span className="text-2xl text-muted-foreground">{openFaq === i ? "–" : "+"}</span>
              </button>
              {openFaq === i && (
                <p className="max-w-3xl pb-6 text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* DEMO / CTA */}
      <section id="demo" className="border-t border-foreground/10 bg-foreground px-6 py-24 text-background md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-background/60">Демо</p>
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Покажем программу и обсудим формат под вашу команду.
            </h2>
            <p className="mt-6 max-w-md text-background/70">
              30 минут онлайн. Разберём, какие треки подходят вашей команде, и подгоним домашние задания под ваши реальные кейсы.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Спасибо! Мы свяжемся с вами в течение рабочего дня.");
            }}
            className="space-y-5"
          >
            {[
              { name: "name", label: "Имя", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "company", label: "Компания", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-background/60">{f.label} *</label>
                <input
                  required
                  type={f.type}
                  name={f.name}
                  className="w-full border-0 border-b border-background/30 bg-transparent py-3 text-base text-background outline-none placeholder:text-background/40 focus:border-background"
                />
              </div>
            ))}
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-background/60">Интересующий трек</label>
              <select className="w-full border-0 border-b border-background/30 bg-transparent py-3 text-base text-background outline-none focus:border-background [&>option]:text-foreground">
                <option>Все треки</option>
                <option>Базовый модуль</option>
                <option>Трек разработки</option>
                <option>Инфраструктурный трек</option>
                <option>Трек Digital Tech</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 inline-flex items-center gap-2 bg-background px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-background/90"
            >
              Отправить заявку <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-foreground/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-muted-foreground md:flex-row md:justify-between">
          <span>© 2026 Корпоративная программа обучения AI-агентам</span>
          <span>Программа 2026 · LangFlow · n8n</span>
        </div>
      </footer>
    </div>
  );
}