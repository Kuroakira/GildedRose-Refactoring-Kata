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

const SPECIFIC_ITEMS = Object.freeze({
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
});

const SPECIFIC_ITEMS_ARRAY: string[] = Object.values(SPECIFIC_ITEMS);

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === SPECIFIC_ITEMS.SULFURAS) {
        const sulfuras = new Sulfuras(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
        sulfuras.update();
        this.items[i].quality = sulfuras.quality;
        this.items[i].sellIn = sulfuras.sellIn;
        continue;
      }

      if (!SPECIFIC_ITEMS_ARRAY.includes(this.items[i].name)) {
        // normal item
        const normalItem = new NormalItem(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
        normalItem.update();
        this.items[i].quality = normalItem.quality;
        this.items[i].sellIn = normalItem.sellIn;
        continue;
      }


      if (this.items[i].name == SPECIFIC_ITEMS.BACKSTAGE_PASSES) {
        const backstagePasses = new BackstagePasses(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
        backstagePasses.update();
        this.items[i].quality = backstagePasses.quality;
        this.items[i].sellIn = backstagePasses.sellIn;
        continue;
      }

      if (this.items[i].name == SPECIFIC_ITEMS.AGED_BRIE) {
        const agedBrie = new AgedBrie(this.items[i].name, this.items[i].sellIn, this.items[i].quality);
        agedBrie.update();
        this.items[i].quality = agedBrie.quality;
        this.items[i].sellIn = agedBrie.sellIn;
        continue;
      }
    }

    return this.items;
  }
}
