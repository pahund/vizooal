export default class DataProvider {
    #analyzer = null;
    #amplitudes = null;
    #frequencies = null;

    constructor({ analyzer }) {
        this.#analyzer = analyzer;
        this.#amplitudes = new Uint8Array(this.#analyzer.frequencyBinCount);
        this.#frequencies = new Uint8Array(this.#analyzer.frequencyBinCount);
    }

    update() {
        this.#analyzer.getByteTimeDomainData(this.#amplitudes);
        this.#analyzer.getByteFrequencyData(this.#frequencies);
    }

    get amplitudes() {
        return this.#amplitudes;
    }

    get frequencies() {
        return this.#frequencies;
    }
}