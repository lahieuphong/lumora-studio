import React, { useState } from "react";
import ScreenFrame from "../components/ScreenFrame.jsx";
import {
  Card,
  Button,
  Badge,
  StatusPill,
  SectionTitle,
  Toggle,
  Segmented,
  IconTile,
  Avatar,
} from "../components/primitives.jsx";
import {
  Radio,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Users,
  MessageCircle,
  Heart,
  ThumbsUp,
  Hand,
  Smile,
  Send,
  Flag,
  Share2,
  Lock,
  Globe,
  Link2,
  ScreenShare,
  PhoneOff,
  Camera,
  Wifi,
  ShieldCheck,
  BarChart3,
  HelpCircle,
  Plus,
  Sparkles,
  Volume2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */
const PRIVACY = [
  { value: "public", label: "Công khai", icon: Globe },
  { value: "private", label: "Riêng tư", icon: Lock },
  { value: "link", label: "Chỉ link", icon: Link2 },
];

function ControlButton({ icon: Icon, label, tone = "dark", onClick }) {
  const tones = {
    dark: "bg-white/10 text-white hover:bg-white/20",
    active: "bg-white text-slate-900",
    danger: "bg-rose-500 text-white hover:bg-rose-600",
  };
  return (
    <button
      onClick={onClick}
      title={label}
      className={`grid h-11 w-11 place-items-center rounded-xl2 backdrop-blur transition-all duration-200 active:scale-95 ${tones[tone]}`}
    >
      <Icon className="h-[18px] w-[18px]" />
    </button>
  );
}

function VideoTile({ name, host, muted, camOff, small }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl2 border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 ${
        small ? "aspect-video" : "aspect-[4/3]"
      }`}
    >
      <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-sky-500/20 blur-2xl" />
      <div className="grid h-full place-items-center">
        {camOff ? (
          <Avatar name={name} size="lg" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-violet-500/30 via-sky-500/20 to-teal-500/30">
            <Avatar name={name} size={small ? "md" : "lg"} ring />
          </div>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent px-2.5 py-1.5">
        <span className="flex items-center gap-1 truncate text-[11px] font-semibold text-white">
          {muted ? (
            <MicOff className="h-3 w-3 shrink-0 text-rose-300" />
          ) : (
            <Mic className="h-3 w-3 shrink-0 text-emerald-300" />
          )}
          {name}
        </span>
        {host && (
          <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
            Host
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Chat panel                                                         */
/* ------------------------------------------------------------------ */
const CHAT = [
  { n: "Minh Anh", t: "Chào mọi người, 2 phút nữa bắt đầu nhé!", host: true },
  { n: "Thu Hà", t: "Hóng buổi demo studio 3D quá 🎬" },
  { n: "Quốc Bảo", t: "Âm thanh nghe rõ không mọi người?" },
  { n: "Lan Vy", t: "Rõ nha, hình cũng nét luôn 👍" },
];

function ChatPanel() {
  const reactions = [Heart, ThumbsUp, Hand, Smile];
  return (
    <Card pad={false} className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-brand-teal" />
          <span className="text-sm font-bold text-ink">Trò chuyện trực tiếp</span>
        </div>
        <Badge tone="teal">328 đang xem</Badge>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {CHAT.map((m, i) => (
          <div key={i} className="flex gap-2.5">
            <Avatar name={m.n} size="sm" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[12.5px] font-semibold text-ink">{m.n}</span>
                {m.host && <Badge tone="violet">Host</Badge>}
              </div>
              <p className="text-[13px] leading-snug text-slate-600">{m.t}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-line px-3 py-2.5">
        <div className="mb-2 flex items-center gap-1.5">
          {reactions.map((R, i) => (
            <button
              key={i}
              className="grid h-8 w-8 place-items-center rounded-lg bg-slate-50 text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-500"
            >
              <R className="h-4 w-4" />
            </button>
          ))}
          <div className="ml-auto text-[11px] font-medium text-slate-400">
            1.2K lượt thả tim
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line bg-slate-50 px-3 py-2">
          <input
            disabled
            placeholder="Nhập tin nhắn…"
            className="flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-slate-400"
          />
          <button className="grid h-7 w-7 place-items-center rounded-lg bg-aurora-strong text-white">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Live Room view                                                     */
/* ------------------------------------------------------------------ */
function LiveRoom() {
  const [privacy, setPrivacy] = useState("public");
  const [feat, setFeat] = useState({ chat: true, reaction: true, poll: true, qa: false });
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const setF = (k) => setFeat((s) => ({ ...s, [k]: !s[k] }));

  return (
    <div className="space-y-5">
      {/* config bar */}
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
              Tên phòng live
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5">
              <Radio className="h-4 w-4 text-brand-coral" />
              <input
                defaultValue="Demo studio 3D · Buổi ra mắt"
                className="flex-1 bg-transparent text-sm font-semibold text-ink outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
              Quyền riêng tư
            </label>
            <div className="mt-1.5">
              <Segmented options={PRIVACY} value={privacy} onChange={setPrivacy} size="sm" />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-2.5 border-t border-line pt-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "chat", label: "Chat trực tiếp", icon: MessageCircle },
            { k: "reaction", label: "Reaction", icon: Heart },
            { k: "poll", label: "Bình chọn (Poll)", icon: BarChart3 },
            { k: "qa", label: "Hỏi & Đáp (Q&A)", icon: HelpCircle },
          ].map((f) => (
            <div
              key={f.k}
              className="flex items-center justify-between rounded-xl border border-line bg-slate-50/60 px-3 py-2.5"
            >
              <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                <f.icon className="h-4 w-4 text-slate-400" />
                {f.label}
              </span>
              <Toggle checked={feat[f.k]} onChange={() => setF(f.k)} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button variant="brand" icon={Share2}>
            Publish trang phòng
          </Button>
          <Button variant="secondary" icon={Plus}>
            Nhúng live block vào website
          </Button>
          <div className="ml-auto flex items-center gap-2 text-[12px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Phòng tuân thủ kiểm duyệt nội dung an toàn
          </div>
        </div>
      </Card>

      {/* stage + chat */}
      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="space-y-4">
          <Card pad={false} className="overflow-hidden border-slate-800 bg-slate-900">
            <div className="relative aspect-video">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 via-sky-600/20 to-teal-500/30" />
              <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-teal-500/30 blur-3xl" />
              <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-violet-600/30 blur-3xl" />

              {/* top bar */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-3 py-1 text-[12px] font-bold text-white shadow-lg">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
                  LIVE
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur">
                  <Users className="h-3.5 w-3.5" /> 328
                </span>
              </div>

              {/* host */}
              <div className="grid h-full place-items-center">
                {camOn ? (
                  <Avatar name="Minh Anh" size="lg" ring />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-white/70">
                    <VideoOff className="h-8 w-8" />
                    <span className="text-[12px] font-medium">Camera đang tắt</span>
                  </div>
                )}
              </div>

              {/* floating reactions */}
              <div className="pointer-events-none absolute bottom-20 right-6 flex flex-col items-center gap-3">
                <Heart className="h-5 w-5 animate-float text-rose-400" />
                <ThumbsUp
                  className="h-5 w-5 animate-float text-sky-300"
                  style={{ animationDelay: "0.6s" }}
                />
                <Heart
                  className="h-4 w-4 animate-float text-rose-300"
                  style={{ animationDelay: "1.1s" }}
                />
              </div>

              {/* control bar */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-4">
                <ControlButton
                  icon={micOn ? Mic : MicOff}
                  tone={micOn ? "dark" : "danger"}
                  label="Mic"
                  onClick={() => setMicOn((v) => !v)}
                />
                <ControlButton
                  icon={camOn ? Video : VideoOff}
                  tone={camOn ? "dark" : "danger"}
                  label="Camera"
                  onClick={() => setCamOn((v) => !v)}
                />
                <ControlButton icon={ScreenShare} label="Chia sẻ màn hình" />
                <ControlButton icon={Smile} label="Reaction" />
                <ControlButton icon={PhoneOff} tone="danger" label="Kết thúc" />
              </div>
            </div>
          </Card>

          {/* co-host strip */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            <VideoTile name="Thu Hà" small />
            <VideoTile name="Quốc Bảo" small muted />
            <VideoTile name="Lan Vy" small camOff />
            <VideoTile name="Đức Anh" small />
          </div>
        </div>

        <ChatPanel />
      </div>

      {/* poll / qa / report */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <div className="flex items-center gap-2">
            <IconTile icon={BarChart3} tone="cyan" size="sm" />
            <h3 className="text-sm font-bold text-ink">Bình chọn trực tiếp</h3>
          </div>
          <p className="mt-3 text-[13px] font-semibold text-ink">
            Bạn muốn xem demo phần nào trước?
          </p>
          <div className="mt-3 space-y-2.5">
            {[
              { o: "Dựng cảnh 3D", v: 64 },
              { o: "Live filter / overlay", v: 28 },
              { o: "Xuất video", v: 8 },
            ].map((p) => (
              <div key={p.o}>
                <div className="mb-1 flex justify-between text-[12px]">
                  <span className="font-medium text-ink">{p.o}</span>
                  <span className="font-semibold text-subtle">{p.v}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-aurora-strong"
                    style={{ width: `${p.v}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2">
            <IconTile icon={HelpCircle} tone="violet" size="sm" />
            <h3 className="text-sm font-bold text-ink">Hỏi & Đáp</h3>
          </div>
          <div className="mt-3 space-y-3">
            {[
              { n: "Khánh Vy", q: "Filter có chạy mượt trên điện thoại không ạ?", up: 18 },
              { n: "Tuấn Kiệt", q: "Bản Studio có hỗ trợ avatar VTuber chứ?", up: 11 },
            ].map((q) => (
              <div key={q.n} className="rounded-xl border border-line bg-slate-50/60 p-3">
                <p className="text-[13px] text-ink">{q.q}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">{q.n}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-teal">
                    <ThumbsUp className="h-3 w-3" /> {q.up}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-rose-100 bg-rose-50/40">
          <div className="flex items-center gap-2">
            <IconTile icon={Flag} tone="coral" size="sm" />
            <h3 className="text-sm font-bold text-ink">Kiểm duyệt & báo cáo</h3>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
            Người xem có thể báo cáo nội dung vi phạm. Mọi báo cáo được gửi tới hàng đợi
            kiểm duyệt ở Backoffice kèm mức độ rủi ro.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button variant="danger" size="sm" icon={Flag}>
              Báo cáo phòng
            </Button>
            <Button variant="ghost" size="sm" icon={Lock}>
              Khoá bình luận
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Meeting Room view                                                  */
/* ------------------------------------------------------------------ */
function MeetingRoom() {
  const [gate, setGate] = useState(true);
  const [locked, setLocked] = useState(false);
  const [joined, setJoined] = useState(false);

  return (
    <div className="space-y-5">
      {/* config */}
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <SectionTitle
            eyebrow="Thiết lập"
            title="Tạo phòng họp"
            desc="Cấu hình phòng, chia sẻ link và bật cổng đăng nhập cho người tham gia."
          />
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
                Tên cuộc họp
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2.5">
                <Video className="h-4 w-4 text-brand-cyan" />
                <input
                  defaultValue="Họp dự án Lumora · Sprint review"
                  className="flex-1 bg-transparent text-sm font-semibold text-ink outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-subtle">
                Link tham gia
              </label>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-line bg-slate-50 px-3.5 py-2.5">
                <Link2 className="h-4 w-4 shrink-0 text-slate-400" />
                <span className="flex-1 truncate font-mono text-[13px] text-ink">
                  meet.lumora.app/r/sprint-3f8a
                </span>
                <Button size="sm" variant="secondary">
                  Sao chép
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-line bg-slate-50/60 px-3.5 py-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <div>
                  <div className="text-[13px] font-semibold text-ink">
                    Cổng đăng nhập cho người tham gia
                  </div>
                  <div className="text-[11px] text-subtle">
                    Yêu cầu nhập tên và xác minh trước khi vào phòng
                  </div>
                </div>
              </div>
              <Toggle checked={gate} onChange={setGate} />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="brand" icon={Share2}>
                Chia sẻ / nhúng
              </Button>
              <Button variant="secondary" icon={Plus}>
                Nhúng meeting block
              </Button>
            </div>
          </div>
        </Card>

        {/* device check / join gate */}
        <Card className="flex flex-col">
          <SectionTitle eyebrow="Cổng tham gia" title="Kiểm tra thiết bị" />
          <div className="relative overflow-hidden rounded-xl2 border border-slate-800 bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-600/25 to-violet-600/25" />
            <div className="relative grid aspect-video place-items-center">
              {joined ? (
                <Avatar name="Bạn" size="lg" ring />
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <Camera className="h-7 w-7" />
                  <span className="text-[12px] font-medium">Xem trước camera</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {[
              { icon: Camera, label: "Camera", ok: "Sẵn sàng" },
              { icon: Mic, label: "Micro", ok: "Sẵn sàng" },
              { icon: Wifi, label: "Kết nối mạng", ok: "Ổn định" },
            ].map((d) => (
              <div
                key={d.label}
                className="flex items-center justify-between rounded-lg border border-line bg-slate-50/60 px-3 py-2"
              >
                <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
                  <d.icon className="h-4 w-4 text-slate-400" />
                  {d.label}
                </span>
                <StatusPill status="Verified" label={d.ok} />
              </div>
            ))}
          </div>

          <Button
            variant={joined ? "secondary" : "primary"}
            full
            className="mt-3"
            icon={joined ? undefined : Video}
            onClick={() => setJoined((v) => !v)}
          >
            {joined ? "Rời phòng họp" : "Tham gia phòng họp"}
          </Button>
        </Card>
      </div>

      {/* gallery + participants */}
      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <Card pad={false} className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/15">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Đang họp · 6 người
              </span>
              <Badge tone="slate" icon={Video}>
                Ghi hình: Tắt
              </Badge>
            </div>
            {locked && (
              <Badge tone="amber" icon={Lock}>
                Phòng đã khoá
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
            <VideoTile name="Minh Anh" host small />
            <VideoTile name="Thu Hà" small />
            <VideoTile name="Quốc Bảo" small muted />
            <VideoTile name="Lan Vy" small camOff />
            <VideoTile name="Đức Anh" small />
            <VideoTile name="Gia Huy" small muted />
          </div>
          {/* host control bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-line bg-slate-50/60 px-4 py-3">
            <Button size="sm" variant="secondary" icon={Volume2}>
              Tắt mic tất cả
            </Button>
            <Button
              size="sm"
              variant={locked ? "primary" : "secondary"}
              icon={Lock}
              onClick={() => setLocked((v) => !v)}
            >
              {locked ? "Mở khoá phòng" : "Khoá phòng"}
            </Button>
            <Button size="sm" variant="dangerSolid" icon={PhoneOff}>
              Kết thúc cuộc họp
            </Button>
          </div>
        </Card>

        {/* participant list with host controls */}
        <Card pad={false} className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-bold text-ink">
              <Users className="h-4 w-4 text-brand-teal" />
              Người tham gia
            </span>
            <Badge tone="teal">6</Badge>
          </div>
          <div className="flex-1 divide-y divide-line">
            {[
              { n: "Minh Anh", role: "Host", muted: false },
              { n: "Thu Hà", role: "Editor", muted: false },
              { n: "Quốc Bảo", role: "Khách", muted: true },
              { n: "Lan Vy", role: "Khách", muted: false },
              { n: "Đức Anh", role: "Khách", muted: false },
              { n: "Gia Huy", role: "Khách", muted: true },
            ].map((p) => (
              <div key={p.n} className="flex items-center gap-3 px-4 py-2.5">
                <Avatar name={p.n} size="sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-semibold text-ink">
                      {p.n}
                    </span>
                    {p.role === "Host" && <Badge tone="violet">Host</Badge>}
                  </div>
                  <span className="text-[11px] text-subtle">{p.role}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    title={p.muted ? "Đang tắt mic" : "Tắt mic"}
                    className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-ink"
                  >
                    {p.muted ? (
                      <MicOff className="h-4 w-4 text-rose-400" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </button>
                  {p.role !== "Host" && (
                    <button
                      title="Mời rời phòng"
                      className="grid h-7 w-7 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                    >
                      <PhoneOff className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Screen                                                             */
/* ------------------------------------------------------------------ */
export default function LiveMeeting() {
  const [mode, setMode] = useState("live");

  return (
    <ScreenFrame
      title="Live / Meeting"
      subtitle="Tạo phòng live stream và phòng họp realtime, gắn tương tác và nhúng trực tiếp vào website."
      badge="Realtime SDK"
      badgeTone="cyan"
      actions={
        <>
          <Button variant="ghost" icon={Sparkles}>
            Mẫu phòng
          </Button>
          <Button variant="brand" icon={Plus}>
            Tạo phòng mới
          </Button>
        </>
      }
    >
      <div className="mb-5">
        <Segmented
          options={[
            { value: "live", label: "Live Room", icon: Radio },
            { value: "meeting", label: "Meeting Room", icon: Video },
          ]}
          value={mode}
          onChange={setMode}
        />
      </div>

      {mode === "live" ? <LiveRoom /> : <MeetingRoom />}
    </ScreenFrame>
  );
}
