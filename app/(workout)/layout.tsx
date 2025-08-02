function RecordLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-(--max-width) min-w-(--min-width) flex-col outline-1">
      <div className="flex-1 bg-slate-100">{children}</div>
    </div>
  );
}

export default RecordLayout;
