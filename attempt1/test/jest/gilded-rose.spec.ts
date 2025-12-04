import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should Backstage with sellIn under 11', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('Backstage passes to a TAFKAL80ETC concert');
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(9);
  });
});
