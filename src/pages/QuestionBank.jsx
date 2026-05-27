import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const DATA_SETS = {
  "Frontend Developer": [
    {
      id: "fe-set-1",
      title: "Set 1: React Fundamentals & Virtual DOM",
      questions: [
        "Explain the breakdown algorithm of the Virtual DOM and reconciliation.",
        "How does the Fiber architecture split rendering frames into chunks?",
        "Write a custom hook `useDebounce` from scratch in React syntax.",
        "What are the differences between layout effects and regular standard effects?",
        "Implement a shallow comparison utility helper function in JavaScript.",
        "How do you manage closure bugs inside a dynamic `useEffect` array loop?",
        "Describe the performance trade-offs of using `useMemo` versus inline expressions.",
        "Write a component configuration handling structural dynamic tree parsing recursively.",
        "How do synthetic event systems catch DOM errors differently than vanilla engines?",
        "Implement an optimized component lifecycle using pure class states fallback.",
        "Explain the operational parsing layer of JSX structures into virtual nodes.",
        "Build a functional memoization layer for an expensive API processor context.",
        "What are the specific parameters causing dynamic cascading re-renders?",
        "Write a multi-step dynamic context provider processing state dispatch layers.",
        "How does the concurrent rendering runtime architecture pause layout processes?",
      ],
    },
    {
      id: "fe-set-2",
      title: "Set 2: JavaScript Engines & Async Scope",
      questions: [
        "Write a fully functional Promise polyfill from scratch with standard handlers.",
        "Explain event loops, microtask queues, and macrotask execution order metrics.",
        "Implement an asynchronous throttle function with trailing and leading configurations.",
        "Describe the structural parsing differences between prototypal and classical layouts.",
        "Write a deep-clone method handling recursive cycles without stack overflow breaks.",
        "How do Closures hold state context execution references inside memory allocations?",
        "Write a parser transforming a flat structural database array into nested configurations.",
        "What are the differences between strict comparison evaluation processes?",
        "Implement an architecture wrapping callback blocks into explicit clean async blocks.",
        "Explain generational garbage collection logic inside V8 runtime environments.",
        "Write a utility function implementing partial function currying architectures.",
        "What are hidden classes and inline caches inside specialized JS runtimes?",
        "Implement a custom Event Emitter class handling register, emission, and cleanup.",
        "How do block-scoped attributes break outside temporal dead zone restrictions?",
        "Write a structural pipeline function tracking execution times of async chains.",
      ],
    },
    {
      id: "fe-set-3",
      title: "Set 3: Advanced CSS, State & Core DOM",
      questions: [
        "Explain CSS nesting layout context compilation differences vs CSS-in-JS.",
        "Write an layout engine intercepting dynamic bubbling mutations explicitly.",
        "Build an infinite scroll loader tracking dynamic viewport intersection configurations.",
        "How do browser paint, style validation, and layout engine calculations pipeline?",
        "Write a component updating local structures directly using custom CSS properties.",
        "Explain layout shifting metrics (CLS) when loading non-dimensional media blocks.",
        "Implement a virtual layout grid generator processing responsive column layouts.",
        "How do container queries isolate structural rendering dependencies away from viewports?",
        "Write a JavaScript utility mapping coordinates directly inside canvas targets.",
        "Explain memory footprint leakage occurrences when using uncleaned resize bindings.",
        "Build an atomic state slice mimicking Redux dispatch loop mechanisms cleanly.",
        "How do composite layer adjustments bypass layout calculations inside GPU pipelines?",
        "Write an analytical parsing algorithm mapping CSS selectors to targeted elements.",
        "Implement a dynamic style sheet builder inserting rules at execution time metrics.",
        "Explain functional hydration breakdowns within hybrid server-side frameworks.",
      ],
    },
    {
      id: "fe-set-4",
      title: "Set 4: Production Optimization & Testing",
      questions: [
        "Write a build configuration chunking split node dependencies structurally.",
        "How do Web Workers safely pass complex objects using structured clone engines?",
        "Implement an analytical tool tracking component performance timings over APIs.",
        "Explain tree-shaking limitations when dynamic imports use unpredictable strings.",
        "Write a modular unit test verifying component event emission loops.",
        "Build a structural mocking utility capturing network calls inside fetch operations.",
        "How do Service Worker proxy strategies intercept and cache layout resources?",
        "Write a script auditing asset bundle payloads against strict performance limits.",
        "Explain hydration errors when server timestamps break client expectation values.",
        "Implement a robust error boundary logging runtime faults back to analytics.",
        "How do you profile long-running tasks inside the Chrome performance panel?",
        "Write a code snippet lazy-loading media files based on network status profiles.",
        "Explain security mitigations against content injection vectors on user input.",
        "Build a configuration optimizing asset delivery via progressive format selection.",
        "Write a clean validation script matching client layout variants against specifications.",
      ],
    },
  ],
  "Backend Developer": [
    {
      id: "be-set-1",
      title: "Set 1: System Design & REST Architecture",
      questions: [
        "Design an idempotent processing system tracking payment gateway confirmations.",
        "Write a validation middleware preventing deep JSON structural injection attacks.",
        "How do you scale stateful session engines across distinct regional nodes?",
        "Implement a token bucket rate-limiting algorithm from scratch on endpoints.",
        "Explain database concurrency issues when processing inventory reductions.",
        "Write a stream processing pipeline handling large dataset imports without crashes.",
        "How do you design zero-downtime database transformations for active instances?",
        "Implement an adaptive routing layer balancing payloads across server clusters.",
        "Explain cache eviction strategies comparing least-recently-used with timed TTL logs.",
        "Write a custom error tracking class wrapping microservice interface breakdowns.",
        "How do connection pooling maximum boundaries alter system processing latency profiles?",
        "Design an asynchronous system decoupling webhook alerts from primary database loops.",
        "Write a protocol verifying content signing parameters across secure data transfers.",
        "Explain data structure indexing decisions optimizing high-throughput search queries.",
        "Implement a data structure parsing layered relational objects into denormalized structures.",
      ],
    },
    {
      id: "be-set-2",
      title: "Set 2: Database Optimization & Transactions",
      questions: [
        "Write a query showcasing explicit lock escalations across related record rows.",
        "Explain operational trade-offs between B-Tree and LSM-Tree index storage formats.",
        "Implement an optimized query pattern tracking historical audit ledger states safely.",
        "How do relational databases maintain strict isolation properties during conflicts?",
        "Write an abstraction layer managing database connections across connection failures.",
        "Explain read-replication lag issues impacting distributed backend microservices.",
        "Implement a partition scheme separating legacy telemetry archives from core tables.",
        "Write a data migration algorithm transforming document properties into relational columns.",
        "How do index fragmentations degrade data scanning performance over extended runtimes?",
        "Design an multi-tenant schema isolation layout optimizing record query bounds.",
        "Write a diagnostic script analyzing slow database execution times via log metrics.",
        "Explain cache invalidation mechanics when system state updates run asynchronously.",
        "Implement an advisory locking system coordinating scheduled task execution blocks.",
        "How do you design database constraints to prevent race conditions during updates?",
        "Write a code utility tracking index performance metrics under heavy mock writing traffic.",
      ],
    },
    {
      id: "be-set-3",
      title: "Set 3: Microservices & Event Architecture",
      questions: [
        "Write a message broker listener enforcing strict chronological data process sorting.",
        "Explain distributed transaction patterns coordinating multi-stage business tasks.",
        "Implement an outbox messaging structure inside a data modification layer.",
        "How do you mitigate data inconsistency risks within eventual consistency frameworks?",
        "Write a health check controller tracking connection pools and dependencies.",
        "Design a dead-letter queue routing system handling corrupted message formats.",
        "Implement a service discovery heartbeat mechanism validating backend worker lifecycles.",
        "Explain structural difference profiles between gRPC message blocks and JSON payloads.",
        "Write a circuit breaker mechanism intercepting sluggish external microservices.",
        "How do you secure inter-service communication channels inside local server rings?",
        "Implement a log correlation builder mapping request tags across distinct microservices.",
        "Write a payload schema validation handler evaluating microservice data payloads.",
        "Explain event streaming compaction benefits within log-structured event brokers.",
        "Design a token validation server issuing short-lived application session blocks.",
        "Write an aggregation function merging decoupled service streams into single payloads.",
      ],
    },
    {
      id: "be-set-4",
      title: "Set 4: Runtime Performance & Security",
      questions: [
        "Write a profiling configuration auditing async code loops for event loop blocks.",
        "Explain memory heap fragmentation causes under persistent connection management.",
        "Implement a cryptographic utility encrypting sensitive data before database storage.",
        "How do you prevent cross-site request forgery attacks on non-browser API nodes?",
        "Write a memory-efficient file parsing pipeline processing continuous data lines.",
        "Design an access control parser checking permission matrices across application routes.",
        "Implement a streaming compressed asset generator piping out data on demand.",
        "Explain race conditions occurring when shared state modifies outside synchronized contexts.",
        "Write an environment parameters loader validating missing configuration values safely.",
        "How do thread pool restrictions impact performance profiles under intensive calculations?",
        "Implement a data data sanitization utility neutralizing script injection payload strings.",
        "Write an automated diagnostic checker logging unhandled rejection incidents fully.",
        "Explain CORS configuration patterns balancing access security and flexible cross-domain needs.",
        "Design a rate limiting mechanism protecting authentication routes from brute-force attempts.",
        "Write an analytical function measuring response payload delivery speeds across pipelines.",
      ],
    },
  ],
  "Full Stack Developer": [
    {
      id: "fs-set-1",
      title: "Set 1: Integrated Pipeline & State Lifecycle",
      questions: [
        "Write an API validation layer mapping database definitions directly onto client forms.",
        "Explain cross-boundary state management anomalies during server component executions.",
        "Implement a unified notification pipeline updating client views over socket instances.",
        "How do you optimize initial page loading metrics in server-rendered applications?",
        "Write a middleware controller reconciling client configurations with database states.",
        "Design a fallback mechanism rendering critical interface elements during database outages.",
        "Implement an asset preloading routine matching predictive user navigation behaviors.",
        "Explain hydration mismatch tracking steps across distinct system rendering tiers.",
        "Write a file upload orchestrator coordinating direct storage engine access links safely.",
        "How do security tokens balance validation security against responsive client rendering?",
        "Implement a unified data loading interface managing parallel endpoint responses.",
        "Write a layout state synchronizer saving user display options onto database tables.",
        "Explain session persistence tracking patterns across varying browser privacy profiles.",
        "Design an request interceptor handling authentication token expirations seamlessly.",
        "Write a validation routine verifying consistent schema formatting between client and server.",
      ],
    },
    {
      id: "fs-set-2",
      title: "Set 2: Full-Stack Code & Data Structures",
      questions: [
        "Write a full-stack algorithm rendering hierarchical tree views from relational arrays.",
        "Explain trade-offs between real-time data streaming and poll-based interface frameworks.",
        "Implement an analytics aggregator translating application tracking logs into dashboard summaries.",
        "How do relational foreign keys protect integrity when multi-stage forms modify datasets?",
        "Write an efficient pagination parser handling dynamic offsets over scaling records.",
        "Design a cache management structure syncing localized browser values with server data.",
        "Implement an optimized search function parsing structured text records on the fly.",
        "Explain performance optimizations for web sockets handling high-frequency telemetry data.",
        "Write a batching mechanism combining rapid interface interactions into singular API requests.",
        "How do you isolate frontend bundle dependencies from backend execution scripts?",
        "Implement a data mapping utility formatting server database dates for client controls.",
        "Write a script measuring processing latencies from initial user tap to database write.",
        "Explain configuration routing strategies managing complex client pathing layouts securely.",
        "Design an input validation suite verifying complex data payloads at edge and base tiers.",
        "Write an export worker generating spreadsheet representations from composite database queries.",
      ],
    },
    {
      id: "fs-set-3",
      title: "Set 3: Distributed Application Deployment",
      questions: [
        "Write a production configuration orchestrating container definitions for app setups.",
        "Explain blue-green release strategies minimizing query conflicts across active databases.",
        "Implement a centralized logging module tracking frontend errors along with backend stacks.",
        "How do Content Delivery Network edge processes alter dynamic asset delivery metrics?",
        "Write an environment configuration switch checking development and production modes.",
        "Design an orchestration setup managing background workers handling text extraction items.",
        "Implement a static generation pipeline incorporating incremental content updates safely.",
        "Explain reverse proxy routing patterns protecting backend application architectures.",
        "Write a configuration script managing secure credential asset mappings inside instances.",
        "How do connection interruptions affect transactional workflows across cloud regions?",
        "Implement a health check metric endpoint reporting instance loads back to load balancers.",
        "Write a roll-back script reverting code steps while protecting saved user records.",
        "Explain optimization techniques minimizing bundle configurations for client asset payloads.",
        "Design an automated testing sequence verifying API paths before production upgrades.",
        "Write an analytical performance reporter summarizing system load spikes across nodes.",
      ],
    },
    {
      id: "fs-set-4",
      title: "Set 4: Advanced Security & Real-Time Data",
      questions: [
        "Write a policy generator configuring strict web security declarations for view contexts.",
        "Explain mitigation methods stopping distributed brute-force queries on private API paths.",
        "Implement a real-time tracking engine broadcasting location arrays onto visual dashboards.",
        "How do cross-origin sharing profiles protect data fields from external script scraping?",
        "Write an absolute session invalidation loop purging tokens from application memory caches.",
        "Design a token creation framework handling multiple permissions for system users.",
        "Implement a signature parser checking request authenticity before system data updates.",
        "Explain safe parsing habits removing suspicious characters from incoming user texts.",
        "Write an audit utility tracking user credential updating sequences over historical tables.",
        "How do state variables stay secure inside client code frameworks using remote data?",
        "Implement an encrypted payload wrapper handling transactional values across processing hops.",
        "Write a verification layer matching user identities against dynamic request records.",
        "Explain single sign-on processing loops bridging third-party login providers safely.",
        "Design a rate management setup monitoring socket link creation frequencies from clients.",
        "Write a clean validation script validating strict input data limits on user profile forms.",
      ],
    },
  ],
  "Data / ML Engineer": [
    {
      id: "ml-set-1",
      title: "Set 1: Data Architecture & Pipeline Processing",
      questions: [
        "Write an aggregation process converting stream events into summarized analytics logs.",
        "Explain chunk allocation optimizations processing files larger than system memory limits.",
        "Implement a sliding-window data calculation tracking moving averages across streams.",
        "How do distributed file storage setups manage data integrity when nodes fail?",
        "Write a schema migration job updating text data properties into relational types.",
        "Design a partitioning setup grouping high-volume events by day and origin locations.",
        "Implement an extraction utility pulling metadata flags from deeply nested document inputs.",
        "Explain optimization approaches speeding up relational join operations on massive tables.",
        "Write an validation filter removing corrupted records from streaming analytical pipelines.",
        "How do file format choices like Parquet improve performance for data analysis tasks?",
        "Implement a backpressure control mechanism managing speed changes between stream tiers.",
        "Write a deduplication routine clearing repeated entries from continuous ingestion feeds.",
        "Explain data serialization differences between textual representations and binary formats.",
        "Design a backfill manager running historical data reprocessing without overloading servers.",
        "Write a tracking module saving processing duration times across distinct data pipeline steps.",
      ],
    },
    {
      id: "ml-set-2",
      title: "Set 2: Model Engineering & Feature Extraction",
      questions: [
        "Write a matrix normalization function scaling numerical input variables from raw files.",
        "Explain mathematical trade-offs when selecting imputation approaches for missing points.",
        "Implement a feature hashing function transforming dynamic string lists into array bounds.",
        "How do vector operations improve execution performance compared to standard looping structures?",
        "Write a dimensional reduction function consolidating redundant data properties cleanly.",
        "Design an automated data splitter isolating records into testing and evaluation splits.",
        "Implement a text tokenizer parsing string items into filtered token frequency lists.",
        "Explain variance tracking methods highlighting feature deviations across separate groups.",
        "Write an outlier extraction algorithm flagging extreme values using statistical bounds.",
        "How do category transformations handle previously unseen text values during production runs?",
        "Implement a custom distance evaluator computing spatial matching across matrix arrays.",
        "Write a sampling routine balancing dataset sizes across uneven categorical groups.",
        "Explain feature interaction generation steps combining distinct parameters into singular blocks.",
        "Design a validation workflow analyzing input feature structures against expected baseline definitions.",
        "Write an evaluation tracking pipeline calculating cross-validation performance indices safely.",
      ],
    },
    {
      id: "ml-set-3",
      title: "Set 3: Production ML Deployment & Scale",
      questions: [
        "Write a inference API function processing prediction parameters via structured arrays.",
        "Explain model representation trade-offs comparing specialized file formats with raw weights.",
        "Implement an evaluation controller tracking input array deviations from reference states.",
        "How do memory allocations alter prediction latency under simultaneous batch inputs?",
        "Write a version control loader swapping model instances without restarting endpoint nodes.",
        "Design an orchestration pipeline scheduling repetitive training processes over remote targets.",
        "Implement a prediction caching layer storing outputs for repetitive structural queries.",
        "Explain system scaling decisions managing heavy real-time text analysis operations.",
        "Write an error routing boundary logging failed calculation inputs for engineering review.",
        "How do container virtualization configurations speed up machine learning environment setup tasks?",
        "Implement a priority processing sequence resolving urgent input validations before log jobs.",
        "Write a profiling script calculating memory footprint metrics during large model initialization.",
        "Explain monitoring adjustments detecting feature changes when external client actions mutate.",
        "Design a fallback mechanism switching to simple rule calculations during service outages.",
        "Write an export script packaging processing setups along with corresponding tracking variables.",
      ],
    },
    {
      id: "ml-set-4",
      title: "Set 4: Analytical Computing & Optimization",
      questions: [
        "Write a custom reduction routine aggregation array metrics without secondary copying blocks.",
        "Explain optimization tactics transforming scalar processing models into vector operations.",
        "Implement a parallel processing controller slicing compute workloads over multi-core machines.",
        "How do memory management processes handle huge data allocations during matrix modifications?",
        "Write an algorithm identifying matching items inside highly dimensional vector fields.",
        "Design an execution monitor tracking calculation step duration profiles inside large jobs.",
        "Implement a sorting function managing massive numeric files using external memory targets.",
        "Explain structural differences between running analytics on row setups vs columnar spaces.",
        "Write an optimization query tracking spatial points falling inside defined geometric limits.",
        "How do worker node coordination structures handle communication failures during complex jobs?",
        "Implement an automated task sequencer arranging compute dependencies based on execution graphs.",
        "Write a script checking memory usage indicators before running heavy operational sweeps.",
        "Explain numerical rounding error vulnerabilities when tracking tiny fractional variables.",
        "Design an access matrix managing analytical query permissions across separate database zones.",
        "Write a code utility tracking pipeline processing data quantities across operational frames.",
      ],
    },
  ],
};

