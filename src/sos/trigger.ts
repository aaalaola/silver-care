/**
 * 求助按钮触发逻辑
 * 老人端首页那颗红色按钮按下后，通知所有绑定家属。
 *
 * 手抖的老人会连按两三次，如果每次都发，家属一次收到好几条一样的通知，
 * 反而以为出了大事。这里加一个 5 秒合并窗口：同一老人只发第一条。
 */

const COOLDOWN_MS = 5_000;

/** 最近一次成功发出的时间，按老人区分 */
const lastSentAt = new Map<string, number>();

export type SosRequest = {
  elderId: string;
  at: number;
  channel: "app" | "sms";
};

export type Sender = (req: SosRequest) => Promise<void>;

/** 按下求助按钮 */
export async function onSosPress(
  elderId: string,
  send: Sender,
  channel: SosRequest["channel"] = "app",
): Promise<void> {
  const now = Date.now();
  const last = lastSentAt.get(elderId) ?? 0;

  // 5 秒内的重复按下直接忽略，不再打扰家属
  if (now - last < COOLDOWN_MS) return;

  lastSentAt.set(elderId, now);
  await send({ elderId, at: now, channel });
}
