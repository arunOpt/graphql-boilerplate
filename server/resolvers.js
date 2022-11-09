import { Company, Job } from "./db.js";
export const resolvers = {
  Query: {
    greeting: () => "Hello",
    jobs: () => Job.findAll(),
    job: (_root, args) => {
      console.log(args, "it will display the argumwnts  passed to it"); //eg: args={id:"1"}
      return Job.findById(args.id);
    },
    companies: () => Company.findAll(),
    company: (_root, { id }) => Company.findById(id),
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
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },
};
