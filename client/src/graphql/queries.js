import { gql, ApolloClient, InMemoryCache } from "@apollo/client"; // validates queriies  before sending request to server
// @apollo/client  uses id for ccaching ...it is a good practice to request id for every request
// use Apploe dev tools to see cache

// import { request, gql } from "graphql-request"; // lightweight
// both @apollo/client AND graphql-request has gql but @apollo/clien has more features like showing detailed error, caching

import { getAccessToken } from "../auth";
const GRAPHQL_URL = "http://localhost:9000/graphql";
export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: "network-only",
  //   },
  //   mutate: {
  //     fetchPolicy: "network-only",
  //   },
  //   watchQuery: {
  //     fetchPolicy: "network-only",
  //   },
  // },
});

const JOB_DETAIL_FRAGMENT = gql`
  fragment jobDetail on Job {
    id
    title
    company {
      name
    }
  }
`;
export const JOBS_QUERY = gql`
  query {
    jobs {
      ...jobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const JOB_QUERY = gql`
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
export const COMPANY_QUERY = gql`
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

export const CREATE_JOB_MUTATION = gql`
  mutation Mutation($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...jobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;
//adding JOB_DETAIL_FRAGMENT as an extenstion so that in can be used inside

// const getJobs = async () => {
//   // this gql is not same as apollo gql

//   // const { jobs } = await request(GRAPHQL_URL, query); //data.jobs or {jobs}
//   const {
//     data: { jobs },
//   } = await client.query({ query: JOB_QUERY, fetchPolicy: "network-only" });
//   // or const result = await client.query({ query });   return result.data.job;
//   //this job has a special field called{__typename:Job}
//   return jobs;
// };

// const getJob = async (id) => {
//   const query = gql`
//     query JobQuery($id: ID!) {
//       job(id: $id) {
//         id
//         title
//         company {
//           id
//           name
//         }
//         description
//       }
//     }
//   `;
//   const varaibles = { id }; //js variable can be passed to graphql by passing it as a third argument to request
//   // const { job } = await request(GRAPHQL_URL, query, varaibles); //data.jobs or {jobs}
//   const {
//     data: { job },
//   } = await client.query({ query, varaibles });

//   return job;
// };

// const createJob = async (input) => {
//   // query in graphql-request mutaion in @apollo/client
//   // const query = gql`
//   const mutation = gql`
//     mutation Mutation($input: CreateJobInput!) {
//       job: createJob(input: $input) {
//         ...jobDetail
//       }
//     }
//     ${JOB_DETAIL_FRAGMENT}
//   `;
//   const varaibles = { input }; //js variable can be passed to graphql by passing it as a third argument to request
//   const headers = { Authorization: "Bearer " + getAccessToken() };
//   // const { job } = await request(GRAPHQL_URL, query, varaibles, headers); //data.jobs or {jobs}
//   const context = {
//     headers: headers,
//   };
//   const {
//     data: { job },
//   } = await client.mutate({
//     mutation,
//     varaibles,
//     context,
//     update: (cache, result) => {
//       // usualy after creating if we want to update the value in get request without making api call
//       // to update cache
//       const {
//         data: { job },
//       } = result;
//       cache.writeQuery({
//         query: JOB_QUERY,
//         variables: { id: job.id }, //varaibles with id is requored to update cache
//         data: { job },
//       });
//       console.log(result);
//     },
//   });
//   return job;
// };

// const getCompany = async (id) => {
//   const query = gql`
//     query CompanyQuery($id: ID!) {
//       company(id: $id) {
//         id
//         name
//         description
//         jobs {
//           id
//           title
//         }
//       }
//     }
//   `;
//   const varaibles = { id };
//   // const { company } = await request(GRAPHQL_URL, query, varaibles); //data.jobs or {jobs}
//   const {
//     data: { company },
//   } = await client.query({ query, varaibles });
//   return company;
// };

const getCompanies = async () => {
  const query = gql`
    query {
      companies {
        id
        name
      }
    }
  `;
  // const { companies } = await request(GRAPHQL_URL, query); //data.jobs or {jobs}
  const {
    data: { companies },
  } = await client.query({ query });
  return companies;
};
export {
  //  getJob,
  // createJob,
  // getCompany,
  getCompanies,
};
