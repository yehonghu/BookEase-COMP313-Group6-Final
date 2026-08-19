import { useState } from "react";
import { sendContactMessage } from "../api/contact.api";

const isPublicDemo = import.meta.env.VITE_DEMO_MODE === "true";
const uploadsEnabled = import.meta.env.VITE_UPLOADS_ENABLED === "true";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "General",
    address: "",
    message: "",
    rating: 5,
    lat: "",
    lng: "",
  });

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onPickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // optional: validate type + size
    const okTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!okTypes.includes(f.type)) {
      setErr("Only PNG/JPG/WEBP images are allowed.");
      e.target.value = "";
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setErr("Image too large. Max 5MB.");
      e.target.value = "";
      return;
    }

    setErr("");
    setFile(f);
  };

  const useMyLocation = async () => {
    setErr("");
    setOk("");

    if (!("geolocation" in navigator)) {
      setErr("Geolocation is not supported by this browser.");
      return;
    }

    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setForm((p) => ({
          ...p,
          lat: String(lat),
          lng: String(lng),

        }));

        setOk("📍 Location captured (lat/lng).");
        setLocLoading(false);
      },
      (e) => {
        setLocLoading(false);
        setErr(
          e.code === 1
            ? "Location permission denied."
            : "Failed to get your location."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setOk("");
    setErr("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErr("Please fill in all required fields.");
      return;
    }
    if (!validateEmail(form.email)) {
      setErr("Invalid email format.");
      return;
    }
    if (isPublicDemo) {
      setErr("This public showcase is read-only. Connect the BookEase API to send live messages.");
      return;
    }

    setLoading(true);
    try {
    
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ""));
      if (uploadsEnabled && file) fd.append("attachment", file);

      await sendContactMessage(fd);

      setOk("✅ Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        purpose: "General",
        address: "",
        message: "",
        rating: 5,
        lat: "",
        lng: "",
      });
      setFile(null);
    } catch (e2) {
      const msg =
        e2?.response?.data?.errors?.[0]?.msg ||
        e2?.response?.data?.message ||
        "Failed to send message";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-[1000px] mx-auto">
      <h1 className="text-4xl font-semibold mb-2">Contact Us</h1>
      <p className="text-apple-gray-500 text-lg mb-8">
        Have questions or feedback? Send us a message and we’ll get back to you.
      </p>

      <div className="glass-card rounded-2xl p-6">
        {err && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-xl">
            {err}
          </div>
        )}
        {ok && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-xl">
            {ok}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm text-apple-gray-700">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-apple-gray-200 focus:outline-none"
              placeholder="Your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-apple-gray-700">Email *</label>
            <input
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-apple-gray-200 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-apple-gray-700">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-apple-gray-200 focus:outline-none"
              placeholder="(optional) +1 647..."
            />
          </div>

          {/* Purpose */}
          <div>
            <label className="text-sm text-apple-gray-700">Purpose</label>
            <select
              name="purpose"
              value={form.purpose}
              onChange={onChange}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-apple-gray-200 focus:outline-none"
            >
              <option value="General">General</option>
              <option value="Service Request">Service Request</option>
              <option value="Support">Support</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm text-apple-gray-700">Rating</label>
            <div className="mt-1 flex items-center gap-3">
              <input
                type="range"
                name="rating"
                min="1"
                max="5"
                value={form.rating}
                onChange={onChange}
                className="w-full"
              />
              <span className="text-sm font-semibold w-10 text-right">
                {form.rating}/5
              </span>
            </div>
          </div>

          {/* Address + Location */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm text-apple-gray-700">Address</label>
              <button
                type="button"
                onClick={useMyLocation}
                disabled={locLoading}
                className="px-3 py-2 rounded-xl bg-apple-gray-100 hover:bg-apple-gray-200 text-sm font-medium disabled:opacity-60"
              >
                {locLoading ? "Getting location..." : "Use my location"}
              </button>
            </div>

            <input
              name="address"
              value={form.address}
              onChange={onChange}
              className="w-full px-4 py-2.5 rounded-xl border border-apple-gray-200 focus:outline-none"
              placeholder="(optional) Your location / address"
            />

            {/* Show captured coords if any */}
            {(form.lat || form.lng) && (
              <p className="text-xs text-apple-gray-500">
                Captured: lat {form.lat || "-"}, lng {form.lng || "-"}
              </p>
            )}
          </div>

          {/* Attachments are only enabled when durable object storage is configured. */}
          {uploadsEnabled ? (
            <div>
              <label className="text-sm text-apple-gray-700">Attachment (optional)</label>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={onPickFile}
                className="w-full mt-1 px-4 py-2.5 rounded-xl border border-apple-gray-200 focus:outline-none bg-white"
              />
              {file && <p className="text-xs text-apple-gray-500 mt-1">Selected: <span className="font-semibold">{file.name}</span></p>}
            </div>
          ) : (
            <div className="rounded-xl border border-apple-gray-200 bg-apple-gray-50 px-4 py-3 text-xs leading-5 text-apple-gray-500">
              Attachments are temporarily unavailable in the Toronto public beta. Please include the relevant details in your message instead.
            </div>
          )}

          {/* Message */}
          <div>
            <label className="text-sm text-apple-gray-700">Message *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              className="w-full mt-1 px-4 py-2.5 rounded-xl border border-apple-gray-200 focus:outline-none"
              rows={5}
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-full bg-apple-blue text-white font-medium hover:bg-blue-600 transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}