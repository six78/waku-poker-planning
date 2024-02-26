import { IRelay } from '@waku/sdk';
import { wakuDecoder, wakuEncoder } from '../components/app.utils';
import { IMessage } from '../models/message.model';
import { PUBSUB_TOPIC } from '../app.const';

interface IWakuRelayNode {
  relay: Pick<IRelay, 'send' | 'subscribe' | 'getMeshPeers'>
}

export class WakuNodeService {
  private readonly encoder = wakuEncoder;
  private readonly decoder = wakuDecoder;
  private readonly utf8Encoder = new TextEncoder();
  private readonly utf8Decoder = new TextDecoder();

  constructor(
    private readonly node: IWakuRelayNode
  ) {

  }
  public send(message: IMessage): void {
    console.log('SENDING', message);

    this.node.relay.send(this.encoder, {
      payload: this.encodeUtf8(JSON.stringify(message))
    })
  }

  public subscribe(callback: (message: IMessage) => void): void {
    this.node.relay.subscribe(this.decoder, message => {
      callback(JSON.parse(this.decodeUtf8(message.payload)) as IMessage);
    });
  }

  public logPeers(interval?: number): this {
    console.log('PEERS', this.node.relay.getMeshPeers(PUBSUB_TOPIC));

    if (interval) {
      setInterval(() => {
        console.log('PEERS', this.node.relay.getMeshPeers(PUBSUB_TOPIC));
      }, interval);
    }

    return this;
  }

  public logMessages(): this {
    this.node.relay.subscribe(this.decoder, (x) => {
      const message = this.decodeUtf8(x.payload);
      console.log("MESSAGE RECEIVED", message);
    })

    return this;
  }

  private encodeUtf8(message: string): Uint8Array {
    return this.utf8Encoder.encode(message);
  }

  private decodeUtf8(message: Uint8Array): string {
    return this.utf8Decoder.decode(message);
  }
}