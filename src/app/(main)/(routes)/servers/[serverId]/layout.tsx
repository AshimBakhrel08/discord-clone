import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ serverId: string }>; // Make params a promise
}) => {
    const { serverId } = await params; // Await params before using it

    if (!serverId) {
        return redirect('/error');
    }

    const profile = await currentProfile();
    if (!profile) {
        return redirect('/sign-in');
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (!server) {
        return redirect('/');
    }

    return (
        <div className="h-full flex">
            <div className="hidden md:!flex h-full z-20 w-60 flex-col fixed inset-y-0">
                <ServerSidebar serverId={serverId}/>
            </div>
            <main className="h-full w-full md:pl-60">
                {children}
            </main>
        </div>
        
    )
};

export default ServerIdLayout;
