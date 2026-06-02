import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService implements OnModuleDestroy {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.cache.get<T>(key);
  }

  async set(key: string, value: any, ttl: number = 60 * 1000): Promise<void> {
    await this.cache.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cache.del(key);
  }

  /**
   * Clear all cache
   */
  async reset(): Promise<void> {
    try {
      // For Keyv-based stores
      if (this.cache.stores && this.cache.stores.length > 0) {
        const store = this.cache.stores[0] as any;
        if (store && typeof store.clear === 'function') {
          await store.clear();
          console.log('All cache cleared successfully');
        }
      } else {
        console.warn('Cache reset not fully supported');
      }
    } catch (error) {
      console.error('Failed to reset cache:', error);
    }
  }

  /**
   * Graceful shutdown
   */
  async onModuleDestroy() {
    try {
      if (this.cache.stores && this.cache.stores.length > 0) {
        const store = this.cache.stores[0] as any;

        if (store?.disconnect && typeof store.disconnect === 'function') {
          await store.disconnect();
        } else if (store?.quit && typeof store.quit === 'function') {
          await store.quit();
        } else if (store?.end && typeof store.end === 'function') {
          store.end(true);
        }

        console.log('Redis connection closed gracefully');
      }
    } catch (error) {
      console.warn('Error while closing Redis connection:', error);
    }
  }
}