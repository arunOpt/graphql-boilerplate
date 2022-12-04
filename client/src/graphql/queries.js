import { gql, request } from "graphql-request";
import { getAccessToken } from "../auth";
const GRAPHQL_URL = "http://localhost:9000/graphql";
const getJobs = async () => {
  // this gql is not same as apollo gql
  const query = gql`
    query {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
  `;
  const { jobs } = await request(GRAPHQL_URL, query); //data.jobs or {jobs}
  return jobs;
};

const getJob = async (id) => {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const varaibles = { id }; //js variable can be passed to graphql by passing it as a third argument to request
  const { job } = await request(GRAPHQL_URL, query, varaibles); //data.jobs or {jobs}
  return job;
};

const createJob = async (input) => {
  const query = gql`
    mutation Mutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        # job: is alias for createjob return data
        id
      }
    }
  `;
  const varaibles = { input }; //js variable can be passed to graphql by passing it as a third argument to request
  const headers = { Authorization: "Bearer " + getAccessToken() };
  const { job } = await request(GRAPHQL_URL, query, varaibles, headers); //data.jobs or {jobs}
  return job;
};
// const updateJob = async (input) => {
//   const query = gql`
//     mutation Mutation($input: UpdateJobInput!) {
//       job: updateJob(input: $input) {
//         # job: is alias for createjob return data
//         id
//       }
//     }
//   `;
//   const varaibles = { input }; //js variable can be passed to graphql by passing it as a third argument to request
//   const headers = { Authorization: "Bearer " + getAccessToken() };
//   const { job } = await request(GRAPHQL_URL, query, varaibles, headers); //data.jobs or {jobs}
//   return job;
// };

// const deleteJob = async (input) => {
//   const query = gql`
//     mutation Mutation($input: CreateJobInput!) {
//       job: createJob(input: $input) {
//         # job: is alias for createjob return data
//         id
//       }
//     }
//   `;
//   const varaibles = { input }; //js variable can be passed to graphql by passing it as a third argument to request
//   const headers = { Authorization: "Bearer " + getAccessToken() };
//   const { job } = await request(GRAPHQL_URL, query, varaibles, headers); //data.jobs or {jobs}
//   return job;
// };
const getCompany = async (id) => {
  const query = gql`
    query CompanyQuery($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          title
        }
      }
    }
  `;
  const varaibles = { id };
  const { company } = await request(GRAPHQL_URL, query, varaibles); //data.jobs or {jobs}
  return company;
};

const getCompanies = async () => {
  const query = gql`
    query {
      companies {
        id
        name
      }
    }
  `;
  const { companies } = await request(GRAPHQL_URL, query); //data.jobs or {jobs}
  return companies;
};
export {
  getJobs,
  getJob,
  createJob,
  getCompany,
  getCompanies,
  // deleteJob,
  // updateJob,
};
