import { createDecoder, createEncoder } from '@waku/sdk';
import { CONTENT_TOPIC, PUBSUB_TOPIC } from '../app.const';

export const utf8Encoder = new TextEncoder();
export const utf8Decoder = new TextDecoder();


export const wakuEncoder = createEncoder({
  contentTopic: CONTENT_TOPIC,
  pubsubTopic: PUBSUB_TOPIC,
});

export const wakuDecoder = createDecoder(CONTENT_TOPIC, PUBSUB_TOPIC);