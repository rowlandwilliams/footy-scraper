import updatedUrlsToSaveToDb from './data/updated/updatedUrlsToSaveToDb.json';
import prodRetailsPrices from './data/prodRetailPrices.json';

export const processRetailPrices = () => {
    // go into existing prices and calculate average price for each day
    const commodityIds = [...new Set(updatedUrlsToSaveToDb.map((url) => url.commodity_id))];

    console.log(commodityIds);
};

processRetailPrices();
