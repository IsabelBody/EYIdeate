import Link from 'next/link';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="p-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-semibold mb-6">Welcome to the Buddy System!</h1>
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
