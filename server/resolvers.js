// import { Company, Job } from "./db.js";

import { nanoid } from "nanoid";
import { companyLoader, db } from "./db.js";
const rejectIf = (condition) => {
  if (condition) {
    throw new Error("Unauthourised");
  }
};
export const resolvers = {
  Query: {
    greeting: () => "Hello",
    jobs: async () => {
      return await db.select().from("jobs");
      // Job.findAll();
    },
    job: async (_root, args) => {
      console.log(args, "it will display the argumwnts  passed to it"); //eg: args={id:"1"}
      return await db.select().from("jobs").where("id", id).first();
      // return Job.findById(args.id);
    },
    companies: () => Company.findAll(),
    company: async (_root, { id }) => {
      return await db.select().from("companies").where("id", id).first();
      // Company.findById(id),
    },
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
  Mutation: {
    // createJob: (_root, { title, companyId, description }) =>
    //   Job.create({ title, companyId, description }),
    createJob: async (_root, { input }, context) => {
      const { user } = context;
      rejectIf(!user);
      const job = {
        id: nanoid(),
        companyId: user.companyId,
        ...input,
      };
      await db.insert(job).into("jobs");
      return job;
      // return Job.create(input);
      // return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, context) => {
      const { user } = context;
      rejectIf(!user);

      const job = await Job.findById(id);
      rejectIf(job.companyId !== user.companyId);
      return Job.delete(id);
    },
    updateJob: async (_root, { input }, { user }) => {
      rejectIf(!user);
      if (input.id) {
        const job = await Job.findById(input.id);
        rejectIf(job.companyId !== user.companyId);
      }
      return Job.update({ ...input, companyId: user.companyId });
    },
  },
  Job: {
    company: async (job, _args, context) => {
      const { companyLoader } = context;
      return await companyLoader.load(job.companyId);
      // return await db
      //   .select()
      //   .from("companies")
      //   .where("id", job.companyId)
      //   .first();
      // Company.findById(job.companyId),
    },
  },
  Company: {
    jobs: async (company) => {
      return await db
        .select()
        .from("companies")
        .where("id", job.companyId)
        .first();
      // Job.findAll((job) => job.companyId === company.id),
    },
  },
};
