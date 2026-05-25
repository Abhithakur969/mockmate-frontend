import { useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import QuestionCard from "../components/QuestionCard";
import AnswerForm from "../components/AnswerForm";
import GradeResult from "../components/GradeResult";
import LoadingGrader from "../components/LoadingGrader";
import { getRandomQuestion } from "../data/questions";
import { gradeAnswer } from "../api/grade";

const S = {
  SELECT: "select",
  QUESTION: "question",
  GRADING: "grading",
  RESULT: "result",
};

export default function Practice() {
  const location = useLocation();
  const preselected = location.state?.role || null;

  const [stage, setStage] = useState(preselected ? S.QUESTION : S.SELECT);
  const [role, setRole] = useState(preselected || "");
  const [q, setQ] = useState(
    preselected ? getRandomQuestion(preselected) : null,
  );
  const [qNum, setQNum] = useState(1);
  const [ans, setAns] = useState("");
  const [grade, setGrade] = useState(null);
  const [err, setErr] = useState("");
  const [count, setCount] = useState(0);

  const pickRole = useCallback((r) => {
    setRole(r);
    setQ(getRandomQuestion(r));
    setQNum(1);
    setGrade(null);
    setErr("");
    setAns("");
    setStage(S.QUESTION);
  }, []);

  const submit = useCallback(
    async (answer) => {
      setAns(answer);
      setErr("");
      setStage(S.GRADING);
      try {
        // 👈 FIXED: Changed q.q to q.question to match your data structure perfectly
        const result = await gradeAnswer({
          question: q.question,
          answer,
          role,
        });
        setGrade(result);
        setCount((c) => c + 1);
        setStage(S.RESULT);
      } catch (e) {
        setErr(
          e.response?.data?.error ||
            e.message ||
            "Something went wrong. Please try again.",
        );
        setStage(S.QUESTION);
      }
    },
    [q, role],
  );

  const next = useCallback(() => {
    setQ(getRandomQuestion(role, q?.id));
    setQNum((n) => n + 1);
    setGrade(null);
    setErr("");
    setAns("");
    setStage(S.QUESTION);
  }, [role, q]);

  const retry = () => {
    setGrade(null);
    setErr("");
    setAns("");
    setStage(S.QUESTION);
  };

  const changeRole = () => {
    setStage(S.SELECT);
    setRole("");
    setGrade(null);
    setErr("");
    setAns("");
  };

  return (
    <div className="min-h-screen bg-bg">
      {/* Minimal nav bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto h-full px-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div
              className="w-6 h-6 border border-accent flex items-center justify-center
                         group-hover:bg-accent transition-all duration-200 shrink-0"
            >
              <span
                className="font-serif italic text-accent group-hover:text-bg
                           text-sm leading-none transition-colors font-light"
              >
                M
              </span>
            </div>
            <span
              className="font-sans font-semibold text-[12px] tracking-[0.18em] text-ink
                         group-hover:text-accent transition-colors"
            >
              MOCKMATE
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {role && stage !== S.SELECT && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-ink-mute tracking-widest hidden sm:block">
                  {count} graded
                </span>
              </div>
            )}
            <Link
              to="/dashboard"
              className="font-mono text-[10px] text-ink-mute hover:text-accent
                         transition-colors tracking-widest"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 py-10">
        {/* Role badge when active */}
        {role && stage !== S.SELECT && (
          <div className="anim-fade-in flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 bg-accent-bg border border-accent-s px-3 py-1.5">
              <span className="font-mono text-[10px] text-accent tracking-widest">
                {role}
              </span>
            </div>
            <button
              onClick={changeRole}
              className="font-mono text-[10px] text-ink-mute hover:text-accent
                         transition-colors tracking-widest"
            >
              Change role
            </button>
          </div>
        )}

        {stage === S.SELECT && <RoleSelector onSelect={pickRole} />}

        {stage === S.QUESTION && q && (
          <>
            <QuestionCard question={q} role={role} qNum={qNum} />
            <AnswerForm
              onSubmit={submit}
              onSkip={next}
              onChangeRole={changeRole}
              isLoading={false}
              error={err}
            />
          </>
        )}

        {stage === S.GRADING && <LoadingGrader />}

        {stage === S.RESULT && grade && (
          <GradeResult
            grade={grade}
            answer={ans}
            onNext={next}
            onRetry={retry}
            onChangeRole={changeRole}
          />
        )}
      </div>
    </div>
  );
}
