"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CheckIcon,
  ArrowLeftIcon,
  MessageCircleIcon,
  Globe2Icon,
  SmartphoneIcon,
  DatabaseIcon,
  RocketIcon,
  type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { serviceTypeValues, buildLineMessageUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const serviceIcons: LucideIcon[] = [Globe2Icon, SmartphoneIcon, DatabaseIcon, RocketIcon];

type QuestionKey = "service" | "budget" | "timeline";
type Answers = Record<QuestionKey, number | null>;
type Option = { label: string; icon?: LucideIcon };

export function BriefWizard() {
  const t = useTranslations("wizard");
  const tServices = useTranslations("services");
  const serviceItems = tServices.raw("items") as { title: string; description: string }[];
  const budgetOptions = t.raw("budgetOptions") as string[];
  const timelineOptions = t.raw("timelineOptions") as string[];

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({ service: null, budget: null, timeline: null });
  const shouldReduceMotion = useReducedMotion();

  const questions: { key: QuestionKey; question: string; options: Option[] }[] = [
    {
      key: "service",
      question: t("questionService"),
      options: serviceItems.map((s, i) => ({
        label: s.title,
        icon: serviceIcons[i],
      })),
    },
    {
      key: "budget",
      question: t("questionBudget"),
      options: budgetOptions.map((label) => ({ label })),
    },
    {
      key: "timeline",
      question: t("questionTimeline"),
      options: timelineOptions.map((label) => ({ label })),
    },
  ];

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setStep(next);
  }

  function selectAnswer(key: QuestionKey, index: number) {
    setAnswers((a) => ({ ...a, [key]: index }));
    window.setTimeout(() => goTo(Math.min(step + 1, 3), 1), 320);
  }

  function restart() {
    setAnswers({ service: null, budget: null, timeline: null });
    goTo(0, -1);
  }

  const lineMessage =
    answers.service === null || answers.budget === null || answers.timeline === null
      ? ""
      : [
          t("messageGreeting"),
          "",
          `${t("messageService")}: ${serviceItems[answers.service]?.title}`,
          `${t("messageBudget")}: ${budgetOptions[answers.budget]}`,
          `${t("messageTimeline")}: ${timelineOptions[answers.timeline]}`,
        ].join("\n");

  const lineUrl = lineMessage ? buildLineMessageUrl(lineMessage) : undefined;

  function handleLineClick() {
    if (answers.service === null || answers.budget === null || answers.timeline === null) return;
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: serviceTypeValues[answers.service],
        budget: budgetOptions[answers.budget],
        timeline: timelineOptions[answers.timeline],
      }),
    }).catch(() => {});
  }

  const variants = {
    enter: (dir: number) =>
      shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? 32 : -32 },
    center: { opacity: 1, x: 0 },
    exit: (dir: number) =>
      shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: dir > 0 ? -32 : 32 },
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        {questions.map((q, i) => {
          const reached = answers[q.key] !== null || i === step;
          const filled = i <= step || step === 3;
          return (
            <button
              key={q.key}
              type="button"
              disabled={!reached}
              aria-label={`Step ${i + 1}`}
              onClick={() => reached && goTo(i, i > step ? 1 : -1)}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                filled ? "bg-primary" : "bg-border",
                reached && "cursor-pointer",
              )}
            />
          );
        })}
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {step < 3 ? (
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 flex h-5 items-center justify-between">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => goTo(step - 1, -1)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeftIcon className="size-3.5" />
                    {t("back")}
                  </button>
                ) : (
                  <span />
                )}
                <span className="font-mono text-[11px] text-muted-foreground">{step + 1}/3</span>
              </div>
              <h3 className="text-xl font-semibold">{questions[step].question}</h3>
              <div className="mt-4 grid gap-2.5">
                {questions[step].options.map((opt, i) => {
                  const Icon = opt.icon;
                  const selected = answers[questions[step].key] === i;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => selectAnswer(questions[step].key, i)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl border p-4 text-left transition-colors",
                        selected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      {Icon && <Icon className="size-5 shrink-0 text-accent" />}
                      <span className="flex-1 text-[15px] font-medium">{opt.label}</span>
                      {selected && <CheckIcon className="size-5 shrink-0 text-primary" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="review"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-xl font-semibold">{t("reviewHeading")}</h3>

              <div className="mt-4 flex flex-col divide-y divide-border rounded-xl border border-border">
                {[
                  { label: t("reviewService"), value: serviceItems[answers.service ?? 0]?.title },
                  { label: t("reviewBudget"), value: budgetOptions[answers.budget ?? 0] },
                  { label: t("reviewTimeline"), value: timelineOptions[answers.timeline ?? 0] },
                ].map((row, i) => (
                  <div key={row.label} className="flex items-center justify-between gap-3 p-4">
                    <div>
                      <p className="font-mono text-[10.5px] uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </p>
                      <p className="text-[15px] font-medium">{row.value}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => goTo(i, -1)}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      {t("edit")}
                    </button>
                  </div>
                ))}
              </div>

              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLineClick}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-6 h-16 w-full gap-2.5 rounded-xl text-base font-semibold",
                )}
              >
                <MessageCircleIcon className="size-5" />
                {t("lineCta")}
              </a>
              <button
                type="button"
                onClick={restart}
                className="mt-3 w-full text-center text-xs text-muted-foreground hover:text-foreground"
              >
                {t("restart")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
