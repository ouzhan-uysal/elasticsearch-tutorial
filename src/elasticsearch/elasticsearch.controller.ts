import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('elasticsearch')
export class ElasticsearchController {
  constructor(private readonly esService: ElasticsearchService) { }

  @Post(':index/:id')
  async indexDocument(@Param('index') index: string, @Param('id') id: string, @Body() document: any) {
    return this.esService.indexDocument(index, id, document);
  }

  @Get(':index')
  async search(@Param('index') index: string) {
    const query = {
      query: {
        match_all: {} // you can use diff query
      }
    };
    return this.esService.search(index, query);
  }

  @Get(':index/:position')
  async searchByPosition(@Param('index') index: string, @Param('position') position: string) {
    const query = {
      query: {
        match: {
          position
        }
      }
    };
    return this.esService.search(index, query);
  }

  @Get(':index/:name')
  async searchByName(@Param('index') index: string, @Param('name') name: string) {
    const query = {
      query: {
        match: {
          name
        }
      }
    };
    return this.esService.search(index, query);
  }
}
