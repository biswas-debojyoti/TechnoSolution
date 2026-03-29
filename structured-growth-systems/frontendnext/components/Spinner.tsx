export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="w-10 h-10 rounded-full border-[3px] border-white/20 border-t-white animate-spin" />
    </div>
  );
}