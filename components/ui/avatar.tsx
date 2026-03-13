import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  imageUrl?: string | null;
  className?: string;
};

export function Avatar({ name, imageUrl, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name}
        className={cn("h-10 w-10 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary",
        className,
      )}
    >
      {initials}
    </div>
  );
}
