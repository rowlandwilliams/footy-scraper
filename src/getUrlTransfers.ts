import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from '../prisma';

export const getUrlTransfers = async (url: string, urlId: number) => {
    try {
        const response = await axios(url);

        const htmlData = response.data;
        const $ = cheerio.load(htmlData);

        const textArray = $('.qa-story-body')
            .children()
            .map((_, el) => {
                const text = $(el).text();
                const source = $(el).find('a').attr('href');

                return text.length > 0 && text.includes('external-link')
                    ? { text: text.replace(/\s*\([^)]*\)external-link$/, ''), source, urlId }
                    : null;
            })
            .get()
            .filter(Boolean);

        await prisma.rumour.createMany({ data: textArray });

        console.log(textArray);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
