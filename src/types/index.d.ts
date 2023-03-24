export {};

declare global {
  interface Window {
    nostr: {
      getPublicKey(): Promise<string>;
      signEvent(event): Promise<NostrEvent>;
    };
  }
}
