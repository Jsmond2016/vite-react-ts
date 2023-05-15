import styles from './index.module.less';
import { Image } from 'antd';
import ImageViewer from './ImageViewer';
import img from './img.jpg';
import img1 from './img-1.png';
import img2 from './img-2.png';
import img3 from './img-3.png';
import img4 from './img-4.png';
import img5 from './img-5.png';
import img6 from './img-6.jpg';
import img7 from './img-7.jpg';
import img8 from './wall.jpg';
import img9 from './long-pic.png';
import img10 from './img-8.png';
import img11 from './img-9.png';
import img12 from './img-10.png';
import img13 from './img-11.png';
import img14 from './img-12.png';
import img15 from './img-13.png';
import img16 from './img-14.png';
import img17 from './img-15.png';
import img18 from './img-16.png';

export default function UserCreate() {
  // 20
  const imgs = [
    img,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
  ];
  // 7
  // const imgs = [img, img1, img2, img3, img4, img5, img6];
  // 6
  // const imgs = [img, img1, img2, img3, img4, img5,];
  // 3
  // const imgs = [img, img1, img2];

  const pdfs = [
    '',
  ];

  const FileComponent = (fileProps: { onClick: () => void; source: string[] }) => {
    const { onClick, source } = fileProps;
    return (
      <a
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {source}
      </a>
    );
  };

  return (
    <div>
      <h1 className={styles.title}>UserCreate...</h1>
      <h2>原来的交互</h2>
      <Image src={img} width={64} height={64} />
      <hr />
      <h2>单图模式交互</h2>
      <ImageViewer source={[img9]} />
      <h2>多图模式交互</h2>
      <ImageViewer source={imgs} curImage={img5} />
      <h2>文件-单图模式交互</h2>
      <ImageViewer source={pdfs} fileMode={true} customCom={FileComponent} />
      <h2>文件-单图模式交互</h2>
      <ImageViewer source={pdfs} fileMode={true} />
    </div>
  );
}
