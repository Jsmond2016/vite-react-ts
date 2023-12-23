import { Outlet } from 'react-router-dom';

const Index = () => {
  return (
    <div className="music-container">
      <Outlet />
    </div>
  );
};

export default Index;
