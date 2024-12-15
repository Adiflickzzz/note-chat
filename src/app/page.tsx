import AddFriendDailog from "@/components/requests/AddFriendDailog";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <AddFriendDailog />
      <UserButton />
    </div>
  );
}
