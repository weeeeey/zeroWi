'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useModal } from '@/hooks/use-modal';
import { routineSchema } from '@/lib/routines/zod-schema';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface RoutineSettingsStepProps {
  form: UseFormReturn<z.infer<typeof routineSchema>>;
}

export default function RoutineSettingsStep({ form }: RoutineSettingsStepProps) {
  const { onOpen } = useModal();

  return (
    <div className="w-full flex-shrink-0">
      <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-center text-gray-900">루틴 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
            <div className="space-y-1">
              <Label className="text-base font-semibold text-gray-900">공개 루틴</Label>
              <p className="text-sm text-gray-600">다른 사용자들과 루틴을 공유합니다</p>
            </div>
            <Switch
              checked={form.watch('isPublic')}
              onCheckedChange={(checked) => form.setValue('isPublic', checked)}
            />
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
            type="button"
            onClick={() => onOpen('CREATOR_CONFIRM')}
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
