import dynamic from 'next/dynamic';

const SiteHeader = dynamic(() => import("@/components/custom/ui/Nav/site-header"))


export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}