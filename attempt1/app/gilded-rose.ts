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

const SPECIFIC_ITEMS = Object.freeze({
  AGED_BRIE: 'Aged Brie',
  BACKSTAGE_PASSES: 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS: 'Sulfuras, Hand of Ragnaros',
});

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

      if (this.items[i].name != SPECIFIC_ITEMS.AGED_BRIE && this.items[i].name != SPECIFIC_ITEMS.BACKSTAGE_PASSES) {
        if (this.items[i].quality > 0) {
          this.items[i].quality = this.items[i].quality - 1
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == SPECIFIC_ITEMS.BACKSTAGE_PASSES) {
            if (this.items[i].sellIn < 11 && this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1
            }
            if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1
            }
          }
        }
      }

      this.items[i].sellIn = this.items[i].sellIn - 1;

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != SPECIFIC_ITEMS.AGED_BRIE) {
          if (this.items[i].name != SPECIFIC_ITEMS.BACKSTAGE_PASSES) {
            if (this.items[i].quality > 0) {
              this.items[i].quality = this.items[i].quality - 1
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
