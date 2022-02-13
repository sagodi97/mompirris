interface AvatarProps {
  src: string;
  altName?: string;
}
const Avatar = ({ src, altName }: AvatarProps) => (
  <div className="relative m-1 mr-2 flex h-16 w-16 items-center justify-center rounded-full shadow-lg">
    <img
      className="rounded-full"
      src={src}
      alt={`${altName ?? "User"}'s avatar`}
    />
    <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-green-500"></div>
  </div>
);

export default Avatar;
