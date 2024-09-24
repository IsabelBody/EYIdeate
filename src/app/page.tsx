// Example in your main page (src/app/page.tsx)

import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Buddy System</h1>
      <Link href="/login">Go to Login</Link>
    </div>
  );
};

export default HomePage;
