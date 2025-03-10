import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { NavigationSidebar } from "./navigation/navigation-sidebar";
import { ServerSidebar } from "./server/server-sidebar";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="!flex md:!hidden">
                <div className="flex p-0 gap-0 h-full">
                    <div >
                        <NavigationSidebar />
                    </div>
                    <div className="w-full">
                        <ServerSidebar serverId={serverId} /> {/* Added serverId prop */}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};