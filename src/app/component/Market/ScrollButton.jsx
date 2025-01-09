import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ScrollButton = ({ direction }) => {
  const handleScroll = () => {
    const container = document.getElementById('filter-container');
    container.scrollLeft += direction === 'left' ? -100 : 100;
  };

  return (
    <div className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} flex items-center h-full z-10`}>
      <div className={`absolute w-8 h-full bg-gradient-to-${direction === 'left' ? 'r' : 'l'} from-[--background-card] to-[--background-card]/100`}></div>
      <button
        className={`p-1 text-gray-400 hover:text-white z-20 ${direction === 'left' ? 'ml-2' : 'mr-2'}`}
        onClick={handleScroll}
      >
        {direction === 'left' ?
          <MdKeyboardArrowLeft className="w-5 h-5" /> :
          <MdKeyboardArrowRight className="w-5 h-5" />
        }
      </button>
    </div>
  );
};

export default ScrollButton;