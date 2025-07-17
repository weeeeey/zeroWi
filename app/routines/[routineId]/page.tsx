interface RoutineDetailPageProps {
  params: Promise<{
    routineId: string;
  }>;
}

async function RoutineDetailPage({ params }: RoutineDetailPageProps) {
  const { routineId } = await params;
  return <div>RoutineDetailPage</div>;
}

export default RoutineDetailPage;
