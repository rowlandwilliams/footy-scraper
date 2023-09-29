import { prisma } from './../prisma/index';
import axios from 'axios';
import * as cheerio from 'cheerio';

let urlId = 0;

const getUrl = ($: cheerio.CheerioAPI) => $($('a:contains("gossip")')).attr('href');

const getPreviousUrls = async (url: string, currentDate: Date) => {
    try {
        urlId = urlId + 1;
        const response = await axios(url);

        const $ = cheerio.load(response.data);

        const prevDayUrl = getUrl($);
        const prevDayDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

        if (prevDayUrl) {
            console.log(prevDayDate, prevDayUrl);
            await prisma.url.create({ data: { url: prevDayUrl, date: prevDayDate } });
            await getPreviousUrls(prevDayUrl, prevDayDate);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

getPreviousUrls('https://www.bbc.co.uk/sport/65798427', new Date());
