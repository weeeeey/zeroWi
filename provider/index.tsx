import ModalProvider from './modal-provider';

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ModalProvider />
      {children}
    </>
  );
}

export default Provider;
