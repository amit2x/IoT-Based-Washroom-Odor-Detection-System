import Sidebar from '@/components/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="ml-[240px] flex-grow flex flex-col min-h-screen bg-background text-on-background">
        {children}
      </div>
    </div>
  );
}
