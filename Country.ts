import "reflect-metadata";
import { Arg, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// TypeORM Entity
@Entity()
@ObjectType()
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({ unique: true })
    code!: string;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    emoji!: string;

    @Field()
    @Column()
    continentCode!: string;
}

// Resolver
@Resolver(Country)
export class CountryResolver {
    @Mutation(() => Country)
    async addCountry(
        @Arg("code") code: string,
        @Arg("name") name: string,
        @Arg("emoji") emoji: string,
        @Arg("continentCode") continentCode: string
    ): Promise<Country> {
        const country = Country.create({ code, name, emoji, continentCode });
        await country.save();
        return country;
    }

    @Query(() => [Country])
    async getAllCountries(): Promise<Country[]> {
        return Country.find();
    }

    @Query(() => Country, { nullable: true })
    async getCountryByCode(@Arg("code") code: string): Promise<Country | null> {
        return Country.findOneBy({ code });
    }

    @Query(() => [Country])
    async getCountriesByContinent(@Arg("continentCode") continentCode: string): Promise<Country[]> {
        return Country.findBy({ continentCode });
    }
}
