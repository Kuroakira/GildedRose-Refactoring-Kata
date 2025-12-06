export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  update() {
    throw new Error('Not implemented');
  }

  adjustMaxQuality() {
    if (this.quality > 50) {
      this.quality = 50;
    }
  }

  adjustMinQuality() {
    if (this.quality < 0) {
      this.quality = 0;
    }
  }
}

class NormalItem extends Item {
  update() {
    if (this.sellIn <= 0) {
      this.quality = this.quality - 2;
    } else {
      this.quality = this.quality - 1;
    }
    this.sellIn = this.sellIn - 1;

    this.adjustMaxQuality();
    this.adjustMinQuality();
  }
}

class Sulfuras extends Item {
  update() {
    // do nothing
  }
}

class BackstagePasses extends Item {
  update() {
    this.quality = this.quality + 1

    if (this.sellIn < 11) {
      this.quality = this.quality + 1
    }
    if (this.sellIn < 6) {
      this.quality = this.quality + 1
    }

    this.sellIn = this.sellIn - 1;

    if (this.sellIn <= 0) {
      this.quality = 0
    }

    this.adjustMaxQuality();
    this.adjustMinQuality();
  }
}

class AgedBrie extends Item {
  update() {
    this.quality = this.quality + 1;
    this.sellIn = this.sellIn - 1;

    if (this.sellIn <= 0) {
      this.quality = this.quality + 1;
    }

    this.adjustMaxQuality();
    this.adjustMinQuality();
  }
}

const SPECIFIC_ITEMS: { [key: string]: typeof Item } = Object.freeze({
  'Aged Brie': AgedBrie,
  'Backstage passes to a TAFKAL80ETC concert': BackstagePasses,
  'Sulfuras, Hand of Ragnaros': Sulfuras,
});
export class GildedRose {
  items: Array<Item>;
  private COMMON: typeof Item = NormalItem;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const Class = SPECIFIC_ITEMS[this.items[i].name] || this.COMMON;
      const item = new Class(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
      item.update();
      this.items[i].quality = item.quality;
      this.items[i].sellIn = item.sellIn;
    }

    return this.items;
  }
}