export default function QuestionBank() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // UX State 1: Forces role selection before showing questions
  const [selectedRole, setSelectedRole] = useState(null);

  // UX State 2: Accordion state to toggle exactly one set open at a time
  const [openSetIndex, setOpenSetIndex] = useState(0);

  // UX State 3: Persistent object tracking checked completed questions
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem("mockmate_question_progress");
    return saved ? JSON.parse(saved) : {};
  });

  const [profile] = useState(() => {
    const saved = localStorage.getItem("user_profile");
    return saved
      ? JSON.parse(saved)
      : { name: "Abhishek", goal: "Computer Science Engineer" };
  });

  useEffect(() => {
    localStorage.setItem(
      "mockmate_question_progress",
      JSON.stringify(completedTasks),
    );
  }, [completedTasks]);

  // Check/Uncheck single question handler
  const toggleQuestion = (setId, qIndex) => {
    const key = `${setId}-${qIndex}`;
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex h-screen bg-bg-alt overflow-hidden">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        profile={profile}
      />

      <main className="flex-1 overflow-y-auto min-w-0 bg-[#FBF9F4]">
        {/* Header Block */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#EAE3D2] h-14 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-8 h-8 flex items-center justify-center border border-[#EAE3D2] mr-3"
            >
              <svg
                className="w-4 h-4 text-[#1A1612]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <p className="font-sans font-600 text-[#1A1612] text-[14px]">
              Core Question Bank
            </p>
          </div>
          {selectedRole && (
            <button
              onClick={() => {
                setSelectedRole(null);
                setOpenSetIndex(0);
              }}
              className="font-mono text-[11px] text-[#2E6B3D] hover:underline flex items-center gap-1"
            >
              ← Change Track
            </button>
          )}
        </div>

        {/* CONDITION 1: Onboarding Role Selection Overlay Gate */}
        {!selectedRole ? (
          <div className="max-w-3xl mx-auto px-6 py-16 text-center space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[11px] tracking-widest text-[#2E6B3D] font-600 uppercase">
                CHOOSE YOUR FOCUS
              </span>
              <h1 className="font-serif font-300 text-3xl text-[#1A1612]">
                Select a Specialization Track
              </h1>
              <p className="font-sans text-[13px] text-zinc-500 max-w-md mx-auto font-300">
                To keep your practice completely focused, choose a track to load
                your custom structured 4-set question boards.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
              {Object.keys(DATA_SETS).map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className="bg-white border border-[#EAE3D2] p-5 hover:border-[#2E6B3D] hover:shadow-md transition-all text-left group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-sans font-600 text-[14px] text-[#1A1612] group-hover:text-[#2E6B3D] transition-colors">
                      {role}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 mt-1 uppercase tracking-wider">
                      4 Subsets · 60 Questions Total
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-[#2E6B3D] mt-4 block opacity-0 group-hover:opacity-100 transition-opacity">
                    Load Core Sets →
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* CONDITION 2: Active Question Board View */
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE3D2] pb-5 gap-3">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#2E6B3D] font-600 uppercase">
                  ACTIVE BOARD
                </span>
                <h1 className="font-serif font-300 text-2xl text-[#1A1612] mt-0.5">
                  {selectedRole} Subsets
                </h1>
              </div>
              <p className="font-mono text-[11px] bg-[#E8DFC8]/40 text-[#1A1612] px-3 py-1 font-500 rounded-xs">
                {
                  Object.keys(completedTasks).filter((k) =>
                    k.startsWith(
                      selectedRole === "Frontend Developer"
                        ? "fe"
                        : selectedRole === "Backend Developer"
                          ? "be"
                          : selectedRole === "Full Stack Developer"
                            ? "fs"
                            : "ml",
                    ),
                  ).length
                }{" "}
                / 60 Completed
              </p>
            </div>

            {/* Accordion List Parent Container */}
            <div className="space-y-3">
              {DATA_SETS[selectedRole].map((set, setIdx) => {
                const isOpen = openSetIndex === setIdx;

                // Track checked stats for the specific current map group
                const completedInThisSet = set.questions.filter(
                  (_, qIdx) => completedTasks[`${set.id}-${qIdx}`],
                ).length;
                const completionPercentage = Math.round(
                  (completedInThisSet / set.questions.length) * 100,
                );

                return (
                  <div
                    key={set.id}
                    className="bg-white border border-[#EAE3D2] shadow-xs overflow-hidden transition-all"
                  >
                    {/* Header bar click element */}
                    <button
                      onClick={() => setOpenSetIndex(isOpen ? null : setIdx)}
                      className="w-full px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between text-left hover:bg-[#FBF9F4] transition-colors gap-2"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${completionPercentage === 100 ? "bg-[#2E6B3D]" : "bg-amber-400"}`}
                        />
                        <h3 className="font-sans font-600 text-[14px] text-[#1A1612]">
                          {set.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-[#F2ECE0] rounded-full overflow-hidden hidden sm:block">
                            <div
                              className="h-full bg-[#2E6B3D]"
                              style={{ width: `${completionPercentage}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] text-zinc-500 min-w-[50px] text-right">
                            {completedInThisSet}/{set.questions.length} (
                            {completionPercentage}%)
                          </span>
                        </div>
                        <span className="text-zinc-400 font-mono text-xs">
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </div>
                    </button>

                    {/* Expandable Accordion Body block */}
                    {isOpen && (
                      <div className="border-t border-[#F2ECE0] px-5 py-4 bg-white space-y-1">
                        {set.questions.map((q, qIdx) => {
                          const isDone = !!completedTasks[`${set.id}-${qIdx}`];
                          return (
                            <label
                              key={qIdx}
                              className={`flex items-start gap-3 p-3 rounded-xs cursor-pointer transition-colors group ${
                                isDone ? "bg-[#2E6B3D]/5" : "hover:bg-[#FBF9F4]"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isDone}
                                onChange={() => toggleQuestion(set.id, qIdx)}
                                className="mt-1 w-4 h-4 rounded-sm border-[#EAE3D2] text-[#2E6B3D] focus:ring-[#2E6B3D]"
                              />
                              <div className="text-[13px]">
                                <span className="font-mono text-[10px] text-zinc-400 mr-1.5">
                                  {(qIdx + 1).toString().padStart(2, "0")}.
                                </span>
                                <span
                                  className={`font-sans font-300 leading-relaxed ${isDone ? "text-zinc-400 line-through" : "text-[#1A1612]"}`}
                                >
                                  {q}
                                </span>
                              </div>
                            </label>
                          );
                        })}

                        {/* Interactive conditional dynamic helper footer inside accordion panel */}
                        <div className="mt-4 pt-3 border-t border-[#F2ECE0] flex justify-between items-center">
                          <span className="font-mono text-[10px] text-zinc-400 uppercase">
                            Set Panel Checklist
                          </span>
                          {completionPercentage < 100 ? (
                            <span className="font-mono text-[10px] text-amber-600 font-500">
                              Keep grinding to finish this block! 🔥
                            </span>
                          ) : (
                            <span className="font-mono text-[10px] text-[#2E6B3D] font-600 flex items-center gap-1">
                              🎉 Set fully mastered!
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
