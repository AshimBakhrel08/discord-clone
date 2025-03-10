import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: Promise<{
        memberId: string;
        serverId: string;
    }>,
    searchParams: Promise<{
        video?: boolean;
    }>
}

const MemberIdPage = async ({
    params,
    searchParams,
}: MemberIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirect("sign-in")
    }

    const { serverId } = await params
    const currentMember = await db.member.findFirst({
        where: {
            serverId: serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });

    if (!currentMember) {
        return redirect("/");
    }

    const { memberId } = await params
    const conversation = await getOrCreateConversation(currentMember.id, memberId);

    if (!conversation) {
        return redirect(`/servers/${serverId}`);
    }

    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    const { video } = await searchParams

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
            {/* Fixed Header */}
            <div className="flex-1 z-50">
                <ChatHeader
                    imageUrl={otherMember.profile.imageUrl}
                    name={otherMember.profile.name}
                    serverId={serverId}
                    type="conversation"
                />
            </div>

            {!video && (
                <>
                    {/* Scrollable Messages Section */}
                    <div className="overflow-y-auto">
                        <ChatMessages
                            name={otherMember.profile.name}
                            member={currentMember}
                            chatId={conversation.id}
                            type="conversation"
                            apiUrl="/api/direct-messages"
                            paramKey="conversationId"
                            paramValue={conversation.id}
                            socketUrl="/api/socket/direct-messages"
                            socketQuery={{
                                conversationId: conversation.id,
                            }}
                        />
                    </div>

                    {/* Input Section (Fixed at Bottom) */}
                    <div className="z-40">
                        <ChatInput
                            name={otherMember.profile.name}
                            type="conversation"
                            apiUrl="/api/socket/direct-messages"
                            query={{
                                conversationId: conversation.id,
                            }}
                        />
                    </div>
                </>
            )}

            {video && (
                <MediaRoom
                    chatId={conversation.id}
                    video={true}
                    audio={true}
                />
            )}
        </div>
    );
}

export default MemberIdPage;