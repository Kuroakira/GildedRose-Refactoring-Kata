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

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private checkAgedBrie(name: string) {
    return name == 'Aged Brie';
  }

  private checkBackstagePasses(name: string) {
    return name == 'Backstage passes to a TAFKAL80ETC concert';
  }

  private checkSulfuras(name: string) {
    return name == 'Sulfuras, Hand of Ragnaros';
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (!this.checkAgedBrie(this.items[i].name) && !this.checkBackstagePasses(this.items[i].name)) {
        if (this.items[i].quality > 0) {
          if (!this.checkSulfuras(this.items[i].name)) {
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1
          if (this.checkBackstagePasses(this.items[i].name)) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      if (!this.checkSulfuras(this.items[i].name)) {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (!this.checkAgedBrie(this.items[i].name)) {
          if (!this.checkBackstagePasses(this.items[i].name)) {
            if (this.items[i].quality > 0) {
              if (!this.checkSulfuras(this.items[i].name)) {
                this.items[i].quality = this.items[i].quality - 1
              }
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
