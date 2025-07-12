// Enhanced randomizer utility with better randomness
export class EnhancedRandomizer {
  private static seedRandom(): number {
    // Use multiple entropy sources for better randomness
    const now = Date.now();
    const performance = window.performance?.now() || 0;
    const random = Math.random();
    
    // Combine multiple sources
    const seed = (now * performance * random) % 1;
    return seed;
  }

  static selectRandomGuide<T>(availableItems: T[]): T | null {
    if (availableItems.length === 0) return null;
    if (availableItems.length === 1) return availableItems[0];

    // Use enhanced randomness
    const randomValue = this.seedRandom();
    const index = Math.floor(randomValue * availableItems.length);
    
    // Ensure index is within bounds (extra safety)
    const safeIndex = Math.max(0, Math.min(index, availableItems.length - 1));
    
    return availableItems[safeIndex];
  }

  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomValue = this.seedRandom();
      const j = Math.floor(randomValue * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  // Verify randomness distribution (for testing)
  static testRandomness(iterations: number = 10000): { [key: string]: number } {
    const testArray = ['A', 'B', 'C', 'D', 'E'];
    const results: { [key: string]: number } = {};
    
    // Initialize counters
    testArray.forEach(item => results[item] = 0);
    
    // Run test
    for (let i = 0; i < iterations; i++) {
      const selected = this.selectRandomGuide(testArray);
      if (selected) {
        results[selected]++;
      }
    }
    
    // Convert to percentages
    Object.keys(results).forEach(key => {
      results[key] = (results[key] / iterations) * 100;
    });
    
    return results;
  }
}