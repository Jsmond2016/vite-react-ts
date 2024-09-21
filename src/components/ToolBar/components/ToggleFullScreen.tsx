import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useFullscreen } from 'ahooks';

const ToggleFullScreen = () => {
  // https://ahooks.js.org/zh-CN/hooks/use-fullscreen/
  // Fixed: https://segmentfault.com/q/1010000042534958
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(() => document.documentElement);

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
