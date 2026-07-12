import { Outlet } from 'react-router';
import { ModeToggle } from '@/components/common/ModeToggle';

function Layout() {
  return (
    <div className="bg-background text-foreground relative min-h-screen bg-[url('/nbc-peacock.svg')] bg-size-[300px] bg-fixed bg-position-[center_bottom_2rem] bg-no-repeat md:bg-position-[left_2rem_bottom_2rem]">
      <header className="flex justify-end p-4">
        <ModeToggle />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
