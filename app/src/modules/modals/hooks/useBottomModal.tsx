import React from 'react';
import Modal, { Direction, ModalProps } from 'react-native-modal';
import styled from 'styled-components/native';

import { ModalName, ModalsList } from './useBottomModal.utils';

type ContentProps = Record<string, unknown> | undefined;
type ModalConfig = Partial<ModalProps> | undefined;

type OpenBottomModal = (
  modalName: ModalName,
  contentProps?: ContentProps,
  modalConfig?: ModalConfig,
) => void;

type ModalContext = {
  open: boolean;
  closeBottomModal: () => void;
  openBottomModal: OpenBottomModal;
};

const ModalContext = React.createContext<ModalContext>({
  open: false,
  closeBottomModal: () => null,
  openBottomModal: () => null,
});

export const BottomModalProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [open, setOpen] = React.useState(false);

  const name = React.useRef<ModalName | undefined>();
  const props = React.useRef<ContentProps>();
  const config = React.useRef<ModalConfig>();

  const Content:
    | ((props: any) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }> = name.current ? ModalsList[name.current] : React.Fragment;

  const closeBottomModal = () => setOpen(false);
  const openBottomModal: OpenBottomModal = (
    modalName,
    contentProps,
    modalConfig,
  ) => {
    name.current = modalName;
    props.current = contentProps;
    config.current = modalConfig;
    setOpen(true);
  };
  const onModalHide = () => {
    config?.current?.onModalHide && config?.current?.onModalHide();
    name.current = undefined;
    props.current = undefined;
    config.current = undefined;
  };

  const value = React.useMemo(
    () => ({open, openBottomModal, closeBottomModal}),
    [open],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Container
        {...{
          ...config.current,
          isVisible: open,
          swipeDirection: 'down' as Direction,
          onSwipeComplete: closeBottomModal,
          onBackdropPress: closeBottomModal,
          propagateSwipe: true,
          onModalHide,
        }}>
        {/* Important: Don't set {flex:1} on modal child component,
        as that seems to overwrite the touch trigger on modal backdrop. */}
        <Content {...props.current} />
      </Container>
    </ModalContext.Provider>
  );
};

export const useBottomModalProvider = (): ModalContext => {
  const context = React.useContext(ModalContext);

  if (context === null) {
    throw Error('Use this hook in useBottomModalProvider scope');
  }

  return context;
};

const Container = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
  padding: 0;
`;
