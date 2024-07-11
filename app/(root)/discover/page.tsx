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
        <div className="w-1/5 px-10 py-4 flex flex-col justify-start h-full gap-6">
          <h1 className="text-2xl font-bold mb-2">Prompt History</h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-light">Today</h2>
            <div className="">
              <p>Anjay</p>
              <p>Anjay</p>
              <p>Anjay</p>
              <p>Anjay</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs font-light">Yesterday</h2>
            <div className="">
              <p>Anjay</p>
              <p>Anjay</p>
              <p>Anjay</p>
              <p>Anjay</p>
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col shadow-lg gap-2 rounded-l-3xl p-6 w-4/5 h-full">
          <div className="border rounded-lg p-4 flex-grow overflow-y-auto bg-gray-50">
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
