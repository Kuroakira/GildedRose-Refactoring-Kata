export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
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

const SpecificItemNames = {
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
}

const NameToClass: { [key: string]: typeof Item} = {
  [SpecificItemNames.AGED_BRIE]: AgedBrie,
  [SpecificItemNames.BACKSTAGE_PASSES]: BackstagePasses,
  [SpecificItemNames.SULFURAS]: Sulfuras,
};

export class GildedRose {
  private CommonClass: typeof Item = Item;
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items.map(item => {
      const Class: typeof Item = NameToClass[item.name] || this.CommonClass;
      return new Class(item.name, item.sellIn, item.quality);
    });
  }

  updateQuality() {
    // The golden master test is using the original items array, so we need to keep the original array's references.
    // If we create a new item, it will not be the same object as the original item, and the golden master test will fail.
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
    }

    return this.items;
  }
}
