import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { Country, CountryResolver } from "./Country";
import AppDataSource from "./data-source"

async function main() {
    await AppDataSource.initialize();

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer({
        schema,
    });

    const europeanCountries = [
        { name: "France", code: "FR", emoji: "🇫🇷", continentCode: "EU" },
        { name: "Germany", code: "DE", emoji: "🇩🇪", continentCode: "EU" },
        { name: "Italy", code: "IT", emoji: "🇮🇹", continentCode: "EU" },
        { name: "Spain", code: "ES", emoji: "🇪🇸", continentCode: "EU" },
        { name: "United Kingdom", code: "GB", emoji: "🇬🇧", continentCode: "EU" },
        { name: "Belgium", code: "BE", emoji: "🇧🇪", continentCode: "EU" },
    ];

    for (const country of europeanCountries) {
        const countryEntity = Country.create({ ...country });
        await AppDataSource.manager.save(countryEntity);
    }

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 }, 
    });
    console.log(`🚀 Server ready at: ${url}`);
}

main().catch((error) => {
    console.error(error);
});