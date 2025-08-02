import { AlertModal } from '@/components/modal/alert-modal';
import { AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';

interface AlertConfigProps {
  title: string;
  description: string;
}
const ALERT_CONFIG_STAGES: Record<number, AlertConfigProps> = {
  1: {
    title: '루틴의 이름을 입력해주세요',
    description: '한글자 이상으로 지어주세요.',
  },
  2: {
    title: '운동을 등록하지 않은 날이 존재해요',
    description: '등록하지 않는 경우 휴식 데이로 지정 돼요.',
  },
  3: {
    title: '빈',
    description: '내용.',
  },
};

function CreateAlertModal({
  currentStage,
  isOpen,
  onClose,
  moveNextSteop,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentStage: number;
  moveNextSteop: () => void;
}) {
  const { title, description } = ALERT_CONFIG_STAGES[currentStage];

  if (!ActionNode) return null;
  return (
    <AlertModal title={title} description={description} isOpen={isOpen} onClose={onClose}>
      <ActionNode currentStage={currentStage} moveNextStep={moveNextSteop} />
    </AlertModal>
  );
}

function ActionNode({
  currentStage,
  moveNextStep,
}: {
  currentStage: number;
  moveNextStep: () => void;
}) {
  switch (currentStage) {
    case 1: {
      return <AlertDialogAction>확인</AlertDialogAction>;
    }
    case 2: {
      return (
        <div className="flex items-center gap-x-2 *:flex-1">
          <AlertDialogCancel>돌아가기</AlertDialogCancel>
          <AlertDialogAction onClick={moveNextStep}>다음</AlertDialogAction>
        </div>
      );
    }
    default:
      return <AlertDialogAction>확인</AlertDialogAction>;
  }
}

export default CreateAlertModal;
