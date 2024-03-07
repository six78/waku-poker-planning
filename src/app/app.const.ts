export const PUBSUB_TOPIC = "/waku/2/default-waku/proto";
export function createContentTopic(roomId: string) {

  return `/six78/1/${roomId}/json`;
} 
