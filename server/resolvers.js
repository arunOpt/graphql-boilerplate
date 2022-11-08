import { Company, Job } from "./db.js";
export const resolvers = {
  Query: {
    greeting: () => "Hello",
    jobs: () => Job.findAll(),
    // jobs: async () => [
    //   {
    //     id: "id1",
    //     titile: "name1",
    // //since there is no descrption it returns null
    // // we can return fields other than the schema in resolver but graphql neglets it
    //   },
    //   {
    //     id: "id2",
    //     titile: "name",
    //     description: "descripton2",
    //   },
    // ],
  },
  Job: {
    company: (job) => Company.findById(job.companyId),
  },
};
