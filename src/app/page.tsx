import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      {/* Banner Section */}
      <div className="relative w-full h-1/2 -mt-4"> {/* Adjust height and add negative margin */}
        <Image
          src="/img/homeImage.jpg"
          alt="Welcome to the Buddy System"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
      </div>
      
      {/* Text Below the Banner */}
      <div className="p-8 max-w-sm w-full text-center z-10 mt-4">
        <h1 className="text-3xl font-semibold mb-4">Welcome to the Buddy System!</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/events">
            <Button className="w-full">VIEW EVENTS</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
