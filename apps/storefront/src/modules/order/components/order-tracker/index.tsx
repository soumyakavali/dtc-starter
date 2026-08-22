import React from "react"
import { HttpTypes } from "@medusajs/types"

type OrderTrackerProps = {
  order: HttpTypes.StoreOrder
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const isDelivered = order.fulfillment_status === "delivered" || order.status === "completed"
  const trackingNumber =
    (order.metadata?.tracking_number as string) ||
    `KA-EXP-${order.display_id || order.id.slice(-6).toUpperCase()}`
  const courierPartner =
    (order.metadata?.courier_partner as string) ||
    "Mandya Agri Rural Logistics (ಮಂಡ್ಯ ಕೃಷಿ ಗ್ರಾಮೀಣ ಎಕ್ಸ್‌ಪ್ರೆಸ್)"
  const deliveryOtp = (order.metadata?.delivery_otp as string) || "5421"

  const steps = [
    {
      title: "Order Placed & Payment Authorized",
      kannada: "ಆರ್ಡರ್ ಸ್ವೀಕರಿಸಲಾಗಿದೆ & ಪಾವತಿ ಯಶಸ್ವಿ",
      done: true,
      time: "Verified",
    },
    {
      title: "BioTill Agri Depot QC Passed",
      kannada: "ಬಯೋಟೀಲ್ ಗುಣಮಟ್ಟ ತಪಾಸಣೆ ಪೂರ್ಣ",
      done: true,
      time: "Passed",
    },
    {
      title: "Dispatched from Mandya Depot Hub",
      kannada: "ಮಂಡ್ಯ ಡಿಪೋ ಕೇಂದ್ರದಿಂದ ರವಾನಿಸಲಾಗಿದೆ",
      done: true,
      time: "In-Transit",
    },
    {
      title: "Out for Delivery to Farm",
      kannada: "ನಿಮ್ಮ ಕೃಷಿ ಜಮೀನಿಗೆ ವಿತರಣೆಗೆ ಹೊರಟಿದೆ",
      done: isDelivered,
      current: !isDelivered,
      time: isDelivered ? "Delivered" : "Today / ಇಂದು",
    },
    {
      title: "Farm Gate Delivery Handover",
      kannada: "ರೈತರ ಕೈಸೇರಿ ಪೂರ್ಣಗೊಂಡಿದೆ",
      done: isDelivered,
      time: isDelivered ? "Delivered" : "Est. 5:30 PM",
    },
  ]

  return (
    <div
      className="my-6 rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50/70 via-white to-green-50/40 p-6 shadow-xs"
      data-testid="order-tracker-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
            </span>
            <h3 className="text-lg font-bold text-emerald-950">
              Live Order Dispatch Tracking (ಲೈವ್ ಆರ್ಡರ್ ಟ್ರ್ಯಾಕಿಂಗ್)
            </h3>
          </div>
          <p className="text-xs text-emerald-800 mt-1">
            Tracking ID: <span className="font-mono font-bold text-emerald-900">{trackingNumber}</span> • {courierPartner}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white px-3 py-1.5 rounded-lg border border-emerald-200 shadow-2xs text-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block">Farm Delivery OTP</span>
            <span className="font-mono font-extrabold text-emerald-800 text-sm tracking-widest">{deliveryOtp}</span>
          </div>
          <div className="rounded-full bg-emerald-700 px-3.5 py-1 text-xs font-semibold text-white">
            {isDelivered ? "✓ Delivered / ತಲುಪಿದೆ" : "🚚 Out for Delivery / ರವಾನೆಯಲ್ಲಿದೆ"}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="relative">
          {/* Progress bar line */}
          <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-emerald-200 md:left-auto md:top-4 md:bottom-auto md:right-0 md:h-0.5 md:w-full" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex md:flex-col items-start md:items-center gap-3 md:text-center">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all shadow-xs ${
                    step.done
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                      : step.current
                      ? "bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse"
                      : "bg-gray-100 text-gray-400 border border-gray-300"
                  }`}
                >
                  {step.done ? "✓" : idx + 1}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold leading-tight ${step.done || step.current ? "text-emerald-950" : "text-gray-400"}`}>
                    {step.title}
                  </p>
                  <p className="text-[11px] text-emerald-800/80 mt-0.5">
                    {step.kannada}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                    {step.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white/90 p-3 text-xs border border-emerald-100">
        <div className="flex items-center gap-2 text-emerald-900">
          <span className="text-base">📍</span>
          <span>
            <strong>Destination Farm:</strong> {order.shipping_address?.address_1}, {order.shipping_address?.city}, {order.shipping_address?.province} - {order.shipping_address?.postal_code}
          </span>
        </div>
        <div className="text-gray-600">
          Helpline: <strong className="text-emerald-800">+91 94801 23456 (ಕಿಸಾನ್ ಸಹಾಯವಾಣಿ)</strong>
        </div>
      </div>
    </div>
  )
}

export default OrderTracker
