type Props = {
  fromCurrentUser: boolean;
  senderName: string;
  senderImage: string;
  lastByUser: boolean;
  content: string[];
  createdAt: number;
};
export const Messages = ({
  content,
  createdAt,
  fromCurrentUser,
  lastByUser,
  senderImage,
  senderName,
}: Props) => {
  return (
    <div className="flex w-full items-end justify-end">
      <div className="mx-2 flex flex-col">
        <div className="order-1 items-end">
          <div className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
            <p className="">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
