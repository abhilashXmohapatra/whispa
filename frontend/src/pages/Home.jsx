import Sidebar from '../components/Sidebar';
import MessgeArea from '../components/MessgeArea';
import getMessage from '../customHooks/getMessage';

const Home = () => {
 getMessage()
  return (
    <div className="h-screen bg-gray-100 flex overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar/>

      {/* Main Content Area */}
      <MessgeArea/>
    </div>
  );
};

export default Home;