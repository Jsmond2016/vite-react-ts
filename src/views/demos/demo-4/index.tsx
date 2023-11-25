import { Button, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Index = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [waterText, setWaterText] = useState('仅用于办理公积金证明，他用无效');

  useEffect(() => {
    const wrapperCanvas = document.createElement('canvas') as HTMLCanvasElement;

    const wrapperCanvasCtx = wrapperCanvas.getContext('2d') as CanvasRenderingContext2D;
    const fontHeight = 20;
    wrapperCanvasCtx.font = `${fontHeight}px Microsoft Yahei`;
    wrapperCanvasCtx.fillStyle = '#f00';
    const text = waterText;
    const textWidth = wrapperCanvasCtx.measureText(text).width;

    const angle = (-15 * Math.PI) / 180;
    const watermarkCanvas = document.getElementById('watermark') as HTMLCanvasElement;
    // // sin@ = a / c ==> a = c * arcsin(@)
    // const _width = textWidth * Math.asin(Math.abs(angle))
    // // cons@ = b / c ==> b = c * arcos(@)
    // const _height = textWidth * Math.acos(Math.abs(angle))
    // 宽度 + 角落裁切空间
    const realWidth = textWidth + fontHeight;
    // 高度 + 角落裁切空间
    const realHeight = Math.abs(Math.atan(angle)) * realWidth + fontHeight;
    watermarkCanvas.width = realWidth;
    watermarkCanvas.height = realHeight;
    const watermarkCtx = watermarkCanvas.getContext('2d') as CanvasRenderingContext2D;
    watermarkCtx.fillStyle = '#690';
    watermarkCtx.font = `${fontHeight}px Microsoft Yahei`;
    // 绕中心点旋转后还原；
    watermarkCtx.translate(realWidth / 2, realHeight / 2);
    watermarkCtx.rotate(angle);
    watermarkCtx.translate(-realWidth / 2, -realHeight / 2);
    // 居中绘制：realHeight* 0.5 + 0.25 * fontHeight --> 高度和行高 1.25
    watermarkCtx.fillText(
      text,
      (realWidth - textWidth) / 2,
      realHeight * 0.5 + 0.25 * fontHeight,
    );

    const patt = wrapperCanvasCtx.createPattern(
      watermarkCanvas,
      'repeat',
    ) as CanvasPattern;

    fileRef.current!.onchange = async function (e: any) {
      const f1 = e.target!.files[0];
      const fileUrl = await toBase64(f1);
      const img = new Image();
      img.src = fileUrl as string;
      img.onload = function () {
        const { width, height } = img;
        wrapperCanvas.width = width;
        wrapperCanvas.height = height;
        wrapperCanvasCtx.rect(0, 0, wrapperCanvas.width, wrapperCanvas.height);
        wrapperCanvasCtx.drawImage(img, 0, 0, width, height);
        wrapperCanvasCtx.fillStyle = patt;
        wrapperCanvasCtx.fill();
        wrapperCanvasCtx.save();
        const base64Url = wrapperCanvas.toDataURL();
        const imgEle = document.getElementById('img-test-02') as HTMLImageElement;
        imgEle.src = base64Url;
      };
    };

    // 旋转前(红色矩形)

    // 通过 - 文本长度-长
    //      - 字体高度-高
    //      - 旋转角度-斜边--旋转后的 文本长度
    //      = 计算：水印画布最小的 长和宽，以及水印的绘制起点 x , y； 以及加上两边的 padding 各自 1 个文字宽度大小；
    //      && 考虑 水印文字是否换行，不换行则 长需要取 斜边最大值；换行则需要重新计算；

    // 汇总：问题 = 已知 斜边，角度, 求三角形的长和宽；
  }, [waterText]);

  return (
    <div>
      <h1>水印测试，请输入水印文字，30字内</h1>
      <br />
      <Input
        value={waterText}
        style={{ width: '240px' }}
        onChange={(e: any) => setWaterText((e.target.value || '').trim())}
      />
      <br />
      <br />
      <input type="file" name="file" id="file" ref={fileRef} />
      <br />
      <br />
      <img id="img-test-02" src="" alt="" />
      <br />
      <br />
      <h2>水印文字--一行展示情况</h2>
      <br />
      <p>只提供 文字、字体大小、角度大小 == 一行展示</p>
      <br />
      <canvas id="watermark" style={{ border: '1px solid blue' }} />
    </div>
  );
};

export default Index;
