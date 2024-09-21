import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';

const ToggleFullScreen = () => {
  // https://ahooks.js.org/zh-CN/hooks/use-fullscreen/
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(() => document.getElementById('root'));

  return isFullscreen ? (
    <FullscreenExitOutlined
      onClick={toggleFullscreen}
      className="text-size-[22px] cursor-pointer"
    />
  ) : (
    <FullscreenOutlined onClick={toggleFullscreen} className="text-size-[22px] cursor-pointer" />
  );
};

export default ToggleFullScreen;
