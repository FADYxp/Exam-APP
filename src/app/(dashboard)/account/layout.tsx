import AccountSidebar from "./_components/account-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <AccountSidebar>
        {children}
        </AccountSidebar>
  );
}
