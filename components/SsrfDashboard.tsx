"use client";

import { useState } from "react";
import { discoveredEndpoints, aiSuggestions } from "./data/audit-data";
import DiscoveredEndpoints from "./DiscoveredEndpoints";
import RequestInspector from "./RequestInspector";
import AICopilot from "./AICopilot";

export default function SsrfDashboard() {
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Handle endpoint selection
  const handleSelectEndpoint = (id: string | null) => {
      setSelectedEndpointId(id);
      const endpoint = discoveredEndpoints.find(e => e.id === id);
      if (endpoint) {
          setCurrentUrl(endpoint.url);
          setResponse(null);
      }
  };

  // Handle AI payload test
  const handleTestPayload = (payload: string) => {
      setCurrentUrl(payload);
      // Automatically trigger send for demo flow
      handleSendRequest(payload);
  };

  // Simulate request
  const handleSendRequest = (urlOverride?: string) => {
      const target = urlOverride || currentUrl;
      setIsSending(true);
      setResponse(null);

      setTimeout(() => {
          setIsSending(false);
          
          if (target.includes("169.254") || target.includes("metadata")) {
              setResponse(`{
  "availabilityZone" : "us-east-1a",
  "privateIp" : "10.0.1.15",
  "version" : "2018-02-01",
  "instanceId" : "i-1234567890abcdef0",
  "billingProducts" : null,
  "instanceType" : "t3.micro",
  "accountId" : "123456789012",
  "architecture" : "x86_64",
  "kernelId" : null,
  "ramdiskId" : null,
  "region" : "us-east-1"
}`);
          } else {
              setResponse(`HTTP/1.1 200 OK
Date: Mon, 27 Jul 2026 12:28:53 GMT
Server: Apache/2.4.41 (Ubuntu)
Last-Modified: Wed, 22 Jul 2026 19:15:56 GMT
ETag: "2aa6-5ac3-4"
Accept-Ranges: bytes
Content-Length: 10918
Vary: Accept-Encoding
Content-Type: text/html

<!DOCTYPE html>
<html>
... (Standard Content) ...
</html>`);
          }
      }, 800);
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Left: Discovery */}
        <div className="col-span-3 h-full min-h-0">
            <DiscoveredEndpoints 
                endpoints={discoveredEndpoints}
                selectedId={selectedEndpointId}
                onSelect={handleSelectEndpoint}
            />
        </div>

        {/* Center: Inspector */}
        <div className="col-span-6 h-full min-h-0">
            <RequestInspector 
                url={currentUrl}
                response={response}
                onSend={() => handleSendRequest()}
                isSending={isSending}
            />
        </div>

        {/* Right: AI Copilot */}
        <div className="col-span-3 h-full min-h-0">
            <AICopilot 
                suggestions={aiSuggestions}
                onTest={handleTestPayload}
            />
        </div>
    </div>
  );
}
