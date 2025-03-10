import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: Promise<{ inviteCode: string }>; // ✅ Change to Promise<>
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
    const resolvedParams = await params; // ✅ Await the params if it's a Promise
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/sign-in");
    }

    const inviteCode = resolvedParams.inviteCode; // ✅ Use the resolved params
    
    if (!inviteCode) {
        return redirect("/");
    }

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: inviteCode,
            members: {
                some: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    const server = await db.server.update({
        where: {
            inviteCode: inviteCode,
        },
        data: {
            members: {
                create: {
                    profileId: profile.id,
                },
            },
        },
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return null;
};

export default InviteCodePage;
