"use client";

import { useState } from "react";
import StepEmailClient from "@/components/StepEmailClient";
import StepLanding from "@/components/StepLanding";

type Step = "landing" | "simulation";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("landing");

  return currentStep === "landing" ? (
    <StepLanding onStart={() => setCurrentStep("simulation")} />
  ) : (
    <StepEmailClient onExit={() => setCurrentStep("landing")} />
  );
}
