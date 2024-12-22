import { copyToClipBoard } from '@src/common/copy-to-clipboard';
import Icon from '@src/components/Icon';
import useWindowSize from '@src/hooks/useWindowSize';
import { useGlobalStore } from '@src/store/globalStore';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';

import css from './index.module.less';

export const MessageModal = () => {
  const { isMobile } = useWindowSize();
  const { state, action } = useGlobalStore(s => s);
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    if (state.message) {
      const id = setTimeout(() => {
        action.update({ message: null });
      }, 5000);
      return () => clearTimeout(id);
    }
  }, [state.message, action]);

  return (
    <>
      <Modal
        open={!!state.message && !isShow}
        onCancel={() => {
          action.update({ message: null });
        }}
        footer={false}
        closable={false}
        maskClosable={false}
        className={css.tip}
        mask={false}
        width={340}
      >
        <Icon wrapClassName={css.close} name="Close_XL" onClick={() => action.update({ message: null })} />
        <div className={css.main} onClick={() => setShow(true)}>
          <Icon wrapClassName={css.icon} name="error" />
          <div>
            <div className={css.title}>An error occurred</div>
            <div className={css.content}>{state.message?.content}</div>
          </div>
        </div>
      </Modal>
      <Modal
        open={!!state.message && isShow}
        onCancel={() => {
          setShow(false);
          action.update({ message: null });
        }}
        footer={false}
        closable={false}
        maskClosable={false}
        centered
        className={css.message}
      >
        <div className={css.main}>
          <div className={css.title}>
            <div>
              <Icon wrapClassName={css.icon} name="error" />
              <div className={css.txt}>An error occurred</div>
            </div>
            <Icon
              wrapClassName={css.close}
              name="Close_XL"
              onClick={() => {
                setShow(false);
                action.update({ message: null });
              }}
            />
          </div>
          <div className={css.content} onClick={() => (state.message ? copyToClipBoard(state.message.content) : null)}>
            <div>{state.message?.content}</div>
          </div>
          <div className={css.tip}>
            <div className={css.txt}>* Copy and submit to the technical staff.</div>
            <Icon wrapClassName={css.icon} name="copy" onClick={() => (state.message ? copyToClipBoard(state.message.content) : null)} />
          </div>
        </div>
      </Modal>
    </>
  );
};
