// Example in your main page (src/app/page.tsx)

import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <Link href="/register">REGISTER</Link>
      <Link href="/login">LOGIN</Link>
    </div>
  );
};

export default HomePage;
