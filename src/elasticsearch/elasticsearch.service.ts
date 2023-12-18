import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ElasticsearchService {
  private readonly esClient: Client;

  constructor() {
    this.esClient = new Client({ node: process.env.ELASTICSEARCH_NODE });
  }

  async indexDocument(index: string, id: string, document: any) {
    return await this.esClient.index({ index, id, body: document });
  }

  async search(index: string, query: any) {
    return await this.esClient.search({ index, body: query });
  }
}
