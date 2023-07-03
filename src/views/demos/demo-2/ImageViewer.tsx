import React, { useState, useEffect, useRef } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import styles from './image.module.less';
import classnames from 'classnames';
import Modal from './Modal';

type ICustomProps = {
  onClick: () => void;
  source: string[];
};

interface IImageViewer {
  /** 若为 fileMode=true， 则入参为 string，仅支持单个 PDF 预览 */
  source: string[];
  width?: number;
  height?: number;
  /** 传入的是否为 文件, 默认-为图片模式 */
  fileMode?: boolean;
  /** 自定义组件需要暴露 onClick 方法, 文件路径 souce */
  customCom?: React.ComponentType<ICustomProps>;
  /** 当前的图片 */
  curImage?: string;
}

/**
 * 预览图 + 图片查看弹框
 *
 * @param props
 * @returns
 */
const ImageViewer = (props: IImageViewer) => {
  const {
    source = [],
    width = 64,
    height = 64,
    fileMode = false,
    customCom: CustomComponent,
    curImage,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      // 处理弹框脱出窗口外面出现底部滚动条问题
      document.body.style.overflow = 'hidden';
    } else {
      // 处理弹框脱出窗口外面出现底部滚动条问题
      document.body.style.overflow = 'auto';
    }
  }, [modalVisible]);

  const imageModalProps = {
    onCancel: () => setModalVisible(false),
    source,
    curImage,
    visible: modalVisible,
  };
  // const imageModalProps = {
  //   onCancel: () => setModalVisible(true),
  //   source,
  //   curImage,
  //   visible: modalVisible,
  // }

  

  // 默认组sdfsdf[件
  const ImageComponent = (imgProps: { onClick: () => void; imgSource: string | string[] }) => {
    const { onClick, imgSource } = imgProps;
    const defaultSrc = curImage || imgSource[0];
    const hoverImgRef = useRef<HTMLDivElement | null>(null);
    const [hoverVisible, setHoverVisible] = useState(false);

    useEffect(() => {
      if (!hoverImgRef.current) return;
      const $maskDiv = hoverImgRef.current;
      const mouseOverFn = () => setHoverVisible(true);
      const mouseLeaveFn = () => setHoverVisible(false);
      $maskDiv.addEventListener('mouseover', mouseOverFn);
      $maskDiv.addEventListener('mouseleave', mouseLeaveFn);

      // eslint-disable-next-line consistent-return
      return () => {
        $maskDiv.removeEventListener('mouseover', mouseOverFn);
        $maskDiv.removeEventListener('mouseleave', mouseLeaveFn);
      };
    }, []);
    useEffect(() => {
      if (!hoverImgRef.current) return;
      const $maskDiv = hoverImgRef.current;
      const mouseOverFn = () => setHoverVisible(true);
      const mouseLeaveFn = () => setHoverVisible(false);
      $maskDiv.addEventListener('mour')
    }, [])
    return (
      <div
        ref={hoverImgRef}
        className={styles['img-viewer-wrapper']}
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <img src={defaultSrc} width="100%" height="100%" />
        <div
          className={classnames(styles['hover-tips-mask'], {
            [styles['hover-tips-mask-active']]: hoverVisible,
          })}
        >
          <EyeOutlined className={styles['eye-icon']} />
          <span>预览</span>
        </div>
      </div>
    );
  };

  const FileComponent = (fileProps: { onClick: () => void; file: string[] }) => {
    const { onClick, file } = fileProps;
    return (
      <a
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {file}
      </a>
    );
  };

  if (CustomComponent) {
    return (
      <>
        <CustomComponent onClick={() => setModalVisible(true)} source={source} />
        <Modal {...imageModalProps} />
      </>
    );
  }

  return (
    <>
      {!fileMode ? (
        <ImageComponent onClick={() => setModalVisible(true)} imgSource={source} />
      ) : (
        <FileComponent onClick={() => setModalVisible(true)} file={source as string[]} />
      )}
      <Modal {...imageModalProps} />
    </>
  );
};

export default ImageViewer;
