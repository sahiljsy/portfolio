"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Step =
  | { kind: "user"; text: string }
  | { kind: "agent"; label: string; detail: string }
  | { kind: "tool"; label: string; detail: string }
  | { kind: "gate"; label: string; detail: string }
  | { kind: "answer"; text: string }
  | { kind: "approval"; text: string };

// An illustrative run of the kind of agent system I build. Not real customer data.
const STEPS: Step[] = [
  { kind: "user", text: "Why did our Meta CPA jump last week?" },
  { kind: "agent", label: "orchestrator", detail: "planned 3 steps" },
  { kind: "tool", label: "get_current_date", detail: "last 7 days resolved" },
  { kind: "agent", label: "hand-off", detail: "meta_ads_agent" },
  { kind: "tool", label: "meta_ads.get_insights", detail: "7 days, by ad set" },
  { kind: "gate", label: "context gate", detail: "2 large outputs summarised, IDs kept" },
  { kind: "tool", label: "run_python", detail: "week-over-week diff in sandbox" },
  {
    kind: "answer",
    text: "CPA rose mainly on two ad sets where frequency climbed and click-through fell. Want me to draft a creative refresh for those two?",
  },
  { kind: "approval", text: "Draft refresh plan" },
];

const STEP_MS = 700;
const CHAR_MS = 18;

export default function AgentTrace() {
  const [shown, setShown] = useState(0);
  const [chars, setChars] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback(() => {
    clear();
    setDone(false);
    setChars(0);
    setShown(0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const answer = STEPS.find((s) => s.kind === "answer") as { text: string };
    if (reduce) {
      setShown(STEPS.length);
      setChars(answer.text.length);
      setDone(true);
      return;
    }
    let at = 500;
    STEPS.forEach((step, i) => {
      timers.current.push(window.setTimeout(() => setShown(i + 1), at));
      if (step.kind === "answer") {
        for (let c = 1; c <= step.text.length; c++) {
          timers.current.push(window.setTimeout(() => setChars(c), at + c * CHAR_MS));
        }
        at += step.text.length * CHAR_MS + 400;
      } else {
        at += STEP_MS;
      }
    });
    timers.current.push(window.setTimeout(() => setDone(true), at));
  }, []);

  useEffect(() => {
    play();
    return clear;
  }, [play]);

  return (
    <div className="trace" aria-label="Illustrative agent run">
      <div className="trace-head">
        <span className={`trace-status ${done ? "is-done" : ""}`}>{done ? "Run complete" : "Streaming"}</span>
        <span className="trace-note">Illustrative run</span>
      </div>
      <ol className="trace-body" aria-live="off">
        {STEPS.slice(0, shown).map((step, i) => {
          switch (step.kind) {
            case "user":
              return (
                <li key={i} className="t-user">
                  {step.text}
                </li>
              );
            case "answer":
              return (
                <li key={i} className="t-answer">
                  {step.text.slice(0, chars)}
                  {chars < step.text.length && <span className="caret" />}
                </li>
              );
            case "approval":
              return (
                <li key={i} className="t-approval">
                  <span className="t-chip is-primary">{step.text}</span>
                  <span className="t-chip">Skip</span>
                  <span className="t-hint">waiting for your approval</span>
                </li>
              );
            default:
              return (
                <li key={i} className={`t-step t-${step.kind}`}>
                  <span className="t-label">{step.label}</span>
                  <span className="t-detail">{step.detail}</span>
                </li>
              );
          }
        })}
      </ol>
      <button type="button" className="trace-replay" onClick={play} disabled={!done}>
        Replay
      </button>
    </div>
  );
}
