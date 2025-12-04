export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class BackstagePasses extends Item {
  constructor(sellIn: number, quality: number) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }
  update() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;

      if (this.sellIn < 11 && this.quality < 50) {
        this.quality = this.quality + 1;
      }
      if (this.sellIn < 6 && this.quality < 50) {
        this.quality = this.quality + 1;
      }
    }
    this.sellIn = this.sellIn - 1;
    if (this.sellIn >= 0) {
      return;
    }

    this.quality = this.quality - this.quality;
  }
  static isBackstagePasses(name: string): name is "Backstage passes to a TAFKAL80ETC concert" {
    return name === SpecificItemNames.BACKSTAGE_PASSES;
  }
}

class AgedBrie extends Item {
  constructor(sellIn: number, quality: number) {
    super("Aged Brie", sellIn, quality);
  }
  update() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
    this.sellIn = this.sellIn - 1;

    if (this.sellIn >= 0) {
      return;
    }

    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
  }
  static isAgedBrie(name: string): name is "Aged Brie" {
    return name === SpecificItemNames.AGED_BRIE;
  }
}

class Sulfuras extends Item {
  constructor(sellIn: number, quality: number) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }
  update() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
    return;
  }
  static isSulfuras(name: string): name is "Sulfuras, Hand of Ragnaros" {
    return name === SpecificItemNames.SULFURAS;
  }
}


const SpecificItemNames = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
}

const SPECIFIC_ITEMS = Object.values(SpecificItemNames)

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const itemName = this.items[i].name;

      if (BackstagePasses.isBackstagePasses(itemName)) {
        const backstagePasses = new BackstagePasses(this.items[i].sellIn, this.items[i].quality);
        backstagePasses.update();
        this.items[i].quality = backstagePasses.quality;
        this.items[i].sellIn = backstagePasses.sellIn;
        continue;
      }

      if (AgedBrie.isAgedBrie(itemName)) {
        const agedBrie = new AgedBrie(this.items[i].sellIn, this.items[i].quality);
        agedBrie.update();
        this.items[i].quality = agedBrie.quality;
        this.items[i].sellIn = agedBrie.sellIn;
        continue;
      }

      if (Sulfuras.isSulfuras(itemName)) {
        const sulfuras = new Sulfuras(this.items[i].sellIn, this.items[i].quality);
        sulfuras.update();
        this.items[i].quality = sulfuras.quality;
        this.items[i].sellIn = sulfuras.sellIn;
        continue;
      }

      if (
        !SPECIFIC_ITEMS.includes(itemName) &&
        this.items[i].quality > 0
      ) {
        this.items[i].quality = this.items[i].quality - 1
      }

      if (itemName !== SpecificItemNames.SULFURAS) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      if (this.items[i].sellIn >= 0) {
        continue;
      }

      if (
        this.items[i].quality > 0 &&
        itemName !== SpecificItemNames.SULFURAS
      ) {
        this.items[i].quality = this.items[i].quality - 1
      }
    }

    return this.items;
  }
}
