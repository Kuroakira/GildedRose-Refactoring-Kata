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
    if (this.sellIn < 0) {
      this.quality = 0;
      return;
    }

    if (this.sellIn >= 11) {
      this.quality = this.quality + 1;
    } else if (this.sellIn < 11 && this.sellIn >= 6) {
      this.quality = this.quality + 2;
    } else {
      this.quality = this.quality + 3;
    }

    if (this.quality >= 50) {
      this.quality = 50;
    }

    this.sellIn = this.sellIn - 1;
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
    // Sulfuras does not change
    return;
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
  private CommonClass: typeof Item = NormalItem;
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items.map(item => {
      const Class: typeof Item = NameToClass[item.name] || this.CommonClass;
      return new Class(item.name, item.sellIn, item.quality);
    });
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update();
    }

    return this.items;
  }
}
