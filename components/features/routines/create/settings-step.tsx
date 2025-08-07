'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { routineSchema } from '@/lib/routines/zod-schema';
import { RoutineDifficulty } from '@prisma/client';
import { useCallback, useLayoutEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface RoutineSettingsStepProps {
  form: UseFormReturn<z.infer<typeof routineSchema>>;
}

const DIFFICULTY: RoutineDifficulty[] = ['초보자', '중급자', '숙련자'];

export default function RoutineSettingsStep({ form }: RoutineSettingsStepProps) {
  const watchIsPublic = form.watch('isPublic');
  const watchDifficulty = form.watch('difficulty');
  const handleChangeDifficult = useCallback(
    (value: RoutineDifficulty | undefined) => {
      form.setValue('difficulty', value);
    },
    [form]
  );

  useLayoutEffect(() => {
    if (watchIsPublic === false) {
      handleChangeDifficult(undefined);
    } else {
      handleChangeDifficult('중급자');
    }
  }, [watchIsPublic, handleChangeDifficult]);

  return (
    <div className="w-full flex-shrink-0">
      <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">루틴 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white px-4">
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-1">
                <Label className="text-base font-semibold text-gray-900">공개 루틴</Label>
                <p className="text-sm text-gray-600">다른 사용자들과 루틴을 공유합니다</p>
              </div>
              <Switch
                checked={form.watch('isPublic')}
                onCheckedChange={(checked) => form.setValue('isPublic', checked)}
              />
            </div>
            <ul
              className={`flex origin-top items-center justify-between gap-x-2 overflow-hidden pt-2 pb-4 transition-all *:flex-1 ${watchIsPublic ? 'h-full scale-y-100' : 'h-0 scale-y-0'}`}
            >
              {DIFFICULTY.map((value) => (
                <Button
                  type="button"
                  key={value}
                  onClick={() => watchDifficulty !== value && handleChangeDifficult(value)}
                  variant={value === watchDifficulty ? 'default' : 'outline'}
                >
                  {value}
                </Button>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">루틴 설명 (선택사항)</Label>
            <Textarea
              id="description"
              placeholder="이 루틴에 대한 설명을 작성해보세요..."
              rows={4}
              {...form.register('description')}
              className="resize-none border-gray-200 bg-white"
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            size="lg"
          >
            루틴 생성하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
