import { Document, FilterQuery, Model, QueryOptions } from 'mongoose';
import { IProjection } from '../interfaces/user';

// Define a mapped type to extract properties of T
export abstract class BaseRepository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Create new document
   * @param item
   */

  async create(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  /**
   * Finds a document by ID.
   * @param id
   */

  async findOneById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  /**
   * Finds a document by condition.
   * @param conditions
   * @param projection
   * @param options
   */

  async findOne(conditions: FilterQuery<T>, projection?: Partial<IProjection>, options?: QueryOptions): Promise<T | null> {
    return this.model.findOne(conditions, projection, options).exec();
  }

  /**
   * Finds all documents by conditions.
   * @param conditions
   * @param projection
   * @param options
   */

  async find(conditions: FilterQuery<T>, projection?: Partial<IProjection>, options?: QueryOptions): Promise<T[]> {
    return this.model.find(conditions, projection, options).exec();
  }

  /**
   * Updates a document by conditions.
   * @param conditions
   * @param item
   */

  async findOneAndUpdate(conditions: FilterQuery<T>, item: Partial<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(conditions, item, { new: true }).exec();
  }

  /**
   * Updates a document by its ID.
   *
   * @param id
   * @param item
   */

  async updateById(id: string, item: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
  }

  /**
   * Deletes a document by its ID.
   *
   * @param {string} id - The ID of the document to delete.
   * @return {Promise<T | null>} A promise that resolves to the deleted document, or null if no document was found.
   */
  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }


}
