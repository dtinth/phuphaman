import type { Loader } from 'astro/loaders';
import { Client, type DatabaseObjectResponse } from '@notionhq/client';

interface NotionDatabaseLoaderOptions {
  databaseId: string;
  titleProperty?: string; // Property name to use as the title/name
  slugProperty?: string; // Property name to use as the slug/ID
}

export function notionDatabaseLoader(options: NotionDatabaseLoaderOptions): Loader {
  return {
    name: 'notion-database-loader',
    async load({ store, logger }) {
      logger.info(`Loading data from Notion database: ${options.databaseId}`);

      const notion = new Client({
        auth: import.meta.env.NOTION_TOKEN,
      });

      try {
        // First, retrieve the database to get its data sources
        const database = (await notion.databases.retrieve({
          database_id: options.databaseId,
        })) as DatabaseObjectResponse;

        // Get the data sources from the database
        const dataSources = database.data_sources;
        if (!dataSources || dataSources.length === 0) {
          logger.warn('No data sources found in database');
          return;
        }

        // Query the first data source (most databases have one data source)
        const dataSourceId = dataSources[0].id;
        const response = await notion.dataSources.query({
          data_source_id: dataSourceId,
        });

        // Clear existing data
        store.clear();

        // Add each page to the store
        for (const page of response.results) {
          const pageData = page as any;

          // Extract title/name from properties
          let name = 'Untitled';
          let slug = '';

          // First, try to find the specified title property or fallback to any title
          if (options.titleProperty && pageData.properties?.[options.titleProperty]) {
            const titleProp = pageData.properties[options.titleProperty];
            if (titleProp.type === 'title' && titleProp.title?.length > 0) {
              name = titleProp.title[0].plain_text;
            }
          } else {
            // Fallback: find any title property
            for (const [, value] of Object.entries(pageData.properties || {})) {
              if ((value as any).type === 'title' && (value as any).title?.length > 0) {
                name = (value as any).title[0].plain_text;
                break;
              }
            }
          }

          // Extract slug from specified property or generate from name
          if (options.slugProperty && pageData.properties?.[options.slugProperty]) {
            const slugProp = pageData.properties[options.slugProperty];
            if (slugProp.type === 'rich_text' && slugProp.rich_text?.length > 0) {
              slug = slugProp.rich_text[0].plain_text;
            } else if (slugProp.type === 'title' && slugProp.title?.length > 0) {
              slug = slugProp.title[0].plain_text;
            }
          }

          // If no slug from property, generate from name
          if (!slug) {
            slug = name
              .toLowerCase()
              .replace(/[^a-z0-9\u0E00-\u0E7F]+/g, '-') // Include Thai characters
              .replace(/^-+|-+$/g, '');
          }

          // Ensure slug is URL-safe
          slug = slug
            .toLowerCase()
            .replace(/[^a-z0-9\u0E00-\u0E7F-]+/g, '-')
            .replace(/^-+|-+$/g, '');

          store.set({
            id: slug,
            data: {
              id: pageData.id,
              name,
              properties: pageData.properties || {},
              url: pageData.url || '',
              created_time: pageData.created_time || '',
              last_edited_time: pageData.last_edited_time || '',
            },
          });
        }

        logger.info(`Successfully loaded ${response.results.length} entries from Notion database`);
      } catch (error) {
        logger.error(`Failed to load data from Notion database: ${error}`);
        throw error;
      }
    },
  };
}