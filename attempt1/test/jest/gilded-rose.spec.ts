import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('normal items', () => {
    it('should foo', () => {
      const gildedRose = new GildedRose([new Item('normal item', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('normal item');
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(19);
    });
    it('should descrease quality by 2 when sellIn is less than 0', () => {
      const gildedRose = new GildedRose([new Item('normal item', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('normal item');
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(18);
    });
    it('should not decrease quality below 0', () => {
      const gildedRose = new GildedRose([new Item('normal item', 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('normal item');
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });
  });
  describe('Aged Brie', () => {
    it('should increase quality by 1', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Aged Brie');
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(21);
    });
    it('should increase quality by 1 but not exceed 50', () => {
      const gildedRose = new GildedRose([new Item('Aged Brie', 0, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Aged Brie');
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(50);
    });
  });
  describe('Sulfuras', () => {
    it('should not change quality and sellIn', () => {
      const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 10, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Sulfuras, Hand of Ragnaros');
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(80);
    });
  });
  describe('Backstage passes to a TAFKAL80ETC concert', () => {
    it('should increase quality by 1 when sellIn is greater than 10', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(21);
    });
    it('should increase quality by 2 when sellIn is less than 10 but greater than 5', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(22);
    });
    it('should increase quality by 3 when sellIn is less than 5 but greater than 0', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(23);
    });
    it('should set quality to 0 when sellIn is less than 0', () => {
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    })
  });
});
