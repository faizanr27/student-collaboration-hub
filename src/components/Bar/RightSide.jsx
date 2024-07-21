import {
  Card
} from "@material-tailwind/react";
import UserDetails from "../UserDetails";

export default function RightSide() {
  return (
    <Card className="hidden bg-slate-200 lg:block h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 ml-auto rounded-none">
      {/* Your card content goes here */}
      <UserDetails />
    </Card>
  );
}
