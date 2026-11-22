/**
 * 求助按钮触发逻辑
 * 老人端首页那颗红色按钮按下后，通知所有绑定家属。
 */

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
  await send({ elderId, at: Date.now(), channel });
}
