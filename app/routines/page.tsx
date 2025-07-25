async function RoutinesPage({ searchParams }: { searchParams: Promise<{ mine: boolean }> }) {
  const { mine } = await searchParams;

  return <div>RoutinesPage</div>;
}

export default RoutinesPage;
