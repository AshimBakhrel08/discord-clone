import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: Promise<{ serverId: string; channelId: string }>; // Make sure params is a Promise
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
    const resolvedParams = await params; // Resolve params if it's a Promise
    const profile = await currentProfile();

    if (!profile) {
        return redirect("/sign-in"); // Ensure correct redirect path
    }

    const { channelId } = resolvedParams;
    const channel = await db.channel.findUnique({
        where: {
            id: channelId,
        },
    });

    const { serverId } = resolvedParams;
    const member = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
    });

    if (!channel || !member) {
        return redirect('/'); // Redirect if the channel or member doesn't exist
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
            {/* Fixed Header */}
            <div className="flex-1 z-50">
                <ChatHeader
                    name={channel.name}
                    serverId={channel.serverId}
                    type="channel"
                />
            </div>

            {channel.type === ChannelType.TEXT && (
                <>
                    {/* Scrollable Messages Section */}
                    <div className="overflow-y-auto">
                        <ChatMessages
                            member={member}
                            name={channel.name}
                            type="channel"
                            chatId={channel.id}
                            apiUrl="/api/messages"
                            socketUrl="/api/socket/messages"
                            socketQuery={{
                                channelId: channel.id,
                                serverId: channel.serverId,
                            }}
                            paramKey="channelId"
                            paramValue={channel.id}
                        />
                    </div>

                    {/* Input Section (Fixed at Bottom) */}
                    <div className="z-40">
                        <ChatInput
                            name={channel.name}
                            type="channel"
                            apiUrl="/api/socket/messages"
                            query={{
                                channelId: channel.id,
                                serverId: channel.serverId,
                            }}
                        />
                    </div>
                </>
            )}

            {channel.type === ChannelType.AUDIO && (
                <MediaRoom 
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />
            )}

            {channel.type === ChannelType.VIDEO && (
                <MediaRoom 
                    chatId={channel.id}
                    video={true}
                    audio={true}
                />
            )}
        </div>
    );
};

export default ChannelIdPage;
