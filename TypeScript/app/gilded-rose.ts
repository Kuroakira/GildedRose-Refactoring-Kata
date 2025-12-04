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

class ItemFactory {
  static createItem(name: string, sellIn: number, quality: number): Item {
    switch (name) {
      case SpecificItemNames.AGED_BRIE:
        return new AgedBrie(sellIn, quality);
      case SpecificItemNames.BACKSTAGE_PASSES:
        return new BackstagePasses(sellIn, quality);
      case SpecificItemNames.SULFURAS:
        return new Sulfuras(sellIn, quality);
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
    return this.items.map(item => {
      const itemToUpdate = ItemFactory.createItem(item.name, item.sellIn, item.quality);
      itemToUpdate.update();
      return itemToUpdate;
    });
  }
}
