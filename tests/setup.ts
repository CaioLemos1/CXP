// IntersectionObserver não existe em jsdom; os componentes só precisam que ele exista.
if (typeof globalThis.IntersectionObserver === "undefined") {
  class IO {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error polyfill mínimo para testes
  globalThis.IntersectionObserver = IO;
}
