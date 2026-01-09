"use client"

import DottedMap from "./DottedMap"

export default function MapContainer() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <DottedMap width={1200} height={800} />
    </div>
  )
}
