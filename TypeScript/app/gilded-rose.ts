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
}

class NormalItem extends Item {
  constructor(name: string, sellIn: number, quality: number) {
    super(name, sellIn, quality);
  }
  update() {
    if (this.quality > 0) {
      this.quality = this.quality - 1;
    }
    this.sellIn = this.sellIn - 1;
    if (this.sellIn >= 0) {
      return;
    }
    if (this.quality > 0) {
      this.quality = this.quality - 1;
    }
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
}

const SpecificItemNames = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const itemName = this.items[i].name;

      switch (itemName) {
        case SpecificItemNames.BACKSTAGE_PASSES:
          const backstagePasses = new BackstagePasses(this.items[i].sellIn, this.items[i].quality);
          backstagePasses.update();
          this.items[i].quality = backstagePasses.quality;
          this.items[i].sellIn = backstagePasses.sellIn;
          break;
        case SpecificItemNames.AGED_BRIE:
          const agedBrie = new AgedBrie(this.items[i].sellIn, this.items[i].quality);
          agedBrie.update();
          this.items[i].quality = agedBrie.quality;
          this.items[i].sellIn = agedBrie.sellIn;
          break;
        case SpecificItemNames.SULFURAS:
          const sulfuras = new Sulfuras(this.items[i].sellIn, this.items[i].quality);
          sulfuras.update();
          this.items[i].quality = sulfuras.quality;
          this.items[i].sellIn = sulfuras.sellIn;
          break;
        default:
          const normalItem = new NormalItem(itemName, this.items[i].sellIn, this.items[i].quality);
          normalItem.update();
          this.items[i].quality = normalItem.quality;
          this.items[i].sellIn = normalItem.sellIn;
          break;
      }
    }

    return this.items;
  }
}
