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

      this.items[i].quality = this.items[i].quality + 1

      if (this.items[i].name == SPECIFIC_ITEMS.BACKSTAGE_PASSES) {
        // backstage passes
        if (this.items[i].sellIn < 11) {
          this.items[i].quality = this.items[i].quality + 1
        }
        if (this.items[i].sellIn < 6) {
          this.items[i].quality = this.items[i].quality + 1
        }
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].sellIn < 0) {
        switch (this.items[i].name) {
          case SPECIFIC_ITEMS.AGED_BRIE:
            this.items[i].quality = this.items[i].quality + 1;
            break;
          case SPECIFIC_ITEMS.BACKSTAGE_PASSES:
            this.items[i].quality = 0;
            break;
          default:
            continue;
            break;
        }
      }

      // Ensure quality is within valid range
      if (this.items[i].quality < 0) {
        this.items[i].quality = 0;
      }
      if (this.items[i].quality > 50) {
        this.items[i].quality = 50;
      }
    }

    return this.items;
  }
}
