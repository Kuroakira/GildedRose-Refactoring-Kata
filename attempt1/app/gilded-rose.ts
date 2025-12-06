export class Item {
  name: string;
  sellIn: number;
  quality: number;
  MAX_QUALITY: number = 50;
  MIN_QUALITY: number = 0;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  update() {
    throw new Error('Not implemented');
  }

  adjustMaxQuality() {
    if (this.quality > this.MAX_QUALITY) {
      this.quality = this.MAX_QUALITY;
    }
  }

  adjustMinQuality() {
    if (this.quality < this.MIN_QUALITY) {
      this.quality = this.MIN_QUALITY;
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
  MAX_QUALITY: number = 80;

  update() {
    this.quality = this.MAX_QUALITY;
  }
  adjustMaxQuality(): void {
    // do nothing, sulfuras has a fixed quality
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

class ConjuredItem extends Item {
  update() {
    if (this.sellIn <= 0) {
      this.quality = this.quality - 4;
    } else {
      this.quality = this.quality - 2;
    }
    this.sellIn = this.sellIn - 1;

    this.adjustMaxQuality();
    this.adjustMinQuality();
  }
}

const SPECIFIC_ITEMS: { [key: string]: typeof Item } = Object.freeze({
  'Aged Brie': AgedBrie,
  'Backstage passes to a TAFKAL80ETC concert': BackstagePasses,
  'Sulfuras, Hand of Ragnaros': Sulfuras,
  'Conjured Item': ConjuredItem,
});
export class GildedRose {
  items: Item[];
  private COMMON: typeof Item = NormalItem;

  constructor(items: Item[] = []) {
    this.items = items.map(item => {
      const Class = SPECIFIC_ITEMS[item.name] || this.COMMON;
      return new Class(item.name, item.sellIn, item.quality);
    });
  }

  updateQuality() {
    return this.items.map(item => {
      item.update();
      return item;
    });
  }
}
