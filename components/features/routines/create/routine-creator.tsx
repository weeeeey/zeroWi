'use client';

import { Badge } from '@/components/ui/badge';
import { useRoutineCreator } from '@/hooks/use-routine-creator';

import { BasicInfoStep } from './basic-info-step';
import { ExerciseCompositionStep } from './exercise-composition-step';
import { ProgressBar } from './progress-bar';
import { RoutineSettingsStep } from './routine-settings-step';
import { StepNavigation } from './step-navigation';

const TOTAL_STEPS = 3;

export default function RoutineCreator() {
  const {
    form,
    currentStep,
    selectedWeek,
    selectedDay,
    exercises,
    watchedType,
    watchedWeeks,
    setSelectedWeek,
    setSelectedDay,
    addExercise,
    removeExercise,
    updateExerciseSet,
    getCurrentExercises,
    nextStep,
    prevStep,
    onSubmit,
  } = useRoutineCreator();

  return (
    <div className="container space-y-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">루틴 생성</h1>
        <Badge variant="outline" className="bg-white">
          {currentStep}/{TOTAL_STEPS} 단계
        </Badge>
      </div>

      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Navigation Buttons */}
      <StepNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onPrevious={prevStep}
        onNext={nextStep}
      />

      {/* Steps Container */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
          >
            {/* Step 1: Basic Info */}
            <BasicInfoStep form={form} />

            {/* Step 2: Exercise Composition */}
            <ExerciseCompositionStep
              routineType={watchedType}
              totalWeeks={watchedWeeks}
              selectedWeek={selectedWeek}
              selectedDay={selectedDay}
              exercises={exercises}
              onWeekChange={setSelectedWeek}
              onDayChange={setSelectedDay}
              onExerciseAdd={addExercise}
              onExerciseRemove={removeExercise}
              onExerciseSetUpdate={updateExerciseSet}
              getCurrentExercises={getCurrentExercises}
            />

            {/* Step 3: Routine Settings */}
            <RoutineSettingsStep form={form} />
          </div>
        </div>
      </form>
    </div>
  );
}
