import { SignIn } from '@clerk/nextjs';
export default function page() {
  return (
    <main className="w-full h-full min-h-screen min-w-screen flex items-center justify-center">
      <SignIn />
    </main>
  );
}
