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

      if (
        SPECIFIC_ITEMS.includes(itemName) &&
        this.items[i].quality < 50
      ) {
        this.items[i].quality = this.items[i].quality + 1;
      }

      if (
        this.items[i].name === SpecificItemNames.BACKSTAGE_PASSES &&
        this.items[i].quality < 50
      ) {
        if (this.items[i].sellIn < 11) {
          this.items[i].quality = this.items[i].quality + 1
        }
        if (this.items[i].sellIn < 6) {
          this.items[i].quality = this.items[i].quality + 1
        }
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

      if (itemName === SpecificItemNames.AGED_BRIE) {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
        }
        continue;
      }

      if (itemName === SpecificItemNames.BACKSTAGE_PASSES) {
        this.items[i].quality = this.items[i].quality - this.items[i].quality;
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
