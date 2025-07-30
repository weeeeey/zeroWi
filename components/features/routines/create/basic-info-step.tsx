import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRoutineType, RoutineFormData } from '@/lib/routines/zod-schema';
import { UseFormReturn } from 'react-hook-form';

import { ExerciseDevideSelector } from './exercise-devide-selector';
import { RoutineTypeSelector } from './routine-type-selector';
import { WeekPeriodSelector } from './week-period-selector';

interface BasicInfoStepProps {
  form: UseFormReturn<RoutineFormData>;
}

export const BasicInfoStep = ({ form }: BasicInfoStepProps) => {
  const watchedType = form.watch('type');
  const watchedWeeks = form.watch('weeks');
  const watchedDevide = form.watch('exerciseDevide');

  const handleTypeChange = (type: CreateRoutineType) => {
    if (watchedType === type) return;
    if (watchedType === 'single') {
      form.setValue('weeks', 1);
      form.setValue('exerciseDevide', '무분할');
    } else {
      form.setValue('weeks', undefined);
      form.setValue('exerciseDevide', undefined);
    }
    form.setValue('type', type);
  };

  return (
    <div className="w-full flex-shrink-0">
      <Card className="mb-6 border-0 bg-white/80 pb-14 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">루틴 기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">루틴 이름</Label>
            <Input
              id="name"
              placeholder="예: 상체 집중 루틴"
              {...form.register('name')}
              className="border-gray-200 bg-white"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <RoutineTypeSelector value={watchedType} onChange={(type) => handleTypeChange(type)} />

          <div
            className={`origin-top space-y-3 transition-all ${
              watchedType === 'multi' ? 'scale-y-full h-full' : 'h-0 scale-y-0'
            }`}
          >
            <WeekPeriodSelector
              value={watchedWeeks}
              onChange={(weeks) => form.setValue('weeks', weeks)}
            />
            <ExerciseDevideSelector
              value={watchedDevide}
              onChange={(devide) => form.setValue('exerciseDevide', devide)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
