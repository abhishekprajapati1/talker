import { getDateAccronym } from "@/lib/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface Status {
    type: "online" | "offline";
    updated_at: string;
    user_id: string;
}





const useUserStatus = (status: Status) => {
    const [statusText, setStatusText] = useState<string>("");

    useEffect(() => {
        if (status) {
            if (status.type === "online") setStatusText("Online");
            if (status.type === "offline" && status.updated_at) setStatusText(`Last active ${getDateAccronym(new Date(status.updated_at)).toLowerCase()} at ${dayjs(status.updated_at).format("hh:mm a")}`)
        } else {
            setStatusText("Away");
        }
    }, [status]);

    return statusText;
};

export default useUserStatus;