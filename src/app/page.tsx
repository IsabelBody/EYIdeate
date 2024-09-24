import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative">
      <Card className="p-8 max-w-sm w-full shadow-md text-center">
        <h1 className="text-3xl font-semibold mb-6">Welcome to the Buddy System!</h1>
        <div className="flex flex-col space-y-4">
          <Link href="/events">
            <Button className="w-full">VIEW EVENTS</Button>
          </Link>
        </div>
      </Card>
      
    </div>
  );
};

export default HomePage;
