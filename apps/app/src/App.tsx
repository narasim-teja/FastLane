import { Button } from "@fastlane/ui/button";

export default function App() {
  return (
    <div className="grid h-screen w-full place-items-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-5xl">
          Hello from <span className="text-blue-500">Fastlane</span>!
        </div>

        <Button>Click Me</Button>
      </div>
    </div>
  );
}
