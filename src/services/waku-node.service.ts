import { message } from '@waku/core';
import { Decoder, Encoder, IFilterSubscription, LightNode, Protocols, createDecoder, createEncoder, createLightNode, waitForRemotePeer } from '@waku/sdk';
import { wakuDecoder, wakuEncoder } from '../components/app.utils';
import { IMessage } from '../models/message.model';
import { wakuDnsDiscovery } from "@waku/dns-discovery";


export class WakuNodeServiceFactory {
  constructor(
    private readonly contentTopic: string,
    private readonly pubSubTopic: string
  ) {

  }

  async create(): Promise<WakuNodeService> {
    console.log('CREATING NODE...');
    const node = await createLightNode({
      libp2p: {
        peerDiscovery: [
          wakuDnsDiscovery(
            ["enrtree://ANEDLO25QVUGJOUTQFRYKWX6P4Z4GKVESBMHML7DZ6YK4LGS5FC5O@prod.wakuv2.nodes.status.im"],
            {
              lightPush: 3,
              filter: 3,
            }),
        ],
      },
    });
    console.log('NODE CREATED, STARTING...');
    await node.start();
    console.log('NODE STARTED, WAITING FOR PEARS...');
    await waitForRemotePeer(node, [
      Protocols.LightPush,
      Protocols.Filter,
    ]);
    console.log('NODE PEERS AWAITED, WAITING FOR SUBSCRIPTION...');

    const subscription = await node.filter.createSubscription();
    console.log('NODE IS READY');

    return new WakuNodeService(this.contentTopic, this.pubSubTopic, node, subscription);
  }
}

export class WakuNodeService {
  private readonly encoder: Encoder = wakuEncoder;
  private readonly decoder: Decoder = wakuDecoder;
  private readonly utf8Encoder = new TextEncoder();
  private readonly utf8Decoder = new TextDecoder();

  private readonly callbacks: ((message: IMessage) => void)[] = [];

  constructor(

    private readonly contentTopic: string,
    private readonly pubSubTopic: string,
    private readonly node: LightNode,
    private readonly subscription: IFilterSubscription,
  ) {
    this.encoder = createEncoder({ contentTopic });
    this.decoder = createDecoder(contentTopic);

    this.foo();
  }

  private async foo(): Promise<void> {
    await this.node.filter.subscribe([this.decoder], rawMessage => {
      const message = JSON.parse(this.decodeUtf8((rawMessage as any).proto.payload)) as IMessage;
      console.log('RECEIVED', message);
      this.callbacks.forEach(x => x(message));
    })
  }

  public send(message: IMessage): void {
    console.log('SENDING', message);

    this.node.lightPush.send(this.encoder, {
      payload: this.encodeUtf8(JSON.stringify(message))
    })
  }

  public subscribe(callback: (message: IMessage) => void): void {
    this.callbacks.push(callback);
  }

  private encodeUtf8(message: string): Uint8Array {
    return this.utf8Encoder.encode(message);
  }

  private decodeUtf8(message: Uint8Array): string {
    return this.utf8Decoder.decode(message);
  }
}


export class WakuNodeService2 {
  private readonly encoder = wakuEncoder;
  private readonly decoder = wakuDecoder;
  private readonly utf8Encoder = new TextEncoder();
  private readonly utf8Decoder = new TextDecoder();

  constructor(
    private readonly node: LightNode
  ) {

  }
  public send(message: IMessage): void {
    console.log('SENDING', message);

    this.node.lightPush.send(this.encoder, {
      payload: this.encodeUtf8(JSON.stringify(message))
    })
  }

  public subscribe(callback: (message: IMessage) => void): void {
    this.node.filter.subscribe(this.decoder, message => {
      callback(JSON.parse(this.decodeUtf8(message.payload)) as IMessage);
    });
  }

  public logPeers(interval?: number): this {
    // console.log('PEERS', this.node.filter.getMeshPeers(PUBSUB_TOPIC));

    // if (interval) {
    //   setInterval(() => {
    //     console.log('PEERS', this.node.relay.getMeshPeers(PUBSUB_TOPIC));
    //   }, interval);
    // }

    return this;
  }

  public logMessages(): this {
    this.node.filter.subscribe(this.decoder, (x) => {
      const message = this.decodeUtf8(x.payload);
      console.log("RAW MESSAGE RECEIVED", message);
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