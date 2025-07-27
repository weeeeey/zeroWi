import ModalProvider from './modal-provider';
import TanstackQueryProvider from './tanstack-query-provider';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TanstackQueryProvider>
      <ModalProvider />
      {children}
    </TanstackQueryProvider>
  );
}

export default Provider;
