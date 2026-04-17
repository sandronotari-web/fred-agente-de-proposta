'use client';

import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          
          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-0">
              <button
                type="button"
                onClick={() => onStepClick?.(step.id)}
                disabled={!isCompleted && !isCurrent}
                className={cn(
                  'flex items-center gap-3 transition-colors',
                  (isCompleted || isCurrent) ? 'cursor-pointer' : 'cursor-not-allowed'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    isCompleted && 'bg-success text-white',
                    isCurrent && 'bg-primary-600 text-white',
                    !isCompleted && !isCurrent && 'bg-slate-200 text-slate-500'
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className={cn(
                    'text-sm font-medium',
                    isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
              </button>
              
              {index < steps.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-4',
                  isCompleted ? 'bg-success' : 'bg-slate-200'
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}