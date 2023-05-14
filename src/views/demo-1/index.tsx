import React, { useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';
import img1 from '../demo-2/img-1.png'
import img2 from '../demo-2/img-2.png'
import img3 from '../demo-2/img-3.png'

import styles from './index.module.less'

const Index: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  const draggleRef = useRef<HTMLDivElement>(null);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <div className={styles['demo-1-container']}>
      <Button onClick={showModal}>Open Draggable Modal</Button>
      <div id="modal-container"></div>
      <Modal
        getContainer="#modal-container"
        mask={false}
        title={
          <div
            style={{
              width: '100%',
              cursor: 'move',
              border: '1px solid red',
              padding: '16px 16px'
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            拖拽句柄区域
          </div>
        }
        open={open}
        // onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <p>
          Just don&apos;t learn physics at school and your life will be full of magic and miracles.
        </p>
        <br />
        <p>Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.</p>
        <img src={img1} alt="img1" />
      </Modal>
    </div>
  );
};

export default Index;