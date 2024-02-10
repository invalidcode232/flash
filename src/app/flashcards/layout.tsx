const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="text-slate-500">
      <div className="dashboard-layout__content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
