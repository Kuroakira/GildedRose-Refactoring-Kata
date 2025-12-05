export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  update(): void {
    throw new Error("Not implemented");
  }
}

class BackstagePasses extends Item {
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
  update() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
    return;
  }
}

class ItemFactory {
  static createItem(name: string, sellIn: number, quality: number): Item {
    switch (name) {
      case SpecificItemNames.AGED_BRIE:
        return new AgedBrie(name, sellIn, quality);
      case SpecificItemNames.BACKSTAGE_PASSES:
        return new BackstagePasses(name, sellIn, quality);
      case SpecificItemNames.SULFURAS:
        return new Sulfuras(name, sellIn, quality);
      default:
        return new NormalItem(name, sellIn, quality);
    }
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
    // The golden master test is using the original items array, so we need to keep the original array's references.
    // If we create a new item, it will not be the same object as the original item, and the golden master test will fail.
    for (let i = 0; i < this.items.length; i++) {
      const item = ItemFactory.createItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
      item.update();
      this.items[i].quality = item.quality;
      this.items[i].sellIn = item.sellIn;
    }

    return this.items;
  }
}
