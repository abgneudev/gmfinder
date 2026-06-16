export const metadata = {
  title: "How GMFinder works · FAQ",
};

const STEPS: { title: string; body: string }[] = [
  {
    title: "Browse Game Masters and their tables.",
    body: "Skim the roster of professional GMs, each with the systems they run and the vibe of their table.",
  },
  {
    title: "Filter by system, play style, and the day you're free.",
    body: "Narrow the list to GMs who run the game you want, the way you like to play, on a day that fits your week.",
  },
  {
    title: "Open a GM to see their bio, systems, and session times.",
    body: "Read who they are, what they run, how much a session costs, and when they're at the table.",
  },
  {
    title: "Pick the table that fits — and get ready to roll.",
    body: "Found your match? Line up your session and bring your dice. (Booking is coming soon in this demo.)",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is a Game Master, and what does “professional GM” mean?",
    a: "A Game Master (GM) is the person who runs a tabletop role-playing game — they narrate the world, play every character you meet, and guide the story while you play your hero. A professional GM does this as a paid service: they prepare the adventure, keep the table fun and fair, and welcome players of every experience level so you can just show up and enjoy.",
  },
  {
    q: "What do the game systems mean (D&D 5e, Pathfinder 2e, etc.)?",
    a: "A game system is the rulebook a table plays by — it decides how you build a character and what happens when you roll the dice. D&D 5e is the most popular and the easiest to start with; Pathfinder 2e offers deeper, more tactical rules; others trade crunch for fast, story-first play. You don't need to know any of them in advance — the GM teaches you as you go.",
  },
  {
    q: "What do the play styles mean (Roleplay-heavy, Combat, Beginner-friendly, Cozy)?",
    a: "Play styles describe the feel of a table. Roleplay-heavy leans into character, conversation, and story; Combat tables relish tactical fights and big set-pieces; Beginner-friendly tables go slow and explain everything; Cozy tables keep things low-stakes and relaxed. Pick the styles that sound like your kind of evening.",
  },
  {
    q: "How does per-session pricing work?",
    a: "Each GM sets a price per session — a single sitting at the table, usually a few hours. The price shown on a GM's card and profile is what one session with them costs, so you can compare tables before you commit.",
  },
  {
    q: "I've never played before — is this for me?",
    a: "Absolutely. Tabletop RPGs are some of the most welcoming hobbies around, and a good GM does the heavy lifting. Look for GMs tagged Beginner-friendly — they're set up to teach the rules from scratch and ease you into your first adventure.",
  },
  {
    q: "How do session schedules and times work?",
    a: "Each GM lists the days they run their tables, so you can find someone whose schedule lines up with yours. Filter by the day you're free to see only the GMs who play then.",
  },
  {
    q: "How do I join a table?",
    a: "Browse to a GM you like and check their systems, style, and session times to make sure it's a fit. Booking isn't live in this demo yet — for now, GMFinder is the best way to discover the Game Master who's right for you.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section id="about">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          About GMFinder
        </h1>
        <p className="mt-4 text-stone-600">
          GMFinder is a marketplace for finding a professional Game Master who
          will run a tabletop role-playing game you&apos;ll actually enjoy.
          Browse real GMs, see the systems they run and the vibe of their
          tables, and find the one that fits how you want to play.
        </p>
        <p className="mt-4 text-stone-600">
          It&apos;s for everyone at the table — total newcomers curious about
          their first adventure, returning players looking for a new group, and
          the simply curious who&apos;ve always wondered what the fuss is about.
          Our mission is to make great tabletop games easy to find and friendly
          to join.
        </p>
      </section>

      <section id="how-it-works" className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          How it works
        </h2>
        <ol className="mt-6 space-y-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-1 text-sm text-stone-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          Frequently asked questions
        </h2>
        <div className="mt-6 space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              data-testid="faq-item"
              className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <summary className="cursor-pointer list-none font-semibold text-stone-900 transition group-open:text-indigo-700 hover:text-indigo-600">
                {faq.q}
              </summary>
              <p className="mt-3 text-sm text-stone-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
