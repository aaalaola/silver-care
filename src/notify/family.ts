/**
 * 家属端通知推送
 * 一位老人可能绑定多个家属，求助要同时推到所有设备。
 */

export type FamilyDevice = {
  userId: string;
  token: string;
};

export type PushResult = {
  delivered: number;
  failed: number;
};

export async function pushFamily(
  devices: FamilyDevice[],
  title: string,
  body: string,
): Promise<PushResult> {
  let delivered = 0;
  let failed = 0;

  for (const device of devices) {
    try {
      const res = await fetch("https://push.silver-care.internal/v1/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: device.token, title, body }),
      });
      if (res.ok) delivered += 1;
      else failed += 1;
    } catch {
      failed += 1;
    }
  }

  return { delivered, failed };
}
