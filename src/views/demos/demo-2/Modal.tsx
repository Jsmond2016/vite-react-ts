import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Rnd } from 'react-rnd';
import {
  RotateLeftOutlined,
  RotateRightOutlined,
  CloseOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styles from './image.module.less';
import classnames from 'classnames';

interface IOperationBar {
  onRotate: (type: '1' | '-1') => void;
  onZoom: (type: '1' | '-1') => void;
  onClose: () => void;
  /** 是否可以放大 */
  enableZoomIn: boolean;
  /** 是否可以缩小 */
  enableZoomOut: boolean;
  /** 是否是文件 */
  isFile?: boolean;
  /** 是否需要还原 */
  enableReset: boolean;
  /** 还原图片比例和位置  */
  onReset: () => void;
}

const OperationBar = (props: IOperationBar) => {
  const {
    onRotate,
    onZoom,
    onClose,
    enableZoomIn,
    enableZoomOut,
    isFile = false,
    enableReset,
    onReset,
  } = props;
  return (
    <div className={styles['operation-bar']}>
      <div
        className={classnames(styles['modal-header-right'], {
          [styles['modal-header-right-file']]: isFile,
        })}
      >
        <CloseOutlined onClick={() => onClose()} className={styles['operate-icon']} />
        {!isFile && (
          <>
            <ZoomInOutlined
              onClick={() => enableZoomIn && onZoom('1')}
              className={classnames(styles['operate-icon'], {
                [styles['operate-icon-disabled']]: !enableZoomIn,
              })}
            />
            <ZoomOutOutlined
              onClick={() => enableZoomOut && onZoom('-1')}
              className={classnames(styles['operate-icon'], {
                [styles['operate-icon-disabled']]: !enableZoomOut,
              })}
            />
            <RotateRightOutlined onClick={() => onRotate('1')} className={styles['operate-icon']} />
            <RotateLeftOutlined onClick={() => onRotate('-1')} className={styles['operate-icon']} />
            <div
              className={classnames(styles['operate-reset'], {
                [styles['operate-reset-disabled']]: !enableReset,
              })}
              onClick={() => enableReset && onReset()}
            >
              <span>1:1</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface IImageModal {
  source: string[];
  visible: boolean;
  onCancel: () => void;
  clickAwayClose?: boolean;
  curImage?: string;
}

const KEY_CODE = {
  ESC: 13,
  LEFT: 37,
  RIGHT: 39,
};

/**
 * github react-rnd: https://github.com/bokuweb/react-rnd
 * doc: https://bokuweb.github.io/react-rnd/stories/?path=/story/*
 * eg: https://codesandbox.io/s/my4kjly94x?file=/src/index.js
 *
 * @returns <Rnd />
 */
const ImageModal = (props: IImageModal) => {
  const { source, curImage, visible = false, onCancel, clickAwayClose = true } = props;
  const modalMinSize = useRef({
    width: 560,
    height: window.innerHeight,
  });

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const defaultSizeAndPos = useRef({
    x: position.x,
    y: position.y,
    width: 0,
    height: 0,
  });

  const rndRef = useRef<Rnd | null>(null);
  const imgDomRef = useRef<HTMLImageElement | null>(null);
  const imgWrapperRef = useRef<HTMLDivElement | null>(null);
  const imgOutBoxRef = useRef<HTMLDivElement | null>(null);
  const imgPreWrapper = useRef<HTMLDivElement | null>(null);
  const headerDragRef = useRef<HTMLDivElement | null>(null);

  const [enableZoom, setEnableZoom] = useState({
    /** 是否可以放大--10倍 */
    enableZoomIn: true,
    /** 是否可以缩小-最小到 0.2 */
    enableZoomOut: true,
  });
  const [curFile, setCurFile] = useState(curImage || source[0]);
  const [enableReset, setEnableReset] = useState(false);
  const [curScale, setCurScale] = useState(1);
  const [scaleTipsVisible, setScaleTipsVisible] = useState(false);
  const [isDisabledDragging, setDragging] = useState(true);
  const [isOnImg, setIsOnImg] = useState(false);
  const [imgPos, setImgPos] = useState<null | number[]>(null);
  const [imgDragging, setImgDragging] = useState(false);
  const [isFileDrag, setFileDragMode] = useState(true);

  const isPDF = (curFile || '').includes('.pdf');
  if (isPDF) {
    modalMinSize.current.width = 860;
  }

  const getTransformInfo = (dom: HTMLImageElement | HTMLDivElement | HTMLElement) => {
    // 正则-放大缩小的数值
    const scalePattern = /scale\(([1-9]|[0-9]*(\.[0-9]{1,2})?)\)/;
    // 正则-旋转角度的正则
    // eslint-disable-next-line no-useless-escape
    const rotatePattern = /rotate\((\-?\d+)deg\)/;
    // 正则-图片偏移x, y 的正则
    const offsetPatt =
      // eslint-disable-next-line no-useless-escape
      /translate\(((\-|\+)?\d+(\.\d+)?)px\, ((\-|\+)?\d+(\.\d+)?)px\)/;
    const transformStr = dom.style.transform;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_1, rotateNum] = transformStr.match(rotatePattern) || ['', '0'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_2, scaleNum] = transformStr.match(scalePattern) || ['', '1'];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_3, offsetX, _4, _5, offsetY] = transformStr.match(offsetPatt) || ['', '0', '', '0', ''];
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { width, height } = window.getComputedStyle(dom);
    return {
      rotateNum: Number(rotateNum),
      scaleNum: Number(scaleNum),
      translateX: Number(offsetX),
      translateY: Number(offsetY),
      scalePattern,
      rotatePattern,
      offsetPatt,
      width: Number(width.slice(0, -2)),
      height: Number(height.slice(0, -2)),
    };
  };

  const isChanged = useCallback(() => {
    const $imgWrapper = imgWrapperRef.current;
    const $img = imgDomRef.current;
    if (!$imgWrapper || !$img) return false;
    const { scaleNum, rotateNum } = getTransformInfo($img);
    const { translateX, translateY } = getTransformInfo($imgWrapper);
    if (scaleNum !== 1 || [rotateNum, translateX, translateY].some((item) => item !== 0)) {
      return true;
    }
    return false;
  }, []);

  const showScaleTips = useCallback((total: number) => {
    setCurScale(total);
    setScaleTipsVisible(true);
    const timer = setTimeout(() => {
      setScaleTipsVisible(false);
      clearTimeout(timer);
    }, 600);
  }, []);

  /**
   * 图片旋转
   *
   * @param type 1-顺时针 -1-逆时针
   */
  const handleRotate = (type: '1' | '-1') => {
    const numToMap = {
      '1': 90,
      '-1': -90,
    };
    const imgDom = imgDomRef.current;
    if (imgDom) {
      const { rotateNum: rotate, scaleNum: scale } = getTransformInfo(imgDom);
      const rotateTotal = (rotate + numToMap[type]) % 360;
      imgDom.style.transform = `rotate(${rotateTotal}deg) scale(${scale})`;
      // 复位按钮显示控制
      const changeFlag = isChanged();
      setEnableReset(changeFlag);
    }
  };

  /**
   * 图片放大缩小
   *
   * @param type 1-放大10% '-1'-缩小10%
   */
  const handleZoom = useCallback(
    (type: '1' | '-1') => {
      // MIN_DELTA-最小的缩放倍数, MAX_DELTA-最大的放大倍数
      const [MIN_DELTA, MAX_DELTA] = [0.2, 10];
      const numToMap = {
        1: 0.2,
        '-1': -0.2,
      };
      const imgDom = imgDomRef.current;
      if (!imgDom) return;
      const { scaleNum: scale, rotateNum: rotate } = getTransformInfo(imgDom);
      // 最小只能缩放到 0.2
      if (type === '-1' && scale < MIN_DELTA) return;
      if (type === '1' && scale > MAX_DELTA) return;
      const total = Math.min(MAX_DELTA, Math.max(MIN_DELTA, scale + numToMap[type]));
      const newStr = `rotate(${rotate}deg) scale(${total})`;
      setEnableZoom({
        enableZoomIn: total < MAX_DELTA,
        enableZoomOut: total > MIN_DELTA,
      });
      imgDom.style.transform = newStr;
      // 复位按钮 是否 显示
      const changeFlag = isChanged();
      setEnableReset(changeFlag);
      // 滚动比例提示
      showScaleTips(total);
    },
    [isChanged, showScaleTips],
  );

  const scrollFn = useCallback(
    (e: any) => {
      if (!isOnImg) return;
      e = e || window.event;
      e.preventDefault();
      e.stopPropagation();
      if (e.wheelDelta) {
        // 判断浏览器IE，谷歌滑轮事件
        if (e.wheelDelta > 0) {
          // 当滑轮向上滚动时
          console.log('上滚');
          handleZoom('1');
        }
        if (e.wheelDelta < 0) {
          // 当滑轮向下滚动时
          console.log('下滚');
          handleZoom('-1');
        }
      } else if (e.detail) {
        // Firefox滑轮事件
        if (e.detail > 0) {
          // 当滑轮向下滚动时
          console.log('下滚');
          handleZoom('-1');
        }
        if (e.detail < 0) {
          // 当滑轮向上滚动时
          console.log('上滚');
          handleZoom('1');
        }
      }
    },
    [handleZoom, isOnImg],
  );

  const resetStyle = useCallback(() => {
    if (!imgWrapperRef.current || !imgDomRef.current) return;
    imgWrapperRef.current.style.transform = 'translate(0px, 0px)';
    imgDomRef.current.style.transform = 'scale(1) rotate(0deg)';
    setEnableReset(false);
  }, [imgWrapperRef, imgDomRef]);

  const toggleImage = useCallback(
    (type: 'last' | 'next' | number) => {
      const map: Record<string, number> = {
        last: -1,
        next: 1,
      };
      if (typeof type === 'number' && source[type] === curFile) return;
      if (['last', 'next'].includes(type as string)) {
        const idx = source.indexOf(curFile);
        const chooseFile = source[idx + map[type]];
        setCurFile(chooseFile);
      } else {
        setCurFile(source[type as number]);
      }
    },
    [source, curFile],
  );

  // /**
  //  * 获取边框限制的 transform 的 x, y 偏移量
  //  * innerDOM: 内盒子DOM
  //  * outerDOM: 边框盒子DOM
  //  * moveX: 盒子的x移动距离
  //  * moveY: 盒子的y移动距离
  //  */
  // const limitBorder = (
  //   innerDOM: HTMLDivElement,
  //   outerDOM: HTMLDivElement,
  //   moveX: number,
  //   moveY: number,
  //   multiple: number,
  // ) => {
  //   const {
  //     clientWidth: innerWidth,
  //     clientHeight: innerHeight,
  //     offsetLeft: innerLeft,
  //     offsetTop: innerTop,
  //   } = innerDOM;
  //   console.log('==================================');
  //   console.log('innerLeft: ', innerLeft);
  //   console.log('innerTop: ', innerTop);
  //   const { clientWidth: outerWidth, clientHeight: outerHeight } = outerDOM;
  //   let transX;
  //   let transY;
  //   // 放大的图片超出box时 图片最多拖动到与边框对齐
  //   if (
  //     innerWidth * multiple > outerWidth ||
  //     innerHeight * multiple > outerHeight
  //   ) {
  //     if (
  //       innerWidth * multiple > outerWidth &&
  //       innerWidth * multiple > outerHeight
  //     ) {
  //       transX = Math.min(
  //         Math.max(
  //           moveX,
  //           outerWidth - (innerWidth * (multiple + 1)) / 2 - innerLeft,
  //         ),
  //         -innerLeft + (innerWidth * (multiple - 1)) / 2,
  //       );
  //       transY = Math.min(
  //         Math.max(
  //           moveY,
  //           outerHeight - (innerHeight * (multiple + 1)) / 2 - innerTop,
  //         ),
  //         -innerTop + (innerHeight * (multiple - 1)) / 2,
  //       );
  //     } else if (
  //       innerWidth * multiple > outerWidth &&
  //       !(innerWidth * multiple > outerHeight)
  //     ) {
  //       transX = Math.min(
  //         Math.max(
  //           moveX,
  //           outerWidth - (innerWidth * (multiple + 1)) / 2 - innerLeft,
  //         ),
  //         -innerLeft + (innerWidth * (multiple - 1)) / 2,
  //       );
  //       transY = Math.max(
  //         Math.min(
  //           moveY,
  //           outerHeight - (innerHeight * (multiple + 1)) / 2 - innerTop,
  //         ),
  //         -innerTop + (innerHeight * (multiple - 1)) / 2,
  //       );
  //     } else if (
  //       !(innerWidth * multiple > outerWidth) &&
  //       innerWidth * multiple > outerHeight
  //     ) {
  //       transX = Math.max(
  //         Math.min(
  //           moveX,
  //           outerWidth - (innerWidth * (multiple + 1)) / 2 - innerLeft,
  //         ),
  //         -innerLeft + (innerWidth * (multiple - 1)) / 2,
  //       );
  //       transY = Math.min(
  //         Math.max(
  //           moveY,
  //           outerHeight - (innerHeight * (multiple + 1)) / 2 - innerTop,
  //         ),
  //         -innerTop + (innerHeight * (multiple - 1)) / 2,
  //       );
  //     }
  //   }
  //   // 图片小于box大小时 图片不能拖出边框
  //   else {
  //     transX = Math.max(
  //       Math.min(
  //         moveX,
  //         outerWidth - (innerWidth * (multiple + 1)) / 2 - innerLeft,
  //       ),
  //       -innerLeft + (innerWidth * (multiple - 1)) / 2,
  //     );
  //     transY = Math.max(
  //       Math.min(
  //         moveY,
  //         outerHeight - (innerHeight * (multiple + 1)) / 2 - innerTop,
  //       ),
  //       -innerTop + (innerHeight * (multiple - 1)) / 2,
  //     );
  //   }
  //   return { transX: Number(transX), transY: Number(transY) };
  // };

  const mouseMoveFn = useCallback(
    (e: any) => {
      const $outerBox = imgOutBoxRef.current;
      const $img = imgDomRef.current;
      const $imgWrapper = imgWrapperRef.current as HTMLDivElement;
      if (!$outerBox || !$img || !$imgWrapper || !imgDragging) return;
      const [x, y] = [e.clientX, e.clientY];
      const [originX, originY] = imgPos as number[];
      const [deltaX, deltaY] = [x - originX, y - originY];

      const valStr = `translate(${deltaX}px, ${deltaY}px)`;
      $imgWrapper.style.transform = valStr;
    },
    [imgDragging, imgPos],
  );

  const mouseUpFn = useCallback(() => {
    setImgDragging(false);
    setDragging(true);
  }, [setImgDragging, setDragging]);

  /**
   * 当图片大小 > 容器大小，允许拖拽图片
   *
   * @returns
   */
  const getImgDragStatus = useCallback(() => {
    const image = imgDomRef.current;
    const imgWrapper = imgWrapperRef.current;
    if (!image || !imgWrapper) return false;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { width, height, scaleNum } = getTransformInfo(image);
    const { width: wrapperWidth, height: wrapperHeight } = getTransformInfo(imgWrapper);
    return width * scaleNum > wrapperWidth || height * scaleNum > wrapperHeight || false;
  }, []);

  const mouseDownFn = useCallback(
    (e: any) => {
      if (!getImgDragStatus()) {
        setImgDragging(false);
        setDragging(false);
      } else {
        setImgDragging(true);
        const imgWrapper = imgWrapperRef.current;
        if (!imgWrapper) return;
        const { translateX, translateY } = getTransformInfo(imgWrapper);
        setImgPos([e.clientX - translateX, e.clientY - translateY]);
        // 复位工具显示操作
        const changeFlag = isChanged();
        setEnableReset(changeFlag);
      }
    },
    [getImgDragStatus, isChanged],
  );

  const mouseOut = () => setImgDragging(false);

  const scrollPreList = useCallback(
    (type: '-1' | '1' | number) => {
      const map = {
        '-1': -80,
        '1': 80,
      };
      const preWrapper = imgPreWrapper.current;
      if (!preWrapper) return;
      const curScrollWidth = preWrapper.scrollLeft;
      const scrollX = typeof type === 'number' ? type : curScrollWidth + map[type];
      preWrapper.scroll({
        left: scrollX,
        top: 0,
        behavior: 'smooth',
      });
    },
    [imgPreWrapper],
  );

  useEffect(() => {
    const imgDom = imgDomRef.current;
    if (!imgDom) return;
    const moveEnterFn = () => setIsOnImg(true);
    const mouseOutFn = () => setIsOnImg(false);
    imgDom.addEventListener('mouseenter', moveEnterFn);
    imgDom.addEventListener('mouseout', mouseOutFn);
    // eslint-disable-next-line consistent-return
    return () => {
      imgDom.removeEventListener('mouseenter', moveEnterFn);
      imgDom.removeEventListener('mouseout', mouseOutFn);
    };
  }, []);

  useEffect(() => {
    const imgRapper = imgWrapperRef.current;
    if (!imgRapper) return;
    imgRapper.addEventListener('mousewheel', scrollFn, false);
    imgRapper.addEventListener('mousedown', mouseDownFn);
    imgRapper.addEventListener('mouseup', mouseUpFn);
    imgRapper.addEventListener('mousemove', mouseMoveFn);
    imgRapper.addEventListener('mouseout', mouseOut);
    // eslint-disable-next-line consistent-return
    return () => {
      imgRapper.removeEventListener('mousewheel', scrollFn);
      imgRapper.removeEventListener('mousedown', mouseDownFn);
      imgRapper.removeEventListener('mousemove', mouseMoveFn);
      imgRapper.removeEventListener('mouseup', mouseUpFn);
      imgRapper.removeEventListener('mouseout', mouseOut);
    };
  }, [imgWrapperRef, scrollFn, mouseDownFn, mouseUpFn, mouseMoveFn]);

  useEffect(() => {
    const headerDom = headerDragRef.current;
    if (!headerDom) return;
    const mouseEnterFn = (e: any) => {
      e.stopPropagation();
      setDragging(false);
    };
    const mouseOutFn = (e: any) => {
      e.stopPropagation();
      setDragging(true);
    };
    headerDom.addEventListener('mouseenter', mouseEnterFn);
    headerDom.addEventListener('mouseout', mouseOutFn);

    return () => {
      headerDom.removeEventListener('mouseenter', mouseEnterFn);
      headerDom.removeEventListener('mouseout', mouseOutFn);
    };
  }, [setDragging, isDisabledDragging]);

  const getPosition = useCallback((postion: any) => {
    const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
    const dragEle = rndRef.current?.resizableElement.current;
    const dragEleWidth = dragEle?.clientWidth || 0;
    // 拖动范围：x轴 窗口内至少留下 240 宽度
    const x = Math.max(240 - dragEleWidth, Math.min(postion.x, windowWidth - 40));
    // 拖动范围：y轴 窗口内至少留下 40 宽度
    const y = Math.max(0, Math.min(postion.y, windowHeight - 40));
    return { x, y };
  }, []);

  // 大于图片宽度小于容器宽度，展示横向滚动
  // (图片数量 * 80px/个 - 第一个不需要左边距 16) > 弹框宽度
  const getScrollXFlag = useCallback((total) => {
    const modalWidth =
      (rndRef.current && rndRef.current.resizableElement.current!.clientWidth) ||
      defaultSizeAndPos.current.width;
    const imgsWidth = total * 80 - 32;
    // 左右边距 8 * 2，
    const padding = 8 * 2;
    return imgsWidth > modalWidth - padding;
  }, []);

  // 是否有上一个图片/文件
  const hasLast = useMemo(() => source.indexOf(curFile) > 0, [source, curFile]); // 下标从 0 开始
  const hasNext = useMemo(() => source.indexOf(curFile) < source.length - 1, [curFile, source]);

  useEffect(() => {
    const fn = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.keyCode === KEY_CODE.ESC) {
        onCancel();
      } else if (e.keyCode === KEY_CODE.LEFT) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        hasLast && toggleImage('last');
      } else if (e.keyCode === KEY_CODE.RIGHT) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        hasNext && toggleImage('next');
      }
    };
    document.addEventListener('keydown', fn);
    const clickToClose = () => {
      onCancel();
    };
    if (clickAwayClose) {
      document.documentElement.addEventListener('click', clickToClose);
    }
    return () => {
      document.removeEventListener('keydown', fn);
      if (clickAwayClose) {
        document.documentElement.removeEventListener('click', clickToClose);
      }
    };
  }, [toggleImage, onCancel, hasLast, hasNext, clickAwayClose]);

  const { enableZoomIn, enableZoomOut } = enableZoom;

  // 是否只有一个图片/文件--单图模式/多图模式
  const previewMode = source.length > 1 ? 'multiple' : 'single';

  const isScrollX = useMemo(() => getScrollXFlag(source.length), [getScrollXFlag, source.length]);

  const operateProps: IOperationBar = {
    onRotate: handleRotate,
    onZoom: handleZoom,
    onClose: onCancel,
    enableZoomIn,
    enableZoomOut,
    isFile: isPDF,
    enableReset,
    onReset: resetStyle,
  };

  useEffect(() => {
    if (visible) {
      if (!getScrollXFlag(source.length)) return;
      const curIdx = source.indexOf(curFile);
      scrollPreList(curIdx * 80);
      resetStyle();
    }
  }, [curFile, getScrollXFlag, resetStyle, scrollPreList, source, visible]);

  const rndProps = {
    position,
    default: defaultSizeAndPos.current,
    minWidth: modalMinSize.current.width,
    minHeight: modalMinSize.current.height,
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight,
    disableDragging: isDisabledDragging,
    onClick: (e: any) => e.stopPropagation(),
    ref: (c: any) => (rndRef.current = c),
    onDragStart: () => setFileDragMode(false),
    onDragStop: (e: any, d: any) => {
      const { x, y } = getPosition(d);
      setPosition({ x, y });
      setFileDragMode(true);
    },
    onResize: (e: any, d: any, _: any, delta: any, pos: any) => {
      const { x, y } = getPosition(pos);
      setPosition({ x, y });
    },
  };

  return createPortal(
    <>
      <Rnd
        {...rndProps}
        className={styles['rnd-drag-wrapper']}
        style={{ display: visible ? 'revert' : 'none' }}
      >
        <div className={styles['rnd-viewer-wrapper']}>
          <div className={styles['modal-header-bar']}>
            {/* eslint-disable-next-line react/self-closing-comp */}
            <div ref={headerDragRef} className={styles['modal-heder-drag']}></div>
            <OperationBar {...operateProps} />
          </div>
          <div
            className={styles['image-viewer-content']}
            ref={imgOutBoxRef}
            style={{
              height: previewMode === 'multiple' ? 'calc(100% - 112px)' : '100%',
            }}
          >
            {previewMode === 'multiple' && (
              <LeftOutlined
                className={classnames(styles.arrow, styles['arrow-left'], {
                  [styles['arrow-disabled']]: !hasLast,
                })}
                onClick={() => hasLast && toggleImage('last')}
              />
            )}

            {!isPDF ? (
              <div ref={imgWrapperRef} className={styles['img-wrapper']}>
                <img
                  className={classnames(styles['dragged-img'], {
                    [styles['dragged-img-grabbing']]: imgDragging,
                  })}
                  ref={imgDomRef}
                  id="img"
                  src={curFile}
                  alt="img"
                  draggable={false}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onMouseMove={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                  onMouseOut={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                />
              </div>
            ) : (
              <iframe
                src={curFile}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  pointerEvents: isFileDrag ? 'auto' : 'none',
                }}
              />
            )}
            {previewMode === 'multiple' && (
              <RightOutlined
                className={classnames(styles.arrow, styles['arrow-right'], {
                  [styles['arrow-disabled']]: !hasNext,
                })}
                onClick={() => hasNext && toggleImage('next')}
              />
            )}
            <div
              className={classnames(styles['scale-tips'], {
                [styles['scale-tips-enable']]: scaleTipsVisible,
              })}
            >
              缩放: {`${(curScale * 100).toFixed()}%`}
            </div>
          </div>
          {previewMode === 'multiple' && (
            <div className={styles['image-viewer-preview-list']}>
              {isScrollX && (
                <div
                  className={classnames(styles['scroll-toogle'], styles['scroll-toogle-left'])}
                  onClick={() => scrollPreList('-1')}
                >
                  <LeftOutlined />
                </div>
              )}
              <div
                ref={imgPreWrapper}
                className={classnames(styles['preview-img-wrapper'], {
                  [styles['preview-img-wrapper-active']]: isScrollX,
                })}
              >
                {source.map((img: any, index: number) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    className={classnames(styles['image-viewer-preview-item'], {
                      [styles['image-viewer-preview-item-active']]: curFile === img,
                    })}
                  >
                    <img
                      src={img}
                      alt="img"
                      style={{ width: '100%', height: '100%' }}
                      onClick={() => toggleImage(index)}
                    />
                  </div>
                ))}
              </div>
              {isScrollX && (
                <div
                  className={classnames(styles['scroll-toogle'], styles['scroll-toogle-right'])}
                  onClick={() => scrollPreList('1')}
                >
                  <RightOutlined />
                </div>
              )}
            </div>
          )}
        </div>
      </Rnd>
    </>,
    document.body,
  );
};

export default ImageModal;
