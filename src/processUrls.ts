import prodUrls from './data/prodUrls.json';
import updatedUrls from './data/updatedUrls.json';
import commodities from './data/globalCommodities.json';
import prodRetailPrices from './data/prodRetailPrices.json';
import fs from 'fs';

export const processUrls = () => {
    const urlIdsToRemove = updatedUrls.filter((url) => url.remove === 'TRUE').map(({ id }) => id);

    const filteredProdUrls = prodUrls.filter((url) => !urlIdsToRemove.includes(url.id));

    const prodUrlsWithNewCommodityIdsAndNkg = filteredProdUrls.map((prodUrl) => {
        const updatedUrl = updatedUrls.find((updatedUrl) => updatedUrl.id === prodUrl.id);

        return updatedUrl
            ? {
                  ...prodUrl,
                  commodity_id: commodities.find((commodity) => commodity.name === updatedUrl.commodity).id,
                  n_kg: updatedUrl.n_kg,
              }
            : prodUrl;
    });

    try {
        const filePath = `${__dirname}/data/updated/updatedUrlsToSaveToDb.json`;
        const jsonData = JSON.stringify(prodUrlsWithNewCommodityIdsAndNkg, null, 2);
        fs.writeFileSync(filePath, jsonData);
        console.log('saved data');
    } catch (error) {
        console.error(error);
    }

    // console.log(prodUrlsWithNewCommodityIdsAndNkg);
};

processUrls();
