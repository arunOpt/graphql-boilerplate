// import { Database } from 'fakebase';

// const db = new Database('./data');

// export const Company = db.table('companies');
// export const Job = db.table('jobs');
// export const User = db.table('users');
import DataLoader from "dataloader";
import knex from "knex";

export const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: "./data/db.sqlite3",
  },
  useNullAsDefault: true,
});
export const companyLoader = new DataLoader(async (companyids) => {
  console.log({ companyids });
  const companies = await db
    .select()
    .from("companies")
    .whereIn("id", companyids);
  return companies.map((companyid) => {
    return companies.find((company) => company.id === companyid);
  });
});

export function createCompanyLoader() {
  return companyLoader;
}
