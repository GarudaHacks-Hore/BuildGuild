import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function Discover() {
  return (
    <main
      style={{ height: "calc(100vh - 80px)" }}
      className="flex flex-col items-center justify-center gap-3"
    >
      <div className="flex items-center w-full h-full">
        <div className="w-1/4">History</div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-3/4 h-full">
          <div className="border rounded-lg p-4 overflow-y-auto bg-gray-50">
            {/* Chat messages will go here */}
          </div>
          <div className="flex items-center">
            <Input type="text" placeholder="Type your message..." />
            <Button className="ml-2">Send</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
